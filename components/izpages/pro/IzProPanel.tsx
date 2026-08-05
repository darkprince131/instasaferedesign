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
  return (
    <div className="izpro-panel">
      {panel.kind === "code" && <CodeBody panel={panel} />}
      {panel.kind === "table" && <TableBody panel={panel} />}
      {panel.kind === "record" && <RecordBody panel={panel} />}
      {panel.kind === "duo" && <DuoBody panel={panel} />}
      {panel.kind === "map" && <MapBody panel={panel} />}
    </div>
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
  return (
    <>
      {panel.head && <Head label={panel.head.label} right={panel.head.right} />}
      <div className="izpro-rows">
        {panel.rows.map((r) => (
          <div key={r.label} className={`izpro-row ${r.lit ? "lit" : ""}`}>
            <span className="izpro-rlabel">{r.label}</span>
            <span className={`izpro-rstatus t-${r.tone}`}>
              <i aria-hidden="true" />
              {r.status}
            </span>
            {r.value !== undefined && <span className="izpro-rvalue">{r.value}</span>}
          </div>
        ))}
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
  return (
    <>
      {panel.head && <Head label={panel.head.label} />}
      <div className="izpro-duo">
        <span className="izpro-duo-glow" aria-hidden="true" />
        <div className="izpro-duo-frame" data-frame="a">
          <Frame frame={panel.frameA} />
        </div>
        <div className="izpro-duo-frame" data-frame="b">
          <Frame frame={panel.frameB} />
        </div>
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
        <span className="izpro-apps-tenant">Veno</span>
        <span className="izpro-apps-avatar">AJ</span>
      </div>
      <div className="izpro-apps-grid">
        {frame.apps.map((a) => (
          <span className="izpro-apps-tile" key={a.name}>
            <span className="izpro-apps-logo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/integrations/${a.logo}.svg`} alt="" loading="lazy" decoding="async" />
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
    </>
  );
}
