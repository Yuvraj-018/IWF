import { apiCache, CacheOptions } from "./cache";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getHeaders(isFormData = false): HeadersInit {
  const token = localStorage.getItem("islah_admin_token");
  const headers: Record<string, string> = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export const api = {
  // ── Cache Controls ──
  invalidateCache(tag?: string) {
    if (tag) {
      apiCache.invalidateTag(tag);
    } else {
      apiCache.clear();
    }
  },

  // ── Authentication ──
  async login(email: string, password: string, turnstileToken?: string) {
    const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, turnstileToken }),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/admin/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // ── Live Backend System Health ──
  async getHealth(): Promise<{
    status: string;
    service: string;
    database: string;
    uptimeSeconds: number;
    timestamp: string;
  }> {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.json();
  },

  // ── Dashboard Overview Metrics (Cached: 60s) ──
  async getDashboardStats(options?: CacheOptions): Promise<{
    totalMembers: number;
    totalDonations: number;
    totalApplications: number;
    totalPatients: number;
    totalNews: number;
    totalMedia: number;
    totalCareers: number;
    totalPublications: number;
    totalStories: number;
    totalContacts: number;
    upcomingEvents: any[];
    recentNews: any[];
    settings: any;
    pendingMembership: number;
    pendingVolunteers: number;
    pendingPartners: number;
  }> {
    const cacheKey = "dashboard_stats";
    if (!options?.force) {
      const cached = apiCache.get<any>(cacheKey);
      if (cached) return cached;
    }

    try {
      const [members, donations, applications, patients, news, media, careers, publications, stories, contact, settings] = await Promise.all([
        fetch(`${API_BASE_URL}/members`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ total: 0 })),
        fetch(`${API_BASE_URL}/donations`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
        fetch(`${API_BASE_URL}/applications`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
        fetch(`${API_BASE_URL}/patients`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
        fetch(`${API_BASE_URL}/news`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
        fetch(`${API_BASE_URL}/media`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ total: 0 })),
        fetch(`${API_BASE_URL}/careers`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ total: 0 })),
        fetch(`${API_BASE_URL}/publications`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ total: 0 })),
        fetch(`${API_BASE_URL}/stories`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ total: 0 })),
        fetch(`${API_BASE_URL}/contact`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ total: 0 })),
        fetch(`${API_BASE_URL}/settings`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ data: {} })),
      ]);

      const appData = Array.isArray(applications.data) ? applications.data : [];

      const result = {
        totalMembers: members.total || members.count || (Array.isArray(members.data) ? members.data.length : 0),
        totalDonations: donations.pagination?.total || donations.total || donations.count || (Array.isArray(donations.data) ? donations.data.length : 0),
        totalApplications: applications.total || applications.count || appData.length,
        totalPatients: patients.total || patients.count || (Array.isArray(patients.data) ? patients.data.length : 0),
        totalNews: news.total || news.count || (Array.isArray(news.data) ? news.data.length : 0),
        totalMedia: media.total || media.count || (Array.isArray(media.data) ? media.data.length : 0),
        totalCareers: careers.total || careers.count || (Array.isArray(careers.data) ? careers.data.length : 0),
        totalPublications: publications.total || publications.count || (Array.isArray(publications.data) ? publications.data.length : 0),
        totalStories: stories.total || stories.count || (Array.isArray(stories.data) ? stories.data.length : 0),
        totalContacts: contact.total || contact.count || (Array.isArray(contact.data) ? contact.data.length : 0),
        upcomingEvents: Array.isArray(news.upcomingEvents) ? news.upcomingEvents : [],
        recentNews: Array.isArray(news.data) ? news.data.slice(0, 5) : [],
        settings: settings.data || {},
        pendingMembership: appData.filter((a: any) => a.type === "membership" && a.status !== "approved").length,
        pendingVolunteers: appData.filter((a: any) => a.type === "volunteer" && a.status !== "approved").length,
        pendingPartners: appData.filter((a: any) => (a.type === "partner" || a.type === "sponsor") && a.status !== "approved").length,
      };

      apiCache.set(cacheKey, result, 60 * 1000, "dashboard");
      return result;
    } catch {
      return {
        totalMembers: 0,
        totalDonations: 0,
        totalApplications: 0,
        totalPatients: 0,
        totalNews: 0,
        totalMedia: 0,
        totalCareers: 0,
        totalPublications: 0,
        totalStories: 0,
        totalContacts: 0,
        upcomingEvents: [],
        recentNews: [],
        settings: {},
        pendingMembership: 0,
        pendingVolunteers: 0,
        pendingPartners: 0,
      };
    }
  },

  // ── Media CMS (Cached: 5 mins) ──
  async listMedia(category?: string, options?: CacheOptions) {
    const cacheKey = `media_list_${category || "all"}`;
    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const url = `${API_BASE_URL}/media${category ? `?category=${category}` : ""}`;
    const res = await fetch(url, { headers: getHeaders() });
    const data = await res.json();

    if (res.ok) {
      apiCache.set(cacheKey, data, 5 * 60 * 1000, "media");
    }
    return data;
  },

  async listAlbums(options?: CacheOptions) {
    const cacheKey = "media_albums_list";
    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }
    const res = await fetch(`${API_BASE_URL}/media/albums`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) {
      apiCache.set(cacheKey, data, 5 * 60 * 1000, "media");
    }
    return data;
  },

  async uploadMedia(formData: FormData) {
    const res = await fetch(`${API_BASE_URL}/media`, {
      method: "POST",
      headers: getHeaders(true),
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("media");
    }
    return data;
  },

  async uploadSingleFile(file: File): Promise<{ success: boolean; file?: { url: string }; message?: string }> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch(`${API_BASE_URL}/upload/single`, {
      method: "POST",
      headers: getHeaders(true),
      body: fd,
    });
    return res.json();
  },

  async deleteMedia(key: string) {
    const res = await fetch(`${API_BASE_URL}/media/${key}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("media");
    }
    return data;
  },

  async deleteAlbum(albumId: string) {
    const res = await fetch(`${API_BASE_URL}/media/albums/${albumId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("media");
    }
    return data;
  },

  // ── News & Events CMS (Cached: 5 mins) ──
  async listNews(params?: { category?: string; search?: string }, options?: CacheOptions) {
    const q = new URLSearchParams();
    if (params?.category && params.category !== "All") q.set("category", params.category);
    if (params?.search) q.set("search", params.search);

    const cacheKey = `news_list_${q.toString()}`;
    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/news?${q.toString()}`, { headers: getHeaders() });
    const data = await res.json();

    if (res.ok) {
      apiCache.set(cacheKey, data, 5 * 60 * 1000, "news");
    }
    return data;
  },

  async createNews(payload: any) {
    const res = await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("news");
      apiCache.invalidateTag("dashboard");
    }
    return data;
  },

  async updateNews(id: string, payload: any) {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("news");
      apiCache.invalidateTag("dashboard");
    }
    return data;
  },

  async deleteNews(id: string) {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("news");
      apiCache.invalidateTag("dashboard");
    }
    return data;
  },

  // ── Patients CMS (Cached: 5 mins) ──
  async listPatients(options?: CacheOptions) {
    const cacheKey = "patients_list";
    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/patients`, { headers: getHeaders() });
    const data = await res.json();

    if (res.ok) {
      apiCache.set(cacheKey, data, 5 * 60 * 1000, "patients");
    }
    return data;
  },

  async createPatient(payload: any) {
    const res = await fetch(`${API_BASE_URL}/patients`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("patients");
      apiCache.invalidateTag("dashboard");
    }
    return data;
  },

  async updatePatient(slug: string, payload: any) {
    const res = await fetch(`${API_BASE_URL}/patients/${slug}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("patients");
      apiCache.invalidateTag("dashboard");
    }
    return data;
  },

  async deletePatient(slug: string) {
    const res = await fetch(`${API_BASE_URL}/patients/${slug}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("patients");
      apiCache.invalidateTag("dashboard");
    }
    return data;
  },

  // ── Members Directory (Cached: 5 mins) ──
  async listMembers(params?: { category?: string; status?: string; search?: string }, options?: CacheOptions) {
    const q = new URLSearchParams();
    if (params?.category) q.set("category", params.category);
    if (params?.status) q.set("status", params.status);
    if (params?.search) q.set("search", params.search);

    const cacheKey = `members_list_${q.toString()}`;
    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/members?${q.toString()}`, { headers: getHeaders() });
    const data = await res.json();

    if (res.ok) {
      apiCache.set(cacheKey, data, 5 * 60 * 1000, "members");
    }
    return data;
  },

  async toggleMemberVisibility(memberId: string) {
    const res = await fetch(`${API_BASE_URL}/members/${encodeURIComponent(memberId)}/visibility`, {
      method: "PUT",
      headers: getHeaders(),
    });
    apiCache.invalidateTag("members");
    apiCache.invalidateTag("settings");
    return res.json();
  },

  // ── Inbound Applications (Cached: 3 mins) ──
  async listApplications(type?: string, options?: CacheOptions) {
    const q = type ? `?type=${type}` : "";
    const cacheKey = `applications_list_${type || "all"}`;

    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/applications${q}`, { headers: getHeaders() });
    const data = await res.json();

    if (res.ok) {
      apiCache.set(cacheKey, data, 3 * 60 * 1000, "applications");
    }
    return data;
  },

  async updateApplicationStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("applications");
      apiCache.invalidateTag("dashboard");
    }
    return data;
  },

  // ── Site Settings, Impact Stats & Helplines (Cached: 5 mins) ──
  async getSettings(options?: CacheOptions) {
    const cacheKey = "site_settings";
    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }
    const res = await fetch(`${API_BASE_URL}/settings`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) {
      apiCache.set(cacheKey, data, 5 * 60 * 1000, "settings");
    }
    return data;
  },

  async updateSetting(key: string, data: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/settings/${key}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ data }),
    });
    const resData = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("settings");
    }
    return resData;
  },

  // ── Careers & Job Openings ──
  async listCareers(params: { page?: number; limit?: number; all?: boolean; status?: string } = {}, options?: CacheOptions) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.all) query.set("all", "true");
    if (params.status) query.set("status", params.status);

    const q = query.toString() ? `?${query.toString()}` : "";
    const cacheKey = `careers_${q}`;

    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/careers${q}`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) {
      apiCache.set(cacheKey, data, 3 * 60 * 1000, "careers");
    }
    return data;
  },

  async createCareer(body: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/careers`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("careers");
    }
    return data;
  },

  async updateCareer(id: string, body: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/careers/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("careers");
    }
    return data;
  },

  async deleteCareer(id: string) {
    const res = await fetch(`${API_BASE_URL}/careers/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("careers");
    }
    return data;
  },

  // ── Publications & Research ──
  async listPublications(params: { page?: number; limit?: number; type?: string; search?: string } = {}, options?: CacheOptions) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.type) query.set("type", params.type);
    if (params.search) query.set("search", params.search);

    const q = query.toString() ? `?${query.toString()}` : "";
    const cacheKey = `publications_${q}`;

    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/publications${q}`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) {
      apiCache.set(cacheKey, data, 3 * 60 * 1000, "publications");
    }
    return data;
  },

  async createPublication(body: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/publications`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("publications");
    }
    return data;
  },

  async updatePublication(id: string, body: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/publications/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("publications");
    }
    return data;
  },

  async deletePublication(id: string) {
    const res = await fetch(`${API_BASE_URL}/publications/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("publications");
    }
    return data;
  },

  // ── Success Stories ──
  async listStories(params: { page?: number; limit?: number; category?: string; search?: string } = {}, options?: CacheOptions) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    if (params.category) query.set("category", params.category);
    if (params.search) query.set("search", params.search);

    const q = query.toString() ? `?${query.toString()}` : "";
    const cacheKey = `stories_${q}`;

    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/stories${q}`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) {
      apiCache.set(cacheKey, data, 3 * 60 * 1000, "stories");
    }
    return data;
  },

  async createStory(body: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/stories`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("stories");
    }
    return data;
  },

  async updateStory(id: string, body: Record<string, any>) {
    const res = await fetch(`${API_BASE_URL}/stories/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("stories");
    }
    return data;
  },

  async deleteStory(id: string) {
    const res = await fetch(`${API_BASE_URL}/stories/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("stories");
    }
    return data;
  },

  // ── Tax Exemption (80G) Claims / Inbound Donations ──
  async listTaxExemptions(params: { page?: number; limit?: number; search?: string; taxExemption?: string } = {}, options?: CacheOptions) {
    const query = new URLSearchParams();
    if (params.taxExemption && params.taxExemption !== "all") {
      query.set("taxExemption", params.taxExemption);
    }
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit || 50));
    if (params.search) query.set("search", params.search);

    const q = `?${query.toString()}`;
    const cacheKey = `tax_exemptions_${q}`;

    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/donations${q}`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) {
      apiCache.set(cacheKey, data, 2 * 60 * 1000, "tax_exemptions");
    }
    return data;
  },

  // ── Inbound Contact Inquiries ──
  async listContacts(params: { page?: number; limit?: number; status?: string; search?: string } = {}, options?: CacheOptions) {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit || 20));
    if (params.status) query.set("status", params.status);
    if (params.search) query.set("search", params.search);

    const q = query.toString() ? `?${query.toString()}` : "";
    const cacheKey = `contacts_${q}`;

    if (!options?.force) {
      const cached = apiCache.get(cacheKey);
      if (cached) return cached;
    }

    const res = await fetch(`${API_BASE_URL}/contact${q}`, { headers: getHeaders() });
    const data = await res.json();
    if (res.ok) {
      apiCache.set(cacheKey, data, 2 * 60 * 1000, "contacts");
    }
    return data;
  },

  async updateContactStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE_URL}/contact/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (res.ok) {
      apiCache.invalidateTag("contacts");
    }
    return data;
  },
};
