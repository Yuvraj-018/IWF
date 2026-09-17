import { ChevronRight } from "lucide-react";
import heroBg from "@/assets/hero-about.png";

export default function AboutHero() {
  return (
    <section className="relative min-h-[430px] flex flex-col justify-between overflow-hidden">
      {/* Background */}
      <img src={heroBg} alt="About Islah" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/75 to-slate-900/40" />

      {/* Content */}
      <div className="relative flex-1 flex items-center max-w-7xl mx-auto px-4 py-16 w-full z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-green/20 border border-brand-green/30 px-3.5 py-1.5 rounded-full mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-xs font-semibold tracking-wide uppercase text-white/95">● ABOUT US</span>
          </div>

          {/* H1 */}
          <h1 className="mb-3">
            <span className="block text-4xl md:text-5xl font-extrabold text-white leading-tight">ABOUT US</span>
            <span className="block text-4xl md:text-5xl font-extrabold text-brand-orange leading-tight">ISLAH WELFARE FOUNDATION</span>
          </h1>

          <p className="text-base md:text-lg text-slate-200 mb-3">
            Empowering Lives. Enriching Communities.
          </p>
          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mb-8">
            The Islah Welfare Foundation (Islah) is a public charitable trust committed to the socio-economic development of weaker sections of society — through education, healthcare, women empowerment, and sustainable livelihood programmes.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#overview"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm"
            >
              LEARN MORE ▼
            </a>
            <a
              href="#be-part-of-change"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-3.5 rounded shadow-lg transition-all hover:scale-[1.02] active:scale-95 uppercase tracking-wider text-sm backdrop-blur-sm"
            >
              GET INVOLVED
            </a>
          </div>
        </div>
      </div>

      {/* Breadcrumb strip */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/10 py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1 text-xs text-white/80">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <a href="/about" className="hover:text-white transition-colors">About Us</a>
          <ChevronRight className="w-3 h-3 opacity-60" />
          <span className="text-brand-orange font-semibold">Overview</span>
        </div>
      </div>
    </section>
  );
}
