import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminLayout from "./components/layout/AdminLayout";
import { RequirePermission } from "./components/common/RequirePermission";

import LoginPage from "./pages/LoginPage";
import ForcedPasswordChangePage from "./pages/ForcedPasswordChangePage";
import TwoFactorEnrollmentWizard from "./pages/TwoFactorEnrollmentWizard";
import AcceptInvitePage from "./pages/AcceptInvitePage";
import MyAccountPage from "./pages/MyAccountPage";

// Staff Governance Modules
import UserAccountsManager from "./pages/staff/UserAccountsManager";
import RolesPermissionsManager from "./pages/staff/RolesPermissionsManager";
import StaffDirectoryManager from "./pages/staff/StaffDirectoryManager";
import ActivityLogsViewer from "./pages/staff/ActivityLogsViewer";

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

// Dedicated Control Center Dashboards
import CMSDashboard from "./pages/cms/CMSDashboard";
import CommunityDashboard from "./pages/community/CommunityDashboard";
import ProgrammesDashboard from "./pages/programmes/ProgrammesDashboard";

// Finance Sub-pages
import DonationOverview from "./pages/finance/DonationOverview";
import TransactionsManager from "./pages/finance/TransactionsManager";
import ReconciliationManager from "./pages/finance/ReconciliationManager";
import RefundsManager from "./pages/finance/RefundsManager";
import ReceiptsManager from "./pages/finance/ReceiptsManager";
import ExpensesManager from "./pages/finance/ExpensesManager";
import BudgetsManager from "./pages/finance/BudgetsManager";
import FinancialReportsManager from "./pages/finance/FinancialReportsManager";

// Other Platform Modules
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

function ProtectedRoute({
  permission,
  anyOf,
  moduleName,
  children,
}: {
  permission?: string;
  anyOf?: string[];
  moduleName?: string;
  children: React.ReactNode;
}) {
  return (
    <RequirePermission permission={permission} anyOf={anyOf} moduleName={moduleName}>
      <AdminLayout>{children}</AdminLayout>
    </RequirePermission>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors theme="dark" closeButton />
      <BrowserRouter>
        <Routes>
          {/* Public Login & Onboarding Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/accept-invite" element={<AcceptInvitePage />} />
          <Route path="/change-password" element={<ForcedPasswordChangePage />} />
          <Route path="/2fa-enroll" element={<Navigate to="/dashboard" replace />} />

          {/* User Account & Security Settings */}
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <MyAccountPage />
              </ProtectedRoute>
            }
          />

          {/* 1. Root & Super Admin Dashboard */}
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

          {/* 2. Website & CMS Control Center */}
          <Route
            path="/cms"
            element={
              <ProtectedRoute>
                <CMSDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cms/dashboard"
            element={
              <ProtectedRoute>
                <CMSDashboard />
              </ProtectedRoute>
            }
          />

          {/* 3. Donations & Finance */}
          <Route
            path="/finance"
            element={
              <ProtectedRoute>
                <DonationOverview />
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
            path="/finance/reconciliation"
            element={
              <ProtectedRoute>
                <ReconciliationManager />
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
          <Route
            path="/finance/receipts"
            element={
              <ProtectedRoute>
                <ReceiptsManager />
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
            path="/finance/refunds"
            element={
              <ProtectedRoute>
                <RefundsManager />
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

          {/* 4. Membership */}
          <Route
            path="/membership"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership/applications"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="membership" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership/records"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership/categories"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership/cards"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/membership/renewals"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />

          {/* 5. Volunteers & Mentors */}
          <Route
            path="/volunteers"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="volunteer" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteers/applications"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="volunteer" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteers/mentor-applications"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="mentor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteers/directory"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="volunteer" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteers/mentors"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="mentor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/volunteers/activities"
            element={
              <ProtectedRoute>
                <VolunteersModule />
              </ProtectedRoute>
            }
          />

          {/* 6. Partners & Sponsors */}
          <Route
            path="/partners"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="partner" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners/enquiries"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="partner" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners/sponsors-enquiries"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="sponsor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners/directory"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="partner" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners/sponsors-directory"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="sponsor" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/partners/agreements"
            element={
              <ProtectedRoute>
                <PartnersModule />
              </ProtectedRoute>
            }
          />

          {/* 7. ISLAH Community Control Center */}
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <CommunityDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community/overview"
            element={
              <ProtectedRoute>
                <CommunityDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community/members"
            element={
              <ProtectedRoute>
                <MembersManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community/donors"
            element={
              <ProtectedRoute>
                <DonationOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community/partners"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="partner" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community/volunteers"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="volunteer" />
              </ProtectedRoute>
            }
          />

          {/* 8. Programmes & Impact Control Center */}
          <Route
            path="/programmes"
            element={
              <ProtectedRoute>
                <ProgrammesDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/overview"
            element={
              <ProtectedRoute>
                <ProgrammesDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/initiatives"
            element={
              <ProtectedRoute>
                <ProgrammesModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/activities"
            element={
              <ProtectedRoute>
                <ProgrammesModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/beneficiaries"
            element={
              <ProtectedRoute>
                <ProgrammesModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/budgets"
            element={
              <ProtectedRoute>
                <BudgetsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/reports"
            element={
              <ProtectedRoute>
                <FinancialReportsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/evidence"
            element={
              <ProtectedRoute>
                <MediaManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/programmes/expenses"
            element={
              <ProtectedRoute>
                <ExpensesManager />
              </ProtectedRoute>
            }
          />

          {/* 9. Governance & Reports */}
          <Route
            path="/governance"
            element={
              <ProtectedRoute>
                <GovernanceModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/governance/legal"
            element={
              <ProtectedRoute>
                <PublicationsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/governance/records"
            element={
              <ProtectedRoute>
                <GovernanceModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/governance/annual-reports"
            element={
              <ProtectedRoute>
                <PublicationsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/governance/financial-reports"
            element={
              <ProtectedRoute>
                <FinancialReportsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/governance/transparency"
            element={
              <ProtectedRoute>
                <GovernanceModule />
              </ProtectedRoute>
            }
          />

          {/* 10. Communications & Inbound Inquiries */}
          <Route
            path="/communications"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="contact_inquiries" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communications/notifications"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="all" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communications/email"
            element={
              <ProtectedRoute>
                <ApplicationsManager initialTab="contact_inquiries" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communications/announcements"
            element={
              <ProtectedRoute>
                <NewsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/communications/campaigns"
            element={
              <ProtectedRoute>
                <CommunicationsModule />
              </ProtectedRoute>
            }
          />

          {/* 11. System Health */}
          <Route
            path="/system-health"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health/database"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health/api"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health/payment-gateway"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health/email"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health/backup"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-health/logs"
            element={
              <ProtectedRoute>
                <SystemHealthModule />
              </ProtectedRoute>
            }
          />

          {/* 12. Staff & Roles Governance */}
          <Route
            path="/staff"
            element={
              <ProtectedRoute permission="system.staff:view" moduleName="Staff Accounts">
                <UserAccountsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/directory"
            element={
              <ProtectedRoute permission="system.staff:view" moduleName="Staff Directory">
                <StaffDirectoryManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/accounts"
            element={
              <ProtectedRoute permission="system.staff:view" moduleName="User Accounts">
                <UserAccountsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/roles"
            element={
              <ProtectedRoute permission="system.role:view" moduleName="Roles & Permissions">
                <RolesPermissionsManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/logs"
            element={
              <ProtectedRoute permission="system.audit:view" moduleName="Activity Logs">
                <ActivityLogsViewer />
              </ProtectedRoute>
            }
          />

          {/* 13. Settings (Dedicated Platform Settings) */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SiteSettingsManager />
              </ProtectedRoute>
            }
          />

          {/* Backwards Compatibility / Direct Manager Routes */}
          <Route
            path="/news"
            element={
              <ProtectedRoute>
                <NewsManager />
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
            path="/patients"
            element={
              <ProtectedRoute>
                <PatientsManager />
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
            path="/careers"
            element={
              <ProtectedRoute>
                <CareersManager />
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
            path="/stories"
            element={
              <ProtectedRoute>
                <StoriesManager />
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
            path="/applications"
            element={
              <ProtectedRoute>
                <ApplicationsManager />
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
