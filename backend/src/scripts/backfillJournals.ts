import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { Donation } from "../models/Donation.js";
import { Member } from "../models/Member.js";
import { Expense } from "../models/Expense.js";
import { Refund } from "../models/Refund.js";
import { BankAccount } from "../models/BankAccount.js";
import { CashAccount } from "../models/CashAccount.js";
import { JournalEntry } from "../models/JournalEntry.js";
import {
  ensureChartOfAccounts,
  ensureBankLedgerAccount,
  ensureCashLedgerAccount,
  postDonation,
  postMembershipFee,
  postExpensePayment,
  postRefund,
  postOpeningBalance,
  trialBalance,
} from "../services/accountingService.js";

dotenv.config();

/**
 * Posts double-entry journals for records that existed before the journal
 * system. Safe to run repeatedly: every posting is idempotent.
 *
 *   npx tsx src/scripts/backfillJournals.ts           # dry run: counts only
 *   npx tsx src/scripts/backfillJournals.ts --apply   # post the journals
 *
 * Placeholder bank accounts created by the old seed/reconciliation code
 * (State Bank of India ******1092 / ******4567, IFSC SBIN0001234) are marked
 * inactive and get no opening balance. Add the real accounts in the CMS.
 */

const APPLY = process.argv.includes("--apply");
const ACTOR = "journal_backfill";
const PLACEHOLDER = { ifsc: "SBIN0001234", accountNumberMasked: { $in: ["******1092", "******4567"] } };

type Tally = { found: number; alreadyPosted: number; posted: number; skipped: number; failed: number };
const tally = (): Tally => ({ found: 0, alreadyPosted: 0, posted: 0, skipped: 0, failed: 0 });

async function step(t: Tally, key: string, post: () => Promise<unknown>) {
  t.found++;
  if (await JournalEntry.exists({ idempotencyKey: key })) {
    t.alreadyPosted++;
    return;
  }
  if (!APPLY) {
    t.posted++;
    return;
  }
  try {
    const r = await post();
    if (r) t.posted++;
    else t.skipped++;
  } catch (err) {
    t.failed++;
    console.error(`  ✗ ${key}:`, (err as Error).message);
  }
}

export async function backfillJournals() {
  await connectDB();
  console.log(APPLY ? "Posting journals for existing records…" : "DRY RUN — nothing will be written. Add --apply to post.");
  if (APPLY) await ensureChartOfAccounts();

  // 1. Placeholder bank accounts
  const placeholders = await BankAccount.find(PLACEHOLDER);
  for (const p of placeholders) {
    console.log(`  ! Placeholder bank account ${p.bankName} ${p.accountNumberMasked} → marked inactive`);
    if (APPLY) {
      p.status = "inactive";
      p.notes = `${p.notes ? `${p.notes}\n` : ""}Placeholder created by the old seed script — not a real account. Deactivated by journal backfill.`;
      await p.save();
    }
  }

  // 2. Opening balances of real bank and cash accounts
  const opening = tally();
  for (const b of await BankAccount.find({ _id: { $nin: placeholders.map((p) => p._id) } })) {
    if (APPLY) await ensureBankLedgerAccount(b._id);
    if (!(b.openingBalancePaise > 0)) continue;
    await step(opening, `jv_open_bank_${b._id}`, () =>
      postOpeningBalance({ kind: "bank", accountId: b._id, amountPaise: b.openingBalancePaise, date: b.openingDate || b.createdAt, createdBy: ACTOR })
    );
  }
  for (const c of await CashAccount.find()) {
    if (APPLY) await ensureCashLedgerAccount(c._id);
    if (!(c.openingBalancePaise > 0)) continue;
    await step(opening, `jv_open_cash_${c._id}`, () =>
      postOpeningBalance({ kind: "cash", accountId: c._id, amountPaise: c.openingBalancePaise, date: c.openingDate, createdBy: ACTOR })
    );
  }

  // 3. Donations received (refunded ones too — their refunds post separately)
  const donations = tally();
  const donationCursor = Donation.find({ paymentStatus: { $in: ["Success", "Refunded", "Partially Refunded"] } }).cursor();
  for await (const d of donationCursor) {
    await step(donations, `jv_don_${d._id}`, () => postDonation(d, ACTOR));
  }

  // 4. Membership fees paid online (latest payment per member is what is on record)
  const memberships = tally();
  const memberCursor = Member.find({ transactionId: { $regex: /^pay_/ } }).cursor();
  for await (const m of memberCursor as any) {
    await step(memberships, `jv_mem_${m.transactionId}`, () =>
      postMembershipFee({
        paymentId: m.transactionId,
        amountRupees: Number(m.annualFee) || 0,
        memberNo: m.memberNo,
        memberName: m.name,
        organisation: m.category === "Orange",
        isRenewal: false,
        receiptNo: m.receiptNo,
        date: m.validFrom || m.createdAt,
        createdBy: ACTOR,
      })
    );
  }

  // 5. Expenses paid (cancelled after payment → posted, then reversed)
  const expenses = tally();
  for (const e of await Expense.find({ "payment.status": "paid" })) {
    await step(expenses, `jv_exp_${e._id}`, () => postExpensePayment(e, ACTOR));
  }

  // 6. Processed refunds
  const refunds = tally();
  for (const r of await Refund.find({ status: "processed" })) {
    const donation = await Donation.findById(r.donationId);
    await step(refunds, `jv_ref_${r._id}`, () =>
      postRefund({ refundId: r._id, amountPaise: r.amountPaise, donation, date: r.createdAt, createdBy: ACTOR })
    );
  }

  const show = (label: string, t: Tally) =>
    console.log(
      `  ${label.padEnd(18)} found ${t.found}, already posted ${t.alreadyPosted}, ${APPLY ? "posted" : "to post"} ${t.posted}` +
        (t.skipped ? `, skipped ${t.skipped}` : "") +
        (t.failed ? `, FAILED ${t.failed}` : "")
    );
  console.log("\nSummary");
  show("Opening balances", opening);
  show("Donations", donations);
  show("Membership fees", memberships);
  show("Expense payments", expenses);
  show("Refunds", refunds);

  if (APPLY) {
    const tb = await trialBalance();
    console.log(
      `\nTrial balance: Dr ₹${(tb.totalDebitPaise / 100).toLocaleString("en-IN")} / Cr ₹${(tb.totalCreditPaise / 100).toLocaleString("en-IN")} — ${tb.balanced ? "balanced ✓" : "NOT BALANCED ✗"}`
    );
    const suspense = tb.rows.find((r) => r.code === "1900");
    if (suspense) {
      console.log(
        `Receipts/payments with no bank or cash account recorded sit in 1900 Pending Account Mapping: ₹${((suspense.debitBalancePaise - suspense.creditBalancePaise) / 100).toLocaleString("en-IN")}. Reclassify them once the accounts are known.`
      );
    }
  }
}

if (process.argv[1]?.includes("backfillJournals")) {
  backfillJournals()
    .then(() => mongoose.disconnect().then(() => process.exit(0)))
    .catch((err) => {
      console.error("❌ Backfill failed:", err);
      mongoose.disconnect().finally(() => process.exit(1));
    });
}
