import { Building2, Users, Leaf, BarChart2 } from "lucide-react";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-semibold text-[#0b1f3b] tracking-tight">{children}</h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

const PILLARS = [
  {
    Icon: Building2,
    title: "Community-Based Development Model",
    desc: "Community organised groups and local participation form the foundation of every initiative we undertake.",
  },
  {
    Icon: Users,
    title: "Partnerships",
    desc: "Collaboration with corporates (CSR), institutions and government bodies amplifies our reach and impact.",
  },
  {
    Icon: Leaf,
    title: "Sustainability",
    desc: "Focus on repeatable, scalable and long-term solutions that continue to benefit communities beyond our direct involvement.",
  },
  {
    Icon: BarChart2,
    title: "Accountability",
    desc: "Commitment to measuring and documenting the measurable impact of every step we take in the field.",
  },
];

export default function OurApproach() {
  return (
    <section className="bg-brand-green/5 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle>Our Approach</SectionTitle>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="bg-white rounded-xl p-6 border border-brand-green/15 shadow-sm hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
                <pillar.Icon className="w-6 h-6 text-brand-green" />
              </div>
              <h3 className="font-bold text-[#0b1f3b] text-sm mb-2">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
