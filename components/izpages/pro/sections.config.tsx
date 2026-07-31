import type { MockKey } from "./IzMocks";

/* ============================================================
   sections.config.tsx — content for IzUseCaseGrid + IzAgentCards

   Same rule as pro.config.tsx: this is the only file you should
   need to touch to change what these sections say. Both sections
   read `mock` as a KEY, never a component, so this file stays
   plain data and never imports JSX.

   Add a cell   → append to GRID.cells
   Add a card   → append to CARDS.items
   Add a mock   → add it to MOCKS in IzMocks.tsx; both sections can
                  use it immediately
   ============================================================ */

export type GridCell = {
  id: string;
  /** the mono footer label, e.g. "Use case 1 · Reduced friction" */
  label: string;
  mock: MockKey;
};

export const GRID = {
  /** the two display-type cells across the top */
  heads: ["Your applications.", "Your rules."],
  copy: {
    lead: "Act on what you can actually see.",
    rest: "Every session arrives with an identity, a device and a posture attached. The same three facts decide whether it walks straight in, gets challenged, or never reaches the app at all.",
  },
  cells: [
    { id: "friction", label: "Case 1 · Reduced friction", mock: "welcome" },
    { id: "stepup", label: "Case 2 · Step-up authentication", mock: "challenge" },
    { id: "blocked", label: "Case 3 · Blocked outright", mock: "loop" },
  ] as GridCell[],
};

export type AgentCard = {
  id: string;
  title: [string, string];
  mock: MockKey;
  /** which way the card's wash leans — matches the mock's verdict */
  tone: "allow" | "deny" | "warn";
};

export const CARDS = {
  title: { lead: "Tell people apart from", accent: "automation", tail: "before either reaches an app." },
  sub: "Not every session is a person, and not every person is who the credential says. InstaSafe reads all three signals on every request.",
  items: [
    {
      id: "stuffing",
      title: ["Stop credential stuffing", "from ever landing"],
      mock: "loop",
      tone: "deny",
    },
    {
      id: "service",
      title: ["Verify service accounts", "with confidence"],
      mock: "verify",
      tone: "allow",
    },
    {
      id: "hijack",
      title: ["Catch a session that", "changed hands mid-flight"],
      mock: "inspect",
      tone: "warn",
    },
  ] as AgentCard[],
};
