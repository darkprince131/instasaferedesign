# Storyboard — platform-sso

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/sso  —  Single Sign-On
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: SINGLE SIGN-ON
H1: Log in once. Get everything you're allowed.
Sub: One set of credentials, one dashboard, every provisioned application — with MFA and device checks built into that single login.
CTA: Book a Demo | Watch the Race ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Plain answer — What is SSO? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | airy / grid on | see Component Roles
5.0 |  |  |  | Single Sign-On means one login session, honoured by many applications. Instead of a password per app — remembered, reused, written down, phished — the user authenticates once to an identity provider, which then vouches for them to each application using a cryptographic assertion (most commonly SAML).

Three things improve at once. Security: one strongly-defended login (with MFA) replaces dozens of weak ones, and password reuse stops mattering. Operations: onboarding is "add to group," offboarding is "disable user" — not a checklist of fifteen admin consoles. Experience: people stop burning minutes and helpdesk tickets on forgotten passwords.

The under-appreciated fourth improvement is visibility: when every login flows through one point, "who accessed what, when, from where" becomes a report instead of an investigation.
6.0 | Why password sprawl fails (3 pains, kept concrete) | 00x GridCards |  | 3-up problem cards, caps mono headline | none | dense / grid off | see Component Roles
6.0 |  |  |  | ONE REUSED PASSWORD = MANY BREACHED APPS Users reuse; attackers know. Credential-stuffing turns one leaked password into access attempts everywhere. [SOURCE NEEDED — reuse stat]
6.0 |  |  | OFFBOARDING BY CHECKLIST | Every leaver means manual revocation across every app. One missed console is a live account owned by someone who no longer works for you.
6.0 |  |  | INVISIBLE ACCESS | Without a central login point, nobody can answer "which apps did this user reach last quarter?" — an audit question that WILL be asked.
7.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
8.0 | What InstaSafe SSO includes (full) | 00ac IzSignalGrid |  | Capability chip field — EVERY CHIP LINKS OUT | -> feature pages | instrument / grid on | see Component Roles
8.0 |  |  | ONE DASHBOARD | Tiles for provisioned apps only; entitlement IS the interface.
8.0 |  |  | PROTOCOLS | SAML 2.0, OAuth, OpenID Connect; IdP- and SP-initiated flows; act as IdP or federate with yours.
8.0 |  |  | MFA AT THE DOOR | The single login carries the strong factors — 6 methods, per-group profiles.
8.0 |  |  | DEVICE BINDING | Optionally require an approved device even with perfect credentials.
8.0 |  |  | INSTANT OFFBOARD | One disable action ends portal, apps, and sessions.
8.0 |  |  | FULL TRAIL | Login time, result, device, location — logged, reportable, SIEM-exportable.
8.0 |  |  | INTEGRATIONS | O365, Zoho, Salesforce, GitLab, Atlassian, Zimbra, ICEWrap, and any SAML/OAuth/OIDC-speaking app.
9.0 | Quick scan | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | airy / grid on | see Component Roles
9.0 |  |  | Protocols | SAML 2.0 · OAuth · OIDC (IdP + SP initiated)
9.0 |  |  | IdP role | Native IdP, or SP behind your existing IdP
9.0 |  |  | MFA | Built-in, 6 methods
9.0 |  |  | Device trust | Optional binding + posture at login
9.0 |  |  | Pricing | $[X]/user/month [PLACEHOLDER — see v2 §A5]
10.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
11.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | quiet / grid off | see Component Roles
11.0 |  |  | 01 — THE PASSWORD PROBLEM SHRINKS TO ONE | Defend one login properly instead of fifty badly.
11.0 |  |  | 02 — JOINER–LEAVER IN MINUTES | Group membership is provisioning; disabling is offboarding.
11.0 |  |  | 03 — ACCESS BECOMES AUDITABLE | Every app login is one line in one log. ``` **Hero interactive — One-Login Race** (spec from v1: split-screen timed comparison)
12.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | instrument / grid on | see Component Roles
12.0 |  |  | Q | What is SSO in one sentence? A: One secure login that all your work applications trust, so users stop juggling passwords and IT gains one control point.
12.0 |  |  | Q | Isn't one login a single point of failure? A: It's a single point of DEFENCE — one door you can afford to armour with MFA, device binding, and risk rules, versus dozens you can't.
12.0 |  |  | Q | Which apps work with it? A: Anything speaking SAML 2.0, OAuth, or OIDC — which covers the large majority of business SaaS — plus the named integrations above.
12.0 |  |  | Q | Can InstaSafe federate with our existing IdP instead of replacing it? A: Yes; SP mode is fully supported.
12.0 |  |  | Q | What happens to app access when someone leaves? A: Disable the user once; every SSO-brokered application stops authenticating them immediately, and active portal sessions end. ``` **Related:** IAM · MFA · ZTAA portal · Pricing --- ---
13.0 | Interstitial | IzQuestionBand  [NEW] |  | A question in display type that the NEXT section answers. Transition device. | none | quiet / grid off | identical
14.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
14.0 |  |  |  | IAM · MFA · ZTAA portal · Pricing
15.0 | SIGNATURE INTERACTIVE | SIGNATURE — OneLoginRace (LIVE .iz) |  | Reference implementation. Port every other page to match this. | anchor: /platform/sso#signature | instrument / grid on | Tap to start. Result identical.
16.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
17.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
