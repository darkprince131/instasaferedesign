# Storyboard — platform-behavioural-authentica

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/behavioural-authentication  —  Behavioural Authentication
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Plain answer — What is behavioural authentication? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | dense / grid off | see Component Roles
2.0 |  |  |  | Passwords can be phished, tokens stolen, even biometrics replayed — but the *pattern* of how a person works is far harder to fake: when they log in, from where, from which devices, in what sequence. Behavioural authentication builds a baseline of each user's normal and treats deviation as signal. The genuine user logging in as always sails through; the "user" appearing at an unprecedented hour from an unseen device against their entire history meets friction — step-up authentication, restriction, or denial.

**Honest scope:** this is ML-assisted anomaly detection feeding the Trust Engine's risk score — one strong signal among several, not magic. It's also the only AI-adjacent claim InstaSafe makes, and it stays modest. [Guardrail: no "AI copilot", no autonomous-AI claims.]

**What feeds it:** login times · locations/sequences (impossible travel) · device patterns · access patterns per us
3.0 | Honest scope | IzQuietBand  [NEW] |  | One sentence, 300 weight, huge, airy | none | quiet / grid off | see Component Roles
3.0 |  |  |  | this is ML-assisted anomaly detection feeding the Trust Engine's risk score — one strong signal among several, not magic. It's also the only AI-adjacent claim InstaSafe makes, and it stays modest. [Guardrail: no "AI copilot", no autonomous-AI claims.]
4.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
5.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
5.0 |  |  |  | Trust Engine · Contextual Access · MFA (continuous facial as the strongest companion)
6.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
7.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
