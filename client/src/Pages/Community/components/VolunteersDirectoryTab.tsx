import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  UserCheck,
  Search,
  GraduationCap,
  Heart,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Users,
  Target,
  BookOpen,
  Sprout,
  Compass,
} from "lucide-react";
import { VOLUNTEERS_DATA, VolunteerRole, VolunteerItem } from "../communityData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ProfileDetailModal } from "./ProfileDetailModal";
import type { RoleType } from "@/components/forms/RoleFormModal";
import type { CommunityTab } from "./CommunitySelectiveBar";
import { CommunityDirectorySubNav } from "./CommunityDirectorySubNav";

import ayeshaKhanImg from "@/assets/community/ayesha-khan.jpg";
import rahulSharmaImg from "@/assets/community/rahul-sharma.jpg";
import nehaVermaImg from "@/assets/community/neha-verma.jpg";
import patient1Img from "@/assets/patient-1.jpg";
import patient2Img from "@/assets/patient-2.jpg";
import patient4Img from "@/assets/patient-4.jpg";
import storyWomenImg from "@/assets/media/story_women.jpg";
import sectorEdu2Img from "@/assets/sector_education_2.png";
import overviewHeroImg from "@/assets/overview-hero.jpg";

interface VolunteersDirectoryTabProps {
  onSwitchTab?: (tab: CommunityTab) => void;
  onOpenRoleModal?: (role: RoleType) => void;
}

const VOLUNTEER_PHOTOS: Record<string, string> = {
  "VOL-001": ayeshaKhanImg,
  "VOL-002": rahulSharmaImg,
  "VOL-003": nehaVermaImg,
  "VOL-004": patient2Img,
  "VOL-005": storyWomenImg,
  "VOL-006": patient4Img,
  "VOL-007": ayeshaKhanImg,
  "VOL-008": patient1Img,
  "VOL-009": nehaVermaImg,
};

export function VolunteersDirectoryTab({
  onSwitchTab,
  onOpenRoleModal,
}: VolunteersDirectoryTabProps) {
  const { settings } = useSiteSettings();
  const allVolunteers = useMemo(() => {
    if (settings?.community_directory?.volunteers && settings.community_directory.volunteers.length > 0) {
      return settings.community_directory.volunteers as unknown as VolunteerItem[];
    }
    if (settings?.community_directory?.spotlight) {
      const fromSpotlight = settings.community_directory.spotlight
        .filter((s: any) => s.type === "volunteer" || s.type === "mentor")
        .map((s: any) => ({
          id: s.id,
          name: s.name,
          role: (s.type === "mentor" ? "Mentor" : "Volunteer") as any,
          title: s.role || "Volunteer",
          domain: s.category || "General Support",
          location: s.location || "Pan India",
          bio: s.bio || "",
          initials: s.name ? s.name.slice(0, 2).toUpperCase() : "VL",
        }));
      if (fromSpotlight.length > 0) return fromSpotlight;
    }
    return [];
  }, [settings]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "name_asc" | "role">("latest");
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  const domains = [
    "All",
    "Education & Career Guidance",
    "Digital Literacy & Tech",
    "Healthcare Awareness",
    "Skills & Livelihoods",
    "Women Empowerment",
    "Agriculture & Rural",
    "Legal Rights",
  ];

  const locations = ["All", "Delhi NCR", "Bihar", "Uttar Pradesh", "Remote / Online"];

  const filteredVolunteers = useMemo(() => {
    let result = [...allVolunteers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.title.toLowerCase().includes(q) ||
          v.domain.toLowerCase().includes(q) ||
          v.location.toLowerCase().includes(q) ||
          v.bio.toLowerCase().includes(q)
      );
    }

    if (selectedDomain !== "All") {
      result = result.filter((v) =>
        v.domain.toLowerCase().includes(selectedDomain.toLowerCase())
      );
    }

    if (selectedLocation !== "All") {
      result = result.filter((v) => v.location.includes(selectedLocation));
    }

    if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "role") {
      result.sort((a, b) => (a.role === "Mentor" ? -1 : 1));
    }

    return result;
  }, [searchQuery, selectedDomain, selectedLocation, sortBy]);

  const totalPages = Math.ceil(filteredVolunteers.length / pageSize) || 1;
  const paginatedVolunteers = filteredVolunteers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full bg-[#f8fafc] pb-16">
      {/* ── Sub-Nav Directory Pill Switcher ── */}
      {onSwitchTab && (
        <CommunityDirectorySubNav
          activeTab="volunteers"
          onSwitchTab={onSwitchTab}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ══════════════════════════════════════════════════════════
            TOP HEADER ROW: Title & Elegant Quote Box
           ══════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2238] tracking-tight">
                Meet Our Volunteers &amp; Mentors
              </h2>
              <span className="text-xs font-bold text-[#1c558c] bg-[#f0f6fc] border border-[#cfe1f3] px-2.5 py-0.5 rounded-full hidden sm:inline">
                Illustrative profiles
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Dedicated individuals from diverse backgrounds, united by a shared purpose &mdash; to create positive and lasting change in communities.
            </p>
          </div>

          {/* Quote Card (Soft Blue Tint) */}
          <div className="lg:max-w-md bg-[#f0f6fc] border border-[#cfe1f3] rounded-2xl p-4 sm:p-5 relative overflow-hidden shadow-2xs">
            <div className="absolute top-1 right-2 text-[#071527]/10 font-serif text-6xl select-none pointer-events-none">
              &ldquo;
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-[#0B2238] leading-relaxed relative z-10">
              &ldquo;A little time, shared with purpose, can create lasting change.&rdquo;
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
              placeholder="Search by name, skill or keyword..."
              className="w-full pl-3.5 pr-9 py-2 bg-white text-xs sm:text-sm rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] transition text-slate-800"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">
                Contribution Area:
              </span>
              <select
                value={selectedDomain}
                onChange={(e) => {
                  setSelectedDomain(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
              >
                {domains.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
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
                <option value="role">Role</option>
              </select>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            MAIN CONTENT: 3-Column Volunteers Grid (9 Cards) + Right Sidebar
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: 3-Column Volunteers Grid (9 Cards, Lift on Hover) */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {paginatedVolunteers.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h4 className="text-sm font-bold text-slate-800">No volunteers or mentors found in directory</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  {searchQuery || selectedDomain !== "All"
                    ? "Try adjusting your search criteria or clearing active filters."
                    : "No volunteers or mentors publicly listed yet. Join our volunteer network to support grassroots initiatives!"}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => onOpenRoleModal?.("volunteer")}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition shadow-sm cursor-pointer"
                  >
                    Join as a Volunteer
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedVolunteers.map((vol) => {
                const photo = VOLUNTEER_PHOTOS[vol.id];
                const isMentor = vol.role === "Mentor";

                return (
                  <div
                    key={vol.id}
                    onClick={() => setSelectedVolunteer(vol)}
                    className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-[#0B2238]/8 hover:border-[#1c558c]/40 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Avatar Circle with Role Badge Pill */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-[#cfe1f3] shrink-0 group-hover:border-[#1c558c]/60 transition-colors">
                          {photo ? (
                            <img
                              src={photo}
                              alt={vol.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#0B2238] to-[#1c558c] text-white flex items-center justify-center font-bold text-sm">
                              {vol.initials || vol.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>

                        {/* Role Badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${
                            isMentor
                              ? "bg-[#071527] text-white"
                              : "bg-[#0d9488] text-white"
                          }`}
                        >
                          <GraduationCap className="w-3 h-3 text-white" />
                          <span>{vol.role}</span>
                        </span>
                      </div>

                      {/* Name & Title */}
                      <h4 className="text-base font-bold text-[#0B2238] group-hover:text-[#1c558c] transition-colors leading-tight">
                        {vol.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        {vol.title}
                      </p>

                      {/* Domain Focus & Location */}
                      <div className="space-y-1.5 mt-3 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#1c558c] shrink-0" />
                          <span className="truncate">{vol.domain}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#f97316] shrink-0" />
                          <span>{vol.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Profile */}
                    <div className="pt-3.5 border-t border-slate-100 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVolunteer(vol);
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

          {/* RIGHT SIDEBAR: "Why Volunteer with ISLAH?" & "Your Skills Can Open Doors" */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Box 1: Why Volunteer with ISLAH? (Soft Blue) */}
            <div className="bg-[#f0f6fc] rounded-2xl p-5 border border-[#cfe1f3] shadow-xs space-y-4">
              <h4 className="text-base font-extrabold text-[#0B2238]">
                Why Volunteer with ISLAH?
              </h4>

              <div className="space-y-3.5 pt-2 text-xs">
                {/* 1. Purposeful Contribution */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Target className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Purposeful Contribution</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Make a real difference in the lives of individuals and communities.
                    </span>
                  </div>
                </div>

                {/* 2. Share Your Expertise */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Users className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Share Your Expertise</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Use your skills and experience to create meaningful change.
                    </span>
                  </div>
                </div>

                {/* 3. Learn & Collaborate */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Learn &amp; Collaborate</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Gain new perspectives and work with a diverse team.
                    </span>
                  </div>
                </div>

                {/* 4. Community Impact */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#071527] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-4 h-4 text-brand-orange" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#0B2238] block text-xs">Community Impact</span>
                    <span className="text-slate-600 leading-relaxed text-xs">
                      Be part of sustainable solutions for stronger communities.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenRoleModal?.("volunteer")}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Explore Volunteer Opportunities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Box 2: Your Skills Can Open Doors */}
            <div className="bg-[#f0f6fc] rounded-2xl overflow-hidden border border-[#cfe1f3] shadow-xs">
              <div className="p-5 space-y-3">
                <h4 className="text-sm font-extrabold text-[#0B2238]">
                  Your Skills Can Open Doors
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Whether you are a professional, student or retired individual &mdash; your time, knowledge and experience can help build brighter futures for rural communities.
                </p>
                <div>
                  <button
                    onClick={() => onOpenRoleModal?.("volunteer")}
                    className="w-full py-2 px-3 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Become a Volunteer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Photo */}
              <div className="h-44 w-full relative overflow-hidden">
                <img
                  src={overviewHeroImg}
                  alt="Mentor teaching rural student outdoors"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </aside>
        </div>

        {/* ══════════════════════════════════════════════════════════
            BOTTOM PRE-FOOTER BANNER: "Be Part of Something Bigger"
           ══════════════════════════════════════════════════════════ */}
        <section className="mt-14 rounded-3xl overflow-hidden border border-[#cfe1f3] shadow-sm bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Mentor Teaching Scene */}
            <div className="lg:col-span-4 h-52 sm:h-64 lg:h-auto relative overflow-hidden bg-slate-900">
              <img
                src={sectorEdu2Img}
                alt="Mentor with community students"
                className="w-full h-full object-cover opacity-90"
              />
            </div>

            {/* Center: Dark Navy Banner */}
            <div className="lg:col-span-5 bg-[#071527] p-6 sm:p-8 flex flex-col justify-between text-white">
              <div>
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                  <Sprout className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black mt-1 leading-snug">
                  Be Part of Something Bigger.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  Contribute your time, knowledge or experience to strengthen communities.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onOpenRoleModal?.("volunteer")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/25 hover:bg-white/10 text-white text-xs font-bold transition-all duration-200 hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Ways to Contribute</span>
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
                  We&apos;ll help you find the right opportunity based on your interests and skills.
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
      {selectedVolunteer && (
        <ProfileDetailModal
          profile={{
            type: "volunteer",
            data: selectedVolunteer,
          }}
          onClose={() => setSelectedVolunteer(null)}
        />
      )}
    </div>
  );
}
