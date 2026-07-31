# Storyboard — why-instasafe-privacy-first

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/why-instasafe/privacy-first  —  Privacy First (deep-dive)
Archetype: A5 COMPANY   |   Volume 4   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: PRIVACY FIRST
H1: Your traffic is none of our business. Architecturally.
Sub: Not a policy promise. A design constraint: application data flows directly between your users and your apps — never through InstaSafe.
CTA: Book a Demo | Read the Architecture ↓
3.0 | The problem with the standard model | 00x GridCards |  | 3-up problem cards, caps mono headline | none | quiet / grid off | see Component Roles
3.0 |  |  |  | The dominant cloud-security architecture routes your traffic through the vendor's cloud for inspection. It works — and it concentrates risk: the vendor becomes the single most privileged party in your infrastructure, their breach becomes your breach (supply-chain incidents have made this concrete [SOURCE NEEDED — cite a documented case via Sikha]), their outage becomes your outage, and your regulator's data-path questions acquire a foreign middle-box answer.
4.0 | SIGNATURE INTERACTIVE | SIGNATURE — IzSplitPlane [NEW] (shared) |  | Same component as /why-instasafe. Build once, use three times. | anchor: /why-instasafe/privacy-first#signature — link to it from the hero | instrument / grid on | Static SVG
5.0 | The split-plane design (diagram section — reuse homepage split-plane visual) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | airy / grid on | see Component Roles
5.0 |  |  | CONTROL PLANE (InstaSafe) | DATA PLANE (Yours)
5.0 |  |  | Authentication decisions | Application traffic
5.0 |  |  | Policy evaluation | User ↔ gateway ↔ app, direct
5.0 |  |  | Device posture verdicts | Encrypted end-to-end on your path Logging & audit events             Never enters InstaSafe infrastructure ``` The controller decides; the gateway (deployed at your edge, in your VPC, in your DC) enforces; traffic flows the short way. If InstaSafe's cloud vanished mid-session, your data path wouldn't notice.
6.0 | The signature table — what we can and cannot see | 00ao IzTabSwitch |  | Copy + CTA left, tabs beneath, panel right | none | dense / grid off | see Component Roles
6.0 |  |  | WE SEE | WE NEVER SEE Authentication attempts & results  Your application data Policy decisions & reasons         Your files and their contents
6.0 |  |  | Device posture verdicts | Your database queries & results Session metadata (who/when/what    Your screen contents app/from where)                  Your keystrokes
6.0 |  |  | Logs you choose to export | Your traffic payloads ``` No competitor publishes this table. That's the point of publishing it. **What this buys you (three outcomes)** — supply-chain blast radius excludes your data · sovereignty and DPDP data-path questions get a clean answer · vendor trust becomes verifiable architecture instead of contractual hope. **FAQs** — how do you inspect for threats without seeing traffic (we're an access-control layer, not a traffic-inspection proxy — pair with your existing inspection where you need DPI; honest scope) · can this be audited (architecture documentation and the Trust Center support
7.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
8.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
9.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
