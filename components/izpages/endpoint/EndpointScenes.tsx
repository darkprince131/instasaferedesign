import type { JSX, ReactNode } from "react";

/* ============================================================
   EndpointScenes — the six console views for the ConsoleRow stack.

   One shell, six bodies. Every one shows the control in its ENFORCED
   state, because a picture of a control doing nothing is a picture of
   nothing — and because the row's copy is a claim, so the console
   beside it has to be the evidence.

   Server components: none of these hold state or listen to anything.
   They exist so the six rows are six different pictures instead of
   the same dashboard six times.
   ============================================================ */

type Tone = "on" | "deny";

function Shell({ title, state, tone, children }: { title: string; state: string; tone: Tone; children: ReactNode }) {
  return (
    <div className="epc">
      <div className="epc-bar">
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <i aria-hidden="true" />
        <b>{title}</b>
        <span className={`epc-state ${tone}`}>{state}</span>
      </div>
      <div className="epc-body">{children}</div>
    </div>
  );
}

type Verdict = "no" | "yes" | "";
function Row({ label, verdict, tone = "" }: { label: string; verdict: string; tone?: Verdict }) {
  return (
    <div className={`epc-row${tone ? ` ${tone}` : ""}`}>
      <span>{label}</span>
      <em>{verdict}</em>
    </div>
  );
}

/* ---------- 1 · clipboard ---------- */
export function EpClipboard(): JSX.Element {
  return (
    <Shell title="session · hr-portal" state="copy refused" tone="deny">
      <Row label="Copy → local clipboard" verdict="blocked" tone="no" />
      <Row label="Paste → local editor" verdict="blocked" tone="no" />
      <Row label="Screen capture in session" verdict="blocked" tone="no" />
      <Row label="Copy within the session" verdict="allowed" tone="yes" />
      <p className="epc-note">policy: hr-portal · group: hr-analysts</p>
    </Shell>
  );
}

/* ---------- 2 · watermark ---------- */
const MARKS = Array.from({ length: 20 }, (_, i) => ({
  left: (i % 4) * 118 - 24,
  top: Math.floor(i / 4) * 40 - 10,
}));
export function EpWatermark(): JSX.Element {
  return (
    <Shell title="session · finance-console" state="overlay on" tone="on">
      <div className="epc-screen">
        <span className="epc-line" style={{ ["--w" as string]: "78%" }} />
        <span className="epc-line" style={{ ["--w" as string]: "92%" }} />
        <span className="epc-line" style={{ ["--w" as string]: "64%" }} />
        <span className="epc-line" style={{ ["--w" as string]: "86%" }} />
        <span className="epc-line" style={{ ["--w" as string]: "71%" }} />
        <span className="epc-line" style={{ ["--w" as string]: "48%" }} />
        <span className="epc-marks" aria-hidden="true">
          {MARKS.map((m, i) => (
            <b key={i} style={{ left: m.left, top: m.top }}>
              sophia.s@ · 8F2A · 10:42
            </b>
          ))}
        </span>
      </div>
      <p className="epc-note">a photograph of this screen names the person who took it</p>
    </Shell>
  );
}

/* ---------- 3 · network filter ---------- */
export function EpNetwork(): JSX.Element {
  return (
    <Shell title="session · vendor-portal" state="24 rules" tone="on">
      <Row label="drive-personal.com" verdict="denied" tone="no" />
      <Row label="mail-personal.com" verdict="denied" tone="no" />
      <Row label="10.0.0.0/8" verdict="denied" tone="no" />
      <Row label="sap-support.com" verdict="allowed" tone="yes" />
      <p className="epc-note">applied per user group, for the life of the session</p>
    </Shell>
  );
}

/* ---------- 4 · app filter ---------- */
export function EpApps(): JSX.Element {
  return (
    <Shell title="device · while the session runs" state="2 blocked" tone="deny">
      <Row label="Screen recorder" verdict="blocked" tone="no" />
      <Row label="Personal cloud sync" verdict="blocked" tone="no" />
      <Row label="Approved PDF reader" verdict="allowed" tone="yes" />
      <p className="epc-note">released the moment the sensitive session ends</p>
    </Shell>
  );
}

/* ---------- 5 · chrome control ---------- */
export function EpChrome(): JSX.Element {
  return (
    <Shell title="governed browsing" state="restricted" tone="deny">
      <Row label="Downloads" verdict="off" tone="no" />
      <Row label="Developer tools" verdict="off" tone="no" />
      <Row label="Print page" verdict="off" tone="no" />
      <Row label="Read and work in the app" verdict="allowed" tone="yes" />
      <p className="epc-note">the work continues; the exit routes do not</p>
    </Shell>
  );
}

/* ---------- 6 · inactivity timeout ---------- */
export function EpIdle(): JSX.Element {
  return (
    <Shell title="session · sap-erp" state="auto-close" tone="deny">
      <div className="epc-idle">
        <span className="epc-idle-n">15:00</span>
        <span className="epc-idle-l">idle · then disconnect</span>
      </div>
      <Row label="Low transfer for 15 min" verdict="session closed" tone="no" />
    </Shell>
  );
}
