import mongoose, { Schema, Document } from "mongoose";

export type PaymentEventStatus = "received" | "processed" | "ignored" | "failed";

export interface IPaymentEvent extends Document {
  provider: "razorpay";
  eventId: string;
  eventType: string;
  payload: Record<string, any>;
  status: PaymentEventStatus;
  receivedAt: Date;
  processedAt?: Date;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentEventSchema = new Schema<IPaymentEvent>(
  {
    provider: { type: String, default: "razorpay", required: true },
    eventId: { type: String, required: true, unique: true, index: true },
    eventType: { type: String, required: true, index: true },
    payload: { type: Schema.Types.Mixed, required: true },
    status: {
      type: String,
      enum: ["received", "processed", "ignored", "failed"],
      default: "received",
      index: true,
    },
    receivedAt: { type: Date, default: Date.now },
    processedAt: { type: Date },
    error: { type: String },
  },
  { timestamps: true }
);

export const PaymentEvent = mongoose.model<IPaymentEvent>("PaymentEvent", PaymentEventSchema);

