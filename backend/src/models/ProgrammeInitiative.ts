import mongoose, { Document, Schema } from "mongoose";

export interface IProgrammeInitiative extends Document {
  title: string;
  sector: string;
  sectorCode: string;
  targetBeneficiaries: number;
  allocatedBudget: number;
  leadOfficer: string;
  status: "Active" | "Upcoming" | "Completed";
  progressPct: number;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProgrammeInitiativeSchema = new Schema<IProgrammeInitiative>(
  {
    title: { type: String, required: true, trim: true },
    sector: { type: String, required: true, trim: true },
    sectorCode: { type: String, required: true, uppercase: true, trim: true, index: true },
    targetBeneficiaries: { type: Number, required: true, min: 0 },
    allocatedBudget: { type: Number, required: true, min: 0 },
    leadOfficer: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Active", "Upcoming", "Completed"], default: "Active", index: true },
    progressPct: { type: Number, min: 0, max: 100, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

export const ProgrammeInitiative = mongoose.model<IProgrammeInitiative>(
  "ProgrammeInitiative",
  ProgrammeInitiativeSchema
);
