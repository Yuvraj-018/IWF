import { useState, useEffect } from "react";
import {
  Shield,
  FileText,
  FileCheck2,
  CheckCircle2,
  ExternalLink,
  Download,
  Eye,
  EyeOff,
  Plus,
  X,
  Building,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../services/api";
import { financeApi } from "../../services/financeApi";

export interface StatutoryDoc {
  id: string;
  regNumber: string;
  authority: string;
  validity: string;
  docTitle: string;
  status: "Verified & Active";
}

export default function GovernanceConsole() {
  const [activeTab, setActiveTab] = useState<"statutory" | "transparency" | "resolutions">("statutory");
  const [snapshots, setSnapshots] = useState<any[]>([]);
  const [loadingSnapshots, setLoadingSnapshots] = useState(false);
  const [docs, setDocs] = useState<StatutoryDoc[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    loadSnapshots();
    setLoadingDocs(true);
    api
      .getSettings({ force: true })
      .then((res) => {
        if (res?.success && res.data?.statutory_documents) {
          setDocs(res.data.statutory_documents);
        }
        setLoadingDocs(false);
      })
      .catch(() => {
        setLoadingDocs(false);
      });
  }, []);

  const loadSnapshots = async () => {
    setLoadingSnapshots(true);
    try {
      const res = await financeApi.getTransparencySnapshots();
      if (res?.success && res.data) {
        setSnapshots(res.data);
      }
    } catch {
      // Fallback empty if backend has none yet
      setSnapshots([]);
    } finally {
      setLoadingSnapshots(false);
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      const res = await financeApi.toggleSnapshotPublish(id);
      if (res?.success) {
        toast.success("Snapshot public visibility toggled.");
        loadSnapshots();
      } else {
        toast.error("Failed to update status.");
      }
    } catch {
      toast.error("Server error updating snapshot.");
    }
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 font-sans select-none">
      {/* ── BANNER ── */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <Shield className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Governance, Filings &amp; Statutory Compliance
              </h1>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Compliant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Statutory foundation registrations, board resolutions archive, and public transparency disclosures.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/publications"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#071527] hover:bg-[#0c2444] text-white text-xs font-bold transition shadow-xs"
          >
            <FileText className="w-4 h-4 text-[#f97316]" />
            <span>Annual Reports Manager</span>
          </a>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("statutory")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "statutory"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Statutory Registrations ({docs.length})
        </button>
        <button
          onClick={() => setActiveTab("transparency")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "transparency"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Public Transparency Snapshots ({snapshots.length})
        </button>
        <button
          onClick={() => setActiveTab("resolutions")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "resolutions"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Board Resolutions &amp; Trust Deed
        </button>
      </div>

      {/* ── TAB 1: STATUTORY REGISTRATIONS ── */}
      {activeTab === "statutory" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#071527]">Legal Non-Profit Credentials</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Official registration identifiers recognized by the Income Tax Department and Ministry of Corporate Affairs.
            </p>
          </div>

          {loadingDocs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50 animate-pulse h-32" />
              ))}
            </div>
          ) : docs.length === 0 ? (
            <div className="p-10 text-center text-slate-400 text-xs">
              No statutory registration records configured yet in system settings.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition space-y-3 shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#071527] text-white">
                        {doc.id}
                      </span>
                      <h4 className="text-sm font-bold text-[#071527] mt-1.5">{doc.docTitle}</h4>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Registration No:</span>
                      <span className="font-mono font-bold text-[#071527]">{doc.regNumber}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Authority:</span>
                      <span className="text-slate-800 text-[11px] truncate max-w-[200px]">{doc.authority}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Validity:</span>
                      <span className="text-emerald-700 font-semibold text-[11px]">{doc.validity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: PUBLIC TRANSPARENCY SNAPSHOTS ── */}
      {activeTab === "transparency" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#071527]">Public Financial Transparency Snapshots</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Financial statement summaries published directly to the public website's transparency page (`/transparency`).
              </p>
            </div>
            <a
              href="/finance/reports"
              className="px-3.5 py-2 rounded-xl bg-[#f97316] text-white text-xs font-bold hover:bg-[#ea580c] transition"
            >
              Generate New Snapshot
            </a>
          </div>

          {snapshots.length === 0 ? (
            <div className="p-12 text-center text-slate-500 rounded-xl border border-dashed border-slate-200 text-xs">
              No transparency snapshots published yet. Generate a fiscal year summary from Financial Reports.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {snapshots.map((s) => (
                <div key={s._id} className="py-4 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-[#071527]">{s.title || `FY ${s.fy} Financial Summary`}</h4>
                    <p className="text-[11px] text-slate-500">
                      Total Income: ₹{s.totalIncome?.toLocaleString("en-IN")} • Total Spent: ₹{s.totalExpenditure?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => handleTogglePublish(s._id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      s.isPublished
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    {s.isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{s.isPublished ? "Live on Website" : "Hidden / Draft"}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: RESOLUTIONS & TRUST DEED ── */}
      {activeTab === "resolutions" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#071527]">Trust Deed &amp; Board Meeting Resolutions</h3>
          <p className="text-xs text-slate-500">
            Official non-profit deed of trust executed in Darbhanga, Bihar, along with ratified trustee meeting minutes.
          </p>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#071527]">Registered Trust Deed of ISLAH Welfare Foundation</span>
              <span className="text-[11px] text-emerald-700 font-bold">Executed &amp; Registered</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Registered with the Sub-Registrar, Darbhanga. Establishes foundation bylaws, irrevocable charitable trust status, and 8 core social operational objectives.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

