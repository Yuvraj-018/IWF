import mongoose, { Schema, Document } from "mongoose";

export type MemberCategory = "Community" | "Contributing" | "Patron" | "Blue" | "Yellow" | "Green" | "Orange";

export interface IMember extends Document {
  memberNo: string;
  name: string;
  fatherName?: string;
  category: MemberCategory;
  annualFee: number;
  membershipPeriod?: number;
  email: string;
  phone: string;
  countryCode?: string;
  state: string;
  district: string;
  address?: string;
  pincode?: string;
  paymentMode?: string;
  transactionId?: string;
  paymentDate?: string;
  consentDisplay?: string;
  photoUrl?: string;
  status: "Active" | "Expired" | "Pending";
  validFrom: Date;
  validTill: Date;
  receiptNo?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const MemberSchema = new Schema<IMember>(
  {
    memberNo: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    fatherName: { type: String },
    category: {
      type: String,
      enum: ["Community", "Contributing", "Patron", "Blue", "Yellow", "Green", "Orange"],
      required: true,
    },
    annualFee: { type: Number, required: true },
    membershipPeriod: { type: Number, default: 1 },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    state: { type: String, required: true },
    district: { type: String, required: true },
    address: { type: String },
    pincode: { type: String },
    paymentMode: { type: String, default: "UPI" },
    transactionId: { type: String },
    paymentDate: { type: String },
    consentDisplay: { type: String },
    photoUrl: { type: String },
    status: { type: String, enum: ["Active", "Expired", "Pending"], default: "Active" },
    validFrom: { type: Date, default: Date.now },
    validTill: {
      type: Date,
      default: () => {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        return nextYear;
      },
    },
    receiptNo: { type: String },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// High-performance compound indexes for directory listing and search
MemberSchema.index({ status: 1, validTill: 1, consentDisplay: 1 });
MemberSchema.index({ phone: 1 });
MemberSchema.index({ email: 1 });
MemberSchema.index({ category: 1, createdAt: -1 });

export const Member = mongoose.model<IMember>("Member", MemberSchema);
