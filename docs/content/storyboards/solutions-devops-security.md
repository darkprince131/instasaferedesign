# Storyboard — solutions-devops-security

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/devops-security  —  DevOps Security
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: DEVOPS SECURITY
H1: Secure the pipeline without slowing the pipeline.
Sub: SSH, repos, CI/CD, ticketing, staging — least-privilege access that developers don't feel and attackers can't find.
CTA: Book a Demo
3.0 | Plain answer | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | DevOps toolchains are a breach map: source code in Git, deploy keys in CI, infrastructure access over SSH, and all of it historically reachable, because developer friction is the one cost engineering leaders won't pay. The result at many companies: Jenkins on a public IP "temporarily," SSH open to the world "with keys, so it's fine," staging environments nobody remembers exposing.

The Zero Trust answer keeps the workflow and removes the exposure. Tools go dark behind gateways; developers reach them through the same terminal commands and browser tabs as before — the portal brokers SSH and web access transparently; MFA and posture ride along invisibly; production and staging become separately-policied tiles rather than adjacent hosts.
4.0 | Coverage | 00w FeatureSplit |  | Table skin — sticky first column on mobile | none | instrument / grid on | see Component Roles
4.0 |  |  | SSH | Credentialed, policied, recorded access to servers — per-request validation, no standing open port.
4.0 |  |  | WEB & SAAS TOOLS | Jira, GitLab, Jenkins, Wordpress and internal web tools via the portal — invisible to the internet, identity-and-context gated.
4.0 |  |  | RDP | Windows build/admin boxes with SSO+MFA layered on, recorded where privileged.
4.0 |  |  | DB ACCESS | Direct policied access for the data layer — PostgreSQL/MSSQL/SQL Server GA (Oracle/Elasticsearch beta; ClickHouse/MongoDB alpha).
4.0 |  |  | SEGMENTATION | App-specific tunnels: the intern's staging access and the SRE's production access are different policies, not different subnet hopes.
4.0 |  |  | PRIVACY FIRST | Code and data flow direct — never through vendor infrastructure. For IP-sensitive teams this is the deciding line. ``` **Three outcomes:** the toolchain vanishes from the internet · least privilege without workflow change · privileged activity is logged and replayable (SIEM-ready). **FAQs (from old site, tightened)** — why DevOps access needs securing (CI/CD tools are vulnerable, valuable, and historically exposed; hide + gate + log) · key IT considerations for contractor devs (controlled no-copy access, device approval, app invisibility, VPN replacement) · how InstaSafe helps (controlled per-
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | ZTAA · Database Access · Privileged Access · Endpoint Controls
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
