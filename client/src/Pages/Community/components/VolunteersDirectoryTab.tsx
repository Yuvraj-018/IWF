import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  UserCheck,
  Search,
  GraduationCap,
  Heart,
  ChevronRight,
  ArrowRight,
  MapPin,
  Sparkles,
  Award,
  Users,
  Compass,
  Briefcase,
} from "lucide-react";
import { VOLUNTEERS_DATA, VolunteerRole, VolunteerItem } from "../communityData";
import { ProfileDetailModal } from "./ProfileDetailModal";

export function VolunteersDirectoryTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "name_asc" | "role">("latest");
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerItem | null>(null);

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
    let result = [...VOLUNTEERS_DATA];

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
      result = result.filter((v) => v.domain.toLowerCase().includes(selectedDomain.toLowerCase()));
    }

    if (selectedRole !== "All") {
      result = result.filter((v) => v.role === selectedRole);
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
  }, [searchQuery, selectedDomain, selectedRole, selectedLocation, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* ── Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-bold uppercase tracking-wider mb-2">
            <UserCheck className="w-3.5 h-3.5 text-purple-600" />
            <span>Meet Our Volunteers & Mentors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Volunteers & Mentors Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            Meet the educators, doctors, developers, lawyers and grassroots leaders who donate their time and knowledge to create lasting change across villages in India.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/volunteer"
            className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-md"
          >
            <span>Volunteer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/mentor"
            className="px-4 py-2.5 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
          >
            <span>Mentor</span>
            <GraduationCap className="w-4 h-4 text-brand-orange" />
          </Link>
        </div>
      </div>

      {/* ── Filters & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Role Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Role:
            </span>
            {["All", "Mentor", "Volunteer"].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedRole === role
                    ? "bg-[#071527] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {role === "All" ? "All Roles" : `${role}s`}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mentor or expertise..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Domain Filter Pills */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Domain:
            </span>
            {domains.map((dom) => (
              <button
                key={dom}
                onClick={() => setSelectedDomain(dom)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDomain === dom
                    ? "bg-purple-700 text-white font-bold"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                }`}
              >
                {dom}
              </button>
            ))}
          </div>
        </div>

        {/* Location & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Location:</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocation(loc)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    selectedLocation === loc
                      ? "bg-slate-800 text-white font-bold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-700 text-xs focus:outline-none"
            >
              <option value="latest">Latest</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="role">Role (Mentors first)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Volunteers & Mentors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVolunteers.map((vol) => (
          <div
            key={vol.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    vol.role === "Mentor"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {vol.role}
                </span>

                <div className="w-9 h-9 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700 font-mono border border-slate-200">
                  {vol.initials}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{vol.name}</h3>
                <p className="text-xs text-purple-700 font-medium mt-0.5">{vol.title}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{vol.domain}</p>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {vol.bio}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange" />
                  {vol.location}
                </span>
                <span className="text-[11px] font-semibold text-slate-600">Active Contributor</span>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedVolunteer(vol)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#071527] text-slate-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── "Why Volunteer with ISLAH?" 4 Pillars (Stitch Screen 5 Feature) */}
      <section className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 space-y-6">
        <div className="max-w-2xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Volunteering Ethos</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Why Volunteer with ISLAH?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Whether you can give 2 hours a week online or join on-ground weekend medical camps, every minute you dedicate opens new doors for underserved families.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Purposeful Contribution</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Make a tangible difference in the lives of rural children, women self-help collectives, and farming families.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Share Your Expertise</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Put your professional background in medicine, software, accounting, law, or teaching into social practice.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Learn & Collaborate</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Gain firsthand perspectives on grassroots development, multi-stakeholder governance, and rural sociology.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Community Impact</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Help build resilient village institutions and support sustainable programs that outlast any single campaign.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 italic">
            * Certificates of volunteering and recommendation letters are provided for college and career credits.
          </span>
          <Link
            to="/volunteer"
            className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <span>Apply as a Volunteer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Profile Detail Modal */}
      <ProfileDetailModal
        profile={selectedVolunteer ? { type: "volunteer", data: selectedVolunteer } : null}
        onClose={() => setSelectedVolunteer(null)}
      />
    </div>
  );
}

