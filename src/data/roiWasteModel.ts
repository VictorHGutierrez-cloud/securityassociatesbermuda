import { CLIENT } from "./roiAssumptions";

/** Labor + hard-cost lines tied to the discovery call (~200 people, Bermuda). */

export type WasteDriverId =
  | "doc_chase"
  | "rework"
  | "paper_storage"
  | "onboarding"
  | "training_admin"
  | "performance"
  | "dual_entry";

export type WasteDriverDef = {
  id: WasteDriverId;
  label: string;
  /** Short “why we assume this” for the client */
  rationale: string;
  factorialHelp: string;
  kind: "labor" | "labor_and_cost" | "cost";
  hoursMin: number;
  hoursMax: number;
  costMin: number;
  costMax: number;
  hoursStep: number;
};

export const WASTE_DRIVERS: WasteDriverDef[] = [
  {
    id: "doc_chase",
    label: "Document chase & signatures",
    rationale:
      "HR/Ops chasing returns, wrong versions, and unsigned packs across ~200 files — the pain you named first on the call.",
    factorialHelp: "E-sign, status filters, bulk reminders, employee folder",
    kind: "labor",
    hoursMin: 0,
    hoursMax: 90,
    costMin: 0,
    costMax: 0,
    hoursStep: 1,
  },
  {
    id: "rework",
    label: "Rework (re-print, re-fill, re-send)",
    rationale:
      "Duplicate letters, outdated PDFs, and “send it again” loops when paper and email disagree.",
    factorialHelp: "Templates with variables, one live file per employee",
    kind: "labor",
    hoursMin: 0,
    hoursMax: 50,
    costMin: 0,
    costMax: 0,
    hoursStep: 1,
  },
  {
    id: "paper_storage",
    label: "Paper, print & cabinet retrieval",
    rationale:
      "Printing, toner, filing, and time walking cabinets — Bermuda supply costs run higher than US averages.",
    factorialHelp: "Digital archive; less print-and-file per change",
    kind: "labor_and_cost",
    hoursMin: 0,
    hoursMax: 45,
    costMin: 0,
    costMax: 1200,
    hoursStep: 1,
  },
  {
    id: "onboarding",
    label: "Slow / manual onboarding",
    rationale:
      "~3–6 field hires/month plus office staff: packets by hand, managers chasing IDs and bank forms before someone is schedulable.",
    factorialHelp: "Mobile onboarding tasks, approvals, completion inbox",
    kind: "labor",
    hoursMin: 0,
    hoursMax: 40,
    costMin: 0,
    costMax: 0,
    hoursStep: 1,
  },
  {
    id: "training_admin",
    label: "Mandatory training admin (RUSO-style)",
    rationale:
      "Email tests, manual marking, paper files — no live “who still owes compliance” before officers go live.",
    factorialHelp: "LMS quizzes, completion %, certificates, expiry alarms",
    kind: "labor",
    hoursMin: 0,
    hoursMax: 45,
    costMin: 0,
    costMax: 0,
    hoursStep: 1,
  },
  {
    id: "performance",
    label: "Performance cycle slippage",
    rationale:
      "Paper appraisals that slip; catch-up bursts when cycles fall behind across supervisors.",
    factorialHelp: "Digital cycles, reminders, signed agreements",
    kind: "labor",
    hoursMin: 0,
    hoursMax: 35,
    costMin: 0,
    costMax: 0,
    hoursStep: 1,
  },
  {
    id: "dual_entry",
    label: "Double handling (TCP vs paperwork)",
    rationale:
      "Time lives in TCP; everything else on paper — re-keying, reconciling, and “which system is true?”",
    factorialHelp: "One employee record for time, docs, and training",
    kind: "labor",
    hoursMin: 0,
    hoursMax: 30,
    costMin: 0,
    costMax: 0,
    hoursStep: 1,
  },
];

export type DriverValues = Record<
  WasteDriverId,
  { hours: number; costUsd: number; enabled: boolean }
>;

export type RoiScenarioId = "conservative" | "call" | "stretch";

export type RoiScenario = {
  id: RoiScenarioId;
  label: string;
  description: string;
  hourlyCostUsd: number;
  values: DriverValues;
};

function v(
  partial: Partial<Record<WasteDriverId, { hours?: number; costUsd?: number }>>,
): DriverValues {
  const base = emptyDriverValues();
  for (const def of WASTE_DRIVERS) {
    const p = partial[def.id];
    if (p) {
      base[def.id] = {
        hours: p.hours ?? 0,
        costUsd: p.costUsd ?? 0,
        enabled: true,
      };
    }
  }
  return base;
}

export function emptyDriverValues(): DriverValues {
  return Object.fromEntries(
    WASTE_DRIVERS.map((d) => [
      d.id,
      { hours: 0, costUsd: 0, enabled: true },
    ]),
  ) as DriverValues;
}

/** Defensible presets — hours are HR/Ops/Compliance/manager time, not all 200 employees. */
export const ROI_SCENARIOS: readonly RoiScenario[] = [
  {
    id: "conservative",
    label: "Conservative",
    description:
      "Low assumption — only obvious admin time you could defend in a 15-minute CFO review.",
    hourlyCostUsd: 26,
    values: v({
      doc_chase: { hours: 28 },
      rework: { hours: 10 },
      paper_storage: { hours: 12, costUsd: 280 },
      onboarding: { hours: 8 },
      training_admin: { hours: 10 },
      performance: { hours: 6 },
      dual_entry: { hours: 5 },
    }),
  },
  {
    id: "call",
    label: "Based on your call",
    description:
      "Matches filing-cabinet chase, RUSO by email, and paper performance — scaled to ~200 people.",
    hourlyCostUsd: 28,
    values: v({
      doc_chase: { hours: 42 },
      rework: { hours: 18 },
      paper_storage: { hours: 20, costUsd: 420 },
      onboarding: { hours: 14 },
      training_admin: { hours: 20 },
      performance: { hours: 14 },
      dual_entry: { hours: 9 },
    }),
  },
  {
    id: "stretch",
    label: "Full opportunity",
    description:
      "If managers and compliance also reclaim time — still below 1.5 FTE equivalent per month.",
    hourlyCostUsd: 30,
    values: v({
      doc_chase: { hours: 58 },
      rework: { hours: 26 },
      paper_storage: { hours: 28, costUsd: 620 },
      onboarding: { hours: 22 },
      training_admin: { hours: 28 },
      performance: { hours: 20 },
      dual_entry: { hours: 14 },
    }),
  },
] as const;

export const DEFAULT_SCENARIO_ID: RoiScenarioId = "call";

export type WasteTotals = {
  totalHours: number;
  hardCostUsd: number;
  laborUsd: number;
  benefitMonthly: number;
  /** Full-time equivalent (160 h/month) */
  fteEquivalent: number;
  lines: {
    id: WasteDriverId;
    label: string;
    hours: number;
    costUsd: number;
    laborUsd: number;
    lineTotal: number;
  }[];
};

export function calculateWasteTotals(
  values: DriverValues,
  hourlyCostUsd: number,
): WasteTotals {
  const lines = WASTE_DRIVERS.map((def) => {
    const row = values[def.id];
    const enabled = row?.enabled ?? true;
    const hours = enabled ? Math.max(0, row?.hours ?? 0) : 0;
    const costUsd = enabled ? Math.max(0, row?.costUsd ?? 0) : 0;
    const laborUsd = hours * hourlyCostUsd;
    return {
      id: def.id,
      label: def.label,
      hours,
      costUsd,
      laborUsd,
      lineTotal: laborUsd + costUsd,
    };
  });

  const totalHours = lines.reduce((s, l) => s + l.hours, 0);
  const hardCostUsd = lines.reduce((s, l) => s + l.costUsd, 0);
  const laborUsd = lines.reduce((s, l) => s + l.laborUsd, 0);

  return {
    totalHours,
    hardCostUsd,
    laborUsd,
    benefitMonthly: laborUsd + hardCostUsd,
    fteEquivalent: totalHours / 160,
    lines,
  };
}

export function scenarioById(id: RoiScenarioId): RoiScenario {
  return ROI_SCENARIOS.find((s) => s.id === id) ?? ROI_SCENARIOS[1];
}

/** One-liner for proposal copy */
export function wasteContextLine(): string {
  return `Assumptions for ~${CLIENT.headcount} employees · ${CLIENT.market} · HR/Ops time, not officer wages.`;
}
