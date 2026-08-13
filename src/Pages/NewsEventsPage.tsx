import { useState } from "react";
import { ArrowRight, Search, Calendar, Tag, Eye, X } from "lucide-react";
import { Footer, Header, NotificationTicker, RoleFormModal, UtilityBar } from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";
import ScrollReveal from "@/components/healthcare/ScrollReveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

type NewsItem = {
  id: number; tag: string; tagColor: string; date: string; title: string;
  excerpt: string; img: string; featured?: boolean; readTime: string;
};

const ALL_NEWS: NewsItem[] = [
  {
    id: 1, featured: true,
    tag: "Health Camp", tagColor: "#DC2626",
    date: "June 28, 2025", readTime: "3 min",
    title: "Free Medical Camp at Bathiya — 200+ Patients Treated in One Day",
    excerpt: "IWF's Healthcare team conducted a comprehensive free medical camp at Bathiya, Darbhanga, providing consultations, medicines, blood pressure/sugar screenings, and eye checkups to 200+ patients from 12 surrounding villages. The camp was attended by 6 specialist doctors and 15 volunteers.",
    img: "🏥",
  },
  {
    id: 2, featured: true,
    tag: "Education", tagColor: "#1D4ED8",
    date: "June 15, 2025", readTime: "2 min",
    title: "Annual Scholarship Distribution — 100 Students Receive School Kits & Fee Support",
    excerpt: "100 meritorious students from underprivileged families in Darbhanga, Muzaffarpur, and Sitamarhi districts received scholarships under the 'Shiksha Na Ruke' campaign, covering school fees, uniforms, stationery, and study materials for academic year 2025-26.",
    img: "🎓",
  },
  {
    id: 3,
    tag: "Women Empowerment", tagColor: "#DB2777",
    date: "June 5, 2025", readTime: "2 min",
    title: "New Self-Help Group Launched in Sitamarhi — 30 Women Enroll in Vocational Training",
    excerpt: "Under the 'She Can Fly' campaign, a new SHG was formed at Sitamarhi with 30 women enrolled in vocational training programs for tailoring, candle making, and food processing. Each participant will receive a ₹2,000 startup kit upon programme completion.",
    img: "🤝",
  },
  {
    id: 4,
    tag: "Annual Report", tagColor: "#15803d",
    date: "May 20, 2025", readTime: "5 min",
    title: "IWF Annual Report 2024–25 Published — 50+ Villages, 5,000+ Beneficiaries",
    excerpt: "The IWF Annual Report 2024–25 is now available. It documents our work across education, healthcare, and livelihood programmes, reaching 50+ villages and directly impacting 5,000+ beneficiaries through 12 active programs.",
    img: "📊",
  },
  {
    id: 5,
    tag: "Cervical Cancer", tagColor: "#7C3AED",
    date: "May 10, 2025", readTime: "3 min",
    title: "Cervical Cancer Awareness Drive Reaches 500 Women Across 8 Villages",
    excerpt: "As part of our Cervical Cancer Prevention Programme, IWF organized awareness sessions in 8 villages of Darbhanga. Over 500 women were educated about screening, vaccination, and early detection. Free HPV screening was offered to all participants.",
    img: "🔬",
  },
  {
    id: 6,
    tag: "Skill Development", tagColor: "#ea580c",
    date: "April 25, 2025", readTime: "2 min",
    title: "Tailoring Training Batch Graduates — 25 Women Become Self-Employed",
    excerpt: "25 women from rural Darbhanga successfully completed IWF's 3-month tailoring training programme under the Tayyari Kal Ki campaign. Each graduate received a certificate, a sewing machine, and help connecting with local markets.",
    img: "✂️",
  },
  {
    id: 7,
    tag: "Healthcare", tagColor: "#DC2626",
    date: "April 10, 2025", readTime: "2 min",
    title: "Rural Ambulance Service Completes 500th Emergency Response",
    excerpt: "IWF's Rural Ambulance Service reached a significant milestone — 500 emergency responses since inception. The service operates 24/7 across 50+ villages and has saved hundreds of lives by ensuring timely medical evacuation in areas with no public transport.",
    img: "🚑",
  },
  {
    id: 8,
    tag: "Partnership", tagColor: "#15803d",
    date: "March 30, 2025", readTime: "2 min",
    title: "IWF Signs MoU with District Health Department, Darbhanga",
    excerpt: "IWF signed a Memorandum of Understanding with the District Health Department, Darbhanga to collaborate on maternal health, immunization drives, and tuberculosis awareness campaigns across 20 Gram Panchayats.",
    img: "🤝",
  },
  {
    id: 9,
    tag: "Diabetes Awareness", tagColor: "#D97706",
    date: "March 15, 2025", readTime: "2 min",
    title: "Diabetes & Lifestyle Awareness Camp — 300 Free Tests Conducted",
    excerpt: "IWF organized a free diabetes screening camp at Manigachhi, with 300 participants undergoing blood sugar tests. Nutritionists provided personalized dietary guidance, and 42 pre-diabetic individuals were enrolled in a lifestyle modification programme.",
    img: "💉",
  },
  {
    id: 10,
    tag: "Menstrual Hygiene", tagColor: "#DB2777",
    date: "March 5, 2025", readTime: "2 min",
    title: "Distribution of 5,000 Sanitary Kits Across Rural Schools",
    excerpt: "Under the Menstrual Hygiene Support Programme, IWF distributed 5,000 sanitary hygiene kits to adolescent girls in 30 rural schools across Darbhanga and Madhubani. The drive also included hygiene awareness sessions conducted by female health workers.",
    img: "🌸",
  },
  {
    id: 11,
    tag: "Education", tagColor: "#1D4ED8",
    date: "February 20, 2025", readTime: "3 min",
    title: "Community Learning Centre Opened at Bathiya Village",
    excerpt: "IWF inaugurated a new Community Learning Centre at Bathiya, equipped with 30 tablets, a projector, and a small library. The centre will provide digital literacy, tuition, and skill training to 100+ children and youth from the village and nearby hamlets.",
    img: "📚",
  },
  {
    id: 12,
    tag: "Annual Event", tagColor: "#15803d",
    date: "January 26, 2025", readTime: "2 min",
    title: "IWF Annual Foundation Day — 8 Years of Transformation Celebrated",
    excerpt: "IWF celebrated its 8th Foundation Day on Republic Day with a community event in Darbhanga. The event honored 50 long-serving volunteers, felicitated scholarship recipients, and launched the 'Tayyari Kal Ki 2025' youth skills programme.",
    img: "🎉",
  },
];

const ALL_TAGS = ["All", ...Array.from(new Set(ALL_NEWS.map((n) => n.tag)))];

// ─── Components ───────────────────────────────────────────────────────────────

function NewsModal({ item, onClose }: { item: NewsItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="h-40 flex items-center justify-center text-7xl relative" style={{ backgroundColor: `${item.tagColor}10` }}>
          {item.img}
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-slate-100 transition">
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${item.tagColor}15`, color: item.tagColor }}>{item.tag}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
            <span className="text-xs text-slate-400">{item.readTime} read</span>
          </div>
          <h2 className="text-xl font-extrabold text-slate-800 mb-4 leading-tight">{item.title}</h2>
          <p className="text-sm text-slate-600 leading-relaxed">{item.excerpt}</p>
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-400">Published by Islah Welfare Foundation</p>
            <a href="/contact" className="text-xs font-bold text-brand-green hover:underline flex items-center gap-1">
              Contact IWF <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item, onRead }: { item: NewsItem; onRead: (item: NewsItem) => void }) {
  return (
    <article className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group flex flex-col overflow-hidden cursor-pointer" onClick={() => onRead(item)}>
      <div className="h-28 flex items-center justify-center text-5xl" style={{ backgroundColor: `${item.tagColor}10` }}>
        {item.img}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${item.tagColor}15`, color: item.tagColor }}>{item.tag}</span>
          <span className="text-[10px] text-slate-400">{item.date}</span>
        </div>
        <h3 className="font-bold text-sm text-slate-800 leading-snug mb-2 group-hover:text-brand-green transition-colors line-clamp-2">{item.title}</h3>
        <p className="text-xs text-slate-500 leading-relaxed flex-1 line-clamp-3">{item.excerpt}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs font-bold inline-flex items-center gap-1" style={{ color: item.tagColor }}>
            <Eye className="w-3 h-3" /> Read More
          </span>
          <span className="text-[10px] text-slate-400">{item.readTime}</span>
        </div>
      </div>
    </article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewsEventsPage() {
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);
  const [selectedTag, setSelectedTag] = useState("All");
  const [query, setQuery] = useState("");
  const [readingItem, setReadingItem] = useState<NewsItem | null>(null);

  const filtered = ALL_NEWS.filter((n) => {
    const matchTag = selectedTag === "All" || n.tag === selectedTag;
    const matchQ = query === "" || n.title.toLowerCase().includes(query.toLowerCase()) || n.excerpt.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQ;
  });

  const featured = filtered.filter((n) => n.featured);
  const rest = filtered.filter((n) => !n.featured);

  return (
    <div className="min-h-screen bg-white font-sans">
      <NotificationTicker />
      <UtilityBar />
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#0b1f3b] text-white py-14 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-3">Media & Updates</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">News & Events</h1>
            <p className="text-white/75 max-w-xl leading-relaxed">
              Stay updated with IWF's work on the ground — health camps, scholarships, community events, partnerships, and more.
            </p>
          </div>
        </section>

        {/* Filters */}
        <div className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news & events…"
                className="w-full pl-9 pr-3 h-9 rounded-lg border border-slate-200 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition ${
                    selectedTag === tag
                      ? "bg-brand-green text-white border-brand-green"
                      : "bg-white text-slate-600 border-slate-200 hover:border-brand-green hover:text-brand-green"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <section className="py-12 bg-slate-50">
          <div className="max-w-6xl mx-auto px-4">
            {/* Featured */}
            {featured.length > 0 && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">Featured</h2>
                <div className="grid md:grid-cols-2 gap-6 mb-10">
                  {featured.map((item) => (
                    <ScrollReveal key={item.id}>
                      <article
                        className="bg-white rounded-2xl border-2 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 overflow-hidden cursor-pointer group"
                        style={{ borderColor: `${item.tagColor}30` }}
                        onClick={() => setReadingItem(item)}
                      >
                        <div className="h-36 flex items-center justify-center text-6xl" style={{ backgroundColor: `${item.tagColor}08` }}>
                          {item.img}
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: `${item.tagColor}15`, color: item.tagColor }}>{item.tag}</span>
                            <span className="text-xs text-slate-400">{item.date}</span>
                          </div>
                          <h2 className="font-extrabold text-base text-slate-800 leading-tight mb-2 group-hover:text-brand-green transition-colors">{item.title}</h2>
                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{item.excerpt}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-xs font-bold inline-flex items-center gap-1" style={{ color: item.tagColor }}>
                              <Eye className="w-3 h-3" /> Read Full Story
                            </span>
                            <span className="text-xs text-slate-400">{item.readTime}</span>
                          </div>
                        </div>
                      </article>
                    </ScrollReveal>
                  ))}
                </div>
              </>
            )}

            {/* All / Filtered */}
            {rest.length > 0 && (
              <>
                <h2 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-4">
                  {selectedTag === "All" ? "All Updates" : selectedTag}
                  <span className="ml-2 text-slate-400 normal-case font-normal">({rest.length})</span>
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {rest.map((item) => (
                    <ScrollReveal key={item.id}>
                      <NewsCard item={item} onRead={setReadingItem} />
                    </ScrollReveal>
                  ))}
                </div>
              </>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-slate-600 mb-2">No results found</h3>
                <p className="text-sm text-slate-400">Try adjusting your search or filter.</p>
                <button onClick={() => { setQuery(""); setSelectedTag("All"); }} className="mt-4 text-sm font-bold text-brand-green hover:underline">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />

      {readingItem && <NewsModal item={readingItem} onClose={() => setReadingItem(null)} />}
    </div>
  );
}
