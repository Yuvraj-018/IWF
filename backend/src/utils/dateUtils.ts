/**
 * Utility functions for membership dates and validity calculations.
 *
 * Membership validity is counted in calendar months, as seen in India (IST):
 * the joining month counts as month 1, whatever the day, and validity ends at
 * 23:59:59.999 IST on the last day of the 12th month (or 24th for 2 years).
 *   Joining 5 Nov 2026 or 27 Nov 2026, 1 year  -> valid till 31 Oct 2027.
 *   Joining 15 Jan 2026, 1 year               -> valid till 31 Dec 2026.
 *
 * Everything is computed in IST, not the server's timezone, so a server running
 * on UTC (Docker, most VPS hosts) gives the same dates as one running on IST.
 */

const IST_OFFSET_MS = 330 * 60 * 1000;
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

/** Calendar year and month (0–11) of an instant, as seen in India. */
export function istYearMonth(date: Date): { year: number; month: number } {
  const shifted = new Date(date.getTime() + IST_OFFSET_MS);
  return { year: shifted.getUTCFullYear(), month: shifted.getUTCMonth() };
}

/** 23:59:59.999 IST on the last day of `month` (0–11; may overflow into other years). */
export function endOfIstMonth(year: number, month: number): Date {
  // Date.UTC(year, month + 1, 0) is the last day of `month`; 18:29:59.999 UTC = 23:59:59.999 IST.
  return new Date(Date.UTC(year, month + 1, 0, 18, 29, 59, 999));
}

/** Whole years between 1 and 10. */
function membershipYears(years: number | string | undefined): number {
  return Math.max(1, Math.min(10, Math.floor(Number(years)) || 1));
}

/**
 * Month (in IST) a stored expiry falls in. Expiries are always at the end of a
 * month; stepping back 12 hours also reads older records correctly, which were
 * saved as 23:59 in the server's timezone (on UTC servers that is already the
 * 1st of the next month in India).
 */
export function expiryYearMonth(expiry: Date): { year: number; month: number } {
  return istYearMonth(new Date(new Date(expiry).getTime() - TWELVE_HOURS_MS));
}

/** Expiry for a new membership starting at `startDate`. */
export function calculateMembershipExpiry(startDate: Date = new Date(), years: number = 1): Date {
  const { year, month } = istYearMonth(new Date(startDate));
  // The joining month is month 1, so validity ends with the month before it, `years` later.
  return endOfIstMonth(year + membershipYears(years), month - 1);
}

/**
 * Expiry after a renewal.
 * Still active: the new period starts the month after the current expiry.
 * Already expired: a fresh period starting with the current month.
 */
export function calculateMembershipRenewalExpiry(
  currentExpiry: Date | undefined | null,
  years: number = 1
): Date {
  const now = new Date();
  const period = membershipYears(years);
  if (currentExpiry && new Date(currentExpiry).getTime() > now.getTime()) {
    const { year, month } = expiryYearMonth(new Date(currentExpiry));
    return endOfIstMonth(year + period, month);
  }
  return calculateMembershipExpiry(now, period);
}
