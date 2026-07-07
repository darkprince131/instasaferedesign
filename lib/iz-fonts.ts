import { Geist, Geist_Mono } from "next/font/google";

/* ============================================================
   Balanced `.iz` design-system fonts (homepage `/` + lab
   `/components` + flow-preview only). Geist Sans for display
   AND body (via the --font-body2 alias), Geist Mono for the
   data/label layer. System A (Inter, app/layout.tsx) is
   untouched — do NOT repoint --font-inter to these.
   ============================================================ */

// Display face — headings, nav mark, big numerals.
export const izDisp = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-disp",
});

// Body face — same Geist Sans, exposed under its own var so the
// `.iz --body` fallback can point at it without touching Inter.
export const izBody = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body2",
});

// Mono face — data rows, eyebrows, timestamps, labels.
export const izMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono2",
});

// Convenience: the three variable class names, space-joined,
// to drop on the `.iz` wrapper div.
export const izFontVars = `${izDisp.variable} ${izBody.variable} ${izMono.variable}`;
