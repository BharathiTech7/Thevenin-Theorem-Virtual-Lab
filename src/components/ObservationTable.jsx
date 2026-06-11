import SectionCard from './SectionCard.jsx'

const OBSERVATION_ROW_COUNT = 10
const emptyRows = Array.from({ length: OBSERVATION_ROW_COUNT })

const ObservationTable = ({ observations }) => (
  <SectionCard className="h-[360px]" icon="table" id="observation-table-panel" title="OBSERVATION TABLE">
    <div className="observation-table-wrap">
      <table className="observation-table">
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
          {emptyRows.map((_, index) => {
            const row = observations[index]

            return (
              <tr key={index}>
                <td>{row?.id ?? ''}</td>
               <td>{typeof row?.vth === 'number' ? row.vth.toFixed(2) : ''}</td>

<td>{typeof row?.rth === 'number' ? row.rth.toFixed(2) : ''}</td>

<td>{row?.rl ?? ''}</td>

<td>{typeof row?.il === 'number' ? row.il.toFixed(4) : ''}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  </SectionCard>
)

export default ObservationTable
