"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Fingerprint,
  IdentificationCard,
  Key,
  Lightning,
  ShieldCheck,
  UsersThree,
  type Icon,
} from "@phosphor-icons/react";

type Panel = { id: string; title: string; tag: string; Icon: Icon; accent: string; points: string[] };
const PANELS: Panel[] = [
  { id: "auth", title: "Authentication", tag: "Eight ways to prove identity, from legacy directories to passwordless.", Icon: Key, accent: "var(--accent-blue)", points: ["Local", "AD + Kerberos", "OpenLDAP", "RADIUS", "SAML", "OAuth2", "OpenID", "Passwordless"] },
  { id: "directory", title: "Directory sync", tag: "Pull users from the directories you already run — kept in step automatically.", Icon: UsersThree, accent: "var(--accent-teal)", points: ["Azure AD / Entra", "Google Workspace", "SCIM", "Full AD bind", "LDAP filter", "SSL / TLS"] },
  { id: "mfa", title: "MFA", tag: "Six factors, including phishing-resistant and offline OS login.", Icon: Fingerprint, accent: "var(--accent-green)", points: ["TOTP", "FIDO2", "Push", "Certificate", "Backup codes", "OS MFA"] },
  { id: "sso", title: "SSO", tag: "One login unlocks every app — desktop SSO included.", Icon: Lightning, accent: "var(--accent-orange)", points: ["SAML 2.0", "OAuth 2.0", "OIDC", "Desktop SSO", "Kerberos"] },
  { id: "idp", title: "InstaSafe as an IdP", tag: "Don't just consume identity — issue it to everything downstream.", Icon: IdentificationCard, accent: "var(--accent-purple)", points: ["SCIM Export", "SAML IdP", "OAuth2 Service", "OpenID Provider", "RADIUS Service"] },
  { id: "access", title: "Risk-based access", tag: "Every request scored on context before it's allowed.", Icon: ShieldCheck, accent: "var(--accent-blue-light)", points: ["21 policy combos", "IP / Geo", "Device posture", "Time windows", "Role"] },
];

function ExpandingPanels() {
  const [active, setActive] = useState(0);
  return (
    <>
      {/* desktop: horizontal expanding accordion */}
      <div className="hidden h-[440px] gap-3 lg:flex">
        {PANELS.map((it, i) => {
          const on = active === i;
          return (
            <motion.div
              key={it.id}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-label={it.title}
              className="relative min-w-0 cursor-pointer overflow-hidden rounded-3xl border outline-none focus-visible:ring-2"
              style={{ flexBasis: 0, borderColor: on ? it.accent : "var(--hairline)", background: on ? "var(--bg-card)" : "var(--surface-faint)" }}
              animate={{ flexGrow: on ? 3.4 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            >
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-3xl" style={{ background: it.accent, opacity: on ? 0.18 : 0.07, transition: "opacity .4s" }} />
              {/* collapsed face */}
              <div className="absolute inset-0 flex flex-col items-center justify-between p-4 transition-opacity duration-300" style={{ opacity: on ? 0 : 1 }}>
                <it.Icon size={26} weight="duotone" style={{ color: it.accent }} />
                <span className="text-base font-bold tracking-tight" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "var(--text-secondary)" }}>{it.title}</span>
                <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              {/* expanded face */}
              <div className="absolute inset-0 flex flex-col justify-between p-7 transition-opacity duration-300" style={{ opacity: on ? 1 : 0, pointerEvents: on ? "auto" : "none" }}>
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "color-mix(in srgb, " + it.accent + " 14%, transparent)" }}>
                    <it.Icon size={28} weight="duotone" style={{ color: it.accent }} />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold tracking-tight">{it.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">{it.tag}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {it.points.map((p) => (
                    <span key={p} className="rounded-full border border-[var(--hairline)] bg-[var(--surface-faint)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">{p}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* mobile: stacked cards */}
      <div className="space-y-4 lg:hidden">
        {PANELS.map((it) => (
          <div key={it.id} className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface-faint)] p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "color-mix(in srgb, " + it.accent + " 14%, transparent)" }}>
              <it.Icon size={24} weight="duotone" style={{ color: it.accent }} />
            </span>
            <h3 className="mt-4 text-lg font-bold tracking-tight">{it.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{it.tag}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {it.points.map((p) => (
                <span key={p} className="rounded-full border border-[var(--hairline)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

const NUMBERS = [
  ["8", "auth profiles"],
  ["6", "MFA methods"],
  ["11", "report types"],
  ["202", "event types"],
  ["7", "SIEM formats"],
];

export function IamContent() {
  return (
    <div className="relative">
      {/* sub-nav */}
      <div className="sticky top-[4.5rem] z-30 mx-auto mb-4 flex w-fit max-w-[92vw] items-center gap-1 overflow-x-auto rounded-full border border-[var(--hairline)] bg-[var(--glass-bg)] px-2 py-1.5 backdrop-blur-xl">
        {[
          ["Overview", "#top"],
          ["Capabilities", "#capabilities"],
          ["InstaSafe as IdP", "#idp-section"],
          ["By the numbers", "#numbers"],
          ["Demo", "#demo"],
        ].map(([label, href]) => (
          <a key={href} href={href} className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-faint)] hover:text-[var(--text-primary)]">
            {label}
          </a>
        ))}
      </div>

      {/* capabilities — expanding accordion */}
      <section id="capabilities" className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">The Identity Cloud</div>
          <AnimatedText as="h2" text="One engine. Every identity decision." highlight={["identity", "decision."]} className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl" />
          <p className="mt-4 text-pretty text-base leading-relaxed text-[var(--text-secondary)]">
            Hover a pillar to open it. Authentication, directory, MFA, SSO, your own IdP and risk-based access — one console, no add-ons.
          </p>
        </div>
        <div className="mt-12">
          <ExpandingPanels />
        </div>
      </section>

      {/* i365 as an IdP — flow shapes */}
      <section id="idp-section" className="section relative mx-auto max-w-6xl overflow-hidden px-5 lg:px-8">
        <div aria-hidden className="glow-orb left-[10%] top-10 h-72 w-72" style={{ background: "var(--accent-purple)", opacity: 0.12 }} />
        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">InstaSafe as your IdP</div>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">Consume identity. Then <span className="grad-text">issue it.</span></h2>
            <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-[var(--text-secondary)]">
              Pull users in from AD, Entra or Google — then turn around and become the identity provider for everything downstream, speaking every protocol they expect.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["SCIM Export", "SAML IdP", "OAuth2 Service", "OpenID Provider", "RADIUS Service"].map((p) => (
                <span key={p} className="rounded-full border border-[var(--border-accent)] bg-[var(--surface-faint)] px-3 py-1.5 text-xs font-semibold text-[var(--accent-blue-light)]">{p}</span>
              ))}
            </div>
          </div>

          {/* sources → i365 → apps */}
          <Reveal>
            <div className="flex items-center justify-between gap-3 rounded-3xl border border-[var(--hairline)] bg-[var(--surface-faint)] p-6">
              <div className="flex flex-col gap-2">
                {["AD", "Entra", "Google"].map((s) => (
                  <span key={s} className="rounded-lg border border-[var(--hairline)] bg-[var(--bg-card)] px-3 py-2 text-center text-xs font-semibold text-[var(--text-secondary)]">{s}</span>
                ))}
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent" />
              <motion.div
                className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border text-center"
                style={{ borderColor: "var(--accent-purple)", background: "var(--bg-card)", boxShadow: "0 0 40px rgba(139,92,246,.3)" }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <IdentificationCard size={26} weight="duotone" className="text-[var(--accent-purple)]" />
                <span className="mt-1 text-[10px] font-bold">InstaSafe IdP</span>
              </motion.div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--accent-purple)] to-transparent" />
              <div className="flex flex-col gap-2">
                {["Slack", "SAP", "Zoho"].map((s) => (
                  <span key={s} className="rounded-lg border border-[var(--hairline)] bg-[var(--bg-card)] px-3 py-2 text-center text-xs font-semibold text-[var(--text-secondary)]">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* by the numbers */}
      <section id="numbers" className="section relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface-faint)] p-8 lg:p-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {NUMBERS.map((n, i) => (
              <Reveal key={n[1]} delay={i * 0.06} className="text-center">
                <div className="grad-text text-4xl font-bold tracking-tight sm:text-5xl">{n[0]}</div>
                <div className="mt-1 text-xs text-[var(--text-muted)]">{n[1]}</div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-4 border-t border-[var(--hairline)] pt-8 sm:grid-cols-2">
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]"><span className="font-semibold text-[var(--text-primary)]">Reporting.</span> 11 report types and 202 event types stream to 7 SIEM formats — every login, denial and posture change, on the record.</p>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]"><span className="font-semibold text-[var(--text-primary)]">Lifecycle.</span> Inactive users are warned, suspended or removed on schedule; shift windows and auto-suspend close the gaps a joiner-mover-leaver process leaves open.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="relative overflow-hidden py-28">
        <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 18 }} className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10">
            <IdentificationCard size={28} weight="duotone" className="text-[var(--accent-blue-light)]" />
          </motion.div>
          <AnimatedText as="h2" text="Make identity your strongest control." highlight={["strongest", "control."]} className="text-balance text-4xl font-bold tracking-tight sm:text-5xl" />
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]">
            See the Identity Cloud against your own directories and apps — a 30-minute walkthrough, tailored to your stack.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.45 }} className="mt-9 flex justify-center">
            <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]">
              Book a demo
              <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
