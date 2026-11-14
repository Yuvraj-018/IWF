import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  key: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  requires2FA: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
    isSystem: {
      type: Boolean,
      default: false,
      index: true,
    },
    requires2FA: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Role = mongoose.model<IRole>("Role", RoleSchema);

