import { Users, HeartPulse, GraduationCap, Leaf } from "lucide-react";
import hero from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[520px] md:h-[600px] overflow-hidden">
        <img src={hero} alt="Empowering lives in rural India" width={1600} height={900} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <p className="text-sm md:text-base mb-3 font-medium">"Knowledge, Opportunity, A Better Future." — ISLAH</p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Empowering Lives Through<br />
              <span className="text-brand-orange">Education</span>, <span className="text-brand-orange">Healthcare</span><br />
              &amp; <span className="text-brand-orange">Livelihood</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-white/90">IWF is an effort to lay a positive foundation of change in the field of education for the underprivileged. We believe happiness for a lifetime can only be achieved by helping &amp; enriching the next generation. IWF's doors are always open — if you feel you can fill the gap of a missing drop, come join us.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold px-6 py-3 rounded shadow-lg transition">DONATE NOW</button>
              <button className="bg-white/95 hover:bg-white text-brand-green-dark font-semibold px-6 py-3 rounded shadow-lg transition">GET INVOLVED</button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-brand-green text-white rounded-md shadow-xl grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {[
            { icon: Users, n: "5,000+", l: "Lives Impacted" },
            { icon: HeartPulse, n: "100+", l: "Health Camps" },
            { icon: GraduationCap, n: "2,000+", l: "Students Supported" },
            { icon: Leaf, n: "10,000+", l: "Beneficiaries" },
          ].map(({ icon: Icon, n, l }) => (
            <div key={l} className="p-5 flex items-center gap-3 justify-center">
              <Icon className="w-9 h-9 opacity-90" />
              <div>
                <div className="text-2xl font-extrabold">{n}</div>
                <div className="text-xs opacity-90">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
