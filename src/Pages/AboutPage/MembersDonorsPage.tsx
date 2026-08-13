import { useState, useMemo } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  Award,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Calendar,
  Building2,
  Heart,
} from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

type RoleType = "volunteer" | "partner" | "sponsor" | "mentor" | "employee";

interface MemberRecord {
  id: string;
  name: string;
  category: "Blue" | "Yellow" | "Green";
  district: string;
  status: "Active" | "Inactive";
  validTill: string;
}

const MEMBERS_DATA: MemberRecord[] = [
  { id: "IWF-BL-2025-001", name: "Md. Aftab Alam", category: "Blue", district: "Darbhanga", status: "Active", validTill: "30 Apr 2026" },
  { id: "IWF-BL-2025-002", name: "Nazia Parveen", category: "Blue", district: "Madhubani", status: "Active", validTill: "14 Apr 2026" },
  { id: "IWF-YL-2025-001", name: "Shabana Khatoon", category: "Yellow", district: "Darbhanga", status: "Active", validTill: "09 May 2026" },
  { id: "IWF-GR-2025-001", name: "Md. Irfan Alam", category: "Green", district: "Samastipur", status: "Active", validTill: "19 Apr 2026" },
  { id: "IWF-GR-2025-002", name: "Hope Foundation", category: "Green", district: "Patna", status: "Active", validTill: "21 May 2026" },
  { id: "IWF-BL-2025-003", name: "Javed Akhtar", category: "Blue", district: "Muzaffarpur", status: "Active", validTill: "11 Jun 2026" },
  { id: "IWF-YL-2025-002", name: "Dr. Amaan Siddiqui", category: "Yellow", district: "Patna", status: "Active", validTill: "15 Jul 2026" },
  { id: "IWF-GR-2025-003", name: "Rehana Parveen", category: "Green", district: "Saharsa", status: "Active", validTill: "01 Aug 2026" },
];

const PLATINUM_DONORS = [
  { name: "Md. Irfan Alam", amount: "₹1,20,000", district: "Darbhanga, Bihar", sector: "Education Support" },
  { name: "XYZ Foundation", amount: "₹1,00,000", district: "New Delhi, India", sector: "Healthcare Support" },
  { name: "Dr. Amaan Siddiqui", amount: "₹60,000", district: "Muzaffarpur, Bihar", sector: "Education Support" },
];

const GOLD_DONORS = [
  { name: "Shabana Khatoon", amount: "₹75,000", district: "Madhubani, Bihar", sector: "Women Empowerment" },
  { name: "Nazia Parveen", amount: "₹35,000", district: "Darbhanga, Bihar", sector: "Education Support" },
  { name: "Aftab Alam Foundation", amount: "₹25,000", district: "Purnia, Bihar", sector: "Community Welfare" },
];

const SILVER_DONORS = [
  { name: "Md. Aftab Alam", amount: "₹15,000", district: "Darbhanga, Bihar" },
  { name: "Rukhsana Begum", amount: "₹10,000", district: "Madhubani, Bihar" },
  { name: "Javed Akhtar", amount: "₹9,000", district: "Samastipur, Bihar" },
  { name: "Hope Foundation", amount: "₹8,000", district: "Patna, Bihar" },
];

export default function MembersDonorsPage() {
  const [activeCategoryTab, setActiveCategoryTab] = useState<"All" | "Blue" | "Yellow" | "Green">("All");
  const [districtFilter, setDistrictFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const filteredMembers = useMemo(() => {
    return MEMBERS_DATA.filter((m) => {
      const matchTab = activeCategoryTab === "All" || m.category === activeCategoryTab;
      const matchDistrict = districtFilter === "All" || m.district === districtFilter;
      const matchSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchTab && matchDistrict && matchSearch;
    });
  }, [activeCategoryTab, districtFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main>
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white py-16 md:py-20 px-4 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center space-y-5">
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-md border border-brand-orange/30">
              <Users className="w-4 h-4" />
              <span>Our Pillars of Strength</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              OUR MEMBERS & DONORS
            </h1>
            <p className="text-white/85 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Our members and donors are the backbone of Islah Welfare Foundation. Their generous contributions and active engagement help us build stronger, self-reliant rural communities.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href="/membership"
                className="bg-brand-green hover:bg-green-700 text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition uppercase tracking-wider"
              >
                Become a Member
              </a>
              <a
                href="/donate"
                className="bg-brand-orange hover:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-md shadow-md transition uppercase tracking-wider"
              >
                Donate Now
              </a>
            </div>
          </div>
        </section>

        {/* Member Categories Overview */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Membership Categories
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Supporting Membership Tiers
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Blue Card */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-7 border-2 border-blue-200 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest">Supporting Member</span>
                      <h3 className="text-xl font-extrabold text-[#0b1f3b]">Blue Card Member</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      BL
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-blue-700">₹2,500 <span className="text-xs font-normal text-slate-500">/ Year</span></div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Recognition as Supporting Member of IWF</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Participation in selected awareness programs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>Engagement in community initiatives</span>
                    </li>
                  </ul>
                  <a
                    href="/membership"
                    className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-lg transition"
                  >
                    Apply Blue Card
                  </a>
                </div>
              </ScrollReveal>

              {/* Yellow Card */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-7 border-2 border-amber-300 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-extrabold text-amber-600 uppercase tracking-widest">Active Contributor</span>
                      <h3 className="text-xl font-extrabold text-[#0b1f3b]">Yellow Card Member</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                      YL
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-amber-700">₹4,000 <span className="text-xs font-normal text-slate-500">/ Year</span></div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Recognition for active contribution & engagement</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Participation in program-level activities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Collaboration opportunities in community drives</span>
                    </li>
                  </ul>
                  <a
                    href="/membership"
                    className="block text-center w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2.5 rounded-lg transition"
                  >
                    Apply Yellow Card
                  </a>
                </div>
              </ScrollReveal>

              {/* Green Card */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl p-7 border-2 border-emerald-400 shadow-sm space-y-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">Patron Member</span>
                      <h3 className="text-xl font-extrabold text-[#0b1f3b]">Green Card Member</h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      GR
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-700">₹6,000 <span className="text-xs font-normal text-slate-500">/ Year</span></div>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Special recognition as Key Supporter of IWF</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Invitation to major programs & special events</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Opportunity to contribute ideas & support initiatives</span>
                    </li>
                  </ul>
                  <a
                    href="/membership"
                    className="block text-center w-full bg-brand-green hover:bg-green-700 text-white font-bold text-xs py-2.5 rounded-lg transition"
                  >
                    Apply Green Card
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Member Showcase Directory & Table */}
        <section className="py-14 px-4 bg-slate-100/70">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange">
                  Member Directory
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                  Registered Supporting Members
                </h2>
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap gap-2 text-xs font-bold">
                <span className="bg-white px-3.5 py-2 rounded-lg border border-slate-200 text-slate-700">Total: 127</span>
                <span className="bg-blue-50 text-blue-700 px-3.5 py-2 rounded-lg border border-blue-200">Blue: 48</span>
                <span className="bg-amber-50 text-amber-700 px-3.5 py-2 rounded-lg border border-amber-200">Yellow: 42</span>
                <span className="bg-emerald-50 text-emerald-700 px-3.5 py-2 rounded-lg border border-emerald-200">Green: 37</span>
              </div>
            </div>

            {/* Filter controls */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {(["All", "Blue", "Yellow", "Green"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveCategoryTab(tab)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                      activeCategoryTab === tab
                        ? "bg-[#0b1f3b] text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {tab} Members
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or Member ID..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>
            </div>

            {/* Members Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-extrabold text-slate-600 tracking-wider">
                      <th className="p-4">Member ID</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">District</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Valid Till</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-extrabold text-[#0b1f3b]">{m.id}</td>
                        <td className="p-4 font-bold text-slate-900">{m.name}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-extrabold ${
                              m.category === "Blue"
                                ? "bg-blue-100 text-blue-700"
                                : m.category === "Yellow"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {m.category} Member
                          </span>
                        </td>
                        <td className="p-4">{m.district}</td>
                        <td className="p-4">
                          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">
                            {m.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-500">{m.validTill}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Donors Showcase */}
        <section className="py-14 px-4">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xs font-extrabold uppercase tracking-widest text-brand-orange mb-2">
                Generous Contributions
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#0b1f3b]">
                Top Featured Donors
              </h2>
            </div>

            {/* Platinum Donors */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Award className="w-4 h-4 text-slate-600" /> Platinum Donors (₹50,000 & Above)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {PLATINUM_DONORS.map((d, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">Platinum</span>
                    <h4 className="font-bold text-[#0b1f3b] text-base">{d.name}</h4>
                    <div className="text-lg font-extrabold text-brand-green">{d.amount}</div>
                    <div className="text-xs text-slate-500">{d.district} • {d.sector}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold Donors */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-amber-600 flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> Gold Donors (₹20,000 – ₹49,999)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {GOLD_DONORS.map((d, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-amber-100 shadow-sm space-y-2">
                    <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-amber-50 text-amber-800">Gold</span>
                    <h4 className="font-bold text-[#0b1f3b] text-base">{d.name}</h4>
                    <div className="text-lg font-extrabold text-amber-600">{d.amount}</div>
                    <div className="text-xs text-slate-500">{d.district} • {d.sector}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Silver Donors */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-widest text-slate-600 flex items-center gap-2">
                <Heart className="w-4 h-4 text-slate-400" /> Silver Donors (₹5,000 – ₹19,999)
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                {SILVER_DONORS.map((d, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">Silver</span>
                    <h4 className="font-bold text-[#0b1f3b] text-sm">{d.name}</h4>
                    <div className="text-sm font-extrabold text-slate-800">{d.amount}</div>
                    <div className="text-[11px] text-slate-500">{d.district}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
