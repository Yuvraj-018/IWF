import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/islah_db";

  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB] Connected successfully to ${conn.connection.host}/${conn.connection.name}`);
    
    // Synchronize all initial collections and site settings into MongoDB
    const { seedAll } = await import("../utils/seedAll.js");
    await seedAll();
  } catch (error) {
    console.error("[MongoDB] Connection error:", error);
    // In local dev, allow server to continue running if MongoDB is not yet started
    console.warn("[MongoDB] Please ensure MongoDB is running or configure MONGODB_URI in .env");
  }
}
