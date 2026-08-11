import type { Metadata } from "next";
import { EngineDemo } from "./EngineDemo";

/* DEV ONLY. Noindex — review surface for 00c1 IzAccessEngine, the
   homepage capability deck. */
export const metadata: Metadata = {
  title: "Access engine deck — dev",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <EngineDemo />;
}
