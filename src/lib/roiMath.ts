import { PRICING } from "../data/roiAssumptions";

export type RoiInputs = {
  hoursSavedPerMonth: number;
  hourlyCostUsd: number;
  blackFridayOn: boolean;
  implementationOneShotUsd: number;
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

export function monthlyPrice(blackFridayOn: boolean): number {
  const list = PRICING.listMonthlyUsd;
  if (!blackFridayOn) return list;
  return list * (1 - PRICING.blackFridayDiscountPct / 100);
}

export function calculateRoi(input: RoiInputs): RoiResult {
  const listMonthly = PRICING.listMonthlyUsd;
  const promoMonthly = monthlyPrice(true);
  const monthlyCost = monthlyPrice(input.blackFridayOn);
  const annualSoftware = monthlyCost * 12;
  const annualCost = annualSoftware + Math.max(0, input.implementationOneShotUsd);
  const benefitMonthly = input.hoursSavedPerMonth * input.hourlyCostUsd;
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
    discountPct: input.blackFridayOn ? PRICING.blackFridayDiscountPct : 0,
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

export function formatPct(value: number): string {
  return `${value.toFixed(0)}%`;
}

export function formatMonths(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "—";
  return `${value.toFixed(1)} months`;
}
