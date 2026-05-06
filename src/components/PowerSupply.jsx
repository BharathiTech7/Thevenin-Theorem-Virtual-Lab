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
      <span
        id="1-endpoint"
        className="connection-terminal connection-terminal--power connection-terminal--power-plus"
        data-polarity="plus"
        aria-label="Power supply positive terminal 1"
      />
      <span
        className="terminal-number-label terminal-number-label--power-plus"
        data-terminal-id="1-endpoint"
      >
        1
      </span>

      <span
        id="2-endpoint"
        className="connection-terminal connection-terminal--power connection-terminal--power-minus"
        data-polarity="minus"
        aria-label="Power supply negative terminal 2"
      />
      <span
        className="terminal-number-label terminal-number-label--power-minus"
        data-terminal-id="2-endpoint"
      >
        2
      </span>
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
          max="20"
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
