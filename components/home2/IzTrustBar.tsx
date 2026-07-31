"use client";

import { RatingBar } from "./RatingBar";

/* ============================================================
   00ax · IzTrustBar — the trust strip that sits directly under the
   hero on essentially every page.

   Replaces 00ap IzLogoGrid in this slot. That component is a wide
   ecosystem lattice built to be a section of its own; used as a
   trust bar it takes far more vertical room than a strip under a
   hero can justify. This is the compact form of the same claim:
   proof numbers on one rule, customer wordmarks and the review
   badges on the next.

   ▸ REUSE ◂ built for every page, not just ZTNA. Pass `stats`
   and `logos`; everything else has a sensible default. Wordmarks
   are TEXT, deliberately — nothing here ships as a broken-asset
   box while real logo art is outstanding.
   ============================================================ */

export type TrustStat = { n: string; label: string };

const STATS: TrustStat[] = [
  { n: "500,000+", label: "endpoints secured" },
  { n: "150+", label: "enterprises" },
  { n: "100+", label: "Fortune 2000 clients" },
  { n: "5", label: "continents" },
];

const LOGOS = ["Banking · BFSI", "Manufacturing", "Government · PSU", "IT · ITES", "Healthcare"];

type Props = {
  stats?: TrustStat[];
  /** customer or sector wordmarks — text until real art lands */
  logos?: string[];
  /** the G2 / Gartner / Capterra badge row */
  ratings?: boolean;
  href?: string;
  className?: string;
};

export function IzTrustBar({
  stats = STATS,
  logos = LOGOS,
  ratings = true,
  href = "/case-studies",
  className,
}: Props) {
  return (
    <section className={className ? `iztb ${className}` : "iztb"} aria-label="Proof">
      <div className="iz-wrap">
        <div className="iztb-stats">
          {stats.map((s) => (
            <a key={s.label} href={href} className="iztb-stat">
              <b>{s.n}</b>
              <span>{s.label}</span>
            </a>
          ))}
        </div>

        {(logos.length > 0 || ratings) && (
          <div className="iztb-second">
            {logos.length > 0 && (
              <ul className="iztb-logos" aria-label="Sectors served">
                {logos.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
            {ratings && (
              <div className="iztb-ratings">
                <RatingBar />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
