import { EXTRA_VALUE, SOLUTION_PILLARS } from "../data/roiAssumptions";

export function SolutionAppendix() {
  return (
    <details className="appendix">
      <summary>Full capability map (for HR / IT review)</summary>
      <div className="appendix__body">
        <p className="appendix__lead">
          Optional detail — the overview tabs above cover the negotiation scope.
          Expand only if you need feature-level wording.
        </p>
        <div className="appendix__grid">
          {SOLUTION_PILLARS.map((pillar) => (
            <article className="card pillar pillar--compact" key={pillar.module}>
              <h3 className="module">{pillar.module}</h3>
              <p className="map-ref">{pillar.featureMapRef}</p>
              <p>{pillar.benefit}</p>
            </article>
          ))}
        </div>
        <h3 className="appendix__sub">{EXTRA_VALUE.title}</h3>
        <div className="extra-band">
          {EXTRA_VALUE.items.map((item) => (
            <article className="extra-card" key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </details>
  );
}
