"use client";

import { useEffect, useId, useRef } from "react";
import { BookOpen, Code, Key, Terminal, ArrowUpRight, Star, DownloadSimple, type Icon } from "@phosphor-icons/react";

/* ============================================================
   IzDevBand — TIER 2 SECTION  (lab 00aj)

   Ported from the "The original fingerprinting library" band on
   fingerprint.com's homepage. Measured from the live DOM:
     - one dark rounded panel, bg #1a1917, 16px radius, 654px tall
     - an SVG sparkline on viewBox 0 0 1231 438 with exactly two
       paths: a gradient-filled area and a 1.5px stroked line
     - copy stacked top-left, a 2x2 grid of link tiles under it
     - stats row, then a bordered strip of technology logos

   We get the dark surface for free: the band carries `.iz-inverted`,
   so every token flips inside it and nothing here hardcodes a hex.
   That also means it looks right on BOTH themes without a variant.

   ⚠️ NUMBERS: `stats` and the series are illustrative defaults so the
   component has a shape in the lab. Wire real figures from the
   Content Master before this ships on a page, and keep the `note`
   line until you do.
   ============================================================ */

type Link = { label: string; href: string; Icon: Icon };
type Stat = { value: string; label: string; Icon?: Icon };

const LINKS: Link[] = [
  { label: "Deployment guide", href: "/docs/deploy", Icon: BookOpen },
  { label: "Policy reference", href: "/docs/policy", Icon: Code },
  { label: "Request API key", href: "/contact", Icon: Key },
  { label: "CLI & automation", href: "/docs/cli", Icon: Terminal },
];

const STATS: Stat[] = [
  { value: "24", label: "Enforcement controls", Icon: Star },
  { value: "2 min", label: "To your first published app", Icon: DownloadSimple },
];

const TECH = ["Windows", "macOS", "Linux", "Android", "iOS", "Entra ID", "Okta", "Google", "AD", "LDAP", "SAML", "OIDC"];

/* A deterministic rising series — no Math.random in render, so SSR and
   the client agree (house rule). Shape: steady climb, one dip, recovery. */
const SERIES = [
  12, 14, 13, 17, 19, 18, 22, 25, 24, 28, 31, 30, 34, 38, 37, 41, 45, 44, 48, 52, 51, 55, 60, 58, 63, 68, 66, 52, 57,
  64, 71, 76, 74, 80, 85, 83, 89, 94, 92, 98,
];

function Sparkline() {
  const uid = useId().replace(/:/g, "");
  const w = 1231;
  const h = 438;
  const max = Math.max(...SERIES);
  const min = Math.min(...SERIES);
  const pts = SERIES.map((v, i) => {
    const x = (i / (SERIES.length - 1)) * w;
    const y = h - 18 - ((v - min) / (max - min || 1)) * (h - 70);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;

  return (
    <svg
      className="izdb-spark"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Illustrative growth trend"
    >
      <defs>
        <linearGradient id={`izdb-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent)" stopOpacity="0.34" />
          <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#izdb-${uid})`} />
      <path
        d={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/* ---------- hover scrub ----------
   Cursor at the right edge → the whole line. Halfway → half of it.
   Near the left → just the start. Same behaviour as the "For
   Developers" graph on fingerprint.com.

   Rest state is FULL, deliberately: that is also the no-JS state and
   the touch state, and a chart that sits permanently truncated looks
   broken rather than interactive. Pointer devices only — gated on
   `(hover: hover)`, so a tap on a phone never leaves it cropped. */
function Scrubber() {
  const ref = useRef<HTMLDivElement>(null);

  /* Native listeners rather than React's onPointerMove/onPointerLeave:
     enter/leave events don't bubble, React synthesises them, and a
     missed `leave` would strand the chart cropped after the cursor
     walks off. Binding straight to the element removes that class of
     bug entirely. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const set = (v: number, x: number | null) => {
      el.style.setProperty("--reveal", v.toFixed(4));
      el.style.setProperty("--guide", x === null ? "-100px" : `${x}px`);
    };

    const canHover = () => window.matchMedia?.("(hover: hover)").matches ?? false;
    if (!canHover()) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const x = Math.min(Math.max(e.clientX - r.left, 0), r.width);
      // floor at 6% so the chart never disappears entirely at the far left
      set(Math.max(0.06, x / r.width), x);
    };
    const reset = () => set(1, null);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointercancel", reset);
    };
  }, []);

  return (
    <div className="izdb-graph" ref={ref}>
      <Sparkline />
      <span className="izdb-guide" aria-hidden="true" />
    </div>
  );
}

export function IzDevBand({
  kicker = "For security teams",
  title = (
    <>
      Built to be <mark>verified</mark>,
      <br />
      not taken on trust
    </>
  ),
  sub = "Every decision is an API call you can read, replay and export. No black box between your people and your applications.",
  links = LINKS,
  stats = STATS,
  tech = TECH,
  note = "Trend shown is illustrative",
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
  links?: Link[];
  stats?: Stat[];
  tech?: string[];
  note?: string;
}) {
  return (
    <section className="izdb iz-railed">
      <div className="iz-wrap">
        {/* .iz-inverted flips every token — no hardcoded dark values below */}
        <div className="izdb-band iz-inverted">
          <div className="izdb-inner">
            <span className="izdb-kicker">
              {kicker}
              <i aria-hidden="true">_</i>
            </span>
            <h2 className="izdb-title">{title}</h2>
            <p className="izdb-sub">{sub}</p>

            <div className="izdb-links">
              {links.map((l) => (
                <a key={l.label} className="izdb-link" href={l.href}>
                  <span className="izdb-lico" aria-hidden="true">
                    <l.Icon weight="regular" />
                  </span>
                  <span className="izdb-ltext">{l.label}</span>
                  <ArrowUpRight className="izdb-lgo" weight="bold" aria-hidden="true" />
                </a>
              ))}
            </div>

          </div>

          {/* Its own row, not a backdrop. The line used to run behind
              the copy; now nothing overlaps it. */}
          <Scrubber />

          <div className="izdb-meta">
            <div className="izdb-stats">
              {stats.map((s) => (
                <div key={s.label} className="izdb-stat">
                  <span className="izdb-svalue">
                    {s.Icon && <s.Icon weight="regular" aria-hidden="true" />}
                    {s.value}
                  </span>
                  <span className="izdb-slabel">{s.label}</span>
                </div>
              ))}
            </div>
            {note && <span className="izdb-note">{note}</span>}
          </div>

          <div className="izdb-tech" aria-label="Supported platforms and identity providers">
            {tech.map((t) => (
              <span key={t} className="izdb-chip">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
