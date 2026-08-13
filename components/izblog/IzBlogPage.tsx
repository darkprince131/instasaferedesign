"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Article } from "@phosphor-icons/react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { izFontVars } from "@/lib/iz-fonts";
import type { BlogIndexData } from "@/lib/ghost";
import { IzBlogCard } from "./IzBlogCard";

/* ============================================================
   /blog — the index.

   Posts are fetched whole on the server (see lib/ghost.ts) and handed
   down as one array, so filtering is a local array filter with no
   round trip and the chip counts are exact rather than estimated.
   ~330 cards is more DOM than any visitor wants at once, so the list
   reveals in pages of PAGE_SIZE and the counter always states the real
   total — a "load more" that hides how much is left reads as an
   endless scroll, which this deliberately is not.

   Theme boilerplate matches ScaffoldPage / IzSolutionsPage exactly,
   including the shared `is-theme` storage key, so a visitor who picked
   dark elsewhere on the site keeps it here.
   ============================================================ */

type Theme = "dark" | "paper";

const PAGE_SIZE = 24;

export function IzBlogPage({ posts, tags }: BlogIndexData) {
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

  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => (active ? posts.filter((p) => p.tags.some((t) => t.slug === active)) : posts),
    [posts, active]
  );

  const pick = (slug: string | null) => {
    setActive(slug);
    setShown(PAGE_SIZE);
  };

  const visible = filtered.slice(0, shown);
  const remaining = filtered.length - visible.length;

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------- hero ---------- */}
      <section className="izbl-hero iz-railed">
        <div className="iz-wrap izbl-herowrap">
          <span className="izbl-eyebrow">
            <Article weight="regular" aria-hidden="true" />
            Blog
          </span>
          <h1 className="izbl-h1">
            Insights From the <em>Zero Trust Front Line.</em>
          </h1>
          <p className="izbl-sub">
            Product thinking, threat analysis and migration playbooks from the InstaSafe team —
            {" "}{posts.length} posts, newest first.
          </p>
          <p className="izbl-note">
            Posts open on instasafe.com/blog
            <ArrowUpRight weight="bold" aria-hidden="true" />
          </p>
        </div>
      </section>

      {/* ---------- filter row + grid ---------- */}
      <section className="izbl-body iz-railed">
        <div className="iz-wrap">
          <div className="izbl-filters">
            <div className="izbl-chips" role="group" aria-label="Filter posts by topic">
              <button
                type="button"
                className="izbl-chip"
                aria-pressed={active === null}
                onClick={() => pick(null)}
              >
                All
                <i>{posts.length}</i>
              </button>
              {tags.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  className="izbl-chip"
                  aria-pressed={active === t.slug}
                  onClick={() => pick(t.slug)}
                >
                  {t.name}
                  <i>{t.count}</i>
                </button>
              ))}
            </div>

            <p className="izbl-count" aria-live="polite">
              Showing {visible.length} of {filtered.length}
            </p>
          </div>

          {visible.length > 0 ? (
            <ul className="izbl-grid">
              {visible.map((p) => (
                <IzBlogCard key={p.slug} post={p} />
              ))}
            </ul>
          ) : (
            <p className="izbl-empty">No posts carry this topic yet.</p>
          )}

          {remaining > 0 && (
            <div className="izbl-more">
              <button
                type="button"
                className="izbl-morebtn"
                onClick={() => setShown((n) => n + PAGE_SIZE)}
              >
                Load {Math.min(remaining, PAGE_SIZE)} more
                <i>{remaining} left</i>
              </button>
            </div>
          )}
        </div>
      </section>

      <IzFooterGrid />
    </div>
  );
}
