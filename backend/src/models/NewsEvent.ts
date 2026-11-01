import mongoose, { Schema, Document } from "mongoose";

export type NewsCategory =
  | "News & Updates"
  | "Events"
  | "Press Releases"
  | "Community Activities"
  | "Programs"
  | "Campaigns";

export interface INewsEvent extends Document {
  slug: string;
  title: string;
  category: NewsCategory;
  date: string;
  day: string;
  month: string;
  excerpt: string;
  fullStory?: string;
  image: string;
  pdfUrl?: string;
  featured?: boolean;
  location?: string;
  isUpcoming?: boolean;
  impactMetrics?: string[];
  readTime?: string;
  published: boolean;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsEventSchema = new Schema<INewsEvent>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: [
        "News & Updates",
        "Events",
        "Press Releases",
        "Community Activities",
        "Programs",
        "Campaigns",
      ],
      default: "News & Updates",
      index: true,
    },
    date: { type: String, required: true },
    day: { type: String, default: "" },
    month: { type: String, default: "" },
    excerpt: { type: String, required: true, trim: true },
    fullStory: { type: String, default: "" },
    image: { type: String, required: true },
    pdfUrl: { type: String },
    featured: { type: Boolean, default: false, index: true },
    location: { type: String },
    isUpcoming: { type: Boolean, default: false, index: true },
    impactMetrics: [{ type: String }],
    readTime: { type: String, default: "3 min" },
    published: { type: Boolean, default: true, index: true },
    author: { type: String, default: "Media & Communications Desk" },
  },
  { timestamps: true }
);

export const NewsEvent = mongoose.model<INewsEvent>("NewsEvent", NewsEventSchema);

