import mongoose, { Schema, Document, Types } from "mongoose";

export type LedgerDirection = "credit" | "debit";
export type LedgerEntryType =
  | "donation"
  | "manual_income"
  | "membership_fee"
  | "gateway_fee"
  | "refund"
  | "expense"
  | "reversal"
  | "opening"
  | "transfer";

export type LedgerSourceType =
  | "donation"
  | "income"
  | "expense"
  | "refund"
  | "settlement"
  | "member";

export interface ILedgerEntry extends Document {
  entryNo: string;
  effectiveDate: Date;
  postedAt: Date;
  fy: string;
  month: string;
  direction: LedgerDirection;
  amountPaise: number;
  type: LedgerEntryType;
  head: string;
  sourceType: LedgerSourceType;
  sourceId: Types.ObjectId;
  workAreaId?: string;
  initiativeId?: string;
  fundType: "general" | "restricted";
  paymentMethod?: string;
  bankAccountId?: Types.ObjectId;
  reconciliation: {
    status: "unreconciled" | "matched" | "reconciled";
    bankLineId?: Types.ObjectId;
    at?: Date;
    by?: string;
  };
  idempotencyKey: string;
  reversalOf?: Types.ObjectId;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const LedgerEntrySchema = new Schema<ILedgerEntry>(
  {
    entryNo: { type: String, required: true, unique: true, index: true },
    effectiveDate: { type: Date, required: true, index: true },
    postedAt: { type: Date, default: Date.now },
    fy: { type: String, required: true, index: true }, // e.g., '2025-26'
    month: { type: String, required: true, index: true }, // e.g., '2025-04'
    direction: { type: String, enum: ["credit", "debit"], required: true },
    amountPaise: { type: Number, required: true, min: 1 },
    type: {
      type: String,
      enum: [
        "donation",
        "manual_income",
        "membership_fee",
        "gateway_fee",
        "refund",
        "expense",
        "reversal",
        "opening",
        "transfer",
      ],
      required: true,
      index: true,
    },
    head: { type: String, required: true },
    sourceType: {
      type: String,
      enum: ["donation", "income", "expense", "refund", "settlement", "member"],
      required: true,
      index: true,
    },
    sourceId: { type: Schema.Types.ObjectId, required: true, index: true },
    workAreaId: { type: String, index: true },
    initiativeId: { type: String, index: true },
    fundType: { type: String, enum: ["general", "restricted"], default: "general" },
    paymentMethod: { type: String },
    bankAccountId: { type: Schema.Types.ObjectId, ref: "BankAccount" },
    reconciliation: {
      status: {
        type: String,
        enum: ["unreconciled", "matched", "reconciled"],
        default: "unreconciled",
        index: true,
      },
      bankLineId: { type: Schema.Types.ObjectId, ref: "BankStatementLine" },
      at: { type: Date },
      by: { type: String },
    },
    idempotencyKey: { type: String, required: true, unique: true, index: true },
    reversalOf: { type: Schema.Types.ObjectId, ref: "LedgerEntry" },
    createdBy: { type: String, default: "system" },
  },
  { timestamps: true }
);

// High-performance composite indexes for financial aggregations and audits
LedgerEntrySchema.index({ fy: 1, type: 1, workAreaId: 1 });
LedgerEntrySchema.index({ effectiveDate: -1, direction: 1 });
LedgerEntrySchema.index({ sourceType: 1, sourceId: 1 });

/**
 * Immutability Guard: Enforce append-only ledger principle.
 * Block any modifications to core financial fields once written.
 * Only the reconciliation sub-document may be updated.
 */
LedgerEntrySchema.pre("save", function () {
  if (!this.isNew) {
    const modifiedPaths = this.modifiedPaths();
    const illegalModifications = modifiedPaths.filter(
      (path) => !path.startsWith("reconciliation") && path !== "updatedAt"
    );
    if (illegalModifications.length > 0) {
      throw new Error(
        `LedgerEntry is immutable. Cannot modify paths: ${illegalModifications.join(", ")}`
      );
    }
  }
});

function checkUpdateImmutability(update: any) {
  if (!update) return;
  const updateKeys = Object.keys(update);
  for (const key of updateKeys) {
    if (key.startsWith("$")) {
      const subKeys = Object.keys(update[key]);
      for (const subKey of subKeys) {
        if (!subKey.startsWith("reconciliation") && subKey !== "updatedAt") {
          throw new Error(
            `LedgerEntry update blocked. Cannot update path: ${subKey}. Only reconciliation fields are mutable.`
          );
        }
      }
    } else if (!key.startsWith("reconciliation") && key !== "updatedAt") {
      throw new Error(
        `LedgerEntry update blocked. Cannot update path: ${key}. Only reconciliation fields are mutable.`
      );
    }
  }
}

LedgerEntrySchema.pre("findOneAndUpdate", function () {
  checkUpdateImmutability(this.getUpdate());
});

LedgerEntrySchema.pre("updateOne", function () {
  checkUpdateImmutability(this.getUpdate());
});

LedgerEntrySchema.pre("updateMany", function () {
  checkUpdateImmutability(this.getUpdate());
});

// Prevent document deletion to preserve complete financial history
LedgerEntrySchema.pre("deleteOne", function () {
  throw new Error("Ledger entries are append-only and cannot be deleted. Use reversal entries instead.");
});

LedgerEntrySchema.pre("findOneAndDelete", function () {
  throw new Error("Ledger entries are append-only and cannot be deleted. Use reversal entries instead.");
});

export const LedgerEntry = mongoose.model<ILedgerEntry>("LedgerEntry", LedgerEntrySchema);
