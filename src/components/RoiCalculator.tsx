import { useMemo, useState } from "react";
import {
  DEFAULT_ASSUMPTIONS,
  HOUR_BREAKDOWN,
  PRICING,
} from "../data/roiAssumptions";
import {
  calculateRoi,
  formatMonths,
  formatPct,
  formatUsd,
} from "../lib/roiMath";

export function RoiCalculator() {
  const [hours, setHours] = useState<number>(
    DEFAULT_ASSUMPTIONS.hoursSavedPerMonth,
  );
  const [hourly, setHourly] = useState<number>(
    DEFAULT_ASSUMPTIONS.hourlyCostUsd,
  );
  const [blackFriday, setBlackFriday] = useState<boolean>(
    DEFAULT_ASSUMPTIONS.blackFridayOn,
  );
  const [impl, setImpl] = useState<number>(
    DEFAULT_ASSUMPTIONS.implementationOneShotUsd,
  );

  const result = useMemo(
    () =>
      calculateRoi({
        hoursSavedPerMonth: hours,
        hourlyCostUsd: hourly,
        blackFridayOn: blackFriday,
        implementationOneShotUsd: impl,
      }),
    [hours, hourly, blackFriday, impl],
  );

  return (
    <div className="calc-shell">
      <div className="calc-top">
        <div>
          <h3 style={{ margin: "0 0 6px" }}>Interactive ROI calculator</h3>
          <p style={{ margin: 0, color: "var(--fx-ink-soft)", fontSize: "0.92rem" }}>
            Move the sliders. Assumptions are conservative — hours were not
            quantified on the call, so you can tune them here.
          </p>
        </div>
        <label className={`toggle${blackFriday ? " on" : ""}`}>
          <input
            type="checkbox"
            checked={blackFriday}
            onChange={(e) => setBlackFriday(e.target.checked)}
          />
          Black Friday −{PRICING.blackFridayDiscountPct}%
        </label>
      </div>

      <div className="controls">
        <div className="control">
          <label>
            <span>Hours recovered / month</span>
            <span>{hours} h</span>
          </label>
          <input
            type="range"
            min={20}
            max={100}
            step={1}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
          />
          <div className="hint">
            Default 50 h = document chase + templates + appraisals + RUSO tracking
          </div>
        </div>

        <div className="control">
          <label>
            <span>Blended office cost / hour (USD)</span>
            <span>{formatUsd(hourly)}</span>
          </label>
          <input
            type="range"
            min={12}
            max={40}
            step={1}
            value={hourly}
            onChange={(e) => setHourly(Number(e.target.value))}
          />
          <div className="hint">
            Blended office rate (HR / Ops / Compliance) — edit to match your cost
          </div>
        </div>

        <div className="control">
          <label>
            <span>One-shot implementation (USD)</span>
            <span>{formatUsd(impl)}</span>
          </label>
          <input
            type="range"
            min={0}
            max={10000}
            step={500}
            value={impl}
            onChange={(e) => setImpl(Number(e.target.value))}
          />
          <div className="hint">Leave at $0 if implementation is included</div>
        </div>
      </div>

      <div className="metrics">
        <div className="metric">
          <div className="label">Monthly software</div>
          <div className="value">{formatUsd(result.monthlyCost)}</div>
        </div>
        <div className="metric">
          <div className="label">Benefit / month</div>
          <div className="value">{formatUsd(result.benefitMonthly)}</div>
        </div>
        <div className="metric highlight">
          <div className="label">ROI year 1</div>
          <div className="value">{formatPct(result.roiPct)}</div>
        </div>
        <div className="metric highlight">
          <div className="label">Payback</div>
          <div className="value" style={{ fontSize: "1.45rem" }}>
            {formatMonths(result.paybackMonths)}
          </div>
        </div>
      </div>

      <div className="price-strip">
        <div className="price-card">
          <div className="eyebrow">List price</div>
          <p className="amount">{formatUsd(result.listMonthly)}</p>
          <p className="sub">per month · {formatUsd(result.listMonthly * 12)} / year</p>
        </div>
        <div className="price-card promo">
          <div className="eyebrow">
            Black Friday (−{PRICING.blackFridayDiscountPct}%)
          </div>
          <p className="amount">{formatUsd(result.promoMonthly)}</p>
          <p className="sub">
            per month · {formatUsd(result.promoMonthly * 12)} / year
            <br />
            You save {formatUsd(result.annualSavingsVsList)} / year vs list
          </p>
        </div>
      </div>

      <div className="note">
        <strong>Active scenario:</strong>{" "}
        {blackFriday
          ? `promo ${formatUsd(result.monthlyCost)}/mo`
          : `list ${formatUsd(result.monthlyCost)}/mo`}
        {" · "}
        annual investment {formatUsd(result.annualCost)}
        {" · "}
        annual benefit {formatUsd(result.benefitAnnual)}
        {" · "}
        net year 1 {formatUsd(result.netAnnual)}
      </div>

      <table className="breakdown">
        <thead>
          <tr>
            <th>Assumed process</th>
            <th>Hours / mo</th>
            <th>How Factorial helps</th>
          </tr>
        </thead>
        <tbody>
          {HOUR_BREAKDOWN.map((row) => (
            <tr key={row.process}>
              <td>{row.process}</td>
              <td>{row.hours}</td>
              <td>{row.help}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
