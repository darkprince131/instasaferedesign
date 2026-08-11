"use client";

import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlass, Newspaper } from "@phosphor-icons/react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { BookCard } from "@/components/home2/BookCard";
import { izFontVars } from "@/lib/iz-fonts";
import {
  PRESS,
  PRESS_KINDS,
  PRESS_PUBLICATIONS,
  pressCount,
  type PressKind,
} from "@/lib/newsroom";
import { PressPlate } from "./BookCoverArt";

/* ============================================================
   /instasafe-newsroom — press and coverage.

   Every item is a clipping from someone else's publication, so every
   card leaves the site. That is the whole information design of the
   page: the book face carries the publication's own headline, the
   spine label carries the masthead, and the caption says where you are
   about to land before you click.

   Cards are the 00e book-in-pocket, not the resource center's document
   card, in its "headline" variant — see components/home2/BookCard.tsx.
   A press headline is written by someone else and cannot be shortened
   to two display lines without misquoting it.

   No dates: the source list carried none. See lib/newsroom.ts.

   Theme boilerplate matches IzResourceCenter / IzBlogPage exactly,
   including the shared `is-theme` storage key.
   ============================================================ */

type Theme = "dark" | "paper";

function matches(q: string, ...fields: string[]) {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export function IzNewsroom() {
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

  const [kind, setKind] = useState<PressKind | null>(null);
  const [q, setQ] = useState("");

  const items = useMemo(
    () =>
      PRESS.filter(
        (p) => (!kind || p.kind === kind) && matches(q, p.headline, p.publication, p.kind)
      ),
    [kind, q]
  );

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------- hero ---------- */}
      <section className="izrc-hero iz-railed">
        <div className="iz-wrap izrc-herowrap">
          <span className="izrc-eyebrow">
            <Newspaper weight="regular" aria-hidden="true" />
            Newsroom
          </span>
          <h1 className="izrc-h1">
            InstaSafe, In <em>Other People&apos;s</em> Words.
          </h1>
          <p className="izrc-sub">
            {PRESS.length} pieces across {PRESS_PUBLICATIONS.length} publications — bylines
            our team wrote, interviews they gave, stories that quoted them, and the awards
            and rankings along the way. Every card opens the original article.
          </p>
          <ul className="izns-wall" aria-label="Publications that have covered InstaSafe">
            {PRESS_PUBLICATIONS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- controls ---------- */}
      <section className="izrc-body iz-railed">
        <div className="iz-wrap">
          <div className="izrc-controls">
            <div className="izrc-tabs" role="group" aria-label="Filter coverage by type">
              <button
                type="button"
                className="izrc-tab"
                aria-pressed={kind === null}
                onClick={() => setKind(null)}
              >
                Everything
                <i>{PRESS.length}</i>
              </button>
              {PRESS_KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  className="izrc-tab"
                  aria-pressed={kind === k}
                  onClick={() => setKind(kind === k ? null : k)}
                >
                  {k}
                  <i>{pressCount(k)}</i>
                </button>
              ))}
            </div>

            <label className="izrc-search">
              <MagnifyingGlass weight="bold" aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search coverage"
                aria-label="Search coverage"
              />
            </label>
          </div>

          <p className="izrc-count" aria-live="polite">
            {items.length} {items.length === 1 ? "story" : "stories"}
            {q ? ` matching “${q}”` : ""}
          </p>

          {items.length === 0 ? (
            <p className="izrc-empty">
              Nothing matches that. Try a broader term — “zero trust”, “VPN”, “privacy”.
            </p>
          ) : (
            <ul className="izbk-grid">
              {items.map((p) => (
                <li key={p.id} className="izbk-item">
                  <BookCard
                    variant="headline"
                    external
                    href={p.url}
                    chapter={p.kind}
                    title={p.headline}
                    subLabel={p.publication}
                    coverArt={<PressPlate seed={p.id} />}
                    author={p.host}
                    year="↗"
                    ctaLabel={`Read on ${p.publication}`}
                  />
                </li>
              ))}
            </ul>
          )}

          {/* ---------- press contact ---------- */}
          <section className="izns-contact" aria-labelledby="izns-h-contact">
            <h2 id="izns-h-contact">Writing about Zero Trust?</h2>
            <p>
              For interviews, product briefings, analyst enquiries or brand assets, reach the
              team at{" "}
              <a className="izns-mail" href="mailto:marketing@instasafe.com">
                marketing@instasafe.com
              </a>
              . Datasheets, comparison sheets and the full whitepaper library are on the{" "}
              <a className="izns-mail" href="/resource-center">
                resource center
              </a>
              , no form required.
            </p>
          </section>
        </div>
      </section>

      <IzFooterGrid />
    </div>
  );
}
