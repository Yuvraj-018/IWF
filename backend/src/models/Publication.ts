import mongoose, { Schema, Document } from "mongoose";

export type PublicationType =
  | "Newsletters"
  | "Research Papers"
  | "Policy Briefs"
  | "Annual Reports"
  | "Other";

export interface IPublication extends Document {
  title: string;
  type: PublicationType;
  authors: string;
  date: string;
  summary: string;
  coverUrl: string;
  downloadUrl: string;
  fileSize?: string;
  pages?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const PublicationSchema = new Schema<IPublication>(
  {
    title: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ["Newsletters", "Research Papers", "Policy Briefs", "Annual Reports", "Other"],
      default: "Research Papers",
      index: true,
    },
    authors: { type: String, default: "Islah Welfare Foundation Research Team" },
    date: { type: String, required: true },
    summary: { type: String, required: true },
    coverUrl: { type: String, default: "" },
    downloadUrl: { type: String, required: true },
    fileSize: { type: String, default: "PDF" },
    pages: { type: String, default: "Document" },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Publication = mongoose.model<IPublication>("Publication", PublicationSchema);

