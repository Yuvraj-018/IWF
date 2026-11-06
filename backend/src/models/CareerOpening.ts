import mongoose, { Schema, Document } from "mongoose";

export type EmploymentType = "Full-Time" | "Part-Time" | "Contract" | "Internship";
export type ExperienceBand = "Fresher / Intern" | "1–2 Years" | "2–5 Years" | "5+ Years";
export type OpeningIcon = "programme" | "field" | "data" | "health" | "communication" | "intern";

export interface ICareerOpening extends Document {
  openingId: string; // unique slug e.g. "programme-coordinator-education"
  title: string;
  department: string;
  location: string;
  type: EmploymentType;
  experience: string;
  experienceBand: ExperienceBand;
  lastDate: string; // YYYY-MM-DD
  reportsTo: string;
  icon: OpeningIcon;
  summary: string;
  responsibilities: string[];
  eligibility: string[];
  status: "Active" | "Closed" | "Draft";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const CareerOpeningSchema = new Schema<ICareerOpening>(
  {
    openingId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    department: { type: String, required: true, index: true },
    location: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
      default: "Full-Time",
    },
    experience: { type: String, required: true },
    experienceBand: {
      type: String,
      enum: ["Fresher / Intern", "1–2 Years", "2–5 Years", "5+ Years"],
      default: "2–5 Years",
      index: true,
    },
    lastDate: { type: String, required: true },
    reportsTo: { type: String, default: "Programme Manager" },
    icon: {
      type: String,
      enum: ["programme", "field", "data", "health", "communication", "intern"],
      default: "programme",
    },
    summary: { type: String, required: true },
    responsibilities: [{ type: String }],
    eligibility: [{ type: String }],
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Active",
      index: true,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CareerOpening = mongoose.model<ICareerOpening>("CareerOpening", CareerOpeningSchema);

