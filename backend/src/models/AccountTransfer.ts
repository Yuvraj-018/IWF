import mongoose, { Schema, Document, Types } from "mongoose";

/**
 * Movements between ISLAH's own accounts. These are never income or expenditure:
 *   withdrawal      bank -> cash   (cash withdrawal from bank)
 *   deposit         cash -> bank   (cash deposited into bank)
 *   bank_transfer   bank -> bank   (inter-bank transfer)
 *   cash_transfer   cash -> cash   (petty cash replenishment, custodian handover)
 * Created as "pending"; posting happens only when a different user approves it.
 */
export type TransferType = "withdrawal" | "deposit" | "bank_transfer" | "cash_transfer";
export type AccountKind = "bank" | "cash";

export interface IAccountTransfer extends Document {
  transferNo: string;
  type: TransferType;
  date: Date;
  fromKind: AccountKind;
  fromId: Types.ObjectId;
  toKind: AccountKind;
  toId: Types.ObjectId;
  amountPaise: number;
  reference?: string;
  purpose: string;
  fundType: "general" | "restricted";
  receivedBy?: string;
  office?: string;
  documentUrl?: string;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
  approvedBy?: string;
  approvedAt?: Date;
  rejectionReason?: string;
  journalId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AccountTransferSchema = new Schema<IAccountTransfer>(
  {
    transferNo: { type: String, required: true, unique: true, index: true },
    type: { type: String, enum: ["withdrawal", "deposit", "bank_transfer", "cash_transfer"], required: true, index: true },
    date: { type: Date, required: true, index: true },
    fromKind: { type: String, enum: ["bank", "cash"], required: true },
    fromId: { type: Schema.Types.ObjectId, required: true, index: true },
    toKind: { type: String, enum: ["bank", "cash"], required: true },
    toId: { type: Schema.Types.ObjectId, required: true, index: true },
    amountPaise: { type: Number, required: true, min: 1 },
    reference: { type: String, trim: true },
    purpose: { type: String, required: true, trim: true },
    fundType: { type: String, enum: ["general", "restricted"], default: "general" },
    receivedBy: { type: String, trim: true },
    office: { type: String, trim: true },
    documentUrl: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending", index: true },
    submittedBy: { type: String, required: true },
    approvedBy: { type: String },
    approvedAt: { type: Date },
    rejectionReason: { type: String },
    journalId: { type: Schema.Types.ObjectId, ref: "JournalEntry" },
  },
  { timestamps: true }
);

export const AccountTransfer = mongoose.model<IAccountTransfer>("AccountTransfer", AccountTransferSchema);
