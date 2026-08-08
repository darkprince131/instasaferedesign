"use client";

import { useEffect, useRef, useState } from "react";
import {
  Browser,
  Check,
  Code,
  Database,
  DownloadSimple,
  FolderOpen,
  Prohibit,
  ShieldCheck,
  TerminalWindow,
  Desktop,
  WifiHigh,
} from "@phosphor-icons/react";

/* ============================================================
   The consolidation diagram — four legacy answers routed into one
   control plane, and out to the three things people actually needed.

   Shared by both candidate layouts of the outcomes section, so the
   argument is identical whichever frame wins.

   It OWNS ITS OWN REVEAL (`is-lit`) rather than inheriting one from a
   parent section's `.in` class. The two layouts have different roots
   — `.izto` and `.izo` — so a reveal keyed to either would leave the
   diagram frozen at opacity 0 in the other.

   Two things are load-bearing:

   1. THE COLOUR IS THE ARGUMENT. Everything arriving from above is
      grey — four legacy answers to one question. Everything leaving
      below is accent — paths InstaSafe now decides. The consolidation
      is legible before a single word is read. Do not "brand" the top
      row by making those wires orange; that erases the point.

   2. WIRES ARE ORTHOGONAL, NEVER CURVED, and terminate in a square
      nub on the node edge — the port. Same doctrine as IzAccessFlow:
      a curve implies an analogue path, this is a routed decision.
      It also happens to be what survives the horizontal stretch the
      wire layer takes (see the SVG note below).

   GEOMETRY: source and resource cards sit in ZERO-GAP grids with the
   gutter made by per-slot padding, so column centres land on exact
   percentages (12.5/37.5/62.5/87.5 and 16.67/50/83.33). The wire
   layers then address those same percentages directly. A `gap` here
   would make the centres depend on container width and the wires
   would drift off the ports at every viewport.
   ============================================================ */

const SOURCES = [
  { Icon: Browser, label: "Vendor portal" },
  { Icon: TerminalWindow, label: "Jump box" },
  { Icon: Desktop, label: "VDI licences" },
  { Icon: WifiHigh, label: "VPN concentrator" },
];

const RESOURCES = [
  { Icon: Database, label: "ERP system", addr: "10.20.1.15" },
  { Icon: FolderOpen, label: "File server", addr: "10.20.2.10" },
  { Icon: Code, label: "Dev tools", addr: "10.20.3.8" },
];

type Row = { t: string; user: string; action: string; res: string; reason: string; ok: boolean };

/* Two allows and two denials, each with its reason filled in. A table
   of four allows would quietly undercut the claim it is evidence for. */
const TRAIL: Row[] = [
  { t: "14:32:08", user: "anaya@acme.com", action: "ACCESS", res: "ERP system", reason: "Approved by policy", ok: true },
  { t: "14:32:10", user: "rohan@acme.com", action: "DOWNLOAD", res: "File server", reason: "Blocked by DLP", ok: false },
  { t: "14:32:12", user: "kabir@acme.com", action: "CLIPBOARD", res: "Dev tools", reason: "Blocked by policy", ok: false },
  { t: "14:32:15", user: "meera@acme.com", action: "ACCESS", res: "File server", reason: "Just-in-time access", ok: true },
];

/* Wire layers.

   viewBox x is in PERCENT units and y in px, with
   preserveAspectRatio="none" — so x tracks the container at any
   width while y stays a fixed pixel height. The horizontal stretch
   that buys is why strokes carry vector-effect="non-scaling-stroke"
   (otherwise a 1px hairline fattens with the viewport) and why the
   elbows are square (an arc would render as an ellipse).  */
const BAND_A = 76;
const BAND_B = 62;

/* source centre → hub port. The four fan INWARD, which is the
   consolidation stated as geometry. */
const FEEDS: [number, number][] = [
  [12.5, 27],
  [37.5, 40],
  [62.5, 60],
  [87.5, 73],
];
const RES_X = [16.667, 50, 83.333];

export function IzConsolidationDiagram({
  /** the audit trail is proof for "an answer the auditor accepts" — drop
   *  it where the diagram sits in a narrow slot and the outcome carries
   *  its own column instead */
  showTrail = true,
  /** ambient plate marks need room to the left and right; off inside a
   *  column that has none */
  showMarks = true,
}: {
  showTrail?: boolean;
  showMarks?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLit(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setLit(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className={`izto-diagram ${lit ? "is-lit" : ""}`} ref={ref}>
      {showMarks && (
        <>
          <div className="izto-deco izto-deco--a" aria-hidden="true" />
          <div className="izto-deco izto-deco--b" aria-hidden="true" />
          <span className="iz-cross izto-cross" aria-hidden="true" />
        </>
      )}

      {/* four legacy answers */}
      <ul className="izto-sources">
        {SOURCES.map(({ Icon, label }) => (
          <li className="izto-slot" key={label}>
            <div className="izto-card">
              <span className="izto-dots" aria-hidden="true" />
              <span className="izto-ic" aria-hidden="true">
                <Icon weight="regular" />
              </span>
              <span className="izto-label">{label}</span>
            </div>
          </li>
        ))}
      </ul>

      <Band
        height={BAND_A}
        className="izto-wire izto-wire--in"
        topNubs={FEEDS.map(([from]) => from)}
        bottomNubs={FEEDS.map(([, to]) => to)}
      >
        {FEEDS.map(([from, to]) => (
          <path key={from} d={`M${from} 0 V32 H${to} V${BAND_A}`} vectorEffect="non-scaling-stroke" />
        ))}
      </Band>

      {/* one control plane */}
      <div className="izto-hub">
        <span className="izto-hub-badge" aria-hidden="true">
          <ShieldCheck weight="regular" />
        </span>
        <span className="izto-hub-brand">InstaSafe</span>
        <strong className="izto-hub-name">Access control</strong>
        <ul className="izto-hub-verbs">
          {["Verify", "Authorize", "Enforce", "Monitor"].map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>

      <Band height={BAND_B} className="izto-wire izto-wire--out" topNubs={[50]} bottomNubs={RES_X}>
        <path d="M50 0 V26" vectorEffect="non-scaling-stroke" />
        <path d={`M${RES_X[0]} 26 H${RES_X[2]}`} vectorEffect="non-scaling-stroke" />
        {RES_X.map((x) => (
          <path key={x} d={`M${x} 26 V${BAND_B}`} vectorEffect="non-scaling-stroke" />
        ))}
      </Band>

      {/* what people actually needed all along */}
      <ul className="izto-resources">
        {RESOURCES.map(({ Icon, label, addr }) => (
          <li className="izto-slot" key={label}>
            <div className="izto-card izto-card--res">
              <span className="izto-dots" aria-hidden="true" />
              <span className="izto-ic" aria-hidden="true">
                <Icon weight="regular" />
              </span>
              <span className="izto-label">{label}</span>
              <span className="izto-addr">{addr}</span>
            </div>
          </li>
        ))}
      </ul>

      {showTrail && (
        <figure className="izto-trail">
          <figcaption className="izto-trail-head">
            <span className="izto-trail-title">
              <i aria-hidden="true" />
              Audit trail
            </span>
            <span className="izto-trail-export">
              Export
              <DownloadSimple weight="regular" aria-hidden="true" />
            </span>
          </figcaption>
          <table className="izto-table">
            {/* explicit widths — six equal fixed columns truncated every
                cell, and `reason` is the column the claim is about */}
            <colgroup>
              <col style={{ width: "12%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "14%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "23%" }} />
              <col style={{ width: "16%" }} />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">Time</th>
                <th scope="col">User</th>
                <th scope="col">Action</th>
                <th scope="col">Resource</th>
                <th scope="col">Reason</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              {TRAIL.map((r) => (
                <tr key={r.t}>
                  <td className="izto-mono">{r.t}</td>
                  <td className="izto-mono">{r.user}</td>
                  <td className="izto-mono izto-act">{r.action}</td>
                  <td>{r.res}</td>
                  <td>{r.reason}</td>
                  <td>
                    <span className={`izto-res ${r.ok ? "is-ok" : "is-no"}`}>
                      {r.ok ? <Check weight="bold" /> : <Prohibit weight="regular" />}
                      {/* the word, not just the glyph — a tick and a slash
                          in green and red is close to a colour-only signal */}
                      <em>{r.ok ? "Allowed" : "Blocked"}</em>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      )}

      {showMarks && (
        <span className="izto-geo" aria-hidden="true">
          N 19° 04′ 20.7″
          <br />E 72° 50′ 11.6″
        </span>
      )}
    </div>
  );
}

/* A wire band: the stretched SVG plus the square port nubs that sit on
   the node edges it spans. The nubs are HTML, not SVG rects — a rect in
   this viewBox would stretch into a rectangle at every width but one. */
function Band({
  height,
  className,
  topNubs,
  bottomNubs,
  children,
}: {
  height: number;
  className: string;
  topNubs: number[];
  bottomNubs: number[];
  children: React.ReactNode;
}) {
  return (
    <div className={className} style={{ height }}>
      <svg viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        {children}
      </svg>
      <span className="izto-nubs izto-nubs--t" aria-hidden="true">
        {topNubs.map((x) => (
          <i key={x} style={{ left: `${x}%` }} />
        ))}
      </span>
      <span className="izto-nubs izto-nubs--b" aria-hidden="true">
        {bottomNubs.map((x) => (
          <i key={x} style={{ left: `${x}%` }} />
        ))}
      </span>
    </div>
  );
}
