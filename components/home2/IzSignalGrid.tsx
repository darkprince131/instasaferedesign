"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IzJson } from "@/components/home2/IzPanel";
import {
  ShieldCheck,
  LockKey,
  Fingerprint,
  DeviceMobile,
  MapPin,
  Clock,
  AirplaneTilt,
  Warning,
  Monitor,
  Clipboard,
  DownloadSimple,
  Drop,
  VideoCamera,
  Timer,
  ArrowsLeftRight,
  Globe,
  ListChecks,
  Lightning,
  UserFocus,
  Prohibit,
  Pulse,
  Export,
  Browser,
  Broadcast,
  CaretLeft,
  CaretRight,
  ArrowUpRight,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   IzSignalGrid — "One control surface"  (lab id 00ac)

   The irregular capability grid + inline console, analysed from
   fingerprint.com's SmartSignalsFullScene (see
   docs/research/fingerprint-audit-and-ideation.md §A.2 / §C.1).

   THREE THINGS MAKE IT WORK — keep all three when editing:

   1. THE COPY BLOCK IS A GRID ITEM. It sits at
      `grid-area: 2 / 1 / 7 / 6` on desktop, so tiles spill around
      the text instead of sitting in a separate column.

   2. COORDINATES ARE DATA, NOT MEDIA QUERIES. Every tile carries
      its cell as inline CSS custom properties (--gc/--gr for
      desktop, --gc-md/--gr-md for tablet, --sm-span for phone).
      One DOM re-scatters at every breakpoint — no duplicate
      markup, no matchMedia, no layout shift.

   3. THE EMPTY CELLS ARE INVISIBLE. `placeholder` elements hold a
      cell and render nothing — verified against fingerprint.com,
      whose placeholders have no background, border or texture. The
      asymmetry comes from the GAPS. An earlier version drew them
      with a dashed border and grid texture; that put a grid inside
      a grid and made the block noisy. Don't reintroduce it.

   Polarity note: Fingerprint sells detection, so their two states
   are detected/not-detected. We sell control, so ours are
   enforced/unenforced — same payload shape, one field changed.
   That contrast is the whole persuasive payload.

   To add a control: append to CONTROLS with a free (col,row) at
   each breakpoint and remove the placeholder that occupied it.
   ============================================================ */

type Tone = "allow" | "deny" | "warn";

type ControlState = {
  /** toggle label, e.g. "Compliant" / "Non-compliant" */
  name: string;
  tone: Tone;
  /** API-shaped payload; rendered through the tiny highlighter below */
  json: string;
};

type Control = {
  id: string;
  label: string;
  Icon: Icon;
  /** type badge shown beside the name in the console header */
  type: string;
  blurb: string;
  fields: [string, string][];
  states: [ControlState, ControlState];
  /** desktop cell [col, row] — required */
  lg: [number, number];
  /** tablet cell [col, row] — null hides the tile at that breakpoint */
  md: [number, number] | null;
  /** phone: column span in the 4-col flow — null hides the tile */
  sm: number | null;
};

/* ---------- the 24 controls ---------- */

const CONTROLS: Control[] = [
  {
    id: "posture",
    label: "Device posture",
    Icon: ShieldCheck,
    type: "object",
    blurb: "Checks disk encryption, EDR, screen lock and OS patch level before any app is brokered.",
    fields: [["posture", "enum"], ["checks", "object"], ["remediation", "string"]],
    lg: [2, 1],
    md: [1, 2],
    sm: 2,
    states: [
      {
        name: "Compliant",
        tone: "allow",
        json: `{
  "decision": "allow",
  "posture": "compliant",
  "checks": {
    "disk_encryption": "on",
    "edr": "present",
    "screen_lock": "5m"
  }
}`,
      },
      {
        name: "Non-compliant",
        tone: "deny",
        json: `{
  "decision": "deny",
  "posture": "non_compliant",
  "checks": {
    "disk_encryption": "off"
  },
  "remediation": "Enable BitLocker"
}`,
      },
    ],
  },
  {
    id: "mfa",
    label: "Multi-factor auth",
    Icon: LockKey,
    type: "object",
    blurb: "Step-up challenge on risk, not on every login. Push, TOTP or hardware key.",
    fields: [["factor", "enum"], ["challenged", "boolean"], ["latency_ms", "number"]],
    lg: [4, 1],
    md: [2, 2],
    sm: 1,
    states: [
      {
        name: "Verified",
        tone: "allow",
        json: `{
  "decision": "allow",
  "factor": "push",
  "challenged": true,
  "latency_ms": 2140,
  "device": "PX-ANITA"
}`,
      },
      {
        name: "Failed",
        tone: "deny",
        json: `{
  "decision": "deny",
  "factor": "push",
  "challenged": true,
  "attempts": 11,
  "reason": "push_fatigue_suspected"
}`,
      },
    ],
  },
  {
    id: "sso",
    label: "Single sign-on",
    Icon: Fingerprint,
    type: "object",
    blurb: "One federated identity across every app. SAML, OIDC or your existing directory.",
    fields: [["idp", "string"], ["assertion", "enum"], ["groups", "array"]],
    lg: [6, 1],
    md: [4, 2],
    sm: 1,
    states: [
      {
        name: "Federated",
        tone: "allow",
        json: `{
  "decision": "allow",
  "idp": "Entra ID",
  "assertion": "valid",
  "groups": ["finance", "in-employees"],
  "sessions_replaced": 6
}`,
      },
      {
        name: "Local only",
        tone: "warn",
        json: `{
  "decision": "challenge",
  "idp": null,
  "assertion": "absent",
  "groups": [],
  "note": "Local credential — no directory claim"
}`,
      },
    ],
  },
  {
    id: "binding",
    label: "Device binding",
    Icon: DeviceMobile,
    type: "object",
    blurb: "A user's access is pinned to enrolled hardware. A stolen password alone gets nowhere.",
    fields: [["bound", "boolean"], ["device_id", "string"], ["enrolled", "date"]],
    lg: [7, 1],
    md: [5, 2],
    sm: 1,
    states: [
      {
        name: "Bound",
        tone: "allow",
        json: `{
  "decision": "allow",
  "bound": true,
  "device_id": "WS-FIN-014",
  "enrolled": "2026-06-12"
}`,
      },
      {
        name: "Unrecognised",
        tone: "deny",
        json: `{
  "decision": "deny",
  "bound": false,
  "device_id": null,
  "reason": "device_not_enrolled",
  "action": "enrolment_request_sent"
}`,
      },
    ],
  },
  {
    id: "geo",
    label: "Geo-fence",
    Icon: MapPin,
    type: "object",
    blurb: "Bound access to the countries you actually operate in. Everything else is denied by default.",
    fields: [["country", "string"], ["in_region", "boolean"], ["policy", "string"]],
    lg: [9, 1],
    md: [6, 2],
    sm: 1,
    states: [
      {
        name: "In region",
        tone: "allow",
        json: `{
  "decision": "allow",
  "country": "IN",
  "in_region": true,
  "policy": "IN-Finance-BYOD"
}`,
      },
      {
        name: "Out of region",
        tone: "deny",
        json: `{
  "decision": "deny",
  "country": "RU",
  "in_region": false,
  "policy": "IN-Finance-BYOD",
  "reason": "outside_permitted_geography"
}`,
      },
    ],
  },
  {
    id: "tod",
    label: "Time-of-day",
    Icon: Clock,
    type: "object",
    blurb: "Contractor access that exists only during working hours, and closes itself after.",
    fields: [["window", "string"], ["in_window", "boolean"], ["tz", "string"]],
    lg: [7, 2],
    md: [1, 3],
    sm: null,
    states: [
      {
        name: "In window",
        tone: "allow",
        json: `{
  "decision": "allow",
  "window": "09:00-19:00",
  "in_window": true,
  "tz": "Asia/Kolkata"
}`,
      },
      {
        name: "Out of window",
        tone: "deny",
        json: `{
  "decision": "deny",
  "window": "09:00-19:00",
  "in_window": false,
  "request_time": "02:41",
  "tz": "Asia/Kolkata"
}`,
      },
    ],
  },
  {
    id: "travel",
    label: "Impossible travel",
    Icon: AirplaneTilt,
    type: "object",
    blurb: "Two logins that no aircraft could connect. The second one does not get in.",
    fields: [["from", "string"], ["to", "string"], ["implied_kmh", "number"]],
    lg: [9, 2],
    md: [3, 3],
    sm: 1,
    states: [
      {
        name: "Plausible",
        tone: "allow",
        json: `{
  "decision": "allow",
  "from": "Pune, IN",
  "to": "Mumbai, IN",
  "elapsed_min": 214,
  "implied_kmh": 41
}`,
      },
      {
        name: "Impossible",
        tone: "deny",
        json: `{
  "decision": "deny",
  "from": "Pune, IN",
  "to": "Toronto, CA",
  "elapsed_min": 18,
  "implied_kmh": 41200,
  "action": "session_terminated"
}`,
      },
    ],
  },
  {
    id: "root",
    label: "Jailbreak & root",
    Icon: Warning,
    type: "enum",
    blurb: "Rooted phones and jailbroken tablets never reach a business app.",
    fields: [["integrity", "enum"], ["indicators", "array"]],
    lg: [10, 2],
    md: [4, 3],
    sm: 1,
    states: [
      {
        name: "Clean",
        tone: "allow",
        json: `{
  "decision": "allow",
  "integrity": "intact",
  "indicators": []
}`,
      },
      {
        name: "Tampered",
        tone: "deny",
        json: `{
  "decision": "deny",
  "integrity": "compromised",
  "indicators": ["su_binary", "magisk", "debug_bridge"]
}`,
      },
    ],
  },
  {
    id: "screen",
    label: "Screen recording",
    Icon: Monitor,
    type: "boolean",
    blurb: "Capture is blocked at the surface. What is on screen stays on screen.",
    fields: [["capture_blocked", "boolean"], ["attempts", "number"]],
    lg: [6, 3],
    md: [5, 3],
    sm: null,
    states: [
      {
        name: "Contained",
        tone: "allow",
        json: `{
  "capture_blocked": true,
  "attempts": 0,
  "surface": "billing-portal"
}`,
      },
      {
        name: "Attempt blocked",
        tone: "deny",
        json: `{
  "capture_blocked": true,
  "attempts": 3,
  "surface": "billing-portal",
  "logged_to": "audit/2026-07-25"
}`,
      },
    ],
  },
  {
    id: "clipboard",
    label: "Clipboard control",
    Icon: Clipboard,
    type: "enum",
    blurb: "Copy inside the app, paste inside the app. Nothing crosses the boundary.",
    fields: [["clipboard", "enum"], ["direction", "string"]],
    lg: [7, 3],
    md: [1, 4],
    sm: 1,
    states: [
      {
        name: "Contained",
        tone: "allow",
        json: `{
  "clipboard": "in_app_only",
  "direction": "internal",
  "bytes": 184
}`,
      },
      {
        name: "Exfil blocked",
        tone: "deny",
        json: `{
  "clipboard": "in_app_only",
  "direction": "app_to_host",
  "bytes": 0,
  "reason": "boundary_violation"
}`,
      },
    ],
  },
  {
    id: "download",
    label: "Download control",
    Icon: DownloadSimple,
    type: "enum",
    blurb: "Files can be read without ever landing on an unmanaged disk.",
    fields: [["download", "enum"], ["file", "string"]],
    lg: [8, 3],
    md: [2, 4],
    sm: 1,
    states: [
      {
        name: "Permitted",
        tone: "allow",
        json: `{
  "download": "permitted",
  "file": "q1-forecast.xlsx",
  "destination": "managed_device"
}`,
      },
      {
        name: "Blocked",
        tone: "deny",
        json: `{
  "download": "blocked",
  "file": "q1-forecast.xlsx",
  "destination": "byod_unmanaged",
  "view_only_url": "issued"
}`,
      },
    ],
  },
  {
    id: "watermark",
    label: "Watermarking",
    Icon: Drop,
    type: "object",
    blurb: "Every session carries the viewer's identity, so a photographed screen still names its source.",
    fields: [["watermark", "boolean"], ["fields", "array"]],
    lg: [8, 4],
    md: null,
    sm: null,
    states: [
      {
        name: "Applied",
        tone: "allow",
        json: `{
  "watermark": true,
  "fields": ["user", "device_id", "timestamp"],
  "opacity": 0.12
}`,
      },
      {
        name: "Absent",
        tone: "warn",
        json: `{
  "watermark": false,
  "fields": [],
  "note": "No attribution on captured frames"
}`,
      },
    ],
  },
  {
    id: "recording",
    label: "Session recording",
    Icon: VideoCamera,
    type: "object",
    blurb: "Privileged sessions are recorded end to end and replayable in the audit trail.",
    fields: [["recording", "boolean"], ["retention_days", "number"]],
    lg: [9, 4],
    md: [3, 4],
    sm: null,
    states: [
      {
        name: "Recording",
        tone: "allow",
        json: `{
  "recording": true,
  "session_id": "s_8f21c4",
  "retention_days": 180,
  "replay": "available"
}`,
      },
      {
        name: "Off",
        tone: "warn",
        json: `{
  "recording": false,
  "session_id": "s_8f21c4",
  "retention_days": 0,
  "replay": "unavailable"
}`,
      },
    ],
  },
  {
    id: "idle",
    label: "Idle timeout",
    Icon: Timer,
    type: "number",
    blurb: "An unattended session closes itself. No forgotten tabs left open overnight.",
    fields: [["idle_min", "number"], ["state", "enum"]],
    lg: [6, 5],
    md: null,
    sm: null,
    states: [
      {
        name: "Active",
        tone: "allow",
        json: `{
  "idle_min": 3,
  "limit_min": 15,
  "state": "active"
}`,
      },
      {
        name: "Timed out",
        tone: "deny",
        json: `{
  "idle_min": 15,
  "limit_min": 15,
  "state": "closed",
  "reason": "idle_limit_reached"
}`,
      },
    ],
  },
  {
    id: "tunnel",
    label: "Split tunnel",
    Icon: ArrowsLeftRight,
    type: "enum",
    blurb: "Only business traffic is brokered. Personal traffic never touches your network.",
    fields: [["mode", "enum"], ["scoped_apps", "number"]],
    lg: [7, 5],
    md: [5, 4],
    sm: null,
    states: [
      {
        name: "Scoped",
        tone: "allow",
        json: `{
  "mode": "app_scoped",
  "scoped_apps": 4,
  "network_exposed": false
}`,
      },
      {
        name: "Full tunnel",
        tone: "warn",
        json: `{
  "mode": "full_tunnel",
  "scoped_apps": 0,
  "network_exposed": true,
  "note": "Legacy VPN behaviour"
}`,
      },
    ],
  },
  {
    id: "dns",
    label: "DNS filtering",
    Icon: Globe,
    type: "enum",
    blurb: "Known-bad domains never resolve, so the connection is never attempted.",
    fields: [["resolution", "enum"], ["category", "string"]],
    lg: [9, 5],
    md: null,
    sm: null,
    states: [
      {
        name: "Resolved",
        tone: "allow",
        json: `{
  "resolution": "allowed",
  "category": "business",
  "rtt_ms": 12
}`,
      },
      {
        name: "Sinkholed",
        tone: "deny",
        json: `{
  "resolution": "sinkholed",
  "category": "command_and_control",
  "rtt_ms": 0
}`,
      },
    ],
  },
  {
    id: "allowlist",
    label: "App allow-list",
    Icon: ListChecks,
    type: "array",
    blurb: "An app a user is not listed for is not reachable — and is not even discoverable.",
    fields: [["listed", "boolean"], ["apps", "array"]],
    lg: [10, 5],
    md: [6, 4],
    sm: 2,
    states: [
      {
        name: "Listed",
        tone: "allow",
        json: `{
  "decision": "allow",
  "listed": true,
  "app": "billing-portal",
  "apps": ["billing-portal", "reports-db"]
}`,
      },
      {
        name: "Not listed",
        tone: "deny",
        json: `{
  "decision": "deny",
  "listed": false,
  "app": "finance-rdp",
  "apps": ["billing-portal", "reports-db"],
  "visibility": "hidden"
}`,
      },
    ],
  },
  {
    id: "jit",
    label: "Just-in-time access",
    Icon: Lightning,
    type: "object",
    blurb: "Elevated rights that exist for a fixed window and then remove themselves.",
    fields: [["granted", "boolean"], ["expires_in_min", "number"]],
    lg: [8, 6],
    md: [2, 5],
    sm: null,
    states: [
      {
        name: "Granted",
        tone: "allow",
        json: `{
  "granted": true,
  "scope": "reports-db:read",
  "expires_in_min": 42,
  "approver": "priya.m"
}`,
      },
      {
        name: "Expired",
        tone: "deny",
        json: `{
  "granted": false,
  "scope": "reports-db:read",
  "expires_in_min": 0,
  "state": "auto_revoked"
}`,
      },
    ],
  },
  {
    id: "approval",
    label: "Approval workflow",
    Icon: UserFocus,
    type: "enum",
    blurb: "Sensitive access waits for a named human, and the wait is on the record.",
    fields: [["state", "enum"], ["approver", "string"]],
    lg: [10, 6],
    md: null,
    sm: null,
    states: [
      {
        name: "Approved",
        tone: "allow",
        json: `{
  "state": "approved",
  "approver": "priya.m",
  "waited_min": 6
}`,
      },
      {
        name: "Pending",
        tone: "warn",
        json: `{
  "state": "pending",
  "approver": null,
  "waited_min": 21,
  "escalates_at_min": 30
}`,
      },
    ],
  },
  {
    id: "terminate",
    label: "Session termination",
    Icon: Prohibit,
    type: "enum",
    blurb: "One click ends every live session for a user, everywhere, immediately.",
    fields: [["state", "enum"], ["sessions", "number"]],
    lg: [1, 7],
    md: [3, 5],
    sm: null,
    states: [
      {
        name: "Live",
        tone: "allow",
        json: `{
  "state": "live",
  "sessions": 3,
  "apps": ["billing-portal", "code-server", "reports-db"]
}`,
      },
      {
        name: "Terminated",
        tone: "deny",
        json: `{
  "state": "terminated",
  "sessions": 0,
  "elapsed_ms": 380,
  "trigger": "admin_revoke"
}`,
      },
    ],
  },
  {
    id: "anomaly",
    label: "Anomaly score",
    Icon: Pulse,
    type: "number",
    blurb: "A single number across posture, geography, velocity and behaviour.",
    fields: [["score", "number"], ["contributors", "array"]],
    lg: [3, 7],
    md: [4, 5],
    sm: 1,
    states: [
      {
        name: "Normal",
        tone: "allow",
        json: `{
  "score": 8,
  "band": "normal",
  "contributors": []
}`,
      },
      {
        name: "Elevated",
        tone: "deny",
        json: `{
  "score": 87,
  "band": "elevated",
  "contributors": ["new_device", "impossible_travel", "mfa_retries"],
  "action": "step_up_then_deny"
}`,
      },
    ],
  },
  {
    id: "audit",
    label: "Audit export",
    Icon: Export,
    type: "object",
    blurb: "Every decision streams to your SIEM in the format it already ingests.",
    fields: [["stream", "enum"], ["sink", "string"]],
    lg: [4, 7],
    md: null,
    sm: null,
    states: [
      {
        name: "Streaming",
        tone: "allow",
        json: `{
  "stream": "active",
  "sink": "splunk-hec",
  "events_per_min": 1840,
  "lag_s": 2
}`,
      },
      {
        name: "Paused",
        tone: "warn",
        json: `{
  "stream": "paused",
  "sink": "splunk-hec",
  "buffered_events": 42610,
  "note": "Buffered, nothing dropped"
}`,
      },
    ],
  },
  {
    id: "agentless",
    label: "Agentless access",
    Icon: Browser,
    type: "enum",
    blurb: "Contractors and auditors get in through a browser. Nothing to install, nothing left behind.",
    fields: [["mode", "enum"], ["install_required", "boolean"]],
    lg: [6, 7],
    md: null,
    sm: null,
    states: [
      {
        name: "Browser-only",
        tone: "allow",
        json: `{
  "mode": "agentless",
  "install_required": false,
  "surface": "https_broker",
  "residue": "none"
}`,
      },
      {
        name: "Agent required",
        tone: "warn",
        json: `{
  "mode": "agent",
  "install_required": true,
  "surface": "native_client",
  "onboarding_min": 25
}`,
      },
    ],
  },
  {
    id: "alwayson",
    label: "Always-on",
    Icon: Broadcast,
    type: "enum",
    blurb: "The tunnel re-establishes itself. Users never see a disconnected state to work around.",
    fields: [["state", "enum"], ["reconnect_ms", "number"]],
    lg: [9, 7],
    md: [5, 5],
    sm: 2,
    states: [
      {
        name: "Connected",
        tone: "allow",
        json: `{
  "state": "connected",
  "uptime_pct": 99.98,
  "reconnect_ms": 0
}`,
      },
      {
        name: "Reconnecting",
        tone: "warn",
        json: `{
  "state": "reconnecting",
  "uptime_pct": 99.98,
  "reconnect_ms": 640,
  "user_action_required": false
}`,
      },
    ],
  },
];

/* ---------- the drawn-empty cells ----------
   These are NOT gaps. They are what break the symmetry. Each one
   occupies a real cell so the populated tiles read as a surface
   with headroom. `smShow` keeps two of them on phones for texture;
   the rest collapse away where space is expensive. */
const PLACEHOLDERS: { lg: [number, number]; md: [number, number] | null; smShow?: boolean }[] = [
  { lg: [1, 1], md: [3, 2] },
  { lg: [3, 1], md: [2, 3], smShow: true },
  { lg: [5, 1], md: [6, 3] },
  { lg: [8, 1], md: [4, 4] },
  { lg: [10, 1], md: [1, 5] },
  { lg: [6, 2], md: [6, 5] },
  { lg: [8, 2], md: null },
  { lg: [9, 3], md: null },
  { lg: [10, 3], md: null },
  { lg: [6, 4], md: null },
  { lg: [7, 4], md: null },
  { lg: [10, 4], md: null },
  { lg: [8, 5], md: null, smShow: true },
  { lg: [6, 6], md: null },
  { lg: [7, 6], md: null },
  { lg: [9, 6], md: null },
  { lg: [2, 7], md: null },
  { lg: [5, 7], md: null },
  { lg: [7, 7], md: null },
  { lg: [8, 7], md: null },
  { lg: [10, 7], md: null },
];

/* The JSON highlighter used to be duplicated here. It now lives in
   IzPanel (00ae) and is imported, so this console and the scene console
   can never drift apart in colour or tokenising. */

/* ---------- the console half ---------- */

function SignalConsole({
  control,
  stateIdx,
  onState,
  onPrev,
  onNext,
  ctaHref,
  ctaLabel,
}: {
  control: Control;
  stateIdx: number;
  onState: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  ctaHref: string;
  ctaLabel: string;
}) {
  const st = control.states[stateIdx];
  const { Icon: TileIcon } = control;

  return (
    <div className="izsg-con">
      <div className="izsg-con-h">
        <span className="izsg-con-name">
          <TileIcon weight="regular" aria-hidden="true" />
          <span className="nm">{control.label}</span>
          <span className="ty" aria-label={`Type: ${control.type}`}>
            {control.type}
          </span>
        </span>

        <span className="izsg-con-act">
          <a className="izsg-cta" href={ctaHref}>
            {ctaLabel}
            <ArrowUpRight weight="bold" aria-hidden="true" />
          </a>
          <span className="izsg-pager" role="group" aria-label="Browse controls">
            <button type="button" onClick={onPrev} aria-label="Previous control">
              <CaretLeft weight="bold" aria-hidden="true" />
            </button>
            <button type="button" onClick={onNext} aria-label="Next control">
              <CaretRight weight="bold" aria-hidden="true" />
            </button>
          </span>
        </span>
      </div>

      <div className="izsg-con-b">
        {/* the two-state toggle — one capability, two truths, side by side */}
        <div className="izsg-vt" role="tablist" aria-label={`${control.label} outcome`}>
          <span className="izsg-vt-ind" style={{ ["--active-index" as string]: stateIdx } as React.CSSProperties} />
          {control.states.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={i === stateIdx}
              data-tone={s.tone}
              className={`izsg-vt-b ${i === stateIdx ? "on" : ""}`}
              onClick={() => onState(i)}
            >
              {s.name}
            </button>
          ))}
        </div>

        <p className="izsg-con-blurb">{control.blurb}</p>

        <div className="izsg-fields">
          {control.fields.map(([f, t]) => (
            <span key={f} className="izsg-field">
              <b>{f}</b>
              <i>{t}</i>
            </span>
          ))}
        </div>

        {/* aria-live so keyboard/SR users hear the payload change */}
        <div className="izsg-fade" key={`${control.id}-${stateIdx}`} aria-live="polite">
          <IzJson src={st.json} className="izsg-json" />
        </div>
      </div>
    </div>
  );
}

/* ---------- the component ---------- */

export function IzSignalGrid({
  kicker = "Control surface",
  title = (
    <>
      Every control, <mark>one</mark> surface.
    </>
  ),
  sub = "Twenty-four enforcement controls, one policy engine, one decision per request. Pick any control to see what InstaSafe returns.",
  ctaHref = "/book-a-demo",
  ctaLabel = "Book a demo",
  learnHref = "/platform",
  autoplay = true,
}: {
  kicker?: string;
  title?: React.ReactNode;
  sub?: string;
  ctaHref?: string;
  ctaLabel?: string;
  learnHref?: string;
  autoplay?: boolean;
}) {
  const [active, setActive] = useState(0);
  const [stateIdx, setStateIdx] = useState(0);
  const [touched, setTouched] = useState(false);
  const [seen, setSeen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const select = useCallback((i: number) => {
    setActive(((i % CONTROLS.length) + CONTROLS.length) % CONTROLS.length);
    setStateIdx(0);
  }, []);

  const pick = useCallback(
    (i: number) => {
      setTouched(true);
      select(i);
    },
    [select]
  );

  /* Entrance — tiles scale in once, staggered, when scrolled to.
     The tiles start at opacity 0, so a missed observer would mean an
     empty grid rather than a missing flourish. Hence the failsafe
     timer: if the observer hasn't fired by then, reveal anyway. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    const failsafe = setTimeout(() => setSeen(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  /* autoplay walks the grid until the visitor takes over, then stops
     for good — cycling under someone's cursor is the fastest way to
     make an explorable component feel hostile. */
  useEffect(() => {
    if (!autoplay || touched || !seen) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CONTROLS.length), 4200);
    return () => clearInterval(id);
  }, [autoplay, touched, seen]);

  const control = CONTROLS[active];

  return (
    <div className="izsg" ref={rootRef}>
      <div className={`izsg-grid ${seen ? "in" : ""}`} role="group" aria-label="InstaSafe control surface">
        {/* the copy block is a GRID ITEM, not a sibling column */}
        <div className="izsg-copy">
          <span className="izsg-kicker">
            {kicker}
            <i aria-hidden="true">_</i>
          </span>
          <h2 className="izsg-title">{title}</h2>
          <p className="izsg-sub">{sub}</p>
          <a className="izsg-learn" href={learnHref}>
            See the platform
            <ArrowUpRight weight="bold" aria-hidden="true" />
          </a>

          <SignalConsole
            control={control}
            stateIdx={stateIdx}
            onState={(i) => {
              setTouched(true);
              setStateIdx(i);
            }}
            onPrev={() => pick(active - 1)}
            onNext={() => pick(active + 1)}
            ctaHref={ctaHref}
            ctaLabel={ctaLabel}
          />
        </div>

        {CONTROLS.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={i === active}
            className={`izsg-tile ${i === active ? "on" : ""} ${c.md ? "" : "izsg-x-md"} ${c.sm ? "" : "izsg-x-sm"}`}
            style={
              {
                "--gc": c.lg[0],
                "--gr": c.lg[1],
                "--gc-md": c.md?.[0] ?? 1,
                "--gr-md": c.md?.[1] ?? 1,
                "--sm-span": c.sm ?? 1,
                "--i": i,
              } as React.CSSProperties
            }
            onClick={() => pick(i)}
          >
            <c.Icon weight="regular" aria-hidden="true" />
            <span>{c.label}</span>
          </button>
        ))}

        {PLACEHOLDERS.map((p, i) => (
          <span
            key={`ph-${i}`}
            aria-hidden="true"
            className={`izsg-ph ${p.md ? "" : "izsg-x-md"} ${p.smShow ? "" : "izsg-x-sm"}`}
            style={
              {
                "--gc": p.lg[0],
                "--gr": p.lg[1],
                "--gc-md": p.md?.[0] ?? 1,
                "--gr-md": p.md?.[1] ?? 1,
                "--i": CONTROLS.length + i,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
