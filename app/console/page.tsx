"use client";

import { Logo } from "@/components/brand/Logo";
import { AssetInventoryViz } from "@/components/console/AssetInventoryViz";
import { DashboardHero } from "@/components/console/DashboardHero";
import { DeviceCheckBuilder } from "@/components/console/DeviceCheckBuilder";
import { DeviceTableViz } from "@/components/console/DeviceTableViz";
import { GeofenceMap } from "@/components/console/GeofenceMap";
import { InteractiveConsole } from "@/components/v3/InteractiveConsole";
import { MfaSimulator } from "@/components/v3/MfaSimulator";
import { ThemeToggle } from "@/components/v3/ThemeToggle";

const items: { title: string; node: React.ReactNode }[] = [
  { title: "MfaSimulator — interactive MFA login demo (MFA page hero)", node: <MfaSimulator /> },
  { title: "InteractiveConsole — tabs, dropdown filters, toggles (homepage)", node: <InteractiveConsole /> },
  { title: "DashboardHero — flagship product shot", node: <DashboardHero /> },
  { title: "AssetInventoryViz — donut breakdowns", node: <AssetInventoryViz /> },
  { title: "DeviceTableViz — modern data table", node: <DeviceTableViz /> },
  { title: "DeviceCheckBuilder — posture scan", node: <DeviceCheckBuilder /> },
  { title: "GeofenceMap — geofencing visual", node: <GeofenceMap /> },
];

export default function ConsoleGallery() {
  return (
    <main className="min-h-[100dvh] bg-[var(--bg-base)] px-5 py-10 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <Logo height={30} />
          <div className="flex items-center gap-3">
            <span className="text-sm text-[var(--text-secondary)]">InstaSafe console graphics</span>
            <ThemeToggle />
          </div>
        </div>

        <div className="space-y-14">
          {items.map((it) => (
            <section key={it.title}>
              <h2 className="mb-4 text-sm font-semibold tracking-tight text-[var(--text-secondary)]">
                {it.title}
              </h2>
              {it.node}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
