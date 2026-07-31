# Storyboard — industries-fintech

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/industries/fintech  —  Fintech
Archetype: A4 INDUSTRY   |   Volume 3   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: FINTECH
H1: Ship fast. Just don't ship your attack surface.
Sub: Zero Trust that developers don't feel — repos, pipelines, staging, and production behind identity instead of behind hope.
CTA: Book a Demo
```

**Regulatory strip:** RBI (as applicable to product) · NPCI ecosystem requirements · PCI DSS · DPDP Act · SOC 2-driven partner expectations [Legal review; NPCI phrasing especially]
3.0 | The sector's access problem | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Fintechs live a double life: startup velocity on one side, bank-partner due diligence on the other. The velocity side leaves classic exposure — Jenkins on a public IP, SSH open "temporarily," staging environments with production data. The partnership side means every bank, NPCI-ecosystem integration, and enterprise customer will send a security questionnaire asking precisely about access control, privileged access, and vendor management — and "we're a startup" stopped being an acceptable answer at the first million users.
4.0 | Where InstaSafe lands | IzWhereItLands  [NEW] |  | 5-row matrix — EVERY ROW LINKS to its solution page | -> solutions cluster | instrument / grid on | see Component Roles
4.0 |  |  |  | DEV VELOCITY, GOVERNED   SSH/Git/CI/CD via the portal — invisible to the internet, unchanged workflows. [→ DevOps Security]
4.0 |  |  | PROD/STAGING SPLIT | Different tiles, different policies, different MFA strength — not different subnets and hope.
4.0 |  |  | DUE-DILIGENCE ANSWERS | The questionnaire section on access control answers from the console: MFA everywhere, recorded privileged sessions, leaver = one action, 202 event types to your SIEM.
4.0 |  |  | DATA-LAYER DISCIPLINE | Identity-bound DB sessions (GA engines; beta/alpha stated) end the shared-connection- string era before an auditor finds it. ``` **Three outcomes:** the security questionnaire becomes a strength · developer experience survives (this is the adoption battle; the portal wins it) · scaling headcount doesn't scale access chaos — groups and profiles absorb growth. **FAQs** — will devs revolt (workflows unchanged — terminal and browser as before; MFA rides the SSO session) · we're pre-compliance-team, where to start (SSO+MFA week one; dark the dev stack week two; recording on prod access week three —
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | DevOps Security · Database Access · Compliance · Pricing
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
