import mongoose, { Schema, Document } from "mongoose";

export interface ISectorSpendSummary {
  workAreaId: string;
  name: string;
  amountRupees: number;
  percentage: number;
}

export interface IPublicSnapshot extends Document {
  snapshotNo: string;
  title: string;
  fy: string;
  periodFrom: Date;
  periodTo: Date;
  totalDonationsRupees: number;
  totalExpenditureRupees: number;
  netSurplusRupees: number;
  sectorSpend: ISectorSpendSummary[];
  metrics: {
    totalDonorsCount: number;
    receiptsIssuedCount: number;
    impactBeneficiariesCount?: number;
    onlineSharePercentage?: number;
    offlineSharePercentage?: number;
  };
  auditNotes?: string;
  publishedBy: string;
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SectorSpendSummarySchema = new Schema<ISectorSpendSummary>(
  {
    workAreaId: { type: String, required: true },
    name: { type: String, required: true },
    amountRupees: { type: Number, required: true },
    percentage: { type: Number, required: true },
  },
  { _id: false }
);

const PublicSnapshotSchema = new Schema<IPublicSnapshot>(
  {
    snapshotNo: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    fy: { type: String, required: true, index: true },
    periodFrom: { type: Date, required: true },
    periodTo: { type: Date, required: true },
    totalDonationsRupees: { type: Number, required: true },
    totalExpenditureRupees: { type: Number, required: true },
    netSurplusRupees: { type: Number, required: true },
    sectorSpend: [SectorSpendSummarySchema],
    metrics: {
      totalDonorsCount: { type: Number, default: 0 },
      receiptsIssuedCount: { type: Number, default: 0 },
      impactBeneficiariesCount: { type: Number, default: 0 },
      onlineSharePercentage: { type: Number, default: 0 },
      offlineSharePercentage: { type: Number, default: 0 },
    },
    auditNotes: { type: String },
    publishedBy: { type: String, required: true },
    isPublished: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

PublicSnapshotSchema.index({ isPublished: 1, fy: -1 });

export const PublicSnapshot = mongoose.model<IPublicSnapshot>("PublicSnapshot", PublicSnapshotSchema);

