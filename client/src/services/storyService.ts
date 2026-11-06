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
        if (res && res.success && Array.isArray(res.data) && res.data.length > 0) {
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
        console.warn("Backend /api/stories offline, using fallback:", err);
      }

      // Local fallback from SUCCESS_STORIES_DATA
      let filtered = SUCCESS_STORIES_DATA.stories;
      if (category && category !== "All Stories" && category !== "All") {
        filtered = filtered.filter((s) => s.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (s) =>
            s.title.toLowerCase().includes(q) ||
            s.personName.toLowerCase().includes(q) ||
            s.excerpt.toLowerCase().includes(q)
        );
      }

      const total = filtered.length;
      const skip = (page - 1) * limit;
      const paginated = filtered.slice(skip, skip + limit);

      return {
        success: true,
        data: paginated,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit) || 1,
        },
      };
    },
    { ttlMs: 3 * 60 * 1000, forceRefresh, tag: "stories" }
  );
}

