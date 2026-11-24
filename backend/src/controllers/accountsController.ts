import { Request, Response } from "express";
import { Types } from "mongoose";
import { BankAccount, maskAccountNumber } from "../models/BankAccount.js";
import { CashAccount } from "../models/CashAccount.js";
import { AccountTransfer, type AccountKind, type TransferType } from "../models/AccountTransfer.js";
import { JournalEntry } from "../models/JournalEntry.js";
import { ChartOfAccount } from "../models/ChartOfAccount.js";
import { BankStatement, BankStatementLine } from "../models/BankStatement.js";
import { Expense } from "../models/Expense.js";
import { getNextSequence } from "../models/Counter.js";
import { getActor, logAudit } from "../services/auditService.js";
import { checkSeparationOfDuties } from "../services/separationOfDuties.js";
import {
  ACC,
  accountMovements,
  ensureBankLedgerAccount,
  ensureCashLedgerAccount,
  ensureChartOfAccounts,
  financialYearOf,
  ledgerBalance,
  postGatewaySettlement,
  postOpeningBalance,
  postTransfer,
  reverseJournal,
  trialBalance,
} from "../services/accountingService.js";
import type { RbacRequest } from "../middlewares/rbac.js";

/**
 * Bank & cash account registers, transfers between them, gateway settlements,
 * journals and the trial balance (Finance blueprint §2, §4, §11).
 *
 * Every figure here comes from posted journals. Nothing in this controller
 * edits or deletes a posted journal: corrections are reversals.
 */

const IFSC_RE = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const ACCOUNT_NO_RE = /^\d{6,20}$/;
const NOT_CLOSED = { $nin: ["inactive", "closed"] as ("inactive" | "closed")[] };

const actorName = (req: Request) => {
  const a = getActor(req);
  return a.name || a.email;
};

const canSeeBankPii = (req: Request) =>
  Boolean((req as RbacRequest).adminUser?.permissionsSet?.has("finance.bank_account:view_pii"));

const toPaise = (v: unknown): number | null => {
  const n = Number(v);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
};

const parseDate = (v: unknown): Date | null => {
  if (!v) return null;
  const d = new Date(String(v));
  return Number.isNaN(d.getTime()) ? null : d;
};

const fail = (res: Response, status: number, message: string) => {
  res.status(status).json({ success: false, message });
};

const serverError = (res: Response, label: string, error: any) => {
  console.error(`${label} error:`, error);
  res.status(500).json({ success: false, message: error?.message || `Failed: ${label}` });
};

// ============================================================================
// Register helpers
// ============================================================================

/** Lines of one ledger account with a running balance, newest first. */
async function accountRegister(code: string, limit = 100) {
  const rows = await JournalEntry.aggregate([
    { $match: { "lines.accountCode": code } },
    { $unwind: "$lines" },
    { $match: { "lines.accountCode": code } },
    { $sort: { date: 1, postedAt: 1, _id: 1 } },
    {
      $project: {
        journalNo: 1,
        date: 1,
        narration: 1,
        sourceType: 1,
        sourceRef: 1,
        status: 1,
        debitPaise: "$lines.debitPaise",
        creditPaise: "$lines.creditPaise",
        memo: "$lines.memo",
      },
    },
  ]);
  let running = 0;
  const withBalance = rows.map((r) => {
    running += (r.debitPaise || 0) - (r.creditPaise || 0);
    return { ...r, balancePaise: running };
  });
  return withBalance.reverse().slice(0, limit);
}

async function reconciliationStats(bankAccountId: Types.ObjectId) {
  const statements = await BankStatement.find({ bankAccountId }).select("_id createdAt").sort({ createdAt: -1 });
  const ids = statements.map((s) => s._id);
  const [unreconciled, lastMatched] = await Promise.all([
    ids.length ? BankStatementLine.countDocuments({ statementId: { $in: ids }, matchStatus: "unmatched" }) : 0,
    ids.length
      ? BankStatementLine.findOne({ statementId: { $in: ids }, matchStatus: "matched" }).sort({ date: -1 }).select("date")
      : null,
  ]);
  return {
    unreconciledLines: unreconciled,
    lastReconciledDate: lastMatched?.date || null,
    lastStatementImportedAt: statements[0]?.createdAt || null,
  };
}

function publicBank(b: any, extra: Record<string, unknown> = {}) {
  const o = typeof b.toObject === "function" ? b.toObject() : { ...b };
  delete o.accountNumber;
  return { ...o, status: o.status || "active", ...extra };
}

// ============================================================================
// Bank accounts
// ============================================================================

export async function listBankAccountRegister(_req: Request, res: Response): Promise<void> {
  try {
    await ensureChartOfAccounts();
    const banks = await BankAccount.find().sort({ isPrimary: -1, status: 1, bankName: 1 });
    const data = [];
    for (const b of banks) {
      const code = await ensureBankLedgerAccount(b._id);
      const balancePaise = await ledgerBalance(code);
      data.push(publicBank(b, { ledgerAccountCode: code, balancePaise, ...(await reconciliationStats(b._id)) }));
    }
    res.json({ success: true, data });
  } catch (error) {
    serverError(res, "listBankAccountRegister", error);
  }
}

export async function getBankAccountDetail(req: Request, res: Response): Promise<void> {
  try {
    const bank = await BankAccount.findById(req.params.id);
    if (!bank) return fail(res, 404, "Bank account not found.");
    const code = await ensureBankLedgerAccount(bank._id);
    const [balancePaise, register, recon] = await Promise.all([
      ledgerBalance(code),
      accountRegister(code, Number(req.query.limit) || 100),
      reconciliationStats(bank._id),
    ]);
    res.json({
      success: true,
      data: publicBank(bank, { ledgerAccountCode: code, balancePaise, ...recon }),
      register,
    });
  } catch (error) {
    serverError(res, "getBankAccountDetail", error);
  }
}

/** Full account number, for staff with the PII permission. Every view is audited. */
export async function revealBankAccountNumber(req: Request, res: Response): Promise<void> {
  try {
    if (!canSeeBankPii(req)) return fail(res, 403, "You do not have permission to view full account numbers.");
    const bank = await BankAccount.findById(req.params.id).select("+accountNumber bankName accountNumberMasked");
    if (!bank) return fail(res, 404, "Bank account not found.");
    await logAudit({
      req,
      action: "finance.bank_account:view_pii",
      resourceType: "bank_account",
      resourceId: bank._id.toString(),
      severity: "warning",
      reason: `Full account number viewed for ${bank.bankName} ${bank.accountNumberMasked}`,
    });
    res.json({ success: true, accountNumber: bank.accountNumber || null });
  } catch (error) {
    serverError(res, "revealBankAccountNumber", error);
  }
}

export async function createBankAccount(req: Request, res: Response): Promise<void> {
  try {
    const b = req.body || {};
    const bankName = String(b.bankName || "").trim();
    const accountNumber = String(b.accountNumber || "").replace(/\s/g, "");
    const ifsc = String(b.ifsc || "").trim().toUpperCase();
    const openingBalancePaise = toPaise(b.openingBalance ?? 0);
    const openingDate = parseDate(b.openingDate);

    if (!bankName) return fail(res, 400, "Bank name is required.");
    if (!ACCOUNT_NO_RE.test(accountNumber)) return fail(res, 400, "Account number must be 6 to 20 digits.");
    if (!IFSC_RE.test(ifsc)) return fail(res, 400, "Enter a valid 11-character IFSC (e.g. SBIN0001234).");
    if (openingBalancePaise === null) return fail(res, 400, "Opening balance must be zero or more.");
    if (!openingDate) return fail(res, 400, "Opening balance date is required.");

    const masked = maskAccountNumber(accountNumber);
    if (await BankAccount.exists({ ifsc, accountNumberMasked: masked, bankName })) {
      return fail(res, 409, "This bank account is already registered.");
    }

    const createdBy = actorName(req);
    const isFirst = !(await BankAccount.exists({}));
    const bank = await BankAccount.create({
      bankName,
      accountName: String(b.accountName || "Islah Welfare Foundation").trim(),
      accountNumber,
      accountNumberMasked: masked,
      ifsc,
      branch: b.branch ? String(b.branch).trim() : undefined,
      type: ["current", "savings", "other"].includes(b.type) ? b.type : "current",
      purpose: ["general", "programme", "grant", "other"].includes(b.purpose) ? b.purpose : "general",
      office: ["registered", "administrative", "regional", "other"].includes(b.office) ? b.office : "registered",
      fundClassification: ["general", "restricted", "specific"].includes(b.fundClassification)
        ? b.fundClassification
        : "general",
      openingBalancePaise,
      openingDate,
      status: "active",
      integrationStatus: "manual",
      isPrimary: Boolean(b.isPrimary) || isFirst,
      notes: b.notes ? String(b.notes).slice(0, 1000) : undefined,
      createdBy,
    });
    if (bank.isPrimary) await BankAccount.updateMany({ _id: { $ne: bank._id } }, { $set: { isPrimary: false } });

    const code = await ensureBankLedgerAccount(bank._id);
    await postOpeningBalance({ kind: "bank", accountId: bank._id, amountPaise: openingBalancePaise, date: openingDate, createdBy });

    await logAudit({
      req,
      action: "finance.bank_account:edit",
      resourceType: "bank_account",
      resourceId: bank._id.toString(),
      after: { bankName, accountNumberMasked: masked, ifsc, openingBalancePaise, ledgerAccountCode: code },
      reason: `Bank account ${bankName} ${masked} added`,
    });
    const fresh = await BankAccount.findById(bank._id);
    res.status(201).json({ success: true, data: publicBank(fresh, { balancePaise: await ledgerBalance(code) }) });
  } catch (error) {
    serverError(res, "createBankAccount", error);
  }
}

/**
 * Edits descriptive fields. A changed opening balance is corrected by reversing
 * the old opening journal and posting a new one — never by editing it.
 */
export async function updateBankAccount(req: Request, res: Response): Promise<void> {
  try {
    const bank = await BankAccount.findById(req.params.id);
    if (!bank) return fail(res, 404, "Bank account not found.");
    const b = req.body || {};
    const before = publicBank(bank);
    const createdBy = actorName(req);

    if (b.bankName !== undefined) bank.bankName = String(b.bankName).trim() || bank.bankName;
    if (b.accountName !== undefined) bank.accountName = String(b.accountName).trim() || bank.accountName;
    if (b.branch !== undefined) bank.branch = String(b.branch).trim();
    if (b.ifsc !== undefined) {
      const ifsc = String(b.ifsc).trim().toUpperCase();
      if (!IFSC_RE.test(ifsc)) return fail(res, 400, "Enter a valid 11-character IFSC (e.g. SBIN0001234).");
      bank.ifsc = ifsc;
    }
    if (b.accountNumber !== undefined && String(b.accountNumber).trim()) {
      const num = String(b.accountNumber).replace(/\s/g, "");
      if (!ACCOUNT_NO_RE.test(num)) return fail(res, 400, "Account number must be 6 to 20 digits.");
      bank.accountNumber = num;
      bank.accountNumberMasked = maskAccountNumber(num);
    }
    if (["current", "savings", "other"].includes(b.type)) bank.type = b.type;
    if (["general", "programme", "grant", "other"].includes(b.purpose)) bank.purpose = b.purpose;
    if (["registered", "administrative", "regional", "other"].includes(b.office)) bank.office = b.office;
    if (["general", "restricted", "specific"].includes(b.fundClassification)) bank.fundClassification = b.fundClassification;
    if (["active", "inactive", "closed"].includes(b.status)) {
      if (b.status === "closed") {
        const code = await ensureBankLedgerAccount(bank._id);
        if ((await ledgerBalance(code)) !== 0) {
          return fail(res, 400, "Move the remaining balance out before closing this account.");
        }
      }
      bank.status = b.status;
    }
    if (b.notes !== undefined) bank.notes = String(b.notes).slice(0, 1000);
    if (b.isPrimary === true) {
      bank.isPrimary = true;
      await BankAccount.updateMany({ _id: { $ne: bank._id } }, { $set: { isPrimary: false } });
    }

    const newOpening = b.openingBalance !== undefined ? toPaise(b.openingBalance) : undefined;
    const newOpeningDate = b.openingDate !== undefined ? parseDate(b.openingDate) : undefined;
    if (newOpening === null) return fail(res, 400, "Opening balance must be zero or more.");
    if (b.openingDate !== undefined && !newOpeningDate) return fail(res, 400, "Opening balance date is not valid.");
    const openingChanged =
      (newOpening !== undefined && newOpening !== bank.openingBalancePaise) ||
      (newOpeningDate && bank.openingDate && newOpeningDate.getTime() !== bank.openingDate.getTime());
    if (openingChanged) {
      if (!String(b.reason || "").trim()) return fail(res, 400, "Give a reason for correcting the opening balance.");
      await correctOpeningBalance("bank", bank._id, newOpening ?? bank.openingBalancePaise, newOpeningDate || bank.openingDate || new Date(), createdBy, String(b.reason));
      bank.openingBalancePaise = newOpening ?? bank.openingBalancePaise;
      if (newOpeningDate) bank.openingDate = newOpeningDate;
    }

    await bank.save();
    await logAudit({
      req,
      action: "finance.bank_account:edit",
      resourceType: "bank_account",
      resourceId: bank._id.toString(),
      before,
      after: publicBank(bank),
      severity: openingChanged ? "high" : "info",
      reason: openingChanged ? `Opening balance corrected: ${b.reason}` : "Bank account details updated",
    });
    const code = await ensureBankLedgerAccount(bank._id);
    res.json({ success: true, data: publicBank(bank, { balancePaise: await ledgerBalance(code) }) });
  } catch (error) {
    serverError(res, "updateBankAccount", error);
  }
}

async function correctOpeningBalance(
  kind: "bank" | "cash",
  accountId: Types.ObjectId,
  amountPaise: number,
  date: Date,
  createdBy: string,
  reason: string
) {
  const current = await JournalEntry.findOne({ sourceType: "opening_balance", sourceId: accountId, status: "posted" });
  if (current) await reverseJournal(current.idempotencyKey, `Opening balance corrected — ${reason}`, createdBy);
  await postOpeningBalance({ kind, accountId, amountPaise, date, createdBy, version: String(Date.now()) });
}

// ============================================================================
// Cash accounts
// ============================================================================

const CASH_TYPES = ["head_office", "admin_office", "programme", "petty", "emergency", "other"];

export async function listCashAccounts(_req: Request, res: Response): Promise<void> {
  try {
    const accounts = await CashAccount.find().sort({ status: 1, name: 1 });
    const data = [];
    for (const c of accounts) {
      const code = await ensureCashLedgerAccount(c._id);
      const last = await JournalEntry.findOne({ "lines.accountCode": code }).sort({ date: -1 }).select("date");
      data.push({ ...c.toObject(), ledgerAccountCode: code, balancePaise: await ledgerBalance(code), lastMovementAt: last?.date || null });
    }
    res.json({ success: true, data });
  } catch (error) {
    serverError(res, "listCashAccounts", error);
  }
}

export async function getCashAccountDetail(req: Request, res: Response): Promise<void> {
  try {
    const cash = await CashAccount.findById(req.params.id);
    if (!cash) return fail(res, 404, "Cash account not found.");
    const code = await ensureCashLedgerAccount(cash._id);
    const [balancePaise, register] = await Promise.all([ledgerBalance(code), accountRegister(code, Number(req.query.limit) || 100)]);
    res.json({ success: true, data: { ...cash.toObject(), ledgerAccountCode: code, balancePaise }, register });
  } catch (error) {
    serverError(res, "getCashAccountDetail", error);
  }
}

export async function createCashAccount(req: Request, res: Response): Promise<void> {
  try {
    const b = req.body || {};
    const name = String(b.name || "").trim();
    const custodianName = String(b.custodianName || "").trim();
    const openingBalancePaise = toPaise(b.openingBalance ?? 0);
    const openingDate = parseDate(b.openingDate);
    if (!name) return fail(res, 400, "Cash account name is required.");
    if (!custodianName) return fail(res, 400, "Name the person responsible for this cash.");
    if (openingBalancePaise === null) return fail(res, 400, "Opening balance must be zero or more.");
    if (!openingDate) return fail(res, 400, "Opening balance date is required.");
    if (b.custodianContact && !/^\d{10}$/.test(String(b.custodianContact).replace(/\D/g, "").slice(-10))) {
      return fail(res, 400, "Enter a 10-digit contact number for the custodian.");
    }
    if (await CashAccount.exists({ name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i") })) {
      return fail(res, 409, "A cash account with this name already exists.");
    }
    const createdBy = actorName(req);
    const cash = await CashAccount.create({
      name,
      type: CASH_TYPES.includes(b.type) ? b.type : "petty",
      office: b.office ? String(b.office).trim() : undefined,
      custodianName,
      custodianContact: b.custodianContact ? String(b.custodianContact).trim() : undefined,
      openingBalancePaise,
      openingDate,
      status: "active",
      notes: b.notes ? String(b.notes).slice(0, 1000) : undefined,
      createdBy,
    });
    const code = await ensureCashLedgerAccount(cash._id);
    await postOpeningBalance({ kind: "cash", accountId: cash._id, amountPaise: openingBalancePaise, date: openingDate, createdBy });
    await logAudit({
      req,
      action: "finance.cash_account:edit",
      resourceType: "cash_account",
      resourceId: cash._id.toString(),
      after: { name, custodianName, openingBalancePaise, ledgerAccountCode: code },
      reason: `Cash account ${name} added`,
    });
    const fresh = await CashAccount.findById(cash._id);
    res.status(201).json({ success: true, data: { ...fresh!.toObject(), balancePaise: await ledgerBalance(code) } });
  } catch (error) {
    serverError(res, "createCashAccount", error);
  }
}

export async function updateCashAccount(req: Request, res: Response): Promise<void> {
  try {
    const cash = await CashAccount.findById(req.params.id);
    if (!cash) return fail(res, 404, "Cash account not found.");
    const b = req.body || {};
    const before = cash.toObject();
    const createdBy = actorName(req);

    if (b.name !== undefined && String(b.name).trim()) cash.name = String(b.name).trim();
    if (CASH_TYPES.includes(b.type)) cash.type = b.type;
    if (b.office !== undefined) cash.office = String(b.office).trim();
    if (b.custodianName !== undefined && String(b.custodianName).trim()) cash.custodianName = String(b.custodianName).trim();
    if (b.custodianContact !== undefined) cash.custodianContact = String(b.custodianContact).trim();
    if (b.notes !== undefined) cash.notes = String(b.notes).slice(0, 1000);
    if (["active", "inactive", "closed"].includes(b.status)) {
      if (b.status === "closed") {
        const code = await ensureCashLedgerAccount(cash._id);
        if ((await ledgerBalance(code)) !== 0) return fail(res, 400, "Hand over or deposit the remaining cash before closing.");
      }
      cash.status = b.status;
    }

    const newOpening = b.openingBalance !== undefined ? toPaise(b.openingBalance) : undefined;
    const newOpeningDate = b.openingDate !== undefined ? parseDate(b.openingDate) : undefined;
    if (newOpening === null) return fail(res, 400, "Opening balance must be zero or more.");
    const openingChanged =
      (newOpening !== undefined && newOpening !== cash.openingBalancePaise) ||
      (newOpeningDate && newOpeningDate.getTime() !== cash.openingDate.getTime());
    if (openingChanged) {
      if (!String(b.reason || "").trim()) return fail(res, 400, "Give a reason for correcting the opening balance.");
      await correctOpeningBalance("cash", cash._id, newOpening ?? cash.openingBalancePaise, newOpeningDate || cash.openingDate, createdBy, String(b.reason));
      cash.openingBalancePaise = newOpening ?? cash.openingBalancePaise;
      if (newOpeningDate) cash.openingDate = newOpeningDate;
    }

    await cash.save();
    await logAudit({
      req,
      action: "finance.cash_account:edit",
      resourceType: "cash_account",
      resourceId: cash._id.toString(),
      before,
      after: cash.toObject(),
      severity: openingChanged ? "high" : "info",
      reason: openingChanged ? `Opening balance corrected: ${b.reason}` : "Cash account details updated",
    });
    const code = await ensureCashLedgerAccount(cash._id);
    res.json({ success: true, data: { ...cash.toObject(), balancePaise: await ledgerBalance(code) } });
  } catch (error) {
    serverError(res, "updateCashAccount", error);
  }
}

// ============================================================================
// Transfers between ISLAH's own accounts
// ============================================================================

const TRANSFER_KINDS: Record<TransferType, [AccountKind, AccountKind]> = {
  withdrawal: ["bank", "cash"],
  deposit: ["cash", "bank"],
  bank_transfer: ["bank", "bank"],
  cash_transfer: ["cash", "cash"],
};

async function findAccount(kind: AccountKind, id: unknown) {
  if (!id || !Types.ObjectId.isValid(String(id))) return null;
  return kind === "bank" ? BankAccount.findById(String(id)) : CashAccount.findById(String(id));
}

const accountLabel = (kind: AccountKind, a: any) =>
  kind === "bank" ? `${a.bankName} ${a.accountNumberMasked}` : `Cash — ${a.name}`;

async function balanceOf(kind: AccountKind, id: Types.ObjectId) {
  const code = kind === "bank" ? await ensureBankLedgerAccount(id) : await ensureCashLedgerAccount(id);
  return ledgerBalance(code);
}

export async function listTransfers(req: Request, res: Response): Promise<void> {
  try {
    const filter: Record<string, unknown> = {};
    if (req.query.status && ["pending", "approved", "rejected"].includes(String(req.query.status))) filter.status = req.query.status;
    if (req.query.type && Object.keys(TRANSFER_KINDS).includes(String(req.query.type))) filter.type = req.query.type;
    const transfers = await AccountTransfer.find(filter).sort({ date: -1, createdAt: -1 }).limit(500).lean();
    const bankIds = new Set<string>();
    const cashIds = new Set<string>();
    for (const t of transfers) {
      (t.fromKind === "bank" ? bankIds : cashIds).add(String(t.fromId));
      (t.toKind === "bank" ? bankIds : cashIds).add(String(t.toId));
    }
    const [banks, cashes] = await Promise.all([
      BankAccount.find({ _id: { $in: [...bankIds] } }).lean(),
      CashAccount.find({ _id: { $in: [...cashIds] } }).lean(),
    ]);
    const names = new Map<string, string>([
      ...banks.map((b) => [String(b._id), accountLabel("bank", b)] as [string, string]),
      ...cashes.map((c) => [String(c._id), accountLabel("cash", c)] as [string, string]),
    ]);
    res.json({
      success: true,
      data: transfers.map((t) => ({ ...t, fromName: names.get(String(t.fromId)) || "—", toName: names.get(String(t.toId)) || "—" })),
    });
  } catch (error) {
    serverError(res, "listTransfers", error);
  }
}

export async function createTransfer(req: Request, res: Response): Promise<void> {
  try {
    const b = req.body || {};
    const type = b.type as TransferType;
    if (!TRANSFER_KINDS[type]) return fail(res, 400, "Choose a transfer type.");
    const [fromKind, toKind] = TRANSFER_KINDS[type];
    const amountPaise = toPaise(b.amount);
    const date = parseDate(b.date);
    const purpose = String(b.purpose || "").trim();
    if (!amountPaise) return fail(res, 400, "Enter an amount greater than zero.");
    if (!date) return fail(res, 400, "Transfer date is required.");
    if (date.getTime() > Date.now() + 24 * 3600 * 1000) return fail(res, 400, "Transfer date cannot be in the future.");
    if (!purpose) return fail(res, 400, "State the purpose of this transfer.");
    if (String(b.fromId) === String(b.toId)) return fail(res, 400, "Source and destination must be different accounts.");

    const [from, to] = await Promise.all([findAccount(fromKind, b.fromId), findAccount(toKind, b.toId)]);
    if (!from) return fail(res, 400, `Choose the ${fromKind} account the money leaves.`);
    if (!to) return fail(res, 400, `Choose the ${toKind} account the money goes to.`);
    if (["inactive", "closed"].includes((from as any).status) || ["inactive", "closed"].includes((to as any).status)) {
      return fail(res, 400, "Both accounts must be active.");
    }
    if ((type === "withdrawal" || type === "cash_transfer") && !String(b.receivedBy || "").trim()) {
      return fail(res, 400, "Name the person who received the cash.");
    }
    if (fromKind === "cash" && (await balanceOf("cash", from._id as Types.ObjectId)) < amountPaise) {
      return fail(res, 400, `Not enough cash in ${accountLabel("cash", from)}.`);
    }

    const fy = financialYearOf(date);
    const seq = await getNextSequence(`transfer_${fy}`);
    const submittedBy = actorName(req);
    const transfer = await AccountTransfer.create({
      transferNo: `TRF-${fy}-${String(seq).padStart(5, "0")}`,
      type,
      date,
      fromKind,
      fromId: from._id,
      toKind,
      toId: to._id,
      amountPaise,
      reference: b.reference ? String(b.reference).trim() : undefined,
      purpose: purpose.slice(0, 500),
      fundType: b.fundType === "restricted" ? "restricted" : "general",
      receivedBy: b.receivedBy ? String(b.receivedBy).trim() : undefined,
      office: b.office ? String(b.office).trim() : undefined,
      documentUrl: b.documentUrl ? String(b.documentUrl).trim() : undefined,
      status: "pending",
      submittedBy,
    });
    await logAudit({
      req,
      action: "finance.transfer:create",
      resourceType: "account_transfer",
      resourceId: transfer._id.toString(),
      after: { transferNo: transfer.transferNo, type, amountPaise, from: accountLabel(fromKind, from), to: accountLabel(toKind, to) },
      reason: `${transfer.transferNo} submitted for approval`,
    });
    res.status(201).json({ success: true, data: transfer, message: `${transfer.transferNo} submitted for approval.` });
  } catch (error) {
    serverError(res, "createTransfer", error);
  }
}

export async function approveTransfer(req: Request, res: Response): Promise<void> {
  try {
    const transfer = await AccountTransfer.findById(req.params.id);
    if (!transfer) return fail(res, 404, "Transfer not found.");
    if (transfer.status !== "pending") return fail(res, 409, `${transfer.transferNo} is already ${transfer.status}.`);
    const actor = getActor(req);
    const sod = checkSeparationOfDuties("approve", actor, { createdBy: transfer.submittedBy, id: transfer._id.toString() }, req.body?.breakGlassReason);
    if (!sod.allowed) return fail(res, 403, sod.reason || "The person who entered a transfer cannot approve it.");
    if (transfer.fromKind === "cash" && (await balanceOf("cash", transfer.fromId)) < transfer.amountPaise) {
      return fail(res, 400, "The source cash account no longer has enough balance.");
    }

    // Claim the transfer first so two approvers cannot post it twice.
    const claimed = await AccountTransfer.findOneAndUpdate(
      { _id: transfer._id, status: "pending" },
      { $set: { status: "approved", approvedBy: actor.name || actor.email, approvedAt: new Date() } },
      { returnDocument: "after" }
    );
    if (!claimed) return fail(res, 409, "This transfer was just processed by someone else.");
    try {
      const journal = await postTransfer(claimed, actor.name || actor.email);
      claimed.journalId = journal._id as Types.ObjectId;
      await claimed.save();
    } catch (err) {
      await AccountTransfer.updateOne({ _id: claimed._id }, { $set: { status: "pending" }, $unset: { approvedBy: 1, approvedAt: 1 } });
      throw err;
    }
    await logAudit({
      req,
      action: "finance.transfer:approve",
      resourceType: "account_transfer",
      resourceId: claimed._id.toString(),
      severity: "high",
      reason: `${claimed.transferNo} approved and posted`,
    });
    res.json({ success: true, data: claimed, message: `${claimed.transferNo} approved and posted.` });
  } catch (error) {
    serverError(res, "approveTransfer", error);
  }
}

export async function rejectTransfer(req: Request, res: Response): Promise<void> {
  try {
    const reason = String(req.body?.reason || "").trim();
    if (!reason) return fail(res, 400, "Give a reason for rejecting this transfer.");
    const actor = getActor(req);
    const transfer = await AccountTransfer.findOneAndUpdate(
      { _id: req.params.id, status: "pending" },
      { $set: { status: "rejected", approvedBy: actor.name || actor.email, approvedAt: new Date(), rejectionReason: reason } },
      { returnDocument: "after" }
    );
    if (!transfer) return fail(res, 409, "Only pending transfers can be rejected.");
    await logAudit({
      req,
      action: "finance.transfer:approve",
      resourceType: "account_transfer",
      resourceId: transfer._id.toString(),
      reason: `${transfer.transferNo} rejected: ${reason}`,
    });
    res.json({ success: true, data: transfer });
  } catch (error) {
    serverError(res, "rejectTransfer", error);
  }
}

// ============================================================================
// Gateway settlements (Razorpay → bank)
// ============================================================================

export async function createSettlement(req: Request, res: Response): Promise<void> {
  try {
    const b = req.body || {};
    const utr = String(b.utr || "").trim();
    const date = parseDate(b.date);
    const grossPaise = toPaise(b.grossAmount);
    const feePaise = toPaise(b.fee ?? 0);
    const taxPaise = toPaise(b.tax ?? 0);
    if (!utr) return fail(res, 400, "Enter the settlement UTR / reference.");
    if (!date) return fail(res, 400, "Settlement date is required.");
    if (!grossPaise) return fail(res, 400, "Enter the gross settlement amount.");
    if (feePaise === null || taxPaise === null) return fail(res, 400, "Fee and GST must be zero or more.");
    if (feePaise + taxPaise > grossPaise) return fail(res, 400, "Fees cannot exceed the gross amount.");
    const bank = await findAccount("bank", b.bankAccountId);
    if (!bank) return fail(res, 400, "Choose the bank account the settlement was credited to.");
    if (await JournalEntry.exists({ idempotencyKey: `jv_stl_${utr.toUpperCase()}` })) {
      return fail(res, 409, `Settlement ${utr} is already recorded.`);
    }
    const clearing = await ledgerBalance(ACC.GATEWAY_CLEARING);
    const createdBy = actorName(req);
    const journal = await postGatewaySettlement({
      bankAccountId: bank._id as Types.ObjectId,
      date,
      grossPaise,
      feePaise,
      taxPaise,
      utr,
      createdBy,
    });
    await logAudit({
      req,
      action: "finance.settlement:create",
      resourceType: "settlement",
      resourceId: journal._id.toString(),
      after: { utr, grossPaise, feePaise, taxPaise, bank: accountLabel("bank", bank) },
      reason: `Razorpay settlement ${utr} recorded`,
    });
    res.status(201).json({
      success: true,
      data: journal,
      warning:
        grossPaise > clearing
          ? "This settlement is larger than the online receipts waiting to settle. Check for gateway payments not yet recorded."
          : undefined,
    });
  } catch (error) {
    serverError(res, "createSettlement", error);
  }
}

export async function listSettlements(_req: Request, res: Response): Promise<void> {
  try {
    const data = await JournalEntry.find({ sourceType: "settlement" }).sort({ date: -1 }).limit(200).lean();
    res.json({ success: true, data, clearingBalancePaise: await ledgerBalance(ACC.GATEWAY_CLEARING) });
  } catch (error) {
    serverError(res, "listSettlements", error);
  }
}

// ============================================================================
// Journals, chart of accounts, trial balance
// ============================================================================

export async function listJournals(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 50));
    const filter: Record<string, unknown> = {};
    if (req.query.fy) filter.fy = String(req.query.fy);
    if (req.query.sourceType) filter.sourceType = String(req.query.sourceType);
    if (req.query.accountCode) filter["lines.accountCode"] = String(req.query.accountCode);
    if (req.query.search) {
      const q = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [{ journalNo: new RegExp(q, "i") }, { sourceRef: new RegExp(q, "i") }, { narration: new RegExp(q, "i") }];
    }
    const from = parseDate(req.query.from);
    const to = parseDate(req.query.to);
    if (from || to) filter.date = { ...(from ? { $gte: from } : {}), ...(to ? { $lte: to } : {}) };
    const [data, total] = await Promise.all([
      JournalEntry.find(filter).sort({ date: -1, postedAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      JournalEntry.countDocuments(filter),
    ]);
    res.json({ success: true, data, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    serverError(res, "listJournals", error);
  }
}

export async function listChartOfAccounts(_req: Request, res: Response): Promise<void> {
  try {
    await ensureChartOfAccounts();
    const [accounts, movements] = await Promise.all([ChartOfAccount.find().sort({ code: 1 }).lean(), accountMovements()]);
    res.json({
      success: true,
      data: accounts.map((a) => {
        const m = movements.get(a.code);
        return { ...a, balancePaise: m ? m.debitPaise - m.creditPaise : 0 };
      }),
    });
  } catch (error) {
    serverError(res, "listChartOfAccounts", error);
  }
}

export async function getTrialBalance(req: Request, res: Response): Promise<void> {
  try {
    const until = parseDate(req.query.until) || undefined;
    res.json({ success: true, data: await trialBalance({ fy: req.query.fy ? String(req.query.fy) : undefined, until }) });
  } catch (error) {
    serverError(res, "getTrialBalance", error);
  }
}

// ============================================================================
// Centralised overview (blueprint §1 cards)
// ============================================================================

export async function getAccountsOverview(req: Request, res: Response): Promise<void> {
  try {
    await ensureChartOfAccounts();
    const fy = req.query.fy ? String(req.query.fy) : financialYearOf(new Date());
    const [all, fyMoves, accounts, banks, cashes] = await Promise.all([
      accountMovements(),
      accountMovements({ fy }),
      ChartOfAccount.find({ isHeader: false }).lean(),
      BankAccount.find({ status: NOT_CLOSED }).lean(),
      CashAccount.find({ status: NOT_CLOSED }).lean(),
    ]);
    const bal = (code: string, src = all) => {
      const m = src.get(code);
      return m ? m.debitPaise - m.creditPaise : 0;
    };
    const sumGroup = (pred: (a: (typeof accounts)[number]) => boolean, src = all) =>
      accounts.filter(pred).reduce((s, a) => s + bal(a.code, src), 0);

    const totalBankPaise = sumGroup((a) => a.category === "bank");
    const totalCashPaise = sumGroup((a) => a.category === "cash");
    const fyIncomePaise = -sumGroup((a) => a.group === "income", fyMoves);
    const fyExpenditurePaise = sumGroup((a) => a.group === "expense", fyMoves);
    const fyCapitalPaise = sumGroup((a) => a.category === "fixed_asset", fyMoves);

    // Restricted money still unspent: restricted income less restricted spending.
    const restrictedRows = await JournalEntry.aggregate([
      { $unwind: "$lines" },
      { $match: { "lines.fundType": "restricted" } },
      { $group: { _id: "$lines.accountCode", d: { $sum: "$lines.debitPaise" }, c: { $sum: "$lines.creditPaise" } } },
    ]);
    const groupOf = new Map(accounts.map((a) => [a.code, a.group]));
    let restrictedFundsPaise = 0;
    for (const r of restrictedRows) {
      const g = groupOf.get(r._id);
      if (g === "income") restrictedFundsPaise += r.c - r.d;
      if (g === "expense") restrictedFundsPaise -= r.d - r.c;
    }

    const [commitments, pendingExpenseApprovals, pendingTransfers, unreconciledLines] = await Promise.all([
      Expense.aggregate([
        { $match: { status: "approved", "payment.status": { $ne: "paid" } } },
        { $group: { _id: null, total: { $sum: "$amountPaise" }, count: { $sum: 1 } } },
      ]),
      Expense.countDocuments({ status: "submitted" }),
      AccountTransfer.countDocuments({ status: "pending" }),
      BankStatementLine.countDocuments({ matchStatus: "unmatched" }),
    ]);

    res.json({
      success: true,
      data: {
        fy,
        totalBankPaise,
        totalCashPaise,
        totalFundsAvailablePaise: totalBankPaise + totalCashPaise,
        gatewayClearingPaise: bal(ACC.GATEWAY_CLEARING),
        pendingMappingPaise: bal(ACC.SUSPENSE),
        fyIncomePaise,
        fyExpenditurePaise,
        fyCapitalPaise,
        restrictedFundsPaise,
        outstandingCommitmentsPaise: commitments[0]?.total || 0,
        outstandingCommitmentsCount: commitments[0]?.count || 0,
        pendingApprovals: { expenses: pendingExpenseApprovals, transfers: pendingTransfers },
        unreconciledStatementLines: unreconciledLines,
        bankAccounts: banks.map((b) => ({
          _id: b._id,
          bankName: b.bankName,
          accountNumberMasked: b.accountNumberMasked,
          isPrimary: b.isPrimary,
          balancePaise: b.ledgerAccountCode ? bal(b.ledgerAccountCode) : 0,
        })),
        cashAccounts: cashes.map((c) => ({
          _id: c._id,
          name: c.name,
          custodianName: c.custodianName,
          balancePaise: c.ledgerAccountCode ? bal(c.ledgerAccountCode) : 0,
        })),
      },
    });
  } catch (error) {
    serverError(res, "getAccountsOverview", error);
  }
}
