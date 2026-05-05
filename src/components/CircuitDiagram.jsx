import circuitImage from '../assets/circuit.png'

const terminalLabels = [
  { label: '9', className: 'left-[34px] top-[212px]' },
  { label: '10', className: 'left-[34px] top-[264px]' },
  { label: '11', className: 'left-[190px] top-[66px]' },
  { label: '12', className: 'left-[258px] top-[66px]' },
  { label: '13', className: 'left-[502px] top-[196px]' },
  { label: '14', className: 'left-[502px] top-[246px]' },
  { label: '15', className: 'left-[722px] top-[66px]' },
  { label: '16', className: 'left-[790px] top-[66px]' },
]

const CircuitDiagram = ({ r1, r2, r3 }) => (
  <section className="circuit-panel">
    <h2 className="circuit-panel__title">CIRCUIT DIAGRAM</h2>

    <div className="circuit-panel__stage">
      <img alt="Kirchhoff current law circuit diagram" className="circuit-panel__image" src={circuitImage} />

      {terminalLabels.map(({ className, label }) => (
        <span className={`terminal-label ${className}`} key={label}>
          {label}
        </span>
      ))}

      <span className="resistor-value left-[336px] top-[160px]">{r1} &Omega;</span>
      <span className="resistor-value left-[515px] top-[334px]">{r2} &Omega;</span>
      <span className="resistor-value left-[600px] top-[160px]">{r3} &Omega;</span>
    </div>
  </section>
)

export default CircuitDiagram
