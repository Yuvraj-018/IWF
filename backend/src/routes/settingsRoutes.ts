import { Router } from "express";
import { getSettings, updateSetting } from "../controllers/settingsController.js";
import { requireAdminAuth } from "../middlewares/auth.js";
import { cacheResponse } from "../middlewares/cache.js";

export const settingsRouter = Router();

settingsRouter.get("/", cacheResponse(180, "settings"), getSettings);
settingsRouter.get("/:key", cacheResponse(180, "settings"), getSettings);
settingsRouter.put("/:key", requireAdminAuth, updateSetting);

