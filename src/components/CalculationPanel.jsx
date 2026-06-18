import { useLabAlerts } from '../alerts/useLabAlerts.js'
const CalculationPanel = ({
  calculationDone,
  calculatedValues,
  verificationResult,
  userCalculatedIL,
  setUserCalculatedIL,
  setVerificationResult,
}) => {
  const vth = calculatedValues?.vth ?? '';
  const rth = calculatedValues?.rth ?? '';
  const rl = calculatedValues?.rl ?? '';
  const observedIL = calculatedValues?.observedIL ?? '';
  const { showStepAlert } = useLabAlerts()

  const handleVerify = () => {
    if (!calculationDone) {
      return;
    }

  if (userCalculatedIL.trim() === '') {
  showStepAlert({
    title: 'Input Required',
    description: 'Please enter the calculated IL value.',
    type: 'warning',
  });

  return;
}

const entered = Number(userCalculatedIL);

if (Number.isNaN(entered)) {
  showStepAlert({
    title: 'Invalid Input',
    description: 'Please enter a valid numerical value.',
    type: 'warning',
  });

  return;
}

    const actual = Number(observedIL);

const isCorrect =
  Math.abs(entered - actual) < 0.001;

if (isCorrect) {
  showStepAlert({
    title: 'Calculation Verified',
    description:
      'Your calculated load current matches the observed value.',
    type: 'success',
  });

  setVerificationResult('✅ Verified Successfully');
} else {
  showStepAlert({
    title: 'Calculation Incorrect',
    description:
      'The calculated load current does not match the observed value. Please verify your calculation using IL = VTH / (RTH + RL).',
    type: 'error',
  });

  setVerificationResult('❌ Incorrect Calculation');
}
  };

return (
  <section
    id="calculation-panel"
    className="graph-panel graph-panel--separate"
  >
    <div className="graph-panel__heading">
      <div>
        <h2>CALCULATIONS</h2>
      </div>
    </div>

    <div className="graph-panel__body">

      {/* VTH */}
      <div className="calc-field">

        <div className="calc-label">
          Thevenin Equivalent Voltage:
        </div>

        <div className="calc-input-group">

          <div className="calc-prefix">
            Vth
          </div>

          <div className="calc-display">
            {calculationDone
              ? Number(vth).toFixed(3)
              : ''}
          </div>

          <div className="calc-suffix">
            V
          </div>

        </div>

      </div>

      {/* RTH */}
      <div className="calc-field">

        <div className="calc-label">
          Thevenin Equivalent Resistance:
        </div>

        <div className="calc-input-group">

          <div className="calc-prefix">
            Rth
          </div>

          <div className="calc-display">
            {calculationDone
              ? Number(rth).toFixed(3)
              : ''}
          </div>

          <div className="calc-suffix">
            Ω
          </div>

        </div>

      </div>

      {/* RL */}
      <div className="calc-field">

        <div className="calc-label">
          Load Resistance:
        </div>

        <div className="calc-input-group">

          <div className="calc-prefix">
            RL
          </div>

          <div className="calc-display">
            {calculationDone
              ? Number(rl).toFixed(3)
              : ''}
          </div>

          <div className="calc-suffix">
            Ω
          </div>

        </div>

      </div>

      {/* Formula */}
      <div className="formula-heading">
        Formula:
      </div>

      <div className="formula-panel">
        IL = VTH / (RTH + RL)
      </div>

      {/* Result Boxes */}
      <div className="results-section">

        <fieldset className="result-card">
          <legend>Observed Results</legend>

          <div className="result-row">

            <span className="result-label">
              Observed Load Current (IL):
            </span>

            <div className="result-display">
              {calculationDone
                ? Number(observedIL).toFixed(6)
                : ''}
            </div>

            <div className="result-unit">
              A
            </div>

          </div>
        </fieldset>

        <fieldset className="result-card">
          <legend>Verification</legend>

          <div className="result-row">

            <span className="result-label">
              Calculated Load Current (IL):
            </span>

            <input
              type="number"
              step="0.000001"
              value={userCalculatedIL}
              onChange={(e) =>
                setUserCalculatedIL(e.target.value)
              }
              disabled={!calculationDone}
              className="verification-input"
              placeholder="Enter value..."
            />

            <div className="result-unit">
              A
            </div>

          </div>
        </fieldset>

      </div>

      {/* Verify Button */}
      <div className="verification-section">

        <button
          type="button"
          onClick={handleVerify}
          disabled={!calculationDone}
          className="verify-btn"
        >
          Verify
        </button>

        {verificationResult && (
          <div
            className={`verification-message ${
              verificationResult.includes('Verified')
                ? 'success'
                : 'error'
            }`}
          >
            {verificationResult}
          </div>
        )}

      </div>

    </div>
  </section>
)
};

export default CalculationPanel;