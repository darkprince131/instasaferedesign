# Storyboard — solutions-secure-remote-access

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/secure-remote-access  —  Secure Remote Access
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: SECURE REMOTE ACCESS
H1: Work happens everywhere. Policy should too.
Sub: Employees at home, engineers in the field, vendors on their own laptops — one access model that verifies each of them the same way.
CTA: Book a Demo
3.0 | Plain answer — the problem restated | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | "Remote access" used to be a niche IT service for travelling managers. It is now simply *access* — the default way most work reaches most systems. The tooling never caught up: a VPN for employees, a jump box for admins, TeamViewer-style exceptions for vendors, and nothing coherent for personal devices. Each channel has different security, different logging, and different gaps; attackers pick the weakest.

Secure remote access as InstaSafe defines it: one verification model (user + device + context), one policy engine, one audit trail — with the delivery mechanism varying by need (agent, clientless portal, secure browser), not the security.
4.0 | The access matrix (signature content — quick-scan for experts) | 00w FeatureSplit |  | Table skin — sticky first column on mobile | none | instrument / grid on | see Component Roles
4.0 |  |  | WHO                DEVICE | BEST PATH            CONTROLS THAT CARRY THE LOAD
4.0 |  |  | Employees | Managed laptop    Agent + Always-On    Posture (25 checks), binding, SSO+MFA
4.0 |  |  | Employees | Personal device   Clientless / browser Watermark, clipboard, download policy
4.0 |  |  | Admins             Managed | Agent, ZTAA RDP/SSH  Session recording, step-up MFA, time windows
4.0 |  |  | Contractors | Their own         Clientless portal    Time-boxed access, recording, app scope
4.0 |  |  | Field workforce | Mixed/mobile      Clientless + mobile  Geo + time context, MFA
4.0 |  |  | Auditors | Their firm's      Clientless read-only Watermark, no-download, full logging
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Use cases (from old site, expanded) | 00ah IzUseCaseSwitch |  | Accordion left + own visual per tab right | none | dense / grid off | see Component Roles
6.0 |  |  | COLLABORATION & ERP ACCESS | The daily toolkit through one portal — direct connections, no backhaul, AD/IdP compliance extended to every user wherever they sit.
6.0 |  |  | EXTEND COMPLIANCE OUTWARD | Directory policy, MFA, and posture reach the kitchen-table laptop exactly as they reach the office desktop.
6.0 |  |  | MONITOR EVERYTHING | One dashboard for policy and activity across every access path — 202 event types, no blind channels.
7.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | quiet / grid off | see Component Roles
7.0 |  |  | 01 | ONE MODEL, NO WEAK CHANNEL     The vendor path is as governed as the employee path.
7.0 |  |  | 02 | LOCATION STOPS MATTERING       Same verification at HQ, home, hotel.
7.0 |  |  | 03 | THE AUDIT TRAIL IS COMPLETE    Every access mode logs to one place. ``` **FAQs** — is this just VPN rebranded (no — see VPN Alternative for the architectural difference) · personal devices (clientless + session controls; posture where the agent exists) · offline/poor connectivity field cases (portal is lightweight; [CONFIRM mobile app capabilities — Product]) · what admins see (per-session who/what/where/when + recording where enabled). **Related:** VPN Alternative · Third-Party · BYOD · ZTAA --- ---
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
9.0 |  |  |  | VPN Alternative · Third-Party · BYOD · ZTAA
10.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
11.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
