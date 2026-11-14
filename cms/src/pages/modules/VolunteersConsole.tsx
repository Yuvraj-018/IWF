import { useState, useEffect } from "react";
import {
  HeartHandshake,
  Plus,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  X,
  FileCheck2,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../services/api";

export interface VolunteerTask {
  id: string;
  title: string;
  sector: string;
  location: string;
  volunteersRequired: number;
  assignedCount: number;
  targetDate: string;
  leadCoordinator: string;
  status: "Active" | "Upcoming" | "Completed";
}

export default function VolunteersConsole() {
  const [tasks, setTasks] = useState<VolunteerTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeVolunteerCount, setActiveVolunteerCount] = useState<number>(0);

  // New task form state
  const [title, setTitle] = useState("");
  const [sector, setSector] = useState("Education & Learning");
  const [location, setLocation] = useState("Darbhanga, Bihar");
  const [volunteersRequired, setVolunteersRequired] = useState("5");
  const [leadCoordinator, setLeadCoordinator] = useState("");
  const [targetDate, setTargetDate] = useState("");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [applicationsRes, tasksRes] = await Promise.all([
          api.listApplications("volunteer"),
          api.listVolunteerTasks(),
        ]);
        if (applicationsRes?.success && applicationsRes.data) {
          setActiveVolunteerCount(applicationsRes.data.length);
        }
        if (tasksRes?.success && Array.isArray(tasksRes.data)) {
          setTasks(tasksRes.data.map((task: any) => ({ ...task, id: task._id || task.id })));
        }
      } catch (error: any) {
        toast.error(error.message || "Failed to load volunteer assignments.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please provide assignment title.");
      return;
    }

    try {
      const res = await api.createVolunteerTask({
        title: title.trim(),
        sector,
        location: location.trim() || "Darbhanga",
        volunteersRequired: Number(volunteersRequired) || 4,
        assignedCount: 0,
        targetDate: targetDate || new Date().toISOString().split("T")[0],
        leadCoordinator: leadCoordinator.trim() || "Field Officer",
        status: "Upcoming",
      });
      if (!res.success || !res.data) {
        toast.error(res.message || "Failed to create assignment.");
        return;
      }
      setTasks((current) => [{ ...res.data, id: res.data._id || res.data.id }, ...current]);
      toast.success("Field assignment published to volunteer network.");
      setIsModalOpen(false);
      setTitle("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create assignment.");
    }
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSector = sectorFilter === "all" || t.sector === sectorFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.location.toLowerCase().includes(search.toLowerCase()) ||
      t.leadCoordinator.toLowerCase().includes(search.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 font-sans select-none">
      {/* ── BANNER ── */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <HeartHandshake className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Volunteers &amp; Field Assignments
              </h1>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Network Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Field duty coordination, skill matching, and grassroots service mobilization.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Field Assignment</span>
        </button>
      </div>

      {/* ── METRICS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Registered Volunteers</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{activeVolunteerCount} In Database</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Sourced from real applications</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Active Assignments</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">
              {tasks.filter((t) => t.status === "Active").length} Ongoing
            </p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Field operations in progress</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Assignments</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-20 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{tasks.length} Scheduled</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Total field tasks logged</p>
        </div>
      </div>

      {/* ── FILTER & SEARCH ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assignments, location, lead..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-[#f97316]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none focus:border-[#f97316] cursor-pointer"
          >
            <option value="all">All Sectors</option>
            <option value="Education & Learning">Education</option>
            <option value="Healthcare & Well-being">Healthcare</option>
            <option value="Emergency Relief">Emergency Relief</option>
            <option value="Environment & Sustainability">Environment</option>
            <option value="Women & Youth Empowerment">Women &amp; Youth</option>
          </select>
        </div>
      </div>

      {/* ── ASSIGNMENTS TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        {loading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Inbox className="w-8 h-8 text-slate-300" />
            <p className="text-xs font-semibold text-slate-600">No field assignments scheduled yet.</p>
            <p className="text-[11px] text-slate-400">Click &quot;New Field Assignment&quot; to assign duties to volunteers.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Assignment Title &amp; Sector</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Volunteers Deployed</th>
                  <th className="pb-3">Lead Coordinator</th>
                  <th className="pb-3">Target Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredTasks.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4">
                      <span className="font-bold text-[#071527] block">{t.title}</span>
                      <span className="text-[11px] text-slate-500">{t.sector}</span>
                    </td>
                    <td className="py-4 text-slate-600 flex items-center gap-1.5 pt-5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t.location}</span>
                    </td>
                    <td className="py-4">
                      <span className="font-bold text-[#071527]">{t.assignedCount}</span>
                      <span className="text-slate-400"> / {t.volunteersRequired} deployed</span>
                    </td>
                    <td className="py-4 text-slate-700">{t.leadCoordinator}</td>
                    <td className="py-4 text-slate-600 font-mono text-[11px]">{t.targetDate}</td>
                    <td className="py-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          t.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : t.status === "Upcoming"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── NEW TASK MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#071527]">Schedule Field Assignment</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Eye Screening Camp Logistics"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                >
                  <option>Education &amp; Learning</option>
                  <option>Healthcare &amp; Well-being</option>
                  <option>Emergency Relief</option>
                  <option>Environment &amp; Sustainability</option>
                  <option>Women &amp; Youth Empowerment</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Volunteers Needed</label>
                  <input
                    type="number"
                    value={volunteersRequired}
                    onChange={(e) => setVolunteersRequired(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Lead Coordinator</label>
                  <input
                    type="text"
                    placeholder="Field Officer Name"
                    value={leadCoordinator}
                    onChange={(e) => setLeadCoordinator(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Date</label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
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
                  <span>Deploy Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
