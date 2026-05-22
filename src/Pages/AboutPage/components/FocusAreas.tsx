import { GraduationCap, HeartPulse, Home, Wrench, Users } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import imgEdu from "@/assets/cause-education.jpg";
import imgHealth from "@/assets/cause-medical.png";
import imgHousing from "@/assets/gallery-4.jpg";
import imgSkills from "@/assets/thematic-entrepreneur.jpg";
import imgWomen from "@/assets/thematic-women-2.png";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      <span className="h-px w-8 bg-brand-green" />
      <h2 className="text-2xl md:text-3xl font-bold text-brand-green-dark tracking-wide uppercase">{children}</h2>
      <span className="h-px w-8 bg-brand-green" />
    </div>
  );
}

const AREAS = [
  {
    title: "Education",
    Icon: GraduationCap,
    img: imgEdu,
    bullets: [
      "Community Learning Centres & schools",
      "Scholarships for formal and non-formal education",
      "Skill-based education",
    ],
  },
  {
    title: "Healthcare",
    Icon: HeartPulse,
    img: imgHealth,
    bullets: [
      "Primary Healthcare services and medical camps",
      "Awareness on hygiene and nutrition",
      "Support for critical and emergency care",
    ],
  },
  {
    title: "Housing & Basic Needs",
    Icon: Home,
    img: imgHousing,
    bullets: [
      "Support for safe and dignified housing",
      "Access to clean water, sanitation and basic amenities",
      "Community infrastructure development",
    ],
  },
  {
    title: "Skill Development & Livelihood",
    Icon: Wrench,
    img: imgSkills,
    bullets: [
      "Vocational training and entrepreneurship development",
      "Employment and placement support",
      "Creation of self-employment and micro enterprises",
    ],
  },
  {
    title: "Women Empowerment",
    Icon: Users,
    img: imgWomen,
    bullets: [
      "Economic and social empowerment initiatives",
      "Formation of Self-Help Groups (SHGs)",
      "Financial literacy and leadership development",
    ],
  },
];

export default function FocusAreas() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>Focus Areas</SectionTitle></ScrollReveal>
        <ScrollReveal stagger={0.09}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {AREAS.map((area) => (
            <div
              key={area.title}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group flex flex-col"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={area.img}
                  alt={area.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 w-9 h-9 bg-white shadow rounded-full flex items-center justify-center">
                  <area.Icon className="w-4 h-4 text-brand-green" />
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1">
                <p className="text-brand-green-dark font-bold text-xs uppercase tracking-wide border-l-2 border-brand-orange pl-2 mb-3">
                  {area.title}
                </p>
                <ul className="space-y-1">
                  {area.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-600">
                      <span className="text-brand-orange font-bold shrink-0">·</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
