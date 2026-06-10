

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
  const entered = Number(userCalculatedIL)
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

        <p>
          <strong>Thevenin Equivalent Voltage (VTH):</strong>{' '}
          {calculationDone ? Number(vth).toFixed(3) : ''}
        </p>

        <p>
          <strong>Thevenin Equivalent Resistance (RTH):</strong>{' '}
          {calculationDone ? Number(rth).toFixed(3) : ''}
        </p>

        <p>
          <strong>Load Resistance (RL):</strong>{' '}
          {calculationDone ? rl : ''}
        </p>

        <hr />

        <p>
          <strong>Formula:</strong>
        </p>

        <p>
          IL = VTH / (RTH + RL)
        </p>

        <hr />

        <p>
          <strong>Observed IL:</strong>{' '}
          {calculationDone ? Number(observedIL).toFixed(6) : ''}
        </p>

        <div>
          <strong>Calculated IL:</strong>{' '}
          <input
            type="number"
            step="0.000001"
            value={userCalculatedIL}
onChange={(e) => setUserCalculatedIL(e.target.value)}
            disabled={!calculationDone}
          />
        </div>

       <button
  type="button"
  onClick={handleVerify}
>
  VERIFY
</button>

        {verificationResult && (
          <p>
            <strong>{verificationResult}</strong>
          </p>
        )}

          </div>
    </div>
  </section>
)
}

export default CalculationPanel