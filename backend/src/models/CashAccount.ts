import mongoose, { Schema, Document } from "mongoose";

/**
 * Cash-in-hand accounts (head office cash, petty cash, programme cash …).
 * Balances are never stored as the source of truth — they come from journals.
 * `currentBalancePaise` is a cache refreshed after every posting.
 */
export type CashAccountType = "head_office" | "admin_office" | "programme" | "petty" | "emergency" | "other";

export interface ICashAccount extends Document {
  name: string;
  type: CashAccountType;
  office?: string;
  custodianName: string;
  custodianContact?: string;
  openingBalancePaise: number;
  openingDate: Date;
  status: "active" | "inactive" | "closed";
  ledgerAccountCode?: string;
  currentBalancePaise: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const CashAccountSchema = new Schema<ICashAccount>(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["head_office", "admin_office", "programme", "petty", "emergency", "other"],
      default: "petty",
    },
    office: { type: String, trim: true },
    custodianName: { type: String, required: true, trim: true },
    custodianContact: { type: String, trim: true },
    openingBalancePaise: { type: Number, default: 0, min: 0 },
    openingDate: { type: Date, required: true },
    status: { type: String, enum: ["active", "inactive", "closed"], default: "active", index: true },
    ledgerAccountCode: { type: String, index: true },
    currentBalancePaise: { type: Number, default: 0 },
    notes: { type: String },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const CashAccount = mongoose.model<ICashAccount>("CashAccount", CashAccountSchema);
