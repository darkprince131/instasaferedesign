# Storyboard — solutions-privileged-access

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/privileged-access  —  Privileged Access
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: PRIVILEGED ACCESS
H1: The accounts that can break everything deserve more than a stronger password.
Sub: Admin sessions recorded, step-up gated, time-boxed, and invisible from the internet.
CTA: Book a Demo
3.0 | Plain answer | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Privileged accounts — domain admins, root, DBAs, console owners — are minority users with majority blast radius, and every serious framework (ISO 27001, PCI DSS, RBI/SEBI guidance) demands demonstrably stronger control over them. Full PAM suites answer with credential vaulting and rotation; many organisations need the operationally-lighter core first: strong gates on privileged sessions and complete evidence of what happened inside them.
4.0 | The InstaSafe privileged pattern | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
4.0 |  |  | HARDER GATES | Dedicated auth profiles: hardware token / continuous facial for admin groups; step-up on anomaly.
4.0 |  |  | NARROW WINDOWS | Time-boxed admin access; out-of-hours requires explicit policy, not habit.
4.0 |  |  | RECORDED SESSIONS | RDP/SSH privileged sessions recorded for replay — the audit deliverable, and the deterrent.
4.0 |  |  | NO STANDING DOORS | Admin planes blackened like everything else; jump boxes retire.
4.0 |  |  | DB DISCIPLINE | DBA access through identity-bound, logged portal sessions instead of shared connection strings (GA engines; beta/alpha stated).
4.0 |  |  | FULL ATTRIBUTION | Named human → named session → replayable actions. ``` **Honest scope:** InstaSafe is not a password vault and doesn't claim credential rotation — pair with a vault where mandated. [Positioning line; keeps the PAM claim honest.] **Three outcomes:** privileged misuse gets evidence, not mystery · attack surface of admin planes → zero internet footprint · audit findings on privileged oversight close with session replay. **FAQs** — is this PAM (the access-control and session-evidence core of it; not vaulting/rotation — honest scope) · shared root accounts (portal attribution names the human even wh
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Honest scope | IzQuietBand  [NEW] |  | One sentence, 300 weight, huge, airy | none | dense / grid off | see Component Roles
6.0 |  |  |  | InstaSafe is not a password vault and doesn't claim credential rotation — pair with a vault where mandated. [Positioning line; keeps the PAM claim honest.]
7.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | quiet / grid off | see Component Roles
7.0 |  |  |  | ZTAA · MFA (continuous facial) · Trust Engine · Endpoint Controls
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
10.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
