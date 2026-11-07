import { apiRequest } from "./apiClient";
import { clientCache } from "./cacheService";
import {
  CAREER_OPENINGS,
  activeOpenings,
  type CareerOpening,
} from "@/content/careerOpenings";

export interface ListCareersParams {
  page?: number;
  limit?: number; // 6 per lot
  location?: string;
  department?: string;
  experienceBand?: string;
  search?: string;
  forceRefresh?: boolean;
}

export interface ListCareersResponse {
  success: boolean;
  data: CareerOpening[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export async function fetchCareerOpenings(
  params: ListCareersParams = {}
): Promise<ListCareersResponse> {
  const {
    page = 1,
    limit = 6,
    location,
    department,
    experienceBand,
    search,
    forceRefresh = false,
  } = params;

  const query = new URLSearchParams();
  query.set("page", String(page));
  query.set("limit", String(limit));
  if (location && location !== "All") query.set("location", location);
  if (department && department !== "All") query.set("department", department);
  if (experienceBand && experienceBand !== "All") query.set("experienceBand", experienceBand);
  if (search) query.set("search", search);

  const cacheKey = `careers_${query.toString()}`;

  return clientCache.wrap<ListCareersResponse>(
    cacheKey,
    async () => {
      try {
        const res = await apiRequest<ListCareersResponse>(`/careers?${query.toString()}`);
        if (res && res.success && Array.isArray(res.data)) {
          // Normalize openingId to id for frontend compatibility
          const mapped = res.data.map((item: any) => ({
            ...item,
            id: item.openingId || item.id || item._id,
          }));
          return {
            ...res,
            data: mapped,
          };
        }
      } catch (err) {
        console.warn("Backend /api/careers error:", err);
      }

      return {
        success: true,
        data: [],
        pagination: {
          total: 0,
          page: 1,
          limit,
          pages: 1,
        },
      };
    },
    { ttlMs: 1000, forceRefresh, tag: "careers" }
  );
}

