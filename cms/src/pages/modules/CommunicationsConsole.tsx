import { useState, useEffect } from "react";
import {
  MessageSquare,
  Send,
  Users,
  Mail,
  CheckCircle2,
  Calendar,
  Search,
  X,
  FileText,
  Clock,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";
import { api } from "../../services/api";

export interface CampaignBroadcast {
  id: string;
  title: string;
  targetAudience: string;
  recipientCount: number;
  channel: "Email Newsletter" | "SMS Alert" | "WhatsApp Notice";
  dateSent: string;
  status: "Delivered" | "Scheduled" | "Draft";
}

export default function CommunicationsConsole() {
  const [campaigns, setCampaigns] = useState<CampaignBroadcast[]>([]);
  const [contactsCount, setContactsCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New campaign state
  const [title, setTitle] = useState("");
  const [targetAudience, setTargetAudience] = useState("All Inbound Inquiries");
  const [channel, setChannel] = useState<CampaignBroadcast["channel"]>("Email Newsletter");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([api.listContacts(), api.listBroadcasts()])
      .then(([contactsRes, broadcastsRes]) => {
        if (contactsRes?.success && contactsRes.data) {
          setContactsCount(contactsRes.data.length);
        }
        if (broadcastsRes?.success && Array.isArray(broadcastsRes.data)) {
          setCampaigns(
            broadcastsRes.data.map((campaign: any) => ({
              id: campaign._id,
              title: campaign.title,
              targetAudience: campaign.targetAudience,
              recipientCount: campaign.recipientCount,
              channel: campaign.channel,
              dateSent: campaign.createdAt,
              status: campaign.status,
            }))
          );
        }
      })
      .catch((error) => toast.error(error.message || "Failed to load broadcast history."))
      .finally(() => setLoading(false));
  }, []);

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error("Please fill in campaign title and message.");
      return;
    }

    try {
      const res = await api.createBroadcast({
        title: title.trim(),
        targetAudience,
        recipientCount: contactsCount,
        channel,
        message: message.trim(),
      });
      if (!res.success || !res.data) {
        toast.error(res.message || "Failed to queue broadcast.");
        return;
      }
      setCampaigns((current) => [
        {
          id: res.data._id,
          title: res.data.title,
          targetAudience: res.data.targetAudience,
          recipientCount: res.data.recipientCount,
          channel: res.data.channel,
          dateSent: res.data.createdAt,
          status: res.data.status,
        },
        ...current,
      ]);
      toast.success("Broadcast queued in the central database.");
      setIsModalOpen(false);
      setTitle("");
      setMessage("");
    } catch (error: any) {
      toast.error(error.message || "Failed to queue broadcast.");
    }
  };

  const filtered = campaigns.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.targetAudience.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-7xl mx-auto pb-12 font-sans select-none">
      {/* ── BANNER ── */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#071527] border border-[#0f3458] shadow-xs flex items-center justify-center p-2.5 shrink-0">
            <MessageSquare className="w-8 h-8 text-[#f97316]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black text-[#071527] tracking-tight">
                Campaigns &amp; Outbound Broadcasts
              </h1>
              <span className="text-[10px] font-bold bg-[#f97316]/10 text-[#ea580c] px-2.5 py-0.5 rounded-full border border-[#f97316]/20 uppercase">
                Mail Engine Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Donor newsletters, disaster appeals, volunteer alerts, and institutional statements.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f97316] hover:bg-[#ea580c] text-white text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>Dispatch New Broadcast</span>
        </button>
      </div>

      {/* ── METRIC CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Contact Subscribers</span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#f97316]">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{contactsCount} Inquiries</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Live contacts from public site</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Dispatched</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Send className="w-4 h-4" />
            </div>
          </div>
          {loading ? (
            <div className="h-8 w-24 bg-slate-100 animate-pulse rounded-lg mt-1" />
          ) : (
            <p className="text-2xl font-black text-[#071527]">{campaigns.length} Broadcasts</p>
          )}
          <p className="text-[11px] text-slate-400 mt-1">Delivered to donor network</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Mail Relay Status</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-[#071527]">Operational</p>
          <p className="text-[11px] text-slate-400 mt-1">SMTP dispatch service ready</p>
        </div>
      </div>

      {/* ── BROADCASTS TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#071527]">Campaign Dispatch History</h3>
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#f97316]"
            />
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 py-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
            <Inbox className="w-8 h-8 text-slate-300" />
            <p className="text-xs font-semibold text-slate-600">No campaigns dispatched yet.</p>
            <p className="text-[11px] text-slate-400">Click &quot;Dispatch New Broadcast&quot; above to compose your first campaign.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Campaign Subject</th>
                  <th className="pb-3">Target Audience</th>
                  <th className="pb-3">Delivery Channel</th>
                  <th className="pb-3">Recipients</th>
                  <th className="pb-3">Date Dispatched</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4">
                      <span className="font-bold text-[#071527] block text-xs">{c.title}</span>
                      <span className="text-[11px] font-mono text-slate-400">{c.id}</span>
                    </td>
                    <td className="py-4 text-slate-700">{c.targetAudience}</td>
                    <td className="py-4 text-slate-600">{c.channel}</td>
                    <td className="py-4 font-bold text-[#071527]">
                      {c.recipientCount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 text-slate-500 font-mono text-[11px]">{c.dateSent}</td>
                    <td className="py-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── NEW BROADCAST MODAL ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#071527]">Compose Outbound Broadcast</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendCampaign} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Campaign Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Relief Appeal & Annual Report Announcement"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  >
                    <option>All Inbound Inquiries</option>
                    <option>All Active Donors &amp; Patrons</option>
                    <option>Community Members &amp; Volunteers</option>
                    <option>Institutional Partners &amp; Sponsors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Dispatch Channel</label>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value as any)}
                    className="w-full border border-slate-200 rounded-xl p-2.5 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:border-[#f97316]"
                  >
                    <option value="Email Newsletter">Email Newsletter (SMTP)</option>
                    <option value="SMS Alert">SMS Alert Relay</option>
                    <option value="WhatsApp Notice">WhatsApp Broadcast</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Message Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write the public announcement or appeal message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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
                  <Send className="w-4 h-4" />
                  <span>Send Broadcast</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
