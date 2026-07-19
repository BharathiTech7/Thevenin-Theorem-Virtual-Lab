import voltmeterImg from '../assets/Voltmeter.png'
import needleImg from '../assets/needle.png'
import { useEffect, useState } from 'react'
const METER_MAX_VOLTAGE = 30
const DIAL_START_ANGLE = 180
const DIAL_SWEEP_ANGLE = 180

const terminals = {
  positive: 1,
  negative: 2,
}
const Voltmeter = ({ value = 0, powerOn }) => {
  const voltage = Number.isFinite(value) ? value : 0


  const [displayVoltage, setDisplayVoltage] = useState(0)

useEffect(() => {
  if (!powerOn) {
    setDisplayVoltage(0)
  } else if (voltage > 0) {
    setDisplayVoltage(voltage)
  }
}, [powerOn, voltage])
 const ratio = Math.min(
  Math.max(displayVoltage / METER_MAX_VOLTAGE, 0),
  1,
)

  const angle = DIAL_START_ANGLE + ratio * DIAL_SWEEP_ANGLE

  return (
    <article
      className="ammeter ammeter--voltmeter"
      id="voltmeter"
      aria-label="Voltmeter"
    >
      <img
        src={voltmeterImg}
        alt="Voltmeter"
        className="ammeter__image"
      />

      <span
        id="1-endpoint"
        className="connection-terminal connection-terminal--meter connection-terminal--meter-plus connection-terminal--endpoint-1"
        data-polarity="plus"
      />

      <span
        className="terminal-number-label terminal-number-label--meter-plus terminal-number-label--endpoint-1"
        data-terminal-id="1-endpoint"
      >
        1
      </span>

      <span
        id="2-endpoint"
        className="connection-terminal connection-terminal--meter connection-terminal--meter-minus connection-terminal--endpoint-2"
        data-polarity="minus"
      />

      <span
        className="terminal-number-label terminal-number-label--meter-minus terminal-number-label--endpoint-2"
        data-terminal-id="2-endpoint"
      >
        2
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

export default Voltmeter