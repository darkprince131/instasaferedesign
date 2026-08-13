"use client";

import { AnimatedText } from "@/components/v2/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { BreachLineChart, DeployIllustration } from "./ZtnaArt";
import {
  AppWindow,
  ArrowRight,
  ArrowsOutCardinal,
  Buildings,
  ClockCountdown,
  Door,
  EyeSlash,
  Fingerprint,
  GitBranch,
  ListChecks,
  LockKey,
  Prohibit,
  Pulse,
  ShieldCheck,
  StackSimple,
  type Icon,
} from "@phosphor-icons/react";

const PROBLEMS: { Icon: Icon; h: string; p: string }[] = [
  { Icon: LockKey, h: "Network-wide trust", p: "A VPN drops the user onto the LAN. One login trusts everything behind it — far more than that user needs." },
  { Icon: Door, h: "Exposed ports", p: "VPN concentrators sit on the public internet with open ports, advertising themselves to every scanner." },
  { Icon: ArrowsOutCardinal, h: "Lateral movement", p: "Once inside, a stolen credential moves sideways from system to system. Flat networks don't stop it." },
  { Icon: ClockCountdown, h: "Backhauling", p: "Traffic detours through a distant concentrator before reaching the app — adding latency on every request." },
];

const STEPS: { Icon: Icon; h: string; p: string }[] = [
  { Icon: Fingerprint, h: "Authenticate", p: "Identity, MFA and device posture are verified before any connection is allowed — the network stays dark until then." },
  { Icon: LockKey, h: "Micro-tunnel", p: "A connection opens to exactly one authorized app. No LAN, no subnet, no neighbouring systems." },
  { Icon: Pulse, h: "Monitor", p: "Context is re-checked continuously. If trust changes mid-session, the tunnel closes." },
];

const CAPS: { Icon: Icon; h: string; p: string }[] = [
  { Icon: AppWindow, h: "App-level access · 7 types", p: "FQDN, WEB, RDP, SSH, VNC, DB and WFS. Users reach the application — never the network it lives on." },
  { Icon: ListChecks, h: "21 access-rule combinations", p: "Three source identities × seven destinations. Flip a rule and what a user can reach changes instantly." },
  { Icon: StackSimple, h: "Microsegmentation", p: "App-to-app isolation. A compromise in one workload has nowhere to spread — each is its own segment." },
  { Icon: GitBranch, h: "Split tunnel + always-on", p: "Send only corporate traffic through the tunnel, keep personal traffic local, and stay always-on for managed devices." },
  { Icon: Prohibit, h: "Drop-all firewall", p: "Zero inbound ports. Servers disappear from the public internet — there is nothing left to scan or attack." },
];

const DEPLOY: { type: "cloud" | "onprem" | "hybrid"; h: string; p: string; star?: boolean }[] = [
  { type: "cloud", h: "Cloud", p: "Spin up in days. No hardware, no concentrators to rack." },
  { type: "onprem", h: "On-premise", p: "Run the full stack inside your own datacenter — built for government, PSUs and regulated industry.", star: true },
  { type: "hybrid", h: "Hybrid", p: "Keep sensitive workloads on-prem and burst the rest to cloud — one policy engine across both." },
];

export function ZtnaContent() {
  return (
    <div className="relative">
      {/* problem with VPN */}
      <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Why VPNs fail"
          title={
            <>
              A VPN trusts the connection. <span className="grad-text">Attackers love that.</span>
            </>
          }
          subtitle="The VPN was built to extend the network to a remote user. That is exactly the problem — it hands out the whole network when the job only needed one app."
        />
        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PROBLEMS.map((it, i) => (
            <Reveal key={it.h} delay={i * 0.06} className="flex gap-4 sm:flex-col">
              <it.Icon size={28} weight="duotone" className="shrink-0 text-[var(--accent-red)]" />
              <div>
                <h3 className="mb-1.5 font-semibold">{it.h}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{it.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* how ZTNA works */}
      <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="How ZTNA works"
          title={
            <>
              Verify first. <span className="grad-text">Then open one door.</span>
            </>
          }
          subtitle="Every connection clears three checkpoints before a single packet flows to an application."
        />
        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
          <div className="glow-line absolute left-0 right-0 top-7 hidden sm:block" aria-hidden />
          {STEPS.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.12} className="relative text-center">
              <div
                className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--border-accent)]"
                style={{ background: "var(--bg-base)" }}
              >
                <s.Icon size={26} weight="duotone" className="text-[var(--accent-blue-light)]" />
              </div>
              <h3 className="mt-5 font-semibold tracking-tight">{s.h}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">{s.p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* capabilities */}
      <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Capabilities"
              title={
                <>
                  Network-layer control, <span className="grad-text">app by app.</span>
                </>
              }
              subtitle="ZTNA isn't one switch. It's a set of controls that together make the network disappear from anyone who shouldn't see it."
            />
          </div>
          <ul>
            {CAPS.map((c, i) => (
              <Reveal key={c.h} delay={i * 0.05}>
                <li className="flex items-start gap-5 border-t border-[var(--hairline)] py-6 first:border-t-0">
                  <c.Icon size={28} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-blue-light)]" />
                  <div>
                    <h3 className="font-semibold tracking-tight">{c.h}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">{c.p}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* privacy first */}
      <section className="section relative mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border p-8 text-center lg:p-12"
            style={{ borderColor: "var(--border-accent)", background: "var(--surface-faint)" }}
          >
            <EyeSlash size={36} weight="duotone" className="mx-auto text-[var(--accent-green)]" />
            <h2 className="mx-auto mt-5 max-w-2xl text-balance text-2xl font-bold tracking-tight sm:text-3xl">
              Privacy First — your traffic never touches our machines.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-[var(--text-secondary)]">
              Connections run device-to-app directly. Unlike cloud proxies that backhaul every packet through their
              own infrastructure, InstaSafe ZTNA keeps your data on your path — there&apos;s no third party in the route to trust.
            </p>
          </div>
        </Reveal>
      </section>

      {/* vs VPN snippet + chart */}
      <section className="section relative mx-auto max-w-6xl px-5 lg:px-8">
        <SectionHeading eyebrow="ZTNA vs VPN" title={<>The short version.</>} />
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
          <div>
            <div className="overflow-hidden rounded-2xl border border-[var(--hairline)]" style={{ background: "var(--glass-bg)", backdropFilter: "blur(6px)" }}>
              {[
                ["Trust model", "Trusts the whole network after login", "Verifies every app request"],
                ["Attack surface", "Open inbound ports, public concentrator", "Zero inbound ports, servers stay dark"],
                ["Lateral movement", "Free once inside", "Impossible — one app, no network"],
                ["Your data path", "Backhauled through a concentrator", "Direct device → app"],
              ].map((row, i) => (
                <div
                  key={row[0]}
                  className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[150px_1fr_1fr] sm:gap-6"
                  style={{ borderTop: i === 0 ? "none" : "1px solid var(--hairline)", background: i % 2 ? "var(--surface-faint)" : "transparent" }}
                >
                  <div className="text-sm font-semibold">{row[0]}</div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-red)]" />
                    {row[1]}
                  </div>
                  <div className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                    <ShieldCheck size={15} weight="duotone" className="mt-0.5 shrink-0 text-[var(--accent-green)]" />
                    {row[2]}
                  </div>
                </div>
              ))}
            </div>
            <Reveal delay={0.1}>
              <a href="/zero-trust-vs-vpn" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-blue-light)]">
                See the full Zero Trust vs VPN comparison
                <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <BreachLineChart />
          </Reveal>
        </div>
      </section>

      {/* deployment */}
      <section className="section relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Deployment"
          title={
            <>
              Cloud, on-prem, or <span className="grad-text">both.</span>
            </>
          }
          subtitle="The same policy engine runs wherever your data has to live — including fully air-gapped datacenters."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DEPLOY.map((d, i) => (
            <Reveal key={d.h} delay={i * 0.08}>
              <div
                className="group relative flex h-full min-h-[330px] flex-col justify-end overflow-hidden rounded-2xl border p-6 transition-colors hover:border-[var(--border-accent)]"
                style={{
                  borderColor: d.star ? "var(--border-accent)" : "var(--hairline)",
                  background: d.star ? "var(--surface-faint)" : "var(--glass-bg)",
                  backdropFilter: "blur(6px)",
                }}
              >
                <DeployIllustration type={d.type} />
                {/* legibility veil under the text */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(to top, var(--bg-base), transparent)" }} />
                <div className="relative z-10">
                  <h3 className="flex items-center gap-2 text-lg font-semibold">
                    {d.h}
                    {d.star && (
                      <span className="rounded-full bg-[var(--accent-green)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--accent-green)]">our edge</span>
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{d.p}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* case study */}
      <section className="section relative mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal>
          <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface-faint)] p-8 lg:p-12">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">
              <Buildings size={16} weight="duotone" /> Government PSU · on-premise
            </div>
            <p className="mt-5 text-balance text-xl font-semibold leading-snug tracking-tight sm:text-2xl">
              A national PSU runs InstaSafe ZTNA entirely inside its own datacenter — scaled to 50,000 users across 2,000
              branches, with data that never leaves the private network.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              {[
                ["50,000", "users in production"],
                ["2,000", "branches connected"],
                ["0", "data leaving the DC"],
              ].map((s) => (
                <div key={s[1]}>
                  <div className="text-2xl font-bold tracking-tight sm:text-3xl">{s[0]}</div>
                  <div className="mt-1 text-xs text-[var(--text-muted)]">{s[1]}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section id="demo" className="relative py-28">
        <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--accent-blue)]/30 bg-[var(--accent-blue)]/10"
          >
            <ShieldCheck size={28} weight="duotone" className="text-[var(--accent-blue-light)]" />
          </motion.div>
          <AnimatedText
            as="h2"
            text="Take your network off the map."
            highlight={["map."]}
            className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-secondary)]"
          >
            See ZTNA running against your own apps — a 30-minute walkthrough, tailored to your stack and deployment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-9 flex justify-center"
          >
            <a
              href="#"
              className="group inline-flex items-center gap-2 rounded-full bg-[var(--btn-bg)] px-8 py-4 text-base font-semibold text-[var(--btn-fg)] transition-transform hover:scale-[1.03]"
            >
              Book a demo
              <ArrowRight weight="bold" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
