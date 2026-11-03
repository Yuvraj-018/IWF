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
import { CommunitySelectiveBar, CommunityTab } from "./components/CommunitySelectiveBar";
import { CommunityOverviewTab } from "./components/CommunityOverviewTab";
import { MembersDirectoryTab } from "./components/MembersDirectoryTab";
import { DonorsDirectoryTab } from "./components/DonorsDirectoryTab";
import { PartnersDirectoryTab } from "./components/PartnersDirectoryTab";
import { VolunteersDirectoryTab } from "./components/VolunteersDirectoryTab";
import { InspirationalQuoteBanner } from "./components/InspirationalQuoteBanner";
import aboutHero from "@/assets/about-hero.jpg";

interface CommunityPageProps {
  initialTab?: CommunityTab;
}

export default function CommunityPage({ initialTab = "overview" }: CommunityPageProps) {
  const [activeTab, setActiveTab] = useState<CommunityTab>(initialTab);
  const [activeModal, setActiveModal] = useState<RoleType | null>(null);

  // Sync tab with URL search parameter if present (?tab=members, etc.)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as CommunityTab | null;
      if (tabParam && ["overview", "members", "donors", "partners", "volunteers"].includes(tabParam)) {
        setActiveTab(tabParam);
      }
    }
  }, []);

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

      // Scroll smoothly to top of content section
      const selectiveBar = document.getElementById("community-content-start");
      if (selectiveBar) {
        selectiveBar.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* ── Standard Site Navigation ── */}
      <NotificationTicker />
      <UtilityBar />
      <Header />

      {/* ── Standardized Page Hero (Exact sizing, font scale and theme) ── */}
      <StandardPageHero
        badge="ISLAH COMMUNITY"
        title="People and Partners Behind Our Mission"
        description="Discover the people, supporters and organisations connected with ISLAH Welfare Foundation, working hand in hand to foster hope, education, and livelihood."
        breadcrumb={[
          { label: "About Us", href: "/about" },
          { label: "ISLAH Community" },
        ]}
        taglineTop="Together"
        taglineMid="We Can Do"
        taglineBot="More"
        verticalWords={["MEMBERS", "DONORS", "PARTNERS", "VOLUNTEERS"]}
        image={aboutHero}
      />

      {/* ── Selective Sub-navigation Bar ── */}
      <div id="community-content-start">
        <CommunitySelectiveBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* ── Active Tab View ── */}
      <main className="flex-1 w-full">
        {activeTab === "overview" && (
          <CommunityOverviewTab
            onSwitchTab={handleTabChange}
            onOpenRoleModal={setActiveModal}
          />
        )}
        {activeTab === "members" && <MembersDirectoryTab />}
        {activeTab === "donors" && <DonorsDirectoryTab />}
        {activeTab === "partners" && <PartnersDirectoryTab />}
        {activeTab === "volunteers" && <VolunteersDirectoryTab />}

        {/* ── Bottom Section: Inspirational Quote Banner (Fills empty pre-footer space) ── */}
        <InspirationalQuoteBanner tabKey={activeTab} />
      </main>

      {/* ── Standard Site Footer ── */}
      <Footer onOpenModal={setActiveModal} />
      <RoleFormModal type={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
