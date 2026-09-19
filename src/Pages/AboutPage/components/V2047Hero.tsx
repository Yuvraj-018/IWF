import { ChevronRight } from "lucide-react";

import v2047HeroBg from "@/assets/vision2047/hero.png";

export default function V2047Hero() {
  return (
    <section className="relative w-full min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex flex-col justify-between overflow-hidden">
      {/* Background Image & Gradient */}
      <img src={v2047HeroBg} alt="Vision 2047" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f3b]/95 via-slate-900/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex-1 flex flex-col justify-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-6 w-max">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
          <span className="text-white text-xs font-bold tracking-wider uppercase">About Us</span>
        </div>

        <div className="text-sm md:text-base font-bold text-white/90 mb-4 flex items-center gap-2">
          <span className="text-brand-green text-lg">🌿</span>
          Vision 2047 — Transforming Lives, Building a New India
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-3 sm:gap-4 mb-2">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none tracking-tight">
            VISION
          </h1>
          <h1 className="text-5xl md:text-7xl font-extrabold text-brand-orange leading-none tracking-tight">
            2047
          </h1>
        </div>

        <h2 className="text-sm md:text-base font-bold text-white/80 tracking-widest uppercase mt-3 mb-2">
          TRANSFORMING LIVES, BUILDING A NEW INDIA
        </h2>

        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mt-2 mb-6">
          Together, let's build an empowered, equitable and self-reliant India where no one is left behind.
        </p>

        <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/40 px-4 py-2 rounded-full mb-6 w-max">
          <span className="text-brand-orange text-lg">★</span>
          <span className="text-brand-orange font-bold text-xs uppercase tracking-wider">100 YEARS OF INDEPENDENCE</span>
        </div>

        <div className="flex flex-wrap gap-4 mt-2">
          <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded shadow-lg uppercase tracking-wider transition-colors cursor-pointer">
            Learn More ▼
          </button>
          <button className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded uppercase tracking-wider transition-colors cursor-pointer">
            Get Involved
          </button>
        </div>
      </div>

      <div className="relative z-10 w-full bg-white/10 backdrop-blur-sm border-t border-white/10 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center text-xs md:text-sm text-white/80">
          <a href="/" className="hover:text-white transition-colors cursor-pointer">Home</a>
          <ChevronRight className="w-4 h-4 mx-1 md:mx-2 text-white/50" />
          <a href="/about" className="hover:text-white transition-colors cursor-pointer">About Us</a>
          <ChevronRight className="w-4 h-4 mx-1 md:mx-2 text-white/50" />
          <span className="text-brand-orange font-semibold">Vision 2047</span>
        </div>
      </div>
    </section>
  );
}
