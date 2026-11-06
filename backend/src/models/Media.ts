import mongoose, { Schema, Document } from "mongoose";

export type MediaCategory =
  | "hero"
  | "causes"
  | "thematic"
  | "gallery"
  | "patients"
  | "people"
  | "reports"
  | "general"
  | "partners";

export type MediaType = "photo" | "video" | "document";

export interface IMedia extends Document {
  key: string; // e.g. "hero-slide-1", "cause-education", "gallery-1", "annual-report-2024"
  title: string;
  category: MediaCategory;
  mediaType: MediaType;
  url: string; // Image or PDF/Doc URL
  videoUrl?: string; // YouTube / MP4 streaming URL
  thumbnailUrl?: string; // Video poster or document cover
  publicId?: string; // Cloudinary public_id
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  altText?: string;
  caption?: string;
  location?: string;
  date?: string;
  tags?: string[];
  albumId?: string; // e.g. "vision-academic-city", "bathiya-health-camp"
  albumTitle?: string; // Human-readable album name e.g. "Vision Academic City"
  isCover?: boolean; // True if this item acts as the album thumbnail cover
  order?: number; // Display order (1, 2, 3...)
  subHeading?: string; // For Hero slides
  ctaLink?: string; // For Hero slides (e.g. "/donate", "/programs")
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    key: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ["hero", "causes", "thematic", "gallery", "patients", "people", "reports", "general", "partners"],
      default: "general",
      index: true,
    },
    mediaType: {
      type: String,
      enum: ["photo", "video", "document"],
      default: "photo",
      index: true,
    },
    url: { type: String, required: true },
    videoUrl: { type: String },
    thumbnailUrl: { type: String },
    publicId: { type: String },
    format: { type: String },
    bytes: { type: Number },
    width: { type: Number },
    height: { type: Number },
    altText: { type: String },
    caption: { type: String },
    location: { type: String },
    date: { type: String },
    tags: [{ type: String }],
    albumId: { type: String, index: true },
    albumTitle: { type: String },
    isCover: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0 },
    subHeading: { type: String },
    ctaLink: { type: String },
  },
  { timestamps: true }
);

export const Media =
  mongoose.models.Media || mongoose.model<IMedia>("Media", MediaSchema);
