import { apiRequest } from "./apiClient";

export interface SiteSettingsData {
  impact_stats?: {
    livesTouched?: string;
    villagesReached?: string;
    districtsCovered?: string;
    ongoingPrograms?: string;
    volunteersCount?: string;
    partnersCount?: string;
    yearsOfImpact?: string;
    totalCumulativeImpact?: string;
  };
  homepage_stats?: {
    livesTouched?: string;
    healthCamps?: string;
    studentsSupported?: string;
    villagesReached?: string;
    activePrograms?: string;
    yearsOfService?: string;
    heroBeneficiaries?: string;
  };
  getinvolved_stats?: {
    lives?: string;
    villages?: string;
    students?: string;
    volunteers?: string;
  };
  featured_causes_stats?: {
    educationTarget?: string;
    educationRaised?: string;
    healthcareTarget?: string;
    healthcareRaised?: string;
    livelihoodTarget?: string;
    livelihoodRaised?: string;
    washTarget?: string;
    washRaised?: string;
  };
  demographic_stats?: {
    childrenCount?: string;
    womenCount?: string;
    youthCount?: string;
    seniorCitizensCount?: string;
    womenPercentage?: string;
    childrenPercentage?: string;
    elderlyPercentage?: string;
    ruralPercentage?: string;
    semiUrbanPercentage?: string;
  };
  sector_stats?: Record<string, string>;
  contact_info?: {
    primaryPhone?: string;
    helplinePhone?: string;
    whatsappNumber?: string;
    primaryEmail?: string;
    emergencyEmail?: string;
    darbhangaOffice?: string;
    delhiOffice?: string;
  };
  media_hub_stats?: {
    fieldEvents?: string;
    newsBulletins?: string;
    livesReached?: string;
    publications?: string;
    visualStories?: string;
  };
  gallery_stats?: {
    fieldPhotos?: string;
    videoStories?: string;
    districtsCovered?: string;
    realImpact?: string;
  };
  annual_reports_data?: {
    statsRibbon?: {
      livesImpacted?: string;
      villagesCovered?: string;
      ongoingPrograms?: string;
      partnersSupporters?: string;
      yearsOfImpact?: string;
    };
    sidebar?: {
      highlightsTitle?: string;
      highlights?: Array<{ title: string; desc: string }>;
      aboutTitle?: string;
      aboutText?: string;
    };
    reports?: Array<{
      id: string;
      year: string;
      title: string;
      summary: string;
      cover?: string;
      fileSize: string;
      pdfUrl: string;
    }>;
  };
  outcomes_settings?: {
    totalCumulativeImpact?: string;
    growthNote?: string;
    beneficiaryQuote?: string;
    quoteText?: string;
    quoteAuthor?: string;
    reach?: {
      villages?: string;
      districts?: string;
      states?: string;
      stateList?: string[];
    };
    growthHistory?: Array<{
      year: string;
      value: string;
      num?: number;
      heightPct: number;
    }>;
    themes?: Array<{
      name: string;
      count: string;
      percentage: number;
      color: string;
    }>;
    keyAreas?: Array<{
      title: string;
      achievements: string[];
    }>;
  };
  social_links?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    whatsapp?: string;
  };
  statutory_reports?: {
    reports?: Array<{
      id: string;
      title: string;
      year: string;
      status: string;
      fileUrl: string;
      fileSize?: string;
    }>;
  };
  leadership_data?: {
    trustees?: Array<{
      id: string;
      sno: number;
      name: string;
      designation: string;
      portfolio: string;
      email?: string;
      badgeColor?: string;
      gender?: "male" | "female";
      image?: string;
    }>;
    executive?: Array<{
      id: string;
      sno: number;
      name: string;
      designation: string;
      portfolio: string;
      email?: string;
      gender?: "male" | "female";
      image?: string;
    }>;
    advisory?: Array<{
      id: string;
      sno: number;
      name: string;
      expertise: string;
      focus: string;
      gender?: "male" | "female";
      image?: string;
    }>;
    field?: Array<{
      id: string;
      sno: number;
      name: string;
      designation: string;
      focus: string;
      gender?: "male" | "female";
      image?: string;
    }>;
  };
  community_directory?: {
    spotlight?: Array<{
      id: string;
      name: string;
      role: string;
      type: "member" | "donor" | "partner" | "volunteer" | "mentor";
      location: string;
      avatar?: string;
      category?: string;
      bio?: string;
      organization?: string;
      isPublicConsent: boolean;
    }>;
    members?: Array<{
      id: string;
      name: string;
      category: any;
      type: any;
      district: string;
      state: string;
      status: any;
      joinDate: string;
      validTill: string;
      profession?: string;
    }>;
    donors?: Array<{
      id: string;
      name: string;
      tier: any;
      type: any;
      causes: string[];
      sinceYear: number;
      location: string;
      amountLabel?: string;
      description?: string;
      logoText?: string;
    }>;
    partners?: Array<{
      id: string;
      name: string;
      category: any;
      focusArea: string;
      location: string;
      sinceYear: number;
      description: string;
      badge: string;
    }>;
    volunteers?: Array<{
      id: string;
      name: string;
      role: any;
      title: string;
      domain: string;
      location: string;
      bio: string;
      initials: string;
    }>;
  };
}

export interface GetSettingsResponse {
  success: boolean;
  data: SiteSettingsData;
}

let cachedSettings: SiteSettingsData | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache

export async function fetchSiteSettings(forceRefresh = false): Promise<SiteSettingsData> {
  const now = Date.now();
  if (!forceRefresh && cachedSettings && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedSettings;
  }

  try {
    const res = await apiRequest<GetSettingsResponse>("/settings");
    if (res && res.success && res.data) {
      cachedSettings = res.data;
      lastFetchTime = now;
      return cachedSettings;
    }
  } catch (err) {
    console.warn("Failed to fetch dynamic site settings from backend, using defaults:", err);
  }

  return cachedSettings || {};
}

