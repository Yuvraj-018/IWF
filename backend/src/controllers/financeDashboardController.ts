import { Request, Response } from "express";
import { z } from "zod";
import { financeDashboardService } from "../services/financeDashboardService.js";

const dashboardOverviewQuerySchema = z.object({
  from: z.string().optional(),
  to: z.string().optional(),
  interval: z.enum(["daily", "weekly", "monthly"]).optional().default("monthly"),
});

export async function getDashboardOverview(req: Request, res: Response): Promise<void> {
  try {
    const parseResult = dashboardOverviewQuerySchema.safeParse(req.query);
    if (!parseResult.success) {
      res.status(400).json({
        success: false,
        message: "Invalid query parameters",
        errors: parseResult.error.issues,
      });
      return;
    }

    const { from, to, interval } = parseResult.data;
    const overviewData = await financeDashboardService.getOverviewData({
      from,
      to,
      interval,
    });

    res.status(200).json({
      success: true,
      data: overviewData,
    });
  } catch (error: any) {
    console.error("getDashboardOverview error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to aggregate financial dashboard overview",
      error: error.message || "Internal server error",
    });
  }
}

