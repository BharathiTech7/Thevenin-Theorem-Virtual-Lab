import { useState } from 'react'
import { FormulaIcon, PdfIcon } from './Icons.jsx'
const formulas = [
  {
    symbol: 'RTH',
    expression: 'RTH = R3 + (R1 × R2)/(R1 + R2)',
    description: 'Thevenin equivalent resistance',
  },
  {
    symbol: 'VTH',
    expression: 'VTH = VS × (R2/(R1 + R2))',
    description: 'Thevenin equivalent voltage',
  },
  {
    symbol: 'IL',
    expression: 'IL = VTH/(RTH + RL)',
    description: 'Load current through RL',
  },
  {
    symbol: 'R1||R2',
    expression: '(R1 × R2)/(R1 + R2)',
    description: 'Parallel resistance of R1 and R2',
  },
]
const ReportControls = ({
  minReadings,
  onGenerateReport,
  readingCount,
  reportGenerated,
}) => {
  const [formulasOpen, setFormulasOpen] = useState(false)
  const readingsReady = readingCount >= minReadings

  const buttonTitle = reportGenerated
    ? 'Report generated. Click to regenerate the report.'
    : `Generate report after ${minReadings} readings.`

  return (
  <div className="report-controls">

    {formulasOpen && (
      <aside className="floating-formula-panel">

        <div className="floating-formula-panel__header">
          <h3>Experiment Equations</h3>
        </div>

        <dl className="floating-formula-panel__list">

          {formulas.map((formula) => (
            <div
              key={formula.symbol}
              className="floating-formula-panel__item"
            >
              <dt>{formula.symbol}</dt>

              <dd>
                <span className="floating-formula-panel__equation">
                  {formula.expression}
                </span>

                <span className="floating-formula-panel__description">
                  {formula.description}
                </span>
              </dd>
            </div>
          ))}

        </dl>

        <p className="floating-formula-panel__note">
          Thevenin Verification:
          <br />
          IL = VTH / (RTH + RL)
        </p>

      </aside>
    )}

   
    <button
      id="generate-report-button"
      type="button"
      className="report-button"
      disabled={!readingsReady}
      title={buttonTitle}
      aria-label="Generate Report"
      data-report-generated={reportGenerated ? 'true' : 'false'}
      onClick={onGenerateReport}
    >
      <PdfIcon />
      <span>Generate Report</span>
    </button>
 <button
      type="button"
      className="formula-button"
      onClick={() => setFormulasOpen((current) => !current)}
    >
      <FormulaIcon />
      <span>Formulas</span>
    </button>

  </div>
)
}

export default ReportControls