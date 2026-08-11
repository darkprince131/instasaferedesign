/* The drawn glyph set — the house's other icon vocabulary.

   WHY BOTH EXIST. The user's ruling (2026-08-09): hand-drawn marks
   bring variety and stay, and only `/secure-cloud-applications` wanted
   the Phosphor set. So the family runs two vocabularies on purpose —
   `ArtIcon` for the Phosphor pages, this for the drawn ones. What is
   NOT allowed is mixing them inside one illustration, or letting the
   drawn ones drift into five different stroke weights, which is what
   made the first pass look ragged.

   HOW IT HOLDS TOGETHER. Every glyph is authored in the same 24×24
   box and rendered through one transform, so proportion and corner
   radius are shared. Stroke is compensated for scale
   (`1.4 × 24 / size`) rather than left to shrink with the group —
   that is the difference between a set and a pile of paths.

   `vector-effect: non-scaling-stroke` would do the same job and is
   BANNED in artifacts: it moves dashing into rendered space and turns
   every dash-drawn path into 1px dots. Do the arithmetic instead. */

export type GlyphName =
  | "person"
  | "people"
  | "crowd"
  | "person-add"
  | "buildings"
  | "house"
  | "plane"
  | "fingerprint"
  | "laptop"
  | "shield"
  | "shield-check"
  | "clock"
  | "tiles"
  | "folder"
  | "folder-open"
  | "database"
  | "code"
  | "check"
  | "lock"
  | "calendar"
  | "terminal"
  | "board"
  | "chart"
  | "gauge"
  | "gear"
  | "images"
  | "chat"
  | "doc"
  | "record";

/** every path below is authored in this box */
const BOX = 24;
const STROKE = 1.4;

function paths(name: GlyphName) {
  switch (name) {
    case "person":
      return ["M12 4.5a3.6 3.6 0 1 1 0 7.2a3.6 3.6 0 0 1 0-7.2", "M4.8 20a7.2 7.2 0 0 1 14.4 0"];
    case "people":
      return [
        "M9.5 4.8a3.2 3.2 0 1 1 0 6.4a3.2 3.2 0 0 1 0-6.4",
        "M3.2 19.6a6.3 6.3 0 0 1 12.6 0",
        "M16.4 6.2a2.6 2.6 0 0 1 0 5",
        "M17 19.6a5.6 5.6 0 0 0-2.6-4.4",
      ];
    case "crowd":
      return [
        "M12 5.6a3 3 0 1 1 0 6a3 3 0 0 1 0-6",
        "M6.6 19.8a5.4 5.4 0 0 1 10.8 0",
        "M5.4 8.2a2.2 2.2 0 0 1 0 4.4",
        "M18.6 8.2a2.2 2.2 0 0 0 0 4.4",
        "M2 18.4a4.4 4.4 0 0 1 3-3.4",
        "M22 18.4a4.4 4.4 0 0 0-3-3.4",
      ];
    case "person-add":
      return [
        "M9.6 5a3.4 3.4 0 1 1 0 6.8a3.4 3.4 0 0 1 0-6.8",
        "M3 19.6a6.6 6.6 0 0 1 13.2 0",
        "M17.4 8.4h5",
        "M19.9 5.9v5",
      ];
    case "buildings":
      return [
        "M3.5 20.5V9h7v11.5",
        "M10.5 20.5V4.5h10v16",
        "M5.6 12h2.8M5.6 15.6h2.8M13 8h4.6M13 12h4.6M13 16h4.6",
      ];
    case "house":
      return ["M3 11.4 12 4l9 7.4", "M5.6 10.4v10h12.8v-10", "M10 20.4v-5.2h4v5.2"];
    case "plane":
      return ["M2.4 14.6 21.6 5.2l-4 9.6-5.2-1.4Z", "M2.4 14.6l9.6-1.2", "M9.6 17.8l2.4-4.4"];
    case "fingerprint":
      return [
        "M4.4 12.6a7.6 7.6 0 0 1 15.2 0",
        "M7.6 13.4a4.4 4.4 0 0 1 8.8 0",
        "M10.8 14a1.2 1.2 0 0 1 2.4 0v5",
        "M12 4.6a8 8 0 0 0-4.6 1.5",
      ];
    case "laptop":
      return ["M5 6.4h14v9H5Z", "M2.6 18.6h18.8", "M10 15.4h4"];
    case "shield":
      return ["M12 3.4l7.4 3v6.2c0 4.6-3.6 6.8-7.4 8-3.8-1.2-7.4-3.4-7.4-8V6.4Z"];
    case "shield-check":
      return ["M12 3.4l7.4 3v6.2c0 4.6-3.6 6.8-7.4 8-3.8-1.2-7.4-3.4-7.4-8V6.4Z", "M8.8 11.6l2.4 2.4 4-4.6"];
    case "clock":
      return ["M12 3.6a8.4 8.4 0 1 1 0 16.8a8.4 8.4 0 0 1 0-16.8", "M12 7.4V12l3.2 2"];
    case "tiles":
      return ["M4 4h6.4v6.4H4Z", "M13.6 4H20v6.4h-6.4Z", "M4 13.6h6.4V20H4Z", "M13.6 13.6H20V20h-6.4Z"];
    case "folder":
      return ["M3.4 19.4V5.6h6l2.2 2.6h9v11.2Z"];
    case "folder-open":
      return ["M3.4 19.4V5.6h6l2.2 2.6h9v2.6", "M3.4 19.4l3-8h15.2l-3 8Z"];
    case "database":
      return ["M12 3.8c4.4 0 8 1.5 8 3.3s-3.6 3.3-8 3.3-8-1.5-8-3.3 3.6-3.3 8-3.3", "M4 7.1v9.8c0 1.8 3.6 3.3 8 3.3s8-1.5 8-3.3V7.1", "M4 12c0 1.8 3.6 3.3 8 3.3s8-1.5 8-3.3"];
    case "code":
      return ["M8.6 7.4 3.4 12l5.2 4.6", "M15.4 7.4 20.6 12l-5.2 4.6", "M13.6 4.6l-3.2 14.8"];
    case "check":
      return ["M12 3.6a8.4 8.4 0 1 1 0 16.8a8.4 8.4 0 0 1 0-16.8", "M8.2 12.2l2.6 2.6 5-5.6"];
    case "lock":
      return ["M5.6 10.6h12.8v9.2H5.6Z", "M8.6 10.6V7.8a3.4 3.4 0 0 1 6.8 0v2.8"];
    case "calendar":
      return ["M4 6.4h16v13.4H4Z", "M4 10.6h16", "M8.4 3.8v4.4M15.6 3.8v4.4", "M8.6 14.4l1.8 1.8 3.6-3.8"];
    case "terminal":
      return ["M3.4 5.6h17.2v12.8H3.4Z", "M7 10.2l2.6 2.2L7 14.6", "M12.4 15h4.6"];
    case "board":
      return ["M4 4.6h16v14.8H4Z", "M9.4 4.6v14.8M14.6 4.6v14.8", "M6.2 8h1.4M11.6 8h1.4M16.8 8h1.4"];
    case "chart":
      return ["M4 19.6h16", "M7 19.6v-5.2M11.6 19.6V9M16.2 19.6V5.6"];
    case "gauge":
      return ["M3.8 16.6a8.6 8.6 0 1 1 16.4 0", "M12 16.4 16.6 9.6"];
    case "gear":
      return [
        "M12 8.6a3.4 3.4 0 1 1 0 6.8a3.4 3.4 0 0 1 0-6.8",
        "M12 3.4v2.4M12 18.2v2.4M3.4 12h2.4M18.2 12h2.4",
        "M6 6l1.7 1.7M16.3 16.3 18 18M18 6l-1.7 1.7M7.7 16.3 6 18",
      ];
    case "images":
      return ["M3.6 5.6h16.8v12.8H3.6Z", "M8 10.4a1.6 1.6 0 1 1 0-.1", "M4.6 17 10 11.6l3.4 3.4 2.8-2.4 3.4 4.4"];
    case "chat":
      return ["M3.6 5.6h16.8v10.2h-9.6L6 19.4v-3.6H3.6Z", "M8.4 10.6h.1M12 10.6h.1M15.6 10.6h.1"];
    case "doc":
      return ["M6 3.6h8l4 4v12.8H6Z", "M14 3.6v4h4", "M9.6 13l4.4 2.4-4.4 2.4Z"];
    case "record":
      return ["M12 3.8a8.2 8.2 0 1 1 0 16.4a8.2 8.2 0 0 1 0-16.4", "M12 8.6a3.4 3.4 0 1 1 0 6.8a3.4 3.4 0 0 1 0-6.8"];
    default:
      return [];
  }
}

/** dots that must READ as dots rather than as short strokes */
const DOTTED: Partial<Record<GlyphName, boolean>> = { chat: true };

export function Glyph({
  name,
  cx,
  cy,
  size = 24,
  tone = "dim",
}: {
  name: GlyphName;
  /** centre, in the artifact's viewBox units */
  cx: number;
  cy: number;
  size?: number;
  tone?: "dim" | "mute" | "accent" | "allow" | "deny";
}) {
  const k = size / BOX;
  return (
    <g
      className={`a-glyph a-glyph--${tone}`}
      transform={`translate(${(cx - size / 2).toFixed(2)} ${(cy - size / 2).toFixed(2)}) scale(${k.toFixed(4)})`}
      strokeWidth={STROKE / k}
      strokeLinecap={DOTTED[name] ? "round" : undefined}
    >
      {paths(name).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  );
}
