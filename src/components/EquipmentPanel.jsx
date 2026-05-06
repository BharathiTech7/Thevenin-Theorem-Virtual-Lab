
import Ammeter from './Ammeter.jsx'
import PowerSupply from './PowerSupply.jsx'

const EquipmentPanel = ({ powerOn, readings, setPowerOn, setVoltage, voltage }) => (
  <section className="equipment-panel">
    <PowerSupply
      powerOn={powerOn}
      setPowerOn={setPowerOn}
      setVoltage={setVoltage}
      voltage={voltage}
    />

    <Ammeter label="A1" value={readings.i1} />
    <Ammeter label="A2" value={readings.i2} />
    <Ammeter label="A3" value={readings.i3} />
  </section>
)

export default EquipmentPanel
