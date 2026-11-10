import { Types } from "mongoose";
import { BankStatement, BankStatementLine, IBankStatement, IBankStatementLine } from "../models/BankStatement.js";
import { LedgerEntry, ILedgerEntry } from "../models/LedgerEntry.js";
import { Donation } from "../models/Donation.js";
import { Expense } from "../models/Expense.js";
import { Verification } from "../models/Verification.js";
import { getNextReceiptNo, getNextTransactionNo, getCurrentFinancialYear } from "../utils/idGenerator.js";

/**
 * Robust CSV line splitter that handles quoted commas and spaces
 */
export function parseCSVLine(text: string): string[] {
  const result: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (inQuotes && text[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === "," && !inQuotes) {
      result.push(cur.trim());
      cur = "";
    } else {
      cur += c;
    }
  }
  result.push(cur.trim());
  return result;
}

/**
 * Flexible Date parser supporting Indian and ISO date formats:
 * DD/MM/YYYY, DD-MM-YYYY, YYYY-MM-DD, DD MMM YYYY, etc.
 */
export function parseFlexibleDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const clean = dateStr.trim().replace(/['"]/g, "");

  // DD/MM/YYYY or DD-MM-YYYY
  const dmyMatch = clean.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})/);
  if (dmyMatch) {
    const day = parseInt(dmyMatch[1], 10);
    const month = parseInt(dmyMatch[2], 10) - 1;
    const year = parseInt(dmyMatch[3], 10);
    return new Date(Date.UTC(year, month, day));
  }

  // YYYY-MM-DD
  const ymdMatch = clean.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})/);
  if (ymdMatch) {
    const year = parseInt(ymdMatch[1], 10);
    const month = parseInt(ymdMatch[2], 10) - 1;
    const day = parseInt(ymdMatch[3], 10);
    return new Date(Date.UTC(year, month, day));
  }

  const parsed = new Date(clean);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}

/**
 * Parse monetary amounts in INR (e.g., "1,50,000.00", "₹ 25,000", "-") into paise integer
 */
export function parseAmountToPaise(val: string | number | undefined): number {
  if (val === undefined || val === null) return 0;
  if (typeof val === "number") return Math.round(val * 100);

  const clean = String(val)
    .replace(/[₹,\s]/g, "")
    .replace(/[()]/g, "")
    .trim();

  if (!clean || clean === "-" || clean === "0.00") return 0;
  const num = parseFloat(clean);
  if (isNaN(num)) return 0;
  return Math.round(Math.abs(num) * 100);
}

/**
 * Extract transaction reference / UTR / Cheque number from narration or dedicated column
 */
export function extractReference(narration: string, explicitRef?: string): string | undefined {
  if (explicitRef && explicitRef.trim() && explicitRef.trim() !== "-") {
    return explicitRef.trim();
  }

  // 12-digit numeric RRN (common in UPI: e.g., UPI/P2A/512948291039/...)
  const rrnMatch = narration.match(/\b\d{12}\b/);
  if (rrnMatch) return rrnMatch[0];

  // UPI pattern with optional sub-types like P2A / P2M / REV
  const upiP2AMatch = narration.match(
    /(?:UPI|IMPS|NEFT|RTGS)[\/: -]+(?:P2A|P2M|REV|CR|DR)?[\/: -]*([A-Za-z0-9]{6,25})/i
  );
  if (upiP2AMatch && upiP2AMatch[1]) return upiP2AMatch[1].trim();

  const utrMatch = narration.match(/(?:UTR|REF|TXN|CHQ)[\/: #]+([A-Za-z0-9]+)/i);
  if (utrMatch && utrMatch[1]) return utrMatch[1].trim();

  return undefined;
}

export interface ParsedStatementResult {
  statement: IBankStatement;
  lines: IBankStatementLine[];
}

/**
 * Parses bank statement CSV text and persists statement & lines
 */
export async function parseAndSaveBankStatement({
  csvContent,
  bankAccountId,
  uploadedBy,
  fileUrl,
}: {
  csvContent: string;
  bankAccountId: string | Types.ObjectId;
  uploadedBy: string;
  fileUrl?: string;
}): Promise<ParsedStatementResult> {
  const rawLines = csvContent.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (rawLines.length < 2) {
    throw new Error("Bank statement CSV must contain at least a header row and one transaction line.");
  }

  // Detect header index
  let headerIndex = -1;
  let headers: string[] = [];

  for (let i = 0; i < Math.min(rawLines.length, 15); i++) {
    const cols = parseCSVLine(rawLines[i]).map((c) => c.toLowerCase().trim());
    const hasDate = cols.some((c) => c.includes("date") || c.includes("txn dt") || c.includes("tran date"));
    const hasNarration = cols.some(
      (c) =>
        c.includes("narration") ||
        c.includes("description") ||
        c.includes("particular") ||
        c.includes("remarks")
    );
    const hasAmount = cols.some(
      (c) =>
        c.includes("debit") ||
        c.includes("credit") ||
        c.includes("withdrawal") ||
        c.includes("deposit") ||
        c.includes("amount") ||
        c.split(/[\s()/-]+/).includes("cr") ||
        c.split(/[\s()/-]+/).includes("dr")
    );

    if (hasDate && (hasNarration || hasAmount)) {
      headerIndex = i;
      headers = cols;
      break;
    }
  }

  if (headerIndex === -1) {
    // Default fallback to first line
    headerIndex = 0;
    headers = parseCSVLine(rawLines[0]).map((c) => c.toLowerCase().trim());
  }

  // Column index identification
  const dateCol = headers.findIndex((c) => c.includes("date") || c.includes("txn dt") || c.includes("tran date"));
  const narrCol = headers.findIndex(
    (c) =>
      c.includes("narration") ||
      c.includes("description") ||
      c.includes("particular") ||
      c.includes("remarks")
  );
  const refCol = headers.findIndex(
    (c) =>
      c.includes("ref") ||
      c.includes("chq") ||
      c.includes("cheque") ||
      c.includes("utr") ||
      c.includes("reference")
  );
  const debitCol = headers.findIndex(
    (c) =>
      c.includes("debit") ||
      c.includes("withdrawal") ||
      c.split(/[\s()/-]+/).includes("dr")
  );
  const creditCol = headers.findIndex(
    (c) =>
      c.includes("credit") ||
      c.includes("deposit") ||
      c.split(/[\s()/-]+/).includes("cr")
  );
  const balCol = headers.findIndex((c) => c.includes("bal") || c.includes("balance"));

  const parsedItems: Array<{
    date: Date;
    narration: string;
    reference?: string;
    creditPaise: number;
    debitPaise: number;
    balancePaise?: number;
  }> = [];

  for (let i = headerIndex + 1; i < rawLines.length; i++) {
    const cols = parseCSVLine(rawLines[i]);
    if (cols.length < 2) continue;

    const dateStr = dateCol !== -1 ? cols[dateCol] : cols[0];
    const narration = narrCol !== -1 ? cols[narrCol] : cols[1] || "Bank Transaction";
    const explicitRef = refCol !== -1 ? cols[refCol] : undefined;

    const creditStr = creditCol !== -1 ? cols[creditCol] : "0";
    const debitStr = debitCol !== -1 ? cols[debitCol] : "0";
    const balStr = balCol !== -1 ? cols[balCol] : undefined;

    const creditPaise = parseAmountToPaise(creditStr);
    const debitPaise = parseAmountToPaise(debitStr);
    const balancePaise = balStr ? parseAmountToPaise(balStr) : undefined;

    // Skip rows with neither credit nor debit
    if (creditPaise === 0 && debitPaise === 0) continue;

    const date = parseFlexibleDate(dateStr);
    const reference = extractReference(narration, explicitRef);

    parsedItems.push({
      date,
      narration: narration.trim(),
      reference,
      creditPaise,
      debitPaise,
      balancePaise,
    });
  }

  if (parsedItems.length === 0) {
    throw new Error("No valid financial transaction rows could be parsed from the provided CSV.");
  }

  // Calculate overall statement date bounds
  const timestamps = parsedItems.map((p) => p.date.getTime());
  const periodFrom = new Date(Math.min(...timestamps));
  const periodTo = new Date(Math.max(...timestamps));

  // Create BankStatement document
  const statement = await BankStatement.create({
    bankAccountId,
    periodFrom,
    periodTo,
    uploadedBy,
    fileUrl,
    lineCount: parsedItems.length,
  });

  // Prepare statement line documents
  const lineDocs = parsedItems.map((item) => ({
    statementId: statement._id,
    date: item.date,
    narration: item.narration,
    reference: item.reference,
    creditPaise: item.creditPaise,
    debitPaise: item.debitPaise,
    balancePaise: item.balancePaise,
    matchStatus: "unmatched" as const,
  }));

  const createdLines = await BankStatementLine.insertMany(lineDocs);

  return {
    statement,
    lines: createdLines as unknown as IBankStatementLine[],
  };
}

/**
 * Intelligent Auto-Matching Engine
 * Scans unmatched lines in a statement (or all unmatched lines) and attempts
 * high-confidence matching against LedgerEntry, Donation, and Expense records.
 */
export async function runAutoMatching(statementId?: string): Promise<{
  matchedCount: number;
  suggestedCount: number;
  unmatchedCount: number;
}> {
  const query: any = { matchStatus: { $in: ["unmatched", "suggested"] } };
  if (statementId) query.statementId = statementId;

  const lines = await BankStatementLine.find(query);
  let matchedCount = 0;
  let suggestedCount = 0;

  for (const line of lines) {
    const lineDate = line.date;
    const windowStart = new Date(lineDate.getTime() - 5 * 24 * 60 * 60 * 1000);
    const windowEnd = new Date(lineDate.getTime() + 5 * 24 * 60 * 60 * 1000);

    if (line.creditPaise > 0) {
      // 1. Credit Match (Donations / Incomes)
      let matchedLedger: any = null;

      // Rule 1A: Exact reference match against Ledger idempotency or source
      if (line.reference) {
        matchedLedger = await LedgerEntry.findOne({
          direction: "credit",
          $or: [
            { idempotencyKey: new RegExp(line.reference, "i") },
            { head: new RegExp(line.reference, "i") },
          ],
        });

        if (!matchedLedger) {
          // Check donation transactionId / receiptNo
          const donation = await Donation.findOne({
            $or: [
              { transactionId: new RegExp(line.reference, "i") },
              { receiptNo: line.reference.toUpperCase() },
            ],
          });
          if (donation) {
            matchedLedger = await LedgerEntry.findOne({
              sourceType: { $in: ["donation", "income"] },
              sourceId: donation._id,
            });
          }
        }
      }

      // Rule 1B: Exact amount + Date proximity (±5 days)
      if (!matchedLedger) {
        const candidateEntries = await LedgerEntry.find({
          direction: "credit",
          amountPaise: line.creditPaise,
          "reconciliation.status": "unreconciled",
          effectiveDate: { $gte: windowStart, $lte: windowEnd },
        }).limit(2);

        if (candidateEntries.length === 1) {
          matchedLedger = candidateEntries[0];
        } else if (candidateEntries.length > 1) {
          // Ambiguous: mark as suggested
          line.matchStatus = "suggested";
          line.matchedLedgerEntryId = candidateEntries[0]._id as Types.ObjectId;
          line.notes = `Multiple potential candidates for ₹${(line.creditPaise / 100).toLocaleString("en-IN")}`;
          await line.save();
          suggestedCount++;
          continue;
        }
      }

      if (matchedLedger) {
        line.matchStatus = "matched";
        line.matchedLedgerEntryId = matchedLedger._id;
        line.notes = `Auto-matched to ${matchedLedger.entryNo}`;
        await line.save();

        // Update ledger entry reconciliation sub-document
        await LedgerEntry.findByIdAndUpdate(matchedLedger._id, {
          "reconciliation.status": "reconciled",
          "reconciliation.bankLineId": line._id,
          "reconciliation.at": new Date(),
          "reconciliation.by": "auto_matcher",
        });

        matchedCount++;
        continue;
      }
    } else if (line.debitPaise > 0) {
      // 2. Debit Match (Expenses / Disbursements)
      let matchedLedger: any = null;

      // Rule 2A: Reference / UTR match in Expense record
      if (line.reference) {
        const expense = await Expense.findOne({
          "payment.reference": new RegExp(line.reference, "i"),
        });
        if (expense) {
          matchedLedger = await LedgerEntry.findOne({
            sourceType: "expense",
            sourceId: expense._id,
          });
        }
      }

      // Rule 2B: Amount + Date proximity (±5 days)
      if (!matchedLedger) {
        const candidateEntries = await LedgerEntry.find({
          direction: "debit",
          type: "expense",
          amountPaise: line.debitPaise,
          "reconciliation.status": "unreconciled",
          effectiveDate: { $gte: windowStart, $lte: windowEnd },
        }).limit(2);

        if (candidateEntries.length === 1) {
          matchedLedger = candidateEntries[0];
        } else if (candidateEntries.length > 1) {
          line.matchStatus = "suggested";
          line.matchedLedgerEntryId = candidateEntries[0]._id as Types.ObjectId;
          line.notes = `Multiple expense candidates for ₹${(line.debitPaise / 100).toLocaleString("en-IN")}`;
          await line.save();
          suggestedCount++;
          continue;
        }
      }

      if (matchedLedger) {
        line.matchStatus = "matched";
        line.matchedLedgerEntryId = matchedLedger._id;
        line.notes = `Auto-matched to ${matchedLedger.entryNo}`;
        await line.save();

        await LedgerEntry.findByIdAndUpdate(matchedLedger._id, {
          "reconciliation.status": "reconciled",
          "reconciliation.bankLineId": line._id,
          "reconciliation.at": new Date(),
          "reconciliation.by": "auto_matcher",
        });

        matchedCount++;
        continue;
      }
    }
  }

  const remainingUnmatched = await BankStatementLine.countDocuments({
    ...(statementId ? { statementId } : {}),
    matchStatus: "unmatched",
  });

  return {
    matchedCount,
    suggestedCount,
    unmatchedCount: remainingUnmatched,
  };
}

/**
 * Manually confirm or link a statement line with a specific ledger entry
 */
export async function confirmLineMatch({
  lineId,
  ledgerEntryId,
  adminUser = "admin",
}: {
  lineId: string | Types.ObjectId;
  ledgerEntryId: string | Types.ObjectId;
  adminUser?: string;
}): Promise<IBankStatementLine> {
  const line = await BankStatementLine.findById(lineId);
  if (!line) throw new Error("Bank statement line not found");

  const ledgerEntry = await LedgerEntry.findById(ledgerEntryId);
  if (!ledgerEntry) throw new Error("Ledger entry not found");

  // Validate amount consistency
  const targetPaise = line.creditPaise > 0 ? line.creditPaise : line.debitPaise;
  if (Math.abs(targetPaise - ledgerEntry.amountPaise) > 100) {
    // allow ₹1 tolerance for bank charges
    console.warn(`Amount divergence warning: line ${targetPaise} vs ledger ${ledgerEntry.amountPaise}`);
  }

  line.matchStatus = "matched";
  line.matchedLedgerEntryId = ledgerEntry._id as Types.ObjectId;
  line.notes = `Manually confirmed by ${adminUser}`;
  await line.save();

  await LedgerEntry.findByIdAndUpdate(ledgerEntry._id, {
    "reconciliation.status": "reconciled",
    "reconciliation.bankLineId": line._id,
    "reconciliation.at": new Date(),
    "reconciliation.by": adminUser,
  });

  return line;
}

/**
 * Unmatch an existing reconciled statement line
 */
export async function unmatchLine({
  lineId,
  adminUser = "admin",
}: {
  lineId: string | Types.ObjectId;
  adminUser?: string;
}): Promise<IBankStatementLine> {
  const line = await BankStatementLine.findById(lineId);
  if (!line) throw new Error("Bank statement line not found");

  if (line.matchedLedgerEntryId) {
    await LedgerEntry.findByIdAndUpdate(line.matchedLedgerEntryId, {
      "reconciliation.status": "unreconciled",
      $unset: {
        "reconciliation.bankLineId": "",
        "reconciliation.at": "",
        "reconciliation.by": "",
      },
    });
  }

  line.matchStatus = "unmatched";
  line.matchedLedgerEntryId = undefined;
  line.notes = `Unmatched by ${adminUser}`;
  await line.save();

  return line;
}

/**
 * Convert an unmatched bank credit directly into a recorded verified donation
 * (For direct donor bank deposits that were never entered through the website)
 */
export async function recordDirectIncomeFromLine({
  lineId,
  donorName,
  donorType = "Individual",
  email = "direct-bank@islahwelfare.org",
  phone = "9999999999",
  pan,
  workAreaId = "HLT",
  financialType = "Direct Bank Donation",
  taxExemption = true,
  adminUser = "superadmin",
}: {
  lineId: string | Types.ObjectId;
  donorName: string;
  donorType?: "Individual" | "Corporate";
  email?: string;
  phone?: string;
  pan?: string;
  workAreaId?: string;
  financialType?: string;
  taxExemption?: boolean;
  adminUser?: string;
}): Promise<{ donation: any; ledgerEntry: any; line: IBankStatementLine }> {
  const line = await BankStatementLine.findById(lineId);
  if (!line) throw new Error("Bank statement line not found");
  if (line.creditPaise <= 0) throw new Error("Only credit statement lines can be recorded as direct income");

  const currentYear = new Date().getFullYear();
  const receiptNo = await getNextReceiptNo(currentYear);
  const certificateNo = `CERT-${currentYear}-${receiptNo.replace(/\D/g, "").slice(-5)}`;
  const amountRupees = line.creditPaise / 100;

  const donation = new Donation({
    receiptNo,
    certificateNo,
    transactionId: line.reference || `BNK-${line._id.toString().slice(-8)}`,
    donorName: donorName.trim(),
    donorType,
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    financialType,
    amount: amountRupees,
    amountPaise: line.creditPaise,
    grossPaise: line.creditPaise,
    feePaise: 0,
    netPaise: line.creditPaise,
    workAreaId: workAreaId.toUpperCase(),
    taxExemption: Boolean(taxExemption),
    pan: pan ? pan.toUpperCase() : undefined,
    paymentMode: "Bank Transfer",
    paymentStatus: "Success",
    websiteConsent: "Yes",
    isPublicConsent: true,
    notes: `Direct bank credit reconciled from line: ${line.narration}`,
  });

  await donation.save();

  // Create Reconciled Dual-entry Ledger Entry
  const fy = getCurrentFinancialYear();
  const txnNo = await getNextTransactionNo(currentYear);
  const now = new Date();
  const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const ledgerEntry = await LedgerEntry.create({
    entryNo: txnNo,
    effectiveDate: line.date,
    postedAt: now,
    fy,
    month,
    direction: "credit",
    amountPaise: line.creditPaise,
    type: "manual_income",
    head: financialType,
    sourceType: "income",
    sourceId: donation._id,
    workAreaId: workAreaId.toUpperCase(),
    fundType: "general",
    paymentMethod: "Bank Transfer",
    reconciliation: {
      status: "reconciled",
      bankLineId: line._id as Types.ObjectId,
      at: now,
      by: adminUser,
    },
    idempotencyKey: `direct_stmt_${line._id}`,
    createdBy: adminUser,
  });

  // Create 80G verification record
  await Verification.findOneAndUpdate(
    { documentNo: receiptNo },
    {
      documentNo: receiptNo,
      documentType: "donation_receipt",
      title: `80G Donation Receipt - ${financialType}`,
      issuedTo: donorName.trim(),
      issueDate: line.date,
      status: "Verified",
      details: {
        amount: amountRupees,
        financialType,
        receiptNo,
        pan: pan ? pan.toUpperCase() : undefined,
        paymentMode: "Bank Transfer",
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  // Mark statement line as matched
  line.matchStatus = "matched";
  line.matchedLedgerEntryId = ledgerEntry._id as Types.ObjectId;
  line.notes = `Direct income recorded by ${adminUser}: ${receiptNo}`;
  await line.save();

  return { donation, ledgerEntry, line };
}

/**
 * Search candidates for an unmatched statement line
 */
export async function findCandidatesForLine(lineId: string | Types.ObjectId): Promise<any[]> {
  const line = await BankStatementLine.findById(lineId);
  if (!line) return [];

  const targetPaise = line.creditPaise > 0 ? line.creditPaise : line.debitPaise;
  const direction = line.creditPaise > 0 ? "credit" : "debit";
  const windowStart = new Date(line.date.getTime() - 15 * 24 * 60 * 60 * 1000);
  const windowEnd = new Date(line.date.getTime() + 15 * 24 * 60 * 60 * 1000);

  const query: any = {
    direction,
    effectiveDate: { $gte: windowStart, $lte: windowEnd },
  };

  // Fetch entries
  const entries = await LedgerEntry.find(query).sort({ effectiveDate: -1 }).limit(20);

  return entries.map((entry) => {
    let confidence: "high" | "medium" | "low" = "low";
    let score = 0;

    if (entry.amountPaise === targetPaise) {
      score += 50;
    }
    if (line.reference && (entry.idempotencyKey.includes(line.reference) || entry.head.includes(line.reference))) {
      score += 50;
    }
    const daysDiff = Math.abs(entry.effectiveDate.getTime() - line.date.getTime()) / (24 * 60 * 60 * 1000);
    if (daysDiff <= 2) score += 20;

    if (score >= 70) confidence = "high";
    else if (score >= 40) confidence = "medium";

    return {
      ledgerEntryId: entry._id,
      entryNo: entry.entryNo,
      date: entry.effectiveDate,
      amountPaise: entry.amountPaise,
      amountRupees: entry.amountPaise / 100,
      head: entry.head,
      type: entry.type,
      reconciliationStatus: entry.reconciliation.status,
      confidence,
      score,
    };
  });
}
