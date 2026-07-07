"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { DEVICE_STATUS, MANUFACTURERS, OS_BREAKDOWN } from "@/lib/console-data";
import { Donut } from "./charts";
import { ConsoleFrame } from "./ConsoleFrame";

function Legend({ data }: { data: { name: string; count: number; color: string }[] }) {
  return (
    <ul className="space-y-1.5">
      {data.map((d) => (
        <li key={d.name} className="flex items-center gap-2 text-[11px]">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ background: d.color }} />
          <span className="flex-1" style={{ color: "var(--db-text-dim)" }}>{d.name}</span>
          <span className="font-mono" style={{ color: "var(--db-text)" }}>{d.count}</span>
        </li>
      ))}
    </ul>
  );
}

export function AssetInventoryViz({ standalone = false }: { standalone?: boolean }) {
  const content = (
    <div className="space-y-4">
      <div className="text-[11px]" style={{ color: "var(--db-text-mute)" }}>
        775 devices auto-classified · last sync 4m ago
      </div>

      <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
        <div className="flex items-center justify-center rounded-xl p-5" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
          <div className="flex items-center gap-6">
            <Donut data={MANUFACTURERS} center="775" centerSub="devices" size={170} />
            <Legend data={MANUFACTURERS} />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="flex items-center gap-4 rounded-xl p-4" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
            <Donut data={OS_BREAKDOWN} size={92} thickness={12} />
            <div>
              <div className="mb-1 text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>Operating system</div>
              <Legend data={OS_BREAKDOWN.slice(0, 3)} />
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl p-4" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
            <Donut data={DEVICE_STATUS} size={92} thickness={12} />
            <div>
              <div className="mb-1 text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>Device status</div>
              <Legend data={DEVICE_STATUS} />
            </div>
          </div>
          <div className="rounded-xl p-4 sm:col-span-2" style={{ background: "var(--db-surface)", border: "1px solid var(--db-border)" }}>
            <div className="mb-3 text-[11px] font-semibold" style={{ color: "var(--db-text)" }}>BitLocker encryption</div>
            <div className="flex items-center gap-4">
              <Donut
                data={[
                  { name: "Encrypted", count: 712, color: "#22C55E" },
                  { name: "Not encrypted", count: 63, color: "#EF4444" },
                ]}
                size={80}
                thickness={11}
              />
              <div className="text-2xl font-bold" style={{ color: "var(--db-success)" }}>
                <AnimatedCounter end={92} suffix="%" />
                <span className="ml-2 text-[11px] font-normal" style={{ color: "var(--db-text-mute)" }}>encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (standalone) return content;
  return <ConsoleFrame title="Asset Inventory" active={1}>{content}</ConsoleFrame>;
}
