# ISLAH Backend Readiness and API Audit

## Verdict

**Status: Functionally integrated and buildable, but not cleared for an unqualified production launch.**

The backend exposes the public client API, authenticated CMS API, MongoDB persistence, audit logging, uploads, finance workflows, Razorpay verification, email dispatch, and RBAC. Production approval still depends on live secret configuration, external-provider tests, operational controls, and a few code-level gaps listed below.

## End-to-end backend flow

```text
Client/CMS request
  -> CORS
  -> lazy MongoDB connection
  -> Helmet
  -> raw Razorpay webhook parser (webhook paths only)
  -> JSON/urlencoded body limits (1 MB)
  -> security sanitizer
  -> request logging
  -> /api router + global rate limiter
  -> route-specific limiter / honeypot / Turnstile
  -> authenticate()
  -> resolveAdminPermissions()
  -> requirePermission() / requireReauth()
  -> controller validation and business logic
  -> Mongoose model or external provider
  -> logAudit() for governed mutations
  -> JSON/file response
```

Errors pass to the global error handler. In development it may include a stack; production responses omit the stack.

## Mounted API surface

| Prefix | Responsibility | Main persistence/integration |
|---|---|---|
| `/api/health` | Backend/database/config health | MongoDB state and env presence |
| `/api/auth` | Admin login, invite, profile, logout, password, reauth | `Admin`, JWT |
| `/api/admin/staff` | Staff accounts and lifecycle | `Admin`, audit |
| `/api/admin/roles` | Roles and permission registry | `Role`, audit |
| `/api/admin/audit-logs` | Audit list/export | immutable `AuditLog` |
| `/api/admin/access-requests` | Access request workflow | `AccessRequest`, audit |
| `/api/donations` | Public donations, admin list/manual/resend, receipt PDF | `Donation`, email/PDF |
| `/api/members` | Registration, list/profile/status/OTP/renewal | `Member`, `Donation`, verification |
| `/api/patients` | Public patient list/detail and admin management | `Patient` |
| `/api/applications` | Volunteer, partner, sponsor, mentor, career submissions | `Application`, email/audit |
| `/api/contact` | Public contact submissions and admin handling | `Contact`, email/audit |
| `/api/news` | News/events CRUD and public queries | `NewsEvent` |
| `/api/stories` | Success stories CRUD/public queries | `SuccessStory` |
| `/api/publications` | Publications CRUD/public queries | `Publication` |
| `/api/careers` | Career opening CRUD/public queries | `CareerOpening` |
| `/api/media` | Media/albums CRUD/public queries | `Media`, R2/Cloudinary |
| `/api/settings` | Public and admin site settings | `SiteSetting` |
| `/api/upload` | Multipart media/document upload | R2/Cloudinary/local fallback |
| `/api/finance` | Donations, expenses, receipts, budgets, reports, reconciliation | finance models |
| `/api/payment` | Razorpay order, verify, webhook | Razorpay, `PaymentEvent` |
| `/api/create-order` | Direct public Razorpay alias | Razorpay |
| `/api/verify-payment` | Direct public payment verification alias | Razorpay and finance records |
| `/api/webhook/razorpay` | Direct webhook alias | HMAC verification |
| `/api/programmes` | Programme initiatives | `ProgrammeInitiative` |
| `/api/broadcasts` | Broadcast campaign records | `BroadcastCampaign` |
| `/api/volunteer-tasks` | Volunteer assignment records | `VolunteerTask` |
| `/api/partner-agreements` | Partner agreement records | `PartnerAgreement` |
| `/api/public/transparency/financial-summary` | PII-free public finance snapshot | `PublicSnapshot`/finance service |
| `/api/verify` | Receipt/member/document verification | verification models |

## Authentication and authorization

- Admin login is password-based. 2FA/MFA, phone OTP authentication, TOTP utilities, and related routes are removed.
- Login uses a strict rate limiter and Turnstile middleware.
- JWT authentication loads the live `Admin` record on each protected request.
- Deactivated accounts, lockouts, invalid tokens, expired tokens, and token-version changes are rejected.
- Effective permissions are role permissions plus direct grants minus direct denies; explicit denies win.
- Super-admin receives the permission registry with direct denies still applied.
- `RBAC_ENFORCEMENT_MODE` supports `enforce`, `report`, or `off`; production must use `enforce`.
- High-risk actions can require recent password reauthentication.

Production checks:

- Replace all example/default secrets.
- Confirm `RBAC_ENFORCEMENT_MODE=enforce`.
- Confirm token expiry, password policy, account invite expiry, and force-signout behaviour.
- Confirm every route that changes data has a backend permission check, not only a CMS route guard.

## Persistence and audit

MongoDB models cover members, donations, patients, applications, media, content, finance, staff, roles, audit logs, programmes, broadcasts, volunteer tasks, and partner agreements.

Audit logging is centralized and records actor, action, resource, outcome, severity, request context, and before/after state where available. Audit records are protected from ordinary updates/deletes. Verify MongoDB indexes, retention, backups, restore procedures, and privacy access controls before launch.

## External integrations

### Razorpay

Order creation, payment signature verification, webhook HMAC verification, donation/member association, and receipt workflows exist. Live keys and webhook secrets are deployment requirements. `refundRazorpayPayment()` has a simulated processed-refund fallback after a live call failure; this is unsafe for real-money production and must be changed to an explicit failure or a queued/manual reconciliation state.

### Email

Nodemailer sends through SMTP/Gmail when credentials exist. Without credentials, the service logs a developer mock preview and returns success. Production must fail visibly or route to a configured provider; otherwise receipts and alerts can appear successful without delivery.

### SMS/WhatsApp

No production SMS or WhatsApp delivery provider is implemented. Broadcast channel records are not delivery integrations. Do not mark those channels operational.

### Storage

R2 and Cloudinary support exists. Local upload fallback and serverless `/tmp` handling exist. Private documents need a final access-control, signed URL, retention, and backup review.

## Security and reliability review

Implemented:

- Helmet security headers.
- CORS middleware with configured origin checks in production.
- 1 MB JSON/urlencoded body limits.
- NoSQL/security sanitizer.
- Global and route-specific rate limiters.
- Honeypot and Turnstile protections for supported public forms.
- Raw-body handling before JSON parsing for Razorpay webhooks.
- Central error handling without production stack exposure.

Required hardening:

1. Remove permissive wildcard-like hosted-origin allowances if they are not required for the deployment.
2. Ensure `CLIENT_URL`, `CMS_URL`, and `ADMIN_URL` are explicit production origins.
3. Add provider reachability checks; the health endpoint currently reports configuration presence, not successful SMTP/Razorpay/R2 calls.
4. Make payment/refund operations idempotent and safe under retries.
5. Add request correlation IDs and structured production logs.
6. Configure MongoDB least-privilege credentials, backups, indexes, alerting, and restore drills.
7. Run dependency, secret, and container scans.
8. Verify file type/size/content validation and private-document authorization.

## Known correctness and documentation gaps

- `backend/src/scripts/testRouteInventory.ts` predates the programme, broadcast, volunteer, and partner route additions; update it before treating its route count as authoritative.
- The public client and CMS have separate API clients and response-shape assumptions; add contract tests for every shared endpoint.
- Several clients convert network/API errors into empty success-shaped lists. Backend errors are returned, but users may see “no records” instead of “service unavailable”.
- The API is request/refresh based; there is no websocket/SSE event stream.
- Startup no longer auto-seeds RBAC, which is correct for production safety, but deployment must run a controlled role provisioning step.

## Backend release checklist

- [ ] Production `.env` supplied through secret management; no example/default secrets.
- [ ] MongoDB connection, indexes, backups, restore drill, and least-privilege user verified.
- [ ] `NODE_ENV=production` and `RBAC_ENFORCEMENT_MODE=enforce`.
- [ ] Exact CORS origins configured; HTTPS enforced at the edge.
- [ ] Live Razorpay order, signature, webhook retry, duplicate webhook, refund failure, and reconciliation tests complete.
- [ ] SMTP real delivery, bounce handling, and sender authentication verified.
- [ ] R2/private document upload and retrieval authorization verified.
- [ ] Demo account scripts not run in production; real staff accounts reviewed.
- [ ] Audit append-only behaviour, export, retention, and access review complete.
- [ ] Public forms tested for validation, abuse limits, duplicate submissions, and email failures.
- [ ] Backend TypeScript build passes; route/permission/finance test scripts still need to be run against a production-like database.
- [ ] Monitoring, alerts, structured logs, incident response, and rollback plan active.

## Verification performed

- Public client production build passes after the client transparency change.
- Backend TypeScript production build passes.
- CMS TypeScript/Vite production build passes after the client transparency change.
- Repository search confirmed no remaining 2FA/MFA/TOTP/phone-OTP authentication code.

