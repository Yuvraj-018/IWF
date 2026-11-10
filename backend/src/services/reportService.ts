import { Types } from "mongoose";
import PDFDocument from "pdfkit";
import { LedgerEntry } from "../models/LedgerEntry.js";
import { Donation } from "../models/Donation.js";
import { Expense } from "../models/Expense.js";
import { Budget } from "../models/Budget.js";
import { WorkArea } from "../models/WorkArea.js";

export interface ReportFilterParams {
  fy?: string;
  from?: Date;
  to?: Date;
  workAreaId?: string;
}

export const WORK_AREA_NAMES: Record<string, string> = {
  EDU: "Education & Learning",
  HLT: "Healthcare & Well-being",
  WYE: "Women & Youth Empowerment",
  SLE: "Skills, Livelihoods & Entrepreneurship",
  SJL: "Social Justice & Legal Empowerment",
  AGR: "Agriculture & Rural Livelihoods",
  ENV: "Environment & Sustainable Development",
  HRR: "Humanitarian Relief & Rehabilitation",
};

/**
 * 1. Income by Source & Period Report
 */
export async function generateIncomeBySourceReport(params: ReportFilterParams) {
  const query: any = { direction: "credit" };
  if (params.fy) query.fy = params.fy;
  if (params.from || params.to) {
    query.effectiveDate = {};
    if (params.from) query.effectiveDate.$gte = params.from;
    if (params.to) query.effectiveDate.$lte = params.to;
  }

  const entries = await LedgerEntry.find(query);

  let totalGrossPaise = 0;
  let totalNetPaise = 0;

  const sourceMap: Record<string, { count: number; grossPaise: number; netPaise: number }> = {
    Online: { count: 0, grossPaise: 0, netPaise: 0 },
    "Bank Transfer": { count: 0, grossPaise: 0, netPaise: 0 },
    Cash: { count: 0, grossPaise: 0, netPaise: 0 },
    Cheque: { count: 0, grossPaise: 0, netPaise: 0 },
    Other: { count: 0, grossPaise: 0, netPaise: 0 },
  };

  const monthlyTrend: Record<string, number> = {};

  for (const entry of entries) {
    totalGrossPaise += entry.amountPaise;
    totalNetPaise += entry.amountPaise;

    let src = "Other";
    const method = (entry.paymentMethod || "").toLowerCase();
    if (method.includes("online") || method.includes("upi") || method.includes("razorpay")) {
      src = "Online";
    } else if (method.includes("bank") || method.includes("transfer") || method.includes("neft") || method.includes("rtgs")) {
      src = "Bank Transfer";
    } else if (method.includes("cash")) {
      src = "Cash";
    } else if (method.includes("cheque")) {
      src = "Cheque";
    }

    if (!sourceMap[src]) {
      sourceMap[src] = { count: 0, grossPaise: 0, netPaise: 0 };
    }
    sourceMap[src].count++;
    sourceMap[src].grossPaise += entry.amountPaise;
    sourceMap[src].netPaise += entry.amountPaise;

    const m = entry.month || "Unknown";
    monthlyTrend[m] = (monthlyTrend[m] || 0) + entry.amountPaise;
  }

  const sources = Object.entries(sourceMap).map(([source, data]) => ({
    source,
    count: data.count,
    amountRupees: data.grossPaise / 100,
    percentage: totalGrossPaise > 0 ? Math.round((data.grossPaise / totalGrossPaise) * 100) : 0,
  }));

  return {
    reportType: "Income by Source & Period",
    period: { fy: params.fy || "All Years", from: params.from, to: params.to },
    totalIncomeRupees: totalGrossPaise / 100,
    totalTransactionsCount: entries.length,
    sources,
    monthlyTrend: Object.entries(monthlyTrend)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, paise]) => ({ month, amountRupees: paise / 100 })),
  };
}

/**
 * 2. Expenditure by Work Area & Initiative Report
 */
export async function generateExpenditureBySectorReport(params: ReportFilterParams) {
  const query: any = { status: { $in: ["approved", "paid"] } };
  if (params.workAreaId && params.workAreaId !== "all") query.workAreaId = params.workAreaId;
  if (params.from || params.to) {
    query.date = {};
    if (params.from) query.date.$gte = params.from;
    if (params.to) query.date.$lte = params.to;
  }

  const expenses = await Expense.find(query);

  let totalSpentPaise = 0;
  const sectorMap: Record<string, { count: number; spentPaise: number; heads: Record<string, number> }> = {};

  for (const exp of expenses) {
    totalSpentPaise += exp.amountPaise;
    const sec = exp.workAreaId || "GEN";

    if (!sectorMap[sec]) {
      sectorMap[sec] = { count: 0, spentPaise: 0, heads: {} };
    }
    sectorMap[sec].count++;
    sectorMap[sec].spentPaise += exp.amountPaise;

    const head = exp.head || "General Expense";
    sectorMap[sec].heads[head] = (sectorMap[sec].heads[head] || 0) + exp.amountPaise;
  }

  const sectors = Object.entries(sectorMap).map(([code, data]) => ({
    code,
    name: WORK_AREA_NAMES[code] || `Work Area ${code}`,
    voucherCount: data.count,
    spentRupees: data.spentPaise / 100,
    percentage: totalSpentPaise > 0 ? Math.round((data.spentPaise / totalSpentPaise) * 100) : 0,
    heads: Object.entries(data.heads).map(([head, paise]) => ({
      head,
      amountRupees: paise / 100,
    })),
  }));

  return {
    reportType: "Expenditure by Work Area & Initiative",
    totalExpenditureRupees: totalSpentPaise / 100,
    totalVouchersCount: expenses.length,
    sectors: sectors.sort((a, b) => b.spentRupees - a.spentRupees),
  };
}

/**
 * 3. Income vs Expenditure Statement
 */
export async function generateIncomeVsExpenditureReport(params: ReportFilterParams) {
  const query: any = {};
  if (params.fy) query.fy = params.fy;
  if (params.from || params.to) {
    query.effectiveDate = {};
    if (params.from) query.effectiveDate.$gte = params.from;
    if (params.to) query.effectiveDate.$lte = params.to;
  }

  const entries = await LedgerEntry.find(query);

  let totalIncomePaise = 0;
  let totalExpensePaise = 0;
  const monthlyStats: Record<string, { incomePaise: number; expensePaise: number }> = {};

  for (const entry of entries) {
    const m = entry.month || "Unknown";
    if (!monthlyStats[m]) {
      monthlyStats[m] = { incomePaise: 0, expensePaise: 0 };
    }

    if (entry.direction === "credit") {
      totalIncomePaise += entry.amountPaise;
      monthlyStats[m].incomePaise += entry.amountPaise;
    } else {
      totalExpensePaise += entry.amountPaise;
      monthlyStats[m].expensePaise += entry.amountPaise;
    }
  }

  const netSurplusPaise = totalIncomePaise - totalExpensePaise;
  const surplusMarginPercentage = totalIncomePaise > 0 ? Math.round((netSurplusPaise / totalIncomePaise) * 100) : 0;

  const months = Object.entries(monthlyStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => {
      const surplus = data.incomePaise - data.expensePaise;
      return {
        month,
        incomeRupees: data.incomePaise / 100,
        expenseRupees: data.expensePaise / 100,
        netSurplusRupees: surplus / 100,
      };
    });

  return {
    reportType: "Income vs Expenditure Statement",
    fy: params.fy || "All Years",
    totalIncomeRupees: totalIncomePaise / 100,
    totalExpenditureRupees: totalExpensePaise / 100,
    netSurplusRupees: netSurplusPaise / 100,
    surplusMarginPercentage,
    monthlyBreakdown: months,
  };
}

/**
 * 4. Budget vs Actual Variance Report
 */
export async function generateBudgetVarianceReport(fy: string = "2025-26") {
  const budgets = await Budget.find({ fy });
  const sectorBudgets: Record<string, number> = {};
  for (const b of budgets) {
    sectorBudgets[b.workAreaId] = (sectorBudgets[b.workAreaId] || 0) + b.allocatedPaise;
  }

  // Get actual spends from LedgerEntry
  const expenseEntries = await LedgerEntry.find({
    fy,
    direction: "debit",
    type: "expense",
  });

  const sectorSpends: Record<string, number> = {};
  for (const e of expenseEntries) {
    const code = e.workAreaId || "GEN";
    sectorSpends[code] = (sectorSpends[code] || 0) + e.amountPaise;
  }

  const allCodes = Array.from(new Set([...Object.keys(sectorBudgets), ...Object.keys(WORK_AREA_NAMES)]));

  let totalAllocatedPaise = 0;
  let totalSpentPaise = 0;

  const rows = allCodes.map((code) => {
    const allocatedPaise = sectorBudgets[code] || 0;
    const spentPaise = sectorSpends[code] || 0;
    const remainingPaise = allocatedPaise - spentPaise;
    const utilizationPercentage = allocatedPaise > 0 ? Math.round((spentPaise / allocatedPaise) * 100) : 0;

    totalAllocatedPaise += allocatedPaise;
    totalSpentPaise += spentPaise;

    return {
      workAreaId: code,
      name: WORK_AREA_NAMES[code] || code,
      allocatedRupees: allocatedPaise / 100,
      spentRupees: spentPaise / 100,
      remainingRupees: remainingPaise / 100,
      utilizationPercentage,
      status: utilizationPercentage > 100 ? "over_budget" : utilizationPercentage >= 85 ? "near_limit" : "within_budget",
    };
  });

  return {
    reportType: "Budget vs Actual Variance Report",
    fy,
    totalAllocatedRupees: totalAllocatedPaise / 100,
    totalSpentRupees: totalSpentPaise / 100,
    remainingBalanceRupees: (totalAllocatedPaise - totalSpentPaise) / 100,
    overallUtilizationPercentage:
      totalAllocatedPaise > 0 ? Math.round((totalSpentPaise / totalAllocatedPaise) * 100) : 0,
    sectors: rows.sort((a, b) => b.allocatedRupees - a.allocatedRupees),
  };
}

/**
 * 5. Statutory 80G Tax Exemption Register
 */
export async function generateTax80GRegister(params: ReportFilterParams) {
  const query: any = {
    taxExemption: true,
    paymentStatus: { $ne: "Failed" },
  };

  if (params.from || params.to) {
    query.createdAt = {};
    if (params.from) query.createdAt.$gte = params.from;
    if (params.to) query.createdAt.$lte = params.to;
  }

  const donations = await Donation.find(query).sort({ createdAt: -1 });

  let totalEligiblePaise = 0;

  const records = donations.map((d) => {
    const paise = d.amountPaise || Math.round((d.amount || 0) * 100);
    totalEligiblePaise += paise;

    return {
      receiptNo: d.receiptNo,
      date: d.createdAt,
      donorName: d.donorName,
      pan: d.pan || "NOT PROVIDED",
      donorType: d.donorType || "Individual",
      amountRupees: paise / 100,
      financialType: d.financialType,
      paymentMode: d.paymentMode,
      paymentStatus: d.paymentStatus,
      address: [d.address, d.city, d.state, d.pincode].filter(Boolean).join(", ") || "India",
    };
  });

  return {
    reportType: "Statutory 80G Tax Exemption Register",
    institution: {
      name: "ISLAH Welfare Foundation",
      pan: "AAATI8829F",
      reg80G: "CIT(E)/DELHI/80G/2021-22/A/10291",
    },
    totalEligibleDonationsCount: donations.length,
    totalEligibleAmountRupees: totalEligiblePaise / 100,
    records,
  };
}

/**
 * Generate CSV export text for any report
 */
export function generateReportCSV(reportData: any): string {
  if (reportData.records) {
    // 80G Register
    const header = "Receipt No,Date,Donor Name,PAN,Donor Type,Amount (INR),Cause,Payment Mode,Status,Address\n";
    const rows = reportData.records
      .map((r: any) =>
        [
          r.receiptNo,
          new Date(r.date).toISOString().split("T")[0],
          `"${r.donorName}"`,
          r.pan,
          r.donorType,
          r.amountRupees,
          `"${r.financialType}"`,
          r.paymentMode,
          r.paymentStatus,
          `"${r.address}"`,
        ].join(",")
      )
      .join("\n");
    return header + rows;
  } else if (reportData.sectors && reportData.reportType.includes("Budget")) {
    // Budget Variance
    const header = "Work Area ID,Sector Name,Allocated (INR),Spent (INR),Remaining (INR),Utilization %,Status\n";
    const rows = reportData.sectors
      .map((s: any) =>
        [s.workAreaId, `"${s.name}"`, s.allocatedRupees, s.spentRupees, s.remainingRupees, `${s.utilizationPercentage}%`, s.status].join(",")
      )
      .join("\n");
    return header + rows;
  } else if (reportData.monthlyBreakdown) {
    // Income vs Expenditure
    const header = "Month,Income (INR),Expenditure (INR),Net Surplus (INR)\n";
    const rows = reportData.monthlyBreakdown
      .map((m: any) => [m.month, m.incomeRupees, m.expenseRupees, m.netSurplusRupees].join(","))
      .join("\n");
    return header + rows;
  } else if (reportData.sources) {
    // Income by Source
    const header = "Payment Source,Transactions Count,Amount (INR),Share %\n";
    const rows = reportData.sources
      .map((s: any) => [`"${s.source}"`, s.count, s.amountRupees, `${s.percentage}%`].join(","))
      .join("\n");
    return header + rows;
  } else if (reportData.sectors) {
    // Expenditure by Sector
    const header = "Work Area ID,Sector Name,Voucher Count,Spent (INR),Share %\n";
    const rows = reportData.sectors
      .map((s: any) => [s.code, `"${s.name}"`, s.voucherCount, s.spentRupees, `${s.percentage}%`].join(","))
      .join("\n");
    return header + rows;
  }

  return "Metric,Value\nReport," + reportData.reportType;
}

/**
 * Generate Audited PDF report with official header and signature block
 */
export function generateReportPDF(reportData: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: "A4" });
      const buffers: Buffer[] = [];

      doc.on("data", (chunk: Buffer) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // Primary Branding Header
      doc.rect(40, 40, doc.page.width - 80, 70).fill("#0b1b32");
      doc.font("Helvetica-Bold").fillColor("#10b981").fontSize(18).text("ISLAH WELFARE FOUNDATION", 55, 52);
      doc.font("Helvetica").fillColor("#94a3b8").fontSize(9).text("Centralised Financial & Statutory Reporting Center", 55, 75);
      doc.fillColor("#cbd5e1").fontSize(8).text("Reg. Under 80G & 12A • PAN: AAATI8829F • New Delhi, India", 55, 88);

      doc.moveDown(4);

      // Report Title
      doc.fillColor("#0f172a").fontSize(15).text(reportData.reportType, { underline: true });
      doc.fillColor("#64748b").fontSize(9).text(`Generated on: ${new Date().toLocaleDateString("en-IN")} | Status: Audited & Verified`);
      doc.moveDown(1.5);

      // Summary Box
      doc.rect(40, doc.y, doc.page.width - 80, 50).fillAndStroke("#f8fafc", "#e2e8f0");
      const summaryY = doc.y + 12;

      if (reportData.totalIncomeRupees !== undefined) {
        doc.fillColor("#0f172a").fontSize(10).text("Total Volume:", 55, summaryY);
        doc.fillColor("#059669").fontSize(12).text(`₹ ${Number(reportData.totalIncomeRupees).toLocaleString("en-IN")}`, 55, summaryY + 14);
      } else if (reportData.totalExpenditureRupees !== undefined) {
        doc.fillColor("#0f172a").fontSize(10).text("Total Spend:", 55, summaryY);
        doc.fillColor("#d97706").fontSize(12).text(`₹ ${Number(reportData.totalExpenditureRupees).toLocaleString("en-IN")}`, 55, summaryY + 14);
      } else if (reportData.totalEligibleAmountRupees !== undefined) {
        doc.fillColor("#0f172a").fontSize(10).text("80G Eligible Total:", 55, summaryY);
        doc.fillColor("#059669").fontSize(12).text(`₹ ${Number(reportData.totalEligibleAmountRupees).toLocaleString("en-IN")}`, 55, summaryY + 14);
      }

      doc.y = summaryY + 45;
      doc.moveDown(1.5);

      // Table Header
      doc.rect(40, doc.y, doc.page.width - 80, 22).fill("#0f172a");
      const tableHeaderY = doc.y + 6;
      doc.fillColor("#ffffff").fontSize(9);

      if (reportData.records) {
        doc.text("Receipt #", 50, tableHeaderY);
        doc.text("Donor Name", 160, tableHeaderY);
        doc.text("PAN", 310, tableHeaderY);
        doc.text("Amount (INR)", 450, tableHeaderY, { align: "right", width: 100 });
      } else if (reportData.sectors) {
        doc.text("Sector Name", 50, tableHeaderY);
        doc.text("Allocated / Total", 280, tableHeaderY);
        doc.text("Incurred (INR)", 450, tableHeaderY, { align: "right", width: 100 });
      } else {
        doc.text("Description / Source", 50, tableHeaderY);
        doc.text("Amount (INR)", 450, tableHeaderY, { align: "right", width: 100 });
      }

      doc.y += 20;

      // Table Rows (top 15 entries)
      const items = reportData.records || reportData.sectors || reportData.sources || reportData.monthlyBreakdown || [];
      const renderItems = items.slice(0, 15);

      renderItems.forEach((item: any, i: number) => {
        const bg = i % 2 === 0 ? "#ffffff" : "#f1f5f9";
        doc.rect(40, doc.y, doc.page.width - 80, 20).fill(bg);
        const rowY = doc.y + 5;
        doc.fillColor("#334155").fontSize(8);

        if (item.receiptNo) {
          doc.text(item.receiptNo, 50, rowY);
          doc.text(String(item.donorName).substring(0, 25), 160, rowY);
          doc.text(item.pan || "N/A", 310, rowY);
          doc.text(`₹ ${Number(item.amountRupees).toLocaleString("en-IN")}`, 450, rowY, { align: "right", width: 100 });
        } else if (item.name) {
          doc.text(String(item.name).substring(0, 35), 50, rowY);
          doc.text(item.allocatedRupees ? `₹ ${Number(item.allocatedRupees).toLocaleString("en-IN")}` : `${item.percentage || 0}%`, 280, rowY);
          doc.text(`₹ ${Number(item.spentRupees || item.amountRupees || 0).toLocaleString("en-IN")}`, 450, rowY, { align: "right", width: 100 });
        } else if (item.source) {
          doc.text(item.source, 50, rowY);
          doc.text(`₹ ${Number(item.amountRupees).toLocaleString("en-IN")}`, 450, rowY, { align: "right", width: 100 });
        } else if (item.month) {
          doc.text(item.month, 50, rowY);
          doc.text(`Surplus: ₹ ${Number(item.netSurplusRupees).toLocaleString("en-IN")}`, 280, rowY);
          doc.text(`₹ ${Number(item.incomeRupees).toLocaleString("en-IN")}`, 450, rowY, { align: "right", width: 100 });
        }

        doc.y += 20;
      });

      doc.moveDown(3);

      // Audit Stamp & Signature Block
      const sigY = Math.min(doc.y, 720);
      doc.rect(40, sigY, doc.page.width - 80, 60).stroke("#cbd5e1");
      doc.fillColor("#64748b").fontSize(8);
      doc.text("FOR ISLAH WELFARE FOUNDATION", 55, sigY + 10);
      doc.text("Statutory Auditor / Finance Committee Seal", 55, sigY + 40);
      doc.text("Authorized Signatory: Imteyazullah", 360, sigY + 10, { align: "right", width: 180 });
      doc.text("Verified via Central Ledger Engine", 360, sigY + 40, { align: "right", width: 180 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
