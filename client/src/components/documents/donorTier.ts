/**
 * Donor recognition tiers, based on the amount of a single donation.
 * Change the thresholds here — the donate summary card and the
 * appreciation certificate both read from this list.
 */
export type DonorTier = "Silver" | "Gold" | "Platinum";

export interface DonorTierInfo {
  tier: DonorTier;
  label: string;
  /** Minimum amount in ₹ (inclusive). */
  min: number;
}

export const DONOR_TIERS: DonorTierInfo[] = [
  { tier: "Platinum", label: "Platinum Donor", min: 50_000 },
  { tier: "Gold", label: "Gold Donor", min: 20_000 },
  { tier: "Silver", label: "Silver Donor", min: 0 },
];

export function donorTierFor(amount: number): DonorTierInfo {
  return DONOR_TIERS.find((t) => amount >= t.min) ?? DONOR_TIERS[DONOR_TIERS.length - 1];
}

/** "Gold Donor · ₹20,000 – ₹49,999" style range text for a tier. */
export function tierRangeText(info: DonorTierInfo): string {
  const i = DONOR_TIERS.indexOf(info);
  const upper = i > 0 ? DONOR_TIERS[i - 1].min - 1 : null;
  const fmt = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  if (upper === null) return `${fmt(info.min)} and above`;
  if (info.min === 0) return `Up to ${fmt(upper)}`;
  return `${fmt(info.min)} – ${fmt(upper)}`;
}
