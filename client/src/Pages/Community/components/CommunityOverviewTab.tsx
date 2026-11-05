import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import {
  Users,
  Heart,
  Building2,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Shield,
  Handshake,
  Sprout,
} from "lucide-react";
import ayeshaKhanImg from "@/assets/community/ayesha-khan.jpg";
import rahulSharmaImg from "@/assets/community/rahul-sharma.jpg";
import nehaVermaImg from "@/assets/community/neha-verma.jpg";
import landscapeVillageImg from "@/assets/community/landscape-village.jpg";
import { ProfileDetailModal } from "./ProfileDetailModal";
import { MEMBERS_DATA, DONORS_DATA, PARTNERS_DATA, VOLUNTEERS_DATA } from "../communityData";
import type { CommunityTab } from "./CommunitySelectiveBar";
import type { RoleType } from "@/components/forms/RoleFormModal";

interface CommunityOverviewTabProps {
  onSwitchTab: (tab: CommunityTab) => void;
  onOpenRoleModal?: (role: RoleType) => void;
}

export function CommunityOverviewTab({
  onSwitchTab,
  onOpenRoleModal,
}: CommunityOverviewTabProps) {
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [exploreFilter, setExploreFilter] = useState<"all" | "members" | "donors" | "partners" | "volunteers">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const PAGE_SIZE = 8;

  // Rich community profiles: 6 Members, 6 Donors, 6 Partners, 6 Volunteers (Total 24)
  const cards = [
    // 1. Members: Ayesha Khan
    {
      id: "ayesha",
      type: "member" as const,
      badgeText: "Member",
      badgeBg: "bg-[#e6f0fa] text-[#0f3b68] border border-[#cbe0f5]",
      BadgeIcon: ShieldCheck,
      name: "Ayesha Khan",
      title: "Individual Member",
      location: "Darbhanga, Bihar",
      image: ayeshaKhanImg,
      profileData: {
        type: "member" as const,
        data: MEMBERS_DATA[0],
      },
    },
    // 2. Donors: Rahul Sharma
    {
      id: "rahul",
      type: "donor" as const,
      badgeText: "Donor",
      badgeBg: "bg-[#fef3d6] text-[#b45309] border border-[#fde68a]",
      BadgeIcon: Heart,
      name: "Rahul Sharma",
      title: "Individual Donor",
      location: "New Delhi, Delhi",
      image: rahulSharmaImg,
      profileData: {
        type: "donor" as const,
        data: DONORS_DATA[1],
      },
    },
    // 3. Partners: Tata Consultancy Services
    {
      id: "tcs",
      type: "partner" as const,
      badgeText: "Partner",
      badgeBg: "bg-[#e1f0fa] text-[#1d6fad] border border-[#bae0fd]",
      BadgeIcon: Building2,
      name: "Tata Consultancy Services",
      title: "Corporate Partner",
      location: "Pan India",
      isLogo: true,
      logoType: "tata",
      profileData: {
        type: "partner" as const,
        data: PARTNERS_DATA[0],
      },
    },
    // 4. Volunteers: Neha Verma
    {
      id: "neha",
      type: "volunteer" as const,
      badgeText: "Volunteer",
      badgeBg: "bg-[#f0ebf8] text-[#6c529e] border border-[#e2d5f5]",
      BadgeIcon: GraduationCap,
      name: "Neha Verma",
      title: "Education Volunteer",
      location: "Lucknow, Uttar Pradesh",
      image: nehaVermaImg,
      profileData: {
        type: "volunteer" as const,
        data: VOLUNTEERS_DATA[1],
      },
    },
    // 5. Member: Dr. Tariq Anwar
    {
      id: "tariq",
      type: "member" as const,
      badgeText: "Member",
      badgeBg: "bg-[#e6f0fa] text-[#0f3b68] border border-[#cbe0f5]",
      BadgeIcon: ShieldCheck,
      name: "Dr. Tariq Anwar",
      title: "Executive Member",
      location: "Darbhanga, Bihar",
      initials: "TA",
      profileData: {
        type: "member" as const,
        data: MEMBERS_DATA[9],
      },
    },
    // 6. Partner: Reliance Foundation
    {
      id: "reliance",
      type: "partner" as const,
      badgeText: "Partner",
      badgeBg: "bg-[#e1f0fa] text-[#1d6fad] border border-[#bae0fd]",
      BadgeIcon: Building2,
      name: "Reliance Foundation",
      title: "Development Partner",
      location: "Maharashtra / Bihar",
      isLogo: true,
      logoType: "rf",
      profileData: {
        type: "partner" as const,
        data: PARTNERS_DATA[2],
      },
    },
    // 7. Donor: Azim Premji Philanthropic Initiatives
    {
      id: "azim-premji",
      type: "donor" as const,
      badgeText: "Donor",
      badgeBg: "bg-[#fef3d6] text-[#b45309] border border-[#fde68a]",
      BadgeIcon: Heart,
      name: "Azim Premji Philanthropy",
      title: "Platinum Foundation Donor",
      location: "Pan India",
      isLogo: true,
      logoType: "appi",
      profileData: {
        type: "donor" as const,
        data: DONORS_DATA[8],
      },
    },
    // 8. Volunteer: Dr. Ayesha Rahman
    {
      id: "ayesha-rahman",
      type: "volunteer" as const,
      badgeText: "Volunteer",
      badgeBg: "bg-[#f0ebf8] text-[#6c529e] border border-[#e2d5f5]",
      BadgeIcon: GraduationCap,
      name: "Dr. Ayesha Rahman",
      title: "Education Mentor",
      location: "Delhi NCR",
      initials: "AR",
      profileData: {
        type: "volunteer" as const,
        data: VOLUNTEERS_DATA[0],
      },
    },
    // 9. Member: Fatima Bano
    {
      id: "fatima",
      type: "member" as const,
      badgeText: "Member",
      badgeBg: "bg-[#e6f0fa] text-[#0f3b68] border border-[#cbe0f5]",
      BadgeIcon: ShieldCheck,
      name: "Fatima Bano",
      title: "Patron Member",
      location: "Patna, Bihar",
      initials: "FB",
      profileData: {
        type: "member" as const,
        data: MEMBERS_DATA[8],
      },
    },
    // 10. Partner: HDFC Bank
    {
      id: "hdfc",
      type: "partner" as const,
      badgeText: "Partner",
      badgeBg: "bg-[#e1f0fa] text-[#1d6fad] border border-[#bae0fd]",
      BadgeIcon: Building2,
      name: "HDFC Bank Parivartan",
      title: "Financial Inclusion Partner",
      location: "Pan India",
      isLogo: true,
      logoType: "hdfc",
      profileData: {
        type: "partner" as const,
        data: PARTNERS_DATA[1],
      },
    },
    // 11. Donor: Faisal Ahmed
    {
      id: "faisal",
      type: "donor" as const,
      badgeText: "Donor",
      badgeBg: "bg-[#fef3d6] text-[#b45309] border border-[#fde68a]",
      BadgeIcon: Heart,
      name: "Faisal Ahmed",
      title: "Individual Patron",
      location: "New Delhi, Delhi",
      initials: "FA",
      profileData: {
        type: "donor" as const,
        data: DONORS_DATA[7],
      },
    },
    // 12. Volunteer: Vikram Das
    {
      id: "vikram",
      type: "volunteer" as const,
      badgeText: "Volunteer",
      badgeBg: "bg-[#f0ebf8] text-[#6c529e] border border-[#e2d5f5]",
      BadgeIcon: GraduationCap,
      name: "Vikram Das",
      title: "Agronomist & Mentor",
      location: "Darbhanga, Bihar",
      initials: "VD",
      profileData: {
        type: "volunteer" as const,
        data: VOLUNTEERS_DATA[5],
      },
    },
    // 13. Member: Imran Ansari
    {
      id: "imran",
      type: "member" as const,
      badgeText: "Member",
      badgeBg: "bg-[#e6f0fa] text-[#0f3b68] border border-[#cbe0f5]",
      BadgeIcon: ShieldCheck,
      name: "Imran Ansari",
      title: "Community Member",
      location: "Patna, Bihar",
      initials: "IA",
      profileData: {
        type: "member" as const,
        data: MEMBERS_DATA[3],
      },
    },
    // 14. Partner: Cipla Foundation
    {
      id: "cipla-partner",
      type: "partner" as const,
      badgeText: "Partner",
      badgeBg: "bg-[#e1f0fa] text-[#1d6fad] border border-[#bae0fd]",
      BadgeIcon: Building2,
      name: "Cipla Foundation",
      title: "Healthcare Partner",
      location: "Maharashtra",
      isLogo: true,
      logoType: "cipla",
      profileData: {
        type: "partner" as const,
        data: PARTNERS_DATA[4],
      },
    },
    // 15. Donor: Cipla Foundation
    {
      id: "cipla-donor",
      type: "donor" as const,
      badgeText: "Donor",
      badgeBg: "bg-[#fef3d6] text-[#b45309] border border-[#fde68a]",
      BadgeIcon: Heart,
      name: "Cipla Foundation",
      title: "Healthcare Donor",
      location: "Maharashtra",
      isLogo: true,
      logoType: "cipla",
      profileData: {
        type: "donor" as const,
        data: DONORS_DATA[5],
      },
    },
    // 16. Volunteer: Meera Singh
    {
      id: "meera",
      type: "volunteer" as const,
      badgeText: "Volunteer",
      badgeBg: "bg-[#f0ebf8] text-[#6c529e] border border-[#e2d5f5]",
      BadgeIcon: GraduationCap,
      name: "Meera Singh",
      title: "Healthcare Awareness Mentor",
      location: "Uttar Pradesh",
      initials: "MS",
      profileData: {
        type: "volunteer" as const,
        data: VOLUNTEERS_DATA[2],
      },
    },
    // 17. Member: Sneha Gupta
    {
      id: "sneha",
      type: "member" as const,
      badgeText: "Member",
      badgeBg: "bg-[#e6f0fa] text-[#0f3b68] border border-[#cbe0f5]",
      BadgeIcon: ShieldCheck,
      name: "Sneha Gupta",
      title: "Contributing Member",
      location: "Gurugram, Haryana",
      initials: "SG",
      profileData: {
        type: "member" as const,
        data: MEMBERS_DATA[4],
      },
    },
    // 18. Partner: ITC Limited
    {
      id: "itc-partner",
      type: "partner" as const,
      badgeText: "Partner",
      badgeBg: "bg-[#e1f0fa] text-[#1d6fad] border border-[#bae0fd]",
      BadgeIcon: Building2,
      name: "ITC Limited",
      title: "Corporate Partner",
      location: "West Bengal / Bihar",
      isLogo: true,
      logoType: "itc",
      profileData: {
        type: "partner" as const,
        data: PARTNERS_DATA[3],
      },
    },
    // 19. Donor: State Bank of India
    {
      id: "sbi-donor",
      type: "donor" as const,
      badgeText: "Donor",
      badgeBg: "bg-[#fef3d6] text-[#b45309] border border-[#fde68a]",
      BadgeIcon: Heart,
      name: "State Bank of India",
      title: "Corporate Donor",
      location: "Pan India",
      isLogo: true,
      logoType: "sbi",
      profileData: {
        type: "donor" as const,
        data: DONORS_DATA[3],
      },
    },
    // 20. Volunteer: Arif Khan
    {
      id: "arif",
      type: "volunteer" as const,
      badgeText: "Volunteer",
      badgeBg: "bg-[#f0ebf8] text-[#6c529e] border border-[#e2d5f5]",
      BadgeIcon: GraduationCap,
      name: "Arif Khan",
      title: "Employability Mentor",
      location: "Patna, Bihar",
      initials: "AK",
      profileData: {
        type: "volunteer" as const,
        data: VOLUNTEERS_DATA[3],
      },
    },
    // 21. Member: Md. Saifullah
    {
      id: "saifullah",
      type: "member" as const,
      badgeText: "Member",
      badgeBg: "bg-[#e6f0fa] text-[#0f3b68] border border-[#cbe0f5]",
      BadgeIcon: ShieldCheck,
      name: "Md. Saifullah",
      title: "Patron Member",
      location: "Azamgarh, UP",
      initials: "MS",
      profileData: {
        type: "member" as const,
        data: MEMBERS_DATA[5],
      },
    },
    // 22. Partner: SBI Foundation
    {
      id: "sbi-partner",
      type: "partner" as const,
      badgeText: "Partner",
      badgeBg: "bg-[#e1f0fa] text-[#1d6fad] border border-[#bae0fd]",
      BadgeIcon: Building2,
      name: "SBI Foundation",
      title: "CSR Partner",
      location: "Pan India",
      isLogo: true,
      logoType: "sbi",
      profileData: {
        type: "partner" as const,
        data: PARTNERS_DATA[5],
      },
    },
    // 23. Donor: Reliance Foundation
    {
      id: "reliance-donor",
      type: "donor" as const,
      badgeText: "Donor",
      badgeBg: "bg-[#fef3d6] text-[#b45309] border border-[#fde68a]",
      BadgeIcon: Heart,
      name: "Reliance Foundation",
      title: "Gold Corporate Donor",
      location: "Maharashtra / Bihar",
      isLogo: true,
      logoType: "rf",
      profileData: {
        type: "donor" as const,
        data: DONORS_DATA[1],
      },
    },
    // 24. Volunteer: Sana Parveen
    {
      id: "sana",
      type: "volunteer" as const,
      badgeText: "Volunteer",
      badgeBg: "bg-[#f0ebf8] text-[#6c529e] border border-[#e2d5f5]",
      BadgeIcon: GraduationCap,
      name: "Sana Parveen",
      title: "Legal Literacy Volunteer",
      location: "Patna, Bihar",
      initials: "SP",
      profileData: {
        type: "volunteer" as const,
        data: VOLUNTEERS_DATA[6],
      },
    },
  ];

  const filteredCards = cards.filter((c) => {
    if (exploreFilter === "members" && c.type !== "member") return false;
    if (exploreFilter === "donors" && c.type !== "donor") return false;
    if (exploreFilter === "partners" && c.type !== "partner") return false;
    if (exploreFilter === "volunteers" && c.type !== "volunteer") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPages = Math.ceil(filteredCards.length / PAGE_SIZE) || 1;
  const paginatedCards = filteredCards.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );

  const getCardSubtitle = (card: (typeof cards)[0]) => {
    const d = card.profileData?.data;
    if (!d) return null;
    if (card.type === "member") return (d as any).profession || `ID: ${(d as any).id || ""}`;
    if (card.type === "donor") {
      const causes = (d as any).causes;
      if (Array.isArray(causes) && causes.length > 0) return causes.slice(0, 2).join(" • ");
      return (d as any).amountLabel || ((d as any).sinceYear ? `Supporter since ${(d as any).sinceYear}` : null);
    }
    if (card.type === "partner") return (d as any).focusArea || ((d as any).sinceYear ? `Partner since ${(d as any).sinceYear}` : null);
    if (card.type === "volunteer") return (d as any).domain || (d as any).bio || null;
    return null;
  };

  // Automatically reset to page 0 if filters or search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [exploreFilter, searchQuery]);

  return (
    <div className="w-full bg-white select-none">
      {/* ══════════════════════════════════════════════════════════
          1. OUR COMMUNITY: Four Ways to Connect (Blue Themed)
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header & Quote Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#1c558c]">
              OUR COMMUNITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2238] mt-1 tracking-tight">
              One Community. Four Ways to Connect.
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
              Explore our community directories and discover the individuals, organisations and supporters who help ISLAH create opportunities for a better tomorrow.
            </p>
          </div>

          {/* Right Quote Box with Motifs */}
          <div className="flex items-center gap-3 shrink-0 max-w-md">
            <span className="font-serif text-5xl text-[#1c558c]/25 leading-none select-none">“</span>
            <blockquote className="font-serif italic text-sm sm:text-base text-slate-700 leading-snug">
              "Stronger communities are built by people who care, contribute and collaborate."
            </blockquote>
            {/* Small sprig icon */}
            <div className="w-8 h-8 text-[#1c558c]/40 shrink-0">
              <svg viewBox="0 0 40 40" fill="currentColor">
                <path d="M35,5 Q20,15 10,28 Q15,35 28,25 Q35,18 35,5 Z" />
                <path d="M25,20 Q12,25 5,38 Q18,36 25,20 Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 4 Pastel Cards (Blue themed primary card - Compressed width-wise with inline icons) */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            {/* Card 1: Members (Ice Blue Theme) */}
            <div className="bg-[#f0f5fa] border border-[#d5e3f0] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              {/* Faint watermark in top right */}
              <div className="absolute top-0 right-0 w-20 h-20 text-[#0f3b68]/5 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M90,10 C60,25 30,55 20,95 C40,85 65,70 90,10 Z" />
                </svg>
              </div>

              <div>
                {/* Logo / Icon Inline with Heading */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#0f3b68] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2238] leading-tight">Members</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  Our members form an important part of the ISLAH community.
                </p>

                {/* Stat Pill */}
                <div className="inline-flex items-center gap-2 mt-3 bg-white/95 px-3 py-1.5 rounded-full border border-[#d5e3f0] shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-[#e2eef9] text-[#0f3b68] flex items-center justify-center shrink-0">
                    <Users className="w-3.5 h-3.5 text-[#0f3b68]" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-[#0B2238]">120+</span>
                    <span className="text-xs text-slate-500 font-medium">Active Members</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 mt-2 border-t border-[#d5e3f0]/60">
                <button
                  onClick={() => onSwitchTab("members")}
                  className="text-xs font-bold text-[#0f3b68] hover:text-[#071d33] inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Explore Members</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Donors */}
            <div className="bg-[#fdf6e9] border border-[#f5e4c3] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              {/* Leaf watermark */}
              <div className="absolute top-0 right-0 w-20 h-20 text-[#d97706]/10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M90,10 C60,25 30,55 20,95 C40,85 65,70 90,10 Z" />
                </svg>
              </div>

              <div>
                {/* Logo / Icon Inline with Heading */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#d97706] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Heart className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2238] leading-tight">Donors</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  Acknowledge our supporters who help advance our mission.
                </p>

                {/* Stat Pill */}
                <div className="inline-flex items-center gap-2 mt-3 bg-white/95 px-3 py-1.5 rounded-full border border-[#f5e4c3] shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-[#fef3d6] text-[#d97706] flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5 text-[#d97706]" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-[#0B2238]">80+</span>
                    <span className="text-xs text-slate-500 font-medium">Supporters</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 mt-2 border-t border-[#f5e4c3]/60">
                <button
                  onClick={() => onSwitchTab("donors")}
                  className="text-xs font-bold text-[#d97706] hover:text-[#b45309] inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Explore Donors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Partners & Sponsors */}
            <div className="bg-[#edf5fc] border border-[#d0e4f7] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              {/* Leaf watermark */}
              <div className="absolute top-0 right-0 w-20 h-20 text-[#2563eb]/10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M90,10 C60,25 30,55 20,95 C40,85 65,70 90,10 Z" />
                </svg>
              </div>

              <div>
                {/* Logo / Icon Inline with Heading */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Handshake className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2238] leading-tight">Partners &amp; Sponsors</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  Collaborating organisations and programme supporters.
                </p>

                {/* Stat Pill */}
                <div className="inline-flex items-center gap-2 mt-3 bg-white/95 px-3 py-1.5 rounded-full border border-[#d0e4f7] shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-[#e0f0fe] text-[#2563eb] flex items-center justify-center shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-[#2563eb]" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-[#0B2238]">40+</span>
                    <span className="text-xs text-slate-500 font-medium">Partners</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 mt-2 border-t border-[#d0e4f7]/60">
                <button
                  onClick={() => onSwitchTab("partners")}
                  className="text-xs font-bold text-[#2563eb] hover:text-[#1d4ed8] inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Explore Partners</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 4: Volunteers & Mentors */}
            <div className="bg-[#f4effa] border border-[#e2d5f5] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between relative overflow-hidden shadow-xs hover:shadow-md transition-all">
              {/* Leaf watermark */}
              <div className="absolute top-0 right-0 w-20 h-20 text-[#7c3aed]/10 pointer-events-none">
                <svg viewBox="0 0 100 100" fill="currentColor">
                  <path d="M90,10 C60,25 30,55 20,95 C40,85 65,70 90,10 Z" />
                </svg>
              </div>

              <div>
                {/* Logo / Icon Inline with Heading */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#0B2238] leading-tight">Volunteers &amp; Mentors</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed min-h-[36px]">
                  People who contribute their time, skills and expertise.
                </p>

                {/* Stat Pill */}
                <div className="inline-flex items-center gap-2 mt-3 bg-white/95 px-3 py-1.5 rounded-full border border-[#e2d5f5] shadow-2xs">
                  <div className="w-5 h-5 rounded-full bg-[#f3e8ff] text-[#7c3aed] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5 text-[#7c3aed]" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-extrabold text-[#0B2238]">15+</span>
                    <span className="text-xs text-slate-500 font-medium">Active Contributors</span>
                  </div>
                </div>
              </div>

              <div className="pt-3.5 mt-2 border-t border-[#e2d5f5]/60">
                <button
                  onClick={() => onSwitchTab("volunteers")}
                  className="text-xs font-bold text-[#7c3aed] hover:text-[#5b21b6] inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Explore Volunteers &amp; Mentors</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          2. EXPLORE OUR COMMUNITY (Spotlight Directory Carousel)
         ══════════════════════════════════════════════════════════ */}
      <section id="explore-community-section" className="bg-[#fcfdfc] border-y border-slate-100 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Search Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#1c558c]">
                EXPLORE OUR COMMUNITY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2238] mt-1 tracking-tight">
                Find the People. Build the Connections.
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Use the directory below to search and filter our community members, donors, <span className="font-bold text-slate-800">partners and volunteers</span>.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="w-full lg:w-96 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, organisation or keyword..."
                className="w-full pl-4 pr-10 py-2.5 bg-white text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#1c558c]/20 focus:border-[#1c558c] shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Filter Pills (Navy Theme) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
            <button
              onClick={() => setExploreFilter("all")}
              className={`text-xs font-semibold px-4 py-2 rounded-lg shrink-0 transition cursor-pointer ${
                exploreFilter === "all"
                  ? "bg-[#071527] text-white shadow-xs"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setExploreFilter("members")}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1.5 transition cursor-pointer ${
                exploreFilter === "members"
                  ? "bg-[#071527] text-white shadow-xs"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>Members</span>
            </button>
            <button
              onClick={() => setExploreFilter("donors")}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1.5 transition cursor-pointer ${
                exploreFilter === "donors"
                  ? "bg-[#071527] text-white shadow-xs"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-[#d97706]" />
              <span>Donors</span>
            </button>
            <button
              onClick={() => setExploreFilter("partners")}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1.5 transition cursor-pointer ${
                exploreFilter === "partners"
                  ? "bg-[#071527] text-white shadow-xs"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Partners &amp; Sponsors</span>
            </button>
            <button
              onClick={() => setExploreFilter("volunteers")}
              className={`text-xs font-medium px-3.5 py-2 rounded-lg shrink-0 flex items-center gap-1.5 transition cursor-pointer ${
                exploreFilter === "volunteers"
                  ? "bg-[#071527] text-white shadow-xs"
                  : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
              <span>Volunteers &amp; Mentors</span>
            </button>
          </div>

          {/* Cards Grid with Floating Navigation Buttons (Total 8 Cards on Desktop, keeping 4 in a row, shrunk horizontally) */}
          <div className="max-w-5xl mx-auto relative mt-2">
            {/* Arrow Controls */}
            {totalPages > 1 && (
              <div className="hidden md:flex justify-between items-center absolute inset-y-1/2 -left-5 lg:-left-7 -right-5 lg:-right-7 -translate-y-1/2 pointer-events-none z-20">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                  disabled={currentPage === 0}
                  aria-label="Previous page"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 pointer-events-auto transition ${
                    currentPage === 0
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#071527] hover:text-white hover:border-[#071527] cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                  disabled={currentPage >= totalPages - 1}
                  aria-label="Next page"
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-700 pointer-events-auto transition ${
                    currentPage >= totalPages - 1
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:bg-[#071527] hover:text-white hover:border-[#071527] cursor-pointer"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Responsive Grid: 8 Cards on Desktop (4 cols x 2 rows), keeping 4 in a row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-3.5">
              {paginatedCards.map((card) => {
                const BadgeIcon = card.BadgeIcon;
                const subtitle = getCardSubtitle(card);
                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition group"
                  >
                    <div>
                      {/* Avatar / Logo and Badge */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                          {card.isLogo ? (
                            <div className="w-full h-full bg-white flex flex-col items-center justify-center p-1">
                              {card.logoType === "tata" && (
                                <>
                                  <svg viewBox="0 0 48 28" className="w-6 h-3 text-[#005696]" fill="none">
                                    <path d="M4,4 L44,4 C40,15 30,24 24,26 C18,24 8,15 4,4 Z" stroke="#005696" strokeWidth="2.5" />
                                    <path d="M14,4 L34,4 M24,4 L24,20" stroke="#005696" strokeWidth="2.5" strokeLinecap="round" />
                                  </svg>
                                  <span className="text-[7.5px] font-black tracking-widest text-[#005696] leading-none mt-0.5">TATA</span>
                                </>
                              )}
                              {card.logoType === "rf" && (
                                <div className="flex flex-col items-center justify-center text-center">
                                  <span className="text-[8.5px] font-black tracking-tight text-[#c22026]">RELIANCE</span>
                                  <span className="text-[5.5px] font-bold tracking-wider text-slate-500">FOUNDATION</span>
                                </div>
                              )}
                              {card.logoType === "hdfc" && (
                                <div className="flex flex-col items-center justify-center text-center">
                                  <div className="w-3.5 h-3.5 rounded bg-[#004b87] flex items-center justify-center text-white text-[7.5px] font-black">
                                    H
                                  </div>
                                  <span className="text-[6.5px] font-bold text-[#004b87] mt-0.5">HDFC BANK</span>
                                </div>
                              )}
                              {card.logoType === "sbi" && (
                                <div className="flex flex-col items-center justify-center text-center">
                                  <div className="w-3.5 h-3.5 rounded-full bg-[#280071] flex items-center justify-center text-white text-[7.5px] font-black">
                                    SBI
                                  </div>
                                  <span className="text-[6.5px] font-bold text-[#280071] mt-0.5">FOUNDATION</span>
                                </div>
                              )}
                              {card.logoType === "cipla" && (
                                <div className="flex flex-col items-center justify-center text-center">
                                  <span className="text-[9px] font-black tracking-wider text-[#d0202f]">Cipla</span>
                                  <span className="text-[5px] font-bold text-slate-500">FOUNDATION</span>
                                </div>
                              )}
                              {card.logoType === "appi" && (
                                <div className="flex flex-col items-center justify-center text-center">
                                  <span className="text-[8px] font-black tracking-wider text-[#0B2238]">APPI</span>
                                  <span className="text-[5px] font-bold text-slate-500">PHILANTHROPY</span>
                                </div>
                              )}
                              {card.logoType === "itc" && (
                                <div className="flex flex-col items-center justify-center text-center">
                                  <span className="text-[9px] font-black tracking-wider text-[#1c558c]">ITC</span>
                                  <span className="text-[5.5px] font-bold text-slate-500">LIMITED</span>
                                </div>
                              )}
                            </div>
                          ) : card.image ? (
                            <img
                              src={card.image}
                              alt={card.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-[#0B2238] to-[#1c558c] text-white flex items-center justify-center font-bold text-xs">
                              {card.initials || card.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${card.badgeBg}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          <span>{card.badgeText}</span>
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#0B2238] leading-tight line-clamp-1 group-hover:text-[#1c558c] transition-colors">
                        {card.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">{card.title}</p>
                      
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3 h-3 text-[#f97316] shrink-0" />
                        <span className="line-clamp-1">{card.location}</span>
                      </div>

                      {subtitle && (
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center gap-1 text-xs text-slate-600 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1c558c]/60 shrink-0" />
                          <span className="truncate">{subtitle}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 mt-2 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedProfile(card.profileData)}
                        className="w-full py-1.5 px-3 rounded-md border border-slate-200 bg-slate-50/70 hover:border-[#071527] hover:bg-[#071527] hover:text-white text-xs font-semibold text-[#0B2238] transition flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1.5 mt-8">
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx)}
                    aria-label={`Go to page ${idx + 1}`}
                    className={`transition-all duration-200 cursor-pointer ${
                      currentPage === idx
                        ? "w-6 h-2 rounded-full bg-[#071527]"
                        : "w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. DUAL ACTION BANNERS: "Already a Member?" & "Want to Join?" (Blue Themed)
         ══════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card: Already a Member? */}
          <div className="lg:col-span-7 bg-[#f0f5fa] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#d5e3f0] flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#071527] text-white flex items-center justify-center text-xl shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1c558c]">
                    Already a Member?
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0B2238]">
                    Access Your Member Portal
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Verify with an OTP to check your membership status, renew and download your card.
                  </p>
                </div>
              </div>

              {/* 4 Feature Items */}
              <div className="grid grid-cols-2 gap-2.5 my-6 text-xs text-slate-700 border-y border-[#d5e3f0]/80 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1c558c] shrink-0" />
                  <span>View Profile &amp; Details</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1c558c] shrink-0" />
                  <span>Track Membership Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1c558c] shrink-0" />
                  <span>Renew Membership</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#1c558c] shrink-0" />
                  <span>Download Membership Card</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/membership"
                hash="membership-status"
                className="bg-[#071527] hover:bg-[#0e2a4a] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition flex items-center gap-2"
              >
                <span>Check Membership Status</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/membership"
                hash="membership-status"
                className="bg-white border-2 border-brand-orange text-brand-orange hover:bg-orange-50 font-bold text-xs px-5 py-2 rounded-xl transition flex items-center gap-2"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>Renew Membership</span>
              </Link>
            </div>
          </div>

          {/* Right Card: Want to Join Our Community? */}
          <div className="lg:col-span-5 bg-[#f0f5fa] rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#d5e3f0] flex flex-col justify-between relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute top-0 right-0 w-32 h-32 text-[#0f3b68]/5 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M90,10 C60,25 30,55 20,95 C40,85 65,70 90,10 Z" />
              </svg>
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#071527] text-white flex items-center justify-center text-xl shrink-0 shadow-sm mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0B2238]">
                Want to Join Our Community?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Visit our <span className="font-bold text-[#1c558c]">Get Involved</span> section for detailed information on how to join, contribute and make an impact.
              </p>
            </div>

            <div className="pt-6">
              <Link
                to="/get-involved"
                className="bg-[#071527] hover:bg-[#0e2a4a] text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs inline-flex items-center gap-2 transition cursor-pointer"
              >
                <span>Go to Get Involved</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. OUR SHARED COMMITMENT (Handcrafted Component with High-Res Image & Right Fade)
         ══════════════════════════════════════════════════════════ */}
      <section className="w-full bg-white border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[320px] items-stretch">
          {/* Left Column: Handcrafted Image Section with Luminous Right Fade */}
          <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[300px] lg:min-h-full overflow-hidden bg-slate-100">
            <img
              src={landscapeVillageImg}
              alt="Rural mountain community and landscape"
              className="w-full h-full object-cover object-left"
            />
            {/* Luminous Right Gradient Fade into the white content area */}
            <div className="hidden lg:block absolute inset-y-0 right-0 w-32 xl:w-48 bg-gradient-to-r from-transparent via-white/50 to-white pointer-events-none" />
            <div className="lg:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Shared Commitment Content Area */}
          <div className="lg:col-span-7 px-6 sm:px-10 lg:px-12 py-8 lg:py-10 flex flex-col justify-center bg-white z-10">
            <span className="text-[#1c558c] font-bold uppercase text-xs tracking-wider block mb-1">
              OUR SHARED COMMITMENT
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2238] font-serif tracking-tight">
              A Stronger Community. A Brighter Future.
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
              Every member, donor, partner, sponsor, volunteer and mentor plays a role in building a
              more inclusive, empowered and sustainable future for rural and underserved
              communities.
            </p>

            {/* Horizontal subtle line */}
            <div className="w-full h-px bg-slate-200/90 my-6" />

            {/* Bottom Row: 5 Core Values on Left, Golden Script on Right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              {/* 5 Circular Outline Core Values */}
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
                {/* Integrity */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-[#0B2238] mb-1.5 hover:border-[#1c558c] hover:bg-slate-50 transition shadow-2xs">
                    <Shield className="w-4 h-4 text-[#0B2238]" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2238]">Integrity</span>
                </div>

                {/* Inclusion */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-[#0B2238] mb-1.5 hover:border-[#1c558c] hover:bg-slate-50 transition shadow-2xs">
                    <Users className="w-4 h-4 text-[#0B2238]" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2238]">Inclusion</span>
                </div>

                {/* Accountability */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-[#0B2238] mb-1.5 hover:border-[#1c558c] hover:bg-slate-50 transition shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-[#0B2238]" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2238]">Accountability</span>
                </div>

                {/* Collaboration */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-[#0B2238] mb-1.5 hover:border-[#1c558c] hover:bg-slate-50 transition shadow-2xs">
                    <Handshake className="w-4 h-4 text-[#0B2238]" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2238]">Collaboration</span>
                </div>

                {/* Sustainability */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-[#0B2238] mb-1.5 hover:border-[#1c558c] hover:bg-slate-50 transition shadow-2xs">
                    <Sprout className="w-4 h-4 text-[#0B2238]" />
                  </div>
                  <span className="text-xs font-bold text-[#0B2238]">Sustainability</span>
                </div>
              </div>

              {/* Golden Cursive Tagline */}
              <div className="relative text-left sm:text-right shrink-0">
                <p className="font-['Caveat',cursive] text-2xl sm:text-3xl text-[#c28b38] leading-tight select-none rotate-[-2deg]">
                  Together,<br />
                  we can make a<br />
                  difference.
                </p>
                <svg
                  viewBox="0 0 110 14"
                  className="w-24 sm:w-28 h-3 text-[#c28b38] sm:ml-auto mt-0.5"
                  fill="none"
                >
                  <path
                    d="M4,10 Q55,1 105,7"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <ProfileDetailModal profile={selectedProfile} onClose={() => setSelectedProfile(null)} />
    </div>
  );
}
