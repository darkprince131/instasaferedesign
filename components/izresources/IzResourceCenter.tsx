"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, ClipboardText, MagnifyingGlass } from "@phosphor-icons/react";
import { IzNav } from "@/components/home2/IzNav";
import { IzFooterGrid } from "@/components/home2/IzFooterGrid";
import { BookCard } from "@/components/home2/BookCard";
import { izFontVars } from "@/lib/iz-fonts";
import {
  BROCHURES,
  PRODUCT_VIDEOS,
  TOPICS,
  WEBINARS,
  brochureHref,
  type Brochure,
  type VideoItem,
} from "@/lib/resource-center";
import { DocPlate } from "./BookCoverArt";
import { ThumbCover } from "./ThumbCover";
import { BROCHURES_THUMBS } from "@/lib/thumbs";
import { IzVideoCard } from "./IzVideoCard";
import { IzVideoLightbox } from "./IzVideoLightbox";

/* ============================================================
   /resource-center — the index.

   Everything is a static import, so there is no fetch, no loading
   state and no pagination: 42 items is a page you scroll, not a page
   you page through. Search and the topic chips are plain array filters
   over that constant.

   ---------------------------------------------------------------
   SUBNAV, NOT TABS.

   The page has exactly three sections — product brochures, webinars,
   product videos — and a sticky subnav that jumps between them. It
   used to be a four-way tab filter ("Everything" plus the three), and
   the difference matters: tabs HIDE two thirds of the library behind a
   click, and the whole argument of this page is that the library is
   large and open. The subnav keeps every section mounted, scrolls to
   the one you picked, and highlights whichever one you are currently
   reading. Search still filters all three at once, because a person
   searching "MFA" wants the whitepaper AND the demo video.

   ---------------------------------------------------------------
   CARD SHAPES.

   Brochures are the 00e book-in-pocket card (`variant="headline"`) —
   a PDF is a document, and a document on a shelf reads faster than a
   document in a table row. The cover plate is drawn per topic, so the
   picture tells you what kind of document it is before the title does.
   Videos keep the 16:9 poster card: a real thumbnail exists for those,
   and pretending a video is a book would be a lie about what opens.

   Theme boilerplate matches IzBlogPage / ScaffoldPage exactly,
   including the shared `is-theme` storage key.
   ============================================================ */

type Theme = "dark" | "paper";
type SectionKey = "brochures" | "webinars" | "videos";

const SUBNAV: { key: SectionKey; label: string; count: number }[] = [
  { key: "brochures", label: "Product Brochures", count: BROCHURES.length },
  { key: "webinars", label: "Webinars", count: WEBINARS.length },
  { key: "videos", label: "Product Videos", count: PRODUCT_VIDEOS.length },
];

/* Carried over from the scaffold entry this route replaced (lib/site.ts,
   `/resource-center` tiles). Those destinations are the rest of the
   resource surface and are not documents, so they sit below the grid
   rather than inside it. */
const ELSEWHERE = [
  {
    h: "Blog",
    p: "Zero trust, ZTNA, MFA and identity — product thinking, threat analysis and migration playbooks from the team.",
    href: "/blog",
    cta: "Read the blog",
  },
  {
    h: "Newsroom",
    p: "Bylines, interviews and the coverage InstaSafe has picked up across the Indian and global tech press.",
    href: "/instasafe-newsroom",
    cta: "See the coverage",
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

  const [topic, setTopic] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [playing, setPlaying] = useState<VideoItem | null>(null);
  const [active, setActive] = useState<SectionKey>("brochures");

  const docs: Brochure[] = useMemo(
    () =>
      BROCHURES.filter(
        (b) => (!topic || b.topic === topic) && matches(q, b.title, b.blurb, b.topic)
      ),
    [topic, q]
  );

  const webinars = useMemo(() => WEBINARS.filter((v) => matches(q, v.title, v.blurb)), [q]);
  const videos = useMemo(() => PRODUCT_VIDEOS.filter((v) => matches(q, v.title, v.blurb)), [q]);

  const total = docs.length + webinars.length + videos.length;

  /* Scrollspy. The rootMargin pulls the detection line down past the
     sticky nav + subnav (66px + ~54px) so a section counts as "active"
     when its heading clears the chrome, not when its top edge touches
     the viewport — otherwise the highlight flips one section early. */
  const secRefs = useRef<Record<SectionKey, HTMLElement | null>>({
    brochures: null,
    webinars: null,
    videos: null,
  });

  useEffect(() => {
    const els = (Object.keys(secRefs.current) as SectionKey[])
      .map((k) => [k, secRefs.current[k]] as const)
      .filter((pair): pair is readonly [SectionKey, HTMLElement] => pair[1] !== null);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        /* Topmost visible section wins — with three tall sections more
           than one is on screen constantly. */
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        const hit = els.find(([, el]) => el === top.target);
        if (hit) setActive(hit[0]);
      },
      { rootMargin: "-124px 0px -55% 0px", threshold: 0 }
    );

    els.forEach(([, el]) => io.observe(el));
    return () => io.disconnect();
  }, []);

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

      {/* ---------- subnav (the three sections) ---------- */}
      <nav className="izrc-subnav" aria-label="Resource sections">
        <div className="iz-wrap izrc-subnav-in">
          {SUBNAV.map((s) => (
            <a
              key={s.key}
              href={`#${s.key}`}
              className="izrc-subitem"
              aria-current={active === s.key ? "true" : undefined}
            >
              {s.label}
              <i>{s.count}</i>
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- controls ---------- */}
      <section className="izrc-body iz-railed">
        <div className="iz-wrap">
          <div className="izrc-controls">
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

          <p className="izrc-count" aria-live="polite">
            {total} {total === 1 ? "resource" : "resources"}
            {q ? ` matching “${q}”` : ""}
            {topic ? ` · documents filtered to ${topic}` : ""}
          </p>

          {total === 0 && (
            <p className="izrc-empty">
              Nothing matches that. Try a broader term — “VPN”, “MFA”, “compliance”.
            </p>
          )}

          {/* ---------- product brochures ---------- */}
          <section
            className="izrc-sec"
            id="brochures"
            aria-labelledby="izrc-h-docs"
            ref={(el) => {
              secRefs.current.brochures = el;
            }}
          >
            <header className="izrc-sechead">
              <h2 id="izrc-h-docs" className="izrc-h2">
                Product Brochures
              </h2>
              <p className="izrc-secnote">
                Datasheets, comparison sheets and technical whitepapers — PDF, no gate.
              </p>
            </header>
            {docs.length > 0 ? (
              <ul className="izbk-grid">
                {docs.map((b) => (
                  <li key={b.id} className="izbk-item">
                    <BookCard
                      variant="headline"
                      external
                      href={brochureHref(b)}
                      chapter={b.topic}
                      title={b.title}
                      subLabel={b.pages ? `PDF · ~${b.pages} pp` : "PDF"}
                      coverArt={
                        <ThumbCover
                          id={b.id}
                          src={BROCHURES_THUMBS[b.id]}
                          alt={`${b.title} — cover`}
                          art={<DocPlate topic={b.topic} />}
                          /* the thumbnail is a mockup of the PDF's own
                             cover — crop it and you cut the wordmark */
                          fit="contain"
                        />
                      }
                      author="InstaSafe"
                      year="↓"
                      ctaLabel="Download the PDF"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="izrc-empty">No documents match that filter.</p>
            )}
          </section>

          {/* ---------- webinars ---------- */}
          <section
            className="izrc-sec"
            id="webinars"
            aria-labelledby="izrc-h-web"
            ref={(el) => {
              secRefs.current.webinars = el;
            }}
          >
            <header className="izrc-sechead">
              <h2 id="izrc-h-web" className="izrc-h2">
                Webinars
              </h2>
              <p className="izrc-secnote">Full recorded sessions. They play here, not on YouTube.</p>
            </header>
            {webinars.length > 0 ? (
              <ul className="izrc-grid izrc-grid--vid">
                {webinars.map((v) => (
                  <IzVideoCard key={v.id} item={v} kind="Webinar" onOpen={setPlaying} />
                ))}
              </ul>
            ) : (
              <p className="izrc-empty">No webinars match that search.</p>
            )}
          </section>

          {/* ---------- product videos ---------- */}
          <section
            className="izrc-sec"
            id="videos"
            aria-labelledby="izrc-h-vid"
            ref={(el) => {
              secRefs.current.videos = el;
            }}
          >
            <header className="izrc-sechead">
              <h2 id="izrc-h-vid" className="izrc-h2">
                Product Videos
              </h2>
              <p className="izrc-secnote">Short feature explainers and the full product demo.</p>
            </header>
            {videos.length > 0 ? (
              <ul className="izrc-grid izrc-grid--vid">
                {videos.map((v) => (
                  <IzVideoCard key={v.id} item={v} kind="Product video" onOpen={setPlaying} />
                ))}
              </ul>
            ) : (
              <p className="izrc-empty">No product videos match that search.</p>
            )}
          </section>

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
