import mongoose, { Schema, Document } from "mongoose";

export interface ISuccessStory extends Document {
  title: string;
  category: string;
  personName: string;
  village: string;
  state: string;
  excerpt: string;
  fullStory: string;
  image: string;
  videoUrl?: string;
  impactMetrics: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SuccessStorySchema = new Schema<ISuccessStory>(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      index: true,
    },
    personName: { type: String, required: true, trim: true },
    village: { type: String, default: "" },
    state: { type: String, default: "Bihar" },
    excerpt: { type: String, required: true },
    fullStory: { type: String, required: true },
    image: { type: String, default: "" },
    videoUrl: { type: String, default: "" },
    impactMetrics: [{ type: String }],
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SuccessStory = mongoose.model<ISuccessStory>("SuccessStory", SuccessStorySchema);

