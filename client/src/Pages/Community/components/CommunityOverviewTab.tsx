import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Users,
  Heart,
  Building2,
  UserCheck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
  Award,
  Leaf,
  FileCheck,
  Handshake,
} from "lucide-react";
import {
  COMMUNITY_STATS,
  MEMBERS_DATA,
  DONORS_DATA,
  PARTNERS_DATA,
  VOLUNTEERS_DATA,
  SHARED_COMMITMENTS,
} from "../communityData";
import { ProfileDetailModal, ProfileData } from "./ProfileDetailModal";
import { MemberVerificationModal } from "./MemberVerificationModal";
import type { CommunityTab } from "./CommunitySelectiveBar";
import type { RoleType } from "@/components/forms/RoleFormModal";

interface CommunityOverviewTabProps {
  onSwitchTab: (tab: CommunityTab) => void;
  onOpenRoleModal?: (role: RoleType) => void;
}

export function CommunityOverviewTab({
  onSwitchTab,
  onOpenRoleModal,
}: CommunityOverviewTabProps) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [exploreFilter, setExploreFilter] = useState<"all" | "members" | "donors" | "partners" | "volunteers">("all");

  // Sample featured cards for the Explore preview
  const featuredProfiles: ProfileData[] = [
    { type: "member", data: MEMBERS_DATA[0] }, // Ayesha Khan
    { type: "donor", data: DONORS_DATA[1] }, // Reliance Foundation or Rahul Sharma
    { type: "partner", data: PARTNERS_DATA[0] }, // TCS
    { type: "volunteer", data: VOLUNTEERS_DATA[1] }, // Rahul Verma
  ];

  const filteredPreview = featuredProfiles.filter((p) => {
    if (exploreFilter === "all") return true;
    if (exploreFilter === "members") return p.type === "member";
    if (exploreFilter === "donors") return p.type === "donor";
    if (exploreFilter === "partners") return p.type === "partner";
    if (exploreFilter === "volunteers") return p.type === "volunteer";
    return true;
  });

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      {/* ── 1. Top Quick Action Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div
            onClick={() => onSwitchTab("members")}
            className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-brand-orange/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Learn</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                  About Our Community
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              Explore how members, partners, and volunteers coordinate grassroots interventions across 12 districts.
            </p>
          </div>

          <div
            onClick={() => onSwitchTab("partners")}
            className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-brand-orange/40 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand-orange flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Explore</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                  Member & Partner Directory
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
              Transparent, searchable registries of verified patrons, CSR corporations, and active field contributors.
            </p>
          </div>

          <Link
            to="/get-involved"
            className="group p-5 bg-gradient-to-br from-[#071527] to-[#122e54] text-white rounded-2xl border border-slate-800 shadow-xs hover:shadow-md transition-all block"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-brand-orange flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-orange">Get Involved</span>
                <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors">
                  Join the ISLAH Movement
                </h3>
              </div>
            </div>
            <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
              Choose your path to contribute—whether by offering expertise, partnering, or supporting rural education.
            </p>
          </Link>
        </div>
      </section>

      {/* ── 2. "Our Community: Four Ways to Connect" (Stitch Master Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
            <span>Our Community</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            One Community. Four Ways to Connect.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Explore our community directories and discover the individuals, organisations and supporters who help ISLAH create opportunities for a better tomorrow.
          </p>
          <div className="pt-2">
            <blockquote className="inline-block px-4 py-2 bg-slate-50 border-l-3 border-brand-orange text-xs italic text-slate-600 rounded-r-lg">
              "Stronger communities are built by people who care, contribute and collaborate." — ISLAH Vision
            </blockquote>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Members Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Members</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Our members form the vital backbone of the ISLAH grassroots collective across northern states.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-blue-700">{COMMUNITY_STATS.membersCount}</p>
                <p className="text-[11px] text-slate-500 font-medium">Active Members</p>
              </div>
              <button
                onClick={() => onSwitchTab("members")}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer"
              >
                <span>Explore Members</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Donors Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Donors</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Acknowledge the generous benefactors and philanthropic institutions who fund our frontline projects.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-amber-600">{COMMUNITY_STATS.donorsCount}</p>
                <p className="text-[11px] text-slate-500 font-medium">Supporters & Tiers</p>
              </div>
              <button
                onClick={() => onSwitchTab("donors")}
                className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-800 cursor-pointer"
              >
                <span>Explore Donors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Partners & Sponsors Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Partners & Sponsors</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Institutional collaborations with CSR corporations, banks, and technology leaders.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-emerald-700">{COMMUNITY_STATS.partnersCount}</p>
                <p className="text-[11px] text-slate-500 font-medium">Collaborators</p>
              </div>
              <button
                onClick={() => onSwitchTab("partners")}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                <span>Explore Partners</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Volunteers & Mentors Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-400 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Volunteers & Mentors</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Professionals and youth contributing their time, skills and advisory support directly in villages.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-purple-700">{COMMUNITY_STATS.volunteersCount}</p>
                <p className="text-[11px] text-slate-500 font-medium">Field Contributors</p>
              </div>
              <button
                onClick={() => onSwitchTab("volunteers")}
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
              >
                <span>Explore Volunteers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. "Explore Our Community" Spotlight Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Explore Our Community</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Find the People. Build the Connections.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Filter through community members, donors, partners and mentors leading social change.
            </p>
          </div>

          {/* Quick Filter Pill Group */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {[
              { id: "all", label: "All" },
              { id: "members", label: "Members" },
              { id: "donors", label: "Donors" },
              { id: "partners", label: "Partners & Sponsors" },
              { id: "volunteers", label: "Volunteers & Mentors" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setExploreFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  exploreFilter === f.id
                    ? "bg-[#071527] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPreview.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.type === "member"
                        ? "bg-blue-100 text-blue-800"
                        : item.type === "donor"
                        ? "bg-amber-100 text-amber-800"
                        : item.type === "partner"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.type === "member" && (item.data as any).id}
                    {item.type === "partner" && (item.data as any).badge}
                    {item.type === "donor" && (item.data as any).logoText}
                    {item.type === "volunteer" && (item.data as any).initials}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900">{item.data.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {item.type === "member" && (item.data as any).type}
                  {item.type === "donor" && (item.data as any).type}
                  {item.type === "partner" && (item.data as any).category}
                  {item.type === "volunteer" && (item.data as any).title}
                </p>

                <div className="flex items-center gap-1 text-xs text-slate-500 mt-3">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange shrink-0" />
                  <span className="truncate">
                    {item.type === "member" && `${(item.data as any).district}, ${(item.data as any).state}`}
                    {item.type !== "member" && (item.data as any).location}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setSelectedProfile(item)}
                  className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#071527] text-slate-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Profile</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. "Access Your Member Portal" Card (Stitch Verification Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#071527] to-[#122e54] text-white p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-brand-orange uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>Already a Member?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                Access Your Member Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Check membership status, verify your digital ID card credentials, monitor renewal dates, and confirm official registration in seconds without paperwork.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>View Profile & Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Track Membership Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Renew Membership Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Download Digital ID Card</span>
                </div>
              </div>
            </div>

            {/* Right Action Container */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-base font-bold text-white">Instant Status Verification</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your Member ID or registered phone number to verify official status.
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => setIsVerificationOpen(true)}
                  className="w-full py-3 px-5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Member Status & Lookup</span>
                </button>
                <button
                  onClick={() => setIsVerificationOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Renew Membership</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. "Want to Join Our Community?" (Clean CTA banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Want to Join Our Community?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              Visit our dedicated Get Involved section for detailed information on how to join as a supporting member, donor, partner, or grassroots volunteer.
            </p>
          </div>
          <Link
            to="/get-involved"
            className="px-6 py-3 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 transition-colors shadow-xs"
          >
            <span>Go to Get Involved</span>
            <ArrowRight className="w-4 h-4 text-brand-orange" />
          </Link>
        </div>
      </section>

      {/* ── 6. "Our Shared Commitment" Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Our Shared Commitment</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            A Stronger Community. A Brighter Future.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Every member, donor, partner, sponsor, volunteer and mentor plays a vital role in building an inclusive, empowered, and self-reliant future.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SHARED_COMMITMENTS.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand-orange font-bold mb-3">
                {c.title === "Integrity" && <ShieldCheck className="w-5 h-5" />}
                {c.title === "Inclusion" && <Users className="w-5 h-5" />}
                {c.title === "Accountability" && <FileCheck className="w-5 h-5" />}
                {c.title === "Collaboration" && <Handshake className="w-5 h-5" />}
                {c.title === "Sustainability" && <Leaf className="w-5 h-5 text-emerald-600" />}
              </div>
              <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <ProfileDetailModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
      <MemberVerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />
    </div>
  );
}

