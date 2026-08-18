"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";
import {
  Gauge,
  ChartLineUp,
  ShieldCheck,
  ListChecks,
  FileText,
  MagnifyingGlass,
  Bell,
  Plus,
  SignOut,
  WindowsLogo,
  AppleLogo,
  AndroidLogo,
  LinuxLogo,
  CheckCircle,
  XCircle,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   InstaSafe console — the access console in OUR design language
   (orange · dark + paper). Compact admin console for use inside
   a C23 Console Row. Two views: "dashboard" and "devices".
   The blue --db i365 console stays in the /console gallery.
   ============================================================ */

type View = "dashboard" | "devices";

const NAV: { Icon: Icon; label: string; view: View }[] = [
  { Icon: Gauge, label: "Dashboard", view: "dashboard" },
  { Icon: ChartLineUp, label: "Access activity", view: "dashboard" },
  { Icon: ShieldCheck, label: "Devices", view: "devices" },
  { Icon: ListChecks, label: "Access rules", view: "dashboard" },
  { Icon: FileText, label: "Logs & reports", view: "dashboard" },
];

const KPIS = [
  { k: "Online gateways", v: "4", suf: "/4", live: true },
  { k: "Online users", v: "1,247" },
  { k: "Sessions · 24h", v: "2,418", accent: true },
  { k: "Denied · 24h", v: "38" },
];

const ACTIVITY = [14, 20, 17, 26, 22, 31, 27, 35, 30, 38, 34, 41];

const LOG = [
  { u: "anita.r", ap: "billing-portal", s: "allow", t: "09:41" },
  { u: "build-svc", ap: "code-server", s: "allow", t: "09:41" },
  { u: "contractor-07", ap: "finance-rdp", s: "deny", t: "09:41" },
  { u: "sophia.m", ap: "reports-db", s: "allow", t: "09:42" },
];

type DeviceStatus = "Enabled" | "Pending" | "Suspended";
const osIcons: Record<string, Icon> = { windows: WindowsLogo, apple: AppleLogo, android: AndroidLogo, linux: LinuxLogo };
const DEVICES: { dev: string; os: string; st: DeviceStatus; reg: string }[] = [
  { dev: "WS-FIN-014", os: "windows", st: "Enabled", reg: "12 Jun" },
  { dev: "MB-SOPHIA", os: "apple", st: "Pending", reg: "30 Sep" },
  { dev: "SRV-NODE-7", os: "linux", st: "Enabled", reg: "03 Jan" },
  { dev: "PX-ANITA", os: "android", st: "Enabled", reg: "21 Aug" },
  { dev: "WS-OPS-22", os: "windows", st: "Suspended", reg: "08 May" },
];

/* small inline area chart */
function Area({ data }: { data: number[] }) {
  const w = 240;
  const h = 64;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 6 - ((d - min) / (max - min || 1)) * (h - 14);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <svg className="isc-area" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" role="img" aria-label="Access activity over 24 hours, trending up">
      <defs>
        <linearGradient id="iscArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--orange)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--orange)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#iscArea)" />
      <path d={line} fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3" fill="var(--orange)" />
    </svg>
  );
}

function LiveClock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="isc-clock">{t}</span>;
}

function StatusPill({ st }: { st: DeviceStatus }) {
  if (st === "Enabled") return <span className="isc-pill allow"><CheckCircle weight="fill" /> Enabled</span>;
  if (st === "Suspended") return <span className="isc-pill deny"><XCircle weight="fill" /> Suspended</span>;
  return <span className="isc-pill warn"><i /> Pending</span>;
}

export function IzConsole({ view = "dashboard" }: { view?: View }) {
  const title = view === "devices" ? "Devices" : "Dashboard";
  const activeView = view;

  // one device row cycles Pending → Enabled to show the approval workflow
  const [rows, setRows] = useState(DEVICES);
  useEffect(() => {
    if (view !== "devices") return;
    const id = setInterval(() => {
      setRows((p) => p.map((r, i) => (i === 1 ? { ...r, st: r.st === "Pending" ? "Enabled" : "Pending" } : r)));
    }, 3200);
    return () => clearInterval(id);
  }, [view]);

  return (
    <div className="isc-win">
      <div className="isc-chrome">
        <span className="isc-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ttl">InstaSafe console / {title.toLowerCase()}</span>
      </div>

      <div className="isc-body">
        <aside className="isc-side">
          <div className="isc-brand">
            <LogoMark size={18} />
            <b>InstaSafe</b>
          </div>
          {NAV.map((n) => {
            const on = n.view === activeView && (activeView === "devices" ? n.label === "Devices" : n.label === "Dashboard");
            return (
              <div key={n.label} className={`isc-nav ${on ? "on" : ""}`}>
                <n.Icon weight={on ? "fill" : "regular"} />
                <span>{n.label}</span>
              </div>
            );
          })}
          <span className="sp" />
          <div className="isc-sign">
            <SignOut />
            <span>Sign out</span>
          </div>
        </aside>

        <div className="isc-main">
          <div className="isc-top">
            <h4>{title}</h4>
            <span className="isc-search">
              <MagnifyingGlass /> Search
            </span>
            <LiveClock />
            <span className="isc-bell">
              <Bell />
            </span>
            <span className="isc-av">IS</span>
          </div>

          {view === "dashboard" ? (
            <div className="isc-content">
              <div className="isc-kpis">
                {KPIS.map((kp, i) => (
                  <div key={kp.k} className={`isc-kpi ${kp.accent ? "accent" : ""} isc-rev`} style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="k">{kp.k}</div>
                    <div className="v">
                      {kp.live && (
                        <span className="live">
                          <i className="ping" />
                          <i />
                        </span>
                      )}
                      {kp.v}
                      {kp.suf && <span className="suf">{kp.suf}</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="isc-panel isc-rev" style={{ animationDelay: "240ms" }}>
                <div className="isc-panel-h">
                  Access activity · 24h<span className="sub">2,418 sessions</span>
                </div>
                <Area data={ACTIVITY} />
              </div>

              <div className="isc-log">
                {LOG.map((r, i) => (
                  <div key={r.u + r.ap} className="isc-log-row isc-rev" style={{ animationDelay: `${300 + i * 90}ms` }}>
                    <span className="u">{r.u}</span>
                    <span className="ap">{r.ap}</span>
                    <span className={`isc-pill ${r.s}`}>
                      {r.s === "allow" ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />}
                      {r.s}
                    </span>
                    <span className="t">{r.t}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="isc-content">
              <div className="isc-tblbar">
                <span className="cnt">Devices (775)</span>
                <span className="isc-search">
                  <MagnifyingGlass /> Search
                </span>
                <span className="isc-add">
                  <Plus weight="bold" /> Add
                </span>
              </div>

              <div className="isc-tbl">
                <div className="isc-th">
                  <span>Device</span>
                  <span>Status</span>
                  <span style={{ textAlign: "right" }}>Registered</span>
                </div>
                {rows.map((d, i) => {
                  const OsI = osIcons[d.os];
                  return (
                    <div key={d.dev} className="isc-tr isc-rev" style={{ animationDelay: `${i * 70}ms` }}>
                      <span className="dev">
                        <OsI weight="fill" />
                        <span>{d.dev}</span>
                      </span>
                      <span>
                        <StatusPill st={d.st} />
                      </span>
                      <span className="reg">{d.reg}</span>
                    </div>
                  );
                })}
              </div>

              <div className="isc-page">
                <span>Showing 5 of 775</span>
                <span className="pages">
                  {["1", "2", "3", "…", "78"].map((p) => (
                    <span key={p} className={p === "1" ? "on" : ""}>
                      {p}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
