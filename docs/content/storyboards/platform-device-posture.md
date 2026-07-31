# Storyboard — platform-device-posture

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/device-posture  —  Device Posture Check
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: DEVICE POSTURE
H1: The user checked out. Is the laptop lying?
Sub: 25 health-check types against 144 named rules — evaluated before access and re-evaluated during it.
CTA: Book a Demo | Toggle the Device Tester ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Plain answer — What is device posture checking? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | airy / grid on | see Component Roles
5.0 |  |  |  | Verifying a user answers "is this really Priya?" Posture checking answers the equally important question nobody used to ask: "is Priya's laptop in a fit state to touch our systems?" A perfectly authenticated user on a machine with no antivirus, a disabled firewall, and six months of missing patches is a breach that hasn't finished happening yet.

Posture checks read the device's actual state — OS version and patch level, antivirus presence *and freshness*, firewall status, disk encryption, and more — and compare it against rules you define per user group. Fail the rules and the connection is refused or restricted, with the reason logged. Because posture is checked continuously, a device that drifts out of compliance mid-session (antivirus disabled at 2 p.m.) can be challenged or disconnected at 2 p.m., not discovered in next quarter's audit.
6.0 | The numbers, explained | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | dense / grid off | see Component Roles
6.0 |  |  |  | 25 CHECK TYPES     The vocabulary: OS version, patch level, AV presence/
                   state/definitions age, firewall, disk encryption,
                   process checks, and more. [CONFIRM full public list —
                   Product]
144 NAMED RULES    The sentences: pre-built rule definitions combining
                   checks into enforceable requirements per platform.
1,500+ COMBOS      The coverage: OS/device permutations already mapped,
                   so a mixed Windows/macOS/Linux estate is policy, not
                   a project.
7.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
8.0 | How it's used (worked examples) | 00am IzProStack |  | Sticky 01/04 stepper — quote pinned per step | -> /platform/trust-engine | instrument / grid on | see Component Roles
8.0 |  |  | FINANCE GROUP | Windows 11 current-patch + BitLocker + AV definitions <7 days old → else deny.
8.0 |  |  | CONTRACTORS | Clientless portal only; posture compensated by session controls (watermark, clipboard, recording).
8.0 |  |  | DEVELOPERS | Linux permitted, firewall required, posture drift → step-up MFA instead of hard block.
9.0 | SIGNATURE INTERACTIVE | SIGNATURE — Device Tester |  | Run 25 checks against presets: patched laptop / stale AV / jailbroken. | anchor: /platform/device-posture#signature — link to it from the hero | instrument / grid on | Preset buttons, static result table
10.0 | Quick scan | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | dense / grid off | see Component Roles
10.0 |  |  | Check types | 25 · Named rules: 144 · OS/device combos: 1,500+
10.0 |  |  | Evaluation | At connection + continuous
10.0 |  |  | On failure | Deny · restrict · step-up MFA · alert (policy-defined)
10.0 |  |  | Risk integration | Posture feeds the Trust Engine's 12 triggers
10.0 |  |  | Platforms | Windows, macOS, Linux
11.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | quiet / grid off | see Component Roles
11.0 |  |  | 01 — COMPROMISED DEVICES STOP AT THE DOOR | Spoofing a user is hard; spoofing a user AND a compliant certificated device is dramatically harder.
11.0 |  |  | 02 — COMPLIANCE BECOMES CONTINUOUS | Endpoint standards are enforced at every connection, not sampled at audit time.
11.0 |  |  | 03 — BYOD WITH EYES OPEN | Personal devices meet a defined bar or get contained access — a policy choice instead of a blind spot. ``` **Hero interactive — Device Tester** (toggle AV/firewall/patch state, watch allow↔deny flip live with the failing rule named)
12.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
13.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | airy / grid on | see Component Roles
13.0 |  |  | Q | Does posture checking need an agent? A: Yes for full checks. Clientless sessions rely on session-level controls instead — that trade-off is explicit in policy.
13.0 |  |  | Q | What happens the moment a device falls out of compliance? A: Your choice per rule: block, restrict, force re-auth, or alert. Continuous evaluation means the response is immediate.
13.0 |  |  | Q | Can different teams have different rules? A: Per user group, per app sensitivity — 144 named rules exist to be mixed.
13.0 |  |  | Q | Is this an MDM replacement? A: No — MDM manages devices; posture checking gates access by device state. They compose well; posture works with or without MDM. ``` **Related:** Device Binding · Endpoint Controls · ZTNA · BYOD --- ---
14.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
14.0 |  |  |  | Device Binding · Endpoint Controls · ZTNA · BYOD
15.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
16.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
17.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
