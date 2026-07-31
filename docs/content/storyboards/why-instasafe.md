# Storyboard — why-instasafe

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/why-instasafe  —  Why InstaSafe
Archetype: A5 COMPANY   |   Volume 4   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: WHY INSTASAFE
H1: Security that doesn't route through the vendor.
Sub: Most Zero Trust vendors inspect your traffic on their infrastructure. We architected ourselves out of your data path — and publish the numbers others keep vague.
CTA: Book a Demo | See the Architecture ↓
3.0 | The four reasons (C29 slider, full copy) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | quiet / grid off | see Component Roles
4.0 | REASON 1 — PRIVACY FIRST, ARCHITECTURALLY | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
4.0 |  |  |  | The uncomfortable truth of most cloud security: to protect your traffic, the vendor sits inside it. Every packet transits their cloud; a vendor compromise is your compromise; and your data's privacy rests on their infrastructure's integrity. InstaSafe's split-plane design refuses the premise. The control plane (ours) authenticates, evaluates policy, and issues decisions. The data plane (yours) carries application traffic directly between your users and your systems. We can't leak what we never carry. [→ full architecture: /why-instasafe/privacy-first]
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | REASON 2 — DEPTH YOU CAN COUNT | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
6.0 |  |  |  | Security marketing says "granular," "adaptive," "comprehensive." We publish the actual surface: 25 device check types across 144 named rules and 1,500+ OS/device combinations; 21 access policy combinations; 12 risk triggers with 4 automatic responses; 202 logged event types in 11 report formats across 7 SIEM exports; 7 application types in one portal. When a vendor won't give you numbers, ask why. Ours are on every relevant page.
7.0 | REASON 3 — RECOGNISED, AND OLD ENOUGH TO TRUST | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | quiet / grid off | see Component Roles
7.0 |  |  |  | Zero Trust before the category had a name: founded 2012, Gartner-named representative vendor for Zero Trust Access (2018), DSCI- and Gartner-recommended for remote workforce security (2020). Today: 500,000+ endpoints, 150+ enterprises, 100+ Fortune 2000 companies, five continents. Vendor risk is real risk — thirteen years and a Fortune-2000 customer base is the boring, decisive answer.
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | REASON 4 — BUILT FOR INDIA'S REGULATORY REALITY | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | airy / grid on | see Component Roles
9.0 |  |  |  | DPDP-aligned architecture, fluency in RBI/SEBI/IRDAI/NPCI expectations, geofencing and data-path control supporting sovereignty postures, and pricing in a model Indian enterprises can actually procure. Global standards (NIST SP 800-207, CSA SDP, ISO 27001, PCI DSS, HIPAA, GDPR, SOX) with local regulatory literacy — the combination the market lacks. [Legal review on specific framework claims — Trust Center owns mappings.]
10.0 | Comparison matrix (B2 — category-label version until legal clears names) | 00ak IzVpnZtnaFlow |  | Segmented ON/OFF control + cone diagram | -> /compare | dense / grid off | see Component Roles
10.0 |  |  | INSTASAFE   GLOBAL SASE | VPN INCUMBENT   WORKSPACE SUITE
10.0 |  |  | Data transits vendor cloud | Never       Always        Via appliance   Varies
10.0 |  |  | Published product depth | Yes (nos.)  Rarely        No              Partial
10.0 |  |  | Pricing transparency | [Per §A5]   No            No              No
10.0 |  |  | Deploy time | Days        Weeks         Weeks           Weeks
10.0 |  |  | Device posture depth | 25/144      Varies        Minimal         Varies
10.0 |  |  | Clientless third-party path | Yes         Yes           No              Partial DPDP/India regulatory fluency   Yes         Partial       No              Partial
10.0 |  |  | App types in one portal | 7           n/a           n/a             Varies ``` **Values (kept short, from old site)** — Transparency (open architecture, no vendor-side data inspection, published numbers) · Continuous Improvement (kaizen-driven engineering) · Commitment to Results (category-leading retention [CONFIRM claim wording]). **Company timeline** — 2012 founded · 2014 Microsoft Ventures recognition · 2017 Indian Angel Network round · 2018 $2.2M seed (ABM Knowledgeware) · 2018 Gartner ZTA representative vendor · 2020 DSCI + Gartner remote-work recommendations · [2021–2026 milestones — CONFIRM with DJ/Romali: fund
11.0 | SIGNATURE INTERACTIVE | SIGNATURE — IzSplitPlane [NEW] |  | Device -> app direct; ghosted vendor cloud to the side. The claim no competitor can make. | anchor: /why-instasafe#signature — link to it from the hero | instrument / grid on | Static SVG — static anyway
12.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
13.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
