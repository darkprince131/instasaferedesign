"use client";

import type { JSX } from "react";

/* ============================================================
   Resource "Book" card — built like Cofounder's books.
   The book look comes from: asymmetric radius (sharp spine /
   round pages), a 16px spine gutter strip, layered paper
   shadow + embossed text. A subtle frosted pocket lip hugs
   the foot; hover lifts the book up out of it.

   Swap `cover` with any image URL (or a /public path).
   Keep titles SHORT — two short lines: chapter + name.
   ============================================================ */

export interface BookCardProps {
  chapter: string; // line 1, e.g. "Chapter 1"
  title: string; // line 2 (short), e.g. "How To Start"
  emphasis?: string; // optional word in `title` rendered in accent
  subLabel: string; // mono line under divider, e.g. "Chapter I"
  cover: string; // ← image URL you can change in the code
  alt?: string;
  author: string; // footer left, e.g. "by Cofounder"
  year: string; // footer right, e.g. "2026"
  ctaLabel: string; // caption, e.g. "Read this chapter (I)"
  href?: string;
}

function titleWithEmphasis(title: string, word?: string): JSX.Element {
  if (!word) return <>{title}</>;
  const i = title.toLowerCase().indexOf(word.toLowerCase());
  if (i === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, i)}
      <em>{title.slice(i, i + word.length)}</em>
      {title.slice(i + word.length)}
    </>
  );
}

export function BookCard({ chapter, title, emphasis, subLabel, cover, alt, author, year, ctaLabel, href = "#" }: BookCardProps) {
  return (
    <figure className="bc-figure">
      <a className="bc-link" href={href} draggable={false} aria-label={`${chapter}: ${title}`}>
        <div className="bc-stage">
          <div className="bc-lift">
            <div className="bc-book">
              <span className="bc-spine" aria-hidden="true" />
              <div className="bc-content">
                <div className="bc-head">
                  <h3 className="bc-title">
                    <span>{chapter}</span>
                    <span>{titleWithEmphasis(title, emphasis)}</span>
                  </h3>
                </div>
                <div className="bc-divider" />
                <div className="bc-sub">{subLabel}</div>
                <div className="bc-cover">
                  <img src={cover} alt={alt ?? `${chapter} — ${title}`} loading="lazy" />
                </div>
                <div className="bc-foot">
                  <span>{author}</span>
                  <span>{year}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bc-pocket" aria-hidden="true" />
        </div>
        <figcaption className="bc-caption">
          {ctaLabel}
          <span className="arrow" aria-hidden="true">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.4 2.27a.75.75 0 0 1 1.06 0l3.37 3.38a.75.75 0 0 1 0 1.06L7.46 9.73a.75.75 0 1 1-1.06-1.06l2.09-2.09H1.88a.75.75 0 0 1 0-1.5h6.6L6.4 3.33a.75.75 0 0 1 0-1.06Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </figcaption>
      </a>
    </figure>
  );
}

/* ---- placeholder cover generator (swap for real images) ---- */
function placeholder(sky: string, ground: string, accent: string): string {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 240'>` +
    `<rect width='320' height='240' fill='${sky}'/>` +
    `<g fill='${accent}' opacity='0.85'>` +
    `<rect x='44' y='150' width='34' height='34'/><rect x='78' y='150' width='34' height='34'/>` +
    `<rect x='150' y='120' width='34' height='34'/><rect x='184' y='120' width='34' height='34'/>` +
    `<rect x='240' y='150' width='34' height='34'/></g>` +
    `<rect x='0' y='184' width='320' height='56' fill='${ground}'/>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/* ---- demo data (matches the screenshot's chapters) ---- */
export const BOOK_DEMO: BookCardProps[] = [
  {
    chapter: "Chapter 1",
    title: "How To Start",
    subLabel: "Chapter I",
    cover: placeholder("#2E86E6", "#214E86", "#F2F4F8"),
    author: "by Cofounder",
    year: "2026",
    ctaLabel: "Read this chapter (I)",
  },
  {
    chapter: "Chapter 2",
    title: "How To Build",
    subLabel: "Chapter II",
    cover: placeholder("#7FB2E0", "#3A4A63", "#E8B23A"),
    author: "by Cofounder",
    year: "2026",
    ctaLabel: "Read this chapter (II)",
  },
  {
    chapter: "Chapter 3",
    title: "How To Scale",
    subLabel: "Chapter III",
    cover: placeholder("#173A2E", "#0E241C", "#46D38A"),
    author: "by Cofounder",
    year: "2026",
    ctaLabel: "Read this chapter (III)",
  },
];
