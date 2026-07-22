import ammeterImg from '../assets/Ammeter.png'
import needleImg from '../assets/needle.png'
import { useEffect, useState } from 'react'
const METER_MAX_CURRENT = 5
const DIAL_START_ANGLE = 180
const DIAL_SWEEP_ANGLE = 180
import {
  getTerminalConnectedClass,
  getTerminalHighlightClass,
  getTerminalNumberHighlightClass,
} from '../utils/terminalHighlight.js'
const ammeterImages = {
  A1: ammeterImg,
}

const terminalNumbers = {
  A1: { positive: 3, negative: 4 },
  A2: { positive: 5, negative: 6 },
  A3: { positive: 7, negative: 8 },
}


const Ammeter = ({
  connectedTerminalIds = [],
  highlightedTerminalIds = [],
  label,
  value = 0,
  powerOn,
}) => {
  const terminals = terminalNumbers[label]
  const current = Number.isFinite(value) ? value : 0
  const [displayCurrent, setDisplayCurrent] = useState(0)

useEffect(() => {
  if (!powerOn) {
    setDisplayCurrent(0)
  } else if (current > 0) {
    setDisplayCurrent(current)
  }
}, [powerOn, current])
 const ratio = Math.min(
  Math.max(displayCurrent / METER_MAX_CURRENT, 0),
  1,
)
  const angle = DIAL_START_ANGLE + ratio * DIAL_SWEEP_ANGLE

  return (
    <article className={`ammeter ammeter--${label}`} id={`ammeter-${label.toLowerCase()}`} aria-label={`${label} ammeter`}>
      <img
        src={ammeterImages[label]}
        alt={`${label} ammeter`}
        className="ammeter__image"
      />

      <span
        id={`${terminals.positive}-endpoint`}
className={`connection-terminal connection-terminal--meter connection-terminal--meter-plus connection-terminal--endpoint-${terminals.positive}${getTerminalConnectedClass(connectedTerminalIds, `${terminals.positive}-endpoint`)}${getTerminalHighlightClass(highlightedTerminalIds, `${terminals.positive}-endpoint`)}`}
        data-polarity="plus"
        aria-label={`${label} positive terminal ${terminals.positive}`}
        title={`${label} positive (${terminals.positive}-endpoint)`}
      />
      <span
className={`terminal-number-label terminal-number-label--meter-plus terminal-number-label--endpoint-${terminals.positive}${getTerminalNumberHighlightClass(highlightedTerminalIds, `${terminals.positive}-endpoint`)}`}
        data-terminal-id={`${terminals.positive}-endpoint`}
        title={`${label} positive (${terminals.positive}-endpoint)`}
      >
        {terminals.positive}
      </span>

      <span
        id={`${terminals.negative}-endpoint`}
className={`connection-terminal connection-terminal--meter connection-terminal--meter-minus connection-terminal--endpoint-${terminals.negative}${getTerminalConnectedClass(connectedTerminalIds, `${terminals.negative}-endpoint`)}${getTerminalHighlightClass(highlightedTerminalIds, `${terminals.negative}-endpoint`)}`}
        data-polarity="minus"
        aria-label={`${label} negative terminal ${terminals.negative}`}
        title={`${label} negative (${terminals.negative}-endpoint)`}
      />
      <span
className={`terminal-number-label terminal-number-label--meter-minus terminal-number-label--endpoint-${terminals.negative}${getTerminalNumberHighlightClass(highlightedTerminalIds, `${terminals.negative}-endpoint`)}`}
        data-terminal-id={`${terminals.negative}-endpoint`}
        title={`${label} negative (${terminals.negative}-endpoint)`}
      >
        {terminals.negative}
      </span>

      <div
        className="ammeter__needle"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <img
          src={needleImg}
          alt="Needle"
          className="ammeter__needle-image"
        />
      </div>
    </article>
  )
}

export default Ammeter
