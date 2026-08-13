"use client";

import { Briefcase, Code, Handshake } from "@phosphor-icons/react";
import { IzTabSwitch, type IzTabSwitchTab } from "@/components/izpages/pro/IzTabSwitch";

/* ============================================================
   PostureScenarios — "How it's used", on 00ao (variant=resource).

   ▸ THREE SCENES, ONE STAGE ◂
   Every illustration is the same card: the device at the top, the
   posture ledger it produced beneath, and the verdict that ledger
   bought at the foot. The stage never changes and that is the
   argument — one engine reads one device and issues one verdict, so
   three unrelated drawings would quietly say the opposite.

   What changes is everything inside it, and the differences are the
   real ones a policy has to make:

     FINANCE      the strictest profile, and it PASSES. 25 of 25, a
                  managed desktop, and a pay run that opens. The point
                  is not that finance gets blocked — it is that the
                  hardest checks are survivable on a machine you own.

     CONTRACTORS  the device cannot be inspected, because there is no
                  agent on it and there never will be. Fewer signals
                  are available, so the verdict is narrower rather
                  than absent: browser only, read-only, recorded.

     DEVELOPERS   the interesting one, because the policy BENDS. Local
                  admin is a fail on every other profile and an
                  operational requirement here, so it is waived by
                  name — and the checks that actually matter on a
                  machine holding source are tightened instead.

   ▸ ONLY THE DRAWING IS SVG ◂
   The first build put the ledger and the verdict inside the SVG too,
   and that was wrong in three ways with one root cause: SVG text is
   not text. It does not wrap, so three labels had to be hand-trimmed
   to stop them running off a 400-unit panel and one note collided
   with its own label. It ignores a reader's font size. And it scales
   with the drawing, so on a 375px phone an 11-unit label rendered at
   six pixels — measured.

   The device is a picture and stays SVG. The ledger is a list and the
   verdict is a banner, so both are HTML now: legible at any width,
   selectable, and sized in the page's own tokens.

   ▸ WHY THE LEDGERS ARE DIFFERENT LENGTHS ◂
   Not styling. The contractor scene has four rows because four is
   genuinely all a browser can report, and the gap where the other
   twenty-one would be is the most honest thing in the set.
   ============================================================ */

const ART = { viewBox: "0 0 400 200", fill: "none", "aria-hidden": true } as const;

/* ---------- the drawings ----------
   ▸ SCREENS ARE DARK IN BOTH THEMES ▸
   A screen is a lit object. Drawn in paper tones these read as
   wireframes, which on a page already carrying a properly drawn
   laptop in the disassembly above was a losing comparison. */

function FinanceArt() {
  return (
    <svg {...ART} className="pscn-art">
      <path className="pscn-desk" d="M40 186h320" />
      <g className="pscn-dev">
        {/* a monitor and a tower standing CLEAR of it — finance sits at
            a company machine that never leaves the building, and a
            laptop here would undercut why its profile can be this hard */}
        <rect className="pscn-shell" x="108" y="22" width="150" height="112" rx="8" />
        <rect className="pscn-screen" x="116" y="30" width="134" height="96" rx="4" />
        <path className="pscn-stand" d="M183 134v30M152 168h62" />

        <rect className="pscn-shell" x="270" y="62" width="32" height="102" rx="6" />
        <path className="pscn-vent" d="M277 74h18M277 81h18M277 88h18" />
        <circle className="pscn-led is-ok" cx="286" cy="150" r="3.5" />

        {/* on the screen: a pay run, waiting to be approved */}
        <rect className="pscn-bar" x="116" y="30" width="134" height="15" rx="4" />
        <circle className="pscn-tdot" cx="125" cy="37" r="2.2" />
        <circle className="pscn-tdot" cx="133" cy="37" r="2.2" />
        <path className="pscn-ln" d="M126 60h66M126 72h114M126 84h86M126 96h104" />
        <rect className="pscn-btn is-ok" x="126" y="106" width="54" height="13" rx="4" />
        <path className="pscn-btnlbl" d="M134 112.5h38" />
      </g>
    </svg>
  );
}

function ContractorArt() {
  return (
    <svg {...ART} className="pscn-art">
      <path className="pscn-desk" d="M40 186h320" />
      <g className="pscn-dev">
        {/* somebody else's laptop. The dashed SHELL is the whole idea:
            this machine is outside the estate and will never have an
            agent on it. The screen inside is solid, because what the
            browser reports is real — it is the hardware around it
            that is unknowable. */}
        <rect className="pscn-shell is-foreign" x="112" y="20" width="164" height="114" rx="8" />
        <rect className="pscn-screen" x="120" y="28" width="148" height="98" rx="4" />
        <path className="pscn-base" d="M92 138h204l-11 18H103z" />
        <path className="pscn-notch" d="M180 146h28" />

        <rect className="pscn-bar" x="120" y="28" width="148" height="16" rx="4" />
        <circle className="pscn-tdot" cx="129" cy="36" r="2.2" />
        <circle className="pscn-tdot" cx="137" cy="36" r="2.2" />
        <rect className="pscn-url" x="148" y="31" width="108" height="9" rx="4" />
        <path className="pscn-ln" d="M132 60h124M132 72h84M132 84h114M132 96h70" />
        <g className="pscn-nodl" transform="translate(240 100)">
          <circle cx="0" cy="0" r="14" />
          <path d="M-7 7 7 -7" />
          <path d="M0 -6v8M-4 -1 0 3 4 -1" />
        </g>
      </g>
    </svg>
  );
}

function DeveloperArt() {
  return (
    <svg {...ART} className="pscn-art">
      <path className="pscn-desk" d="M30 186h340" />
      <g className="pscn-dev">
        {/* a laptop plus a second screen — the only two-display scene
            in the set, because that is what the desk actually looks
            like and it says "developer" faster than a label could */}
        <rect className="pscn-shell" x="212" y="14" width="94" height="122" rx="7" />
        <rect className="pscn-screen" x="219" y="21" width="80" height="108" rx="3" />
        <path className="pscn-stand" d="M259 136v22M240 162h38" />

        <rect className="pscn-shell" x="86" y="52" width="132" height="92" rx="7" />
        <rect className="pscn-screen" x="93" y="59" width="118" height="78" rx="3" />
        <path className="pscn-base" d="M70 148h164l-10 14H80z" />

        {/* code on the laptop, a terminal on the second screen */}
        <path className="pscn-code" d="M104 74h32M104 84h52M114 94h38M104 104h24M114 114h50M104 124h34" />
        <path className="pscn-code is-key" d="M104 74h17M114 94h14" />

        <path className="pscn-prompt" d="M228 34h6" />
        <path className="pscn-code" d="M239 34h28M228 46h44M228 58h32M228 70h48M228 82h26M228 94h38M228 106h30" />
        <rect className="pscn-caret" x="228" y="116" width="6" height="9" rx="1" />
      </g>
    </svg>
  );
}

/* ---------- the card ---------- */

type Check = { label: string; tone: "ok" | "no" | "waived" | "blank"; note?: string };
type Scene = {
  Art: () => React.JSX.Element;
  caption: string;
  ledgerHead: string;
  checks: Check[];
  foot: string;
  verdict: { tone: "ok" | "part" | "no"; head: string; sub: string };
};

function Card({ s }: { s: Scene }) {
  return (
    <div className="pscn">
      <div className="pscn-stage">
        <s.Art />
        <span className="pscn-cap">{s.caption}</span>
      </div>

      <div className="pscn-ledger">
        <span className="pscn-ledgerh">{s.ledgerHead}</span>
        <ul className="pscn-rows">
          {s.checks.map((c) => (
            <li className={`pscn-row is-${c.tone}`} key={c.label}>
              <span className="pscn-mark" aria-hidden="true" />
              <span className="pscn-lbl">{c.label}</span>
              {c.note && <span className="pscn-note">{c.note}</span>}
            </li>
          ))}
        </ul>
        <span className="pscn-foot">{s.foot}</span>
      </div>

      <div className={`pscn-verdict is-${s.verdict.tone}`}>
        <span className="pscn-vdot" aria-hidden="true" />
        <span className="pscn-vtxt">
          <b>{s.verdict.head}</b>
          <em>{s.verdict.sub}</em>
        </span>
      </div>
    </div>
  );
}

const FINANCE: Scene = {
  Art: FinanceArt,
  caption: "Managed desktop · on-site",
  ledgerHead: "Posture · 25 of 25",
  checks: [
    { label: "Disk encryption", tone: "ok" },
    { label: "Antivirus running", tone: "ok" },
    { label: "OS patch level", tone: "ok", note: "current" },
    { label: "Screen lock ≤ 5 min", tone: "ok" },
  ],
  foot: "+ 21 more, all passing",
  verdict: { tone: "ok", head: "Allow — pay run approval", sub: "Full access · the hardest profile, survived" },
};

const CONTRACTOR: Scene = {
  Art: ContractorArt,
  caption: "Unmanaged laptop · no agent",
  ledgerHead: "Posture · 4 signals available",
  checks: [
    { label: "Browser & version", tone: "ok" },
    { label: "Certificate present", tone: "ok" },
    { label: "Geo / network", tone: "ok", note: "in region" },
    { label: "21 checks need an agent", tone: "blank" },
  ],
  foot: "Nothing else is knowable from here.",
  verdict: { tone: "part", head: "Allow — one app, read only", sub: "No download, no clipboard, session recorded" },
};

const DEVELOPER: Scene = {
  Art: DeveloperArt,
  caption: "Dev laptop · local admin, by design",
  ledgerHead: "Posture · profile 4 of 5",
  checks: [
    { label: "Disk encryption", tone: "ok" },
    { label: "Local admin", tone: "waived", note: "waived" },
    { label: "Screen lock ≤ 2 min", tone: "ok", note: "tightened" },
    { label: "Production data on disk", tone: "no" },
  ],
  foot: "One waiver, signed and dated.",
  verdict: { tone: "part", head: "Allow — repos and staging", sub: "Production denied · one rule, named" },
};

/* ---------- the tabs ---------- */

const TABS: IzTabSwitchTab[] = [
  {
    id: "finance",
    label: "Finance",
    Icon: Briefcase,
    copy: {
      kicker: "Finance:",
      title: "The strictest profile in the building — and it still passes",
      body: "The people who move money get every check turned on: encryption, antivirus, patch level, screen lock, and a device bound to a named person. On a company desktop that is twenty-five out of twenty-five, and nobody in the team notices it happening.",
      href: "/solutions/privileged-access-management",
    },
    story: {
      tone: "b",
      author: { name: "Finance", role: "25 of 25 checks" },
      art: <Card s={FINANCE} />,
    },
  },
  {
    id: "contractors",
    label: "Contractors",
    Icon: Handshake,
    copy: {
      kicker: "Contractors:",
      title: "A device you will never be allowed to inspect",
      body: "There is no agent on a contractor's laptop and there is not going to be one. So the browser reports what it can — version, certificate, network — and the access is sized to match: one application, read only, no download, and the session on record.",
      href: "/solutions/secure-access-for-github",
    },
    story: {
      tone: "a",
      author: { name: "Contractors", role: "4 signals, scoped access" },
      art: <Card s={CONTRACTOR} />,
    },
  },
  {
    id: "developers",
    label: "Developers",
    Icon: Code,
    copy: {
      kicker: "Developers:",
      title: "Where the policy has to bend, and where it must not",
      body: "Local admin fails every other profile and is an operational requirement here, so it is waived by name rather than quietly ignored. In exchange the checks that matter on a machine holding source get tighter — and production stays out of reach on the one rule that says so.",
      href: "/secure-devops-access",
    },
    story: {
      tone: "c",
      author: { name: "Engineering", role: "1 waiver, 2 tightened" },
      art: <Card s={DEVELOPER} />,
    },
  },
];

export function PostureScenarios() {
  return (
    <IzTabSwitch
      variant="resource"
      tabs={TABS}
      initial={0}
      head={
        <>
          <span className="iz-ey">How it&apos;s used</span>
          <h2 className="izts-title">
            One engine. <mark>Three very different rooms.</mark>
          </h2>
          <p className="izts-sub">
            The same twenty-five checks read the same way every time. What changes is which of them a group is held
            to — and that is a policy decision, not a different product.
          </p>
        </>
      }
    />
  );
}
