# Storyboard — platform-trust-engine

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/trust-engine  —  The Trust Engine (deep-dive)
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Long-form content (this is the page where depth is the point) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
2.0 |  |  |  | **The inputs.** Five families of signal enter every decision: identity (directory identity, group, auth strength presented), device (binding certificate, 25 posture check results), location (IP, geolocation vs policy and vs history), time (window compliance, historical pattern), and behaviour (deviation score from baseline). None is trusted alone; the decision is the intersection.

**The policy grammar — 21 combinations.** Administrators compose conditions rather than choose from presets: *finance group + managed device + India + business hours → allow with standard MFA; same group, unmanaged device → clientless portal, watermarked, no download; anyone, anywhere, posture-failed → deny and alert.* Twenty-one distinct condition combinations cover the practical policy space without becoming an unmaintainable rules swamp — enough grammar to say what you mean, few enough dimensions to audit.

3.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | quiet / grid off | see Component Roles
3.0 |  |  |  | every platform page links here; this is the hub.
4.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
5.0 | SIGNATURE INTERACTIVE | SIGNATURE — Live policy console + event explorer |  | 21 combinations, 12 triggers, 4 responses, 202 event types — all inspectable. | anchor: /platform/trust-engine#signature | instrument / grid on | Filter chips + static console
6.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
7.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
