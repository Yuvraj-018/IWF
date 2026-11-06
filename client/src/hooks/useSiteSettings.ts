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

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettingsData>({
    homepage_stats: DEFAULT_HOMEPAGE_STATS,
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
  };
}

