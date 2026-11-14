import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import { Admin } from "../models/Admin.js";
import { hashPassword } from "../utils/authUtils.js";

dotenv.config();

async function main() {
  await connectDB();
  const password = process.env.DEMO_ACCOUNT_PASSWORD || "DemoAccount@2026!";
  const passwordHash = hashPassword(password);

  const res = await Admin.updateMany(
    { email: { $regex: "^demo_" } },
    {
      $set: {
        passwordHash,
        failedLoginAttempts: 0,
        lockoutUntil: null,
      },
    }
  );

  console.log(`✅ Successfully updated ${res.modifiedCount} demo accounts with password: "${password}"`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Error updating demo passwords:", err);
  process.exit(1);
});
