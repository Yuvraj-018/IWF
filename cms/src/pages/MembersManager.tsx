import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Search, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function MembersManager() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const loadMembers = () => {
    setLoading(true);
    api.listMembers({ category: category || undefined, status: status || undefined, search }).then((res) => {
      if (res.success && res.data) {
        setMembers(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadMembers();
  }, [category, status, search]);

  const exportCSV = () => {
    if (members.length === 0) {
      toast.error("No member data to export.");
      return;
    }

    const headers = ["Member ID", "Full Name", "Category", "Status", "Mobile", "District", "State", "Valid Till"];
    const rows = members.map((m) => [
      m.memberNo || m.id,
      `"${m.name || m.fullName}"`,
      m.category,
      m.status,
      m.phone || m.mobile,
      `"${m.district}"`,
      `"${m.state}"`,
      m.validTill,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `islah_members_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Member registry exported to CSV!");
  };

  const getBadgeCls = (cat: string) => {
    if (cat === "Blue") return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    if (cat === "Yellow") return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    if (cat === "Green") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    return "bg-slate-800 text-slate-300";
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Members Directory &amp; Ledger</h2>
          <p className="text-xs text-slate-400 mt-1">Audit active foundation cardholders, renewal deadlines, and public profiles</p>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition cursor-pointer"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
          >
            <option value="">All Categories</option>
            <option value="Blue">Blue Card (₹500)</option>
            <option value="Yellow">Yellow Card (₹1,000)</option>
            <option value="Green">Green Card (₹2,500)</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-emerald-500"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Member ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            <p className="text-xs">Loading member database...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="p-16 text-center text-slate-500 text-xs">
            No member records found matching criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider font-extrabold">
                <tr>
                  <th className="p-3.5 pl-5">Member ID</th>
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Card Tier</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Contact</th>
                  <th className="p-3.5 pr-5">Valid Till</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-medium">
                {members.map((m) => (
                  <tr key={m.memberNo || m.id || m._id} className="hover:bg-slate-800/40 transition">
                    <td className="p-3.5 pl-5 font-mono text-emerald-400 font-bold">{m.memberNo || m.id}</td>
                    <td className="p-3.5 font-bold text-white">{m.name || m.fullName}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${getBadgeCls(m.category)}`}>
                        {m.category}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === "Active" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {m.status || "Active"}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-300">{m.district}, {m.state}</td>
                    <td className="p-3.5 text-slate-400 font-mono">{m.phone || m.mobile || "Private"}</td>
                    <td className="p-3.5 pr-5 text-slate-400 font-mono">{m.validTill || "2027-01-01"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

