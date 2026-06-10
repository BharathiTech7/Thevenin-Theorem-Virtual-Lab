export const generateTheveninReport = ({
  observations,
  r1,
  r2,
  r3,
  rl,
  vth,
  rth,
  observedIL,
  userCalculatedIL,
  verificationResult,
}) => {
  const reportWindow = window.open('', '_blank')

  if (!reportWindow) {
    window.alert('Unable to open report window.')
    return
  }

  const observationRows = observations
    .map(
      (row) => `
        <tr>
          <td>${row.id}</td>
          <td>${row.vth.toFixed(2)}</td>
          <td>${row.rth.toFixed(2)}</td>
          <td>${row.rl}</td>
          <td>${row.il.toFixed(4)}</td>
        </tr>
      `,
    )
    .join('')

  reportWindow.document.write(`
    <html>
      <head>
        <title>Thevenin Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 30px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
          }

          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
          }

          h1, h2 {
            text-align: center;
          }
        </style>
      </head>

      <body>

        <h1>Virtual Labs</h1>
        <h2>Verification of Thevenin's Theorem</h2>

        <hr>

        <h3>Experiment Parameters</h3>

        <p>R1 = ${r1} Ω</p>
        <p>R2 = ${r2} Ω</p>
        <p>R3 = ${r3} Ω</p>
        <p>RL = ${rl} Ω</p>

        <hr>

        <h3>Observation Table</h3>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>VTH (V)</th>
              <th>RTH (Ω)</th>
              <th>RL (Ω)</th>
              <th>IL (A)</th>
            </tr>
          </thead>

          <tbody>
            ${observationRows}
          </tbody>
        </table>

        <hr>

        <h3>Calculations</h3>

        <p>VTH = ${vth.toFixed(3)} V</p>
        <p>RTH = ${rth.toFixed(3)} Ω</p>
        <p>RL = ${rl} Ω</p>

        <p>
          IL = VTH / (RTH + RL)
        </p>

        <p>Observed IL = ${observedIL.toFixed(6)} A</p>

    

        <h3>Conclusion</h3>

        <p>
          Thevenin's Theorem has been verified successfully.
        </p>

      </body>
    </html>
  `)

  reportWindow.document.close()
}