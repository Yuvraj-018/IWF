import { useEffect, useState } from "react";
import { Landmark, PlusCircle, Edit2, Eye, EyeOff, Loader2, Star, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { financeApi, type BankAccountItem, type RegisterLine } from "../../services/financeApi";
import { useAuth } from "../../context/AuthContext";
import {
  PageHeader,
  StatCard,
  Modal,
  FieldError,
  StatusPill,
  LoadingRow,
  EmptyRow,
  formatPaise,
  formatDate,
  todayIst,
  inputClass,
  labelClass,
  primaryButton,
  secondaryButton,
  RegisterTable,
} from "../../components/finance/financeUi";

const TYPE_LABEL: Record<string, string> = { current: "Current", savings: "Savings", other: "Other" };
const PURPOSE_LABEL: Record<string, string> = { general: "General operations", programme: "Programme", grant: "Grant / project", other: "Other" };
const FUND_LABEL: Record<string, string> = { general: "General", restricted: "Restricted", specific: "Programme-specific" };
const OFFICE_LABEL: Record<string, string> = { registered: "Registered office", administrative: "Administrative office", regional: "Regional office", other: "Other" };

export default function BankAccountsManager() {
  const { can } = useAuth();
  const [accounts, setAccounts] = useState<BankAccountItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BankAccountItem | "new" | null>(null);
  const [viewing, setViewing] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await financeApi.getBankAccountRegister();
      setAccounts(res.data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load bank accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const active = accounts.filter((a) => a.status === "active");
  const total = active.reduce((s, a) => s + a.balancePaise, 0);
  const unreconciled = accounts.reduce((s, a) => s + (a.unreconciledLines || 0), 0);

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 font-sans">
      <PageHeader
        title="Bank Accounts"
        icon={<Landmark className="w-6 h-6 text-blue-600" />}
        description="Every ISLAH bank account with its live ledger balance. Balances come from posted journals; account numbers stay masked."
        actions={
          can("finance.bank_account:edit") && (
            <button onClick={() => setEditing("new")} className={primaryButton}>
              <PlusCircle className="w-4 h-4" />
              <span>Add Bank Account</span>
            </button>
          )
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <StatCard label="Total bank balance" value={formatPaise(total)} hint="Active accounts" tone="blue" />
        <StatCard label="Active accounts" value={String(active.length)} hint={`${accounts.length - active.length} inactive or closed`} />
        <StatCard label="Statement lines to reconcile" value={String(unreconciled)} tone={unreconciled ? "amber" : "slate"} to="/finance/reconciliation" />
        <StatCard
          label="Primary account"
          value={accounts.find((a) => a.isPrimary)?.accountNumberMasked || "—"}
          hint={accounts.find((a) => a.isPrimary)?.bankName || "Not set"}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-bold">Bank &amp; account</th>
              <th className="text-left py-3 px-4 font-bold">IFSC / branch</th>
              <th className="text-left py-3 px-4 font-bold">Purpose</th>
              <th className="text-left py-3 px-4 font-bold">Ledger</th>
              <th className="text-left py-3 px-4 font-bold">Last reconciled</th>
              <th className="text-right py-3 px-4 font-bold">Balance</th>
              <th className="text-left py-3 px-4 font-bold">Status</th>
              <th className="py-3 px-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <LoadingRow colSpan={8} text="Loading bank accounts…" />
            ) : accounts.length === 0 ? (
              <EmptyRow colSpan={8} text="No bank accounts yet. Add ISLAH's real accounts with their opening balances." />
            ) : (
              accounts.map((a) => (
                <tr key={a._id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900 flex items-center gap-1">
                      {a.bankName}
                      {a.isPrimary && <Star className="w-3 h-3 text-amber-500 fill-amber-400" />}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {a.accountNumberMasked} · {TYPE_LABEL[a.type] || a.type} · {a.accountName}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-mono text-slate-700">{a.ifsc}</p>
                    <p className="text-[10px] text-slate-400">{a.branch || "—"}</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-slate-700">{PURPOSE_LABEL[a.purpose || "general"]}</p>
                    <p className="text-[10px] text-slate-400">{FUND_LABEL[a.fundClassification || "general"]} funds</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600">{a.ledgerAccountCode || "—"}</td>
                  <td className="py-3 px-4">
                    <p className="text-slate-700">{formatDate(a.lastReconciledDate)}</p>
                    {(a.unreconciledLines || 0) > 0 && <p className="text-[10px] text-amber-700 font-semibold">{a.unreconciledLines} lines open</p>}
                  </td>
                  <td className={`py-3 px-4 text-right font-black ${a.balancePaise < 0 ? "text-rose-600" : "text-slate-900"}`}>
                    {formatPaise(a.balancePaise)}
                  </td>
                  <td className="py-3 px-4">
                    <StatusPill status={a.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      {can("finance.bank_account:edit") && (
                        <button
                          onClick={() => setEditing(a)}
                          title="Edit account"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-orange-600 hover:bg-slate-50 cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => setViewing(a._id)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700 hover:bg-blue-50 flex items-center gap-0.5 cursor-pointer"
                      >
                        Register <ChevronRight className="w-3 h-3" />
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
        <BankAccountForm
          account={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setEditing(null);
            load();
          }}
        />
      )}
      {viewing && <BankRegister id={viewing} onClose={() => setViewing(null)} />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADD / EDIT BANK ACCOUNT
// ─────────────────────────────────────────────────────────────
function BankAccountForm({ account, onClose, onSaved }: { account: BankAccountItem | null; onClose: () => void; onSaved: () => void }) {
  const isNew = !account;
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    bankName: account?.bankName || "",
    accountName: account?.accountName || "Islah Welfare Foundation",
    accountNumber: "",
    ifsc: account?.ifsc || "",
    branch: account?.branch || "",
    type: account?.type || "current",
    purpose: account?.purpose || "general",
    office: account?.office || "registered",
    fundClassification: account?.fundClassification || "general",
    openingBalance: account ? String(account.openingBalancePaise / 100) : "",
    openingDate: account?.openingDate ? String(account.openingDate).slice(0, 10) : todayIst(),
    isPrimary: account?.isPrimary || false,
    status: account?.status || "active",
    notes: account?.notes || "",
    reason: "",
  });
  const set = (k: keyof typeof form, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const openingChanged =
    !isNew &&
    (Math.round(Number(form.openingBalance || 0) * 100) !== account!.openingBalancePaise ||
      form.openingDate !== String(account!.openingDate || "").slice(0, 10));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.bankName.trim()) e.bankName = "Enter the bank's name.";
    if (isNew && !/^\d{6,20}$/.test(form.accountNumber.replace(/\s/g, ""))) e.accountNumber = "Account number must be 6 to 20 digits.";
    if (!isNew && form.accountNumber && !/^\d{6,20}$/.test(form.accountNumber.replace(/\s/g, ""))) {
      e.accountNumber = "Account number must be 6 to 20 digits.";
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.trim().toUpperCase())) e.ifsc = "Enter a valid 11-character IFSC, e.g. SBIN0001234.";
    if (form.openingBalance === "" || Number(form.openingBalance) < 0 || Number.isNaN(Number(form.openingBalance))) {
      e.openingBalance = "Enter the balance on the opening date (0 if new).";
    }
    if (!form.openingDate) e.openingDate = "Choose the opening balance date.";
    if (openingChanged && !form.reason.trim()) e.reason = "Explain why the opening balance is being corrected.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload = {
      bankName: form.bankName.trim(),
      accountName: form.accountName.trim(),
      ...(form.accountNumber ? { accountNumber: form.accountNumber.replace(/\s/g, "") } : {}),
      ifsc: form.ifsc.trim().toUpperCase(),
      branch: form.branch.trim(),
      type: form.type,
      purpose: form.purpose,
      office: form.office,
      fundClassification: form.fundClassification,
      openingBalance: Number(form.openingBalance),
      openingDate: form.openingDate,
      isPrimary: form.isPrimary,
      notes: form.notes.trim(),
    };
    try {
      if (isNew) {
        await financeApi.createBankAccount(payload);
        toast.success(`${payload.bankName} added with its opening balance.`);
      } else {
        await financeApi.updateBankAccount(account!._id, {
          ...payload,
          status: form.status,
          ...(openingChanged ? { reason: form.reason.trim() } : {}),
        });
        toast.success("Bank account updated.");
      }
      onSaved();
    } catch (err: any) {
      toast.error(err.message || "Could not save the bank account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title={isNew ? "Add Bank Account" : "Edit Bank Account"}
      subtitle={isNew ? "A ledger account and opening balance journal are created automatically." : `${account!.bankName} ${account!.accountNumberMasked}`}
      onClose={onClose}
      wide
    >
      <form onSubmit={submit} noValidate className="mt-4 space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Bank name *</label>
            <input value={form.bankName} onChange={(e) => set("bankName", e.target.value)} placeholder="e.g. State Bank of India" className={inputClass} />
            <FieldError message={errors.bankName} />
          </div>
          <div>
            <label className={labelClass}>Account holder name *</label>
            <input value={form.accountName} onChange={(e) => set("accountName", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{isNew ? "Account number *" : "Replace account number"}</label>
            <input
              value={form.accountNumber}
              onChange={(e) => set("accountNumber", e.target.value.replace(/[^\d\s]/g, ""))}
              inputMode="numeric"
              autoComplete="off"
              placeholder={isNew ? "Digits only" : `Currently ${account!.accountNumberMasked} — leave blank to keep`}
              className={`${inputClass} font-mono`}
            />
            <FieldError message={errors.accountNumber} />
            <p className="text-[10px] text-slate-400 mt-1">Stored on the server only; shown masked everywhere.</p>
          </div>
          <div>
            <label className={labelClass}>IFSC *</label>
            <input
              value={form.ifsc}
              onChange={(e) => set("ifsc", e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11))}
              placeholder="SBIN0001234"
              className={`${inputClass} font-mono`}
            />
            <FieldError message={errors.ifsc} />
          </div>
          <div>
            <label className={labelClass}>Branch</label>
            <input value={form.branch} onChange={(e) => set("branch", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Account type</label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className={inputClass}>
              {Object.entries(TYPE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Purpose</label>
            <select value={form.purpose} onChange={(e) => set("purpose", e.target.value)} className={inputClass}>
              {Object.entries(PURPOSE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Fund classification</label>
            <select value={form.fundClassification} onChange={(e) => set("fundClassification", e.target.value)} className={inputClass}>
              {Object.entries(FUND_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Office</label>
            <select value={form.office} onChange={(e) => set("office", e.target.value)} className={inputClass}>
              {Object.entries(OFFICE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          {!isNew && (
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={(e) => set("status", e.target.value)} className={inputClass}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="closed">Closed (balance must be zero)</option>
              </select>
            </div>
          )}
          <div>
            <label className={labelClass}>Opening balance (₹) *</label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={form.openingBalance}
              onChange={(e) => set("openingBalance", e.target.value)}
              className={`${inputClass} font-bold`}
            />
            <FieldError message={errors.openingBalance} />
          </div>
          <div>
            <label className={labelClass}>Opening balance date *</label>
            <input type="date" max={todayIst()} value={form.openingDate} onChange={(e) => set("openingDate", e.target.value)} className={inputClass} />
            <FieldError message={errors.openingDate} />
          </div>
        </div>

        {openingChanged && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-[11px] text-amber-900 font-semibold">
              Changing the opening balance reverses the old opening journal and posts a new one. Both stay on record.
            </p>
            <label className={`${labelClass} block mt-2`}>Reason for correction *</label>
            <input value={form.reason} onChange={(e) => set("reason", e.target.value)} className={inputClass} />
            <FieldError message={errors.reason} />
          </div>
        )}

        <div>
          <label className={labelClass}>Notes</label>
          <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} className={inputClass} />
        </div>

        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
          <input type="checkbox" checked={form.isPrimary} onChange={(e) => set("isPrimary", e.target.checked)} className="accent-[#f97316] w-4 h-4" />
          Primary account (default for statement imports)
        </label>

        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
          <button type="button" onClick={onClose} className={secondaryButton}>
            Cancel
          </button>
          <button type="submit" disabled={submitting} className={primaryButton}>
            {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span>{isNew ? "Add Account" : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────
// ACCOUNT REGISTER (ledger lines with running balance)
// ─────────────────────────────────────────────────────────────
function BankRegister({ id, onClose }: { id: string; onClose: () => void }) {
  const { can } = useAuth();
  const [account, setAccount] = useState<BankAccountItem | null>(null);
  const [lines, setLines] = useState<RegisterLine[]>([]);
  const [loading, setLoading] = useState(true);
  const [fullNumber, setFullNumber] = useState<string | null>(null);

  useEffect(() => {
    financeApi
      .getBankAccountDetail(id)
      .then((res) => {
        setAccount(res.data);
        setLines(res.register);
      })
      .catch((err) => toast.error(err.message || "Failed to load the register"))
      .finally(() => setLoading(false));
  }, [id]);

  const reveal = async () => {
    if (fullNumber) return setFullNumber(null);
    try {
      const res = await financeApi.revealBankAccountNumber(id);
      setFullNumber(res.accountNumber || "Not recorded");
    } catch (err: any) {
      toast.error(err.message || "Not allowed");
    }
  };

  return (
    <Modal title={account ? `${account.bankName} — register` : "Account register"} subtitle={account ? `Ledger ${account.ledgerAccountCode}` : ""} onClose={onClose} wide>
      {loading || !account ? (
        <div className="py-12 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div>
              <p className="text-[10px] text-slate-400">Account number</p>
              <p className="font-mono font-bold text-slate-800 flex items-center gap-1">
                {fullNumber || account.accountNumberMasked}
                {can("finance.bank_account:view_pii") && (
                  <button onClick={reveal} title={fullNumber ? "Hide" : "Show full number (logged)"} className="text-slate-400 hover:text-blue-700 cursor-pointer">
                    {fullNumber ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                )}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">IFSC</p>
              <p className="font-mono font-bold text-slate-800">{account.ifsc}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Opening balance</p>
              <p className="font-bold text-slate-800">
                {formatPaise(account.openingBalancePaise)} on {formatDate(account.openingDate)}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Current balance</p>
              <p className={`font-black text-base ${account.balancePaise < 0 ? "text-rose-600" : "text-blue-700"}`}>{formatPaise(account.balancePaise)}</p>
            </div>
          </div>
          <RegisterTable lines={lines} />
        </div>
      )}
    </Modal>
  );
}
