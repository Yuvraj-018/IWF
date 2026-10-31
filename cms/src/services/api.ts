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
  // ── Authentication ──
  async login(email: string, password: string) {
    const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE_URL}/auth/admin/me`, {
      headers: getHeaders(),
    });
    return res.json();
  },

  // ── Dashboard Overview Metrics ──
  async getDashboardStats() {
    try {
      const [members, donations, applications, patients, news] = await Promise.all([
        fetch(`${API_BASE_URL}/members`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ total: 0 })),
        fetch(`${API_BASE_URL}/donations`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
        fetch(`${API_BASE_URL}/applications`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
        fetch(`${API_BASE_URL}/patients`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
        fetch(`${API_BASE_URL}/news`, { headers: getHeaders() }).then((r) => r.json()).catch(() => ({ count: 0 })),
      ]);

      return {
        totalMembers: members.total || members.count || 0,
        totalDonations: donations.count || 0,
        totalApplications: applications.count || 0,
        totalPatients: patients.count || 0,
        totalNews: news.count || 0,
      };
    } catch {
      return {
        totalMembers: 0,
        totalDonations: 0,
        totalApplications: 0,
        totalPatients: 0,
        totalNews: 0,
      };
    }
  },

  // ── Media CMS ──
  async listMedia(category?: string) {
    const url = `${API_BASE_URL}/media${category ? `?category=${category}` : ""}`;
    const res = await fetch(url, { headers: getHeaders() });
    return res.json();
  },

  async uploadMedia(formData: FormData) {
    const res = await fetch(`${API_BASE_URL}/media`, {
      method: "POST",
      headers: getHeaders(true),
      body: formData,
    });
    return res.json();
  },

  async deleteMedia(key: string) {
    const res = await fetch(`${API_BASE_URL}/media/${key}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },

  // ── News & Events CMS ──
  async listNews(params?: { category?: string; search?: string }) {
    const q = new URLSearchParams();
    if (params?.category && params.category !== "All") q.set("category", params.category);
    if (params?.search) q.set("search", params.search);
    const res = await fetch(`${API_BASE_URL}/news?${q.toString()}`, { headers: getHeaders() });
    return res.json();
  },

  async createNews(data: any) {
    const res = await fetch(`${API_BASE_URL}/news`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateNews(id: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteNews(id: string) {
    const res = await fetch(`${API_BASE_URL}/news/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    return res.json();
  },

  // ── Patients CMS ──
  async listPatients() {
    const res = await fetch(`${API_BASE_URL}/patients`, { headers: getHeaders() });
    return res.json();
  },

  async createPatient(data: any) {
    const res = await fetch(`${API_BASE_URL}/patients`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updatePatient(slug: string, data: any) {
    const res = await fetch(`${API_BASE_URL}/patients/${slug}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // ── Members Directory ──
  async listMembers(params?: { category?: string; status?: string; search?: string }) {
    const q = new URLSearchParams();
    if (params?.category) q.set("category", params.category);
    if (params?.status) q.set("status", params.status);
    if (params?.search) q.set("search", params.search);
    const res = await fetch(`${API_BASE_URL}/members?${q.toString()}`, { headers: getHeaders() });
    return res.json();
  },

  // ── Inbound Applications ──
  async listApplications(type?: string) {
    const q = type ? `?type=${type}` : "";
    const res = await fetch(`${API_BASE_URL}/applications${q}`, { headers: getHeaders() });
    return res.json();
  },

  async updateApplicationStatus(id: string, status: string) {
    const res = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    return res.json();
  },
};

