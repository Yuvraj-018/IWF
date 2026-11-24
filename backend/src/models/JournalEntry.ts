import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Double-entry journal. Every financial event (donation, membership fee, expense
 * payment, refund, transfer, gateway settlement, opening balance) is posted as one
 * balanced journal: total debits must equal total credits.
 *
 * Journals are append-only: amounts and lines can never be edited or deleted.
 * Corrections are made with a reversing journal (status "reversed" + reversedBy).
 */
export type JournalSourceType =
  | "donation"
  | "membership"
  | "expense"
  | "refund"
  | "transfer"
  | "settlement"
  | "opening_balance"
  | "reversal"
  | "manual";

export interface IJournalLine {
  accountCode: string;
  accountName: string;
  debitPaise: number;
  creditPaise: number;
  workAreaId?: string;
  initiativeId?: string;
  fundType: "general" | "restricted";
  bankAccountId?: Types.ObjectId;
  cashAccountId?: Types.ObjectId;
  memo?: string;
}

export interface IJournalEntry extends Document {
  journalNo: string;
  /** Financial (transaction) date. */
  date: Date;
  /** When it was recorded in the system. */
  postedAt: Date;
  fy: string;
  month: string;
  narration: string;
  sourceType: JournalSourceType;
  sourceId?: Types.ObjectId;
  /** Human reference: receipt no., expense no., transfer no., UTR … */
  sourceRef?: string;
  lines: IJournalLine[];
  totalPaise: number;
  status: "posted" | "reversed";
  reversalOf?: Types.ObjectId;
  reversedBy?: Types.ObjectId;
  idempotencyKey: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const JournalLineSchema = new Schema<IJournalLine>(
  {
    accountCode: { type: String, required: true, index: true },
    accountName: { type: String, required: true },
    debitPaise: { type: Number, default: 0, min: 0 },
    creditPaise: { type: Number, default: 0, min: 0 },
    workAreaId: { type: String },
    initiativeId: { type: String },
    fundType: { type: String, enum: ["general", "restricted"], default: "general" },
    bankAccountId: { type: Schema.Types.ObjectId, ref: "BankAccount" },
    cashAccountId: { type: Schema.Types.ObjectId, ref: "CashAccount" },
    memo: { type: String },
  },
  { _id: false }
);

const JournalEntrySchema = new Schema<IJournalEntry>(
  {
    journalNo: { type: String, required: true, unique: true, index: true },
    date: { type: Date, required: true, index: true },
    postedAt: { type: Date, default: Date.now },
    fy: { type: String, required: true, index: true },
    month: { type: String, required: true, index: true },
    narration: { type: String, required: true },
    sourceType: {
      type: String,
      enum: ["donation", "membership", "expense", "refund", "transfer", "settlement", "opening_balance", "reversal", "manual"],
      required: true,
      index: true,
    },
    sourceId: { type: Schema.Types.ObjectId, index: true },
    sourceRef: { type: String, index: true },
    lines: { type: [JournalLineSchema], required: true },
    totalPaise: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ["posted", "reversed"], default: "posted", index: true },
    reversalOf: { type: Schema.Types.ObjectId, ref: "JournalEntry" },
    reversedBy: { type: Schema.Types.ObjectId, ref: "JournalEntry" },
    idempotencyKey: { type: String, required: true, unique: true, index: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

JournalEntrySchema.index({ "lines.accountCode": 1, date: 1 });
JournalEntrySchema.index({ "lines.bankAccountId": 1, date: 1 });
JournalEntrySchema.index({ "lines.cashAccountId": 1, date: 1 });

/** Balance rule: at least two lines, each one-sided whole paise, debits = credits. */
JournalEntrySchema.pre("validate", function () {
  if (!this.isNew) return;
  const lines = this.lines || [];
  if (lines.length < 2) throw new Error("A journal needs at least two lines.");
  let debit = 0;
  let credit = 0;
  for (const l of lines) {
    const d = Number(l.debitPaise || 0);
    const c = Number(l.creditPaise || 0);
    if (!Number.isInteger(d) || !Number.isInteger(c)) throw new Error("Journal amounts must be whole paise.");
    if ((d > 0) === (c > 0)) throw new Error(`Line ${l.accountCode} must have either a debit or a credit.`);
    debit += d;
    credit += c;
  }
  if (debit !== credit) throw new Error(`Journal does not balance: debits ${debit} ≠ credits ${credit} (paise).`);
  this.totalPaise = debit;
});

/** Append-only: only the reversal link may change after posting. */
JournalEntrySchema.pre("save", function () {
  if (this.isNew) return;
  const illegal = this.modifiedPaths().filter((p) => !["status", "reversedBy", "updatedAt"].includes(p));
  if (illegal.length) throw new Error(`Journals are immutable. Cannot modify: ${illegal.join(", ")}`);
});

function blockUpdate(update: any) {
  if (!update) return;
  const keys = Object.keys(update).flatMap((k) => (k.startsWith("$") ? Object.keys(update[k]) : [k]));
  const illegal = keys.filter((k) => !["status", "reversedBy", "updatedAt"].includes(k));
  if (illegal.length) throw new Error(`Journals are immutable. Cannot update: ${illegal.join(", ")}`);
}
JournalEntrySchema.pre("findOneAndUpdate", function () {
  blockUpdate(this.getUpdate());
});
JournalEntrySchema.pre("updateOne", function () {
  blockUpdate(this.getUpdate());
});
JournalEntrySchema.pre("updateMany", function () {
  blockUpdate(this.getUpdate());
});
JournalEntrySchema.pre("deleteOne", function () {
  throw new Error("Journals cannot be deleted. Post a reversing journal instead.");
});
JournalEntrySchema.pre("deleteMany", function () {
  throw new Error("Journals cannot be deleted. Post a reversing journal instead.");
});
JournalEntrySchema.pre("findOneAndDelete", function () {
  throw new Error("Journals cannot be deleted. Post a reversing journal instead.");
});

export const JournalEntry = mongoose.model<IJournalEntry>("JournalEntry", JournalEntrySchema);
