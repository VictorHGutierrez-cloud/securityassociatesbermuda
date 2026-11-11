import {
  CLIENT,
  EXTRA_VALUE,
  NEXT_STEPS,
  OBJECTIONS,
  PAINS,
  SOLUTION_PILLARS,
  STACK_TODAY,
} from "./data/roiAssumptions";
import { ModuleShowcase } from "./components/ModuleShowcase";
import { RoiCalculator } from "./components/RoiCalculator";
import { ScrollNav } from "./components/ScrollNav";

function statusClass(status: string): string {
  return `tag ${status.toLowerCase()}`;
}

export default function App() {
  return (
    <div className="page">
      <ScrollNav />
      <ModuleShowcase />

      <section className="section" id="needs">
        <div className="section-head">
          <h2>What you told us</h2>
          <p>
            We listened to your discovery call. These are the negotiation-critical
            pains — not a generic HR checklist.
          </p>
        </div>
        <div className="grid-2 pain-rail">
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

      <section className="section" id="roi">
        <div className="section-head">
          <h2>Investment &amp; ROI</h2>
          <p>
            Default package: <strong>Consulting PRO Enterprise</strong> +{" "}
            <strong>LMS</strong> · {CLIENT.headcount} seats →{" "}
            <strong>$1,800 / month</strong> list (
            <strong>$1,260</strong> with Black Friday −30%). Change seats or
            add-ons below — ROI recalculates live.
          </p>
        </div>
        <RoiCalculator />
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
          <p>A straightforward path from this page to a decision.</p>
        </div>
        <ol className="steps">
          {NEXT_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <footer className="footer">
        <img
          className="footer-factorial-logo"
          src={CLIENT.factorialLogoPath}
          alt="Factorial"
        />
        <div>
          Proposal for {CLIENT.legalName} · {CLIENT.market} · ~{CLIENT.headcount}{" "}
          employees
        </div>
      </footer>
    </div>
  );
}
