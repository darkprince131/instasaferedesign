# Storyboard — industries-insurance

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/industries/insurance  —  Insurance
Archetype: A4 INDUSTRY   |   Volume 3   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: INSURANCE
H1: Your distribution network is your attack surface.
Sub: Agents, brokers, surveyors, TPAs — thousands of external users touching policyholder data. Govern the session, not just the login.
CTA: Book a Demo
```

**Regulatory strip:** IRDAI Information & Cyber Security Guidelines · DPDP Act · ISO 27001 [Legal review]
3.0 | The sector's access problem | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Insurance runs on an extended enterprise: tied agents and brokers on their own devices, surveyors in the field, TPAs processing claims, bancassurance partners inside bank branches — all touching policyholder and health data that DPDP and IRDAI guidance treat as high-sensitivity. The core systems are often long-lived (policy admin platforms that predate modern identity), and the access reality is the widest BYOD estate in financial services.
4.0 | Where InstaSafe lands | IzWhereItLands  [NEW] |  | 5-row matrix — EVERY ROW LINKS to its solution page | -> solutions cluster | instrument / grid on | see Component Roles
4.0 |  |  | AGENT & BROKER PORTALS | Clientless access with MFA, watermarking, and download policy — personal devices contained, policyholder data never persisted locally.
4.0 |  |  | TPA & PARTNER ACCESS | Scoped tiles, time-boxed engagements, session recording — outsourcing oversight with replay.
4.0 |  |  | SURVEYOR FIELD WORK | Geo/time-contextual mobile access to claims systems.
4.0 |  |  | LEGACY POLICY ADMIN | MFA and device gates in front of platforms that can't be modified. [→ Legacy Apps]
4.0 |  |  | HEALTH-DATA HANDLING | Least-privilege scoping + full audit — the access-minimisation posture DPDP expects. ``` **Three outcomes:** the distribution network gets attribution and containment · IRDAI/DPDP access questions answer from logs · legacy core systems gain modern gates without modernisation projects. **FAQs** — thousands of agents, onboarding effort (group-based provisioning; clientless means zero software on agent devices) · seasonal surges (software scaling — policy handles the renewal-season spike) · agent devices we'll never manage (that's the design: contain the session, not the device). **Related:** BYO
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | BYOD · Third-Party Access · Compliance · Clientless
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
