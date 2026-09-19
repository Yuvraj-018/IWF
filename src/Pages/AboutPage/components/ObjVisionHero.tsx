import { ChevronRight } from "lucide-react";
import img from "@/assets/thematic-women-2.png"

// import objHeroBg from "@/assets/aboutUsImg/obj-hero.jpg";

export default function ObjVisionHero() {
  return (
    <section className="relative w-full min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex flex-col justify-between overflow-hidden">
      {/* Background Image & Gradient */}
      <img src={img} alt="Our Objectives & Vision" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/75 to-slate-900/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full flex-1 flex flex-col justify-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-6 w-max">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
          <span className="text-white text-xs font-bold tracking-wider uppercase">About Us</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
          OUR OBJECTIVES<br />
          <span className="text-brand-orange">&amp; VISION</span>
        </h1>

        <p className="text-base md:text-lg text-slate-200 mt-3 mb-6 max-w-2xl">
          Building an equitable, empowered and compassionate India where no one is left behind.
        </p>

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
          <span className="text-brand-orange font-semibold">Our Objective &amp; Vision</span>
        </div>
      </div>
    </section>
  );
}
