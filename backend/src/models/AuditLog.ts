import mongoose, { Schema, Document } from "mongoose";

export interface IAuditLog extends Document {
  actorId: string;
  actorName: string;
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId?: string | null;
  before?: any | null;
  after?: any | null;
  outcome: "success" | "failure" | "denied";
  reason?: string | null;
  severity: "info" | "warning" | "high" | "critical";
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    actorId: { type: String, required: true, index: true },
    actorName: { type: String, required: true },
    actorEmail: { type: String, required: true, index: true },
    action: { type: String, required: true, index: true },
    resourceType: { type: String, required: true, index: true },
    resourceId: { type: String, default: null, index: true },
    before: { type: Schema.Types.Mixed, default: null },
    after: { type: Schema.Types.Mixed, default: null },
    outcome: {
      type: String,
      enum: ["success", "failure", "denied"],
      default: "success",
      index: true,
    },
    reason: { type: String, default: null },
    severity: {
      type: String,
      enum: ["info", "warning", "high", "critical"],
      default: "info",
      index: true,
    },
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Enforce strict append-only immutability at application layer
const blockMutation = function (this: any, next: (err?: any) => void) {
  next(new Error("IMMUTABILITY VIOLATION: Audit log entries cannot be modified or deleted."));
};

(AuditLogSchema as any).pre("updateOne", blockMutation);
(AuditLogSchema as any).pre("updateMany", blockMutation);
(AuditLogSchema as any).pre("findOneAndUpdate", blockMutation);
(AuditLogSchema as any).pre("deleteOne", blockMutation);
(AuditLogSchema as any).pre("deleteMany", blockMutation);
(AuditLogSchema as any).pre("findOneAndDelete", blockMutation);

export const AuditLog = mongoose.model<IAuditLog>("AuditLog", AuditLogSchema);
