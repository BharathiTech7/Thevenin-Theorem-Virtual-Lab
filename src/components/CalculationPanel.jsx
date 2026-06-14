

const CalculationPanel = ({
  calculationDone,
  calculatedValues,
  verificationResult,
  userCalculatedIL,
  setUserCalculatedIL,
  setVerificationResult,
})  => {


  const vth = calculatedValues?.vth ?? ''
  const rth = calculatedValues?.rth ?? ''
  const rl = calculatedValues?.rl ?? ''
  const observedIL = calculatedValues?.observedIL ?? ''
 
  const handleVerify = () => {
     if (!calculationDone) {
    return
  }
  if (userCalculatedIL.trim() === '') {
    setVerificationResult('⚠️ Please enter the calculated IL value')
    return
  }

  const entered = Number(userCalculatedIL)

  if (Number.isNaN(entered)) {
    setVerificationResult('⚠️ Enter a valid number')
    return
  }

  const actual = Number(observedIL)

  const isCorrect =
    Math.abs(entered - actual) < 0.001

  setVerificationResult(
    isCorrect
      ? '✅ Verified Successfully'
      : '❌ Incorrect Calculation'
  )
}
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
      <div className="p-6 flex flex-col gap-4">

     <div className="calc-line">
  <strong>Thevenin Equivalent Voltage (VTH):</strong>

  <span className="fill-blank">
    {calculationDone ? Number(vth).toFixed(3) : ''}
  </span>
</div>

<div className="calc-line">
  <strong>Thevenin Equivalent Resistance (RTH):</strong>

  <span className="fill-blank">
    {calculationDone ? Number(rth).toFixed(3) : ''}
  </span>
</div>

<div className="calc-line">
  <strong>Load Resistance (RL):</strong>

  <span className="fill-blank">
    {calculationDone ? Number(rl).toFixed(3) : ''}
  </span>
</div>

        <hr />

        <p>
          <strong>Formula:</strong>
        </p>

       <div className="formula-card">
  IL = VTH / (RTH + RL)
</div>

        <hr />

<div className="calc-row">
  <span>Observed IL :</span>

  <span className="fill-blank">
    {calculationDone
      ? Number(observedIL).toFixed(6)
      : ''}
  </span>
</div>
  <div className="calc-row">
  <span>Calculated IL :</span>

  <input
  type="number"
  step="0.000001"
  value={userCalculatedIL}
  onChange={(e) => setUserCalculatedIL(e.target.value)}
  disabled={!calculationDone}
  className="fill-blank-input"
  placeholder="Enter IL"
/>
</div>

 <div className="verification-section">
  <button
    type="button"
    onClick={handleVerify}
    disabled={!calculationDone}
    className="verify-btn"
  >
    VERIFY
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
    </div>
  </section>
)
}

export default CalculationPanel