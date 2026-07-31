# Storyboard — platform-ztaa

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/ztaa  —  Zero Trust Application Access
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: ZERO TRUST APPLICATION ACCESS
H1: One portal. Every app. No network exposed.
Sub: Web apps, remote desktops, SSH, databases, file servers — opened from a browser, governed per session, invisible to everyone else.
CTA: Book a Demo | Try the Portal ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Plain answer — What is ZTAA? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | airy / grid on | see Component Roles
5.0 |  |  |  | Zero Trust Application Access delivers applications instead of networks. Where ZTNA opens a narrow tunnel at the network layer, ZTAA goes one step further up: the user never touches the network at all. They open a browser, sign in once, and see a portal of tiles — only the applications they've been provisioned. Click a tile and the application opens, whether it's an internal web app, a Windows remote desktop, an SSH terminal, a database console, or a file share.

Because everything is brokered at the application layer, ZTAA can govern what happens *inside* the session, not just whether it starts: recording the screen for privileged sessions, watermarking content, blocking copy-paste out of a sensitive app, controlling downloads.

For the person who has never heard any of these acronyms, the honest summary is: your team gets one bookmark that safely contains their entire toolkit, and you
6.0 | With ZTAA you can (5 quick claims — old-site content, sharpened) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
6.0 |  |  |  | · Blacken your infrastructure — apps invisible except to provisioned users
· Grant access on a need-to-know basis, per user, per app
· Admit only approved, posture-compliant devices
· See every session: who, what, when, from where, doing what
· Scale from 50 users to 50,000 without new hardware
7.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
8.0 | Features grouped by job (C20 tabs — full detail) | 00ao IzTabSwitch |  | Copy + CTA left, tabs beneath, panel right | none | instrument / grid on | see Component Roles
9.0 | SIGNATURE INTERACTIVE | SIGNATURE — App Portal Simulator |  | Pick a role -> see which of 12 app tiles appear. Built on 00ai blind-mode shell. | anchor: /platform/ztaa#signature — link to it from the hero | instrument / grid on | Role picker + static tile grid
10.0 | TAB 1 — CONNECT ANYONE | 00ao IzTabSwitch |  | Copy + CTA left, tabs beneath, panel right | none | dense / grid off | see Component Roles
10.0 |  |  |  | 7 APP TYPES, ONE PORTAL FQDN, WEB, RDP, SSH, VNC, DB, WFS. The engineer's SSH session, the finance team's ERP, the auditor's read-only web view — one URL, one login, per-user tiles.
10.0 |  |  | CLIENTLESS FOR WEB APPS | Third parties and BYOD users need only a browser. No agent to install on devices you don't own or manage. [→ Clientless Access page]
10.0 |  |  | AGENT FOR THICK ACCESS | A lightweight agent handles RDP/SSH/thick sessions with silent, certificate-based device identity.
10.0 |  |  | DATABASE ACCESS | Direct, policied access to database engines: PostgreSQL, MSSQL, and SQL Server generally available; Oracle and Elasticsearch in beta; ClickHouse and MongoDB in alpha. DBAs connect through the portal with the same identity, posture, and logging as every other session — no shared credentials in a vault spreadsheet. [Beta/alpha status must be stated wherever DB access is claimed.]
11.0 | TAB 2 — CONTAIN EVERY SESSION | 00ao IzTabSwitch |  | Copy + CTA left, tabs beneath, panel right | none | quiet / grid off | see Component Roles
11.0 |  |  | PER-APP ENCRYPTED TUNNEL | No shared segment; sessions can't see each other.
11.0 |  |  | SESSION RECORDING | Full replay for privileged sessions — the audit answer for "what exactly did the vendor do on that server?"
11.0 |  |  | CLIPBOARD CONTROL | Copy/paste out of designated apps blocked by policy.
11.0 |  |  | WATERMARK OVERLAY | User identity rendered over sensitive screens; leaked screenshots identify their source.
11.0 |  |  | DOWNLOAD/UPLOAD POLICY | Per-app file movement rules.
11.0 |  |  | INACTIVITY TIMEOUT | Idle sessions die automatically. ``` [Guardrail: do NOT claim screenshot-blocking, print-blocking, or keylogger DLP.]
12.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
13.0 | TAB 3 — PROVE EVERYTHING | 00ao IzTabSwitch |  | Copy + CTA left, tabs beneath, panel right | none | airy / grid on | see Component Roles
13.0 |  |  |  | 202 event log types — logins, failures, posture results, policy
decisions, session starts/ends, in-session actions.
11 built-in report types — access summaries, device reports, user
activity, authentication summaries.
7 SIEM export formats — feed Splunk-class tooling [CONFIRM named list].
14.0 | TAB 4 — DECIDE PER REQUEST | 00ao IzTabSwitch |  | Copy + CTA left, tabs beneath, panel right | none | dense / grid off | see Component Roles
14.0 |  |  |  | 21 policy combinations · 12 risk triggers · 4 auto-actions — the same
Trust Engine that governs ZTNA governs every ZTAA session. Risk rising
mid-session can force re-authentication or kill the session.
15.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
16.0 | Use cases (expanded) | 00ah IzUseCaseSwitch |  | Accordion left + own visual per tab right | none | instrument / grid on | see Component Roles
16.0 |  |  | WORKFORCE ACCESS | Employees get their full toolkit in one portal, on managed or personal devices, with MFA and posture invisible until something's wrong.
16.0 |  |  | THIRD-PARTY / VENDOR ACCESS | Contractors reach exactly the systems in scope, clientless, time-boxed, recorded. Contract ends → one deprovisioning action. [→ Third-Party Access solution]
16.0 |  |  | DEVOPS TOOLING | GitLab, Jenkins, Jira, staging servers, SSH — governed and hidden from the internet, without changing how developers work. [→ DevOps Security]
16.0 |  |  | PRIVILEGED SESSIONS | Admin RDP/SSH with recording on: the lightweight answer to the audit finding that says "no oversight of privileged access."
16.0 |  |  | BYOD | Personal devices use the clientless portal with watermark + clipboard + download controls, so corporate data is used but never *kept* on the device. [→ BYOD solution]
17.0 | Quick scan — ZTAA specs | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | airy / grid on | see Component Roles
17.0 |  |  | Access model | Application-layer brokering (browser portal + agent)
17.0 |  |  | App types | FQDN, WEB, RDP, SSH, VNC, DB, WFS
17.0 |  |  | DB engines | PostgreSQL/MSSQL/SQL Server GA · Oracle/Elasticsearch beta · ClickHouse/MongoDB alpha
17.0 |  |  | Session controls | Recording, watermark, clipboard, download, timeout
17.0 |  |  | Identity | SSO (SAML 2.0/OAuth/OIDC), 6 MFA methods, 8 auth profiles
17.0 |  |  | Device | Binding + 25 posture checks (agented); session controls compensate in clientless mode
17.0 |  |  | Logging | 202 event types · 11 reports · 7 SIEM formats
18.0 | Interstitial | IzLogTape  [NEW] |  | Sanitised console log strip, single line, mono. Pure texture — may hide on mobile. | none | quiet / grid off | identical
19.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | quiet / grid off | see Component Roles
19.0 |  |  | 01 — THE NETWORK STOPS BEING THE PRODUCT | Users consume applications; the network disappears from their world and from the attacker's.
19.0 |  |  | 02 — IN-SESSION GOVERNANCE | Recording, watermarking, and clipboard policy turn "we granted access" into "we can prove what happened."
19.0 |  |  | 03 — ONE DOOR TO CLOSE | Joiner-mover-leaver becomes a single provisioning surface across all 7 app types. ``` **Hero interactive — App Portal Simulator** (spec from v1: clickable tiles, watermark demo, blocked-clipboard console message, session timer)
20.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | instrument / grid on | see Component Roles
20.0 |  |  | Q | What's the difference between ZTAA and ZTNA? A: ZTAA brokers access at the application layer — browser portal, session controls, no network path at all. ZTNA opens narrow IP-layer tunnels for apps a browser can't deliver. One platform, both models, used together.
20.0 |  |  | Q | Do users need to install anything? A: For web apps — no, the portal is clientless. For RDP/SSH/thick apps a lightweight agent handles device identity and the tunnel.
20.0 |  |  | Q | Can we record what a vendor does on our server? A: Yes — session recording with replay is per-app policy, typically on for all privileged and third-party sessions.
20.0 |  |  | Q | How granular can app provisioning get? A: Per user, per group, per app, with time windows and location conditions. A user's portal shows only their entitlements.
20.0 |  |  | Q | What stops data leaving through an allowed session? A: Clipboard control, download policy, watermarking, and recording. (We deliberately do not claim screenshot or print blocking.)
20.0 |  |  | Q | Does ZTAA support legacy virtual desktop use cases? A: RDP and VNC through the portal cover most VDI-driven access needs at a fraction of the operational weight. [→ VDI Alternative solution] ``` **Related:** ZTNA · Endpoint Controls · Third-Party Access · DevOps Security · Database Access --- ---
21.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
22.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
22.0 |  |  |  | ZTNA · Endpoint Controls · Third-Party Access · DevOps Security · Database Access
23.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
24.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
