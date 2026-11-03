import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  Search,
  Handshake,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Globe,
  Award,
  Sparkles,
  ShieldCheck,
  Target,
  Leaf,
} from "lucide-react";
import { PARTNERS_DATA, PartnerCategory, PartnerItem } from "../communityData";
import { ProfileDetailModal } from "./ProfileDetailModal";

export function PartnersDirectoryTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "name_asc">("latest");
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);

  const locations = ["All", "Pan India", "Maharashtra", "Karnataka", "Jharkhand", "Bihar"];

  const filteredPartners = useMemo(() => {
    let result = [...PARTNERS_DATA];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.focusArea.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedArea !== "All") {
      result = result.filter((p) => p.focusArea.toLowerCase().includes(selectedArea.toLowerCase()));
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* ── Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Handshake className="w-3.5 h-3.5 text-emerald-600" />
            <span>Stronger Partnerships. Brighter Futures.</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our Partners & Sponsors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            We are proud to collaborate with forward-thinking corporations, financial institutions, and charitable foundations to drive sustainable community transformation across rural India.
          </p>
        </div>

        <Link
          to="/partner"
          className="px-5 py-2.5 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-md shrink-0 self-start md:self-auto"
        >
          <Building2 className="w-4 h-4 text-brand-orange" />
          <span>Partner With Us</span>
        </Link>
      </div>

      {/* ── Filters & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Areas Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Area:
            </span>
            {["All", "Technology", "Financial", "Healthcare", "Education", "Skills"].map((area) => (
              <button
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedArea === area
                    ? "bg-[#071527] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {area === "All" ? "All Areas" : area}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by partner or domain..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Sub-bar: Location & Sort */}
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
              <option value="name_asc">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Partner Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPartners.map((partner) => (
          <div
            key={partner.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                  {partner.category}
                </span>

                <div className="w-10 h-10 rounded-xl bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-800 font-mono border border-slate-200">
                  {partner.badge}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{partner.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">{partner.focusArea}</p>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {partner.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  {partner.location}
                </span>
                <span>Since {partner.sinceYear}</span>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedPartner(partner)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#071527] text-slate-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── "Why Partner with ISLAH?" 4 Pillars (Stitch Screen 4 Feature) */}
      <section className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 space-y-6">
        <div className="max-w-2xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Collaboration Framework</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Why Partner with ISLAH?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We work closely with institutional partners, corporate CSR teams, and philanthropic grantmakers to execute measurable, high-accountability programs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Meaningful Impact</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Support programs that deliver measurable, ground-level improvements across rural education, health, and skills.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Handshake className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Shared Expertise</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Combine technical knowledge, technological assets, and localized grassroots trust to maximize social ROI.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">CSR Opportunities</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fully compliant CSR projects aligned with Schedule VII of the Companies Act, backed by certified reports.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Sustainable Development</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Build self-sustaining community institutions, self-help groups, and learning centres that thrive for decades.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 italic">
            * ISLAH is registered under Section 12A, 80G, and MCA CSR Form CSR-1.
          </span>
          <Link
            to="/partner"
            className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <span>Explore Partnership Opportunities</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Profile Detail Modal */}
      <ProfileDetailModal
        profile={selectedPartner ? { type: "partner", data: selectedPartner } : null}
        onClose={() => setSelectedPartner(null)}
      />
    </div>
  );
}

