import mongoose, { Document, Schema } from "mongoose";

export interface IBroadcastCampaign extends Document {
  title: string;
  targetAudience: string;
  recipientCount: number;
  channel: "Email Newsletter" | "SMS Alert" | "WhatsApp Notice";
  message: string;
  status: "Draft" | "Queued" | "Delivered" | "Failed";
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BroadcastCampaignSchema = new Schema<IBroadcastCampaign>(
  {
    title: { type: String, required: true, trim: true },
    targetAudience: { type: String, required: true, trim: true },
    recipientCount: { type: Number, required: true, min: 0 },
    channel: { type: String, enum: ["Email Newsletter", "SMS Alert", "WhatsApp Notice"], required: true },
    message: { type: String, required: true, trim: true },
    status: { type: String, enum: ["Draft", "Queued", "Delivered", "Failed"], default: "Queued", index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

export const BroadcastCampaign = mongoose.model<IBroadcastCampaign>(
  "BroadcastCampaign",
  BroadcastCampaignSchema
);
