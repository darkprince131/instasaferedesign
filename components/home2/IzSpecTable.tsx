"use client";

import type { Icon } from "@phosphor-icons/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   00at · IzSpecTable — the "Quick scan" block. 4 variants.

   "Quick scan" names what the READER does, so the block earns
   interaction by helping them mark and filter — never by
   revealing. No circular progress, no scramble-in: both delay the
   one job this block has.

   The shared ledger grammar lives here and in iznewblocks.css:
   mono key left · dotted leader · tabular value right · hairline
   rule. IzAnswerStrip and IzRelatedRail inherit it, which is what
   makes the four read as one family.

     ledger    — flat key/value. The fallback with no grouping.
     checklist — tickable + filter chips + copy-a-shortlist.
     versus    — second value column, ours vs legacy.
     rail      — icon spine. Each row hangs off a vertical line
                 that draws top→bottom as the section is reached.

   ▸ TO EDIT ◂ rows are data: { key, value, legacyValue?, diff?,
   group?, icon?, note? }. Variant `versus` is the same data with
   legacyValue populated; `rail` is the same data with icon set.
   ============================================================ */

export type SpecRow = {
  key: string;
  value: string;
  /** variant "versus": the legacy-architecture column */
  legacyValue?: string;
  /** variant "versus": marks a real architectural difference, not just wording */
  diff?: boolean;
  /** variants "checklist" (grouping + filters) */
  group?: string;
  /** variant "rail" */
  icon?: Icon;
  /** variant "rail": optional second line under the value */
  note?: string;
};

type Props = {
  variant?: "ledger" | "checklist" | "versus" | "rail";
  /** mono header label, e.g. "quick scan _ ztna specs" */
  label?: string;
  rows: SpecRow[];
  /** checklist filter chips; ids must match row.group */
  groups?: { id: string; label: string }[];
  usLabel?: string;
  legacyLabel?: string;
  footNote?: string;
  className?: string;
};

/* ---------- shared header ---------- */
function Head({ label, children }: { label?: string; children?: React.ReactNode }) {
  if (!label && !children) return null;
  return (
    <div className="izst-head">
      {label && (
        <span className="izst-mlab">
          {label}
          <i aria-hidden="true">_</i>
        </span>
      )}
      {children}
    </div>
  );
}

/* ============================================================
   Scroll-arming hook.

   The armed state HIDES content, so this is written so that hidden
   can never be a terminal state:

   1. JS does the arming, not CSS — no JS, no `is-armed`, content
      renders finished. Reduced motion never arms either.
   2. The reveal trigger is rAF + getBoundingClientRect, NOT an
      IntersectionObserver. An IO that never fires (throttled or
      non-compositing contexts) would strand the rows at opacity 0,
      which is exactly how this failed the first time. Rect maths
      also covers "already in view at mount" for free.
   3. A 6s ceiling flips it live regardless. With rect polling
      working this never fires; it exists so a layout edge case
      cannot leave a block permanently blank.
   ============================================================ */
function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "armed" | "live">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setState("armed");

    let raf = 0;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(ceiling);
      setState("live");
    };

    const tick = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      /* in view once its top has risen past 88% of the viewport and
         its bottom has not yet left the top edge */
      if (r.top < vh * 0.88 && r.bottom > 0) {
        go();
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const ceiling = window.setTimeout(go, 6000);
    raf = requestAnimationFrame(tick);

    return () => {
      done = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(ceiling);
    };
  }, []);

  return { ref, cls: state === "armed" ? "is-armed" : state === "live" ? "is-armed is-live" : "" };
}

export function IzSpecTable({
  variant = "ledger",
  label,
  rows,
  groups,
  usLabel = "InstaSafe",
  legacyLabel = "Legacy VPN",
  footNote,
  className,
}: Props) {
  /* ---------------- variant: rail ---------------- */
  const { ref: railRef, cls: railCls } = useScrollReveal<HTMLDivElement>();

  /* ---------------- variant: checklist ---------------- */
  const [ticked, setTicked] = useState<Set<number>>(() => new Set());
  const [filter, setFilter] = useState("all");
  const [copied, setCopied] = useState(false);

  const toggle = useCallback((i: number) => {
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<string, { row: SpecRow; i: number }[]>();
    rows.forEach((row, i) => {
      const g = row.group ?? "";
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push({ row, i });
    });
    return [...map.entries()];
  }, [rows]);

  const copyShortlist = async () => {
    const picked = [...ticked]
      .sort((a, b) => a - b)
      .map((i) => `· ${rows[i].key}: ${rows[i].value}`);
    try {
      await navigator.clipboard.writeText(picked.length ? picked.join("\n") : "(nothing marked yet)");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked — the visible tick state is still the answer */
    }
  };

  const root = className ? `izst izst--${variant} ${className}` : `izst izst--${variant}`;

  /* ============================ RAIL ============================ */
  if (variant === "rail") {
    return (
      <div className={root}>
        <Head label={label} />
        <div ref={railRef} className={`izst-rail ${railCls}`}>
          <span className="izst-spine" aria-hidden="true" />
          <ul className="izst-rail-list">
            {rows.map((r, i) => {
              const RowIcon = r.icon;
              return (
                <li key={r.key} className="izst-rail-row" style={{ ["--i" as string]: i }}>
                  <span className="izst-node" aria-hidden="true">
                    {RowIcon ? <RowIcon size={16} weight="duotone" /> : <b />}
                  </span>
                  <span className="izst-rail-k">{r.key}</span>
                  <span className="izst-rail-v">
                    {r.value}
                    {r.note && <em>{r.note}</em>}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        {footNote && <p className="izst-foot-note">{footNote}</p>}
      </div>
    );
  }

  /* ============================ VERSUS ============================ */
  if (variant === "versus") {
    const diffCount = rows.filter((r) => r.diff).length;
    return (
      <div className={root}>
        <Head label={label} />
        <div className="izst-vs-head" aria-hidden="true">
          <span />
          <span className="izst-vs-us">{usLabel}</span>
          <span>{legacyLabel}</span>
        </div>
        <ul className="izst-vs-list">
          {rows.map((r) => (
            <li key={r.key} className={`izst-vs-row${r.diff ? " is-diff" : ""}`}>
              <span className="izst-vs-k">
                {r.diff && (
                  <i className="izst-diff" aria-label="architectural difference">
                    ▸
                  </i>
                )}
                {r.key}
              </span>
              <span className="izst-vs-v izst-vs-v--us" data-label={usLabel}>
                {r.value}
              </span>
              <span className="izst-vs-v izst-vs-v--old" data-label={legacyLabel}>
                {r.legacyValue}
              </span>
            </li>
          ))}
        </ul>
        <div className="izst-foot">
          <span>
            <b>▸</b> marks the {diffCount} rows where the architectures differ, not the wording
          </span>
        </div>
      </div>
    );
  }

  /* ============================ CHECKLIST ============================ */
  if (variant === "checklist") {
    return (
      <div className={root}>
        <Head label={label}>
          {groups && groups.length > 0 && (
            <div className="izst-chips" role="group" aria-label="Filter specs">
              <button
                type="button"
                className="izst-chip"
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
              >
                all
              </button>
              {groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className="izst-chip"
                  aria-pressed={filter === g.id}
                  onClick={() => setFilter(g.id)}
                >
                  {g.label}
                </button>
              ))}
            </div>
          )}
        </Head>

        {grouped.map(([g, items]) => {
          if (filter !== "all" && g !== filter) return null;
          return (
            <div key={g || "ungrouped"}>
              {g && <div className="izst-grp">{g}</div>}
              <ul className="izst-list">
                {items.map(({ row, i }) => {
                  const on = ticked.has(i);
                  return (
                    <li key={row.key}>
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        className="izst-row"
                        onClick={() => toggle(i)}
                      >
                        <span className="izst-tick" aria-hidden="true">
                          {on ? "✓" : "□"}
                        </span>
                        <span className="izst-k">{row.key}</span>
                        <span className="izst-v">{row.value}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}

        <div className="izst-foot">
          <span>
            <b>{ticked.size}</b> of {rows.length} marked
          </span>
          <button type="button" className="izst-link" onClick={copyShortlist}>
            {copied ? "copied" : "copy my shortlist"}
          </button>
          {ticked.size > 0 && (
            <button type="button" className="izst-link" onClick={() => setTicked(new Set())}>
              clear
            </button>
          )}
          <span className="izst-foot-hint">
            {footNote ?? "tick what your evaluation actually needs — take it into the demo"}
          </span>
        </div>
      </div>
    );
  }

  /* ============================ LEDGER ============================ */
  return (
    <div className={root}>
      <Head label={label} />
      <ul className="izst-list izst-list--flat">
        {rows.map((r) => (
          <li key={r.key}>
            <div className="izst-row izst-row--static">
              <span className="izst-k">{r.key}</span>
              <span className="izst-v">{r.value}</span>
            </div>
          </li>
        ))}
      </ul>
      {footNote && <p className="izst-foot-note">{footNote}</p>}
    </div>
  );
}
