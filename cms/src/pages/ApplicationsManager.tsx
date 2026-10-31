import { useState, useEffect } from "react";
import { api } from "../services/api";
import { Download, Loader2, Mail, Phone, Calendar, UserCheck } from "lucide-react";
import { toast } from "sonner";

export default function ApplicationsManager() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("");

  const loadApps = () => {
    setLoading(true);
    api.listApplications(selectedType || undefined).then((res) => {
      if (res.success && res.data) {
        setApps(res.data);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    loadApps();
  }, [selectedType]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await api.updateApplicationStatus(id, newStatus);
      if (res.success) {
        toast.success(`Status updated to ${newStatus}`);
        setApps(apps.map((a) => (a._id === id ? { ...a, status: newStatus } : a)));
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Inbound Applications &amp; Resumes</h2>
          <p className="text-xs text-slate-400 mt-1">Review candidates for Volunteer, Career, Partner, Sponsor, and Mentor roles</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "", label: "All Submissions" },
          { id: "volunteer", label: "Volunteers" },
          { id: "career", label: "Careers & Jobs" },
          { id: "partner", label: "Partners & CSR" },
          { id: "sponsor", label: "Sponsors" },
          { id: "mentor", label: "Mentors" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              selectedType === t.id
                ? "bg-emerald-600 text-white"
                : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Cards list */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs">Loading applications...</p>
        </div>
      ) : apps.length === 0 ? (
        <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
          No applications found in this category.
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((item) => (
            <div
              key={item._id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-slate-700 transition"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">{item.applicationId || item._id}</span>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{item.fullName}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <a href={`mailto:${item.email}`} className="hover:text-emerald-400">{item.email}</a>
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.countryCode || "+91"} {item.phone}</span>
                  </span>
                  {item.city && <span>📍 {item.city}, {item.state || ""}</span>}
                </div>

                {item.message && (
                  <p className="text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 mt-2 line-clamp-2">
                    "{item.message}"
                  </p>
                )}

                {/* CV File Attachment */}
                {item.formData?.cvFileUrl && (
                  <div className="pt-1">
                    <a
                      href={item.formData.cvFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Applicant Resume ({item.formData.cvFileName || "CV.pdf"})</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Status Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <select
                  value={item.status || "Pending"}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                  className="p-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-bold outline-none"
                >
                  <option value="Pending">Pending</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Approved">Approved</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

