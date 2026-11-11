import { useEffect, useState } from "react";
import { CLIENT } from "../data/roiAssumptions";
import { NAV_SECTIONS } from "../data/showcaseModules";

export function ScrollNav() {
  type SectionId = (typeof NAV_SECTIONS)[number]["id"];
  const [active, setActive] = useState<SectionId>(NAV_SECTIONS[0].id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sectionEls = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    ) as HTMLElement[];

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0);

      const marker = window.scrollY + window.innerHeight * 0.32;
      let current: (typeof NAV_SECTIONS)[number]["id"] = NAV_SECTIONS[0].id;
      for (const el of sectionEls) {
        const hit = NAV_SECTIONS.find((s) => s.id === el.id);
        if (hit && el.offsetTop <= marker) current = hit.id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="scroll-nav-wrap">
      <nav className="scroll-nav" aria-label="Proposal sections">
        <div className="scroll-nav__track" aria-hidden="true">
          <span className="scroll-nav__progress" style={{ width: `${progress}%` }} />
        </div>
        <div className="scroll-nav__inner">
          <a className="scroll-nav__brand" href="#showcase">
            <img src={CLIENT.factorialLogoPath} alt="Factorial" />
            <span className="scroll-nav__client">
              <img src={CLIENT.logoPath} alt="" />
              {CLIENT.name}
            </span>
          </a>
          <div className="scroll-nav__links" role="list">
            {NAV_SECTIONS.map((item) => (
              <a
                key={item.id}
                role="listitem"
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : undefined}
                aria-current={active === item.id ? "true" : undefined}
              >
                <span className="scroll-nav__dot" aria-hidden="true" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
