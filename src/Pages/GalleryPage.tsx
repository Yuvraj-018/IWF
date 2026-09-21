import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Home,
  ChevronRight,
  Sparkles,
  Camera,
  Layers,
  Filter,
  Eye,
  X,
  ArrowRight,
  BookOpen,
  Stethoscope,
  Users,
  Briefcase,
  Sprout,
  TreePine,
  HeartHandshake,
  Scale,
} from "lucide-react";
import {
  NotificationTicker,
  UtilityBar,
  Header,
  Footer,
  RoleFormModal,
} from "@/components/layout/SiteLayout";
import type { RoleType } from "@/components/forms/RoleFormModal";

// Assets
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import healthCamp from "@/assets/health-camp.jpg";
import ruralHealth from "@/assets/rural-health-centre.jpg";
import ambulanceImg from "@/assets/ambulance.jpg";
import educationImg from "@/assets/sector_education_1.png";
import healthcareImg from "@/assets/sector_healthcare_1.png";
import womenImg from "@/assets/sector_women_1.png";
import skillsImg from "@/assets/sector_skills_1.png";
import agriImg from "@/assets/sector_agriculture_1.png";
import envImg from "@/assets/sector_environment_1.png";
import reliefImg from "@/assets/sector_relief_1.png";
import entrepreneurImg from "@/assets/sector_entrepreneur_1.png";

type SectorCategory =
  | "all"
  | "education"
  | "healthcare"
  | "women"
  | "skills"
  | "social-justice"
  | "agriculture"
  | "environment"
  | "relief";

interface GalleryItem {
  id: string;
  title: string;
  sector: SectorCategory;
  sectorLabel: string;
  location: string;
  image: string;
  description: string;
}

const CATEGORIES: { id: SectorCategory; label: string; icon: any }[] = [
  { id: "all", label: "All Programmes", icon: Layers },
  { id: "education", label: "Education & Learning", icon: BookOpen },
  { id: "healthcare", label: "Healthcare & Well-being", icon: Stethoscope },
  { id: "women", label: "Women & Youth Empowerment", icon: Users },
  { id: "skills", label: "Skills, Livelihoods & Entrepreneurship", icon: Briefcase },
  { id: "social-justice", label: "Social Justice & Legal Empowerment", icon: Scale },
  { id: "agriculture", label: "Agriculture & Rural Livelihoods", icon: Sprout },
  { id: "environment", label: "Environment & Sustainable Development", icon: TreePine },
  { id: "relief", label: "Humanitarian Relief & Rehabilitation", icon: HeartHandshake },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Primary School Classroom Learning & Kit Distribution",
    sector: "education",
    sectorLabel: "Education & Learning",
    location: "Darbhanga, Bihar",
    image: gallery1,
    description: "Students participating actively in classroom interactive sessions with complete school learning kits.",
  },
  {
    id: "g2",
    title: "Community Free Health Check-up Camp",
    sector: "healthcare",
    sectorLabel: "Healthcare & Well-being",
    location: "Bathiya, Darbhanga",
    image: healthCamp,
    description: "Doctor consultations, vitals screening, and essential medicines distribution for over 200 rural villagers.",
  },
  {
    id: "g3",
    title: "Women's Vocational Sewing & Tailoring Workshop",
    sector: "women",
    sectorLabel: "Women & Youth Empowerment",
    location: "Patna, Bihar",
    image: gallery2,
    description: "Practical tailoring and embroidery masterclasses enabling rural women to generate independent household income.",
  },
  {
    id: "g4",
    title: "Rural Healthcare & Wellness Centre Field Screening",
    sector: "healthcare",
    sectorLabel: "Healthcare & Well-being",
    location: "Sisoli, Meerut",
    image: ruralHealth,
    description: "Primary diagnostic tests, blood pressure and glucose screenings provided directly within village reach.",
  },
  {
    id: "g5",
    title: "Youth Technical & Vocational Skills Training",
    sector: "skills",
    sectorLabel: "Skills, Livelihoods & Entrepreneurship",
    location: "Okhla, New Delhi",
    image: gallery3,
    description: "Hands-on vocational computer and technical skill certification training for aspiring rural youths.",
  },
  {
    id: "g6",
    title: "Organic Farming & Soil Health Demonstration",
    sector: "agriculture",
    sectorLabel: "Agriculture & Rural Livelihoods",
    location: "Darbhanga, Bihar",
    image: agriImg,
    description: "Demonstrating natural bio-fertilizers and zero-budget organic crop management techniques to local farmers.",
  },
  {
    id: "g7",
    title: "Green Village Tree Plantation & Greening Drive",
    sector: "environment",
    sectorLabel: "Environment & Sustainable Development",
    location: "Madhubani, Bihar",
    image: envImg,
    description: "Community-driven afforestation drive planting indigenous fruit and shade trees across rural pathways.",
  },
  {
    id: "g8",
    title: "Disaster Emergency Food & Shelter Kit Relief",
    sector: "relief",
    sectorLabel: "Humanitarian Relief & Rehabilitation",
    location: "Flood-affected North Bihar",
    image: reliefImg,
    description: "Rapid deployment of dry ration packs, clean drinking water kits, and temporary tarpaulin shelters.",
  },
  {
    id: "g9",
    title: "Community Legal Literacy & Rights Awareness Camp",
    sector: "social-justice",
    sectorLabel: "Social Justice & Legal Empowerment",
    location: "Patna, Bihar",
    image: gallery4,
    description: "Paralegal volunteers informing marginalised citizens about government schemes, legal aid, and fundamental rights.",
  },
  {
    id: "g10",
    title: "Rural 24x7 Emergency Ambulance Response",
    sector: "healthcare",
    sectorLabel: "Healthcare & Well-being",
    location: "Darbhanga District",
    image: ambulanceImg,
    description: "Oxygen-equipped medical transport transferring critical emergency patients to district referral hospitals.",
  },
  {
    id: "g11",
    title: "Micro-Enterprise & Rural Self-Employment Support",
    sector: "skills",
    sectorLabel: "Skills, Livelihoods & Entrepreneurship",
    location: "Meerut, Uttar Pradesh",
    image: entrepreneurImg,
    description: "Mentoring small village artisans and shop owners with business guidance and micro-capital linkages.",
  },
  {
    id: "g12",
    title: "Community Learning Centre Evening Classes",
    sector: "education",
    sectorLabel: "Education & Learning",
    location: "Bathiya Village",
    image: gallery5,
    description: "Remedial education and homework support bridging learning gaps for first-generation school-goers.",
  },
  {
    id: "g13",
    title: "Cervical Cancer & Women's Preventive Screenings",
    sector: "healthcare",
    sectorLabel: "Healthcare & Well-being",
    location: "Patna, Bihar",
    image: healthcareImg,
    description: "Sensitisation sessions with female gynaecologists and nurses conducting confidential wellness check-ups.",
  },
  {
    id: "g14",
    title: "Winter Relief Warm Blanket & Clothing Distribution",
    sector: "relief",
    sectorLabel: "Humanitarian Relief & Rehabilitation",
    location: "North Bihar Villages",
    image: gallery6,
    description: "Distributing thermal blankets and winter jackets to elderly and vulnerable rural families during cold waves.",
  },
  {
    id: "g15",
    title: "Self-Help Group Financial Literacy Meet",
    sector: "women",
    sectorLabel: "Women & Youth Empowerment",
    location: "Darbhanga, Bihar",
    image: womenImg,
    description: "Women SHG members learning savings management, micro-loans, and enterprise record keeping.",
  },
  {
    id: "g16",
    title: "School Kit & Learning Stationery Handover",
    sector: "education",
    sectorLabel: "Education & Learning",
    location: "Rural Bihar",
    image: educationImg,
    description: "Children proudly receiving bags, notebooks, geometry sets, and uniforms for the new academic session.",
  },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<SectorCategory>("all");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  const filteredItems =
    selectedCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.sector === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-800">
      <NotificationTicker />
      <UtilityBar />
      <Header />

      <main className="pb-20">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-slate-100 py-3 px-4 lg:px-12">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Link to="/" className="hover:text-[#0b1f3b] flex items-center gap-1">
              <Home className="w-3.5 h-3.5" /> Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="hover:text-[#0b1f3b]">Media</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-bold">Programme Gallery</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-[#071527] via-[#0b1f3b] to-[#15803d] text-white min-h-[480px] md:min-h-[520px] lg:min-h-[580px] flex items-center py-16 px-4 md:px-8 border-b border-white/10">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-brand-orange text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
              <Camera className="w-3.5 h-3.5" />
              <span>FIELD PROGRAMMES &amp; IMPACT IN ACTION</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
              Programme Gallery
            </h1>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Explore visual glimpses of Islah Welfare Foundation's field initiatives across all 8 sectors — from classrooms and health camps to rural livelihoods and relief responses.
            </p>
          </div>
        </section>

        {/* Categories Bar */}
        <section className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 min-w-max">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#0b1f3b] text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-brand-orange" : "text-slate-500"}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="max-w-7xl mx-auto px-4 lg:px-8 pt-10">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing <span className="text-[#0b1f3b]">{filteredItems.length}</span> Moments of Change
            </p>
            <span className="text-xs text-slate-400 font-medium">Click image to enlarge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveImage(item)}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 bg-[#0b1f3b]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-xs border border-white/20">
                    {item.sectorLabel}
                  </span>

                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                    <Eye className="w-4 h-4" />
                  </div>

                  <span className="absolute bottom-3 left-3 text-white/90 text-xs font-medium">
                    📍 {item.location}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Strip */}
          <div className="mt-16 bg-gradient-to-r from-[#0b1f3b] to-[#15803d] rounded-3xl p-8 text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div>
              <span className="text-brand-orange text-xs font-black uppercase tracking-widest block mb-1">
                JOIN THE MISSION
              </span>
              <h2 className="text-2xl font-black text-white mb-2">
                Be Part of Our Next Success Story
              </h2>
              <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed">
                Whether through volunteering, CSR partnerships, sponsorships or donations, your contribution directly empowers communities in need.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to="/donate"
                className="w-full sm:w-auto bg-[#ea580c] hover:bg-orange-600 text-white text-xs font-black px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 text-center"
              >
                Donate Now
              </Link>
              <Link
                to="/get-involved"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all text-center"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveImage(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[60vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeImage.image}
                  alt={activeImage.title}
                  className="w-full h-full object-contain max-h-[60vh]"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-black px-3 py-1 rounded-full uppercase">
                    {activeImage.sectorLabel}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    📍 {activeImage.location}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#0b1f3b] mb-2">
                  {activeImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeImage.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
