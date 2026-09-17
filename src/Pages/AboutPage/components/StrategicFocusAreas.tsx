import { GraduationCap, HeartPulse, Home, Wrench, Users } from "lucide-react";
import ScrollReveal from "@/components/healthcare/ScrollReveal";
import imgedu from "@/assets/cause-education.jpg"
import imghealt from "@/assets/cause-medical.png"
import imghome from "@/assets/basic-need.png"
import imgskill from "@/assets/vision2047/skill.png"
import imgwomen from "@/assets/thematic-women-2.png"


function ImgFallback({ label, className }: { label: string; className?: string }) {
  return (
    <div className={`bg-brand-green/10 flex items-center justify-center ${className}`}>
      <span className="text-brand-green/40 text-xs font-medium text-center px-2">{label}</span>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-8 bg-brand-green" />
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide uppercase text-brand-green-dark">
          {children}
        </h2>
        <span className="h-px w-8 bg-brand-green" />
      </div>
      <p className="text-slate-600 mt-2 text-sm text-center">To achieve this vision, Islah will work across key sectors:</p>
    </div>
  );
}

const AREAS = [
  {
    title: "Education",
    Icon: GraduationCap,
    // image available @assets/cause-education.jpg
    img: imgedu,
    // imgLabel: "v2047-focus-edu.jpg",
    bullets: [
      "Establishment of Community Learning Centres and schools",
      "Support for formal and non-formal education",
      "Promotion of digital learning and skill-based education",
    ],
  },
  {
    title: "Healthcare",
    Icon: HeartPulse,
    // image available @assets/cause-medical.jpg
    img: imghealt,
    // imgLabel: "v2047-focus-health.jpg",
    bullets: [
      "Primary healthcare services and medical camps",
      "Awareness on health, hygiene, and nutrition",
      "Support for critical and emergency care",
    ],
  },
  {
    title: "Housing & Basic Needs",
    Icon: Home,
    // image available @assets/basic-need.jpg
    img: imghome,
    // imgLabel: "v2047-focus-housing.jpg",
    bullets: [
      "Support for safe and dignified housing",
      "Access to clean water, sanitation, and basic amenities",
      "Community infrastructure development",
    ],
  },
  {
    title: "Skill Development & Livelihood",
    Icon: Wrench,
    // image available @assets/thematic-women-2.png
    img: imgskill,
    // imgLabel: "v2047-focus-skills.jpg",
    bullets: [
      "Vocational training and entrepreneurship development",
      "Employment and placement support",
      "Promotion of self-employment and micro-enterprises",
    ],
  },
  {
    title: "Women Empowerment",
    Icon: Users,
    // image available @assets/thematic-women-2.png
    img: imgwomen,
    // imgLabel: "v2047-focus-women.jpg",
    bullets: [
      "Economic and social empowerment initiatives",
      "Formation of Self-Help Groups (SHGs)",
      "Financial literacy and leadership development",
    ],
  },
];

export default function StrategicFocusAreas() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal><SectionTitle>STRATEGIC FOCUS AREAS</SectionTitle></ScrollReveal>

        <ScrollReveal stagger={0.09}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {AREAS.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 group flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={area.img}
                    alt={area.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* <ImgFallback label={area.imgLabel} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" /> */}
                  <div className="absolute top-3 left-3 w-9 h-9 bg-white shadow rounded-full flex items-center justify-center">
                    <area.Icon className="w-4 h-4 text-brand-green" />
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex-1">
                  <h3 className="text-brand-green-dark font-bold text-xs uppercase tracking-wide border-l-2 border-brand-orange pl-2 mb-3">
                    {area.title}
                  </h3>
                  <ul className="space-y-1.5">
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
