import { API_BASE_URL } from "./apiClient";

export interface NewsEventItem {
  _id?: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  day?: string;
  month?: string;
  excerpt: string;
  fullStory?: string;
  image: string;
  pdfUrl?: string;
  featured?: boolean;
  location?: string;
  isUpcoming?: boolean;
  impactMetrics?: string[];
  readTime?: string;
  author?: string;
}

export interface UpcomingEventItem {
  _id?: string;
  slug: string;
  title: string;
  month: string;
  day: string;
  location?: string;
  excerpt?: string;
}

export interface NewsEventsResponse {
  success: boolean;
  count: number;
  total: number;
  data: NewsEventItem[];
  categories: string[];
  categoryCounts: { name: string; count: number }[];
  upcomingEvents: UpcomingEventItem[];
}

export const FALLBACK_UPCOMING_EVENTS: UpcomingEventItem[] = [];

export const FALLBACK_NEWS_EVENTS: NewsEventItem[] = [];

export async function fetchNewsEvents(params?: {
  category?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): Promise<NewsEventsResponse> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== "All") {
    query.set("category", params.category);
  }
  if (params?.search && params.search.trim()) {
    query.set("search", params.search.trim());
  }
  if (params?.featured !== undefined) {
    query.set("featured", String(params.featured));
  }
  if (params?.page) {
    query.set("page", String(params.page));
  }
  if (params?.limit) {
    query.set("limit", String(params.limit));
  }

  const url = `${API_BASE_URL}/news${query.toString() ? `?${query.toString()}` : ""}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch news events (status: ${res.status})`);
    }
    const json: NewsEventsResponse = await res.json();
    if (json.success && Array.isArray(json.data)) {
      return json;
    }
    throw new Error("Unexpected /news response");
  } catch (err) {
    console.warn("Backend /api/news offline or unreached:", err);
    return {
      success: true,
      count: 0,
      total: 0,
      data: [],
      categories: ["All"],
      categoryCounts: [{ name: "All", count: 0 }],
      upcomingEvents: [],
    };
  }
}

export async function fetchNewsEventBySlug(slug: string): Promise<NewsEventItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/news/${slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch news item ${slug} (status: ${res.status})`);
    }
    const json = await res.json();
    return json.data;
  } catch (err) {
    return null;
  }
}
