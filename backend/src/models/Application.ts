import mongoose, { Schema, Document } from "mongoose";

export type ApplicationType = "volunteer" | "mentor" | "partner" | "sponsor" | "career";

export interface IApplication extends Document {
  applicationId: string;
  type: ApplicationType;
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  city?: string;
  state?: string;
  organization?: string;
  selectedSectors?: string[];
  subclassifications?: string[];
  resumeUrl?: string;
  message?: string;
  status: "Pending" | "Under Review" | "Shortlisted" | "Approved" | "Contacted" | "Rejected" | "Archived";
  formData: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    applicationId: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      enum: ["volunteer", "mentor", "partner", "sponsor", "career"],
      required: true,
      index: true,
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    city: { type: String },
    state: { type: String },
    organization: { type: String },
    selectedSectors: [{ type: String }],
    subclassifications: [{ type: String }],
    resumeUrl: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Under Review", "Shortlisted", "Approved", "Contacted", "Rejected", "Archived"],
      default: "Pending",
    },
    formData: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Application = mongoose.model<IApplication>("Application", ApplicationSchema);
