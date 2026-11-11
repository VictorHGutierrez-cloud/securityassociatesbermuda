import { DEFAULT_ASSUMPTIONS } from "../data/roiAssumptions";
import { getDefaultVerdict } from "../lib/defaultVerdict";
import { formatMonths, formatPct, formatUsd, formatUsdPrecise } from "../lib/roiMath";

export function VerdictStrip() {
  const v = getDefaultVerdict(DEFAULT_ASSUMPTIONS.blackFridayOn);

  return (
    <aside className="verdict-strip" aria-label="Proposal summary">
      <p className="verdict-strip__thesis">
        <strong>Paperwork chase is the gap.</strong> TCP stays for time. Factorial
        connects documents, onboarding, training, and performance for ~
        {v.client.headcount} people in {v.client.market}.
      </p>
      <ul className="verdict-strip__metrics">
        <li>
          <span>Recoverable (default scenario)</span>
          <strong>{formatUsd(v.benefitMonthly)}/mo</strong>
          <em>{v.totalHours} h · {v.scenarioLabel}</em>
        </li>
        <li>
          <span>Software</span>
          <strong>{formatUsdPrecise(v.monthlySoftware)}/mo</strong>
          <em>
            {v.blackFridayOn
              ? `Black Friday (list ${formatUsdPrecise(v.listMonthly)})`
              : "List price"}
          </em>
        </li>
        <li>
          <span>Payback · ROI year 1</span>
          <strong>{formatMonths(v.paybackMonths)}</strong>
          <em>{formatPct(v.roiPct)}</em>
        </li>
      </ul>
      <a className="verdict-strip__cta" href="#roi">
        Jump to investment &amp; adjust assumptions
      </a>
    </aside>
  );
}
