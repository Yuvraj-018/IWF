import { Fragment, useEffect, useState } from "react";
import { BookOpen, Search, Calendar, CheckCircle2, AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { financeApi, type JournalItem, type TrialBalance, type ChartAccountItem } from "../../services/financeApi";
import {
  PageHeader,
  StatusPill,
  LoadingRow,
  EmptyRow,
  formatPaise,
  formatDate,
  currentFy,
  fyOptions,
  inputClass,
  SOURCE_LABEL,
} from "../../components/finance/financeUi";

type Tab = "journals" | "trial" | "chart";

const GROUP_LABEL: Record<string, string> = {
  asset: "Assets",
  liability: "Liabilities",
  fund: "Funds & equity",
  income: "Income",
  expense: "Expenditure",
};

export default function JournalsManager() {
  const [tab, setTab] = useState<Tab>("journals");
  const [fy, setFy] = useState(currentFy());

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-12 font-sans">
      <PageHeader
        title="Journals & Trial Balance"
        icon={<BookOpen className="w-6 h-6 text-blue-600" />}
        description="Every posted double-entry journal. Journals cannot be edited or deleted — mistakes are corrected by a reversing entry, which stays on record."
        actions={
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <Calendar className="w-4 h-4 text-blue-600" />
            <select value={fy} onChange={(e) => setFy(e.target.value)} className="text-xs font-bold text-slate-800 bg-transparent focus:outline-none">
              {fyOptions().map((f) => (
                <option key={f} value={f}>
                  FY {f}
                </option>
              ))}
            </select>
          </div>
        }
      />

      <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 w-fit shadow-2xs">
        {(
          [
            ["journals", "Journal register"],
            ["trial", "Trial balance"],
            ["chart", "Chart of accounts"],
          ] as [Tab, string][]
        ).map(([k, label]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${tab === k ? "bg-[#f97316] text-white" : "text-slate-600 hover:bg-slate-50"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "journals" && <JournalRegister fy={fy} />}
      {tab === "trial" && <TrialBalanceView fy={fy} />}
      {tab === "chart" && <ChartView />}
    </div>
  );
}

function JournalRegister({ fy }: { fy: string }) {
  const [rows, setRows] = useState<JournalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sourceType, setSourceType] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPage(1);
  }, [fy, search, sourceType]);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      financeApi
        .getJournals({ fy, search: search.trim() || undefined, sourceType: sourceType || undefined, page, limit: 50 })
        .then((res) => {
          setRows(res.data);
          setPages(res.pagination.pages || 1);
          setTotal(res.pagination.total);
        })
        .catch((err) => toast.error(err.message || "Failed to load journals"))
        .finally(() => setLoading(false));
    }, 250);
    return () => clearTimeout(t);
  }, [fy, search, sourceType, page]);

  const toggle = (id: string) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 mt-0.5" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Journal no., receipt, expense or UTR…" className={`${inputClass} pl-9`} />
        </div>
        <select value={sourceType} onChange={(e) => setSourceType(e.target.value)} className={`${inputClass} md:w-56`}>
          <option value="">All sources</option>
          {Object.entries(SOURCE_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
              <th className="w-8" />
              <th className="text-left py-3 px-3 font-bold">Date</th>
              <th className="text-left py-3 px-3 font-bold">Journal</th>
              <th className="text-left py-3 px-3 font-bold">Narration</th>
              <th className="text-left py-3 px-3 font-bold">Source</th>
              <th className="text-right py-3 px-3 font-bold">Amount</th>
              <th className="text-left py-3 px-3 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <LoadingRow colSpan={7} text="Loading journals…" />
            ) : rows.length === 0 ? (
              <EmptyRow colSpan={7} text={`No journals in FY ${fy}.`} />
            ) : (
              rows.map((j) => (
                <Fragment key={j._id}>
                  <tr className="hover:bg-slate-50/60 cursor-pointer" onClick={() => toggle(j._id)}>
                    <td className="pl-3 text-slate-400">{open.has(j._id) ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">{formatDate(j.date)}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-slate-800 whitespace-nowrap">{j.journalNo}</td>
                    <td className="py-2.5 px-3 text-slate-700">{j.narration}</td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <p className="text-slate-700">{SOURCE_LABEL[j.sourceType] || j.sourceType}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{j.sourceRef || ""}</p>
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-slate-900">{formatPaise(j.totalPaise)}</td>
                    <td className="py-2.5 px-3">
                      <StatusPill status={j.status} />
                    </td>
                  </tr>
                  {open.has(j._id) && (
                    <tr className="bg-slate-50/60">
                      <td />
                      <td colSpan={6} className="py-2 px-3">
                        <table className="w-full text-[11px]">
                          <thead>
                            <tr className="text-slate-400">
                              <th className="text-left py-1 font-semibold">Account</th>
                              <th className="text-left py-1 font-semibold">Work area / fund</th>
                              <th className="text-right py-1 font-semibold">Debit</th>
                              <th className="text-right py-1 font-semibold">Credit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {j.lines.map((l, i) => (
                              <tr key={i}>
                                <td className="py-1 text-slate-700">
                                  <span className="font-mono text-slate-500">{l.accountCode}</span> {l.accountName}
                                  {l.memo ? <span className="text-slate-400"> — {l.memo}</span> : null}
                                </td>
                                <td className="py-1 text-slate-500">
                                  {l.workAreaId || "—"}
                                  {l.fundType === "restricted" ? " · restricted" : ""}
                                </td>
                                <td className="py-1 text-right font-bold text-slate-800">{l.debitPaise ? formatPaise(l.debitPaise) : ""}</td>
                                <td className="py-1 text-right font-bold text-slate-800">{l.creditPaise ? formatPaise(l.creditPaise) : ""}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className="text-[10px] text-slate-400 mt-1">Posted by {j.createdBy}</p>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{total} journals</span>
        <div className="flex items-center gap-2">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 cursor-pointer">
            Previous
          </button>
          <span>
            Page {page} of {pages}
          </span>
          <button disabled={page >= pages} onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded-lg border border-slate-200 disabled:opacity-40 cursor-pointer">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function TrialBalanceView({ fy }: { fy: string }) {
  const [data, setData] = useState<TrialBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [allYears, setAllYears] = useState(false);
  useEffect(() => {
    setLoading(true);
    financeApi
      .getTrialBalance(allYears ? undefined : fy)
      .then((res) => setData(res.data))
      .catch((err) => toast.error(err.message || "Failed to load the trial balance"))
      .finally(() => setLoading(false));
  }, [fy, allYears]);

  const groups = ["asset", "liability", "fund", "income", "expense"];
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
          <input type="checkbox" checked={allYears} onChange={(e) => setAllYears(e.target.checked)} className="accent-[#f97316] w-4 h-4" />
          Cumulative (all years, for closing balances)
        </label>
        {data && (
          <span className={`flex items-center gap-1 text-xs font-bold ${data.balanced ? "text-emerald-700" : "text-rose-600"}`}>
            {data.balanced ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {data.balanced ? "Debits equal credits" : "Trial balance does not agree"}
          </span>
        )}
      </div>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-bold">Code</th>
              <th className="text-left py-3 px-4 font-bold">Account</th>
              <th className="text-right py-3 px-4 font-bold">Total debits</th>
              <th className="text-right py-3 px-4 font-bold">Total credits</th>
              <th className="text-right py-3 px-4 font-bold">Debit balance</th>
              <th className="text-right py-3 px-4 font-bold">Credit balance</th>
            </tr>
          </thead>
          <tbody>
            {loading || !data ? (
              <LoadingRow colSpan={6} text="Computing trial balance…" />
            ) : data.rows.length === 0 ? (
              <EmptyRow colSpan={6} text="Nothing posted for this period." />
            ) : (
              groups.map((g) => {
                const rows = data.rows.filter((r) => r.group === g);
                if (!rows.length) return null;
                return (
                  <Fragment key={g}>
                    <tr className="bg-slate-50/70">
                      <td colSpan={6} className="py-2 px-4 text-[11px] font-black text-slate-600 uppercase tracking-wide">
                        {GROUP_LABEL[g]}
                      </td>
                    </tr>
                    {rows.map((r) => (
                      <tr key={r.code} className="border-t border-slate-100">
                        <td className="py-2 px-4 font-mono text-slate-500">{r.code}</td>
                        <td className="py-2 px-4 text-slate-800 font-semibold">{r.name}</td>
                        <td className="py-2 px-4 text-right text-slate-600">{formatPaise(r.totalDebitPaise)}</td>
                        <td className="py-2 px-4 text-right text-slate-600">{formatPaise(r.totalCreditPaise)}</td>
                        <td className="py-2 px-4 text-right font-bold text-slate-900">{r.debitBalancePaise ? formatPaise(r.debitBalancePaise) : ""}</td>
                        <td className="py-2 px-4 text-right font-bold text-slate-900">{r.creditBalancePaise ? formatPaise(r.creditBalancePaise) : ""}</td>
                      </tr>
                    ))}
                  </Fragment>
                );
              })
            )}
          </tbody>
          {data && data.rows.length > 0 && (
            <tfoot>
              <tr className="border-t-2 border-slate-300 bg-slate-50">
                <td colSpan={4} className="py-3 px-4 text-right font-black text-slate-700">
                  Total
                </td>
                <td className="py-3 px-4 text-right font-black text-slate-900">{formatPaise(data.totalDebitPaise)}</td>
                <td className="py-3 px-4 text-right font-black text-slate-900">{formatPaise(data.totalCreditPaise)}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}

function ChartView() {
  const [rows, setRows] = useState<ChartAccountItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    financeApi
      .getChartOfAccounts()
      .then((res) => setRows(res.data))
      .catch((err) => toast.error(err.message || "Failed to load the chart of accounts"))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="space-y-3">
      <p className="text-[11px] text-slate-500">
        System chart of accounts. Each bank and cash account gets its own ledger (11xx / 12xx) automatically. Final heads and their treatment should be
        approved by ISLAH's Chartered Accountant.
      </p>
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-[11px] uppercase tracking-wide">
              <th className="text-left py-3 px-4 font-bold">Code</th>
              <th className="text-left py-3 px-4 font-bold">Account</th>
              <th className="text-left py-3 px-4 font-bold">Group</th>
              <th className="text-left py-3 px-4 font-bold">Short code</th>
              <th className="text-right py-3 px-4 font-bold">Balance (Dr + / Cr −)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <LoadingRow colSpan={5} text="Loading chart of accounts…" />
            ) : (
              rows.map((a) => (
                <tr key={a.code} className={a.isHeader ? "bg-slate-50/70" : ""}>
                  <td className="py-2 px-4 font-mono text-slate-500">{a.code}</td>
                  <td className={`py-2 px-4 ${a.isHeader ? "font-black text-slate-700" : "text-slate-800 pl-8"}`}>
                    {a.name}
                    {a.description && <p className="text-[10px] text-slate-400 font-normal">{a.description}</p>}
                  </td>
                  <td className="py-2 px-4 text-slate-500">{GROUP_LABEL[a.group]}</td>
                  <td className="py-2 px-4 font-mono text-slate-500">{a.shortCode || ""}</td>
                  <td className="py-2 px-4 text-right font-bold text-slate-900">{a.isHeader ? "" : formatPaise(a.balancePaise)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
