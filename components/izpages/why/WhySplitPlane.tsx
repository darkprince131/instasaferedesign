"use client";

import { SPLIT_PLANE_ART, SPLIT_PLANE_VIEWBOX } from "./split-plane-art";

/* ============================================================
   WhySplitPlane — the signature for /why-instasafe-zero-trust.

   Replaces IzSplitPlane, which was a small flowchart: three labelled
   boxes, some dashed drops and a straight line. It stated the claim
   but did not show anything — a reader learned nothing from the
   picture they had not already read in the sentence above it.

   ▸ TWO DRAWINGS, NOT ONE DRAWING SCALED ◂

   The isometric scene is 1600x1000. At 375px that is a 3.7x reduction:
   18px type becomes 5px, and two rails 90px apart in the artwork end
   up 21px apart. It would be legible in the sense that pixels are
   present, and useless in the sense that nobody could read it.

   So the phone gets its own drawing at its own aspect ratio (380x620,
   portrait), with the SAME argument made in a different arrangement:
   the two planes stack instead of receding, and the gap between them
   runs down the middle of the screen where it cannot be missed. This
   is the arrangement IzVpnZtnaFlow already uses for the same reason —
   a smaller cast, not a shrunken copy.

   Both are static. The storyboard asks for a static SVG and the claim
   does not need motion to land.
   ============================================================ */

/* ---------- phone: the two planes stacked ----------

   THE VIEWBOX IS ~1:1 WITH RENDERED PIXELS, AND THAT IS THE POINT.
   A phone gives this drawing about 284 CSS px. Authored on a 720-wide
   viewBox it scaled to 0.39 and 18px type rendered at 7px — the exact
   "shrunk by responsiveness" failure this component exists to avoid,
   reproduced inside the fix. At 380 units the scale is ~0.75 and type
   lands at 11-13px, which is a size someone can actually read.

   So: author phone art in roughly the pixel dimensions it will occupy.
   A viewBox is not a free abstraction — every unit is divided by the
   render width, and type pays for it first. */
function SceneTall() {
  /* Rail geometry as constants so the cargo and the rails cannot drift
     apart when either is nudged. */
  const CTRL_Y = 150;
  const DATA_Y = 468;
  const X0 = 42;
  const X1 = 338;

  const tickets = [
    { x: 90, label: "AUTH", accent: false },
    { x: 190, label: "POLICY", accent: true },
    { x: 290, label: "LOG", accent: false },
  ];
  const crates = [95, 165, 235, 305];

  return (
    <svg
      className="wsp-svg wsp-tall"
      viewBox="0 0 380 620"
      role="img"
      aria-label="Two separate planes. InstaSafe's control plane carries only auth, policy and log decisions. Your data travels on its own plane, from your people straight to your applications, and the two never meet."
    >
      {/* ---------- control plane ---------- */}
      <text className="wsp-tag" x={X0} y={CTRL_Y - 58}>
        CONTROL PLANE · INSTASAFE
      </text>
      <text className="wsp-note" x={X0} y={CTRL_Y - 40}>
        decisions only
      </text>

      <rect className="wsp-band" x={X0 - 14} y={CTRL_Y - 30} width={X1 - X0 + 28} height={68} rx={7} />
      <line className="wsp-rail" x1={X0} y1={CTRL_Y} x2={X1} y2={CTRL_Y} />

      {tickets.map((t) => (
        <g key={t.label} className={t.accent ? "wsp-ticket is-accent" : "wsp-ticket"}>
          <rect x={t.x - 39} y={CTRL_Y - 15} width={78} height={30} rx={4} />
          <text x={t.x} y={CTRL_Y + 5} textAnchor="middle">
            {t.label}
          </text>
        </g>
      ))}

      {/* ---------- the gap: the whole argument ----------
          Drawn as a real barrier with its own label rather than as
          empty space, because empty space reads as "nothing here yet"
          rather than as "these never meet". */}
      <g className="wsp-gap">
        <line x1={X0 - 14} y1={300} x2={X1 + 14} y2={300} />
        <text className="wsp-gap-t" x={190} y={294} textAnchor="middle">
          NEVER MIX
        </text>
        <text className="wsp-note" x={190} y={320} textAnchor="middle">
          no shared path · no vendor-side copy
        </text>
      </g>

      {/* ---------- data plane ---------- */}
      <text className="wsp-tag" x={X0} y={DATA_Y - 58}>
        DATA PLANE · YOURS
      </text>
      <text className="wsp-note" x={X0} y={DATA_Y - 40}>
        your traffic, your environment
      </text>

      <rect className="wsp-band is-yours" x={X0 - 14} y={DATA_Y - 30} width={X1 - X0 + 28} height={68} rx={7} />
      <line className="wsp-rail is-data" x1={X0} y1={DATA_Y} x2={X1} y2={DATA_Y} />

      {crates.map((x) => (
        <rect key={x} className="wsp-crate" x={x - 22} y={DATA_Y - 13} width={44} height={26} rx={3} />
      ))}

      {/* endpoints, so the data plane reads as going somewhere */}
      <g className="wsp-node">
        <circle cx={X0} cy={DATA_Y} r={11} />
        {/* anchored start/end, not middle: centred on the endpoints
            these ran past the left and right edges of the viewBox */}
        <text className="wsp-note" x={X0 - 13} y={DATA_Y + 32} textAnchor="start">
          your people
        </text>
      </g>
      <g className="wsp-node">
        <rect x={X1 - 11} y={DATA_Y - 11} width={22} height={22} rx={3} />
        <text className="wsp-note" x={X1 + 13} y={DATA_Y + 32} textAnchor="end">
          your apps
        </text>
      </g>

      <text className="wsp-foot" x={190} y={578} textAnchor="middle">
        FIG. 01 — SPLIT PLANE
      </text>
    </svg>
  );
}

export function WhySplitPlane() {
  return (
    <div className="wsp">
      {/* Desktop: the generated isometric scene, injected as raw markup
          so its ~540 exact coordinates stay byte-identical to the
          approved artwork. See split-plane-art.ts. */}
      <div
        className="wsp-wide"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `<svg class="wsp-svg" viewBox="${SPLIT_PLANE_VIEWBOX}" role="img" aria-label="Isometric architecture diagram: InstaSafe's control plane carries only auth, policy and log decisions on one rail; your data travels on a separate rail that never crosses it.">${SPLIT_PLANE_ART}</svg>`,
        }}
      />
      <SceneTall />
    </div>
  );
}
