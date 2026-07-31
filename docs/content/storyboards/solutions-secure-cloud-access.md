# Storyboard — solutions-secure-cloud-access

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/secure-cloud-access  —  Secure Cloud & Multi-Cloud Access
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: SECURE CLOUD ACCESS
H1: Your apps moved to the cloud. Did your access control?
Sub: One identity, one policy engine, one audit trail — across data centre, multi-cloud, and SaaS.
CTA: Book a Demo
3.0 | Plain answer | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Cloud migration quietly fragmented access control. The on-prem ERP sat behind the firewall; its cloud successor sits behind whatever login screen the vendor shipped. Multiply by every migrated workload and every adopted SaaS tool, and the result is dozens of independent front doors with independent (usually password-only) locks — while the security team's controls still guard a data centre that matters less each quarter.

InstaSafe re-unifies the front door: SaaS apps come under SSO+MFA; cloud-hosted private apps (AWS, Azure, Oracle Cloud, IBM Cloud, Digital Ocean) sit behind gateways exactly like on-prem apps; policy and logging are identical everywhere. The user can't tell where an app is hosted — which is the point: neither can the attacker.
4.0 | What unifies | 00ac IzSignalGrid |  | Capability chip field — EVERY CHIP LINKS OUT | -> feature pages | instrument / grid on | see Component Roles
4.0 |  |  | SAAS | SSO (SAML/OAuth/OIDC) + MFA + contextual policy on O365, Zoho, Salesforce, and the rest of the stack.
4.0 |  |  | CLOUD-PRIVATE | Gateways in front of VPC/VNet-hosted apps — blackened, per-session tunnels, posture-gated, same as on-prem.
4.0 |  |  | HYBRID | On-prem policy extends to cloud rather than being rebuilt per platform; overlapping-IP and routing pain disappears because access is app-level, not network-level.
4.0 |  |  | VISIBILITY | One log across all of it — 202 event types, SIEM export. ``` **Three outcomes:** every cloud front door gets the same lock · migration stops meaning security regression · "who touched what, everywhere" is one report. **FAQs** — multi-cloud support (gateways run on all major clouds; policy is uniform) · does SaaS access require the agent (no — SSO path is clientless) · shadow SaaS (apps brought under SSO become visible; discovery of unknown SaaS is a CASB problem — honest scope statement) · latency to cloud apps (direct connections; no forced hairpin). **Related:** ZTAA · SSO · Integrations · P
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | ZTAA · SSO · Integrations · Privacy First
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
