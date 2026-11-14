/**
 * Central Permission Registry & System Roles Specification
 * Single source of truth for ISLAH RBAC System.
 * Permission strings follow the standard: module.resource:action
 */

export interface PermissionDefinition {
  key: string;
  module: string;
  resource: string;
  action: string;
  name: string;
  description: string;
  isPii?: boolean;
}

export interface SystemRoleDefinition {
  key: string;
  name: string;
  description: string;
  permissions: string[];
}

// Complete registry of granular permissions
export const PERMISSIONS: PermissionDefinition[] = [
  // ==================== CMS MODULE ====================
  { key: "cms.dashboard:view", module: "cms", resource: "dashboard", action: "view", name: "View CMS Dashboard", description: "View CMS dashboard overview and statistics" },
  { key: "cms.page:view", module: "cms", resource: "page", action: "view", name: "View Pages", description: "View list and content of CMS pages" },
  { key: "cms.page:create", module: "cms", resource: "page", action: "create", name: "Create Page", description: "Create new CMS pages" },
  { key: "cms.page:edit", module: "cms", resource: "page", action: "edit", name: "Edit Page", description: "Edit existing CMS pages" },
  { key: "cms.page:delete", module: "cms", resource: "page", action: "delete", name: "Delete Page", description: "Delete CMS pages" },
  { key: "cms.page:publish", module: "cms", resource: "page", action: "publish", name: "Publish Page", description: "Publish or unpublish CMS pages" },

  { key: "cms.news:view", module: "cms", resource: "news", action: "view", name: "View News & Events", description: "View news articles and events" },
  { key: "cms.news:create", module: "cms", resource: "news", action: "create", name: "Create News", description: "Create news and event articles" },
  { key: "cms.news:edit", module: "cms", resource: "news", action: "edit", name: "Edit News", description: "Edit existing news and event articles" },
  { key: "cms.news:delete", module: "cms", resource: "news", action: "delete", name: "Delete News", description: "Delete news and events" },
  { key: "cms.news:publish", module: "cms", resource: "news", action: "publish", name: "Publish News", description: "Publish or archive news articles" },

  { key: "cms.story:view", module: "cms", resource: "story", action: "view", name: "View Stories", description: "View success stories" },
  { key: "cms.story:create", module: "cms", resource: "story", action: "create", name: "Create Story", description: "Create success stories" },
  { key: "cms.story:edit", module: "cms", resource: "story", action: "edit", name: "Edit Story", description: "Edit existing success stories" },
  { key: "cms.story:delete", module: "cms", resource: "story", action: "delete", name: "Delete Story", description: "Delete success stories" },
  { key: "cms.story:publish", module: "cms", resource: "story", action: "publish", name: "Publish Story", description: "Publish or unpublish success stories" },

  { key: "cms.publication:view", module: "cms", resource: "publication", action: "view", name: "View Publications", description: "View publications and dossiers" },
  { key: "cms.publication:create", module: "cms", resource: "publication", action: "create", name: "Create Publication", description: "Upload new publications" },
  { key: "cms.publication:edit", module: "cms", resource: "publication", action: "edit", name: "Edit Publication", description: "Edit publication metadata" },
  { key: "cms.publication:delete", module: "cms", resource: "publication", action: "delete", name: "Delete Publication", description: "Delete publications" },
  { key: "cms.publication:publish", module: "cms", resource: "publication", action: "publish", name: "Publish Publication", description: "Publish or unpublish publications" },

  { key: "cms.media:view", module: "cms", resource: "media", action: "view", name: "View Media", description: "View media library and galleries" },
  { key: "cms.media:create", module: "cms", resource: "media", action: "create", name: "Upload Media", description: "Upload images, files and videos" },
  { key: "cms.media:edit", module: "cms", resource: "media", action: "edit", name: "Edit Media", description: "Edit media albums and metadata" },
  { key: "cms.media:delete", module: "cms", resource: "media", action: "delete", name: "Delete Media", description: "Delete media items and albums" },

  { key: "cms.career:view", module: "cms", resource: "career", action: "view", name: "View Careers", description: "View career openings and applications" },
  { key: "cms.career:create", module: "cms", resource: "career", action: "create", name: "Create Career", description: "Create career openings" },
  { key: "cms.career:edit", module: "cms", resource: "career", action: "edit", name: "Edit Career", description: "Edit career openings" },
  { key: "cms.career:delete", module: "cms", resource: "career", action: "delete", name: "Delete Career", description: "Delete career openings" },
  { key: "cms.career:publish", module: "cms", resource: "career", action: "publish", name: "Publish Career", description: "Publish or close career openings" },

  { key: "cms.patient:view", module: "cms", resource: "patient", action: "view", name: "View Patients", description: "View patient directory (masked PII)" },
  { key: "cms.patient:create", module: "cms", resource: "patient", action: "create", name: "Create Patient", description: "Add new patient cases" },
  { key: "cms.patient:edit", module: "cms", resource: "patient", action: "edit", name: "Edit Patient", description: "Edit patient case information" },
  { key: "cms.patient:delete", module: "cms", resource: "patient", action: "delete", name: "Delete Patient", description: "Delete patient records" },
  { key: "cms.patient:publish", module: "cms", resource: "patient", action: "publish", name: "Publish Patient", description: "Publish patient appeal" },
  { key: "cms.patient:view_pii", module: "cms", resource: "patient", action: "view_pii", name: "View Patient PII", description: "View confidential medical, guardian, and contact info", isPii: true },

  { key: "cms.settings:view", module: "cms", resource: "settings", action: "view", name: "View Site Settings", description: "View public website settings and configuration" },
  { key: "cms.settings:edit", module: "cms", resource: "settings", action: "edit", name: "Edit Site Settings", description: "Update public website configuration, SEO, and navigation" },

  { key: "cms.contact:view", module: "cms", resource: "contact", action: "view", name: "View Contact Enquiries", description: "View contact form messages" },
  { key: "cms.contact:edit", module: "cms", resource: "contact", action: "edit", name: "Manage Contact Enquiries", description: "Update enquiry status, notes, assignment" },
  { key: "cms.contact:delete", module: "cms", resource: "contact", action: "delete", name: "Delete Contact Enquiry", description: "Remove enquiry records" },

  // ==================== PROGRAMME MODULE ====================
  { key: "programme.overview:view", module: "programme", resource: "overview", action: "view", name: "View Programme Overview", description: "View programmes overview and sector stats" },
  { key: "programme.initiative:view", module: "programme", resource: "initiative", action: "view", name: "View Initiatives", description: "View programme initiatives" },
  { key: "programme.initiative:create", module: "programme", resource: "initiative", action: "create", name: "Create Initiative", description: "Create initiatives under sectors" },
  { key: "programme.initiative:edit", module: "programme", resource: "initiative", action: "edit", name: "Edit Initiative", description: "Edit initiatives" },
  { key: "programme.initiative:delete", module: "programme", resource: "initiative", action: "delete", name: "Delete Initiative", description: "Delete initiatives" },
  { key: "programme.initiative:publish", module: "programme", resource: "initiative", action: "publish", name: "Publish Initiative", description: "Publish initiatives on public portal" },

  { key: "programme.activity:view", module: "programme", resource: "activity", action: "view", name: "View Activities", description: "View programme activities" },
  { key: "programme.activity:create", module: "programme", resource: "activity", action: "create", name: "Create Activity", description: "Log programme activities" },
  { key: "programme.activity:edit", module: "programme", resource: "activity", action: "edit", name: "Edit Activity", description: "Edit programme activities" },
  { key: "programme.activity:delete", module: "programme", resource: "activity", action: "delete", name: "Delete Activity", description: "Delete programme activities" },

  { key: "programme.impact:view", module: "programme", resource: "impact", action: "view", name: "View Impact", description: "View impact updates and evidence" },
  { key: "programme.impact:create", module: "programme", resource: "impact", action: "create", name: "Create Impact Update", description: "Draft impact updates" },
  { key: "programme.impact:edit", module: "programme", resource: "impact", action: "edit", name: "Edit Impact Update", description: "Edit impact metrics and drafts" },
  { key: "programme.impact:submit", module: "programme", resource: "impact", action: "submit", name: "Submit Impact Update", description: "Submit impact updates for review" },
  { key: "programme.impact:approve", module: "programme", resource: "impact", action: "approve", name: "Approve Impact Update", description: "Approve impact updates" },
  { key: "programme.impact:publish", module: "programme", resource: "impact", action: "publish", name: "Publish Impact Update", description: "Publish impact updates" },

  { key: "programme.beneficiary:view", module: "programme", resource: "beneficiary", action: "view", name: "View Beneficiaries", description: "View beneficiary lists (masked PII)" },
  { key: "programme.beneficiary:create", module: "programme", resource: "beneficiary", action: "create", name: "Create Beneficiary", description: "Enroll beneficiaries" },
  { key: "programme.beneficiary:edit", module: "programme", resource: "beneficiary", action: "edit", name: "Edit Beneficiary", description: "Edit beneficiary records" },
  { key: "programme.beneficiary:delete", module: "programme", resource: "beneficiary", action: "delete", name: "Delete Beneficiary", description: "Delete beneficiary records" },
  { key: "programme.beneficiary:view_pii", module: "programme", resource: "beneficiary", action: "view_pii", name: "View Beneficiary PII", description: "View confidential beneficiary contact & identity details", isPii: true },
  { key: "programme.budget:view", module: "programme", resource: "budget", action: "view", name: "View Programme Budget", description: "View allocated sector and initiative budgets" },

  // ==================== FINANCE MODULE ====================
  { key: "finance.dashboard:view", module: "finance", resource: "dashboard", action: "view", name: "View Finance Dashboard", description: "View financial overview, income, expense summary" },

  { key: "finance.donation:view", module: "finance", resource: "donation", action: "view", name: "View Donations", description: "View donation transactions (masked donor PII)" },
  { key: "finance.donation:create", module: "finance", resource: "donation", action: "create", name: "Record Manual Donation", description: "Record offline or manual donation vouchers" },
  { key: "finance.donation:edit", module: "finance", resource: "donation", action: "edit", name: "Edit Donation", description: "Update donation classification and metadata" },
  { key: "finance.donation:view_pii", module: "finance", resource: "donation", action: "view_pii", name: "View Donor PII", description: "View unmasked donor contact, PAN, and address info", isPii: true },
  { key: "finance.donation:export", module: "finance", resource: "donation", action: "export", name: "Export Donations", description: "Export donation register to CSV/Excel" },

  { key: "finance.receipt:view", module: "finance", resource: "receipt", action: "view", name: "View Receipts", description: "View 80G tax receipts and acknowledgements" },
  { key: "finance.receipt:edit", module: "finance", resource: "receipt", action: "edit", name: "Resend Receipt", description: "Resend receipts via email" },
  { key: "finance.receipt:export", module: "finance", resource: "receipt", action: "export", name: "Export Receipts", description: "Export receipt register" },

  { key: "finance.expense:view", module: "finance", resource: "expense", action: "view", name: "View Expenses", description: "View expense vouchers and payment statuses" },
  { key: "finance.expense:create", module: "finance", resource: "expense", action: "create", name: "Create Expense Voucher", description: "Draft and create new expense vouchers" },
  { key: "finance.expense:edit", module: "finance", resource: "expense", action: "edit", name: "Edit Expense Voucher", description: "Edit draft or returned expense vouchers" },
  { key: "finance.expense:submit", module: "finance", resource: "expense", action: "submit", name: "Submit Expense", description: "Submit voucher for approval" },
  { key: "finance.expense:approve", module: "finance", resource: "expense", action: "approve", name: "Approve Expense", description: "Approve or return expense vouchers" },
  { key: "finance.expense:reject", module: "finance", resource: "expense", action: "reject", name: "Reject Expense", description: "Reject expense vouchers" },
  { key: "finance.expense:pay", module: "finance", resource: "expense", action: "pay", name: "Record Expense Payment", description: "Disburse payment and record bank reference" },
  { key: "finance.expense:reverse", module: "finance", resource: "expense", action: "reverse", name: "Reverse Expense", description: "Reverse paid or approved expenses" },
  { key: "finance.expense:export", module: "finance", resource: "expense", action: "export", name: "Export Expenses", description: "Export expense ledger to CSV/Excel" },

  { key: "finance.budget:view", module: "finance", resource: "budget", action: "view", name: "View Budgets", description: "View fiscal year sector budgets and variance" },
  { key: "finance.budget:edit", module: "finance", resource: "budget", action: "edit", name: "Manage Budgets", description: "Allocate and modify fiscal year budget allocations" },

  { key: "finance.reconciliation:view", module: "finance", resource: "reconciliation", action: "view", name: "View Reconciliation", description: "View bank statements and reconciliation lines" },
  { key: "finance.reconciliation:create", module: "finance", resource: "reconciliation", action: "create", name: "Upload Statement", description: "Upload bank statement CSV/Excel" },
  { key: "finance.reconciliation:reconcile", module: "finance", resource: "reconciliation", action: "reconcile", name: "Reconcile Transactions", description: "Match statement lines to system ledger" },
  { key: "finance.reconciliation:unmatch", module: "finance", resource: "reconciliation", action: "unmatch", name: "Unmatch Reconciliation", description: "Revert matched statement lines" },
  { key: "finance.reconciliation:ignore", module: "finance", resource: "reconciliation", action: "ignore", name: "Ignore Statement Line", description: "Mark statement line as ignored" },

  { key: "finance.refund:view", module: "finance", resource: "refund", action: "view", name: "View Refunds", description: "View donation refund requests" },
  { key: "finance.refund:create", module: "finance", resource: "refund", action: "create", name: "Initiate Refund", description: "Initiate donation refund request" },
  { key: "finance.refund:approve", module: "finance", resource: "refund", action: "approve", name: "Approve Refund", description: "Approve donation refund request" },
  { key: "finance.refund:reject", module: "finance", resource: "refund", action: "reject", name: "Reject Refund", description: "Reject donation refund request" },
  { key: "finance.refund:process", module: "finance", resource: "refund", action: "process", name: "Process Refund", description: "Execute refund via payment gateway" },

  { key: "finance.report:view", module: "finance", resource: "report", action: "view", name: "View Reports", description: "View statutory financial reports and registers" },
  { key: "finance.report:export", module: "finance", resource: "report", action: "export", name: "Export Reports", description: "Export statutory reports to CSV/PDF" },

  { key: "finance.transparency:view", module: "finance", resource: "transparency", action: "view", name: "View Transparency Snapshots", description: "View public transparency snapshots" },
  { key: "finance.transparency:publish", module: "finance", resource: "transparency", action: "publish", name: "Publish Transparency Snapshot", description: "Publish monthly transparency snapshots" },
  { key: "finance.transparency:toggle", module: "finance", resource: "transparency", action: "toggle", name: "Toggle Snapshot Visibility", description: "Toggle snapshot publish status" },

  { key: "finance.bank_account:view", module: "finance", resource: "bank_account", action: "view", name: "View Bank Accounts", description: "View institutional bank accounts" },
  { key: "finance.bank_account:edit", module: "finance", resource: "bank_account", action: "edit", name: "Edit Bank Accounts", description: "Add or edit institutional bank accounts" },
  { key: "finance.bank_account:view_pii", module: "finance", resource: "bank_account", action: "view_pii", name: "View Bank PII", description: "View unmasked bank account numbers and IFSC", isPii: true },

  // ==================== MEMBERSHIP MODULE ====================
  { key: "membership.application:view", module: "membership", resource: "application", action: "view", name: "View Applications", description: "View membership applications (masked PII)" },
  { key: "membership.application:review", module: "membership", resource: "application", action: "review", name: "Review Applications", description: "Review and verify applicant documents" },
  { key: "membership.application:approve", module: "membership", resource: "application", action: "approve", name: "Approve Application", description: "Approve membership application" },
  { key: "membership.application:reject", module: "membership", resource: "application", action: "reject", name: "Reject Application", description: "Reject membership application" },
  { key: "membership.application:view_pii", module: "membership", resource: "application", action: "view_pii", name: "View Application PII", description: "View applicant identity documents, PAN, Aadhaar", isPii: true },

  { key: "membership.member:view", module: "membership", resource: "member", action: "view", name: "View Members", description: "View member directory (masked PII)" },
  { key: "membership.member:create", module: "membership", resource: "member", action: "create", name: "Add Member", description: "Directly enroll new member" },
  { key: "membership.member:edit", module: "membership", resource: "member", action: "edit", name: "Edit Member", description: "Edit member details and status" },
  { key: "membership.member:delete", module: "membership", resource: "member", action: "delete", name: "Delete Member", description: "Remove member record" },
  { key: "membership.member:view_pii", module: "membership", resource: "member", action: "view_pii", name: "View Member PII", description: "View unmasked member phone, email, and address", isPii: true },
  { key: "membership.member:export", module: "membership", resource: "member", action: "export", name: "Export Members", description: "Export member directory" },

  { key: "membership.card:view", module: "membership", resource: "card", action: "view", name: "View Member Cards", description: "View digital membership cards" },
  { key: "membership.card:generate", module: "membership", resource: "card", action: "generate", name: "Generate Cards", description: "Issue and generate member identity cards" },

  { key: "membership.renewal:view", module: "membership", resource: "renewal", action: "view", name: "View Renewals", description: "View membership renewal history and reminders" },
  { key: "membership.renewal:process", module: "membership", resource: "renewal", action: "process", name: "Process Renewal", description: "Record and confirm renewal payments" },

  // ==================== COMMUNITY MODULE ====================
  { key: "community.overview:view", module: "community", resource: "overview", action: "view", name: "View Community Overview", description: "View community hub statistics" },
  { key: "community.directory:view", module: "community", resource: "directory", action: "view", name: "View Community Directory", description: "Browse community profiles (masked PII)" },
  { key: "community.directory:edit", module: "community", resource: "directory", action: "edit", name: "Edit Community Directory", description: "Edit community profiles" },
  { key: "community.directory:view_pii", module: "community", resource: "directory", action: "view_pii", name: "View Directory PII", description: "View unmasked community contact details", isPii: true },
  { key: "community.directory:export", module: "community", resource: "directory", action: "export", name: "Export Directory", description: "Export community records" },

  { key: "community.volunteer:view", module: "community", resource: "volunteer", action: "view", name: "View Volunteers", description: "View volunteer roster" },
  { key: "community.volunteer:edit", module: "community", resource: "volunteer", action: "edit", name: "Manage Volunteers", description: "Assign volunteers and update status" },
  { key: "community.volunteer:view_pii", module: "community", resource: "volunteer", action: "view_pii", name: "View Volunteer PII", description: "View unmasked volunteer contact details", isPii: true },

  { key: "community.partner:view", module: "community", resource: "partner", action: "view", name: "View Partners", description: "View institutional partners and sponsors" },
  { key: "community.partner:edit", module: "community", resource: "partner", action: "edit", name: "Manage Partners", description: "Add and edit partner organizations" },

  // ==================== COMMUNICATIONS MODULE ====================
  { key: "comms.broadcast:view", module: "comms", resource: "broadcast", action: "view", name: "View Broadcasts", description: "View outbound broadcast history" },
  { key: "comms.broadcast:create", module: "comms", resource: "broadcast", action: "create", name: "Create Broadcast", description: "Queue an outbound communication" },

  // ==================== GOVERNANCE & AUDIT ====================
  { key: "governance.report:view", module: "governance", resource: "report", action: "view", name: "View Governance Reports", description: "View governance reports and meeting minutes" },
  { key: "governance.report:export", module: "governance", resource: "report", action: "export", name: "Export Governance Reports", description: "Export governance records" },
  { key: "governance.audit_log:view", module: "governance", resource: "audit_log", action: "view", name: "View Audit Trail", description: "View system audit trail and activity history" },
  { key: "governance.audit_log:export", module: "governance", resource: "audit_log", action: "export", name: "Export Audit Trail", description: "Export audit logs to CSV" },
  { key: "governance.break_glass:use", module: "governance", resource: "break_glass", action: "use", name: "Break-Glass Superadmin Override", description: "Emergency bypass for system locks (strictly audited)" },

  // ==================== SYSTEM & STAFF MODULE ====================
  { key: "system.health:view", module: "system", resource: "health", action: "view", name: "View System Health", description: "View server and database health diagnostics" },
  { key: "system.backup:view", module: "system", resource: "backup", action: "view", name: "View Backups", description: "View database backup snapshots" },
  { key: "system.backup:create", module: "system", resource: "backup", action: "create", name: "Create Backup", description: "Trigger on-demand database backup" },

  { key: "system.staff:view", module: "system", resource: "staff", action: "view", name: "View Staff Accounts", description: "View staff list, roles, and status" },
  { key: "system.staff:create", module: "system", resource: "staff", action: "create", name: "Invite Staff", description: "Invite new staff member to portal" },
  { key: "system.staff:edit", module: "system", resource: "staff", action: "edit", name: "Edit Staff Account", description: "Update staff profile, scope, or status" },
  { key: "system.staff:delete", module: "system", resource: "staff", action: "delete", name: "Deactivate Staff", description: "Deactivate or revoke staff account" },
  { key: "system.staff:assign_role", module: "system", resource: "staff", action: "assign_role", name: "Assign Staff Roles", description: "Assign roles and permission overrides to staff" },

  { key: "system.role:view", module: "system", resource: "role", action: "view", name: "View Roles", description: "View role definitions and permissions matrix" },
  { key: "system.role:create", module: "system", resource: "role", action: "create", name: "Create Role", description: "Create custom roles with permission sets" },
  { key: "system.role:edit", module: "system", resource: "role", action: "edit", name: "Edit Role", description: "Modify permissions of custom or system roles" },
  { key: "system.role:delete", module: "system", resource: "role", action: "delete", name: "Delete Role", description: "Delete unassigned custom roles" },

  { key: "system.settings:view", module: "system", resource: "settings", action: "view", name: "View System Settings", description: "View core system settings" },
  { key: "system.settings:edit", module: "system", resource: "settings", action: "edit", name: "Edit System Settings", description: "Modify core system configuration" },
];

export const ALL_PERMISSION_KEYS = PERMISSIONS.map((p) => p.key);

/**
 * 13 Seeded System Roles
 * System roles are pre-seeded, editable in permissions, but protected from deletion.
 */
export const SYSTEM_ROLES: SystemRoleDefinition[] = [
  {
    key: "super_admin",
    name: "Super Admin",
    description: "Complete unrestricted administrative control across all modules, staff, roles, and audit trail.",
    permissions: [...ALL_PERMISSION_KEYS],
  },
  {
    key: "cms_admin",
    name: "CMS Admin",
    description: "Full access to all CMS modules and website settings. No finance, membership, donor PII or staff management.",
    permissions: [
      "cms.dashboard:view",
      "cms.page:view", "cms.page:create", "cms.page:edit", "cms.page:delete", "cms.page:publish",
      "cms.news:view", "cms.news:create", "cms.news:edit", "cms.news:delete", "cms.news:publish",
      "cms.story:view", "cms.story:create", "cms.story:edit", "cms.story:delete", "cms.story:publish",
      "cms.publication:view", "cms.publication:create", "cms.publication:edit", "cms.publication:delete", "cms.publication:publish",
      "cms.media:view", "cms.media:create", "cms.media:edit", "cms.media:delete",
      "cms.career:view", "cms.career:create", "cms.career:edit", "cms.career:delete", "cms.career:publish",
      "cms.patient:view", "cms.patient:create", "cms.patient:edit", "cms.patient:delete", "cms.patient:publish",
      "cms.settings:view", "cms.settings:edit",
      "cms.contact:view", "cms.contact:edit",
      "comms.broadcast:view", "comms.broadcast:create",
    ],
  },
  {
    key: "content_editor",
    name: "Content Editor",
    description: "Create and edit content (pages, news, stories, publications, media), and submit for review.",
    permissions: [
      "cms.dashboard:view",
      "cms.page:view", "cms.page:create", "cms.page:edit",
      "cms.news:view", "cms.news:create", "cms.news:edit",
      "cms.story:view", "cms.story:create", "cms.story:edit",
      "cms.publication:view", "cms.publication:create", "cms.publication:edit",
      "cms.media:view", "cms.media:create", "cms.media:edit",
      "cms.patient:view", "cms.patient:create", "cms.patient:edit",
    ],
  },
  {
    key: "content_reviewer",
    name: "Content Reviewer",
    description: "Review submitted content, request changes, and recommend for approval.",
    permissions: [
      "cms.dashboard:view",
      "cms.page:view",
      "cms.news:view",
      "cms.story:view",
      "cms.publication:view",
      "cms.media:view",
      "cms.patient:view",
    ],
  },
  {
    key: "content_approver",
    name: "Content Approver",
    description: "Approve, schedule, publish, and unpublish content across CMS modules.",
    permissions: [
      "cms.dashboard:view",
      "cms.page:view", "cms.page:publish",
      "cms.news:view", "cms.news:publish",
      "cms.story:view", "cms.story:publish",
      "cms.publication:view", "cms.publication:publish",
      "cms.media:view",
      "cms.patient:view", "cms.patient:publish",
    ],
  },
  {
    key: "media_manager",
    name: "Media Manager",
    description: "Upload, curate, organize, and manage media library, albums, and assets.",
    permissions: [
      "cms.dashboard:view",
      "cms.media:view", "cms.media:create", "cms.media:edit", "cms.media:delete",
    ],
  },
  {
    key: "comms_staff",
    name: "Communications Staff",
    description: "Manage news, events, announcements, and contact enquiries.",
    permissions: [
      "cms.dashboard:view",
      "cms.news:view", "cms.news:create", "cms.news:edit", "cms.news:publish",
      "cms.contact:view", "cms.contact:edit",
      "cms.media:view", "cms.media:create",
      "comms.broadcast:view", "comms.broadcast:create",
    ],
  },
  {
    key: "programme_manager",
    name: "Programme Manager",
    description: "Scoped access to assigned sectors and offices: activities, impact updates, beneficiaries, and programme budgets.",
    permissions: [
      "programme.overview:view",
      "programme.initiative:view", "programme.initiative:create", "programme.initiative:edit",
      "programme.activity:view", "programme.activity:create", "programme.activity:edit",
      "programme.impact:view", "programme.impact:create", "programme.impact:edit", "programme.impact:submit",
      "programme.beneficiary:view", "programme.beneficiary:create", "programme.beneficiary:edit",
      "programme.budget:view",
      "cms.media:view", "cms.media:create",
    ],
  },
  {
    key: "finance_entry",
    name: "Finance Entry Staff",
    description: "Record income, manual donations, draft expense vouchers, and upload bank statements.",
    permissions: [
      "finance.dashboard:view",
      "finance.donation:view", "finance.donation:create",
      "finance.expense:view", "finance.expense:create", "finance.expense:edit", "finance.expense:submit",
      "finance.receipt:view",
      "finance.reconciliation:view", "finance.reconciliation:create",
      "finance.budget:view",
    ],
  },
  {
    key: "finance_approver",
    name: "Finance Approver",
    description: "Review, approve, and record payments for expenses, reconcile statements, approve refunds, and view statutory reports.",
    permissions: [
      "finance.dashboard:view",
      "finance.donation:view", "finance.donation:view_pii", "finance.donation:export",
      "finance.expense:view", "finance.expense:approve", "finance.expense:reject", "finance.expense:pay", "finance.expense:reverse", "finance.expense:export",
      "finance.receipt:view", "finance.receipt:edit", "finance.receipt:export",
      "finance.budget:view", "finance.budget:edit",
      "finance.reconciliation:view", "finance.reconciliation:create", "finance.reconciliation:reconcile", "finance.reconciliation:unmatch", "finance.reconciliation:ignore",
      "finance.refund:view", "finance.refund:approve", "finance.refund:reject", "finance.refund:process",
      "finance.report:view", "finance.report:export",
      "finance.transparency:view", "finance.transparency:publish", "finance.transparency:toggle",
      "finance.bank_account:view", "finance.bank_account:edit", "finance.bank_account:view_pii",
    ],
  },
  {
    key: "membership_admin",
    name: "Membership Admin",
    description: "Manage membership applications, member directory, ID card generation, and renewal processing.",
    permissions: [
      "membership.application:view", "membership.application:review", "membership.application:approve", "membership.application:reject", "membership.application:view_pii",
      "membership.member:view", "membership.member:create", "membership.member:edit", "membership.member:delete", "membership.member:view_pii", "membership.member:export",
      "membership.card:view", "membership.card:generate",
      "membership.renewal:view", "membership.renewal:process",
    ],
  },
  {
    key: "community_admin",
    name: "Community Admin",
    description: "Manage community directories, volunteers, mentors, partners, and sponsors.",
    permissions: [
      "community.overview:view",
      "community.directory:view", "community.directory:edit", "community.directory:view_pii", "community.directory:export",
      "community.volunteer:view", "community.volunteer:edit", "community.volunteer:view_pii",
      "community.partner:view", "community.partner:edit",
    ],
  },
  {
    key: "auditor",
    name: "Auditor",
    description: "Read-only access across all reports, registers, and activity logs with export authority. Strictly no edits.",
    permissions: [
      "finance.dashboard:view",
      "finance.donation:view", "finance.donation:export",
      "finance.expense:view", "finance.expense:export",
      "finance.receipt:view", "finance.receipt:export",
      "finance.budget:view",
      "finance.reconciliation:view",
      "finance.refund:view",
      "finance.report:view", "finance.report:export",
      "finance.transparency:view",
      "finance.bank_account:view",
      "governance.report:view", "governance.report:export",
      "governance.audit_log:view", "governance.audit_log:export",
      "system.health:view",
    ],
  },
];

export function isValidPermission(perm: string): boolean {
  if (perm === "*") return true;
  return ALL_PERMISSION_KEYS.includes(perm);
}

