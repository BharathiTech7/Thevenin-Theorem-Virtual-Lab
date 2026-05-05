import SectionCard from './SectionCard.jsx'
import {
  AddIcon,
  CheckIcon,
  PlotIcon,
  PrintIcon,
  ResetIcon,
} from './Icons.jsx'

const buttons = [
  {
    label: 'CHECK',
    tone: 'action-button--green',
    Icon: CheckIcon,
    handler: 'onCheck',
  },
  {
    label: 'ADD',
    tone: 'action-button--blue',
    Icon: AddIcon,
    handler: 'onAdd',
  },
  {
    label: 'PLOT',
    tone: 'action-button--orange',
    Icon: PlotIcon,
    handler: 'onPlot',
  },
  {
    label: 'RESET',
    tone: 'action-button--red',
    Icon: ResetIcon,
    handler: 'onReset',
  },
  {
    label: 'PRINT',
    tone: 'action-button--purple',
    Icon: PrintIcon,
    handler: 'onPrint',
  },
]

const ActionButtons = ({ onAdd, onCheck, onPlot, onPrint, onReset }) => {
  const handlers = {
    onAdd,
    onCheck,
    onPlot,
    onPrint,
    onReset,
  }

  return (
    <SectionCard className="h-[154px]" icon="buttons" title="ACTION BUTTONS">
      <div className="flex h-full items-center justify-between px-[22px] pt-[18px]">
        {buttons.map(({ label, tone, Icon, handler }) => (
          <button
            className={`action-button ${tone}`}
            key={label}
            onClick={handlers[handler]}
            type="button"
          >
            <Icon />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </SectionCard>
  )
}

export default ActionButtons
