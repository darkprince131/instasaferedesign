"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

/* ============================================================
   Hero archetypes — five shapes, one type contract  (lab 00ad)

   WHY THIS EXISTS
   Fingerprint runs five structurally different heroes across its
   pages (text-only / split / split-with-visual-leading / centred
   text over a console / full-bleed). That variety — not different
   copy in the same box — is what stops consecutive pages feeling
   like one template with the words swapped. Audit: §A.5 of
   docs/research/fingerprint-audit-and-ideation.md.

   THE RULE THEY ALL OBEY (interaction-placement doctrine, rule 1)
   A hero is static. Headline + sub + CTA must carry the whole
   message alone. Nothing here responds to a cursor:
   - HeroConsole's console autoplays but accepts no input.
   - HeroImmersive is scroll-linked only, and its parallax is
     decoration — the copy sits in normal flow above it.
   Heavy interaction belongs at fold 2+, never here.

   PICKING ONE
     HeroSplit      use-case pages, features        (text L / visual R)
     HeroSplitFlip  the next use-case page          (visual L / text R;
                                                     visual FIRST on phones)
     HeroCentered   pillar pages, pricing, legal    (no visual at all)
     HeroConsole    technical product pages         (centred text, console under)
     HeroImmersive  the homepage, once              (full-bleed layered scene)

   Alternate Split / SplitFlip down a section family and no two
   pages read the same.
   ============================================================ */

type Cta = { label: string; href: string };

type HeroBase = {
  kicker?: string;
  title: React.ReactNode;
  sub?: string;
  primary?: Cta;
  secondary?: Cta;
  /** small proof line under the buttons — "No credit card", "SOC 2 · ISO 27001" */
  note?: React.ReactNode;
  /** dashed column rails + corner crosses from izgrid.css (default on) */
  rails?: boolean;
  className?: string;
};

/* ---------- shared internals ---------- */

function Rails() {
  return (
    <>
      <span className="iz-cross iz-cross--tl" aria-hidden="true" />
      <span className="iz-cross iz-cross--tr" aria-hidden="true" />
      <span className="iz-cross iz-cross--bl" aria-hidden="true" />
      <span className="iz-cross iz-cross--br" aria-hidden="true" />
    </>
  );
}

function Head({ kicker, title, sub, primary, secondary, note }: Omit<HeroBase, "rails" | "className">) {
  return (
    <div className="izh-head">
      {kicker && (
        <span className="izh-kicker">
          {kicker}
          <i aria-hidden="true">_</i>
        </span>
      )}

      <h1 className="izh-title">{title}</h1>

      {sub && <p className="izh-sub">{sub}</p>}

      {(primary || secondary) && (
        <div className="izh-ctas">
          {primary && (
            <a className="izh-btn izh-btn--primary" href={primary.href}>
              {primary.label}
              <ArrowRight weight="bold" aria-hidden="true" />
            </a>
          )}
          {secondary && (
            <a className="izh-btn izh-btn--ghost" href={secondary.href}>
              {secondary.label}
              <ArrowUpRight weight="bold" aria-hidden="true" />
            </a>
          )}
        </div>
      )}

      {note && <p className="izh-note">{note}</p>}
    </div>
  );
}

/* ---------- 1. HeroSplit — text left, visual right ---------- */

export function HeroSplit({ visual, rails = true, className = "", ...head }: HeroBase & { visual?: React.ReactNode }) {
  return (
    <header className={`izh izh--split ${rails ? "iz-railed" : ""} ${className}`}>
      {rails && <Rails />}
      <div className="iz-wrap izh-grid">
        <Head {...head} />
        {visual && <div className="izh-visual">{visual}</div>}
      </div>
    </header>
  );
}

/* ---------- 2. HeroSplitFlip — visual left, text right ----------
   On phones the visual comes FIRST (source order is text-then-visual,
   flipped with `order` at the narrow breakpoint), which is how
   Fingerprint's smart-signals hero behaves. Use it as the counterpart
   to HeroSplit so sibling pages don't share a silhouette. */

export function HeroSplitFlip({ visual, rails = true, className = "", ...head }: HeroBase & { visual?: React.ReactNode }) {
  return (
    <header className={`izh izh--split izh--flip ${rails ? "iz-railed" : ""} ${className}`}>
      {rails && <Rails />}
      <div className="iz-wrap izh-grid">
        <Head {...head} />
        {visual && <div className="izh-visual">{visual}</div>}
      </div>
    </header>
  );
}

/* ---------- 3. HeroCentered — text only ----------
   The shortest hero in the set on purpose (~300px of content, the
   way fingerprint.com/products/bot-detection sits). Its job is to
   break the rhythm of visual-carrying heroes. Give it no visual —
   adding one turns it into a worse HeroSplit. */

export function HeroCentered({ rails = true, className = "", ...head }: HeroBase) {
  return (
    <header className={`izh izh--centered ${rails ? "iz-railed" : ""} ${className}`}>
      {rails && <Rails />}
      <div className="iz-wrap">
        <Head {...head} />
      </div>
    </header>
  );
}

/* ---------- 4. HeroConsole — centred text, console beneath ----------
   `console` is any node: IzConsole, IzAppWindow, a code window. It
   must not require input to make its point. */

export function HeroConsole({
  console: consoleNode,
  caption,
  rails = true,
  className = "",
  ...head
}: HeroBase & { console?: React.ReactNode; caption?: string }) {
  return (
    <header className={`izh izh--console ${rails ? "iz-railed" : ""} ${className}`}>
      {rails && <Rails />}
      <div className="iz-wrap">
        <Head {...head} />
      </div>
      {consoleNode && (
        <div className="iz-wrap izh-consolewrap">
          <div className="izh-console">{consoleNode}</div>
          {caption && <p className="izh-caption">{caption}</p>}
        </div>
      )}
    </header>
  );
}

/* ---------- 5. HeroImmersive — full-bleed layered scene ----------
   hihobbes.com's "scrolling into a world" is one big image plus a
   scroll-linked transform — verified: 0 canvas, 0 video, 0 3D
   (audit §A.12). So this takes up to three stacked nodes and moves
   them at different rates. Two layers is usually enough.

   Scroll tracking follows the house pattern: rAF + getBoundingClientRect,
   gated by IntersectionObserver. Never window scroll events — they
   don't fire for every scroll container. */

export function HeroImmersive({
  back,
  mid,
  near,
  rails = false,
  className = "",
  ...head
}: HeroBase & { back?: React.ReactNode; mid?: React.ReactNode; near?: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let live = false;

    const tick = () => {
      const r = el.getBoundingClientRect();
      // 0 while the hero's top is at the viewport top, 1 once it has scrolled its own height
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      el.style.setProperty("--hp", p.toFixed(4));
      if (live) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (es) => {
        const on = es.some((e) => e.isIntersecting);
        if (on && !live) {
          live = true;
          raf = requestAnimationFrame(tick);
        } else if (!on && live) {
          live = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(el);

    return () => {
      live = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  return (
    <header ref={ref} className={`izh izh--immersive ${rails ? "iz-railed" : ""} ${className}`}>
      <div className="izh-scene" aria-hidden="true">
        {back && (
          <div className="izh-layer" style={{ ["--rate" as string]: 18 } as React.CSSProperties}>
            {back}
          </div>
        )}
        {mid && (
          <div className="izh-layer" style={{ ["--rate" as string]: 48 } as React.CSSProperties}>
            {mid}
          </div>
        )}
        {near && (
          <div className="izh-layer izh-layer--near" style={{ ["--rate" as string]: 88 } as React.CSSProperties}>
            {near}
          </div>
        )}
      </div>
      <div className="iz-wrap izh-over">
        <Head {...head} />
      </div>
    </header>
  );
}
