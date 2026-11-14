import mongoose, { Document, Schema } from "mongoose";

export interface IVolunteerTask extends Document {
  title: string;
  sector: string;
  location: string;
  volunteersRequired: number;
  assignedCount: number;
  targetDate: string;
  leadCoordinator: string;
  status: "Active" | "Upcoming" | "Completed";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerTaskSchema = new Schema<IVolunteerTask>(
  {
    title: { type: String, required: true, trim: true },
    sector: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    volunteersRequired: { type: Number, required: true, min: 1 },
    assignedCount: { type: Number, required: true, min: 0, default: 0 },
    targetDate: { type: String, required: true },
    leadCoordinator: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Active", "Upcoming", "Completed"], default: "Upcoming", index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

export const VolunteerTask = mongoose.model<IVolunteerTask>("VolunteerTask", VolunteerTaskSchema);
