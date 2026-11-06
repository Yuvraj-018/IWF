import { apiRequest } from "./apiClient";
import { clientCache } from "./cacheService";
import { PUBLICATIONS_DATA } from "@/content/mediaContent";

export interface PublicationItem {
  id: string;
  _id?: string;
  type: string;
  title: string;
  authors: string;
  date: string;
  summary: string;
  cover?: string;
  coverUrl?: string;
  fileSize?: string;
  pages?: string;
  pdfUrl?: string;
  downloadUrl?: string;
  featured?: boolean;
}

export interface ListPublicationsParams {
  page?: number;
  limit?: number;
  type?: string;
  search?: string;
  forceRefresh?: boolean;
}

export interface ListPublicationsResponse {
  success: boolean;
  data: PublicationItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export async function fetchPublications(
  params: ListPublicationsParams = {}
): Promise<ListPublicationsResponse> {
  const { page = 1, limit = 9, type, search, forceRefresh = false } = params;

  const query = new URLSearchParams();
  query.set("page", String(page));
  query.set("limit", String(limit));
  if (type && type !== "All Publications" && type !== "All") query.set("type", type);
  if (search) query.set("search", search);

  const cacheKey = `publications_${query.toString()}`;

  return clientCache.wrap<ListPublicationsResponse>(
    cacheKey,
    async () => {
      try {
        const res = await apiRequest<ListPublicationsResponse>(`/publications?${query.toString()}`);
        if (res && res.success && Array.isArray(res.data)) {
          const mapped = res.data.map((item: any) => ({
            ...item,
            id: String(item._id || item.id),
            cover: item.coverUrl || item.cover,
            pdfUrl: item.downloadUrl || item.pdfUrl,
          }));
          return {
            ...res,
            data: mapped,
          };
        }
      } catch (err) {
        console.warn("Backend /api/publications error:", err);
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
    { ttlMs: 3 * 60 * 1000, forceRefresh, tag: "publications" }
  );
}

