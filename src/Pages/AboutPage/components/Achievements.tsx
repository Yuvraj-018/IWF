import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

function SectionTitle({ children, align = "center" }: { children: React.ReactNode; align?: "center" | "left" }) {
  return (
    <div className={`flex items-center gap-3 mb-8 ${align === "center" ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide uppercase">{children}</h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

const ACHIEVEMENTS = [
  "Thousands of lives transformed across communities",
  "Multiple educational and healthcare initiatives implemented",
  "Women empowered through SHGs and training programs",
  "Youth skilled and placed in jobs or self-employment",
  "Strong partnerships and community trust built over the years",
];

const STATS = [
  { number: "5,000+", label: "Community Beneficiaries Supported" },
  { number: "100+", label: "Community Initiatives Conducted" },
  { number: "2,000+", label: "Students Reached Through Education Programs" },
  { number: "100+", label: "Healthcare Camps Organised" },
];

export default function Achievements() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left — Achievement list */}
        <ScrollReveal>
        <div>
          <SectionTitle align="left">Our Achievements</SectionTitle>
          <ul className="space-y-3">
            {ACHIEVEMENTS.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        </ScrollReveal>

        {/* Right — Stats grid */}
        <ScrollReveal stagger={0.08}>
        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-brand-green/5 rounded-xl p-5 text-center border border-brand-green/10 hover:border-brand-green/30 transition stat-counter"
            >
              <div className="text-3xl font-extrabold text-brand-green-dark">{stat.number}</div>
              <div className="text-xs text-slate-600 mt-1 leading-tight">{stat.label}</div>
            </div>
          ))}

          {/* Wide span card */}
          <div className="col-span-2 bg-[#0d2b1a] text-white rounded-xl p-5 text-center">
            <div className="text-3xl font-extrabold text-brand-orange">Multiple</div>
            <div className="text-xs text-white/70 mt-1 leading-tight">Regions Across India</div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
