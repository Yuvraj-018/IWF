import { AdminUserContext } from "../middlewares/rbac.js";

/**
 * PII Masking Utilities
 */
export function maskPhone(phone?: string | null): string {
  if (!phone) return "";
  const clean = phone.trim();
  if (clean.length <= 4) return "****";
  const last4 = clean.slice(-4);
  return `******${last4}`;
}

export function maskEmail(email?: string | null): string {
  if (!email || !email.includes("@")) return "";
  const [local, domain] = email.trim().split("@");
  if (local.length <= 2) return `*@${domain}`;
  return `${local[0]}***${local.slice(-1)}@${domain}`;
}

export function maskPan(pan?: string | null): string {
  if (!pan) return "";
  const clean = pan.trim();
  if (clean.length < 5) return "*****";
  return `*****${clean.slice(-5)}`;
}

export function maskBankAccount(account?: string | null): string {
  if (!account) return "";
  const clean = account.trim();
  if (clean.length <= 4) return "****";
  return `******${clean.slice(-4)}`;
}

export function maskAadhaar(aadhaar?: string | null): string {
  if (!aadhaar) return "";
  const clean = aadhaar.replace(/\s+/g, "");
  if (clean.length <= 4) return "****";
  return `**** **** ${clean.slice(-4)}`;
}

/**
 * PII Projections
 */
export function projectDonor(donor: any, canViewPii = false): any {
  if (!donor) return donor;
  const d = donor.toObject ? donor.toObject() : { ...donor };
  if (canViewPii) return d;

  if (d.donorPhone) d.donorPhone = maskPhone(d.donorPhone);
  if (d.phone) d.phone = maskPhone(d.phone);
  if (d.donorEmail) d.donorEmail = maskEmail(d.donorEmail);
  if (d.email) d.email = maskEmail(d.email);
  if (d.donorPan) d.donorPan = maskPan(d.donorPan);
  if (d.pan) d.pan = maskPan(d.pan);
  if (d.donorAddress) d.donorAddress = "[Redacted - Confidential]";
  if (d.address) d.address = "[Redacted - Confidential]";
  return d;
}

export function projectMember(member: any, canViewPii = false): any {
  if (!member) return member;
  const m = member.toObject ? member.toObject() : { ...member };
  if (canViewPii) return m;

  if (m.phone) m.phone = maskPhone(m.phone);
  if (m.email) m.email = maskEmail(m.email);
  if (m.address) m.address = "[Redacted]";
  if (m.emergencyContact) m.emergencyContact = maskPhone(m.emergencyContact);
  return m;
}

export function projectApplication(app: any, canViewPii = false): any {
  if (!app) return app;
  const a = app.toObject ? app.toObject() : { ...app };
  if (canViewPii) return a;

  if (a.phone) a.phone = maskPhone(a.phone);
  if (a.email) a.email = maskEmail(a.email);
  if (a.pan) a.pan = maskPan(a.pan);
  if (a.aadhaar) a.aadhaar = maskAadhaar(a.aadhaar);
  if (a.documents && Array.isArray(a.documents)) {
    a.documents = a.documents.map((doc: any) => ({
      ...doc,
      fileUrl: "[Masked - PII Access Required]",
    }));
  }
  return a;
}

export function projectPatient(patient: any, canViewPii = false): any {
  if (!patient) return patient;
  const p = patient.toObject ? patient.toObject() : { ...patient };
  if (canViewPii) return p;

  if (p.contactNumber) p.contactNumber = maskPhone(p.contactNumber);
  if (p.guardianContact) p.guardianContact = maskPhone(p.guardianContact);
  if (p.address) p.address = "[Redacted]";
  return p;
}

export function projectBankAccount(account: any, canViewPii = false): any {
  if (!account) return account;
  const b = account.toObject ? account.toObject() : { ...account };
  if (canViewPii) return b;

  if (b.accountNumber) b.accountNumber = maskBankAccount(b.accountNumber);
  return b;
}

/**
 * Scope (Row-Level Access) Query Injector
 */
export function applyScopeFilter(
  existingFilter: any = {},
  user?: AdminUserContext,
  workAreaKey = "workAreaId"
): any {
  if (!user) return existingFilter;

  // Super Admin bypasses scope constraints
  if (user.roles?.includes("super_admin")) {
    return existingFilter;
  }

  // Programme Manager with empty scope sees nothing
  const isProgrammeManager = user.roles?.includes("programme_manager");
  const assignedWorkAreas = user.scope?.workAreas || [];

  if (isProgrammeManager) {
    if (assignedWorkAreas.length === 0) {
      // Force empty results if programme manager has no assigned areas
      return {
        ...existingFilter,
        [workAreaKey]: "__RESTRICTED_EMPTY_SCOPE__",
      };
    }

    return {
      ...existingFilter,
      [workAreaKey]: { $in: assignedWorkAreas.map((w) => w.toUpperCase()) },
    };
  }

  // If other non-superadmin user has specific scope restrictions
  if (assignedWorkAreas.length > 0) {
    return {
      ...existingFilter,
      [workAreaKey]: { $in: assignedWorkAreas.map((w) => w.toUpperCase()) },
    };
  }

  return existingFilter;
}

/**
 * Checks single-record scope compliance
 */
export function checkRecordScope(
  recordWorkAreaId?: string,
  user?: AdminUserContext
): boolean {
  if (!user || user.roles?.includes("super_admin")) return true;
  if (!recordWorkAreaId) return true;

  const assignedWorkAreas = (user.scope?.workAreas || []).map((w) => w.toUpperCase());
  const isProgrammeManager = user.roles?.includes("programme_manager");

  if (isProgrammeManager && assignedWorkAreas.length === 0) {
    return false;
  }

  if (assignedWorkAreas.length > 0) {
    return assignedWorkAreas.includes(recordWorkAreaId.toUpperCase());
  }

  return true;
}
