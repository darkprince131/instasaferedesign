"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* ============================================================
   00bc · IzFindTheFlaw — find the error → breach → contained.

   Three acts on ONE stage, which is the whole point: the config
   the visitor read in act 1 is still on screen in act 3, rewritten.
   The argument is the diff, not a second diagram.

   Act 1  a real-looking VPN gateway config. Eight lines, one flaw.
          Every wrong pick answers back with why it is NOT the flaw —
          the decoys teach as much as the answer does.
   Act 2  the flaw executes. Reach spreads across the estate sample
          from the entry host, tile by tile, with the log tape
          writing what the attacker did at each step.
   Act 3  the same theft, same timestamps, on ZTNA. One line of the
          config is rewritten; the map goes to one tile.

   NEVER A GATE: act 1 carries a "show me" button from the first
   frame. Nobody has to play to read the page.

   MOTION CONTRACT: no keyframe fill modes, no blanket timers. Every
   un-animated state is already the finished state, so reduced motion
   and a stalled timer both land on a correct still.
   ============================================================ */

type Line = {
  n: string;
  k: string;
  v: string;
  c?: string;
  /** why this line is not the flaw — shown when it is picked */
  why?: string;
  flaw?: boolean;
};

const CONF: Line[] = [
  { n: "01", k: "proto", v: "udp", why: "Transport choice. UDP is the right pick for a tunnel and had nothing to do with how far the attacker got." },
  { n: "02", k: "port", v: "1194", why: "The published port. Moving it to something obscure hides nothing from a scanner — and it is not what let anyone roam." },
  { n: "03", k: "auth", v: "ldaps://ad.corp.local", why: "Directory auth over TLS. It worked exactly as configured: it authenticated the person whose password had been phished." },
  { n: "04", k: "mfa", v: "required", c: "push approval", why: "MFA was required, and it was satisfied. The user tapped approve on a push they did not start. A second factor gates the door — it does not shrink the room behind it." },
  {
    n: "05",
    k: 'push "route"',
    v: "10.0.0.0 255.0.0.0",
    c: "to every client",
    flaw: true,
  },
  { n: "06", k: "cipher", v: "AES-256-GCM", why: "Strong, current, correctly chosen. Encryption was never the problem — the attacker was inside the tunnel, not listening to it." },
  { n: "07", k: "idle-timeout", v: "8h", why: "Generous, worth tightening. But a shorter timeout only shortens the window; it does not change what is reachable inside it." },
  { n: "08", k: "verb", v: "3", c: "log level", why: "Logging verbosity. It changes what you can reconstruct afterwards, not what the session could touch at the time." },
];

const FLAW_I = CONF.findIndex((l) => l.flaw);

/* ---------- estate sample: 6 × 5 ---------- */
type Cell = { ip: string; name?: string };
const COLS = 6;
const CELLS: Cell[] = [
  { ip: "10.44.7.19", name: "r.mehta" },
  { ip: "10.44.7.0" },
  { ip: "10.44.9.0" },
  { ip: "10.12.4.0" },
  { ip: "10.4.12.9", name: "FIN$" },
  { ip: "10.4.12.0" },

  { ip: "10.18.2.0" },
  { ip: "10.6.30.0" },
  { ip: "10.21.8.0" },
  { ip: "10.3.14.0" },
  { ip: "10.9.3.31", name: "DC01" },
  { ip: "10.9.3.0" },

  { ip: "10.11.5.0" },
  { ip: "10.2.90.0" },
  { ip: "10.31.1.0" },
  { ip: "10.55.6.0" },
  { ip: "10.5.1.40", name: "ERP-CORE" },
  { ip: "10.5.1.0" },

  { ip: "10.72.4.0" },
  { ip: "10.19.11.0" },
  { ip: "10.7.0.14", name: "BACKUP$" },
  { ip: "10.7.0.0" },
  { ip: "10.28.3.0" },
  { ip: "10.40.16.0" },

  { ip: "10.13.7.0" },
  { ip: "10.60.2.0" },
  { ip: "10.8.44.0" },
  { ip: "10.33.9.0" },
  { ip: "10.16.20.0" },
  { ip: "10.99.1.0" },
];
const ERP_I = CELLS.findIndex((c) => c.name === "ERP-CORE");

/* spread order: nearest-first from the entry host. Computed once, so the
   cascade always crawls outward instead of popping at random. */
const ORDER: number[] = CELLS.map((_, i) => i).sort((a, b) => {
  const d = (i: number) => Math.hypot((i % COLS) - 0, Math.floor(i / COLS) - 0);
  return d(a) - d(b);
});

/* ---------- log tape: same clock in both acts, opposite outcomes ---------- */
type Tap = { t: string; src: string; body: string; at: number; bad?: boolean; good?: boolean };

const TAPE_BREACH: Tap[] = [
  { t: "09:41:02", src: "vpn0", body: "session up · user=r.mehta · ip=10.44.7.19", at: 0 },
  { t: "09:41:02", src: "route", body: "10.0.0.0/8 installed on client · 16,777,216 addresses", at: 0.06, bad: true },
  { t: "09:41:11", src: "arp", body: "sweep 10.44.0.0/16 → 1,004 hosts answered", at: 0.24, bad: true },
  { t: "09:41:40", src: "smb", body: "10.4.12.9:445 · FIN$ · read ok", at: 0.46, bad: true },
  { t: "09:42:06", src: "rdp", body: "10.9.3.31:3389 · DC01 · logon ok", at: 0.68, bad: true },
  { t: "09:44:52", src: "smb", body: "10.7.0.14:445 · BACKUP$ · delete", at: 0.88, bad: true },
];

const TAPE_HELD: Tap[] = [
  { t: "09:41:02", src: "ztna", body: "session up · user=r.mehta · device=WIN-8842 (bound)", at: 0 },
  { t: "09:41:02", src: "policy", body: "grant erp-core.corp:8443 — one resource", at: 0, good: true },
  { t: "09:41:11", src: "arp", body: "sweep 10.44.0.0/16 → no route, no reply", at: 0, good: true },
  { t: "09:41:40", src: "smb", body: "10.4.12.9:445 · no route to host", at: 0, good: true },
  { t: "09:42:06", src: "rdp", body: "10.9.3.31:3389 · no route to host", at: 0, good: true },
  { t: "09:44:52", src: "audit", body: "0 resources reached beyond policy", at: 0, good: true },
];

const TOTAL = CELLS.length;
const STEP = 105; // ms per tile — slow enough to watch it crawl

export function IzFindTheFlaw({ className }: { className?: string }) {
  const [act, setAct] = useState<1 | 2 | 3>(1);
  const [wrong, setWrong] = useState<number[]>([]);
  const [note, setNote] = useState<number | null>(null);
  const [hit, setHit] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  useEffect(() => clear, [clear]);

  const reduced = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const runBreach = useCallback(() => {
    clear();
    setAct(2);
    /* the ruled-out strikethroughs belong to act 1 only — left on, they
       read as part of the act-3 diff */
    setWrong([]);
    if (reduced()) {
      setHit(TOTAL);
      return;
    }
    setHit(1);
    for (let i = 1; i < TOTAL; i++) {
      timers.current.push(setTimeout(() => setHit(i + 1), i * STEP));
    }
  }, [clear]);

  const pick = (i: number) => {
    if (act !== 1) return;
    setNote(i);
    if (CONF[i].flaw) {
      clear();
      timers.current.push(setTimeout(runBreach, reduced() ? 0 : 1200));
      return;
    }
    setWrong((w) => (w.includes(i) ? w : [...w, i]));
  };

  const reset = () => {
    clear();
    setAct(1);
    setWrong([]);
    setNote(null);
    setHit(0);
  };

  const contain = () => {
    clear();
    setAct(3);
  };

  const found = note === FLAW_I;
  const progress = hit / TOTAL;
  const tape = act === 3 ? TAPE_HELD : TAPE_BREACH;
  const shownTape = act === 1 ? [] : act === 3 ? TAPE_HELD : tape.filter((l) => progress >= l.at);
  const reach = act === 3 ? 1 : act === 2 ? hit : 0;

  const cellState = (i: number) => {
    if (act === 3) return i === ERP_I ? "allow" : "dead";
    if (act === 1) return i === 0 ? "client" : "idle";
    const rank = ORDER.indexOf(i);
    if (rank < hit) return i === 0 ? "client-hit" : "hit";
    return i === 0 ? "client" : "idle";
  };

  return (
    <div className={`izftf${className ? ` ${className}` : ""}`} data-act={act}>
      {/* ---------- act rail ---------- */}
      <div className="izftf-head">
        <ol className="izftf-acts">
          {["Find the error", "Breach", "Contained"].map((label, i) => (
            <li key={label} className={`izftf-act${act === i + 1 ? " is-on" : ""}${act > i + 1 ? " is-done" : ""}`}>
              <b>{i + 1}</b>
              <span>{label}</span>
            </li>
          ))}
        </ol>
        <button type="button" className="izftf-reset" onClick={reset} disabled={act === 1 && !note}>
          Reset
        </button>
      </div>

      <div className="izftf-body">
        {/* ---------- the config ---------- */}
        <div className="izftf-conf">
          <div className="izftf-file">
            <i aria-hidden="true">{act === 3 ? "◇" : ">_"}</i>
            {act === 3 ? "instasafe-gw:/policy/r.mehta.conf" : "vpn-gw-01:/etc/openvpn/access.conf"}
          </div>

          <ul className="izftf-lines">
            {CONF.map((l, i) => {
              const isFlaw = i === FLAW_I;
              const cls = [
                "izftf-line",
                wrong.includes(i) ? "is-wrong" : "",
                isFlaw && act > 1 ? "is-flaw" : "",
                isFlaw && act === 3 ? "is-struck" : "",
                note === i ? "is-note" : "",
              ]
                .filter(Boolean)
                .join(" ");
              return (
                <li key={l.n}>
                  <button
                    type="button"
                    className={cls}
                    onClick={() => pick(i)}
                    disabled={act !== 1}
                    aria-pressed={note === i}
                    aria-label={`Line ${l.n}: ${l.k} ${l.v}`}
                  >
                    <span className="izftf-n">{l.n}</span>
                    <span className="izftf-k">{l.k}</span>
                    <span className="izftf-v">{l.v}</span>
                    {l.c && <span className="izftf-c"># {l.c}</span>}
                  </button>
                  {isFlaw && act === 3 && (
                    <span className="izftf-new">
                      <span className="izftf-n" aria-hidden="true">
                        +
                      </span>
                      <span className="izftf-k">resource</span>
                      <span className="izftf-v">erp-core.corp:8443</span>
                      <span className="izftf-c"># one resource, policy-checked</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="izftf-hint">
            {act === 1
              ? "Eight lines from a working VPN gateway. One of them is why a single phished password became a company-wide incident. Pick it."
              : act === 2
                ? "One line hands every connected client a route to 10.0.0.0/8 — every subnet in the estate. The credential was for one ERP account. The route was for the whole company."
                : "Same user, same stolen password, same device. The route is gone: a session is issued to one named resource and nothing else exists to ask for."}
          </p>
        </div>

        {/* ---------- the stage ---------- */}
        <div className="izftf-stage">
          <div className="izftf-count" aria-live="polite">
            <span className="izftf-count-k">Systems reachable from that session</span>
            <b className={act === 3 ? "is-held" : act === 2 ? "is-bad" : ""}>
              {reach}
              <i>/ {TOTAL}</i>
            </b>
          </div>

          <div className="izftf-map" role="img" aria-label={`Estate sample: ${reach} of ${TOTAL} systems reachable`}>
            {CELLS.map((c, i) => (
              /* every cell carries both lines so the grid keeps one baseline —
                 named systems put the name on top, subnets put the mask */
              <span key={c.ip} className={`izftf-cell is-${cellState(i)}${c.name ? " is-named" : ""}`}>
                <em>{c.name ?? c.ip}</em>
                <u>{c.name ? c.ip : "/24"}</u>
              </span>
            ))}
          </div>

          {/* act 1 answers back; acts 2–3 write the tape */}
          {act === 1 ? (
            <div className={`izftf-note${note !== null ? " is-on" : ""}`} aria-live="polite">
              {note === null ? (
                <p className="izftf-note-idle">
                  Every system above is on the network this gateway connects people to. Nothing has happened yet.
                </p>
              ) : found ? (
                <p className="izftf-note-yes">
                  <b>That is the one.</b> Reading the answer…
                </p>
              ) : (
                <p className="izftf-note-no">
                  <b>Not the flaw.</b> {CONF[note].why}
                </p>
              )}
            </div>
          ) : (
            <ul className="izftf-tape">
              {shownTape.map((l) => (
                <li key={`${l.t}-${l.src}`} className={l.bad ? "is-bad" : l.good ? "is-good" : ""}>
                  <span className="izftf-t">{l.t}</span>
                  <span className="izftf-src">{l.src}</span>
                  <span className="izftf-msg">{l.body}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* ---------- footline ---------- */}
      <div className="izftf-foot">
        <p className="izftf-status" aria-live="polite">
          {act === 1 && (
            <>
              <b>{wrong.length ? `${wrong.length} ruled out.` : "Eight lines."}</b> One of them is the incident.
            </>
          )}
          {act === 2 && (
            <>
              <b>{hit >= TOTAL ? "Whole estate reached." : "Spreading…"}</b> The password bought one account. The
              config handed over the network it sat on.
            </>
          )}
          {act === 3 && (
            <>
              <b>Contained.</b> One session, one resource, and no network to move across — the theft cost exactly
              what it stole.
            </>
          )}
        </p>

        <div className="izftf-cta">
          {act === 1 && (
            <button type="button" className="izftf-btn izftf-btn--ghost" onClick={runBreach}>
              Show me the answer
            </button>
          )}
          {act === 2 && (
            <button type="button" className="izftf-btn izftf-btn--pri" onClick={contain}>
              Run the same theft on ZTNA
            </button>
          )}
          {act === 3 && (
            <>
              <button type="button" className="izftf-btn izftf-btn--ghost" onClick={runBreach}>
                Replay the breach
              </button>
              <a className="izftf-btn izftf-btn--pri" href="/book-a-demo">
                Book a demo
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
