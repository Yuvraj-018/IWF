import { useState, useEffect } from "react";
import {
  Header,
  Footer,
  NotificationTicker,
  UtilityBar,
  RoleFormModal,
} from "@/components/layout/SiteLayout";
import { StandardPageHero } from "@/components/layout/StandardPageHero";
import type { RoleType } from "@/components/forms/RoleFormModal";
import type { CommunityTab } from "./components/CommunitySelectiveBar";
import { CommunityOverviewTab } from "./components/CommunityOverviewTab";
import { MembersDirectoryTab } from "./components/MembersDirectoryTab";
import { DonorsDirectoryTab } from "./components/DonorsDirectoryTab";
import { PartnersDirectoryTab } from "./components/PartnersDirectoryTab";
import { VolunteersDirectoryTab } from "./components/VolunteersDirectoryTab";
import aboutHero from "@/assets/about-hero.jpg";

interface CommunityPageProps {
  initialTab?: CommunityTab;
}

export default function CommunityPage({ initialTab = "overview" }: CommunityPageProps) {
  const getInitialTab = (): CommunityTab => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as CommunityTab | null;
      if (
        tabParam &&
        ["overview", "members", "donors", "partners", "volunteers"].includes(tabParam)
      ) {
        return tabParam;
      }
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<CommunityTab>(getInitialTab);
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  // Sync tab with URL search parameter on mount & on back/forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as CommunityTab | null;
      if (
        tabParam &&
        ["overview", "members", "donors", "partners", "volunteers"].includes(tabParam)
      ) {
        setActiveTab(tabParam);
      } else {
        setActiveTab(initialTab);
      }
    };

    handleLocationChange();
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, [initialTab]);

  const handleTabChange = (tab: CommunityTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "overview") {
        url.searchParams.delete("tab");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.pushState({}, "", url.toString());

      // Scroll smoothly to start of directory content
      const contentStart = document.getElementById("community-content-start");
      if (contentStart) {
        contentStart.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  // Dynamic hero configurations matching the design of each page while preserving universal hero sizing & blue theme
  const heroConfig = {
    overview: {
      badge: "ISLAH COMMUNITY",
      title: "People and Partners Behind Our Mission",
      description:
        "Discover the people, supporters and organisations connected with ISLAH Welfare Foundation, working hand in hand to foster hope, education, and livelihood.",
      breadcrumb: [
        { label: "About Us", href: "/about" },
        { label: "ISLAH Community" },
      ],
      taglineTop: "Together",
      taglineMid: "We Can Do",
      taglineBot: "More",
      verticalWords: ["MEMBERS", "DONORS", "PARTNERS", "VOLUNTEERS"],
    },
    members: {
      badge: "ISLAH COMMUNITY",
      title: "Members Directory",
      description:
        "Real People. Shared Purpose. Explore our growing community of individuals and organisations who are contributing their time, skills and support to build a more inclusive and empowered future.",
      breadcrumb: [
        { label: "About Us", href: "/about" },
        { label: "ISLAH Community", href: "/about/community" },
        { label: "Members Directory" },
      ],
      taglineTop: "Together",
      taglineMid: "We Build",
      taglineBot: "Brighter Futures",
      verticalWords: ["120+ MEMBERS", "8 CATEGORIES", "12+ DISTRICTS", "COMMUNITY"],
    },
    donors: {
      badge: "ISLAH COMMUNITY",
      title: "Donor Directory",
      description:
        "Our Gratitude. Their Support. A Stronger Tomorrow. We are deeply thankful to our donors who believe in our mission and help us create opportunities for rural and underserved communities. Their support drives lasting change.",
      breadcrumb: [
        { label: "About Us", href: "/about" },
        { label: "ISLAH Community", href: "/about/community" },
        { label: "Donors" },
      ],
      taglineTop: "Generosity",
      taglineMid: "Grows",
      taglineBot: "Opportunity",
      verticalWords: ["80+ SUPPORTERS", "CSR PARTNERS", "INDIVIDUALS", "ACROSS INDIA"],
    },
    partners: {
      badge: "ISLAH COMMUNITY",
      title: "Partners & Sponsors",
      description:
        "Working Together for Greater Impact. We value the institutions, organisations and individuals who collaborate with ISLAH to share expertise, support our programmes and help us create lasting change in rural and underserved communities.",
      breadcrumb: [
        { label: "About Us", href: "/about" },
        { label: "ISLAH Community", href: "/about/community" },
        { label: "Partners & Sponsors" },
      ],
      taglineTop: "Stronger",
      taglineMid: "Partnerships",
      taglineBot: "Brighter Futures",
      verticalWords: ["40+ PARTNERS", "CROSS-SECTOR", "CSR & CORP", "COLLABORATION"],
    },
    volunteers: {
      badge: "ISLAH COMMUNITY",
      title: "Volunteers & Mentors",
      description:
        "Share Your Time. Inspire Possibility. We bring together people who want to contribute their skills, experience and compassion to education, healthcare, livelihoods and community development.",
      breadcrumb: [
        { label: "About Us", href: "/about" },
        { label: "ISLAH Community", href: "/about/community" },
        { label: "Volunteers & Mentors" },
      ],
      taglineTop: "Give Time",
      taglineMid: "Share Knowledge",
      taglineBot: "Create Change",
      verticalWords: ["VOLUNTEERS", "MENTORSHIP", "GRASSROOTS", "COMMUNITY"],
    },
  }[activeTab];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* ── Standard Site Navigation ── */}
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* ── Standardized Page Hero (Universal Dimensions & Blue Color Theme) ── */}
      <StandardPageHero
        badge={heroConfig.badge}
        title={heroConfig.title}
        description={heroConfig.description}
        breadcrumb={heroConfig.breadcrumb}
        taglineTop={heroConfig.taglineTop}
        taglineMid={heroConfig.taglineMid}
        taglineBot={heroConfig.taglineBot}
        verticalWords={heroConfig.verticalWords}
        image={aboutHero}
      />

      <div id="community-content-start" />

      {/* ── Active Tab View ── */}
      <main className="flex-1 w-full">
        {activeTab === "overview" && (
          <CommunityOverviewTab
            onSwitchTab={handleTabChange}
            onOpenRoleModal={setActiveModal}
          />
        )}
        {activeTab === "members" && (
          <MembersDirectoryTab
            onSwitchTab={handleTabChange}
            onOpenRoleModal={setActiveModal}
          />
        )}
        {activeTab === "donors" && (
          <DonorsDirectoryTab
            onSwitchTab={handleTabChange}
            onOpenRoleModal={setActiveModal}
          />
        )}
        {activeTab === "partners" && (
          <PartnersDirectoryTab
            onSwitchTab={handleTabChange}
            onOpenRoleModal={setActiveModal}
          />
        )}
        {activeTab === "volunteers" && (
          <VolunteersDirectoryTab
            onSwitchTab={handleTabChange}
            onOpenRoleModal={setActiveModal}
          />
        )}
      </main>

      {/* ── Standard Site Footer ── */}
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
