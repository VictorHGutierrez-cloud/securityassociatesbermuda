type PreviewKind = "documents" | "onboarding" | "training" | "performance";

export function MiniModulePreview({
  kind,
  name,
}: {
  kind: PreviewKind;
  name: string;
}) {
  return (
    <div className="mod-preview" aria-hidden="true">
      <div className="mod-preview__chrome">
        <span />
        <span />
        <span />
        <em>{name}</em>
      </div>
      {kind === "documents" && (
        <div className="mod-preview__body mod-preview--docs">
          <ul>
            <li>
              <strong>Contract</strong>
              <i className="signed">Signed</i>
            </li>
            <li>
              <strong>Bank details</strong>
              <i className="pending">Pending</i>
            </li>
            <li>
              <strong>RUSO pack</strong>
              <i className="sent">Sent</i>
            </li>
          </ul>
        </div>
      )}
      {kind === "onboarding" && (
        <div className="mod-preview__body mod-preview--onboard">
          <p className="mod-preview__task done">ID upload</p>
          <p className="mod-preview__task done">Emergency contact</p>
          <p className="mod-preview__task active">E-sign contract</p>
          <p className="mod-preview__task">Uniform sizing</p>
        </div>
      )}
      {kind === "training" && (
        <div className="mod-preview__body mod-preview--train">
          <div className="mod-preview__ring" />
          <p className="mod-preview__course">RUSO open-book</p>
          <div className="mod-preview__bar">
            <span style={{ width: "78%" }} />
          </div>
          <span className="mod-preview__pct">78% complete</span>
        </div>
      )}
      {kind === "performance" && (
        <div className="mod-preview__body mod-preview--perf">
          <div className="mod-preview__cycle">
            <span>Q2 cycle</span>
            <strong>64%</strong>
          </div>
          <div className="mod-preview__heat">
            {[40, 72, 55, 88, 61].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
