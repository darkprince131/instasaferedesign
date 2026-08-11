import type { JSX } from "react";

/* ============================================================
   BookCoverArt — the plate that sits in a BookCard's cover slot.

   These replace the raster `cover` image the lab demo ships with.
   Nothing in the press list or the PDF library has a real cover
   image, and a grid of 35 identical grey rectangles is worse than
   no image at all — so the cover is drawn instead, in the same
   patent-drawing line vocabulary as the rest of the site: mono-weight
   strokes on --il-ink, faint scaffolding on --il-faint, and exactly
   ONE orange element per plate (--il-accent).

   Because they are inline SVG using CSS variables, they flip with the
   theme toggle. A PNG could not.

   Two families:
     · PressPlate — six clipping layouts, picked deterministically
       from the item id, so a long grid never shows the same plate
       twice in a row but the same article always looks the same.
     · DocPlate — one layout per resource topic, so the shape of the
       plate tells you what kind of document it is before you read.

   Every plate is 320×150 and stroke-width 1.4 at that scale, which is
   the house line weight once the card scales it down to ~250px wide.
   ============================================================ */

const VB = "0 0 320 150";

/* Deterministic 0..n-1 from a slug. Same string → same plate, always. */
function pick(seed: string, n: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % n;
}

/* Shared scaffolding: the faint plate border every drawing sits in. */
function Frame() {
  return (
    <rect
      x="0.7"
      y="0.7"
      width="318.6"
      height="148.6"
      rx="4"
      fill="none"
      stroke="var(--il-faint)"
      strokeWidth="1.4"
    />
  );
}

/** A run of text-bars. `w` is a list of widths as fractions of `span`. */
function Bars({
  x,
  y,
  span,
  widths,
  gap = 9,
  h = 4,
  opacity = 0.28,
}: {
  x: number;
  y: number;
  span: number;
  widths: number[];
  gap?: number;
  h?: number;
  opacity?: number;
}) {
  return (
    <g fill="var(--il-ink)" opacity={opacity}>
      {widths.map((w, i) => (
        <rect key={i} x={x} y={y + i * (h + gap)} width={span * w} height={h} rx={h / 2} />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------
   PRESS PLATES — six newspaper-clipping layouts
   ------------------------------------------------------------ */

const PRESS_PLATES: ((key: string) => JSX.Element)[] = [
  /* 0 — masthead over two columns, orange rule under the masthead */
  () => (
    <>
      <Bars x={22} y={22} span={276} widths={[0.42]} h={7} opacity={0.5} />
      <rect x="22" y="40" width="120" height="2.4" fill="var(--il-accent)" />
      <Bars x={22} y={56} span={128} widths={[1, 0.92, 1, 0.64]} />
      <Bars x={172} y={56} span={126} widths={[1, 0.86, 0.97, 0.5]} />
      <line x1="160" y1="52" x2="160" y2="128" stroke="var(--il-faint)" strokeWidth="1.4" />
    </>
  ),

  /* 1 — pull-quote: big orange quote mark beside a stacked column */
  () => (
    <>
      <g fill="var(--il-accent)">
        <path d="M30 46h13l-6 15h8v18H24V61z" />
        <path d="M52 46h13l-6 15h8v18H46V61z" />
      </g>
      <Bars x={96} y={44} span={200} widths={[1, 0.93, 0.72]} h={5} gap={11} opacity={0.34} />
      <line x1="96" y1="102" x2="296" y2="102" stroke="var(--il-faint)" strokeWidth="1.4" />
      <Bars x={96} y={114} span={200} widths={[0.34]} h={4} opacity={0.24} />
    </>
  ),

  /* 2 — photo box left, caption column right; orange crop corner */
  () => (
    <>
      <rect
        x="22"
        y="26"
        width="112"
        height="98"
        rx="3"
        fill="none"
        stroke="var(--il-ink)"
        strokeWidth="1.4"
        opacity="0.32"
      />
      <path
        d="M22 96l30-26 24 20 20-16 38 30"
        fill="none"
        stroke="var(--il-ink)"
        strokeWidth="1.4"
        opacity="0.32"
      />
      <circle cx="52" cy="50" r="8" fill="none" stroke="var(--il-accent)" strokeWidth="1.4" />
      <Bars x={152} y={30} span={146} widths={[0.82]} h={6} opacity={0.5} />
      <Bars x={152} y={50} span={146} widths={[1, 0.9, 1, 0.66, 0.88]} />
    </>
  ),

  /* 3 — broadcast / podcast: waveform, one orange peak */
  () => {
    const bars = [10, 22, 38, 26, 52, 34, 66, 44, 30, 56, 24, 40, 18, 30, 12, 26, 44, 20, 34, 14];
    return (
      <>
        <Bars x={22} y={24} span={200} widths={[0.5]} h={6} opacity={0.5} />
        {bars.map((h, i) => (
          <rect
            key={i}
            x={24 + i * 14}
            y={104 - h}
            width="6"
            height={h}
            rx="3"
            fill={i === 6 ? "var(--il-accent)" : "var(--il-ink)"}
            opacity={i === 6 ? 1 : 0.26}
          />
        ))}
        <line x1="22" y1="110" x2="298" y2="110" stroke="var(--il-faint)" strokeWidth="1.4" />
        <Bars x={22} y={122} span={276} widths={[0.28]} h={4} opacity={0.24} />
      </>
    );
  },

  /* 4 — three-column brief, orange dateline dot */
  () => (
    <>
      <circle cx="27" cy="27" r="4" fill="var(--il-accent)" />
      <Bars x={38} y={24} span={260} widths={[0.36]} h={6} opacity={0.5} />
      {[22, 124, 226].map((x) => (
        <g key={x}>
          <Bars x={x} y={54} span={72} widths={[1, 0.84, 1, 0.6, 0.92]} gap={8} />
        </g>
      ))}
      <line x1="112" y1="50" x2="112" y2="128" stroke="var(--il-faint)" strokeWidth="1.4" />
      <line x1="214" y1="50" x2="214" y2="128" stroke="var(--il-faint)" strokeWidth="1.4" />
    </>
  ),

  /* 5 — award / ranking: a rosette and a short citation block */
  () => (
    <>
      <circle cx="62" cy="70" r="30" fill="none" stroke="var(--il-ink)" strokeWidth="1.4" opacity="0.3" />
      <circle cx="62" cy="70" r="19" fill="none" stroke="var(--il-accent)" strokeWidth="1.4" />
      <path
        d="M62 58l3.7 7.5 8.3 1.2-6 5.8 1.4 8.2L62 76.9 54.6 80.7l1.4-8.2-6-5.8 8.3-1.2z"
        fill="var(--il-accent)"
      />
      <path
        d="M48 96l-6 26 20-10 20 10-6-26"
        fill="none"
        stroke="var(--il-ink)"
        strokeWidth="1.4"
        opacity="0.3"
      />
      <Bars x={118} y={44} span={180} widths={[0.9, 0.68]} h={6} gap={11} opacity={0.45} />
      <line x1="118" y1="82" x2="298" y2="82" stroke="var(--il-faint)" strokeWidth="1.4" />
      <Bars x={118} y={94} span={180} widths={[1, 0.72]} />
    </>
  ),
];

export function PressPlate({ seed }: { seed: string }) {
  const Plate = PRESS_PLATES[pick(seed, PRESS_PLATES.length)];
  return (
    <svg viewBox={VB} role="img" aria-hidden="true" focusable="false">
      <Frame />
      {Plate(seed)}
    </svg>
  );
}

/* ------------------------------------------------------------
   DOC PLATES — one per resource topic
   ------------------------------------------------------------ */

/* A stack of sheets, used as the ground for several topics. */
function Sheet({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx="3"
      fill="none"
      stroke="var(--il-ink)"
      strokeWidth="1.4"
      opacity="0.3"
    />
  );
}

const DOC_PLATES: Record<string, JSX.Element> = {
  /* Overview — one sheet, an orange heading rule, body text */
  Overview: (
    <>
      <Sheet x={96} y={20} w={128} h={110} />
      <rect x="112" y="38" width="52" height="3" fill="var(--il-accent)" />
      <Bars x={112} y={54} span={96} widths={[1, 0.86, 1, 0.7, 0.94, 0.42]} gap={6} h={3.5} />
    </>
  ),

  /* VPN Alternative — old tunnel crossed out, new direct path in orange */
  "VPN Alternative": (
    <>
      <g opacity="0.3" stroke="var(--il-ink)" strokeWidth="1.4" fill="none">
        <path d="M34 48h60a30 30 0 0 1 0 60H34" />
        <circle cx="34" cy="48" r="5" />
        <circle cx="34" cy="108" r="5" />
      </g>
      <line x1="46" y1="104" x2="126" y2="52" stroke="var(--il-ink)" strokeWidth="1.4" opacity="0.3" />
      <path
        d="M176 78h96"
        stroke="var(--il-accent)"
        strokeWidth="1.4"
        strokeDasharray="7 5"
        fill="none"
      />
      <circle cx="172" cy="78" r="5" fill="var(--il-accent)" />
      <path d="M276 72l10 6-10 6z" fill="var(--il-accent)" />
      <Bars x={168} y={98} span={120} widths={[0.62]} h={3.5} opacity={0.24} />
    </>
  ),

  /* Comparisons — two columns of ticks, the right column orange */
  Comparisons: (
    <>
      <line x1="160" y1="20" x2="160" y2="130" stroke="var(--il-faint)" strokeWidth="1.4" />
      {[38, 62, 86, 110].map((y) => (
        <g key={y}>
          <Bars x={36} y={y - 2} span={78} widths={[0.86]} h={3.5} opacity={0.24} />
          <circle cx="134" cy={y} r="5" fill="none" stroke="var(--il-ink)" strokeWidth="1.4" opacity="0.3" />
          <path
            d={`M180 ${y}l5 5 9-11`}
            fill="none"
            stroke="var(--il-accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Bars x={206} y={y - 2} span={78} widths={[0.7]} h={3.5} opacity={0.24} />
        </g>
      ))}
    </>
  ),

  /* Compliance — a seal over a clause list */
  Compliance: (
    <>
      <Sheet x={30} y={22} w={130} h={106} />
      <Bars x={46} y={40} span={98} widths={[0.8, 1, 0.66, 0.92, 0.5]} gap={7} h={3.5} />
      <circle cx="226" cy="72" r="34" fill="none" stroke="var(--il-ink)" strokeWidth="1.4" opacity="0.3" />
      <circle cx="226" cy="72" r="24" fill="none" stroke="var(--il-accent)" strokeWidth="1.4" />
      <path
        d="M216 72l7 8 14-17"
        fill="none"
        stroke="var(--il-accent)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M212 104l-6 22 20-9 20 9-6-22" fill="none" stroke="var(--il-ink)" strokeWidth="1.4" opacity="0.3" />
    </>
  ),

  /* Whitepapers — stacked sheets, the top one carrying an orange rule */
  Whitepapers: (
    <>
      <Sheet x={72} y={34} w={116} h={96} />
      <Sheet x={88} y={26} w={116} h={96} />
      <rect
        x="104"
        y="18"
        width="116"
        height="96"
        rx="3"
        fill="var(--bg)"
        stroke="var(--il-ink)"
        strokeWidth="1.4"
        opacity="0.9"
      />
      <rect x="120" y="34" width="46" height="3" fill="var(--il-accent)" />
      <Bars x={120} y={48} span={84} widths={[1, 0.8, 0.95, 0.58]} gap={7} h={3.5} />
    </>
  ),

  /* Use Cases — three scenario tiles, one live (orange) */
  "Use Cases": (
    <>
      {[26, 122, 218].map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="34"
            width="76"
            height="82"
            rx="4"
            fill="none"
            stroke={i === 1 ? "var(--il-accent)" : "var(--il-ink)"}
            strokeWidth="1.4"
            opacity={i === 1 ? 1 : 0.3}
          />
          <circle
            cx={x + 38}
            cy="62"
            r="11"
            fill="none"
            stroke={i === 1 ? "var(--il-accent)" : "var(--il-ink)"}
            strokeWidth="1.4"
            opacity={i === 1 ? 1 : 0.3}
          />
          <Bars x={x + 14} y={86} span={48} widths={[1, 0.66]} gap={6} h={3.5} />
        </g>
      ))}
    </>
  ),
};

export function DocPlate({ topic }: { topic: string }) {
  return (
    <svg viewBox={VB} role="img" aria-hidden="true" focusable="false">
      <Frame />
      {DOC_PLATES[topic] ?? DOC_PLATES.Overview}
    </svg>
  );
}
