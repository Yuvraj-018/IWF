import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  receiptNo: string;
  donorName: string;
  donorType: "Individual" | "Corporate";
  email: string;
  phone: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  financialType: string;
  frequency: "One Time" | "Monthly" | "Quarterly" | "Yearly";
  amount: number;
  taxExemption: boolean;
  pan?: string;
  patientSlug?: string;
  paymentMode: "Online" | "Bank Transfer" | "Cheque" | "Cash";
  paymentStatus: "Pending" | "Success" | "Failed";
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  websiteConsent?: string;
  recurringPledge?: boolean;
  pledgeMonths?: string;
  reminder?: "None" | "Monthly" | "Yearly";
  notes?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    receiptNo: { type: String, required: true, unique: true, index: true },
    donorName: { type: String, required: true },
    donorType: { type: String, enum: ["Individual", "Corporate"], default: "Individual" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, default: "" }, // only collected when a tax receipt is requested
    financialType: { type: String, required: true },
    frequency: { type: String, enum: ["One Time", "Monthly", "Quarterly", "Yearly"], default: "One Time" },
    amount: { type: Number, required: true, min: 10 },
    taxExemption: { type: Boolean, default: false },
    pan: { type: String },
    patientSlug: { type: String },
    paymentMode: { type: String, enum: ["Online", "Bank Transfer", "Cheque", "Cash"], default: "Online" },
    paymentStatus: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
    transactionId: { type: String },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    websiteConsent: { type: String },
    recurringPledge: { type: Boolean },
    pledgeMonths: { type: String },
    reminder: { type: String, enum: ["None", "Monthly", "Yearly"], default: "None" },
    notes: { type: String },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Donation = mongoose.model<IDonation>("Donation", DonationSchema);
