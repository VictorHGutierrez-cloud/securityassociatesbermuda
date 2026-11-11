import { CLIENT, OBJECTIONS } from "./data/roiAssumptions";
import { GapsTable } from "./components/GapsTable";
import { ModuleShowcase } from "./components/ModuleShowcase";
import { ProblemSection } from "./components/ProblemSection";
import { RoiCalculator } from "./components/RoiCalculator";
import { ScrollNav } from "./components/ScrollNav";
import { SolutionAppendix } from "./components/SolutionAppendix";
import { VerdictStrip } from "./components/VerdictStrip";

export default function App() {
  return (
    <div className="page">
      <ScrollNav />
      <VerdictStrip />

      <div className="story-hero-wrap">
        <ModuleShowcase />
      </div>

      <ProblemSection />
      <GapsTable />

      <section className="section section--invest" id="roi">
        <div className="section-head section-head--tight">
          <h2>Investment</h2>
          <p>
            Default: Consulting PRO Enterprise + LMS · {CLIENT.headcount} seats.
            The numbers below start from the <strong>Based on your call</strong>{" "}
            scenario — open advanced sections only if you want to stress-test.
          </p>
        </div>
        <RoiCalculator />
        <SolutionAppendix />
      </section>

      <section className="section" id="objections">
        <div className="section-head section-head--tight">
          <h2>Questions we expect</h2>
          <p>Short answers — including officers who are not tech-heavy.</p>
        </div>
        <div className="grid-2 faq-grid">
          {OBJECTIONS.map((item) => (
            <article className="card faq-card" key={item.concern}>
              <h3>{item.concern}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
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
