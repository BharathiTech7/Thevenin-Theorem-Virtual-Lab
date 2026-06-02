const ReportControls = ({
  graphGenerated,
  minReadings,
  onGenerateReport,
  readingCount,
  reportGenerated,
}) => {
  const readingsReady = readingCount >= minReadings
  const buttonTitle = reportGenerated
    ? 'Report generated. Click to regenerate the report.'
    : readingsReady && !graphGenerated
      ? 'Please generate the graph first.'
      : `Generate report after ${minReadings} readings and graph plotting.`

  return (
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
      Generate Report
    </button>
  )
}

export default ReportControls
