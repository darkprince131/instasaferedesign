# Storyboard — platform-clientless-access

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/clientless-access  —  Clientless / Agentless Access
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Plain answer — What is clientless access? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
2.0 |  |  |  | Most secure-access products start with "install our software." That's fine for the laptops you own and impossible for the ones you don't: a vendor's engineer, an auditor's firm-issued machine, an employee's personal iPad. Clientless access removes the requirement — the user browses to the access portal, authenticates (with MFA), and reaches their permitted web applications directly in the browser. Any OS, any modern browser, nothing installed, nothing to manage on hardware that isn't yours.

The trade is explicit and managed: no agent means no deep posture checks, so clientless sessions lean harder on session controls — watermarking, clipboard policy, download rules, recording — to keep unmanaged devices safely contained.
3.0 | Who it's for | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | quiet / grid off | see Component Roles
3.0 |  |  | THIRD PARTIES | Vendors and partners reach in-scope apps without device negotiations. [→ Third-Party Access]
3.0 |  |  | BYOD | Personal devices work without surrendering to MDM.
3.0 |  |  | FIELD WORKFORCES | Browser-only access for distributed teams on varied hardware.
3.0 |  |  | SURGE SCALE | Hundreds of users onboarded in hours — provisioning is policy, not software rollout. ``` **Features:** detailed audit logs · flexible usage across OS/browser · simplified management (nothing to update on endpoints) · single-click UX. **Scope:** HTML web applications and SaaS apps; RDP/SSH/thick access uses the lightweight agent instead. **FAQs** — retained from old site, tightened: what it is · how it helps hybrid ecosystems (extends secure access beyond employees without agent hassles) · benefits (end-user ease + full admin visibility) · which apps (HTML web + SaaS). **Related:** ZTAA · Secur
4.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
5.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
5.0 |  |  |  | ZTAA · Secure Browser · Third-Party Access · BYOD
6.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
7.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
