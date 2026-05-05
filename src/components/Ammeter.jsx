const meterMax = {
  A1: 5,
  A2: 2.5,
  A3: 2.5,
}

const scaleMarks = ['0', '1', '2', '3', '4', '5']

const Ammeter = ({ label, value }) => {
  const ratio = Math.min(Math.max(value / meterMax[label], 0), 1)
  const angle = 180 + ratio * 180

  return (
    <article aria-label={`${label} ammeter`} className="ammeter">
      <div className="ammeter__title">AMMETER</div>
      <div className="ammeter__face">
        <div className="ammeter__gauge">
          {scaleMarks.map((mark) => (
            <span className={`ammeter__mark ammeter__mark--${mark}`} key={mark}>
              {mark}
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="ammeter__needle"
          style={{ '--needle-angle': `${angle}deg` }}
        />
        <div aria-hidden="true" className="ammeter__pivot" />
        <div className="ammeter__name">{label}</div>
        <div className="ammeter__terminal ammeter__terminal--plus" />
        <div className="ammeter__terminal ammeter__terminal--minus" />
        <span className="ammeter__polarity ammeter__polarity--plus">+</span>
        <span className="ammeter__polarity ammeter__polarity--minus">-</span>
      </div>
      <span className="ammeter__value">{value.toFixed(2)} A</span>
    </article>
  )
}

export default Ammeter
