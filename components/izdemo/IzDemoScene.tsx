import { DEMO_SCENE_SVG } from "./demo-scene-svg";

/* ============================================================
   IzDemoScene — the isometric stage behind the access request.

   The markup comes from lib/scripts/gen-demo-scene.py and is injected
   as a string. Two reasons it is not an <img> and not hand-written JSX:

     · an <img> is a separate document and cannot see the page's CSS
       variables, so the paper theme would render the dark fallbacks;
     · the generator emits ~66KB of geometry, and hand-maintaining that
       as JSX would mean the drawing and the code that produces it drift
       apart the first time anyone nudges a coordinate.

   The string is a build-time constant with no user input anywhere in
   its path, which is what makes dangerouslySetInnerHTML the right tool
   here rather than a risk.

   Purely decorative: the SVG carries its own role="img" and label, and
   the wrapper is aria-hidden so a screen reader is not handed a
   description of the furniture before it reaches the form.
   ============================================================ */

export function IzDemoScene({ className = "" }: { className?: string }) {
  return (
    <div
      className={`izdm-scene ${className}`.trim()}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: DEMO_SCENE_SVG }}
    />
  );
}
