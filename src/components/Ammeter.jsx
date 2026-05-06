import a1Img from '../assets/A1.png'
import a2Img from '../assets/A2.png'
import a3Img from '../assets/A3.png'
import needleImg from '../assets/needle.png'

const meterMax = {
  A1: 5,
  A2: 2.5,
  A3: 2.5,
}

const ammeterImages = {
  A1: a1Img,
  A2: a2Img,
  A3: a3Img,
}

const terminalNumbers = {
  A1: { positive: 3, negative: 4 },
  A2: { positive: 5, negative: 6 },
  A3: { positive: 7, negative: 8 },
}

const Ammeter = ({ label, value = 0 }) => {
  const terminals = terminalNumbers[label]
  const max = meterMax[label] || 5
  const ratio = Math.min(Math.max(value / max, 0), 1)
  const angle = 180 + ratio * 180

  return (
    <article className={`ammeter ammeter--${label}`} aria-label={`${label} ammeter`}>
      <img
        src={ammeterImages[label]}
        alt={`${label} ammeter`}
        className="ammeter__image"
      />

      <span
        id={`${terminals.positive}-endpoint`}
        className="connection-terminal connection-terminal--meter connection-terminal--meter-plus"
        data-polarity="plus"
        aria-label={`${label} positive terminal ${terminals.positive}`}
      />
      <span
        className="terminal-number-label terminal-number-label--meter-plus"
        data-terminal-id={`${terminals.positive}-endpoint`}
      >
        {terminals.positive}
      </span>

      <span
        id={`${terminals.negative}-endpoint`}
        className="connection-terminal connection-terminal--meter connection-terminal--meter-minus"
        data-polarity="minus"
        aria-label={`${label} negative terminal ${terminals.negative}`}
      />
      <span
        className="terminal-number-label terminal-number-label--meter-minus"
        data-terminal-id={`${terminals.negative}-endpoint`}
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
