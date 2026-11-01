import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLayout, { type NavTab } from "./components/layout/AdminLayout";
import LoginPage from "./pages/LoginPage";
import DashboardOverview from "./pages/DashboardOverview";
import NewsManager from "./pages/NewsManager";
import MediaManager from "./pages/MediaManager";
import PatientsManager from "./pages/PatientsManager";
import MembersManager from "./pages/MembersManager";
import ApplicationsManager from "./pages/ApplicationsManager";
import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";

function ControlCenter() {
  const { isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<NavTab>("overview");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center text-slate-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p className="text-xs font-mono">Verifying control session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === "overview" && <DashboardOverview onNavigate={setActiveTab} />}
      {activeTab === "news" && <NewsManager />}
      {activeTab === "media" && <MediaManager />}
      {activeTab === "patients" && <PatientsManager />}
      {activeTab === "members" && <MembersManager />}
      {activeTab === "applications" && <ApplicationsManager />}
    </AdminLayout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors theme="dark" closeButton />
      <ControlCenter />
    </AuthProvider>
  );
}

