import type { Metadata } from "next";

/* Dev-only tool. Not linked from the site and not in the sitemap, but
   noindex it so it can never be picked up if this ever ships. */
export const metadata: Metadata = {
  title: "Hero plate calibration (internal)",
  robots: { index: false, follow: false },
};

export default function CalibrateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
