import { apiRequest } from "./apiClient";
import { clientCache } from "./cacheService";
import { SUCCESS_STORIES_DATA, type SuccessStoryItem } from "@/content/mediaContent";

export interface ListStoriesParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  forceRefresh?: boolean;
}

export interface ListStoriesResponse {
  success: boolean;
  data: SuccessStoryItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export async function fetchSuccessStories(
  params: ListStoriesParams = {}
): Promise<ListStoriesResponse> {
  const { page = 1, limit = 9, category, search, forceRefresh = false } = params;

  const query = new URLSearchParams();
  query.set("page", String(page));
  query.set("limit", String(limit));
  if (category && category !== "All Stories" && category !== "All") query.set("category", category);
  if (search) query.set("search", search);

  const cacheKey = `stories_${query.toString()}`;

  return clientCache.wrap<ListStoriesResponse>(
    cacheKey,
    async () => {
      try {
        const res = await apiRequest<ListStoriesResponse>(`/stories?${query.toString()}`);
        if (res && res.success && Array.isArray(res.data)) {
          const mapped = res.data.map((item: any) => ({
            ...item,
            id: String(item._id || item.id),
          }));
          return {
            ...res,
            data: mapped,
          };
        }
      } catch (err) {
        console.warn("Backend /api/stories error:", err);
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
    { ttlMs: 3 * 60 * 1000, forceRefresh, tag: "stories" }
  );
}

