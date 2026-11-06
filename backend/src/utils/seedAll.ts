import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedDefaultSettings } from "../controllers/settingsController.js";
import { seedInitialPatients } from "./seedPatients.js";
import { seedInitialNews } from "./seedNews.js";
import { seedInitialMedia } from "./seedMedia.js";
import { seedInitialMembers } from "./seedMembers.js";

dotenv.config();

export async function seedAll(): Promise<void> {
  console.log("🌱 [SeedAll] Starting comprehensive database synchronization...");
  try {
    await seedDefaultSettings();
    await seedInitialPatients();
    await seedInitialNews();
    await seedInitialMedia();
    await seedInitialMembers();
    console.log("✨ [SeedAll] All database collections and settings synchronized successfully!");
  } catch (err) {
    console.error("❌ [SeedAll] Error during database synchronization:", err);
  }
}

// Support direct execution via `npm run seed` or `tsx src/utils/seedAll.ts`
if (process.argv[1]?.includes("seedAll")) {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/islah_db";
  console.log(`Connecting to MongoDB at ${uri}...`);
  mongoose.connect(uri)
    .then(async () => {
      await seedAll();
      await mongoose.disconnect();
      console.log("Database disconnected. Seed process completed.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Fatal seed error:", err);
      process.exit(1);
    });
}

