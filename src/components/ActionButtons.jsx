import { useState } from 'react'
import SectionCard from './SectionCard.jsx'
import {
  AddIcon,
  AiGuide,
  ButtonIcon,
  CheckIcon,
  CalculateIcon,
  CloseIcon,
  PrintIcon,
  ResetIcon,
} from './Icons.jsx'

const buttons = [
  {
    id: 'instruction-button',
    label: 'INSTRUCTION',
    tone: 'action-button--gold',
    Icon: ButtonIcon,
    opensInstructions: true,
  },
  {
    id: 'ai-guide-button',
    label: 'AI GUIDE',
    tone: 'action-button--cyan',
    Icon: AiGuide,
    handlerName: 'onAiGuide',
  },
  {
    id: 'check-button',
    label: 'CHECK',
    tone: 'action-button--green',
    Icon: CheckIcon,
    handlerName: 'onCheck',
  },
  {
    id: 'add-reading-button',
    label: 'ADD',
    tone: 'action-button--blue',
    Icon: AddIcon,
    handlerName: 'onAdd',
  },
  {
  id: 'calculate-button',
  label: 'CALCULATE',
  tone: 'action-button--orange',
  Icon: CalculateIcon,
  handlerName: 'onCalculate',
},
  {
    id: 'reset-button',
    label: 'RESET',
    tone: 'action-button--red',
    Icon: ResetIcon,
    handlerName: 'onReset',
  },
  {
    id: 'print-button',
    label: 'PRINT',
    tone: 'action-button--purple',
    Icon: PrintIcon,
    handlerName: 'onPrint',
  },
  
 
]

const ActionButtons = ({
  activeButtons = {},
  disabledButtons = {},
  onAdd,
  onAiGuide,
  onCheck,
  onCalculate,
  onPrint,
  onReset,
}) => {
  const [instructionsOpen, setInstructionsOpen] = useState(false)
  const handlers = {
    onAdd,
    onCalculate,
    onCheck,
    onPrint,
    onAiGuide,
  }

  return (
    <SectionCard className="action-buttons-card h-[176px]" icon="buttons" id="action-buttons-panel" title="ACTION BUTTONS">
      <div className="action-buttons__grid">
        {buttons.map(({ id, label, tone, Icon, handlerName, opensInstructions }) => {
          const handler = handlers[handlerName]
          const isActive = !opensInstructions && Boolean(activeButtons[handlerName])
          const isDisabled = !opensInstructions && (!handler || disabledButtons[handlerName])
          const buttonProps = opensInstructions
            ? {
                'aria-controls': 'experiment-instructions-panel',
                'aria-expanded': instructionsOpen,
                onClick: () => setInstructionsOpen((current) => !current),
              }
            : {
                'aria-pressed': handlerName === 'onAiGuide' ? isActive : undefined,
                onClick: handler,
                title: handlerName === 'onAiGuide' && isActive ? 'Click to stop narration' : undefined,
              }

          return (
            <button
              id={id}
              key={label}
              type="button"
              className={`action-button ${tone} ${isActive ? 'action-button--active' : ''}`}
              disabled={isDisabled}
              {...buttonProps}
            >
              <Icon />
              <span>{label}</span>
            </button>
          )
        })}
      </div>

      {instructionsOpen ? (
        <div
          className="action-instructions-panel"
          id="experiment-instructions-panel"
          role="region"
          aria-labelledby="experiment-instructions-title"
        >
          <div className="action-instructions-panel__header">
            <h3 id="experiment-instructions-title">Instructions</h3>
            <button
              type="button"
              className="action-instructions-panel__close"
              aria-label="Close instructions"
              onClick={() => setInstructionsOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="action-instructions-panel__body">
            <ol className="action-instructions-panel__steps">

  <li>
    <strong>STEP 1:</strong> Set the values of resistances R1, R2, R3 and RL using the sliders.
  </li>

  <li>
    <strong>STEP 2:</strong> Perform the following cases.
    
    <ol className="action-instructions-panel__substeps" type="a">
      <li>
  <strong>Case 1 (Measure RTH):</strong>
  <ul>
    <li>Short circuit terminals (9-10).</li>
    <li>Connect Multimeter (5-11 and 6-13).</li>
    <li>Click CHECK.</li>
    <li>Click ADD to record RTH.</li>
    <li>Remove connections (9-10), (5-11), (6-13) by clicking the corresponding terminal labels.</li>
  </ul>
</li>

      <li>
  <strong>Case 2 (Measure VTH):</strong>
  <ul>
    <li>Connect Power Supply (7-9 and 8-10).</li>
    <li>Connect Voltmeter (1-11 and 2-13).</li>
    <li>Click CHECK.</li>
    <li>Turn ON Power Supply.</li>
    <li>Adjust Voltage.</li>
    <li>Click ADD to record VTH.</li>
    <li>Remove connections (1-11 and 2-13) by clicking the corresponding terminal labels.</li>
  </ul>
</li>

      <li>
        <strong>Case 3 (Measure IL):</strong>
        <ul>
          <li>Connect Power Supply (7-9 and 8-10).</li>
          <li>Connect Ammeter (3-11, 4-12 and 13-14).</li>
          <li>Click CHECK.</li>
          <li>Turn ON Power Supply.</li>
          <li>Adjust Voltage.</li>
          <li>Click ADD to record IL.</li>
        </ul>
      </li>
    </ol>
  </li>

  <li>
    <strong>STEP 3:</strong> Click CALCULATE to calculate load current (IL).
  </li>

  <li>
    <strong>STEP 4:</strong> Enter the manually calculated IL value and click VERIFY.
  </li>

  <li>
    <strong>STEP 5:</strong> Click PRINT to print the experiment report.
  </li>

  <li>
    <strong>STEP 6:</strong> Click RESET to restart the experiment.
  </li>
  <li>
  <strong>Note:</strong> Any connection can be removed by clicking its corresponding terminal number label.
</li>

</ol>
          </div>
        </div>
      ) : null}
    </SectionCard>
  )
}

export default ActionButtons
