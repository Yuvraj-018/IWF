import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search,
  Filter,
  Users,
  ShieldCheck,
  UserCheck,
  MapPin,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { MEMBERS_DATA, MemberCategory, MemberStatus, MemberItem } from "../communityData";
import { ProfileDetailModal } from "./ProfileDetailModal";
import { MemberVerificationModal } from "./MemberVerificationModal";

export function MembersDirectoryTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "name_asc" | "name_desc" | "id">("latest");
  const [selectedMember, setSelectedMember] = useState<MemberItem | null>(null);
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Unique locations from data
  const locations = useMemo(() => {
    const locs = Array.from(new Set(MEMBERS_DATA.map((m) => `${m.district}, ${m.state}`)));
    return ["All", ...locs];
  }, []);

  // Filter & Sort logic
  const filteredMembers = useMemo(() => {
    let result = [...MEMBERS_DATA];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.id.toLowerCase().includes(q) ||
          m.district.toLowerCase().includes(q) ||
          m.state.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((m) => m.category === selectedCategory);
    }

    if (selectedStatus !== "All") {
      result = result.filter((m) => m.status === selectedStatus);
    }

    if (selectedLocation !== "All") {
      result = result.filter((m) => `${m.district}, ${m.state}` === selectedLocation);
    }

    // Sort
    if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "id") {
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [searchQuery, selectedCategory, selectedStatus, selectedLocation, sortBy]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const paginatedMembers = filteredMembers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedLocation("All");
    setSortBy("latest");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* ── Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Members Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            ISLAH Community Members
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Official verified registry of active grassroots members supporting our mission across Bihar, Delhi NCR and Uttar Pradesh.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name or Member ID..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        </div>
      </div>

      {/* ── Filter Controls & Member Status Card */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div className="space-y-6 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-orange" />
              <span>Filter Members</span>
            </h3>
            <button
              onClick={resetFilters}
              className="text-[11px] text-slate-500 hover:text-brand-orange font-semibold flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Membership Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Membership Category</label>
            <div className="space-y-1">
              {["All", "Blue", "Yellow", "Green", "Orange"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-blue-50 text-blue-800 font-bold"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>{cat === "All" ? "All Categories" : `${cat} Card Member`}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Status</label>
            <div className="flex flex-wrap gap-1.5">
              {["All", "Active", "Pending", "Expired"].map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setSelectedStatus(st);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    selectedStatus === st
                      ? "bg-[#071527] text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-brand-orange"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === "All" ? "All Locations" : loc}
                </option>
              ))}
            </select>
          </div>

          {/* "Are you a member?" Card (Stitch Sidebar Widget) */}
          <div className="p-4 bg-gradient-to-br from-[#071527] to-[#122e54] text-white rounded-xl space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Are you a member?</h4>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Verify your digital ID card credentials, check renewal dates, or look up official registration details.
            </p>
            <button
              onClick={() => setIsVerificationOpen(true)}
              className="w-full py-2 px-3 rounded-lg bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Member Status Check</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Main Grid */}
        <div className="space-y-6">
          {/* Status Bar & Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 bg-white p-4 rounded-xl border border-slate-200/80">
            <div>
              <p>
                Showing <span className="font-bold text-slate-900">{filteredMembers.length}</span> verified members
                <span className="hidden sm:inline"> • Active chapters: Bihar, UP & Delhi NCR</span>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-none focus:border-brand-orange text-xs"
              >
                <option value="latest">Latest</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="id">Member ID</option>
              </select>
            </div>
          </div>

          {/* Member Card Grid */}
          {paginatedMembers.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
              <Users className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">No members found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No matching member profiles found with the selected filters. Try adjusting your search term or resetting the filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {paginatedMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    {/* Badges */}
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          member.category === "Blue"
                            ? "bg-blue-100 text-blue-800"
                            : member.category === "Yellow"
                            ? "bg-amber-100 text-amber-800"
                            : member.category === "Green"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {member.category} Card
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          member.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : member.status === "Pending"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>

                    {/* Member Name & ID */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                      <p className="text-xs font-mono text-slate-400 mt-0.5">ID: {member.id}</p>
                      <p className="text-xs text-slate-600 mt-1">{member.type}</p>
                    </div>

                    {/* Location & Details */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                        {member.district}, {member.state}
                      </span>
                      <span>Till {member.validTill.split(" ")[2]}</span>
                    </div>
                  </div>

                  {/* Profile Action */}
                  <div className="pt-4 mt-3 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#071527] text-slate-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>View Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${
                    currentPage === p
                      ? "bg-[#071527] text-white"
                      : "border border-slate-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Section: "Join ISLAH Community" */}
      <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-brand-orange text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join ISLAH Community</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Be a Part of Something Bigger.
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Partner, support, collaborate or contribute — together we can build stronger, more inclusive and sustainable communities.
          </p>
        </div>
        <Link
          to="/get-involved"
          className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs sm:text-sm shrink-0 flex items-center gap-2 transition-colors shadow-md"
        >
          <span>Become a Member</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Modals */}
      <ProfileDetailModal
        profile={selectedMember ? { type: "member", data: selectedMember } : null}
        onClose={() => setSelectedMember(null)}
      />
      <MemberVerificationModal
        isOpen={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />
    </div>
  );
}

