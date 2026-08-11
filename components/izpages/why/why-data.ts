/* ============================================================
   why-data.ts — the content behind the four reasons.

   ▸ WHY THIS IS A SEPARATE FILE ◂ the compliance claims below are
   under legal review and the Trust Center owns the mappings. Every
   badge's claim text is a DATA FIELD here, never baked into the
   component, so a lawyer's edit is a string change in one file and
   not a JSX diff. `claim` is what we assert; `note` is the
   qualifier. Both are expected to change.

   ⚠ UNVERIFIED: the milestone text in TIMELINE has not been fact
   checked against anything authoritative. Confirm each year before
   launch or cut the section — a wrong founding date on the "why us"
   page is the kind of error a prospect notices.
   ============================================================ */

export type ReasonKey = "path" | "numbers" | "record" | "frameworks";

export const REASONS: { key: ReasonKey; n: string; label: string }[] = [
  { key: "path", n: "01", label: "Not in your data path" },
  { key: "numbers", n: "02", label: "Numbers we publish" },
  { key: "record", n: "03", label: "Track record and scale" },
  { key: "frameworks", n: "04", label: "India and global, together" },
];

/* ---------- reason 2 · the four clusters ----------
   Seven number clusters flat is a dump; grouped into four, each one
   is a claim with a page behind it. The href is the argument — a
   number nobody can check is marketing. */
export type StatCluster = {
  head: string;
  lead: { n: string; label: string };
  subs: { n: string; label: string }[];
  href: string;
  cta: string;
};

export const CLUSTERS: StatCluster[] = [
  {
    head: "Device posture",
    lead: { n: "25", label: "health-check types" },
    subs: [{ n: "1,500+", label: "OS and device combinations" }],
    href: "/zero-trust-features/device-posture-check",
    cta: "See every check",
  },
  {
    head: "Policy",
    lead: { n: "144", label: "named rules" },
    subs: [{ n: "21", label: "context combinations" }],
    href: "/zero-trust-network-access",
    cta: "See how policy resolves",
  },
  {
    head: "Risk response",
    lead: { n: "12", label: "risk triggers" },
    subs: [{ n: "4", label: "automatic actions" }],
    href: "/platform/iam",
    cta: "See risk-based access",
  },
  {
    head: "Logging & reporting",
    lead: { n: "202", label: "event types" },
    subs: [
      { n: "11", label: "built-in reports" },
      { n: "7", label: "SIEM export formats" },
    ],
    href: "/platform",
    cta: "See the audit trail",
  },
];

/* ---------- reason 3 · the timeline ----------
   ⚠ Every `body` below needs confirming. The years are the spine of
   the section; if one is wrong the whole reason backfires. */
export const TIMELINE: { year: string; title: string; body: string }[] = [
  { year: "2012", title: "Founded in Bengaluru", body: "Built for Indian enterprises before Zero Trust was a category anyone was buying." },
  { year: "2018", title: "A platform, not a VPN swap", body: "Identity, device trust and application access converge into one control plane rather than three products." },
  { year: "2020", title: "Remote work, at once", body: "Workforces moved home in weeks. The architecture scaled by configuration, because there was no hardware in the path to size." },
  { year: "Today", title: "One console, six products", body: "ZTNA, ZTAA, identity, MFA, privileged access and endpoint control, governed from a single policy engine." },
];

/* ---------- reason 4 · the frameworks ----------
   `claim` and `note` are the fields legal edits. Do not move this
   text into the component. */
export type Framework = {
  short: string;
  full: string;
  /** what we assert about it — under review */
  claim: string;
  /** the qualifier that keeps the claim honest */
  note?: string;
};

export const INDIA_FRAMEWORKS: Framework[] = [
  { short: "DPDP", full: "Digital Personal Data Protection Act", claim: "Data stays in your environment, so the processing boundary stays yours.", note: "Controls map; obligations remain yours" },
  { short: "RBI", full: "Reserve Bank of India", claim: "Access control and audit trail evidence for regulated banking estates." },
  { short: "SEBI", full: "Securities and Exchange Board of India", claim: "Session recording and privileged-access oversight for market infrastructure." },
  { short: "IRDAI", full: "Insurance Regulatory and Development Authority", claim: "Policy and logging evidence for insurer access reviews." },
  { short: "NPCI", full: "National Payments Corporation of India", claim: "Segregated, recorded access paths for payment operations." },
];

export const GLOBAL_FRAMEWORKS: Framework[] = [
  { short: "NIST SP 800-207", full: "Zero Trust Architecture", claim: "The architecture the standard describes, implemented rather than approximated." },
  { short: "CSA SDP", full: "Software-Defined Perimeter", claim: "Drop-all gateways with single-packet authorisation." },
  { short: "ISO 27001", full: "Information Security Management", claim: "Access control clauses evidenced from the platform's own logs." },
  { short: "PCI DSS", full: "Payment Card Industry Data Security Standard", claim: "Segmentation and privileged-session evidence for cardholder estates." },
  { short: "HIPAA", full: "Health Insurance Portability and Accountability Act", claim: "Least-privilege access to systems holding patient data." },
  { short: "GDPR", full: "General Data Protection Regulation", claim: "No vendor-side copy of the data in transit.", note: "Controls map; obligations remain yours" },
  { short: "SOX", full: "Sarbanes-Oxley Act", claim: "Change and access evidence for financial reporting systems." },
];
