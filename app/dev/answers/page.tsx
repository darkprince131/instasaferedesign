import type { Metadata } from "next";
import { AnswersDemo } from "./AnswersDemo";

/* DEV ONLY. Noindex — internal review surface for the answer-strip
   explainer illustrations, the way /dev/outcomes serves the outcomes
   artifacts. */
export const metadata: Metadata = {
  title: "Answer-strip illustrations — dev",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AnswersDemo />;
}
