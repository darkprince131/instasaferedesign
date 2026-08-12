#!/usr/bin/env python3
"""
InstaSafe book-a-demo background scene — true isometric SVG generator.

World: x right-down, y left-down, z up.  Screen: sx=(x-y)*S, sy=((x+y)/2 - z)*S.
Theme-aware: every colour routes through a CSS custom property with a dark
fallback, so the same markup renders on both the dark and the paper theme.

Run from the repo root:

    python lib/scripts/gen-demo-scene.py

It writes components/izdemo/demo-scene-svg.ts, which exports the markup as a
string. The scene is inlined (not an <img>) because an <img> cannot inherit
the page's CSS variables and the whole illustration is theme-driven.

---------------------------------------------------------------------------
LIGHTING MODEL — the part that makes this read as a lit room rather than a
flat diagram. There are three light sources and they are consistent across
every object:

  1. KEY — one distant cool source from screen upper-left. Implemented as
     userSpaceOnUse gradients that span the whole canvas on the same
     diagonal, so every top face is brighter on its upper-left half and
     every silhouette wall falls off downward. Because the gradients are in
     user space, two objects at different depths share one gradient ramp and
     therefore agree about where the light is.
  2. RIM — the same direction, one value brighter, applied as a gradient
     STROKE on top faces. This is what separates a slab from the slab behind
     it without resorting to a heavier outline.
  3. PRACTICALS — the orange emissives (traffic channel, junction node, door
     reader, floor channel). These are the only warm light in the scene, and
     they spill: each one drops a soft pool on the floor and a bounce on the
     faces nearest it. That spill is drawn BENEATH the geometry it lights so
     it reads as light on a surface rather than a sticker over it.

BACKGROUND — the scene sits in a room, not on a void:
  a graded backdrop, a warm room-light bloom behind the junction, a faint
  concentric ring motif (the InstaSafe mark, at 3% opacity), a far wall, a
  horizon haze band, drifting dust motes lit by the practicals, and a
  vignette that closes the frame. All of it is masked or faded at the edges
  so the illustration can bleed off-canvas without a visible seam.
---------------------------------------------------------------------------
"""
import math
import os

S = 60.0          # world unit -> px

# Screen origin. OY sits low on purpose: the page puts its headline in
# the upper-left of this same band, so the projection is pushed down the
# frame to leave open room up there for type to stand in. Raising OY
# walks the whole object cluster back up into the headline.
OX, OY = 430, 460

# viewBox — a ROOM, not a picture of one.
#
# The geometry only occupies x[-32, 640] y[60, 860]. The frame is far
# wider and a little taller than that on purpose: the page uses this as
# the full-bleed background of its first section, so the drawing has to
# keep going where the content sits. Everything right of x≈700 is empty
# lit floor receding under the form card, and the band above y≈40 is
# open room above the devices. Crop either one and the illustration
# turns back into a rectangle sitting on a page.
#
# Consequence for the page: the scene is rendered with
# preserveAspectRatio="xMinYMid slice" (cover, anchored left), so the
# object cluster stays pinned to the left edge at every viewport and it
# is the empty floor on the right that gets cropped away.
VX, VY, W, H = -46, 270, 1560, 960

OUT = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "..", "..", "components", "izdemo", "demo-scene-svg.ts",
)


def P(x, y, z=0.0):
    return (OX + (x - y) * S, OY + ((x + y) / 2.0 - z) * S)


def fmt(p):
    return f"{p[0]:.1f},{p[1]:.1f}"


def path_from(pts, close=True):
    d = "M" + " L".join(fmt(p) for p in pts)
    return d + (" Z" if close else "")


# ---------- deterministic noise (stable output across runs) ----------
class LCG:
    def __init__(self, seed=20260812):
        self.s = seed

    def next(self):
        self.s = (1103515245 * self.s + 12345) % 2147483648
        return self.s / 2147483648.0

    def between(self, a, b):
        return a + (b - a) * self.next()


RNG = LCG()


# ---------- rounded rectangle sampled in a 2D plane ----------
def rrect_pts(cx, cy, w, d, r, rot=0.0, n=7):
    """Sampled rounded-rect outline in (x,y), CCW, optionally rotated."""
    hw, hd = w / 2, d / 2
    r = min(r, hw, hd)
    corners = [(hw - r, hd - r, 0), (-(hw - r), hd - r, 90),
               (-(hw - r), -(hd - r), 180), (hw - r, -(hd - r), 270)]
    pts = []
    for (kx, ky, a0) in corners:
        for i in range(n + 1):
            a = math.radians(a0 + 90 * i / n)
            pts.append((kx + r * math.cos(a), ky + r * math.sin(a)))
    if rot:
        c, s = math.cos(rot), math.sin(rot)
        pts = [(px * c - py * s, px * s + py * c) for px, py in pts]
    return [(cx + px, cy + py) for px, py in pts]


def slab(cx, cy, w, d, r, z0, h, cls="slab", rot=0.0, inset=None, extra_top=""):
    """Rounded slab with silhouette side wall. Top face carries the rim stroke."""
    base = rrect_pts(cx, cy, w, d, r, rot)
    top = [P(x, y, z0 + h) for x, y in base]
    bot = [P(x, y, z0) for x, y in base]
    n = len(top)
    i_min = min(range(n), key=lambda i: top[i][0])
    i_max = max(range(n), key=lambda i: top[i][0])

    def chain(a, b):
        out, i = [], a
        while True:
            out.append(i)
            if i == b:
                break
            i = (i + 1) % n
        return out
    c1, c2 = chain(i_min, i_max), chain(i_max, i_min)
    front = c1 if max(top[i][1] for i in c1) >= max(top[i][1] for i in c2) else c2
    side_pts = [top[i] for i in front] + [bot[i] for i in reversed(front)]

    svg = f'<path class="{cls}-side" d="{path_from(side_pts)}"/>'
    svg += f'<path class="{cls}-top" d="{path_from(top)}"/>'
    # rim pass: the same outline, stroked with the key-light gradient
    svg += f'<path class="rim" d="{path_from(top)}"/>'
    if inset:
        ins = rrect_pts(cx, cy, w - 2 * inset, d - 2 * inset, max(r - inset, 0.02), rot)
        svg += f'<path class="inset" d="{path_from([P(x, y, z0 + h) for x, y in ins])}"/>'
    svg += extra_top
    return svg


def shadow(cx, cy, w, d, z=0.0, contact=True):
    """Two-part contact shadow: a tight dark core plus a wide ambient falloff.
       One blurred ellipse reads as a smudge; the pair reads as contact.

       contact=False is for the platforms that FLOAT. An object with nothing
       under it has no contact patch, so it gets the ambient falloff only,
       spread wider and set fainter — the further the caster, the softer and
       larger its shadow. Giving a floating slab a tight core is what makes a
       drawing read as a black hole cut in the floor."""
    p = P(cx, cy, z)
    if not contact:
        return (f'<ellipse class="sh-float" cx="{p[0]:.1f}" cy="{p[1]:.1f}" '
                f'rx="{w * S * 0.80:.1f}" ry="{w * S * 0.36:.1f}" filter="url(#big)"/>')
    amb = (f'<ellipse class="sh-amb" cx="{p[0]:.1f}" cy="{p[1]:.1f}" '
           f'rx="{w * S * 0.62:.1f}" ry="{w * S * 0.30:.1f}" filter="url(#big)"/>')
    core = (f'<ellipse class="sh-core" cx="{p[0]:.1f}" cy="{p[1] + 3:.1f}" '
            f'rx="{w * S * 0.34:.1f}" ry="{w * S * 0.14:.1f}" filter="url(#soft)"/>')
    return amb + core


def pool(px, py, rx, ry, cls="pool"):
    """A practical's light pool on a surface. Drawn under the geometry."""
    return f'<ellipse class="{cls}" cx="{px:.1f}" cy="{py:.1f}" rx="{rx:.1f}" ry="{ry:.1f}"/>'


# ---------- standing panel (tablet / phone / laptop screen) ----------
def standing_panel(cx, y0, z0, w, h, lean, r, cls, screen_m=0.07, camera=True, thick=0.05):
    """Rounded panel standing on the floor plane, leaning toward -y."""
    def M(u, v):
        return P(cx + u, y0 - v * math.sin(lean), z0 + v * math.cos(lean))
    body2d = rrect_pts(0, 0, w, h, r)
    body = [M(u, v + h / 2) for u, v in body2d]
    back = [(px - thick * S, py + thick * S * 0.5) for px, py in body]
    scr2d = rrect_pts(0, 0, w - 2 * screen_m, h - 2 * screen_m, max(r - screen_m, 0.02))
    scr = [M(u, v + h / 2) for u, v in scr2d]
    svg = f'<path class="{cls}-side" d="{path_from(back)}"/>'
    svg += f'<path class="{cls}-top" d="{path_from(body)}"/>'
    svg += f'<path class="rim" d="{path_from(body)}"/>'
    svg += f'<path class="screen" d="{path_from(scr)}"/>'
    # screen sheen: a diagonal wedge of reflected key light across the glass
    sh = [M(-w / 2 + screen_m, h * 0.16), M(-w / 2 + screen_m + w * 0.42, h - screen_m),
          M(-w / 2 + screen_m + w * 0.16, h - screen_m), M(-w / 2 + screen_m, h * 0.52)]
    svg += f'<path class="sheen" d="{path_from(sh)}"/>'
    if camera:
        c = M(0, h - screen_m / 2 - 0.045)
        svg += f'<circle class="cam" cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="1.8"/>'
    return svg


# ---------- detail rect on a vertical box face ----------
def face_rect(basis, u0, v0, w, h, r, cls, n=6):
    pts2d = rrect_pts(u0 + w / 2, v0 + h / 2, w, h, r, n=n)
    return f'<path class="{cls}" d="{path_from([basis(u, v) for u, v in pts2d])}"/>'


# ============================================================ scene
out = []

# ---------------- background: room, bloom, rings, haze ----------------
bg = []
bg.append(f'<rect class="void" x="{VX}" y="{VY}" width="{W}" height="{H}"/>')
# the room's own light — a warm bloom sitting behind the junction
bg.append('<ellipse class="roomlight" cx="405" cy="840" rx="480" ry="400"/>')
# cool counter-light from the upper left, so the key has somewhere to come from
bg.append('<ellipse class="keyhaze" cx="150" cy="360" rx="520" ry="430"/>')
# a second, far light down the empty right-hand floor. Without it that
# half of the room is a flat panel and the eye reads it as background
# art rather than as floor continuing past the content.
bg.append('<ellipse class="roomlight" cx="1270" cy="820" rx="560" ry="380"/>')
# brand motif: concentric rings, barely there
for rr in (330, 250, 172, 104):
    bg.append(f'<circle class="ring" cx="500" cy="560" r="{rr}"/>')
bg.append('<circle class="ring-fill" cx="500" cy="560" r="62"/>')
# horizon haze — separates the far floor from the void, run wide enough
# to cover the whole frame now that the frame is a room
bg.append('<ellipse class="haze" cx="560" cy="440" rx="920" ry="150"/>')
out.append('<g id="backdrop">' + "".join(bg) + "</g>")

# ---------------- floor grid ----------------
# The floor has to reach the right edge of the frame — (x-y) runs to
# about 26 there — or the room stops halfway across the section and the
# illustration reads as a tile.
grid = []
for i in range(-8, 21):
    a, b = P(i, -8), P(i, 20)
    grid.append(f'<line x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}"/>')
    a, b = P(-8, i), P(20, i)
    grid.append(f'<line x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}"/>')
# half-pitch grid, only across the near quadrant, for texture close to camera
fine = []
i = -2.0
while i <= 13.0:
    a, b = P(i, 5.5), P(i, 13.5)
    fine.append(f'<line x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}"/>')
    a, b = P(5.5, i), P(13.5, i)
    fine.append(f'<line x1="{a[0]:.0f}" y1="{a[1]:.0f}" x2="{b[0]:.0f}" y2="{b[1]:.0f}"/>')
    i += 0.5
decor = []
for (dx, dy, kind) in [(1.2, 9.8, 'c'), (8.6, 3.2, 'c'), (9.9, 8.8, 'd'), (0.4, 4.4, 'd'),
                       (6.2, 11.4, 'c'), (11.2, 6.1, 'd'), (2.8, 12.2, 'd'),
                       (14.6, 2.2, 'c'), (17.4, 6.8, 'd'), (13.1, 8.4, 'd'),
                       (18.9, 3.1, 'd'), (15.8, 11.2, 'c')]:
    p = P(dx, dy)
    if kind == 'c':
        decor.append(f'<circle class="decor" cx="{p[0]:.0f}" cy="{p[1]:.0f}" r="9"/>')
    else:
        decor.append(f'<circle class="decor-dot" cx="{p[0]:.0f}" cy="{p[1]:.0f}" r="2.2"/>')
# the floor itself catches the room light before the grid is drawn on it
floorlit = (pool(P(6.9, 6.9)[0], P(6.9, 6.9)[1], 360, 200, cls="floorwash")
            + pool(1240, 840, 560, 300, cls="floorwash"))
out.append('<g id="floor" mask="url(#fade)">' + floorlit
           + '<g class="grid">' + "".join(grid) + "</g>"
           + '<g class="grid-fine">' + "".join(fine) + "</g>"
           + "".join(decor) + "</g>")

# ---------------- doorway ----------------
door = []


def wall_face(y1, y2, z1, z2, cls):
    pts = [P(0.9, y1, z1), P(0.9, y2, z1), P(0.9, y2, z2), P(0.9, y1, z2)]
    return f'<path class="{cls}" d="{path_from(pts)}"/>'


door.append(wall_face(4.6, 8.6, 0, 4.2, "wall"))
door.append(wall_face(5.62, 7.18, 0, 3.5, "doorframe"))
door.append(wall_face(5.7, 7.1, 0, 3.4, "doorslit"))
# the reader's light on the wall around it, before the reader is drawn
rd = P(0.9, 7.69, 2.26)
door.append(pool(rd[0], rd[1], 54, 78, cls="wallspill"))
door.append(face_rect(lambda u, v: P(0.9, 7.55 + u, 2.05 + v), 0, 0, 0.28, 0.42, 0.05, "reader"))
door.append(f'<circle class="glowhalo" cx="{rd[0]:.1f}" cy="{rd[1]:.1f}" r="13"/>')
door.append(f'<circle class="glowdot pulse" cx="{rd[0]:.1f}" cy="{rd[1]:.1f}" r="3.2"/>')
# orange light channel along the floor: door base -> toward the control area
fl = [P(1.0, 6.4, 0.01), P(1.9, 6.4, 0.01), P(1.9, 5.3, 0.01)]
door.append(pool(P(1.5, 6.4)[0], P(1.5, 6.4)[1], 92, 40, cls="pool"))
door.append(f'<path class="floorline glow" d="{path_from(fl, close=False)}"/>')
door.append(f'<path class="floorline-core" d="{path_from(fl, close=False)}"/>')
out.append('<g id="doorway" mask="url(#fade)">' + "".join(door) + "</g>")

# ---------------- control plane module ----------------
ctrl = []
CMX, CMY = 3.1, 7.4
ctrl.append(shadow(CMX, CMY, 1.9, 1.9))
ctrl.append(slab(CMX, CMY, 1.7, 1.5, 0.12, 0.0, 0.18, cls="plat", inset=0.10))
ctrl.append(slab(CMX, CMY, 1.35, 1.15, 0.10, 0.18, 1.9, cls="glass"))


def cbasis(u, v):  # u along +y, v up
    return P(CMX + 1.35 / 2, CMY - 1.15 / 2 + u, 0.18 + v)


ctrl.append(face_rect(cbasis, 0.12, 1.52, 0.91, 0.16, 0.04, "panel-hdr"))
for i, vv in enumerate([1.18, 0.90, 0.62]):
    c = cbasis(0.22, vv + 0.07)
    ctrl.append(f'<circle class="panel-ic{" ok" if i < 2 else ""}" cx="{c[0]:.1f}" cy="{c[1]:.1f}" r="3.6"/>')
    ctrl.append(face_rect(cbasis, 0.34, vv, 0.69, 0.10, 0.05, "panel-line"))
for j, bh in enumerate([0.16, 0.30, 0.22, 0.38]):
    ctrl.append(face_rect(cbasis, 0.14 + j * 0.23, 0.14, 0.15, bh, 0.03, "panel-bar"))
# the lit panel throws a faint wash back onto its own face
pc = cbasis(0.5, 0.9)
ctrl.append(pool(pc[0], pc[1], 46, 66, cls="facewash"))
out.append('<g id="control">' + "".join(ctrl) + "</g>")

# ---------------- junction ----------------
junc = []
JX, JY = 6.85, 6.85
junc.append(shadow(JX, JY, 1.6, 1.6))
junc.append(slab(JX + 0.10, JY - 0.10, 2.0, 2.0, 0.16, 0.00, 0.14, cls="plat", rot=0.00))
junc.append(slab(JX - 0.06, JY + 0.06, 1.45, 1.45, 0.13, 0.14, 0.14, cls="plat", rot=0.10, inset=0.09))
junc.append(slab(JX, JY, 0.85, 0.85, 0.10, 0.28, 0.14, cls="plat", rot=-0.06))
node = P(JX, JY, 0.46)
NODE = node
# the node is the brightest practical: it lights the plates it sits on
junc.append(pool(node[0], node[1] + 16, 118, 54, cls="pool-hot"))
junc.append(f'<circle class="glowhalo" cx="{node[0]:.1f}" cy="{node[1]:.1f}" r="14"/>')
junc.append(f'<circle class="glowdot pulse" cx="{node[0]:.1f}" cy="{node[1]:.1f}" r="5"/>')
out.append('<g id="junction">' + "".join(junc) + "</g>")

# ---------------- servers ----------------
srv = []
SVX, SVY = 10.73, 10.73
srv.append(shadow(SVX, SVY, 1.9, 1.9))
srv.append(slab(SVX, SVY, 2.1, 1.9, 0.16, 0.0, 0.16, cls="plat", inset=0.11))
uh = 0.62
for k in range(3):
    z = 0.16 + k * (uh + 0.06)
    srv.append(slab(SVX, SVY, 1.5, 1.3, 0.12, z, uh, cls="unit"))

    def sbasis(u, v, z=z):  # +y face: u along +x, v up
        return P(SVX - 1.5 / 2 + u, SVY + 1.3 / 2, z + v)
    srv.append(face_rect(sbasis, 0.14, uh - 0.24, 1.22, 0.13, 0.05, "slot"))
    for vi in range(3):
        srv.append(face_rect(sbasis, 0.14, 0.13 + vi * 0.09, 0.70, 0.035, 0.017, "vent"))
    led = sbasis(1.30, 0.24)
    srv.append(f'<circle class="{"led-on pulse" if k == 1 else "led"}" cx="{led[0]:.1f}" cy="{led[1]:.1f}" r="2.6"/>')
    srv.append(face_rect(sbasis, 1.16, 0.10, 0.20, 0.09, 0.02, "port"))
SRV_TOP = P(SVX, SVY, 0.16 + 3 * (uh + 0.06) - 0.06)
out.append('<g id="servers">' + "".join(srv) + "</g>")

# channel anchors
TPX, TPY, TPZ = 3.9, 2.4, 2.85
A = P(TPX, TPY, TPZ - 0.02)
Bx = NODE[0]
m1 = A[1] + 120

# ---------------- decision links ----------------
p1 = P(CMX + 1.35 / 2, CMY - 0.2, 1.4)
p2 = P(CMX + 0.2, CMY - 1.15 / 2, 1.9)
t1 = (NODE[0] - 14, NODE[1] - 6)
t2 = (A[0] - 4, m1 - 30)
d1 = f"M{p1[0]:.1f},{p1[1]:.1f} C {p1[0]+70:.0f},{p1[1]:.0f} {t1[0]-60:.0f},{t1[1]:.0f} {t1[0]:.1f},{t1[1]:.1f}"
d2 = f"M{p2[0]:.1f},{p2[1]:.1f} C {p2[0]+40:.0f},{p2[1]-90:.0f} {t2[0]-120:.0f},{t2[1]+40:.0f} {t2[0]:.1f},{t2[1]:.1f}"
out.append(f'<g id="decisions"><path class="decide" d="{d1}"/><path class="decide" d="{d2}"/></g>')

# ---------------- device platforms ----------------
dev = []
LPX, LPY, LPZ = 3.5, 4.83, 2.55
dev.append(shadow(LPX, LPY, 1.6, 1.6, contact=False))
dev.append(slab(LPX, LPY, 2.0, 1.5, 0.14, LPZ, 0.16, cls="plat", inset=0.10))
lz = LPZ + 0.16
dev.append(slab(LPX, LPY + 0.08, 1.30, 0.86, 0.07, lz, 0.06, cls="dev"))
for r_ in range(4):
    for c_ in range(9):
        kx = LPX - 0.52 + c_ * 0.125
        ky = LPY - 0.16 + r_ * 0.135
        kp = rrect_pts(kx, ky, 0.095, 0.10, 0.025, n=3)
        dev.append(f'<path class="key" d="{path_from([P(x, y, lz + 0.06) for x, y in kp])}"/>')
tp = rrect_pts(LPX, LPY + 0.36, 0.42, 0.22, 0.04, n=4)
dev.append(f'<path class="key" d="{path_from([P(x, y, lz + 0.06) for x, y in tp])}"/>')
dev.append(standing_panel(LPX, LPY + 0.08 - 0.86 / 2, lz + 0.03, 1.30, 0.92, 0.42, 0.06, "dev", camera=True))

dev.append(shadow(TPX, TPY, 1.9, 1.6, contact=False))
dev.append(slab(TPX, TPY, 2.5, 1.3, 0.14, TPZ, 0.16, cls="plat", inset=0.10))
tz = TPZ + 0.16
dev.append(standing_panel(TPX - 0.80, TPY + 0.1, tz, 0.85, 1.12, 0.24, 0.08, "dev"))
dev.append(standing_panel(TPX + 0.12, TPY + 0.1, tz, 0.85, 1.12, 0.24, 0.08, "dev"))
dev.append(standing_panel(TPX + 0.92, TPY + 0.1, tz, 0.46, 0.86, 0.24, 0.07, "dev"))
# the channel's exit point lights the underside of the tablet platform
dev.append(pool(A[0], A[1] + 6, 76, 26, cls="pool-hot"))
out.append('<g id="devices">' + "".join(dev) + "</g>")

# ---------------- traffic channel ----------------
jog = abs(A[0] - Bx)
ch_up = (f"M{A[0]:.1f},{A[1]:.1f} L{A[0]:.1f},{m1:.1f} "
         f"L{Bx:.1f},{m1 + jog * 0.5:.1f} L{Bx:.1f},{NODE[1] - 9:.1f}")
ch_dn = f"M{Bx:.1f},{NODE[1] + 9:.1f} L{Bx:.1f},{SRV_TOP[1]:.1f}"

# volumetric beam: a tapered sheet either side of each vertical run, fading
# with distance from the core. This is what sells the channel as light in air
# rather than a drawn line.
beam = (f'<path class="beam" d="M{A[0] - 17:.1f},{m1:.1f} L{A[0]:.1f},{A[1] - 8:.1f} '
        f'L{A[0] + 17:.1f},{m1:.1f} Z"/>'
        f'<path class="beam" d="M{Bx - 20:.1f},{SRV_TOP[1]:.1f} L{Bx:.1f},{NODE[1] + 6:.1f} '
        f'L{Bx + 20:.1f},{SRV_TOP[1]:.1f} Z"/>')

chan = beam
chan += (f'<path class="chan glow" d="{ch_up}"/><path class="chan glow" d="{ch_dn}"/>'
         f'<path class="chan-core" d="{ch_up}"/><path class="chan-core" d="{ch_dn}"/>'
         f'<path class="chan-hot flow" d="{ch_up}"/><path class="chan-hot flow" d="{ch_dn}"/>')
chan += f'<circle class="glowdot" cx="{A[0]:.1f}" cy="{A[1]:.1f}" r="3"/>'
out.append(f'<g id="channel">{chan}</g>')

# ---------------- dust motes ----------------
# Lit by the practicals: motes near the channel are warm, the rest neutral.
motes = []
for _ in range(46):
    mx = RNG.between(VX + 30, VX + W - 30)
    my = RNG.between(VY + 70, VY + H - 60)
    d = min(abs(mx - A[0]), abs(mx - Bx))
    warm = d < 90 and my > 260
    r = RNG.between(0.7, 2.1)
    op = RNG.between(0.10, 0.42) * (1.5 if warm else 1.0)
    cls = "mote-warm" if warm else "mote"
    motes.append(f'<circle class="{cls}" cx="{mx:.0f}" cy="{my:.0f}" r="{r:.1f}" opacity="{op:.2f}"/>')
out.append('<g id="motes" mask="url(#fade)">' + "".join(motes) + "</g>")

# ---------------- vignette (closes the frame, always last) ----------------
out.append(f'<rect id="vignette" x="{VX}" y="{VY}" width="{W}" height="{H}"/>')

# ============================================================ document
style = """
  /* ---- background ---- */
  .void{fill:url(#gVoid)}
  .roomlight{fill:url(#gRoom)}
  .keyhaze{fill:url(#gKey)}
  .ring{fill:none;stroke:var(--illus-ring,rgba(255,255,255,.045));stroke-width:1.2}
  .ring-fill{fill:var(--illus-ring,rgba(255,255,255,.022))}
  .haze{fill:url(#gHaze)}
  #vignette{fill:url(#gVig);pointer-events:none}
  .mote{fill:var(--illus-mote,#cfd2dc)}
  .mote-warm{fill:var(--illus-accent,#ff6a00)}
  .floorwash{fill:url(#gFloorWash)}

  /* ---- surfaces: key light via user-space gradients ---- */
  .grid line{stroke:var(--illus-grid,rgba(255,255,255,.055));stroke-width:1}
  .grid-fine line{stroke:var(--illus-grid,rgba(255,255,255,.055));stroke-width:.6;opacity:.45}
  .decor{fill:none;stroke:var(--illus-grid,rgba(255,255,255,.055));stroke-width:1}
  .decor-dot{fill:var(--illus-grid,rgba(255,255,255,.08))}
  .sh-amb{fill:var(--illus-shadow,rgba(0,0,0,.30))}
  .sh-float{fill:var(--illus-shadow-soft,rgba(0,0,0,.20))}
  .sh-core{fill:var(--illus-shadow-core,rgba(0,0,0,.38))}
  .plat-top{fill:url(#gTop);stroke:var(--illus-line,rgba(255,255,255,.28));stroke-width:1.1}
  .plat-side{fill:url(#gSide);stroke:var(--illus-line,rgba(255,255,255,.18));stroke-width:1}
  .unit-top{fill:url(#gTopHi);stroke:var(--illus-line,rgba(255,255,255,.30));stroke-width:1.1}
  .unit-side{fill:url(#gSide);stroke:var(--illus-line,rgba(255,255,255,.20));stroke-width:1}
  .dev-top{fill:url(#gTopHi);stroke:var(--illus-line,rgba(255,255,255,.32));stroke-width:1.1}
  .dev-side{fill:url(#gSide);stroke:var(--illus-line,rgba(255,255,255,.16));stroke-width:1}
  .glass-top{fill:url(#gGlass);stroke:var(--illus-line,rgba(255,255,255,.30));stroke-width:1.1}
  .glass-side{fill:url(#gGlassSide);stroke:var(--illus-line,rgba(255,255,255,.22));stroke-width:1}
  /* the rim pass — one value brighter than the base stroke, and it fades
     along the same diagonal as the key so only lit edges catch it */
  .rim{fill:none;stroke:url(#gRim);stroke-width:1.1}
  .inset{fill:none;stroke:var(--illus-line,rgba(255,255,255,.14));stroke-width:1}
  .screen{fill:url(#gScreen);stroke:var(--illus-line,rgba(255,255,255,.10));stroke-width:.8}
  .sheen{fill:var(--illus-sheen,rgba(255,255,255,.045))}
  .cam{fill:var(--illus-line,rgba(255,255,255,.35))}
  .key{fill:var(--illus-key,rgba(255,255,255,.06));stroke:var(--illus-line,rgba(255,255,255,.14));stroke-width:.6}
  .wall{fill:url(#gWall);stroke:var(--illus-line,rgba(255,255,255,.16));stroke-width:1}
  .doorframe{fill:none;stroke:var(--illus-line,rgba(255,255,255,.20));stroke-width:1}
  .doorslit{fill:var(--illus-screen,#070708);stroke:var(--illus-line,rgba(255,255,255,.12));stroke-width:1}
  .reader{fill:url(#gTopHi);stroke:var(--illus-line,rgba(255,255,255,.30));stroke-width:1}
  .slot{fill:var(--illus-screen,#08080a);stroke:var(--illus-line,rgba(255,255,255,.22));stroke-width:.9}
  .vent{fill:var(--illus-key,rgba(255,255,255,.10))}
  .port{fill:none;stroke:var(--illus-line,rgba(255,255,255,.25));stroke-width:.9}
  .led{fill:var(--illus-key,rgba(255,255,255,.14))}
  .led-on{fill:var(--illus-accent,#ff6a00)}
  .panel-hdr{fill:var(--illus-key,rgba(255,255,255,.10))}
  .panel-line{fill:var(--illus-key,rgba(255,255,255,.10))}
  .panel-bar{fill:var(--illus-accent-dim,rgba(255,106,0,.55))}
  .panel-ic{fill:none;stroke:var(--illus-line,rgba(255,255,255,.35));stroke-width:1.2}
  .panel-ic.ok{stroke:var(--illus-accent,#ff6a00)}

  /* ---- practicals: emissives and the light they spill ---- */
  .glowdot{fill:var(--illus-accent,#ff6a00);filter:url(#soft)}
  .glowhalo{fill:var(--illus-accent,#ff6a00);opacity:.22;filter:url(#big)}
  .pool{fill:url(#gPool)}
  .pool-hot{fill:url(#gPoolHot)}
  .wallspill{fill:url(#gPool)}
  .facewash{fill:url(#gPool);opacity:.7}
  .beam{fill:url(#gBeam)}
  .chan{stroke:var(--illus-accent,#ff6a00);stroke-width:7;fill:none;opacity:.55;stroke-linejoin:round}
  .glow{filter:url(#big)}
  .chan-core{stroke:var(--illus-accent,#ff6a00);stroke-width:3.4;fill:none;stroke-linejoin:round;stroke-linecap:round}
  .chan-hot{stroke:var(--illus-hot,#ffc79b);stroke-width:1.4;fill:none;stroke-linejoin:round;stroke-linecap:round}
  .floorline{stroke:var(--illus-accent,#ff6a00);stroke-width:5;fill:none;opacity:.62}
  .floorline-core{stroke:var(--illus-accent,#ff6a00);stroke-width:2;fill:none}
  .decide{stroke:var(--illus-accent,#ff6a00);stroke-width:1.4;fill:none;stroke-dasharray:3 6;opacity:.75;stroke-linecap:round;animation:decide 3.2s linear infinite}
  .flow{stroke-dasharray:5 14;animation:flowmove 1.1s linear infinite}
  .pulse{animation:pulse 2.6s ease-in-out infinite}
  @keyframes flowmove{to{stroke-dashoffset:-38}}
  @keyframes decide{to{stroke-dashoffset:-27}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
  @media (prefers-reduced-motion:reduce){.flow,.decide,.pulse{animation:none}}
"""

# Gradients run on ONE diagonal in user space (0,0 -> W,H), which is the key
# light direction. Sharing the ramp across every object is what keeps two
# slabs at different depths agreeing about where the light is.
defs = f"""
<defs>
  <filter id="soft" x="-120%" y="-120%" width="340%" height="340%">
    <feGaussianBlur stdDeviation="2.2"/>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="big" x="-80%" y="-80%" width="260%" height="260%">
    <feGaussianBlur stdDeviation="7"/>
  </filter>

  <linearGradient id="gVoid" x1="0" y1="{VY}" x2="0" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-void-1,#070709)"/>
    <stop offset="55%" stop-color="var(--illus-void-2,#0a0a0d)"/>
    <stop offset="100%" stop-color="var(--illus-void-3,#060608)"/>
  </linearGradient>
  <radialGradient id="gRoom" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="var(--illus-room,#ff8a3d)" stop-opacity="var(--illus-room-a,.085)"/>
    <stop offset="60%" stop-color="var(--illus-room,#ff8a3d)" stop-opacity="var(--illus-room-b,.03)"/>
    <stop offset="100%" stop-color="var(--illus-room,#ff8a3d)" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gKey" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="var(--illus-keylight,#9fb6d8)" stop-opacity="var(--illus-keylight-a,.07)"/>
    <stop offset="100%" stop-color="var(--illus-keylight,#9fb6d8)" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gHaze" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="var(--illus-haze,#8fa4c4)" stop-opacity="var(--illus-haze-a,.055)"/>
    <stop offset="100%" stop-color="var(--illus-haze,#8fa4c4)" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gVig" cx="26%" cy="56%" r="86%">
    <stop offset="0" stop-color="#000" stop-opacity="0"/>
    <stop offset="62%" stop-color="#000" stop-opacity="0"/>
    <stop offset="100%" stop-color="var(--illus-vignette,#000)" stop-opacity="var(--illus-vignette-a,.62)"/>
  </radialGradient>
  <radialGradient id="gFloorWash" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="var(--illus-floorwash,#ffffff)" stop-opacity="var(--illus-floorwash-a,.035)"/>
    <stop offset="100%" stop-color="var(--illus-floorwash,#ffffff)" stop-opacity="0"/>
  </radialGradient>

  <linearGradient id="gTop" x1="{VX}" y1="{VY}" x2="{VX + W}" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-top-hi,#23232d)"/>
    <stop offset="1" stop-color="var(--illus-top,#111114)"/>
  </linearGradient>
  <linearGradient id="gTopHi" x1="{VX}" y1="{VY}" x2="{VX + W}" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-top-hi2,#2b2b37)"/>
    <stop offset="1" stop-color="var(--illus-top,#141418)"/>
  </linearGradient>
  <linearGradient id="gSide" x1="{VX}" y1="{VY}" x2="{VX + W}" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-side-hi,#14141a)"/>
    <stop offset="1" stop-color="var(--illus-side,#08080b)"/>
  </linearGradient>
  <linearGradient id="gWall" x1="0" y1="{VY}" x2="0" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-wall-hi,#191920)"/>
    <stop offset="1" stop-color="var(--illus-wall,#0a0a0d)"/>
  </linearGradient>
  <linearGradient id="gGlass" x1="{VX}" y1="{VY}" x2="{VX + W}" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-glass-hi,rgba(32,32,42,.95))"/>
    <stop offset="1" stop-color="var(--illus-glass-top,rgba(17,17,22,.94))"/>
  </linearGradient>
  <linearGradient id="gGlassSide" x1="{VX}" y1="{VY}" x2="{VX + W}" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-glass-side-hi,rgba(20,20,27,.96))"/>
    <stop offset="1" stop-color="var(--illus-glass-side,rgba(11,11,15,.96))"/>
  </linearGradient>
  <linearGradient id="gScreen" x1="{VX}" y1="{VY}" x2="{VX + W}" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-screen-hi,#0d0d12)"/>
    <stop offset="1" stop-color="var(--illus-screen,#08080a)"/>
  </linearGradient>
  <linearGradient id="gRim" x1="{VX}" y1="{VY}" x2="{VX + W}" y2="{VY + H}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="var(--illus-rim,#ffffff)" stop-opacity="var(--illus-rim-a,.30)"/>
    <stop offset="55%" stop-color="var(--illus-rim,#ffffff)" stop-opacity="var(--illus-rim-b,.07)"/>
    <stop offset="1" stop-color="var(--illus-rim,#ffffff)" stop-opacity="0"/>
  </linearGradient>

  <radialGradient id="gPool" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="var(--illus-accent,#ff6a00)" stop-opacity=".22"/>
    <stop offset="100%" stop-color="var(--illus-accent,#ff6a00)" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="gPoolHot" cx="50%" cy="50%" r="50%">
    <stop offset="0" stop-color="var(--illus-accent,#ff6a00)" stop-opacity=".34"/>
    <stop offset="55%" stop-color="var(--illus-accent,#ff6a00)" stop-opacity=".10"/>
    <stop offset="100%" stop-color="var(--illus-accent,#ff6a00)" stop-opacity="0"/>
  </radialGradient>
  <linearGradient id="gBeam" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="var(--illus-accent,#ff6a00)" stop-opacity=".21"/>
    <stop offset="100%" stop-color="var(--illus-accent,#ff6a00)" stop-opacity="0"/>
  </linearGradient>

  <radialGradient id="fadegrad" cx="32%" cy="58%" r="96%">
    <stop offset="0%" stop-color="#fff"/>
    <stop offset="46%" stop-color="#fff" stop-opacity=".72"/>
    <stop offset="78%" stop-color="#fff" stop-opacity=".28"/>
    <stop offset="100%" stop-color="#000"/>
  </radialGradient>
  <mask id="fade"><rect x="{VX}" y="{VY}" width="{W}" height="{H}" fill="url(#fadegrad)"/></mask>
</defs>
"""

svg = (f'<svg viewBox="{VX} {VY} {W} {H}" fill="none" xmlns="http://www.w3.org/2000/svg" '
       f'preserveAspectRatio="xMinYMid slice" '
       f'role="img" aria-label="InstaSafe split-plane architecture: user devices connect '
       f'directly to applications while the control plane issues access decisions beside the path">'
       f'<style>{style}</style>{defs}' + "".join(out) + '</svg>')

banner = (
    "/* AUTO-GENERATED by lib/scripts/gen-demo-scene.py — do not edit by hand.\n"
    "   Re-run `python lib/scripts/gen-demo-scene.py` from the repo root after\n"
    "   changing the generator. The scene is inlined rather than served as an\n"
    "   <img> because it is theme-driven: an <img> cannot inherit the page's\n"
    "   CSS variables, so the paper theme would render the dark fallbacks. */\n\n"
)

with open(os.path.abspath(OUT), "w", encoding="utf-8") as f:
    f.write(banner + "export const DEMO_SCENE_SVG = `" + svg.replace("`", "\\`").replace("${", "\\${") + "`;\n")

print("wrote", os.path.abspath(OUT), "bytes:", len(svg))
