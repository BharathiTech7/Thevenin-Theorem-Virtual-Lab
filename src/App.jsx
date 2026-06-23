import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import './ConnectionEndpoints.css'
import ConnectionLab from './components/ConnectionLab.jsx'
import ActionButtons from './components/ActionButtons.jsx'
import ControlPanel from './components/ControlPanel.jsx'
import HeaderBoard from './components/HeaderBoard.jsx'
import ReportControls from './components/ReportControls.jsx'
import WalkthroughStartButton from './walkthrough/components/WalkthroughStartButton.jsx'
import { EXPERIMENT_ALERTS } from './alerts/experimentStepAlerts.js'
import { useLabAlerts } from './alerts/useLabAlerts.js'
import { useAiGuideNarration } from './aiGuide/useAiGuideNarration.js'
import CalculationPanel from './components/CalculationPanel.jsx'
 
import { calculateReadings } from './utils/circuitMath.js'
import { generateTheveninReport } from './utils/theveninReportGenerator.js'
 
const BASE_WIDTH = 1440
const BASE_HEIGHT = 960
const CONTENT_HEIGHT = 2200
const PANEL_MAX_SCALE = 0.9
const PANEL_VIEWPORT_MARGIN = 24
const MIN_OBSERVATION_READINGS = 1
const MAX_OBSERVATIONS = 10


const getObservationSignature = ({ vth, rth, il }) => (
  [
    Number(vth).toFixed(3),
    Number(rth).toFixed(3),
    Number(il).toFixed(3),
  ].join('|')
)

const getScale = () => {
  if (typeof window === 'undefined') {
    return 1
  }

  const widthScale = (window.innerWidth - PANEL_VIEWPORT_MARGIN) / BASE_WIDTH
  const heightScale = (window.innerHeight - PANEL_VIEWPORT_MARGIN) / BASE_HEIGHT

  return Math.max(Math.min(widthScale, heightScale, PANEL_MAX_SCALE), 0.1)
}



const App = () => {
  const { clearAlerts, showStepAlert } = useLabAlerts()
  const [scale, setScale] = useState(getScale)
const [r1, setR1] = useState(0.1)
const [r2, setR2] = useState(0.1)
const [r3, setR3] = useState(0.1)
  const [rl, setRl] = useState(100)
const [voltage, setVoltage] = useState(1)
  const [powerOn, setPowerOn] = useState(false)
  const [observations, setObservations] = useState([])
const [calculationDone, setCalculationDone] = useState(false)
const [calculatedValues, setCalculatedValues] = useState(null)
const [userCalculatedIL, setUserCalculatedIL] = useState('')
const [verificationResult, setVerificationResult] = useState('')
const [experimentCase, setExperimentCase] = useState(1)
const calculationReady = experimentCase > 3
const [measuredRth, setMeasuredRth] = useState(null)
const [measuredVth, setMeasuredVth] = useState(null)
const [measuredIl, setMeasuredIl] = useState(null)
  const [reportGenerated, setReportGenerated] = useState(false)
  const [status, setStatus] = useState('Make the connections, click CHECK, then set the resistance values.')
  const [checkRequest, setCheckRequest] = useState(0)
  const [resetRequest, setResetRequest] = useState(0)
const [autoConnectRequest, setAutoConnectRequest] = useState(0)
  const [connectionsVerified, setConnectionsVerified] = useState(false)
  const [sessionStart, setSessionStart] = useState(() => Date.now())
  const [showRth, setShowRth] = useState(false)
const resistancesConfigured =
  Number(r1) !== 0.1 &&
  Number(r2) !== 0.1 &&
  Number(r3) !== 0.1 &&
  Number(rl) !== 100
  useEffect(() => {
    const handleResize = () => setScale(getScale())

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])
const handleAutoConnect = () => {
  setAutoConnectRequest((prev) => prev + 1)
}
  const readings = useMemo(
    () => calculateReadings({
  voltage: powerOn ? voltage : 0,
  r1,
  r2,
  r3,
  rl,
}),
    [powerOn, r1, r2, r3, rl, voltage],
  )
console.log(readings)
  const normalizedVoltage = Number(voltage.toFixed(1))
  const currentReadingSignature = getObservationSignature({
  vth: readings.vth,
  rth: readings.rth,
  il: readings.il,
})
const [showMultimeter, setShowMultimeter] = useState(false)
  const hasDuplicateReading = observations.some((row) => (
    row.voltage === normalizedVoltage
      || getObservationSignature(row) === currentReadingSignature
  ))
  const readingCount = observations.length
const canGenerateReport = readingCount >= MIN_OBSERVATION_READINGS

  const handleAiGuideStart = useCallback(() => {
    setStatus('AI Guide narration started.')
  }, [])

  const handleAiGuideFinish = useCallback(() => {
    setStatus('AI Guide narration completed.')
  }, [])

  const handleAiGuideError = useCallback(() => {
    setStatus('AI Guide narration could not start. Add audio files or use a browser with speech synthesis.')
  }, [])

  const {
    isPlaying: aiGuidePlaying,
    start: startAiGuide,
    stop: stopAiGuide,
  } = useAiGuideNarration({
    onError: handleAiGuideError,
    onFinish: handleAiGuideFinish,
    onStart: handleAiGuideStart,
  })

  const handleAiGuide = useCallback(() => {
    if (aiGuidePlaying) {
      stopAiGuide()
      setStatus('AI Guide narration stopped.')
      return
    }

    startAiGuide()
  }, [aiGuidePlaying, startAiGuide, stopAiGuide])

  const recordObservation = () => {
    if (!connectionsVerified) {
      setStatus('Check the circuit connections before adding readings.')
      showStepAlert(EXPERIMENT_ALERTS.connectionErrorFound, {
        description: 'Verify the wiring before storing current readings.',
        stepNumber: 6,
        target: '#check-button',
        type: 'warning',
      })
      return
    }

   if (experimentCase !== 1 && !powerOn) {
      setStatus('Switch on the power supply before adding readings.')
      showStepAlert(EXPERIMENT_ALERTS.cannotStartPower, {
        description: 'Switch on the verified power supply before adding readings.',
        stepNumber: 6,
        target: '#power-toggle-button',
      })
      return
    }

    if (experimentCase !== 1 && normalizedVoltage <= 0) {
      setStatus('Set the power supply voltage before adding a reading.')
      showStepAlert(EXPERIMENT_ALERTS.adjustVoltage, {
        dedupeKey: 'step-6-zero-voltage',
        description: 'Increase the voltage above 0 V before adding a reading.',
        target: '#voltage-control',
        type: 'warning',
      })
      return
    }

    if (readingCount >= MAX_OBSERVATIONS) {
      setStatus('Observation table is full. Reset the experiment for a new run.')
      showStepAlert(EXPERIMENT_ALERTS.minimumReadingsRequired, {
        description: 'The observation table already contains the maximum 10 readings.',
        title: 'Observation Table Is Full',
      })
      return
    }

    if (hasDuplicateReading) {
      setStatus('Duplicate reading cannot be added to the observation table.')
      showStepAlert(EXPERIMENT_ALERTS.readingAlreadyExists, {
        description: 'This reading already exists in the observation table. Change the voltage before adding another reading.',
        title: 'Duplicate Reading Not Allowed',
      })
      return
    }

 if (experimentCase === 1) {
  setObservations([
    {
      id: 1,
      rth: readings.rth,
      vth: null,
      il: null,
      rl,
    },
  ])

 setMeasuredRth(readings.rth)
setConnectionsVerified(false)
setExperimentCase(2)
}

else if (experimentCase === 2) {
  setObservations([
    {
      ...observations[0],
      vth: readings.vth,
    },
  ])

   setMeasuredVth(readings.vth)
setConnectionsVerified(false)
setExperimentCase(3)
}

else if (experimentCase === 3) {
  setObservations([
    {
      ...observations[0],
      il: readings.il,
    },
  ])

  setMeasuredIl(readings.il)
  setConnectionsVerified(false)
  setExperimentCase(4)
}
  
    setReportGenerated(false)
    setStatus('Reading added to the observation table.')

//    if (nextObservationCount === MIN_OBSERVATION_READINGS) {
//   showStepAlert(EXPERIMENT_ALERTS.sufficientData)
// }
  }

  const resetSimulation = useCallback(() => {
    stopAiGuide()
    setPowerOn(false)
    setVoltage(1)
setR1(0.1)
setR2(0.1)
setR3(0.1)
setRl(100)
    setObservations([])
    setCalculationDone(false)
setCalculatedValues(null)
setVerificationResult('')
setUserCalculatedIL('')
    setReportGenerated(false)
    setCheckRequest(0)
    setExperimentCase(1)
    setConnectionsVerified(false)
    setResetRequest((current) => current + 1)
    setSessionStart(Date.now())
    setStatus('Simulation reset. Make the circuit connections again.')
    showStepAlert(EXPERIMENT_ALERTS.resetSuccess)
    setShowRth(false)
    setShowMultimeter(false)
  }, [showStepAlert, stopAiGuide])

  const handleReset = () => {
    clearAlerts()
    resetSimulation()
  }


const handlePrint = () => {
  if (readingCount < MIN_OBSERVATION_READINGS) {
    showStepAlert({
      title: 'Print Not Available Yet',
      description:
        'Complete the experiment and calculate the results before printing the report.',
      type: 'warning',
    })
    return
  }

  window.print()
}

const handleGenerateReport = () => {
  if (!calculationDone) {
  window.alert('Please click CALCULATE before generating report.')
  return
}
  if (readingCount < MIN_OBSERVATION_READINGS) {
    window.alert('Please add at least one observation.')
    return
  }

  setReportGenerated(true)

generateTheveninReport({
  observations,
  r1,
  r2,
  r3,
  rl,
  vth: calculatedValues?.vth ?? 0,
  rth: calculatedValues?.rth ?? 0,
  observedIL: calculatedValues?.observedIL ?? 0,
  userCalculatedIL,
  verificationResult,
  sessionStart,
})
}

  const scaledWidth = Math.ceil(BASE_WIDTH * scale)
  const scaledHeight = Math.ceil(CONTENT_HEIGHT * scale)
  const handleCheckConnections = useCallback((result) => {
    if (result.isCorrect) {
      if (experimentCase === 1) {
  setShowRth(true)
  setShowMultimeter(true)
}
  setConnectionsVerified(true)

  if (experimentCase === 1) {
    setStatus(
      'Right connections! Click ADD to measure RTH.'
    )
  }

  else if (experimentCase === 2) {
    setStatus(
      'Right connections! Turn ON power supply and click ADD to measure VTH.'
    )
  }

  else if (experimentCase === 3) {
    setStatus(
      'Right connections! Turn ON power supply and click ADD to measure IL.'
    )
  }

  showStepAlert(EXPERIMENT_ALERTS.connectionsVerified)

  return
}

    setConnectionsVerified(false)

    if (result.totalConnections === 0) {
      setStatus('Please make the connections first.')
      showStepAlert(EXPERIMENT_ALERTS.connectionErrorFound, {
        description: 'No circuit wires were found. Drag node connections before checking.',
        type: 'warning',
      })
      return
    }

    setStatus(
  'Invalid connections. Please check the wiring and try again.'
)
    showStepAlert(EXPERIMENT_ALERTS.connectionErrorFound, {
      description: `Matched ${result.matchedCount} of 8 required wire pairs from ${result.totalConnections} total wires.`,
    })
  }, [showStepAlert])

  const handleCheck = () => {
    setCheckRequest((current) => current + 1)
  }
  const handleTogglePower = () => {
    if (!powerOn && !connectionsVerified) {
      setStatus('Check the circuit connections before switching on the power supply.')
      showStepAlert(EXPERIMENT_ALERTS.cannotStartPower)
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
    showStepAlert(EXPERIMENT_ALERTS.powerOn)
  }


 const handleVoltageChange = useCallback((nextVoltage) => {
  setVoltage(nextVoltage)
}, [])

 const handleCalculate = () => {
setCalculatedValues({
  r1,
  r2,
  r3,
  rl,

  voltageSource: voltage,

  vth: measuredVth,
  rth: measuredRth,
  observedIL: measuredIl,
})

  setCalculationDone(true)
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
            height: `${CONTENT_HEIGHT}px`,
            transform: `scale(${scale})`,
          }}
        >
          <main className="simulation-shell" id="walkthrough-demo-experiment">
            <HeaderBoard />
            <WalkthroughStartButton variant="side-tab" />
            {/* <StatusBar status={status} /> */}
            <span className="sr-only" role="status" aria-live="polite">{status}</span>

            <section className="workspace-grid">
              <aside className="left-panel">
                <ActionButtons
                 activeInstructionStep={
    !resistancesConfigured
      ? 'step1'
      : experimentCase === 1
      ? 'case1'
      : experimentCase === 2
      ? 'case2'
      : experimentCase === 3
      ? 'case3'
      : !calculationDone
      ? 'step3'
      : verificationResult === ''
      ? 'step4'
      : !reportGenerated
      ? 'step5'
      : 'step6'
  }
                  activeButtons={{
                    onAiGuide: aiGuidePlaying,
                  }}
      disabledButtons={{
  onAdd: !connectionsVerified,
  onCheck: false,
  onPrint: false,
  onCalculate: experimentCase !== 4,
}}
                  onAdd={recordObservation}
                  onCheck={handleCheck}
         
                  onPrint={handlePrint}
                  onReset={handleReset}
                  onAiGuide={handleAiGuide}
                  onCalculate={handleCalculate}
                  onAutoConnect={handleAutoConnect}
                />

                <ControlPanel
  locked={powerOn}
  observations={observations}
  rl={rl}
  r1={r1}
  r2={r2}
  r3={r3}
  setRl={setRl}
  setR1={setR1}
  setR2={setR2}
  setR3={setR3}
/>
              </aside>

              <section className="right-panel">
                <ConnectionLab
                experimentCase={experimentCase}
                  key={`connection-lab-${resetRequest}`}
                  autoConnectRequest={autoConnectRequest}
                  checkRequest={checkRequest}
                  onCheckConnections={handleCheckConnections}
                  powerOn={powerOn}
                  r1={r1}
                  r2={r2}
                  r3={r3}
                  rl={rl}
                  readings={readings}
                  resetRequest={resetRequest}
                  scale={scale}
                  onTogglePower={handleTogglePower}
                  setVoltage={handleVoltageChange}
                  voltage={voltage}
                  resistancesConfigured={resistancesConfigured}
                  showRth={showRth}
                  showMultimeter={showMultimeter}
                />
              </section>
            </section>



<ReportControls
  minReadings={MIN_OBSERVATION_READINGS}
  onGenerateReport={handleGenerateReport}
  readingCount={readingCount}
  reportGenerated={reportGenerated}
/>

</main>
<CalculationPanel
  calculationDone={calculationDone}
  calculatedValues={calculatedValues}
  verificationResult={verificationResult}
  userCalculatedIL={userCalculatedIL}
  setUserCalculatedIL={setUserCalculatedIL}
  setVerificationResult={setVerificationResult}
/>
        </div>
      </div>
    </div>
  )
}

export default App
