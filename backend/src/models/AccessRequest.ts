import mongoose, { Schema, Document } from "mongoose";

export interface IAccessRequest extends Document {
  requesterId: mongoose.Types.ObjectId;
  requesterName: string;
  requesterEmail: string;
  requesterRole: string;
  requestedResource: string;
  requestedPermission: string;
  moduleName?: string;
  reason?: string;
  accessType: "read_only" | "full";
  status: "pending" | "approved" | "rejected";
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedByName?: string;
  reviewedAt?: Date;
  reviewNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AccessRequestSchema = new Schema<IAccessRequest>(
  {
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      index: true,
    },
    requesterName: { type: String, required: true },
    requesterEmail: { type: String, required: true, lowercase: true, trim: true },
    requesterRole: { type: String, required: true },
    requestedResource: { type: String, required: true },
    requestedPermission: { type: String, required: true },
    moduleName: { type: String },
    reason: { type: String, default: "" },
    accessType: {
      type: String,
      enum: ["read_only", "full"],
      default: "read_only",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
    reviewedByName: { type: String },
    reviewedAt: { type: Date },
    reviewNote: { type: String },
  },
  { timestamps: true }
);

export const AccessRequest =
  mongoose.models.AccessRequest ||
  mongoose.model<IAccessRequest>("AccessRequest", AccessRequestSchema);

