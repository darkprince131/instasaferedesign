# Storyboard — solutions-third-party-access

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/solutions/third-party-access  —  Third-Party & Vendor Access
Archetype: A3 SOLUTION   |   Volume 2   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: THIRD-PARTY ACCESS
H1: Give vendors a door, not the keys.
Sub: Browser-based access to exactly the apps in scope. Nothing installed on their devices. Every session recorded. One click ends it all.
CTA: Book a Demo
3.0 | Plain answer — the third-party problem | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Third parties are structurally your riskiest users: you don't control their devices, can't set their security standards, often can't even name every individual using the credentials you issued — and yet supply-chain access is implicated in a large share of serious breaches [SOURCE NEEDED]. The traditional answers are all bad: VPN accounts (network access for strangers), shared credentials (no attribution), screen-sharing tools (no policy), or friction so high the business routes around security entirely.
4.0 | The InstaSafe pattern | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | instrument / grid on | see Component Roles
4.0 |  |  | SCOPE | The vendor sees tiles for in-scope systems only. Not your network. Not adjacent apps. The SAP support vendor sees SAP.
4.0 |  |  | DELIVER | Clientless — their browser, their device, nothing installed, no MDM negotiation with another company's IT.
4.0 |  |  | CONSTRAIN | Time-boxed windows (engagement dates, working hours), geo conditions where relevant, watermarking, clipboard and download policy on by default for external users.
4.0 |  |  | RECORD | Privileged third-party sessions recorded for replay — the literal answer to "what did they do on that server?"
4.0 |  |  | END | Contract over → one deprovisioning action. No orphaned VPN account discovered eight months later.
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Worked scenarios | 00ah IzUseCaseSwitch |  | Accordion left + own visual per tab right | none | dense / grid off | see Component Roles
6.0 |  |  | IT AMC VENDOR | RDP/SSH to named servers, recorded, weekday business hours, engagement-dated.
6.0 |  |  | STATUTORY AUDITOR | Read-only web access to the finance system, watermarked, download-blocked, fully logged — evidence of the control IS the control.
6.0 |  |  | OFFSHORE DEV PARTNER | Git/Jira/staging via portal; production invisible; clipboard policy on the crown jewels.
6.0 |  |  | OEM SUPPORT | Time-boxed tunnel to the one appliance under support ticket, opened per-incident.
7.0 | Three outcomes | 00ar IzOutcomes |  | Visual + headline -> connector -> 3 outcome columns | -> /book-a-demo | quiet / grid off | see Component Roles
7.0 |  |  | 01 | ATTRIBUTION BY DEFAULT     Named individuals, named sessions, replayable actions — shared-credential ambiguity ends.
7.0 |  |  | 02 | NO ORPHANED ACCESS         Expiry is a property of the grant, not a memory test for IT.
7.0 |  |  | 03 | ONBOARD IN MINUTES         New vendor = user + group + tiles. No shipping laptops, no agent rollout. ``` **FAQs** — do vendors install anything (no — clientless) · unmanaged-device risk (session controls compensate: watermark, clipboard, download, recording; posture applies where agents exist) · can vendors see our network (no — application tiles only; the network is never presented) · liability evidence (session recordings + 202 event types export to your SIEM) · speed of revocation (immediate; sessions terminate on disable). **Related:** ZTAA · Clientless · Endpoint Controls · BFSI/Manufactu
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | airy / grid on | see Component Roles
9.0 |  |  |  | ZTAA · Clientless · Endpoint Controls · BFSI/Manufacturing industry pages
10.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
11.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
