"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChartLineDown, KeyReturn, ShieldWarning, Vault, type Icon } from "@phosphor-icons/react";

const STEPS: { Icon: Icon; h: string; p: string }[] = [
  { Icon: ChartLineDown, h: "Credential sprawl", p: "The average employee juggles 40–100 app logins. Nobody remembers 100 strong, unique passwords — so they don't." },
  { Icon: KeyReturn, h: "Reuse, then resets", p: "People reuse passwords or forget them. Forgot-password churn floods the helpdesk — and every reset email is an attack window." },
  { Icon: Vault, h: "Password managers are a patch", p: "A vault just moves the problem. Now there's one more place to trust, sync and defend — and one breach exposes everything." },
  { Icon: ShieldWarning, h: "More passwords, more phishing", p: "Every separate login is somewhere to be tricked. Each new app credential widens the attack surface, not the productivity." },
];

export function SsoProblem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="section relative mx-auto max-w-6xl px-5 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent-blue-light)]">Why it hurts</div>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            A password per app <span className="grad-text">doesn&apos;t scale.</span>
          </h2>
          <p className="mt-4 text-pretty text-sm leading-relaxed text-[var(--text-secondary)]">
            It isn&apos;t one big failure — it&apos;s a slow drain of time, patience and security. Scroll through what stacks up.
          </p>
          <div className="mt-6 flex gap-6">
            <div>
              <div className="grad-text text-2xl font-bold">~$70</div>
              <div className="text-xs text-[var(--text-muted)]">per password reset</div>
            </div>
            <div>
              <div className="grad-text text-2xl font-bold">30%+</div>
              <div className="text-xs text-[var(--text-muted)]">of helpdesk tickets</div>
            </div>
          </div>
        </div>

        {/* glowing progress rail + steps */}
        <div ref={ref} className="relative pl-10">
          <div className="absolute left-2 top-2 h-[calc(100%-1rem)] w-1 rounded-full" style={{ background: "var(--hairline)" }}>
            <motion.div className="w-full rounded-full" style={{ height: fill, background: "linear-gradient(180deg,var(--accent-blue),var(--accent-purple))", boxShadow: "0 0 16px var(--accent-blue)" }} />
            <motion.div className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full" style={{ top: fill, background: "var(--accent-blue-light)", boxShadow: "0 0 14px 3px var(--accent-blue-light)" }} />
          </div>

          <div className="space-y-10">
            {STEPS.map((s, i) => (
              <motion.div key={s.h} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.5 }} className="relative">
                <span className="absolute -left-[2.65rem] top-1 flex h-7 w-7 items-center justify-center rounded-full border" style={{ background: "var(--bg-base)", borderColor: "var(--border-accent)" }}>
                  <s.Icon size={15} weight="duotone" className="text-[var(--accent-blue-light)]" />
                </span>
                <h3 className="font-semibold tracking-tight">{s.h}</h3>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">{s.p}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
