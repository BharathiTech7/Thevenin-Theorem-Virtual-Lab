import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import './ConnectionEndpoints.css'
import ConnectionLab from './components/ConnectionLab.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import GraphPanel from './components/GraphPanel.jsx'
import HeaderBoard from './components/HeaderBoard.jsx'
import InstructionsTab from './components/InstructionsTab.jsx'
import StatusBar from './components/StatusBar.jsx'
 
import { calculateReadings } from './utils/circuitMath.js'
 
const BASE_WIDTH = 1440
const BASE_HEIGHT = 960
const GRAPH_SECTION_GAP = 28
const GRAPH_SECTION_HEIGHT = 430
const CONTENT_HEIGHT = BASE_HEIGHT + GRAPH_SECTION_GAP + GRAPH_SECTION_HEIGHT
const PANEL_MAX_SCALE = 0.9
const PANEL_VIEWPORT_MARGIN = 24
const MIN_GRAPH_READINGS = 6
const MAX_OBSERVATIONS = 10

const getScale = () => {
  if (typeof window === 'undefined') {
    return 1
  }

  const widthScale = (window.innerWidth - PANEL_VIEWPORT_MARGIN) / BASE_WIDTH
  const heightScale = (window.innerHeight - PANEL_VIEWPORT_MARGIN) / BASE_HEIGHT

  return Math.max(Math.min(widthScale, heightScale, PANEL_MAX_SCALE), 0.1)
}

const App = () => {
  const [scale, setScale] = useState(getScale)
  const [r1, setR1] = useState(0)
  const [r2, setR2] = useState(0)
  const [r3, setR3] = useState(0)
  const [voltage, setVoltage] = useState(0)
  const [powerOn, setPowerOn] = useState(false)
  const [observations, setObservations] = useState([])
  const [showGraph, setShowGraph] = useState(false)
  const [status, setStatus] = useState('Make the connections, click CHECK, then set the resistance values.')

  const [autoConnectRequest, setAutoConnectRequest] = useState(0)
  const [checkRequest, setCheckRequest] = useState(0)
  const [resetRequest, setResetRequest] = useState(0)
  const [connectionsVerified, setConnectionsVerified] = useState(false)

  useEffect(() => {
    const handleResize = () => setScale(getScale())

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const readings = useMemo(
    () => calculateReadings({ voltage: powerOn ? voltage : 0, r1, r2, r3 }),
    [powerOn, r1, r2, r3, voltage],
  )

  const normalizedVoltage = Number(voltage.toFixed(1))
  const hasRecordedVoltage = observations.some((row) => row.voltage === normalizedVoltage)
  const canAddObservation = (
    connectionsVerified
    && powerOn
    && normalizedVoltage > 0
    && observations.length < MAX_OBSERVATIONS
    && !hasRecordedVoltage
  )
  const canPlotGraph = observations.length >= MIN_GRAPH_READINGS

  const recordObservation = (source) => {
    if (!connectionsVerified) {
      setStatus('Check the circuit connections before adding readings.')
      return
    }

    if (!powerOn) {
      setStatus('Switch on the power supply before adding readings.')
      return
    }

    if (normalizedVoltage <= 0) {
      setStatus('Set the power supply voltage before adding a reading.')
      return
    }

    if (observations.length >= MAX_OBSERVATIONS) {
      setStatus('Ten readings are already recorded. Plot the graph or reset for a new run.')
      return
    }

    if (hasRecordedVoltage) {
      setStatus('Change the power supply voltage before adding another reading.')
      return
    }

    setObservations((current) => {
      const nextObservation = {
        id: (current.at(-1)?.id ?? 0) + 1,
        voltage: normalizedVoltage,
        r1,
        r2,
        r3,
        totalResistance: readings.totalResistance,
        i1: readings.i1,
        i2: readings.i2,
        i3: readings.i3,
      }

      return [...current, nextObservation]
    })
    setStatus(
      source === 'check'
        ? 'KCL verified: I1 equals I2 + I3 for the selected values.'
        : 'Reading added to the observation table.',
    )
  }

  const resetSimulation = () => {
    setPowerOn(false)
    setVoltage(0)
    setR1(0)
    setR2(0)
    setR3(0)
    setObservations([])
    setShowGraph(false)
    setAutoConnectRequest(0)
    setCheckRequest(0)
    setConnectionsVerified(false)
    setResetRequest((current) => current + 1)
    setStatus('Simulation reset. Make the circuit connections again.')
  }
  const handlePlot = () => {
    if (!canPlotGraph) {
      setShowGraph(false)
      setStatus(`Add ${MIN_GRAPH_READINGS - observations.length} more reading(s) before plotting the graph.`)
      return
    }

    setShowGraph(true)
    setStatus('Observation graph plotted from the table readings.')
  }

  const handlePrint = () => {
    window.print()
  }

  const scaledWidth = Math.ceil(BASE_WIDTH * scale)
  const scaledHeight = Math.ceil(CONTENT_HEIGHT * scale)
  const handleCheckConnections = useCallback((result) => {
    if (result.isCorrect) {
      setConnectionsVerified(true)

      setStatus(
        'Right connections! Please choose resistance values and switch on the power supply.',
      )

      return
    }

    setConnectionsVerified(false)

    if (result.totalConnections === 0) {
      setStatus('Please make the connections first.')
      return
    }

    setStatus(
      `Invalid connections. Correct matched points: ${result.matchedCount}; total wires: ${result.totalConnections}.`,
    )
  }, [])

  const handleCheck = () => {
    setCheckRequest((current) => current + 1)
  }
  const handleTogglePower = () => {
    if (!powerOn && !connectionsVerified) {
      setStatus('Check the circuit connections before switching on the power supply.')
      return
    }

    if (powerOn) {
      setPowerOn(false)
      setVoltage(0)
      setStatus('Power supply switched off.')
      return
    }

    setPowerOn(true)
    setStatus('Power supply switched on. Adjust voltage and add the reading.')
  }
  const handleAutoConnect = () => {
    setAutoConnectRequest((current) => current + 1)
    setConnectionsVerified(false)

    setStatus(
      'Default connections added using jsPlumb. Click CHECK to validate and lock the circuit.',
    )
  }
  return (
    <div id="app-wrapper">
      <div
        id="app-viewport"
        style={{
          height: `${scaledHeight}px`,
          width: `${scaledWidth}px`,
        }}
      >
        <div
          id="app-scale"
          style={{
            transform: `scale(${scale})`,
          }}
        >
          <main className="simulation-shell">
            <HeaderBoard />
            <InstructionsTab />
            <StatusBar status={status} />

            <section className="workspace-grid">
              <aside className="left-panel">
                <ActionButtons
                  disabledButtons={{
                    onAdd: !canAddObservation,
                    onAutoConnect: connectionsVerified || powerOn,
                    onCheck: connectionsVerified,
                    onPlot: !canPlotGraph,
                    onPrint: !canPlotGraph,
                  }}
                  onAdd={() => recordObservation('add')}
                  onCheck={handleCheck}
                  onPlot={handlePlot}
                  onPrint={handlePrint}
                  onReset={resetSimulation}
                  onAutoConnect={handleAutoConnect}
                />

                <ControlPanel
                  locked={!connectionsVerified || powerOn || observations.length > 0}
                  observations={observations}
                  r1={r1}
                  r2={r2}
                  r3={r3}
                  setR1={setR1}
                  setR2={setR2}
                  setR3={setR3}
                />
              </aside>

              <section className="right-panel">
                <ConnectionLab
                  autoConnectRequest={autoConnectRequest}
                  checkRequest={checkRequest}
                  onCheckConnections={handleCheckConnections}
                  powerOn={powerOn}
                  r1={r1}
                  r2={r2}
                  r3={r3}
                  readings={readings}
                  resetRequest={resetRequest}
                  onTogglePower={handleTogglePower}
                  setVoltage={setVoltage}
                  voltage={voltage}
                />
              </section>
            </section>

          </main>

          <GraphPanel
            className="graph-panel--separate"
            observations={observations}
            plotted={showGraph}
          />
        </div>
      </div>
    </div>
  )
}

export default App
