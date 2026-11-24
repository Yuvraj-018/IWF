import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Landmark, Wallet, ArrowLeftRight, BookOpen, AlertTriangle, RefreshCw, Loader2, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { financeApi, type AccountsOverview } from "../../services/financeApi";
import { useAuth } from "../../context/AuthContext";
import { PageHeader, StatCard, formatPaise, currentFy, fyOptions } from "../../components/finance/financeUi";

/**
 * Centralised Finance Overview (blueprint §1). Every figure is computed by the
 * backend from posted double-entry journals, never typed in.
 */
export default function FinanceOverview() {
  const { can } = useAuth();
  const [fy, setFy] = useState(currentFy());
  const [data, setData] = useState<AccountsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await financeApi.getAccountsOverview(fy);
      setData(res.data);
    } catch (err: any) {
      toast.error(err.message || "Failed to load the finance overview");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [fy]);

  const d = data;
  const noAccounts = d && d.bankAccounts.length === 0 && d.cashAccounts.length === 0;

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 font-sans">
      <PageHeader
        title="Finance Overview"
        icon={<LayoutDashboard className="w-6 h-6 text-blue-600" />}
        description="Live position of ISLAH's bank and cash accounts, income, spending and items waiting for action — all from posted journals."
        actions={
          <>
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
              <Calendar className="w-4 h-4 text-blue-600" />
              <select value={fy} onChange={(e) => setFy(e.target.value)} className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none">
                {fyOptions().map((f) => (
                  <option key={f} value={f}>
                    Financial Year {f}
                    {f === currentFy() ? " (current)" : ""}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={load}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-blue-700 shadow-2xs cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </>
        }
      />

      {loading && !d ? (
        <div className="py-24 text-center text-slate-400">
          <Loader2 className="w-7 h-7 animate-spin mx-auto text-blue-600 mb-2" />
          <p className="text-xs font-semibold">Loading the finance position…</p>
        </div>
      ) : !d ? (
        <div className="py-16 text-center text-xs text-slate-400">The overview could not be loaded.</div>
      ) : (
        <>
          {noAccounts && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-900">
                <p className="font-bold">No bank or cash accounts have been added yet.</p>
                <p className="mt-0.5">
                  Add ISLAH's real accounts with their opening balances so balances, payments and reconciliation work.{" "}
                  {can("finance.bank_account:edit") && (
                    <Link to="/finance/bank-accounts" className="font-bold underline">
                      Add a bank account
                    </Link>
                  )}
                </p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            <StatCard label="Total funds available" value={formatPaise(d.totalFundsAvailablePaise)} hint="All bank + cash balances" tone="blue" />
            <StatCard
              label="Bank balance"
              value={formatPaise(d.totalBankPaise)}
              hint={`${d.bankAccounts.length} active account${d.bankAccounts.length === 1 ? "" : "s"}`}
              to={can("finance.bank_account:view") ? "/finance/bank-accounts" : undefined}
            />
            <StatCard
              label="Cash in hand"
              value={formatPaise(d.totalCashPaise)}
              hint={`${d.cashAccounts.length} cash account${d.cashAccounts.length === 1 ? "" : "s"}`}
              to={can("finance.cash_account:view") ? "/finance/cash-accounts" : undefined}
            />
            <StatCard
              label="Restricted funds unspent"
              value={formatPaise(d.restrictedFundsPaise)}
              hint="Gifts for a named patient or programme"
              tone="orange"
            />
            <StatCard label={`Income, FY ${d.fy}`} value={formatPaise(d.fyIncomePaise)} hint="Donations, membership & other income received" tone="emerald" />
            <StatCard label={`Expenditure, FY ${d.fy}`} value={formatPaise(d.fyExpenditurePaise)} hint="Payments made (cash basis)" tone="rose" />
            <StatCard
              label="Outstanding commitments"
              value={formatPaise(d.outstandingCommitmentsPaise)}
              hint={`${d.outstandingCommitmentsCount} approved voucher${d.outstandingCommitmentsCount === 1 ? "" : "s"} not yet paid`}
              tone="amber"
              to={can("finance.expense:view") ? "/finance/expenses" : undefined}
            />
            <StatCard label={`Capital spending, FY ${d.fy}`} value={formatPaise(d.fyCapitalPaise)} hint="Equipment & assets bought" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
            <ActionCard
              icon={<AlertTriangle className="w-4 h-4" />}
              label="Expenses waiting for approval"
              value={String(d.pendingApprovals.expenses)}
              to="/finance/expenses"
              show={can("finance.expense:view")}
            />
            <ActionCard
              icon={<ArrowLeftRight className="w-4 h-4" />}
              label="Transfers waiting for approval"
              value={String(d.pendingApprovals.transfers)}
              to="/finance/transfers"
              show={can("finance.transfer:view")}
            />
            <ActionCard
              icon={<RefreshCw className="w-4 h-4" />}
              label="Bank lines not reconciled"
              value={String(d.unreconciledStatementLines)}
              to="/finance/reconciliation"
              show={can("finance.reconciliation:view")}
            />
            <ActionCard
              icon={<BookOpen className="w-4 h-4" />}
              label="Online receipts awaiting settlement"
              value={formatPaise(d.gatewayClearingPaise)}
              to="/finance/transfers?tab=settlements"
              show={can("finance.journal:view")}
            />
          </div>

          {d.pendingMappingPaise !== 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs text-rose-900 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <p>
                <span className="font-bold">{formatPaise(d.pendingMappingPaise)} is not linked to any bank or cash account.</span> These are
                older offline receipts or payments recorded before accounts were tracked. They sit in ledger 1900 "Pending Account
                Mapping" until your accountant reclassifies them.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BalanceList
              title="Bank accounts"
              icon={<Landmark className="w-4 h-4 text-blue-600" />}
              rows={d.bankAccounts.map((b) => ({
                id: b._id,
                name: `${b.bankName} ${b.accountNumberMasked}`,
                sub: b.isPrimary ? "Primary account" : "",
                balance: b.balancePaise,
              }))}
              to="/finance/bank-accounts"
              empty="No bank accounts added."
            />
            <BalanceList
              title="Cash accounts"
              icon={<Wallet className="w-4 h-4 text-emerald-600" />}
              rows={d.cashAccounts.map((c) => ({ id: c._id, name: c.name, sub: `Custodian: ${c.custodianName}`, balance: c.balancePaise }))}
              to="/finance/cash-accounts"
              empty="No cash accounts added."
            />
          </div>
        </>
      )}
    </div>
  );
}

function ActionCard({ icon, label, value, to, show }: { icon: React.ReactNode; label: string; value: string; to: string; show: boolean }) {
  const inner = (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-[11px] text-slate-500 font-medium">{label}</p>
        <p className="text-base font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
  const cls = "bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs";
  return show ? (
    <Link to={to} className={`${cls} hover:border-slate-300 hover:shadow-xs transition block`}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function BalanceList({
  title,
  icon,
  rows,
  to,
  empty,
}: {
  title: string;
  icon: React.ReactNode;
  rows: { id: string; name: string; sub: string; balance: number }[];
  to: string;
  empty: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          {icon}
          {title}
        </h3>
        <Link to={to} className="text-[11px] font-bold text-blue-700 hover:underline">
          Open register
        </Link>
      </div>
      {rows.length === 0 ? (
        <p className="px-5 py-8 text-center text-xs text-slate-400">{empty}</p>
      ) : (
        <ul className="divide-y divide-slate-100">
          {rows.map((r) => (
            <li key={r.id} className="px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-800">{r.name}</p>
                {r.sub && <p className="text-[10px] text-slate-400">{r.sub}</p>}
              </div>
              <p className={`text-sm font-black ${r.balance < 0 ? "text-rose-600" : "text-slate-900"}`}>{formatPaise(r.balance)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
