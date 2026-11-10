import mongoose, { Schema, Document, Types } from "mongoose";

export type RefundStatus = "requested" | "approved" | "processed" | "failed";

export interface IRefund extends Document {
  refundNo: string;
  donationId: Types.ObjectId;
  razorpayRefundId?: string;
  amountPaise: number;
  reason: string;
  status: RefundStatus;
  requestedBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RefundSchema = new Schema<IRefund>(
  {
    refundNo: { type: String, required: true, unique: true, index: true },
    donationId: { type: Schema.Types.ObjectId, ref: "Donation", required: true, index: true },
    razorpayRefundId: { type: String, index: true },
    amountPaise: { type: Number, required: true, min: 1 },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["requested", "approved", "processed", "failed"],
      default: "requested",
      index: true,
    },
    requestedBy: { type: String, required: true },
    approvedBy: { type: String },
  },
  { timestamps: true }
);

export const Refund = mongoose.model<IRefund>("Refund", RefundSchema);

