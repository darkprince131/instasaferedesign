# Storyboard — solutions-byod

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/byod  —  BYOD Security
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: BYOD
H1: Their device. Your rules. No MDM standoff.
Sub: Corporate access from personal devices — governed at the session, not by seizing the phone.
CTA: Book a Demo
3.0 | Plain answer — the BYOD dilemma | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Employees will use personal devices; the only question is whether you have a policy for it or a blind spot. The classic enterprise answer — full MDM enrolment — fails on human grounds: people reasonably refuse corporate control of personal phones, and legal teams reasonably worry about wiping family photos. The classic ad-hoc answer — just let them log in — fails on security grounds: corporate data lands on ungoverned hardware.

InstaSafe's position: govern the *session*, not the device. Personal devices reach work through the clientless portal or the secure enterprise browser, where watermarking, clipboard policy, and download rules mean data is *used* on the device but never *kept* on it. No enrolment, no agent on personal property, no wipe-my-phone anxiety — and no corporate files in the camera roll.
4.0 | The control stack for BYOD | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
4.0 |  |  | IDENTITY FIRST | Full MFA (6 methods) — the personal device makes strong identity MORE important, not less.
4.0 |  |  | CONTAINED DELIVERY | Clientless portal / secure browser: apps render, data doesn't persist locally.
4.0 |  |  | SESSION CONTROLS | Watermark + clipboard + download policy on by default for the BYOD group.
4.0 |  |  | CONTEXT LIMITS | Geo/time conditions as appropriate; single-device login prevents credential sprawl.
4.0 |  |  | GRADUATED TRUST | Employee volunteers for the agent? Their personal device can earn posture-checked, deeper access — opt-in, not imposed. [Guardrail: no screenshot-blocking claims.]
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | dense / grid off | see Component Roles
6.0 |  |  | 01 — THE SHADOW-IT CHANNEL BECOMES A GOVERNED CHANNEL
6.0 |  |  | 02 | PRIVACY FIGHT AVOIDED — no corporate agent on personal property
6.0 |  |  | 03 | OFFBOARDING IS CLEAN — nothing was stored, so nothing needs wiping ``` **FAQs** — is data safe on a device we don't manage (data isn't ON the device — it renders in the governed session; controls stop persistence) · employee privacy (nothing installed in the default path; InstaSafe sees the work session, not the device) · what if the phone is stolen (sessions require MFA; nothing cached; disable the user and it's over) · MDM coexistence (fully — MDM manages devices you own; InstaSafe governs access from everything). **Related:** Clientless · Secure Browser · Endpoint Controls · Device Posture
7.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | quiet / grid off | see Component Roles
7.0 |  |  |  | Clientless · Secure Browser · Endpoint Controls · Device Posture
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
10.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
