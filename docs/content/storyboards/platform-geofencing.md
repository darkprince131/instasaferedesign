# Storyboard — platform-geofencing

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/geofencing  —  Geofencing
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Plain answer — What is geofencing? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
2.0 |  |  |  | Geofencing draws geography into access policy: define where legitimate access happens — a country, a region, a radius around a site — and requests from outside the line are denied or challenged, regardless of how good the credentials are. It's the cleanest possible enforcement of facts you already know: your payroll team works from India; your OT vendors work from two named cities; your admin consoles have no business being opened from anywhere else.

**How it composes:** geofencing is one dimension of contextual access — stack it with time windows (inside India AND business hours), device class, and role. Data-residency and sector rules (RBI/IRDAI localisation postures) gain a technical enforcement layer. [Legal wording on compliance claims via Trust Center review.]

**Hero interactive — Drag-the-Pin** (spec from blueprint: map with policy circle; pin inside = granted with console log,
3.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | quiet / grid off | see Component Roles
3.0 |  |  |  | Contextual Access · Trust Engine · Compliance solution
4.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
5.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
6.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
