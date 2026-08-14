"use client";

import { useMemo, useState } from "react";
import { Check, Copy, CheckCircle, FunnelSimple } from "@phosphor-icons/react";

/* ============================================================
   IzQuickScan — the platform spec sheet as a WORKING CHECKLIST.

   The source content (content-review vol1 · platform) is a flat
   "Quick scan — platform specs" table. A table is the wrong shape
   for how it actually gets used: the reader is an evaluator
   checking our sheet against their own requirements list, and the
   thing they want at the end is a shortlist they can paste into a
   ticket or an email.

   So it is tickable, filterable by group, and it copies the
   selection out as plain text. Three rules held it together:

   1. THE TICKS ARE THE POINT. Nothing here is decorative state —
      what you tick is exactly what lands on the clipboard.
   2. FILTERING NEVER DESTROYS A SELECTION. Chips hide rows; they
      do not untick them, and the counter keeps counting the
      hidden ones. Losing a selection because you filtered is the
      fastest way to make a tool like this untrustworthy.
   3. EMPTY IS A STATE, NOT A BUG. With nothing ticked the button
      says so and is disabled, rather than copying an empty string
      and claiming success.

   All content is DATA below — a new spec is one array entry.
   ============================================================ */

export type Spec = { group: string; label: string; value: string };

const SPECS: Spec[] = [
  { group: "Access", label: "App types", value: "7 — FQDN, WEB, RDP, SSH, VNC, DB, WFS" },
  {
    group: "Access",
    label: "DB drivers",
    value: "PostgreSQL, MSSQL, SQL Server (GA); Oracle, Elasticsearch (beta); ClickHouse, MongoDB (alpha)",
  },
  { group: "Access", label: "Client OS", value: "Windows, macOS, Linux; mobile apps; clientless browser mode" },
  { group: "Identity", label: "Auth profiles", value: "8 · MFA methods: 6 · user providers: 3" },
  { group: "Identity", label: "Auth protocols", value: "SAML 2.0, OAuth, OpenID Connect, RADIUS, TACACS+, JWT, CAS" },
  { group: "Identity", label: "Directory sync", value: "AD, LDAP, Azure AD, Google Workspace, O365" },
  { group: "Policy", label: "Device checks", value: "25 types · 144 named rules · 1,500+ OS/device combos" },
  { group: "Policy", label: "Access policies", value: "21 combinations" },
  { group: "Policy", label: "Risk engine", value: "12 trigger types · 4 auto-actions" },
  { group: "Audit", label: "Logging", value: "202 event types · 11 report types · 7 SIEM export formats" },
  { group: "Audit", label: "Standards", value: "NIST SP 800-207, CSA SDP, PCI DSS, HIPAA, GDPR, SOX, ISO 27001" },
  { group: "Deployment", label: "Deployment", value: "Cloud controller; gateways as software" },
];

/* ============================================================
   CONTENT IS INJECTABLE (2026-08-14).

   The sheet was the platform-wide one, hardcoded. Three feature
   pages — MFA, device posture, device binding — each need the same
   working checklist over their OWN numbers, and shipping the platform
   sheet on all four would mean a reader ticking rows about database
   drivers on a page about fingerprints.

   `specs`, `title`, `lead` and `subject` are props now. Omitted, the
   platform page renders exactly as before.

   Groups are derived from whatever set is passed, so a page with
   three groups gets three chips without touching this file.
   ============================================================ */
export function IzQuickScan({
  specs = SPECS,
  title,
  lead,
  subject = "InstaSafe platform",
}: {
  specs?: Spec[];
  title?: React.ReactNode;
  lead?: string;
  /** heads the copied shortlist, so a pasted block says what it is about */
  subject?: string;
}) {
  const groups = useMemo(() => [...new Set(specs.map((s) => s.group))], [specs]);
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const shown = useMemo(() => (filter ? specs.filter((s) => s.group === filter) : specs), [filter, specs]);

  function toggle(label: string) {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
    setCopied(false);
  }

  async function copyShortlist() {
    /* Copy in SOURCE order, not tick order — a shortlist that comes
       out shuffled by whatever you happened to click first is harder
       to read than the sheet it came from. */
    const lines = specs.filter((s) => ticked.has(s.label)).map((s) => `${s.label}: ${s.value}`);
    if (!lines.length) return;
    try {
      await navigator.clipboard.writeText(`${subject} — shortlist\n\n${lines.join("\n")}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard can be blocked by permissions policy; say nothing
         rather than claim a copy that did not happen */
    }
  }

  const n = ticked.size;

  return (
    /* IT CARRIES ITS OWN SECTION NOW. This used to render a bare
       `<div class="izqs">` with no `<section>` and no `.iz-wrap`, and all
       three callers (MfaPage, PosturePage, BindingPage) drop it in as
       `<div id="quickscan"><IzQuickScan /></div>` — so on every one of
       them the sheet ran flush to the viewport edge with no gutter and
       no vertical rhythm against the sections above and below it.

       Fixing the three callers would have left the fourth to get it
       wrong; the chrome belongs to the component. */
    <section className="izqs-sec">
      <div className="iz-wrap">
        <div className="izqs">
      <div className="izqs-head">
        <span className="iz-ey">Quick scan</span>
        <h2 className="iz-h2">
          {title ?? (
            <>
              The spec sheet, <em>as a checklist</em>.
            </>
          )}
        </h2>
        <p className="izqs-lead">
          {lead ??
            "Tick what your evaluation actually needs, then copy the shortlist straight into your ticket. Filtering never clears a tick."}
        </p>
      </div>

      <div className="izqs-bar">
        <span className="izqs-chips" role="group" aria-label="Filter by group">
          <span className="izqs-chip-i" aria-hidden="true">
            <FunnelSimple weight="bold" />
          </span>
          <button type="button" className={filter === null ? "izqs-chip on" : "izqs-chip"} onClick={() => setFilter(null)}>
            All
            <i>{specs.length}</i>
          </button>
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={filter === g}
              className={filter === g ? "izqs-chip on" : "izqs-chip"}
              onClick={() => setFilter(filter === g ? null : g)}
            >
              {g}
              <i>{specs.filter((s) => s.group === g).length}</i>
            </button>
          ))}
        </span>

        <button type="button" className="izqs-copy" onClick={copyShortlist} disabled={n === 0}>
          {copied ? <CheckCircle weight="fill" aria-hidden="true" /> : <Copy weight="regular" aria-hidden="true" />}
          {copied ? "Copied" : n === 0 ? "Nothing ticked yet" : `Copy ${n} ${n === 1 ? "line" : "lines"}`}
        </button>
      </div>

      <ul className="izqs-list">
        {shown.map((s) => {
          const on = ticked.has(s.label);
          return (
            <li key={s.label}>
              {/* the whole row is the control — a 12px checkbox is a
                  needlessly small target for something meant to be
                  swept down quickly */}
              <button type="button" className={on ? "izqs-row on" : "izqs-row"} aria-pressed={on} onClick={() => toggle(s.label)}>
                <span className="izqs-tick" aria-hidden="true">
                  <Check weight="bold" />
                </span>
                <span className="izqs-label">{s.label}</span>
                <span className="izqs-value">{s.value}</span>
                <span className="izqs-group">{s.group}</span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* `specs`, not `SPECS`. The foot was still counting the module's
          default platform sheet after the content became injectable, so
          a page passing its own rows reported someone else's total. It
          only looked right on the MFA page because both arrays happen to
          be twelve long. */}
      <p className="izqs-foot" aria-live="polite">
        {n === 0 ? `${specs.length} specs · none selected` : `${n} of ${specs.length} selected`}
        {filter && ` · showing ${filter}`}
      </p>
        </div>
      </div>
    </section>
  );
}
