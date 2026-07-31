# Storyboard — solutions-database-access

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/database-access  —  Secure Database Access
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: DATABASE ACCESS
H1: The most sensitive systems have the most shared passwords.
Sub: Identity-bound, posture-gated, fully logged database sessions — the connection-string spreadsheet retires.
CTA: Book a Demo
3.0 | Plain answer | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Databases hold the data every regulation is about, yet database *access* is often the least-governed path in the company: connection strings in wikis and code, shared service accounts with no human attribution, network-level reachability from entire office subnets, and DB-native logs that name accounts, not people.

InstaSafe treats the database as a first-class app type (the DB in the 7): a DBA or analyst authenticates as themselves (MFA, device, context), receives a per-session tunnel to the specific database, and every session is attributed and logged like any other. Engine credentials can sit behind the platform instead of in circulation.
4.0 | Engine support — always stated exactly | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
4.0 |  |  | GA | PostgreSQL · MSSQL · SQL Server
4.0 |  |  | BETA | Oracle · Elasticsearch
4.0 |  |  | ALPHA | ClickHouse · MongoDB ``` [Guardrail: beta/alpha status appears wherever DB access is claimed. No GA claims for beta/alpha engines anywhere on the site.] **Three outcomes:** human attribution reaches the data layer · database reachability drops from subnet-wide to session-scoped · access review for the auditors' favourite systems becomes an export. **FAQs** — how it differs from DB-native users (adds the human identity, MFA, device, and context layer in front; native RBAC still governs inside) · tool compatibility (standard clients connect through the brokered session [CONFIRM client/driver spe
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | ZTAA · Privileged Access · DevOps Security
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
