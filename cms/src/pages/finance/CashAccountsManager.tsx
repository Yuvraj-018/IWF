import { useEffect, useState } from "react";
import { Wallet, PlusCircle, Edit2, Loader2, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { financeApi, type CashAccountItem, type RegisterLine } from "../../services/financeApi";
import { useAuth } from "../../context/AuthContext";
import {
  PageHeader,
  StatCard,
  Modal,
  FieldError,
  StatusPill,
  LoadingRow,
  EmptyRow,
  RegisterTable,
  formatPaise,
  formatDate,
  todayIst,
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
} from "../../components/finance/financeUi";

const CASH_TYPE_LABEL: Record<string, string> = {
  head_office: "Head office cash",
  admin_office: "Administrative office cash",
  programme: "Programme cash",
  petty: "Petty cash",
  emergency: "Emergency cash",
  other: "Other",
};

export default function CashAccountsManager() {
  const { can } = useAuth();
  const [accounts, setAccounts] = useState<CashAccountItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<CashAccountItem | "new" | null>(null);
  const [viewing, setViewing] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await financeApi.getCashAccounts();
      setAccounts(res.data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load cash accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const active = accounts.filter((a) => a.status === "active");
  const total = active.reduce((s, a) => s + a.balancePaise, 0);

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 font-sans">
      <PageHeader
        title="Cash Accounts"
        icon={<Wallet className="w-6 h-6 text-emerald-600" />}
        description="Cash held at each office or by each custodian. Cash moves in by withdrawal or donation and out by payment, deposit or handover — never by editing a balance."
        actions={
          can("finance.cash_account:edit") && (
            <button onClick={() => setEditing("new")} className={primaryButton}>
              <PlusCircle className="w-4 h-4" />
              <span>Add Cash Account</span>
            </button>
          )
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
        <StatCard label="Total cash in hand" value={formatPaise(total)} hint="Active cash accounts" tone="emerald" />
        <StatCard label="Active cash accounts" value={String(active.length)} />
        <StatCard label="Custodians" value={String(new Set(active.map((a) => a.custodianName)).size)} hint="People responsible for cash" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-bold">Cash account</th>
              <th className="text-left py-3 px-4 font-bold">Custodian</th>
              <th className="text-left py-3 px-4 font-bold">Office</th>
              <th className="text-left py-3 px-4 font-bold">Ledger</th>
              <th className="text-left py-3 px-4 font-bold">Last movement</th>
              <th className="text-right py-3 px-4 font-bold">Balance</th>
              <th className="text-left py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <LoadingRow colSpan={8} text="Loading cash accounts…" />
            ) : accounts.length === 0 ? (
              <EmptyRow colSpan={8} text="No cash accounts yet. Add one for each office or custodian that holds cash." />
            ) : (
              accounts.map((a) => (
                <tr key={a._id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{a.name}</p>
                    <p className="text-[10px] text-slate-500">{CASH_TYPE_LABEL[a.type] || a.type}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-slate-700 font-semibold">{a.custodianName}</p>
                    <p className="text-[10px] text-slate-400">{a.custodianContact || "—"}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-700">{a.office || "—"}</td>
                  <td className="py-3 px-4 font-mono text-slate-600">{a.ledgerAccountCode || "—"}</td>
                  <td className="py-3 px-4 text-slate-700">{formatDate(a.lastMovementAt)}</td>
                  <td className={`py-3 px-4 text-right font-black ${a.balancePaise < 0 ? "text-rose-600" : "text-slate-900"}`}>{formatPaise(a.balancePaise)}</td>
                  <td className="py-3 px-4">
                    <StatusPill status={a.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      {can("finance.cash_account:edit") && (
                        <button onClick={() => setEditing(a)} title="Edit" className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-slate-50 cursor-pointer">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => setViewing(a._id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700 hover:bg-blue-50 flex items-center gap-0.5 cursor-pointer"
                      >
                        Cash book <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <CashAccountForm
          account={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
      {viewing && <CashBook id={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}

function CashAccountForm({ account, onClose, onSaved }: { account: CashAccountItem | null; onClose: () => void; onSaved: () => void }) {
  const isNew = !account;
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: account?.name || "",
    type: account?.type || "petty",
    office: account?.office || "",
    custodianName: account?.custodianName || "",
    custodianContact: account?.custodianContact || "",
    openingBalance: account ? String(account.openingBalancePaise / 100) : "",
    openingDate: account?.openingDate ? String(account.openingDate).slice(0, 10) : todayIst(),
    status: account?.status || "active",
    notes: account?.notes || "",
    reason: "",
  });
  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const openingChanged =
    !isNew &&
    (Math.round(Number(form.openingBalance || 0) * 100) !== account!.openingBalancePaise ||
      form.openingDate !== String(account!.openingDate).slice(0, 10));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name this cash account, e.g. Head Office Petty Cash.";
    if (!form.custodianName.trim()) e.custodianName = "Name the person responsible for this cash.";
    if (form.custodianContact && !/^[6-9]\d{9}$/.test(form.custodianContact)) e.custodianContact = "Enter a valid 10-digit mobile number.";
    if (form.openingBalance === "" || Number(form.openingBalance) < 0 || Number.isNaN(Number(form.openingBalance))) {
      e.openingBalance = "Enter the cash counted on the opening date (0 if none).";
    }
    if (!form.openingDate) e.openingDate = "Choose the opening date.";
    if (openingChanged && !form.reason.trim()) e.reason = "Explain why the opening balance is being corrected.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      name: form.name.trim(),
      type: form.type,
      office: form.office.trim(),
      custodianName: form.custodianName.trim(),
      custodianContact: form.custodianContact,
      openingBalance: Number(form.openingBalance),
      openingDate: form.openingDate,
      notes: form.notes.trim(),
    };
    try {
      if (isNew) {
        await financeApi.createCashAccount(payload);
        toast.success(`${payload.name} added.`);
      } else {
        await financeApi.updateCashAccount(account!._id, { ...payload, status: form.status, ...(openingChanged ? { reason: form.reason.trim() } : {}) });
        toast.success("Cash account updated.");
      }
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Could not save the cash account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal title={isNew ? "Add Cash Account" : "Edit Cash Account"} subtitle={isNew ? "A ledger account and opening journal are created automatically." : account!.name} onClose={onClose}>
      <form onSubmit={submit} noValidate className="mt-4 space-y-3.5">
        <div>
          <label className={labelClass}>Cash account name *</label>
          <input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Darbhanga Office Petty Cash" className={inputClass} />
          <FieldError message={errors.name} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputClass}>
              {Object.entries(CASH_TYPE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Office / location</label>
            <input value={form.office} onChange={(e) => set("office", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Custodian *</label>
            <input value={form.custodianName} onChange={(e) => set("custodianName", e.target.value)} className={inputClass} />
            <FieldError message={errors.custodianName} />
          </div>
          <div>
            <label className={labelClass}>Custodian mobile</label>
            <div className="flex mt-1">
              <span className="px-2.5 py-2 rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 text-xs text-slate-500">+91</span>
              <input
                value={form.custodianContact}
                onChange={(e) => set("custodianContact", e.target.value.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                className={`${inputClass} mt-0 rounded-l-none`}
              />
            </div>
            <FieldError message={errors.custodianContact} />
          </div>
          <div>
            <label className={labelClass}>Opening balance (₹) *</label>
            <input type="number" min={0} step="0.01" value={form.openingBalance} onChange={(e) => set("openingBalance", e.target.value)} className={`${inputClass} font-bold`} />
            <FieldError message={errors.openingBalance} />
          </div>
          <div>
            <label className={labelClass}>Opening date *</label>
            <input type="date" max={todayIst()} value={form.openingDate} onChange={(e) => set("openingDate", e.target.value)} className={inputClass} />
            <FieldError message={errors.openingDate} />
          </div>
          {!isNew && (
            <div className="col-span-2">
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputClass}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closed">Closed (balance must be zero)</option>
              </select>
            </div>
          )}
        </div>
        {openingChanged && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-[11px] text-amber-900 font-semibold">The old opening journal is reversed and a new one posted; both stay on record.</p>
            <label className={`${labelClass} block mt-2`}>Reason for correction *</label>
            <input value={form.reason} onChange={(e) => set("reason", e.target.value)} className={inputClass} />
            <FieldError message={errors.reason} />
          </div>
        )}
        <div>
          <label className={labelClass}>Notes</label>
          <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} className={inputClass} />
        </div>
        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} className={primaryButton}>
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isNew ? "Add Cash Account" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

function CashBook({ id, onClose }: { id: string; onClose: () => void }) {
  const [account, setAccount] = useState<CashAccountItem | null>(null);
  const [lines, setLines] = useState<RegisterLine[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    financeApi
      .getCashAccountDetail(id)
      .then((res) => {
        setAccount(res.data);
        setLines(res.register);
      })
      .catch((err) => toast.error(err.message || "Failed to load the cash book"))
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <Modal title={account ? `${account.name} — cash book` : "Cash book"} subtitle={account ? `Custodian ${account.custodianName} · ledger ${account.ledgerAccountCode}` : ""} onClose={onClose} wide>
      {loading || !account ? (
        <div className="py-12 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <p className="text-slate-500">
              Opening {formatPaise(account.openingBalancePaise)} on {formatDate(account.openingDate)}
            </p>
            <p className="font-black text-base text-emerald-700">Balance {formatPaise(account.balancePaise)}</p>
          </div>
          <RegisterTable lines={lines} />
        </div>
      )}
    </Modal>
  );
}
