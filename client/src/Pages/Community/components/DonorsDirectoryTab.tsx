import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Search,
  Award,
  Building2,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  User,
  Medal,
  CheckCircle2,
} from "lucide-react";
import { DonorTier, DonorItem } from "../communityData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ProfileDetailModal } from "./ProfileDetailModal";
import type { RoleType } from "@/components/forms/RoleFormModal";
import type { CommunityTab } from "./CommunitySelectiveBar";
import { CommunityDirectorySubNav } from "./CommunityDirectorySubNav";

import ayeshaKhanImg from "@/assets/community/ayesha-khan.jpg";
import sectorEdu1Img from "@/assets/sector_education_1.png";
import childrenRunningImg from "@/assets/vision2047/children-running.png";

interface DonorsDirectoryTabProps {
  onSwitchTab?: (tab: CommunityTab) => void;
  onOpenRoleModal?: (role: RoleType) => void;
}

export function DonorsDirectoryTab({
  onSwitchTab,
  onOpenRoleModal,
}: DonorsDirectoryTabProps) {
  const { settings } = useSiteSettings();
  const allDonors = useMemo(() => {
    if (settings?.community_directory?.donors && settings.community_directory.donors.length > 0) {
      return settings.community_directory.donors as unknown as DonorItem[];
    }
    if (settings?.community_directory?.spotlight) {
      const fromSpotlight = settings.community_directory.spotlight
        .filter((s: any) => s.type === "donor" && s.isPublicConsent !== false)
        .map((s: any) => ({
          id: s.id,
          name: s.name,
          tier: (s.category || "Recognised") as any,
          type: (s.role || "Individual Donor") as any,
          causes: ["Community Support", "Education"],
          sinceYear: 2024,
          location: s.location || "Pan India",
          description: s.bio,
        }));
      if (fromSpotlight.length > 0) return fromSpotlight;
    }
    return [];
  }, [settings]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "name_asc">("latest");
  const [selectedDonor, setSelectedDonor] = useState<DonorItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const years = useMemo(() => {
    const yrs = Array.from(
      new Set(allDonors.map((d) => d.sinceYear.toString()))
    )
      .sort()
      .reverse();
    return ["All", ...yrs];
  }, [allDonors]);

  const filteredDonors = useMemo(() => {
    let result = [...allDonors];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.type.toLowerCase().includes(q) ||
          d.causes.some((c) => c.toLowerCase().includes(q)) ||
          d.location.toLowerCase().includes(q)
      );
    }

    if (selectedTier !== "All") {
      result = result.filter((d) => d.tier === selectedTier);
    }

    if (selectedYear !== "All") {
      result = result.filter((d) => d.sinceYear.toString() === selectedYear);
    }

    if (sortBy === "latest") {
      result.sort((a, b) => b.sinceYear - a.sinceYear);
    } else if (sortBy === "oldest") {
      result.sort((a, b) => a.sinceYear - b.sinceYear);
    } else if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [searchQuery, selectedTier, selectedYear, sortBy]);

  const totalPages = Math.ceil(filteredDonors.length / pageSize) || 1;
  const paginatedDonors = filteredDonors.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full bg-[#f8fafc] pb-16">
      {/* ── Sub-Nav Directory Pill Switcher ── */}
      {onSwitchTab && (
        <CommunityDirectorySubNav
          activeTab="donors"
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
              Our Donors
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              We are grateful to our donors whose support helps us continue our work in education, healthcare, skills, livelihoods and community development.
            </p>
          </div>

          {/* Elegant Quote Box (Soft Blue Tint) */}
          <div className="lg:max-w-md bg-[#f0f6fc] border border-[#cfe1f3] rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-2xs">
            <div className="absolute top-1 right-2 text-[#071527]/10 font-serif text-6xl select-none pointer-events-none">
              &ldquo;
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-[#0B2238] leading-relaxed relative z-10">
              &ldquo;A generous heart builds a stronger and more inclusive community.&rdquo;
            </p>
            <div className="flex justify-end mt-1 text-[#1c558c]">
              <svg className="w-5 h-5 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 12,2 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            FILTER & SEARCH BAR (Soft Light Blue Tint)
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
                Recognition Category:
              </span>
              <select
                value={selectedTier}
                onChange={(e) => {
                  setSelectedTier(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
              >
                <option value="All">All</option>
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Recognised">Recognised</option>
                <option value="Individual">Individual</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
                Year:
              </span>
              <select
                value={selectedYear}
                onChange={(e) => {
                  setSelectedYear(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
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
                <option value="oldest">Oldest</option>
                <option value="name_asc">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MAIN CONTENT: Left 4-Column Grid (8 Cards) + Right Sidebar
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 4-Column Donors Grid (8 Cards Desktop, Lift on Hover) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {paginatedDonors.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">No donors found in directory</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery || selectedTier !== "All"
                    ? "Try adjusting your search criteria or clearing active filters."
                    : "No donors publicly listed in this directory yet. Join hands with us as a donor partner!"}
                </p>
                <div className="pt-4">
                  <a
                    href="/donate"
                    className="inline-block px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-sm"
                  >
                    Donate &amp; Support
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {paginatedDonors.map((donor) => {
                // Tier styling
                const tierStyle =
                  donor.tier === "Platinum"
                    ? "bg-[#fef3c7] text-[#b45309] border-[#fde68a]"
                    : donor.tier === "Gold"
                    ? "bg-[#fef3c7] text-[#d97706] border-[#fde68a]"
                    : donor.tier === "Silver"
                    ? "bg-[#f1f5f9] text-[#475569] border-[#cbd5e1]"
                    : donor.tier === "Recognised"
                    ? "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]"
                    : "bg-[#e6f4ea] text-[#137333] border-[#ceead6]";

                return (
                  <div
                    key={donor.id}
                    onClick={() => setSelectedDonor(donor)}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-[#0B2238]/8 hover:border-[#1c558c]/40 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Top Tier Badge */}
                      <div className="mb-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold border ${tierStyle}`}
                        >
                          <Heart className="w-3 h-3 fill-current" />
                          <span>{donor.tier} Donor</span>
                        </span>
                      </div>

                      {/* Logo or Photo Area */}
                      <div className="h-20 w-full rounded-xl bg-[#f8fbfe] border border-[#cfe1f3]/70 flex items-center justify-center p-2 mb-3 group-hover:bg-[#f0f6fc] transition-colors">
                        {donor.name.includes("Tata") ? (
                          <div className="flex flex-col items-center">
                            <svg viewBox="0 0 48 28" className="w-8 h-4 text-[#005696] group-hover:scale-105 transition-transform" fill="none">
                              <path d="M4,4 L44,4 C40,15 30,24 24,26 C18,24 8,15 4,4 Z" stroke="#005696" strokeWidth="2.5" />
                              <path d="M14,4 L34,4 M24,4 L24,20" stroke="#005696" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                            <span className="text-[9px] font-black tracking-widest text-[#005696] leading-none mt-1">TATA CONSULTANCY SERVICES</span>
                          </div>
                        ) : donor.name.includes("Reliance") ? (
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[11px] font-black tracking-tight text-[#c22026]">Reliance</span>
                            <span className="text-[8px] font-bold tracking-wider text-slate-500">Foundation</span>
                          </div>
                        ) : donor.name.includes("HDFC") ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded bg-[#004b87] flex items-center justify-center text-white text-[11px] font-black group-hover:scale-105 transition-transform">
                              H
                            </div>
                            <span className="text-[10px] font-bold text-[#004b87]">HDFC BANK</span>
                          </div>
                        ) : donor.name.includes("State Bank") ? (
                          <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 rounded-full bg-[#280071] flex items-center justify-center text-white text-[9px] font-black group-hover:scale-105 transition-transform">
                              SBI
                            </div>
                            <span className="text-[10px] font-bold text-[#280071]">SBI</span>
                          </div>
                        ) : donor.name.includes("ITC") ? (
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[13px] font-black tracking-wider text-[#1c558c]">ITC</span>
                            <span className="text-[8px] font-bold text-slate-500">ITC Limited</span>
                          </div>
                        ) : donor.name.includes("Cipla") ? (
                          <div className="flex flex-col items-center text-center">
                            <span className="text-[13px] font-black tracking-wider text-[#d0202f]">Cipla</span>
                            <span className="text-[7px] font-bold text-slate-500">Foundation</span>
                          </div>
                        ) : donor.name === "Ayesha Khan" ? (
                          <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200">
                            <img src={ayeshaKhanImg} alt="Ayesha Khan" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0B2238] to-[#1c558c] text-white flex items-center justify-center font-bold text-sm">
                            {donor.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Name & Type */}
                      <h4 className="text-sm font-bold text-[#0B2238] group-hover:text-[#1c558c] transition-colors leading-tight line-clamp-1">
                        {donor.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{donor.type}</span>
                      </p>

                      {/* Cause & Since */}
                      <div className="space-y-1 mt-2.5 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-[#1c558c] shrink-0" />
                          <span className="truncate">{donor.causes.join(" | ")}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Since {donor.sinceYear}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Profile */}
                    <div className="pt-3 border-t border-slate-100 mt-3.5">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDonor(donor);
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

          {/* RIGHT SIDEBAR: Recognition Box & Impact Box */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Box 1: Donor Recognition (Soft Blue) */}
            <div className="bg-[#f0f6fc] rounded-2xl p-5 border border-[#cfe1f3] shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#071527] text-white flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0B2238]">
                    Donor Recognition
                  </h4>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                We acknowledge our supporters with respect and gratitude. Recognition is provided only with the consent of the donor.
              </p>

              {/* Tiers List */}
              <div className="space-y-2.5 pt-2 border-t border-[#cfe1f3]/80 text-xs">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200/60 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#f59e0b] text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Platinum Donor</span>
                    <span className="text-xs text-slate-600">₹50,000 &amp; Above &bull; Substantial support</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/50 border border-amber-100 shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Gold Donor</span>
                    <span className="text-xs text-slate-600">₹20,000 &ndash; ₹49,999 &bull; Significant support</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-[#cfe1f3] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-slate-400 text-white flex items-center justify-center shrink-0 shadow-2xs font-bold text-xs">
                    ₹
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Silver Donor</span>
                    <span className="text-xs text-slate-600">₹5,000 &ndash; ₹19,999 &bull; Valuable support</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/donate"
                  className="w-full py-2.5 px-4 rounded-xl border border-[#cfe1f3] bg-white hover:bg-[#e4effa] text-xs font-bold text-[#0B2238] transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Become a Donor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 2: Your Support Creates Real Impact */}
            <div className="bg-[#f0f6fc] rounded-2xl overflow-hidden border border-[#cfe1f3] shadow-xs">
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center text-xs">
                    <Heart className="w-4 h-4 text-brand-orange" />
                  </div>
                  <h4 className="text-sm font-extrabold text-[#0B2238]">
                    Your Support Creates Real Impact
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  From better learning spaces to healthier communities, your contribution helps us build opportunities where they are needed most.
                </p>
                <div>
                  <Link
                    to="/donate"
                    className="w-full py-2 px-3 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Support Our Mission</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Photo */}
              <div className="h-44 w-full relative overflow-hidden">
                <img
                  src={childrenRunningImg}
                  alt="Rural students on village path"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM PRE-FOOTER BANNER: "Join Our Donor Community" (Crystal Clear 1MB Image)
           ══════════════════════════════════════════════════════════ */}
        <section className="mt-14 rounded-3xl overflow-hidden border border-[#cfe1f3] shadow-sm bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Dark Navy Banner with Curve */}
            <div className="lg:col-span-7 xl:col-span-8 bg-[#071527] p-8 sm:p-10 flex flex-col justify-between text-white relative">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
                  BE A PART OF SOMETHING BIGGER
                </span>
                <h3 className="text-2xl sm:text-3xl font-black mt-1 leading-snug">
                  Join Our Donor Community
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                  Whether you are an individual, a business or an institution, your support can help us create lasting change.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/25 hover:bg-white/10 text-white text-xs font-bold transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Ways to Donate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Photo: Crystal-Clear High-Resolution Student Photograph */}
            <div className="lg:col-span-5 xl:col-span-4 h-64 sm:h-72 lg:h-auto relative overflow-hidden bg-slate-900">
              <img
                src={sectorEdu1Img}
                alt="Student writing in classroom"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Profile Detail Modal */}
      {selectedDonor && (
        <ProfileDetailModal
          profile={{
            type: "donor",
            data: selectedDonor,
          }}
          onClose={() => setSelectedDonor(null)}
        />
      )}
    </div>
  );
}
