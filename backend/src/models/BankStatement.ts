import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBankStatement extends Document {
  bankAccountId: Types.ObjectId;
  periodFrom: Date;
  periodTo: Date;
  uploadedBy: string;
  fileUrl?: string;
  lineCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type StatementMatchStatus = "unmatched" | "matched" | "suggested" | "ignored";

export interface IBankStatementLine extends Document {
  statementId: Types.ObjectId;
  date: Date;
  narration: string;
  reference?: string;
  creditPaise: number;
  debitPaise: number;
  balancePaise?: number;
  matchStatus: StatementMatchStatus;
  matchedLedgerEntryId?: Types.ObjectId;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BankStatementSchema = new Schema<IBankStatement>(
  {
    bankAccountId: { type: Schema.Types.ObjectId, ref: "BankAccount", required: true },
    periodFrom: { type: Date, required: true },
    periodTo: { type: Date, required: true },
    uploadedBy: { type: String, required: true },
    fileUrl: { type: String },
    lineCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BankStatementLineSchema = new Schema<IBankStatementLine>(
  {
    statementId: { type: Schema.Types.ObjectId, ref: "BankStatement", required: true, index: true },
    date: { type: Date, required: true, index: true },
    narration: { type: String, required: true },
    reference: { type: String, index: true },
    creditPaise: { type: Number, default: 0 },
    debitPaise: { type: Number, default: 0 },
    balancePaise: { type: Number },
    matchStatus: {
      type: String,
      enum: ["unmatched", "matched", "suggested", "ignored"],
      default: "unmatched",
      index: true,
    },
    matchedLedgerEntryId: { type: Schema.Types.ObjectId, ref: "LedgerEntry" },
    notes: { type: String },
  },
  { timestamps: true }
);

BankStatementLineSchema.index({ statementId: 1, date: -1 });
BankStatementLineSchema.index({ reference: 1, creditPaise: 1 });

export const BankStatement = mongoose.model<IBankStatement>("BankStatement", BankStatementSchema);
export const BankStatementLine = mongoose.model<IBankStatementLine>(
  "BankStatementLine",
  BankStatementLineSchema
);

