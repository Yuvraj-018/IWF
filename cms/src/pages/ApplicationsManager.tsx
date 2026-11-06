import { useState, useEffect } from "react";
import { api } from "../services/api";
import {
  Download,
  Loader2,
  Mail,
  Phone,
  Calendar,
  RefreshCw,
  FileCheck,
  MessageSquare,
  ShieldAlert,
  ExternalLink,
  Receipt,
  User,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

export default function ApplicationsManager() {
  const [apps, setApps] = useState<any[]>([]);
  const [taxRequests, setTaxRequests] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  const loadData = async (force = false) => {
    setLoading(true);
    try {
      if (activeTab === "tax_exemption") {
        const res = await api.listTaxExemptions({}, { force });
        if (res.success && res.data) {
          setTaxRequests(res.data);
        }
      } else if (activeTab === "contact_inquiries") {
        const res = await api.listContacts({}, { force });
        if (res.success && res.data) {
          setContacts(res.data);
        }
      } else {
        const typeFilter = activeTab === "all" ? undefined : activeTab;
        const res = await api.listApplications(typeFilter, { force });
        if (res.success && res.data) {
          setApps(res.data);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(false);
  }, [activeTab]);

  const handleApplicationStatus = async (id: string, newStatus: string) => {
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

  const handleContactStatus = async (id: string, newStatus: string) => {
    try {
      const res = await api.updateContactStatus(id, newStatus);
      if (res.success) {
        toast.success(`Contact marked as ${newStatus}`);
        setContacts(contacts.map((c) => (c._id === id ? { ...c, status: newStatus } : c)));
      } else {
        toast.error(res.message || "Failed to update contact");
      }
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  // Build secure private doc link
  const getPrivateDocLink = (fileUrlOrKey: string) => {
    if (!fileUrlOrKey) return "#";
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const token = localStorage.getItem("islah_admin_token");
    // If it's a key or relative url
    const cleanKey = fileUrlOrKey.startsWith("http")
      ? fileUrlOrKey.split(".dev/")[1] || fileUrlOrKey
      : fileUrlOrKey;
    return `${API_BASE_URL}/upload/private?key=${encodeURIComponent(cleanKey)}&token=${token || ""}`;
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white">Inbound Applications &amp; Forms Hub</h2>
          <p className="text-xs text-slate-400 mt-1">
            Review Volunteer, Career, Partner, Sponsor, Tax Exemption (80G), and Contact enquiries
          </p>
        </div>
        <button
          onClick={() => loadData(true)}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold border border-slate-700 transition cursor-pointer disabled:opacity-50"
          title="Bypass cache and sync live"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-400" : ""}`} />
          <span className="hidden sm:inline">Refresh Live</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: "all", label: "All Submissions" },
          { id: "volunteer", label: "Volunteers" },
          { id: "career", label: "Careers & Jobs" },
          { id: "partner", label: "Partners & CSR" },
          { id: "sponsor", label: "Sponsors" },
          { id: "mentor", label: "Mentors" },
          { id: "tax_exemption", label: "Tax Exemption (80G)", icon: Receipt, badgeColor: "text-amber-400" },
          { id: "contact_inquiries", label: "Contact Inquiries", icon: MessageSquare, badgeColor: "text-blue-400" },
        ].map((t) => {
          const Icon = (t as any).icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/30"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : t.badgeColor || "text-slate-400"}`} />}
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-500 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          <p className="text-xs">Fetching inbound submissions...</p>
        </div>
      ) : activeTab === "tax_exemption" ? (
        /* ── TAX EXEMPTION (80G) DONATION CLAIMS ── */
        taxRequests.length === 0 ? (
          <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
            No 80G tax exemption requests found.
          </div>
        ) : (
          <div className="space-y-4">
            {taxRequests.map((d) => (
              <div
                key={d._id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-700 transition"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Receipt className="w-3 h-3" />
                      80G Tax Exemption
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                      ₹{Number(d.amount).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">#{d.receiptNo}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{d.donorName}</span>
                    <span className="text-xs text-slate-400 font-normal">({d.donorType || "Individual"})</span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <a href={`mailto:${d.email}`} className="hover:text-amber-400">{d.email}</a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{d.countryCode || "+91"} {d.phone}</span>
                    </span>
                    {d.city && <span>📍 {d.city}, {d.state || ""}</span>}
                  </div>

                  {/* PAN Details */}
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <div className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                      <span>PAN: {d.pan || "Not Provided"}</span>
                    </div>

                    {d.panFileUrl && (
                      <a
                        href={getPrivateDocLink(d.panFileUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-bold transition border border-amber-500/20"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>View / Download PAN Card (Secure)</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-bold ${
                      d.paymentStatus === "Success"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : d.paymentStatus === "Failed"
                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                        : "bg-slate-800 text-slate-300"
                    }`}
                  >
                    Payment: {d.paymentStatus}
                  </span>
                  <span className="text-[11px] text-slate-500">{d.financialType}</span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : activeTab === "contact_inquiries" ? (
        /* ── INBOUND CONTACT INQUIRIES ── */
        contacts.length === 0 ? (
          <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
            No contact enquiries found.
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map((c) => (
              <div
                key={c._id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-700 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {c.source || "Contact Page"}
                    </span>
                    {c.referenceNumber && (
                      <span className="text-[11px] font-mono text-slate-500">{c.referenceNumber}</span>
                    )}
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white">{c.name}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      <a href={`mailto:${c.email}`} className="hover:text-blue-400">{c.email}</a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-500" />
                      <span>{c.countryCode || "+91"} {c.phone}</span>
                    </span>
                    {c.cityDistrict && <span>📍 {c.cityDistrict}, {c.state || ""}</span>}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mt-2 text-xs text-slate-300">
                    <div className="font-semibold text-slate-200 mb-1">{c.subject || "Subject"}</div>
                    <p className="line-clamp-3">"{c.message}"</p>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  <select
                    value={c.status || "Unread"}
                    onChange={(e) => handleContactStatus(c._id, e.target.value)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-blue-400 font-bold outline-none cursor-pointer"
                  >
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* ── INBOUND APPLICATIONS (VOLUNTEER / CAREER / PARTNER / SPONSOR / MENTOR) ── */
        apps.length === 0 ? (
          <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
            No applications found in this category.
          </div>
        ) : (
          <div className="space-y-4">
            {apps.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-700 transition"
              >
                <div className="space-y-2">
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
                    {item.organization && <span>🏢 {item.organization}</span>}
                  </div>

                  {item.message && (
                    <p className="text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/80 mt-2 line-clamp-2">
                      "{item.message}"
                    </p>
                  )}

                  {/* Resume / Document Attachment */}
                  {(item.resumeUrl || item.formData?.cvFileUrl) && (
                    <div className="pt-1">
                      <a
                        href={item.resumeUrl || item.formData?.cvFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition border border-emerald-500/20"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Applicant Resume ({item.formData?.cvFileName || "Resume.pdf"})</span>
                      </a>
                    </div>
                  )}
                </div>

                {/* Status Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  <select
                    value={item.status || "Pending"}
                    onChange={(e) => handleApplicationStatus(item._id, e.target.value)}
                    className="p-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-emerald-400 font-bold outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Approved">Approved</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
