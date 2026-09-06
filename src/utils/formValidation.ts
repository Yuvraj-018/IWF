import type { KeyboardEvent } from "react";

export const COUNTRY_CODES = [
  { code: "+91", label: "India", country: "India", flag: "🇮🇳" },
  { code: "+1", label: "USA/Canada", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", label: "UK", country: "UK", flag: "🇬🇧" },
  { code: "+971", label: "UAE", country: "UAE", flag: "🇦🇪" },
  { code: "+966", label: "Saudi Arabia", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+65", label: "Singapore", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", label: "Australia", country: "Australia", flag: "🇦🇺" },
  { code: "+974", label: "Qatar", country: "Qatar", flag: "🇶🇦" },
  { code: "+968", label: "Oman", country: "Oman", flag: "🇴🇲" },
  { code: "+965", label: "Kuwait", country: "Kuwait", flag: "🇰🇼" },
  { code: "+973", label: "Bahrain", country: "Bahrain", flag: "🇧🇭" },
  { code: "+60", label: "Malaysia", country: "Malaysia", flag: "🇲🇾" },
  { code: "+49", label: "Germany", country: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", country: "France", flag: "🇫🇷" },
];

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}


/**
 * Prevents numeric characters (0-9) from being typed into name fields.
 */
export function blockNumbersOnKeyDown(e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
  if (/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
}

/**
 * Strips all digits from a string (for names).
 */
export function sanitizeName(value: string): string {
  return value.replace(/[0-9]/g, "");
}

/**
 * Allows only numeric digits (0-9) and standard control/navigation keys.
 */
export function blockNonDigitsOnKeyDown(e: KeyboardEvent<HTMLInputElement>) {
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
    "Enter",
  ];

  if (e.ctrlKey || e.metaKey || allowedKeys.includes(e.key)) {
    return;
  }

  if (!/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
}

/**
 * Strips non-digits and restricts length (e.g. 10 for phone, 6 for PIN).
 */
export function sanitizeDigits(value: string, maxLength?: number): string {
  const digits = value.replace(/\D/g, "");
  return maxLength ? digits.slice(0, maxLength) : digits;
}
