"use client";

import {
  ArrowsSplit,
  CheckCircle,
  Clock,
  CloudArrowUp,
  FileText,
  GlobeHemisphereEast,
  Lock,
  MagnifyingGlass,
  ShieldCheck,
  type Icon,
} from "@phosphor-icons/react";
import { LogoMark } from "@/components/brand/Logo";
import "./whyhero.css";

/* ============================================================
   WhyScenes — the hero visual for /why-instasafe-zero-trust.

   TWO ARCHITECTURES, DRAWN THE SAME WAY SO THE DIFFERENCE IS THE ONLY
   THING THAT MOVES. Both panels start at a user and end at the
   customer's applications. What changes is the middle: on the left the
   traffic goes THROUGH the vendor and gets inspected, decrypted and
   re-routed; on the right the vendor is off to one side holding policy
   while the connection goes straight where it was always going.

   That is the page's whole argument, and it only reads if the two
   halves are otherwise identical — same nodes, same spacing, same
   lock chips. Only the path and the tint differ.

   STATIC. Nothing here animates; the claim is architectural, not
   temporal, and the hero is not where interaction belongs.
   ============================================================ */

const VENDOR_OPS: { label: string; Icon: Icon }[] = [
  { label: "Inspection", Icon: MagnifyingGlass },
  { label: "Decryption", Icon: ShieldCheck },
  { label: "Routing", Icon: ArrowsSplit },
];

function LockChip({ accent }: { accent?: boolean }) {
  return (
    <span className={`why-lock${accent ? " is-accent" : ""}`} aria-hidden="true">
      <Lock size={11} weight="fill" />
    </span>
  );
}

/* The person is a photograph, not a glyph — and the two columns show
   TWO DIFFERENT PEOPLE, not the same face twice. One face repeated
   reads as a rendering slip; two people read as "this is what happens
   to your workforce either way", which is the claim.

   Round, because the source portraits are already circular crops on
   white. A rounded square would show the photo's own circle inset in a
   corner-cut box. */
const PEOPLE = {
  old: { src: "/people/alen-joseph-640.webp", name: "User" },
  ours: { src: "/people/priya-s-640.webp", name: "User" },
} as const;

function PersonNode({ who, tinted }: { who: keyof typeof PEOPLE; tinted?: boolean }) {
  const p = PEOPLE[who];
  return (
    <div className={`why-node${tinted ? " is-tinted" : ""}`}>
      <span className="why-node-ic why-node-ic--photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.src} alt="" decoding="async" />
      </span>
      <span className="why-node-t">{p.name}</span>
    </div>
  );
}

/* Three real application marks, no names written out. The logos say
   what the estate is; a text label under each would put third-party
   wordmarks in an architecture diagram and add nothing the mark does
   not already carry. Three is also the count the column holds without
   the node growing and breaking the two panels' matching heights. */
/* Square-ish marks only. `google-workspace.svg` is a 3993x512 wordmark
   and collapses to a hairline in a 26px tile; `google.svg` is the same
   brand at 268x274 and survives the size. */
const APPS = ["microsoft-365", "google", "slack"];

function AppsNode({ tinted }: { tinted?: boolean }) {
  return (
    <div className={`why-node${tinted ? " is-tinted" : ""}`}>
      <span className="why-apps" aria-hidden="true">
        {APPS.map((a) => (
          <span className="why-app" key={a}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/logos/integrations/${a}.svg`} alt="" decoding="async" />
          </span>
        ))}
      </span>
      <span className="why-node-t">Your applications</span>
    </div>
  );
}

export function WhyCompare() {
  return (
    <div className="why-compare" aria-hidden="true">
      {/* ---------------- the old way ---------------- */}
      <div className="why-col">
        <div className="why-col-h">
          <span className="why-mono">The old way</span>
          <span className="why-col-sub">Most Zero Trust vendors</span>
        </div>

        <div className="why-panel">
          <PersonNode who="old" />

          <span className="why-wire">
            <LockChip />
          </span>

          <div className="why-vendor">
            <b>Vendor infrastructure</b>
            <span className="why-vendor-sub">Inspection · Decryption · Routing</span>
            <div className="why-ops">
              {VENDOR_OPS.map((o) => (
                <span className="why-op" key={o.label} title={o.label}>
                  <o.Icon size={16} weight="regular" />
                </span>
              ))}
            </div>
          </div>

          <span className="why-wire">
            <LockChip />
          </span>

          <AppsNode />
        </div>
      </div>

      <span className="why-vs">VS</span>

      {/* ---------------- the InstaSafe way ---------------- */}
      <div className="why-col">
        <div className="why-col-h">
          <span className="why-mono is-accent">The InstaSafe way</span>
          <span className="why-col-sub">Your data never touches our infrastructure</span>
        </div>

        <div className="why-panel is-ours">
          <PersonNode who="ours" tinted />

          <span className="why-wire is-accent">
            <LockChip accent />
          </span>

          {/* The control plane sits BESIDE the path, not on it. That
              offset is the entire product claim, so it is the one place
              the two columns are allowed to differ structurally. */}
          <div className="why-cp">
            <span className="why-cp-mark">
              <LogoMark size={30} />
            </span>
            <span className="why-cp-arrow" aria-hidden="true" />
            <div className="why-cp-t">
              <b>InstaSafe</b>
              <span>Control plane</span>
              <i>Policy · Auth · Telemetry</i>
              <i className="is-strong">No traffic. No access.</i>
            </div>
          </div>

          <span className="why-wire is-accent">
            <LockChip accent />
          </span>

          <div className="why-end">
            <AppsNode tinted />
            <span className="why-direct">
              <CheckCircle size={14} weight="fill" />
              Direct &amp; private connection
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   The three standing claims, the callout, and the numbers.
   ============================================================ */

const MARKS: { t: string; d: string; Icon: Icon }[] = [
  { t: "Deployed across", d: "regulated India", Icon: ShieldCheck },
  { t: "Built in India", d: "for the world", Icon: GlobeHemisphereEast },
  { t: "Privacy by", d: "architecture", Icon: Lock },
];

type Stat = { n: string; unit?: string; label: string; d: string[]; Icon: Icon };
const STATS: Stat[] = [
  { n: "0", unit: "ms", label: "Added latency", d: ["Direct to resource.", "No detours."], Icon: Clock },
  { n: "0", unit: "GB", label: "Data proxied", d: ["Your data stays", "in your environment."], Icon: CloudArrowUp },
  { n: "0", label: "Traffic hops", d: ["Straight to where", "you need to be."], Icon: ArrowsSplit },
  { n: "100", unit: "%", label: "Encrypted end-to-end", d: ["End-to-end encryption", "you own."], Icon: ShieldCheck },
  { n: "160", unit: "+", label: "Countries served", d: ["Global coverage.", "Local performance."], Icon: GlobeHemisphereEast },
  { n: "100", unit: "%", label: "Transparency", d: ["We publish what", "others won't."], Icon: FileText },
];

export function WhyProof() {
  return (
    <>
      <div className="why-marks-row">
        <div className="why-marks">
          {MARKS.map((m) => (
            <span className="why-mark" key={m.t}>
              <m.Icon size={19} weight="regular" />
              <span>
                {m.t}
                <i>{m.d}</i>
              </span>
            </span>
          ))}
        </div>

        <div className="why-callout">
          <span className="why-callout-ic">
            <LogoMark size={22} />
          </span>
          <div>
            <b>No backhaul. No inspection. No vendor in the middle.</b>
            <span>You stay in control of your data, your performance and your compliance.</span>
          </div>
        </div>
      </div>

      <div className="why-stats">
        {STATS.map((s) => (
          <div className="why-stat" key={s.label}>
            <s.Icon size={22} weight="regular" />
            <b>
              {s.n}
              {s.unit && <i>{s.unit}</i>}
            </b>
            <span className="why-stat-l">{s.label}</span>
            <span className="why-stat-d">
              {s.d.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
