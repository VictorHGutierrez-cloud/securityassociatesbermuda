import { PAINS } from "../data/roiAssumptions";

const SHIFT = [
  { before: "Files in cabinets", after: "One digital folder + e-sign" },
  { before: "Chasing signed documents", after: "Filters show what’s missing" },
  { before: "Training by email", after: "Tracked courses & certificates" },
  { before: "Appraisals on paper", after: "Reminders + signed reviews" },
] as const;

export function ProblemSection() {
  return (
    <section className="section section--story" id="needs">
      <div className="section-head section-head--tight">
        <h2>What breaks today</h2>
        <p>
          Four themes from your discovery call — and what changes with one
          employee record instead of paper.
        </p>
      </div>

      <div className="story-compare">
        <div className="story-compare__col story-compare__col--before">
          <h3>Today</h3>
          <ul>
            {SHIFT.map((row) => (
              <li key={row.before}>{row.before}</li>
            ))}
          </ul>
        </div>
        <div className="story-compare__arrow" aria-hidden="true">
          →
        </div>
        <div className="story-compare__col story-compare__col--after">
          <h3>With Factorial</h3>
          <ul>
            {SHIFT.map((row) => (
              <li key={row.after}>{row.after}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid-2 pain-rail story-pains">
        {PAINS.map((pain) => (
          <article className="card pain-card pain-card--compact" key={pain.title}>
            <h3>{pain.title}</h3>
            <p className="quote">“{pain.quote}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}
