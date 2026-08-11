"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import {
  CaretDown,
  Database,
  DotsThreeVertical,
  FolderSimple,
  Gear,
  GlobeSimple,
  House,
  ListChecks,
  Monitor,
  ShieldCheck,
  SquaresFour,
  Terminal,
  UserCircleGear,
  Users,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   ZtaaScenes — the bespoke visuals for /zero-trust-application-access.

   ZtaaConsole is the hero's right column: the ADMIN's view of ZTAA,
   which is the half of the story the portal simulator further down
   the page does not tell. The two are deliberately different seats —
   the hero shows sessions being decided, the simulator shows the
   person whose tiles those decisions produce.

   It is drawn, not screenshotted: every value is markup, so it
   themes with the page and stays legible at 320px. Nothing here
   animates on a loop. The page's one moving interactive is the
   portal simulator, per the interaction-placement rule; a hero that
   also animates would compete with it and with the headline.
   ============================================================ */

type NavItem = { label: string; Icon: Icon; on?: boolean };
const NAV: NavItem[] = [
  { label: "Home", Icon: House, on: true },
  { label: "Applications", Icon: SquaresFour },
  { label: "Access Requests", Icon: Users },
  { label: "Sessions", Icon: Monitor },
  { label: "Devices", Icon: Monitor },
  { label: "Policies", Icon: ShieldCheck },
  { label: "Logs", Icon: ListChecks },
  { label: "Settings", Icon: Gear },
];

type Kpi = { label: string; value: string; delta: string; up: boolean };
const KPIS: Kpi[] = [
  { label: "Active Sessions", value: "128", delta: "12%", up: true },
  { label: "Policy Evaluations", value: "3,842", delta: "18%", up: true },
  { label: "Blocked Requests", value: "24", delta: "8%", up: false },
];

/* The five rows carry the argument the headline makes: one portal,
   five different protocols, one verdict column. Four allowed and one
   blocked — a console where everything passes is a screenshot of a
   product that decides nothing. */
type Row = { t: string; Icon: Icon; app: string; host: string; who: string; ok: boolean };
const ROWS: Row[] = [
  { t: "10:24:31", Icon: GlobeSimple, app: "Web App", host: "app.crm.internal", who: "jane.doe@acme.com", ok: true },
  { t: "10:24:29", Icon: Terminal, app: "SSH Connection", host: "srv-22.internal", who: "arun.dev@acme.com", ok: true },
  { t: "10:24:28", Icon: Database, app: "Database", host: "prod-db.internal:5432", who: "data.team@acme.com", ok: true },
  { t: "10:24:26", Icon: FolderSimple, app: "File Server", host: "files.acme.internal", who: "john.ops@acme.com", ok: true },
  { t: "10:24:24", Icon: Monitor, app: "RDP Connection", host: "win-10.internal", who: "jane.doe@acme.com", ok: false },
];

const POSTURE = [
  { label: "Compliant", n: "312", tone: "ok" as const },
  { label: "Non-compliant", n: "18", tone: "no" as const },
  { label: "Unknown", n: "7", tone: "warn" as const },
];

const TOP_APPS = [
  { host: "app.crm.internal", n: 842, w: 100 },
  { host: "git.internal", n: 612, w: 73 },
  { host: "dashboard.internal", n: 521, w: 62 },
];

export function ZtaaConsole() {
  /* The same hint-of-tilt the ZTNA hero uses, so the two platform
     pages read as one family. `--p` runs 0 → 1 as the console
     reaches its resting position. */
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const r = el.getBoundingClientRect();
      const next = Math.max(0, Math.min(1, Math.max(0, 220 - r.top) / 400));
      setP((prev) => (Math.abs(prev - next) < 0.012 ? prev : next));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="ztaa-console" ref={ref} style={{ ["--p" as string]: p }} aria-hidden="true">
      <div className="ztaa-console-tilt">
        <div className="ztc">
          {/* ---------- sidebar ---------- */}
          <aside className="ztc-side">
            {/* the real mark, never a generic shield — this is the
                product's own chrome, so it carries the brand */}
            <div className="ztc-brand">
              <LogoMark size={17} />
              InstaSafe
            </div>
            <nav className="ztc-nav">
              {NAV.map((n) => (
                <span key={n.label} className={n.on ? "ztc-nav-i on" : "ztc-nav-i"}>
                  <n.Icon size={15} weight="regular" />
                  {n.label}
                </span>
              ))}
            </nav>
            <div className="ztc-me">
              <span className="ztc-av">DK</span>
              <span className="ztc-me-t">
                <b>Daniel K.</b>
                <i>IT Admin</i>
              </span>
              <CaretDown size={12} weight="bold" />
            </div>
          </aside>

          {/* ---------- main ---------- */}
          <div className="ztc-main">
            <div className="ztc-hi">
              <b>Good morning, Daniel</b>
              <span>Here&apos;s what&apos;s happening across your environment.</span>
            </div>

            <div className="ztc-kpis">
              {KPIS.map((k) => (
                <div className="ztc-kpi" key={k.label}>
                  <span className="ztc-kpi-l">{k.label}</span>
                  <span className="ztc-kpi-v">
                    {k.value}
                    <i className={k.up ? "up" : "down"}>
                      {k.up ? "↑" : "↓"} {k.delta}
                    </i>
                  </span>
                  <span className="ztc-kpi-s">vs yesterday</span>
                </div>
              ))}
            </div>

            <div className="ztc-card">
              <div className="ztc-card-h">Recent Access Activity</div>
              {ROWS.map((r) => (
                <div className="ztc-row" key={r.t}>
                  <span className="ztc-row-t">{r.t}</span>
                  <span className="ztc-row-ic">
                    <r.Icon size={15} weight="regular" />
                  </span>
                  <span className="ztc-row-app">
                    <b>{r.app}</b>
                    <i>{r.host}</i>
                  </span>
                  <span className="ztc-row-who">{r.who}</span>
                  <span className={r.ok ? "ztc-chip ok" : "ztc-chip no"}>{r.ok ? "ALLOWED" : "BLOCKED"}</span>
                  <span className="ztc-row-more">
                    <DotsThreeVertical size={14} weight="bold" />
                  </span>
                </div>
              ))}
            </div>

            <div className="ztc-pair">
              <div className="ztc-card">
                <div className="ztc-card-h">Policy Status</div>
                {POSTURE.map((s) => (
                  <div className="ztc-stat" key={s.label}>
                    <span className={`ztc-dot ${s.tone}`} />
                    {s.label}
                    <b>{s.n}</b>
                  </div>
                ))}
              </div>
              <div className="ztc-card">
                <div className="ztc-card-h">Top Applications</div>
                {TOP_APPS.map((a) => (
                  <div className="ztc-app" key={a.host}>
                    <span className="ztc-app-h">{a.host}</span>
                    <span className="ztc-bar">
                      <i style={{ width: `${a.w}%` }} />
                    </span>
                    <b>{a.n}</b>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ZtaaAppTypes — the seven access types as one strip.

   The spec table further down states them as text; this states them
   as a shape, because "one portal, seven protocols" is the claim the
   whole page rests on and a reader should be able to take it in
   without reading a table.
   ============================================================ */

const TYPES: { k: string; label: string; Icon: Icon }[] = [
  { k: "FQDN", label: "Domain-based", Icon: GlobeSimple },
  { k: "WEB", label: "Browser apps", Icon: SquaresFour },
  { k: "RDP", label: "Remote desktop", Icon: Monitor },
  { k: "SSH", label: "Shell", Icon: Terminal },
  { k: "VNC", label: "Remote GUI", Icon: Monitor },
  { k: "DB", label: "Database", Icon: Database },
  { k: "WFS", label: "Windows file share", Icon: FolderSimple },
];

export function ZtaaAppTypes() {
  return (
    <div className="ztaa-types">
      {TYPES.map((t) => (
        <div className="ztaa-type" key={t.k}>
          <t.Icon size={20} weight="regular" />
          <b>{t.k}</b>
          <span>{t.label}</span>
        </div>
      ))}
      <div className="ztaa-type ztaa-type--note">
        <UserCircleGear size={20} weight="regular" />
        <b>One portal</b>
        <span>Per-user tiles, one sign-in</span>
      </div>
    </div>
  );
}
