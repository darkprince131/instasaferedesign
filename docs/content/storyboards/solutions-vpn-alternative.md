# Storyboard — solutions-vpn-alternative

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/vpn-alternative  —  VPN Alternative
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: VPN ALTERNATIVE
H1: Your VPN was built for a world where the office was the perimeter.
Sub: That world is gone. Replace network-level trust with per-session, per-app verification — deployed in days, migrated in stages.
CTA: Book a Demo | Compare VPN vs ZTNA ↓
3.0 | Stat strip | 00q FilterStream |  | Data ribbon — mono, trailing underscore | none | quiet / grid off | see Component Roles
4.0 | Plain answer — Why is everyone replacing VPNs? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | instrument / grid on | see Component Roles
4.0 |  |  |  | The VPN was a genuinely good answer to a 1990s question: how does a travelling employee reach the office network? Extend the network to them through an encrypted tunnel. The design assumed three things that are no longer true — applications live in the office (now: cloud and SaaS everywhere), remote access is the exception (now: the norm), and being on the network is roughly equivalent to being trustworthy (now: the single most exploited assumption in security).

Four structural problems follow, and no VPN configuration fixes them, because they're the design:

**1. Network-level access.** The VPN's product *is* network membership. Every connected user — and every attacker holding a connected user's credentials — is on the inside. Lateral movement isn't a VPN bug; it's the purchase.

**2. A visible, high-value target.** VPN concentrators must listen on the public internet, which makes the
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | The comparison (C20 full table) | 00ak IzVpnZtnaFlow |  | Segmented ON/OFF control + cone diagram | -> /compare | dense / grid off | see Component Roles
6.0 |  |  | TRADITIONAL VPN | INSTASAFE ZTNA
6.0 |  |  | Access granted | Entire network segment  One application per session
6.0 |  |  | Lateral movement | Inherent                No path exists
6.0 |  |  | Internet footprint | Concentrator exposed    Blackened — drop-all + SPA Stolen credential =       Network foothold        Dead end (MFA + device gate)
6.0 |  |  | Traffic path | Backhaul via box        Direct, split-plane
6.0 |  |  | Vendor sees data | Via appliance/cloud     Never — control plane only
6.0 |  |  | Device health check | None/minimal            25 checks, 144 rules
6.0 |  |  | Per-user policy | Coarse                  21 combinations, per group
6.0 |  |  | Visibility | Connection logs         202 event types, replayable privileged sessions
6.0 |  |  | Scaling | Hardware purchase       Configuration change
6.0 |  |  | Deployment | Weeks + appliances      Days, software only
6.0 |  |  | MFA | Third-party add-on      Built in, 6 methods
7.0 | SIGNATURE INTERACTIVE | SIGNATURE — Migration timeline |  | What changes in week 1 / 4 / 12. The objection that actually blocks the deal. | anchor: /solutions/vpn-alternative#signature — link to it from the hero | instrument / grid on | Vertical timeline, no motion
8.0 | Migration confidence (the real objection, answered) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
8.0 |  |  |  | H3: Switching is staged, not surgical.
8.0 |  |  | STAGE 1 | InstaSafe deploys alongside the VPN. Pilot group (typically IT + one business team) moves first. VPN untouched.
8.0 |  |  | STAGE 2 | Expansion by team. Access policies mirror your existing AD groups — the access model migrates, not just the tunnel.
8.0 |  |  | STAGE 3 | Per-team VPN decommission as migration completes. Rollback path intact throughout. [CONFIRM real typical durations — Shiba. Do not publish invented weeks.] No hardware ordered. No network re-architecture. No user retraining — the portal is simpler than the VPN client it replaces.
9.0 | Privacy First (the differentiator vs cloud-SASE replacements) | 00ak IzVpnZtnaFlow |  | Segmented ON/OFF control + cone diagram | -> /compare | airy / grid on | see Component Roles
9.0 |  |  |  | Replacing a VPN with a cloud security vendor that inspects all your traffic swaps one trust problem for another: now the *vendor* is inside everything, and a vendor compromise is your compromise. InstaSafe's split-plane architecture refuses that trade — the control plane (ours) makes decisions; the data plane (yours) carries traffic directly between your users and your applications. [→ /why-instasafe/privacy-first for the full architecture and the "what we can and cannot see" table.]
10.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
11.0 | What you can retire / consolidate | 00ac IzSignalGrid |  | Capability chip field — EVERY CHIP LINKS OUT | -> feature pages | quiet / grid off | see Component Roles
11.0 |  |  |  | · VPN concentrators and their licensing/refresh cycle
· Separate MFA bolt-on for remote access
· Jump-box sprawl for admin access (session recording replaces it)
· Access spreadsheets (the portal IS the entitlement record)
12.0 | Alternatives landscape (educational, honest — from old-site FAQ, upgraded) | IzQuietBand  [NEW] |  | One sentence, 300 weight, huge, airy | none | instrument / grid on | see Component Roles
12.0 |  |  |  | Buyers comparing options will meet these terms: **Proxy servers** (hide/route traffic; no identity-device policy), **RDP** (remote machine control; not an access architecture), **CASB** (governs SaaS usage; doesn't deliver private-app access), **SDP** (the architecture family InstaSafe implements — software-defined perimeter with dark infrastructure), **ZTNA** (the category name for SDP-style least-privilege access). If your driver is replacing VPN for workforce/third-party access to private applications, the category you want is ZTNA/SDP; the others solve adjacent problems.
13.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
14.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | dense / grid off | see Component Roles
14.0 |  |  | 01 — THE BREACH THAT DOESN'T SPREAD | A compromised session is one session — architecture, not detection.
14.0 |  |  | 02 — FASTER FOR USERS, INVISIBLE TO ATTACKERS | Direct connections beat backhaul; blackened gateways beat scanners.
14.0 |  |  | 03 — SECURITY THAT SCALES LIKE SOFTWARE | From 200 to 20,000 users without a purchase order for boxes.
15.0 | FAQs (consolidated from old site's 17 — the ten worth keeping, rewritten) | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | quiet / grid off | see Component Roles
15.0 |  |  | Q | What can I use instead of a VPN? A: For secure workforce/third-party access to private applications, the replacement category is ZTNA (built on SDP architecture): verify user + device + context, then connect to a single application, never the network. Proxies, RDP, and CASB solve adjacent problems, not this one.
15.0 |  |  | Q | How is Zero Trust different from a VPN? A: A VPN grants network membership after one check at the door. Zero Trust grants application access after continuous checks of user, device, and context — and never grants network membership at all.
15.0 |  |  | Q | Is switching disruptive? A: It's staged: run alongside the VPN, migrate by team, decommission per-team with rollback intact. Users get a simpler experience than the VPN client.
15.0 |  |  | Q | Will it work with our existing infrastructure? A: Yes — it syncs your existing directory, sits in front of apps wherever they run (on-prem, private, public cloud), and requires no network re-architecture.
15.0 |  |  | Q | What about latency? A: Split-plane, direct connections remove the backhaul hairpin — the usual experience is faster than VPN, not slower.
15.0 |  |  | Q | Are VPNs actually insecure or just old? A: Both structurally exposed (public listeners with recurring critical CVEs) and structurally over-permissive (network-level access). Age isn't the problem; the design assumptions are. [SOURCE NEEDED for CVE claim]
15.0 |  |  | Q | Does Zero Trust mean we throw the VPN out on day one? A: No — Zero Trust is a strategy; migration is incremental by design. Many customers run both during transition. [CONFIRM: any long-term coexistence cases — Shiba]
15.0 |  |  | Q | Is ZTNA a long-term bet? A: It's the model NIST SP 800-207 codifies and the direction of the entire category. The strategy outlives any product cycle.
15.0 |  |  | Q | Can InstaSafe MFA protect the VPN we haven't replaced yet? A: Yes — via RADIUS/TACACS+, InstaSafe MFA hardens Cisco AnyConnect, Juniper, Palo Alto and similar today, and eases the later migration.
15.0 |  |  | Q | What does the vendor (you) see of our traffic? A: Authentication metadata, policy decisions, exported logs. Never application data — split plane means your traffic doesn't transit us. ``` **Related:** ZTNA · Privacy First · Pricing · Secure Remote Access · What is Zero Trust --- ---
16.0 | Interstitial | IzLogTape  [NEW] |  | Sanitised console log strip, single line, mono. Pure texture — may hide on mobile. | none | quiet / grid off | identical
17.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
17.0 |  |  |  | ZTNA · Privacy First · Pricing · Secure Remote Access · What is Zero Trust
18.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
19.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
