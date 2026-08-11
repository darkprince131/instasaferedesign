"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ClipboardText, MagnifyingGlass } from "@phosphor-icons/react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { izFontVars } from "@/lib/iz-fonts";
import {
  BROCHURES,
  PRODUCT_VIDEOS,
  TOPICS,
  WEBINARS,
  type Brochure,
  type VideoItem,
} from "@/lib/resource-center";
import { IzBrochureCard } from "./IzBrochureCard";
import { IzVideoCard } from "./IzVideoCard";
import { IzVideoLightbox } from "./IzVideoLightbox";

/* ============================================================
   /resource-center — the index.

   Everything is a static import, so there is no fetch, no loading
   state and no pagination: 42 items is a page you scroll, not a page
   you page through. Search and the topic chips are plain array filters
   over that constant.

   Structure mirrors the old WordPress page's three sections —
   brochures, webinars, product videos — because those are the
   distinctions a visitor actually makes ("give me the PDF" vs "give me
   the 40-minute session" vs "give me the 3-minute demo"). The type tabs
   let them collapse to one; the topic chips only apply to documents,
   because tagging 15 videos into six topics would leave most chips
   holding one item.

   Theme boilerplate matches IzBlogPage / ScaffoldPage exactly,
   including the shared `is-theme` storage key.
   ============================================================ */

type Theme = "dark" | "paper";
type Tab = "all" | "docs" | "webinars" | "videos";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "Everything" },
  { key: "docs", label: "Documents" },
  { key: "webinars", label: "Webinars" },
  { key: "videos", label: "Product videos" },
];

/* Carried over from the scaffold entry this route replaced (lib/site.ts,
   `/resource-center` tiles). Those destinations are the rest of the
   resource surface and are not documents, so they sit below the grid
   rather than inside it. */
const ELSEWHERE = [
  {
    h: "Blog",
    p: "Zero trust, ZTNA, MFA and identity — product thinking, threat analysis and migration playbooks from the team.",
    href: "/resources/blog",
    cta: "Read the blog",
  },
  {
    h: "Events & Meetups",
    p: "InstaSafe meetups, roundtables and conference sessions — where the team is speaking next, and what you missed.",
    href: "https://meetups.instasafe.com/events",
    cta: "Upcoming events",
  },
  {
    h: "Case Studies",
    p: "How banks, ITES firms and manufacturers actually deployed InstaSafe — and what changed once they did.",
    href: "/case-studies",
    cta: "Read the case studies",
  },
];

/** Case-insensitive substring match over the fields a visitor would
    plausibly type. Not fuzzy — a typo returning nothing is clearer
    than a typo returning the wrong three cards. */
function matches(q: string, ...fields: string[]) {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
}

export function IzResourceCenter() {
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

  const [tab, setTab] = useState<Tab>("all");
  const [topic, setTopic] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [playing, setPlaying] = useState<VideoItem | null>(null);

  const docs: Brochure[] = useMemo(
    () =>
      BROCHURES.filter(
        (b) => (!topic || b.topic === topic) && matches(q, b.title, b.blurb, b.topic)
      ),
    [topic, q]
  );

  const webinars = useMemo(
    () => WEBINARS.filter((v) => matches(q, v.title, v.blurb)),
    [q]
  );
  const videos = useMemo(
    () => PRODUCT_VIDEOS.filter((v) => matches(q, v.title, v.blurb)),
    [q]
  );

  const showDocs = tab === "all" || tab === "docs";
  const showWebinars = tab === "all" || tab === "webinars";
  const showVideos = tab === "all" || tab === "videos";

  const total =
    (showDocs ? docs.length : 0) +
    (showWebinars ? webinars.length : 0) +
    (showVideos ? videos.length : 0);

  const counts: Record<Tab, number> = {
    all: BROCHURES.length + WEBINARS.length + PRODUCT_VIDEOS.length,
    docs: BROCHURES.length,
    webinars: WEBINARS.length,
    videos: PRODUCT_VIDEOS.length,
  };

  return (
    <div className={`iz ${izFontVars}`} data-theme={theme} data-system="orange">
      <IzNav theme={theme} onThemeChange={onThemeChange} />

      {/* ---------- hero ---------- */}
      <section className="izrc-hero iz-railed">
        <div className="iz-wrap izrc-herowrap">
          <span className="izrc-eyebrow">
            <ClipboardText weight="regular" aria-hidden="true" />
            Resource Center
          </span>
          <h1 className="izrc-h1">
            Every Brochure, Whitepaper and <em>Recording,</em> In One Place.
          </h1>
          <p className="izrc-sub">
            {BROCHURES.length} documents, {WEBINARS.length} recorded webinars and{" "}
            {PRODUCT_VIDEOS.length} product videos covering Zero Trust access, MFA, identity
            and the migration off legacy VPN. No form to fill in — everything opens directly.
          </p>
        </div>
      </section>

      {/* ---------- controls ---------- */}
      <section className="izrc-body iz-railed">
        <div className="iz-wrap">
          <div className="izrc-controls">
            <div className="izrc-tabs" role="group" aria-label="Filter by resource type">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className="izrc-tab"
                  aria-pressed={tab === t.key}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                  <i>{counts[t.key]}</i>
                </button>
              ))}
            </div>

            <label className="izrc-search">
              <MagnifyingGlass weight="bold" aria-hidden="true" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search resources"
                aria-label="Search resources"
              />
            </label>
          </div>

          {/* Topic chips are document-only — see the note at the top. */}
          {showDocs && (
            <div className="izrc-chips" role="group" aria-label="Filter documents by topic">
              <button
                type="button"
                className="izrc-chip"
                aria-pressed={topic === null}
                onClick={() => setTopic(null)}
              >
                All topics
                <i>{BROCHURES.length}</i>
              </button>
              {TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  className="izrc-chip"
                  aria-pressed={topic === t}
                  onClick={() => setTopic(topic === t ? null : t)}
                >
                  {t}
                  <i>{BROCHURES.filter((b) => b.topic === t).length}</i>
                </button>
              ))}
            </div>
          )}

          <p className="izrc-count" aria-live="polite">
            {total} {total === 1 ? "resource" : "resources"}
            {q ? ` matching “${q}”` : ""}
          </p>

          {total === 0 && (
            <p className="izrc-empty">
              Nothing matches that. Try a broader term — “VPN”, “MFA”, “compliance”.
            </p>
          )}

          {/* ---------- documents ---------- */}
          {showDocs && docs.length > 0 && (
            <section className="izrc-sec" aria-labelledby="izrc-h-docs">
              <header className="izrc-sechead">
                <h2 id="izrc-h-docs" className="izrc-h2">
                  Brochures &amp; Whitepapers
                </h2>
                <p className="izrc-secnote">Datasheets, comparisons and technical whitepapers — PDF.</p>
              </header>
              <ul className="izrc-grid">
                {docs.map((b) => (
                  <IzBrochureCard key={b.id} item={b} />
                ))}
              </ul>
            </section>
          )}

          {/* ---------- webinars ---------- */}
          {showWebinars && webinars.length > 0 && (
            <section className="izrc-sec" aria-labelledby="izrc-h-web">
              <header className="izrc-sechead">
                <h2 id="izrc-h-web" className="izrc-h2">
                  Webinars
                </h2>
                <p className="izrc-secnote">Full recorded sessions. They play here, not on YouTube.</p>
              </header>
              <ul className="izrc-grid izrc-grid--vid">
                {webinars.map((v) => (
                  <IzVideoCard key={v.id} item={v} kind="Webinar" onOpen={setPlaying} />
                ))}
              </ul>
            </section>
          )}

          {/* ---------- product videos ---------- */}
          {showVideos && videos.length > 0 && (
            <section className="izrc-sec" aria-labelledby="izrc-h-vid">
              <header className="izrc-sechead">
                <h2 id="izrc-h-vid" className="izrc-h2">
                  Product Videos
                </h2>
                <p className="izrc-secnote">Short feature explainers and the full product demo.</p>
              </header>
              <ul className="izrc-grid izrc-grid--vid">
                {videos.map((v) => (
                  <IzVideoCard key={v.id} item={v} kind="Product video" onOpen={setPlaying} />
                ))}
              </ul>
            </section>
          )}
          {/* ---------- elsewhere ---------- */}
          <section className="izrc-sec" aria-labelledby="izrc-h-else">
            <header className="izrc-sechead">
              <h2 id="izrc-h-else" className="izrc-h2">
                Elsewhere
              </h2>
              <p className="izrc-secnote">The rest of the resource surface.</p>
            </header>
            <ul className="izrc-else">
              {ELSEWHERE.map((e) => (
                <li key={e.href} className="izrc-elsecard">
                  <a href={e.href}>
                    <h3 className="izrc-title">{e.h}</h3>
                    <p className="izrc-blurb">{e.p}</p>
                    <span className="izrc-go">
                      {e.cta}
                      <ArrowUpRight weight="bold" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <IzVideoLightbox video={playing} onClose={() => setPlaying(null)} />

      <IzFooterGrid />
    </div>
  );
}
