/** Enterprise Monthly USD pricing — Business is never sold */

export const BLACK_FRIDAY_PCT = 30;
export const SEAT_FLOOR = 14;
export const DEFAULT_SEATS = 200;

/** Locked commercial package for Security Associates */
export const BASE_BUNDLE = {
  id: "consulting-pro",
  name: "Consulting PRO",
  tier: "Enterprise",
  billing: "Monthly",
  pricePerSeat: 7.4,
  includes: [
    "Core",
    "Time Tracking",
    "Time Off",
    "Projects",
    "Recruitment",
    "Trainings",
    "Performance",
    "Expenses",
  ],
} as const;

export type LmsOption = "none" | "lms" | "lms_ai";

export const LMS_OPTIONS: {
  id: LmsOption;
  label: string;
  pricePerSeat: number;
  hint: string;
}[] = [
  {
    id: "none",
    label: "No LMS",
    pricePerSeat: 0,
    hint: "Trainings (sessions) stay in Consulting PRO; no LMS course builder",
  },
  {
    id: "lms",
    label: "LMS",
    pricePerSeat: 1.6,
    hint: "Default for this proposal — Trainings already included in Consulting PRO",
  },
  {
    id: "lms_ai",
    label: "LMS + AI Literacy",
    pricePerSeat: 1.8,
    hint: "LMS bundle with AI Literacy",
  },
];

export type AddonId =
  | "shift"
  | "engagement"
  | "trust"
  | "benefits"
  | "space"
  | "software"
  | "inventory"
  | "accounts_payable"
  | "spending";

export type AddonDef = {
  id: AddonId;
  label: string;
  /** Per-seat monthly USD; 0 if fixed-only */
  pricePerSeat: number;
  /** Fixed monthly USD */
  fixedMonthly: number;
  hint: string;
};

/** Add-ons NOT already inside Consulting PRO (Recruitment excluded on purpose) */
export const OPTIONAL_ADDONS: AddonDef[] = [
  {
    id: "shift",
    label: "Shift Management",
    pricePerSeat: 1.9,
    fixedMonthly: 0,
    hint: "Per seat · Enterprise Monthly",
  },
  {
    id: "engagement",
    label: "Engagement",
    pricePerSeat: 2.1,
    fixedMonthly: 0,
    hint: "Per seat · Enterprise Monthly",
  },
  {
    id: "trust",
    label: "Trust Channel",
    pricePerSeat: 1.6,
    fixedMonthly: 0,
    hint: "Per seat",
  },
  {
    id: "benefits",
    label: "Benefits",
    pricePerSeat: 3.2,
    fixedMonthly: 0,
    hint: "Per seat",
  },
  {
    id: "space",
    label: "Space Management",
    pricePerSeat: 1.6,
    fixedMonthly: 0,
    hint: "Per seat",
  },
  {
    id: "software",
    label: "Software Management",
    pricePerSeat: 1.6,
    fixedMonthly: 0,
    hint: "Per seat",
  },
  {
    id: "inventory",
    label: "Inventory Management",
    pricePerSeat: 1.6,
    fixedMonthly: 0,
    hint: "Per seat",
  },
  {
    id: "accounts_payable",
    label: "Accounts Payable",
    pricePerSeat: 0,
    fixedMonthly: 82.5,
    hint: "Fixed monthly",
  },
  {
    id: "spending",
    label: "Spending Management",
    pricePerSeat: 0,
    fixedMonthly: 49.2,
    hint: "Fixed · Accounts Payable + Expenses add-on bundle",
  },
];

export const DEFAULT_LMS: LmsOption = "lms";
export const DEFAULT_ADDONS: AddonId[] = [];
