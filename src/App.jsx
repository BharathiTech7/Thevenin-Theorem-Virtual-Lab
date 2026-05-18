import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import './ConnectionEndpoints.css'
import ConnectionLab from './components/ConnectionLab.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import GraphPanel from './components/GraphPanel.jsx'
import HeaderBoard from './components/HeaderBoard.jsx'
import InstructionsTab from './components/InstructionsTab.jsx'
 
import { calculateReadings } from './utils/circuitMath.js'
 
const BASE_WIDTH = 1440
const BASE_HEIGHT = 960
const GRAPH_SECTION_GAP = 28
const GRAPH_SECTION_HEIGHT = 430
const CONTENT_HEIGHT = BASE_HEIGHT + GRAPH_SECTION_GAP + GRAPH_SECTION_HEIGHT
const PANEL_MAX_SCALE = 0.9
const PANEL_VIEWPORT_MARGIN = 24

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
  const [r1, setR1] = useState(10)
  const [r2, setR2] = useState(10)
  const [r3, setR3] = useState(10)
  const [voltage, setVoltage] = useState(10)
  const [powerOn, setPowerOn] = useState(false)
  const [observations, setObservations] = useState([])
  const [showGraph, setShowGraph] = useState(false)
  const [, setStatus] = useState('Adjust the sliders, click CHECK and observe the readings.')

  const [autoConnect, setAutoConnect] = useState(false)
  const [checkRequest, setCheckRequest] = useState(0)
  const [resetRequest, setResetRequest] = useState(0)
  const [, setConnectionsVerified] = useState(false)

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

  const recordObservation = (source) => {
    const nextObservation = {
      id: observations.length + 1,
      voltage: powerOn ? voltage : 0,
      i1: readings.i1,
      i2: readings.i2,
      i3: readings.i3,
    }

    setObservations((current) => [...current.slice(-5), nextObservation])
    setStatus(
      source === 'check'
        ? 'KCL verified: I1 equals I2 + I3 for the selected values.'
        : 'Reading added to the observation table.',
    )
  }

  const resetSimulation = () => {
    setPowerOn(false)
    setVoltage(10)
    setR1(10)
    setR2(10)
    setR3(10)
    setObservations([])
    setShowGraph(false)
    setAutoConnect(false)
    setCheckRequest(0)
    setConnectionsVerified(false)
    setResetRequest((current) => current + 1)
    setStatus('Simulation reset. Make the circuit connections again.')
  }
  const handlePlot = () => {
    setShowGraph(true)
    setStatus(
      observations.length
        ? 'Observation graph section opened.'
        : 'Graph section opened. Add observations to plot readings.',
    )
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
const handleAutoConnect = () => {
  setAutoConnect(true)
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

            <section className="workspace-grid">
              <aside className="left-panel">
              <ActionButtons
                onAdd={() => recordObservation('add')}
                onCheck={handleCheck}
                onPlot={handlePlot}
                onPrint={handlePrint}
                onReset={resetSimulation}
                onAutoConnect={handleAutoConnect}
              />

                <ControlPanel
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
                  autoConnect={autoConnect}
                  checkRequest={checkRequest}
                  onCheckConnections={handleCheckConnections}
                  powerOn={powerOn}
                  r1={r1}
                  r2={r2}
                  r3={r3}
                  readings={readings}
                  resetRequest={resetRequest}
                  setPowerOn={setPowerOn}
                  setVoltage={setVoltage}
                  voltage={voltage}
                />
              </section>
            </section>

          </main>

          <GraphPanel className="graph-panel--separate" plotted={showGraph} />
        </div>
      </div>
    </div>
  )
}

export default App
