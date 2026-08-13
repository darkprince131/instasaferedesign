"use client";

/* ============================================================
   IzLogoMarquee — the customer-logo strip that sits directly
   under the hero on every page.

   ▸ REUSE ◂ drop `<IzLogoMarquee />` under any hero. It is
   full-bleed by design (the rail runs edge to edge, the wrap
   only holds the label), so it needs no wrapper section.

   THEMING. The logos are real brand SVGs in a dozen different
   brand colours, which would fight the paper palette and the
   one-orange rule. So they are rendered monochrome by CSS
   filter rather than by editing the art:
     paper → grayscale, held back to a soft ink
     dark  → grayscale + invert, i.e. white
   `invert` (not `brightness(0) invert(1)`) is deliberate: several
   of these logos are knockouts — white type sitting inside a
   coloured plate (HDB, Bajaj Allianz) — and a flat silhouette
   would fill the plate solid and swallow the wordmark. Inverting
   the greyscale keeps the knockout readable in both themes.

   MOTION. Two identical copies of the list translate -50%; at the
   loop point copy 2 is exactly where copy 1 started, so the seam
   is invisible and the scroll never resets visibly. Duration is
   derived from track width so a longer list scrolls at the same
   px/sec, not the same lap time. Hover pauses; reduced motion
   drops the animation and lays the logos out as a static wall.
   ============================================================ */

export type CustomerLogo = {
  /** file in /public/logos/customers, without the .svg */
  file: string;
  /** accessible name */
  name: string;
  /** rendered height in px — hand-tuned per logo so they read as
      one optical weight despite aspect ratios from 0.7 to 6.9 */
  h: number;
};

/* Heights are derived from each logo's cropped aspect ratio so every
   wordmark occupies roughly the same optical width, then pulled back
   by hand for the four brands whose art is a solid plate (Allcargo,
   NHPC, HDB, CCD) — a filled rectangle reads heavier
   than open letterforms at the same height. Order alternates plates
   and open wordmarks so the blocks never clump. */
const LOGOS: CustomerLogo[] = [
  { file: "tata", name: "Tata", h: 46 },
  { file: "siemens", name: "Siemens", h: 22 },
  { file: "hdb-financial", name: "HDB Financial Services", h: 22 },
  { file: "aditya-birla", name: "Aditya Birla Group", h: 44 },
  { file: "asian-paints", name: "Asian Paints", h: 24 },
  { file: "mphasis", name: "Mphasis", h: 36 },
  { file: "landmark-group", name: "Landmark Group", h: 30 },
  { file: "nhpc", name: "NHPC", h: 38 },
  { file: "pidilite", name: "Pidilite", h: 42 },
  { file: "axis-max-life", name: "Axis Max Life", h: 34 },
  { file: "haldirams", name: "Haldiram's", h: 42 },
  { file: "allcargo", name: "Allcargo Logistics", h: 36 },
  { file: "mirae-sharekhan", name: "Mirae Asset Sharekhan", h: 19 },
  { file: "jana-bank", name: "Jana Small Finance Bank", h: 40 },
  { file: "dtdc", name: "DTDC", h: 30 },
  { file: "bajaj-allianz", name: "Bajaj General Insurance", h: 40 },
  { file: "samsonite", name: "Samsonite", h: 20 },
  { file: "cafe-coffee-day", name: "Cafe Coffee Day", h: 48 },
];

type Props = {
  logos?: CustomerLogo[];
  /** mono label above the rail. Defaults to null — the customer slider
      carries NO eyebrow (user call, 2026-08-12). The logos are the claim;
      a strapline over them just re-states it in smaller type. Only pass a
      string if a page has a specific reason to caption the strip. */
  label?: string | null;
  /** scroll speed in pixels per second */
  speed?: number;
  className?: string;
};

export function IzLogoMarquee({
  logos = LOGOS,
  label = null,
  speed = 44,
  className,
}: Props) {
  const row = (clone: boolean) => (
    <ul className="izlm-row" aria-hidden={clone || undefined}>
      {logos.map((l) => (
        <li key={(clone ? "c-" : "") + l.file} className="izlm-item">
          {/* plain <img>: these are static, identically-sized vector
              assets, so next/image would add a wrapper and a layout
              pass for nothing. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/logos/customers/${l.file}.svg`}
            alt={clone ? "" : l.name}
            /* eager, not lazy: the clone row lives off the right edge and a
               lazy image there stays a zero-width box, which collapses the
               track and breaks the loop. `fetchPriority=low` keeps the 19
               files behind the hero plate for LCP. */
            decoding="async"
            fetchPriority="low"
            style={{ ["--izlm-h" as string]: `${l.h}px` }}
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      className={className ? `izlm ${className}` : "izlm"}
      aria-label="Customers"
      style={{ ["--izlm-speed" as string]: `${speed}`, ["--izlm-count" as string]: `${logos.length}` }}
    >
      {label && (
        <div className="iz-wrap">
          <p className="izlm-label">{label}</p>
        </div>
      )}
      <div className="izlm-viewport">
        <div className="izlm-track">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
