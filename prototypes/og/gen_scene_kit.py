#!/usr/bin/env python3
"""
gen_scene_kit.py — InstaSafe isometric illustration kit.

Reproduces the reference art style as parametric SVG:
  warm bone ground, matte off-white bodies, charcoal hairline edges,
  charcoal bezel bands with LED dots, orange routes with junction cubes,
  ghosted denied estate, faint background traces.

Primitives:  pad, body, standing panel (with a real 2D drawing plane),
             route, trace, ghost_stack, laptop, chip, glow_ring
Scenes:      ztna_flow  (left-to-right)   mfa_hub (hub-and-spoke)
"""
import math, base64, re

COS30 = math.cos(math.radians(30))
SIN30 = 0.5
SCREEN_INSET = 0.08   # inner margin on every laptop screen, as a fraction


# ─────────────────────────────────────────── rendered size is the unit
# These drawings are not diagrams, they are social thumbnails. The finished
# 1200x630 card gives the artwork a 730 px slot (SCENE_W in
# lib/scripts/gen-og-pages.mjs), so a glyph authored at N units on a canvas
# W units wide lands at N * 730 / W card pixels — and every label in this
# kit used to be sized in units, which is a number with no relationship to
# whether a human can read it. Type is therefore quoted in FINISHED-CARD
# PIXELS from here on and converted at draw time.
#
# CARD_PX["k"] is the 730/W factor for the scene currently being built.
# gen_og_kit solves it per scene by fixed point, because the canvas is
# derived from the artwork and the artwork's type is now derived from the
# canvas. A scene drawn outside that solver just gets k = 1.
CARD_SCENE_W = 730.0
CARD_PX = {"k": 1.0}

# The projection foreshortens type, and by different amounts per surface:
#   panel  — iso() sends local (1,0) and (0,1) to (cos30, sin30) and (0,1).
#            Both unit length, but they span |det| = cos30, so a glyph
#            comes out at sqrt(cos30) = 0.9306 of nominal.
#   screen — the lid also leans back (lean 8 over hgt 58) and laptop() then
#            shrinks the content into the SCREEN_INSET box:
#            0.983 * (1 - 2*0.08) = 0.826.
#   flat   — scene_text sets type straight into the projected plane; no
#            surface, no foreshortening.
PANEL_PROJ = math.sqrt(COS30)
SCREEN_PROJ = 0.826
FLAT_PROJ = 1.0

MIN_TEXT_PX = 14.0    # audit G floor — below this it is not a label, it is grain
CAP_TEXT_PX = 20.0    # the two-line caption plates, the scenes' primary labels


def cardpx(target, proj=PANEL_PROJ):
    """Local font-size that renders at `target` px on the finished card."""
    return target / (CARD_PX["k"] * proj)


def iso(x, y, z=0.0):
    return ((x - y) * COS30, (x + y) * SIN30 - z)


def P(p):
    return "%.2f,%.2f" % p


def rrect(x, y, w, d, c=0.0):
    if c <= 0:
        return [(x, y), (x + w, y), (x + w, y + d), (x, y + d)]
    return [(x + c, y), (x + w - c, y), (x + w, y + c), (x + w, y + d - c),
            (x + w - c, y + d), (x + c, y + d), (x, y + d - c), (x, y + c)]


def circ(cx, cy, r, n=40):
    return [(cx + r * math.cos(2 * math.pi * i / n),
             cy + r * math.sin(2 * math.pi * i / n)) for i in range(n)]


# --------------------------------------------------------------- palette
C = dict(
    bg="#F7F4EF",
    top="#FCFBF9", right="#F0EDE7", left="#E1DDD5",
    band_t="#34343A", band_r="#2A2A2F", band_l="#202024",
    edge="#33333A", edge_soft="#8C8880",
    ink="#2B2B2E", mid="#6E6A63",
    acc="#F2621A", acc_soft="#FBC9A8",
    ok="#1E9E52",
    ghost_f="#FBFAF7", ghost_s="#D6D2CA",
    trace="#DCD8D0",
    screen="#F4F2ED", screen_dark="#2E2E33",
    led="#C9C4BB",
)


class Scene:
    def __init__(self, name):
        self.name, self.items = name, []
        self.bx = [1e9, -1e9, 1e9, -1e9]
        # ── geometry registries, read by the audits in gen_og_kit.py ──
        # Nothing here changes what is drawn; the primitives simply record
        # what they drew so overlap/clearance can be proved in code rather
        # than eyeballed.
        self.routes = []    # {pts: projected polyline, pts3, glow}
        self.pads = []      # {fp: (x,y,w,d), deck: projected top polygon}
        self.panels = []    # {anchor: (x,y), poly: projected face polygon}
        self.labels = []    # {rect: (x0,y0,x1,y1) projected, text}
        self.laptops = []   # {screen, deck, ratio, w, d}
        self.plates = []    # {kind, w, h, content} - every drawing surface,
                            #   read by the text-fits + screen-margin audits

    def add(self, o, s):
        self.items.append((o, s))

    def mark(self, pts):
        for x, y in pts:
            self.bx[0] = min(self.bx[0], x); self.bx[1] = max(self.bx[1], x)
            self.bx[2] = min(self.bx[2], y); self.bx[3] = max(self.bx[3], y)

    def vb(self, pad=26):
        x0, x1, y0, y1 = self.bx
        return "%.1f %.1f %.1f %.1f" % (x0 - pad, y0 - pad,
                                        (x1 - x0) + pad * 2, (y1 - y0) + pad * 2)

    def body(self):
        return "\n".join(s for _, s in sorted(self.items, key=lambda t: t[0]))


# --------------------------------------------------------------- primitives
def prism(sc, fp, z0, h, top, right, left, o=0, stroke=None, sw=1.1, op=1.0):
    stroke = C["edge"] if stroke is None else stroke
    g = ['<g opacity="%.2f">' % op] if op < 1 else ["<g>"]
    n = len(fp)
    for i in range(n):
        x1, y1 = fp[i]; x2, y2 = fp[(i + 1) % n]
        dx, dy = x2 - x1, y2 - y1
        nx, ny = dy, -dx
        if nx + ny <= 0.0001:
            continue
        fill = right if nx > ny else left
        pts = [iso(x1, y1, z0), iso(x2, y2, z0), iso(x2, y2, z0 + h), iso(x1, y1, z0 + h)]
        g.append('<polygon points="%s" fill="%s" stroke="%s" stroke-width="%.2f" '
                 'stroke-linejoin="round"/>' % (" ".join(P(p) for p in pts), fill, stroke, sw))
    tp = [iso(x, y, z0 + h) for x, y in fp]
    sc.mark(tp); sc.mark([iso(x, y, z0) for x, y in fp])
    g.append('<polygon points="%s" fill="%s" stroke="%s" stroke-width="%.2f" '
             'stroke-linejoin="round"/>' % (" ".join(P(p) for p in tp), top, stroke, sw))
    g.append("</g>")
    sc.add(o, "".join(g))


def body(sc, fp, z0, h, o=0, sw=1.1, op=1.0, top=None):
    prism(sc, fp, z0, h, top or C["top"], C["right"], C["left"], o, sw=sw, op=op)


def bandprism(sc, fp, z0, h, o=0):
    prism(sc, fp, z0, h, C["band_t"], C["band_r"], C["band_l"], o, sw=0.9)


def face(sc, fp, z, fill, o=0, op=1.0, stroke="none", sw=.8):
    pts = [iso(x, y, z) for x, y in fp]
    sc.mark(pts)
    sc.add(o, '<polygon points="%s" fill="%s" opacity="%.2f" stroke="%s" '
              'stroke-width="%.2f"/>' % (" ".join(P(p) for p in pts), fill, op, stroke, sw))


def pad(sc, x, y, w, d, z=0.0, o=0, c=9.0, leds=True, h1=6.5, hb=2.6, h2=4.5,
        group=None):
    """The signature plinth: white slab, charcoal bezel band, white base."""
    fp = rrect(x, y, w, d, c)
    body(sc, fp, z + hb + h2, h1, o=o + .3)                     # upper slab
    bandprism(sc, rrect(x + 1.5, y + 1.5, w - 3, d - 3, c), z + h2, hb, o=o + .2)
    body(sc, rrect(x + .5, y + .5, w - 1, d - 1, c), z, h2, o=o + .1)   # base
    face(sc, rrect(x + 7, y + 7, w - 14, d - 14, c * .7), z + hb + h2 + h1 + .02,
         "none", o=o + .35, stroke=C["edge_soft"], sw=.7, op=.5)
    if leds:
        for i in range(5):
            cx = x + w * .30 + i * (w * .055)
            col = C["acc"] if i in (1, 2) else C["led"]
            quad(sc, [(cx, y + d, z + h2 + hb + h1 * .35),
                      (cx + w * .022, y + d, z + h2 + hb + h1 * .35),
                      (cx + w * .022, y + d, z + h2 + hb + h1 * .62),
                      (cx, y + d, z + h2 + hb + h1 * .62)], col, o=o + .4)
    deck = z + h2 + hb + h1
    sc.pads.append(dict(fp=(x, y, w, d), group=group, z=deck,
                        deck=[iso(px, py, deck) for px, py in fp]))
    return deck                      # deck height


def quad(sc, pts3, fill, o=0, stroke="none", sw=1.0, op=1.0):
    pts = [iso(*p) for p in pts3]
    sc.mark(pts)
    sc.add(o, '<polygon points="%s" fill="%s" stroke="%s" stroke-width="%.2f" '
              'opacity="%.2f" stroke-linejoin="round"/>'
              % (" ".join(P(p) for p in pts), fill, stroke, sw, op))


def plane3(sc, O, U, V, content, o=0):
    """2D drawing surface anywhere in 3D. O = top-left, U = one local px right,
       V = one local px down. Handles tilted faces, not just upright panels."""
    ox, oy = iso(*O)
    ux, uy = iso(O[0]+U[0], O[1]+U[1], O[2]+U[2])
    vx, vy = iso(O[0]+V[0], O[1]+V[1], O[2]+V[2])
    sc.add(o, '<g transform="matrix(%.5f,%.5f,%.5f,%.5f,%.2f,%.2f)">%s</g>'
              % (ux-ox, uy-oy, vx-ox, vy-oy, ox, oy, content))
    sc.mark([(ox, oy)])


def panel(sc, x, y, z_top, w, h, content, o=0, audit=True, tag=""):
    """Upright panel at constant y, spanning +x, facing lower-right.

    `tag` is for the audits, not the drawing: tag="cap" marks a free-
    floating caption plate, which unlike a panel standing ON a plinth has
    to be proved clear OF every plinth (audit C). That check exists
    because two plates shipped sitting on a plinth's front-left face."""
    plane3(sc, (x, y, z_top), (1, 0, 0), (0, 0, -1), content, o)
    sc.mark([iso(x, y, z_top), iso(x + w, y, z_top - h)])
    if audit:
        sc.panels.append(dict(anchor=(x, y), z=z_top, w=w, h=h, o=o, tag=tag, poly=[
            iso(x, y, z_top), iso(x + w, y, z_top),
            iso(x + w, y, z_top - h), iso(x, y, z_top - h)]))
        sc.plates.append(dict(kind="panel", w=w, h=h, content=content))


def label_box(sc, px, py, w, h, text=""):
    """Register bare in-scene type (the DENIED caps idiom, OTP digits) so the
       route-overlap audit can see text extents, not just panels."""
    sc.labels.append(dict(rect=(px, py, px + w, py + h), text=text))
    sc.mark([(px, py), (px + w, py + h)])


def route(sc, pts3, o=0, cube_at=None, dot_start=True, dot_end=True, sw=2.6,
          glow=1.0, deck_ok=False):
    """`glow` scales the wide underglow (0 drops it entirely). Fix B: near a
       panel the .18-opacity halo is what actually collides, so a route that
       has to run close carries a narrowed or absent glow."""
    d = "M" + " L".join("%.2f %.2f" % iso(*p) for p in pts3)
    s = ""
    if glow > 0:
        s += ('<path d="%s" fill="none" stroke="%s" stroke-width="%.1f" opacity=".18" '
              'stroke-linecap="round" stroke-linejoin="round"/>'
              % (d, C["acc"], sw * 3.2 * glow))
    s += ('<path d="%s" fill="none" stroke="%s" stroke-width="%.2f" '
          'stroke-linecap="round" stroke-linejoin="round"/>' % (d, C["acc"], sw))
    sc.mark([iso(*p) for p in pts3])
    sc.routes.append(dict(pts=[iso(*p) for p in pts3], pts3=list(pts3),
                          glow=glow, sw=sw, o=o, deck_ok=deck_ok))
    for use, p in ((dot_start, pts3[0]), (dot_end, pts3[-1])):
        if not use:
            continue
        x, y = iso(*p)
        s += ('<circle cx="%.2f" cy="%.2f" r="4.4" fill="%s"/>'
              '<circle cx="%.2f" cy="%.2f" r="1.9" fill="%s"/>'
              % (x, y, C["acc"], x, y, C["bg"]))
    sc.add(o, s)
    if cube_at:
        cx, cy, cz = cube_at
        body(sc, rrect(cx - 3.4, cy - 3.4, 6.8, 6.8, 1.2), cz, 6.8,
             o=o + .05, sw=.9)


def trace(sc, pts2, o=0, z=0.0, nodes=()):
    d = "M" + " L".join("%.2f %.2f" % iso(x, y, z) for x, y in pts2)
    s = ('<path d="%s" fill="none" stroke="%s" stroke-width="1.15" '
         'stroke-dasharray="6 6" stroke-linejoin="round" stroke-linecap="round"/>'
         % (d, C["trace"]))
    for nx, ny in nodes:
        x, y = iso(nx, ny, z)
        s += ('<circle cx="%.2f" cy="%.2f" r="3.6" fill="%s" stroke="%s" '
              'stroke-width="1.1"/>' % (x, y, C["bg"], C["trace"]))
    sc.add(o, s)


def ghost_stack(sc, x, y, z, o=0, w=30, d=24, tiers=2):
    for k in range(tiers):
        prism(sc, rrect(x, y, w, d, 3), z + k * 9.5, 8.0,
              C["ghost_f"], C["ghost_f"], "#F2EFEA", o=o + k * .1,
              stroke=C["ghost_s"], sw=1.0, op=.9)
        face(sc, rrect(x + 4, y + d - 7, w * .34, 3, 1), z + k * 9.5 + 8.05,
             C["ghost_s"], o=o + k * .1 + .05, op=.7)


def xmark(sc, p3, o=0, r=7.0):
    x, y = iso(*p3)
    sc.add(o, '<g><circle cx="%.2f" cy="%.2f" r="%.2f" fill="%s" stroke="%s" '
              'stroke-width="1.2"/><path d="M%.2f %.2f L%.2f %.2f M%.2f %.2f L%.2f %.2f" '
              'stroke="%s" stroke-width="1.6" stroke-linecap="round"/></g>'
              % (x, y, r, C["bg"], C["edge_soft"],
                 x - r * .36, y - r * .36, x + r * .36, y + r * .36,
                 x + r * .36, y - r * .36, x - r * .36, y + r * .36, C["edge_soft"]))


def glow_ring(sc, cx, cy, z, r, o=0, o_back=None, sw=3.2):
    """A ring drawn AROUND something is not a complete visible ellipse: the
    near arc passes in front of the object, the far arc passes behind it and
    is occluded. So the ellipse ships as two half-arcs at two draw orders.

    In this projection the viewer is at large (x+y), so the FAR half is the
    upper half of the projected ellipse (smaller screen y) and the NEAR half
    is the lower half. `o` is the near arc (in front of the object),
    `o_back` the far arc (behind it) — pass an o_back below the encircled
    object's own draw order or the illusion collapses.
    """
    x, y = iso(cx, cy, z)
    rx, ry = r * COS30 * 2, r * SIN30 * 2
    far = "M%.2f %.2f A%.1f %.1f 0 0 1 %.2f %.2f" % (x - rx, y, rx, ry, x + rx, y)
    near = "M%.2f %.2f A%.1f %.1f 0 0 0 %.2f %.2f" % (x - rx, y, rx, ry, x + rx, y)
    ob = (o - 3.0) if o_back is None else o_back
    for d, oo in ((far, ob), (near, o)):
        sc.add(oo, '<path d="%s" fill="none" stroke="%s" stroke-width="%.1f" '
                   'opacity=".18" stroke-linecap="round"/>'
                   '<path d="%s" fill="none" stroke="%s" stroke-width="%.1f" '
                   'opacity=".9" stroke-linecap="round"/>'
                   % (d, C["acc"], sw * 2.8, d, C["acc"], sw))
    sc.mark([(x - rx, y - ry), (x + rx, y + ry)])
    sc.rings = getattr(sc, "rings", [])
    sc.rings.append(dict(o=o, o_back=ob, r=r))


def poly_area(pts):
    """|signed area| of a projected polygon — the audits' one measuring tape."""
    a = 0.0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        a += x1 * y2 - x2 * y1
    return abs(a) / 2.0


def laptop(sc, x, y, z, o=0, w=86, d=44, screen_svg="", sw_local=None,
           lean=8.0, hgt=58.0):
    """FIX A — the screen dominates the deck.

    Before: d defaulted to 64, lean 15, hgt 50, four rows of thirteen keys.
    The projected screen quad measured (w-6)·cos30·(hgt+lean) = 4503 sq-units
    against a deck top of cos30·w·d = 4766 — the keyboard literally drew
    bigger than the display, which is what the client saw.

    After: d 44, lean 8, hgt 58, three rows of eleven keys. Screen 5280 vs
    deck 3784 on the same w=86 — a 1.40 ratio. Deck depth is now ~half the
    width at every call site and the keyboard plate shrinks with it. Every
    laptop registers both areas in sc.laptops so the audit proves it.
    """
    body(sc, rrect(x, y, w, d, 5), z, 5.5, o=o)
    kb_y = y + d * .34
    kb_d = d * .44
    face(sc, rrect(x + 8, kb_y, w - 16, kb_d, 3), z + 5.55, "#F1EEE8", o=o + .05)
    cols, rows = 12, 4        # a keyboard needs a grid; 3x11 read as buttons
    for r_ in range(rows):
        for c_ in range(cols):
            kw = (w - 22) / cols
            kh = (kb_d - 4.0) / rows
            face(sc, rrect(x + 11 + c_ * kw, kb_y + 2.2 + r_ * kh,
                           kw - 1.1, kh - 1.0, .5),
                 z + 5.62, C["screen_dark"], o=o + .06, op=.9)
    face(sc, rrect(x + w * .37, y + d * .83, w * .26, d * .11, 2.2), z + 5.62,
         "#F8F6F1", o=o + .06, stroke=C["edge_soft"], sw=.8)
    p0 = (x + 3, y + 5, z + 5.5)
    p1 = (x + w - 3, y + 5, z + 5.5)
    p3 = (x + 3, y + 5 - lean, z + 5.5 + hgt)
    p2 = (x + w - 3, y + 5 - lean, z + 5.5 + hgt)
    quad(sc, [p0, p1, p2, p3], C["screen_dark"], o=o + .1, stroke=C["edge"], sw=1.3)
    ins = 4.0
    q0 = (p0[0] + ins, p0[1] - .7, p0[2] + 3.2)
    q1 = (p1[0] - ins, p1[1] - .7, p1[2] + 3.2)
    q2 = (p2[0] - ins, p2[1] + .7, p2[2] - 3.2)
    q3 = (p3[0] + ins, p3[1] + .7, p3[2] - 3.2)
    quad(sc, [q0, q1, q2, q3], C["screen"], o=o + .11)

    scr = poly_area([iso(*p) for p in (p0, p1, p2, p3)])
    dck = poly_area([iso(px, py, z + 5.5) for px, py in rrect(x, y, w, d, 5)])
    sc.laptops.append(dict(screen=scr, deck=dck, ratio=scr / dck, w=w, d=d))

    if screen_svg:
        # Default local canvas is proportional to the real screen so nothing
        # on it stretches when hgt/lean change.
        LW, LH = sw_local or (w - 14, math.hypot(lean, hgt) - 6.4)
        U = ((q1[0]-q0[0])/LW, (q1[1]-q0[1])/LW, (q1[2]-q0[2])/LW)
        V = ((q0[0]-q3[0])/LH, (q0[1]-q3[1])/LH, (q0[2]-q3[2])/LH)
        # SCREEN_INSET: every screen gets a mechanical inner margin so no
        # glyph can weld itself to the bezel. Content is authored against the
        # full LW x LH canvas and then shrunk into the inset box, which means
        # "content fits the canvas" (audited) implies "content clears the
        # edge by SCREEN_INSET" (guaranteed).
        k = 1.0 - SCREEN_INSET * 2
        plane3(sc, q3, U, V,
               '<g transform="translate(%.2f,%.2f) scale(%.4f)">%s</g>'
               % (LW * SCREEN_INSET, LH * SCREEN_INSET, k, screen_svg),
               o=o + .12)
        sc.plates.append(dict(kind="screen", w=LW, h=LH, content=screen_svg))

# --------------------------------------------------------------- panel content
def panel_svg(w, h, inner, r=7):
    return ('<rect x="0" y="0" width="%d" height="%d" rx="%d" fill="%s" '
            'stroke="%s" stroke-width="1.4"/>%s' % (w, h, r, C["screen"], C["edge"], inner))


def xml_esc(t):
    """Labels are authored as plain strings ("AWARDS &"), so escape before
    they land in markup — an unescaped & is invalid XML and any SVG-file
    export (or a Satori pipeline) rejects the whole document."""
    return (str(t).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


def xml_unesc(t):
    """The inverse, for the audits. "AWARDS &" is eight glyphs on the
    plate but twelve characters in the markup, and an audit that reads the
    markup and counts characters makes the plate 50 units too narrow —
    which is exactly what it did the first time a caption carried an
    ampersand at full size."""
    return (str(t).replace("&lt;", "<").replace("&gt;", ">").replace("&amp;", "&"))


def mono(x, y, t, size=9, fill=None, weight=700, ls=".08em", anchor="start"):
    t = xml_esc(t)
    return ('<text x="%.1f" y="%.1f" font-family="ui-monospace,SFMono-Regular,Menlo,monospace" '
            'font-size="%.1f" font-weight="%d" letter-spacing="%s" fill="%s" '
            'text-anchor="%s">%s</text>'
            % (x, y, size, weight, ls, fill or C["ink"], anchor, t))


MONO_ADV = 0.60          # monospace advance as a fraction of font-size


def mono_width(txt, size, ls=""):
    """Estimated advance width of a monospace string, letter-spacing
    included. Chrome renders these in a real mono face; 0.60em per
    character is the standard advance. Lives beside mono() because every
    plate that has to be BUILT AROUND its type needs it before the type
    exists, and the text-fits audit needs the same number afterwards."""
    n = len(txt)
    if n == 0:
        return 0.0
    em = 0.0
    if ls:
        m = re.match(r"\s*(-?[\d.]+)\s*em", ls)
        if m:
            em = float(m.group(1))
    return n * size * MONO_ADV + max(0, n - 1) * size * em


def screen_canvas(w, lean=8.0, hgt=58.0):
    """The local drawing canvas laptop() will hand its screen_svg — the
       same expression laptop() uses, exposed so a caller can size type
       against the lid BEFORE handing it over."""
    return w - 14.0, math.hypot(lean, hgt) - 6.4


def screen_caption(LW, LH, lines, px=15.0, fill=None, ls=".08em"):
    """A one- or two-word caption filling a laptop lid.

    Set as large as MIN_TEXT_PX asks for, then clamped to what the lid can
    actually hold — and the lid is a real constraint, not a formality: a
    58-unit-tall screen canvas holds two lines at 22 units at the tightest
    honest leading, and the widest scene in the set wants 19.4 across only
    78 units of width. Where the clamp bites hard the fix is a bigger
    laptop, not smaller type; audit G fails the scene if the clamp drags a
    line under the floor, so that decision cannot be made by accident.

    The leading is deliberately tight (1.28em) and the first baseline sits
    at 0.86em. Two lines then occupy 2.36em of the 3.0em a comfortable
    setting would want, which is what buys the size."""
    s = cardpx(px, SCREEN_PROJ)
    top, lead = 0.86, 1.28
    wide = max(mono_width(t, 1.0, ls) for t in lines)
    s = min(s, (LW - 6.0) / wide, LH / (top + lead * (len(lines) - 1) + 0.24))
    return "".join(mono(3.0, s * (top + lead * i), t, s, fill or C["acc"], 700, ls)
                   for i, t in enumerate(lines))


def tick(x, y, r=9):
    return ('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="%s"/>'
            '<path d="M%.1f %.1f l%.1f %.1f l%.1f %.1f" stroke="#fff" stroke-width="2" '
            'fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
            % (x, y, r, C["ok"], x - r * .42, y, r * .32, r * .36, r * .56, -r * .62))


def shield(x, y, s=1.0, fill="none", stroke=None, sw=2.0):
    stroke = stroke or C["ink"]
    d = ("M%.1f %.1f l%.1f %.1f l0 %.1f q0 %.1f %.1f %.1f l%.1f %.1f "
         "l%.1f %.1f q%.1f %.1f %.1f %.1f l0 %.1f z"
         % (x, y, 14 * s, -5 * s, 15 * s, 9 * s, -6 * s, 11 * s, -8 * s, 6 * s,
            -8 * s, -6 * s, -6 * s, -2 * s, -6 * s, -11 * s, -15 * s))
    return '<path d="%s" fill="%s" stroke="%s" stroke-width="%.1f" stroke-linejoin="round"/>' % (
        d, fill, stroke, sw)


# =============================================================================
#  SCENE 1 — ZTNA flow  (recreates the left-to-right reference)
# =============================================================================
def ztna_flow():
    """FIX D — same three-station story, re-blocked.

    Stations were 12 scene-units apart and both routes ran diagonally over
    pad decks and clipped the trust panel; the ENCRYPTED TUNNEL chip sat on
    top of the first route; the NETWORK NOT ACCESSIBLE caps ran into the
    ghost cluster. Now: footprints ≥24 apart, both routes travel the empty
    channel between stations and land on a pad's front-left base corner
    (never across a panel face).

    FIX G — the legibility pass. This scene carried the most unreadable
    type of the fifteen, on the widest canvas (798 units, so 0.92 card px
    per unit). Gone entirely, on the client's instruction: the ZTNA / "No
    network exposure." / "Least-privilege access." side plate (7.2 px
    sentences — a spec sheet on a thumbnail) and the NETWORK NOT ACCESSIBLE
    caps (11.4 px). The ghosted, crossed-out estate says "no network" by
    itself; that is what rule 7 is for. Gone with them: the ENCRYPTED
    TUNNEL chip, 6.8 px of caption on a 32-unit plate.

    What is left is enlarged instead. The trust station's plate takes over
    as the scene's primary label in the caption idiom — two short words,
    second one orange, at CAP_TEXT_PX — and the laptop and the ERP console
    each say one thing at a size a feed can resolve.
    """
    sc = Scene("ztna")
    trace(sc, [(-30, 60), (60, 60), (60, -40), (210, -40)], o=0,
          nodes=[(-30, 60), (210, -40)])
    trace(sc, [(-40, 320), (110, 320), (110, 250), (320, 250)], o=0,
          nodes=[(-40, 320), (320, 250)])

    # ── denied estate: one cluster, high and to the right
    # LIFT. Deleting the two captions took 100 units off this scene's
    # height and none off its width, and a 1.90-aspect content box fills
    # only 50% of the 1.250 canvas — it swims. The estate floats higher
    # instead, which is the same drawing saying the same thing further out
    # of reach; nothing about the flow below it moved.
    LIFT = 76
    for gx, gy, gz in ((96, -206, 108), (196, -244, 124), (268, -152, 92)):
        ghost_stack(sc, gx, gy, gz + LIFT, o=1, w=34, d=28)
    for a, b, z in (((130, -192), (196, -230), 108),
                    ((230, -230), (268, -138), 104),
                    ((284, -124), (300, -70), 92)):
        trace(sc, [a, b], o=1.5, z=z + LIFT)
    for p in ((166, -212, 110), (252, -186, 104), (320, -96, 94)):
        xmark(sc, (p[0], p[1], p[2] + LIFT), o=1.6)

    # ── station 1 · the verified user.  The shield-and-check glyph that
    #    shared this lid is gone: at a size the two words can be read at,
    #    92 units of screen holds words OR a glyph, and the words win.
    #    The lid went from 92 to 100 units for the same reason: at 92 the
    #    lid clamped the two words to 13.9 rendered px, just under the floor.
    d1 = pad(sc, -46, 156, 126, 112, 0, o=4)
    laptop(sc, -30, 176, d1, o=5, w=100, d=46,
           screen_svg=screen_caption(*screen_canvas(100), lines=["USER", "DEVICE"]))

    # ── station 2 · the trust decision, and now the scene's primary label.
    #    Caption idiom: two short words, second one orange, orange spine.
    #    "ZERO TRUST / ACCESS" would need a 155-unit plate to reach
    #    CAP_TEXT_PX over a 104-unit plinth; "ZERO / TRUST" says the same
    #    thing in five characters and fits the station it stands on.
    d2 = pad(sc, 96, 10, 104, 104, 0, o=8)
    body(sc, rrect(116, 30, 64, 64, 6), d2, 5, o=9)
    TS = cardpx(CAP_TEXT_PX)
    TW = math.ceil(max(mono_width("ZERO", TS, ".10em"),
                       mono_width("TRUST", TS, ".10em")) + 30.0)
    TH = math.ceil(TS * 2.6 + 74.0)
    panel(sc, 110, 114, d2 + 5 + TH, TW, TH, panel_svg(TW, TH,
          '<rect x="0" y="%.1f" width="3.2" height="%.1f" rx="1.6" fill="%s"/>'
          % (TH * 0.10, TH * 0.34, C["acc"]) +
          mono(16, TS * 1.30, "ZERO", TS, C["ink"], 700, ".10em") +
          mono(16, TS * 2.75, "TRUST", TS, C["acc"], 700, ".10em") +
          '<g transform="translate(%.1f,%.1f)">' % (TW / 2.0 - 19, TS * 3.4) +
          shield(0, 8, 1.15, "none", C["ink"], 2.2) +
          '<path d="M8 26 l6.6 7.6 l12.4 -15" stroke="' + C["acc"] + '" stroke-width="3.5" '
          'fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>'), o=10)

    # ── station 3 · the application.  The four 10-unit app-icon squares
    #    went with the pass: they were never legible as icons and they were
    #    the only thing stopping ERP and the verdict from being bigger.
    d3 = pad(sc, 232, -112, 128, 112, 0, o=12)
    ES = cardpx(15.0)
    EB = cardpx(21.0)
    panel(sc, 242, 0, d3 + 112, 116, 112, panel_svg(116, 112,
          '<rect x="0" y="0" width="116" height="16" rx="7" fill="' + C["screen_dark"] + '"/>'
          '<rect x="0" y="9" width="116" height="7" fill="' + C["screen_dark"] + '"/>' +
          "".join('<circle cx="%d" cy="8" r="2.2" fill="#8E8A84"/>' % (11 + i * 9) for i in range(3)) +
          mono(58, 16 + EB * 1.35, "ERP", EB, C["ink"], 700, ".04em", "middle") +
          '<rect x="8" y="56" width="100" height="50" rx="5" fill="#EBF7EF" stroke="'
          + C["ok"] + '" stroke-width="1.2"/>' +
          mono(15, 56 + ES * 1.25, "ACCESS", ES, C["ok"], 700) +
          mono(15, 56 + ES * 2.55, "GRANTED", ES, C["ok"], 700) + tick(96, 70, 10)), o=13)

    # ── the two legs: channel-run, landing on front-left base corners.
    #    Drawn UNDER the station they arrive at (o below the panel's o) so
    #    the object occludes the route, never the other way round.
    route(sc, [(56, 222, d1 + 2), (96, 176, d1 + 2), (96, 132, d2 + 2),
               (96, 116, d2 + 2)], o=7.5, glow=.75)
    route(sc, [(198, 60, d2 + 2), (212, 36, 20), (228, 4, d3 + 2)],
          o=11.5, glow=.75)
    return sc

# =============================================================================
#  SCENE 2 — MFA hub  (recreates the hub-and-spoke reference)
# =============================================================================
def rect_exit(rect, cx, cy, tx, ty):
    """Where the ray (cx,cy)->(tx,ty) leaves `rect`. Used so every MFA spoke
       terminates ON the hub plinth's base edge instead of floating across
       its deck (fix D)."""
    x0, y0, x1, y1 = rect
    dx, dy = tx - cx, ty - cy
    best = None
    for t in ([(x0 - cx) / dx, (x1 - cx) / dx] if dx else []) + \
            ([(y0 - cy) / dy, (y1 - cy) / dy] if dy else []):
        if t <= 0:
            continue
        px, py = cx + t * dx, cy + t * dy
        if x0 - .01 <= px <= x1 + .01 and y0 - .01 <= py <= y1 + .01:
            if best is None or t < best[0]:
                best = (t, px, py)
    return (best[1], best[2]) if best else (cx, cy)


FINGERPRINT = ""      # injected by gen_og_kit (real @phosphor-icons path data)


def set_fingerprint(svg):
    global FINGERPRINT
    FINGERPRINT = svg


def mfa_hub():
    """FIX D — the six spokes used to converge on a point floating over the
    hub deck, crossing satellite pads on the way. Each now leaves its own
    satellite's base edge, runs the open wedge, and lands on the hub
    plinth's base edge; the OTP disc grew so its digits clear the ring."""
    sc = Scene("mfa")
    CXC, CYC = 150, 150
    HUB = (96, 96, 204, 204)

    trace(sc, [(40, 40), (260, 40), (260, 260), (40, 260), (40, 40)], o=0,
          nodes=[(40, 40), (260, 40), (260, 260), (40, 260)])

    # Satellites solved on a ring in PROJECTED space (rx 200, ry 117 about
    # the hub), at 0/60/.../300 degrees. The old ad-hoc scene coordinates put
    # two satellites on the hub's vertical axis, where the authenticator
    # tower rises — they collided with it and with each other. Skipping the
    # 90-degree slot keeps the column above the hub clear.
    sats = [
        (-83, 39, "mail"), (33, -77, "sms"), (-23, 214, "grid"),
        (208, -17, "key"), (151, 273, "otp"), (267, 157, "push"),
    ]
    for i, (sx, sy, kind) in enumerate(sats):
        d = pad(sc, sx, sy, 78, 66, 0, o=4 + i * .5, c=8, h1=5.5, hb=2.2, h2=3.5)
        cx, cy = sx + 39, sy + 33
        if kind == "mail":
            quad(sc, [(cx - 20, cy + 14, d), (cx + 20, cy + 14, d),
                      (cx + 20, cy + 14, d + 26), (cx - 20, cy + 14, d + 26)],
                 C["top"], o=4 + i * .5 + .6, stroke=C["edge"], sw=1.2)
            panel(sc, cx - 20, cy + 14, d + 26, 40, 26, (
                '<path d="M0 0 L40 26 L0 26 z" fill="none"/>' +
                '<path d="M0 0 l20 14 l20 -14" stroke="%s" stroke-width="1.8" fill="none"/>'
                % C["ink"]), o=4 + i * .5 + .7)
        elif kind == "otp":
            # FIX G. "1 2 3 4 5 6" at 8.6 units rendered at 10.6 px and its
            # spaced-out advance already ran 2 units past the disc it sits
            # on. An OTP is written "123456"; six unspaced characters fit
            # the disc with room at a size that reads.
            body(sc, circ(cx, cy, 26, 40), d, 7, o=4 + i * .5 + .6, sw=1.0)
            glow_ring(sc, cx, cy, d + 7.2, 26,
                      o=4 + i * .5 + .80, o_back=4 + i * .5 + .55)
            ox_, oy_ = iso(cx, cy, d + 7.4)
            OS_ = cardpx(15.0, FLAT_PROJ)
            OW = mono_width("123456", OS_, ".06em")
            sc.add(4 + i * .5 + .7, mono(ox_, oy_ + OS_ * 0.36, "123456", OS_,
                                         C["ink"], 700, ".06em", "middle"))
            label_box(sc, ox_ - OW / 2, oy_ - OS_ * 0.5, OW, OS_ * 1.1, "OTP DIGITS")
        else:
            body(sc, rrect(cx - 17, cy - 15, 34, 30, 4), d, 30, o=4 + i * .5 + .6)
            # FIX G. "SMS" set at 6.4 units on a 34-unit face rendered at
            # 7.3 px — and it was the only one of six factors that carried a
            # word at all. The handset now says SMS the way the key says
            # key: with an orange message bar, no caption.
            gl = {"sms": '<rect x="8" y="3" width="18" height="24" rx="4" fill="none" '
                         'stroke="%s" stroke-width="1.8"/>' % C["ink"] +
                         '<rect x="11.5" y="9" width="11" height="7" rx="2" fill="%s"/>'
                         % C["acc"],
                  "grid": "".join('<circle cx="%d" cy="%d" r="2.6" fill="%s"/>'
                                  % (9 + (k % 3) * 8, 12 + (k // 3) * 9, C["ink"])
                                  for k in range(6)),
                  "key": '<rect x="10" y="9" width="14" height="19" rx="3" fill="%s"/>'
                         '<rect x="14" y="3" width="6" height="8" rx="1.5" fill="%s"/>'
                         % (C["screen_dark"], C["screen_dark"]),
                  "push": shield(17, 8, .74, "none", C["ink"], 1.8) +
                          '<circle cx="17" cy="20" r="3.6" fill="%s"/>' % C["acc"]}[kind]
            panel(sc, cx - 17, cy + 15, d + 30, 34, 30, gl, o=4 + i * .5 + .7)

        # spoke: satellite base edge -> open wedge -> hub base edge
        hxe, hye = rect_exit(HUB, CXC, CYC, cx, cy)
        hp = iso(hxe, hye, 5)
        sxe, sye = min(((sx, sy), (sx + 78, sy), (sx, sy + 66), (sx + 78, sy + 66)),
                       key=lambda q: math.hypot(iso(q[0], q[1], d)[0] - hp[0],
                                                iso(q[0], q[1], d)[1] - hp[1]))
        mx, my = sxe + (hxe - sxe) * .58, sye + (hye - sye) * .58
        route(sc, [(sxe, sye, d + 2), (mx, my, 10), (hxe, hye, 5)],
              o=8 + i * .1, dot_end=False, glow=.7)

    # central platform
    hd = pad(sc, 96, 96, 108, 108, 0, o=10, c=12, h1=9, hb=3.4, h2=7)
    body(sc, rrect(112, 112, 76, 76, 9), hd, 5, o=11)
    body(sc, circ(CXC, CYC, 27, 40), hd + 5, 5, o=12, sw=1.0)
    glow_ring(sc, CXC, CYC, hd + 10.2, 27, o=13.6, o_back=11.9)
    # authenticator tower
    body(sc, rrect(CXC - 22, CYC - 22, 44, 44, 6), hd + 10, 78, o=13)
    panel(sc, CXC - 22, CYC + 22, hd + 88, 44, 56, (
        '<rect x="7" y="22" width="30" height="32" rx="6" fill="%s"/>' % C["screen"] +
        FINGERPRINT), o=14)
    # identity badge floating above
    panel(sc, CXC - 22, CYC + 22, hd + 130, 44, 44, (
        '<path d="M22 1 L43 12 L43 33 L22 43 L1 33 L1 12 z" fill="none" stroke="%s" '
        'stroke-width="2.2"/>' % C["acc"] +
        '<circle cx="22" cy="18" r="5.4" fill="%s"/>' % C["acc"] +
        '<path d="M14 32 q8 -9 16 0" fill="%s"/>' % C["acc"] +
        tick(35, 35, 6.8)), o=15)
    return sc


# =============================================================================
def wrap(sc, w=None):
    return ('<svg viewBox="%s" xmlns="http://www.w3.org/2000/svg" role="img" '
            'aria-label="%s illustration">'
            '<rect x="-4000" y="-4000" width="8000" height="8000" fill="%s"/>%s</svg>'
            % (sc.vb(30), sc.name, C["bg"], sc.body()))


def build():
    return wrap(ztna_flow()), wrap(mfa_hub())


if __name__ == "__main__":
    a, b = build()
    open("/home/claude/_k_ztna.svg", "w").write(a)
    open("/home/claude/_k_mfa.svg", "w").write(b)
    print("built")
