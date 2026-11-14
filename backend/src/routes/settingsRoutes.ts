import { Router } from "express";
import { getSettings, updateSetting } from "../controllers/settingsController.js";
import { cacheResponse } from "../middlewares/cache.js";
import { authenticate, requirePermission } from "../middlewares/rbac.js";

export const settingsRouter = Router();

// Public Site Settings (Preserved Exactly)
settingsRouter.get("/", cacheResponse(180, "settings"), getSettings);
settingsRouter.get("/:key", cacheResponse(180, "settings"), getSettings);

// Protected Admin Setting Updates
settingsRouter.put("/:key", authenticate, requirePermission("cms.settings:edit"), updateSetting);
