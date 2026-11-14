import mongoose, { Schema, Document } from "mongoose";

export interface IAdminScope {
  workAreas: string[];
  offices: string[];
}

export interface IAdminDirectPermissions {
  grant: string[];
  deny: string[];
}

export interface IAdmin extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role?: "superadmin" | "editor" | string;
  roles: string[];
  directPermissions: IAdminDirectPermissions;
  scope: IAdminScope;
  tokenVersion: number;
  failedLoginAttempts: number;
  lockoutUntil: Date | null;
  mustChangePassword: boolean;
  inviteToken: string | null;
  inviteExpires: Date | null;
  lastReauthAt: Date | null;
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
    role: { type: String, default: "superadmin" },
    roles: { type: [String], default: ["super_admin"] },
    directPermissions: {
      grant: { type: [String], default: [] },
      deny: { type: [String], default: [] },
    },
    scope: {
      workAreas: { type: [String], default: [] },
      offices: { type: [String], default: [] },
    },
    tokenVersion: { type: Number, default: 0 },
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutUntil: { type: Date, default: null },
    mustChangePassword: { type: Boolean, default: false },
    inviteToken: { type: String, default: null, index: true },
    inviteExpires: { type: Date, default: null },
    lastReauthAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
