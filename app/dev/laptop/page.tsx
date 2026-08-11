import type { Metadata } from "next";
import { LaptopDemo } from "./LaptopDemo";

/* DEV ONLY. Noindex — internal review surface for the scroll-scrubbed
   exploded-laptop inspection, the way /dev/outcomes serves the
   outcomes artifacts. */
export const metadata: Metadata = {
  title: "Exploded laptop — dev",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LaptopDemo />;
}
