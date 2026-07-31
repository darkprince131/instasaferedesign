# Storyboard — platform

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform  —  Platform Overview
Archetype: A0 HUB   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: INSTASAFE ZTNA PLATFORM
H1: Access control that works the way your network actually does.
Sub: Identity, device, network, and application — every layer verified on every request. One console, one agent, one policy engine.
CTA: Book a Demo | Explore the Platform ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Stat strip | 00q FilterStream |  | Data ribbon — mono, trailing underscore | none | instrument / grid on | see Component Roles
5.0 | Plain answer — What is the InstaSafe platform? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | airy / grid on | see Component Roles
5.0 |  |  |  | Most security tools answer one question. A VPN answers "can this person reach the network?" An MFA tool answers "is this password really theirs?" A posture tool answers "is this laptop safe?" The problem: attackers only need one of those answers to be wrong.

InstaSafe asks all of them at once, on every single access request. Before a user reaches any application — a web app, a remote desktop, an SSH server, a database — the platform verifies who they are, checks the device they're using, evaluates where and when the request is coming from, and then opens a connection to that one application only. Not to the network. Not to anything adjacent. One user, one app, one encrypted tunnel, one logged session.

That is Zero Trust in practice: no request is trusted because of where it comes from, and no user gets more than they need. (New to the concept? Start with [What is Zero Trust →] /resourc
6.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
7.0 | The four layers (C23 Console Rows) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | quiet / grid off | see Component Roles
7.0 |  |  | IDENTITY (IAM) | Who is asking? Directory sync (AD, LDAP, Azure AD, Google Workspace, O365), 8 configurable auth profiles, 6 MFA methods, SSO to every provisioned app.
7.0 |  |  | DEVICE | What are they asking from? 25 posture check types across 144 named rules and 1,500+ OS/device combinations. Device binding ties each session to an approved, certificated device.
7.0 |  |  | NETWORK (ZTNA) | How do they connect? Server blackening and a drop-all gateway make assets invisible to the internet. Per-session tunnels at the IP layer for thick clients and network protocols.
7.0 |  |  | APPLICATION (ZTAA) | What exactly can they touch? 7 app types through one portal — FQDN, WEB, RDP, SSH, VNC, DB, WFS — with session recording, watermarking, and clipboard control on sensitive apps.
8.0 | The Trust Engine (A2 canonical block — reuse verbatim) | 00ae IzPanel / IzJson |  | Live console panel, sanitised data | -> /platform/trust-engine | instrument / grid on | see Component Roles
8.0 |  |  |  | Every access request passes through one decision engine.
Identity, device posture, location, time, and risk score —
evaluated together, per session, before a single packet reaches the app.
21 policy combinations · 12 risk triggers · 4 automatic responses
Decision time: milliseconds. Trust assumed: zero.
```
Supporting copy: The Trust Engine is not a marketing name for a firewall rule. It is the policy evaluation layer of the InstaSafe controller. Administrators combine identity, device, location, time, and risk conditions into 21 possible policy combinations. Twelve trigger types — impossible-travel logins, posture drift, repeated failures, unusual hours, and more — feed the risk score. Four automatic responses are available when risk crosses a threshold: step-up MFA, session restriction, alerting, and session termination. Every decision is logged as one of 202 event types.
9.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
10.0 | How a request actually flows (numbered walkthrough — scroll section) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
10.0 |  |  | 01 | REQUEST      User opens the InstaSafe agent or browser portal and requests an application. Nothing on your network has responded yet — assets sit dark behind a drop-all gateway.
10.0 |  |  | 02 | IDENTITY     The controller checks the directory (your AD/LDAP/IdP or InstaSafe's built-in directory) and enforces the auth profile: password plus the MFA method you've configured for this user group.
10.0 |  |  | 03 | DEVICE       The agent reports posture — OS version, patching, antivirus, firewall state, disk encryption, and up to 25 check types. The device certificate is matched against the binding record.
10.0 |  |  | 04 | CONTEXT      Location, IP range, time window, and behavioural signals are scored against policy. Anomalies raise risk; risk can trigger step-up authentication or denial.
10.0 |  |  | 05 | CONNECT      Only now does the gateway open — a single encrypted tunnel from this device to this application. The network itself is never exposed. The session is logged, and for privileged access, recorded.
11.0 | Quick scan — platform specs | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | quiet / grid off | see Component Roles
11.0 |  |  | App types | 7 (FQDN, WEB, RDP, SSH, VNC, DB, WFS)
11.0 |  |  | DB drivers | PostgreSQL, MSSQL, SQL Server (GA); Oracle, Elasticsearch (beta); ClickHouse, MongoDB (alpha)
11.0 |  |  | Auth profiles | 8 · MFA methods: 6 · User providers: 3
11.0 |  |  | Device checks | 25 types · 144 named rules · 1,500+ OS/device combos
11.0 |  |  | Access policies | 21 combinations
11.0 |  |  | Risk engine | 12 trigger types · 4 auto-actions
11.0 |  |  | Logging | 202 event types · 11 report types · 7 SIEM export formats
11.0 |  |  | Auth protocols | SAML 2.0, OAuth, OpenID Connect, RADIUS, TACACS+, JWT, CAS
11.0 |  |  | Directory sync | AD, LDAP, Azure AD, Google Workspace, O365
11.0 |  |  | Client OS | Windows, macOS, Linux; mobile apps; clientless browser mode
11.0 |  |  | Deployment | Cloud controller [CONFIRM hybrid/on-prem options — Sachin]
11.0 |  |  | Standards | NIST SP 800-207, CSA SDP, PCI DSS, HIPAA, GDPR, SOX, ISO 27001
12.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
13.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | airy / grid on | see Component Roles
13.0 |  |  | 01 — ONE PLATFORM, NOT FIVE TOOLS | ZTNA, ZTAA, IAM, MFA, SSO, and endpoint controls from one console. Retire the VPN, the separate MFA vendor, and the access spreadsheets.
13.0 |  |  | 02 — INVISIBLE INFRASTRUCTURE | Server blackening means your applications don't appear on the internet at all. Attackers can't scan what doesn't respond.
13.0 |  |  | 03 — YOUR DATA NEVER TOUCHES US | Split-plane architecture: InstaSafe runs the control plane; your data flows directly between your users and your apps. [→ Privacy First] ``` **Deployment & rollout** — Typical rollout: pilot group in week one, staged expansion by team, VPN decommission for migrated users with rollback intact. [CONFIRM real timeline — Shiba]. No hardware. No network re-architecture.
14.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | dense / grid off | see Component Roles
14.0 |  |  | Q | Is InstaSafe a VPN? A: No. A VPN connects a device to a network. InstaSafe connects a verified user on a verified device to a specific application, without exposing the network at all. See VPN Alternative for the full comparison.
14.0 |  |  | Q | Do we have to replace our identity provider? A: No. InstaSafe syncs with AD, LDAP, Azure AD, Google Workspace, and O365, or can act as your identity provider if you don't have one.
14.0 |  |  | Q | What does the end user actually experience? A: A portal (or agent) showing the applications they're allowed to use. One login, MFA as configured, one click per app. Access decisions happen in milliseconds in the background.
14.0 |  |  | Q | What can InstaSafe see of our traffic? A: Authentication metadata, policy decisions, and the logs you export. Application data flows directly between your users and your apps — the split-plane design means it never transits InstaSafe infrastructure.
14.0 |  |  | Q | How long does deployment take? A: Days, not weeks — the controller is cloud-delivered and gateways are software. [CONFIRM typical figures — Shiba]
14.0 |  |  | Q | Which compliance frameworks does this support? A: The architecture aligns with NIST SP 800-207 and CSA SDP, and supports controls required by PCI DSS, HIPAA, GDPR, SOX, ISO 27001, and India's DPDP Act. See the Trust Center for mappings. ``` **Related:** ZTNA · ZTAA · IAM · Why InstaSafe · Pricing --- ---
15.0 | Interstitial | IzLogTape  [NEW] |  | Sanitised console log strip, single line, mono. Pure texture — may hide on mobile. | none | quiet / grid off | identical
16.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | instrument / grid on | see Component Roles
16.0 |  |  |  | ZTNA · ZTAA · IAM · Why InstaSafe · Pricing
17.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
18.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
