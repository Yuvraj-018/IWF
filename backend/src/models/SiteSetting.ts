import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSetting extends Document {
  key: string; // e.g. "impact_stats", "contact_info"
  category: "impact" | "contact" | "general";
  data: Record<string, any>;
  updatedBy?: string;
  updatedAt: Date;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    key: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      enum: ["impact", "contact", "general"],
      default: "general",
      index: true,
    },
    data: { type: Schema.Types.Mixed, default: {} },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

export const SiteSetting =
  mongoose.models.SiteSetting ||
  mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);

