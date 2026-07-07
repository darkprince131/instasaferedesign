"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import {
  UserCircle, Lock, ShieldCheck,
  Desktop, MapPin, Gauge,
  LinkSimple, CheckCircle, VideoCamera,
  ArrowRight,
} from "@phosphor-icons/react";

/* ============================================================
   00y · Access Pipeline — left hero copy + 3-stage ZTNA
   flowchart. Orange pulse cycles col 1 → 2 → 3 → 1 forever;
   never stops on hover.

   ▸ TO EDIT THE FLOWCHART ◂
   Change only the STAGES array below. Each stage object:
     { id, label, count, cards[] }
   Each card object:
     { id, icon: <PhosphorIcon weight="regular" />, label, sub }
   Add / remove cards in any stage — layout reflows automatically.
   Card icon  → any Phosphor icon
   Card label → primary text (~20 chars)
   Card sub   → supporting note (~25 chars)
   Stage count→ shown in the column header badge
   ============================================================ */

interface PCard  { id: string; icon: ReactNode; label: string; sub: string; }
interface PStage { id: string; label: string; count: string; cards: PCard[]; }

/* ── EDIT START ─────────────────────────────────────────────────────────── */
const STAGES: PStage[] = [
  {
    id: "auth", label: "Authenticate", count: "3 checks",
    cards: [
      { id: "creds",  icon: <UserCircle weight="regular" />,  label: "User credentials",   sub: "SSO · SAML · OIDC"    },
      { id: "mfa",    icon: <Lock weight="regular" />,         label: "MFA verified",        sub: "Push · TOTP · FIDO2"  },
      { id: "idconf", icon: <ShieldCheck weight="regular" />,  label: "Identity confirmed",  sub: "Directory sync"       },
    ],
  },
  {
    id: "inspect", label: "Inspect", count: "4 checks",
    cards: [
      { id: "posture", icon: <Desktop weight="regular" />, label: "Device posture",     sub: "25 checks · all OSes"   },
      { id: "geo",     icon: <MapPin weight="regular" />,  label: "Geo & time policy",  sub: "Allowlist enforced"     },
      { id: "risk",    icon: <Gauge weight="regular" />,   label: "Risk score",         sub: "Continuous evaluation"  },
    ],
  },
  {
    id: "connect", label: "Connect", count: "Granted",
    cards: [
      { id: "sdp",    icon: <LinkSimple weight="regular" />,  label: "SDP tunnel open",    sub: "Zero exposed ports"   },
      { id: "grant",  icon: <CheckCircle weight="regular" />, label: "App access granted", sub: "Per-app, per-session"  },
      { id: "record", icon: <VideoCamera weight="regular" />, label: "Session recorded",   sub: "RDP · SSH · VNC"      },
    ],
  },
];
/* ── EDIT END ───────────────────────────────────────────────────────────── */

const N      = STAGES.length;
const HOLD   = 2200; /* ms — how long active column stays lit before pulse fires */
const TRAVEL = 900;  /* ms — pulse travel time; must match CSS @keyframes ap-travel duration */

export function AccessPipeline() {
  const reduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const [active,  setActive]  = useState(0);
  const [pulsing, setPulsing] = useState<number | null>(null); /* connector index 0 or 1 currently firing */
  const activeRef = useRef(0); /* ref keeps interval closure stale-free */

  useEffect(() => {
    if (reduced) return;
    let tid: ReturnType<typeof setTimeout>;
    const id = setInterval(() => {
      const curr = activeRef.current;
      /* fire the connector leaving curr toward the next column */
      setPulsing(curr);
      tid = setTimeout(() => {
        const next = (curr + 1) % N;
        setActive(next);
        activeRef.current = next;
        setPulsing(null);
      }, TRAVEL);
    }, HOLD + TRAVEL);
    return () => { clearInterval(id); clearTimeout(tid); };
  }, [reduced]);

  return (
    <div className="ap">

      {/* ── LEFT: hero copy ──────────────────────────────── */}
      <div className="ap-left">
        <span className="ap-ey">Zero Trust Access</span>
        <h2 className="ap-hl">Every request verified.<br /><em>Every time.</em></h2>
        <p className="ap-sub">
          No VPN. No exposed ports. InstaSafe ZTNA checks identity, device
          health and policy on every connection — and opens an encrypted
          direct tunnel only when all checks pass.
        </p>

        {/* step chips mirror active column */}
        <div className="ap-steps">
          {STAGES.map((s, i) => (
            <div className={`ap-step${active === i ? " on" : ""}`} key={s.id}>
              <span className="ap-step-num">{i + 1}</span>
              <span className="ap-step-lbl">{s.label}</span>
            </div>
          ))}
        </div>

        <a className="ap-link" href="/zero-trust-network-access">
          How it works <ArrowRight weight="bold" />
        </a>
      </div>

      {/* ── RIGHT: 3-column flowchart board ─────────────── */}
      <div className="ap-right">
        <div className="ap-board">
          {STAGES.map((stage, i) => (
            <Fragment key={stage.id}>

              {/* ── COLUMN ── */}
              <div className={`ap-col${active === i ? " active" : " inactive"}`}>
                <div className="ap-col-h">
                  <span className="ap-col-label">{stage.label}</span>
                  <span className="ap-col-count">{stage.count}</span>
                </div>
                <div className="ap-col-body">
                  {stage.cards.map(card => (
                    <div className="ap-card" key={card.id}>
                      <span className="ap-card-ic">{card.icon}</span>
                      <div className="ap-card-txt">
                        <span className="ap-card-label">{card.label}</span>
                        <span className="ap-card-sub">{card.sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── CONNECTOR (between columns, not after last) ── */}
              {i < N - 1 && (
                <div
                  className={`ap-connector${active === i ? " lit" : ""}${pulsing === i ? " pulsing" : ""}`}
                  aria-hidden="true"
                >
                  <span className="ap-conn-line" />
                  <span className="ap-conn-dot" />
                </div>
              )}

            </Fragment>
          ))}
        </div>
      </div>

    </div>
  );
}
