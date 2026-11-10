import mongoose, { Schema, Document } from "mongoose";

export interface IBankAccount extends Document {
  bankName: string;
  accountNumberMasked: string;
  ifsc: string;
  branch?: string;
  type: "current" | "savings";
  openingBalancePaise: number;
  currentBalancePaise: number;
  isPrimary: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BankAccountSchema = new Schema<IBankAccount>(
  {
    bankName: { type: String, required: true },
    accountNumberMasked: { type: String, required: true },
    ifsc: { type: String, required: true },
    branch: { type: String },
    type: { type: String, enum: ["current", "savings"], default: "current" },
    openingBalancePaise: { type: Number, default: 0 },
    currentBalancePaise: { type: Number, default: 0 },
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const BankAccount = mongoose.model<IBankAccount>("BankAccount", BankAccountSchema);

