import { Request, Response } from "express";
import {
  generateIncomeBySourceReport,
  generateExpenditureBySectorReport,
  generateIncomeVsExpenditureReport,
  generateBudgetVarianceReport,
  generateTax80GRegister,
  generateReportCSV,
  generateReportPDF,
} from "../services/reportService.js";

/**
 * 1. Income by Source Report
 */
export async function getIncomeBySource(req: Request, res: Response): Promise<void> {
  try {
    const { fy, from, to } = req.query;
    const report = await generateIncomeBySourceReport({
      fy: fy ? String(fy) : undefined,
      from: from ? new Date(String(from)) : undefined,
      to: to ? new Date(String(to)) : undefined,
    });
    res.json({ success: true, data: report });
  } catch (error: any) {
    console.error("getIncomeBySource error:", error);
    res.status(500).json({ success: false, message: "Failed to generate report", error: error.message });
  }
}

/**
 * 2. Expenditure by Work Area Report
 */
export async function getExpenditureBySector(req: Request, res: Response): Promise<void> {
  try {
    const { workAreaId, from, to } = req.query;
    const report = await generateExpenditureBySectorReport({
      workAreaId: workAreaId ? String(workAreaId) : undefined,
      from: from ? new Date(String(from)) : undefined,
      to: to ? new Date(String(to)) : undefined,
    });
    res.json({ success: true, data: report });
  } catch (error: any) {
    console.error("getExpenditureBySector error:", error);
    res.status(500).json({ success: false, message: "Failed to generate report", error: error.message });
  }
}

/**
 * 3. Income vs Expenditure Statement
 */
export async function getIncomeVsExpenditure(req: Request, res: Response): Promise<void> {
  try {
    const { fy, from, to } = req.query;
    const report = await generateIncomeVsExpenditureReport({
      fy: fy ? String(fy) : undefined,
      from: from ? new Date(String(from)) : undefined,
      to: to ? new Date(String(to)) : undefined,
    });
    res.json({ success: true, data: report });
  } catch (error: any) {
    console.error("getIncomeVsExpenditure error:", error);
    res.status(500).json({ success: false, message: "Failed to generate report", error: error.message });
  }
}

/**
 * 4. Budget vs Actual Variance Report
 */
export async function getBudgetVariance(req: Request, res: Response): Promise<void> {
  try {
    const { fy = "2025-26" } = req.query;
    const report = await generateBudgetVarianceReport(String(fy));
    res.json({ success: true, data: report });
  } catch (error: any) {
    console.error("getBudgetVariance error:", error);
    res.status(500).json({ success: false, message: "Failed to generate variance report", error: error.message });
  }
}

/**
 * 5. Statutory 80G Tax Exemption Register
 */
export async function getTax80GRegisterReport(req: Request, res: Response): Promise<void> {
  try {
    const { from, to } = req.query;
    const report = await generateTax80GRegister({
      from: from ? new Date(String(from)) : undefined,
      to: to ? new Date(String(to)) : undefined,
    });
    res.json({ success: true, data: report });
  } catch (error: any) {
    console.error("getTax80GRegisterReport error:", error);
    res.status(500).json({ success: false, message: "Failed to generate 80G register", error: error.message });
  }
}

/**
 * 6. Export Financial Report (CSV or PDF)
 */
export async function exportFinancialReport(req: Request, res: Response): Promise<void> {
  try {
    const { reportType, format = "csv", fy, from, to, workAreaId } = req.query;

    const filter = {
      fy: fy ? String(fy) : undefined,
      from: from ? new Date(String(from)) : undefined,
      to: to ? new Date(String(to)) : undefined,
      workAreaId: workAreaId ? String(workAreaId) : undefined,
    };

    let reportData: any = null;

    switch (reportType) {
      case "income-source":
        reportData = await generateIncomeBySourceReport(filter);
        break;
      case "expenditure-sector":
        reportData = await generateExpenditureBySectorReport(filter);
        break;
      case "income-vs-expenditure":
        reportData = await generateIncomeVsExpenditureReport(filter);
        break;
      case "budget-variance":
        reportData = await generateBudgetVarianceReport(filter.fy || "2025-26");
        break;
      case "80g-register":
      default:
        reportData = await generateTax80GRegister(filter);
        break;
    }

    if (format === "pdf") {
      const pdfBuffer = await generateReportPDF(reportData);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${reportType || "financial-report"}-${Date.now()}.pdf"`
      );
      res.send(pdfBuffer);
      return;
    }

    // Default to CSV
    const csvContent = generateReportCSV(reportData);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${reportType || "financial-report"}-${Date.now()}.csv"`
    );
    res.send(csvContent);
  } catch (error: any) {
    console.error("exportFinancialReport error:", error);
    res.status(500).json({ success: false, message: "Failed to export report", error: error.message });
  }
}

