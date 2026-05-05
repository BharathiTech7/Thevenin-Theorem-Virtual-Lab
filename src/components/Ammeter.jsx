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

const Ammeter = ({ label, value = 0 }) => {
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

      <div
        className="ammeter__needle"
        style={{
          transform: `rotate(${angle}deg)`,
        }}
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
