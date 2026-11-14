import mongoose, { Document, Schema } from "mongoose";

export interface IPartnerAgreement extends Document {
  partnerName: string;
  partnerType: "Corporate CSR" | "Institutional NGO" | "Government / Semi-Gov" | "Philanthropic Trust";
  agreementRef: string;
  focusArea: string;
  committedGrant: number;
  signedDate: string;
  expiryDate: string;
  mouDocUrl?: string;
  status: "Active" | "Under Renewal" | "Completed";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerAgreementSchema = new Schema<IPartnerAgreement>(
  {
    partnerName: { type: String, required: true, trim: true },
    partnerType: {
      type: String,
      enum: ["Corporate CSR", "Institutional NGO", "Government / Semi-Gov", "Philanthropic Trust"],
      required: true,
    },
    agreementRef: { type: String, required: true, trim: true, unique: true },
    focusArea: { type: String, required: true, trim: true },
    committedGrant: { type: Number, required: true, min: 0 },
    signedDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    mouDocUrl: { type: String, trim: true },
    status: { type: String, enum: ["Active", "Under Renewal", "Completed"], default: "Active", index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

export const PartnerAgreement = mongoose.model<IPartnerAgreement>("PartnerAgreement", PartnerAgreementSchema);
