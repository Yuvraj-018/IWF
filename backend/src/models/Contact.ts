import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  subject?: string;
  message: string;
  enquiryType?: string;
  cityDistrict?: string;
  state?: string;
  pinCode?: string;
  preferredContactMethod?: string;
  regionalOfficeTarget?: string;
  referenceNumber?: string;
  source: "Quick Float Modal" | "Contact Page" | "Other";
  status: "Unread" | "Read" | "Resolved" | "Archived";
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    countryCode: { type: String, default: "+91" },
    subject: { type: String },
    message: { type: String, required: true },
    enquiryType: { type: String },
    cityDistrict: { type: String },
    state: { type: String },
    pinCode: { type: String },
    preferredContactMethod: { type: String },
    regionalOfficeTarget: { type: String },
    referenceNumber: { type: String },
    source: {
      type: String,
      enum: ["Quick Float Modal", "Contact Page", "Other"],
      default: "Contact Page",
    },
    status: { type: String, enum: ["Unread", "Read", "Resolved", "Archived"], default: "Unread" },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
