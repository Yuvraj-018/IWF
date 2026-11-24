import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import { financeApi, type BankAccountItem, type CashAccountItem, type RegisterLine } from "../../services/financeApi";

/** ₹ from paise, Indian grouping, paise shown only when present. */
export function formatPaise(paise: number | undefined | null, opts: { sign?: boolean } = {}): string {
  const v = Number(paise || 0) / 100;
  const abs = Math.abs(v);
  const text = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: abs % 1 ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(abs);
  if (v < 0) return `−${text}`;
  return opts.sign && v > 0 ? `+${text}` : text;
}

export function formatDate(d?: string | Date | null): string {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
}

/** Today in IST as yyyy-mm-dd for <input type="date">. */
export function todayIst(): string {
  return new Date(Date.now() + 330 * 60 * 1000).toISOString().split("T")[0];
}

/** Indian financial year of a date (April–March), in IST. */
export function currentFy(date = new Date()): string {
  const ist = new Date(date.getTime() + 330 * 60 * 1000);
  const start = ist.getUTCMonth() >= 3 ? ist.getUTCFullYear() : ist.getUTCFullYear() - 1;
  return `${start}-${String(start + 1).slice(-2)}`;
}

export function fyOptions(count = 4): string[] {
  const now = currentFy();
  const start = Number(now.slice(0, 4));
  return Array.from({ length: count }, (_, i) => `${start - i}-${String(start - i + 1).slice(-2)}`);
}

export const inputClass =
  "w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-[#f97316] focus:outline-none disabled:bg-slate-100 disabled:text-slate-500";
export const labelClass = "text-[11px] font-bold text-slate-700";
export const primaryButton =
  "px-5 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs disabled:opacity-60 cursor-pointer";
export const secondaryButton =
  "px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer";

export function PageHeader({
  title,
  icon,
  description,
  actions,
}: {
  title: string;
  icon: ReactNode;
  description: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
          <Link to="/finance/overview" className="hover:text-blue-700 transition">
            Donations &amp; Finance
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-bold">{title}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      {actions && <div className="flex items-center gap-2 flex-wrap">{actions}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "slate",
  to,
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "slate" | "blue" | "emerald" | "orange" | "rose" | "amber";
  to?: string;
}) {
  const color = {
    slate: "text-slate-900",
    blue: "text-blue-700",
    emerald: "text-emerald-700",
    orange: "text-orange-600",
    rose: "text-rose-600",
    amber: "text-amber-600",
  }[tone];
  const body = (
    <>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <h3 className={`text-xl font-black mt-1 ${color}`}>{value}</h3>
      {hint && <p className="text-[10px] text-slate-400 mt-0.5">{hint}</p>}
    </>
  );
  const cls = "block bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs";
  return to ? (
    <Link to={to} className={`${cls} hover:shadow-xs hover:border-slate-300 transition`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function Modal({
  title,
  subtitle,
  onClose,
  children,
  wide = false,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl ${wide ? "max-w-3xl" : "max-w-md"} w-full p-6 border border-slate-200 animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[10px] text-rose-600 font-semibold mt-1">{message}</p>;
}

export function StatusPill({ status }: { status: string }) {
  const cls =
    {
      active: "bg-emerald-50 text-emerald-700",
      posted: "bg-emerald-50 text-emerald-700",
      approved: "bg-emerald-50 text-emerald-700",
      pending: "bg-amber-50 text-amber-700",
      inactive: "bg-slate-100 text-slate-600",
      reversed: "bg-slate-100 text-slate-600",
      closed: "bg-slate-100 text-slate-500",
      rejected: "bg-rose-50 text-rose-700",
    }[status] || "bg-slate-100 text-slate-600";
  return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${cls}`}>{status}</span>;
}

export function LoadingRow({ colSpan, text = "Loading…" }: { colSpan: number; text?: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 text-center text-slate-400">
        <Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600 mb-2" />
        <p className="text-xs font-semibold">{text}</p>
      </td>
    </tr>
  );
}

export function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-12 text-center text-xs text-slate-400 font-medium">
        {text}
      </td>
    </tr>
  );
}

/** Active bank and cash accounts, loaded once per picker. */
export function useFinanceAccounts() {
  const [banks, setBanks] = useState<BankAccountItem[]>([]);
  const [cashes, setCashes] = useState<CashAccountItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    Promise.allSettled([financeApi.getBankAccountRegister(), financeApi.getCashAccounts()]).then(([b, c]) => {
      if (!alive) return;
      if (b.status === "fulfilled") setBanks(b.value.data.filter((a) => a.status === "active"));
      if (c.status === "fulfilled") setCashes(c.value.data.filter((a) => a.status === "active"));
      if (b.status === "rejected" && c.status === "rejected") setError("Could not load ISLAH's bank and cash accounts.");
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, []);
  return { banks, cashes, loading, error };
}

export type AccountChoice = { kind: "bank" | "cash"; id: string } | null;

/**
 * Select for "which ISLAH account did the money go into / come out of".
 * `kinds` limits it to bank or cash accounts (e.g. a cash donation → cash only).
 */
export function AccountPicker({
  value,
  onChange,
  kinds = ["bank", "cash"],
  label = "Account",
  required = true,
  error,
  showBalance = true,
}: {
  value: AccountChoice;
  onChange: (v: AccountChoice) => void;
  kinds?: ("bank" | "cash")[];
  label?: string;
  required?: boolean;
  error?: string;
  showBalance?: boolean;
}) {
  const { banks, cashes, loading, error: loadError } = useFinanceAccounts();
  const options = [
    ...(kinds.includes("bank")
      ? banks.map((b) => ({
          key: `bank:${b._id}`,
          label: `${b.bankName} ${b.accountNumberMasked}${b.isPrimary ? " (primary)" : ""}`,
          balance: b.balancePaise,
        }))
      : []),
    ...(kinds.includes("cash")
      ? cashes.map((c) => ({ key: `cash:${c._id}`, label: `Cash — ${c.name} (${c.custodianName})`, balance: c.balancePaise }))
      : []),
  ];
  const current = value ? `${value.kind}:${value.id}` : "";
  const noAccounts = !loading && options.length === 0;
  return (
    <div>
      <label className={labelClass}>
        {label}
        {required && " *"}
      </label>
      <select
        value={current}
        disabled={loading || noAccounts}
        onChange={(e) => {
          const [kind, id] = e.target.value.split(":");
          onChange(id ? { kind: kind as "bank" | "cash", id } : null);
        }}
        className={inputClass}
      >
        <option value="">{loading ? "Loading accounts…" : noAccounts ? "No active account yet" : "Select account"}</option>
        {kinds.includes("bank") && banks.length > 0 && (
          <optgroup label="Bank accounts">
            {options
              .filter((o) => o.key.startsWith("bank:"))
              .map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                  {showBalance ? ` — ${formatPaise(o.balance)}` : ""}
                </option>
              ))}
          </optgroup>
        )}
        {kinds.includes("cash") && cashes.length > 0 && (
          <optgroup label="Cash accounts">
            {options
              .filter((o) => o.key.startsWith("cash:"))
              .map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                  {showBalance ? ` — ${formatPaise(o.balance)}` : ""}
                </option>
              ))}
          </optgroup>
        )}
      </select>
      {noAccounts && (
        <p className="text-[10px] text-amber-700 font-semibold mt-1">
          {loadError ||
            `Add ${kinds.length === 1 ? `a ${kinds[0]}` : "a bank or cash"} account under Finance → ${kinds.includes("bank") ? "Bank Accounts" : "Cash Accounts"} first.`}
        </p>
      )}
      <FieldError message={error} />
    </div>
  );
}

export const SOURCE_LABEL: Record<string, string> = {
  donation: "Donation",
  membership: "Membership fee",
  expense: "Expense payment",
  refund: "Refund",
  transfer: "Transfer",
  settlement: "Gateway settlement",
  opening_balance: "Opening balance",
  reversal: "Reversal",
  manual: "Manual journal",
};

export const TRANSFER_LABEL: Record<string, string> = {
  withdrawal: "Cash withdrawal (bank → cash)",
  deposit: "Cash deposit (cash → bank)",
  bank_transfer: "Bank to bank transfer",
  cash_transfer: "Cash to cash handover",
};

/** Ledger lines of one bank/cash account with a running balance, newest first. */
export function RegisterTable({ lines }: { lines: RegisterLine[] }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-x-auto max-h-[55vh]">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-slate-50">
          <tr className="text-slate-500 text-[11px] uppercase tracking-wide">
            <th className="text-left py-2.5 px-3 font-bold">Date</th>
            <th className="text-left py-2.5 px-3 font-bold">Journal</th>
            <th className="text-left py-2.5 px-3 font-bold">Particulars</th>
            <th className="text-right py-2.5 px-3 font-bold">In</th>
            <th className="text-right py-2.5 px-3 font-bold">Out</th>
            <th className="text-right py-2.5 px-3 font-bold">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {lines.length === 0 ? (
            <EmptyRow colSpan={6} text="No transactions posted to this account yet." />
          ) : (
            lines.map((l) => (
              <tr key={`${l._id}-${l.debitPaise}-${l.creditPaise}`} className={l.status === "reversed" ? "text-slate-400" : ""}>
                <td className="py-2 px-3 whitespace-nowrap">{formatDate(l.date)}</td>
                <td className="py-2 px-3 font-mono whitespace-nowrap">{l.journalNo}</td>
                <td className="py-2 px-3">
                  <p className="font-semibold text-slate-700">{l.narration}</p>
                  <p className="text-[10px] text-slate-400">
                    {SOURCE_LABEL[l.sourceType] || l.sourceType}
                    {l.sourceRef ? ` · ${l.sourceRef}` : ""}
                    {l.status === "reversed" ? " · reversed" : ""}
                  </p>
                </td>
                <td className="py-2 px-3 text-right text-emerald-700 font-bold">{l.debitPaise ? formatPaise(l.debitPaise) : ""}</td>
                <td className="py-2 px-3 text-right text-rose-600 font-bold">{l.creditPaise ? formatPaise(l.creditPaise) : ""}</td>
                <td className="py-2 px-3 text-right font-black text-slate-900">{formatPaise(l.balancePaise)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
