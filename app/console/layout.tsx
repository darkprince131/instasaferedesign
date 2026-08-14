import type { Metadata } from "next";

/* ============================================================
   /console is an internal gallery of console visuals, and it was
   answering `index, follow` — it is not a client-component oversight
   that can be fixed in the page itself, because a "use client" module
   cannot export metadata. Hence this layout.

   Being absent from the sitemap is not protection: robots.txt allows
   everything, so anything a crawler reaches by any route is fair game.
   The lab, the dev pages and the v2 archive all carry this already;
   this one had been missed.
   ============================================================ */
export const metadata: Metadata = {
  title: "Console gallery — InstaSafe (internal)",
  robots: { index: false, follow: false },
};

export default function ConsoleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
