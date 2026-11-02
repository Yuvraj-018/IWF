import { Router } from "express";
import { getSettings, updateSetting } from "../controllers/settingsController.js";

export const settingsRouter = Router();

settingsRouter.get("/", getSettings);
settingsRouter.put("/:key", updateSetting);

