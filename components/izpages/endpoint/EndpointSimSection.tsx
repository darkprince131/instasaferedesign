"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Browsers, Clipboard, Drop, LockSimple, Monitor, ShieldCheck, Timer, WifiHigh } from "@phosphor-icons/react";

/* ============================================================
   EndpointSimSection — the heading block, the lazy gate and the
   still that stands in for the desktop until it is worth loading.

   WHY THE STILL EXISTS. The simulator is a stateful client component
   with a timer, four windows' worth of markup and its own sheet, and
   it lives four folds down. Shipping it in the initial HTML would put
   a live desktop on the critical path of a page whose LCP element is
   a completely different scene at the top. So:

     1. `next/dynamic({ ssr: false })` keeps it out of the server HTML
        and out of the first bundle.
     2. An IntersectionObserver with a 400px root margin decides when
        to fetch it — the chunk starts downloading as the section
        approaches, so by the time it is on screen it is usually
        already mounted.
     3. Until then this still holds the space. It is the SAME shell,
        the SAME rail markup and the SAME screen, painted by the same
        sheet — which is how the reserved height matches the live
        component exactly rather than approximately. Nothing here
        moves when the swap happens except the desktop icons becoming
        clickable.

   NO TIMER RUNS UNTIL THE SIMULATOR IS BOTH MOUNTED (visible) AND the
   reader has switched the inactivity control on. The still has no
   timers at all.

   ------------------------------------------------------------
   DESKTOP ONLY, DELIBERATELY (client scope call).

   The simulator depicts a WINDOWS DESKTOP with overlapping windows,
   a taskbar, hover states and a right-hand notification corner. On a
   phone it is either a diagram of a desktop too small to read or a
   different product entirely, and the client's decision is that it
   should simply not be there — the six cards above already carry the
   whole argument in their static resolved frames.

   So the section is hidden two ways, and both matter:

     · CSS hides `.ep-sec--sim` under DESKTOP_Q. That covers the
       server HTML, so a phone never paints the heading or the still
       even for a frame, and there is no layout to shift.
     · This component checks the SAME query before it ever creates
       the IntersectionObserver, so the lazy chunk is not even
       fetched on a phone. Hiding alone would still have downloaded
       and mounted a live desktop nobody can see.

   The query is watched rather than read once, so a desktop browser
   dragged narrow and back again ends up in the right state.
   ============================================================ */

/** the one place the desktop-only rule is written in JS. Its twin
    lives at the foot of endpointsim.css and the two must agree. */
const DESKTOP_Q = "(min-width: 920px) and (pointer: fine)";

const LiveSim = dynamic(() => import("./EndpointSim").then((m) => m.EndpointSim), {
  ssr: false,
  loading: () => <SimStill />,
});

/* the same six, in the same order, as the live rail. Duplicated as a
   flat list rather than imported so the still cannot pull the
   simulator's module into the initial chunk. */
const STILL_CONTROLS: [label: string, desc: string, Ico: typeof Clipboard][] = [
  ["Clipboard controls", "Copy, paste and clipboard access are refused inside the session.", Clipboard],
  ["Watermark protection", "An identity overlay is rendered over everything on screen.", Drop],
  ["Network filter", "Named domains stop resolving for the life of the session.", WifiHigh],
  ["App filter", "Named local applications cannot launch while this session runs.", Monitor],
  ["Chrome control", "Developer tools, downloads and printing are switched off.", Browsers],
  ["Inactivity timeout", "An idle session counts down and then disconnects itself.", Timer],
];

/* the same four desktop icons the live desktop draws, in the same
   order and at the same sizes. Real marks out of /public/apps — the
   still and the simulator have to be the same picture, or the swap is
   visible. */
const MARK = "/brand/instasafe-mark-color.svg";
const STILL_ICONS: [label: string, src: string, size: number, cls: string][] = [
  ["InstaSafe", MARK, 22, " eps-di-tile--brand"],
  ["Q3-vendors", "/apps/notepad-64.webp", 30, ""],
  ["Chrome", "/apps/chrome-64.webp", 30, ""],
  ["anydesk.exe", "/apps/anydesk-64.webp", 30, ""],
];

function SimStill() {
  return (
    <div className="eps-shell is-still" aria-hidden="true">
      <div className="eps-rail">
        <div className="eps-railhead">
          <span className="eps-railttl">
            <LockSimple size={11} weight="bold" />
            Admin console
          </span>
          <span className="eps-count">0 active</span>
        </div>

        <div className="eps-group">
          <p className="eps-grouplab">Data loss prevention</p>
          {STILL_CONTROLS.slice(0, 2).map(([label, desc, Ico]) => (
            <span className="eps-ctl" key={label}>
              <span className="eps-ctl-ic">
                <Ico size={15} weight="regular" />
              </span>
              <span className="eps-ctl-tx">
                <b>{label}</b>
                <em>{desc}</em>
              </span>
              <span className="eps-sw">
                <i />
              </span>
            </span>
          ))}
        </div>

        <div className="eps-group">
          <p className="eps-grouplab">Session and application</p>
          {STILL_CONTROLS.slice(2).map(([label, desc, Ico]) => (
            <span className="eps-ctl" key={label}>
              <span className="eps-ctl-ic">
                <Ico size={15} weight="regular" />
              </span>
              <span className="eps-ctl-tx">
                <b>{label}</b>
                <em>{desc}</em>
              </span>
              <span className="eps-sw">
                <i />
              </span>
            </span>
          ))}
        </div>

        <p className="eps-railfoot">Every one of these decisions is one of 202 logged event types.</p>
      </div>

      <div className="eps-stagewrap">
        <div className="eps-screen">
          <span className="eps-wall" />
          <div className="eps-icons">
            {STILL_ICONS.map(([label, src, size, cls]) => (
              <span className="eps-di" key={label}>
                <span className={`eps-di-tile${cls}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="eps-appico" src={src} width={size} height={size} alt="" draggable={false} />
                </span>
                <span className="eps-di-l">{label}</span>
              </span>
            ))}
          </div>

          <div className="eps-taskbar">
            <div className="eps-tbc">
              <span className="eps-tbtn eps-tbtn--pin">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="eps-appico" src={MARK} width={15} height={15} alt="" draggable={false} />
              </span>
              <span className="eps-tbtn">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="eps-appico" src="/apps/file-explorer-48.webp" width={17} height={17} alt="" draggable={false} />
              </span>
              <span className="eps-tbtn">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="eps-appico" src="/apps/chrome-64.webp" width={17} height={17} alt="" draggable={false} />
              </span>
            </div>
            <div className="eps-tray">
              <span className="eps-trayi">
                <WifiHigh size={12} weight="regular" />
              </span>
              <span className="eps-trayi">
                <ShieldCheck size={12} weight="regular" />
              </span>
              <span className="eps-clock">
                <b>10:42</b>
                <em>18-08-2026</em>
              </span>
            </div>
          </div>

          <p className="eps-boot">loading the live desktop…</p>
        </div>

        <p className="eps-hint">
          Flip a control on the left and the desktop tells you what to try next — the hint names the action and the
          target pulses. Controls stack: watermarking stays on while the clipboard is refused and a domain is denied.
        </p>
      </div>
    </div>
  );
}

export function EndpointSimSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [wide, setWide] = useState(false);

  /* gate one: is this a machine the simulator is for at all */
  useEffect(() => {
    const mq = window.matchMedia?.(DESKTOP_Q);
    if (!mq) return;
    setWide(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setWide(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* gate two: and is it close enough to be worth fetching. Only ever
     armed once gate one has passed, so a phone makes no observer and
     therefore never requests the chunk. */
  useEffect(() => {
    if (!wide) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [wide]);

  return (
    <section className="ep-sec ep-sec--sim" id="simulator">
      <div className="iz-wrap">
        <div className="ep-head">
          <span className="iz-ey">The controls, live</span>
          <h2>
            Try them <em>yourself</em>.
          </h2>
          <p>
            This is a real desktop, not a video. Turn a control on in the admin console and then attempt the thing it
            governs — the session answers the way it would on a laptop nobody in IT has ever touched.
          </p>
        </div>

        <div className="eps-hold" ref={ref}>
          {near ? <LiveSim /> : <SimStill />}
        </div>
      </div>
    </section>
  );
}
