import { Quote, Sparkles, Heart } from "lucide-react";
import { INSPIRATIONAL_QUOTES, QuoteBannerData } from "../communityData";
import aboutHero from "@/assets/about-hero.jpg";

interface InspirationalQuoteBannerProps {
  tabKey?: "overview" | "members" | "donors" | "partners" | "volunteers";
  customData?: Partial<QuoteBannerData>;
  imageSrc?: string;
}

export function InspirationalQuoteBanner({
  tabKey = "overview",
  customData,
  imageSrc = aboutHero,
}: InspirationalQuoteBannerProps) {
  const quoteData = {
    ...INSPIRATIONAL_QUOTES[tabKey],
    ...customData,
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 select-none">
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-white/20 bg-[#071527] text-white">
        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={imageSrc}
            alt="Islah Community Action"
            className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071527] via-[#071527]/90 to-[#0e2747]/85" />
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-brand-orange/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Quote Content */}
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-brand-orange uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              <span>{quoteData.bgTag}</span>
            </div>

            <div className="relative">
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-white/15 absolute -top-4 -left-3 sm:-left-5 pointer-events-none rotate-180" />
              <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif italic text-white/95 leading-relaxed pl-4 sm:pl-6 border-l-2 border-brand-orange">
                "{quoteData.quote}"
              </blockquote>
            </div>

            <div className="pl-4 sm:pl-6 pt-1 flex items-center gap-2">
              <div className="w-6 h-0.5 bg-brand-orange rounded-full" />
              <p className="text-xs sm:text-sm font-medium text-slate-300">
                <span className="text-white font-bold">{quoteData.author}</span>
                <span className="mx-1.5 text-white/40">•</span>
                <span className="text-white/70">{quoteData.role}</span>
              </p>
            </div>
          </div>

          {/* Right Floating Badge / Brand Ethos */}
          <div className="shrink-0 flex flex-col items-center sm:items-end justify-center text-center sm:text-right border-t md:border-t-0 md:border-l border-white/15 pt-4 md:pt-0 md:pl-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-orange to-amber-400 flex items-center justify-center shadow-lg shadow-brand-orange/20 mb-2">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <p className="font-['Caveat',cursive] text-2xl font-bold text-white tracking-wide">
              Together We Can Do More
            </p>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">
              ISLAH Welfare Foundation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

