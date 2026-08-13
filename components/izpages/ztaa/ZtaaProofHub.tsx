"use client";

import { ArrowSquareOut, ChartBar, ShareNetwork } from "@phosphor-icons/react";

import { FeatureHub, type FeatureHubTab } from "@/components/home2/FeatureHub";

/* ============================================================
   ZtaaProofHub — the "prove everything" section, on 00i FeatureHub.

   Replaces a bare LiveActivity feed. The section's claim is three
   numbers — 202 event types, 11 report types, 7 SIEM formats — and a
   single scrolling log could only ever show the first of them. The hub
   chassis has one tab per number, so each claim gets the picture that
   actually demonstrates it.

   ▸ THE THREE VIEWS SHARE A GRAMMAR ◂
   Left rail names the set and counts it; right pane shows one member of
   that set doing its job. Keep that if a fourth is ever added — three
   unrelated dashboards would be three screenshots, not one section.

   ▸ LOGOS ◂
   Real marks where the repo has them (Google Workspace, AWS, GitHub,
   Microsoft 365). Splunk, Elastic, ArcSight and Jira are NOT in
   /public/logos/integrations, so those slots render a typed
   placeholder rather than an invented mark — drawing a rough Splunk
   logo is worse than not drawing one. Drop the real SVG into that
   folder and add its filename to `logo` below; nothing else changes.
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

/* ---------------- 1 · the event stream ---------------- */

const EVENT_KINDS = [
  { label: "Logins", n: 34 },
  { label: "Failures", n: 28 },
  { label: "Posture results", n: 26 },
  { label: "Policy decisions", n: 31 },
  { label: "Session starts / ends", n: 24 },
  { label: "In-session actions", n: 59 },
];

/* Demo rows, same convention as the other consoles on the site. The
   counts above sum to 202 deliberately — a reader who adds them up
   should land on the number in the tab. */
const EVENT_ROWS = [
  { t: "10:24:31", what: "Login success", who: "alen.joseph", where: "Browser", tag: "Allowed", tone: "allow" },
  { t: "10:24:18", what: "Posture check", who: "Device compliant", where: "Windows 11", tag: "Passed", tone: "allow" },
  { t: "10:24:07", what: "Policy decision", who: "erp-core access", where: "Zero Trust", tag: "Allowed", tone: "allow" },
  { t: "10:23:58", what: "Session started", who: "finance dashboard", where: "Web app", tag: "Active", tone: "accent" },
  { t: "10:23:41", what: "File download", who: "Q4_report.xlsx", where: "In-session", tag: "Logged", tone: "mute" },
  { t: "10:23:12", what: "Logout", who: "alen.joseph", where: "Browser", tag: "Ended", tone: "mute" },
];

function EventsView() {
  return (
    <div className="zph zph--events">
      <div className="zph-rail">
        <span className="zph-rail-h">202 event log types</span>
        <ul>
          {EVENT_KINDS.map((k) => (
            <li key={k.label}>
              <span>{k.label}</span>
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

/* ---------------- 2 · the reports ---------------- */

const REPORT_STATS = [
  { label: "Total logins", value: "48,392", d: "+12%", up: true },
  { label: "Unique users", value: "4,218", d: "+8%", up: true },
  { label: "Devices", value: "2,731", d: "+14%", up: true },
  { label: "Denied requests", value: "328", d: "-26%", up: false },
];

const REPORT_KINDS = ["Overview", "Access", "Devices", "Users", "Authentication"];

/* Real marks only — see the logo note in the header. */
const TOP_APPS = [
  { name: "Google Workspace", logo: "google-workspace", pct: 92 },
  { name: "AWS Console", logo: "aws", pct: 68 },
  { name: "GitHub", logo: "github", pct: 44 },
  { name: "Microsoft 365", logo: "microsoft-365", pct: 27 },
];

function ReportsView() {
  return (
    <div className="zph zph--reports">
      <div className="zph-rail">
        <span className="zph-rail-h">11 built-in report types</span>
        <ul className="zph-rail-plain">
          {REPORT_KINDS.map((k, i) => (
            <li key={k} className={i === 0 ? "on" : undefined}>
              {k}
            </li>
          ))}
        </ul>
        <span className="zph-rail-note">Pre-built · schedule · export</span>
      </div>

      <div className="zph-pane">
        <div className="zph-pane-h">
          <span className="zph-pane-t">Report overview</span>
          <span className="zph-chip">Last 30 days</span>
        </div>

        <div className="zph-stats">
          {REPORT_STATS.map((s) => (
            <div className="zph-stat" key={s.label}>
              <span className="zph-stat-l">{s.label}</span>
              <b>{s.value}</b>
              <span className={`zph-delta${s.up ? "" : " is-down"}`}>{s.d}</span>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- 3 · the exports ---------------- */

const EXPORT_SOURCES = ["User login", "Login failure", "Device posture", "Policy decision", "Session start", "Session end", "In-session action"];

/* `logo: null` means the repo has no mark for it — the row falls back
   to its extension chip alone rather than to an approximated logo. */
const EXPORT_TARGETS: { name: string; ext: string; logo: string | null; abbr: string }[] = [
  { name: "Splunk", ext: ".json", logo: null, abbr: "SPL" },
  { name: "Elastic Common Schema", ext: ".ecs", logo: null, abbr: "ECS" },
  { name: "CEF", ext: ".cef", logo: null, abbr: "CEF" },
  { name: "LEEF", ext: ".leef", logo: null, abbr: "LEEF" },
  { name: "ArcSight", ext: ".arc", logo: null, abbr: "ARC" },
  { name: "Syslog", ext: ".log", logo: null, abbr: "SYS" },
  { name: "NDJSON", ext: ".ndjson", logo: null, abbr: "NDJ" },
];

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
            <li key={e}>{e}</li>
          ))}
        </ul>
      </div>

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

      <div className="zph-targets">
        {EXPORT_TARGETS.map((t) => (
          <div className="zph-target" key={t.name}>
            <span className="zph-target-ic" aria-hidden="true">
              {t.logo ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={`/logos/integrations/${t.logo}.svg`} alt="" loading="lazy" />
              ) : (
                /* No approximated marks — see the logo note in the header.
                   `abbr` is written out per target rather than sliced from
                   the extension: slicing gave "JSO" for Splunk and "LEE"
                   for LEEF, which is worse than no mark at all. */
                <b>{t.abbr}</b>
              )}
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
