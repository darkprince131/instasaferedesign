"use client";

import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/brand/Logo";

/* ============================================================
   MfaNetworkHub — the network gear, around one hub.

   ▸ THE PERSPECTIVE DECIDED THE LAYOUT ◂
   All four renders share one camera: we look from the lower-left,
   slightly above, and every object recedes toward the upper-right
   with its near corner at the lower-left. Three of them are strongly
   isometric on that axis; the router is nearly frontal but lit the
   same way.

   That has three consequences, and they are the whole design:

     1. NOTHING IS MIRRORED. Flipping a device to make it "face" the
        hub would reverse its own lighting against the other three,
        and would also reverse the ROUTER / SWITCH / VPN lettering
        printed on its plinth. A flipped label is not a stylistic
        choice, it is a broken image.

     2. NOTHING IS ROTATED. These are baked renders with baked
        contact shadows. A CSS rotation tilts the shadow off the
        ground plane and the object starts floating.

     3. SO THE CONNECTORS DO THE WORK. The devices sit at four
        corners in their native orientation, and the spokes run
        along the ground plane between each plinth and the hub. The
        hub is drawn in the same idiom as their pedestals — a white
        slab with a soft contact shadow — so it reads as a fifth
        object standing on the same floor rather than as a diagram
        node pasted over photographs.

   The corner placement is not arbitrary either. On this camera the
   top of the frame is FURTHER AWAY, so the two devices with the
   strongest recession sit up there and the two with more front face
   sit near the viewer.

   ▸ WHAT THE ANIMATION SAYS ◂
   A packet runs from each device INTO the hub, one at a time, and
   the hub answers. The direction matters: network gear does not hold
   its own MFA, it asks. That is the entire argument for RADIUS and
   TACACS+ being on this page at all.
   ============================================================ */

type Device = {
  id: string;
  img: string;
  alt: string;
  name: string;
  proto: string;
  detail: string;
  /** which corner of the 3×3 ground plane it stands on */
  cell: "nw" | "ne" | "sw" | "se";
};

const DEVICES: Device[] = [
  {
    id: "firewall",
    img: "/devices/firewall.webp",
    alt: "A firewall appliance",
    name: "Firewall",
    proto: "RADIUS",
    detail: "Admin console logins",
    cell: "nw",
  },
  {
    id: "router",
    img: "/devices/router.webp",
    alt: "A network router",
    name: "Router",
    proto: "TACACS+",
    detail: "Privileged CLI access",
    cell: "ne",
  },
  {
    id: "vpn",
    img: "/devices/vpn.webp",
    alt: "A laptop running a VPN client",
    name: "VPN client",
    proto: "RADIUS",
    detail: "Remote user logins",
    cell: "sw",
  },
  {
    id: "switch",
    img: "/devices/switch.webp",
    alt: "A network switch",
    name: "Switch",
    proto: "TACACS+",
    detail: "Per-command authorisation",
    cell: "se",
  },
];

/* ▸ THE SPOKES ARE MEASURED, NOT WRITTEN ▸
   The first version hardcoded endpoints as percentages into a
   `preserveAspectRatio="none"` viewBox. Two things were wrong with
   that and both are visible:

     · the numbers were estimates. Measured, the plinths sit at
       19.5/80.5 across and 31.2/80.4 down, and the hub core at 45.4
       — not the 25/75/34/78/56 that had been guessed, so every line
       ended slightly off the object it was pointing at.

     · a non-uniform viewBox smears stroke weight along one axis. At
       644×543 that is an 18% difference between a horizontal and a
       vertical hair, on a diagram whose whole content is hairlines.

   So the box is measured after layout and the viewBox is given its
   real pixel dimensions, which makes one unit one pixel in both
   directions. `pathLength={100}` then normalises every spoke to the
   same 100 units regardless of its true length, so one dash
   animation runs identically down all four. */

type Pt = { x: number; y: number };
type Wires = { w: number; h: number; hub: Pt; ends: Record<string, Pt> };

/* Where on the image the object meets the floor. Not the middle of
   the picture: a line ending at the centre of a laptop points at the
   air behind the screen. */
const PLINTH_Y = 0.86;

export function MfaNetworkHub() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [wires, setWires] = useState<Wires | null>(null);

  /* Re-measured on resize, because the grid is fluid and the spokes
     have to keep landing on the plinths at every width. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const box = el.getBoundingClientRect();
      const core = el.querySelector(".mfnh-core")?.getBoundingClientRect();
      if (!core || !box.width) return;
      const ends: Record<string, Pt> = {};
      for (const d of DEVICES) {
        const img = el.querySelector(`.at-${d.cell} img`)?.getBoundingClientRect();
        if (!img) continue;
        ends[d.cell] = {
          x: img.left + img.width / 2 - box.left,
          y: img.top + img.height * PLINTH_Y - box.top,
        };
      }
      setWires({
        w: box.width,
        h: box.height,
        hub: { x: core.left + core.width / 2 - box.left, y: core.top + core.height / 2 - box.top },
        ends,
      });
    };

    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    /* Same failsafe the other looping scenes carry: a backgrounded tab
       reports nothing as intersecting, and a visitor coming back would
       find four dead spokes. */
    const failsafe = window.setTimeout(() => setLive(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div className={`mfnh${live ? " is-live" : ""}`} ref={ref}>
      {/* ---- the spokes, behind everything ----
           Rendered only once measured. Drawing them at guessed
           coordinates for one frame and snapping afterwards is worse
           than drawing them a frame late. */}
      {wires && (
        <svg
          className="mfnh-wires"
          viewBox={`0 0 ${wires.w} ${wires.h}`}
          width={wires.w}
          height={wires.h}
          aria-hidden="true"
        >
          {DEVICES.map((d, i) => {
            const p = wires.ends[d.cell];
            if (!p) return null;
            return (
              <g key={d.id} style={{ ["--i" as string]: i } as React.CSSProperties}>
                <line className="mfnh-wire" x1={p.x} y1={p.y} x2={wires.hub.x} y2={wires.hub.y} pathLength={100} />
                <line className="mfnh-pulse" x1={p.x} y1={p.y} x2={wires.hub.x} y2={wires.hub.y} pathLength={100} />
              </g>
            );
          })}
        </svg>
      )}

      {/* ---- the four devices, in their native orientation ---- */}
      {DEVICES.map((d) => (
        <figure className={`mfnh-dev at-${d.cell}`} key={d.id}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={d.img} alt={d.alt} loading="lazy" decoding="async" width={520} height={390} />
          <figcaption>
            <b>{d.name}</b>
            <span className="mfnh-proto">{d.proto}</span>
            <em>{d.detail}</em>
          </figcaption>
        </figure>
      ))}

      {/* ---- the hub: a fifth object on the same floor ---- */}
      <div className="mfnh-hub">
        <span className="mfnh-plinth" aria-hidden="true" />
        <span className="mfnh-core">
          <span className="mfnh-ring" aria-hidden="true" />
          {/* forceTheme, not the ambient one. The core is a lit white
              puck in BOTH page themes — it has to be, to stand on the
              same floor as four white pedestals — so a mark that
              follows the page renders white-on-white the moment the
              page goes dark, and the hub becomes a blank disc. */}
          <LogoMark size={30} forceTheme="light" />
        </span>
        <span className="mfnh-tag">
          <b>InstaSafe</b>
          <em>RADIUS · TACACS+</em>
        </span>
      </div>
    </div>
  );
}
