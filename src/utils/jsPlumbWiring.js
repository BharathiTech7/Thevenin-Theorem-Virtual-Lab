export const POSITIVE_TERMINALS = ['1-endpoint', '3-endpoint', '5-endpoint', '7-endpoint']

export const NEGATIVE_TERMINALS = ['2-endpoint', '4-endpoint', '6-endpoint', '8-endpoint']

export const CIRCUIT_POSITIVE_TERMINALS = [
  '9-endpoint',
  '11-endpoint',
  '13-endpoint',
]

export const CIRCUIT_NEGATIVE_TERMINALS = [
  '10-endpoint',
  '12-endpoint',
  '14-endpoint',
]




export const resolveJsPlumb = (module) => (
  module?.jsPlumb
  || module?.default?.jsPlumb
  || module?.default
  || window.jsPlumb
)

const getAllConnections = (instance) => {
  if (!instance) return []

  if (typeof instance.getAllConnections === 'function') {
    return instance.getAllConnections()
  }

  if (typeof instance.getConnections === 'function') {
    return instance.getConnections()
  }

  return []
}

export const deleteConnectionsForTerminal = (instance, terminalId) => {
  const matchingConnections = getAllConnections(instance).filter((connection) => {
    const sourceId = connection.sourceId || connection.source?.id
    const targetId = connection.targetId || connection.target?.id

    return sourceId === terminalId || targetId === terminalId
  })

  matchingConnections.forEach((connection) => {
    if (typeof instance.deleteConnection === 'function') {
      instance.deleteConnection(connection)
      return
    }

    connection.detach?.()
  })

  return matchingConnections.length
}

const isNegativeTerminal = (terminalId) => (
  NEGATIVE_TERMINALS.includes(terminalId)
  || CIRCUIT_NEGATIVE_TERMINALS.includes(terminalId)
)

const terminalPaintStyles = {
  positive: {
    fill: '#0969e8',
    outlineStroke: '#f8fbff',
    outlineWidth: 2,
    stroke: '#062b77',
    strokeWidth: 1.4,
  },
  negative: {
    fill: '#e33024',
    outlineStroke: '#fff8f6',
    outlineWidth: 2,
    stroke: '#8f140e',
    strokeWidth: 1.4,
  },
}

const terminalHoverPaintStyles = {
  positive: {
    fill: '#2a7cff',
    outlineStroke: '#ffffff',
    outlineWidth: 2.4,
    stroke: '#082767',
    strokeWidth: 1.6,
  },
  negative: {
    fill: '#ff4a3d',
    outlineStroke: '#ffffff',
    outlineWidth: 2.4,
    stroke: '#81130f',
    strokeWidth: 1.6,
  },
}

const getTerminalNumber = (terminalId) => terminalId.replace('-endpoint', '')

const getCssValue = (styles, propertyName, fallback) => {
  const value = styles.getPropertyValue(propertyName).trim()

  return value || fallback
}

const getCssNumber = (styles, propertyName, fallback) => {
  const value = Number.parseFloat(styles.getPropertyValue(propertyName))

  return Number.isFinite(value) ? value : fallback
}

const getEndpointPaintStyle = (element, type, state = 'default') => {
  const styles = window.getComputedStyle(element)
  const prefix = state === 'hover' ? '--jtk-endpoint-hover' : '--jtk-endpoint'
  const defaults = state === 'hover'
    ? terminalHoverPaintStyles[type]
    : terminalPaintStyles[type]

  return {
    fill: getCssValue(styles, `${prefix}-fill`, defaults.fill),
    outlineStroke: getCssValue(
      styles,
      `${prefix}-outline-stroke`,
      defaults.outlineStroke,
    ),
    outlineWidth: getCssNumber(
      styles,
      `${prefix}-outline-width`,
      defaults.outlineWidth,
    ),
    stroke: getCssValue(styles, `${prefix}-stroke`, defaults.stroke),
    strokeWidth: getCssNumber(
      styles,
      `${prefix}-stroke-width`,
      defaults.strokeWidth,
    ),
  }
}

const getEndpointRadius = (element) => (
  getCssNumber(window.getComputedStyle(element), '--jtk-endpoint-radius', 5)
)

const getEndpointCssClass = (terminalId, type) => {
  const terminalNumber = getTerminalNumber(terminalId)

  return [
    'jtk-endpoint--terminal',
    `jtk-endpoint--terminal-${terminalNumber}`,
    `jtk-endpoint--${terminalId}`,
    `jtk-endpoint--${type}`,
  ].join(' ')
}

export const wirePaintStyles = {
  positive: {
    outlineStroke: '#07306e',
    outlineWidth: 1.15,
    stroke: '#1f73e6',
    strokeWidth: 4.6,
  },
  negative: {
    outlineStroke: '#771914',
    outlineWidth: 1.15,
    stroke: '#dd342d',
    strokeWidth: 4.6,
  },
}

export const wireHoverPaintStyles = {
  positive: {
    outlineStroke: '#052357',
    outlineWidth: 1.35,
    stroke: '#3a8aff',
    strokeWidth: 5,
  },
  negative: {
    outlineStroke: '#5d110d',
    outlineWidth: 1.35,
    stroke: '#f04a42',
    strokeWidth: 5,
  },
}

export const getConnectionBetween = (instance, firstId, secondId) => {
  const connections = getAllConnections(instance)

  return connections.find((connection) => {
    const sourceId = connection.sourceId || connection.source?.id
    const targetId = connection.targetId || connection.target?.id

    return (
      (sourceId === firstId && targetId === secondId)
      || (sourceId === secondId && targetId === firstId)
    )
  })
}

export const hasConnectionBetween = (instance, firstId, secondId) => (
  Boolean(getConnectionBetween(instance, firstId, secondId))
)



export const addTerminalEndpoint = (instance, terminalId, type) => {
  const element = document.getElementById(terminalId)

  if (!element) {
    return
  }

  instance.addEndpoint(element, {
    uuid: terminalId,
    endpoint: ['Dot', { radius: getEndpointRadius(element) }],
    cssClass: getEndpointCssClass(terminalId, type),
    anchor: ['Center'],
    isSource: true,
    isTarget: true,
    connectionType: type,
    connectionsDetachable: true,
    connectorStyle: wirePaintStyles[type],
    connectorHoverStyle: wireHoverPaintStyles[type],
    maxConnections: 1,
    paintStyle: getEndpointPaintStyle(element, type),
    hoverPaintStyle: getEndpointPaintStyle(element, type, 'hover'),
  })
}

export const addAllEndpoints = (
  instance,
  resistancesConfigured,
  showResistanceAlert,
) => {
  POSITIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'positive')
  })

  NEGATIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'negative')
  })

  CIRCUIT_POSITIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'positive')
  })

  CIRCUIT_NEGATIVE_TERMINALS.forEach((terminalId) => {
    addTerminalEndpoint(instance, terminalId, 'negative')
  })
  instance.bind('beforeDrop', () => {

  console.log("BEFORE DROP FIRED")

  if (!resistancesConfigured()) {

    console.log("BLOCKED")

    showResistanceAlert()

    return false
  }

  return true
})
}


export const lockJsPlumbCircuit = (instance, containerElement) => {
  getAllConnections(instance).forEach((connection) => {
    connection.setDetachable?.(false)

    connection.endpoints?.forEach((endpoint) => {
      endpoint.setEnabled?.(false)
    })
  })

  containerElement?.classList.add('connection-lab--locked')
}

export const validateTheveninConnections = (
  instance,
  experimentCase,
) => {

  const totalConnections = getAllConnections(instance).length

  const checkPair = (a, b) =>
    hasConnectionBetween(instance, a, b)

  // CASE 1
  if (experimentCase === 1) {

    const isCorrect =
      checkPair('9-endpoint', '10-endpoint') &&
      checkPair('5-endpoint', '11-endpoint') &&
      checkPair('6-endpoint', '13-endpoint') &&
      totalConnections === 3

    return {
      isCorrect,
      matchedCount: isCorrect ? 3 : 0,
      totalConnections,
    }
  }

  // CASE 2
  if (experimentCase === 2) {

    const isCorrect =
      checkPair('7-endpoint', '9-endpoint') &&
      checkPair('8-endpoint', '10-endpoint') &&
      checkPair('1-endpoint', '11-endpoint') &&
      checkPair('2-endpoint', '13-endpoint') &&
      totalConnections === 4

    return {
      isCorrect,
      matchedCount: isCorrect ? 4 : 0,
      totalConnections,
    }
  }

  // CASE 3
  if (experimentCase === 3) {

    const isCorrect =
      checkPair('7-endpoint', '9-endpoint') &&
      checkPair('8-endpoint', '10-endpoint') &&
      checkPair('3-endpoint', '11-endpoint') &&
      checkPair('4-endpoint', '12-endpoint') &&
      checkPair('13-endpoint', '14-endpoint') &&
      totalConnections === 5

    return {
      isCorrect,
      matchedCount: isCorrect ? 5 : 0,
      totalConnections,
    }
  }

  return {
    isCorrect: false,
    matchedCount: 0,
    totalConnections,
  }
}

export const autoConnectTheveninCircuit = (
  instance,
  experimentCase,
) => {
  
const connections = getAllConnections(instance)

if (experimentCase !== 3) {
  if (connections.length > 0) {
    return {
      success: false,
      reason: 'REMOVE_CONNECTIONS_FIRST',
    }
  }
}

if (experimentCase === 3) {

  const allowedConnections = connections.filter((connection) => {

    const source = connection.sourceId || connection.source?.id
    const target = connection.targetId || connection.target?.id

    return (
      (source === '7-endpoint' && target === '9-endpoint') ||
      (source === '9-endpoint' && target === '7-endpoint') ||

      (source === '8-endpoint' && target === '10-endpoint') ||
      (source === '10-endpoint' && target === '8-endpoint')
    )
  })

  if (allowedConnections.length !== connections.length) {
    return {
      success: false,
      reason: 'REMOVE_CONNECTIONS_FIRST',
    }
  }
}
  const connectPair = (a, b) => {
    if (hasConnectionBetween(instance, a, b)) return

    instance.connect({
      uuids: [a, b],
      type: isNegativeTerminal(a)
        ? 'negative'
        : 'positive',
    })
  }

  // CASE 1
  if (experimentCase === 1) {
    connectPair('9-endpoint', '10-endpoint')
    connectPair('5-endpoint', '11-endpoint')
    connectPair('6-endpoint', '13-endpoint')
  }

  // CASE 2
  if (experimentCase === 2) {
    connectPair('7-endpoint', '9-endpoint')
    connectPair('8-endpoint', '10-endpoint')
    connectPair('1-endpoint', '11-endpoint')
    connectPair('2-endpoint', '13-endpoint')
  }

  // CASE 3
  if (experimentCase === 3) {
    connectPair('7-endpoint', '9-endpoint')
    connectPair('8-endpoint', '10-endpoint')
    connectPair('3-endpoint', '11-endpoint')
    connectPair('4-endpoint', '12-endpoint')
    connectPair('13-endpoint', '14-endpoint')
  }

  return {
  success: true,
}
}