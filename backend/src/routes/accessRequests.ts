import { Router } from "express";
import {
  createAccessRequest,
  listAccessRequests,
  approveAccessRequest,
  rejectAccessRequest,
} from "../controllers/accessRequestController.js";
import { authenticate } from "../middlewares/rbac.js";

export const accessRequestRouter = Router();

// All access request endpoints require valid staff authentication
accessRequestRouter.use(authenticate);

accessRequestRouter.post("/", createAccessRequest);
accessRequestRouter.get("/", listAccessRequests);
accessRequestRouter.post("/:id/approve", approveAccessRequest);
accessRequestRouter.post("/:id/reject", rejectAccessRequest);
