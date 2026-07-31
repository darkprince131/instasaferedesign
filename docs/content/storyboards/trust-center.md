# Storyboard — trust-center

(auto-dumped from InstaSafe_Page_Storyboards.xlsx; read this instead of parsing the xlsx)

```
/trust-center  —  Trust Center
Archetype: A5 COMPANY   |   Volume 4   |   Every row below is one visible element, top to bottom.
[NEW] = component does not exist yet (see New Builds sheet in Build Plan v2).  Amber = signature.  Lilac = interstitial.  Grey = global.
# | Slot / block | Component | Sub-step | Text (from Content Master) | Interlink | Texture | Mobile (State B)
1.0 | Nav | IzNav (mega-menu C7) |  | Platform · Solutions · Industries · Why · Resources · Pricing — each item carries a description and micro-graphic. | ENGINE 1 — all clusters | sticky | Hamburger, full category expansion, nothing dropped
2.0 | Sections | 00c ConsoleRow |  | Stackable left-text + right-console rows | inline [-> Page] markers | dense / grid off | see Component Roles
2.0 |  |  | STANDARDS ALIGNMENT | NIST SP 800-207 · CSA SDP — architecture papers [CONFIRM shareable docs].
2.0 |  |  | COMPLIANCE MAPPINGS | PCI DSS, HIPAA, GDPR, SOX, ISO 27001, DPDP — control-family mappings maintained here so product/industry pages can claim lightly and link here for specifics. [Legal owns final mapping language — single source of truth.]
2.0 |  |  | OUR OWN SECURITY | InstaSafe's certifications and practices [CONFIRM current certs — ISO status, VAPT cadence, etc. Do not publish unverified.]
2.0 |  |  | PRIVACY & DATA | What we process (control-plane metadata), the can/cannot-see table (→ Privacy First), retention [CONFIRM], sub-processors [CONFIRM].
2.0 |  |  | RESPONSIBLE DISCLOSURE | Security contact + disclosure policy [CONFIRM existence/inbox with Product].
2.0 |  |  | DOCUMENT REQUESTS | Assessment-support documents on request — the enterprise-sales unblocking function. ``` This page is deliberately the claims-sink: every compliance sentence elsewhere on the site should be shallow and link here, so legal review concentrates on one URL. --- ---
3.0 | Final CTA | IzFinalCta |  | Book a demo. Bring your hardest question. Static — no animation in the closing band. | -> /book-a-demo | airy / static | identical
4.0 | Footer | IzFooterGrid |  | Every link its own bordered cell — all 56 pages reachable in one click. | ENGINE 6 — all clusters | airy / static | 2-col, nothing dropped
```
