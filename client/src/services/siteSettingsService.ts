import { useState, useEffect } from "react";
import { API_BASE_URL } from "./apiClient";

export interface ImpactStats {
  livesTouched: string;
  villagesReached: string;
  districtsCovered: string;
  ongoingPrograms: string;
  volunteersCount: string;
  partnersCount: string;
  yearsOfImpact: string;
  totalCumulativeImpact: string;
}

export interface HomepageStats {
  livesTouched: string;
  healthCamps: string;
  studentsSupported: string;
  villagesReached: string;
  activePrograms: string;
  yearsOfService: string;
  heroBeneficiaries: string;
}

export interface GetInvolvedStats {
  lives: string;
  villages: string;
  students: string;
  volunteers: string;
}

export interface FeaturedCausesStats {
  eduRaised: string;
  eduGoalPct: string;
  medRaised: string;
  medGoalPct: string;
  womenRaised: string;
  womenGoalPct: string;
}

export interface DemographicStats {
  childrenCount: string;
  womenCount: string;
  youthCount: string;
  seniorCitizensCount: string;
}

export interface SectorStats {
  educationChildren: string;
  educationSchools: string;
  enrollmentRate: string;
  healthPeople: string;
  healthCamps: string;
  womenEmpowered: string;
  selfHelpGroups: string;
  youthTrained: string;
  youthPlacedRate: string;
  treesPlanted: string;
  farmersSupported: string;
  waterProjects: string;
  reliefFamilies?: string;
  reliefDrives?: string;
  foodRationKits?: string;
  cleanWaterPoints?: string;
  householdToilets?: string;
  cleanWaterPeople?: string;
}

export interface ContactInfo {
  primaryPhone: string;
  helplinePhone: string;
  whatsappNumber: string;
  primaryEmail: string;
  emergencyEmail: string;
  darbhangaOffice: string;
  delhiOffice: string;
}

// Default fallbacks matching current site values
export const DEFAULT_IMPACT_STATS: ImpactStats = {
  livesTouched: "50,000+",
  villagesReached: "300+",
  districtsCovered: "15+",
  ongoingPrograms: "25+",
  volunteersCount: "500+",
  partnersCount: "100+",
  yearsOfImpact: "10+",
  totalCumulativeImpact: "71,000+",
};

export const DEFAULT_HOMEPAGE_STATS: HomepageStats = {
  livesTouched: "5,000+",
  healthCamps: "100+",
  studentsSupported: "2,000+",
  villagesReached: "50+",
  activePrograms: "12",
  yearsOfService: "8",
  heroBeneficiaries: "10,000+",
};

export const DEFAULT_GETINVOLVED_STATS: GetInvolvedStats = {
  lives: "25,000+",
  villages: "120+",
  students: "18,500+",
  volunteers: "5,800+",
};

export const DEFAULT_FEATURED_CAUSES_STATS: FeaturedCausesStats = {
  eduRaised: "1,65,240",
  eduGoalPct: "75",
  medRaised: "2,12,880",
  medGoalPct: "48",
  womenRaised: "1,48,720",
  womenGoalPct: "60",
};

export const DEFAULT_DEMOGRAPHIC_STATS: DemographicStats = {
  childrenCount: "28,000+",
  womenCount: "21,000+",
  youthCount: "15,000+",
  seniorCitizensCount: "7,000+",
};

export const DEFAULT_SECTOR_STATS: SectorStats = {
  educationChildren: "8,000+",
  educationSchools: "120+",
  enrollmentRate: "95%",
  healthPeople: "6,000+",
  healthCamps: "85+",
  womenEmpowered: "4,000+",
  selfHelpGroups: "200+",
  youthTrained: "3,500+",
  youthPlacedRate: "70%",
  treesPlanted: "15,000+",
  farmersSupported: "2,500+",
  waterProjects: "50+",
  reliefFamilies: "12,000+",
  reliefDrives: "30+",
  foodRationKits: "45,000+",
  cleanWaterPoints: "80+",
  householdToilets: "250+",
  cleanWaterPeople: "15,000+",
};

export const DEFAULT_CONTACT_INFO: ContactInfo = {
  primaryPhone: "+91 94314 00000",
  helplinePhone: "+91 94314 11111",
  whatsappNumber: "+91 94314 00000",
  primaryEmail: "info@iwfindia.org",
  emergencyEmail: "emergency@iwfindia.org",
  darbhangaOffice: "Islah Welfare Foundation, Near Tower Chowk, Darbhanga, Bihar - 846004",
  delhiOffice: "New Delhi Liaison Office, India",
};

let cachedImpact: ImpactStats = DEFAULT_IMPACT_STATS;
let cachedHomepage: HomepageStats = DEFAULT_HOMEPAGE_STATS;
let cachedGetInvolved: GetInvolvedStats = DEFAULT_GETINVOLVED_STATS;
let cachedFeaturedCauses: FeaturedCausesStats = DEFAULT_FEATURED_CAUSES_STATS;
let cachedDemographics: DemographicStats = DEFAULT_DEMOGRAPHIC_STATS;
let cachedSector: SectorStats = DEFAULT_SECTOR_STATS;
let cachedContact: ContactInfo = DEFAULT_CONTACT_INFO;
let fetchPromise: Promise<void> | null = null;

export async function fetchSiteSettings(): Promise<{
  impact: ImpactStats;
  homepage: HomepageStats;
  getInvolved: GetInvolvedStats;
  featuredCauses: FeaturedCausesStats;
  demographics: DemographicStats;
  sector: SectorStats;
  contact: ContactInfo;
}> {
  if (fetchPromise) {
    await fetchPromise;
    return {
      impact: cachedImpact,
      homepage: cachedHomepage,
      getInvolved: cachedGetInvolved,
      featuredCauses: cachedFeaturedCauses,
      demographics: cachedDemographics,
      sector: cachedSector,
      contact: cachedContact,
    };
  }

  fetchPromise = fetch(`${API_BASE_URL}/settings`)
    .then((res) => res.json())
    .then((res) => {
      if (res.success && res.data) {
        if (res.data.impact_stats) {
          cachedImpact = { ...DEFAULT_IMPACT_STATS, ...res.data.impact_stats };
        }
        if (res.data.homepage_stats) {
          cachedHomepage = { ...DEFAULT_HOMEPAGE_STATS, ...res.data.homepage_stats };
        }
        if (res.data.getinvolved_stats) {
          cachedGetInvolved = { ...DEFAULT_GETINVOLVED_STATS, ...res.data.getinvolved_stats };
        }
        if (res.data.featured_causes_stats) {
          cachedFeaturedCauses = { ...DEFAULT_FEATURED_CAUSES_STATS, ...res.data.featured_causes_stats };
        }
        if (res.data.demographic_stats) {
          cachedDemographics = { ...DEFAULT_DEMOGRAPHIC_STATS, ...res.data.demographic_stats };
        }
        if (res.data.sector_stats) {
          cachedSector = { ...DEFAULT_SECTOR_STATS, ...res.data.sector_stats };
        }
        if (res.data.contact_info) {
          cachedContact = { ...DEFAULT_CONTACT_INFO, ...res.data.contact_info };
        }
      }
    })
    .catch((err) => {
      console.warn("[SiteSettings] Using default fallbacks:", err);
    })
    .finally(() => {
      fetchPromise = null;
    });

  await fetchPromise;
  return {
    impact: cachedImpact,
    homepage: cachedHomepage,
    getInvolved: cachedGetInvolved,
    featuredCauses: cachedFeaturedCauses,
    demographics: cachedDemographics,
    sector: cachedSector,
    contact: cachedContact,
  };
}

/**
 * Custom React hook to dynamically consume live backend impact metrics, sectors, and helplines.
 * Seamlessly defaults to existing bundled values if backend is offline.
 */
export function useSiteSettings() {
  const [impact, setImpact] = useState<ImpactStats>(cachedImpact);
  const [homepage, setHomepage] = useState<HomepageStats>(cachedHomepage);
  const [getInvolved, setGetInvolved] = useState<GetInvolvedStats>(cachedGetInvolved);
  const [featuredCauses, setFeaturedCauses] = useState<FeaturedCausesStats>(cachedFeaturedCauses);
  const [demographics, setDemographics] = useState<DemographicStats>(cachedDemographics);
  const [sector, setSector] = useState<SectorStats>(cachedSector);
  const [contact, setContact] = useState<ContactInfo>(cachedContact);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    fetchSiteSettings().then((liveData) => {
      if (!isMounted) return;
      setImpact(liveData.impact);
      setHomepage(liveData.homepage);
      setGetInvolved(liveData.getInvolved);
      setFeaturedCauses(liveData.featuredCauses);
      setDemographics(liveData.demographics);
      setSector(liveData.sector);
      setContact(liveData.contact);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { impact, homepage, getInvolved, featuredCauses, demographics, sector, contact, loading };
}
