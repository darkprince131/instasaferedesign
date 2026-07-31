# Storyboard — platform-always-on

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/always-on  —  Always-On Connectivity
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Plain answer — What is Always-On? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
2.0 |  |  |  | Every "connect when you need it" security tool shares one flaw: the human who forgets. Always-On removes the human step. The InstaSafe agent establishes the secure tunnel the moment the device boots, authenticating silently with the device certificate and running its checks — binding, posture, geolocation — in the background. The user never sees a connect button; there is nothing to forget, and no unprotected window between boot and login.
3.0 | Why it matters / benefits | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | quiet / grid off | see Component Roles
3.0 |  |  | NO PROTECTION GAP | Public-Wi-Fi work is inside the tunnel from second one.
3.0 |  |  | NO USER DEPENDENCE | Security posture stops varying with individual diligence.
3.0 |  |  | POLICY STILL RULES | Always-on ≠ always-allowed: every application request still passes the Trust Engine.
3.0 |  |  | FLEET SIMPLICITY | Remote devices stay reachable for policy without hardware or manual sessions. Windows, Linux, macOS. ``` **FAQs** — retained from old site, tightened: what it is (auto-tunnel at boot) · benefits (asset protection, public-Wi-Fi safety, leak prevention) · best fit (network-layer applications) · OS support (Windows/Linux/macOS). **Related:** ZTNA · Device Binding · Domain Joining --- ---
4.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
5.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
5.0 |  |  |  | ZTNA · Device Binding · Domain Joining
6.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
7.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
