# Storyboard — platform-endpoint-controls

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/platform/endpoint-controls  —  Endpoint Controls
Archetype: A2 PLATFORM LIGHT   |   Volume 1   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: ENDPOINT CONTROLS
H1: Access granted is not the end of the story.
Sub: What happens inside the session — copying, downloading, wandering — is policy too.
CTA: Book a Demo
3.0 | Plain answer — What are endpoint controls? | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Traditional security ends at the login: once in, the user's actions are their own. Endpoint controls extend policy into the live session — because most data loss isn't a hack, it's an allowed user doing an unallowed thing: pasting a customer table into personal email, downloading the price list before resigning, screensharing a console with credentials visible.

InstaSafe's endpoint controls are enforced by the agent and portal on the device itself, per application, per user group — so the sales tool can allow exporting while the HR system forbids even copy.
4.0 | The six controls (full) | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
4.0 |  |  | CLIPBOARD CONTROLS | Block copy/paste and clipboard access for designated applications; block screen-capture and screen-recording actions initiated through the governed session context. [Wording legal-checked against the screenshot-DLP guardrail — enforcement scope is the InstaSafe session, not the OS at large. CONFIRM final public phrasing with Product.]
4.0 |  |  | WATERMARK PROTECTION | Logo/text overlay rendered over on-screen content — every screen photo identifies its viewer.
4.0 |  |  | NETWORK FILTER | Block specified domains/IPs per user group during sessions.
4.0 |  |  | APP FILTER | Block launching specified local applications during sensitive sessions.
4.0 |  |  | CHROME CONTROL | Restrict downloads, developer tools, and printing of browser content in governed browsing.
4.0 |  |  | INACTIVITY TIMEOUT | Idle or low-transfer sessions disconnect automatically — the unattended-desk risk, closed.
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | dense / grid off | see Component Roles
6.0 |  |  | 01 — INSIDER RISK GETS GUARDRAILS | The allowed user's unallowed action is blocked at the moment of attempt, and logged.
6.0 |  |  | 02 — THIRD PARTIES LEAVE EMPTY-HANDED | Vendors work in your systems; nothing usable leaves the session.
6.0 |  |  | 03 — COMPLIANCE EVIDENCE BY DEFAULT | Every enforcement event is one of the 202 logged types — the audit trail writes itself.
7.0 | FAQs | 00n ChatFaq |  | Chat-format FAQ + FAQPage schema | varies per answer | quiet / grid off | see Component Roles
7.0 |  |  | Q | Do controls apply to all apps? A: Per-app, per-group policy. Sensitivity decides strictness.
7.0 |  |  | Q | Do they work on personal devices? A: Yes — within the governed session (portal/agent/secure browser), which is precisely the BYOD use case.
7.0 |  |  | Q | Won't users find workarounds? A: Controls raise the cost and log the attempt; combined with watermarking and recording, casual exfiltration stops and deliberate exfiltration leaves evidence. We're explicit about scope — no security claim should pretend to be absolute. ``` **Related:** Secure Browser · ZTAA session controls · BYOD · Third-Party Access --- ---
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
9.0 |  |  |  | Secure Browser · ZTAA session controls · BYOD · Third-Party Access
10.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
11.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
