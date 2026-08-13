"use client";

import { useEffect, useMemo, useState } from "react";
import { Trophy } from "@phosphor-icons/react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { BookCard } from "@/components/home2/BookCard";
import { izFontVars } from "@/lib/iz-fonts";
import { AWARDS, AWARD_KINDS, awardCount, awardHost, type AwardKind } from "@/lib/awards";
import { AWARDS_THUMBS } from "@/lib/thumbs";
import { DocPlate } from "./BookCoverArt";
import { ThumbCover } from "./ThumbCover";

/* ============================================================
   /awards — recognition, with the certificate on the card.

   Built on the newsroom's chassis on purpose (same hero, same chips,
   same book grid, same `izrc-*` / `izbk-*` classes from
   resources.css + newsroom.css) because it makes the same move: every
   card is somebody else's judgement and every card leaves the site.
   Sharing the furniture means the two pages can never drift apart.

   The one difference worth its own rule: three of these links go to
   OUR OWN announcement post rather than the issuer's citation. The
   card says so in the caption — "Read our announcement" instead of
   "View the citation" — because a card that reads "Gartner" and lands
   on instasafe.com is the kind of small dishonesty nobody forgives
   twice.

   The thumbnail is the certificate artwork itself, so unlike the
   newsroom there is no case where a drawn plate is the better answer.
   `ThumbCover` still carries the fallback: a 404 must degrade to
   drawn art, never to a broken-image box.
   ============================================================ */

type Theme = "dark" | "paper";

export function IzAwards() {
  const [theme, setTheme] = useState<Theme>("paper");
  useEffect(() => {
    try {
      const t = localStorage.getItem("is-theme");
      setTheme(t === "dark" ? "dark" : "paper");
    } catch {}
  }, []);
  const onThemeChange = (t: Theme) => {
    setTheme(t);
    try {
      localStorage.setItem("is-theme", t);
    } catch {}
  };

  const [kind, setKind] = useState<AwardKind | null>(null);
  const items = useMemo(() => AWARDS.filter((a) => !kind || a.kind === kind), [kind]);

  const bodies = useMemo(() => [...new Set(AWARDS.map((a) => a.body))], []);

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------- hero ---------- */}
      <section className="izrc-hero iz-railed">
        <div className="iz-wrap izrc-herowrap">
          <span className="izrc-eyebrow">
            <Trophy weight="regular" aria-hidden="true" />
            Awards
          </span>
          <h1 className="izrc-h1">
            Judged by <em>people who do not work here</em>.
          </h1>
          <p className="izrc-sub">
            {AWARDS.length} recognitions from {bodies.length} bodies — industry awards, growth
            rankings and analyst placements. Every card opens the citation, or our announcement
            where the issuer publishes none.
          </p>
          <ul className="izns-wall" aria-label="Bodies that have recognised InstaSafe">
            {bodies.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- controls ---------- */}
      <section className="izrc-body iz-railed">
        <div className="iz-wrap">
          <div className="izrc-controls">
            <div className="izrc-tabs" role="group" aria-label="Filter recognition by type">
              <button
                type="button"
                className="izrc-tab"
                aria-pressed={kind === null}
                onClick={() => setKind(null)}
              >
                Everything
                <i>{AWARDS.length}</i>
              </button>
              {AWARD_KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  className="izrc-tab"
                  aria-pressed={kind === k}
                  onClick={() => setKind(kind === k ? null : k)}
                >
                  {k}
                  <i>{awardCount(k)}</i>
                </button>
              ))}
            </div>
          </div>

          <p className="izrc-count" aria-live="polite">
            {items.length} {items.length === 1 ? "recognition" : "recognitions"}
          </p>

          <ul className="izbk-grid">
            {items.map((a) => (
              <li key={a.id} className="izbk-item">
                <BookCard
                  variant="headline"
                  external
                  href={a.url}
                  chapter={a.kind}
                  title={a.title}
                  subLabel={a.body}
                  coverArt={
                    <ThumbCover
                      id={a.id}
                      src={AWARDS_THUMBS[a.id]}
                      alt={`${a.title} — ${a.body}`}
                      art={<DocPlate topic="Overview" />}
                      /* certificates are all type — a crop loses the
                         award's own name. Mixed orientations, so 4/3. */
                      fit="contain"
                      ratio="4 / 3"
                    />
                  }
                  author={awardHost(a)}
                  year={a.year ?? "↗"}
                  /* the caption is where the self-hosted links stay honest */
                  ctaLabel={a.self ? "Read our announcement" : `View on ${awardHost(a)}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <IzFooterGrid />
    </div>
  );
}
