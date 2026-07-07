"use client";

/* ============================================================
   00ab · Rating Bar — platform review badges, place under any
   section. Orange circle + letter mark + star rating.
   Stars turn amber on hover. Half-stars supported.
   Click anywhere on badge → review page (opens new tab).

   ▸ TO EDIT ◂
   Change only the RATINGS array below.
     platform  — full name (used in aria-label)
     score     — float 0–5, e.g. 4.5 (0.5 increments)
     count     — string shown after stars, e.g. "94 reviews"
     href      — link to your review page on that platform
     letter    — 1–2 chars shown in the circle badge
     featured  — true adds a border outline around the badge
   ============================================================ */

const RATINGS = [
  {
    id:       "g2",
    platform: "G2",
    score:    4.5,
    count:    "94 reviews",
    href:     "https://www.g2.com/products/instasafe-ztna/reviews",
    letter:   "G2",
    featured: false,
  },
  {
    id:       "gartner",
    platform: "Gartner Peer Insights",
    score:    4.4,
    count:    "38 ratings",
    href:     "https://www.gartner.com/reviews/market/zero-trust-network-access",
    letter:   "Gp",
    featured: false,
  },
  {
    id:       "capterra",
    platform: "Capterra",
    score:    4.6,
    count:    "57 reviews",
    href:     "https://www.capterra.com/p/instasafe",
    letter:   "Ca",
    featured: true,
  },
] as const;

/* ── star path (Heroicons solid-star, viewBox 0 0 24 24) ── */
const STAR =
  "M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z";

type Fill = "full" | "half" | "empty";

function Star({ fill }: { fill: Fill }) {
  return (
    <svg viewBox="0 0 24 24" className={`rb-star rb-star-${fill}`} aria-hidden="true">
      {/* background (always rendered for outline/empty state) */}
      <path d={STAR} className="rb-s-bg" />
      {/* foreground fill, clipped to left 50% for half-star */}
      {fill !== "empty" && (
        <path
          d={STAR}
          className="rb-s-fill"
          style={fill === "half" ? { clipPath: "inset(0 50% 0 0)" } : undefined}
        />
      )}
    </svg>
  );
}

function Stars({ score, max = 5 }: { score: number; max?: number }) {
  const fills: Fill[] = Array.from({ length: max }, (_, i) => {
    const pos = i + 1;
    if (score >= pos)       return "full";
    if (score >= pos - 0.5) return "half";
    return "empty";
  });
  return (
    <span className="rb-stars" role="img" aria-label={`${score} out of ${max} stars`}>
      {fills.map((f, i) => <Star key={i} fill={f} />)}
    </span>
  );
}

export function RatingBar() {
  return (
    <div className="rb" role="list" aria-label="Customer ratings by platform">
      {RATINGS.map(r => (
        <a
          key={r.id}
          href={r.href}
          className={`rb-badge${r.featured ? " featured" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
          role="listitem"
          aria-label={`${r.platform}: ${r.score} out of 5 — ${r.count}. View on ${r.platform}`}
        >
          {/* platform circle */}
          <span className="rb-circle" aria-hidden="true">
            <svg viewBox="0 0 32 18" className="rb-letter" aria-hidden="true">
              <text
                x="16" y="14"
                textAnchor="middle"
                fill="currentColor"
                fontSize="12"
                fontWeight="800"
                fontFamily="Arial,Helvetica,sans-serif"
                letterSpacing="-0.5"
              >
                {r.letter}
              </text>
            </svg>
          </span>

          {/* star rating */}
          <Stars score={r.score} />

          {/* review count */}
          <span className="rb-count">{r.count}</span>
        </a>
      ))}
    </div>
  );
}
