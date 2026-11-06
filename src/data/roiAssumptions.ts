/** Commercial proposal data — Factorial-first, negotiation-scoped */

export const CLIENT = {
  name: "Security Associates",
  legalName: "Security Associates Limited",
  market: "Bermuda",
  headcount: 200,
  currency: "USD",
  website: "https://www.sabermuda.com/",
  logoPath: `${import.meta.env.BASE_URL}sa-logo-square.png`,
} as const;

export const PRICING = {
  listMonthlyUsd: 2000,
  blackFridayDiscountPct: 30,
} as const;

export const DEFAULT_ASSUMPTIONS = {
  headcount: 200,
  hoursSavedPerMonth: 50,
  hourlyCostUsd: 28,
  blackFridayOn: true,
  implementationOneShotUsd: 0,
} as const;

export const HOUR_BREAKDOWN = [
  {
    process: "Document chase & filing cabinets",
    hours: 22,
    help: "Cloud docs, e-sign, incomplete filters, bulk reminders",
  },
  {
    process: "Letters / templates / bulk distribution",
    hours: 8,
    help: "Document templates with employee variables; bulk send",
  },
  {
    process: "Performance appraisals (paper)",
    hours: 10,
    help: "Digital review cycles + automatic reminders",
  },
  {
    process: "RUSO / compliance training tracking",
    hours: 10,
    help: "LMS courses, knowledge tests, completion & certificates",
  },
] as const;

export const PAINS = [
  {
    title: "Document chase is your biggest gap",
    quote:
      "Keeping up with paperwork, handing out the correct documents and getting everything back can be quite a chase.",
    impact:
      "HR time stays locked in low-value follow-ups instead of higher-value work across ~200 people.",
  },
  {
    title: "Employee records still live in cabinets",
    quote: "Currently it's manually — we have everything in our filing cabinets.",
    impact:
      "Slow retrieval, printing cost, and harder proof when Ops or Finance needs a file fast.",
  },
  {
    title: "Performance still falls behind on paper",
    quote:
      "Appraisals can fall behind — the organization of all of that right now is all paperwork.",
    impact:
      "Review cycles slip without reminders, signed agreements, or a single place to track completion.",
  },
  {
    title: "Mandatory training is email + a file",
    quote:
      "Open-book test sent by email; compliance officer marks it and it goes in the file. Very manual.",
    impact:
      "No live completion dashboard before officers are fully productive — high manual load for compliance.",
  },
] as const;

export const STACK_TODAY = [
  { area: "Time off / sick / accruals", tool: "TCP", status: "Working" },
  { area: "Clock in / out", tool: "TCP app (needs internet)", status: "Working" },
  { area: "Scheduling", tool: "Scheduling app (not full HR)", status: "Partial" },
  { area: "Employee documents", tool: "Filing cabinets + print", status: "Gap" },
  { area: "Onboarding paperwork", tool: "Print / manual chase", status: "Gap" },
  { area: "RUSO / compliance training", tool: "PDF by email + paper file", status: "Manual" },
  { area: "Payroll", tool: "Outsourced accountant", status: "External" },
  { area: "Performance", tool: "Paper", status: "Gap" },
] as const;

/** Feature → Benefit → Impact (F25 Feature Map, negotiation scope only) */
export const SOLUTION_PILLARS = [
  {
    module: "Documents",
    featureMapRef: "Core · Document Management",
    painLink: "Filing cabinets & document chase",
    feature:
      "Cloud employee folders, unlimited legally valid e-signature (desktop & mobile), filters by signed/status, bulk send & signature reminders, and document templates (PDF/DOCX) that auto-fill employee variables — including document tasks inside onboarding workflows.",
    benefit:
      "You stop printing, chasing, and guessing which documents are still outstanding.",
    impact:
      "One source of truth for every employee file; incomplete work is visible in a filter, not in a cabinet.",
  },
  {
    module: "Onboarding & workflows",
    featureMapRef: "Core · Automations, processes and tasks",
    painLink: "Day-zero paperwork chase",
    feature:
      "Mobile onboarding with guided tasks, approval flows, inbox notifications, and bulk task completion — so IDs, bank details, emergency contacts and contracts are requested once and tracked to done.",
    benefit:
      "New hires complete their pack on the phone; HR sees what is pending without chasing.",
    impact:
      "Faster day-zero readiness and less rework before people hit the schedule.",
  },
  {
    module: "Time Tracking",
    featureMapRef: "Time Tracking",
    painLink: "TCP clocking (internet-only today)",
    feature:
      "Clock in/out on mobile or desktop, geolocation, geofencing alerts for inconsistencies, timesheet approvals, overtime rules, and bank of hours / compensation options.",
    benefit:
      "Same simplicity officers already expect from an app — with stronger location controls and overtime visibility for managers.",
    impact:
      "Cleaner attendance data for Operations and for your external accountant.",
  },
  {
    module: "Time Off",
    featureMapRef: "Time Off",
    painLink: "Vacation & sick already in TCP",
    feature:
      "Employee self-service requests on mobile, multi-level approvals, attach documents on absences, accruals/counters, and smart approval context so managers see conflicts and balances.",
    benefit:
      "Keep the request → approve flow you already like — now connected to the same employee profile as documents and time.",
    impact:
      "One ecosystem instead of time in TCP and paperwork somewhere else.",
  },
  {
    module: "Trainings & LMS",
    featureMapRef: "Trainings + LMS",
    painLink: "RUSO PDF by email, marked by hand",
    feature:
      "MyTraining on mobile, course builder with modules/quizzes, knowledge tests, attendance & completion tracking, certificates, and validity/expiration alarms for compliance courses.",
    benefit:
      "Replace email round-trips with a tracked course: who started, who passed, who still needs to finish.",
    impact:
      "Compliance evidence on demand — before (or as) officers go fully live.",
  },
  {
    module: "Performance",
    featureMapRef: "Performance",
    painLink: "Appraisals on paper that slip",
    feature:
      "Configurable review cycles, automatic participation reminders, signed performance agreements, scores & heatmaps, and AI-assisted review summaries.",
    benefit:
      "Reviews stop depending on who remembered the paperwork that month.",
    impact:
      "Managers and HR see completion rates; employees get a clear, signed outcome.",
  },
] as const;

export const EXTRA_VALUE = {
  title: "Also in scope for your stack",
  items: [
    {
      label: "Compensation & payslips",
      text: "Prepare payroll variables for your external accountant and distribute payslips in bulk with smart document reading — no one-by-one send.",
    },
    {
      label: "One (Factorial AI)",
      text: "Ask grounded questions about policies, time off, and people data inside Factorial permissions — lighter UX than a heavy ERP, with AI where it helps.",
    },
  ],
} as const;

export const OBJECTIONS = [
  {
    concern: "Our officers are not very tech-heavy",
    answer:
      "They already use TCP on mobile. Factorial’s employee app is built for simple self-service (clock, leave, documents, training). We share short videos so Operations can validate with the field team before you commit.",
  },
  {
    concern: "TCP already covers time",
    answer:
      "Keep what works, or consolidate later. The ROI case is documents, onboarding chase, training evidence, and performance — the gaps that are still paper today.",
  },
  {
    concern: "CFO still needs to approve",
    answer:
      "This page is Finance-ready: list price, Black Friday −30%, and a live payback calculator you can stress-test together.",
  },
  {
    concern: "Change management",
    answer:
      "Phased rollout: Documents & onboarding first → time → training / performance. Office team first, then officers.",
  },
] as const;

export const NEXT_STEPS = [
  "Share this Factorial proposal and short employee-app videos with HR, Operations, and Finance.",
  "Validate the hour assumptions in the ROI calculator with the team that lives the document chase.",
  "Return with a decision path for the CFO (list vs Black Friday).",
  "If green light: kickoff Documents-first, then time and training.",
] as const;
