"use client";

import { useState, useRef } from "react";
import {
  House, Users, SquaresFour, Laptop, ListChecks, ShieldCheck,
  Plus, X, MagnifyingGlass, Gear, UserCircle,
  CheckCircle, XCircle, Warning, Funnel,
  Globe, Database, Terminal, Cloud, Desktop,
  Export, Lock, type Icon,
} from "@phosphor-icons/react";
import { IzAvatar, IZ_USER_BY_ID } from "./izUsers";

/* ============================================================
   C-new · InstaSafe App Window — full product experience demo.
   macOS-style window, scroll-linked left nav, 6 sections:
   Dashboard · Users · Applications · Devices · Logs · Policies
   Interactive: create user, add app, filter logs, posture drill.
   ============================================================ */

interface NavSection { id: string; label: string; icon: Icon; }
const SECTIONS: NavSection[] = [
  { id: "dashboard",    label: "Dashboard",    icon: House },
  { id: "users",        label: "Users",        icon: Users },
  { id: "applications", label: "Applications", icon: SquaresFour },
  { id: "devices",      label: "Devices",      icon: Laptop },
  { id: "logs",         label: "Access Logs",  icon: ListChecks },
  { id: "policies",     label: "Policies",     icon: ShieldCheck },
];

/* ---- data ---- */
interface IUser { name: string; email: string; role: string; status: "Active"|"Inactive"; seen: string; }
/* The first three are the site-wide cast (see izUsers.tsx); the rest
   exist only to make the table look like a real tenant. */
const USERS_INIT: IUser[] = [
  { name: "Alen Joseph",   email: "alen.joseph@veno.co.in", role: "Admin",      status: "Active",   seen: "2 min ago" },
  { name: "Priya S",       email: "priya.s@veno.co.in",     role: "Developer",  status: "Active",   seen: "1h ago"    },
  { name: "Olive Ketta",   email: "olive.ketta@veno.co.in", role: "Analyst",    status: "Active",   seen: "3h ago"    },
  { name: "contractor-07", email: "ext-07@vendor.com",      role: "Contractor", status: "Inactive", seen: "2d ago"    },
  { name: "Rohan Das",     email: "rohan.d@veno.co.in",     role: "Developer",  status: "Active",   seen: "5 min ago" },
];

interface IApp { name: string; type: string; icon: Icon; users: number; status: "Protected"|"Restricted"; }
const APPS_INIT: IApp[] = [
  { name: "Billing Portal", type: "Web",      icon: Globe,    users: 1247, status: "Protected"  },
  { name: "Code Server",    type: "SSH/Dev",  icon: Terminal, users: 847,  status: "Protected"  },
  { name: "Finance RDP",    type: "RDP",      icon: Desktop,  users: 312,  status: "Restricted" },
  { name: "HR System",      type: "Web",      icon: Globe,    users: 2103, status: "Protected"  },
  { name: "Reports DB",     type: "Database", icon: Database, users: 156,  status: "Restricted" },
  { name: "DevOps Cloud",   type: "Cloud",    icon: Cloud,    users: 634,  status: "Protected"  },
];

interface IDevice { host: string; os: string; user: string; score: number; enc: boolean; patch: boolean; av: boolean|null; }
const DEVICES: IDevice[] = [
  { host: "DESKTOP-16MTL6M", os: "Windows 11 Pro", user: "Alen Joseph",   score: 95, enc: true,  patch: true,  av: true  },
  { host: "DESKTOP-7EJKLOP", os: "Windows 11 Pro", user: "Priya S",       score: 88, enc: true,  patch: true,  av: true  },
  { host: "WIN-CTR-07",      os: "Windows 10",     user: "contractor-07", score: 62, enc: true,  patch: false, av: true  },
  { host: "MacBook-OK-03",   os: "macOS 14.5",     user: "Olive Ketta",   score: 91, enc: true,  patch: true,  av: null  },
  { host: "MacBook-RD-05",   os: "macOS 14.5",     user: "Rohan Das",     score: 97, enc: true,  patch: true,  av: true  },
];

interface ILog { u: string; a: string; ok: boolean; t: string; ip: string; }
const LOGS_DATA: ILog[] = [
  { u: "alen.joseph",  a: "prod-bastion",   ok: true,  t: "09:41:22", ip: "10.0.1.42"   },
  { u: "build-svc",    a: "code-server",    ok: true,  t: "09:41:18", ip: "10.0.1.88"   },
  { u: "contractor-07",a: "admin-panel",    ok: false, t: "09:41:05", ip: "192.168.3.7"  },
  { u: "priya.s",      a: "erp-frontend",   ok: true,  t: "09:40:58", ip: "10.0.1.55"   },
  { u: "ops-22",       a: "finance-rdp",    ok: false, t: "09:40:44", ip: "10.0.2.19"   },
  { u: "rohan.d",      a: "code-server",    ok: true,  t: "09:40:31", ip: "10.0.1.73"   },
  { u: "olive.ketta",  a: "asset-store",    ok: true,  t: "09:40:12", ip: "10.0.1.61"   },
  { u: "contractor-07",a: "billing-portal", ok: false, t: "09:39:55", ip: "192.168.3.7"  },
  { u: "alen.joseph",  a: "build-farm",     ok: true,  t: "09:39:33", ip: "10.0.1.42"   },
  { u: "priya.s",      a: "reports-db",     ok: true,  t: "09:39:01", ip: "10.0.1.55"   },
];

interface IPolicy { name: string; who: string; apps: string[]; conditions: string[]; status: "Active"|"Draft"; }
const POLICIES: IPolicy[] = [
  { name: "Finance Apps — Employees Only", who: "finance-team · 34 users", apps: ["billing-portal","finance-rdp"], conditions: ["Device posture ≥ 80","MFA required","India locations only"], status: "Active" },
  { name: "Code Access — Developers",      who: "dev-team · 18 users",     apps: ["code-server"],                  conditions: ["Corporate device only","Working hours 07:00–22:00 IST"],   status: "Active" },
  { name: "All Staff — HR & Internal",     who: "all-users · 4,847",       apps: ["hr-system","billing-portal"],   conditions: ["MFA required"],                                              status: "Active" },
  { name: "Vendor — Limited Access",       who: "contractors · 7 users",   apps: ["devops-cloud"],                 conditions: ["Posture ≥ 70","Session recording ON","No lateral movement"], status: "Draft"  },
];

/* ---- sparkline ---- */
const SPARK = [42,67,51,88,74,92,83,96,78,100,91,108];
function Sparkline() {
  const W = 300; const H = 44; const max = Math.max(...SPARK);
  const pts = SPARK.map((v,i) => [
    (i/(SPARK.length-1))*W,
    H - (v/max)*H*0.88 - 2,
  ] as [number,number]);
  const line = pts.map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const area = `M${pts[0][0]},${H} ${pts.map(([x,y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} L${pts[pts.length-1][0]},${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="iaw-spark-svg" aria-hidden="true">
      <defs>
        <linearGradient id="iaw-sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--orange)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--orange)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#iaw-sg)" />
      <polyline points={line} fill="none" stroke="var(--orange)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

/* ---- section header ---- */
function SecH({ title, count, action, onAction }: { title: string; count?: number; action?: string; onAction?: () => void }) {
  return (
    <div className="iaw-sec-h">
      <span className="iaw-sec-title">{title}</span>
      {count !== undefined && <span className="iaw-badge-count">{count}</span>}
      {action && <button className="iaw-btn-add" onClick={onAction}><Plus weight="bold" />{action}</button>}
    </div>
  );
}

/* ---- avatar ---- */
function Av({ ch, lg }: { ch: string; lg?: boolean }) {
  return <span className={`iaw-avatar${lg ? " lg" : ""}`}>{ch}</span>;
}

/* ======== SECTIONS ======== */

function DashboardSection() {
  return (
    <div className="iaw-section" id="iaw-dashboard">
      <SecH title="Dashboard" />
      <div className="iaw-kpi-grid">
        <div className="iaw-kpi"><span className="iaw-kpi-v">4,847</span><span className="iaw-kpi-l">Active users</span><span className="iaw-kpi-delta up">+12% today</span></div>
        <div className="iaw-kpi"><span className="iaw-kpi-v">34</span><span className="iaw-kpi-l">Protected apps</span><span className="iaw-kpi-delta">stable</span></div>
        <div className="iaw-kpi"><span className="iaw-kpi-v">127</span><span className="iaw-kpi-l">Blocked today</span><span className="iaw-kpi-delta" style={{color:"var(--deny)"}}>↑ 23 vs. yesterday</span></div>
        <div className="iaw-kpi"><span className="iaw-kpi-v">94%</span><span className="iaw-kpi-l">Device health</span><span className="iaw-kpi-delta up">+2pp this week</span></div>
      </div>
      <div className="iaw-spark-card">
        <div className="iaw-spark-h"><span className="iaw-spark-lbl">Access events · last 12h</span><span className="iaw-badge ok">Live</span></div>
        <Sparkline />
      </div>
      <div className="iaw-recent-h"><span className="iaw-sec-lbl">Recent access events</span><span className="iaw-link">View all →</span></div>
      {LOGS_DATA.slice(0,5).map((r,i) => (
        <div className="iaw-mini-row" key={i}>
          <span className="iaw-lic" style={{color: r.ok ? "var(--allow)" : "var(--deny)"}}>
            {r.ok ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />}
          </span>
          <span className="iaw-lu">{r.u}</span>
          <span className="iaw-la">{r.a}</span>
          <span className="iaw-lt">{r.t}</span>
        </div>
      ))}
    </div>
  );
}

function UsersSection() {
  const [rows, setRows] = useState<IUser[]>(USERS_INIT);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');

  function submit() {
    if (!name.trim() || !email.trim()) return;
    setRows(r => [...r, { name: name.trim(), email: email.trim(), role, status: "Active", seen: "just now" }]);
    setName(''); setEmail(''); setRole('Developer'); setShow(false);
  }

  return (
    <div className="iaw-section" id="iaw-users">
      <SecH title="Users" count={rows.length} action="Add user" onAction={() => setShow(s => !s)} />
      {show && (
        <div className="iaw-form">
          <div className="iaw-form-row">
            <input className="iaw-input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
            <input className="iaw-input" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} />
            <select className="iaw-select" value={role} onChange={e => setRole(e.target.value)}>
              <option>Admin</option><option>Developer</option><option>Analyst</option><option>Contractor</option>
            </select>
            <button className="iaw-btn-submit" onClick={submit}>Create user</button>
            <button className="iaw-btn-ghost" onClick={() => setShow(false)}><X /></button>
          </div>
        </div>
      )}
      <div className="iaw-table iaw-users-table">
        <div className="iaw-tr iaw-thead"><span>Name</span><span>Email</span><span>Role</span><span>Status</span><span>Last seen</span></div>
        {rows.map((u,i) => (
          <div className="iaw-tr" key={i}>
            <span className="iaw-user-cell"><Av ch={u.name[0]} />{u.name}</span>
            <span className="iaw-mono iaw-mute">{u.email}</span>
            <span>{u.role}</span>
            <span><span className={`iaw-pill ${u.status === "Active" ? "ok" : "off"}`}>{u.status}</span></span>
            <span className="iaw-mute">{u.seen}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppsSection() {
  const typeIcon: Record<string,Icon> = { Web: Globe, "SSH/Dev": Terminal, RDP: Desktop, Database, Cloud };
  const [apps, setApps] = useState<IApp[]>(APPS_INIT);
  const [show, setShow] = useState(false);
  const [appName, setAppName] = useState('');
  const [appType, setAppType] = useState('Web');

  function submit() {
    if (!appName.trim()) return;
    setApps(a => [...a, { name: appName.trim(), type: appType, icon: typeIcon[appType] ?? Globe, users: 0, status: "Protected" }]);
    setAppName(''); setShow(false);
  }

  return (
    <div className="iaw-section" id="iaw-applications">
      <SecH title="Applications" count={apps.length} action="Add app" onAction={() => setShow(s => !s)} />
      {show && (
        <div className="iaw-form">
          <div className="iaw-form-row">
            <input className="iaw-input" placeholder="Application name" value={appName} onChange={e => setAppName(e.target.value)} />
            <select className="iaw-select" value={appType} onChange={e => setAppType(e.target.value)}>
              <option>Web</option><option>SSH/Dev</option><option>RDP</option><option>Database</option><option>Cloud</option>
            </select>
            <button className="iaw-btn-submit" onClick={submit}>Add</button>
            <button className="iaw-btn-ghost" onClick={() => setShow(false)}><X /></button>
          </div>
        </div>
      )}
      <div className="iaw-app-grid">
        {apps.map((a,i) => {
          const I = a.icon;
          return (
            <div className="iaw-app-card" key={i}>
              <span className="iaw-app-icon"><I weight="regular" /></span>
              <span className="iaw-app-name">{a.name}</span>
              <span className="iaw-app-type">{a.type}</span>
              <div className="iaw-app-foot">
                <span className="iaw-mute iaw-app-users">{a.users > 0 ? `${a.users.toLocaleString()} users` : "—"}</span>
                <span className={`iaw-pill ${a.status === "Protected" ? "ok" : "warn"}`}>{a.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DevicesSection() {
  const [expanded, setExpanded] = useState<string|null>(null);
  const sc = (s: number) => s >= 80 ? "ok" : s >= 60 ? "warn" : "deny";
  const sl = (s: number) => s >= 80 ? "Healthy" : s >= 60 ? "Warning" : "Critical";

  return (
    <div className="iaw-section" id="iaw-devices">
      <SecH title="Devices" count={DEVICES.length} />
      <div className="iaw-table iaw-devices-table">
        <div className="iaw-tr iaw-thead"><span>Hostname</span><span>OS</span><span>User</span><span>Health</span><span>Posture</span></div>
        {DEVICES.map((d) => (
          <div className="iaw-device-wrap" key={d.host}>
            <div className={`iaw-tr iaw-tr-click${expanded === d.host ? " on" : ""}`} onClick={() => setExpanded(e => e === d.host ? null : d.host)}>
              <span className="iaw-mono iaw-fw">{d.host}</span>
              <span className="iaw-mute">{d.os}</span>
              <span>{d.user}</span>
              <span><span className={`iaw-pill ${sc(d.score)}`}>{sl(d.score)} · {d.score}</span></span>
              <span className="iaw-posture-dots">
                <span className={`iaw-dot ${d.enc ? "ok" : "deny"}`} title="Disk encryption" />
                <span className={`iaw-dot ${d.patch ? "ok" : "warn"}`} title="OS patches" />
                <span className={`iaw-dot ${d.av === null ? "na" : d.av ? "ok" : "deny"}`} title="Antivirus" />
              </span>
            </div>
            {/* The inner wrapper is load-bearing: the open/close animation is
                grid-template-rows 0fr→1fr, which needs exactly one child to
                collapse. It replaces a max-height transition that had to
                guess a height (120px) and so eased wrong and clipped taller
                rows. */}
            <div className={`iaw-posture-detail${expanded === d.host ? " open" : ""}`}>
              <div className="iaw-posture-inner">
                <span className={`iaw-posture-row${d.enc ? " ok" : " fail"}`}>{d.enc ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />} Disk encryption</span>
                <span className={`iaw-posture-row${d.patch ? " ok" : " fail"}`}>{d.patch ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />} OS patches up to date</span>
                <span className={`iaw-posture-row${d.av === null ? " na" : d.av ? " ok" : " fail"}`}>
                  {d.av === null ? <Warning weight="fill" /> : d.av ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />}
                  {" "}Antivirus{d.av === null ? " (N/A on this platform)" : ""}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogsSection() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<"all"|"allow"|"deny">("all");

  const filtered = LOGS_DATA.filter(r =>
    (!query || r.u.includes(query) || r.a.includes(query)) &&
    (status === "all" || (status === "allow" ? r.ok : !r.ok))
  );

  return (
    <div className="iaw-section" id="iaw-logs">
      <SecH title="Access Logs" count={filtered.length} />
      <div className="iaw-filter">
        <span className="iaw-filter-icon"><Funnel weight="regular" /></span>
        <input className="iaw-input sm" placeholder="Filter by user or app…" value={query} onChange={e => setQuery(e.target.value)} />
        <select className="iaw-select sm" value={status} onChange={e => setStatus(e.target.value as typeof status)}>
          <option value="all">All events</option>
          <option value="allow">Allowed only</option>
          <option value="deny">Blocked only</option>
        </select>
        <span className="iaw-filter-count">{filtered.length} events</span>
        <button className="iaw-btn-sm"><Export weight="regular" /> Export</button>
      </div>
      <div className="iaw-table iaw-logs-table">
        <div className="iaw-tr iaw-thead"><span></span><span>User</span><span>Application</span><span>Status</span><span>Time</span><span>Source IP</span></div>
        {filtered.length === 0 && <div className="iaw-empty">No events match this filter.</div>}
        {filtered.map((r,i) => (
          <div className="iaw-tr" key={i}>
            <span className="iaw-lic" style={{color: r.ok ? "var(--allow)" : "var(--deny)"}}>
              {r.ok ? <CheckCircle weight="fill" /> : <XCircle weight="fill" />}
            </span>
            <span>{r.u}</span>
            <span className="iaw-orange">{r.a}</span>
            <span>
              <span className="iaw-pill" style={r.ok ? {background:"var(--allow-bg)",color:"var(--allow)"} : {background:"var(--deny-bg)",color:"var(--deny)"}}>
                {r.ok ? "allowed" : "blocked"}
              </span>
            </span>
            <span className="iaw-mono">{r.t}</span>
            <span className="iaw-mono iaw-mute">{r.ip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PoliciesSection() {
  const [toast, setToast] = useState(false);
  function handleNew() { setToast(true); setTimeout(() => setToast(false), 2800); }
  return (
    <div className="iaw-section" id="iaw-policies">
      <SecH title="Policies" count={POLICIES.length} action="New policy" onAction={handleNew} />
      {toast && <div className="iaw-toast">Contact InstaSafe to configure custom access policies ›</div>}
      <div className="iaw-policy-grid">
        {POLICIES.map((p) => (
          <div className="iaw-policy" key={p.name}>
            <div className="iaw-policy-h">
              <Lock weight="fill" />
              <span className="iaw-policy-name">{p.name}</span>
              <span className={`iaw-pill ${p.status === "Active" ? "ok" : "warn"}`}>{p.status}</span>
            </div>
            <div className="iaw-policy-who"><Users weight="regular" />{p.who}</div>
            <div className="iaw-policy-apps">{p.apps.map(a => <span className="iaw-policy-app" key={a}>{a}</span>)}</div>
            <div className="iaw-policy-conds">
              {p.conditions.map(c => <span className="iaw-cond" key={c}><CheckCircle weight="fill" />{c}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ======== MAIN WINDOW ======== */

type AppWindowProps = {
  /** row variant: shorter, narrower sidebar, no titlebar search — the
      size that fits the console slot of a ConsoleRow rather than a
      full-width section of its own. */
  compact?: boolean;
};

export function IzAppWindow({ compact }: AppWindowProps = {}) {
  const [active, setActive] = useState("dashboard");
  const scrollRef = useRef<HTMLDivElement>(null);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const c = e.currentTarget;
    const cTop = c.getBoundingClientRect().top;
    let best = SECTIONS[0].id;
    let bestDist = Infinity;
    SECTIONS.forEach(({ id }) => {
      const el = c.querySelector(`#iaw-${id}`) as HTMLElement|null;
      if (!el) return;
      const dist = Math.abs(el.getBoundingClientRect().top - cTop);
      if (dist < bestDist) { bestDist = dist; best = id; }
    });
    setActive(best);
  }

  function navTo(id: string) {
    const c = scrollRef.current;
    if (!c) return;
    const el = c.querySelector(`#iaw-${id}`) as HTMLElement|null;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  return (
    <div className={compact ? "iaw iaw--compact" : "iaw"}>
      {/* titlebar */}
      <div className="iaw-titlebar">
        <span className="iaw-dots">
          <i style={{background:"#FF5F57"}} /><i style={{background:"#FEBC2E"}} /><i style={{background:"#28C840"}} />
        </span>
        <span className="iaw-win-title">
          <Lock weight="fill" />InstaSafe ZTNA
        </span>
        {!compact && (
          <span className="iaw-search">
            <MagnifyingGlass weight="regular" />
            <input placeholder="Search users, apps, policies…" readOnly />
          </span>
        )}
        <span className="iaw-win-actions">
          <Gear weight="regular" /><UserCircle weight="fill" />
        </span>
      </div>

      {/* body */}
      <div className="iaw-body">
        {/* sidebar */}
        <nav className="iaw-sidebar" aria-label="App navigation">
          <div className="iaw-brand">
            <span className="iaw-brand-logo">IS</span>
            <span className="iaw-brand-name">InstaSafe</span>
          </div>
          <ul className="iaw-nav-list">
            {SECTIONS.map(({ id, label, icon: I }) => (
              <li key={id}>
                <button
                  className={`iaw-nav-item${active === id ? " on" : ""}`}
                  onClick={() => navTo(id)}
                  aria-current={active === id ? "page" : undefined}
                >
                  <I weight={active === id ? "fill" : "regular"} />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="iaw-sidebar-foot">
            {/* same person, same mark, as the end-user portal and the
                access logs — one cast across the whole site */}
            <IzAvatar user={IZ_USER_BY_ID.alen} size={28} />
            <span className="iaw-foot-info">
              <span className="iaw-user-name">{IZ_USER_BY_ID.alen.name}</span>
              <span className="iaw-user-role">Admin</span>
            </span>
          </div>
        </nav>

        {/* scrollable content */}
        <div className="iaw-content" ref={scrollRef} onScroll={handleScroll}>
          <DashboardSection />
          <UsersSection />
          <AppsSection />
          <DevicesSection />
          <LogsSection />
          <PoliciesSection />
        </div>
      </div>
    </div>
  );
}
