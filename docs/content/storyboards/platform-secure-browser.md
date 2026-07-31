# Storyboard — platform-secure-browser

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/secure-browser  —  Secure Enterprise Browser
Archetype: A1 PLATFORM DEEP   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: SECURE ENTERPRISE BROWSER
H1: The browser is where your data actually is. Govern it there.
Sub: A Chromium-based enterprise browser with policy where consumer browsers have settings — clipboard, downloads, devtools, watermarking, MFA.
CTA: Book a Demo | Try the Leak Sandbox ↓
3.0 | Trust bar | 00ap IzLogoGrid + 00ab RatingBar |  | 500,000+ endpoints secured · 150+ enterprises · 100+ Fortune 2000 companies · 5 continents. G2 badges. | -> /case-studies | dense / grid off | 2x2, identical
4.0 | Sub-nav | IzSubNav (sticky anchors) |  | Anchor links to each section below. A1 pages only — nowhere else on the site. | in-page anchors | — | Horizontal scroll chip row, sticky under nav
5.0 | Plain answer — What is a secure enterprise browser? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | airy / grid on | see Component Roles
5.0 |  |  |  | Nearly every SaaS application, and most internal ones, are used through a browser — which makes the browser the true last inch of your security perimeter. Consumer browsers are excellent products built for individuals: they happily download anything, extend themselves with any plugin, and copy anything to anywhere. Those are features for a person and liabilities for an enterprise.

A secure enterprise browser keeps the familiar Chromium experience (the same engine behind Chrome and Edge) but puts an administrator in charge of the risky parts: which users reach which applications, whether data can be copied out or downloaded, whether developer tools open, what gets watermarked. The user experience barely changes; the leak paths close.
6.0 | Why consumer browsers fall short (4 cards, from old site, tightened) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
6.0 |  |  | BUILT FOR INDIVIDUALS | No admin, no policy, no per-user app control.
6.0 |  |  | PLUGIN EXPOSURE | Extensions can read sessions and credentials; one malicious update is a breach.
6.0 |  |  | REDIRECTS & POPUPS | Malvertising and forced redirects reach corporate sessions unfiltered.
6.0 |  |  | CREDENTIAL & HISTORY RISK | A compromised profile leaks stored passwords and browsing data.
7.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
8.0 | Key features | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
8.0 |  |  | GRANULAR APP ACCESS | Need-to-know app visibility per user/group — the ZTAA portal, embedded in the browser.
8.0 |  |  | DATA LEAKAGE CONTROLS | Block copy/paste and file downloads for designated business-critical apps. [Guardrail: no screenshot/print/keylogger claims.]
8.0 |  |  | CHROME-LEVEL CONTROLS | Disable devtools and file downloads; restrict printing of browser content per policy [CONFIRM print-restriction wording with Product before publish — sits near the screenshot guardrail].
8.0 |  |  | BUILT-IN MFA | OTP/T-OTP/biometric/push at the browser itself.
8.0 |  |  | WATERMARKING | Identity overlay on sensitive screens.
8.0 |  |  | FULL VISIBILITY | Device parameters, location, app access, session details — logged like every other InstaSafe session.
8.0 |  |  | OS SUPPORT | Windows, Linux, macOS.
9.0 | SIGNATURE INTERACTIVE | SIGNATURE — Leak Sandbox |  | Attempt copy / download / screenshot, watch each blocked. On 00an loop mock. | anchor: /platform/secure-browser#signature — link to it from the hero | instrument / grid on | Tap each action, static blocked state
10.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | dense / grid off | see Component Roles
10.0 |  |  | 01 — DLP AT THE POINT OF USE | Controls live where data is actually seen and moved — the tab.
10.0 |  |  | 02 — BYOD WITHOUT AGENTS | The governed browser makes unmanaged devices usable safely.
10.0 |  |  | 03 — ZERO RETRAINING | It's Chromium. Users already know how to use it.
11.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | quiet / grid off | see Component Roles
11.0 |  |  | Q | What is the InstaSafe Secure Enterprise Browser built on? A: Chromium — the open-source engine behind Chrome and Edge — with enterprise policy and InstaSafe access control built in.
11.0 |  |  | Q | Why not just manage Chrome with group policy? A: GPO governs settings; it doesn't broker per-app access, enforce MFA at the browser, watermark sessions, or log to your access audit trail.
11.0 |  |  | Q | Does it replace the ZTAA portal? A: It embeds it — the browser is the portal for organisations that want the container and the doorway in one artifact.
11.0 |  |  | Q | Which devices can run it? A: Windows, Linux, and macOS. ``` **Related:** ZTAA · Endpoint Controls · BYOD solution --- ---
12.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
13.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
13.0 |  |  |  | ZTAA · Endpoint Controls · BYOD solution
14.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
15.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
