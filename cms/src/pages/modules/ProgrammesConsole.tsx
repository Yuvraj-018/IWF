import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Award,
  Plus,
  Users,
  Calendar,
  Coins,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  X,
  FileText,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../services/api";
import { financeApi } from "../../services/financeApi";

export interface InitiativeItem {
  id: string;
  title: string;
  sector: string;
  sectorCode: string;
  targetBeneficiaries: number;
  allocatedBudget: number;
  leadOfficer: string;
  status: "Active" | "Upcoming" | "Completed";
  progressPct: number;
}

export default function ProgrammesConsole({ initialTab }: { initialTab?: "initiatives" | "activities" | "beneficiaries" }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"initiatives" | "activities" | "beneficiaries">(
    initialTab || "initiatives"
  );
  const [initiatives, setInitiatives] = useState<InitiativeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientCount, setPatientCount] = useState<number>(0);
  const [memberCount, setMemberCount] = useState<number>(0);

  // New Initiative Form State
  const [newTitle, setNewTitle] = useState("");
  const [newSector, setNewSector] = useState("Education & Learning");
  const [newBeneficiaries, setNewBeneficiaries] = useState("100");
  const [newBudget, setNewBudget] = useState("50000");
  const [newLead, setNewLead] = useState("");

  useEffect(() => {
    if (location.pathname.includes("/activities")) {
      setActiveTab("activities");
    } else if (location.pathname.includes("/beneficiaries")) {
      setActiveTab("beneficiaries");
    } else if (location.pathname.includes("/initiatives")) {
      setActiveTab("initiatives");
    } else if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [location.pathname, initialTab]);

  useEffect(() => {
    setLoading(true);
    Promise.all([api.getDashboardStats(), api.listInitiatives()])
      .then(([stats, initiativesRes]) => {
        setPatientCount(stats?.totalPatients || 0);
        setMemberCount(stats?.totalMembers || 0);
        if (initiativesRes?.success && Array.isArray(initiativesRes.data)) {
          setInitiatives(initiativesRes.data);
        }
      })
      .catch((error) => {
        toast.error(error.message || "Failed to load programme initiatives.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddInitiative = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Please enter initiative title.");
      return;
    }

    const sectorCodeMap: Record<string, string> = {
      "Education & Learning": "EDU",
      "Healthcare & Well-being": "HLT",
      "Women & Youth Empowerment": "WMN",
      "Skills & Livelihoods": "SKL",
      "Social Justice & Legal Empowerment": "JST",
      "Agriculture & Rural Livelihoods": "AGR",
      "Environment & Sustainability": "ENV",
      "Humanitarian Relief & Rehabilitation": "RLF",
    };

    try {
      const res = await api.createInitiative({
        title: newTitle.trim(),
        sector: newSector,
        sectorCode: sectorCodeMap[newSector] || "GEN",
        targetBeneficiaries: Number(newBeneficiaries) || 0,
        allocatedBudget: Number(newBudget) || 0,
        leadOfficer: newLead.trim() || "Field Officer",
      });
      if (!res.success || !res.data) {
        toast.error(res.message || "Failed to create initiative.");
        return;
      }
      setInitiatives((current) => [res.data, ...current]);
      toast.success("Initiative registered in the central database.");
      setIsModalOpen(false);
      setNewTitle("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create initiative.");
    }
  };

  const filteredInitiatives = initiatives.filter((init) => {
    const matchesSector = selectedSector === "all" || init.sectorCode === selectedSector;
    const matchesSearch =
      init.title.toLowerCase().includes(search.toLowerCase()) ||
      init.leadOfficer.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 font-sans select-none">
      {/* ── HEADER BANNER ── */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <Award className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Programmes &amp; Initiatives Console
              </h1>
              <span className="text-[10px] font-bold bg-[#f97316]/10 text-[#ea580c] px-2.5 py-0.5 rounded-full border border-[#f97316]/20 uppercase">
                8 Master Sectors
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Field initiatives, active community projects, and verified beneficiary distribution.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Initiative</span>
        </button>
      </div>

      {/* ── TOP KPI OVERVIEW ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Active Initiatives</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
              <Award className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-16 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{initiatives.length}</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Covering 8 Core Sectors</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Medical Patients</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{patientCount} Patients</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Direct healthcare beneficiaries</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Program Budget</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">
              ₹{initiatives.reduce((acc, cur) => acc + cur.allocatedBudget, 0).toLocaleString("en-IN")}
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Allocated across active initiatives</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Community Network</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{memberCount} Verified</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Registered foundation members</p>
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("initiatives")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "initiatives"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Master Initiatives ({initiatives.length})
        </button>
        <button
          onClick={() => setActiveTab("activities")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "activities"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Grassroots Field Activities
        </button>
        <button
          onClick={() => setActiveTab("beneficiaries")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
            activeTab === "beneficiaries"
              ? "bg-[#071527] text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          Beneficiary Distribution
        </button>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search initiatives, lead officer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#f97316]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#f97316] cursor-pointer"
          >
            <option value="all">All 8 Sectors</option>
            <option value="EDU">Education (EDU)</option>
            <option value="HLT">Healthcare (HLT)</option>
            <option value="WMN">Women &amp; Youth (WMN)</option>
            <option value="SKL">Skills &amp; Livelihoods (SKL)</option>
            <option value="AGR">Agriculture (AGR)</option>
            <option value="ENV">Environment (ENV)</option>
            <option value="RLF">Relief (RLF)</option>
            <option value="JST">Social Justice (JST)</option>
          </select>
        </div>
      </div>

      {/* ── INITIATIVES TABLE ── */}
      {activeTab === "initiatives" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          {loading ? (
            <div className="space-y-3 py-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : filteredInitiatives.length === 0 ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
              <Inbox className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-semibold text-slate-600">No sector initiatives registered yet.</p>
              <p className="text-[11px] text-slate-400">Click &quot;Add New Initiative&quot; to configure a project under a master sector.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="pb-3">Initiative Title &amp; Sector</th>
                    <th className="pb-3">Code</th>
                    <th className="pb-3">Target Beneficiaries</th>
                    <th className="pb-3">Budget Allocated</th>
                    <th className="pb-3">Lead Officer</th>
                    <th className="pb-3">Progress</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredInitiatives.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition">
                      <td className="py-4">
                        <span className="font-bold text-[#071527] block text-xs">{item.title}</span>
                        <span className="text-[11px] text-slate-500">{item.sector}</span>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-bold border border-slate-200">
                          {item.sectorCode}
                        </span>
                      </td>
                      <td className="py-4 font-bold text-slate-800">
                        {item.targetBeneficiaries.toLocaleString("en-IN")} people
                      </td>
                      <td className="py-4 font-bold text-emerald-700">
                        ₹{item.allocatedBudget.toLocaleString("en-IN")}
                      </td>
                      <td className="py-4 text-slate-600">{item.leadOfficer}</td>
                      <td className="py-4">
                        <div className="w-28 space-y-1">
                          <div className="flex justify-between text-[10px] font-bold text-slate-500">
                            <span>{item.progressPct}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#f97316] rounded-full"
                              style={{ width: `${item.progressPct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── ACTIVITIES TAB ── */}
      {activeTab === "activities" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#071527]">Grassroots Field Drives &amp; Medical Camps</h3>
          <p className="text-xs text-slate-500">
            Field assignments and deployment schedules are managed under the Volunteers console (`/volunteers/activities`).
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#071527]">Field Duty &amp; Volunteer Activities</p>
              <p className="text-[11px] text-slate-500">Schedule volunteer assignments and field drives</p>
            </div>
            <a
              href="/volunteers/activities"
              className="px-3.5 py-1.5 rounded-xl bg-[#071527] text-white text-xs font-bold hover:bg-[#0c2444] transition inline-flex items-center gap-1.5"
            >
              <span>Open Field Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ── BENEFICIARIES TAB ── */}
      {activeTab === "beneficiaries" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#071527]">Beneficiary Records &amp; Social Tracking</h3>
          <p className="text-xs text-slate-500">
            Real patient assistance files are maintained in the Medical Cases manager (`/patients`), and community membership is tracked in (`/members`).
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#071527]">Medical Beneficiaries Registry</p>
              <p className="text-[11px] text-slate-500">View and approve critical patient support requests</p>
            </div>
            <a
              href="/patients"
              className="px-3.5 py-1.5 rounded-xl bg-[#071527] text-white text-xs font-bold hover:bg-[#0c2444] transition inline-flex items-center gap-1.5"
            >
              <span>Open Medical Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* ── NEW INITIATIVE MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#071527]">Register New Initiative</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddInitiative} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Target Master Sector</label>
                <select
                  value={newSector}
                  onChange={(e) => setNewSector(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                >
                  <option>Education &amp; Learning</option>
                  <option>Healthcare &amp; Well-being</option>
                  <option>Women &amp; Youth Empowerment</option>
                  <option>Skills &amp; Livelihoods</option>
                  <option>Social Justice &amp; Legal Empowerment</option>
                  <option>Agriculture &amp; Rural Livelihoods</option>
                  <option>Environment &amp; Sustainability</option>
                  <option>Humanitarian Relief &amp; Rehabilitation</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Initiative Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rural Primary Education Kit Distribution"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Beneficiaries</label>
                  <input
                    type="number"
                    value={newBeneficiaries}
                    onChange={(e) => setNewBeneficiaries(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Budget Allocation (₹)</label>
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Lead Officer / Committee</label>
                <input
                  type="text"
                  value={newLead}
                  onChange={(e) => setNewLead(e.target.value)}
                  placeholder="e.g. Program Coordinator"
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                />
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
                  <span>Save Initiative</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
