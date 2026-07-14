import { useEffect, useRef, useState } from 'react'
import { useLabAlerts } from '../alerts/useLabAlerts.js'
import CircuitDiagram from './CircuitDiagram.jsx'
import EquipmentPanel from './EquipmentPanel.jsx'
import PowerSupply from './PowerSupply.jsx'
import {
  addAllEndpoints,
  deleteConnectionsForTerminal,
  resolveJsPlumb,
 validateTheveninConnections,
 autoConnectTheveninCircuit,
  wireHoverPaintStyles,
  wirePaintStyles,

} from '../utils/jsPlumbWiring.js'

const getJsPlumbZoom = (scale) => (
  Number.isFinite(scale) && scale > 0 ? scale : 1
)

const ConnectionLab = ({
  checkRequest,
  experimentCase,
  onCheckConnections,
  powerOn,
  r1,
  r2,
  r3,
  rl,
  readings,
  resetRequest,
  scale = 1,
  onTogglePower,
  setVoltage,
  voltage,
  resistancesConfigured,
  autoConnectRequest,
  showRth,
  showMultimeter,
  playStepById,
   playStepsById,
   case1ConnectionsRemoved,
setCase1ConnectionsRemoved,
case2ConnectionsRemoved,
setCase2ConnectionsRemoved,
}) => {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)
  const onCheckConnectionsRef = useRef(onCheckConnections)
  const scaleRef = useRef(getJsPlumbZoom(scale))
  const { showStepAlert } = useLabAlerts()
  const [isLocked, setIsLocked] = useState(false)
  const experimentCaseRef = useRef(experimentCase)
  const autoConnectingRef = useRef(false)
  useEffect(() => {
    onCheckConnectionsRef.current = onCheckConnections
  }, [onCheckConnections])
useEffect(() => {
  experimentCaseRef.current = experimentCase
}, [experimentCase])
  useEffect(() => {
    let cancelled = false
    
    const initJsPlumb = async () => {
      const jsPlumbModule = await import('jsplumb')
      const jsPlumb = resolveJsPlumb(jsPlumbModule)
  

      if (cancelled || !containerRef.current || !jsPlumb?.getInstance) {
        return
      }

      instanceRef.current?.reset()

      containerRef.current.classList.remove('connection-lab--locked')
      setIsLocked(false)
      

      const instance = jsPlumb.getInstance({
        Container: containerRef.current,
        ConnectionsDetachable: true,
        ReattachConnections: true,
        Connector: ['Bezier', { curviness: 72 }],
        PaintStyle: {
          ...wirePaintStyles.positive,
        },
        HoverPaintStyle: {
          ...wireHoverPaintStyles.positive,
        },
        Endpoint: ['Dot', { radius: 5 }],
      })

      instanceRef.current = instance
      instance.setZoom?.(scaleRef.current)

      instance.registerConnectionTypes({
        positive: {
          paintStyle: {
            ...wirePaintStyles.positive,
          },
          hoverPaintStyle: {
            ...wireHoverPaintStyles.positive,
          },
        },
        negative: {
          paintStyle: {
            ...wirePaintStyles.negative,
          },
          hoverPaintStyle: {
            ...wireHoverPaintStyles.negative,
          },
        },
      })

      instance.setSuspendDrawing(true)

     addAllEndpoints(
 instance,
  () => {
    console.log("RESISTANCE CHECK =", resistancesConfigured)
    return resistancesConfigured
  },
  () => {
  showStepAlert({
    title: 'Set Resistance Values First',
    description:
      'Please set R1, R2, R3 and RL before making connections.',
    type: 'warning',
  })
}
)

      instance.setSuspendDrawing(false, true)
 let wrongConnectionPlaying = false

instance.bind('connection', (info) => {
  if (autoConnectingRef.current) {
  return
}
  const source = info.sourceId
  const target = info.targetId

  console.log('CONNECTED:', source, '→', target)

  const isPair = (a, b) =>
    (source === a && target === b) ||
    (source === b && target === a)

  //
  // CASE 1
  //
  if (experimentCaseRef.current === 1) {
    if (isPair('5-endpoint', '11-endpoint')) {
      playStepById?.(6)
      return
    }

    if (isPair('6-endpoint', '13-endpoint')) {
      playStepById?.(7)
      return
    }

    if (isPair('9-endpoint', '10-endpoint')) {
      playStepById?.(8)
      return
    }

    if (!wrongConnectionPlaying) {
      wrongConnectionPlaying = true

      playStepById?.(9)

      setTimeout(() => {
        wrongConnectionPlaying = false
      }, 1800)
    }

    return
  }

  //
  // CASE 2
  //
  if (experimentCaseRef.current === 2) {
    if (isPair('7-endpoint', '9-endpoint')) {
      playStepById?.(18)
      return
    }

    if (isPair('8-endpoint', '10-endpoint')) {
      playStepById?.(19)
      return
    }

    if (isPair('1-endpoint', '11-endpoint')) {
      playStepById?.(20)
      return
    }

    if (isPair('2-endpoint', '13-endpoint')) {
      playStepById?.(21)
      return
    }

    if (!wrongConnectionPlaying) {
      wrongConnectionPlaying = true

      playStepById?.(9)
console.log("CURRENT CASE =", experimentCase)
      setTimeout(() => {
        wrongConnectionPlaying = false
      }, 1800)
    }

    return
  }


  //
// CASE 3
//
if (experimentCaseRef.current === 3) {

    if (isPair('3-endpoint', '11-endpoint')) {
        playStepById?.(27)
        return
    }

    if (isPair('4-endpoint', '12-endpoint')) {
        playStepById?.(28)
        return
    }

    if (isPair('13-endpoint', '14-endpoint')) {
        playStepById?.(21)   // Click Check
        return
    }

    if (!wrongConnectionPlaying) {
        wrongConnectionPlaying = true

        playStepById?.(9)

        setTimeout(() => {
            wrongConnectionPlaying = false
        }, 1800)
    }

    return
}
})
      window.setTimeout(() => {
        instance.repaintEverything()
      }, 100)
    }

    initJsPlumb()

    const handleResize = () => {
      window.setTimeout(() => {
        instanceRef.current?.repaintEverything()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelled = true
      window.removeEventListener('resize', handleResize)

      instanceRef.current?.reset()
      instanceRef.current = null
    }
  }, [resetRequest,resistancesConfigured])

  useEffect(() => {
    const instance = instanceRef.current
    const zoom = getJsPlumbZoom(scale)

    scaleRef.current = zoom

    if (!instance?.setZoom) {
      return
    }

    instance.setZoom(zoom, true)

    window.setTimeout(() => {
      instance.repaintEverything?.()
    }, 0)
  }, [scale])

  

  useEffect(() => {
    if (checkRequest === 0 || !instanceRef.current) {
      return
    }

    const result = validateTheveninConnections(
  instanceRef.current,
  experimentCase
)



    onCheckConnectionsRef.current?.(result)
  }, [checkRequest])

  const handleLabelClick = (event) => {
    const label = event.target.closest('.terminal-number-label')

    if (!label || !containerRef.current?.contains(label)) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    if (isLocked) {
      return
    }

    const terminalId = label.dataset.terminalId

    if (!terminalId || !instanceRef.current) {
      return
    }

    deleteConnectionsForTerminal(instanceRef.current, terminalId)
    instanceRef.current.repaintEverything?.()
    const remainingConnections =
  instanceRef.current.getAllConnections()

// --------------------
// CASE 1 → CASE 2
// --------------------

if (
  experimentCase === 2 &&
  remainingConnections.length === 0 &&
  !case1ConnectionsRemoved
) {
  setCase1ConnectionsRemoved(true)
}

// --------------------
// CASE 2 → CASE 3
// --------------------

const has79 = remainingConnections.some(
  (c) =>
    (c.sourceId === '7-endpoint' &&
      c.targetId === '9-endpoint') ||
    (c.sourceId === '9-endpoint' &&
      c.targetId === '7-endpoint')
)

const has810 = remainingConnections.some(
  (c) =>
    (c.sourceId === '8-endpoint' &&
      c.targetId === '10-endpoint') ||
    (c.sourceId === '10-endpoint' &&
      c.targetId === '8-endpoint')
)

if (
  experimentCase === 3 &&
  remainingConnections.length === 2 &&
  has79 &&
  has810 &&
  !case2ConnectionsRemoved
) {
  setCase2ConnectionsRemoved(true)
}
  }

const meterReadings = {
  vth: readings.vth ?? 0,
  il: readings.il ?? 0,
  rth: readings.rth ?? 0,
   showRth,
}

useEffect(() => {
  if (
    autoConnectRequest === 0 ||
    !instanceRef.current
  ) {
    return
  }

  if (!resistancesConfigured) {
    showStepAlert({
      title: 'Set Resistance Values First',
      description:
        'Please set R1, R2, R3 and RL before auto connecting.',
      type: 'warning',
    })

    return
  }
autoConnectingRef.current = true
const result =
  autoConnectTheveninCircuit(
    instanceRef.current,
    experimentCase
  )

if (!result?.success) {
  showStepAlert({
    title: 'Remove Existing Connections',
    description:
      'Please remove all current wire connections before proceeding to the next case.',
    type: 'warning',
  })

  return
}

  instanceRef.current.repaintEverything?.()
  if (experimentCase === 1) {
  playStepById?.(11)
}

if (experimentCase === 2) {
  playStepById?.(11)
}

if (experimentCase === 3) {
  playStepById?.(11)
}
  setTimeout(() => {
  autoConnectingRef.current = false
}, 500)

}, [
  autoConnectRequest,
])

  return (
    <div className="connection-lab" onClick={handleLabelClick} ref={containerRef}>
 <EquipmentPanel
  onTogglePower={onTogglePower}
  powerOn={powerOn}
  readings={meterReadings}
  experimentCase={experimentCase}
  setVoltage={setVoltage}
  voltage={voltage}
   showMultimeter={showMultimeter}
/>

     <div className="circuit-workspace">

    <div className="circuit-power-supply">
  <PowerSupply
    onTogglePower={onTogglePower}
    powerOn={powerOn}
    setVoltage={setVoltage}
    voltage={voltage}
  />
</div>

    <CircuitDiagram
      r1={r1}
      r2={r2}
      r3={r3}
      rl={rl}
    />

  </div>
    </div>
  )
}

export default ConnectionLab
