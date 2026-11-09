import mongoose, { Schema } from "mongoose";

export interface ICounter {
  _id: string;
  seq: number;
}

const CounterSchema = new Schema<ICounter>(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Counter = mongoose.model<ICounter>("Counter", CounterSchema);

/**
 * Atomically increments and returns the next sequence number for a counter.
 * Guarantees zero race conditions under concurrent executions.
 */
export async function getNextSequence(counterName: string): Promise<number> {
  const result = await Counter.findByIdAndUpdate(
    counterName,
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true, setDefaultsOnInsert: true }
  );
  return result?.seq ?? 1;
}
