import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  fy: string; // e.g. "2025-26"
  workAreaId: string;
  initiativeId?: string;
  allocatedPaise: number;
  spentPaise: number;
  status: "draft" | "approved";
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BudgetSchema = new Schema<IBudget>(
  {
    fy: { type: String, required: true, index: true },
    workAreaId: { type: String, required: true, index: true },
    initiativeId: { type: String, index: true },
    allocatedPaise: { type: Number, required: true, min: 0 },
    spentPaise: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "approved"], default: "draft", index: true },
    approvedBy: { type: String },
  },
  { timestamps: true }
);

BudgetSchema.index({ fy: 1, workAreaId: 1, initiativeId: 1 }, { unique: true });

export const Budget = mongoose.model<IBudget>("Budget", BudgetSchema);

