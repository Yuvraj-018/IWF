import mongoose, { Schema, Document } from "mongoose";

export interface ICostBreakdown {
  label: string;
  amount: number;
}

export interface IPatientDocument {
  label: string;
  type: "admission" | "income" | "identity" | "medical" | "prescription";
  verified: boolean;
}

export interface IPatientUpdate {
  date: string;
  title: string;
  text: string;
  type: "admission" | "surgery" | "treatment" | "progress" | "discharge" | "funding";
}

export interface IDonationHistory {
  donor: string;
  amount: number;
  date: string;
  message?: string;
}

export interface IPatient extends Document {
  slug: string;
  name: string;
  age: number;
  gender: string;
  disease: string;
  diagnosis?: string;
  hospital: string;
  hospitalAddress?: string;
  ward?: string;
  admissionDate: string;
  condition: "Critical" | "Serious" | "Stable" | "Recovering" | "Discharged";
  urgent: boolean;
  image?: string;
  neededAmount: number;
  raisedAmount: number;
  donorsCount: number;
  costBreakdown: ICostBreakdown[];
  verificationId: string;
  verifiedBy: string;
  verificationDate: string;
  story?: string[];
  familyBackground?: string;
  documents?: IPatientDocument[];
  updates?: IPatientUpdate[];
  donationHistory?: IDonationHistory[];
  status: "Active" | "Completed" | "Closed";
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new Schema<IPatient>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    disease: { type: String, required: true },
    diagnosis: { type: String },
    hospital: { type: String, required: true },
    hospitalAddress: { type: String },
    ward: { type: String },
    admissionDate: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    condition: {
      type: String,
      enum: ["Critical", "Serious", "Stable", "Recovering", "Discharged"],
      default: "Critical",
    },
    urgent: { type: Boolean, default: true },
    image: { type: String },
    neededAmount: { type: Number, required: true },
    raisedAmount: { type: Number, default: 0 },
    donorsCount: { type: Number, default: 0 },
    costBreakdown: [
      {
        label: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    verificationId: { type: String, required: true },
    verifiedBy: { type: String, default: "ISLAH Medical Welfare Board" },
    verificationDate: { type: String, required: true },
    story: [{ type: String }],
    familyBackground: { type: String },
    documents: [
      {
        label: { type: String },
        type: { type: String },
        verified: { type: Boolean, default: true },
      },
    ],
    updates: [
      {
        date: { type: String },
        title: { type: String },
        text: { type: String },
        type: { type: String },
      },
    ],
    donationHistory: [
      {
        donor: { type: String },
        amount: { type: Number },
        date: { type: String },
        message: { type: String },
      },
    ],
    status: { type: String, enum: ["Active", "Completed", "Closed"], default: "Active" },
  },
  { timestamps: true }
);

export const Patient = mongoose.model<IPatient>("Patient", PatientSchema);
