"use client";

import { useState } from "react";

/* ============================================================
   WhyMatrix — storyboard row 10.0, the comparison matrix.

   ▸ CATEGORY LABELS, NOT VENDOR NAMES ◂
   The storyboard calls this "B2 — the category-label version until
   legal clears names", and that is the version built. Columns are
   "Global SASE", "VPN incumbent", "Workspace suite" — a reader in the
   market knows exactly who each one is, and we make no factual claim
   about a named company we would then have to keep true as their
   product changes. It is also the same call already taken on the
   homepage, where the vs-Zscaler and vs-Fortinet tabs were removed.

   ▸ NO PRICING ROW ◂
   The storyboard's matrix carries a "Pricing transparency" row. It is
   deliberately absent: InstaSafe does not disclose pricing, so a row
   claiming transparency about it is one we cannot stand behind — and
   the row would invite exactly the question the site declines to
   answer. Nothing on this page mentions price.

   ▸ THE ONLY CLAIM WE MAKE IN NUMBERS IS OUR OWN ◂
   "25 types / 144 rules" and "7" are InstaSafe figures, published
   elsewhere on the site and checkable. Every other cell is a
   qualitative reading of a category, phrased as such — "Varies",
   "Partial" — because a precise number about a category would be
   false precision.

   The matrix is a real <table>: it is tabular data, a screen reader
   should get the row/column relationship for free, and `scope` on the
   headers is what makes that work.
   ============================================================ */

type Row = {
  criterion: string;
  /** InstaSafe, then the three categories, in COLUMNS order */
  values: [string, string, string, string];
  /** marks a row where the difference is architectural, not degree */
  arch?: boolean;
};

const COLUMNS = ["InstaSafe", "Global SASE", "VPN incumbent", "Workspace suite"] as const;

const ROWS: Row[] = [
  {
    criterion: "Data transits vendor cloud",
    values: ["Never", "Always", "Via appliance", "Varies"],
    arch: true,
  },
  {
    criterion: "Published product depth",
    values: ["Yes, with numbers", "Rarely", "No", "Partial"],
  },
  {
    criterion: "Deploy time",
    values: ["Days", "Weeks", "Weeks", "Weeks"],
  },
  {
    criterion: "Device posture depth",
    values: ["25 types · 144 rules", "Varies", "Minimal", "Varies"],
    arch: true,
  },
  {
    criterion: "Clientless third-party path",
    values: ["Yes", "Yes", "No", "Partial"],
  },
  {
    criterion: "DPDP and India regulatory fluency",
    values: ["Yes", "Partial", "No", "Partial"],
  },
  {
    criterion: "App types in one portal",
    values: ["7", "n/a", "n/a", "Varies"],
  },
];

export function WhyMatrix() {
  /* Mobile cannot show four columns, so it shows ONE alongside ours
     and lets the reader pick which. A horizontally scrolling table is
     the usual answer and it is the wrong one: the criterion column
     scrolls away, and a value with no visible label says nothing. */
  const [col, setCol] = useState(1);

  return (
    <div className="whym">
      <div className="whym-head">
        <span className="iz-ey">Line by line</span>
        <h2 className="iz-h2">
          The same questions, <em>asked of every option</em>.
        </h2>
        <p className="whym-lead">
          Categories rather than company names — the differences below are architectural, and they hold across every
          vendor in each column.
        </p>
      </div>

      {/* the picker only matters below the breakpoint; it is hidden,
          not unmounted, so the table keeps one source of truth */}
      <div className="whym-pick" role="tablist" aria-label="Compare against">
        {COLUMNS.slice(1).map((c, i) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={col === i + 1}
            className={`whym-pick-b ${col === i + 1 ? "on" : ""}`}
            onClick={() => setCol(i + 1)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="whym-scroll">
        <table className="whym-t">
          <thead>
            <tr>
              <th scope="col">
                <span className="whym-crit-h">What matters</span>
              </th>
              {COLUMNS.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={i === 0 ? "is-ours" : undefined}
                  data-col={i}
                  data-active={i === 0 || i === col || undefined}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.criterion} className={r.arch ? "is-arch" : undefined}>
                <th scope="row">
                  {r.arch && (
                    <i className="whym-mark" aria-label="architectural difference">
                      ▸
                    </i>
                  )}
                  {r.criterion}
                </th>
                {r.values.map((v, i) => (
                  <td
                    key={COLUMNS[i]}
                    className={i === 0 ? "is-ours" : undefined}
                    data-col={i}
                    data-active={i === 0 || i === col || undefined}
                  >
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="whym-foot">
        <b>▸</b> marks the rows where the difference is architectural rather than a matter of degree — the two you
        cannot configure your way out of.
      </p>
    </div>
  );
}
