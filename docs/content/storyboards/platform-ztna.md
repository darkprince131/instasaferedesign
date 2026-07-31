# Storyboard — platform-ztna

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/ztna  —  Zero Trust Network Access
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: ZERO TRUST NETWORK ACCESS
H1: Network access that assumes nothing and verifies everything.
Sub: Connect users to IP-layer resources — thick clients, legacy systems, network protocols — without putting your network on the internet.
CTA: Book a Demo | See the Breach Simulator ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Stat strip | 00q FilterStream |  | Data ribbon — mono, trailing underscore | none | airy / grid on | see Component Roles
6.0 | Plain answer — What is ZTNA? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
6.0 |  |  |  | Zero Trust Network Access is the replacement architecture for the corporate VPN. Both solve the same surface problem — letting someone outside the office reach something inside it — but they solve it in opposite ways.

A VPN extends the network out to the user. Once connected, the user's device is effectively *on* the corporate network, able to see and probe far more than the one application they needed. That's why a single stolen VPN credential so often becomes a full network breach: the attacker inherits the network, then moves laterally.

ZTNA inverts this. The network is never extended anywhere. Instead, after the user and device are verified, a narrow encrypted tunnel opens from that device to that one resource. The user gets their application; they get nothing else. There is no network to move laterally across, because from the user's side, no network is visible.

InstaSafe ZTNA do
7.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
8.0 | The problem, concretely (3 cards) | 00x GridCards |  | 3-up problem cards, caps mono headline | none | instrument / grid on | see Component Roles
8.0 |  |  | LATERAL MOVEMENT | One phished credential on a VPN = a foothold on the whole segment. Attackers routinely pivot from an unimportant entry point to crown-jewel systems. ZTNA removes the network between them.
8.0 |  |  | VISIBLE ATTACK SURFACE | Every internet-facing IP is scanned within minutes of going live. VPN concentrators are among the most exploited devices on the internet — each CVE is a race against your patch window. [SOURCE NEEDED — VPN CVE stat]
8.0 |  |  | SCALE AND COST | Concentrator hardware sized for peak load, licensed per box, refreshed every few years. Remote workforce doubled? Buy more boxes. ZTNA is software: scaling is a configuration change.
9.0 | SIGNATURE INTERACTIVE | SIGNATURE — Breach Simulator |  | Steal a credential -> lateral spread on VPN -> contained on ZTNA. Port v3 to .iz. | anchor: /platform/ztna#signature — link to it from the hero | instrument / grid on | 3-tap stepper: steal / spread / switch
10.0 | How InstaSafe ZTNA works (feature depth) | 00am IzProStack |  | Sticky 01/04 stepper — quote pinned per step | -> /platform/trust-engine | dense / grid off | see Component Roles
10.0 |  |  | SERVER BLACKENING | Your gateways run a drop-all policy: any unauthorised packet is silently discarded. Port scans return nothing. To the internet, your infrastructure does not exist. Authorised users reach it through Single Packet Authorization — the gateway only answers callers that have already proven who they are.
10.0 |  |  | PER-SESSION TUNNELS | Each authorised session gets its own encrypted tunnel scoped to one resource. Two apps = two tunnels, each independently policy-checked. Compromising one session yields exactly one session.
10.0 |  |  | DEVICE BINDING | Sessions are tied to an approved device certificate. A valid password on an unapproved laptop fails at the device gate. Administrators review and approve devices before first use, and can revoke instantly. [→ Device Binding page]
10.0 |  |  | DEVICE POSTURE ENFORCEMENT | 25 check types — OS version and patch level, antivirus presence and state, firewall status, disk encryption, and more — evaluated against 144 named rules covering 1,500+ OS/device combinations. Posture drift mid-session can trigger risk actions. [→ Device Posture page]
10.0 |  |  | ALWAYS-ON MODE | The tunnel establishes at device boot, silently, via certificate. Users never "forget to connect"; security teams never depend on user behaviour. [→ Always-On page]
10.0 |  |  | CONTEXT CONTROLS | Geolocation, IP-range, and time-window conditions per user group. A contractor's access can be valid 9–6 IST from India only, and expire with the contract. [→ Contextual Access page]
10.0 |  |  | FULL AUDIT PIPELINE | 202 event types logged; 11 built-in report types; export in 7 SIEM formats. Access answers "who reached what, from which device, when, and what did policy decide" — for every session ever.
11.0 | Quick scan — ZTNA specs | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | quiet / grid off | see Component Roles
11.0 |  |  | Layer | IP (L3/L4) — thick clients, protocols, legacy apps
11.0 |  |  | Companion | ZTAA for application-layer (browser) access
11.0 |  |  | Gateway model | Software gateway, drop-all + SPA
11.0 |  |  | Tunnels | Per-session, per-resource, encrypted
11.0 |  |  | Device trust | Binding (certificate) + posture (25 checks/144 rules)
11.0 |  |  | Auth | Directory sync or built-in IdP; 6 MFA methods
11.0 |  |  | Context policy | Geo, IP, time, risk — 21 policy combinations
11.0 |  |  | Risk engine | 12 triggers, 4 auto-actions
11.0 |  |  | Visibility | 202 event types, 7 SIEM formats, 11 reports
11.0 |  |  | Client | Windows, macOS, Linux agent; Always-On optional
12.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
13.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | airy / grid on | see Component Roles
13.0 |  |  | 01 — BREACH CONTAINMENT BY ARCHITECTURE | Not "we detect lateral movement" — there is no lateral surface. One session compromised = one session lost.
13.0 |  |  | 02 — ZERO INTERNET FOOTPRINT | Blackened servers can't be scanned, fingerprinted, or exploited ahead of patch day.
13.0 |  |  | 03 — VPN RETIREMENT WITHOUT RE-ARCHITECTURE | Runs alongside your VPN during migration. Same apps, same AD groups, staged cutover, rollback intact. ``` **Hero interactive — Breach Simulator** (spec unchanged from v1; scroll-pinned SVG, VPN track vs ZTNA track, ScrollStage pattern with Autoplay + Skip controls)
14.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | dense / grid off | see Component Roles
14.0 |  |  | Q | What is ZTNA in simple terms? A: A way to give people access to specific work applications without giving them access to the network those applications live on. Verify the person and device first; connect them to one app only.
14.0 |  |  | Q | How is ZTNA different from a VPN? A: A VPN puts your device on the corporate network. ZTNA never does — it builds a narrow tunnel to a single application after verifying you and your device. No network access means no lateral movement.
14.0 |  |  | Q | When do I need ZTNA vs ZTAA? A: ZTNA for anything a browser can't reach — thick clients, custom protocols, legacy client-server apps. ZTAA for web apps, RDP, SSH, and databases through the browser portal. Most customers run both; it's one platform.
14.0 |  |  | Q | Does ZTNA work for on-premise apps or only cloud? A: Both. Gateways deploy in front of on-prem data centres, private cloud, and public cloud alike; policy is identical everywhere.
14.0 |  |  | Q | What happens if a user's device fails a posture check mid-session? A: The risk engine can respond automatically — step-up MFA, restriction, alert, or termination — depending on the policy you set.
14.0 |  |  | Q | Is ZTNA suitable long term or a stopgap? A: ZTNA is the architecture VPNs are being replaced with, and the model NIST SP 800-207 describes. It's a strategy, not a patch.
14.0 |  |  | Q | Can attackers scan our gateways? A: Scans receive no response — drop-all plus Single Packet Authorization means the gateway only ever answers pre-authenticated callers. ``` **Related:** ZTAA · Device Posture · Always-On · VPN Alternative · What is Zero Trust --- ---
15.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
16.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | instrument / grid on | see Component Roles
16.0 |  |  |  | ZTAA · Device Posture · Always-On · VPN Alternative · What is Zero Trust
17.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
18.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
