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

/* Capability, not customer count. The site does not publish how many
   customers, devices or rupees are behind it — these four are things
   the platform does, and they are the same numbers the spec tables
   quote. */
const STATS: TrustStat[] = [
  { n: "25", label: "device check types" },
  { n: "144", label: "named policy rules" },
  { n: "202", label: "event log types" },
  { n: "6", label: "MFA methods" },
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
