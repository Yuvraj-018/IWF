import { useState, useEffect } from "react";
import { fetchSiteSettings, type SiteSettingsData } from "@/services/settingsService";

const DEFAULT_HOMEPAGE_STATS = {
  livesTouched: "5,000+",
  healthCamps: "100+",
  studentsSupported: "2,000+",
  villagesReached: "50+",
  activePrograms: "12",
  yearsOfService: "8",
  heroBeneficiaries: "10,000+",
};

export const DEFAULT_SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/islahindia/",
  twitter: "https://x.com/islahindia/",
  instagram: "https://www.instagram.com/islahindia/",
  linkedin: "https://www.linkedin.com/in/islahindia/",
  youtube: "https://www.youtube.com/channel/UC5sty9L25QQwC89JwGmEIVw/",
  whatsapp: "https://wa.me/919811861633",
};

export const DEFAULT_MEDIA_HUB_STATS = {
  fieldEvents: "120+",
  newsBulletins: "250+",
  livesReached: "50,000+",
  publications: "18+",
  visualStories: "500+",
};

export const DEFAULT_GALLERY_STATS = {
  fieldPhotos: "500+",
  videoStories: "35+",
  districtsCovered: "15+",
  realImpact: "100%",
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsData>({
    homepage_stats: DEFAULT_HOMEPAGE_STATS,
    social_links: DEFAULT_SOCIAL_LINKS,
    media_hub_stats: DEFAULT_MEDIA_HUB_STATS,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchSiteSettings()
      .then((data) => {
        if (mounted && data) {
          setSettings((prev) => ({
            ...prev,
            ...data,
            homepage_stats: {
              ...DEFAULT_HOMEPAGE_STATS,
              ...(data.homepage_stats || {}),
            },
            social_links: {
              ...DEFAULT_SOCIAL_LINKS,
              ...(data.social_links || {}),
            },
          }));
        }
      })
      .catch((err) => {
        console.warn("Could not load dynamic settings, using defaults:", err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return {
    settings,
    loading,
    homepageStats: settings.homepage_stats || DEFAULT_HOMEPAGE_STATS,
    socialLinks: { ...DEFAULT_SOCIAL_LINKS, ...(settings.social_links || {}) },
    leadershipData: settings.leadership_data,
    statutoryReports: settings.statutory_reports?.reports,
    communityDirectory: settings.community_directory?.spotlight,
    mediaHubStats: { ...DEFAULT_MEDIA_HUB_STATS, ...(settings.media_hub_stats || {}) },
    galleryStats: { ...DEFAULT_GALLERY_STATS, ...(settings.gallery_stats || {}) },
    annualReportsData: settings.annual_reports_data,
    impactStats: settings.impact_stats,
    demographics: settings.demographic_stats,
    sectorStats: settings.sector_stats,
    outcomesSettings: settings.outcomes_settings,
  };
}

