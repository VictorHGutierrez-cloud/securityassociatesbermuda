import { STACK_TODAY } from "../data/roiAssumptions";

const GAP_STATUS = new Set(["Gap", "Manual", "Partial"]);

function statusClass(status: string): string {
  return `tag ${status.toLowerCase()}`;
}

export function GapsTable() {
  const rows = STACK_TODAY.filter((r) => GAP_STATUS.has(r.status));

  return (
    <section className="section section--muted" id="stack">
      <div className="section-head section-head--tight">
        <h2>Where the opportunity is</h2>
        <p>
          TCP already covers time. These rows are still paper or partial — what
          this proposal targets first.
        </p>
      </div>
      <table className="stack-table stack-table--compact">
        <thead>
          <tr>
            <th>Area</th>
            <th>Today</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.area}>
              <td>{row.area}</td>
              <td>{row.tool}</td>
              <td>
                <span className={statusClass(row.status)}>{row.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
