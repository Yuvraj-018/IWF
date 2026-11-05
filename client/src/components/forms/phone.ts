import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
  type CountryCode,
} from "libphonenumber-js/mobile";
import { COUNTRY_NAME_BY_ISO } from "@/content/countryNames";

/**
 * Country dial codes, flags and mobile-number validation for every form.
 * Validation uses libphonenumber's mobile metadata, so each country gets its
 * real number lengths and prefixes (e.g. India: 10 digits starting 6–9).
 */

export interface PhoneCountry {
  iso: CountryCode;
  name: string;
  dial: string; // "+91"
}

function countryName(iso: string) {
  return COUNTRY_NAME_BY_ISO[iso] ?? iso;
}

/** Shown first, in this order: India, then the countries most of our donors call from. */
const PINNED: CountryCode[] = [
  "IN",
  "AE",
  "SA",
  "QA",
  "OM",
  "KW",
  "BH",
  "US",
  "GB",
  "CA",
  "AU",
  "SG",
  "MY",
];

export const PHONE_COUNTRIES: PhoneCountry[] = (() => {
  const all = getCountries().map((iso) => ({
    iso,
    name: countryName(iso),
    dial: `+${getCountryCallingCode(iso)}`,
  }));
  const pinned = PINNED.map((iso) => all.find((c) => c.iso === iso)).filter(
    (c): c is PhoneCountry => Boolean(c),
  );
  const rest = all
    .filter((c) => !PINNED.includes(c.iso))
    .sort((a, b) => a.name.localeCompare(b.name));
  return [...pinned, ...rest];
})();

export const PINNED_COUNT = PINNED.length;

/** Default country for a dial code ("+1" → US, "+44" → GB, "+91" → IN). */
export function countryForDial(dial: string): PhoneCountry | undefined {
  return PHONE_COUNTRIES.find((c) => c.dial === dial);
}

// Self-hosted flag images (country-flag-icons, 3:2 SVG). Emitted as separate files, not inlined.
const FLAG_FILES = import.meta.glob("/node_modules/country-flag-icons/3x2/*.svg", {
  eager: true,
  query: "?url&no-inline",
  import: "default",
}) as Record<string, string>;

const FLAGS: Record<string, string> = Object.fromEntries(
  Object.entries(FLAG_FILES).map(([path, url]) => [
    path.slice(path.lastIndexOf("/") + 1, -4).toUpperCase(),
    url,
  ]),
);

export function flagUrl(iso: string): string | undefined {
  return FLAGS[iso.toUpperCase()];
}

// ----------------------------------------------------------------------------
// Validation
// ----------------------------------------------------------------------------

const lengthCache = new Map<string, number[]>();

/** Valid national-number lengths for a country, e.g. IN → [10]. */
export function validLengths(iso: CountryCode): number[] {
  const cached = lengthCache.get(iso);
  if (cached) return cached;
  const lengths: number[] = [];
  for (let n = 4; n <= 15; n++) {
    if (validatePhoneNumberLength("9".repeat(n), iso) === undefined) lengths.push(n);
  }
  lengthCache.set(iso, lengths);
  return lengths;
}

export function maxDigits(dial: string): number {
  const c = countryForDial(dial);
  const lengths = c ? validLengths(c.iso) : [];
  return lengths.length ? Math.max(...lengths) : 15;
}

export function isValidPhone(dial: string, digits: string): boolean {
  if (!/^\d+$/.test(digits)) return false;
  const parsed = parsePhoneNumberFromString(`${dial}${digits}`);
  return Boolean(parsed?.isValid());
}

function lengthText(lengths: number[]) {
  if (!lengths.length) return "";
  if (lengths.length === 1) return `${lengths[0]} digits`;
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);
  return `${min}–${max} digits`;
}

/** A specific error message for an invalid number, or null when it is valid. */
export function phoneError(dial: string, digits: string): string | null {
  if (!digits) return "Enter your mobile number.";
  if (isValidPhone(dial, digits)) return null;
  const c = countryForDial(dial);
  if (!c) return "Enter a valid mobile number.";
  const lengths = lengthText(validLengths(c.iso));
  if (c.iso === "IN")
    return "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.";
  return `Enter a valid ${c.name} mobile number${lengths ? ` (${lengths})` : ""}.`;
}

export function phonePlaceholder(dial: string): string {
  if (dial === "+91") return "10-digit mobile number";
  const c = countryForDial(dial);
  const lengths = c ? lengthText(validLengths(c.iso)) : "";
  return lengths ? `Mobile number (${lengths})` : "Mobile number";
}

/** Country names for "Country" selects, India first. */
export const COUNTRY_NAMES: string[] = [
  "India",
  ...PHONE_COUNTRIES.filter((c) => c.iso !== "IN")
    .map((c) => c.name)
    .sort((a, b) => a.localeCompare(b)),
];
