import { Router } from "express";
import { authenticate, requirePermission } from "../middlewares/rbac.js";
import { createVolunteerTask, listVolunteerTasks } from "../controllers/volunteerController.js";

export const volunteerRouter = Router();

volunteerRouter.use(authenticate);
volunteerRouter.get("/", requirePermission("membership.application:view"), listVolunteerTasks);
volunteerRouter.post("/", requirePermission("membership.application:view"), createVolunteerTask);
