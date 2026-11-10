import { Users, HeartHandshake, Briefcase, Award, Globe, Shield, MessageSquare, Activity } from "lucide-react";
import ModulePlaceholder from "./ModulePlaceholder";

export function MembershipModule() {
  return (
    <ModulePlaceholder
      category="Membership"
      title="Membership Directory & Cards"
      description="Manage membership tiers (Blue, Yellow, Green, Orange, Community, Contributing, Patron), digital membership ID cards, and annual renewal subscriptions."
      icon={Users}
      badge="Membership System Active"
    />
  );
}

export function VolunteersModule() {
  return (
    <ModulePlaceholder
      category="People & Community"
      title="Volunteers & Mentors Network"
      description="Review volunteer and mentor applications, match skills with grassroots field initiatives, and track service hours."
      icon={HeartHandshake}
      badge="Volunteers Active"
    />
  );
}

export function PartnersModule() {
  return (
    <ModulePlaceholder
      category="Partnerships"
      title="Partners & Sponsors Hub"
      description="Track institutional partner agreements, CSR sponsorships, funding schedules, and corporate acknowledgements."
      icon={Briefcase}
      badge="Partners Active"
    />
  );
}

export function ProgrammesModule() {
  return (
    <ModulePlaceholder
      category="Programmes & Impact"
      title="Eight Master Sectors & Impact Tracking"
      description="Manage Education, Healthcare, Women & Youth, Livelihoods, Social Justice, Agriculture, Environment, and Emergency Relief programmes."
      icon={Award}
      badge="8 Work Areas Configured"
    />
  );
}

export function CommunityModule() {
  return (
    <ModulePlaceholder
      category="ISLAH Community"
      title="Community Directory & Public Spotlight"
      description="Manage public directory visibility consent, spotlight verified supporters, and oversee community participation."
      icon={Globe}
      badge="Directory Connected"
    />
  );
}

export function GovernanceModule() {
  return (
    <ModulePlaceholder
      category="Governance"
      title="Governance, Policies & Annual Filings"
      description="Archive legal foundation registrations (80G, 12A, CSR-1), audited balance sheets, and public disclosures."
      icon={Shield}
      badge="Governance Active"
    />
  );
}

export function CommunicationsModule() {
  return (
    <ModulePlaceholder
      category="Communications"
      title="Communications, Newsletters & Alerts"
      description="Manage transactional email templates, bulk newsletters, donor updates, and public announcements."
      icon={MessageSquare}
      badge="Mail Engine Ready"
    />
  );
}

export function SystemHealthModule() {
  return (
    <ModulePlaceholder
      category="System Health"
      title="System Health, Database & Backup Logs"
      description="Monitor MongoDB connection status, API latency, automated database backups, Razorpay webhook telemetry, and background jobs."
      icon={Activity}
      badge="System Healthy"
    />
  );
}

