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

   Panel kinds are a closed union — `code` | `table` | `record` |
   `duo` | `map`. Between them they cover every panel on this page.
   If a new slide genuinely needs a new shape, add a kind here and
   one branch in IzProPanel.tsx; don't hand-write JSX in a slide.
   ============================================================ */

import type { Icon } from "@phosphor-icons/react";

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

/* ---- duo: two named frames, scroll-driven cross-fade ----
   Covers both step 01 (login → app portal) and step 04 (app portal →
   watermarked desktop). The frame TYPE is what varies, not the panel
   kind — "apps" is reused by both slides so the identical portal mock
   can't drift into two different renderings of the same idea. */
export type DuoFrame =
  | { type: "login"; user: string; methods: string[] }
  | { type: "apps"; apps: { logo: string; name: string }[] }
  | { type: "watermarkDesktop"; app: string; watermark: string };

export type DuoPanel = {
  kind: "duo";
  head?: { label: string };
  frameA: DuoFrame;
  frameB: DuoFrame;
};

/* ---- map: background map + a verdict card over it ---- */
export type MapPanel = {
  kind: "map";
  image: string;
  device: { host: string; score: string };
  location: { city: string; ip: string };
  boundLabel: string;
};

export type Panel = CodePanel | TablePanel | RecordPanel | DuoPanel | MapPanel;

/* ---------- floating cards ----------
   x/y are percentages of the stage box, so they survive any resize.
   `w` is a px width; leave it off for auto. */

export type Float = {
  id: string;
  /** small tag tab that sits on the card's top-left */
  tag?: string;
  title?: string;
  body?: string;
  /** big-number variant, e.g. "25 / device check types" — these are
      always CAPABILITY numbers (checks, rules, policies), never proof
      numbers (endpoints, enterprises); the hero marquee already owns
      the proof-number job, and repeating it here would say it twice. */
  stat?: { value: string; label: string; icon?: Icon };
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

/** the identity-provider dock — step 01 only, rendered in the third
    column, never inside the console (see IzProDock) */
export type DockItem = { logo: string | null; name: string };

export type Slide = {
  id: string;
  /** shown as "01/04 IDENTITY" — the sequence is load-bearing here */
  eyebrow: string;
  title: string;
  aside?: Aside;
  panel: Panel;
  /** third column: paragraph beside / below the panel */
  body: { lead: string; rest: string };
  /** CTA under the left column — every step gets one */
  cta: { label: string; href: string };
  floats?: Float[];
  dock?: DockItem[];
};

export const SLIDES: Slide[] = [
  /* ---------- 01/04 · IDENTITY (IAM) ---------- */
  {
    id: "identity",
    eyebrow: "Identity (IAM)",
    title: "Who is asking?",
    panel: {
      kind: "duo",
      head: { label: "Sign-in" },
      frameA: {
        type: "login",
        user: "priya.s@veno.co.in",
        methods: ["Push", "TOTP", "Hardware key"],
      },
      frameB: {
        type: "apps",
        apps: [
          { logo: "slack", name: "Slack" },
          { logo: "salesforce", name: "Salesforce" },
          { logo: "workday", name: "Workday" },
          { logo: "github", name: "GitHub" },
          { logo: "google-workspace", name: "Google Workspace" },
          { logo: "zoom", name: "Zoom" },
        ],
      },
    },
    body: {
      lead: "Directory sync, then a single verified sign-in.",
      rest: "8 configurable auth profiles, 6 MFA methods, SSO to every provisioned app.",
    },
    cta: { label: "Explore identity", href: "/platform/iam" },
    dock: [
      { logo: null, name: "Active Directory" },
      { logo: null, name: "LDAP" },
      { logo: "azure", name: "Azure AD" },
      { logo: "google-workspace", name: "Google Workspace" },
      { logo: "microsoft-365", name: "Microsoft 365" },
    ],
    floats: [
      { id: "profiles", stat: { value: "8", label: "auth profiles" }, x: 6, y: 10 },
      { id: "mfa", stat: { value: "6", label: "MFA methods" }, x: 8, y: 78, w: 150 },
    ],
  },

  /* ---------- 02/04 · DEVICE ---------- */
  {
    id: "device",
    eyebrow: "Device",
    title: "What are they asking from?",
    panel: {
      kind: "map",
      image: "/platform/bengaluru-map.png",
      device: { host: "WS-FIN-014", score: "25/25" },
      location: { city: "Koramangala, Bengaluru", ip: "10.24.8.101" },
      boundLabel: "Device bound · certificate valid",
    },
    body: {
      lead: "25 posture check types across 144 named rules.",
      rest: "1,500+ OS/device combinations. Device binding ties each session to an approved, certificated device.",
    },
    cta: { label: "Explore device posture", href: "/zero-trust-features/device-posture-check" },
    floats: [
      { id: "checks", stat: { value: "144", label: "named rules" }, x: 68, y: 10, w: 148 },
      { id: "combos", stat: { value: "1,500+", label: "OS/device combos" }, x: 6, y: 80, w: 172 },
    ],
  },

  /* ---------- 03/04 · NETWORK (ZTNA) ---------- */
  {
    id: "network",
    eyebrow: "Network (ZTNA)",
    title: "How do they connect?",
    panel: {
      kind: "table",
      head: { label: "Gateway", right: "Live" },
      rows: [
        { label: "Internet exposure", status: "Hidden", tone: "allow" },
        { label: "Server visibility", status: "Blackened", tone: "allow" },
        { label: "Default gateway", status: "Drop all", tone: "allow" },
        { label: "Authentication", status: "Identity verified", tone: "mute" },
        { label: "Tunnel creation", status: "Per session", tone: "mute" },
        { label: "Tunnel scope", status: "Application specific", tone: "mute" },
        { label: "Layer", status: "Layer 3 · IP", tone: "mute" },
        { label: "Supported clients", status: "Thick client", tone: "mute" },
        { label: "Network protocols", status: "Any TCP/IP", tone: "mute" },
        { label: "Session lifetime", status: "Dynamic", tone: "mute" },
        { label: "Idle timeout", status: "Configurable", tone: "mute" },
        { label: "Device trust", status: "Verified", tone: "allow" },
      ],
    },
    body: {
      lead: "Server blackening and a drop-all gateway make assets invisible to the internet.",
      rest: "Per-session tunnels at the IP layer for thick clients and network protocols.",
    },
    cta: { label: "Explore ZTNA", href: "/zero-trust-network-access" },
    floats: [
      { id: "policies", stat: { value: "21", label: "access policies" }, x: 70, y: 8, w: 156 },
      { id: "layer", tag: "Layer 3", title: "IP-level tunnels", body: "Not app proxies", x: 68, y: 78, w: 168 },
    ],
  },

  /* ---------- 04/04 · APPLICATION (ZTAA) ---------- */
  {
    id: "application",
    eyebrow: "Application (ZTAA)",
    title: "What exactly can they touch?",
    panel: {
      kind: "duo",
      head: { label: "Portal" },
      frameA: {
        type: "apps",
        apps: [
          { logo: "servicenow", name: "ServiceNow" },
          { logo: "sap", name: "SAP" },
          { logo: "figma", name: "Figma" },
          { logo: "notion", name: "Notion" },
        ],
      },
      frameB: {
        type: "watermarkDesktop",
        app: "Finance Dashboard",
        watermark: "Priya S · priya.s · 10.24.8.101",
      },
    },
    body: {
      lead: "7 app types through one portal — FQDN, WEB, RDP, SSH, VNC, DB, WFS.",
      rest: "Session recording, watermarking, and clipboard control on sensitive apps.",
    },
    cta: { label: "Explore ZTAA", href: "/zero-trust-application-access" },
    floats: [
      { id: "apptypes", stat: { value: "7", label: "app types" }, x: 6, y: 10 },
      { id: "watermark", tag: "Recorded", title: "Watermarked · clipboard controlled", x: 8, y: 78, w: 188 },
    ],
  },
];

/* ---------- hero ---------- */

export const HERO = {
  /** the typewriter label centred on the ruler row */
  label: { dim: "InstaSafe", bright: "Platform", tail: "Overview" },
  /** eyebrow above, one word below — the headline is the word itself */
  title: { eyebrow: "InstaSafe", main: "Platform" },
  /** the tab that sits on the selected title box */
  selectionTag: "One control surface",
  sub: {
    lead: "One verified path from your people to your applications.",
    rest: "Identity, device and posture checked on every request — and no route at all for anything that fails.",
    link: { label: "24 enforcement controls", href: "/components#signalgrid" },
  },
  /* Verdict cards scattered on the canvas. x/y are % of the stage.
     Tone is deliberately absent: an earlier version tagged these green
     for allow and pink for deny, which spent the page's whole colour
     budget on decoration before the reader had read a word. They now
     carry one accent, applied only while the canvas is lit. */
  cards: [
    { id: "c1", tag: "Verified", label: "Access", value: "Granted", x: 6, y: 8 },
    { id: "c2", tag: "Unverified", label: "Access", value: "Refused", x: 15, y: 34 },
    { id: "c3", tag: "Verified", label: "Posture", value: "25/25", x: 71, y: 10 },
    { id: "c4", tag: "Unverified", label: "Device", value: "Unbound", x: 62, y: 48 },
    { id: "c5", tag: "Verified", label: "Tunnel", value: "Per session", x: 33, y: 76 },
    { id: "c6", tag: "Unverified", label: "Gateway", value: "Drop all", x: 3, y: 64 },
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

/* Boxed entries are the numerals. Reading the strip aloud should give
   a sentence, not a list of orphaned figures — hence the connecting
   words between every box. */
export const MARQUEE: { text: string; boxed?: boolean }[] = [
  { text: "Auth profiles" },
  { text: "8", boxed: true },
  { text: "· MFA methods" },
  { text: "6", boxed: true },
  { text: "· user providers" },
  { text: "3", boxed: true },
  { text: "Device checks" },
  { text: "25", boxed: true },
  { text: "types across" },
  { text: "144", boxed: true },
  { text: "named rules and" },
  { text: "1,500+", boxed: true },
  { text: "OS/device combinations" },
  { text: "Access policies" },
  { text: "21", boxed: true },
  { text: "combinations" },
  { text: "Risk engine" },
  { text: "12", boxed: true },
  { text: "trigger types ·" },
  { text: "4", boxed: true },
  { text: "auto-actions" },
  { text: "Logging" },
  { text: "202", boxed: true },
  { text: "event types ·" },
  { text: "11", boxed: true },
  { text: "report types ·" },
  { text: "7", boxed: true },
  { text: "SIEM export formats" },
  { text: "App types" },
  { text: "7", boxed: true },
  { text: "through one portal" },
];
