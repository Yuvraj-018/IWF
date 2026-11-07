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
  Archive,
  ArchiveRestore,
  Inbox,
  CheckCircle2,
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
      } else if (activeTab === "archived") {
        const [appsRes, contactsRes] = await Promise.all([
          api.listApplications(undefined, { force }),
          api.listContacts({}, { force }),
        ]);
        if (appsRes.success && appsRes.data) {
          setApps(appsRes.data);
        }
        if (contactsRes.success && contactsRes.data) {
          setContacts(contactsRes.data);
        }
      } else {
        const typeFilter = activeTab === "all" ? undefined : activeTab;
        const [appsRes, contactsRes] = await Promise.all([
          api.listApplications(typeFilter, { force }),
          contacts.length === 0 ? api.listContacts({}, { force }) : Promise.resolve(null),
        ]);
        if (appsRes.success && appsRes.data) {
          setApps(appsRes.data);
        }
        if (contactsRes?.success && contactsRes.data) {
          setContacts(contactsRes.data);
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
        if (newStatus === "Archived") {
          toast.success("Application archived and moved to Archive tab.");
        } else {
          toast.success(`Application updated to ${newStatus}`);
        }
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
        if (newStatus === "Archived") {
          toast.success("Contact enquiry archived and moved to Archive tab.");
        } else {
          toast.success(`Contact marked as ${newStatus}`);
        }
        setContacts(contacts.map((c) => (c._id === id ? { ...c, status: newStatus } : c)));
      } else {
        toast.error(res.message || "Failed to update contact");
      }
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  const CLOUDFLARE_PUBLIC_CDN = "https://pub-9df833ce82f4452db02dda1a3edca3d4.r2.dev";

  // Build universal document view / download link
  const getDocDownloadUrl = (fileUrlOrKey?: string, isPan: boolean = false) => {
    if (!fileUrlOrKey) return "#";
    // 1. If it's already an absolute URL (Cloudflare public edge CDN or external)
    if (fileUrlOrKey.startsWith("http://") || fileUrlOrKey.startsWith("https://")) {
      return fileUrlOrKey;
    }
    const cleanKey = fileUrlOrKey.replace(/^\/?api\/upload\/private\//, "").replace(/^\/+/, "");

    // 2. If it's a PAN card or explicitly confidential, route via secure backend presigned URL
    if (isPan || cleanKey.toLowerCase().includes("pan")) {
      const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const token = localStorage.getItem("islah_admin_token");
      return `${API_BASE_URL}/upload/private?key=${encodeURIComponent(cleanKey)}&token=${token || ""}`;
    }

    // 3. For resumes, CVs, photos, and public files: serve directly from Cloudflare Public CDN!
    return `${CLOUDFLARE_PUBLIC_CDN}/${cleanKey}`;
  };

  // Active vs Archived sets
  const activeApps = apps.filter((item) => item.status !== "Archived");
  const archivedApps = apps.filter((item) => item.status === "Archived");
  const activeContacts = contacts.filter((c) => c.status !== "Archived");
  const archivedContacts = contacts.filter((c) => c.status === "Archived");
  const totalArchivedCount = archivedApps.length + archivedContacts.length;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900">Inbound Applications &amp; Forms Hub</h2>
          <p className="text-xs text-slate-500 mt-1">
            Review Volunteer, Career, Partner, Sponsor, Tax Exemption (80G), and Contact enquiries
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalArchivedCount > 0 && activeTab !== "archived" && (
            <button
              onClick={() => setActiveTab("archived")}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition cursor-pointer shadow-2xs"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>View Archive ({totalArchivedCount})</span>
            </button>
          )}
          <button
            onClick={() => loadData(true)}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 transition cursor-pointer disabled:opacity-50 shadow-2xs"
            title="Bypass cache and sync live"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-orange-500" : ""}`} />
            <span className="hidden sm:inline">Refresh Live</span>
          </button>
        </div>
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
          { id: "tax_exemption", label: "Tax Exemption (80G)", icon: Receipt, badgeColor: "text-amber-500" },
          { id: "contact_inquiries", label: "Contact Inquiries", icon: MessageSquare, badgeColor: "text-blue-500" },
          { id: "archived", label: "Archived", icon: Archive, badgeColor: "text-amber-600", count: totalArchivedCount },
        ].map((t) => {
          const Icon = (t as any).icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/25"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 border border-transparent"
              }`}
            >
              {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : t.badgeColor || "text-slate-400"}`} />}
              <span>{t.label}</span>
              {t.count !== undefined && t.count > 0 && (
                <span
                  className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    isActive ? "bg-white/20 text-white" : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="p-16 flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          <p className="text-xs">Fetching inbound submissions...</p>
        </div>
      ) : activeTab === "tax_exemption" ? (
        /* ── TAX EXEMPTION (80G) DONATION CLAIMS ── */
        taxRequests.length === 0 ? (
          <div className="p-16 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs">
            No 80G tax exemption requests found.
          </div>
        ) : (
          <div className="space-y-4">
            {taxRequests.map((d) => (
              <div
                key={d._id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-300 transition shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
                      <Receipt className="w-3 h-3" />
                      80G Tax Exemption
                    </span>
                    <span className="text-[11px] font-mono text-emerald-600 font-bold">
                      ₹{Number(d.amount).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">#{d.receiptNo}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{new Date(d.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <span>{d.donorName}</span>
                    <span className="text-xs text-slate-500 font-normal">({d.donorType || "Individual"})</span>
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${d.email}`} className="hover:text-amber-600">{d.email}</a>
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
                        href={getDocDownloadUrl(d.panFileUrl, true)}
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
        /* ── INBOUND CONTACT INQUIRIES (ACTIVE ONLY) ── */
        activeContacts.length === 0 ? (
          <div className="p-16 rounded-2xl bg-slate-900 border border-slate-800 text-center text-slate-500 text-xs">
            No active contact enquiries found.
          </div>
        ) : (
          <div className="space-y-4">
            {activeContacts.map((c) => (
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

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mt-2 text-xs text-slate-700">
                    <div className="font-semibold text-[#071527] mb-1">{c.subject || "Subject"}</div>
                    <p className="line-clamp-3 italic">"{c.message}"</p>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                  <select
                    value={c.status || "Unread"}
                    onChange={(e) => handleContactStatus(c._id, e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-orange-600 font-bold outline-none cursor-pointer hover:border-orange-500 shadow-sm transition"
                  >
                    <option value="Unread">Unread</option>
                    <option value="Read">Read</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Archived">Move to Archive</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )
      ) : activeTab === "archived" ? (
        /* ── DEDICATED ARCHIVE HUB (SEPARATE VIEW) ── */
        totalArchivedCount === 0 ? (
          <div className="p-16 rounded-2xl bg-white border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">Archive repository is currently empty</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              When you set an application or contact enquiry's status to "Archived", it will be safely moved here away from active queues.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                  <Archive className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Archived Submissions Repository</h3>
                  <p className="text-xs text-slate-500">
                    These items are hidden from active queues. You can restore any item to active status anytime.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-700 border border-amber-500/30 whitespace-nowrap">
                {totalArchivedCount} Archived
              </span>
            </div>

            {/* Archived Applications */}
            {archivedApps.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-amber-300 transition shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                      <Archive className="w-3 h-3" />
                      Archived {item.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{item.applicationId || item._id}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{item.fullName}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${item.email}`} className="hover:text-orange-600">{item.email}</a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.countryCode || "+91"} {item.phone}</span>
                    </span>
                    {item.city && <span>📍 {item.city}, {item.state || ""}</span>}
                    {item.organization && <span>🏢 {item.organization}</span>}
                  </div>

                  {item.message && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mt-2 text-xs text-slate-700">
                      <span className="text-slate-500 font-semibold mr-1.5">Note:</span>
                      <span className="italic">"{item.message}"</span>
                    </div>
                  )}

                  {/* Resume / Document Attachment */}
                  {(() => {
                    const primaryResumeUrl = item.resumeUrl || item.formData?.cvFileUrl || item.formData?.resume?.url;
                    const primaryResumeName = item.formData?.cvFileName || item.formData?.resume?.name || "Applicant_Resume.pdf";
                    const docEntries = item.formData?.documents && typeof item.formData.documents === "object"
                      ? Object.entries(item.formData.documents)
                      : [];

                    if (!primaryResumeUrl && docEntries.length === 0) return null;

                    return (
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        {primaryResumeUrl && (
                          <a
                            href={getDocDownloadUrl(primaryResumeUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold transition border border-orange-200 shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Applicant Resume ({primaryResumeName})</span>
                          </a>
                        )}
                        {docEntries.map(([key, doc]: [string, any]) => {
                          if (doc?.url && doc.url !== primaryResumeUrl) {
                            return (
                              <a
                                key={key}
                                href={getDocDownloadUrl(doc.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200 shadow-xs"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download {doc.name || key}</span>
                              </a>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Restore / Status Actions */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                  <button
                    onClick={() => handleApplicationStatus(item._id, "Pending")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold border border-emerald-200 transition cursor-pointer shadow-xs"
                  >
                    <ArchiveRestore className="w-3.5 h-3.5" />
                    <span>Restore to Active</span>
                  </button>
                  <select
                    value={item.status || "Archived"}
                    onChange={(e) => handleApplicationStatus(item._id, e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-bold outline-none cursor-pointer hover:border-orange-500 shadow-sm transition"
                  >
                    <option value="Archived">Status: Archived</option>
                    <option value="Pending">Restore as Pending</option>
                    <option value="Under Review">Restore as Under Review</option>
                    <option value="Shortlisted">Restore as Shortlisted</option>
                    <option value="Approved">Restore as Approved</option>
                    <option value="Contacted">Restore as Contacted</option>
                    <option value="Rejected">Restore as Rejected</option>
                  </select>
                </div>
              </div>
            ))}

            {/* Archived Contacts (if any) */}
            {archivedContacts.map((c) => (
              <div
                key={c._id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-amber-300 transition shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                      <Archive className="w-3 h-3" />
                      Archived Enquiry
                    </span>
                    {c.referenceNumber && (
                      <span className="text-[11px] font-mono text-slate-500">{c.referenceNumber}</span>
                    )}
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${c.email}`} className="hover:text-blue-600">{c.email}</a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.countryCode || "+91"} {c.phone}</span>
                    </span>
                    {c.cityDistrict && <span>📍 {c.cityDistrict}, {c.state || ""}</span>}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mt-2 text-xs text-slate-700">
                    <div className="font-semibold text-[#071527] mb-1">{c.subject || "Subject"}</div>
                    <p className="line-clamp-3 italic">"{c.message}"</p>
                  </div>
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                  <button
                    onClick={() => handleContactStatus(c._id, "Unread")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-800 text-xs font-bold border border-emerald-200 transition cursor-pointer shadow-xs"
                  >
                    <ArchiveRestore className="w-3.5 h-3.5" />
                    <span>Restore to Active</span>
                  </button>
                  <select
                    value={c.status || "Archived"}
                    onChange={(e) => handleContactStatus(c._id, e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 font-bold outline-none cursor-pointer hover:border-orange-500 shadow-sm transition"
                  >
                    <option value="Archived">Status: Archived</option>
                    <option value="Unread">Restore as Unread</option>
                    <option value="Read">Restore as Read</option>
                    <option value="Resolved">Restore as Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* ── INBOUND ACTIVE APPLICATIONS (VOLUNTEER / CAREER / PARTNER / SPONSOR / MENTOR) ── */
        activeApps.length === 0 ? (
          <div className="p-16 rounded-2xl bg-white border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              {archivedApps.length > 0 ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <Inbox className="w-6 h-6 text-slate-400" />
              )}
            </div>
            <p className="text-sm font-bold text-slate-900">
              {archivedApps.length > 0
                ? "No active pending applications in this category"
                : "No applications found in this category."}
            </p>
            {archivedApps.length > 0 && (
              <>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  {archivedApps.length} submission{archivedApps.length > 1 ? "s have" : " has"} been archived and moved out of this active queue.
                </p>
                <button
                  onClick={() => setActiveTab("archived")}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold border border-orange-200 transition cursor-pointer"
                >
                  <Archive className="w-3.5 h-3.5" />
                  <span>View Archived Submissions ({archivedApps.length})</span>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {activeApps.map((item) => (
              <div
                key={item._id}
                className="p-5 rounded-2xl bg-white border border-slate-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-slate-300 transition shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
                      {item.type}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{item.applicationId || item._id}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900">{item.fullName}</h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${item.email}`} className="hover:text-orange-600">{item.email}</a>
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.countryCode || "+91"} {item.phone}</span>
                    </span>
                    {item.city && <span>📍 {item.city}, {item.state || ""}</span>}
                    {item.organization && <span>🏢 {item.organization}</span>}
                  </div>

                  {item.message && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 mt-2 text-xs text-slate-700">
                      <span className="text-slate-500 font-semibold mr-1.5">Note:</span>
                      <span className="italic">"{item.message}"</span>
                    </div>
                  )}

                  {/* Resume / Document Attachment */}
                  {(() => {
                    const primaryResumeUrl = item.resumeUrl || item.formData?.cvFileUrl || item.formData?.resume?.url;
                    const primaryResumeName = item.formData?.cvFileName || item.formData?.resume?.name || "Applicant_Resume.pdf";
                    const docEntries = item.formData?.documents && typeof item.formData.documents === "object"
                      ? Object.entries(item.formData.documents)
                      : [];

                    if (!primaryResumeUrl && docEntries.length === 0) return null;

                    return (
                      <div className="pt-1 flex flex-wrap items-center gap-2">
                        {primaryResumeUrl && (
                          <a
                            href={getDocDownloadUrl(primaryResumeUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 text-xs font-bold transition border border-orange-200 shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Applicant Resume ({primaryResumeName})</span>
                          </a>
                        )}
                        {docEntries.map(([key, doc]: [string, any]) => {
                          if (doc?.url && doc.url !== primaryResumeUrl) {
                            return (
                              <a
                                key={key}
                                href={getDocDownloadUrl(doc.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition border border-slate-200 shadow-xs"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span>Download {doc.name || key}</span>
                              </a>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })()}
                </div>

                {/* Status Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                  <select
                    value={item.status || "Pending"}
                    onChange={(e) => handleApplicationStatus(item._id, e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-orange-600 font-bold outline-none cursor-pointer hover:border-orange-500 shadow-sm transition"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Approved">Approved</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Archived">Move to Archive</option>
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
