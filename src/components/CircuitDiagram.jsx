import { Fragment } from 'react'

import circuitImage from '../assets/circuit.png'
const terminalLabels = [
  {
    id: '9-endpoint',
    label: '9',
    polarity: 'plus',
    endpointClassName: 'left-[34px] top-[212px]',
    labelClassName: 'left-[10px] top-[209px]',
  },
  {
    id: '10-endpoint',
    label: '10',
    polarity: 'minus',
    endpointClassName: 'left-[34px] top-[264px]',
    labelClassName: 'left-[10px] top-[261px]',
  },
  {
    id: '11-endpoint',
    label: '11',
    polarity: 'plus',
    endpointClassName: 'left-[190px] top-[66px]',
    labelClassName: 'left-[198px] top-[39px]',
  },
  {
    id: '12-endpoint',
    label: '12',
    polarity: 'minus',
    endpointClassName: 'left-[258px] top-[66px]',
    labelClassName: 'left-[266px] top-[39px]',
  },
  {
    id: '13-endpoint',
    label: '13',
    polarity: 'plus',
    endpointClassName: 'left-[502px] top-[196px]',
    labelClassName: 'left-[530px] top-[193px]',
  },
  {
    id: '14-endpoint',
    label: '14',
    polarity: 'minus',
    endpointClassName: 'left-[502px] top-[246px]',
    labelClassName: 'left-[530px] top-[243px]',
  },
  {
    id: '15-endpoint',
    label: '15',
    polarity: 'plus',
    endpointClassName: 'left-[722px] top-[66px]',
    labelClassName: 'left-[730px] top-[39px]',
  },
  {
    id: '16-endpoint',
    label: '16',
    polarity: 'minus',
    endpointClassName: 'left-[790px] top-[66px]',
    labelClassName: 'left-[798px] top-[39px]',
  },
]

const CircuitDiagram = ({ className = '', r1, r2, r3 }) => (
  <section className={`circuit-panel ${className}`}>
    <div className="circuit-panel__stage">
      <img alt="Kirchhoff current law circuit diagram" className="circuit-panel__image" src={circuitImage} />

      {terminalLabels.map(({ endpointClassName, id, label, labelClassName, polarity }) => (
        <Fragment key={id}>
          <span
            id={id}
            className={`connection-terminal connection-terminal--circuit ${endpointClassName}`}
            data-polarity={polarity}
            aria-label={`Circuit terminal ${label}`}
          />
          <span
            className={`terminal-number-label terminal-number-label--circuit ${labelClassName}`}
            data-terminal-id={id}
          >
            {label}
          </span>
        </Fragment>
      ))}

      <span className="resistor-value left-[336px] top-[160px]">{r1} &Omega;</span>
      <span className="resistor-value left-[515px] top-[334px]">{r2} &Omega;</span>
      <span className="resistor-value left-[600px] top-[160px]">{r3} &Omega;</span>
    </div>
  </section>
)

export default CircuitDiagram
