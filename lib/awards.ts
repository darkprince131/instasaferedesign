/* ============================================================
   awards.ts — the recognition corpus behind /awards.

   Source: the eight links supplied on 12 Aug 2026, paired with the
   eight files in `Thumbnails/Awards/`. The pairing was 1:1 — every
   link had exactly one certificate image and vice versa.

   `title` is taken from the certificate artwork itself, which is the
   award as the issuing body words it. `body` is who issued it. Where
   the certificate names a year, it is kept; where it does not, no
   year is invented.

   THREE OF THESE LEAVE THE SITE TO A PDF and two more to a third
   party, so `external` is on by default and the card says where you
   are going before you click. The three `instasafe.com/blog/...`
   links are our own announcement posts, not the issuer's citation —
   they are marked `self` so the caption can say so honestly rather
   than implying Gartner or G2 hosts the page.

   NO VANITY NUMBERS: this file carries awards only. It does not
   restate customer counts, device counts or per-user pricing.
   ============================================================ */

export type AwardKind = "Award" | "Ranking" | "Analyst" | "Finalist";

export type Award = {
  /** Stable slug — also the thumbnail filename in public/thumbs/awards/. */
  id: string;
  /** The award, as the issuing body words it. */
  title: string;
  /** Who issued it. */
  body: string;
  /** Year on the certificate; null where it carries none. */
  year: string | null;
  kind: AwardKind;
  url: string;
  /** true when the link is our own announcement rather than the issuer's. */
  self?: boolean;
};

export const AWARDS: Award[] = [
  {
    id: "dsci-security-product-company-2021",
    title: "Security Product Company of the Year",
    body: "Data Security Council of India",
    year: "2021",
    kind: "Award",
    url: "https://instasafe.com/blog/instasafe-is-the-winner-of-security-product-company-of-the-year/",
    self: true,
  },
  {
    id: "varindia-best-zero-trust-brand",
    title: "Best Zero Trust Security Brand",
    body: "VARINDIA",
    year: null,
    kind: "Award",
    url: "https://instasafe.com/blog/instasafe-best-zero-trust-security-brand/",
    self: true,
  },
  {
    id: "deloitte-fast-500-apac-2020",
    title: "Technology Fast 500 APAC Winner",
    body: "Deloitte",
    year: "2020",
    kind: "Ranking",
    url: "https://www2.deloitte.com/content/dam/Deloitte/global/Documents/Technology-Media-Telecommunications/gx-tmt-2020-technology-fast-500-apac-ranking.pdf",
  },
  {
    id: "deloitte-fast-50-india-2020",
    title: "Technology Fast 50 India Winner",
    body: "Deloitte",
    year: "2020",
    kind: "Ranking",
    url: "https://www2.deloitte.com/content/dam/Deloitte/in/Documents/technology-media-telecommunications/in-TF50-2020-Winners-Report-noexp.pdf",
  },
  {
    id: "gartner-representative-vendor-ztna",
    title: "Representative Vendor, Zero Trust Network Access",
    body: "Gartner",
    year: null,
    kind: "Analyst",
    url: "https://www.gartner.com/teamsiteanalytics/servePDF?g=/imagesrv/media-products/pdf/Qi-An-Xin/Qi-An-Xin-1-1OKONUN2.pdf",
  },
  {
    id: "g2-high-performer-ztna",
    title: "High Performer, Zero Trust Networking Software",
    body: "G2 Grid",
    year: null,
    kind: "Analyst",
    url: "https://instasafe.com/blog/instasafe-is-feature-in-high-performers-category-in-g2-grid-for-zero-trust-networking-software/",
    self: true,
  },
  {
    id: "cybersecurity-excellence-finalist",
    title: "Finalist, Best Cybersecurity Startup",
    body: "Cybersecurity Excellence Awards",
    year: null,
    kind: "Finalist",
    url: "https://cybersecurity-excellence-awards.com/candidates/instasafe-technologies-pvt-ltd-2/",
  },
  {
    id: "cio-choice-2017-cloud-security",
    title: "CIO Choice Recognition in Cloud Security",
    body: "CIO Choice",
    year: "2017",
    kind: "Award",
    url: "https://www.cio-choice.in/media/press-release/2017-press-release/instasafe-solutions-pvt-ltd/",
  },
];

export const AWARD_KINDS: AwardKind[] = ["Award", "Ranking", "Analyst", "Finalist"];

export function awardCount(kind: AwardKind) {
  return AWARDS.filter((a) => a.kind === kind).length;
}

/** Bare host for the card foot — the same signal the newsroom cards use. */
export function awardHost(a: Award) {
  try {
    return new URL(a.url).hostname.replace(/^www\d?\./, "");
  } catch {
    return "";
  }
}
