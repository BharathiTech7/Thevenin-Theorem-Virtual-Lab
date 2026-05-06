const GraphPanel = ({ className = '', plotted = false }) => (
  <section className={`graph-panel ${plotted ? 'graph-panel--plotted' : ''} ${className}`} aria-label="Observation graph">
    <div className="graph-panel__heading">
      <div>
        <p className="graph-panel__eyebrow">TABLE READINGS</p>
        <h2>OBSERVATION GRAPH</h2>
      </div>

      <div className="graph-panel__legend" aria-label="Current lines">
        <span><i className="graph-panel__dot graph-panel__dot--i1" />I1</span>
        <span><i className="graph-panel__dot graph-panel__dot--i2" />I2</span>
        <span><i className="graph-panel__dot graph-panel__dot--i3" />I3</span>
      </div>
    </div>

    <div className="graph-panel__body">
      <span className="graph-panel__axis graph-panel__axis--y">Current (A)</span>
      <span className="graph-panel__axis graph-panel__axis--x">Voltage (V)</span>

      <svg className="graph-panel__chart" preserveAspectRatio="none" role="img" aria-label="Graph preview area" viewBox="0 0 700 150">
        <defs>
          <pattern id="graph-grid" width="50" height="30" patternUnits="userSpaceOnUse">
            <path d="M50 0H0V30" fill="none" stroke="rgba(83, 55, 35, 0.18)" strokeWidth="1" />
          </pattern>
        </defs>

        <rect className="graph-panel__plot-bg" height="120" width="640" x="42" y="12" />
        <rect fill="url(#graph-grid)" height="120" width="640" x="42" y="12" />
        <path className="graph-panel__axis-line" d="M42 12v120h640" />

        <g className="graph-panel__plot">
          <path className="graph-panel__line graph-panel__line--i1" d="M70 112 160 95 250 78 340 61 430 45 520 31 650 20" />
          <path className="graph-panel__line graph-panel__line--i2" d="M70 120 160 111 250 98 340 87 430 76 520 62 650 49" />
          <path className="graph-panel__line graph-panel__line--i3" d="M70 123 160 116 250 106 340 96 430 86 520 73 650 62" />

          {[70, 250, 430, 650].map((x, index) => (
            <circle className="graph-panel__point graph-panel__point--i1" cx={x} cy={[112, 78, 45, 20][index]} key={`i1-${x}`} r="4" />
          ))}
          {[70, 250, 430, 650].map((x, index) => (
            <circle className="graph-panel__point graph-panel__point--i2" cx={x} cy={[120, 98, 76, 49][index]} key={`i2-${x}`} r="4" />
          ))}
          {[70, 250, 430, 650].map((x, index) => (
            <circle className="graph-panel__point graph-panel__point--i3" cx={x} cy={[123, 106, 86, 62][index]} key={`i3-${x}`} r="4" />
          ))}
        </g>
      </svg>
    </div>
  </section>
)

export default GraphPanel
