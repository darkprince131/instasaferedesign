# Storyboard — solutions-legacy-apps

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/legacy-apps  —  Legacy Application Access
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: LEGACY APPLICATIONS
H1: The app that runs the business predates the security it needs.
Sub: MFA, device checks, and modern access control for systems that can't be modified — enforcement in front, not code changes inside.
CTA: Book a Demo
3.0 | Plain answer | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Every established organisation runs software that predates modern identity: the client-server ERP module, the AS/400 green screen, the plant application last updated when its vendor existed. These systems can't speak SAML, can't add MFA, and can't be replaced on any timeline security teams control — yet they frequently hold the most operationally-critical data in the company.

The Zero Trust move is enforcement *in front of* the application rather than inside it. The legacy app doesn't change at all; it simply becomes unreachable except through InstaSafe — where MFA, device binding, posture, context, and logging all happen before any packet arrives. ZTNA's IP-layer tunnels carry thick clients and odd protocols; ZTAA's portal wraps RDP-delivered and web-wrapped legacy front-ends; RADIUS/TACACS+ modernise auth on network-adjacent gear.

**Three outcomes:** the unpatchable becomes the unrea
4.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | instrument / grid on | see Component Roles
4.0 |  |  |  | ZTNA · ZTAA · Manufacturing/Energy industry pages
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
7.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
