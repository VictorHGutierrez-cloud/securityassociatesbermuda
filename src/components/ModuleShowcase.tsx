import { useId, useRef, useState } from "react";
import { CLIENT } from "../data/roiAssumptions";
import { SHOWCASE_MODULES } from "../data/showcaseModules";
import { MiniModulePreview } from "./MiniModulePreview";

function ArrowIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M7 7h10v10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ModuleShowcase() {
  const uid = useId();
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const module = SHOWCASE_MODULES[activeIndex];

  const select = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  return (
    <section
      className="module-showcase"
      id="showcase"
      aria-labelledby={`${uid}-title`}
      data-active-index={activeIndex}
    >
      <p className="module-showcase__eyebrow">
        Factorial · proposal for {CLIENT.market}
      </p>

      <div className="module-showcase__header">
        <h1 id={`${uid}-title`}>
          Close the paperwork gaps — without replacing TCP where it works.
        </h1>
        <div className="module-showcase__intro">
          <p>
            ~{CLIENT.headcount} employees · documents, onboarding, training, and
            performance still on paper. Pick a module — the preview mirrors what
            changes in day-to-day work.
          </p>
          <p className="module-showcase__count">
            Priority modules{" "}
            <strong>
              {String(SHOWCASE_MODULES.length).padStart(2, "0")} mapped to your call
            </strong>
          </p>
        </div>
      </div>

      <div
        className="module-showcase__tabs"
        role="tablist"
        aria-label="Priority modules"
      >
        {SHOWCASE_MODULES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            ref={(el) => {
              tabsRef.current[index] = el;
            }}
            id={`${uid}-tab-${index}`}
            aria-controls={`${uid}-panel`}
            aria-selected={index === activeIndex}
            tabIndex={index === activeIndex ? 0 : -1}
            className={index === activeIndex ? "is-active" : undefined}
            onClick={() => select(index)}
            onKeyDown={(event) => {
              const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
              if (!keys.includes(event.key)) return;
              event.preventDefault();
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? SHOWCASE_MODULES.length - 1
                    : (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        SHOWCASE_MODULES.length) %
                      SHOWCASE_MODULES.length;
              select(next);
              tabsRef.current[next]?.focus();
            }}
          >
            <span className="module-showcase__tab-num">
              {String(index + 1).padStart(2, "0")}
            </span>
            {item.name}
          </button>
        ))}
      </div>

      <article
        key={module.id}
        className="module-showcase__panel"
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${activeIndex}`}
      >
        <div className="module-showcase__visual">
          <MiniModulePreview kind={module.preview} name={module.name} />
        </div>
        <div className="module-showcase__copy">
          <div className="module-showcase__meta">
            <span>{module.category}</span>
            <span aria-hidden="true">/</span>
            <span>{module.tag}</span>
          </div>
          <h2>{module.name}</h2>
          <p className="module-showcase__summary">{module.summary}</p>
          <ul className="module-showcase__chips" aria-label="Capabilities">
            {module.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <div className="module-showcase__outcome">
            <span>The difference</span>
            <p>{module.outcome}</p>
          </div>
          <a className="module-showcase__cta" href="#roi">
            See investment &amp; ROI
            <ArrowIcon />
          </a>
        </div>
      </article>
    </section>
  );
}
