"use client";

/* ============================================================
   00ax · IzTrustBar — the full-bleed proof band that sits directly
   under the hero on essentially every page.

   ▸ FULL PAGE WIDTH, SEAMLESS (user call, 2026-08-13) ◂
   It was a contained plate; it is now a band that runs edge to edge.
   The five numbers divide the PAGE rather than a card floating on it,
   which is what makes it read as structure — a seam between the hero
   and what follows — instead of an object dropped into the flow.

   Three registers stacked: the claim, the numbers, the judgement.

   RATINGS CARRY STARS AND THE SCORE. The number stays first and
   largest because it is the proof; the stars are what the eye finds
   at a glance. What is NOT here is a redrawn G2 / Gartner / Capterra
   roundel — hand-approximating a third party's mark reads as less
   trustworthy than plain type and is outside their usage terms. Each
   rating links to its own profile and the band carries the required
   source attribution.

   SECTORS ARE LINKS into the case-study cluster, not a caption —
   one of the page's interlink engines.

   NO VANITY NUMBERS. The head line is a capability statement, never
   "500,000+ endpoints / 150+ enterprises": this site does not publish
   customer, device or seat counts. Every number in the grid is a
   thing the platform does, and each links to where it is proven.

   ▸ REUSE ◂ built for every page. Pass `stats`, `sectors`,
   `ratings`; everything else has a sensible default.
   ============================================================ */

export type TrustStat = {
  n: string;
  label: string;
  /** where this number is actually demonstrated */
  href: string;
};

export type TrustSector = { label: string; href: string };

export type TrustRating = {
  /** numeric, so the stars can be derived rather than hand-set */
  score: number;
  source: string;
  count: string;
  href: string;
};

/* ── star path (Heroicons solid star, viewBox 0 0 24 24) ── */
const STAR =
  "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z";

/* Five stars, half-steps clipped rather than drawn — one path, one
   truth. The stars illustrate the score; the NUMBER is still the proof,
   which is why it stays first and largest. */
function Stars({ score }: { score: number }) {
  return (
    <span className="iztb-stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => {
        const pos = i + 1;
        const fill = score >= pos ? "full" : score >= pos - 0.5 ? "half" : "empty";
        return (
          <svg key={i} viewBox="0 0 24 24" className={`iztb-star is-${fill}`}>
            <path d={STAR} className="iztb-star-bg" />
            {fill !== "empty" && (
              <path
                d={STAR}
                className="iztb-star-fill"
                style={fill === "half" ? { clipPath: "inset(0 50% 0 0)" } : undefined}
              />
            )}
          </svg>
        );
      })}
    </span>
  );
}

/* Capability, not customer count — the same figures the spec tables
   quote, so a reader who checks finds them again. Five, not four: an
   odd cell cannot be left stranded when the cells divide the width. */
const STATS: TrustStat[] = [
  { n: "25", label: "device check types", href: "/zero-trust-features/device-posture-check" },
  { n: "144", label: "named policy rules", href: "/zero-trust-features/device-posture-check" },
  { n: "202", label: "event log types", href: "/zero-trust-network-access" },
  { n: "6", label: "MFA methods", href: "/multifactor-authentication" },
  { n: "7", label: "SIEM formats", href: "/zero-trust-network-access" },
];

/* Real destinations in the case-study cluster, not decoration. */
const SECTORS: TrustSector[] = [
  { label: "Banking · BFSI", href: "/case-studies/Zero-trust-for-banking" },
  { label: "IT · ITES", href: "/case-studies/Zero-trust-for-IT-sector" },
  { label: "Logistics", href: "/case-studies/Zero-trust-for-logistics" },
  { label: "SAP access", href: "/case-studies/Zero-trust-for-SAP-Access" },
  { label: "ERP access", href: "/case-studies/Zero-trust-for-ERP-Access" },
];

/* All three fit now. The contained plate could only carry two without
   the foot out-weighing the grid; a full-width band has the room. */
const RATINGS: TrustRating[] = [
  { score: 4.5, source: "G2", count: "94 reviews", href: "https://www.g2.com/products/instasafe-ztna/reviews" },
  {
    score: 4.4,
    source: "Gartner Peer Insights",
    count: "38 ratings",
    href: "https://www.gartner.com/reviews/market/zero-trust-network-access",
  },
  { score: 4.6, source: "Capterra", count: "57 reviews", href: "https://www.capterra.com/p/instasafe" },
];

type Props = {
  stats?: TrustStat[];
  sectors?: TrustSector[];
  ratings?: TrustRating[] | false;
  /** the line beside the band's label — capability, never a count */
  claim?: string;
  className?: string;
};

export function IzTrustBar({
  stats = STATS,
  sectors = SECTORS,
  ratings = RATINGS,
  claim = "Deployed on-premise, in private cloud and in public cloud — one policy engine across all three.",
  className,
}: Props) {
  const rows = ratings === false ? [] : ratings;

  return (
    <section className={className ? `iztb ${className}` : "iztb"} aria-label="Proof">
      {/* Full bleed, no plate. The cells divide the PAGE, not a card
          floating on it — so the band reads as part of the page's
          structure and nothing is left stranded in a gutter. */}
      <div className="iztb-head">
        <div className="iz-wrap iztb-head-in">
          <span className="iztb-lab">
            <b aria-hidden="true" />
            In production
            <i aria-hidden="true">_</i>
          </span>
          <p className="iztb-claim">{claim}</p>
        </div>
      </div>

      <div className="iztb-grid">
        {stats.map((s) => (
          <a key={s.label} href={s.href} className="iztb-cell">
            <b>{s.n}</b>
            <span>{s.label}</span>
          </a>
        ))}
      </div>

      <div className="iztb-foot">
        <div className="iz-wrap iztb-foot-in">
          <ul className="iztb-sectors" aria-label="Where it runs">
            {sectors.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>

          {rows.length > 0 && (
            <ul className="iztb-ratings" aria-label="Review scores">
              {rows.map((r) => (
                <li key={r.source}>
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener nofollow"
                    aria-label={`${r.source}: ${r.score} out of 5 from ${r.count}. Opens ${r.source}.`}
                  >
                    <b>{r.score.toFixed(1)}</b>
                    <Stars score={r.score} />
                    <span className="src">{r.source}</span>
                    <span className="ct">{r.count}</span>
                    <i aria-hidden="true">↗</i>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {rows.length > 0 && (
        /* required by the review platforms' usage terms, and it is the
           honest place to say the scores are theirs and not ours */
        <div className="iz-wrap">
          <p className="iztb-attrib">
            Scores from G2.com, Inc., Gartner Peer Insights and Capterra. Each links to its own profile.
          </p>
        </div>
      )}
    </section>
  );
}
