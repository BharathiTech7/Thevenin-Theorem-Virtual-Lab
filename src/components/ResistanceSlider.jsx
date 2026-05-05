const ResistanceSlider = ({ label, onChange, value }) => (
  <div className="resistance-slider">
    <label className="resistance-slider__label" htmlFor={`${label}-slider`}>
      {label.slice(0, 1)}
      <sub>{label.slice(1)}</sub> (&Omega;)
    </label>

    <div className="resistance-slider__control">
      <input
        aria-label={`${label} resistance`}
        className="resistance-slider__input"
        id={`${label}-slider`}
        max="50"
        min="1"
        onChange={(event) => onChange(Number(event.target.value))}
        step="1"
        type="range"
        value={value}
      />
    </div>

    <output className="resistance-slider__value" htmlFor={`${label}-slider`}>
      {value}
    </output>
  </div>
)

export default ResistanceSlider
