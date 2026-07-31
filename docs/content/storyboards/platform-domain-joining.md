# Storyboard — platform-domain-joining

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/domain-joining  —  Domain Joining
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Plain answer — What is domain joining, remotely? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
2.0 |  |  |  | Domain-joined Windows devices are the ones IT can actually govern — group policy, central credentials, enforced configuration. The remote-work era broke the assumption underneath: joining a domain traditionally required being on the corporate network. Result: fleets of remote laptops running outside AD governance entirely.

InstaSafe's domain joining routes the trust the other way: the ZTNA controller brokers the connection between the remote device and your AD (on-prem or Azure AD), letting devices join and stay governed by the domain from anywhere. The AD server itself stays dark — hosted privately, reached only through the gateway, never exposed to the internet.
3.0 | Capabilities | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | quiet / grid off | see Component Roles
3.0 |  |  |  | · Remote join to corporate domain via the controller — no office visit
· GPO reaches remote devices; AD/LDAP compliance extends to the whole fleet
· AD stays private — controller reaches it through the gateway only
· Works with on-prem AD and Azure AD [per old-site FAQ content]
```

**FAQs** — retained and tightened: can you join remotely (yes, controller-driven) · how (AD config in controller admin panel; controller reaches AD per authentication) · does the domain server need exposure (no — private network, gateway-only) · AD vs LDAP (LDAP is the protocol; AD is a directory server that speaks it — the Apache/HTTP analogy kept, it's genuinely good).

**Related:** IAM · Always-On · Device Posture

---
---
4.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
5.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
5.0 |  |  |  | IAM · Always-On · Device Posture
6.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
7.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
