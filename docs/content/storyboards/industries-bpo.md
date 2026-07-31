# Storyboard — industries-bpo

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/industries/bpo  —  BPO / KPO / Contact Centres
Archetype: A4 INDUSTRY   |   Volume 3   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: BPO / CONTACT CENTRES
H1: The floor went home. The controls have to follow.
Sub: WFH seats with the containment clients demand — voice-friendly, watermarked, attributed, and provable.
CTA: Book a Demo
```

**Regulatory strip:** Client-contractual controls · PCI DSS (payment lines) · DPDP Act · [DoT/OSP framing — CONFIRM current status with legal before referencing]
3.0 | The sector's access problem | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | BPO security was built physical: badge gates, no phones on the floor, paper-free rooms. Distributed and WFH operations dissolved that model, but client contracts didn't relax — payment-line PCI clauses, data-handling commitments, and audit rights all still apply, now to a seat in the agent's home. Add voice: contact-centre workloads punish latency, so the security layer must not sit in the audio path. [→ Secure VoIP]
4.0 | Where InstaSafe lands | IzWhereItLands  [NEW] |  | 5-row matrix — EVERY ROW LINKS to its solution page | -> solutions cluster | instrument / grid on | see Component Roles
4.0 |  |  | THE WFH SEAT | Portal-delivered CRM/dialer/knowledge tools; watermark + clipboard + download policy on by default; inactivity timeout for the walked-away seat.
4.0 |  |  | VOICE PATH | Direct, split-plane VoIP access — security without jitter. [→ Secure VoIP]
4.0 |  |  | PER-SEAT ATTRIBUTION | Named agent, bound device, logged session — shared-station ambiguity ends.
4.0 |  |  | PAYMENT LINES | MFA + tight scoping + logging supporting PCI-relevant flows.
4.0 |  |  | SURGE STAFFING | Clientless onboarding for ramp classes — hundreds of seats in hours, and offboarding just as fast at ramp-down.
4.0 |  |  | CLIENT EVIDENCE | Per-programme access reports and session replay for client audits. ``` **Three outcomes:** WFH seats clients actually sign off on · ramp/de-ramp at BPO speed · voice quality survives the security layer. **FAQs** — agent personal devices (contained clientless sessions; nothing persists locally) · client insists on floor-only (geofencing can enforce facility-IP/radius policies for those programmes while WFH programmes run parallel rules) · dialer latency (split-plane direct path — the architecture answer, not a tuning answer). **Related:** Secure VoIP · BYOD · Endpoint Controls · IT/ITES --- ---
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | Secure VoIP · BYOD · Endpoint Controls · IT/ITES
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
