import { ImageResponse } from "next/og";

/* ============================================================
   The site-wide social card.

   AUDITED 2026-08-15: not one page had an `og:image`, while
   `twitter:card` was already set to `summary_large_image` — so every
   share on LinkedIn, Slack, X and WhatsApp rendered as a blank card
   with a large empty image slot. For a B2B security site that is the
   highest-traffic sharing surface there is.

   GENERATED, NOT AN ASSET. `app/opengraph-image` is a Next file
   convention: this runs at build time and produces a real 1200x630 PNG,
   which is what every scraper wants (they do not reliably read AVIF or
   SVG). It also means the card can never drift out of sync with the
   brand the way a checked-in export does.

   Every route without its own opengraph-image inherits this one. A page
   that wants a bespoke card adds its own file beside its page.tsx.

   NO EXTERNAL FONT FETCH. ImageResponse would need the font file loaded
   over the network at build time; the system stack renders fine at this
   size and cannot fail the build in CI.
   ============================================================ */

export const alt = "InstaSafe — Zero Trust access in one console";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14131a",
          padding: "72px 80px",
          color: "#f4f3f1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 999,
              background: "#f2480a",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -0.5 }}>InstaSafe</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            Zero Trust access,
          </div>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              color: "#ff6a2c",
            }}
          >
            in one console.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#a7acb9" }}>
          ZTNA · ZTAA · Identity · MFA · Device trust
        </div>
      </div>
    ),
    size
  );
}
