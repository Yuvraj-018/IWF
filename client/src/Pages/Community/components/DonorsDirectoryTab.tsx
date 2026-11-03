import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Search,
  Award,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Building2,
  Calendar,
  Sparkles,
  TrendingUp,
  RotateCcw,
} from "lucide-react";
import { DONORS_DATA, DonorTier, DonorItem } from "../communityData";
import { ProfileDetailModal } from "./ProfileDetailModal";

export function DonorsDirectoryTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("All");
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"latest" | "oldest" | "name_asc">("latest");
  const [selectedDonor, setSelectedDonor] = useState<DonorItem | null>(null);

  const years = useMemo(() => {
    const yrs = Array.from(new Set(DONORS_DATA.map((d) => d.sinceYear.toString()))).sort().reverse();
    return ["All", ...yrs];
  }, []);

  const filteredDonors = useMemo(() => {
    let result = [...DONORS_DATA];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* ── Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>Generosity Grows Opportunity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Our Donors & Benefactors
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
            We are deeply grateful to our donors whose visionary support powers our programs in education, rural healthcare, skill-building, livelihoods, and humanitarian relief.
          </p>
        </div>

        <Link
          to="/donate"
          className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-md shrink-0 self-start md:self-auto"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Donate to ISLAH</span>
        </Link>
      </div>

      {/* ── Filters & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Recognition Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Tier:
            </span>
            {["All", "Platinum", "Gold", "Silver", "Recognised", "Individual"].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTier(tier)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTier === tier
                    ? "bg-[#071527] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tier}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by donor or cause..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-brand-orange text-slate-800"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          </div>
        </div>

        {/* Sub-bar: Year filter & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Filter by Year:</span>
            <div className="flex items-center gap-1">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYear(y)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    selectedYear === y
                      ? "bg-slate-800 text-white font-bold"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {y}
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
              <option value="oldest">Oldest</option>
              <option value="name_asc">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Donors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredDonors.map((donor) => (
          <div
            key={donor.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Badge & Logo Initial */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    donor.tier === "Platinum"
                      ? "bg-purple-100 text-purple-800"
                      : donor.tier === "Gold"
                      ? "bg-amber-100 text-amber-800"
                      : donor.tier === "Silver"
                      ? "bg-slate-200 text-slate-800"
                      : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {donor.tier} Donor
                </span>

                <div className="w-8 h-8 rounded-lg bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700 font-mono">
                  {donor.logoText}
                </div>
              </div>

              {/* Donor Name & Type */}
              <div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">{donor.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{donor.type}</p>
              </div>

              {/* Supported Causes */}
              <div className="flex flex-wrap gap-1 pt-1">
                {donor.causes.map((c, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-slate-50 text-[11px] font-medium text-slate-600 border border-slate-100"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Since Year */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Partner Since {donor.sinceYear}</span>
                <span className="font-semibold text-slate-700">{donor.amountLabel}</span>
              </div>
            </div>

            {/* View Profile Action */}
            <div className="pt-4 mt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedDonor(donor)}
                className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-[#071527] text-slate-700 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>View Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Donor Recognition Tiers (Stitch Screen 3 Core Feature) */}
      <section className="bg-slate-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-slate-200/90 space-y-6">
        <div className="max-w-2xl space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Donor Recognition</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Transparent Recognition & Tax Exemption
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            We acknowledge our supporters with deep respect and gratitude. Recognition is accorded only with donor consent, and all contributions qualify for 50% tax deductions under Section 80G.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white rounded-xl p-5 border border-purple-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Platinum Donor</h4>
            <p className="text-xs font-bold text-purple-700">₹50,000 & Above</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Substantial institutional or high-net-worth backing funding whole classrooms or health vans.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-amber-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Gold Donor</h4>
            <p className="text-xs font-bold text-amber-700">₹20,000 – ₹49,999</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Significant philanthropic support funding multiple student scholarships or clean water plants.
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Silver Donor</h4>
            <p className="text-xs font-bold text-slate-700">₹5,000 – ₹19,999</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Valuable grassroots donations funding essential medical supplies, tree saplings, and textbooks.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 italic">
            * All donations are audited by independent chartered accountants with annual compliance reports.
          </span>
          <Link
            to="/donate"
            className="px-5 py-2.5 rounded-xl bg-[#071527] hover:bg-[#122e54] text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <span>Become a Donor</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-orange" />
          </Link>
        </div>
      </section>

      {/* Profile Detail Modal */}
      <ProfileDetailModal
        profile={selectedDonor ? { type: "donor", data: selectedDonor } : null}
        onClose={() => setSelectedDonor(null)}
      />
    </div>
  );
}

