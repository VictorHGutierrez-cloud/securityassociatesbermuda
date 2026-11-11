import { DEFAULT_ADDONS, DEFAULT_LMS, DEFAULT_SEATS } from "../data/pricingCatalog";
import { DEFAULT_ASSUMPTIONS, CLIENT } from "../data/roiAssumptions";
import {
  DEFAULT_SCENARIO_ID,
  calculateWasteTotals,
  scenarioById,
} from "../data/roiWasteModel";
import { calculateQuote } from "./pricingMath";
import { calculateRoi } from "./roiMath";

/** Single source for the “certainty strip” and default ROI headline numbers. */
export function getDefaultVerdict(blackFridayOn = DEFAULT_ASSUMPTIONS.blackFridayOn) {
  const scenario = scenarioById(DEFAULT_SCENARIO_ID);
  const quote = calculateQuote({
    seats: DEFAULT_SEATS,
    lms: DEFAULT_LMS,
    addons: DEFAULT_ADDONS,
    blackFridayOn,
  });
  const waste = calculateWasteTotals(scenario.values, scenario.hourlyCostUsd);
  const roi = calculateRoi({
    benefitMonthlyUsd: waste.benefitMonthly,
    blackFridayOn,
    implementationOneShotUsd: 0,
    listMonthlyUsd: quote.listMonthly,
  });

  return {
    client: CLIENT,
    scenarioLabel: scenario.label,
    totalHours: waste.totalHours,
    benefitMonthly: waste.benefitMonthly,
    monthlySoftware: roi.monthlyCost,
    paybackMonths: roi.paybackMonths,
    roiPct: roi.roiPct,
    listMonthly: quote.listMonthly,
    promoMonthly: quote.promoMonthly,
    blackFridayOn,
  };
}
