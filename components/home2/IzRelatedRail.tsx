"use client";

import { useState } from "react";

import { SCENE_THUMB } from "@/lib/og-scenes";

/* ============================================================
   00aw · IzRelatedRail — the `Related:` line already written at the
   bottom of nearly every Content Master page (~42 of them).

   NO 01–04 markers: related pages are a SET, not a sequence, and
   numbering them would assert an order the content does not have.
   The thumbnail plus the descriptor line is what earns the click —
   a bare list of page names is a sitemap, not a rail.

     cards    — thumbnail card per page. The default.
     clusters — compact text rail grouped by cluster, so it teaches
                site structure while it links. Best on industry
                pages and anywhere a full card grid would outweigh
                the section above it.

   ▸ THUMBNAILS ◂ a card resolves its art in three steps: an explicit
   `thumb` wins, then the isometric scene the linked route's SOCIAL CARD
   uses (lib/og-scenes.ts, keyed by href), then the drawn placeholder.
   The middle step is the one that matters: a rail card and the preview
   that appears when someone shares the same page are now the same
   drawing, so the site looks like one hand made it. Fifteen routes have
   a scene; everything else keeps the motif, and a 404 falls back too, so
   the grid never renders as grey boxes or broken images.
   ============================================================ */

export type RelatedLink = {
  /** cluster/kind label — also selects the placeholder motif */
  kind?: "platform" | "solution" | "resource" | "industry" | (string & {});
  title: string;
  href: string;
  /** the descriptor line — this is what earns the click */
  desc?: string;
  /** e.g. "/related/zero-trust-application-access.webp" */
  thumb?: string;
};

export type RelatedCluster = {
  label: string;
  links: { title: string; href: string }[];
};

type Props = {
  variant?: "cards" | "clusters";
  label?: string;
  links?: RelatedLink[];
  clusters?: RelatedCluster[];
  className?: string;
};

/* ---------- placeholder art ----------
   Drawn, not a grey rectangle: each motif is a one-idea diagram in
   the accent, so a rail of placeholders still reads as designed
   while the real thumbnails are being produced. */
function ThumbArt({ kind }: { kind?: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg viewBox="0 0 160 90" className="izrr-art" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {kind === "solution" ? (
        /* many paths converging into one */
        <g {...common}>
          <path d="M18 24h34c10 0 12 21 22 21h30" />
          <path d="M18 45h34" />
          <path d="M18 66h34c10 0 12-21 22-21" />
          <circle cx="104" cy="45" r="6" />
          <path d="M116 45h26" />
          <circle cx="18" cy="24" r="2.6" />
          <circle cx="18" cy="45" r="2.6" />
          <circle cx="18" cy="66" r="2.6" />
        </g>
      ) : kind === "resource" ? (
        /* a document: rules of text with one highlighted */
        <g {...common}>
          <rect x="44" y="16" width="72" height="58" rx="3" />
          <path d="M56 32h34M56 42h48M56 62h30" />
          <path d="M56 52h48" strokeWidth={2.6} />
        </g>
      ) : kind === "industry" ? (
        /* a skyline of governed sites */
        <g {...common}>
          <path d="M22 70h116" />
          <rect x="34" y="44" width="22" height="26" />
          <rect x="64" y="30" width="24" height="40" />
          <rect x="96" y="50" width="20" height="20" />
          <path d="M76 30V20" />
          <circle cx="76" cy="17" r="2.6" />
        </g>
      ) : (
        /* platform / default: one verified node inside a perimeter */
        <g {...common}>
          <circle cx="80" cy="45" r="7" />
          <circle cx="80" cy="45" r="19" strokeDasharray="3 5" />
          <circle cx="80" cy="45" r="31" strokeDasharray="2 7" />
          <path d="M80 14V6M80 84v-8M111 45h8M41 45h-8" />
        </g>
      )}
    </svg>
  );
}

function Thumb({ link }: { link: RelatedLink }) {
  const [failed, setFailed] = useState(false);
  /* hrefs are authored with and without a trailing slash across the site */
  const scene = SCENE_THUMB[link.href.replace(/\/+$/, "") || "/"];
  const src = link.thumb ?? scene;
  const showArt = !src || failed;
  return (
    /* The scenes are drawn on bone and are 5:4, so `cover` inside a 16:9
       thumb would crop a third of the illustration away. They are let-
       terboxed instead, on a ground the same bone as their own — which
       makes the letterbox invisible and the card read as one surface. */
    <span className={`izrr-thumb${!showArt && src === scene ? " izrr-thumb--scene" : ""}`}>
      {showArt ? (
        <ThumbArt kind={link.kind} />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} />
      )}
      {link.kind && <span className="izrr-kind">{link.kind}</span>}
    </span>
  );
}

export function IzRelatedRail({
  variant = "cards",
  label = "related",
  links = [],
  clusters = [],
  className,
}: Props) {
  const root = className ? `izrr izrr--${variant} ${className}` : `izrr izrr--${variant}`;

  return (
    <nav className={root} aria-label="Related pages">
      <p className="izrr-mlab">
        {label}
        <i aria-hidden="true">_</i>
      </p>

      {variant === "clusters" ? (
        <div className="izrr-clusters">
          {clusters.map((c) => (
            <div key={c.label} className="izrr-cluster">
              <p className="izrr-mlab izrr-mlab--sub">
                {c.label}
                <i aria-hidden="true">_</i>
              </p>
              {c.links.map((l) => (
                <a key={`${l.href}|${l.title}`} href={l.href} className="izrr-line">
                  <span>{l.title}</span>
                  <i aria-hidden="true">→</i>
                </a>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="izrr-cards">
          {/* keyed on href+title, not href alone: one rail linking twice to
              the same target is legitimate (the lab's fallback demo points
              all four cards at #relatedrail to show the three thumb states),
              and `key={l.href}` made those four collide. */}
          {links.map((l) => (
            <a key={`${l.href}|${l.title}`} href={l.href} className="izrr-card">
              <Thumb link={l} />
              <span className="izrr-body">
                <span className="izrr-title">
                  {l.title}
                  <i aria-hidden="true">→</i>
                </span>
                {l.desc && <span className="izrr-desc">{l.desc}</span>}
              </span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
