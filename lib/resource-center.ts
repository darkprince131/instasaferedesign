/* ============================================================
   resource-center.ts — the corpus behind /resource-center.

   Ported verbatim from the live WordPress page at
   instasafe.com/resource-center/ on 11 Aug 2026: 27 brochures,
   whitepapers and datasheets, 6 webinars and 9 product videos.
   Titles are the live site's own titles, lightly normalised for
   capitalisation only — they are the strings that rank, so they are
   not rewritten here. The one-line `blurb` on each item is new: the
   old page shipped bare titles in a list, and a card grid needs a
   second line to be scannable.

   ---------------------------------------------------------------
   SELF_HOSTED — the one switch that matters.

   false (current): PDFs are served from the live site's /docs/
   directory and video posters come from i.ytimg.com. Nothing needs to
   exist in public/ for this page to work, which is why it ships this
   way — the redesign can go up before the asset migration does.

   true: PDFs resolve to /docs/<slug>.pdf and posters to
   /resources/thumbs/<id>.jpg, both served by this app.

   To flip it: run `node scripts/fetch-resource-assets.mjs` from the
   repo root — it writes all 27 PDFs and 15 posters into public/ under
   exactly the names below — then change the constant. Nothing else
   moves. Do NOT flip it before running the script; every download
   turns into a 404 the moment you do.
   ============================================================ */

export const SELF_HOSTED = false;

/** Where the live site keeps the originals. Source of truth until the
    assets are copied into public/. */
const LEGACY_DOCS = "https://instasafe.com/docs/";

export type ResourceTopic =
  | "Overview"
  | "VPN Alternative"
  | "Comparisons"
  | "Compliance"
  | "Whitepapers"
  | "Use Cases";

export type Brochure = {
  /** Stable slug — also the self-hosted filename, minus `.pdf`. */
  id: string;
  title: string;
  blurb: string;
  topic: ResourceTopic;
  /** Filename on the live site, URL-unsafe characters and all. */
  legacyFile: string;
  /** Rough page count, for the card's meta line. `null` where unknown. */
  pages: number | null;
};

export type VideoItem = {
  /** YouTube video id — also the self-hosted poster filename. */
  id: string;
  title: string;
  blurb: string;
};

/* ------------------------------------------------------------
   Product brochures, datasheets and whitepapers
   ------------------------------------------------------------ */

export const BROCHURES: Brochure[] = [
  {
    id: "zero-trust-access-brochure",
    title: "Zero Trust Application Access for Secure Remote Access",
    blurb:
      "The main product brochure — what Zero Trust Application Access is, how it is deployed, and what it replaces.",
    topic: "Overview",
    legacyFile: "Brochure - Zero Trust Access.pdf",
    pages: 8,
  },
  {
    id: "zero-trust-access-datasheet",
    title: "InstaSafe Zero Trust Access — Key Features and Benefits",
    blurb:
      "The datasheet: capability-by-capability breakdown of the platform, written for a technical evaluator.",
    topic: "Overview",
    legacyFile: "Datasheet - Zero Trust Access_v2.pdf",
    pages: 4,
  },
  {
    id: "introduction-to-instasafe-zero-trust",
    title: "Introduction to InstaSafe Zero Trust",
    blurb:
      "The primer. Start here if Zero Trust is still a term rather than an architecture you have deployed.",
    topic: "Overview",
    legacyFile: "Introduction to InstaSafe Zero Trust.pdf",
    pages: 12,
  },
  {
    id: "instasafe-zero-trust-faqs",
    title: "Frequently Asked Questions on InstaSafe Zero Trust",
    blurb:
      "The questions security teams actually ask during evaluation, answered plainly — architecture, latency, failover, licensing.",
    topic: "Overview",
    legacyFile: "InstaSafe FAQs.pdf",
    pages: 10,
  },
  {
    id: "total-visibility-with-instasafe",
    title: "Total Visibility With InstaSafe: The Master Key to Zero Trust",
    blurb:
      "Why you cannot enforce what you cannot see, and what full session-level visibility looks like in practice.",
    topic: "Overview",
    legacyFile: "Total Visibility with InstaSafe 2021.pdf",
    pages: 8,
  },

  {
    id: "zero-trust-vs-legacy-vpn-comparison",
    title: "InstaSafe Zero Trust vs Legacy VPN Solutions",
    blurb:
      "Side-by-side comparison sheet — attack surface, performance, scale and admin overhead against a traditional VPN concentrator.",
    topic: "VPN Alternative",
    legacyFile: "Comparison Sheet v3.6.pdf",
    pages: 4,
  },
  {
    id: "instasafe-zero-trust-vs-vpns",
    title: "InstaSafe Zero Trust — A Better Alternative to VPNs",
    blurb:
      "The migration case: what breaks on a VPN at scale, and what changes the week after you turn ZTNA on.",
    topic: "VPN Alternative",
    legacyFile: "InstaSafe Zero Trust VS VPNs V2.pdf",
    pages: 6,
  },
  {
    id: "instasafe-vs-fortinet-vpn",
    title: "Fortinet vs InstaSafe Zero Trust — A Comparative Guide",
    blurb: "How InstaSafe compares against Fortinet's VPN and access stack, feature by feature.",
    topic: "Comparisons",
    legacyFile: "InstaSafe_vs_Fortinet_VPN.pdf",
    pages: 4,
  },
  {
    id: "instasafe-vs-zscaler-private-access",
    title: "Zscaler vs InstaSafe Zero Trust — A Comparative Guide",
    blurb: "InstaSafe against Zscaler Private Access: routing model, deployment time and total cost.",
    topic: "Comparisons",
    legacyFile: "InstaSafe vs Zscaler Private Access V2_Editable Verison.pdf",
    pages: 4,
  },
  {
    id: "instasafe-vs-cisco-duo",
    title: "Cisco Duo vs InstaSafe Zero Trust — A Comparative Guide",
    blurb: "Where Duo stops at authentication and where a full access plane picks up.",
    topic: "Comparisons",
    legacyFile: "Instasafe_ZT_vs_Cisco_DUO.pdf",
    pages: 4,
  },
  {
    id: "instasafe-vs-iboss",
    title: "iboss vs InstaSafe Zero Trust — A Comparative Guide",
    blurb: "A capability comparison against iboss's cloud security service edge.",
    topic: "Comparisons",
    legacyFile: "Instasafe_ZT_vs_iboss.pdf",
    pages: 4,
  },
  {
    id: "instasafe-vs-pulse-secure",
    title: "Pulse Secure vs InstaSafe Zero Trust — A Comparative Guide",
    blurb: "Replacing a Pulse Secure estate: what maps across, what does not, and what the cutover looks like.",
    topic: "Comparisons",
    legacyFile: "Instasafe_ZT_vs_Pulse_Secure_ZT.pdf",
    pages: 4,
  },
  {
    id: "instasafe-vs-akamai-eaa",
    title: "Akamai EAA vs InstaSafe Zero Trust — A Comparative Guide",
    blurb: "InstaSafe against Akamai Enterprise Application Access, on architecture and on economics.",
    topic: "Comparisons",
    legacyFile: "Instasafe ZT_vs_Akamai_EAA.pdf",
    pages: 4,
  },
  {
    id: "instasafe-vs-cloudflare",
    title: "Cloudflare vs InstaSafe Zero Trust — A Comparative Guide",
    blurb: "How the two Zero Trust offerings differ once you get past the marketing pages.",
    topic: "Comparisons",
    legacyFile: "Instasafe ZT_vs_Cloudflare ZT.pdf",
    pages: 4,
  },
  {
    id: "direct-routed-vs-cloud-routed-ztna",
    title: "Direct Routed ZTNA vs Cloud Routed ZTNA",
    blurb:
      "The architectural argument behind InstaSafe's direct-routed model — latency, data residency and blast radius.",
    topic: "Comparisons",
    legacyFile:
      "Comparison - Advantages of Direct Routed vs Cloud Routed Zero Trust Architecture.pdf",
    pages: 6,
  },

  {
    id: "rbi-cybersecurity-framework-guidelines",
    title: "RBI Guidelines for Cybersecurity Framework",
    blurb:
      "The RBI cybersecurity framework mapped to controls InstaSafe delivers — written for Indian BFSI compliance teams.",
    topic: "Compliance",
    legacyFile: "Brochure - RBI Guidelines for Cyber Security Framework.pdf",
    pages: 8,
  },
  {
    id: "regulatory-compliance-with-instasafe",
    title: "How to Achieve Regulatory Compliance With InstaSafe",
    blurb:
      "Whitepaper covering the audit evidence Zero Trust access produces, and which mandates it satisfies.",
    topic: "Compliance",
    legacyFile: "Whitepaper - How To Achieve Regulatory Compliance With InstaSafe.pdf",
    pages: 12,
  },

  {
    id: "instasafe-multi-factor-authentication-whitepaper",
    title: "Whitepaper — InstaSafe Multi-Factor Authentication (MFA)",
    blurb: "The full MFA whitepaper: factor types, risk-based step-up, and rollout without a helpdesk spike.",
    topic: "Whitepapers",
    legacyFile: "Whitepaper - InstaSafe Multi Factor Authentication.pdf",
    pages: 14,
  },
  {
    id: "zero-trust-security-for-iot-whitepaper",
    title: "Whitepaper — Zero Trust Security for IoT",
    blurb: "Extending identity-first access to devices that cannot run an agent or hold a credential.",
    topic: "Whitepapers",
    legacyFile: "Whitepaper - Zero Trust security for IoT.pdf",
    pages: 12,
  },
  {
    id: "windows-autopilot-hybrid-azure-ad-join-whitepaper",
    title:
      "Whitepaper — Windows Autopilot User-Driven Hybrid Azure AD Join Using Always-On VPN",
    blurb:
      "The zero-touch provisioning path: Autopilot enrolment over Always-On VPN into a hybrid Azure AD domain.",
    topic: "Whitepapers",
    legacyFile:
      "Whitepaper -  Windows Autopilot User-Driven Hybrid Azure AD Join using Always On VPN.pdf",
    pages: 16,
  },
  {
    id: "secure-sso-for-saas-applications",
    title: "Secure Single Sign-On (SSO) for SaaS Applications",
    blurb: "One identity across every SaaS app, with the access decision still evaluated per session.",
    topic: "Whitepapers",
    legacyFile: "Secure Single Sign-On (SSO) for SaaS Applications.pdf",
    pages: 6,
  },
  {
    id: "zero-trust-scenarios-and-use-cases",
    title: "InstaSafe Zero Trust — Multiple Scenarios and Use Cases",
    blurb:
      "The partner guide: a dozen deployment scenarios, each with the topology and the reason someone chose it.",
    topic: "Use Cases",
    legacyFile: "Partner Guide- Zero Trust Scenarios and Use Cases.pdf",
    pages: 20,
  },
  {
    id: "security-solution-for-hybrid-workforce",
    title: "Zero Trust Security for a Remote and Hybrid Workforce",
    blurb: "Access that behaves the same whether the user is in the office, at home, or on hotel wifi.",
    topic: "Use Cases",
    legacyFile: "The Security Solution for the Hybrid Workforce v3.pdf",
    pages: 8,
  },
  {
    id: "secure-access-to-o365-applications",
    title: "Secure Access to O365 Applications Using InstaSafe Zero Trust",
    blurb: "Conditional, identity-aware access to Microsoft 365 without backhauling the traffic.",
    topic: "Use Cases",
    legacyFile: "Secure Access to O365 Applications.pdf",
    pages: 6,
  },
  {
    id: "securing-financial-institutions-zero-trust",
    title: "Securing Financial Institutions With InstaSafe Zero Trust",
    blurb: "What BFSI deployments look like — segmentation, privileged access and the audit trail regulators ask for.",
    topic: "Use Cases",
    legacyFile: "Securing Financial Institutions with Zero Trust Security.pdf",
    pages: 8,
  },
  {
    id: "remote-access-for-it-ites-sector",
    title: "Remote Access for the IT / ITES Sector",
    blurb: "Case study: delivering contractor and BPO-scale remote access without opening the network.",
    topic: "Use Cases",
    legacyFile: "ITES Case Study 2021.pdf",
    pages: 6,
  },
  {
    id: "sap-application-access-zero-trust",
    title: "SAP Application Access With InstaSafe Zero Trust",
    blurb: "Publishing SAP to remote users and third parties as an application, not as a route into the LAN.",
    topic: "Use Cases",
    legacyFile: "SAP Application Access with Instasafe Zero Trust.pdf",
    pages: 6,
  },
];

/* ------------------------------------------------------------
   Webinars — full-length recorded sessions
   ------------------------------------------------------------ */

export const WEBINARS: VideoItem[] = [
  {
    id: "XL_EPSvnACM",
    title: "Stay Protected With Zero Trust Network Access and AWS",
    blurb: "Securing AWS-hosted workloads with ZTNA, run jointly with the AWS team.",
  },
  {
    id: "cTGN9gvLO0k",
    title: "Ensuring a Secure Work-From-Home Environment",
    blurb: "Remote access security best practices, from the year everyone had to get them right at once.",
  },
  {
    id: "G8gWLCv8Co8",
    title: "Zero Trust in the Modern Workplace — Everything You Need to Know",
    blurb: "The full introductory session: principles, architecture and the common migration mistakes.",
  },
  {
    id: "kz3bNKWFBbk",
    title: "InstaSafe Secure Access Deep Dive — A Practitioner's Perspective",
    blurb: "A hands-on walkthrough of the platform from someone who deploys it, not someone who sells it.",
  },
  {
    id: "bTFGcheUq60",
    title: "Zero Trust Approach and Multi-Cloud Environments",
    blurb: "Applying one consistent access policy across AWS, Azure and on-prem at the same time.",
  },
  {
    id: "Q-v8VKSQeL8",
    title: "InstaSafe Secure Access Best Practices",
    blurb: "Policy design, segmentation and rollout sequencing that hold up past the pilot.",
  },
];

/* ------------------------------------------------------------
   Product videos — short feature explainers and demos

   NOTE FOR WHOEVER MIGRATES THIS: on the live page, "Zero Trust
   Feature: Always ON VPN functionality" and "InstaSafe Zero Trust
   Architecture - Explained" both point at Pv4ZUiBFCKg. One of the two
   is wrong and the correct id was never recorded. Rather than ship a
   card that plays the wrong video, the architecture entry is held in
   PRODUCT_VIDEOS_UNRESOLVED below and is NOT rendered. Find the real
   id on the InstaSafe YouTube channel, move the entry up, done.
   ------------------------------------------------------------ */

export const PRODUCT_VIDEOS: VideoItem[] = [
  {
    id: "OzdQdxPBFw0",
    title: "Device Binding and Device Posture Check",
    blurb: "How a session is tied to a known device, and what happens when that device stops being compliant.",
  },
  {
    id: "4nZyDInmDYY",
    title: "Single Sign-On (SSO) for SaaS Applications",
    blurb: "One login across the SaaS estate, demonstrated end to end.",
  },
  {
    id: "Pv4ZUiBFCKg",
    title: "Always-On VPN Functionality",
    blurb: "Connectivity that re-establishes itself before the user notices it dropped.",
  },
  {
    id: "ipSYexsFtDE",
    title: "Legacy VPN Challenges — Why Switch to Zero Trust Access",
    blurb: "The three-minute version of the case for replacing the concentrator.",
  },
  {
    id: "g2RbcZd1aQs",
    title: "Why Zero Trust Access Is Needed",
    blurb: "The threat model that makes implicit network trust untenable.",
  },
  {
    id: "q6K1NXCiYgI",
    title: "InstaSafe Zero Trust Access — Product Demo",
    blurb: "The full product demo: admin console, policy authoring and the user's side of the connection.",
  },
  {
    id: "0znjN-sKBS0",
    title: "InstaSafe Multi-Factor Authenticator (MFA)",
    blurb: "The authenticator app and the factor flow, shown on a real enrolment.",
  },
  {
    id: "UK-Igiex-CQ",
    title: "Device Binding Feature",
    blurb: "A closer look at binding, revocation and re-enrolment.",
  },
  {
    id: "fZ4PO6Sk2u8",
    title: "InstaSafe Zero Trust — Platform Overview",
    blurb: "A short tour of how the pieces fit together.",
  },
];

/** Held back until the real YouTube id is confirmed — see the note above. */
export const PRODUCT_VIDEOS_UNRESOLVED: { title: string; note: string }[] = [
  {
    title: "InstaSafe Zero Trust Architecture — Explained",
    note: "Live page links Pv4ZUiBFCKg, which is the Always-On VPN video. Real id unknown.",
  },
];

/* ------------------------------------------------------------
   Resolvers — the only two places SELF_HOSTED is read
   ------------------------------------------------------------ */

/** Download URL for a brochure, honouring SELF_HOSTED. */
export function brochureHref(b: Brochure): string {
  return SELF_HOSTED
    ? `/docs/${b.id}.pdf`
    : `${LEGACY_DOCS}${encodeURIComponent(b.legacyFile)}`;
}

/** Poster image for a video, honouring SELF_HOSTED. */
export function posterSrc(v: VideoItem): string {
  return SELF_HOSTED
    ? `/resources/thumbs/${v.id}.jpg`
    : `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
}

/** Fallback poster. maxresdefault does not exist for every upload —
    hqdefault always does, so the card swaps to it on error. */
export function posterFallback(v: VideoItem): string {
  return SELF_HOSTED
    ? `/resources/thumbs/${v.id}.jpg`
    : `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;
}

/** Privacy-preserving embed, used inside the lightbox only. */
export function embedSrc(v: VideoItem): string {
  return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`;
}

export function watchHref(v: VideoItem): string {
  return `https://www.youtube.com/watch?v=${v.id}`;
}

export const TOPICS: ResourceTopic[] = [
  "Overview",
  "VPN Alternative",
  "Comparisons",
  "Compliance",
  "Whitepapers",
  "Use Cases",
];
