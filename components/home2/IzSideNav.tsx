"use client";

import { useEffect, useState } from "react";

/* ============================================================
   00bb · IzSideNav — in-page section nav as a right-edge rail.

   Replaces the horizontal sub-nav bar. That bar sat under a
   transparent site nav with its own opaque background (two stacked
   bars reading as two different systems) and spent a full band of
   vertical space on navigation nobody asked for.

   This spends none. Collapsed it is a slim orange blade on the
   right edge with one tick per section and a longer marker on the
   current one — position without labels. Hover or keyboard focus
   slides the labels out; the blade is trapezoidal so it reads as a
   tab attached to the edge rather than a floating pill.

   ▸ REUSE ◂ built for every page with sections worth jumping
   between. Pass `items`; it tracks the active one itself.
   Hidden below 900px — a fixed side rail on a phone is noise.
   ============================================================ */

export type SideNavItem = { id: string; label: string };

export function IzSideNav({ items }: { items: SideNavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      let best = items[0]?.id;
      for (const it of items) {
        const el = document.getElementById(it.id);
        /* the section that has most recently crossed the reading line */
        if (el && el.getBoundingClientRect().top - 160 <= 0) best = it.id;
      }
      setActive((p) => (p === best ? p : best));
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  return (
    <nav className="izsn" aria-label="On this page">
      <ul className="izsn-blade">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a href={`#${it.id}`} className={on ? "on" : undefined} aria-current={on ? "true" : undefined}>
                <span className="izsn-label">{it.label}</span>
                <i className="izsn-tick" aria-hidden="true" />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
