/** Negotiation-critical modules for the interactive hero (not a 1:1 copy of template data). */

export type ShowcaseModule = {
  id: string;
  name: string;
  category: string;
  tag: string;
  summary: string;
  services: readonly string[];
  outcome: string;
  preview: "documents" | "onboarding" | "training" | "performance";
};

export const SHOWCASE_MODULES: readonly ShowcaseModule[] = [
  {
    id: "documents",
    name: "Documents",
    category: "Core",
    tag: "Priority gap",
    summary:
      "Cloud folders, e-sign, and filters that show what is still unsigned — instead of cabinet chase across ~200 people.",
    services: ["E-sign", "Templates", "Bulk send", "Onboarding tasks"],
    outcome: "One file per employee; outstanding work visible in a filter.",
    preview: "documents",
  },
  {
    id: "onboarding",
    name: "Onboarding",
    category: "Workflows",
    tag: "Day zero",
    summary:
      "Mobile task packs for IDs, contracts, and bank details — tracked to done without email ping-pong.",
    services: ["Task inbox", "Approvals", "Mobile pack", "Reminders"],
    outcome: "HR sees pending steps before people hit the schedule.",
    preview: "onboarding",
  },
  {
    id: "training",
    name: "Trainings & LMS",
    category: "Compliance",
    tag: "RUSO / mandatory",
    summary:
      "Courses, quizzes, and completion dashboards — replacing PDF-by-email and paper marking.",
    services: ["MyTraining", "Quizzes", "Certificates", "Expiry alarms"],
    outcome: "Evidence of who passed before officers go fully live.",
    preview: "training",
  },
  {
    id: "performance",
    name: "Performance",
    category: "Reviews",
    tag: "Paper today",
    summary:
      "Review cycles with reminders and signed agreements so appraisals do not slip month to month.",
    services: ["Cycles", "Reminders", "Signed agreements", "Heatmaps"],
    outcome: "Completion rates visible to HR and managers.",
    preview: "performance",
  },
] as const;

export const NAV_SECTIONS = [
  { id: "showcase", label: "Solution" },
  { id: "needs", label: "Problem" },
  { id: "stack", label: "Gaps" },
  { id: "roi", label: "Investment" },
  { id: "objections", label: "FAQ" },
] as const;
