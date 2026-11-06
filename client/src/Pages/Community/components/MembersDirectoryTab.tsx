import { useState, useMemo, useEffect } from "react";
import { listMembers } from "@/services/memberService";
import {
  Search,
  Users,
  MapPin,
  ArrowRight,
  RotateCcw,
  User,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Check,
  RefreshCw,
} from "lucide-react";
import { MEMBERS_DATA, MemberCategory, MemberItem } from "../communityData";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ProfileDetailModal } from "./ProfileDetailModal";
import { Link } from "@tanstack/react-router";
import type { RoleType } from "@/components/forms/RoleFormModal";
import type { CommunityTab } from "./CommunitySelectiveBar";
import { CommunityDirectorySubNav } from "./CommunityDirectorySubNav";

import ayeshaKhanImg from "@/assets/community/ayesha-khan.jpg";
import rahulSharmaImg from "@/assets/community/rahul-sharma.jpg";
import nehaVermaImg from "@/assets/community/neha-verma.jpg";
import patient1Img from "@/assets/patient-1.jpg";
import patient2Img from "@/assets/patient-2.jpg";
import patient3Img from "@/assets/patient-3.jpg";
import patient4Img from "@/assets/patient-4.jpg";
import storyWomenImg from "@/assets/media/story_women.jpg";
import landscapeImg from "@/assets/community/landscape-village.jpg";

interface MembersDirectoryTabProps {
  onSwitchTab?: (tab: CommunityTab) => void;
  onOpenRoleModal?: (role: RoleType) => void;
}

const MEMBER_PHOTOS: Record<string, string> = {
  "ISLAH-MB-0012": ayeshaKhanImg,
  "ISLAH-MY-0034": rahulSharmaImg,
  "ISLAH-MG-0056": nehaVermaImg,
  "ISLAH-MB-0078": patient1Img,
  "ISLAH-MY-0091": patient3Img,
  "ISLAH-MG-0110": patient2Img,
  "ISLAH-MB-0127": storyWomenImg,
  "ISLAH-MY-0154": patient4Img,
  "ISLAH-MG-0178": ayeshaKhanImg,
};

export function MembersDirectoryTab({
  onSwitchTab,
  onOpenRoleModal,
}: MembersDirectoryTabProps) {
  const { settings } = useSiteSettings();
  const defaultMembers = useMemo(() => {
    return settings?.community_directory?.members && settings.community_directory.members.length > 0
      ? (settings.community_directory.members as unknown as MemberItem[])
      : MEMBERS_DATA;
  }, [settings]);

  const [allMembers, setAllMembers] = useState<MemberItem[]>(defaultMembers);

  useEffect(() => {
    let cancelled = false;
    listMembers().then((res) => {
      if (!cancelled && res.success && Array.isArray(res.data) && res.data.length > 0) {
        const mapped: MemberItem[] = res.data.map((m: any) => ({
          id: m.memberNo || m.id || m._id,
          name: m.name,
          category: m.category as any,
          type: (m.annualFee >= 1000 ? "Life Member" : "Annual Member") as any,
          district: m.district || "Darbhanga",
          state: m.state || "Bihar",
          status: m.status as any,
          joinDate: m.joined || m.validFrom || "2024-01-15",
          validTill: m.validTill || "2026-12-31",
          avatarUrl: m.photoUrl,
          profession: m.metadata?.profession || "Community Member",
        }));
        setAllMembers(mapped);
      }
    }).catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("All Locations");
  const [sortBy, setSortBy] = useState<"latest" | "name_asc" | "id">("latest");
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

  // Toggle Category Checkbox
  const toggleCategory = (cat: string) => {
    setCurrentPage(1);
    if (cat === "All") {
      setSelectedCategories([]);
      return;
    }
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Status Checkbox
  const toggleStatus = (st: string) => {
    setCurrentPage(1);
    if (st === "All") {
      setSelectedStatuses([]);
      return;
    }
    setSelectedStatuses((prev) =>
      prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]
    );
  };

  // Unique locations from data
  const locations = useMemo(() => {
    const locs = Array.from(
      new Set(allMembers.map((m) => `${m.district}, ${m.state}`))
    );
    return ["All Locations", ...locs];
  }, [allMembers]);

  // Filter & Sort logic
  const filteredMembers = useMemo(() => {
    let result = [...allMembers];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q) ||
          m.type.toLowerCase().includes(q) ||
          m.district.toLowerCase().includes(q) ||
          m.state.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((m) => selectedCategories.includes(m.category));
    }

    if (selectedType !== "All") {
      result = result.filter((m) => m.type === selectedType);
    }

    if (selectedStatuses.length > 0) {
      result = result.filter((m) => selectedStatuses.includes(m.status));
    }

    if (
      selectedLocation &&
      selectedLocation !== "All" &&
      selectedLocation !== "All Locations"
    ) {
      result = result.filter(
        (m) => `${m.district}, ${m.state}` === selectedLocation
      );
    }

    // Sort
    if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "id") {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [
    searchQuery,
    selectedCategories,
    selectedType,
    selectedStatuses,
    selectedLocation,
    sortBy,
  ]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedType("All");
    setSelectedStatuses([]);
    setSelectedLocation("All Locations");
    setSortBy("latest");
    setCurrentPage(1);
  };

  return (
    <div className="w-full bg-[#f8fafc] pb-16">
      {/* ── Sub-Nav Directory Pill Switcher ── */}
      {onSwitchTab && (
        <CommunityDirectorySubNav
          activeTab="members"
          onSwitchTab={onSwitchTab}
        />
      )}

      {/* ── Main Two-Column Directory Body ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ══════════════════════════════════════════════════════════
              LEFT SIDEBAR: Filter Members (Soft Light-Blue Themed)
             ══════════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-4 xl:col-span-3 space-y-6">
            <div className="bg-[#f0f6fc] rounded-2xl p-5 border border-[#cfe1f3] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#cfe1f3]/80">
                <h3 className="text-base font-extrabold text-[#0B2238] tracking-tight flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#1c558c]" />
                  <span>Filter Members</span>
                </h3>
                <span className="text-xs font-bold text-[#1c558c] bg-white px-2.5 py-0.5 rounded-full border border-[#cfe1f3]">
                  {filteredMembers.length} Found
                </span>
              </div>

              {/* Sidebar Search Input */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by name, member ID..."
                  className="w-full pl-3.5 pr-9 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] transition text-slate-800"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Membership Category */}
              <div>
                <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wider mb-2.5">
                  Membership Category
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer select-none hover:text-[#071527]">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === 0}
                      onChange={() => toggleCategory("All")}
                      className="rounded text-[#071527] focus:ring-[#071527] w-4 h-4"
                    />
                    <span className="font-bold text-slate-900">All Categories</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Blue")}
                      onChange={() => toggleCategory("Blue")}
                      className="rounded text-[#2563eb] focus:ring-[#2563eb] w-4 h-4"
                    />
                    <span>Blue Card (Community Member)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Yellow")}
                      onChange={() => toggleCategory("Yellow")}
                      className="rounded text-[#d97706] focus:ring-[#d97706] w-4 h-4"
                    />
                    <span>Yellow Card (Contributing Member)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Green")}
                      onChange={() => toggleCategory("Green")}
                      className="rounded text-[#059669] focus:ring-[#059669] w-4 h-4"
                    />
                    <span>Green Card (Patron Member)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes("Orange")}
                      onChange={() => toggleCategory("Orange")}
                      className="rounded text-[#ea580c] focus:ring-[#ea580c] w-4 h-4"
                    />
                    <span>Orange Card (Special Member)</span>
                  </label>
                </div>
              </div>

              {/* Member Type Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wider mb-1.5">
                  Member Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => {
                    setSelectedType(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
                >
                  <option value="All">All Types</option>
                  <option value="Community Member">Community Member</option>
                  <option value="Contributing Member">Contributing Member</option>
                  <option value="Patron Member">Patron Member</option>
                  <option value="Executive Member">Executive Member</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wider mb-2.5">
                  Status
                </label>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2.5 text-slate-700 cursor-pointer select-none hover:text-[#071527]">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.length === 0}
                      onChange={() => toggleStatus("All")}
                      className="rounded text-[#071527] focus:ring-[#071527] w-4 h-4"
                    />
                    <span className="font-bold text-slate-900">All Status</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes("Active")}
                      onChange={() => toggleStatus("Active")}
                      className="rounded text-emerald-600 focus:ring-emerald-600 w-4 h-4"
                    />
                    <span>Active</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes("Pending")}
                      onChange={() => toggleStatus("Pending")}
                      className="rounded text-amber-600 focus:ring-amber-600 w-4 h-4"
                    />
                    <span>Pending</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-slate-600 hover:text-slate-900 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes("Expired")}
                      onChange={() => toggleStatus("Expired")}
                      className="rounded text-slate-500 focus:ring-slate-500 w-4 h-4"
                    />
                    <span>Expired</span>
                  </label>
                </div>
              </div>

              {/* Location Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#0B2238] uppercase tracking-wider mb-1.5">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => {
                    setSelectedLocation(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 bg-white text-xs rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] text-slate-800"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="w-full py-2.5 px-3 rounded-xl border border-[#cfe1f3] bg-white hover:bg-[#e4effa] text-xs font-bold text-[#071527] flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs hover:border-[#1c558c]/40"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#1c558c]" />
                <span>Reset Filters</span>
              </button>
            </div>

            {/* Member Portal Callout Box */}
            <div className="bg-[#f0f6fc] border border-[#cfe1f3] rounded-2xl p-5 text-center shadow-xs">
              <div className="w-12 h-12 rounded-full bg-[#071527] text-white flex items-center justify-center mx-auto mb-3 shadow-xs">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-base font-extrabold text-[#0B2238]">
                Are you a member?
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Check your membership status, renew your plan and download your member card.
              </p>

              <div className="space-y-2 pt-4">
                <Link
                  to="/membership"
                  hash="membership-status"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Check Membership Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/membership"
                  hash="membership-status"
                  className="w-full py-2 px-4 rounded-xl bg-white hover:bg-orange-50 border border-brand-orange text-brand-orange text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Renew Membership</span>
                </Link>
              </div>
            </div>
          </aside>

          {/* ══════════════════════════════════════════════════════════
              RIGHT MAIN AREA: Search & Sort Bar, 9-Cards Grid, Pagination
             ══════════════════════════════════════════════════════════ */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Search, Sort & Counter Bar (Soft Blue Tint) */}
            <div className="bg-[#f0f6fc] rounded-2xl p-4 border border-[#cfe1f3] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search members by name, ID or keyword..."
                  className="w-full pl-3.5 pr-9 py-2 bg-white text-xs sm:text-sm rounded-xl border border-[#cfe1f3] hover:border-[#1c558c]/60 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] transition text-slate-800"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="flex items-center gap-3 shrink-0">
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
                  <option value="id">Member ID</option>
                </select>
              </div>
            </div>

            {/* Showing Count */}
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-slate-500 font-medium">
                Showing{" "}
                <span className="font-bold text-[#0B2238]">
                  {filteredMembers.length === 0
                    ? "0"
                    : `${(currentPage - 1) * pageSize + 1} – ${Math.min(
                        currentPage * pageSize,
                        filteredMembers.length
                      )}`}
                </span>{" "}
                of{" "}
                <span className="font-bold text-[#0B2238]">
                  {filteredMembers.length}
                </span>{" "}
                members
              </p>
            </div>

            {/* 3-Column Members Grid (9 Cards per page on Desktop, Premium Lift Hover) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedMembers.map((member) => {
                const photo = MEMBER_PHOTOS[member.id];
                const categoryColor =
                  member.category === "Blue"
                    ? "bg-[#2563eb]"
                    : member.category === "Yellow"
                    ? "bg-[#f59e0b]"
                    : member.category === "Green"
                    ? "bg-[#10b981]"
                    : "bg-[#f97316]";

                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:shadow-[#0B2238]/8 hover:border-[#1c558c]/40 hover:-translate-y-1.5 transition-all duration-300 ease-out flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      {/* Photo Container with Category Badge & Status Pill */}
                      <div className="relative aspect-4/3 sm:aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-3">
                        {photo ? (
                          <img
                            src={photo}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#0B2238] to-[#1c558c] flex items-center justify-center text-white text-2xl font-black">
                            {member.name.slice(0, 2).toUpperCase()}
                          </div>
                        )}

                        {/* Category Badge Pill (Top Right) */}
                        <div className="absolute top-2.5 right-2.5 flex flex-col items-end gap-1.5">
                          <span
                            className={`${categoryColor} text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider px-2 py-0.5 rounded shadow-xs`}
                          >
                            {member.category} Card
                          </span>
                        </div>

                        {/* Status Pill (Bottom Left or Right) */}
                        <div className="absolute bottom-2.5 left-2.5">
                          {member.status === "Active" ? (
                            <span className="bg-white/95 backdrop-blur-xs text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Active</span>
                            </span>
                          ) : member.status === "Pending" ? (
                            <span className="bg-white/95 backdrop-blur-xs text-amber-700 border border-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>Pending</span>
                            </span>
                          ) : (
                            <span className="bg-white/95 backdrop-blur-xs text-slate-600 border border-slate-200 text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              <span>Expired</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Name & ID */}
                      <h4 className="text-base font-bold text-[#0B2238] group-hover:text-[#1c558c] transition-colors leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Member ID: <span className="text-slate-700 font-semibold">{member.id}</span>
                      </p>

                      {/* Role & Location */}
                      <div className="space-y-1 mt-2.5 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-medium truncate">{member.type}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#f97316] shrink-0" />
                          <span className="truncate">
                            {member.district}, {member.state}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* View Profile Link */}
                    <div className="pt-3.5 border-t border-slate-100 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMember(member);
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 transition ${
                    currentPage === 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-slate-100 cursor-pointer"
                  }`}
                  aria-label="Previous Page"
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
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          BOTTOM PRE-FOOTER BANNER: "Be a Part of Something Bigger"
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-[#cfe1f3] shadow-sm bg-white">
          {/* Left: Landscape Village Image */}
          <div className="lg:col-span-4 h-52 sm:h-64 lg:h-auto relative overflow-hidden">
            <img
              src={landscapeImg}
              alt="Rural village landscape"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Center: Navy Dark Banner */}
          <div className="lg:col-span-5 bg-[#071527] p-6 sm:p-8 flex flex-col justify-between text-white relative">
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

          {/* Right: Become a Member Box */}
          <div className="lg:col-span-3 bg-[#f0f6fc] p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#cfe1f3]">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white text-[#071527] flex items-center justify-center mb-4 shadow-2xs border border-[#cfe1f3]">
                <Users className="w-6 h-6 text-[#071527]" />
              </div>
              <h4 className="text-lg font-bold text-[#0B2238]">
                Become a Member
              </h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Join the ISLAH community and be part of a movement for lasting change.
              </p>
            </div>

            <div className="pt-5">
              <button
                onClick={() => onOpenRoleModal?.("member")}
                className="w-full py-2.5 px-4 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Apply for Membership</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Detail Modal */}
      {selectedMember && (
        <ProfileDetailModal
          profile={{
            type: "member",
            data: selectedMember,
          }}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Verification Modal */}
    </div>
  );
}
