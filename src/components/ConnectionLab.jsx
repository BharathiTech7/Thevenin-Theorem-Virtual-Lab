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
  showMultimeter

}) => {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)
  const onCheckConnectionsRef = useRef(onCheckConnections)
  const scaleRef = useRef(getJsPlumbZoom(scale))
  const { showStepAlert } = useLabAlerts()
  const [isLocked, setIsLocked] = useState(false)
 

  useEffect(() => {
    onCheckConnectionsRef.current = onCheckConnections
  }, [onCheckConnections])

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
