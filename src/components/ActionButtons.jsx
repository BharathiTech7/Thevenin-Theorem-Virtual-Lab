import SectionCard from './SectionCard.jsx'
import {
  AddIcon,
  AiGuide,
  AutoConnectIcon,
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
    handlerName: 'onCheck',
  },
  {
    label: 'ADD',
    tone: 'action-button--blue',
    Icon: AddIcon,
    handlerName: 'onAdd',
  },
  {
    label: 'PLOT',
    tone: 'action-button--orange',
    Icon: PlotIcon,
    handlerName: 'onPlot',
  },
  {
    label: 'RESET',
    tone: 'action-button--red',
    Icon: ResetIcon,
    handlerName: 'onReset',
  },
  {
    label: 'PRINT',
    tone: 'action-button--purple',
    Icon: PrintIcon,
    handlerName: 'onPrint',
  },
  {
    label: 'AUTO CONNECT',
    tone: 'action-button--teal',
    Icon: AutoConnectIcon,
    handlerName: 'onAutoConnect',
  },
  {
    label: 'AI GUIDE',
    tone: 'action-button--cyan',
    Icon: AiGuide,
    handlerName: 'onAiGuide',
  },
]

const ActionButtons = ({
  onAdd,
  onCheck,
  onPlot,
  onPrint,
  onReset,
  onAutoConnect,
  onAiGuide,
}) => {
  const handlers = {
    onAdd,
    onCheck,
    onPlot,
    onPrint,
    onReset,
    onAutoConnect,
    onAiGuide,
  }

  return (
    <SectionCard className="h-[176px]" icon="buttons" title="ACTION BUTTONS">
      <div className="action-buttons__grid">
        {buttons.map(({ label, tone, Icon, handlerName }) => (
          <button
            key={label}
            type="button"
            className={`action-button ${tone}`}
            onClick={handlers[handlerName]}
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
