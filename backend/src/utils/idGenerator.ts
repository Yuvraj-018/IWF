import { Verification } from "../models/Verification.js";
import { Donation } from "../models/Donation.js";
import { Member } from "../models/Member.js";
import { getNextSequence } from "../models/Counter.js";

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

export function generateReceiptNumber(seq: number, year?: number): string {
  const y = year || new Date().getFullYear();
  const padded = String(seq).padStart(5, "0");
  return `REC-${y}-${padded}`;
}

/**
 * Atomically generates sequential receipt numbers: REC-YYYY-XXXXX
 * Backed by Counter model to guarantee 0 collisions under high concurrency.
 */
export async function getNextReceiptNo(year?: number): Promise<string> {
  const y = year || new Date().getFullYear();
  const seq = await getNextSequence(`receipt_${y}`);
  return `REC-${y}-${String(seq).padStart(5, "0")}`;
}

/**
 * Atomically generates sequential expense numbers: EXP-YYYY-XXXXX
 */
export async function getNextExpenseNo(year?: number): Promise<string> {
  const y = year || new Date().getFullYear();
  const seq = await getNextSequence(`expense_${y}`);
  return `EXP-${y}-${String(seq).padStart(5, "0")}`;
}

/**
 * Atomically generates sequential transaction reference numbers: TXN-YYYY-XXXXX
 */
export async function getNextTransactionNo(year?: number): Promise<string> {
  const y = year || new Date().getFullYear();
  const seq = await getNextSequence(`transaction_${y}`);
  return `TXN-${y}-${String(seq).padStart(5, "0")}`;
}

/**
 * Atomically generates sequential refund reference numbers: REF-YYYY-XXXXX
 */
export async function getNextRefundNo(year?: number): Promise<string> {
  const y = year || new Date().getFullYear();
  const seq = await getNextSequence(`refund_${y}`);
  return `REF-${y}-${String(seq).padStart(5, "0")}`;
}

/**
 * Legacy wrapper: Delegated directly to atomic getNextReceiptNo()
 * to ensure 100% backward compatibility with zero race conditions.
 */
export async function getNextReceiptNumber(): Promise<string> {
  return getNextReceiptNo();
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
  const cat = categoryCode.toUpperCase();
  const seq = await getNextSequence(`member_${cat}_${year}`);
  const padded = String(seq).padStart(3, "0");
  return `ISLAH-${cat}-${year}-${padded}`;
}

export function generateApplicationNumber(type: string, seq: number): string {
  const year = new Date().getFullYear();
  const code = type.slice(0, 3).toUpperCase();
  const padded = String(seq).padStart(4, "0");
  return `ISLAH-${code}-${year}-${padded}`;
}
