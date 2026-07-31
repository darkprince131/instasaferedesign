"use client";

import { ArrowRight, Fingerprint } from "@phosphor-icons/react";

/* ============================================================
   IzLogoGrid — TIER 2 SECTION  (lab 00ap)

   Copy and a CTA on the left, an ecosystem grid on the right where
   the logos sit in SOME cells and the rest stay empty — the same
   coordinates-as-data idea as IzSignalGrid, and the same reason it
   works: the gaps are what make it read as a surface with headroom
   rather than a logo wall.

   One cell is not a logo at all but a full-width copy strip, set
   into the grid rather than under it. That single interruption is
   what stops the right-hand side being decorative.

   Everything is data below. Move a logo by changing its [col,row];
   change the grid by changing GRID. Nothing else needs touching.

   ⚠️ Wordmarks render as TEXT, not artwork — deliberate, so nothing
   ships as a broken asset box while real partner logos are still
   outstanding. When they arrive, give an ITEMS entry a `src` and
   render it in the logo branch below.
   ============================================================ */

const GRID = { cols: 4, rows: 4 };

type Item =
  | { kind: "logo"; label: string; col: number; row: number }
  | { kind: "copy"; col: number; row: number; span: number };

const ITEMS: Item[] = [
  { kind: "logo", label: "Microsoft Entra ID", col: 1, row: 1 },
  { kind: "logo", label: "Okta", col: 4, row: 1 },
  { kind: "logo", label: "Google Workspace", col: 3, row: 2 },
  { kind: "copy", col: 1, row: 3, span: 4 },
  { kind: "logo", label: "Active Directory", col: 1, row: 4 },
  { kind: "logo", label: "AWS", col: 4, row: 4 },
];

const COPY = { lead: "Works with the directory you already run —", accent: "no migration", tail: "and no second source of truth." };

export function IzLogoGrid({
  kicker = "Identity you already own",
  title = ["Allow.", "Verify.", "Scope.", "Block."] as string[],
  sub = "Decide what each person reaches, on every request, using the identities and groups your directory already holds.",
  cta = { label: "Start a trial", href: "/free-trial" },
}: {
  kicker?: string;
  title?: string[];
  sub?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="izlg iz-railed">
      <div className="iz-wrap izlg-cols">
        {/* ---------- left ---------- */}
        <div className="izlg-left">
          <span className="izlg-kicker">
            <Fingerprint aria-hidden="true" />
            {kicker}
            <i aria-hidden="true">_</i>
          </span>

          {/* Last word takes the accent — the sequence ends on the
              one verb that is the product's whole point. */}
          <h2 className="izlg-title">
            {title.map((w, i) => (
              <span key={w} className={i === title.length - 1 ? "on" : undefined}>
                {w}{" "}
              </span>
            ))}
          </h2>

          <p className="izlg-sub">{sub}</p>

          <a className="izlg-cta" href={cta.href}>
            {cta.label}
            <ArrowRight weight="bold" aria-hidden="true" />
          </a>
        </div>

        {/* ---------- right ---------- */}
        <div
          className="izlg-grid"
          style={{ ["--cols" as string]: GRID.cols, ["--rows" as string]: GRID.rows } as React.CSSProperties}
        >
          {/* The lattice. Every cell is EXPLICITLY placed rather than
              auto-flowed: auto-placement steps around the items that
              already occupy coordinates, so the backing cells get
              pushed into implicit rows and the grid grows past its
              declared height (it ran to 7 rows instead of 4). */}
          {Array.from({ length: GRID.cols * GRID.rows }, (_, i) => (
            <span
              key={`c${i}`}
              className="izlg-cell"
              aria-hidden="true"
              style={{ gridColumn: (i % GRID.cols) + 1, gridRow: Math.floor(i / GRID.cols) + 1 }}
            />
          ))}

          {ITEMS.map((it) =>
            it.kind === "logo" ? (
              <span
                key={it.label}
                className="izlg-logo"
                style={{ gridColumn: it.col, gridRow: it.row }}
              >
                {it.label}
              </span>
            ) : (
              <p
                key={`copy-${it.row}`}
                className="izlg-strip"
                style={{ gridColumn: `${it.col} / span ${it.span}`, gridRow: it.row }}
              >
                {COPY.lead} <mark>{COPY.accent}</mark> {COPY.tail}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
