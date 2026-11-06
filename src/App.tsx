import {
  CLIENT,
  EXTRA_VALUE,
  NEXT_STEPS,
  OBJECTIONS,
  PAINS,
  SOLUTION_PILLARS,
  STACK_TODAY,
} from "./data/roiAssumptions";
import { RoiCalculator } from "./components/RoiCalculator";

function statusClass(status: string): string {
  return `tag ${status.toLowerCase()}`;
}

export default function App() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="nav-brand">
          <span className="nav-factorial">Factorial</span>
          <span className="nav-divider" aria-hidden="true" />
          <span className="nav-client">
            <img src={CLIENT.logoPath} alt="" />
            Proposal for {CLIENT.name}
          </span>
        </div>
        <div className="nav-links">
          <a href="#needs">Needs</a>
          <a href="#stack">Today</a>
          <a href="#solution">Solution</a>
          <a href="#roi">ROI</a>
          <a href="#pricing">Pricing</a>
          <a href="#next">Next</a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-kicker">Commercial ROI proposal</div>
        <h1>Close the people-ops gaps holding your HR team back</h1>
        <p className="hero-lead">
          Factorial replaces filing-cabinet chase with one workforce platform —
          documents, onboarding, time, training, and performance — designed for
          how your team already works with ~{CLIENT.headcount} people in{" "}
          {CLIENT.market}.
        </p>
        <div className="hero-meta">
          <span className="chip client">Prepared for {CLIENT.name}</span>
          <span className="chip">~{CLIENT.headcount} employees</span>
          <span className="chip">{CLIENT.market}</span>
          <span className="chip">Black Friday −30%</span>
        </div>
      </header>

      <section className="section" id="needs">
        <div className="section-head">
          <h2>What you told us</h2>
          <p>
            We listened to your discovery call. These are the negotiation-critical
            pains — not a generic HR checklist.
          </p>
        </div>
        <div className="grid-2">
          {PAINS.map((pain) => (
            <article className="card pain-card" key={pain.title}>
              <span className="tag">From your call</span>
              <h3>{pain.title}</h3>
              <p className="quote">“{pain.quote}”</p>
              <p>
                <strong>Business impact:</strong> {pain.impact}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Before → After</h2>
          <p>How Factorial changes the operating model for HR and Operations.</p>
        </div>
        <div className="compare">
          <div className="compare-col before">
            <h3>Before</h3>
            <ul>
              <li>Employee files printed into cabinets</li>
              <li>Chasing signed / returned documents</li>
              <li>Mandatory training by email, marked by hand</li>
              <li>Appraisals on paper — easy to fall behind</li>
              <li>TCP for time only — paperwork lives elsewhere</li>
            </ul>
          </div>
          <div className="compare-col after">
            <h3>After Factorial</h3>
            <ul>
              <li>Digital folders + unlimited e-sign</li>
              <li>Incomplete documents visible in filters & reminders</li>
              <li>Tracked courses, quizzes, and certificates</li>
              <li>Digital reviews with reminders and signed agreements</li>
              <li>One employee portal for time, docs, and training</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="stack">
        <div className="section-head">
          <h2>Your situation today</h2>
          <p>
            TCP covers time well. The commercial opportunity is everything still
            on paper — and connecting it into one stack.
          </p>
        </div>
        <table className="stack-table">
          <thead>
            <tr>
              <th>Area</th>
              <th>Tool today</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {STACK_TODAY.map((row) => (
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

      <section className="section" id="solution">
        <div className="section-head">
          <h2>How Factorial solves this</h2>
          <p>
            Capabilities from Factorial&apos;s product map — only the modules that
            map to your call. Each block: feature → benefit → impact.
          </p>
        </div>
        <div className="grid-2">
          {SOLUTION_PILLARS.map((pillar) => (
            <article className="card pillar" key={pillar.module}>
              <div className="pillar-top">
                <h3 className="module">{pillar.module}</h3>
                <span className="map-ref">{pillar.featureMapRef}</span>
              </div>
              <p className="pain-link">Addresses: {pillar.painLink}</p>
              <p className="fbi">
                <strong>Feature.</strong> {pillar.feature}
              </p>
              <p className="fbi">
                <strong>Benefit.</strong> {pillar.benefit}
              </p>
              <p className="fbi">
                <strong>Impact.</strong> {pillar.impact}
              </p>
            </article>
          ))}
        </div>

        <div className="section-head" style={{ marginTop: 28 }}>
          <h2 style={{ fontSize: "1.25rem" }}>{EXTRA_VALUE.title}</h2>
        </div>
        <div className="extra-band">
          {EXTRA_VALUE.items.map((item) => (
            <article className="extra-card" key={item.label}>
              <h3>{item.label}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>ROI you can defend with Finance</h2>
          <p>
            List price <strong>USD 2,000 / month</strong>. Toggle Black Friday for{" "}
            <strong>−30% → USD 1,400 / month</strong>. Hours and hourly cost are
            assumptions — adjust them live with your CFO.
          </p>
        </div>
        <RoiCalculator />
      </section>

      <section className="section" id="pricing">
        <div className="section-head">
          <h2>Investment</h2>
          <p>
            Transparent pricing for ~{CLIENT.headcount} employees. Black Friday is
            part of this commercial package.
          </p>
        </div>
        <div className="price-strip">
          <div className="price-card">
            <div className="eyebrow">Standard</div>
            <p className="amount">$2,000</p>
            <p className="sub">per month · $24,000 / year</p>
          </div>
          <div className="price-card promo">
            <div className="eyebrow">Black Friday offer</div>
            <p className="amount">$1,400</p>
            <p className="sub">
              per month (−30%) · $16,800 / year
              <br />
              Saves $7,200 every year vs list
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="objections">
        <div className="section-head">
          <h2>Questions we expect</h2>
          <p>
            Including adoption for officers who are not tech-heavy — raised clearly
            on the call.
          </p>
        </div>
        <div className="grid-2">
          {OBJECTIONS.map((item) => (
            <article className="card" key={item.concern}>
              <h3>{item.concern}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="next">
        <div className="section-head">
          <h2>Suggested next steps</h2>
          <p>A clear path from this proposal to a CFO decision.</p>
        </div>
        <ol className="steps">
          {NEXT_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="cta" id="cta">
        <h2>Ready for the CFO conversation</h2>
        <p>
          Adjust the calculator, print to PDF (Ctrl+P), and walk Finance through
          list vs Black Friday payback.
        </p>
        <div className="cta-actions">
          <a className="btn btn-primary" href="#roi">
            Open ROI calculator
          </a>
          <a className="btn btn-ghost" href="#solution">
            Review Factorial solution
          </a>
        </div>
      </section>

      <footer className="footer">
        <strong>Factorial</strong> commercial proposal prepared for{" "}
        {CLIENT.legalName} · {CLIENT.market} · ~{CLIENT.headcount} employees
      </footer>
    </div>
  );
}
