"use client";

import { Fragment } from "react";
import { ArrowRight, PlugsConnected, type Icon as PhosphorIcon } from "@phosphor-icons/react";

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

   Everything is data below. Every item carries BOTH a desktop
   coordinate (`lg`) and a phone one (`sm`) — the phone grid is 3
   columns, not 5, so an item placed only for the wide grid would
   land in the wrong cell rather than reflowing sensibly. `sm: null`
   means "not shown on a phone". Cells are always explicitly placed;
   auto-flow steps around occupied coordinates and pushes the
   backing cells into implicit rows (it ran to 7 rows instead of 4).

   Logos are real artwork now, sized by `max-height` AND `max-width`
   with `object-fit: contain`, because the set deliberately mixes
   square marks (Entra, Intune, CrowdStrike, Kubernetes) with wide
   ones (Cloudflare, AWS, Google Workspace). Constraining only the
   height makes the wide ones three times the optical weight of the
   square ones — the defect this component used to have when the
   logos were text.
   ============================================================ */

const GRID = { cols: 5, rows: 5 };
const GRID_SM = { cols: 3, rows: 4 };

/** Row that the full-width copy strip occupies, per breakpoint. */
const STRIP_ROW = 3;
const STRIP_ROW_SM = 3;

export type IzLogoGridLogo = {
  /** file name inside the folder given by the `dir` prop, no extension */
  file: string;
  /** file extension — the awards artwork is mixed png/webp/svg */
  ext?: string;
  /** alt text — these are third-party marks, so they get real names */
  label: string;
  lg: [col: number, row: number];
  sm: [col: number, row: number] | null;
  /** Columns to span. A one-cell box caps a logo on WIDTH, and for a
      wordmark that is 8:1 the height that falls out is unreadable —
      Google Workspace measured 68x9px in a single phone cell. Wide
      marks get a second column to spread into instead of being
      shrunk to a sliver. Square marks never need it. */
  span?: number;
  spanSm?: number;
  /** Max rendered height in px, overriding the 34px default.

      34px is right for the integrations set, which is all wordmarks
      and square marks between roughly 1:1 and 4:1. It is wrong for any
      set containing PORTRAIT art: capping height alone normalises the
      wrong dimension, so a 4.4:1 wordmark renders 150x34 (5,100px² of
      ink) next to a 0.8:1 badge at 27x34 (918px²) — the same defect
      this component's header describes, in the other direction.

      Where a set mixes ratios that widely, tune `h` per logo so the
      AREA lands in the same band: h = sqrt(targetArea / aspectRatio). */
  h?: number;
};

/* Chosen for recognition AND for being on-message: an access product
   is judged on whether it speaks to your identity provider, your
   endpoint agent and the clouds you actually run. The rest of the
   catalogue lives on the integrations page behind the CTA.

   Deliberately weighted to identity / endpoint / infrastructure and
   NOT to SaaS: `IzIntegrationGrid` further down the homepage is
   already a wall of ~40 SaaS apps, so a second SaaS wall here would
   say the same thing twice. Google Workspace is the only overlap,
   and it earns its place as an identity provider rather than as an
   app. */
const LOGOS: IzLogoGridLogo[] = [
  // identity + endpoint — what decides whether a session happens at all
  { file: "microsoft-entra-id", label: "Microsoft Entra ID", lg: [1, 1], sm: [1, 1] },
  { file: "microsoft-intune", label: "Microsoft Intune", lg: [3, 1], sm: [2, 1] },
  { file: "crowdstrike", label: "CrowdStrike", lg: [5, 1], sm: [3, 1] },
  { file: "google-workspace", label: "Google Workspace", lg: [2, 2], sm: [1, 2], span: 2, spanSm: 2 },
  { file: "onelogin", label: "OneLogin", lg: [5, 2], sm: null },
  // strip sits on row 3
  // the estate those decisions are enforced across
  { file: "aws", label: "Amazon Web Services", lg: [1, 4], sm: [3, 2] },
  { file: "kubernetes", label: "Kubernetes", lg: [3, 4], sm: [1, 4] },
  { file: "azure", label: "Microsoft Azure", lg: [5, 4], sm: [3, 4] },
  { file: "terraform", label: "Terraform", lg: [2, 5], sm: null },
  { file: "cloudflare", label: "Cloudflare", lg: [4, 5], sm: [2, 4] },
];

const COPY = {
  lead: "SAML, OIDC and RADIUS underneath —",
  accent: "so anything not on this list",
  tail: "still connects.",
};

/* ============================================================
   REUSABLE AS A LATTICE, NOT JUST AS "INTEGRATIONS" (2026-08-13).

   The layout — copy left, sparse logo lattice right, one copy strip
   set into it — is the reusable idea; "integrations" was only the
   first thing said with it. `logos`, `copy`, `dir` and `Icon` are
   props now, so the awards-and-recognition block on
   /why-instasafe-zero-trust runs the same component rather than a
   near-duplicate. Omit them all and the integrations version renders
   exactly as before.

   `dir` and per-logo `ext` exist because the folders differ in more
   than name: /logos/integrations is uniformly .svg, while the
   recognition artwork is a mix of .svg, .png and .webp. Hardcoding
   the extension was fine for one folder and wrong for two.
   ============================================================ */
export function IzLogoGrid({
  kicker = "Integrations",
  title = ["Works with the tools", "you already run."] as string[],
  sub = "Identity, device posture, cloud and SaaS. InstaSafe sits in front of what you have rather than asking you to replace it — one place to decide access, no second source of truth.",
  cta = { label: "See all integrations", href: "/solutions" },
  logos = LOGOS,
  copy = COPY,
  dir = "integrations",
  Icon = PlugsConnected,
}: {
  kicker?: string;
  title?: string[];
  sub?: string;
  cta?: { label: string; href: string };
  logos?: IzLogoGridLogo[];
  copy?: { lead: string; accent: string; tail: string };
  /** folder under /public/logos */
  dir?: string;
  Icon?: PhosphorIcon;
}) {
  return (
    <section className="izlg iz-railed">
      <div
        className="iz-wrap izlg-cols"
        style={
          {
            ["--cols" as string]: GRID.cols,
            ["--rows" as string]: GRID.rows,
            ["--cols-sm" as string]: GRID_SM.cols,
            ["--rows-sm" as string]: GRID_SM.rows,
          } as React.CSSProperties
        }
      >
        {/* ---------- left ----------
            On a phone `.izlg-left` becomes `display: contents` so these
            children are grid items in their own right — that is what
            lets the CTA carry an `order` and sit BELOW the logo grid
            while the copy stays above it. */}
        <div className="izlg-left">
          <span className="izlg-kicker">
            <Icon aria-hidden="true" />
            {kicker}
            <i aria-hidden="true">_</i>
          </span>

          {/* Last chunk takes the accent. The separating space is a
              SIBLING of the spans, not a child: each span is
              `white-space: nowrap` so a space inside it is unbreakable,
              and with no text node between them the line had no break
              opportunity at all — the headline ran straight out of the
              column and under the logo grid. */}
          <h2 className="izlg-title">
            {title.map((w, i) => (
              <Fragment key={w}>
                <span className={i === title.length - 1 ? "on" : undefined}>{w}</span>
                {i < title.length - 1 ? " " : null}
              </Fragment>
            ))}
          </h2>

          <p className="izlg-sub">{sub}</p>

          <a className="izlg-cta" href={cta.href}>
            {cta.label}
            <ArrowRight weight="bold" aria-hidden="true" />
          </a>
        </div>

        {/* ---------- right: the lattice ---------- */}
        <div className="izlg-grid">
          {/* Backing cells, explicitly placed. Two sets: the wide grid
              draws cols x rows, the phone grid draws its own smaller
              count, and each hides at the other breakpoint. One set
              cannot serve both — a 5x5 lattice has 25 cells and the
              phone lattice needs 12, so the surplus would pile up in
              implicit rows below the logos. */}
          {Array.from({ length: GRID.cols * GRID.rows }, (_, i) => (
            <span
              key={`c${i}`}
              className="izlg-cell izlg-lg"
              aria-hidden="true"
              style={{ gridColumn: (i % GRID.cols) + 1, gridRow: Math.floor(i / GRID.cols) + 1 }}
            />
          ))}
          {Array.from({ length: GRID_SM.cols * GRID_SM.rows }, (_, i) => (
            <span
              key={`s${i}`}
              className="izlg-cell izlg-sm"
              aria-hidden="true"
              style={{ gridColumn: (i % GRID_SM.cols) + 1, gridRow: Math.floor(i / GRID_SM.cols) + 1 }}
            />
          ))}

          {logos.map((l) => (
            <span
              key={l.file}
              className={`izlg-logo${l.sm ? "" : " izlg-x-sm"}`}
              style={
                {
                  ["--gc" as string]: `${l.lg[0]} / span ${l.span ?? 1}`,
                  ["--gr" as string]: l.lg[1],
                  ["--gc-sm" as string]: `${l.sm?.[0] ?? 1} / span ${l.spanSm ?? 1}`,
                  ["--gr-sm" as string]: l.sm?.[1] ?? 1,
                  ["--logo-h" as string]: l.h ? `${l.h}px` : undefined,
                } as React.CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/${dir}/${l.file}.${l.ext ?? "svg"}`} alt={l.label} loading="lazy" decoding="async" />
            </span>
          ))}

          <p
            className="izlg-strip"
            style={
              {
                ["--gr" as string]: STRIP_ROW,
                ["--gr-sm" as string]: STRIP_ROW_SM,
              } as React.CSSProperties
            }
          >
            {copy.lead} <mark>{copy.accent}</mark> {copy.tail}
          </p>
        </div>
      </div>
    </section>
  );
}
