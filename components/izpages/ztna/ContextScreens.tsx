"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IzMiniDesktop } from "@/components/home2/IzMiniDesktop";

/* ============================================================
   Context-control screens for the ZTNA page's "Context controls"
   FeatureSplit, replacing the four `policy.*.json` blobs.

   These are NOT new artwork. They are the same live endpoint screen
   the Control surface section runs (`IzMiniDesktop`, `context`
   script) — the one that plays a real session being decided and
   ends on a verdict toast. Reusing it is the point: a visitor who
   has seen the control surface should recognise this screen
   immediately, and the four conditions should differ only in the
   verdict they produce, because that is the only thing that
   actually differs.

   A JSON blob proves the setting exists. This proves what happens
   to a session when the setting is hit.

   Each screen owns its own loop: the script replays in place rather
   than advancing, and pauses entirely while off-screen. `cycle` is
   the replay trigger — IzMiniDesktop must NOT be remounted to
   restart, since unmounting drops it out of layout for a frame and
   the whole panel jumps.
   ============================================================ */

type Verdict = { tone: "info" | "danger"; title: string; sub: string };

function ContextScreen({ verdict }: { verdict: Verdict }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle] = useState(0);

  /* off-screen the loop is pure battery cost, and a visitor arriving
     mid-scenario has no idea what they missed */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((es) => setInView(es[0].isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onEnd = useCallback(() => setCycle((c) => c + 1), []);

  return (
    <div className="izcx" ref={ref}>
      <IzMiniDesktop scriptId="context" verdict={verdict} playing={inView} cycle={cycle} onEnd={onEnd} />
    </div>
  );
}

/* The four conditions, as verdicts. Same session, same screen — only
   the reason it is stopped changes, which is exactly the section's
   claim that all four are one decision. */

export function GeoScreen() {
  return (
    <ContextScreen
      verdict={{
        tone: "danger",
        title: "Access denied · outside permitted geography",
        sub: "Request origin PH · policy IN only",
      }}
    />
  );
}

export function IpScreen() {
  return (
    <ContextScreen
      verdict={{
        tone: "info",
        title: "Step-up challenge · outside permitted IP range",
        sub: "10.90.4.12 · policy allows 10.4.0.0/16",
      }}
    />
  );
}

export function TimeScreen() {
  return (
    <ContextScreen
      verdict={{
        tone: "danger",
        title: "Access denied · outside the permitted window",
        sub: "21:40 IST · window 09:00–18:00",
      }}
    />
  );
}

export function ExpiryScreen() {
  return (
    <ContextScreen
      verdict={{
        tone: "danger",
        title: "Access revoked · contract expired",
        sub: "Expired 2026-09-30 · every resource withdrawn",
      }}
    />
  );
}
