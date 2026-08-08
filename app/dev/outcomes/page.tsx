import type { Metadata } from "next";
import { OutcomesDemo } from "./OutcomesDemo";

/* The demo passes icon and illustration COMPONENT references as props,
   which only a client component can do — so the metadata lives here
   and the body is a sibling client module. Same split as /dev/emblem. */
export const metadata: Metadata = {
  title: "Outcomes illustrations — dev",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <OutcomesDemo />;
}
