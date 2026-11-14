import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { api } from "../services/api";
import { authEvents } from "../services/authEvents";
import { toast } from "sonner";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role?: string;
  roles: string[];
  permissions: string[];
  scope: {
    workAreas: string[];
    offices: string[];
  };
  twoFactorEnabled: boolean;
  mustEnroll2FA?: boolean;
  mustChangePassword?: boolean;
  lastLogin?: string;
  lastReauthAt?: string;
  tokenVersion?: number;
  rbacEnforcementMode?: "off" | "report" | "enforce";
}

export interface LoginResult {
  success: boolean;
  message?: string;
  requires2FA?: boolean;
  twoFactorToken?: string;
  mustEnroll2FA?: boolean;
  mustChangePassword?: boolean;
  lockoutUntil?: string;
  attemptsRemaining?: number;
}

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  can: (permission: string) => boolean;
  hasAny: (permissions: string[]) => boolean;
  hasAll: (permissions: string[]) => boolean;
  inScope: (workArea?: string, office?: string) => boolean;
  login: (email: string, password: string, turnstileToken?: string) => Promise<LoginResult>;
  validate2FALogin: (twoFactorToken: string, code: string, isRecoveryCode?: boolean) => Promise<LoginResult>;
  acceptInvite: (token: string, newPassword: string) => Promise<LoginResult>;
  changePassword: (newPassword: string, currentPassword?: string) => Promise<{ success: boolean; message?: string }>;
  reauthenticate: (password?: string, totpCode?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  refreshProfile: () => Promise<AdminUser | null>;
  setSession: (token: string, user: AdminUser) => void;
  isReauthModalOpen: boolean;
  openReauthModal: (onSuccess?: () => void, onCancel?: () => void) => void;
  closeReauthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("islah_admin_token"));
  const [loading, setLoading] = useState(true);
  const [isReauthModalOpen, setIsReauthModalOpen] = useState(false);
  const [reauthCallbacks, setReauthCallbacks] = useState<{
    onSuccess?: () => void;
    onCancel?: () => void;
  }>({});

  const logout = useCallback(() => {
    localStorage.removeItem("islah_admin_token");
    setToken(null);
    setUser(null);
    api.invalidateCache();
  }, []);

  const refreshProfile = useCallback(async (): Promise<AdminUser | null> => {
    const currentToken = localStorage.getItem("islah_admin_token");
    if (!currentToken) {
      setUser(null);
      return null;
    }

    try {
      const res = await api.getMe();
      if (res.success && res.admin) {
        const adminData: AdminUser = {
          id: res.admin.id || res.admin._id,
          email: res.admin.email,
          name: res.admin.name,
          role: res.admin.role,
          roles: Array.isArray(res.admin.roles) ? res.admin.roles : [res.admin.role || "super_admin"],
          permissions: Array.isArray(res.admin.permissions) ? res.admin.permissions : [],
          scope: res.admin.scope || { workAreas: [], offices: [] },
          twoFactorEnabled: !!res.admin.twoFactorEnabled,
          mustEnroll2FA: !!res.admin.mustEnroll2FA,
          mustChangePassword: !!res.admin.mustChangePassword,
          lastLogin: res.admin.lastLogin,
          lastReauthAt: res.admin.lastReauthAt,
          tokenVersion: res.admin.tokenVersion,
          rbacEnforcementMode: res.admin.rbacEnforcementMode || "report",
        };
        setUser(adminData);
        return adminData;
      } else {
        logout();
        return null;
      }
    } catch {
      logout();
      return null;
    }
  }, [logout]);

  // Initial session check
  useEffect(() => {
    async function initAuth() {
      const storedToken = localStorage.getItem("islah_admin_token");
      if (!storedToken) {
        setLoading(false);
        return;
      }
      try {
        await refreshProfile();
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, [refreshProfile]);

  // Listen for centralized auth events (token revoked, reauth required)
  useEffect(() => {
    const unsubRevoked = authEvents.onTokenRevoked(() => {
      logout();
      toast.error("Your session ended because your account changed. Please sign in again.");
    });

    const unsubReauth = authEvents.onReauthRequired(() => {
      setIsReauthModalOpen(true);
    });

    return () => {
      unsubRevoked();
      unsubReauth();
    };
  }, [logout]);

  const setSession = (newToken: string, newUser: AdminUser) => {
    localStorage.setItem("islah_admin_token", newToken);
    setToken(newToken);
    setUser(newUser);
    api.invalidateCache();
  };

  // Permission evaluation helpers
  const can = useCallback(
    (permissionKey: string): boolean => {
      if (!user || !user.permissions) return false;
      if (user.permissions.includes("*")) return true;
      return user.permissions.includes(permissionKey);
    },
    [user]
  );

  const hasAny = useCallback(
    (permissions: string[]): boolean => {
      if (!user || !user.permissions) return false;
      if (user.permissions.includes("*")) return true;
      return permissions.some((p) => user.permissions.includes(p));
    },
    [user]
  );

  const hasAll = useCallback(
    (permissions: string[]): boolean => {
      if (!user || !user.permissions) return false;
      if (user.permissions.includes("*")) return true;
      return permissions.every((p) => user.permissions.includes(p));
    },
    [user]
  );

  const inScope = useCallback(
    (workArea?: string, office?: string): boolean => {
      if (!user) return false;
      // Super admin bypasses row-level scope
      if (user.roles?.includes("super_admin") || user.permissions?.includes("*")) return true;

      const userAreas = user.scope?.workAreas || [];
      const userOffices = user.scope?.offices || [];

      if (workArea && userAreas.length > 0 && !userAreas.includes(workArea)) {
        return false;
      }

      if (office && userOffices.length > 0 && !userOffices.includes(office)) {
        return false;
      }

      return true;
    },
    [user]
  );

  // Authentication Actions
  const login = async (
    email: string,
    password: string,
    turnstileToken?: string
  ): Promise<LoginResult> => {
    try {
      const res = await api.login(email, password, turnstileToken);
      if (res.success) {
        if (res.requires2FA) {
          return {
            success: true,
            requires2FA: true,
            twoFactorToken: res.twoFactorToken,
            message: res.message,
          };
        }

        if (res.token && res.admin) {
          const adminData: AdminUser = {
            id: res.admin.id || res.admin._id,
            email: res.admin.email,
            name: res.admin.name,
            role: res.admin.role,
            roles: Array.isArray(res.admin.roles) ? res.admin.roles : [res.admin.role || "super_admin"],
            permissions: Array.isArray(res.admin.permissions) ? res.admin.permissions : [],
            scope: res.admin.scope || { workAreas: [], offices: [] },
            twoFactorEnabled: !!res.admin.twoFactorEnabled,
            mustEnroll2FA: !!res.mustEnroll2FA,
            mustChangePassword: !!res.mustChangePassword,
            rbacEnforcementMode: res.admin.rbacEnforcementMode || "report",
          };
          setSession(res.token, adminData);
          return {
            success: true,
            mustEnroll2FA: !!res.mustEnroll2FA,
            mustChangePassword: !!res.mustChangePassword,
            message: res.message,
          };
        }
      }

      return {
        success: false,
        message: res.message || "Invalid credentials",
        attemptsRemaining: res.attemptsRemaining,
        lockoutUntil: res.lockoutUntil,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Network error. Please try again.",
      };
    }
  };

  const validate2FALogin = async (
    twoFactorToken: string,
    code: string,
    isRecoveryCode = false
  ): Promise<LoginResult> => {
    try {
      const res = await api.validate2FALogin(twoFactorToken, code, isRecoveryCode);
      if (res.success && res.token && res.admin) {
        const adminData: AdminUser = {
          id: res.admin.id || res.admin._id,
          email: res.admin.email,
          name: res.admin.name,
          role: res.admin.role,
          roles: Array.isArray(res.admin.roles) ? res.admin.roles : [res.admin.role || "super_admin"],
          permissions: Array.isArray(res.admin.permissions) ? res.admin.permissions : [],
          scope: res.admin.scope || { workAreas: [], offices: [] },
          twoFactorEnabled: true,
          mustEnroll2FA: false,
          mustChangePassword: !!res.admin.mustChangePassword,
          rbacEnforcementMode: res.admin.rbacEnforcementMode || "report",
        };
        setSession(res.token, adminData);
        return {
          success: true,
          mustChangePassword: !!res.admin.mustChangePassword,
          message: res.message,
        };
      }
      return { success: false, message: res.message || "Invalid 2FA code" };
    } catch (err: any) {
      return { success: false, message: err.message || "2FA validation failed" };
    }
  };

  const acceptInvite = async (
    token: string,
    newPassword: string
  ): Promise<LoginResult> => {
    try {
      const res = await api.acceptInvite(token, newPassword);
      if (res.success && res.token && res.admin) {
        const adminData: AdminUser = {
          id: res.admin.id || res.admin._id,
          email: res.admin.email,
          name: res.admin.name,
          role: res.admin.role,
          roles: Array.isArray(res.admin.roles) ? res.admin.roles : [res.admin.role || "super_admin"],
          permissions: Array.isArray(res.admin.permissions) ? res.admin.permissions : [],
          scope: res.admin.scope || { workAreas: [], offices: [] },
          twoFactorEnabled: !!res.admin.twoFactorEnabled,
          mustChangePassword: false,
        };
        setSession(res.token, adminData);
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || "Failed to accept invitation" };
    } catch (err: any) {
      return { success: false, message: err.message || "Invitation acceptance failed" };
    }
  };

  const changePassword = async (newPassword: string, currentPassword?: string) => {
    try {
      const res = await api.changePassword(newPassword, currentPassword);
      if (res.success) {
        if (res.token) {
          localStorage.setItem("islah_admin_token", res.token);
          setToken(res.token);
        }
        await refreshProfile();
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || "Failed to change password" };
    } catch (err: any) {
      return { success: false, message: err.message || "Password change failed" };
    }
  };

  const reauthenticate = async (password?: string, totpCode?: string) => {
    try {
      const res = await api.reauthenticate(password, totpCode);
      if (res.success) {
        authEvents.resolveReauth(true);
        setIsReauthModalOpen(false);
        if (reauthCallbacks.onSuccess) reauthCallbacks.onSuccess();
        setReauthCallbacks({});
        await refreshProfile();
        return { success: true, message: res.message };
      }
      return { success: false, message: res.message || "Re-authentication failed" };
    } catch (err: any) {
      return { success: false, message: err.message || "Re-authentication failed" };
    }
  };

  const openReauthModal = (onSuccess?: () => void, onCancel?: () => void) => {
    setReauthCallbacks({ onSuccess, onCancel });
    setIsReauthModalOpen(true);
  };

  const closeReauthModal = () => {
    authEvents.resolveReauth(false);
    setIsReauthModalOpen(false);
    if (reauthCallbacks.onCancel) reauthCallbacks.onCancel();
    setReauthCallbacks({});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        loading,
        can,
        hasAny,
        hasAll,
        inScope,
        login,
        validate2FALogin,
        acceptInvite,
        changePassword,
        reauthenticate,
        logout,
        refreshProfile,
        setSession,
        isReauthModalOpen,
        openReauthModal,
        closeReauthModal,
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
