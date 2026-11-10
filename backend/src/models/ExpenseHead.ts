import mongoose, { Schema, Document } from "mongoose";

export interface IExpenseHead extends Document {
  code: string; // e.g. 'medical_support'
  name: string; // e.g. 'Medical Support'
  group: "Administrative" | "Programme" | "Operational" | "Humanitarian" | "Other";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseHeadSchema = new Schema<IExpenseHead>(
  {
    code: { type: String, required: true, unique: true, lowercase: true, index: true },
    name: { type: String, required: true },
    group: {
      type: String,
      enum: ["Administrative", "Programme", "Operational", "Humanitarian", "Other"],
      default: "Programme",
      index: true,
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const ExpenseHead = mongoose.model<IExpenseHead>("ExpenseHead", ExpenseHeadSchema);

