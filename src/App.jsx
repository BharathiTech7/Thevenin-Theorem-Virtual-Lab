import { useEffect, useMemo, useState } from 'react'
import './App.css'

import ActionButtons from './components/ActionButtons.jsx'
import CircuitDiagram from './components/CircuitDiagram.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import EquipmentPanel from './components/EquipmentPanel.jsx'
import HeaderBoard from './components/HeaderBoard.jsx'
import InstructionsTab from './components/InstructionsTab.jsx'
import StatusBar from './components/StatusBar.jsx'
import { calculateReadings } from './utils/circuitMath.js'

const BASE_WIDTH = 1440
const BASE_HEIGHT = 960
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
  const [status, setStatus] = useState('Adjust the sliders, click CHECK and observe the readings.')

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
    setR1(10)
    setR2(10)
    setR3(10)
    setVoltage(10)
    setPowerOn(false)
    setObservations([])
    setStatus('Adjust the sliders, click CHECK and observe the readings.')
  }

  const handlePlot = () => {
    setStatus(
      observations.length
        ? 'Observation data is ready for plotting.'
        : 'Add at least one observation before plotting.',
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const scaledHeight = Math.ceil(BASE_HEIGHT * scale)

  return (
    <div id="app-wrapper" style={{ height: `${scaledHeight}px` }}>
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
                onCheck={() => recordObservation('check')}
                onPlot={handlePlot}
                onPrint={handlePrint}
                onReset={resetSimulation}
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
              <EquipmentPanel
                powerOn={powerOn}
                readings={readings}
                setPowerOn={setPowerOn}
                setVoltage={setVoltage}
                voltage={voltage}
              />

              <CircuitDiagram r1={r1} r2={r2} r3={r3} />
            </section>
          </section>

          <StatusBar status={status} />
        </main>
      </div>
    </div>
  )
}

export default App
