import Ammeter from './Ammeter.jsx'
import DigitalMultimeter from './DigitalMultimeter.jsx'
import PowerSupply from './PowerSupply.jsx'
import Voltmeter from './Voltmeter.jsx'

const EquipmentPanel = ({
  onTogglePower,
  powerOn,
  readings,
  experimentCase,
  setVoltage,
  voltage,
    showMultimeter,
}) => (
  
  <section className="equipment-panel" id="equipment-panel">

<Voltmeter
  powerOn={powerOn}
  value={
    experimentCase === 2
      ? readings.vth
      : 0
  }
/>

<Ammeter
  label="A1"
  powerOn={powerOn}
  value={
    experimentCase === 3
      ? readings.il
      : 0
  }
/>

<DigitalMultimeter
  value={readings.rth}
  showValue={showMultimeter}
/>
  </section>
)


export default EquipmentPanel