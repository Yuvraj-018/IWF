import { COUNTRY_NAMES } from "./phone";

export { isValidPhone, phoneError } from "./phone";

/** Shared validation rules and option lists for all site application forms. */

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const URL_RE = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i;
export const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/** Country names for "Country" selects, India first. */
export const COUNTRIES = COUNTRY_NAMES;

export const AGE_GROUPS = ["18–24", "25–34", "35–44", "45–54", "55 and above"];
export const GENDERS = ["Female", "Male", "Other", "Prefer not to say"];

export const QUALIFICATIONS = [
  "Secondary (Class 10)",
  "Higher Secondary (Class 12)",
  "Diploma / Certificate",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "Professional Qualification (CA, LLB, MBBS etc.)",
  "Other",
];
