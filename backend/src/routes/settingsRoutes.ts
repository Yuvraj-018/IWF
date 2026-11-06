import { Router } from "express";
import { getSettings, updateSetting } from "../controllers/settingsController.js";
import { requireAdminAuth } from "../middlewares/auth.js";

export const settingsRouter = Router();

settingsRouter.get("/", getSettings);
settingsRouter.get("/:key", getSettings);
settingsRouter.put("/:key", requireAdminAuth, updateSetting);

