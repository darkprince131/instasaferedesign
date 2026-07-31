/* ============================================================
   pro.config.tsx — ALL CONTENT FOR THE PLATFORM PAGE, AS DATA

   This file is the only one you should need to touch to change
   what the page says. The components in this folder are dumb
   renderers over these objects.

   To change a slide  → edit one entry in SLIDES
   To add a slide     → append one entry (the counter, the rail and
                        the mobile list all read SLIDES.length)
   To change the hero → edit HERO
   To move a floating card → edit its {x,y} (percentages of the stage)

   Panel kinds are a closed union — `code` | `table` | `record`.
   Between them they cover every panel on the reference page. If a
   new slide genuinely needs a new shape, add a kind here and one
   branch in IzProPanel.tsx; don't hand-write JSX in a slide.
   ============================================================ */

export type Tone = "allow" | "deny" | "warn" | "mute";

/* ---------- panels ---------- */

export type CodePanel = {
  kind: "code";
  /** chrome: left label and right link */
  head?: { label: string; action?: { label: string; href: string } };
  tabs: string[];
  /** index of the open tab */
  open?: number;
  /** each line is [indent, segments] — segments are [text, class] */
  lines: [number, [string, "k" | "s" | "n" | "b" | "p"][]][];
};

export type TablePanel = {
  kind: "table";
  head?: { label: string; right?: string };
  rows: { label: string; status: string; tone: Tone; value?: string | number; lit?: boolean }[];
  total?: { label: string; value: string; tone: Tone };
};

export type RecordPanel = {
  kind: "record";
  head?: { label: string; right?: string };
  /** the "Welcome back, <id>!" line */
  greeting?: { text: string; id: string };
  /** the stat columns under it */
  stats?: { label: string; value: string }[];
  /** timeline row at the foot */
  timeline?: { when: string; chips: { label: string; value: string; tone?: Tone }[] };
};

export type Panel = CodePanel | TablePanel | RecordPanel;

/* ---------- floating cards ----------
   x/y are percentages of the stage box, so they survive any resize.
   `w` is a px width; leave it off for auto. */

export type Float = {
  id: string;
  /** small tag tab that sits on the card's top-left */
  tag?: string;
  title?: string;
  body?: string;
  /** big-number variant, e.g. "5M / monthly downloads" */
  stat?: { value: string; label: string };
  x: number;
  y: number;
  w?: number;
  tone?: Tone;
};

/* ---------- slides ---------- */

export type Aside =
  | { kind: "command"; text: string }
  | { kind: "link"; label: string; href: string }
  | { kind: "quote"; text: string; who: string };

export type Slide = {
  id: string;
  /** shown as "01/04 CONNECT" — the sequence is load-bearing here */
  eyebrow: string;
  title: string;
  aside?: Aside;
  panel: Panel;
  /** paragraph to the right of / below the panel */
  body: { lead: string; rest: string };
  floats?: Float[];
};

export const SLIDES: Slide[] = [
  {
    id: "connect",
    eyebrow: "Connect",
    title: "Point it at your apps. Nothing to re-architect.",
    aside: { kind: "command", text: "instasafe connect --app payroll" },
    panel: {
      kind: "code",
      head: { label: "Connector", action: { label: "Request API key", href: "/contact" } },
      tabs: ["connector.yaml", "response.json"],
      open: 1,
      lines: [
        [0, [["{", "p"]]],
        [1, [['"app_id"', "k"], [": ", "p"], ['"payroll-in-west"', "s"], [",", "p"]]],
        [1, [['"reachable_by"', "k"], [": ", "p"], ['"policy"', "s"], [",", "p"]]],
        [1, [['"network_exposed"', "k"], [": ", "p"], ["false", "b"], [",", "p"]]],
        [1, [['"handshake_ms"', "k"], [": ", "p"], ["240", "n"], [",", "p"]]],
        [1, [['"agentless"', "k"], [": ", "p"], ["true", "b"]]],
        [0, [["}", "p"]]],
      ],
    },
    body: {
      lead: "Publish an application instead of a network.",
      rest: "The connector dials out, so there is no inbound port to open and nothing to place in a DMZ. Existing apps keep their address, their auth and their runtime.",
    },
    floats: [
      { id: "fast", tag: "Fast", title: "Live in 10 minutes", body: "No re-architecture", x: 72, y: 8, w: 168 },
      { id: "dl", stat: { value: "4", label: "Connector types" }, x: 84, y: 30 },
      { id: "os", stat: { value: "6", label: "Platforms" }, x: 76, y: 46 },
    ],
  },
  {
    id: "verify",
    eyebrow: "Verify",
    title: "One identity, re-checked on every single request.",
    aside: { kind: "link", label: "Explore identity", href: "/platform/iam" },
    panel: {
      kind: "record",
      head: { label: "Session history", right: "SX-4471" },
      greeting: { text: "Welcome back,", id: "anita.r@acme.in" },
      stats: [
        { label: "Sessions", value: "1,284" },
        { label: "First seen", value: "2024-08-12" },
        { label: "Confidence", value: "99.7%" },
      ],
      timeline: {
        when: "Now",
        chips: [
          { label: "Device", value: "WS-FIN-014", tone: "allow" },
          { label: "Posture", value: "Compliant", tone: "allow" },
          { label: "Geo", value: "Pune, IN", tone: "mute" },
          { label: "MFA", value: "Satisfied", tone: "allow" },
        ],
      },
    },
    body: {
      lead: "Every request carries an identity, a device and a posture.",
      rest: "The three are checked together, on each request — not once at login. A credential that moves to another machine stops being sufficient the moment it gets there.",
    },
    floats: [
      { id: "persist", tag: "Persistent", title: "Survives IP and network changes", x: 70, y: 12, w: 190 },
    ],
  },
  {
    id: "enforce",
    eyebrow: "Enforce",
    title: "Twenty-four controls, resolved into one decision.",
    aside: { kind: "quote", text: "We stopped managing a network and started managing access. The audit went from a fortnight to an afternoon.", who: "Head of IT, manufacturing" },
    panel: {
      kind: "table",
      head: { label: "Enforcement signals", right: "Weight" },
      rows: [
        { label: "Device posture", status: "Compliant", tone: "allow", value: 0 },
        { label: "Impossible travel", status: "Detected", tone: "deny", value: 14, lit: true },
        { label: "Unmanaged device", status: "Detected", tone: "warn", value: 8, lit: true },
        { label: "Jailbreak / root", status: "Not detected", tone: "allow", value: 0 },
        { label: "Screen capture", status: "Blocked", tone: "allow", value: 0 },
        { label: "MFA retries", status: "Detected", tone: "warn", value: 7, lit: true },
        { label: "Session recording", status: "On", tone: "allow", value: 0 },
        { label: "App allow-list", status: "Listed", tone: "allow", value: 0 },
      ],
      total: { label: "Risk score", value: "29", tone: "deny" },
    },
    body: {
      lead: "The score is a number your policy can act on.",
      rest: "Each control contributes a weight you set. Cross the threshold and the session is stepped up, scoped down or ended — with the reason attached.",
    },
    floats: [
      { id: "reveal", tag: "Reveal", title: "One score, not twenty-four dashboards", x: 70, y: 10, w: 186 },
      { id: "susp", body: "This session would be challenged.", x: 80, y: 34, w: 150, tone: "deny" },
    ],
  },
  {
    id: "prove",
    eyebrow: "Prove",
    title: "Every decision, replayable months later.",
    aside: { kind: "link", label: "See the audit trail", href: "/platform" },
    panel: {
      kind: "table",
      head: { label: "Access log", right: "Export" },
      rows: [
        { label: "09:14:02  anita.r → payroll", status: "Allow", tone: "allow", value: "240ms" },
        { label: "09:14:40  svc-runner → repos", status: "Allow", tone: "allow", value: "180ms" },
        { label: "09:16:11  contractor-07 → crm", status: "Read only", tone: "warn", value: "310ms" },
        { label: "09:18:55  unknown → payroll", status: "Deny", tone: "deny", value: "12ms", lit: true },
        { label: "09:21:03  anita.r → repos", status: "Deny", tone: "deny", value: "9ms", lit: true },
      ],
      total: { label: "Retained", value: "13 months", tone: "mute" },
    },
    body: {
      lead: "Who reached what, from which device, under which rule.",
      rest: "Exportable to your SIEM, and answerable without reconstructing anything. The reason a request was refused is stored with the refusal.",
    },
    floats: [{ id: "audit", tag: "Audit", title: "Answer in an afternoon, not a fortnight", x: 71, y: 14, w: 196 }],
  },
];

/* ---------- hero ---------- */

export const HERO = {
  /** the typewriter label centred on the ruler row */
  label: { dim: "InstaSafe", bright: "Platform", tail: "Overview" },
  title: { lead: "Zero Trust Access by", brand: "InstaSafe" },
  /** the tab that sits on the selected title box */
  selectionTag: "Reveal real intent",
  sub: {
    lead: "One verified path from your people to your applications.",
    rest: "Identity, device and posture checked on every request — and no route at all for anything that fails.",
    link: { label: "24 enforcement controls", href: "/components#signalgrid" },
  },
  /** verdict cards scattered on the canvas. x/y are % of the stage. */
  cards: [
    { id: "c1", tag: "Allowed", label: "Risk score", value: "Low", tone: "allow" as Tone, x: 6, y: 6 },
    { id: "c2", tag: "Blocked", label: "Risk score", value: "High", tone: "deny" as Tone, x: 15, y: 30 },
    { id: "c3", tag: "Allowed", label: "Risk score", value: "Low", tone: "allow" as Tone, x: 71, y: 8 },
    { id: "c4", tag: "Blocked", label: "Risk score", value: "High", tone: "deny" as Tone, x: 62, y: 44 },
    { id: "c5", tag: "Blocked", label: "Risk score", value: "High", tone: "deny" as Tone, x: 33, y: 74 },
    { id: "c6", tag: "Allowed", label: "Risk score", value: "Low", tone: "allow" as Tone, x: 3, y: 62 },
  ],
  /** cells to shade in the canvas grid, as [col,row] 1-indexed.
      Purely texture — add or remove freely. */
  shaded: [
    [1, 1], [10, 1], [3, 2], [7, 2], [12, 2],
    [1, 3], [5, 4], [11, 4], [2, 5], [8, 5],
    [4, 6], [12, 6], [6, 7], [9, 7], [1, 8], [11, 8],
  ] as [number, number][],
  grid: { cols: 12, rows: 8 },
};

/* ---------- the stat marquee under the hero ---------- */

export const MARQUEE: { text: string; boxed?: boolean }[] = [
  { text: "Requests brokered every day" },
  { text: "24", boxed: true },
  { text: "enforcement controls, one policy engine" },
  { text: "0", boxed: true },
  { text: "open inbound ports on any published app" },
  { text: "13 months", boxed: true },
  { text: "of replayable access history retained" },
  { text: "240 ms", boxed: true },
  { text: "median broker handshake" },
];
