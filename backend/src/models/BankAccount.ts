import mongoose, { Schema, Document } from "mongoose";

/**
 * Bank Account Register (Finance blueprint §2A). One record per bank account,
 * each with its own ledger account (ledgerAccountCode) in the Chart of Accounts.
 * Balances come from posted journals; currentBalancePaise is a cache refreshed
 * after every posting so older screens keep showing live figures.
 */
export interface IBankAccount extends Document {
  bankName: string;
  /** Legal account holder: ISLAH Welfare Foundation / Erawin Public School / other. */
  accountName: string;
  /** Full number — only returned to users with finance.bank_account:view_pii. */
  accountNumber?: string;
  accountNumberMasked: string;
  ifsc: string;
  branch?: string;
  type: "current" | "savings" | "other";
  purpose: "general" | "programme" | "grant" | "other";
  office: "registered" | "administrative" | "regional" | "other";
  fundClassification: "general" | "restricted" | "specific";
  openingBalancePaise: number;
  openingDate?: Date;
  status: "active" | "inactive" | "closed";
  integrationStatus: "manual" | "statement_import" | "api";
  ledgerAccountCode?: string;
  currentBalancePaise: number;
  isPrimary: boolean;
  notes?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export function maskAccountNumber(num?: string): string {
  const digits = String(num || "").replace(/\s/g, "");
  if (!digits) return "";
  return digits.length <= 4 ? digits : `${"*".repeat(Math.max(digits.length - 4, 4))}${digits.slice(-4)}`;
}

const BankAccountSchema = new Schema<IBankAccount>(
  {
    bankName: { type: String, required: true, trim: true },
    accountName: { type: String, default: "Islah Welfare Foundation", trim: true },
    accountNumber: { type: String, trim: true, select: false },
    accountNumberMasked: { type: String, required: true },
    ifsc: { type: String, required: true, uppercase: true, trim: true },
    branch: { type: String, trim: true },
    type: { type: String, enum: ["current", "savings", "other"], default: "current" },
    purpose: { type: String, enum: ["general", "programme", "grant", "other"], default: "general" },
    office: { type: String, enum: ["registered", "administrative", "regional", "other"], default: "registered" },
    fundClassification: { type: String, enum: ["general", "restricted", "specific"], default: "general" },
    openingBalancePaise: { type: Number, default: 0 },
    openingDate: { type: Date },
    status: { type: String, enum: ["active", "inactive", "closed"], default: "active", index: true },
    integrationStatus: { type: String, enum: ["manual", "statement_import", "api"], default: "manual" },
    ledgerAccountCode: { type: String, index: true },
    currentBalancePaise: { type: Number, default: 0 },
    isPrimary: { type: Boolean, default: false },
    notes: { type: String },
    createdBy: { type: String },
  },
  { timestamps: true }
);

export const BankAccount = mongoose.model<IBankAccount>("BankAccount", BankAccountSchema);
