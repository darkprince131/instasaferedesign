# Storyboard — industries-manufacturing

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/industries/manufacturing  —  Manufacturing
Archetype: A4 INDUSTRY   |   Volume 3   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: MANUFACTURING
H1: The plant got connected. The access model didn't.
Sub: OEM support tunnels, MES/ERP access, design IP, multi-site teams — one governed model where TeamViewer exceptions used to live.
CTA: Book a Demo
```

**Regulatory strip:** DPDP Act · ISO 27001 · customer-contract IP protections · sector advisories [CERT-In references — legal review]
3.0 | The sector's access problem | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Manufacturing's access story is the accumulation of exceptions: the machine OEM's remote-support tool installed during commissioning and never removed; the MES vendor's VPN account; design partners exchanging CAD over ad-hoc channels; plant engineers reaching HMIs from home during night incidents. Each exception was individually reasonable; collectively they're an unaudited mesh into the systems that physically run production — plus design IP that is, for many manufacturers, the company.

**Honest scope:** InstaSafe governs *user-to-application* access — engineers, vendors, and partners reaching plant applications, MES/ERP, historians, and jump paths. It is not an OT/ICS network-segmentation product and makes no IoT/OT-protocol claims. [Guardrail — explicit on the page; it builds trust with the audience that knows the difference.]
4.0 | Where InstaSafe lands | IzWhereItLands  [NEW] |  | 5-row matrix — EVERY ROW LINKS to its solution page | -> solutions cluster | instrument / grid on | see Component Roles
4.0 |  |  | OEM SUPPORT ACCESS | The commissioning-era remote tool, replaced: per-incident, time-boxed, recorded tunnels to the named machine's application layer.
4.0 |  |  | PLANT APP ACCESS | MES, historians, quality systems via governed sessions — dark to the internet, posture-gated, reachable at 2 a.m. by the on-call engineer through policy instead of exception.
4.0 |  |  | DESIGN & PLM IP | CAD/PLM behind watermarked, download-governed sessions; partner access scoped and expiring; split-plane keeps drawings off third-party infrastructure.
4.0 |  |  | MULTI-SITE WORKFORCE | One access model across plants and offices — geo context per site where useful.
4.0 |  |  | ERP EVERYWHERE | The thick-client ERP reality is exactly ZTNA's IP-layer job. [→ ZTNA] ``` **Three outcomes:** the exception mesh becomes one auditable channel · design IP gets session-level containment · OEM support continues — with attribution, scope, and replay. **FAQs** — is this an OT security product (no — user-to-application access governance; it composes with OT segmentation, honestly stated) · OEM engineers abroad (geo policy + time-boxing + recording make cross-border support governable) · air-gapped lines (out of scope by definition; InstaSafe governs the connected layer around them). **Related:** T
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Honest scope | IzQuietBand  [NEW] |  | One sentence, 300 weight, huge, airy | none | dense / grid off | see Component Roles
6.0 |  |  |  | InstaSafe governs *user-to-application* access — engineers, vendors, and partners reaching plant applications, MES/ERP, historians, and jump paths. It is not an OT/ICS network-segmentation product and makes no IoT/OT-protocol claims. [Guardrail — explicit on the page; it builds trust with the audience that knows the difference.]
7.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | quiet / grid off | see Component Roles
7.0 |  |  |  | Third-Party · Legacy Apps · ZTNA · Endpoint Controls
8.0 | Interstitial | 00q FilterStream |  | Data ribbon — 144 named rules_ · 25 device check types_ · 202 event log types_ | none | quiet / grid off | identical
9.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
10.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
