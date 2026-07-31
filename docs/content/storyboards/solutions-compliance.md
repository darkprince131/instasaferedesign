# Storyboard — solutions-compliance

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/compliance  —  Compliance & Regulatory
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: COMPLIANCE
H1: Auditors don't want promises. They want logs.
Sub: Access control that generates its own evidence — 202 event types, 11 reports, session replay, and architecture aligned to NIST SP 800-207.
CTA: Book a Demo | Visit the Trust Center →
3.0 | Plain answer | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Every access-related audit question is a variant of five: who can reach what? · how do you know they are who they claim? · what could they do once in? · how would you know if something went wrong? · prove it. Perimeter architectures answer with diagrams and assurances. Zero Trust architectures answer with records, because the control *is* the evidence: entitlements are the portal's provisioning data, authentication strength is the auth-profile config, session controls are policy objects, and everything that happens is one of 202 logged event types.
4.0 | Framework mapping (summary — full mappings live in Trust Center) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
4.0 |  |  | DPDP ACT (INDIA) | Access minimisation, purpose-scoped access, and the split-plane architecture's data-locality story. [Legal review before specific compliance claims.] RBI / SEBI / IRDAI Sector guidance on access control, MFA, vendor access oversight, and audit trails — third-party session recording answers the outsourcing-oversight clauses directly.
4.0 |  |  | PCI DSS | MFA, least privilege, and access logging for cardholder-adjacent systems.
4.0 |  |  | HIPAA / GDPR | Access minimisation + accounting of access.
4.0 |  |  | ISO 27001 / SOX | Access-control and logging clauses evidenced from the console.
4.0 |  |  | NIST SP 800-207 | The architecture itself — InstaSafe implements the ZTA model the standard describes; CSA SDP alignment alongside. ``` **Three outcomes:** audit prep becomes export, not archaeology · vendor-oversight clauses get session replay as the answer · data-residency posture strengthens (geofencing + split plane + [CONFIRM deployment options — Sachin]). **FAQs** — does using InstaSafe make us compliant (no product makes you compliant — it implements and evidences the access-control family of requirements; scope honesty) · India data residency ([CONFIRM hosting/residency specifics — Sachin/legal before p
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | Trust Center · Privacy First · Industry pages (BFSI/NBFC/Insurance)
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
