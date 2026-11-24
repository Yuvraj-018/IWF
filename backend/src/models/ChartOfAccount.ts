import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Chart of Accounts — the master list of accounting heads used by journals.
 * System accounts are seeded by accountingService.ensureChartOfAccounts();
 * each bank and cash account gets its own ledger account (1101…, 1201…).
 * Final heads and their treatment are to be approved by ISLAH's CA.
 */
export type AccountGroup = "asset" | "liability" | "fund" | "income" | "expense";

export interface IChartOfAccount extends Document {
  code: string;
  name: string;
  group: AccountGroup;
  /** Finer classification, e.g. bank, cash, clearing, donation, programme, organisational, capital. */
  category: string;
  /** Header accounts only group others; journals never post to them. */
  isHeader: boolean;
  parentCode?: string;
  /** Blueprint short code where one exists (EDU, ADE, BGC, …). */
  shortCode?: string;
  bankAccountId?: Types.ObjectId;
  cashAccountId?: Types.ObjectId;
  workAreaId?: string;
  isSystem: boolean;
  isActive: boolean;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChartOfAccountSchema = new Schema<IChartOfAccount>(
  {
    code: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    group: {
      type: String,
      enum: ["asset", "liability", "fund", "income", "expense"],
      required: true,
      index: true,
    },
    category: { type: String, required: true, index: true },
    isHeader: { type: Boolean, default: false },
    parentCode: { type: String, index: true },
    shortCode: { type: String, index: true },
    bankAccountId: { type: Schema.Types.ObjectId, ref: "BankAccount", index: true },
    cashAccountId: { type: Schema.Types.ObjectId, ref: "CashAccount", index: true },
    workAreaId: { type: String, index: true },
    isSystem: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    description: { type: String },
  },
  { timestamps: true }
);

/** Assets and expenses grow with debits; liabilities, funds and income with credits. */
export const DEBIT_NORMAL_GROUPS: AccountGroup[] = ["asset", "expense"];

export const ChartOfAccount = mongoose.model<IChartOfAccount>("ChartOfAccount", ChartOfAccountSchema);
