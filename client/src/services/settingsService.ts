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

