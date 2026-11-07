/**
 * Current openings shown on /careers.
 *
 * To publish a role, add an entry below. To withdraw one, delete it — roles whose
 * `lastDate` has passed are hidden automatically. Keep `id` unique and URL-safe.
 */

export type EmploymentType = "Full-Time" | "Part-Time" | "Contract" | "Internship";
export type ExperienceBand = "Fresher / Intern" | "1–2 Years" | "2–5 Years" | "5+ Years";
export type OpeningIcon = "programme" | "field" | "data" | "health" | "communication" | "intern";

export interface CareerOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: EmploymentType;
  experience: string;
  experienceBand: ExperienceBand;
  /** ISO date (YYYY-MM-DD); the role is hidden after this date. */
  lastDate: string;
  reportsTo: string;
  icon: OpeningIcon;
  summary: string;
  responsibilities: string[];
  eligibility: string[];
}

export const CAREER_OPENINGS: CareerOpening[] = [];

export const GENERAL_APPLICATION = "General Application (CV for future openings)";

/** Openings whose last date has not passed. */
export function activeOpenings(today = new Date()): CareerOpening[] {
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  return CAREER_OPENINGS.filter((o) => new Date(`${o.lastDate}T23:59:59`) >= t);
}

export function formatLastDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
