import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: "superadmin" | "editor";
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["superadmin", "editor"], default: "superadmin" },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);

