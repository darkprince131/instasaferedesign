# Storyboard — platform-mfa

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/mfa  —  Multi-Factor Authentication
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: MULTI-FACTOR AUTHENTICATION
H1: A password is a guess. Prove it's really them.
Sub: Six authentication methods across web apps, desktops, servers, and network equipment — from SMS OTP to continuous facial verification.
CTA: Book a Demo | Try the Simulator ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Plain answer — What is MFA? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | airy / grid on | see Component Roles
5.0 |  |  |  | Multi-Factor Authentication asks for two or more different *kinds* of proof before letting someone in. The kinds matter: something you know (a password or PIN), something you have (your phone, a hardware key), something you are (your fingerprint, your face). A password alone fails silently — stolen credentials work perfectly for the thief. Add a second factor of a different kind, and a stolen password becomes a dead end: the attacker knows the secret but doesn't hold the phone.

MFA vs 2FA, since it's the most-asked question: 2FA is exactly two factors; MFA is two *or more*, and in practice means a system flexible about which factors, per user, per risk level. Every 2FA is MFA; not every MFA stops at two.
6.0 | The six methods (full descriptions) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
6.0 |  |  | OTP (SMS/EMAIL) | Six-digit, time-limited code to a registered channel. The universal baseline — works on any phone, zero rollout friction.
6.0 |  |  | T-OTP | Time-based codes generated on-device (InstaSafe Authenticator or standard TOTP apps). No network dependency, immune to SIM-swap.
6.0 |  |  | PIN | Device-bound MPIN as an additional knowledge factor for quick re-verification.
6.0 |  |  | BIOMETRIC | Fingerprint or facial recognition via device sensors — the highest-convenience strong factor.
6.0 |  |  | PUSH NOTIFICATION | One-tap approve/deny on the InstaSafe Authenticator app, with request context shown.
6.0 |  |  | HARDWARE TOKEN | Physical security keys, including FIDO-compliant keys, for the highest-assurance roles. [Guardrail: supported as a factor; do NOT claim end-to-end passwordless FIDO2 until confirmed.]
7.0 | SIGNATURE INTERACTIVE | SIGNATURE — 6-method tap flow |  | Tap a method, see its challenge flow. Rebuild light; keep v3 sim in /console for sales. | anchor: /platform/mfa#signature — link to it from the hero | instrument / grid on | Native — already tap-driven
8.0 | Signature capability — Continuous Facial Authentication | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
8.0 |  |  |  | Standard MFA proves identity once, at login. Continuous facial authentication keeps proving it: the camera re-verifies liveness roughly every 30 seconds for designated high-sensitivity applications. Walk away from the screen, or let someone else step in front of it, and the session logs out automatically. For trading systems, medical records, or payment operations, it closes the oldest gap in authentication — the authenticated-then-abandoned session. **Where MFA applies (coverage table — condensed from old site's four blocks, duplicates removed)** ```
8.0 |  |  | WEB & SAAS APPS | Via SAML/OAuth/OIDC — O365, Zoho, Salesforce, GitLab, Atlassian; mail clients incl. Zimbra, ICEWrap, Exchange.
8.0 |  |  | DESKTOP LOGIN | Windows, Linux, macOS logon MFA; RDP services. Protocols: RADIUS, LDAP, Kerberos/AD, SSH.
8.0 |  |  | NETWORK DEVICES | VPNs, firewalls, routers, switches via RADIUS and TACACS+ — incl. Cisco AnyConnect, Juniper, Palo Alto. (Yes: InstaSafe MFA can harden a VPN you haven't replaced yet.)
8.0 |  |  | ADFS / LDAP APPS | Directory-integrated legacy applications.
8.0 |  |  | Compliance supported | PCI DSS, HIPAA, GDPR, SOX, NERC CIP. ``` **Deployment** — Authenticator platform deployable in public cloud or on-premises data centre. InstaSafe controller can act as the RADIUS or TACACS+ server itself.
9.0 | Quick scan | IzSpecTable  [NEW] |  | Mono label:value rows, hairline rules, no card chrome | none | airy / grid on | see Component Roles
9.0 |  |  | Methods | 6 (OTP, T-OTP, PIN, biometric, push, hardware token)
9.0 |  |  | Continuous auth | Facial liveness re-check ~30s (designated apps)
9.0 |  |  | Protocols | RADIUS, TACACS+, SAML, OAuth, OIDC, LDAP, Kerberos, SSH
9.0 |  |  | Coverage | Web/SaaS, Windows/Linux/macOS logon, RDP, network gear
9.0 |  |  | Profiles | 8 auth profiles; per-group method policy
9.0 |  |  | Pricing | $[X]/user/month [PLACEHOLDER]
10.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
11.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | quiet / grid off | see Component Roles
11.0 |  |  | 01 — STOLEN PASSWORDS STOP WORKING | The phish succeeds; the login still fails.
11.0 |  |  | 02 — MFA EVERYWHERE, NOT JUST THE WEB | The OS logon, the switch console, and the legacy app get the same protection as the SaaS suite.
11.0 |  |  | 03 — FRICTION PROPORTIONAL TO RISK | Push-to-approve for daily work; hardware keys and continuous facial for the crown jewels.
12.0 | FAQs (rewritten, de-duplicated from old site's set) | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | instrument / grid on | see Component Roles
12.0 |  |  | Q | MFA vs 2FA? A: 2FA = exactly two factors. MFA = two or more, with flexibility about which. MFA systems let you scale factor strength to role and risk.
12.0 |  |  | Q | Can MFA itself be hacked? A: No control is absolute — SIM-swap targets SMS, fatigue attacks target push. Layering (T-OTP or hardware keys for admins, risk-based step-up, device binding) is exactly why MFA platforms beat single-method bolt-ons.
12.0 |  |  | Q | What's the risk of not using MFA? A: Credential theft becomes account takeover with no further obstacle — the single most common breach path. [SOURCE NEEDED for stat]
12.0 |  |  | Q | Which method should we roll out first? A: Push or T-OTP for the workforce (low friction), hardware keys for admins, continuous facial for the few screens that justify it.
12.0 |  |  | Q | Does InstaSafe MFA require the full platform? A: No — it runs standalone (including in front of an existing VPN) and integrates natively when you adopt ZTNA/ZTAA.
12.0 |  |  | Q | How does MFA interact with SSO? A: Perfectly — that's the design. One strong MFA-protected login, then SSO carries the trust to every app. ``` **Related:** SSO · IAM · Behavioural Authentication · Device Binding --- ---
13.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
14.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
14.0 |  |  |  | SSO · IAM · Behavioural Authentication · Device Binding
15.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
16.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
