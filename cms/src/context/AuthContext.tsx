import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "../services/api";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "superadmin" | "editor";
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("islah_admin_token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const storedToken = localStorage.getItem("islah_admin_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (res.success && res.admin) {
          setUser(res.admin);
          setToken(storedToken);
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.login(email, password);
      if (res.success && res.token) {
        localStorage.setItem("islah_admin_token", res.token);
        setToken(res.token);
        setUser(res.admin);
        return { success: true };
      }
      return { success: false, message: res.message || "Invalid credentials" };
    } catch (err: any) {
      return { success: false, message: err.message || "Network error. Please try again." };
    }
  };

  const logout = () => {
    localStorage.removeItem("islah_admin_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

