import multimeterImg from '../assets/multimeter.png'
import knobImg from '../assets/knob.png'
const DigitalMultimeter = ({ value = 0 }) => {
  const resistance = Number.isFinite(value) ? value : 0
let knobAngle = 0

if (resistance > 0) {
  if (resistance <= 200)
    knobAngle = 40
  else if (resistance <= 2000)
    knobAngle = 70
  else if (resistance <= 20000)
    knobAngle = 100
  else if (resistance <= 200000)
    knobAngle = 130
  else
    knobAngle = 160
}
  return (
    <article
      className="ammeter ammeter--multimeter"
      id="multimeter"
      aria-label="Digital Multimeter"
    >
      <img
        src={multimeterImg}
        alt="Digital Multimeter"
        className="ammeter__image"
      />
<div
  className="multimeter-knob"
  style={{
    transform: `rotate(${knobAngle}deg)`
  }}
>
  <img
    src={knobImg}
    alt="Knob"
    className="multimeter-knob-image"
  />
</div>
      <span
        id="5-endpoint"
        className="connection-terminal connection-terminal--meter connection-terminal--meter-plus connection-terminal--endpoint-5"
        data-polarity="plus"
      />

      <span
        className="terminal-number-label terminal-number-label--meter-plus terminal-number-label--endpoint-5"
        data-terminal-id="5-endpoint"
      >
        5
      </span>

      <span
        id="6-endpoint"
        className="connection-terminal connection-terminal--meter connection-terminal--meter-minus connection-terminal--endpoint-6"
        data-polarity="minus"
      />

      <span
        className="terminal-number-label terminal-number-label--meter-minus terminal-number-label--endpoint-6"
        data-terminal-id="6-endpoint"
      >
        6
      </span>

   <div className="multimeter-display">
  {resistance > 0
    ? `${resistance.toFixed(2)} Ω`
    : '0.00 Ω'}
</div>
    </article>
  )
}

export default DigitalMultimeter