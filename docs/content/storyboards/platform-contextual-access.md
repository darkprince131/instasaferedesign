# Storyboard — platform-contextual-access

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/contextual-access  —  Contextual Access
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Plain answer — What is contextual access? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
2.0 |  |  |  | Identity says who you are; context says whether *this particular request* makes sense. The same valid credentials should not carry the same weight at 11 a.m. from the Bengaluru office laptop and at 3 a.m. from an unrecognised device abroad. Contextual access makes that judgment automatic: every request is evaluated against where it's from, when it's happening, what device it's on, and what role is asking — and policy responds by allowing, denying, restricting, or demanding stronger proof.
3.0 | The five context dimensions | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | quiet / grid off | see Component Roles
3.0 |  |  | IP-BASED | Allow/deny by source ranges — office egress, partner networks, known-bad ranges.
3.0 |  |  | GEOLOCATION | Country/region conditions; the basis of geofencing [→ Geofencing]. Impossible-travel sequences raise risk.
3.0 |  |  | TIME-BASED | Access windows per group — contractors 9–6 weekdays; out-of-hours admin access requires step-up.
3.0 |  |  | DEVICE-BASED | Managed vs BYOD vs unknown — each class gets its own access depth.
3.0 |  |  | ROLE-BASED | The organisational lens that binds the rest: policies attach to roles/groups, so context rules scale without per-user micromanagement.
4.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
5.0 | Concrete wins (from old-site benefits, sharpened) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | airy / grid on | see Component Roles
5.0 |  |  | SINGLE-DEVICE LOGIN | Concurrent-session limits kill shared-credential sprawl. ANOMALY = FRICTION      Location-hopping and odd-hours patterns meet step-up MFA or denial automatically.
5.0 |  |  | CONTRACTOR TIME-BOXING | Access windows that expire with the engagement. REMOTE = COMPLIANT      Company-owned, compliant devices get depth; everything else gets containment. ``` **FAQs** — what it is (risk-aware conditions on every request) · vs plain RBAC (RBAC = what a role may reach; context = whether this request, now, from here, should) · user experience (invisible until anomalous, then one extra factor) · stacking (all five dimensions combine — the 21 policy combinations). **Related:** Geofencing · Trust Engine · IAM · Device Posture --- ---
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | Geofencing · Trust Engine · IAM · Device Posture
7.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
8.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
9.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
