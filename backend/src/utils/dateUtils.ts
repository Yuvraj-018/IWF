/**
 * Utility functions for membership dates and validity calculations
 */

/**
 * Calculates month-wise membership expiry for a fresh registration.
 * Rules:
 * Joining in Month M of Year Y gives validity till the last calendar day of Month (M - 1) in Year (Y + years).
 * E.g., Joining on Nov 5, 2026 for 1 year -> valid till Oct 31, 2027 23:59:59.999.
 * Joining on Jan 15, 2026 for 1 year -> valid till Dec 31, 2026 23:59:59.999.
 */
export function calculateMembershipExpiry(startDate: Date = new Date(), years: number = 1): Date {
  const start = new Date(startDate);
  const period = Number(years) === 2 ? 2 : 1;
  // Day 0 of start.getMonth() in year (start.getFullYear() + period) resolves to the last day of the preceding month
  return new Date(start.getFullYear() + period, start.getMonth(), 0, 23, 59, 59, 999);
}

/**
 * Calculates membership renewal expiry.
 * If currently active (currentExpiry > now):
 *   Extends validity by `years` years from the current expiry date (preserving month-end).
 * If already expired:
 *   Calculates fresh month-wise validity starting from now.
 */
export function calculateMembershipRenewalExpiry(currentExpiry: Date | undefined | null, years: number = 1): Date {
  const now = new Date();
  const period = Number(years) === 2 ? 2 : 1;
  if (currentExpiry && new Date(currentExpiry).getTime() > now.getTime()) {
    const renewalDate = new Date(currentExpiry);
    renewalDate.setFullYear(renewalDate.getFullYear() + period);
    return renewalDate;
  }
  return calculateMembershipExpiry(now, period);
}

