/* ============================================================
   RASTERISE SVG IN HEADLESS CHROME, OVER CDP.

   Used by gen-og-pages.mjs. Not a general-purpose screenshot tool —
   it does one thing: take an SVG string, render it at an exact CSS
   size and a fixed device scale factor, and hand back a PNG buffer.

   WHY NOT sharp. sharp's SVG input goes through librsvg, which on this
   Windows build resolves no member of the scenes' font stack
   (ui-monospace / SFMono-Regular / Menlo / monospace) and silently
   falls back to a serif. The kit's rule 10 is "mono caps for labels,
   second word orange"; librsvg shipped every one of those labels — the
   ENDPOINT CONTROLS plate, the OTP digits, the GOVERNED SESSION title
   bar, the INSTASAFE watermark — set in Times. It is the same class of
   failure gen-og-card.mjs's header documents, and it is invisible
   unless you zoom a label plate, which is exactly how it got through
   once already.

   Chrome resolves a real monospace and, more to the point, renders the
   scenes the way the review board rendered them — the board is what
   the client approved, so the board is the spec. Nothing else about
   the card composition changes; sharp still composes.

   THE GUARD. assertMonospace() runs once per session and measures two
   SVG <text> runs, "iiii" and "MMMM", set in the scenes' own font
   stack, via getComputedTextLength() inside the page. In any
   monospaced face those advances are equal; in a proportional fallback
   they differ by roughly 3x. If they differ, this throws and the run
   dies. A future machine without Consolas cannot quietly ship serif
   cards.

   DETERMINISM. The scenes are static SVG with no animation, no remote
   fonts and no script. On top of that the session pins the viewport,
   the device scale factor, and the text rasterisation: --disable-lcd-text
   forces greyscale antialiasing (subpixel AA would put machine- and
   setting-dependent colour fringes on every hairline) and
   --font-render-hinting=none takes the hinter's grid-fitting out of the
   picture. Two full runs are md5-compared in the generator's verify
   step.
   ============================================================ */

import { pathToFileURL } from "node:url";

import { p } from "./og-lib.mjs";

const chromeLauncher = await import(
  pathToFileURL(p("node_modules/chrome-launcher/dist/index.js")).href
);
const WebSocket = (await import(pathToFileURL(p("node_modules/ws/index.js")).href)).default;

/* The scenes' own stack, copied from gen_scene_kit.py's mono(). The probe
   has to ask about the same string the artwork asks about, or it is
   proving something else. */
export const MONO_STACK = "ui-monospace,SFMono-Regular,Menlo,monospace";

const FLAGS = [
  "--headless=new",
  "--hide-scrollbars",
  "--disable-gpu",
  "--disable-lcd-text", // greyscale AA: no machine-dependent colour fringing
  "--font-render-hinting=none", // no grid-fitting, so glyphs land where the vector says
  "--disable-font-subpixel-positioning",
  "--force-color-profile=srgb",
  "--disable-extensions",
  "--disable-background-networking",
  "--no-first-run",
  "--mute-audio",
];

export async function openChrome() {
  const chrome = await chromeLauncher.launch({ chromeFlags: FLAGS });

  const targets = await (await fetch(`http://127.0.0.1:${chrome.port}/json/list`)).json();
  const page = targets.find((t) => t.type === "page");
  if (!page) throw new Error("Chrome started but exposed no page target to attach to.");

  const ws = new WebSocket(page.webSocketDebuggerUrl, { perMessageDeflate: false });
  await new Promise((res, rej) => {
    ws.once("open", res);
    ws.once("error", rej);
  });

  let seq = 0;
  const pending = new Map();
  ws.on("message", (raw) => {
    const msg = JSON.parse(raw);
    const slot = pending.get(msg.id);
    if (!slot) return; // an event, not a reply
    pending.delete(msg.id);
    msg.error ? slot.rej(new Error(`${msg.error.message} (${JSON.stringify(msg.method)})`)) : slot.res(msg.result);
  });
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const id = ++seq;
      pending.set(id, { res, rej });
      ws.send(JSON.stringify({ id, method, params }));
    });

  await send("Page.enable");
  await send("Runtime.enable");
  const { frameTree } = await send("Page.getFrameTree");
  const frameId = frameTree.frame.id;

  /* Transparent default ground. The scenes paint their own bone rect edge
     to edge, so this only matters for the probe page — but a raster that
     carries its own opaque white would hide a compositing mistake instead
     of showing it. */
  await send("Emulation.setDefaultBackgroundColorOverride", {
    color: { r: 0, g: 0, b: 0, a: 0 },
  });

  async function load(html, width, height, deviceScaleFactor) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor,
      mobile: false,
      screenWidth: width,
      screenHeight: height,
    });
    await send("Page.setDocumentContent", { frameId, html });
    /* System faces only, but document.fonts.ready is the one honest signal
       that layout has settled before the pixels are read. */
    await send("Runtime.evaluate", { expression: "document.fonts.ready", awaitPromise: true });
  }

  return {
    /** Render one SVG at an exact CSS size. Returns a PNG buffer at
        size * deviceScaleFactor. */
    async shot(svg, width, height, deviceScaleFactor = 2) {
      const html =
        `<!doctype html><meta charset="utf-8"><style>` +
        `html,body{margin:0;padding:0;background:transparent}` +
        `svg{display:block;width:${width}px;height:${height}px}` +
        `</style>${svg}`;
      await load(html, width, height, deviceScaleFactor);
      const { data } = await send("Page.captureScreenshot", {
        format: "png",
        fromSurface: true,
        captureBeyondViewport: false,
      });
      return Buffer.from(data, "base64");
    },

    /** Prove the font stack the artwork uses actually resolves to a
        monospaced face in THIS Chrome, on THIS machine. */
    async assertMonospace(stack = MONO_STACK) {
      const html =
        `<!doctype html><meta charset="utf-8"><body>` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="60">` +
        `<text id="i" x="0" y="20" font-family="${stack}" font-size="20">iiii</text>` +
        `<text id="m" x="0" y="50" font-family="${stack}" font-size="20">MMMM</text>` +
        `</svg>`;
      await load(html, 400, 60, 1);
      const { result } = await send("Runtime.evaluate", {
        expression: `JSON.stringify([
          document.getElementById('i').getComputedTextLength(),
          document.getElementById('m').getComputedTextLength()
        ])`,
        returnByValue: true,
      });
      const [wi, wm] = JSON.parse(result.value);
      if (!(wi > 0) || Math.abs(wi - wm) > 0.5) {
        throw new Error(
          `The scenes' font stack (${stack}) did not resolve to a monospaced face in Chrome: ` +
            `"iiii" measures ${wi.toFixed(2)}px, "MMMM" measures ${wm.toFixed(2)}px. ` +
            `Every in-scene label would ship in a proportional fallback. Install a monospace ` +
            `system font, or convert the scene labels to outlines, before regenerating.`
        );
      }
      return { wi, wm, advance: wi / 4 / 20 };
    },

    async close() {
      ws.close();
      /* chrome-launcher rm -rf's its temp profile on kill, and on Windows
         the browser has not always released the handle by then — an EPERM
         from that cleanup would fail a run whose fifteen cards are already
         rasterised and correct. The stray directory is in the OS temp, not
         the repo. Swallow it; do not swallow anything else. */
      try {
        await chrome.kill();
      } catch (e) {
        if (e.code !== "EPERM" && e.code !== "EBUSY") throw e;
      }
    },
  };
}
