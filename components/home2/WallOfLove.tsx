"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ============================================================
   C32 · Mac Dock Nav — the trusted-by section.
   Magnify-on-hover floating dock (the macOS dock effect). Hovering a
   tile swaps the window preview above it.

   ▸▸ THIS COMPONENT IS OFF BY DEFAULT. READ BEFORE FLIPPING IT ▸▸

   instasafe.com names ZERO customers today. Every published case study
   is anonymised by sector — the banking one is "one of India's leading
   private sector banks with over 250 branches", the logistics one "a
   leading Indian air express, cargo and logistics company operating
   across 500 districts". Even homepage testimonials are first-name-
   plus-initial (Ranjith P, Hariharan S, Sadanand H).

   A wall of named logos is therefore not a design change, it is a
   disclosure change. Each named entry needs a signed logo-use clause
   or written marketing consent, and the screen copy has to survive
   that customer's security team reading it. `NAMED_CUSTOMERS` stays
   false until Sandip confirms which entries are cleared.

   With the flag false the dock runs the ANONYMOUS set below, which
   uses InstaSafe's own published case-study language and discloses
   nothing new.

   ▸ WHY THE NAMED SET IS SHORTER THAN THE LOGO FOLDER ◂

   Four of the nine marks that fit the tile were removed on research,
   not on layout:

     Café Coffee Day  — dropped. Outlets fell from 1,700+ (2019) to
       ~423 (Q2 FY2026) and insolvency proceedings against Coffee Day
       Enterprises have run through NCLT and NCLAT. Any figure printed
       ages badly, and the mark invites a reader to search a distressed
       company.
     Bajaj            — dropped pending a new asset. The entity is now
       Bajaj General Insurance Ltd; Allianz has exited. The file we
       hold is the old Bajaj Allianz co-brand, so shipping it would
       display a partnership that no longer exists.
     Tata             — dropped. A group mark, not a contracting
     Aditya Birla       entity. The customer is one company inside
       each, so showing the group logo claims the whole conglomerate.
       This is the biggest overclaim in the set. Name the actual
       subsidiary if the contract allows it, then re-add.

   Facts are dated and sourced deliberately: an undated scale number
   silently becomes wrong. Each says "an environment this size trusted
   us" without claiming anything about the deployment we cannot
   substantiate. Nothing here describes what InstaSafe did for them.

   ▸ ASPECT RATIO IS LAYOUT DATA, NOT CONTENT ◂
   `ar` is the measured viewBox ratio and never renders. It picks which
   marks survive a square-ish tile and flags the portrait one; the
   wordmarks running to 6.9:1 stay in IzLogoMarquee, built for that
   shape.
   ============================================================ */

/** Flip ONLY with signed logo-use consent for every entry in NAMED. */
const NAMED_CUSTOMERS = false;

interface Brand {
  name: string;
  /** file in /public/logos/customers, without the .svg — named set only */
  file?: string;
  sector: string;
  /** measured width/height of the source viewBox — drives tile fit */
  ar?: number;
  /** anonymous set only: short tile code. Written out rather than
      derived, because slicing the sector clipped it to "LOGISTI" and
      "MANUFA" in a 34px content box. */
  code?: string;
  /** one dated, publicly-verifiable scale fact */
  detail?: string;
  /** shown under the fact, so the claim can be traced */
  source?: string;
  href: string;
}

/* Cleared for display today: sector-anonymous, in the same language as
   the published case studies. No logo, no company name. */
const ANONYMOUS: Brand[] = [
  {
    name: "A leading private sector bank",
    sector: "Banking · BFSI",
    code: "BFSI",
    detail: "Over 250 branches across North, West and South India.",
    href: "/case-studies",
  },
  {
    name: "A national air express and cargo operator",
    sector: "Logistics",
    code: "LOG",
    detail: "Operating across 500 districts.",
    href: "/case-studies",
  },
  {
    name: "An Indian manufacturing group",
    sector: "Manufacturing",
    code: "MFG",
    detail: "Publicly listed, multi-plant operations.",
    href: "/case-studies",
  },
  {
    name: "A central public sector undertaking",
    sector: "Power · PSU",
    code: "PSU",
    detail: "Government-majority, multi-state generation estate.",
    href: "/case-studies",
  },
];

/* Researched and corrected, but NOT cleared for publication. Every
   figure is dated because scale numbers go stale silently. */
const NAMED: Brand[] = [
  {
    name: "NHPC",
    file: "nhpc",
    ar: 1.74,
    sector: "Power · PSU",
    detail: "8,332.9 MW installed capacity; Government of India holds 70.95%.",
    source: "October 2025",
    href: "/case-studies",
  },
  {
    name: "Haldiram's",
    file: "haldirams",
    ar: 1.88,
    sector: "FMCG",
    detail: "₹12,800 crore revenue. Founded 1937 in Bikaner.",
    source: "FY24",
    href: "/case-studies",
  },
  {
    /* Do NOT reintroduce ECU Worldwide or "180 countries" copy: the
       international supply-chain business demerged into Allcargo Global
       Ltd on 1 November 2025. Headcount is also misleading — the 557
       figure is the listed holding entity, not the operating footprint. */
    name: "Allcargo Logistics",
    file: "allcargo",
    ar: 1.9,
    sector: "Logistics",
    detail: "~₹16,000 crore revenue. Founded 1993, headquartered in Mumbai.",
    source: "FY2025",
    href: "/case-studies",
  },
  {
    /* The only one of the set already publicly linked to InstaSafe by a
       third party — a 2016 CIO Choice listing. Ten years stale, but
       public, which makes it the safest name to lead with. */
    name: "Pidilite",
    file: "pidilite",
    ar: 1.98,
    sector: "Manufacturing",
    detail: "₹13,094 crore revenue. Maker of Fevicol, M-Seal and Dr. Fixit.",
    source: "FY2025",
    href: "/case-studies",
  },
  {
    name: "Jana Small Finance Bank",
    file: "jana-bank",
    ar: 2.49,
    sector: "Banking · BFSI",
    detail: "783 branches across 25 states and union territories.",
    source: "December 2025",
    href: "/case-studies",
  },
];

const LOGOS: Brand[] = NAMED_CUSTOMERS ? NAMED : ANONYMOUS;

const IcHeart = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 21s-7-4.35-9.5-8.5C.7 9.4 2 6 5.2 6c1.9 0 3.1 1 3.8 2 .7-1 1.9-2 3.8-2 3.2 0 4.5 3.4 2.7 6.5C19 16.65 12 21 12 21z" />
  </svg>
);
const IcShield = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

function DockIcon({ mouseX, item, on, onHover, reduced }: { mouseX: MotionValue<number>; item: Brand; on: boolean; onHover: () => void; reduced: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const distance = useTransform(mouseX, (v: number) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return v - b.x - b.width / 2;
  });
  const sizeSync = useTransform(distance, [-150, 0, 150], reduced ? [50, 50, 50] : [48, 80, 48]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 14 });

  return (
    <motion.button
      ref={ref}
      style={{ width: size, height: size }}
      className={`wol-icon ${on ? "on" : ""}`}
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={() => (window.location.href = item.href)}
      aria-label={item.name}
    >
      {/* `data-tall` marks a PORTRAIT mark: `object-fit: contain` fits
          the constraining axis, so a wide wordmark is capped by width
          and lands ~16px tall while a taller-than-wide mark is capped
          by HEIGHT and fills the tile, at roughly three times its
          neighbours' optical mass. The cap in walloflove.css fixes it.

          With no `file` the entry is anonymous, so the tile carries the
          SECTOR instead — there is no mark to show and inventing a
          monogram for an unnamed company would be a fake logo. */}
      <span className="logo" data-tall={(item.ar ?? 1) < 1 || undefined}>
        {item.file ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={`/logos/customers/${item.file}.svg`} alt="" aria-hidden="true" loading="lazy" />
        ) : (
          <span className="wol-anon" aria-hidden="true">
            {item.code}
          </span>
        )}
      </span>
      <AnimatePresence>
        {on && (
          <motion.span
            className="wol-tip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16 }}
          >
            {item.name}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function WallOfLove() {
  const [active, setActive] = useState(0);
  const mouseX = useMotionValue(Infinity);
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const cur = LOGOS[active];

  return (
    <div className="wol">
      {/* "Wall of love" was the LAB's name for the pattern, not copy for
          a page — it says nothing about who these companies are and
          reads as a developer's label left in the build. */}
      <div className="wol-head">
        <span className="wol-pill">{IcHeart} In production</span>
        <h2 className="wol-h">
          Running where access decisions are <em>audited hardest</em>.
        </h2>
      </div>

      <div className="wol-frame">
        <div className="wol-window">
          <div className="wol-bar">
            <span className="dots">
              <i />
              <i />
              <i />
            </span>
            <span className="wt">{cur.sector.split(" · ")[0].toLowerCase()}.log</span>
          </div>
          <div className="wol-body" key={active}>
            {cur.file && (
              <span className="wol-logo-lg" data-tall={(cur.ar ?? 1) < 1 || undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/customers/${cur.file}.svg`} alt={cur.name} loading="lazy" />
              </span>
            )}
            <span className="wol-name">{cur.name}</span>
            <span className="wol-sector">{cur.sector}</span>
            {/* The stats row that sat here carried invented figures. A
                fact renders only with its AS-OF DATE beside it: an
                undated scale number does not stay true, it just stops
                being checkable. */}
            {cur.detail && (
              <p className="wol-detail">
                {cur.detail}
                {cur.source && <span className="wol-asof">as of {cur.source}</span>}
              </p>
            )}
            {/* Deliberately NOT "Protected by InstaSafe ZTNA" next to a
                named third party — that is a claim about their security
                posture, and it is exactly the sentence their security
                team would object to. The rating is ours to cite. */}
            <a className="wol-badge" href="https://www.gartner.com/reviews/market/zero-trust-network-access/vendor/instasafe" target="_blank" rel="noopener noreferrer">
              {IcShield} 4.7 on Gartner Peer Insights · 13 reviews
            </a>
          </div>
        </div>

        <div
          className="wol-dock"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          role="tablist"
          aria-label="Customers"
        >
          {LOGOS.map((item, i) => (
            <DockIcon key={item.name} mouseX={mouseX} item={item} on={active === i} onHover={() => setActive(i)} reduced={!!reduced} />
          ))}
        </div>
      </div>
    </div>
  );
}
