import mongoose, { Schema, Document } from "mongoose";

export interface IDonation extends Document {
  receiptNo: string;
  certificateNo?: string;
  donationNo?: string;
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
  amountPaise?: number;
  grossPaise?: number;
  feePaise?: number;
  taxOnFeePaise?: number;
  netPaise?: number;
  workAreaId?: string;
  initiativeId?: string;
  source?: "online" | "upi" | "bank_transfer" | "cash" | "cheque" | "other";
  taxExemption: boolean;
  pan?: string;
  panFileUrl?: string;
  donorPhotoUrl?: string;
  patientSlug?: string;
  paymentMode: "Online" | "Bank Transfer" | "Cheque" | "Cash";
  paymentStatus: "Pending" | "Success" | "Failed" | "Refunded" | "Partially Refunded";
  transactionId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  websiteConsent?: string;
  isPublicConsent?: boolean;
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
    certificateNo: { type: String, index: true },
    donationNo: { type: String, index: true },
    donorName: { type: String, required: true },
    donorType: { type: String, enum: ["Individual", "Corporate"], default: "Individual" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    address: { type: String, default: "" },
    city: { type: String, default: "Not Specified" },
    state: { type: String, default: "Not Specified" },
    pincode: { type: String, default: "" }, // only collected when a tax receipt is requested
    financialType: { type: String, required: true },
    frequency: { type: String, enum: ["One Time", "Monthly", "Quarterly", "Yearly"], default: "One Time" },
    amount: { type: Number, required: true, min: 10 },
    amountPaise: { type: Number },
    grossPaise: { type: Number },
    feePaise: { type: Number, default: 0 },
    taxOnFeePaise: { type: Number, default: 0 },
    netPaise: { type: Number },
    workAreaId: { type: String, index: true },
    initiativeId: { type: String, index: true },
    source: { type: String },
    taxExemption: { type: Boolean, default: false },
    pan: { type: String },
    panFileUrl: { type: String },
    donorPhotoUrl: { type: String },
    patientSlug: { type: String },
    paymentMode: { type: String, enum: ["Online", "Bank Transfer", "Cheque", "Cash"], default: "Online" },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Success", "Failed", "Refunded", "Partially Refunded"],
      default: "Pending",
    },
    transactionId: { type: String },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    websiteConsent: { type: String },
    isPublicConsent: { type: Boolean, default: false },
    recurringPledge: { type: Boolean },
    pledgeMonths: { type: String },
    reminder: { type: String, enum: ["None", "Monthly", "Yearly"], default: "None" },
    notes: { type: String },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

// Auto-populate paise amounts if missing
DonationSchema.pre("save", function () {
  if (this.amount && !this.amountPaise) {
    this.amountPaise = Math.round(this.amount * 100);
  }
  if (!this.grossPaise && this.amountPaise) {
    this.grossPaise = this.amountPaise;
  }
  if (!this.netPaise && this.grossPaise) {
    const fee = this.feePaise || 0;
    const tax = this.taxOnFeePaise || 0;
    this.netPaise = this.grossPaise - fee - tax;
  }
  if (!this.donationNo && this.receiptNo) {
    this.donationNo = this.receiptNo;
  }
});

// High-speed indexes for payments, tax exemptions, and webhook lookups
DonationSchema.index({ paymentStatus: 1, createdAt: -1 });
DonationSchema.index({ razorpayOrderId: 1 });
DonationSchema.index({ razorpayPaymentId: 1 });
DonationSchema.index({ email: 1 });
DonationSchema.index({ phone: 1 });
DonationSchema.index({ workAreaId: 1, createdAt: -1 });

export const Donation = mongoose.model<IDonation>("Donation", DonationSchema);
