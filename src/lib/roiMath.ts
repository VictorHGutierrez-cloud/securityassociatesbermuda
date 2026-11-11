import { BLACK_FRIDAY_PCT } from "../data/pricingCatalog";

export type RoiInputs = {
  /** Total recoverable value per month (labor + hard costs) */
  benefitMonthlyUsd: number;
  blackFridayOn: boolean;
  implementationOneShotUsd: number;
  /** Dynamic software list price from the package builder */
  listMonthlyUsd: number;
  /** For display only */
  hoursEquivalent?: number;
  laborBenefitMonthly?: number;
  hardCostBenefitMonthly?: number;
};

export type RoiResult = {
  listMonthly: number;
  promoMonthly: number;
  monthlyCost: number;
  annualCost: number;
  discountPct: number;
  annualSavingsVsList: number;
  benefitMonthly: number;
  benefitAnnual: number;
  netMonthly: number;
  netAnnual: number;
  roiPct: number;
  paybackMonths: number | null;
};

export function calculateRoi(input: RoiInputs): RoiResult {
  const listMonthly = Math.max(0, input.listMonthlyUsd);
  const promoMonthly = listMonthly * (1 - BLACK_FRIDAY_PCT / 100);
  const monthlyCost = input.blackFridayOn ? promoMonthly : listMonthly;
  const annualSoftware = monthlyCost * 12;
  const annualCost = annualSoftware + Math.max(0, input.implementationOneShotUsd);
  const benefitMonthly = Math.max(0, input.benefitMonthlyUsd);
  const benefitAnnual = benefitMonthly * 12;
  const netMonthly = benefitMonthly - monthlyCost;
  const netAnnual = benefitAnnual - annualCost;
  const roiPct = annualCost > 0 ? (benefitAnnual / annualCost) * 100 : 0;
  const paybackMonths =
    benefitMonthly > 0 ? annualCost / benefitMonthly : null;

  return {
    listMonthly,
    promoMonthly,
    monthlyCost,
    annualCost,
    discountPct: input.blackFridayOn ? BLACK_FRIDAY_PCT : 0,
    annualSavingsVsList: listMonthly * 12 - promoMonthly * 12,
    benefitMonthly,
    benefitAnnual,
    netMonthly,
    netAnnual,
    roiPct,
    paybackMonths,
  };
}

export function formatUsd(value: number, digits = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(value);
}

export function formatUsdPrecise(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}

export function formatPct(value: number): string {
  return `${value.toFixed(0)}%`;
}

export function formatMonths(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${value.toFixed(1)} months`;
}
