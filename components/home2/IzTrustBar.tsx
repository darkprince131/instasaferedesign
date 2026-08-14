"use client";

/* ============================================================
   00ax · IzTrustBar — the review-score band under the hero.

   ▸ IT WAS DOING FOUR JOBS AND LANDING NONE (user call, 2026-08-14) ◂
   The band used to stack a claim line, five capability numbers, five
   sector links, three ratings and an attribution footnote. Its job is
   to invoke trust, and a reader given five registers at once focuses
   on none of them — so it is one register now: the three scores.

   Gone entirely: the "In production / deployed on-premise…" line, the
   number grid, and the sector chips. The numbers survive elsewhere
   (the quick-scan sheets and the spec tables quote the same figures),
   which is why losing them here costs nothing a reader needs.

   ▸ THE MARKS ARE THE REAL ONES ◂
   Earlier this component argued for plain type over a redrawn roundel,
   and that was right — a hand-approximated third-party mark is both
   less trustworthy and outside their usage terms. What changed is that
   we now have the actual files, so the argument no longer applies.
   All three carry their own name, so no source label is printed
   beside them: the G2 circle says G2, and the Gartner and Capterra
   wordmarks say themselves.

   ▸ IT SITS UNDER THE CUSTOMER SLIDER ◂
   Most pages already run a logo marquee under the hero. Two dense
   bands back to back was most of why this felt hectic, so this one is
   deliberately one line tall and mostly whitespace.

   THE ATTRIBUTION STAYS. It is small and quiet now, but the review
   platforms' terms require the scores to be sourced, and it is the
   honest place to say they are theirs and not ours.

   ▸ REUSE ◂ `stats` and `sectors` are still supported for any page
   that wants them back, but nothing passes them and the default
   render is ratings only.
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
  logo: string;
  /* Sizes are AREA-matched, not height-matched. G2 is a 1:1 roundel
     and the other two are ~4.4:1 wordmarks; setting a common height
     would give the wordmarks four times the visual weight. Each is
     h = sqrt(560 / aspect), so all three carry the same optical mass. */
  w: number;
  h: number;
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

const RATINGS: TrustRating[] = [
  {
    score: 4.5,
    source: "G2",
    count: "94 reviews",
    href: "https://www.g2.com/products/instasafe-ztna/reviews",
    logo: "/logos/ratings/g2.svg",
    w: 24,
    h: 24,
  },
  {
    score: 4.4,
    source: "Gartner Peer Insights",
    count: "38 ratings",
    href: "https://www.gartner.com/reviews/market/zero-trust-network-access",
    logo: "/logos/ratings/gartner.svg",
    w: 50,
    h: 11,
  },
  {
    score: 4.6,
    source: "Capterra",
    count: "57 reviews",
    href: "https://www.capterra.com/p/instasafe",
    logo: "/logos/ratings/capterra.svg",
    w: 49,
    h: 11,
  },
];

type Props = {
  /** off by default — see the header */
  stats?: TrustStat[];
  /** off by default — see the header */
  sectors?: TrustSector[];
  ratings?: TrustRating[] | false;
  className?: string;
};

export function IzTrustBar({ stats, sectors, ratings = RATINGS, className }: Props) {
  const rows = ratings === false ? [] : ratings;
  if (!rows.length && !stats?.length && !sectors?.length) return null;

  return (
    <section className={className ? `iztb ${className}` : "iztb"} aria-label="Review scores">
      <div className="iz-wrap">
        {rows.length > 0 && (
          <ul className="iztb-ratings">
            {rows.map((r) => (
              <li key={r.source}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener nofollow"
                  aria-label={`${r.source}: ${r.score} out of 5 from ${r.count}. Opens ${r.source}.`}
                >
                  <span className="iztb-mark">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.logo} alt="" width={r.w} height={r.h} loading="lazy" decoding="async" />
                  </span>
                  <b>{r.score.toFixed(1)}</b>
                  <Stars score={r.score} />
                  <span className="ct">{r.count}</span>
                  <i aria-hidden="true">↗</i>
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Opt-in only. Nothing passes these; they exist so a page that
            wants the capability numbers back can have them without a
            second component. */}
        {stats && stats.length > 0 && (
          <div className="iztb-grid">
            {stats.map((s) => (
              <a key={s.label} href={s.href} className="iztb-cell">
                <b>{s.n}</b>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        )}

        {sectors && sectors.length > 0 && (
          <ul className="iztb-sectors" aria-label="Where it runs">
            {sectors.map((s) => (
              <li key={s.href}>
                <a href={s.href}>{s.label}</a>
              </li>
            ))}
          </ul>
        )}

        {rows.length > 0 && (
          <p className="iztb-attrib">Scores from G2, Gartner Peer Insights and Capterra.</p>
        )}
      </div>
    </section>
  );
}
