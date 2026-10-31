import { Request, Response } from "express";
import { Admin } from "../models/Admin.js";
import { hashPassword, verifyPassword, signToken, verifyToken } from "../utils/authUtils.js";

export async function adminLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    let admin = await Admin.findOne({ email: cleanEmail });

    // Auto-initialize default superadmin if no admin accounts exist yet
    if (!admin) {
      const count = await Admin.countDocuments();
      if (count === 0 && cleanEmail === "admin@iwfindia.org") {
        admin = await Admin.create({
          email: "admin@iwfindia.org",
          name: "ISLAH Superadmin",
          passwordHash: hashPassword(password),
          role: "superadmin",
          isActive: true,
        });
        console.log("⚡ [ADMIN SETUP] Initialized default superadmin account: admin@iwfindia.org");
      }
    }

    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isValid = verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    admin.lastLogin = new Date();
    await admin.save();

    const token = signToken({
      adminId: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    res.json({
      success: true,
      message: "Admin authentication successful",
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (err: any) {
    console.error("adminLogin error:", err);
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
}

export async function getAdminProfile(req: Request, res: Response) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const { valid, payload } = verifyToken(authHeader);
    if (!valid || !payload?.adminId) {
      return res.status(401).json({ success: false, message: "Invalid or expired session token" });
    }

    const admin = await Admin.findById(payload.adminId).select("-passwordHash");
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: "Admin account not active" });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        lastLogin: admin.lastLogin,
      },
    });
  } catch (err: any) {
    console.error("getAdminProfile error:", err);
    res.status(500).json({ success: false, message: "Failed to retrieve profile", error: err.message });
  }
}

export async function adminLogout(_req: Request, res: Response) {
  res.json({ success: true, message: "Logged out successfully" });
}

