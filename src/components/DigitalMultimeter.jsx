import multimeterImg from '../assets/multimeter.png'

const DigitalMultimeter = ({ value = 0 }) => {
  const resistance = Number.isFinite(value) ? value : 0

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

      <div
        style={{
          position: 'absolute',
          top: '58px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontWeight: 'bold',
          fontSize: '14px',
        }}
      >
        {resistance.toFixed(2)}
      </div>
    </article>
  )
}

export default DigitalMultimeter