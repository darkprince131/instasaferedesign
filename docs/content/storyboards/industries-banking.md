# Storyboard — industries-banking

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/industries/banking  —  Banking & Financial Services
Archetype: A4 INDUSTRY   |   Volume 3   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: BANKING & FINANCIAL SERVICES
H1: The regulator assumes breach. Your access model should too.
Sub: RBI's cyber security framework, vendor-oversight clauses, and audit calendars — answered with access control that generates its own evidence.
CTA: Book a Demo | Talk to a BFSI Specialist
3.0 | Regulatory strip | IzRegStrip  [NEW] |  | Mono caps marquee, hairline separators | -> /security (Trust Center) | quiet / grid off | see Component Roles
3.0 |  |  |  | RBI CYBER SECURITY FRAMEWORK · RBI IT OUTSOURCING DIRECTIONS ·
DPDP ACT · PCI DSS · ISO 27001 · SEBI (where applicable)
[Legal review of exact framework names/claims before publish — Trust Center owns mappings.]
4.0 | The sector's access problem (plain answer) | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | instrument / grid on | see Component Roles
4.0 |  |  |  | Banks run the widest trust surface in the economy: core banking touched by employees, DR sites, auditors, and an ecosystem of technology vendors; branch networks with shared machines; payment infrastructure under NPCI and PCI obligations; and a regulator whose inspections increasingly ask not "do you have a policy?" but "show me the log."

The legacy answer — VPN concentrators plus jump boxes plus vendor exceptions — fails on exactly the points RBI examiners probe: who precisely can reach the core? how is vendor access supervised? how quickly does a leaver lose everything? what would a stolen credential actually reach?
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Where InstaSafe lands in a bank | IzWhereItLands  [NEW] |  | 5-row matrix — EVERY ROW LINKS to its solution page | -> solutions cluster | dense / grid off | see Component Roles
6.0 |  |  | VENDOR & AMC ACCESS | The sharpest pain first: every technology vendor session scoped to named systems, time-boxed to the engagement, recorded for replay. The IT-outsourcing oversight clause, answered literally.
6.0 |  |  | CORE & ADMIN PLANES | Blackened from the internet; admin access step-up-gated (hardware token / continuous facial), geofenced, and recorded.
6.0 |  |  | BRANCH & OFF-SITE STAFF | Always-On agents on managed devices; posture rules (patch level, AV freshness, encryption) enforced at every connection.
6.0 |  |  | AUDITORS & INSPECTORS | Clientless read-only access — watermarked, download-blocked, fully logged; evidence of the control is the control.
6.0 |  |  | AUDIT & SIEM | 202 event types into the bank's SOC (7 export formats); 11 report types for inspection prep.
7.0 | Spec highlights for BFSI | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | quiet / grid off | see Component Roles
7.0 |  |  |  | 6 MFA methods incl. hardware token + continuous facial for privileged
users · 25 device checks / 144 rules for branch-fleet hygiene · session
recording for privileged + third-party access · geofencing for
admin planes · split-plane: transaction data never transits vendor
infrastructure [→ Privacy First]
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | airy / grid on | see Component Roles
9.0 |  |  | 01 — INSPECTION-READY BY DEFAULT | Access review, vendor oversight, and privileged-session evidence are exports, not projects.
9.0 |  |  | 02 — THE VENDOR CHANNEL STOPS BEING THE SOFT FLANK | Named humans, scoped tiles, recorded sessions, expiring access.
9.0 |  |  | 03 — CORE SYSTEMS LEAVE THE INTERNET | What can't be scanned can't be the next CVE headline.
10.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | dense / grid off | see Component Roles
10.0 |  |  | Q | How does this map to RBI's outsourcing-oversight expectations? A: Third-party access becomes named, scoped, time-boxed, and recorded — the supervisory questions (who, what, when, doing what) answer from the console. Formal clause mappings live in the Trust Center. [Legal review]
10.0 |  |  | Q | Can data residency requirements be met? A: The split-plane design keeps application data on bank-controlled paths; deployment and residency specifics: [CONFIRM — Sachin/legal before publishing commitments].
10.0 |  |  | Q | We run legacy core components that can't do MFA. A: Enforcement sits in front of the application, not inside it — MFA, device, and context gate the path to systems that will never support them natively. [→ Legacy Application Access]
10.0 |  |  | Q | How disruptive is rollout across branches? A: Staged by group alongside existing infrastructure; branch fleets onboard via the agent with posture rules mirroring your endpoint standard. [CONFIRM typical timeline — Shiba] ``` **Related:** Third-Party Access · Privileged Access · Compliance · Privacy First --- ---
11.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
12.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | instrument / grid on | see Component Roles
12.0 |  |  |  | Third-Party Access · Privileged Access · Compliance · Privacy First
13.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
14.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
