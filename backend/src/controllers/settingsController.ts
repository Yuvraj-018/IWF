import { Request, Response } from "express";
import { SiteSetting } from "../models/SiteSetting.js";
import { invalidateCache } from "../middlewares/cache.js";

export async function getSettings(req: Request, res: Response): Promise<void> {
  try {
    const rawKey = req.params.key || req.query.key;
    const key = typeof rawKey === "string" ? rawKey : undefined;
    const category = typeof req.query.category === "string" ? req.query.category : undefined;
    const query: Record<string, any> = {};

    if (key) query.key = key;
    if (category) query.category = category;

    const settings = await SiteSetting.find(query);

    const settingsMap: Record<string, any> = {};
    for (const item of settings) {
      settingsMap[item.key] = item.data;
    }

    res.json({
      success: true,
      data: key && settingsMap[key] ? settingsMap[key] : settingsMap,
      all: settingsMap,
      raw: settings,
    });
  } catch (error: any) {
    console.error("getSettings error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function updateSetting(req: Request, res: Response): Promise<void> {
  try {
    const { key } = req.params;
    const { data, category } = req.body;

    if (!key) {
      res.status(400).json({ success: false, message: "Setting key is required" });
      return;
    }

    const updated = await SiteSetting.findOneAndUpdate(
      { key },
      {
        $set: {
          data,
          ...(category ? { category } : {}),
        },
      },
      { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
    );

    invalidateCache("settings");

    res.json({
      success: true,
      message: `Setting '${key}' updated successfully. Changes are live across the site.`,
      data: updated?.data || data,
    });
  } catch (error: any) {
    console.error("updateSetting error:", error);
    res.status(500).json({ success: false, message: "Failed to update setting" });
  }
}
