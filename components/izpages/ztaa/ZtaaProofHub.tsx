"use client";

import {
  ArrowSquareOut,
  BracketsCurly,
  ChartBar,
  Clock,
  Cursor,
  DownloadSimple,
  FileCode,
  Fingerprint,
  Play,
  ShareNetwork,
  ShieldCheck,
  SignIn,
  SignOut,
  Stop,
  Table,
  UsersThree,
  WarningCircle,
  type Icon,
} from "@phosphor-icons/react";

import { FeatureHub, type FeatureHubTab } from "@/components/home2/FeatureHub";

/* ============================================================
   ZtaaProofHub — the "prove everything" section, on 00i FeatureHub.

   Three tabs, one per claim the section makes: the events, the reports
   and the exports.

   ▸ ALL THREE VIEWS SHARE A GRAMMAR ◂
   Left rail names and counts the set; right pane shows one member of
   it working. Keep that if a fourth is added: unrelated dashboards
   would be screenshots in a tab strip, not one section.

   ▸ LOGOS ◂
   Real marks only, from /public/logos/integrations — Splunk, Elastic,
   ArcSight and Syslog are supplied now. CEF, LEEF and NDJSON keep the
   typed abbreviation permanently: they are wire formats, not products,
   so there is no vendor mark to hold and none is coming.

   The marks are dark-ink artwork, so on the dark theme they sit on a
   light plate rather than being recoloured — see ztaaproof.css. That
   also matches the reference, where each export row carries a light
   tile.
   ============================================================ */

const TABS: FeatureHubTab[] = [
  {
    icon: ArrowSquareOut,
    title: "202 event log types",
    desc: "Logins, failures, posture results, policy decisions, session starts/ends, in-session actions.",
    href: "/zero-trust-network-access",
  },
  {
    icon: ChartBar,
    title: "11 built-in report types",
    desc: "Access summaries, device reports, user activity, authentication summaries.",
    href: "/platform",
  },
  {
    icon: ShareNetwork,
    title: "7 SIEM export formats",
    desc: "Feed Splunk-class tooling in the shape it already reads.",
    href: "/platform",
  },
];

/* ============================================================
   1 · the event stream
   Every kind carries its own icon, and so does every row — an event
   log read as a wall of timestamps is exactly the thing this tab is
   arguing against.
   ============================================================ */

const EVENT_KINDS: { label: string; n: number; Icon: Icon; tone: string }[] = [
  { label: "Logins", n: 34, Icon: SignIn, tone: "allow" },
  { label: "Failures", n: 28, Icon: WarningCircle, tone: "deny" },
  { label: "Posture results", n: 26, Icon: Fingerprint, tone: "accent" },
  { label: "Policy decisions", n: 31, Icon: ShieldCheck, tone: "accent" },
  { label: "Session starts / ends", n: 24, Icon: Play, tone: "mute" },
  { label: "In-session actions", n: 59, Icon: Cursor, tone: "mute" },
];

/* Demo rows, same convention as the other consoles on the site. The
   counts above add to exactly 202 — a reader who totals the rail
   should land on the number in the tab. */
const EVENT_ROWS: { t: string; what: string; who: string; where: string; tag: string; tone: string; Icon: Icon }[] = [
  { t: "10:24:31", what: "Login success", who: "alen.joseph", where: "Browser", tag: "Allowed", tone: "allow", Icon: SignIn },
  { t: "10:24:18", what: "Posture check", who: "Device compliant", where: "Windows 11", tag: "Passed", tone: "allow", Icon: Fingerprint },
  { t: "10:24:07", what: "Policy decision", who: "erp-core access", where: "Zero Trust", tag: "Allowed", tone: "allow", Icon: ShieldCheck },
  { t: "10:23:58", what: "Session started", who: "finance dashboard", where: "Web app", tag: "Active", tone: "accent", Icon: Play },
  { t: "10:23:41", what: "File download", who: "Q4_report.xlsx", where: "In-session", tag: "Logged", tone: "mute", Icon: DownloadSimple },
  { t: "10:23:12", what: "Logout", who: "alen.joseph", where: "Browser", tag: "Ended", tone: "mute", Icon: SignOut },
];

function EventsView() {
  return (
    <div className="zph zph--events">
      <div className="zph-rail">
        <span className="zph-rail-h">202 event log types</span>
        <ul>
          {EVENT_KINDS.map((k) => (
            <li key={k.label}>
              <span className={`zph-kic is-${k.tone}`} aria-hidden="true">
                <k.Icon weight="duotone" />
              </span>
              <span className="zph-kl">{k.label}</span>
              <b>{k.n}</b>
            </li>
          ))}
        </ul>
      </div>

      <div className="zph-pane">
        <div className="zph-pane-h">
          <span className="zph-pane-t">Live event stream</span>
          <span className="zph-live">
            <i aria-hidden="true" />
            Live
          </span>
        </div>
        <ul className="zph-rows">
          {EVENT_ROWS.map((r) => (
            <li key={r.t}>
              <span className={`zph-ric is-${r.tone}`} aria-hidden="true">
                <r.Icon weight="fill" />
              </span>
              <span className="zph-t">{r.t}</span>
              <span className="zph-what">{r.what}</span>
              <span className="zph-who">{r.who}</span>
              <span className="zph-where">{r.where}</span>
              <span className={`zph-tag is-${r.tone}`}>{r.tag}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   2 · the reports
   ============================================================ */

const REPORT_STATS = [
  { label: "Total logins", value: "48,392", d: "+12%", spark: [8, 12, 10, 16, 14, 20, 24], hue: "allow" },
  { label: "Unique users", value: "4,218", d: "+8%", spark: [10, 9, 13, 12, 17, 16, 21], hue: "accent" },
  { label: "Devices", value: "2,731", d: "+14%", spark: [6, 9, 8, 14, 13, 18, 22], hue: "info" },
  { label: "Denied requests", value: "328", d: "−26%", spark: [22, 19, 20, 14, 12, 9, 7], hue: "deny" },
];

/* One icon per report type, each toned. They were all FileText in the
   same grey, which made a list of five report types look like the same
   report five times — the opposite of what "11 built-in report types"
   is trying to say. */
const REPORT_KINDS: { label: string; Icon: Icon; tone: string }[] = [
  { label: "Overview", Icon: ChartBar, tone: "accent" },
  { label: "Access", Icon: SignIn, tone: "allow" },
  { label: "Devices", Icon: Fingerprint, tone: "info" },
  { label: "Users", Icon: UsersThree, tone: "violet" },
  { label: "Authentication", Icon: ShieldCheck, tone: "mute" },
];

/* Real marks only — see the logo note in the header. */
const TOP_APPS = [
  { name: "Google Workspace", logo: "google", pct: 92, n: "18.4K" },
  { name: "AWS Console", logo: "aws", pct: 68, n: "12.1K" },
  { name: "GitHub", logo: "github", pct: 44, n: "7.6K" },
  { name: "Microsoft 365", logo: "microsoft-365", pct: 33, n: "5.2K" },
  { name: "Salesforce", logo: "salesforce", pct: 24, n: "4.3K" },
  { name: "Slack", logo: "slack", pct: 18, n: "3.1K" },
];

/* A sparkline from a small integer series. Drawn rather than imported:
   seven points do not justify a charting dependency, and this way the
   stroke is a token like everything else. */
function Spark({ points, hue }: { points: number[]; hue: string }) {
  const max = Math.max(...points);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i / (points.length - 1)) * 100},${28 - (p / max) * 24}`)
    .join(" ");
  return (
    <svg className={`zph-spark is-${hue}`} viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true">
      <path d={`${d} L100,30 L0,30 Z`} className="zph-spark-fill" />
      <path d={d} className="zph-spark-line" />
    </svg>
  );
}

function ReportsView() {
  return (
    <div className="zph zph--reports">
      <div className="zph-rail">
        <span className="zph-rail-h">11 built-in report types</span>
        <ul className="zph-rail-plain">
          {REPORT_KINDS.map((k, i) => (
            <li key={k.label} className={i === 0 ? "on" : undefined}>
              <span className={`zph-kic is-${k.tone}`} aria-hidden="true">
                <k.Icon weight="duotone" />
              </span>
              {k.label}
            </li>
          ))}
        </ul>
        <span className="zph-rail-note">Pre-built · schedule · export</span>
      </div>

      <div className="zph-pane">
        <div className="zph-pane-h">
          <span className="zph-pane-t">Report overview</span>
          <span className="zph-chip">
            <Clock weight="regular" aria-hidden="true" />
            Last 30 days
          </span>
        </div>

        <div className="zph-stats">
          {REPORT_STATS.map((s) => (
            <div className="zph-stat" key={s.label}>
              <span className="zph-stat-l">{s.label}</span>
              <b>{s.value}</b>
              {/* every delta here is an improvement, including the fall
                  in denials — so none of them is styled as a failure */}
              <span className="zph-delta">{s.d}</span>
              <Spark points={s.spark} hue={s.hue} />
            </div>
          ))}
        </div>

        <div className="zph-apps">
          <span className="zph-apps-h">Top applications</span>
          {TOP_APPS.map((a) => (
            <div className="zph-app" key={a.name}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/logos/integrations/${a.logo}.svg`} alt="" aria-hidden="true" loading="lazy" />
              <span className="zph-app-n">{a.name}</span>
              <span className="zph-meter" aria-hidden="true">
                <i style={{ width: `${a.pct}%` }} />
              </span>
              <span className="zph-app-c">{a.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   3 · the exports
   The flow is DRAWN, not implied by adjacency. Seven sources fan into
   one engine and out to seven formats; three columns of boxes with no
   connectors would just be three lists side by side.
   ============================================================ */

const EXPORT_SOURCES: { label: string; Icon: Icon; tone: string }[] = [
  { label: "User login", Icon: SignIn, tone: "allow" },
  { label: "Login failure", Icon: WarningCircle, tone: "deny" },
  { label: "Device posture", Icon: Fingerprint, tone: "accent" },
  { label: "Policy decision", Icon: ShieldCheck, tone: "accent" },
  { label: "Session start", Icon: Play, tone: "mute" },
  { label: "Session end", Icon: Stop, tone: "mute" },
  { label: "In-session action", Icon: Cursor, tone: "mute" },
];

/* CEF, LEEF and NDJSON are wire FORMATS, not products — there is no
   vendor mark to hold and none is coming. They carry a coloured glyph
   rather than a typed abbreviation: the row already prints the name and
   the extension, so repeating "CEF" a third time as a monogram said
   nothing and read as a missing asset. Each glyph is toned differently
   so the three are told apart at a glance, the same job a logo does. */
const EXPORT_TARGETS: { name: string; ext: string; logo: string | null; Glyph?: Icon; tone?: string }[] = [
  { name: "Splunk", ext: ".json", logo: "splunk" },
  { name: "Elastic Common Schema", ext: ".ecs", logo: "elastic" },
  { name: "CEF", ext: ".cef", logo: null, Glyph: BracketsCurly, tone: "accent" },
  { name: "LEEF", ext: ".leef", logo: null, Glyph: Table, tone: "allow" },
  { name: "ArcSight", ext: ".arc", logo: "arcsight" },
  { name: "Syslog", ext: ".log", logo: "syslog" },
  { name: "NDJSON", ext: ".ndjson", logo: null, Glyph: FileCode, tone: "info" },
];

/* The connector layer. Rows are evenly spaced, so the y of row i is
   derived rather than hand-placed — add an eighth source and the fan
   still lands on the right rows. */
function Fan({ n, dir }: { n: number; dir: "in" | "out" }) {
  const H = 100;
  const mid = H / 2;
  const paths = Array.from({ length: n }, (_, i) => {
    const y = ((i + 0.5) / n) * H;
    return dir === "in"
      ? `M0,${y} C34,${y} 62,${mid} 100,${mid}`
      : `M0,${mid} C38,${mid} 66,${y} 100,${y}`;
  });
  return (
    <svg className={`zph-fan is-${dir}`} viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} d={d} className="zph-fan-p" style={{ ["--i" as string]: i }} />
      ))}
    </svg>
  );
}

function ExportsView() {
  return (
    <div className="zph zph--exports">
      <div className="zph-rail">
        <span className="zph-rail-h">
          <i className="zph-dot" aria-hidden="true" />
          Events from the platform
        </span>
        <ul className="zph-rail-plain">
          {EXPORT_SOURCES.map((e) => (
            <li key={e.label}>
              <span className={`zph-kic is-${e.tone}`} aria-hidden="true">
                <e.Icon weight="duotone" />
              </span>
              {e.label}
            </li>
          ))}
        </ul>
      </div>

      <Fan n={EXPORT_SOURCES.length} dir="in" />

      <div className="zph-engine" aria-hidden="true">
        <span className="zph-engine-mark">
          <ShareNetwork weight="regular" />
        </span>
        <span className="zph-engine-t">
          SIEM export
          <br />
          engine
        </span>
      </div>

      <Fan n={EXPORT_TARGETS.length} dir="out" />

      <div className="zph-targets">
        {EXPORT_TARGETS.map((t) => (
          <div className="zph-target" key={t.name}>
            <span className="zph-target-ic" aria-hidden="true">
              {t.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={`/logos/integrations/${t.logo}.svg`} alt="" loading="lazy" />
              ) : t.Glyph ? (
                <b className={`is-${t.tone}`}>
                  <t.Glyph weight="duotone" />
                </b>
              ) : null}
            </span>
            <span className="zph-target-n">{t.name}</span>
            <span className="zph-ext">{t.ext}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ZtaaProofHub() {
  return (
    <FeatureHub
      eyebrow="Prove everything"
      title={
        <>
          Every signal, <em>visible and verifiable</em>.
        </>
      }
      lead="Logs, reports and exports — built in. No add-ons. No gaps."
      tabs={TABS}
      views={[<EventsView key="e" />, <ReportsView key="r" />, <ExportsView key="x" />]}
      initial={0}
    />
  );
}
