import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Handshake,
  Search,
  Building2,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  Sparkles,
  Users,
  Target,
  Leaf,
  Heart,
  Layers,
  Globe,
} from "lucide-react";
import { PARTNERS_DATA, PartnerItem } from "../communityData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ProfileDetailModal } from "./ProfileDetailModal";
import type { RoleType } from "@/components/forms/RoleFormModal";
import type { CommunityTab } from "./CommunitySelectiveBar";
import { CommunityDirectorySubNav } from "./CommunityDirectorySubNav";

import landscapeImg from "@/assets/community/landscape-village.jpg";
import plantingTreeImg from "@/assets/vision2047/planting-tree.webp";

interface PartnersDirectoryTabProps {
  onSwitchTab?: (tab: CommunityTab) => void;
  onOpenRoleModal?: (role: RoleType) => void;
}

export function PartnersDirectoryTab({
  onSwitchTab,
  onOpenRoleModal,
}: PartnersDirectoryTabProps) {
  const { settings } = useSiteSettings();
  const allPartners = useMemo(() => {
    if (settings?.community_directory?.partners && settings.community_directory.partners.length > 0) {
      return settings.community_directory.partners as unknown as PartnerItem[];
    }
    if (settings?.community_directory?.spotlight) {
      const fromSpotlight = settings.community_directory.spotlight
        .filter((s: any) => s.type === "partner")
        .map((s: any) => ({
          id: s.id,
          name: s.name,
          category: (s.category || "Strategic Partner") as any,
          focusArea: s.bio || "Community Development",
          location: s.location || "Pan India",
          sinceYear: 2024,
          description: s.bio || "",
          badge: s.role || "Partner",
        }));
      if (fromSpotlight.length > 0) return fromSpotlight;
    }
    return [];
  }, [settings]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "name_asc">("latest");
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const locations = ["All", "Pan India", "Maharashtra", "Karnataka", "Jharkhand", "Bihar"];

  const filteredPartners = useMemo(() => {
    let result = [...allPartners];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.focusArea.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }

    if (selectedArea !== "All") {
      result = result.filter((p) =>
        p.focusArea.toLowerCase().includes(selectedArea.toLowerCase())
      );
    }

    if (selectedLocation !== "All") {
      result = result.filter((p) => p.location.includes(selectedLocation));
    }

    if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      result.sort((a, b) => b.sinceYear - a.sinceYear);
    }

    return result;
  }, [searchQuery, selectedArea, selectedLocation, sortBy]);

  const totalPages = Math.ceil(filteredPartners.length / pageSize) || 1;
  const paginatedPartners = filteredPartners.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full bg-[#f8fafc] pb-16">
      {/* ── Sub-Nav Directory Pill Switcher ── */}
      {onSwitchTab && (
        <CommunityDirectorySubNav
          activeTab="partners"
          onSwitchTab={onSwitchTab}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ══════════════════════════════════════════════════════════
            TOP HEADER ROW: Title & Elegant Quote Box
           ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2238] tracking-tight">
              Our Partners &amp; Sponsors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              We are grateful to our valued partners and sponsors who stand with us in our mission to create opportunities and build stronger, more resilient communities.
            </p>
          </div>

          {/* Quote Card (Light Blue Tint) */}
          <div className="lg:max-w-md bg-[#f0f6fc] border border-[#cfe1f3] rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-2xs">
            <div className="absolute top-1 right-2 text-[#071527]/10 font-serif text-6xl select-none pointer-events-none">
              &ldquo;
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-[#0B2238] leading-relaxed relative z-10">
              &ldquo;Together, we build stronger communities and a more inclusive future.&rdquo;
            </p>
            <div className="flex justify-end mt-1 text-[#1c558c]">
              <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            FILTER & SEARCH BAR (Soft Light Blue Background)
           ══════════════════════════════════════════════════════════ */}
        <div className="bg-[#f0f6fc] rounded-2xl p-4 border border-[#cfe1f3] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, organisation or keyword..."
              className="w-full pl-3.5 pr-9 py-2 bg-white text-xs sm:text-sm rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] transition text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
                Collaboration Area:
              </span>
              <select
                value={selectedArea}
                onChange={(e) => {
                  setSelectedArea(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
              >
                <option value="All">All</option>
                <option value="Technology">Technology</option>
                <option value="Financial">Financial</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
                <option value="Skills">Skills &amp; Livelihoods</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
                Location:
              </span>
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
              >
                <option value="latest">Latest</option>
                <option value="name_asc">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MAIN CONTENT: 3-Column Partners Grid (9 Cards) + Right Sidebar
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3-Column Partners Grid (9 Cards, Lift on Hover) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {paginatedPartners.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">No partners found in directory</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery || selectedArea !== "All"
                    ? "Try adjusting your search criteria or clearing active filters."
                    : "No institutional partners publicly listed yet. Partner with Islah Welfare Foundation to create social impact!"}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => onOpenRoleModal?.("partner")}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Partner With Us
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedPartners.map((partner) => {
                return (
                  <div
                    key={partner.id}
                    onClick={() => setSelectedPartner(partner)}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-[#0B2238]/8 hover:border-[#1c558c]/40 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Logo Area */}
                      <div className="h-20 w-full rounded-xl bg-[#f8fbfe] border border-[#cfe1f3]/70 flex items-center justify-center p-3 mb-4 group-hover:bg-[#f0f6fc] transition-colors">
                        {partner.name.includes("Tata Consultancy") ? (
                          <div className="flex flex-col items-center">
                            <svg viewBox="0 0 48 28" className="w-10 h-5 text-[#005696] group-hover:scale-105 transition-transform" fill="none">
                              <path d="M4,4 L44,4 C40,15 30,24 24,26 C18,24 8,15 4,4 Z" stroke="#005696" strokeWidth="2.5" />
                              <path d="M14,4 L34,4 M24,4 L24,20" stroke="#005696" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                            <span className="text-[10px] font-black tracking-widest text-[#005696] leading-none mt-1">TATA</span>
                          </div>
                        ) : partner.name.includes("HDFC") ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded bg-[#004b87] flex items-center justify-center text-white text-[11px] font-black group-hover:scale-105 transition-transform">
                              H
                            </div>
                            <span className="text-[11px] font-bold text-[#004b87]">HDFC BANK</span>
                          </div>
                        ) : partner.name.includes("Reliance") ? (
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[12px] font-black tracking-tight text-[#c22026]">Reliance</span>
                            <span className="text-[8px] font-bold tracking-wider text-slate-500">Foundation</span>
                          </div>
                        ) : partner.name.includes("ITC") ? (
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[14px] font-black tracking-wider text-[#1c558c]">ITC</span>
                            <span className="text-[8px] font-bold text-slate-500">ITC Limited</span>
                          </div>
                        ) : partner.name.includes("Cipla") ? (
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[15px] font-black tracking-wider text-[#d0202f]">Cipla</span>
                          </div>
                        ) : partner.name.includes("State Bank") ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#280071] flex items-center justify-center text-white text-[10px] font-black group-hover:scale-105 transition-transform">
                              SBI
                            </div>
                            <span className="text-[12px] font-bold text-[#280071]">SBI</span>
                          </div>
                        ) : partner.name.includes("Microsoft") ? (
                          <div className="flex items-center gap-2">
                            <div className="grid grid-cols-2 gap-0.5 w-4.5 h-4.5 group-hover:scale-105 transition-transform">
                              <span className="bg-[#f25022] rounded-2xs" />
                              <span className="bg-[#7fba00] rounded-2xs" />
                              <span className="bg-[#00a4ef] rounded-2xs" />
                              <span className="bg-[#ffb900] rounded-2xs" />
                            </div>
                            <span className="text-[12px] font-bold text-slate-800">Microsoft</span>
                          </div>
                        ) : partner.name.includes("Infosys") ? (
                          <div className="flex flex-col items-center">
                            <span className="text-[14px] font-black tracking-tight text-[#007cc3]">Infosys</span>
                          </div>
                        ) : partner.name.includes("Tata Steel") ? (
                          <div className="flex flex-col items-center">
                            <span className="text-[12px] font-black tracking-widest text-[#005696]">TATA STEEL</span>
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-[#071527] text-white flex items-center justify-center font-bold text-xs">
                            {partner.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Name */}
                      <h4 className="text-base font-bold text-[#0B2238] group-hover:text-[#1c558c] transition-colors leading-tight">
                        {partner.name}
                      </h4>

                      {/* Tier Pill */}
                      <div className="mt-1.5">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#fef3c7] text-[#b45309] border border-[#fde68a]">
                          <Heart className="w-3 h-3 fill-current" />
                          <span>{partner.category}</span>
                        </span>
                      </div>

                      {/* Focus Area & Location */}
                      <div className="space-y-1.5 mt-3 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-[#1c558c] shrink-0" />
                          <span className="truncate">{partner.focusArea}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#f97316] shrink-0" />
                          <span>{partner.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Profile */}
                    <div className="pt-3.5 border-t border-slate-100 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPartner(partner);
                        }}
                        className="text-xs font-bold text-[#071527] group-hover:text-[#1c558c] inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 transition ${
                    currentPage === 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const p = idx + 1;
                  return (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition cursor-pointer ${
                        currentPage === p
                          ? "bg-[#071527] text-white shadow-xs"
                          : "border border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 transition ${
                    currentPage === totalPages
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-slate-100 cursor-pointer"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: "Why Partner with ISLAH?" & "Your Support Builds Stronger Communities" */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Box 1: Why Partner with ISLAH? (Soft Blue) */}
            <div className="bg-[#f0f6fc] rounded-2xl p-5 border border-[#cfe1f3] shadow-xs space-y-4">
              <h4 className="text-base font-extrabold text-[#0B2238]">
                Why Partner with ISLAH?
              </h4>

              <div className="space-y-3.5 pt-2 text-xs">
                {/* 1. Meaningful Impact */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Meaningful Impact</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Support initiatives that create real and lasting change.
                    </span>
                  </div>
                </div>

                {/* 2. Shared Expertise */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Shared Expertise</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Combine knowledge, resources and local engagement.
                    </span>
                  </div>
                </div>

                {/* 3. CSR Opportunities */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Building2 className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">CSR Opportunities</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Explore eligible corporate social responsibility projects.
                    </span>
                  </div>
                </div>

                {/* 4. Sustainable Development */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Leaf className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Sustainable Development</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Build long-term solutions for rural and underserved communities.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenRoleModal?.("partner")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Explore Partnership Opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Box 2: Your Support Builds Stronger Communities */}
            <div className="bg-[#f0f6fc] rounded-2xl overflow-hidden border border-[#cfe1f3] shadow-xs">
              <div className="p-5 space-y-3">
                <h4 className="text-sm font-extrabold text-[#0B2238]">
                  Your Support Builds Stronger Communities
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether through partnership, sponsorship or collaboration, your support helps us expand opportunities and create lasting impact.
                </p>
                <div>
                  <button
                    onClick={() => onOpenRoleModal?.("partner")}
                    className="w-full py-2 px-3 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Get Involved</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Photo */}
              <div className="h-44 w-full relative overflow-hidden">
                <img
                  src={plantingTreeImg}
                  alt="Hands holding young sapling"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM PRE-FOOTER BANNER: "Be a Part of Something Bigger"
           ══════════════════════════════════════════════════════════ */}
        <section className="mt-14 rounded-3xl overflow-hidden border border-[#cfe1f3] shadow-sm bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Landscape Village Image */}
            <div className="lg:col-span-4 h-52 sm:h-64 lg:h-auto relative overflow-hidden">
              <img
                src={landscapeImg}
                alt="Rural village landscape"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center: Dark Navy Banner */}
            <div className="lg:col-span-5 bg-[#071527] p-6 sm:p-8 flex flex-col justify-between text-white">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
                  JOIN ISLAH COMMUNITY
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-1 leading-snug">
                  Be a Part of Something Bigger.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Partner, support, collaborate or contribute — together we can build stronger, more inclusive and sustainable communities.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onSwitchTab?.("overview")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/25 hover:bg-white/10 text-white text-xs font-bold transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Ways to Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Not sure where to begin? */}
            <div className="lg:col-span-3 bg-[#f0f6fc] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#cfe1f3]">
              <div>
                <div className="w-12 h-12 rounded-xl bg-white text-[#071527] flex items-center justify-center mb-4 shadow-2xs border border-[#cfe1f3]">
                  <Users className="w-6 h-6 text-[#071527]" />
                </div>
                <h4 className="text-lg font-bold text-[#0B2238]">
                  Not sure where to begin?
                </h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Visit our Get Involved section for detailed information on how to partner, sponsor or collaborate with ISLAH.
                </p>
              </div>

              <div className="pt-5">
                <Link
                  to="/get-involved"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Go to Get Involved</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Profile Detail Modal */}
      {selectedPartner && (
        <ProfileDetailModal
          profile={{
            type: "partner",
            data: selectedPartner,
          }}
          onClose={() => setSelectedPartner(null)}
        />
      )}
    </div>
  );
}
