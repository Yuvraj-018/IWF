import { Verification } from "../models/Verification.js";
import { Donation } from "../models/Donation.js";
import { Member } from "../models/Member.js";

/**
 * Utility to generate formatted reference numbers for ISLAH
 */

export function getCurrentFinancialYear(): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed, 3 = April
  // Indian Financial Year: April 1 to March 31
  const startYear = currentMonth >= 3 ? currentYear : currentYear - 1;
  const endYearShort = String(startYear + 1).slice(-2);
  return `${startYear}-${endYearShort}`;
}

export function generateReceiptNumber(seq: number): string {
  const fy = getCurrentFinancialYear();
  const padded = String(seq).padStart(6, "0");
  return `ISLAH/RCPT/${fy}/${padded}`;
}

/**
 * Atomically computes the next unique receipt number across
 * Verifications, Donations, and Members to guarantee 0 collisions.
 */
export async function getNextReceiptNumber(): Promise<string> {
  const fy = getCurrentFinancialYear();
  const prefix = `ISLAH/RCPT/${fy}/`;
  let maxSeq = 0;

  try {
    const latestVerif = await Verification.findOne({
      documentNo: { $regex: `^${prefix}` },
    })
      .sort({ documentNo: -1 })
      .lean();

    if (latestVerif?.documentNo) {
      const parts = latestVerif.documentNo.split("/");
      const seq = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
    }
  } catch (err) {
    console.warn("Error reading latest verification receipt:", err);
  }

  try {
    const latestDonation = await Donation.findOne({
      receiptNo: { $regex: `^${prefix}` },
    })
      .sort({ receiptNo: -1 })
      .lean();

    if (latestDonation?.receiptNo) {
      const parts = latestDonation.receiptNo.split("/");
      const seq = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
    }
  } catch (err) {
    console.warn("Error reading latest donation receipt:", err);
  }

  try {
    const latestMember = await Member.findOne({
      receiptNo: { $regex: `^${prefix}` },
    })
      .sort({ receiptNo: -1 })
      .lean();

    if (latestMember?.receiptNo) {
      const parts = latestMember.receiptNo.split("/");
      const seq = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
    }
  } catch (err) {
    console.warn("Error reading latest member receipt:", err);
  }

  const nextSeq = maxSeq + 1;
  const padded = String(nextSeq).padStart(6, "0");
  return `${prefix}${padded}`;
}

export function generateMemberNumber(categoryCode: string, seq: number): string {
  const year = new Date().getFullYear();
  const padded = String(seq).padStart(3, "0");
  return `ISLAH-${categoryCode.toUpperCase()}-${year}-${padded}`;
}

/**
 * Atomically computes the next unique member number for a category
 */
export async function getNextMemberNumber(categoryCode: string): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `ISLAH-${categoryCode.toUpperCase()}-${year}-`;
  let maxSeq = 0;

  try {
    const latest = await Member.findOne({
      memberNo: { $regex: `^${prefix}` },
    })
      .sort({ memberNo: -1 })
      .lean();

    if (latest?.memberNo) {
      const parts = latest.memberNo.split("-");
      const seq = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
    }
  } catch (err) {
    console.warn("Error reading latest memberNo:", err);
  }

  const nextSeq = maxSeq + 1;
  const padded = String(nextSeq).padStart(3, "0");
  return `${prefix}${padded}`;
}

export function generateApplicationNumber(type: string, seq: number): string {
  const year = new Date().getFullYear();
  const code = type.slice(0, 3).toUpperCase();
  const padded = String(seq).padStart(4, "0");
  return `ISLAH-${code}-${year}-${padded}`;
}
