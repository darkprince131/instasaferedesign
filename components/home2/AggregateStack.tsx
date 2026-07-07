"use client";

import {
  AppWindow,
  Laptop,
  UsersThree,
  MapPin,
  type Icon,
} from "@phosphor-icons/react";

/* ============================================================
   Aggregate access data — "AggregateStack".
   Reworked from the Dub "Aggregate data" card: a deck of stacked
   summary screens (apps · devices · users · locations). At rest
   they sit cascaded; on hover the whole deck translates up and
   fans out so the screens behind rise into view.
   Scoped `.ag-`; tokens from `.iz`.
   ============================================================ */

type Screen = {
  icon: Icon;
  title: string;
  total: string;
  rows: { label: string; val: string; flag?: string }[];
};

/* front → back */
const SCREENS: Screen[] = [
  {
    icon: AppWindow,
    title: "Top apps",
    total: "1.8K",
    rows: [
      { label: "billing-portal", val: "642" },
      { label: "finance-rdp", val: "318" },
      { label: "analytics-db", val: "204" },
    ],
  },
  {
    icon: Laptop,
    title: "Devices",
    total: "1.2K",
    rows: [
      { label: "Windows", val: "58%" },
      { label: "macOS", val: "27%" },
    ],
  },
  {
    icon: UsersThree,
    title: "Users",
    total: "940",
    rows: [
      { label: "Finance", val: "212" },
      { label: "Engineering", val: "186" },
    ],
  },
  {
    icon: MapPin,
    title: "Locations",
    total: "12",
    rows: [
      { label: "India", val: "71%" },
      { label: "Singapore", val: "14%" },
    ],
  },
];

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* `embed` renders only the isometric deck (no card chrome / footer)
   so it can be dropped into another card's media slot. */
export function AggregateStack({ href = "/zero-trust-network-access", embed = false }: { href?: string; embed?: boolean }) {
  const stage = (
    <div className={`ag-stage${embed ? " embed" : ""}`} aria-hidden="true">
      <div className="ag-stack">
        {/* render back → front so the front paints last (highest z) */}
        {[...SCREENS].reverse().map((s, ri) => {
          const depth = SCREENS.length - 1 - ri; // 0 = front
          const lift = SCREENS.length - 1 - depth; // front sits highest in the iso stack
          const I = s.icon;
          return (
            <div className={`ag-screen${depth === 0 ? " front" : ""}`} key={s.title} style={{ ["--d" as string]: depth, ["--lift" as string]: lift }}>
              <div className="ag-screen-h">
                <span className="ag-ic"><I weight="regular" /></span>
                <span className="ag-name">{s.title}</span>
                <span className="ag-total">{s.total}</span>
              </div>
              <div className="ag-rows">
                {s.rows.map((r, i) => (
                  <div className={`ag-row${depth === 0 && i === 0 ? " hot" : ""}`} key={r.label}>
                    <span className="ag-bar" style={{ width: `${78 - i * 26}%` }} />
                    <span className="ag-lbl">{r.label}</span>
                    <span className="ag-val">{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (embed) return <div className="ag-embed">{stage}</div>;

  return (
    <div className="ag-card">
      {stage}

      <div className="ag-foot">
        <span className="iz-ey">202 event types</span>
        <h3 className="ag-title">
          Aggregate <em>access data</em>.
        </h3>
        <p className="ag-desc">
          Top apps, devices, users and locations rolled up from every access event — and exportable to your SIEM.
        </p>
        <a className="ag-learn" href={href}>
          Learn more {Arrow}
        </a>
      </div>
    </div>
  );
}
