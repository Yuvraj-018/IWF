import mongoose, { Schema, Document } from "mongoose";

export interface IWorkArea extends Document {
  code: string; // e.g. 'EDU', 'HLT'
  name: string; // e.g. 'Education & Learning'
  financialActivityExample?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const WorkAreaSchema = new Schema<IWorkArea>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, index: true },
    name: { type: String, required: true },
    financialActivityExample: { type: String },
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const WorkArea = mongoose.model<IWorkArea>("WorkArea", WorkAreaSchema);

