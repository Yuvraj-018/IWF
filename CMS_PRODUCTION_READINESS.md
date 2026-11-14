# ISLAH CMS Production Readiness

## Executive status

The CMS is a real API-backed administration application, not a finished production deployment. Password authentication, RBAC, MongoDB persistence, audit logging, finance workflows, content management, and Razorpay verification are implemented. Production launch still requires environment configuration, external-provider verification, operational controls, and removal of a few intentionally limited behaviours documented below.

The CMS does not use 2FA/MFA. Authentication is password-based with JWT sessions, Turnstile bot protection where configured, login lockout controls, and password reauthentication for high-risk actions.

## How the current system works

### 1. Login and session flow

1. An administrator submits email, password, and Turnstile response (when Turnstile is enabled).
2. The backend validates the account, active status, password hash, lockout state, and bot-protection response.
3. Failed attempts are counted and can temporarily lock the account.
4. A successful login returns a signed session token and the CMS stores it in browser local storage.
5. The CMS loads the current administrator profile and effective permissions.
6. Protected requests send the token in the `Authorization` header.
7. Logout removes the browser token. Token versioning and account status checks support server-side invalidation.
8. High-risk operations can request a fresh password reauthentication. This is password reauthentication, not MFA.

Production requirements:

- Set a strong JWT secret and use HTTPS.
- Configure Turnstile site and secret keys; do not use demo keys.
- Use a production token expiry and review the local-storage token policy against the organisation's security requirements.
- Create real staff accounts through controlled provisioning. Do not use demo-account scripts in production.

### 2. RBAC and staff administration

Roles and permissions are stored in MongoDB and resolved with direct grants/denials, role permissions, and scope restrictions. The staff directory, user accounts, role editor, access requests, and permission checks use backend data.

The backend protects routes; CMS visibility controls are only a user-experience layer and must not be treated as security. The backend no longer auto-seeds roles at startup. RBAC seed scripts remain manual operational tools.

Production requirements:

- Provision and review roles manually before launch.
- Confirm every staff member has the minimum required role and scope.
- Rotate or remove demo credentials and inactive accounts.
- Review access-request approval and reauthentication audit records.

### 3. Audit logs and activity

Audit records are stored in MongoDB through the central audit service. Records include actor, action, resource, before/after state where applicable, outcome, severity, IP/user-agent context, and timestamps. The audit collection is protected against ordinary update/delete operations.

The Activity Logs screen reads the protected audit API and supports pagination, filtering, date ranges, expandable state, and CSV export. Leadership's recent activity and staff/RBAC displays now use live APIs.

Audit logs are request-based, not websocket-based. Header notifications poll periodically, but the Activity Logs page does not stream new records automatically. A refresh or a future websocket/SSE layer is required for instant updates.

### 4. CMS content and public-facing data

News, stories, publications, careers, media, settings, contact enquiries, applications, members, patients, programmes, broadcasts, and financial records are served through backend controllers and MongoDB models. Content changes are authenticated and audited where the corresponding workflow supports it.

The remaining browser local storage usage is session/UI state:

- The admin JWT.
- Read/unread notification and message markers.

These are not business records. Volunteer assignments and partner agreements were moved from local-storage business data to authenticated MongoDB APIs.

Before launch, test each module with an empty database and with real records. Confirm create, edit, delete/archive, publish/status transitions, validation, permissions, and error states independently for each role.

### 5. Volunteer and partner flows

Volunteer assignments and partner agreements are persisted through authenticated backend endpoints using MongoDB IDs. Creation is permission-protected and audited. Duplicate partner agreement references are rejected.

The current implementation is a records console, not a complete external volunteer/partner portal. Notifications, document signing, workflow reminders, and provider integrations are not implied by these CRUD endpoints.

### 6. Finance and donations

The backend supports donation records, receipts, expense workflows, approvals, payments, refunds, reconciliation, budgets, reports, and transparency data. Finance permissions separate entry, approval, payment, export, and audit capabilities.

Razorpay order creation and payment-signature/webhook verification are implemented. Refunds call Razorpay when configured, but the refund service still has a simulated fallback when the live gateway call fails; this must be disabled or made an explicit hard failure before accepting real-money production refunds.

Production requirements:

- Configure live Razorpay keys and webhook secret.
- Register the exact production webhook URL and verify signature handling with live test payments.
- Confirm idempotency for payment and webhook retries.
- Verify receipt numbering, email delivery, refund reconciliation, and accounting exports.
- Do not treat test/sandbox transactions as production evidence.

### 7. Email

Email dispatch uses Nodemailer SMTP/Gmail credentials when configured. Without SMTP credentials, the application deliberately writes a developer mock email preview to the server log and returns success.

This fallback is useful for development but is not production delivery. Production must configure SMTP credentials, sender identity, SPF/DKIM/DMARC, bounce handling, and monitoring. Perform a real delivery test for receipts, application notices, password-related messages, and admin alerts.

### 8. SMS and WhatsApp

There is no production SMS provider integration. Broadcast records can describe SMS and WhatsApp channels, but selecting those channels does not prove that a message was delivered. No SMS OTP/MFA flow is present.

Do not advertise SMS or WhatsApp delivery as operational until a provider, credentials, templates, opt-in rules, retries, delivery callbacks, rate limits, and audit handling are implemented and tested.

### 9. Media and document storage

Media and confidential uploads support Cloudflare R2 configuration and related storage code. Cloudinary configuration also exists for supported media paths. The system health screen now reports whether the required R2 configuration is present instead of claiming storage is mounted.

Production requirements:

- Configure the selected provider and bucket policies.
- Keep confidential documents private and serve them through authorised access.
- Configure retention, backups, malware/content checks, size limits, and CDN/domain settings.
- Test upload, replacement, deletion/archive, signed/private access, and failed-upload cleanup.

### 10. Notifications and realtime behaviour

The CMS is request/refresh based. It is not a realtime websocket application. Notification counters poll at intervals and most screens refresh after mutations. This is acceptable for an initial administrative deployment if documented, but it should not be described as realtime.

### 11. System health

The health endpoint reports backend status, MongoDB connection state, uptime, and whether Razorpay, SMTP, and R2 credentials are configured. The CMS no longer reports healthy/connected defaults when the backend is unreachable.

Configuration presence is not the same as provider reachability. Add provider ping checks and alerting before relying on the screen for operational monitoring.

## Explicit production gaps

1. Production environment variables and provider credentials have not been verified in this repository.
2. SMTP is a developer mock logger when unconfigured.
3. SMS and WhatsApp delivery providers are not implemented.
4. Razorpay live credentials, webhook registration, idempotency, and real-money testing remain deployment tasks.
5. Razorpay refund fallback can simulate a processed refund after a live call failure and must be reviewed before production finance use.
6. Activity Logs are not websocket/SSE realtime.
7. Backups, restore drills, uptime monitoring, alerting, log retention, and incident procedures must be configured outside the application.
8. A production security review should confirm HTTPS, CORS allowlists, cookie/token policy, rate limits, secret management, dependency scanning, and least-privilege database credentials.
9. End-to-end tests with production-like MongoDB data and each RBAC role are still required.

## Release checklist

- [ ] Production MongoDB database, indexes, backups, and restore test complete.
- [ ] Live JWT, Turnstile, Razorpay, SMTP, and storage configuration installed through secret management.
- [ ] No demo accounts or demo credentials enabled.
- [ ] RBAC roles, scopes, staff accounts, and access requests reviewed.
- [ ] Payment order, webhook, receipt, refund, retry, and reconciliation tests complete.
- [ ] Real email delivery and bounce monitoring verified.
- [ ] SMS/WhatsApp features disabled or clearly labelled unavailable.
- [ ] Private document access and upload limits verified.
- [ ] Audit export and retention process verified.
- [ ] HTTPS, CORS, security headers, rate limiting, monitoring, backups, and incident response enabled.
- [ ] Backend and CMS production builds pass.

## Verification performed for this change

- Backend TypeScript production build passes.
- CMS TypeScript/Vite production build passes after the final health-screen changes.
- Repository search contains no remaining 2FA/MFA, phone-OTP, TOTP, or SMS-provider authentication code.

