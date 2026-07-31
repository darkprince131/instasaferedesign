# Storyboard — industries-healthcare-pharma

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/industries/healthcare-pharma  —  Healthcare & Pharma
Archetype: A4 INDUSTRY   |   Volume 3   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Hero | 00ad Heroes |  | Console archetype (A1) / Split (others) | -> /book-a-demo | dense / grid off | see Component Roles
2.0 |  |  |  | Eyebrow: HEALTHCARE & PHARMA
H1: The most sensitive data. The most fragmented access.
Sub: Clinicians, researchers, CROs, device vendors, TPAs — least-privilege access with the audit trail health data demands.
CTA: Book a Demo
```

**Regulatory strip:** DPDP Act (health data) · HIPAA (where applicable) · GxP-adjacent audit expectations [Legal review — especially any GxP phrasing]
3.0 | The sector's access problem | IzAnswerStrip  [NEW] |  | Answer line + 3 mono facts + 'the long version' expander | -> /what-is-zero-trust | quiet / grid off | see Component Roles
3.0 |  |  |  | Healthcare access is many populations, not one: clinicians who need instant access under pressure; hospital IT vendors and imaging-equipment OEMs dialing in for support; pharma R&D holding molecule-stage IP; CRO partners in trials; TPAs and insurers touching claims. The data is the most sensitive category law recognises, the legacy systems (HIS/LIS/PACS) are long-lived, and the vendor-access channel — the classic path in healthcare incidents [SOURCE NEEDED] — is usually the least governed.
4.0 | Where InstaSafe lands | IzWhereItLands  [NEW] |  | 5-row matrix — EVERY ROW LINKS to its solution page | -> solutions cluster | instrument / grid on | see Component Roles
4.0 |  |  | CLINICAL ACCESS | SSO+MFA tuned for clinical reality — fast re-auth (PIN/biometric), roaming between stations, no password ceremony mid-shift.
4.0 |  |  | VENDOR/OEM SUPPORT | Device and HIS vendors: scoped, time-boxed, recorded — the incident-report channel, closed.
4.0 |  |  | RESEARCH & PHARMA IP | Research systems dark to the internet; watermarked, download-governed sessions; split-plane keeps IP off vendor paths entirely.
4.0 |  |  | CRO / TRIAL PARTNERS | Clientless, scoped trial-system access, engagement-dated. [→ Third-Party]
4.0 |  |  | LEGACY HIS/LIS/PACS | Gates in front of the unmodifiable. [→ Legacy Apps] ``` **Three outcomes:** health-data access minimisation with evidence · the vendor-support channel gets attribution and replay · research IP stops transiting anyone else's infrastructure. **FAQs** — clinical friction (auth profiles let clinical groups use fast factors; friction is a policy dial, not a constant) · medical-device vendor access (per-incident, time-boxed tunnels to named systems, recorded) · trials with multiple CROs (per-CRO groups, separated tiles, individually expiring). **Related:** Third-Party · Legacy Apps · Privacy First ·
5.0 | Interstitial | IzQuietBand  [NEW] |  | One sentence, Space Grotesk 300 @48px, enormous air. The claim the next section proves. | none | quiet / grid off | identical
6.0 | Related | IzRelatedRail  [NEW] |  | 3-5 text links, mono eyebrow 'related_' | SIBLING PAGES | dense / grid off | see Component Roles
6.0 |  |  |  | Third-Party · Legacy Apps · Privacy First · Compliance
7.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
8.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
