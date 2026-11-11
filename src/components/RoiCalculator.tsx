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
import { DEFAULT_ASSUMPTIONS } from "../data/roiAssumptions";
import {
  DEFAULT_SCENARIO_ID,
  ROI_SCENARIOS,
  WASTE_DRIVERS,
  calculateWasteTotals,
  scenarioById,
  wasteContextLine,
  type DriverValues,
  type RoiScenarioId,
  type WasteDriverId,
} from "../data/roiWasteModel";
import { calculateQuote } from "../lib/pricingMath";
import {
  calculateRoi,
  formatMonths,
  formatPct,
  formatUsd,
  formatUsdPrecise,
} from "../lib/roiMath";

function cloneValues(v: DriverValues): DriverValues {
  return JSON.parse(JSON.stringify(v)) as DriverValues;
}

export function RoiCalculator() {
  const [scenarioId, setScenarioId] = useState<RoiScenarioId>(DEFAULT_SCENARIO_ID);
  const [customized, setCustomized] = useState(false);
  const [driverValues, setDriverValues] = useState<DriverValues>(
    () => cloneValues(scenarioById(DEFAULT_SCENARIO_ID).values),
  );
  const [hourly, setHourly] = useState<number>(
    scenarioById(DEFAULT_SCENARIO_ID).hourlyCostUsd,
  );

  const [seats, setSeats] = useState<number>(DEFAULT_SEATS);
  const [lms, setLms] = useState<LmsOption>(DEFAULT_LMS);
  const [addons, setAddons] = useState<AddonId[]>(DEFAULT_ADDONS);
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

  const waste = useMemo(
    () => calculateWasteTotals(driverValues, hourly),
    [driverValues, hourly],
  );

  const result = useMemo(
    () =>
      calculateRoi({
        benefitMonthlyUsd: waste.benefitMonthly,
        blackFridayOn: blackFriday,
        implementationOneShotUsd: impl,
        listMonthlyUsd: quote.listMonthly,
        hoursEquivalent: waste.totalHours,
        laborBenefitMonthly: waste.laborUsd,
        hardCostBenefitMonthly: waste.hardCostUsd,
      }),
    [waste, blackFriday, impl, quote.listMonthly],
  );

  function applyScenario(id: RoiScenarioId) {
    const sc = scenarioById(id);
    setScenarioId(id);
    setCustomized(false);
    setDriverValues(cloneValues(sc.values));
    setHourly(sc.hourlyCostUsd);
  }

  function patchDriver(
    id: WasteDriverId,
    patch: Partial<{ hours: number; costUsd: number; enabled: boolean }>,
  ) {
    setCustomized(true);
    setDriverValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...patch },
    }));
  }

  function toggleAddon(id: AddonId) {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const activeScenario = ROI_SCENARIOS.find((s) => s.id === scenarioId);

  return (
    <div className="calc-shell">
      <RoiSignature
        blackFriday={blackFriday}
        setBlackFriday={setBlackFriday}
        customized={customized}
        scenarioId={scenarioId}
        applyScenario={applyScenario}
        activeScenario={activeScenario}
        waste={waste}
        result={result}
        quote={quote}
      />

      <details className="calc-fold">
        <summary>Customize package (seats, LMS, add-ons)</summary>
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

      <div
        className={`price-active${blackFriday ? " price-active--promo" : " price-active--list"}`}
      >
        <div className="price-active__label">
          {blackFriday
            ? `Active price (Black Friday −${BLACK_FRIDAY_PCT}% · used in ROI)`
            : "Active price (list · used in ROI)"}
        </div>
        <p className="price-active__amount">
          {formatUsdPrecise(blackFriday ? quote.promoMonthly : quote.listMonthly)}
        </p>
        <p className="price-active__sub">
          per month ·{" "}
          {formatUsdPrecise(
            blackFriday ? quote.annualPromo : quote.annualList,
          )}{" "}
          / year
        </p>
      </div>

      <div className="price-strip">
        <div
          className={`price-card${!blackFriday ? " price-card--selected" : ""}`}
        >
          <div className="eyebrow">List price</div>
          <p className="amount">{formatUsdPrecise(quote.listMonthly)}</p>
          <p className="sub">
            per month · {formatUsdPrecise(quote.annualList)} / year
            <br />
            ~{formatUsdPrecise(quote.perSeatEffective)} effective / seat
          </p>
        </div>
        <div
          className={`price-card promo${blackFriday ? " price-card--selected" : " price-card--muted"}`}
        >
          <div className="eyebrow">Black Friday (−{BLACK_FRIDAY_PCT}%)</div>
          <p className="amount">{formatUsdPrecise(quote.promoMonthly)}</p>
          <p className="sub">
            {blackFriday ? (
              <>
                per month · {formatUsdPrecise(quote.annualPromo)} / year
                <br />
                You save {formatUsdPrecise(quote.annualSavings)} / year vs list
              </>
            ) : (
              <>Turn on the toggle above to apply this price in ROI.</>
            )}
          </p>
        </div>
      </div>
      </details>

      <details className="calc-fold">
        <summary>Adjust waste assumptions (optional detail)</summary>

      <p className="waste-context" style={{ marginTop: 0 }}>
        {wasteContextLine()}
      </p>

      <div className="control" style={{ marginBottom: 16 }}>
        <label>
          <span>Blended HR / Ops / Compliance cost per hour (USD)</span>
          <span>{formatUsd(hourly)}</span>
        </label>
        <input
          type="range"
          min={18}
          max={45}
          step={1}
          value={hourly}
          onChange={(e) => {
            setCustomized(true);
            setHourly(Number(e.target.value));
          }}
        />
        <div className="hint">
          Loaded cost (salary + overhead), not field officer wage.
        </div>
      </div>

      <div className="waste-drivers">
        {WASTE_DRIVERS.map((def) => {
          const row = driverValues[def.id];
          const showCost =
            def.kind === "labor_and_cost" || def.kind === "cost";
          return (
            <article
              key={def.id}
              className={`waste-driver${row.enabled ? "" : " is-off"}`}
            >
              <header className="waste-driver__head">
                <label className="waste-driver__toggle">
                  <input
                    type="checkbox"
                    checked={row.enabled}
                    onChange={(e) =>
                      patchDriver(def.id, { enabled: e.target.checked })
                    }
                  />
                  <strong>{def.label}</strong>
                </label>
                <span className="waste-driver__total">
                  {formatUsd(
                    (row.enabled ? row.hours : 0) * hourly +
                      (row.enabled ? row.costUsd : 0),
                  )}
                  /mo
                </span>
              </header>
              <p className="waste-driver__why">{def.rationale}</p>
              {row.enabled ? (
                <div className="waste-driver__sliders">
                  {def.kind !== "cost" ? (
                    <div className="control compact">
                      <label>
                        <span>Hours / month</span>
                        <span>{row.hours} h</span>
                      </label>
                      <input
                        type="range"
                        min={def.hoursMin}
                        max={def.hoursMax}
                        step={def.hoursStep}
                        value={row.hours}
                        onChange={(e) =>
                          patchDriver(def.id, {
                            hours: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  ) : null}
                  {showCost ? (
                    <div className="control compact">
                      <label>
                        <span>Print / storage / supplies (USD/mo)</span>
                        <span>{formatUsd(row.costUsd)}</span>
                      </label>
                      <input
                        type="range"
                        min={def.costMin}
                        max={def.costMax}
                        step={20}
                        value={row.costUsd}
                        onChange={(e) =>
                          patchDriver(def.id, {
                            costUsd: Number(e.target.value),
                          })
                        }
                      />
                    </div>
                  ) : null}
                </div>
              ) : null}
              <p className="waste-driver__fx">
                <strong>Factorial:</strong> {def.factorialHelp}
              </p>
            </article>
          );
        })}
      </div>

      <div className="waste-summary">
        <div>
          <span>Admin time recovered</span>
          <strong>{waste.totalHours} h/mo</strong>
          <small>≈ {waste.fteEquivalent.toFixed(2)} FTE (160 h)</small>
        </div>
        <div>
          <span>Labor value</span>
          <strong>{formatUsd(waste.laborUsd)}/mo</strong>
        </div>
        <div>
          <span>Hard costs avoided</span>
          <strong>{formatUsd(waste.hardCostUsd)}/mo</strong>
        </div>
        <div className="waste-summary__total">
          <span>Total recoverable</span>
          <strong>{formatUsd(waste.benefitMonthly)}/mo</strong>
          <small>{formatUsd(waste.benefitMonthly * 12)}/year</small>
        </div>
      </div>

      <div className="control" style={{ marginBottom: 16 }}>
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

      <table className="breakdown">
        <thead>
          <tr>
            <th>Waste line</th>
            <th>Hours</th>
            <th>Hard $</th>
            <th>Monthly value</th>
          </tr>
        </thead>
        <tbody>
          {waste.lines
            .filter((l) => l.lineTotal > 0)
            .map((line) => (
              <tr key={line.id}>
                <td>{line.label}</td>
                <td>{line.hours > 0 ? `${line.hours} h` : "—"}</td>
                <td>{line.costUsd > 0 ? formatUsd(line.costUsd) : "—"}</td>
                <td>{formatUsd(line.lineTotal)}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </details>
    </div>
  );
}

type WasteTotals = ReturnType<typeof calculateWasteTotals>;
type QuoteResult = ReturnType<typeof calculateQuote>;
type RoiResult = ReturnType<typeof calculateRoi>;

function RoiSignature({
  blackFriday,
  setBlackFriday,
  customized,
  scenarioId,
  applyScenario,
  activeScenario,
  waste,
  result,
  quote,
}: {
  blackFriday: boolean;
  setBlackFriday: (v: boolean) => void;
  customized: boolean;
  scenarioId: RoiScenarioId;
  applyScenario: (id: RoiScenarioId) => void;
  activeScenario: (typeof ROI_SCENARIOS)[number] | undefined;
  waste: WasteTotals;
  result: RoiResult;
  quote: QuoteResult;
}) {
  const activeMonthly = quote.monthlyCost;

  return (
    <div className="calc-signature" aria-live="polite">
      <div className="calc-signature__toolbar">
        <div className="scenario-row" role="group" aria-label="ROI scenarios">
          {ROI_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              className={`scenario-chip${
                !customized && scenarioId === sc.id ? " is-active" : ""
              }`}
              onClick={() => applyScenario(sc.id)}
            >
              {sc.label}
            </button>
          ))}
          {customized ? (
            <span className="scenario-custom">Custom</span>
          ) : null}
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
      {activeScenario && !customized ? (
        <p className="calc-signature__desc">{activeScenario.description}</p>
      ) : null}
      <div className="metrics metrics--signature">
        <div className="metric">
          <div className="label">
            Monthly software
            <span className="metric-tag">
              {blackFriday ? "Black Friday" : "List"}
            </span>
          </div>
          <div className="value">{formatUsdPrecise(activeMonthly)}</div>
        </div>
        <div className="metric">
          <div className="label">Recoverable / month</div>
          <div className="value">{formatUsd(result.benefitMonthly)}</div>
          <div className="metric-sub">
            {waste.totalHours} h · net yr 1 {formatUsdPrecise(result.netAnnual)}
          </div>
        </div>
        <div className="metric highlight">
          <div className="label">Payback</div>
          <div className="value">{formatMonths(result.paybackMonths)}</div>
        </div>
        <div className="metric highlight">
          <div className="label">ROI year 1</div>
          <div className="value">{formatPct(result.roiPct)}</div>
        </div>
      </div>
    </div>
  );
}
