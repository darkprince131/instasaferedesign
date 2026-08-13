"use client";

import {
  ArrowsLeftRight,
  Clipboard,
  Keyboard,
  Prohibit,
  Timer,
  VideoCamera,
  Drop,
  Browser,
} from "@phosphor-icons/react";

import { FeatureSplit, type Feature } from "@/components/home2/FeatureSplit";
import { ZTAA_SCENES, type ZtaaSceneId } from "./ztaa-session-art";

/* ============================================================
   ZtaaSessionSplit — tab 2 of the ZTAA page, on 00w FeatureSplit.

   The component is unchanged: same clickable list on the left, same
   window frame on the right, same cross-fade. What changes is what
   goes IN the frame. Every other FeatureSplit on the site puts a JSON
   console there, and for these eight controls a console says nothing —
   a payload reading `"clipboard": "deny"` is the sentence already in
   the caption, set in a monospace font. Each tab now shows the control
   actually happening: the clipboard stopping at the session boundary,
   the screenshot returning an empty frame, the keylogger reading noise.

   FeatureSplit already supported this. `viz.kind: "node"` has been in
   its API from the start and nothing had used it.

   `cta={false}` — the page carries its own demo CTA, and stacking a
   second one into the same screen is what that flag exists to stop.
   ============================================================ */

/* One scene, injected. Raw markup because the art is generated — see
   ztaa-session-art.ts. Wrapped in a div rather than set on the svg so
   React never has to reconcile inside the injected subtree. */
function Scene({ id }: { id: ZtaaSceneId }) {
  return (
    <div
      className="ztss-scene"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: ZTAA_SCENES[id] }}
    />
  );
}

/* `file` is the label in the window's title bar. These are scenes, not
   payloads, so they are named as figures rather than as .json blobs —
   calling one `clipboard.json` when it is a drawing would be a lie the
   chrome tells about its own contents. */
const FEATURES: Feature[] = [
  {
    id: "tunnel",
    icon: ArrowsLeftRight,
    title: "Per-app encrypted tunnel",
    viz: { kind: "node", file: "fig · per-app tunnel", node: <Scene id="tunnel" /> },
  },
  {
    id: "record",
    icon: VideoCamera,
    title: "Session recording",
    viz: { kind: "node", file: "fig · session recording", node: <Scene id="record" /> },
  },
  {
    id: "clipboard",
    icon: Clipboard,
    title: "Clipboard control",
    viz: { kind: "node", file: "fig · clipboard control", node: <Scene id="clipboard" /> },
  },
  {
    id: "watermark",
    icon: Drop,
    title: "Session watermark",
    viz: { kind: "node", file: "fig · session watermark", node: <Scene id="watermark" /> },
  },
  {
    id: "timeout",
    icon: Timer,
    title: "Inactivity timeout",
    viz: { kind: "node", file: "fig · inactivity timeout", node: <Scene id="timeout" /> },
  },
  {
    id: "screenshot",
    icon: Prohibit,
    title: "Screenshot block",
    viz: { kind: "node", file: "fig · screenshot block", node: <Scene id="screenshot" /> },
  },
  {
    id: "chrome",
    icon: Browser,
    title: "Browser chrome controls",
    viz: { kind: "node", file: "fig · browser controls", node: <Scene id="chrome" /> },
  },
  {
    id: "keylogger",
    icon: Keyboard,
    title: "Anti-keylogging",
    viz: { kind: "node", file: "fig · anti-keylogging", node: <Scene id="keylogger" /> },
  },
];

export function ZtaaSessionSplit() {
  return (
    <FeatureSplit
      features={FEATURES}
      eyebrow="In-session controls_"
      title={
        <>
          Access opens the app. <em>Control stays inside it.</em>
        </>
      }
      lead="Getting into an application is the first decision, not the last. Eight controls run for the life of the session — over the tunnel, the clipboard, the screen and the keyboard."
      cta={false}
    />
  );
}
