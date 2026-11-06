import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  Quote,
  ArrowRight,
  Sparkles,
  PieChart as PieIcon,
  Target,
  MapPin,
  Users,
  Download,
} from "lucide-react";
import { MediaSubpageHero } from "@/components/media/MediaSubpageHero";
import { ActionStrip } from "@/components/media/ActionStrip";
import { StoryModal } from "@/components/media/StoryModal";
import { MediaLayout } from "@/components/media/MediaLayout";
import { OUTCOMES_DATA, SUCCESS_STORIES_DATA } from "@/content/mediaContent";
import type { SuccessStoryItem } from "@/content/mediaContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useMedia } from "@/services/mediaService";

export function OutcomesPage() {
  const { impactStats, demographics, outcomesSettings } = useSiteSettings();
  const { getMedia } = useMedia();
  const [activeStory, setActiveStory] = useState<SuccessStoryItem | null>(null);
  const [activeTheme, setActiveTheme] = useState<string | null>(null);

  const dynamicStatsRibbon = [
    { value: impactStats?.livesTouched || "50,000+", label: "Lives Touched", desc: "Improving quality of life across rural communities" },
    { value: impactStats?.villagesReached || "300+", label: "Villages Reached", desc: "Working in remote and underserved areas" },
    { value: impactStats?.ongoingPrograms || "25+", label: "Ongoing Programs", desc: "Addressing key social development needs" },
    { value: impactStats?.volunteersCount || "500+", label: "Community Volunteers", desc: "United in the mission of positive change" },
    { value: impactStats?.partnersCount || "100+", label: "Partners & Supporters", desc: "Collaborating for greater impact" },
    { value: impactStats?.yearsOfImpact || "10+", label: "Years of Impact", desc: "Dedicated to building sustainable communities" },
  ];

  const sectorSlotKeys: Record<string, string> = {
    "Education & Child Development": "media-outcome-edu",
    "Healthcare & Wellness": "media-outcome-health",
    "Women Empowerment": "media-outcome-women",
    "Skill Development & Livelihood": "media-outcome-skills",
    "Agriculture & Livelihood": "media-outcome-agri",
    "Environment Conservation": "media-outcome-env",
    "Community Development": "media-outcome-comm",
  };

  const keyAreasData = OUTCOMES_DATA.keyAreas.map((area) => {
    const dynamicArea = outcomesSettings?.keyAreas?.find(
      (k) => k.title.toLowerCase().trim() === area.title.toLowerCase().trim()
    );
    return {
      ...area,
      achievements: dynamicArea?.achievements?.length ? dynamicArea.achievements : area.achievements,
      image: getMedia(sectorSlotKeys[area.title] || "", area.image),
    };
  });

  const totalCumulativeImpact =
    impactStats?.totalCumulativeImpact ||
    outcomesSettings?.totalCumulativeImpact ||
    OUTCOMES_DATA.totalCumulativeImpact;

  const themesData = outcomesSettings?.themes?.length ? outcomesSettings.themes : OUTCOMES_DATA.themes;

  const growthHistoryData = outcomesSettings?.growthHistory?.length
    ? outcomesSettings.growthHistory
    : OUTCOMES_DATA.growthHistory;

  const growthNote = outcomesSettings?.growthNote || OUTCOMES_DATA.growthNote;

  const reachData = {
    villages: outcomesSettings?.reach?.villages || impactStats?.villagesReached || OUTCOMES_DATA.reach.villages,
    districts: outcomesSettings?.reach?.districts || impactStats?.districtsCovered || OUTCOMES_DATA.reach.districts,
    states: outcomesSettings?.reach?.states || OUTCOMES_DATA.reach.states,
    stateList: outcomesSettings?.reach?.stateList?.length
      ? outcomesSettings.reach.stateList
      : OUTCOMES_DATA.reach.stateList,
  };

  const demographicList = [
    {
      count: demographics?.childrenCount || "28,000+",
      label: "Children",
      desc: "Enrolled in schools and remedial learning centres",
    },
    {
      count: demographics?.womenCount || "21,000+",
      label: "Women",
      desc: "Empowered through SHGs and health education",
    },
    {
      count: demographics?.youthCount || "15,000+",
      label: "Youth",
      desc: "Trained in vocational and employment skills",
    },
    {
      count: demographics?.seniorCitizensCount || "7,000+",
      label: "Senior Citizens",
      desc: "Provided free medical diagnostics and relief",
    },
  ];

  const beneficiaryQuote = outcomesSettings?.beneficiaryQuote || OUTCOMES_DATA.beneficiaryQuote;

  const communityMetrics = [
    { value: impactStats?.villagesReached || "300+", label: "Villages Reached" },
    { value: impactStats?.livesTouched || "50,000+", label: "Happy Beneficiaries" },
    { value: impactStats?.volunteersCount || "500+", label: "Community Volunteers" },
    { value: impactStats?.partnersCount || "100+", label: "Partners & Supporters" },
    { value: impactStats?.yearsOfImpact || "10+", label: "Years of Transforming Lives" },
  ];

  const quoteText = outcomesSettings?.quoteText || OUTCOMES_DATA.quote.text;
  const quoteAuthor = outcomesSettings?.quoteAuthor || OUTCOMES_DATA.quote.author;

  const handleOpenStory = (link: string) => {
    const id = link.includes("id=") ? link.split("id=")[1] : "";
    const found = SUCCESS_STORIES_DATA.stories.find((s) => s.id === id);
    if (found) {
      setActiveStory(found);
    } else {
      setActiveStory(SUCCESS_STORIES_DATA.stories[0]);
    }
  };

  return (
    <MediaLayout>
      <div className="bg-slate-50 min-h-screen text-slate-800">
        {/* 1. Hero Section */}
        <MediaSubpageHero
          badge={OUTCOMES_DATA.hero.badge}
          title={OUTCOMES_DATA.hero.title}
          description={OUTCOMES_DATA.hero.description}
          subtext={`🌿 ${OUTCOMES_DATA.hero.subtext}`}
          breadcrumb={[
            { label: "Media & Updates", href: "/media" },
            { label: "Outcomes & Impact" },
          ]}
          image={getMedia("media-outcomes-hero", OUTCOMES_DATA.hero.image)}
          imageAlt="Islah Outcomes & Impact"
          actions={
            <div className="flex flex-wrap gap-2.5">
              <a
                href="#key-areas"
                className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
              >
                Focus Areas
              </a>
              <a
                href="#impact-charts"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
              >
                Impact Charts
              </a>
              <Link
                to="/media/annual-reports"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition backdrop-blur-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Annual Reports</span>
              </Link>
            </div>
          }
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
          {/* 2. Top Stats Ribbon (6 Cards) */}
          <section aria-label="Key Outcomes Statistics">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {dynamicStatsRibbon.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-200/80 hover:shadow-md transition group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-emerald-800 group-hover:text-emerald-600 transition">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Outcomes Across Key Areas */}
          <section id="key-areas" aria-labelledby="key-areas-heading">
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-slate-300 flex-1" />
              <h2
                id="key-areas-heading"
                className="text-sm sm:text-base font-black tracking-widest uppercase text-slate-700 text-center"
              >
                Outcomes Across Key Focus Areas
              </h2>
              <div className="h-px bg-slate-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {keyAreasData.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-md transition flex flex-col group"
                >
                  <div className="relative h-28 w-full overflow-hidden bg-slate-100">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="text-[11px] font-bold text-white line-clamp-1 drop-shadow">
                        {area.title}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                    <div className="space-y-1.5">
                      {area.achievements.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-tight"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Interactive Impact Analytics (Charts: Themes & Year-on-Year Growth) */}
          <section id="impact-charts" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Theme Breakdown Progress Bars (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-emerald-700" />
                    <span>Impact by Theme</span>
                  </h3>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                    Total: {totalCumulativeImpact}
                  </span>
                </div>

                <div className="mt-5 space-y-3.5">
                  {themesData.map((theme, idx) => (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveTheme(theme.name)}
                      onMouseLeave={() => setActiveTheme(null)}
                      className="p-2 rounded-xl transition hover:bg-slate-50 cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-slate-700">{theme.name}</span>
                        <span className="font-black text-slate-900">
                          {theme.count} ({theme.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${theme.percentage * 2.8}%`,
                            backgroundColor: theme.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 italic text-center">
                * Cumulative verified figures across all operational districts since inception.
              </div>
            </div>

            {/* Growth Over Years Bar Chart (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-700" />
                    <span>Impact Over the Years</span>
                  </h3>
                  <span className="text-xs text-slate-500 font-medium">2016-17 to 2023-24</span>
                </div>

                <div className="mt-8 h-56 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-6">
                  {growthHistoryData.map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[11px] font-bold text-slate-700 group-hover:text-emerald-700 transition">
                        {item.value}
                      </span>
                      <div className="w-full bg-slate-100 rounded-t-lg relative flex items-end h-40">
                        <div
                          className="w-full bg-gradient-to-t from-emerald-800 to-emerald-500 group-hover:from-emerald-700 group-hover:to-orange-500 rounded-t-lg transition-all duration-300"
                          style={{ height: `${item.heightPct}%` }}
                        />
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 transform -rotate-45 sm:rotate-0 mt-1 whitespace-nowrap">
                        {item.year.replace("20", "")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 text-xs text-emerald-950 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>{growthNote}</span>
              </div>
            </div>
          </section>

          {/* 5. Geographic Reach & Demographic Beneficiaries */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Geographic Footprint (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#071527] to-[#0c2340] text-white rounded-2xl p-7 shadow-sm border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-brand-orange mb-2">
                  <MapPin className="w-5 h-5 text-brand-orange" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Geographic Footprint</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Our Reach on the Ground</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Reaching the most marginalized communities across northern and eastern India with localized infrastructure.
                </p>

                <div className="grid grid-cols-3 gap-3 my-6">
                  <div className="p-3 rounded-xl bg-white/10 text-center border border-white/10">
                    <div className="text-xl font-bold text-white">
                      {reachData.villages}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-300">Villages</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 text-center border border-white/10">
                    <div className="text-xl font-bold text-white">
                      {reachData.districts}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-300">Districts</div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 text-center border border-white/10">
                    <div className="text-xl font-bold text-white">
                      {reachData.states}
                    </div>
                    <div className="text-[10px] uppercase font-bold text-slate-300">Focus States</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                    Core Operation Hubs:
                  </div>
                  {reachData.stateList.map((state, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-white">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{state}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-700/60">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 active:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition"
                >
                  View Operations Map
                </Link>
              </div>
            </div>

            {/* Demographic Beneficiaries (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-7 shadow-sm border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-700" />
                    <span>Target Beneficiaries</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-500">Demographic Impact</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                  {demographicList.map((b, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="text-2xl font-black text-emerald-800">{b.count}</div>
                      <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mt-0.5">
                        {b.label}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">{b.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200/80 flex items-start gap-3">
                <Quote className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs italic font-medium text-emerald-950 leading-relaxed">
                  "{beneficiaryQuote}"
                </p>
              </div>
            </div>
          </section>

          {/* 6. Community Metrics & Collective Effort Quote */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left 5 Metrics */}
              <div className="lg:col-span-7">
                <h3 className="text-xs font-black tracking-widest uppercase text-emerald-800 mb-6">
                  Community Reach Summary
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {communityMetrics.map((item, i) => (
                    <div
                      key={i}
                      className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="text-xl sm:text-2xl font-black text-emerald-700">
                        {item.value}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-600 mt-1 leading-tight">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Quote Card */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100/60 border border-emerald-200 relative">
                <Quote className="w-8 h-8 text-emerald-600/40 absolute top-4 right-4" />
                <p className="text-sm font-semibold italic text-emerald-950 leading-relaxed pr-6">
                  "{quoteText}"
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>— {quoteAuthor}</span>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Stories Behind the Change */}
          <section aria-labelledby="stories-heading">
            <div className="flex items-center gap-4 my-8">
              <div className="h-px bg-slate-300 flex-1" />
              <h2
                id="stories-heading"
                className="text-sm sm:text-base font-black tracking-widest uppercase text-slate-700 text-center"
              >
                Stories Behind the Change
              </h2>
              <div className="h-px bg-slate-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {OUTCOMES_DATA.featuredStories.map((story, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/90 hover:shadow-md transition flex flex-col group"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-sm">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition">
                        {story.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {story.desc}
                      </p>
                    </div>

                    <div className="pt-4 mt-2 border-t border-slate-100">
                      <button
                        onClick={() => handleOpenStory(story.link)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition cursor-pointer"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Core Principles Strip */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
              {OUTCOMES_DATA.principles.map((p, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50/50 transition"
                >
                  <div className="text-sm font-black text-slate-900">{p.title}</div>
                  <div className="text-xs font-semibold text-emerald-700">{p.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 9. Action Strip */}
          <ActionStrip />
        </div>

        {/* Interactive Story Reader Modal */}
        <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />
      </div>
    </MediaLayout>
  );
}

export default OutcomesPage;
