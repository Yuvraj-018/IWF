import { Types } from "mongoose";
import { ChartOfAccount, DEBIT_NORMAL_GROUPS, type AccountGroup } from "../models/ChartOfAccount.js";
import { JournalEntry, type IJournalLine, type JournalSourceType } from "../models/JournalEntry.js";
import { BankAccount } from "../models/BankAccount.js";
import { CashAccount } from "../models/CashAccount.js";
import { getNextSequence } from "../models/Counter.js";
import { istYearMonth } from "../utils/dateUtils.js";

/**
 * Double-entry accounting core (Finance blueprint §11).
 *
 * Basis: cash basis — income is recorded when money is received (or confirmed by
 * the payment gateway) and expenses when they are paid. Approved-but-unpaid
 * expenses are reported separately as commitments, never as expenditure.
 *
 * Every posting is idempotent (idempotencyKey) so retries, webhooks and backfills
 * can never double-count, and every journal must balance before it is saved.
 */

// ============================================================================
// Chart of Accounts
// ============================================================================

export const ACC = {
  BANK_HEADER: "1100",
  CASH_HEADER: "1200",
  GATEWAY_CLEARING: "1300",
  FIXED_ASSETS: "1400",
  CAPITAL_EXPENDITURE: "1410",
  EQUIPMENT_ASSETS: "1420",
  OTHER_CAPITAL_ASSETS: "1430",
  SUSPENSE: "1900",
  OUTSTANDING_EXPENSES: "2100",
  REFUNDS_PAYABLE: "2200",
  OTHER_PAYABLES: "2900",
  GENERAL_FUND: "3100",
  RESTRICTED_FUNDS: "3200",
  OPENING_BALANCE_EQUITY: "3900",
  DONATION_INDIVIDUAL: "4101",
  DONATION_ORGANISATION: "4102",
  GRANTS: "4201",
  SPONSORSHIP_INDIVIDUAL: "4301",
  SPONSORSHIP_ORGANISATION: "4302",
  MEMBERSHIP_INDIVIDUAL: "4401",
  MEMBERSHIP_ORGANISATION: "4402",
  PROGRAMME_INCOME: "4501",
  INTEREST_INCOME: "4601",
  OTHER_INCOME: "4901",
  BANK_GATEWAY_CHARGES: "6107",
  OTHER_AUTHORISED_EXPENSES: "6108",
  ADMINISTRATIVE: "6101",
} as const;

export const WORK_AREAS: { code: string; name: string }[] = [
  { code: "EDU", name: "Education & Learning" },
  { code: "HLT", name: "Healthcare & Well-being" },
  { code: "WYE", name: "Women & Youth Empowerment" },
  { code: "SLE", name: "Skills, Livelihoods & Entrepreneurship" },
  { code: "SJL", name: "Social Justice & Legal Empowerment" },
  { code: "AGR", name: "Agriculture & Rural Livelihoods" },
  { code: "ENV", name: "Environment & Sustainable Development" },
  { code: "HRR", name: "Humanitarian Relief & Rehabilitation" },
];

/** Blueprint Level 2 (organisational) and Level 3 (capital) heads → ledger codes. */
export const ORGANISATIONAL_HEADS: { short: string; code: string; name: string; group: AccountGroup }[] = [
  { short: "ADE", code: "6101", name: "Administrative Expenses", group: "expense" },
  { short: "SHR", code: "6102", name: "Staff & Human Resource Expenses", group: "expense" },
  { short: "ORU", code: "6103", name: "Office Rent & Utilities", group: "expense" },
  { short: "TTE", code: "6104", name: "Travel & Transportation Expenses", group: "expense" },
  { short: "CTE", code: "6105", name: "Communication & Technology Expenses", group: "expense" },
  { short: "PCF", code: "6106", name: "Professional & Consultancy Fees", group: "expense" },
  { short: "BGC", code: "6107", name: "Bank & Payment Gateway Charges", group: "expense" },
  { short: "OAE", code: "6108", name: "Other Authorised Expenses", group: "expense" },
  { short: "CPE", code: "1410", name: "Capital Expenditure", group: "asset" },
  { short: "EQA", code: "1420", name: "Equipment & Assets", group: "asset" },
  { short: "OCA", code: "1430", name: "Other Capital Assets", group: "asset" },
];

const programmeCode = (workArea: string) => {
  const i = WORK_AREAS.findIndex((w) => w.code === workArea);
  return i >= 0 ? `51${String(i + 1).padStart(2, "0")}` : ACC.OTHER_AUTHORISED_EXPENSES;
};

interface SeedAccount {
  code: string;
  name: string;
  group: AccountGroup;
  category: string;
  isHeader?: boolean;
  parentCode?: string;
  shortCode?: string;
  workAreaId?: string;
  description?: string;
}

const SYSTEM_ACCOUNTS: SeedAccount[] = [
  { code: "1000", name: "Assets", group: "asset", category: "header", isHeader: true },
  { code: ACC.BANK_HEADER, name: "Bank Accounts", group: "asset", category: "bank", isHeader: true, parentCode: "1000" },
  { code: ACC.CASH_HEADER, name: "Cash-in-Hand", group: "asset", category: "cash", isHeader: true, parentCode: "1000" },
  {
    code: ACC.GATEWAY_CLEARING,
    name: "Payment Gateway Clearing (Razorpay)",
    group: "asset",
    category: "clearing",
    parentCode: "1000",
    description: "Payments confirmed by the gateway but not yet settled into a bank account.",
  },
  { code: ACC.FIXED_ASSETS, name: "Fixed Assets", group: "asset", category: "fixed_asset", isHeader: true, parentCode: "1000" },
  {
    code: ACC.SUSPENSE,
    name: "Receipts / Payments Pending Account Mapping",
    group: "asset",
    category: "suspense",
    parentCode: "1000",
    description: "Temporary account for older records with no bank or cash account recorded. Must be cleared by reclassification.",
  },
  { code: "2000", name: "Liabilities", group: "liability", category: "header", isHeader: true },
  { code: ACC.OUTSTANDING_EXPENSES, name: "Outstanding Expenses", group: "liability", category: "payable", parentCode: "2000" },
  { code: ACC.REFUNDS_PAYABLE, name: "Donor Refunds Payable", group: "liability", category: "payable", parentCode: "2000" },
  { code: ACC.OTHER_PAYABLES, name: "Other Payables", group: "liability", category: "payable", parentCode: "2000" },
  { code: "3000", name: "Funds & Equity", group: "fund", category: "header", isHeader: true },
  { code: ACC.GENERAL_FUND, name: "General Fund", group: "fund", category: "fund", parentCode: "3000" },
  { code: ACC.RESTRICTED_FUNDS, name: "Restricted Funds", group: "fund", category: "fund", parentCode: "3000" },
  { code: ACC.OPENING_BALANCE_EQUITY, name: "Opening Balances", group: "fund", category: "opening", parentCode: "3000" },
  { code: "4000", name: "Income", group: "income", category: "header", isHeader: true },
  { code: ACC.DONATION_INDIVIDUAL, name: "Individual Donations", group: "income", category: "donation", parentCode: "4000" },
  { code: ACC.DONATION_ORGANISATION, name: "Organisational Donations", group: "income", category: "donation", parentCode: "4000" },
  { code: ACC.GRANTS, name: "Grants & Institutional Funding", group: "income", category: "grant", parentCode: "4000" },
  { code: ACC.SPONSORSHIP_INDIVIDUAL, name: "Individual Sponsorships", group: "income", category: "sponsorship", parentCode: "4000" },
  { code: ACC.SPONSORSHIP_ORGANISATION, name: "Organisational Sponsorships", group: "income", category: "sponsorship", parentCode: "4000" },
  { code: ACC.MEMBERSHIP_INDIVIDUAL, name: "Individual Membership Fees", group: "income", category: "membership", parentCode: "4000" },
  { code: ACC.MEMBERSHIP_ORGANISATION, name: "Organisational Membership Fees", group: "income", category: "membership", parentCode: "4000" },
  { code: ACC.PROGRAMME_INCOME, name: "Programme-related Income", group: "income", category: "programme", parentCode: "4000" },
  { code: ACC.INTEREST_INCOME, name: "Interest Income", group: "income", category: "interest", parentCode: "4000" },
  { code: ACC.OTHER_INCOME, name: "Other Authorised Income", group: "income", category: "other", parentCode: "4000" },
  { code: "5000", name: "Programme & Initiative Expenses", group: "expense", category: "header", isHeader: true },
  ...WORK_AREAS.map((w) => ({
    code: programmeCode(w.code),
    name: `${w.name} — Programme Expenses`,
    group: "expense" as const,
    category: "programme",
    parentCode: "5000",
    shortCode: w.code,
    workAreaId: w.code,
  })),
  { code: "6000", name: "Organisational Expenses", group: "expense", category: "header", isHeader: true },
  ...ORGANISATIONAL_HEADS.map((h) => ({
    code: h.code,
    name: h.name,
    group: h.group,
    category: h.group === "asset" ? "fixed_asset" : "organisational",
    parentCode: h.group === "asset" ? ACC.FIXED_ASSETS : "6000",
    shortCode: h.short,
  })),
];

let chartReady: Promise<void> | null = null;

/** Seeds the system accounts once per process (upsert, safe to repeat). */
export function ensureChartOfAccounts(): Promise<void> {
  if (!chartReady) {
    chartReady = (async () => {
      for (const a of SYSTEM_ACCOUNTS) {
        await ChartOfAccount.updateOne(
          { code: a.code },
          { $setOnInsert: { ...a, isSystem: true, isActive: true, isHeader: Boolean(a.isHeader) } },
          { upsert: true }
        );
      }
    })().catch((err) => {
      chartReady = null;
      throw err;
    });
  }
  return chartReady;
}

async function nextChildCode(parent: string): Promise<string> {
  const last = await ChartOfAccount.find({ parentCode: parent, isHeader: false }).sort({ code: -1 }).limit(1);
  const base = Number(parent);
  const n = last.length ? Number(last[0].code) + 1 : base + 1;
  if (n >= base + 100) throw new Error(`No free ledger codes under ${parent}.`);
  return String(n);
}

/** Gives a bank account its own ledger account (1101, 1102 …) if it has none. */
export async function ensureBankLedgerAccount(bankAccountId: Types.ObjectId | string): Promise<string> {
  await ensureChartOfAccounts();
  const bank = await BankAccount.findById(bankAccountId);
  if (!bank) throw new Error("Bank account not found.");
  if (bank.ledgerAccountCode) return bank.ledgerAccountCode;
  const code = await nextChildCode(ACC.BANK_HEADER);
  await ChartOfAccount.create({
    code,
    name: `${bank.bankName} ${bank.accountNumberMasked}`,
    group: "asset",
    category: "bank",
    parentCode: ACC.BANK_HEADER,
    bankAccountId: bank._id,
    isSystem: true,
  });
  bank.ledgerAccountCode = code;
  await bank.save();
  return code;
}

/** Gives a cash account its own ledger account (1201, 1202 …) if it has none. */
export async function ensureCashLedgerAccount(cashAccountId: Types.ObjectId | string): Promise<string> {
  await ensureChartOfAccounts();
  const cash = await CashAccount.findById(cashAccountId);
  if (!cash) throw new Error("Cash account not found.");
  if (cash.ledgerAccountCode) return cash.ledgerAccountCode;
  const code = await nextChildCode(ACC.CASH_HEADER);
  await ChartOfAccount.create({
    code,
    name: `Cash — ${cash.name}`,
    group: "asset",
    category: "cash",
    parentCode: ACC.CASH_HEADER,
    cashAccountId: cash._id,
    isSystem: true,
  });
  cash.ledgerAccountCode = code;
  await cash.save();
  return code;
}

// ============================================================================
// Posting
// ============================================================================

/** Indian financial year (1 April – 31 March), read in IST. */
export function financialYearOf(date: Date): string {
  const { year, month } = istYearMonth(date);
  const start = month >= 3 ? year : year - 1;
  return `${start}-${String(start + 1).slice(-2)}`;
}

function monthOf(date: Date): string {
  const { year, month } = istYearMonth(date);
  return `${year}-${String(month + 1).padStart(2, "0")}`;
}

export interface PostLine {
  accountCode: string;
  debitPaise?: number;
  creditPaise?: number;
  workAreaId?: string;
  initiativeId?: string;
  fundType?: "general" | "restricted";
  memo?: string;
}

export interface PostJournalParams {
  date: Date;
  narration: string;
  sourceType: JournalSourceType;
  sourceId?: Types.ObjectId | string;
  sourceRef?: string;
  idempotencyKey: string;
  lines: PostLine[];
  createdBy: string;
  reversalOf?: Types.ObjectId;
}

/**
 * Posts one balanced journal. Returns the existing journal when the same
 * idempotencyKey was already posted. Refreshes cached balances of any bank or
 * cash account the journal touches.
 */
export async function postJournal(p: PostJournalParams) {
  await ensureChartOfAccounts();
  const existing = await JournalEntry.findOne({ idempotencyKey: p.idempotencyKey });
  if (existing) return existing;

  const codes = [...new Set(p.lines.map((l) => l.accountCode))];
  const accounts = await ChartOfAccount.find({ code: { $in: codes } });
  const byCode = new Map(accounts.map((a) => [a.code, a]));
  const lines: IJournalLine[] = p.lines
    .filter((l) => (l.debitPaise || 0) > 0 || (l.creditPaise || 0) > 0)
    .map((l) => {
      const acc = byCode.get(l.accountCode);
      if (!acc) throw new Error(`Unknown ledger account ${l.accountCode}.`);
      if (acc.isHeader) throw new Error(`Cannot post to header account ${acc.code} ${acc.name}.`);
      return {
        accountCode: acc.code,
        accountName: acc.name,
        debitPaise: Math.round(l.debitPaise || 0),
        creditPaise: Math.round(l.creditPaise || 0),
        workAreaId: l.workAreaId,
        initiativeId: l.initiativeId,
        fundType: l.fundType || "general",
        bankAccountId: acc.bankAccountId,
        cashAccountId: acc.cashAccountId,
        memo: l.memo,
      };
    });

  const seq = await getNextSequence(`journal_${financialYearOf(p.date)}`);
  const journalNo = `JV-${financialYearOf(p.date)}-${String(seq).padStart(5, "0")}`;
  let journal;
  try {
    journal = await JournalEntry.create({
      journalNo,
      date: p.date,
      postedAt: new Date(),
      fy: financialYearOf(p.date),
      month: monthOf(p.date),
      narration: p.narration.slice(0, 500),
      sourceType: p.sourceType,
      sourceId: p.sourceId,
      sourceRef: p.sourceRef,
      lines,
      totalPaise: 1, // recomputed by the balance validator
      idempotencyKey: p.idempotencyKey,
      createdBy: p.createdBy,
      reversalOf: p.reversalOf,
    });
  } catch (err: any) {
    // Two posts raced on the same key: return the winner.
    if (err?.code === 11000) {
      const winner = await JournalEntry.findOne({ idempotencyKey: p.idempotencyKey });
      if (winner) return winner;
    }
    throw err;
  }
  await refreshCachedBalances(lines);
  return journal;
}

/** Posts the mirror image of a journal and marks the original as reversed. */
export async function reverseJournal(idempotencyKeyOfOriginal: string, reason: string, createdBy: string, date = new Date()) {
  const original = await JournalEntry.findOne({ idempotencyKey: idempotencyKeyOfOriginal });
  if (!original) return null;
  if (original.status === "reversed") return original;
  const reversal = await postJournal({
    date,
    narration: `Reversal of ${original.journalNo}: ${reason}`,
    sourceType: "reversal",
    sourceId: original.sourceId,
    sourceRef: original.sourceRef,
    idempotencyKey: `rev_${original.idempotencyKey}`,
    createdBy,
    reversalOf: original._id as Types.ObjectId,
    lines: original.lines.map((l) => ({
      accountCode: l.accountCode,
      debitPaise: l.creditPaise,
      creditPaise: l.debitPaise,
      workAreaId: l.workAreaId,
      initiativeId: l.initiativeId,
      fundType: l.fundType,
    })),
  });
  original.status = "reversed";
  original.reversedBy = reversal._id as Types.ObjectId;
  await original.save();
  return reversal;
}

// ============================================================================
// Balances
// ============================================================================

/** Debit − credit per account code, optionally up to a date. */
export async function accountMovements(match: Record<string, unknown> = {}, until?: Date) {
  const rows = await JournalEntry.aggregate([
    { $match: { ...(until ? { date: { $lte: until } } : {}), ...match } },
    { $unwind: "$lines" },
    {
      $group: {
        _id: "$lines.accountCode",
        debitPaise: { $sum: "$lines.debitPaise" },
        creditPaise: { $sum: "$lines.creditPaise" },
      },
    },
  ]);
  return new Map<string, { debitPaise: number; creditPaise: number }>(
    rows.map((r) => [r._id, { debitPaise: r.debitPaise, creditPaise: r.creditPaise }])
  );
}

export async function ledgerBalance(code: string, until?: Date): Promise<number> {
  const m = (await accountMovements({ "lines.accountCode": code }, until)).get(code);
  return m ? m.debitPaise - m.creditPaise : 0;
}

async function refreshCachedBalances(lines: IJournalLine[]) {
  for (const l of lines) {
    if (l.bankAccountId) {
      await BankAccount.updateOne({ _id: l.bankAccountId }, { $set: { currentBalancePaise: await ledgerBalance(l.accountCode) } });
    }
    if (l.cashAccountId) {
      await CashAccount.updateOne({ _id: l.cashAccountId }, { $set: { currentBalancePaise: await ledgerBalance(l.accountCode) } });
    }
  }
}

/** Trial balance: every non-header account with its closing balance on its normal side. */
export async function trialBalance(params: { fy?: string; until?: Date } = {}) {
  await ensureChartOfAccounts();
  const match: Record<string, unknown> = params.fy ? { fy: params.fy } : {};
  const movements = await accountMovements(match, params.until);
  const accounts = await ChartOfAccount.find({ isHeader: false }).sort({ code: 1 });
  let totalDebit = 0;
  let totalCredit = 0;
  const rows = accounts
    .map((a) => {
      const m = movements.get(a.code) || { debitPaise: 0, creditPaise: 0 };
      const net = m.debitPaise - m.creditPaise;
      const debitBalance = net > 0 ? net : 0;
      const creditBalance = net < 0 ? -net : 0;
      totalDebit += debitBalance;
      totalCredit += creditBalance;
      return {
        code: a.code,
        name: a.name,
        group: a.group,
        category: a.category,
        normalSide: DEBIT_NORMAL_GROUPS.includes(a.group) ? "debit" : "credit",
        totalDebitPaise: m.debitPaise,
        totalCreditPaise: m.creditPaise,
        debitBalancePaise: debitBalance,
        creditBalancePaise: creditBalance,
      };
    })
    .filter((r) => r.totalDebitPaise || r.totalCreditPaise);
  return { rows, totalDebitPaise: totalDebit, totalCreditPaise: totalCredit, balanced: totalDebit === totalCredit };
}

// ============================================================================
// Posting rules for each source document
// ============================================================================

const toPaise = (rupees: number) => Math.round(Number(rupees || 0) * 100);

/** Gateway payments land in clearing first; offline ones in the account they were paid into. */
const isGatewayPayment = (d: any) => d?.paymentMode === "Online" || Boolean(d?.razorpayPaymentId);
const SYSTEM_ACTOR = "accounting_service";

/** Where money landed for a receipt: a bank/cash account, the gateway, or suspense. */
async function receivingAccount(opts: { bankAccountId?: any; cashAccountId?: any; online?: boolean }) {
  if (opts.bankAccountId) return ensureBankLedgerAccount(opts.bankAccountId);
  if (opts.cashAccountId) return ensureCashLedgerAccount(opts.cashAccountId);
  return opts.online ? ACC.GATEWAY_CLEARING : ACC.SUSPENSE;
}

/** Donation received → Dr gateway/bank/cash, Cr donation income. */
export async function postDonation(d: any, createdBy = SYSTEM_ACTOR) {
  // Refunded donations were still received first; the refund posts its own reversal.
  if (!d || !["Success", "Refunded", "Partially Refunded"].includes(d.paymentStatus) || !(d.amount > 0)) return null;
  const amount = toPaise(d.amount);
  const meta = d.metadata || {};
  const debitCode = await receivingAccount({
    bankAccountId: d.bankAccountId,
    cashAccountId: d.cashAccountId,
    online: isGatewayPayment(d),
  });
  // Gifts for a named patient or a specific programme are restricted to that purpose.
  const restricted =
    Boolean(d.patientSlug) ||
    meta.programmeChoice === "Select a Specific Programme" ||
    d.fundType === "restricted";
  const fundType = restricted ? "restricted" : "general";
  return postJournal({
    date: d.createdAt ? new Date(d.createdAt) : new Date(),
    narration: `Donation ${d.receiptNo} from ${d.donorName} — ${d.financialType || "General Donation"}`,
    sourceType: "donation",
    sourceId: d._id,
    sourceRef: d.receiptNo,
    idempotencyKey: `jv_don_${d._id}`,
    createdBy,
    lines: [
      { accountCode: debitCode, debitPaise: amount, fundType, workAreaId: d.workAreaId },
      {
        accountCode: d.donorType === "Corporate" ? ACC.DONATION_ORGANISATION : ACC.DONATION_INDIVIDUAL,
        creditPaise: amount,
        fundType,
        workAreaId: d.workAreaId,
        initiativeId: d.initiativeId,
        memo: d.patientSlug ? `Patient: ${d.patientSlug}` : undefined,
      },
    ],
  });
}

/** Membership fee received through the gateway → Dr gateway clearing, Cr membership fees. */
export async function postMembershipFee(p: {
  paymentId: string;
  amountRupees: number;
  memberNo: string;
  memberName: string;
  organisation: boolean;
  isRenewal: boolean;
  receiptNo?: string;
  date?: Date;
  createdBy?: string;
}) {
  const amount = toPaise(p.amountRupees);
  if (!(amount > 0)) return null;
  return postJournal({
    date: p.date || new Date(),
    narration: `${p.isRenewal ? "Membership renewal" : "Membership fee"} — ${p.memberName} (${p.memberNo})`,
    sourceType: "membership",
    sourceRef: p.receiptNo || p.memberNo,
    idempotencyKey: `jv_mem_${p.paymentId}`,
    createdBy: p.createdBy || SYSTEM_ACTOR,
    lines: [
      { accountCode: ACC.GATEWAY_CLEARING, debitPaise: amount },
      { accountCode: p.organisation ? ACC.MEMBERSHIP_ORGANISATION : ACC.MEMBERSHIP_INDIVIDUAL, creditPaise: amount },
    ],
  });
}

/**
 * Existing expense heads (seedFinanceTaxonomy, lowercase codes) and blueprint
 * short codes → ledger account. Heads that are programme spending (medical
 * support, relief, supplies …) are charged to the work area's programme account.
 */
const HEAD_TO_ACCOUNT: Record<string, string> = {
  administration: "6101",
  administrative_expenses: "6101",
  staff_expenses: "6102",
  office_rent_utilities: "6103",
  travel_logistics: "6104",
  communication_technology: "6105",
  professional_fees: "6106",
  bank_gateway_charges: "6107",
  other_authorised_expenses: "6108",
  capital_expenditure: "1410",
  capital_equipment: "1420",
  other_capital_assets: "1430",
};

/** Ledger account an expense voucher is charged to. */
export function expenseAccountFor(head: string | undefined, workAreaId: string | undefined): string {
  const raw = String(head || "").trim();
  const org = ORGANISATIONAL_HEADS.find((h) => h.short === raw.toUpperCase());
  if (org) return org.code;
  const mapped = HEAD_TO_ACCOUNT[raw.toLowerCase()];
  if (mapped) return mapped;
  if (workAreaId && WORK_AREAS.some((w) => w.code === workAreaId)) return programmeCode(workAreaId);
  return ACC.OTHER_AUTHORISED_EXPENSES;
}

/** Expense paid → Dr expense (or capital asset), Cr the bank/cash account it was paid from. */
export async function postExpensePayment(e: any, createdBy = SYSTEM_ACTOR) {
  if (!e || e.payment?.status !== "paid" || !(e.amountPaise > 0)) return null;
  const creditCode = e.payment?.bankAccountId
    ? await ensureBankLedgerAccount(e.payment.bankAccountId)
    : e.payment?.cashAccountId
      ? await ensureCashLedgerAccount(e.payment.cashAccountId)
      : ACC.SUSPENSE;
  return postJournal({
    date: e.payment?.date ? new Date(e.payment.date) : new Date(),
    narration: `Expense ${e.expenseNo} paid to ${e.payee?.name || "payee"} — ${e.description || e.head}`,
    sourceType: "expense",
    sourceId: e._id,
    sourceRef: e.expenseNo,
    idempotencyKey: `jv_exp_${e._id}`,
    createdBy,
    lines: [
      {
        accountCode: expenseAccountFor(e.head, e.workAreaId),
        debitPaise: e.amountPaise,
        workAreaId: e.workAreaId,
        initiativeId: e.initiativeId,
        fundType: e.fundType || "general",
      },
      { accountCode: creditCode, creditPaise: e.amountPaise, fundType: e.fundType || "general" },
    ],
  });
}

export function reverseExpensePayment(expenseId: Types.ObjectId | string, reason: string, createdBy: string) {
  return reverseJournal(`jv_exp_${expenseId}`, reason, createdBy);
}

/** Donation refunded → Dr donation income, Cr where the money goes out from. */
export async function postRefund(p: {
  refundId: Types.ObjectId | string;
  amountPaise: number;
  donation: any;
  date?: Date;
  createdBy?: string;
}) {
  const amount = Math.round(p.amountPaise);
  if (!(amount > 0)) return null;
  const d = p.donation || {};
  const creditCode = await receivingAccount({
    bankAccountId: d.bankAccountId,
    cashAccountId: d.cashAccountId,
    online: isGatewayPayment(d),
  });
  return postJournal({
    date: p.date || new Date(),
    narration: `Refund of donation ${d.receiptNo || ""} to ${d.donorName || "donor"}`,
    sourceType: "refund",
    sourceId: p.refundId as any,
    sourceRef: d.receiptNo,
    idempotencyKey: `jv_ref_${p.refundId}`,
    createdBy: p.createdBy || SYSTEM_ACTOR,
    lines: [
      {
        accountCode: d.donorType === "Corporate" ? ACC.DONATION_ORGANISATION : ACC.DONATION_INDIVIDUAL,
        debitPaise: amount,
        workAreaId: d.workAreaId,
      },
      { accountCode: creditCode, creditPaise: amount },
    ],
  });
}

/** Opening balance of a bank or cash account → Dr the account, Cr Opening Balances. */
export async function postOpeningBalance(p: {
  kind: "bank" | "cash";
  accountId: Types.ObjectId | string;
  amountPaise: number;
  date: Date;
  createdBy: string;
  /** Distinguishes later corrections of the opening balance. */
  version?: string;
}) {
  if (!(p.amountPaise > 0)) return null;
  const code = p.kind === "bank" ? await ensureBankLedgerAccount(p.accountId) : await ensureCashLedgerAccount(p.accountId);
  return postJournal({
    date: p.date,
    narration: `Opening balance — ${p.kind} account ${code}`,
    sourceType: "opening_balance",
    sourceId: p.accountId as any,
    idempotencyKey: `jv_open_${p.kind}_${p.accountId}${p.version ? `_${p.version}` : ""}`,
    createdBy: p.createdBy,
    lines: [
      { accountCode: code, debitPaise: p.amountPaise },
      { accountCode: ACC.OPENING_BALANCE_EQUITY, creditPaise: p.amountPaise },
    ],
  });
}

/** Approved transfer between ISLAH's own accounts → Dr destination, Cr source. Never income/expense. */
export async function postTransfer(t: any, createdBy: string) {
  const from = t.fromKind === "bank" ? await ensureBankLedgerAccount(t.fromId) : await ensureCashLedgerAccount(t.fromId);
  const to = t.toKind === "bank" ? await ensureBankLedgerAccount(t.toId) : await ensureCashLedgerAccount(t.toId);
  return postJournal({
    date: new Date(t.date),
    narration: `${t.transferNo} ${t.type.replace("_", " ")} — ${t.purpose}`,
    sourceType: "transfer",
    sourceId: t._id,
    sourceRef: t.transferNo,
    idempotencyKey: `jv_trf_${t._id}`,
    createdBy,
    lines: [
      { accountCode: to, debitPaise: t.amountPaise, fundType: t.fundType },
      { accountCode: from, creditPaise: t.amountPaise, fundType: t.fundType },
    ],
  });
}

/**
 * Gateway settlement credited to a bank account:
 * Dr bank (net), Dr bank & gateway charges (fee + GST on fee), Cr gateway clearing (gross).
 */
export async function postGatewaySettlement(p: {
  bankAccountId: Types.ObjectId | string;
  date: Date;
  grossPaise: number;
  feePaise: number;
  taxPaise: number;
  utr: string;
  createdBy: string;
}) {
  const bank = await ensureBankLedgerAccount(p.bankAccountId);
  const charges = p.feePaise + p.taxPaise;
  const net = p.grossPaise - charges;
  if (!(p.grossPaise > 0) || net < 0) throw new Error("Settlement amounts are not valid.");
  return postJournal({
    date: p.date,
    narration: `Razorpay settlement ${p.utr}`,
    sourceType: "settlement",
    sourceRef: p.utr,
    idempotencyKey: `jv_stl_${p.utr.trim().toUpperCase()}`,
    createdBy: p.createdBy,
    lines: [
      { accountCode: bank, debitPaise: net },
      { accountCode: ACC.BANK_GATEWAY_CHARGES, debitPaise: charges, memo: "Gateway fee incl. GST" },
      { accountCode: ACC.GATEWAY_CLEARING, creditPaise: p.grossPaise },
    ],
  });
}

/** Posting must never break the business flow that triggered it; log and carry on. */
export async function safePost<T>(label: string, fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[accounting] ${label} failed:`, err);
    return null;
  }
}
