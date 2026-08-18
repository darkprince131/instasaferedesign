"use client";

import { useRef, useState } from "react";
import {
  Fingerprint,
  Robot,
  MapPin,
  Books,
  Presentation,
  NotePencil,
  ArrowUpRight,
  Star,
  type Icon,
} from "@phosphor-icons/react";
import { IzJson } from "@/components/home2/IzPanel";

/* ============================================================
   IzTabSwitch — TIER 2 SECTION  (lab 00ao)

   The layout fingerprint.com repeats across nearly every use-case
   page: copy and CTAs on the left, THREE tabs beneath them, and a
   panel on the right that swaps with the tab. It appears in two
   skins, and both are this one component:

     variant="console"  permanently dark, wrapped in a window frame.
                        The tabs pick a signal; the panel shows the
                        payload for it, with its own sub-tabs for the
                        two outcomes. Dark is not a theme choice here
                        — a terminal is dark wherever it runs, so
                        this one pins `.iz-inverted` and stays dark
                        on a paper page.

     variant="resource" theme-aware. The tabs pick a content type;
                        the left copy AND the right visual both swap,
                        and a byline sits under the visual.

   Which parts swap is the only real difference, and it falls out of
   the data: a tab carries `copy` when the left column should change
   with it, and omits it when the left column is fixed.

   Tab state is one index. Panels are kept mounted and toggled with
   `hidden`, so switching costs no remount and the JSON is not
   re-tokenised on every click.
   ============================================================ */

export type IzTabSwitchTab = {
  id: string;
  label: string;
  Icon: Icon;
  /** console: the payload, with its two outcomes */
  json?: { outcomes: [string, string]; payloads: [string, string] };
  /** resource: the copy block that swaps with the tab */
  copy?: { kicker: string; title: string; body: string; href: string };
  /** resource: the visual's tone + who wrote it */
  story?: {
    tone: "a" | "b" | "c";
    author: { name: string; role: string };
    /** a real illustration for the right pane. Without it the slot
        falls back to the abstract placeholder below, which is what
        the lab and the original resource content still use. */
    art?: React.ReactNode;
  };
};

/* ---------- console variant content ---------- */

const CONSOLE_TABS: IzTabSwitchTab[] = [
  {
    id: "posture",
    label: "Device posture",
    Icon: Fingerprint,
    json: {
      outcomes: ["Non-compliant", "Compliant"],
      payloads: [
        `{
  "posture": {
    "result": "non_compliant",
    "failed": "disk_encryption"
  },
  "device": "WS-FIN-014",
  "decision": "deny",
  "remediation": "Enable BitLocker",
  "time": "2026-07-26T09:14:02.588Z",
  "requestId": "1712914199539.K1EXmu"
}`,
        `{
  "posture": {
    "result": "compliant",
    "failed": null
  },
  "device": "WS-FIN-014",
  "decision": "allow",
  "elapsed_ms": 240,
  "time": "2026-07-26T09:14:02.588Z",
  "requestId": "1712914199539.K1EXmu"
}`,
      ],
    },
  },
  {
    id: "automation",
    label: "Automation",
    Icon: Robot,
    json: {
      outcomes: ["Unlisted agent", "Allow-listed"],
      payloads: [
        `{
  "agent": {
    "result": "unlisted",
    "type": "headless"
  },
  "identity": "svc-unknown",
  "decision": "deny",
  "ip": "193.165.141.254",
  "requestId": "1712914199539.K1EXmu"
}`,
        `{
  "agent": {
    "result": "allow_listed",
    "type": "ci_runner"
  },
  "identity": "svc-runner",
  "decision": "allow",
  "scope": "repos:read",
  "requestId": "1712914199539.K1EXmu"
}`,
      ],
    },
  },
  {
    id: "geo",
    label: "Geo & travel",
    Icon: MapPin,
    json: {
      outcomes: ["Impossible travel", "In region"],
      payloads: [
        `{
  "geo": {
    "result": "impossible_travel",
    "implied_kmh": 41200
  },
  "from": "Pune, IN",
  "to": "Toronto, CA",
  "decision": "terminate",
  "requestId": "1712914199539.K1EXmu"
}`,
        `{
  "geo": {
    "result": "in_region",
    "country": "IN"
  },
  "policy": "IN-Finance-Managed",
  "decision": "allow",
  "requestId": "1712914199539.K1EXmu"
}`,
      ],
    },
  },
];

/* ---------- resource variant content ---------- */

const RESOURCE_TABS: IzTabSwitchTab[] = [
  {
    id: "case",
    label: "Case study",
    Icon: Presentation,
    copy: {
      kicker: "Case study:",
      title: "Retiring a VPN across 40 sites without a maintenance window",
      body: "A manufacturer moved 2,400 people off an always-on tunnel one application at a time. Nobody filed a ticket, and the quarterly access review went from a fortnight to an afternoon.",
      href: "/resource-center",
    },
    story: { tone: "a", author: { name: "Sophia Menon", role: "Head of Infrastructure" } },
  },
  {
    id: "tutorial",
    label: "Tutorial",
    Icon: NotePencil,
    copy: {
      kicker: "Tutorial:",
      title: "Publish your first application in ten minutes",
      body: "Install a connector, point it at an app, and write one policy. No inbound port, no DMZ, no change to how the application authenticates its own users.",
      href: "/platform",
    },
    story: { tone: "b", author: { name: "Arjun Rao", role: "Solutions Engineer" } },
  },
  {
    id: "guide",
    label: "Guide",
    Icon: Books,
    copy: {
      kicker: "Guide:",
      title: "Contractor and third-party access, without standing privilege",
      body: "Vendors need one application for one window, and an auditor needs to see exactly that six months later. This guide covers scoping, approval and expiry.",
      href: "/resource-center",
    },
    story: { tone: "c", author: { name: "Evelyn Chea", role: "Head of Content" } },
  },
];

/* ---------- the swapping visual ----------
   Placeholder artwork, deliberately abstract and token-driven: a
   gradient card holding a screen outline and a few marks. Real
   illustrations drop straight into this slot when they arrive —
   see public/illustrations/README.md. */
function Story({ tone }: { tone: "a" | "b" | "c" }) {
  return (
    <div className={`izts-art tone-${tone}`} aria-hidden="true">
      <span className="izts-art-screen">
        <i className="izts-art-line" />
        <i className="izts-art-line" />
        <i className="izts-art-line" />
      </span>
      <span className="izts-art-mark" />
      <span className="izts-art-mark" />
    </div>
  );
}

/* ============================================================
   CONTENT IS INJECTABLE (2026-08-13).

   Both tab sets and both headers used to be hardcoded, so the layout
   could only ever say the two things it was born saying. The
   frameworks reason on /why-instasafe-zero-trust needs the same
   mechanism carrying three Indian regulators, so `tabs` and `head`
   are props now. Omit them and every existing caller — the lab, and
   anything using the console/resource skins — renders exactly as
   before.

   Passing `head` also drops the default console header, which is the
   point as much as the copy: it carries a "Star 2.4k" GitHub-style
   vanity count and a /docs link that does not resolve on this site.
   Neither belongs on a page about regulators.
   ============================================================ */
export function IzTabSwitch({
  variant = "console",
  tabs: tabsProp,
  head: headProp,
  initial,
}: {
  variant?: "console" | "resource";
  /** override the tab set; defaults to the variant's built-in content */
  tabs?: IzTabSwitchTab[];
  /** replace the header block entirely */
  head?: React.ReactNode;
  /** which tab opens; defaults to the variant's own choice */
  initial?: number;
}) {
  const isConsole = variant === "console";
  const tabs = tabsProp ?? (isConsole ? CONSOLE_TABS : RESOURCE_TABS);
  const [tab, setTab] = useState(initial ?? (isConsole ? 1 : 2));
  const [outcome, setOutcome] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  /* Roving arrow-key navigation, which a tablist owes the keyboard. */
  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (tab + d + tabs.length) % tabs.length;
    setTab(next);
    setOutcome(0);
    listRef.current?.querySelectorAll<HTMLButtonElement>(".izts-tab")[next]?.focus();
  };

  const active = tabs[tab];

  const head = headProp ?? (isConsole ? (
    <>
      <span className="izts-star">
        <Star weight="fill" aria-hidden="true" />
        Star
        <b>2.4k</b>
      </span>
      <h2 className="izts-title">
        <mark>Security teams</mark> trust InstaSafe
      </h2>
      <p className="izts-sub">
        Engineering and IT teams read the same signals we enforce on — every decision is an API call you can replay.
      </p>
      <span className="izts-ctas">
        <a className="izts-btn izts-btn--primary" href="/resource-center">
          Documentation
          <ArrowUpRight weight="bold" aria-hidden="true" />
        </a>
        <a className="izts-btn" href="/contact-us">
          Request API key
        </a>
      </span>
    </>
  ) : (
    <h2 className="izts-title">
      Learn more about <mark>controlling access</mark> and <mark>proving it</mark>
    </h2>
  ));

  return (
    <section className={`izts izts--${variant} iz-railed`}>
      <div className="iz-wrap">
        <div className={`izts-frame ${isConsole ? "iz-inverted" : ""}`}>
          {isConsole && (
            <div className="izts-chrome">
              <span className="izts-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="izts-host">instasafe.com</span>
            </div>
          )}

          <div className="izts-cols">
            {/* ---------- left ---------- */}
            <div className="izts-left">
              <div className="izts-head">{head}</div>

              {/* resource variant swaps this block with the tab */}
              {!isConsole && active.copy && (
                <div className="izts-copy" key={active.id}>
                  <h3 className="izts-copytitle">
                    <mark>{active.copy.kicker}</mark> {active.copy.title}
                  </h3>
                  <p className="izts-copybody">{active.copy.body}</p>
                  <a className="izts-more" href={active.copy.href}>
                    Learn more
                    <ArrowUpRight weight="bold" aria-hidden="true" />
                  </a>
                </div>
              )}

              <div className="izts-tabs" role="tablist" aria-label="Choose a topic" ref={listRef} onKeyDown={onKey}>
                {tabs.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    id={`izts-t-${variant}-${t.id}`}
                    aria-selected={i === tab}
                    aria-controls={`izts-p-${variant}-${t.id}`}
                    tabIndex={i === tab ? 0 : -1}
                    className={`izts-tab ${i === tab ? "on" : ""}`}
                    onClick={() => {
                      setTab(i);
                      setOutcome(0);
                    }}
                  >
                    <t.Icon aria-hidden="true" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ---------- right ---------- */}
            <div className="izts-right">
              {tabs.map((t, i) => (
                <div
                  key={t.id}
                  role="tabpanel"
                  id={`izts-p-${variant}-${t.id}`}
                  aria-labelledby={`izts-t-${variant}-${t.id}`}
                  hidden={i !== tab}
                  className="izts-panel"
                >
                  {t.json && (
                    <>
                      <div className="izts-outcomes" role="tablist" aria-label={`${t.label} outcome`}>
                        {t.json.outcomes.map((o, j) => (
                          <button
                            key={o}
                            type="button"
                            role="tab"
                            aria-selected={j === outcome}
                            className={`izts-outcome ${j === outcome ? "on" : ""}`}
                            onClick={() => setOutcome(j)}
                          >
                            {o}
                          </button>
                        ))}
                      </div>
                      <IzJson src={t.json.payloads[outcome]} className="izts-json" />
                    </>
                  )}

                  {t.story && (
                    <>
                      {t.story.art ?? <Story tone={t.story.tone} />}
                      <span className="izts-byline">
                        <i className="izts-avatar" aria-hidden="true">
                          {t.story.author.name.charAt(0)}
                        </i>
                        <b>{t.story.author.name}</b>
                        <em>{t.story.author.role}</em>
                        <span>@ InstaSafe</span>
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
