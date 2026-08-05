"use client";

import { useState } from "react";
import { ArrowUpRight, Warning, ShieldCheck, MapPin, GlobeSimple, DeviceMobile, LockKey } from "@phosphor-icons/react";
import type { Panel } from "./pro.config";

/* ============================================================
   IzProPanel — the one renderer for every slide's panel.

   Five kinds cover the whole page: `code`, `table`, `record`, `duo`,
   `map`. A new slide should always be a new object in pro.config.tsx,
   never new JSX. If a slide genuinely needs a sixth shape, add the
   kind to the union there and one branch here.

   `duo` and `map` don't take a `frameT` prop — IzProStack writes the
   scroll progress straight onto `--frame-t` as a CSS custom property
   on the sticky root, and every rule that needs it reads the
   variable directly. That keeps this file free of scroll math.
   ============================================================ */

export function IzProPanel({ panel }: { panel: Panel }) {
  const focus = "focus" in panel ? panel.focus : undefined;
  return (
    <div className="izpro-panel">
      {panel.kind === "code" && <CodeBody panel={panel} />}
      {panel.kind === "table" && <TableBody panel={panel} />}
      {panel.kind === "record" && <RecordBody panel={panel} />}
      {panel.kind === "duo" && <DuoBody panel={panel} />}
      {panel.kind === "map" && <MapBody panel={panel} />}
      {focus && <FocusFrame label={focus} />}
    </div>
  );
}

/* ---------- the focus frame ----------
   ONE overlay, identical on all four steps: square corner brackets, a
   hairline accent border and a label tab. It lands with part two of
   every step, which is what tells the reader "this is the bit that
   just resolved" — the same job Fingerprint's orange selection
   rectangle does. Square corners deliberately: the panel is rounded,
   so a sharp bracket reads as a measurement mark laid ON the panel
   rather than as part of it.

   Driven entirely by --frame-t, so it costs no JS. */
function FocusFrame({ label }: { label: string }) {
  return (
    <span className="izpro-focus" aria-hidden="true">
      <i className="izpro-focus-c tl" />
      <i className="izpro-focus-c tr" />
      <i className="izpro-focus-c bl" />
      <i className="izpro-focus-c br" />
      <span className="izpro-focus-tag">{label}</span>
    </span>
  );
}

function Head({ label, right, href }: { label: string; right?: string; href?: string }) {
  return (
    <div className="izpro-phead">
      <span className="izpro-plabel">{label}</span>
      {right &&
        (href ? (
          <a className="izpro-paction" href={href}>
            {right}
            <ArrowUpRight weight="bold" aria-hidden="true" />
          </a>
        ) : (
          <span className="izpro-pright">{right}</span>
        ))}
    </div>
  );
}

/* ---------- code ---------- */

function CodeBody({ panel }: { panel: Extract<Panel, { kind: "code" }> }) {
  const [tab, setTab] = useState(panel.open ?? 0);
  return (
    <>
      {panel.head && <Head label={panel.head.label} right={panel.head.action?.label} href={panel.head.action?.href} />}
      <div className="izpro-tabs" role="tablist">
        {panel.tabs.map((t, i) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={i === tab}
            className={`izpro-tab ${i === tab ? "on" : ""}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <pre className="izpro-code">
        <code>
          {panel.lines.map((ln, i) => (
            <span key={i} className="izpro-line" style={{ ["--in" as string]: ln[0] } as React.CSSProperties}>
              {ln[1].map((seg, j) => (
                <span key={j} className={`izpro-t-${seg[1]}`}>
                  {seg[0]}
                </span>
              ))}
            </span>
          ))}
        </code>
      </pre>
    </>
  );
}

/* ---------- table ---------- */

function TableBody({ panel }: { panel: Extract<Panel, { kind: "table" }> }) {
  const from = panel.revealFrom;
  return (
    <>
      {panel.head && <Head label={panel.head.label} right={panel.head.right} />}
      <div className="izpro-rows">
        {panel.rows.map((r, i) => {
          /* Rows past `revealFrom` are part two. They are rendered from
             the start so the panel never changes height — only their
             opacity/offset is animated, which keeps this off the layout
             path entirely. `--ri` is the stagger index within part two. */
          const late = from !== undefined && i >= from;
          return (
            <div
              key={r.label}
              className={`izpro-row ${r.lit ? "lit" : ""} ${late ? "izpro-row-late" : ""}`}
              style={late ? ({ ["--ri" as string]: i - from } as React.CSSProperties) : undefined}
            >
              <span className="izpro-rlabel">{r.label}</span>
              <span className={`izpro-rstatus t-${r.tone}`}>
                <i aria-hidden="true" />
                {r.status}
              </span>
              {r.value !== undefined && <span className="izpro-rvalue">{r.value}</span>}
            </div>
          );
        })}
      </div>
      {panel.total && (
        <div className={`izpro-total t-${panel.total.tone}`}>
          <span>{panel.total.label}</span>
          <b>
            {panel.total.value}
            {panel.total.tone === "deny" && <Warning weight="fill" aria-hidden="true" />}
          </b>
        </div>
      )}
    </>
  );
}

/* ---------- record ---------- */

function RecordBody({ panel }: { panel: Extract<Panel, { kind: "record" }> }) {
  return (
    <>
      {panel.head && <Head label={panel.head.label} right={panel.head.right} />}
      {panel.greeting && (
        <div className="izpro-greet">
          {panel.greeting.text} <b>{panel.greeting.id}</b>
        </div>
      )}
      {panel.stats && (
        <div className="izpro-stats">
          {panel.stats.map((s) => (
            <div key={s.label} className="izpro-stat">
              <span>{s.label}</span>
              <b>{s.value}</b>
            </div>
          ))}
        </div>
      )}
      {panel.timeline && (
        <div className="izpro-timeline">
          <span className="izpro-when">{panel.timeline.when}</span>
          <div className="izpro-chips">
            {panel.timeline.chips.map((c) => (
              <span key={c.label} className={`izpro-chip t-${c.tone ?? "mute"}`}>
                <i>{c.label}</i>
                {c.value}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- duo: two frames, cross-fading on --frame-t ----------
   Both frames render at once, stacked. Frame A is opaque at --frame-t
   0 and fades out; frame B is the reverse. Neither is removed from
   the DOM on the swap — removing frame A the instant frame B appears
   is what would make this read as a hard cut instead of a dissolve.
   A thin orange rule appears at the same rate frame B does: the same
   cue the reference uses when its panel lands on response.json. */
function DuoBody({ panel }: { panel: Extract<Panel, { kind: "duo" }> }) {
  const c = panel.cursor;
  return (
    <>
      {panel.head && <Head label={panel.head.label} />}
      <div className="izpro-duo">
        <div className="izpro-duo-frame" data-frame="a">
          <Frame frame={panel.frameA} />
        </div>
        <div className="izpro-duo-frame" data-frame="b">
          <Frame frame={panel.frameB} />
        </div>
        {c && (
          /* The pointer's whole path is four numbers in the config and
             a lerp in CSS against --frame-t: it walks to the tile,
             clicks, and frame B opens behind it. No JS per frame. */
          <span
            className="izpro-ptr"
            aria-hidden="true"
            style={
              {
                ["--px0" as string]: `${c.fromX}%`,
                ["--py0" as string]: `${c.fromY}%`,
                ["--px1" as string]: `${c.toX}%`,
                ["--py1" as string]: `${c.toY}%`,
              } as React.CSSProperties
            }
          >
            <svg viewBox="0 0 12 18">
              <path d="M1 1l10 8-4.6.6L9 15.6l-2 .9-2.6-6L1 13z" />
            </svg>
            <i className="izpro-ptr-ring" />
          </span>
        )}
      </div>
    </>
  );
}

function Frame({ frame }: { frame: Extract<Panel, { kind: "duo" }>["frameA"] }) {
  if (frame.type === "login") return <LoginFrame frame={frame} />;
  if (frame.type === "apps") return <AppsFrame frame={frame} />;
  return <WatermarkFrame frame={frame} />;
}

function LoginFrame({ frame }: { frame: Extract<Extract<Panel, { kind: "duo" }>["frameA"], { type: "login" }> }) {
  return (
    <div className="izpro-login">
      <div className="izpro-login-field">
        <span>Email</span>
        <b>{frame.user}</b>
      </div>
      <div className="izpro-login-field">
        <span>Password</span>
        <b className="izpro-dots">••••••••••</b>
      </div>
      <div className="izpro-login-mfa">
        <span className="izpro-login-mfalabel">
          <LockKey weight="fill" aria-hidden="true" />
          Verify it&apos;s you
        </span>
        <div className="izpro-login-methods">
          {frame.methods.map((m, i) => (
            <span key={m} className={i === 0 ? "izpro-login-method on" : "izpro-login-method"}>
              {m}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Navbar + application grid, deliberately with NO sidebar — this is
   the end-user's own portal, not the admin console, and the point of
   step 01/04 is that it is one thing to look at, not a dashboard. */
function AppsFrame({ frame }: { frame: Extract<Extract<Panel, { kind: "duo" }>["frameA"], { type: "apps" }> }) {
  return (
    <div className="izpro-apps">
      <div className="izpro-apps-nav">
        <span className="izpro-apps-tenant">{frame.greeting ?? "Veno"}</span>
        <span className="izpro-apps-avatar">AJ</span>
      </div>
      <div className="izpro-apps-grid">
        {frame.apps.map((a) => (
          <span
            className={a.name === frame.openable ? "izpro-apps-tile izpro-apps-target" : "izpro-apps-tile"}
            key={a.name}
          >
            <span className={a.logo ? "izpro-apps-logo" : "izpro-apps-logo izpro-apps-proto"}>
              {a.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/logos/integrations/${a.logo}.svg`} alt="" loading="lazy" decoding="async" />
              ) : (
                <span>RDP</span>
              )}
            </span>
            <span className="izpro-apps-name">{a.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* Recreated in this file's own CSS vocabulary rather than importing
   IzMiniDesktop — same idea (wallpaper, one open window, a tiled
   identity watermark), a fraction of the markup, sized for a panel
   this small. */
function WatermarkFrame({ frame }: { frame: Extract<Extract<Panel, { kind: "duo" }>["frameA"], { type: "watermarkDesktop" }> }) {
  return (
    <div className="izpro-wmdesk">
      <span className="izpro-wmdesk-bloom" aria-hidden="true" />
      <div className="izpro-wmdesk-win">
        <span className="izpro-wmdesk-bar">{frame.app}</span>
        <div className="izpro-wmdesk-body">
          <span className="r" />
          <span className="r short" />
          <span className="r" />
        </div>
        <div className="izpro-wmdesk-wm" aria-hidden="true">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i}>{frame.watermark}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- map: a location + a bound device ---------- */

function MapBody({ panel }: { panel: Extract<Panel, { kind: "map" }> }) {
  return (
    <>
      <div className="izpro-mapcard">
        <span className="izpro-mapcard-i">
          <ShieldCheck weight="fill" aria-hidden="true" />
        </span>
        <span className="izpro-mapcard-host">{panel.device.host}</span>
        <span className="izpro-mapcard-score">{panel.device.score}</span>
      </div>
      <div className="izpro-mapwrap">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="izpro-mapimg" src={panel.image} alt="" aria-hidden="true" />
        <span className="izpro-mappin" aria-hidden="true">
          <MapPin weight="fill" />
        </span>
      </div>
      <div className="izpro-mapfoot">
        <span className="izpro-mapfoot-loc">
          <GlobeSimple weight="regular" aria-hidden="true" />
          {panel.location.city} · {panel.location.ip}
        </span>
        <span className="izpro-mapfoot-bound">
          <DeviceMobile weight="fill" aria-hidden="true" />
          {panel.boundLabel}
        </span>
      </div>
      {/* PART TWO — the breakdown behind the "25/25". Overlaid rather
          than appended so the panel keeps one fixed height. */}
      {panel.checks && (
        <div className="izpro-mapchecks">
          {panel.checks.map((c, i) => (
            <span key={c.label} className="izpro-mapcheck" style={{ ["--ri" as string]: i } as React.CSSProperties}>
              <ShieldCheck weight="fill" aria-hidden="true" />
              <b>{c.label}</b>
              {c.value}
            </span>
          ))}
        </div>
      )}
    </>
  );
}
