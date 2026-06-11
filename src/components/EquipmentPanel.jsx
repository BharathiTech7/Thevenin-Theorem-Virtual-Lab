import Ammeter from './Ammeter.jsx'
import DigitalMultimeter from './DigitalMultimeter.jsx'
import PowerSupply from './PowerSupply.jsx'
import Voltmeter from './Voltmeter.jsx'

const EquipmentPanel = ({
  onTogglePower,
  powerOn,
  readings,
  setVoltage,
  voltage,
}) => (
  <section className="equipment-panel" id="equipment-panel">

    <Voltmeter value={readings.vth} />

    <Ammeter label="A1" value={readings.il} />

    <DigitalMultimeter value={readings.rth} />
  </section>
)

export default EquipmentPanel