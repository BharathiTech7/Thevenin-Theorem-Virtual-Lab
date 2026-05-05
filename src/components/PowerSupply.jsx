import powerSupplyOff from '../assets/PowerSupply_Off.png'
import powerSupplyOn from '../assets/PowerSupply_ON.png'

const PowerSupply = ({ powerOn, setPowerOn, setVoltage, voltage }) => {
  const displayedVoltage = powerOn ? voltage : 0

  return (
    <article className="power-supply">
      <img
        alt={powerOn ? 'Power supply switched on' : 'Power supply switched off'}
        className="power-supply__image"
        src={powerOn ? powerSupplyOn : powerSupplyOff}
      />

      <div className="power-supply__display">{displayedVoltage.toFixed(1)} V</div>

      <button
        aria-label={powerOn ? 'Switch power supply off' : 'Switch power supply on'}
        aria-pressed={powerOn}
        className="power-supply__button"
        onClick={() => setPowerOn((current) => !current)}
        type="button"
      />

      <label className="power-supply__control">
        <span className="sr-only">Voltage</span>
        <input
          aria-label="Voltage"
          className="voltage-range"
          max="30"
          min="0"
          onChange={(event) => setVoltage(Number(event.target.value))}
          step="0.5"
          type="range"
          value={voltage}
        />
      </label>
    </article>
  )
}

export default PowerSupply
