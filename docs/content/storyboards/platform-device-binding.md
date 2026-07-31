# Storyboard — platform-device-binding

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/device-binding  —  Device Authorization & Binding
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: DEVICE BINDING
H1: Credentials say who. Binding says from what.
Sub: Every device is reviewed, approved, and certificated before its first session — and revocable in one click after its last.
CTA: Book a Demo | See the Approval Flow ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Plain answer — What is device binding? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | airy / grid on | see Component Roles
5.0 |  |  |  | Device binding attaches identity to hardware. When a user first connects from a new laptop or phone, the device is registered and held for administrator review. Approve it, and a certificate is installed that cryptographically ties future sessions to that physical machine. From then on, the user's credentials work *from that device* — and a thief with a perfect password but the wrong laptop fails at the device gate.

It also closes quieter risks: the employee's personal desktop quietly added to the pool, the shared login used from six machines, the departed contractor's still-configured laptop. Binding turns "which devices can access us?" from an unknown into a managed list with an owner, an approval date, and a revoke button.
6.0 | How the workflow runs | 00am IzProStack |  | Sticky 01/04 stepper — quote pinned per step | -> /platform/trust-engine | dense / grid off | see Component Roles
6.0 |  |  |  | 1. ENROL      First connection from a new device → registration captured
              (user, device identifiers, posture snapshot).
2. REVIEW     Admin approves or rejects from the console queue. Nothing
              connects while pending.
3. BIND       Approval installs the device certificate; sessions
              thereafter must present it.
4. GOVERN     Per-user device limits (e.g. single-device login),
              posture rules layered on top.
5. REVOKE     Lost, stolen, or retired → certificate revoked, access
              dead instantly, event logged.
```

**Operational note (honest guidance):** approval queues are real work at scale — plan owner and SLA for the review step, and use group-level auto-approval policies where risk allows. [This mirrors real-world ticket patterns in device-approval-heavy deployments.]
7.0 | SIGNATURE INTERACTIVE | SIGNATURE — Approval flow walkthrough |  | 00af IzStepRail — request -> admin review -> bind -> revoke. | anchor: /platform/device-binding#signature — link to it from the hero | instrument / grid on | Tap stepper, 4 panels
8.0 | Quick scan | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | instrument / grid on | see Component Roles
8.0 |  |  | Trust anchor | Per-device certificate
8.0 |  |  | Approval | Admin review before first access; group auto-rules
8.0 |  |  | Limits | Concurrent-device caps per user (single-device login enforceable)
8.0 |  |  | Revocation | Instant, logged
8.0 |  |  | Pairs with | Posture checks (state) — binding covers identity of the machine, posture covers its health
9.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | airy / grid on | see Component Roles
9.0 |  |  | Q | Binding vs posture — what's the difference? A: Binding = is this an APPROVED machine (identity of hardware). Posture = is it a HEALTHY machine (state of hardware). InstaSafe enforces both.
9.0 |  |  | Q | What if an employee gets a new laptop? A: New device enrols, admin approves, old certificate is revoked. Minutes, fully logged.
9.0 |  |  | Q | Can we auto-approve corporate-imaged devices? A: Group-level policies can streamline approval for known-build devices while keeping BYOD in manual review. [CONFIRM exact auto-approval mechanics — Product]
9.0 |  |  | Q | Does this stop credential sharing? A: Largely — shared credentials fail from unbound devices, and single-device policies prevent parallel use. ``` **Related:** Device Posture · Contextual Access · IAM --- ---
10.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
11.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | quiet / grid off | see Component Roles
11.0 |  |  |  | Device Posture · Contextual Access · IAM
12.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
13.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
