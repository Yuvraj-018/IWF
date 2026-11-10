import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLayout from "./components/layout/AdminLayout";
import LoginPage from "./pages/LoginPage";
import DashboardOverview from "./pages/DashboardOverview";
import NewsManager from "./pages/NewsManager";
import MediaManager from "./pages/MediaManager";
import PatientsManager from "./pages/PatientsManager";
import MembersManager from "./pages/MembersManager";
import ApplicationsManager from "./pages/ApplicationsManager";
import SiteSettingsManager from "./pages/SiteSettingsManager";
import LeadershipManager from "./pages/LeadershipManager";
import CareersManager from "./pages/CareersManager";
import PublicationsManager from "./pages/PublicationsManager";
import StoriesManager from "./pages/StoriesManager";

// Finance Sub-pages
import DonationOverview from "./pages/finance/DonationOverview";
import TransactionsManager from "./pages/finance/TransactionsManager";
import ReconciliationManager from "./pages/finance/ReconciliationManager";
import RefundsManager from "./pages/finance/RefundsManager";
import ReceiptsManager from "./pages/finance/ReceiptsManager";
import ExpensesManager from "./pages/finance/ExpensesManager";
import BudgetsManager from "./pages/finance/BudgetsManager";
import FinancialReportsManager from "./pages/finance/FinancialReportsManager";

// Other Modules
import {
  MembershipModule,
  VolunteersModule,
  PartnersModule,
  ProgrammesModule,
  CommunityModule,
  GovernanceModule,
  CommunicationsModule,
  SystemHealthModule,
} from "./pages/modules/GeneralModules";

import { Toaster } from "sonner";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071527] flex flex-col items-center justify-center text-slate-400 gap-3 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
        <p className="text-xs font-mono text-slate-300">Verifying session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors theme="dark" closeButton />
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Root & Dashboard */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardOverview />
              </ProtectedRoute>
            }
          />

          {/* ── DONATIONS & FINANCE ROUTES ── */}
          <Route
            path="/finance"
            element={
              <ProtectedRoute>
                <DonationOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/transactions"
            element={
              <ProtectedRoute>
                <TransactionsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/reconciliation"
            element={
              <ProtectedRoute>
                <ReconciliationManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/refunds"
            element={
              <ProtectedRoute>
                <RefundsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/receipts"
            element={
              <ProtectedRoute>
                <ReceiptsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/expenses"
            element={
              <ProtectedRoute>
                <ExpensesManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/budgets"
            element={
              <ProtectedRoute>
                <BudgetsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/finance/reports"
            element={
              <ProtectedRoute>
                <FinancialReportsManager />
              </ProtectedRoute>
            }
          />

          {/* ── WEBSITE & CMS ROUTES (Dual mounted at /cms/* and root) ── */}
          <Route
            path="/cms/news"
            element={
              <ProtectedRoute>
                <NewsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <NewsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/media"
            element={
              <ProtectedRoute>
                <MediaManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/media"
            element={
              <ProtectedRoute>
                <MediaManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/patients"
            element={
              <ProtectedRoute>
                <PatientsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <PatientsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/members"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/members"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/careers"
            element={
              <ProtectedRoute>
                <CareersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/careers"
            element={
              <ProtectedRoute>
                <CareersManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/publications"
            element={
              <ProtectedRoute>
                <PublicationsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/publications"
            element={
              <ProtectedRoute>
                <PublicationsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/stories"
            element={
              <ProtectedRoute>
                <StoriesManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stories"
            element={
              <ProtectedRoute>
                <StoriesManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/leadership"
            element={
              <ProtectedRoute>
                <LeadershipManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leadership"
            element={
              <ProtectedRoute>
                <LeadershipManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/applications"
            element={
              <ProtectedRoute>
                <ApplicationsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute>
                <ApplicationsManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cms/settings"
            element={
              <ProtectedRoute>
                <SiteSettingsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SiteSettingsManager />
              </ProtectedRoute>
            }
          />

          {/* ── OTHER PLATFORM MODULES ── */}
          <Route
            path="/membership"
            element={
              <ProtectedRoute>
                <MembershipModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteers"
            element={
              <ProtectedRoute>
                <VolunteersModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners"
            element={
              <ProtectedRoute>
                <PartnersModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes"
            element={
              <ProtectedRoute>
                <ProgrammesModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/governance"
            element={
              <ProtectedRoute>
                <GovernanceModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communications"
            element={
              <ProtectedRoute>
                <CommunicationsModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
