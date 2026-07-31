# Storyboard — platform-iam

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/iam  —  Identity & Access Management
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: IDENTITY & ACCESS MANAGEMENT
H1: The right user, the right resource, the right time.
Sub: One identity layer across on-prem, cloud, and hybrid — directory sync, SSO, MFA, and risk-based decisions from a single control plane.
CTA: Book a Demo | Trace a Login ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Stat strip | 00q FilterStream |  | Data ribbon — mono, trailing underscore | none | airy / grid on | see Component Roles
6.0 | Plain answer — What is IAM? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
6.0 |  |  |  | Identity and Access Management is the discipline of knowing, at all times, three things: who your users are, what each of them is allowed to touch, and whether the person at the keyboard right now is really that user. Small companies do this informally — a shared spreadsheet, a manager's memory. It stops working at exactly the moment it starts mattering: the first audit, the first departure of a privileged employee, the first phishing wave.

An IAM system makes identity a managed asset. Users live in a directory. Access is granted to roles and groups rather than individuals. Authentication is layered — something you know (password), something you have (phone, hardware key), something you are (fingerprint, face). And when someone leaves, one action removes everything.

InstaSafe's IAM is built into the access platform rather than bolted beside it — which means every identity decision imme
7.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
8.0 | Capabilities (full depth) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
8.0 |  |  | DIRECTORY SERVICES | Sync users and groups from Active Directory, LDAP, Azure AD, Google Workspace, or O365 — or run InstaSafe's built-in directory if you have none. Three provider types can coexist; group structures carry into access policy so your AD groups become your access model.
8.0 |  |  | IDENTITY PROVIDER | InstaSafe acts as IdP across SAML, RADIUS, OpenID Connect, OAuth, JWT, CAS, and TACACS+ — covering modern SaaS, network equipment, and legacy systems from one identity source. Both IdP-initiated and SP-initiated SAML flows are supported, and InstaSafe can equally sit behind your existing IdP as a service provider.
8.0 |  |  | MULTI-FACTOR AUTHENTICATION | Six methods: OTP (SMS/email), T-OTP, PIN, biometric (fingerprint/ facial), push notification, hardware token. Configured per user group through 8 auth profiles — stricter factors for admins, lighter friction for standard roles. [→ MFA page for full depth]
8.0 |  |  | SINGLE SIGN-ON | One authenticated session unlocks every provisioned app tile. [→ SSO page]
8.0 |  |  | RISK-BASED AUTHENTICATION | IP, geolocation, device, and time conditions modulate authentication: a login at 3 a.m. from a new country can demand step-up MFA or be denied outright — policy, not manual review.
8.0 |  |  | ACCESS MANAGEMENT | Role-based and group-based access control; user/group creation; self-serve password reset against Active Directory (a measurable helpdesk-ticket reducer).
8.0 |  |  | PLATFORM COVERAGE | Windows logon MFA, RDP and SSH authentication, VDI support — identity enforcement reaches the operating system, not just the web.
8.0 |  |  | REPORTING | Login activity, authentication summaries, device login reports — 11 report types, exportable, SIEM-ready.
9.0 | Quick scan — IAM specs | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | airy / grid on | see Component Roles
9.0 |  |  | Directory sync | AD, LDAP, Azure AD, Google Workspace, O365, built-in
9.0 |  |  | Provider types | 3 concurrent
9.0 |  |  | IdP protocols | SAML 2.0, RADIUS, OIDC, OAuth, JWT, CAS, TACACS+
9.0 |  |  | Auth profiles | 8 · MFA methods: 6
9.0 |  |  | Risk conditions | IP · geo · device · time
9.0 |  |  | RBAC | Roles, groups, per-app entitlements
9.0 |  |  | OS-level auth | Windows logon, RDP, SSH, VDI
9.0 |  |  | Self-service | AD password reset
10.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
11.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | quiet / grid off | see Component Roles
11.0 |  |  | 01 — ONE SOURCE OF IDENTITY TRUTH | Your directory drives everything; there is no second user list to drift out of date.
11.0 |  |  | 02 — OFFBOARDING IN ONE ACTION | Disable the user once — portal, apps, tunnels, and OS logins all close together.
11.0 |  |  | 03 — AUTHENTICATION THAT MATCHES RISK | Admins get hard factors; the marketing intern gets low friction; anomalies get challenged automatically. ``` **Hero interactive — Login Tracer** (spec from v1: pick method + scenario, watch six gates pass/fail, final console log entry)
12.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | instrument / grid on | see Component Roles
12.0 |  |  | Q | We already have Azure AD. Why do we need this? A: Keep it — InstaSafe syncs from it and enforces it everywhere Azure AD alone can't reach: thick clients, SSH, RDP, network gear via RADIUS/ TACACS+, and OS logons, with device posture in the decision.
12.0 |  |  | Q | Can InstaSafe be our only identity provider? A: Yes. The built-in directory plus IdP protocols cover organisations without an existing directory.
12.0 |  |  | Q | What is risk-based authentication in practice? A: Rules like "outside India → deny," "new device → step-up MFA," "outside 07:00–21:00 → require approval." Conditions stack per group.
12.0 |  |  | Q | Does self-serve password reset really matter? A: Password resets are consistently among the top helpdesk categories [SOURCE NEEDED for public stat]; self-service against AD removes most of them.
12.0 |  |  | Q | How many MFA methods can one user have? A: Multiple methods can be enrolled; the auth profile defines which are acceptable and when step-up is demanded. ``` **Related:** SSO · MFA · Contextual Access · Behavioural Authentication --- ---
13.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
14.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
14.0 |  |  |  | SSO · MFA · Contextual Access · Behavioural Authentication
15.0 | SIGNATURE INTERACTIVE | SIGNATURE — Policy composer |  | Compose a rule from 4 presets, watch it evaluate across the 21 combinations. | anchor: /platform/iam#signature | instrument / grid on | Preset buttons + static verdict
16.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
17.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
