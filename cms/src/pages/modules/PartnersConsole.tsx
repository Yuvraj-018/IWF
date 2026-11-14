import { useState, useEffect } from "react";
import {
  Briefcase,
  Plus,
  Building2,
  FileCheck2,
  Coins,
  Calendar,
  CheckCircle2,
  Search,
  Filter,
  X,
  ExternalLink,
  Download,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../services/api";

export interface PartnerAgreement {
  id: string;
  partnerName: string;
  partnerType: "Corporate CSR" | "Institutional NGO" | "Government / Semi-Gov" | "Philanthropic Trust";
  agreementRef: string;
  focusArea: string;
  committedGrant: number;
  signedDate: string;
  expiryDate: string;
  mouDocUrl?: string;
  status: "Active" | "Under Renewal" | "Completed";
}

export default function PartnersConsole() {
  const [agreements, setAgreements] = useState<PartnerAgreement[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inboundPartnersCount, setInboundPartnersCount] = useState<number>(0);

  // Modal form state
  const [partnerName, setPartnerName] = useState("");
  const [partnerType, setPartnerType] = useState<PartnerAgreement["partnerType"]>("Corporate CSR");
  const [agreementRef, setAgreementRef] = useState("");
  const [focusArea, setFocusArea] = useState("Education & Learning");
  const [committedGrant, setCommittedGrant] = useState("100000");
  const [signedDate, setSignedDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [applicationsRes, agreementsRes] = await Promise.all([
          api.listApplications("partner"),
          api.listPartnerAgreements(),
        ]);
        if (applicationsRes?.success && applicationsRes.data) {
          setInboundPartnersCount(applicationsRes.data.length);
        }
        if (agreementsRes?.success && Array.isArray(agreementsRes.data)) {
          setAgreements(agreementsRes.data.map((agreement: any) => ({
            ...agreement,
            id: agreement._id || agreement.id,
          })));
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load partner agreements.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateAgreement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerName.trim()) {
      toast.error("Please enter partner name.");
      return;
    }

    try {
      const res = await api.createPartnerAgreement({
        partnerName: partnerName.trim(),
        partnerType,
        agreementRef: agreementRef.trim() || `REF-${Date.now().toString().slice(-6)}`,
        focusArea,
        committedGrant: Number(committedGrant) || 0,
        signedDate: signedDate || new Date().toISOString().split("T")[0],
        expiryDate: expiryDate || "2027-03-31",
        status: "Active",
      });
      if (!res.success || !res.data) {
        toast.error(res.message || "Failed to create partner agreement.");
        return;
      }
      setAgreements((current) => [{ ...res.data, id: res.data._id || res.data.id }, ...current]);
      toast.success("Institutional agreement recorded in repository.");
      setIsModalOpen(false);
      setPartnerName("");
      setAgreementRef("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create partner agreement.");
    }
  };

  const filteredAgreements = agreements.filter((a) => {
    const matchesType = typeFilter === "all" || a.partnerType === typeFilter;
    const matchesSearch =
      a.partnerName.toLowerCase().includes(search.toLowerCase()) ||
      a.agreementRef.toLowerCase().includes(search.toLowerCase()) ||
      a.focusArea.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 font-sans select-none">
      {/* ── BANNER ── */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <Briefcase className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Partners &amp; Institutional MOUs
              </h1>
              <span className="text-[10px] font-bold bg-[#071527] text-white px-2.5 py-0.5 rounded-full">
                CSR-1 Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Institutional agreements, CSR sponsorships, funding covenants, and strategic alliances.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Agreement</span>
        </button>
      </div>

      {/* ── TOP KPI OVERVIEW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Active MOUs</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{agreements.length} Institutional</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Legally executed collaborations</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Committed CSR Grants</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-28 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">
              ₹{agreements.reduce((acc, cur) => acc + cur.committedGrant, 0).toLocaleString("en-IN")}
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">CSR funding commitment</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Inbound Partner Inquiries</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{inboundPartnersCount} Inquiries</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Proposals in Application Manager</p>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search partners, ref number, sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#f97316]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#f97316] cursor-pointer"
          >
            <option value="all">All Partner Types</option>
            <option value="Corporate CSR">Corporate CSR</option>
            <option value="Institutional NGO">Institutional NGO</option>
            <option value="Philanthropic Trust">Philanthropic Trust</option>
            <option value="Government / Semi-Gov">Government</option>
          </select>
        </div>
      </div>

      {/* ── AGREEMENTS TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        {loading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredAgreements.length === 0 ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Inbox className="w-8 h-8 text-slate-300" />
            <p className="text-xs font-semibold text-slate-600">No institutional agreements recorded yet.</p>
            <p className="text-[11px] text-slate-400">Click &quot;Register New Agreement&quot; to log an executed partnership or CSR MOU.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Partner Entity &amp; Type</th>
                  <th className="pb-3">Agreement Reference</th>
                  <th className="pb-3">Sector Focus</th>
                  <th className="pb-3">Committed Grant</th>
                  <th className="pb-3">Validity Term</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredAgreements.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4">
                      <span className="font-bold text-[#071527] block text-xs">{a.partnerName}</span>
                      <span className="text-[11px] text-slate-500">{a.partnerType}</span>
                    </td>
                    <td className="py-4 font-mono text-[11px] text-slate-700 font-bold">
                      {a.agreementRef}
                    </td>
                    <td className="py-4 text-slate-700">{a.focusArea}</td>
                    <td className="py-4 font-bold text-emerald-700">
                      ₹{a.committedGrant.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 text-slate-600 font-mono text-[11px]">
                      {a.signedDate} to {a.expiryDate}
                    </td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── NEW AGREEMENT MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#071527]">Register Institutional MOU</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAgreement} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Partner Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tata Trusts / HDFC Parivartan"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Partner Type</label>
                  <select
                    value={partnerType}
                    onChange={(e) => setPartnerType(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  >
                    <option value="Corporate CSR">Corporate CSR</option>
                    <option value="Institutional NGO">Institutional NGO</option>
                    <option value="Philanthropic Trust">Philanthropic Trust</option>
                    <option value="Government / Semi-Gov">Government</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">MOU Ref Number</label>
                  <input
                    type="text"
                    placeholder="e.g. MOU-2026-CSR-01"
                    value={agreementRef}
                    onChange={(e) => setAgreementRef(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Focus Sector</label>
                  <select
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  >
                    <option>Education &amp; Learning</option>
                    <option>Healthcare &amp; Well-being</option>
                    <option>Women &amp; Youth</option>
                    <option>Skills &amp; Livelihoods</option>
                    <option>Disaster Relief</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Grant Value (₹)</label>
                  <input
                    type="number"
                    value={committedGrant}
                    onChange={(e) => setCommittedGrant(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Signed Date</label>
                  <input
                    type="date"
                    value={signedDate}
                    onChange={(e) => setSignedDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Agreement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
