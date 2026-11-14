# ISLAH Client Readiness and Client-to-Backend Audit

## Verdict

**Status: Not yet production-ready as a strictly dynamic public client.**

The client has working API services for the main submissions, donations, membership, media, news, careers, patients, settings, and verification flows. However, several public pages still contain bundled content or demo fallbacks. If the requirement is “live MongoDB data only, no mock/static business data”, these items must be removed or explicitly approved as editorial/static content before launch.

The client build is a React/TanStack/Vite application. It calls the backend through `VITE_API_URL`; the default is `http://localhost:5000/api`.

## Complete request flow

```text
Browser route
  -> React page/component
  -> client service (apiRequest)
  -> VITE_API_URL + /api
  -> Express /api router
  -> rate limiter / honeypot / Turnstile (where applicable)
  -> controller validation and business logic
  -> Mongoose model / external provider
  -> JSON response
  -> client state/cache/UI
```

For admin screens the flow is:

```text
CMS page
  -> cms/src/services/api.ts
  -> apiFetch()
  -> Authorization: Bearer <admin JWT>
  -> authenticate()
  -> resolveAdminPermissions()
  -> requirePermission()
  -> controller
  -> MongoDB + audit log
  -> CMS table/form refresh
```

The public client does not send an admin token. Public write endpoints use request rate limiting, honeypot and/or Turnstile protections instead.

## Client API inventory

| Client capability | Client entry point | Backend endpoint | Current status |
|---|---|---|---|
| Public news list/detail | `newsService.ts` | `GET /api/news`, `GET /api/news/:slug` | API-backed; returns empty state on failure |
| Media and albums | `mediaService.ts` | `GET /api/media`, `/albums`, `/:key` | API-backed with bundled media fallback |
| Success stories | `storyService.ts` | `GET /api/stories` | API-backed; empty state on failure |
| Careers | `careerService.ts` | `GET /api/careers` | API-backed; empty state on failure |
| Patients | `patientService.ts` | `GET /api/patients`, `/:slug` | API-backed; static patient content is also bundled |
| Site settings | `settingsService.ts` / `useSiteSettings.ts` | `GET /api/settings`, `/:key` | API-backed; many pages have display defaults |
| Contact form | `contactService.ts` | `POST /api/contact` | Public write flow |
| Volunteer/partner/sponsor/mentor/career applications | `applicationService.ts` / `ApplicationWizard.tsx` | `POST /api/applications` | Public write flow; draft form state is local-only |
| Membership registration | `memberService.ts` | `POST /api/members` | Public write flow |
| Membership status/profile | `memberService.ts` | `GET /api/members/status/:memberNo`, `/profile/:identifier` | API-backed |
| Member OTP | `memberService.ts` | `POST /api/members/send-otp`, `/verify-otp` | Email/member verification flow; provider configuration must be tested |
| Membership renewal | `memberService.ts` | `POST /api/members/renew` | API-backed; payment and renewal reconciliation must be tested |
| Donation order | `donationService.ts` | `POST /api/create-order` | Razorpay order flow |
| Donation verification | `donationService.ts` | `POST /api/verify-payment` | Signature verified by backend |
| Donation receipt | `donationService.ts` | `GET /api/donations/:receiptNo` | API-backed |
| Financial transparency | `LiveFinancialTransparencyCard.tsx` | `GET /api/public/transparency/financial-summary` | Fixed to use `VITE_API_URL`; no fabricated numeric fallback now |
| Document verification | verification callers | `GET /api/verify/:documentNo` | API-backed |
| Uploads | `uploadService.ts` | `POST /api/upload/single` | Storage configuration and private-file policy required |

## Static, fallback, or demo data found

These are launch blockers if all public business information must be dynamic:

1. `client/src/Pages/Community/communityData.ts` contains member, donor, partner, and volunteer directory records.
2. `client/src/content/mediaContent.ts` is imported by media pages and story services.
3. `client/src/content/campaigns.ts` drives campaign pages and campaign routing.
4. `client/src/content/careerOpenings.ts` is used as bundled career content and fallback source.
5. `client/src/content/patients.ts` is bundled patient data and is imported by patient pages/services.
6. `client/src/Pages/HomePage.tsx` has fallback statistics and fallback gallery albums.
7. `client/src/components/membership/MembershipStatusPortal.tsx` contains `demoProfile()` and a demo fallback when lookup fails.
8. `client/src/Pages/Media/AnnualReportsPage.tsx` falls back to bundled report content and `/docs/islah_report.pdf`.
9. Policy, programme catalogue, location, phone-country, and form-option files are static reference content; these are acceptable only if intentionally maintained as code, not as CMS-managed records.
10. `localStorage` is used for draft form autosave and session/UI state. This is not business persistence, but privacy/retention behaviour should be documented.

The transparency card previously contained a hard-coded localhost URL and fabricated financial totals. The URL and numeric fallback were removed in this audit. If the API is unavailable it now displays unavailable values instead of invented amounts.

## Error, cache, and refresh behaviour

- `apiRequest()` uses `cache: "no-store"` and throws `ApiError` for non-2xx responses.
- Most content services catch network errors and return an empty success-shaped response. This prevents a crash but can make “backend unavailable” look like “no records”; production UX should show an explicit unavailable state.
- Client cache is used for settings, careers, stories, and other shared data. Cache invalidation must be checked after CMS edits.
- Public content is not websocket realtime. Browser refresh or normal refetch is required after CMS publishing.
- Upload and payment failures must be surfaced to the user and must not be interpreted as successful submissions.

## Client security review

- Public forms use backend endpoints rather than writing business records directly to browser storage.
- Turnstile is present for supported forms.
- The client must never contain Razorpay secret, JWT secret, SMTP, R2, or MongoDB credentials.
- `VITE_API_URL` must be a production HTTPS API URL; the localhost default must never be used in a production build.
- CORS must allow only the deployed client and CMS origins.
- Client permission checks are presentation controls; backend authorization remains authoritative.
- Member, patient, PAN, and donor information needs a final review for accidental exposure in public routes, logs, browser storage, analytics, and cache.

## Client release checklist

- [ ] Set `VITE_API_URL` to the production HTTPS API.
- [ ] Verify every public page with an empty database and with real CMS-created records.
- [ ] Remove or approve all bundled business records and demo fallbacks listed above.
- [ ] Test donation order, Razorpay callback, webhook completion, receipt download, and failure/retry states.
- [ ] Test membership registration, OTP, status, profile, renewal, and receipt flows.
- [ ] Test every application form and uploaded document path.
- [ ] Test public news, stories, careers, media, patient, settings, campaign, and transparency pages after CMS changes.
- [ ] Verify no API response is converted into an empty “success” state without a visible unavailable/error indication.
- [ ] Run client build and lint with production environment variables.
- [ ] Run browser smoke tests on desktop and mobile, including SPA refresh/deep links.

## Evidence and recommended next work

The client is integrated with the backend, but it is not yet a pure CMS-driven public website. The next implementation phase should create CMS/API records for campaigns, community directory data, stories, patient/public cases, annual reports, and any public statistics currently embedded in `client/src`, then remove the corresponding imports and fallback branches.

## Verification performed

- Public client production build passes after the transparency API correction.
- Backend TypeScript production build passes.
- CMS TypeScript/Vite production build passes.

