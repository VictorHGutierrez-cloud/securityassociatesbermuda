import {
  BASE_BUNDLE,
  BLACK_FRIDAY_PCT,
  LMS_OPTIONS,
  OPTIONAL_ADDONS,
  SEAT_FLOOR,
  type AddonId,
  type LmsOption,
} from "../data/pricingCatalog";

export type QuoteLine = {
  id: string;
  label: string;
  amount: number;
  detail: string;
};

export type QuoteInput = {
  seats: number;
  lms: LmsOption;
  addons: AddonId[];
  blackFridayOn: boolean;
};

export type QuoteResult = {
  seats: number;
  lines: QuoteLine[];
  listMonthly: number;
  promoMonthly: number;
  monthlyCost: number;
  annualList: number;
  annualPromo: number;
  annualSavings: number;
  discountPct: number;
  perSeatEffective: number;
};

export function clampSeats(seats: number): number {
  return Math.max(SEAT_FLOOR, Math.round(seats));
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const seats = clampSeats(input.seats);
  const lines: QuoteLine[] = [];

  const bundleAmount = BASE_BUNDLE.pricePerSeat * seats;
  lines.push({
    id: BASE_BUNDLE.id,
    label: `${BASE_BUNDLE.name} · ${BASE_BUNDLE.tier} ${BASE_BUNDLE.billing}`,
    amount: bundleAmount,
    detail: `${formatSeatRate(BASE_BUNDLE.pricePerSeat)} × ${seats} seats · includes ${BASE_BUNDLE.includes.join(", ")}`,
  });

  const lms = LMS_OPTIONS.find((o) => o.id === input.lms) ?? LMS_OPTIONS[0];
  if (lms.pricePerSeat > 0) {
    const amount = lms.pricePerSeat * seats;
    lines.push({
      id: `lms-${lms.id}`,
      label: lms.label,
      amount,
      detail: `${formatSeatRate(lms.pricePerSeat)} × ${seats} seats`,
    });
  }

  for (const id of input.addons) {
    const addon = OPTIONAL_ADDONS.find((a) => a.id === id);
    if (!addon) continue;
    const amount =
      addon.pricePerSeat * seats + addon.fixedMonthly;
    const detailParts: string[] = [];
    if (addon.pricePerSeat > 0) {
      detailParts.push(`${formatSeatRate(addon.pricePerSeat)} × ${seats} seats`);
    }
    if (addon.fixedMonthly > 0) {
      detailParts.push(`$${addon.fixedMonthly.toFixed(1)} fixed`);
    }
    lines.push({
      id: addon.id,
      label: addon.label,
      amount,
      detail: detailParts.join(" + "),
    });
  }

  const listMonthly = round2(lines.reduce((s, l) => s + l.amount, 0));
  const promoMonthly = round2(
    listMonthly * (1 - BLACK_FRIDAY_PCT / 100),
  );
  const monthlyCost = input.blackFridayOn ? promoMonthly : listMonthly;

  return {
    seats,
    lines,
    listMonthly,
    promoMonthly,
    monthlyCost,
    annualList: round2(listMonthly * 12),
    annualPromo: round2(promoMonthly * 12),
    annualSavings: round2(listMonthly * 12 - promoMonthly * 12),
    discountPct: input.blackFridayOn ? BLACK_FRIDAY_PCT : 0,
    perSeatEffective: seats > 0 ? round2(listMonthly / seats) : 0,
  };
}

function formatSeatRate(n: number): string {
  return `$${n.toFixed(1)}`;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
