import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeftRight, PlusCircle, Loader2, CheckCircle2, XCircle, Banknote } from "lucide-react";
import { toast } from "sonner";
import { financeApi, type TransferItem, type TransferType, type JournalItem } from "../../services/financeApi";
import { useAuth } from "../../context/AuthContext";
import {
  PageHeader,
  StatCard,
  Modal,
  FieldError,
  StatusPill,
  LoadingRow,
  EmptyRow,
  AccountPicker,
  type AccountChoice,
  formatPaise,
  formatDate,
  todayIst,
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
  TRANSFER_LABEL,
} from "../../components/finance/financeUi";

const KINDS: Record<TransferType, ["bank" | "cash", "bank" | "cash"]> = {
  withdrawal: ["bank", "cash"],
  deposit: ["cash", "bank"],
  bank_transfer: ["bank", "bank"],
  cash_transfer: ["cash", "cash"],
};

export default function TransfersManager() {
  const { can, user } = useAuth();
  const [params, setParams] = useSearchParams();
  const tab = params.get("tab") === "settlements" ? "settlements" : "transfers";
  const [status, setStatus] = useState<"pending" | "approved" | "rejected" | "">("");
  const [transfers, setTransfers] = useState<TransferItem[]>([]);
  const [settlements, setSettlements] = useState<JournalItem[]>([]);
  const [clearing, setClearing] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [showSettlement, setShowSettlement] = useState(false);
  const [rejecting, setRejecting] = useState<TransferItem | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      if (tab === "transfers") {
        const res = await financeApi.getTransfers({ status: status || undefined });
        setTransfers(res.data);
      } else {
        const res = await financeApi.getSettlements();
        setSettlements(res.data);
        setClearing(res.clearingBalancePaise);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [tab, status]);

  const pending = useMemo(() => transfers.filter((t) => t.status === "pending"), [transfers]);
  const myName = user?.name || user?.email;

  const approve = async (t: TransferItem) => {
    setBusyId(t._id);
    try {
      const res = await financeApi.approveTransfer(t._id);
      toast.success(res.message || "Transfer approved");
      load();
    } catch (err: any) {
      toast.error(err.message || "Could not approve");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 font-sans">
      <PageHeader
        title="Transfers & Settlements"
        icon={<ArrowLeftRight className="w-6 h-6 text-blue-600" />}
        description="Money moving between ISLAH's own accounts — withdrawals, deposits, bank and cash transfers — and Razorpay settlements. None of these is income or expenditure."
        actions={
          <>
            {tab === "transfers" && can("finance.transfer:create") && (
              <button onClick={() => setShowNew(true)} className={primaryButton}>
                <PlusCircle className="w-4 h-4" />
                <span>Record Transfer</span>
              </button>
            )}
            {tab === "settlements" && can("finance.settlement:create") && (
              <button onClick={() => setShowSettlement(true)} className={primaryButton}>
                <Banknote className="w-4 h-4" />
                <span>Record Settlement</span>
              </button>
            )}
          </>
        }
      />

      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-2xs">
        {(["transfers", "settlements"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setParams(t === "settlements" ? { tab: t } : {})}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${tab === t ? "bg-[#f97316] text-white" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {t === "transfers" ? "Transfers" : "Razorpay settlements"}
          </button>
        ))}
      </div>

      {tab === "transfers" ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
            <StatCard label="Waiting for approval" value={String(pending.length)} tone={pending.length ? "amber" : "slate"} hint="Approved by someone other than the person who entered it" />
            <StatCard label="Pending amount" value={formatPaise(pending.reduce((s, t) => s + t.amountPaise, 0))} />
            <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs">
              <label className="text-xs text-slate-500 font-medium">Show</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as any)} className={inputClass}>
                <option value="">All transfers</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
                  <th className="text-left py-3 px-4 font-bold">Transfer</th>
                  <th className="text-left py-3 px-4 font-bold">From → To</th>
                  <th className="text-left py-3 px-4 font-bold">Purpose</th>
                  <th className="text-right py-3 px-4 font-bold">Amount</th>
                  <th className="text-left py-3 px-4 font-bold">Entered / approved</th>
                  <th className="text-left py-3 px-4 font-bold">Status</th>
                  <th className="py-3 px-4" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <LoadingRow colSpan={7} text="Loading transfers…" />
                ) : transfers.length === 0 ? (
                  <EmptyRow colSpan={7} text="No transfers recorded." />
                ) : (
                  transfers.map((t) => (
                    <tr key={t._id} className="hover:bg-slate-50/60 align-top">
                      <td className="py-3 px-4">
                        <p className="font-mono font-bold text-slate-900">{t.transferNo}</p>
                        <p className="text-[10px] text-slate-500">
                          {TRANSFER_LABEL[t.type]} · {formatDate(t.date)}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-slate-700 font-semibold">{t.fromName}</p>
                        <p className="text-[10px] text-slate-400">→ {t.toName}</p>
                      </td>
                      <td className="py-3 px-4 max-w-[260px]">
                        <p className="text-slate-700">{t.purpose}</p>
                        <p className="text-[10px] text-slate-400">
                          {t.reference ? `Ref ${t.reference}` : ""}
                          {t.receivedBy ? ` · received by ${t.receivedBy}` : ""}
                          {t.fundType === "restricted" ? " · restricted funds" : ""}
                        </p>
                        {t.rejectionReason && <p className="text-[10px] text-rose-600 font-semibold">Rejected: {t.rejectionReason}</p>}
                      </td>
                      <td className="py-3 px-4 text-right font-black text-slate-900">{formatPaise(t.amountPaise)}</td>
                      <td className="py-3 px-4">
                        <p className="text-slate-700">{t.submittedBy}</p>
                        <p className="text-[10px] text-slate-400">{t.approvedBy ? `${t.status === "rejected" ? "Rejected" : "Approved"} by ${t.approvedBy}` : "—"}</p>
                      </td>
                      <td className="py-3 px-4">
                        <StatusPill status={t.status} />
                      </td>
                      <td className="py-3 px-4">
                        {t.status === "pending" && can("finance.transfer:approve") && (
                          <div className="flex items-center justify-end gap-1">
                            {t.submittedBy === myName ? (
                              <span className="text-[10px] text-slate-400 font-semibold">Needs another approver</span>
                            ) : (
                              <>
                                <button
                                  onClick={() => approve(t)}
                                  disabled={busyId === t._id}
                                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-emerald-700 hover:bg-emerald-50 flex items-center gap-1 cursor-pointer"
                                >
                                  {busyId === t._id ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                                  Approve
                                </button>
                                <button
                                  onClick={() => setRejecting(t)}
                                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1 cursor-pointer"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
            <StatCard
              label="Online receipts awaiting settlement"
              value={formatPaise(clearing)}
              hint="Captured by Razorpay, not yet credited to the bank"
              tone={clearing < 0 ? "rose" : "blue"}
            />
            <StatCard label="Settlements recorded" value={String(settlements.length)} />
            <StatCard
              label="Gateway charges recorded"
              value={formatPaise(
                settlements.reduce((s, j) => s + j.lines.filter((l) => l.accountCode === "6107").reduce((a, l) => a + l.debitPaise, 0), 0)
              )}
              hint="Fee + GST, booked to Bank & Gateway Charges"
            />
          </div>
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
                  <th className="text-left py-3 px-4 font-bold">Date</th>
                  <th className="text-left py-3 px-4 font-bold">UTR</th>
                  <th className="text-left py-3 px-4 font-bold">Bank account</th>
                  <th className="text-right py-3 px-4 font-bold">Gross</th>
                  <th className="text-right py-3 px-4 font-bold">Charges</th>
                  <th className="text-right py-3 px-4 font-bold">Credited</th>
                  <th className="text-left py-3 px-4 font-bold">Journal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <LoadingRow colSpan={7} text="Loading settlements…" />
                ) : settlements.length === 0 ? (
                  <EmptyRow colSpan={7} text="No Razorpay settlements recorded yet." />
                ) : (
                  settlements.map((j) => {
                    const bankLine = j.lines.find((l) => l.debitPaise > 0 && l.accountCode.startsWith("11"));
                    const charges = j.lines.filter((l) => l.accountCode === "6107").reduce((a, l) => a + l.debitPaise, 0);
                    return (
                      <tr key={j._id}>
                        <td className="py-3 px-4">{formatDate(j.date)}</td>
                        <td className="py-3 px-4 font-mono">{j.sourceRef}</td>
                        <td className="py-3 px-4 text-slate-700">{bankLine?.accountName || "—"}</td>
                        <td className="py-3 px-4 text-right font-bold">{formatPaise(j.totalPaise)}</td>
                        <td className="py-3 px-4 text-right text-rose-600 font-bold">{formatPaise(charges)}</td>
                        <td className="py-3 px-4 text-right font-black text-emerald-700">{formatPaise(bankLine?.debitPaise)}</td>
                        <td className="py-3 px-4 font-mono text-slate-500">{j.journalNo}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showNew && (
        <TransferForm
          onClose={() => setShowNew(false)}
          onSaved={() => {
            setShowNew(false);
            load();
          }}
        />
      )}
      {showSettlement && (
        <SettlementForm
          onClose={() => setShowSettlement(false)}
          onSaved={() => {
            setShowSettlement(false);
            load();
          }}
        />
      )}
      {rejecting && (
        <RejectForm
          transfer={rejecting}
          onClose={() => setRejecting(null)}
          onDone={() => {
            setRejecting(null);
            load();
          }}
        />
      )}
    </div>
  );
}

function TransferForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [type, setType] = useState<TransferType>("withdrawal");
  const [from, setFrom] = useState<AccountChoice>(null);
  const [to, setTo] = useState<AccountChoice>(null);
  const [form, setForm] = useState({ date: todayIst(), amount: "", purpose: "", reference: "", receivedBy: "", fundType: "general" as "general" | "restricted" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [fromKind, toKind] = KINDS[type];
  const needsReceiver = type === "withdrawal" || type === "cash_transfer";

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!from) e.from = "Choose the account the money leaves.";
    if (!to) e.to = "Choose the account the money goes to.";
    if (from && to && from.id === to.id) e.to = "Source and destination must be different.";
    if (!(Number(form.amount) > 0)) e.amount = "Enter an amount greater than zero.";
    if (!form.date) e.date = "Choose the date.";
    if (!form.purpose.trim()) e.purpose = "State the purpose.";
    if (needsReceiver && !form.receivedBy.trim()) e.receivedBy = "Name the person who received the cash.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    try {
      const res = await financeApi.createTransfer({
        type,
        date: form.date,
        fromId: from!.id,
        toId: to!.id,
        amount: Number(form.amount),
        purpose: form.purpose.trim(),
        reference: form.reference.trim() || undefined,
        receivedBy: form.receivedBy.trim() || undefined,
        fundType: form.fundType,
      });
      toast.success(res.message);
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Could not record the transfer");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Record Transfer" subtitle="Posted only after a different finance user approves it." onClose={onClose}>
      <form onSubmit={submit} noValidate className="mt-4 space-y-3.5">
        <div>
          <label className={labelClass}>Type *</label>
          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value as TransferType);
              setFrom(null);
              setTo(null);
            }}
            className={inputClass}
          >
            {Object.entries(TRANSFER_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </div>
        <AccountPicker key={`from-${type}`} label="From" kinds={[fromKind]} value={from} onChange={(v) => { setFrom(v); setErrors((x) => ({ ...x, from: "" })); }} error={errors.from} />
        <AccountPicker key={`to-${type}`} label="To" kinds={[toKind]} value={to} onChange={(v) => { setTo(v); setErrors((x) => ({ ...x, to: "" })); }} error={errors.to} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Amount (₹) *</label>
            <input type="number" min={1} step="0.01" value={form.amount} onChange={(e) => set("amount", e.target.value)} className={`${inputClass} font-bold`} />
            <FieldError message={errors.amount} />
          </div>
          <div>
            <label className={labelClass}>Date *</label>
            <input type="date" max={todayIst()} value={form.date} onChange={(e) => set("date", e.target.value)} className={inputClass} />
            <FieldError message={errors.date} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Purpose *</label>
          <input value={form.purpose} onChange={(e) => set("purpose", e.target.value)} placeholder="e.g. Petty cash for November field visits" className={inputClass} />
          <FieldError message={errors.purpose} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Cheque / UTR / slip no.</label>
            <input value={form.reference} onChange={(e) => set("reference", e.target.value)} className={`${inputClass} font-mono`} />
          </div>
          <div>
            <label className={labelClass}>Received by{needsReceiver ? " *" : ""}</label>
            <input value={form.receivedBy} onChange={(e) => set("receivedBy", e.target.value)} className={inputClass} />
            <FieldError message={errors.receivedBy} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Funds</label>
          <select value={form.fundType} onChange={(e) => set("fundType", e.target.value)} className={inputClass}>
            <option value="general">General funds</option>
            <option value="restricted">Restricted funds</option>
          </select>
        </div>
        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} className={primaryButton}>
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Submit for Approval</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

function SettlementForm({ onClose, onSaved }: { onClose: () => void; onSaved: () => void }) {
  const [bank, setBank] = useState<AccountChoice>(null);
  const [form, setForm] = useState({ date: todayIst(), utr: "", gross: "", fee: "", tax: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const net = Number(form.gross || 0) - Number(form.fee || 0) - Number(form.tax || 0);
  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!bank) e.bank = "Choose the bank account credited.";
    if (!form.utr.trim()) e.utr = "Enter the settlement UTR from the Razorpay dashboard.";
    if (!(Number(form.gross) > 0)) e.gross = "Enter the gross amount settled.";
    if (Number(form.fee) < 0 || Number(form.tax) < 0) e.fee = "Fees cannot be negative.";
    if (net < 0) e.fee = "Fees cannot exceed the gross amount.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    try {
      const res = await financeApi.createSettlement({
        bankAccountId: bank!.id,
        date: form.date,
        utr: form.utr.trim(),
        grossAmount: Number(form.gross),
        fee: Number(form.fee || 0),
        tax: Number(form.tax || 0),
      });
      toast.success(`Settlement ${form.utr.trim()} posted.`);
      if (res.warning) toast.warning(res.warning);
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Could not record the settlement");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title="Record Razorpay Settlement" subtitle="Copy these figures from the settlement in your Razorpay dashboard." onClose={onClose}>
      <form onSubmit={submit} noValidate className="mt-4 space-y-3.5">
        <AccountPicker label="Credited to" kinds={["bank"]} value={bank} onChange={(v) => { setBank(v); setErrors((x) => ({ ...x, bank: "" })); }} error={errors.bank} />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Settlement date *</label>
            <input type="date" max={todayIst()} value={form.date} onChange={(e) => set("date", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>UTR *</label>
            <input value={form.utr} onChange={(e) => set("utr", e.target.value.toUpperCase())} className={`${inputClass} font-mono`} />
            <FieldError message={errors.utr} />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Gross amount (₹) *</label>
            <input type="number" min={0} step="0.01" value={form.gross} onChange={(e) => set("gross", e.target.value)} className={`${inputClass} font-bold`} />
            <FieldError message={errors.gross} />
          </div>
          <div>
            <label className={labelClass}>Razorpay fee (₹)</label>
            <input type="number" min={0} step="0.01" value={form.fee} onChange={(e) => set("fee", e.target.value)} className={inputClass} />
            <FieldError message={errors.fee} />
          </div>
          <div>
            <label className={labelClass}>GST on fee (₹)</label>
            <input type="number" min={0} step="0.01" value={form.tax} onChange={(e) => set("tax", e.target.value)} className={inputClass} />
          </div>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 text-xs flex items-center justify-between">
          <span className="text-slate-500">Amount credited to bank</span>
          <span className={`font-black ${net < 0 ? "text-rose-600" : "text-emerald-700"}`}>{formatPaise(Math.round(net * 100))}</span>
        </div>
        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} className={primaryButton}>
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>Post Settlement</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

function RejectForm({ transfer, onClose, onDone }: { transfer: TransferItem; onClose: () => void; onDone: () => void }) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!reason.trim()) return toast.error("Give a reason for rejecting.");
    setSubmitting(true);
    try {
      await financeApi.rejectTransfer(transfer._id, reason.trim());
      toast.success(`${transfer.transferNo} rejected.`);
      onDone();
    } catch (err: any) {
      toast.error(err.message || "Could not reject");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal title={`Reject ${transfer.transferNo}`} subtitle={`${formatPaise(transfer.amountPaise)} · ${transfer.fromName} → ${transfer.toName}`} onClose={onClose}>
      <form onSubmit={submit} className="mt-4 space-y-3.5">
        <div>
          <label className={labelClass}>Reason *</label>
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3} className={inputClass} />
        </div>
        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer">
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Reject Transfer
          </button>
        </div>
      </form>
    </Modal>
  );
}
