import { useMemo, useState } from "react";
import {
  BASE_BUNDLE,
  BLACK_FRIDAY_PCT,
  DEFAULT_ADDONS,
  DEFAULT_LMS,
  DEFAULT_SEATS,
  LMS_OPTIONS,
  OPTIONAL_ADDONS,
  SEAT_FLOOR,
  type AddonId,
  type LmsOption,
} from "../data/pricingCatalog";
import { DEFAULT_ASSUMPTIONS, HOUR_BREAKDOWN } from "../data/roiAssumptions";
import { calculateQuote } from "../lib/pricingMath";
import {
  calculateRoi,
  formatMonths,
  formatPct,
  formatUsd,
  formatUsdPrecise,
} from "../lib/roiMath";

export function RoiCalculator() {
  const [seats, setSeats] = useState<number>(DEFAULT_SEATS);
  const [lms, setLms] = useState<LmsOption>(DEFAULT_LMS);
  const [addons, setAddons] = useState<AddonId[]>(DEFAULT_ADDONS);
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

  const quote = useMemo(
    () =>
      calculateQuote({
        seats,
        lms,
        addons,
        blackFridayOn: blackFriday,
      }),
    [seats, lms, addons, blackFriday],
  );

  const result = useMemo(
    () =>
      calculateRoi({
        hoursSavedPerMonth: hours,
        hourlyCostUsd: hourly,
        blackFridayOn: blackFriday,
        implementationOneShotUsd: impl,
        listMonthlyUsd: quote.listMonthly,
      }),
    [hours, hourly, blackFriday, impl, quote.listMonthly],
  );

  function toggleAddon(id: AddonId) {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  return (
    <div className="calc-shell">
      <div className="calc-top">
        <div>
          <h3 style={{ margin: "0 0 6px" }}>Package & ROI calculator</h3>
          <p style={{ margin: 0, color: "var(--fx-ink-soft)", fontSize: "0.92rem" }}>
            Enterprise Monthly only. Consulting PRO is required. Core and
            Recruitment are inside the bundle — tune seats, LMS, and optional
            add-ons; ROI updates automatically.
          </p>
        </div>
        <label className={`toggle${blackFriday ? " on" : ""}`}>
          <input
            type="checkbox"
            checked={blackFriday}
            onChange={(e) => setBlackFriday(e.target.checked)}
          />
          Black Friday −{BLACK_FRIDAY_PCT}%
        </label>
      </div>

      <div className="package-block">
        <div className="package-locked">
          <div className="package-locked-top">
            <span className="tag">Required bundle</span>
            <strong>
              {BASE_BUNDLE.name} · {BASE_BUNDLE.tier} {BASE_BUNDLE.billing}
            </strong>
            <span className="package-rate">
              ${BASE_BUNDLE.pricePerSeat.toFixed(1)} / seat
            </span>
          </div>
          <p className="package-includes">
            Includes: {BASE_BUNDLE.includes.join(" · ")}
          </p>
        </div>

        <div className="control">
          <label>
            <span>Seats (employees)</span>
            <span>{quote.seats}</span>
          </label>
          <input
            type="range"
            min={SEAT_FLOOR}
            max={500}
            step={1}
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
          />
          <div className="hint">
            Floor {SEAT_FLOOR} seats · default {DEFAULT_SEATS} for this proposal
          </div>
          <div className="seat-input-row">
            <label htmlFor="seat-number">Exact seats</label>
            <input
              id="seat-number"
              type="number"
              min={SEAT_FLOOR}
              max={5000}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value) || SEAT_FLOOR)}
            />
          </div>
        </div>

        <fieldset className="lms-fieldset">
          <legend>LMS</legend>
          <div className="lms-options">
            {LMS_OPTIONS.map((opt) => (
              <label key={opt.id} className="choice-card">
                <input
                  type="radio"
                  name="lms"
                  checked={lms === opt.id}
                  onChange={() => setLms(opt.id)}
                />
                <span>
                  <strong>{opt.label}</strong>
                  {opt.pricePerSeat > 0
                    ? ` · $${opt.pricePerSeat.toFixed(1)}/seat`
                    : ""}
                  <small>{opt.hint}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="addon-fieldset">
          <legend>Optional add-ons</legend>
          <p className="hint" style={{ marginTop: 0 }}>
            Not included in Consulting PRO. Recruitment is already in the bundle.
          </p>
          <div className="addon-grid">
            {OPTIONAL_ADDONS.map((addon) => {
              const checked = addons.includes(addon.id);
              return (
                <label
                  key={addon.id}
                  className={`choice-card${checked ? " on" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAddon(addon.id)}
                  />
                  <span>
                    <strong>{addon.label}</strong>
                    <small>
                      {addon.pricePerSeat > 0
                        ? `$${addon.pricePerSeat.toFixed(1)}/seat`
                        : ""}
                      {addon.pricePerSeat > 0 && addon.fixedMonthly > 0
                        ? " + "
                        : ""}
                      {addon.fixedMonthly > 0
                        ? `$${addon.fixedMonthly.toFixed(1)} fixed`
                        : ""}
                      {" · "}
                      {addon.hint}
                    </small>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <table className="breakdown">
          <thead>
            <tr>
              <th>Line</th>
              <th>Detail</th>
              <th>Monthly</th>
            </tr>
          </thead>
          <tbody>
            {quote.lines.map((line) => (
              <tr key={line.id}>
                <td>{line.label}</td>
                <td>{line.detail}</td>
                <td>{formatUsdPrecise(line.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="price-strip">
        <div className="price-card">
          <div className="eyebrow">List price</div>
          <p className="amount">{formatUsdPrecise(quote.listMonthly)}</p>
          <p className="sub">
            per month · {formatUsdPrecise(quote.annualList)} / year
            <br />
            ~{formatUsdPrecise(quote.perSeatEffective)} effective / seat
          </p>
        </div>
        <div className="price-card promo">
          <div className="eyebrow">Black Friday (−{BLACK_FRIDAY_PCT}%)</div>
          <p className="amount">{formatUsdPrecise(quote.promoMonthly)}</p>
          <p className="sub">
            per month · {formatUsdPrecise(quote.annualPromo)} / year
            <br />
            You save {formatUsdPrecise(quote.annualSavings)} / year vs list
          </p>
        </div>
      </div>

      <hr className="calc-divider" />

      <h3 style={{ margin: "0 0 12px" }}>ROI assumptions</h3>
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
        </div>
      </div>

      <div className="metrics">
        <div className="metric">
          <div className="label">Monthly software</div>
          <div className="value">{formatUsdPrecise(result.monthlyCost)}</div>
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

      <div className="note">
        <strong>Active scenario:</strong>{" "}
        {quote.seats} seats · Consulting PRO Enterprise
        {lms !== "none" ? ` + ${LMS_OPTIONS.find((o) => o.id === lms)?.label}` : ""}
        {addons.length ? ` + ${addons.length} add-on(s)` : ""}
        {" · "}
        {blackFriday
          ? `promo ${formatUsdPrecise(result.monthlyCost)}/mo`
          : `list ${formatUsdPrecise(result.monthlyCost)}/mo`}
        {" · "}
        net year 1 {formatUsdPrecise(result.netAnnual)}
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
