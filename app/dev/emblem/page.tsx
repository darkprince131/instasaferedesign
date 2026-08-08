import type { Metadata } from "next";
import { EmblemDemo } from "./EmblemDemo";

/* The demo itself is a client component (sliders, live state), so the
   noindex lives here — /dev/* is a build tool, not a page, and
   robots.ts allows "/" site-wide. */
export const metadata: Metadata = {
  title: "MechanismEmblem — dev",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EmblemDemo />;
}
