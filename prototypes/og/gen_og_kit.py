import json
import math
#!/usr/bin/env python3
"""
gen_og_kit.py — social-share (OG) scene set for 15 InstaSafe pages.

EXTENDS gen_scene_kit.py (the style authority). Nothing here rewrites a
kit primitive; new primitives are additive and follow the same eleven
rules: bone ground, everything on a plinth, charcoal hairlines, flat
three-value shading, orange only for flow/active, one green per scene,
denial as ghost + grey dash + grey cross, faint background traces,
upright panels carrying real UI, mono caps labels with the second word
orange.

Composition archetypes: FLOW, HUB (kit rule 11) and PEDESTAL — a single
centred subject on one plinth, authorised for the content/action pages.

One canvas: all fifteen ship at OG_ASPECT (1.250) exactly. Composition is
free to be whatever the page needs; the CANVAS is not. scene_pad gives each
scene a relative margin (VB_PAD is only the floor) and fit_vb then expands
the short axis symmetrically about the content centre — expand only, never
crop, since bone ground is infinite and the added strip is empty. See
fit_vb for why 1.250 and cap_side for the one number that is deliberately
NOT it.

Six audits run on every generate and print as a table: route-overlap,
margins, laptop screen/deck, text-fits, screen-inset, and canvas
normalisation (aspect uniformity + fill band + delivered content-box pad).
Non-zero exit if any fails.

Run:  python gen_og_kit.py     ->  writes index.html next to this file
"""
import os
import re

from gen_scene_kit import (  # noqa: F401  (the kit IS the vocabulary)
    COS30, SIN30, C, Scene,
    iso, P, rrect, circ,
    prism, body, bandprism, face, pad, quad, plane3, panel,
    route, trace, ghost_stack, xmark, glow_ring, laptop,
    panel_svg, mono, tick, shield,
    label_box, poly_area, xml_esc, SCREEN_INSET,
    ztna_flow, mfa_hub, set_fingerprint,
)

VB_PAD = 32.0          # fix C: ≥30px of ground inside every viewBox (the FLOOR)
PAD_FRAC = 0.10        # ...and above the floor the margin is RELATIVE (see scene_pad)
OG_ASPECT = 1.250      # fix F: the ONE canvas aspect every scene is normalised to
MIN_FILL = 0.55        # fix F: content bbox area / canvas area, acceptable band
MAX_FILL = 0.75        # a scene under MIN swims on the standard canvas; over MAX it bulges
CAP_SIDE_STANDOFF = 1.36  # see cap_side — a CLEARANCE, deliberately not OG_ASPECT
MIN_STATION_GAP = 24.0  # fix C: scene-units, bbox to bbox
MIN_CLEAR_PX = 12.0     # fix C: projected px, label/panel to other silhouettes
MIN_SCREEN_RATIO = 1.15  # fix A: projected screen quad vs deck top
TEXT_PAD = 6.0           # local px a string must keep from its plate's edge
MONO_ADV = 0.60          # monospace advance as a fraction of font-size

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))



# ══════════════════════════════════════════════════ real brand marks
LOGO_DIR = os.path.join(ROOT, "public", "logos")
BRAND_DIR = os.path.join(ROOT, "public", "brand")

# Colours a third-party mark brings in. They are brand-accurate by
# permission and are held OUT of the kit-palette / green / red counts —
# G2's mark is a red circle, and that is what G2's mark is.
LOGO_COLORS = set()
_LOGO_N = [0]


def logo(path, w, h, opacity=1.0):
    """Inline a real .svg and fit it into a w x h box in the CURRENT local
    coordinate system (a panel face, a screen, a masthead bar).

    Everything id-shaped is namespaced per instance: these files carry
    gradients, clipPaths and <style> class rules, and the board drops each
    scene into the page twice (thumbnail + frame), so unprefixed ids would
    cross-wire between marks. Foreign namespace declarations (Inkscape files
    carry sodipodi:/inkscape: attributes) are re-declared on the wrapper so
    the fragment stays valid XML on its own.
    """
    src = open(path, "r", encoding="utf-8").read()
    _LOGO_N[0] += 1
    pfx = "lg%d" % _LOGO_N[0]

    root = re.search(r"<svg\b[^>]*>", src, re.S).group(0)
    m = re.search(r'viewBox="([^"]+)"', root)
    if m:
        vx, vy, vw, vh = [float(t) for t in re.split(r"[ ,]+", m.group(1).strip())]
    else:
        vx = vy = 0.0
        vw = float(re.search(r'width="([\d.]+)', root).group(1))
        vh = float(re.search(r'height="([\d.]+)', root).group(1))
    ns = " ".join(re.findall(r'xmlns:[\w-]+="[^"]*"', root))

    inner = src[src.index(root) + len(root):]
    inner = re.sub(r"</svg>\s*$", "", inner.strip(), flags=re.S)
    inner = re.sub(r"<metadata>.*?</metadata>", "", inner, flags=re.S)
    inner = re.sub(r"<sodipodi:namedview\b[^>]*/>", "", inner, flags=re.S)
    inner = re.sub(r"<sodipodi:namedview\b.*?</sodipodi:namedview>", "", inner, flags=re.S)

    for cid in set(re.findall(r'\bid="([^"]+)"', inner)):
        new = pfx + "-" + cid
        inner = inner.replace('id="%s"' % cid, 'id="%s"' % new)
        inner = inner.replace("url(#%s)" % cid, "url(#%s)" % new)
        inner = inner.replace('href="#%s"' % cid, 'href="#%s"' % new)

    def _style(mm):
        return re.sub(r"\.([A-Za-z][\w-]*)",
                      lambda c: "." + pfx + "-" + c.group(1), mm.group(0))
    inner = re.sub(r"<style\b.*?</style>", _style, inner, flags=re.S)
    inner = re.sub(r'class="([^"]+)"',
                   lambda c: 'class="%s"' % " ".join(pfx + "-" + k
                                                     for k in c.group(1).split()),
                   inner)

    for col in re.findall(r"#[0-9A-Fa-f]{3,8}", inner):
        LOGO_COLORS.add(col.lower())

    k = min(w / vw, h / vh)
    tx = (w - vw * k) / 2.0 - vx * k
    ty = (h - vh * k) / 2.0 - vy * k
    # data-logo declares the fitted footprint so the plate audits can treat
    # the mark as one opaque box instead of walking vendor path data.
    return ('<g data-logo="%.2f %.2f">'
            '<g %s opacity="%.2f" transform="translate(%.3f,%.3f) scale(%.5f)">%s</g>'
            '</g>' % (w, h, ns, opacity, tx, ty, k, inner))


def integration(name, w, h):
    return logo(os.path.join(LOGO_DIR, "integrations", name + ".svg"), w, h)


def iz_mark(w, h, opacity=1.0):
    return logo(os.path.join(BRAND_DIR, "instasafe-mark-color.svg"), w, h, opacity)


def phosphor(name, w, h, fill=None, weight="regular"):
    """Pull a Phosphor icon's path data out of the installed
    @phosphor-icons/react package — the same icon set the site ships — and
    drop it in at scene scale."""
    f = os.path.join(ROOT, "node_modules", "@phosphor-icons", "react",
                     "dist", "defs", name + ".es.js")
    src = open(f, "r", encoding="utf-8").read()
    seg = src.split('"%s"' % weight, 1)[1] if ('"%s"' % weight) in src else src
    seg = re.split(r'"(?:thin|light|bold|fill|duotone)"', seg)[0]
    d = re.findall(r'd:\s*"([^"]+)"', seg) or re.findall(r'd="([^"]+)"', seg)
    body = "".join('<path d="%s"/>' % p for p in d[:14])
    k = min(w, h) / 256.0
    return ('<g transform="translate(%.2f,%.2f) scale(%.5f)" fill="%s">%s</g>'
            % ((w - 256 * k) / 2, (h - 256 * k) / 2, k, fill or C["ink"], body))


# ═════════════════════════════════════════════════════════ new primitives
def scene_pad(W, H):
    """Ground margin for a content box W x H — RELATIVE, with VB_PAD as floor.

    Fix F, half one. A fixed 32-unit pad is not a constant margin, it is a
    constant that means different things at different scene sizes: on the
    672x520 ZTNA box it is 4.8% of the width, on the 403x276 posture box it
    is 8%. Rendered at one canvas size that reads directly as "some scenes
    are drawn bigger than others", which is half of what the client saw.

    A margin proportional to the box's geometric mean is scale-free: for any
    two scenes already at the target aspect the fill fraction comes out
    identical no matter how large the scenes are, because
        fill = 1 / (1 + 2f(sqrt(a) + 1/sqrt(a)) + 4f^2)
    depends only on the aspect a and the fraction f. VB_PAD survives as the
    hard floor so the >=30 units of ground rule still holds on the smallest
    scene, and the margins audit measures the delivered pad rather than
    trusting the constant.
    """
    return max(VB_PAD, PAD_FRAC * math.sqrt(max(W, 1.0) * max(H, 1.0)))


def fit_vb(sc, aspect=OG_ASPECT):
    """Post-compose canvas normalisation to ONE aspect. Expands, never crops.

    Fix F, half two. Every scene used to keep its own aspect anywhere inside
    a 1.20-1.58 band, so on the board fifteen cards came out at fifteen
    heights. Now the padded content box is grown on its SHORT axis only,
    symmetrically about the content centre, until the canvas is exactly
    `aspect`. Bone ground is infinite and the added strip is empty, so no
    composition moves and nothing is clipped.

    Why 1.250: the art slot is 61% of a 1200x630 frame = 732x630, so the
    crop threshold is 732/630 = 1.162 — below that the drawing is taller
    than the frame and `overflow:hidden` eats the top and bottom. 1.250 is
    the nearest round house value (5:4) that clears the threshold with real
    slack: it renders 732x586 inside a 630-tall frame, 22 units of air above
    and below, so no sub-pixel layout rounding can crop it. Sitting it at
    1.162 or 1.181 would leave 0 and 8 units respectively.

    Returns (viewBox, aspect, metrics) where metrics carries the fill
    fraction and the delivered pad on each axis, both audited.
    """
    x0, x1, y0, y1 = sc.bx
    W, H = (x1 - x0), (y1 - y0)
    p = scene_pad(W, H)
    w, h = W + p * 2, H + p * 2
    if w / h < aspect:
        w = h * aspect                    # too tall  -> widen the ground
    else:
        h = w / aspect                    # too wide  -> heighten the ground
    cx, cy = (x0 + x1) / 2.0, (y0 + y1) / 2.0
    got = w / h
    assert abs(got - aspect) < 5e-4, "canvas aspect %.6f != %.3f" % (got, aspect)
    # 3 decimals, not the kit's 1: at 1 dp the rounding of w and h alone
    # moved the delivered aspect by ~1.6e-4, which showed up as a 0.06px
    # spread in the measured thumbnail heights. Uniform should mean uniform.
    return ("%.3f %.3f %.3f %.3f" % (cx - w / 2, cy - h / 2, w, h), got,
            dict(fill=(W * H) / (w * h), pad_x=(w - W) / 2.0,
                 pad_y=(h - H) / 2.0, base_pad=p, raw=(W + p * 2) / (H + p * 2),
                 cw=w, ch=h))


def wrap_fit(sc):
    vb, aspect, met = fit_vb(sc)
    svg = ('<svg viewBox="%s" xmlns="http://www.w3.org/2000/svg" role="img" '
           'aria-label="%s illustration">'
           '<rect x="-4000" y="-4000" width="8000" height="8000" fill="%s"/>%s</svg>'
           % (vb, sc.name, C["bg"], sc.body()))
    return svg, aspect, met


def route_slug(slug):
    """/zero-trust-features/device-binding -> zero-trust-features_device-binding

    One file per route in a flat directory, so the name has to carry the
    nesting. Underscore, because every real route segment is kebab-case and
    an underscore therefore cannot be ambiguous about where the slash was.
    """
    return slug.strip("/").replace("/", "_")


def scene_svg_file(sc):
    """The board's SVG, plus the one fact a downstream rasteriser cannot
    recover from the file: where the ink actually is inside the canvas.

    fit_vb deliberately grows empty bone ground around the drawing, so the
    viewBox is NOT the silhouette — on some scenes there is 10% of nothing
    down the left side. The OG card sets its headline in a column that ends
    just short of the artwork, and "just short of the artwork" means the
    content box, not the canvas. Rather than have gen-og-pages.mjs guess (or
    walk the path data a second time in another language), the content box
    ships as a data attribute in the same coordinate system as the viewBox.

    Held separate from wrap_fit on purpose: the review board's markup stays
    exactly as approved.
    """
    vb, _aspect, _met = fit_vb(sc)
    x0, x1, y0, y1 = sc.bx
    return ('<svg viewBox="%s" xmlns="http://www.w3.org/2000/svg" role="img" '
            'aria-label="%s illustration" data-content="%.3f %.3f %.3f %.3f">'
            '<rect x="-4000" y="-4000" width="8000" height="8000" fill="%s"/>%s</svg>\n'
            % (vb, sc.name, x0, y0, x1, y1, C["bg"], sc.body()))


def scene_text(sc, x, y, z, lines, o=1.7, size=12.5, fill=None, lead=17):
    """Bare mono caps set straight into the scene (the kit's DENIED label
       idiom), with the bounding box actually marked."""
    tx, ty = iso(x, y, z)
    s = ""
    for i, t in enumerate(lines):
        s += mono(tx, ty + i * lead, t, size, fill or C["mid"], 700, ".1em")
    sc.add(o, s)
    label_box(sc, tx, ty - size, max(len(t) for t in lines) * size * 0.62,
              lead * (len(lines) - 1) + size + 3, " ".join(lines))


def cap_panel(sc, x, y, z_top, l1, l2, o=20, w=158, h=60, green=False, glyph=""):
    """Rule 10 label: mono caps, two lines, second line orange, orange
       spine bar. Optional single green verdict tick."""
    size = 14.0 if max(len(l1), len(l2)) <= 10 else 11.0
    inner = '<rect x="0" y="10" width="3.2" height="%.1f" rx="1.6" fill="%s"/>' % (h - 20, C["acc"])
    inner += glyph
    inner += mono(17, h * 0.44, l1, size, C["ink"], 700, ".10em")
    inner += mono(17, h * 0.44 + size * 1.45, l2, size, C["acc"], 700, ".10em")
    if green:
        inner += tick(w - 19, h - 17, 9.5)
    panel(sc, x, y, z_top, w, h, panel_svg(w, h, inner, 8), o)


def cap_side(sc, l1, l2, o=20, w=158, h=60, green=False, glyph="",
             target=None, drop=62):
    """PEDESTAL convention: the label is a plate at the subject's lower
       LEFT, not a caption underneath it. A single tall subject otherwise
       yields a 0.6-aspect scene that letterboxes badly in the 62%-wide OG
       art slot; carrying the label out to the left buys width instead of
       height. Placement is solved for a target aspect, so the plate lands
       exactly as far out as the frame needs. Call LAST — it reads the
       finished bounding box.

       `target` is CAP_SIDE_STANDOFF (1.36), NOT OG_ASPECT, and the gap is
       load-bearing. Re-pointing it at 1.25 when the canvas standard landed
       was tried and reverted: it is a smaller number, so every plate came
       ~40 units back IN, and on /platform/endpoint-controls, /awards and
       /book-a-demo the plate then sat on the plinth's front face and LED
       band. The clearance the plate needs from the subject is a
       composition fact settled over two review rounds; the canvas aspect is
       a frame fact. Solving the plate against the wider figure buys the
       standoff, and fit_vb pads the leftover height for free — which costs
       ~5 points of fill and moves nothing. Canvas normalisation is not
       allowed to relocate artwork.

       scene_pad depends on the box the placement is deciding, so the two
       are solved together — four passes converge to well under a unit."""
    target = CAP_SIDE_STANDOFF if target is None else target
    x0, x1, y0, y1 = sc.bx
    lh = SIN30 * w + h
    Hc = (y1 - y0) + drop              # content height once the plate is down
    Wc = x1 - x0
    want_w, Wf = Wc, Wc
    for _ in range(4):
        pad_ = scene_pad(Wf, Hc)
        want_w = target * (Hc + pad_ * 2) - pad_ * 2
        Wf = max(Wc, want_w)
    sx = x0 - max(0.0, want_w - Wc)
    sy = y1 + drop - lh
    yw = 340.0
    xw = yw + sx / COS30
    zw = (xw + yw) / 2.0 - sy
    cap_panel(sc, xw, yw, zw, l1, l2, o=o, w=w, h=h, green=green, glyph=glyph)


def led_strip(sc, x, y_front, w, z_lo, z_hi, n=6, lit=(1, 4), o=0):
    """The plinth's LED row, but with an arbitrary count and lit set —
       pad() hard-codes five with two lit."""
    step = w / (n + 2.0)
    lw = step * 0.40
    for i in range(n):
        cx = x + step * (1.3 + i)
        col = C["acc"] if i in lit else C["led"]
        quad(sc, [(cx, y_front, z_lo), (cx + lw, y_front, z_lo),
                  (cx + lw, y_front, z_hi), (cx, y_front, z_hi)], col, o=o)


def chip_svg(w, h, t, hot=False):
    """Tiny mono chip label for a module tower face."""
    fs = min(12.0, (w - 8.0) / max(1.0, len(t) * 0.74))
    return ('<rect x="0.7" y="0.7" width="%.1f" height="%.1f" rx="2.6" fill="%s" '
            'stroke="%s" stroke-width="1"/>' % (w - 1.4, h - 1.4, C["screen"], C["edge"]) +
            mono(w / 2, h * 0.5 + fs * 0.36, t, fs,
                 C["acc"] if hot else C["ink"], 700, ".06em", "middle"))


def slab(sc, x, y, w, t, z0, hgt, content, o=0, inset=6.0, o_face=None):
    """An upright OBJECT (front page, calendar, checklist, article): a thin
       prism with real thickness whose lower-right face carries the UI.
       Keeps rule 9 without the card floating in space."""
    body(sc, rrect(x, y, w, t, 2.2), z0, hgt, o=o)
    inner = ('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="4" fill="%s" '
             'stroke="%s" stroke-width="1.1"/>'
             % (inset, inset, w - inset * 2, hgt - inset * 2, C["screen"], C["edge"]) + content)
    panel(sc, x, y + t, z0 + hgt, w, hgt, inner, o if o_face is None else o_face)


def sheet(sc, x, y, w, t, z0, hgt, o=0):
    """A blank page/sheet slab — the ones tucked behind the front page."""
    body(sc, rrect(x, y, w, t, 2.0), z0, hgt, o=o, sw=1.0)


def ghost_laptop(sc, x, y, z, o=0, w=56, d=34):
    """Denied device: laptop silhouette in ghost values only. No red.
       Carries the same fix-A proportions as the solid laptop so the two
       read as the same object in two states."""
    prism(sc, rrect(x, y, w, d, 3), z, 4.5, C["ghost_f"], C["ghost_f"], "#F2EFEA",
          o=o, stroke=C["ghost_s"], sw=1.0, op=.9)
    lean, hgt = 6.0, 42.0
    sc.laptops.append(dict(
        screen=poly_area([iso(*p) for p in (
            (x + 2, y + 3, z + 4.5), (x + w - 2, y + 3, z + 4.5),
            (x + w - 2, y + 3 - lean, z + 4.5 + hgt),
            (x + 2, y + 3 - lean, z + 4.5 + hgt))]),
        deck=poly_area([iso(px, py, z) for px, py in rrect(x, y, w, d, 3)]),
        w=w, d=d, ghost=True))
    sc.laptops[-1]["ratio"] = sc.laptops[-1]["screen"] / sc.laptops[-1]["deck"]
    p0 = (x + 2, y + 3, z + 4.5)
    p1 = (x + w - 2, y + 3, z + 4.5)
    p3 = (x + 2, y + 3 - lean, z + 4.5 + hgt)
    p2 = (x + w - 2, y + 3 - lean, z + 4.5 + hgt)
    quad(sc, [p0, p1, p2, p3], C["ghost_f"], o=o + .05, stroke=C["ghost_s"], sw=1.0, op=.9)
    quad(sc, [(p0[0] + 4, p0[1] - .5, p0[2] + 2.5), (p1[0] - 4, p1[1] - .5, p1[2] + 2.5),
              (p2[0] - 4, p2[1] + .5, p2[2] - 2.5), (p3[0] + 4, p3[1] + .5, p3[2] - 2.5)],
         "#F2EFEA", o=o + .06, stroke=C["ghost_s"], sw=.8, op=.9)


def ghost_board(sc, x, y, z, o=0, w=44, d=32, hgt=46):
    """Denied clipboard/policy sheet: ghost pad + ghost upright sheet."""
    prism(sc, rrect(x, y, w, d, 2.5), z, 4.0, C["ghost_f"], C["ghost_f"], "#F2EFEA",
          o=o, stroke=C["ghost_s"], sw=1.0, op=.9)
    prism(sc, rrect(x + 5, y + d * .48, w - 10, 5, 1.5), z + 4, hgt,
          C["ghost_f"], C["ghost_f"], "#F2EFEA", o=o + .05, stroke=C["ghost_s"], sw=1.0, op=.9)
    panel(sc, x + 5, y + d * .48 + 5, z + 4 + hgt, w - 10, hgt, (
        '<rect x="2" y="3" width="%.1f" height="%.1f" rx="2.5" fill="none" stroke="%s" '
        'stroke-width="1"/>' % (w - 14, hgt - 8, C["ghost_s"]) +
        "".join('<rect x="6" y="%d" width="%.1f" height="2.2" rx="1.1" fill="%s"/>'
                % (11 + k * 8, (w - 22) * (1 - .16 * k), C["ghost_s"]) for k in range(4))
    ), o=o + .06)


def key_prism(sc, x, y, z, o=0, ln=126, sh=14, bow=19):
    """Oversized key lying on a deck, bow at -x, tip at +x."""
    body(sc, circ(x + bow, y + sh / 2, bow, 30), z, sh * .92, o=o, sw=1.0)
    face(sc, circ(x + bow, y + sh / 2, bow * .44, 26), z + sh * .95,
         C["screen"], o=o + .04, stroke=C["edge"], sw=1.0)
    body(sc, rrect(x + bow * 1.4, y, ln - bow * 1.4, sh, 2.4), z, sh * .78, o=o + .05, sw=1.0)
    for k, (dx, tw) in enumerate(((ln - 34, 10), (ln - 18, 12))):
        body(sc, rrect(x + dx, y + 1.5, tw, sh - 3, 1.4), z + sh * .78, 9 + k * 3,
             o=o + .06 + k * .01, sw=1.0)


def trophy(sc, cx, cy, z, o=0, s=1.0):
    """A trophy has to say "trophy" at 300px. The revolved prism stack said
    "canister", so this is a drawn silhouette on an upright plane — wide
    flared bowl, two ear handles, thin stem, wide stepped base — in matte
    white with the charcoal hairline, standing on a shallow prism so it is
    still an object on a plinth rather than a floating card."""
    W, H = 82 * s, 112 * s
    body(sc, rrect(cx - 17 * s, cy - 9 * s, 34 * s, 18 * s, 3), z, 6 * s, o=o, sw=1.0)
    ink, top = C["edge"], C["top"]
    g = (
        # handles first: they pass behind the bowl
        '<path d="M17 15 C-3 13 -3 47 21 50" fill="none" stroke="%s" stroke-width="3.6" '
        'stroke-linecap="round"/>' % ink +
        '<path d="M65 15 C85 13 85 47 61 50" fill="none" stroke="%s" stroke-width="3.6" '
        'stroke-linecap="round"/>' % ink +
        # bowl
        '<path d="M11 8 L71 8 L66 45 Q61 68 41 70 Q21 68 16 45 Z" fill="%s" stroke="%s" '
        'stroke-width="2.6" stroke-linejoin="round"/>' % (top, ink) +
        '<path d="M11 8 L71 8 L70 17 L12 17 Z" fill="%s" stroke="%s" stroke-width="2.0" '
        'stroke-linejoin="round"/>' % (C["right"], ink) +
        # stem, then the two base steps
        '<path d="M35 70 L47 70 L47 86 L35 86 Z" fill="%s" stroke="%s" stroke-width="2.2" '
        'stroke-linejoin="round"/>' % (top, ink) +
        '<path d="M25 86 L57 86 L61 97 L21 97 Z" fill="%s" stroke="%s" stroke-width="2.4" '
        'stroke-linejoin="round"/>' % (top, ink) +
        '<path d="M16 97 L66 97 L66 106 L16 106 Z" fill="%s" stroke="%s" stroke-width="2.4" '
        'stroke-linejoin="round"/>' % (C["right"], ink) +
        '<path d="M30 30 h22 M30 38 h22" stroke="%s" stroke-width="2.2" '
        'stroke-linecap="round" opacity=".45"/>' % C["edge_soft"]
    )
    plane3(sc, (cx - W / 2, cy, z + 6 * s + H), (W / 82.0, 0, 0), (0, 0, -H / 112.0),
           g, o=o + .4)
    sc.mark([iso(cx - W / 2, cy, z + 6 * s + H), iso(cx + W / 2, cy, z + 6 * s)])
    glow_ring(sc, cx, cy, z + 8 * s, 25 * s, o=o + .8, o_back=o - .2)


def rosette(sc, x, y, z_top, o=0, r=21):
    """Ribbon badge panel — concentric charcoal rings + two ribbon tails."""
    w = h = r * 2 + 26
    inner = ("".join('<circle cx="%.1f" cy="%.1f" r="%.1f" fill="none" stroke="%s" '
                     'stroke-width="%.1f"/>' % (w / 2, r + 3, r - k * 6, C["ink"], 1.6 - k * .3)
                     for k in range(2)) +
             '<path d="M%.1f %.1f l-6 22 l9 -5 l9 5 l-6 -22 z" fill="none" stroke="%s" '
             'stroke-width="1.5" stroke-linejoin="round"/>' % (w / 2 - 3, r + 20, C["ink"]) +
             tick(w / 2, r + 3, 8.4))
    panel(sc, x, y, z_top, w, h, inner, o)


# ── 2D glyph helpers (panel content) ────────────────────────────────────
def bar(x, y, w, h, fill=None, r=None, op=1.0):
    return ('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="%s" '
            'opacity="%.2f"/>' % (x, y, w, h, r if r is not None else min(h / 2, 2.4),
                                  fill or C["edge_soft"], op))


def lines_block(x, y, w, n, gap=7.0, h=3.0, taper=.14, fill=None):
    return "".join(bar(x, y + i * gap, w * (1 - taper * (i % 3)), h, fill) for i in range(n))


def check_glyph(x, y, s=1.0, col=None):
    return ('<path d="M%.1f %.1f l%.1f %.1f l%.1f %.1f" stroke="%s" stroke-width="%.1f" '
            'fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
            % (x, y, 3.2 * s, 3.6 * s, 6.4 * s, -7.6 * s, col or C["ink"], 2.0 * s))


def dl_arrow(x, y, s=1.0, col=None):
    col = col or C["ink"]
    return ('<path d="M%.1f %.1f v%.1f M%.1f %.1f l%.1f %.1f l%.1f %.1f" stroke="%s" '
            'stroke-width="%.1f" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
            '<path d="M%.1f %.1f v%.1f h%.1f v%.1f" stroke="%s" stroke-width="%.1f" '
            'fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
            % (x, y, 17 * s, x - 6 * s, y + 10 * s, 6 * s, 7 * s, 6 * s, -7 * s, col, 2.2 * s,
               x - 12 * s, y + 15 * s, 8 * s, 24 * s, -8 * s, col, 2.0 * s))


def padlock(x, y, s=1.0, col=None):
    col = col or C["ink"]
    return ('<rect x="%.1f" y="%.1f" width="%.1f" height="%.1f" rx="%.1f" fill="none" '
            'stroke="%s" stroke-width="%.1f"/>'
            '<path d="M%.1f %.1f v%.1f a%.1f %.1f 0 0 1 %.1f 0 V%.1f" fill="none" '
            'stroke="%s" stroke-width="%.1f"/>'
            % (x, y, 13 * s, 15 * s, 2.4 * s, col, 1.9 * s,
               x + 2.6 * s, y, -4.4 * s, 3.9 * s, 3.9 * s, 7.8 * s, y, col, 1.9 * s))


def watermark_svg(w, h, txt="INSTASAFE"):
    """The endpoint-controls screen: tiled watermark, the way a governed
       session actually looks. Clipped to the canvas: the tiles are wider
       than the screen by design, and unclipped they spilled off the lid."""
    s = '<rect x="0" y="0" width="%d" height="%d" fill="%s"/>' % (w, h, C["screen"])
    tiles = ""
    for r_ in range(5):
        for c_ in range(3):
            x = 2 + c_ * (w / 2.6) + (r_ % 2) * (w / 5.2)
            y = 15 + r_ * (h / 5.4)
            tiles += ('<g transform="translate(%.1f,%.1f) rotate(-18)" opacity=".34">%s</g>'
                      % (x, y, mono(0, 0, txt, 7.0, C["mid"], 700, ".10em")))
    s += ('<clipPath id="wmclip"><rect x="0" y="0" width="%d" height="%d"/></clipPath>'
          '<g clip-path="url(#wmclip)">%s</g>' % (w, h, tiles))
    s += bar(4, 4, w - 8, 8, C["screen_dark"], 3)
    s += '<g transform="translate(6.5,4.6)">%s</g>' % iz_mark(6.8, 6.8)
    s += mono(17, 10.6, "GOVERNED SESSION", 5.0, C["screen"], 700, ".10em")
    return s


# ═════════════════════════════════════════════════════════════════ scenes
# ── 1. /platform — HUB ──────────────────────────────────────────────────
def platform_hub():
    sc = Scene("platform")
    trace(sc, [(-70, -70), (300, -70), (300, 300), (-70, 300), (-70, -70)], o=0,
          nodes=[(-70, -70), (300, -70), (300, 300), (-70, 300)])

    hd = pad(sc, 44, 44, 172, 172, 0, o=10, c=14, h1=10, hb=3.6, h2=7)
    body(sc, rrect(58, 58, 144, 144, 11), hd, 4.5, o=10.5)

    sats = [(-52, -52), (-60, 200), (200, -60), (240, 240)]
    for i, (sx, sy) in enumerate(sats):
        sd = pad(sc, sx, sy, 74, 64, 0, o=3 + i * .4, c=8, h1=5, hb=2.0, h2=3.5)
        face(sc, rrect(sx + 24, sy + 20, 26, 24, 3), sd + .05, "none",
             o=3 + i * .4 + .3, stroke=C["edge_soft"], sw=.9, op=.65)

    # placed by PROJECTED separation, not scene-space tidiness: a square
    # grid put IAM directly behind ZTNA on screen. On the diamond the three
    # modules land at screen-x -61 / 0 / +61 with ZTNA forward at 0.
    towers = [(100, 170, 42, "IAM"), (170, 100, 42, "MFA"),
              (100, 100, 42, "SSO"), (170, 170, 76, "ZTNA")]
    for i, (cx, cy, hgt, tag) in enumerate(towers):
        hot = tag == "ZTNA"
        tw = 52 if hot else 42
        o = 12 + (cx + cy) / 100.0
        body(sc, rrect(cx - tw / 2, cy - tw / 2, tw, tw, 4), hd + 4.5, hgt, o=o)
        panel(sc, cx - tw / 2, cy + tw / 2, hd + 4.5 + hgt, tw, 17,
              chip_svg(tw, 17, tag, hot), o=o + .05)
        if hot:
            glow_ring(sc, cx, cy, hd + 4.5 + hgt * .62, tw * .55,
                      o=o + .6, o_back=o - .4)

    routes = [[(112, 46, hd + 3), (50, 8, 20), (2, -18, 12.5)],
              [(58, 190, hd + 3), (22, 208, 20), (-16, 218, 12.5)],
              [(202, 58, hd + 3), (214, 20, 20), (222, -18, 12.5)],
              [(212, 194, hd + 3), (240, 218, 20), (266, 250, 12.5)]]
    for i, r in enumerate(routes):
        route(sc, r, o=18 + i * .1, dot_end=True)

    # the real InstaSafe mark on the plinth's front apron
    # the mark reads as a nameplate ON the plinth's front face; standing
    # it up on the apron put it behind a tower
    panel(sc, 112, 216, hd - 2, 60, 18, (
        '<rect x="0" y="0" width="60" height="18" rx="4" fill="%s" stroke="%s" '
        'stroke-width="1.1"/>' % (C["screen"], C["edge"]) +
        '<g transform="translate(5,2.5)">%s</g>' % iz_mark(13, 13) +
        mono(21, 12.4, "INSTASAFE", 4.4, C["ink"], 700, ".08em")), o=10.6)
    cap_panel(sc, 170, 402, 30, "ONE", "PLATFORM", o=22, green=True)
    return sc


# ── 2. /solutions — FLOW (converge) ─────────────────────────────────────
def solutions_flow():
    sc = Scene("solutions")
    trace(sc, [(-90, 300), (40, 300), (40, 200), (300, 200)], o=0,
          nodes=[(-90, 300), (300, 200)])

    ghosts = [(-4, 14), (-34, 100), (-64, 186)]
    for i, (gx, gy) in enumerate(ghosts):
        ghost_stack(sc, gx, gy, 6, o=1 + i * .1, w=62, d=54, tiers=3)
        xmark(sc, (gx + 31, gy + 10, 46), o=1.6 + i * .05, r=9.0)
        trace(sc, [(gx + 62, gy + 27), (100, 68 + i * 3)], o=1.4, z=24)
    scene_text(sc, -100, -74, 12, ["DIFFERENT", "DOORS"], o=1.7, size=11.5, lead=15)

    jd = pad(sc, 100, 34, 86, 78, 0, o=6, c=10, h1=7, hb=2.6, h2=5)
    glow_ring(sc, 143, 73, jd + .4, 28, o=13.6, o_back=6.4)

    sd = pad(sc, 236, -66, 122, 110, 0, o=10, c=12, h1=9, hb=3.2, h2=6)
    body(sc, rrect(252, -50, 90, 78, 8), sd, 5, o=10.5)
    panel(sc, 250, 14, sd + 5 + 108, 106, 108, panel_svg(106, 108,
          bar(0, 0, 106, 15, C["screen_dark"], 7) + bar(0, 8, 106, 7, C["screen_dark"], 0) +
          "".join('<circle cx="%d" cy="7.5" r="2.1" fill="#8E8A84"/>' % (11 + i * 9)
                  for i in range(3)) +
          "".join('<rect x="%d" y="%d" width="11" height="11" rx="2.6" fill="none" stroke="%s" '
                  'stroke-width="1.7"/>' % (13 + (i % 3) * 15, 26 + (i // 3) * 15, C["ink"])
                  for i in range(6)) +
          '<rect x="10" y="62" width="86" height="36" rx="5" fill="#EBF7EF" stroke="%s" '
          'stroke-width="1.2"/>' % C["trace"] +
          mono(18, 78, "IN", 9.4, C["ink"], 700) +
          mono(18, 91, "SCOPE", 9.4, C["ink"], 700) + tick(78, 80, 10.5)), o=12)

    route(sc, [(143, 73, jd + 4), (196, 56, jd + 4), (236, 44, sd + 3)],
          o=13, cube_at=(143, 73, jd + 3), glow=.8)
    cap_panel(sc, 118, 340, 26, "EVERY", "USE CASE", o=20)
    return sc


# ── 3. /zero-trust-features/single-sign-on — FLOW (gate + fan) ──────────
def sso_flow():
    sc = Scene("sso")
    trace(sc, [(-110, 250), (10, 250), (10, 168), (240, 168)], o=0,
          nodes=[(-110, 250), (240, 168)])

    d1 = pad(sc, -78, 148, 118, 106, 0, o=4, c=11)
    laptop(sc, -64, 164, d1, o=5, w=88, d=42, screen_svg=(
        '<rect x="7" y="8" width="20" height="20" rx="4" fill="none" stroke="%s" '
        'stroke-width="2"/>' % C["ink"] +
        '<circle cx="17" cy="16" r="4.3" fill="%s"/>' % C["ink"] +
        '<path d="M11 27 q6 -7 12 0" fill="%s"/>' % C["ink"] +
        mono(34, 17, "ONE", 10.5, C["acc"], 700) +
        mono(34, 30, "LOGIN", 10.5, C["acc"], 700)))

    gd = pad(sc, 76, 26, 96, 60, 0, o=8, c=10, h1=7, hb=2.6, h2=5)
    route(sc, [(38, 176, d1 + 2), (62, 132, 12), (76, 86, gd + 2)],
          o=7.6, glow=.8)
    GW, GT, GH = 68, 20, 122
    body(sc, rrect(88, 40, GW, GT, 3), gd, GH, o=9)
    dw, dh = GW * .48, GH * .60
    dx, dy = (GW - dw) / 2, GH - dh
    panel(sc, 88, 60, gd + GH, GW, GH, (
        '<rect x="5" y="5" width="%.1f" height="%.1f" rx="4" fill="%s" stroke="%s" '
        'stroke-width="1.1"/>' % (GW - 10, GH - 10, C["screen"], C["edge"]) +
        '<path d="M%.1f %.1f L%.1f %.1f A%.1f %.1f 0 0 1 %.1f %.1f L%.1f %.1f Z" fill="%s" '
        'stroke="%s" stroke-width="2.4" stroke-linejoin="round"/>'
        % (dx, GH - 7, dx, dy + dw / 2, dw / 2, dw / 2, dx + dw, dy + dw / 2,
           dx + dw, GH - 7, C["acc_soft"], C["acc"]) +
        bar(dx - 4, GH - 8.5, dw + 8, 3.2, C["acc"], 1.6) +
        mono(GW / 2, 20, "GATE", 8.6, C["ink"], 700, ".14em", "middle")), o=9.4)

    tiles = [(172, -118, "github"), (252, -64, "aws"), (316, 0, "gmail"),
             (338, 68, "figma"), (322, 148, "azure")]
    exit_p = (156, 50, gd + GH * .52)
    for i, (tx, ty, tag) in enumerate(tiles):
        td = pad(sc, tx, ty, 46, 40, 0, o=10 + i * .3, c=6, h1=4, hb=1.6, h2=2.8, leds=False)
        body(sc, rrect(tx + 6, ty + 5, 34, 30, 3.4), td, 26, o=10 + i * .3 + .2, sw=1.0)
        panel(sc, tx + 6, ty + 35, td + 26, 34, 26, (
            '<rect x="0.8" y="0.8" width="32.4" height="24.4" rx="3.4" fill="%s" '
            'stroke="%s" stroke-width="1"/>' % (C["screen"], C["edge"]) +
            '<g transform="translate(8.5,3.5)">%s</g>'
            % integration(tag, 18, 18)), o=10 + i * .3 + .3)
        route(sc, [exit_p, (tx - 24, ty + 20 + (i - 2) * 3, td + 26), (tx + 12, ty + 20, td + 26)],
              o=14 + i * .2, dot_start=(i == 2))

    cap_panel(sc, 210, 250, 34, "SINGLE", "SIGN-ON", o=20, green=True)
    return sc


# ── 4. /zero-trust-application-access — FLOW (app is the hero) ──────────
def ztaa_flow():
    sc = Scene("ztaa")
    trace(sc, [(-70, 250), (30, 250), (30, 176), (230, 176)], o=0,
          nodes=[(-70, 250), (230, 176)])

    for gx, gy, gz in ((34, -150, 106), (142, -188, 124), (216, -98, 90)):
        ghost_stack(sc, gx, gy, gz, o=1, w=44, d=36)
    for a, b, z in (((78, -132), (142, -172), 108), ((186, -172), (216, -82), 102),
                    ((238, -66), (238, 4), 88)):
        trace(sc, [a, b], o=1.4, z=z)
    for p in ((110, -152, 110), (204, -124, 102), (240, 28, 86)):
        xmark(sc, p, o=1.6)
    scene_text(sc, -56, -140, 104, ["NETWORK", "NOT ACCESSIBLE"], o=1.7)

    ad = pad(sc, 26, 26, 148, 132, 0, o=6, c=13, h1=10, hb=3.4, h2=7)
    glow_ring(sc, 100, 92, ad + 52, 52, o=8.6, o_back=7.4)
    body(sc, rrect(56, 52, 88, 80, 9), ad, 7, o=7)
    body(sc, rrect(66, 62, 68, 60, 7), ad + 7, 104, o=7.5)
    panel(sc, 66, 122, ad + 7 + 104, 68, 90, panel_svg(68, 90,
          bar(0, 0, 68, 14, C["screen_dark"], 6) + bar(0, 8, 68, 6, C["screen_dark"], 0) +
          "".join('<circle cx="%d" cy="7" r="2.0" fill="#8E8A84"/>' % (10 + i * 9)
                  for i in range(3)) +
          mono(34, 34, "APP", 15.5, C["ink"], 700, ".08em", "middle") +
          lines_block(14, 44, 40, 3, 7.0, 2.8) +
          '<rect x="12" y="64" width="44" height="18" rx="4" fill="#EBF7EF" '
          'stroke="%s" stroke-width="1"/>' % C["trace"] +
          mono(18, 76, "OPEN", 8.0, C["ink"], 700, ".08em") +
          tick(48, 73, 7.6)), o=8)

    route(sc, [(-40, 214, 12), (0, 186, 14), (26, 158, ad + 3)], o=9, glow=.8)
    cap_panel(sc, 86, 210, 40, "APPLICATION", "ACCESS", o=20)
    return sc


# ── 5. /zero-trust-features/device-binding — PEDESTAL ───────────────────
def binding_pedestal():
    sc = Scene("binding")
    trace(sc, [(-150, 220), (-40, 220), (-40, 150), (210, 150)], o=0,
          nodes=[(-150, 220), (210, 150)])

    ghost_laptop(sc, 168, -150, 96, o=1.2, w=58, d=34)
    trace(sc, [(168, -128), (132, -46)], o=1.3, z=98)
    xmark(sc, (198, -126, 136), o=1.6, r=7.4)

    hd = pad(sc, -60, 18, 206, 132, 0, o=6, c=13, h1=10, hb=3.4, h2=7)

    laptop(sc, -46, 40, hd, o=11, w=96, d=44, screen_svg=(
        shield(12, 6, .72, "none", C["ink"], 2.0) +
        '<path d="M8 18 l4.2 4.7 l7.6 -9.6" stroke="%s" stroke-width="2.7" fill="none" '
        'stroke-linecap="round" stroke-linejoin="round"/>' % C["acc"] +
        mono(34, 20, "THIS", 10, C["acc"], 700) +
        mono(34, 34, "DEVICE", 10, C["acc"], 700)))
    # the certificate slot the key goes into
    quad(sc, [(-46, 74, hd + 2), (-46, 90, hd + 2), (-46, 90, hd + 12),
              (-46, 74, hd + 12)], C["screen_dark"], o=11.4, op=.9)
    key_prism(sc, -44, 100, hd, o=12, ln=84, sh=14, bow=16)

    # the credential evidence stands clear to the right, where it adds the
    # height this card was short of without covering the subject
    CW, CH = 88, 132
    inner = (mono(12, 21, "BOUND TO", 8.0, C["ink"], 700, ".10em") +
             bar(11, 27, CW - 22, 1.4, C["trace"], .7) +
             '<g transform="translate(30,34)">%s</g>' % padlock(0, 0, 1.9))
    for i, (k, v) in enumerate((("MAC", "8C:1D:96"), ("SERIAL", "R9TK42"),
                                ("UUID", "4F2A-9C"))):
        y = 82 + i * 15
        inner += (mono(12, y, k, 7.0, C["ink"], 700, ".05em") +
                  mono(45, y, v, 6.6, C["mid"], 500, ".02em"))
    inner += tick(CW - 18, 119, 7.8)
    panel(sc, 56, 18, hd + CH + 12, CW, CH, panel_svg(CW, CH, inner, 8), o=9)

    cap_panel(sc, -30, 250, 22, "DEVICE", "BOUND", o=20)
    return sc


# ── 6. /zero-trust-features/device-posture-check — PEDESTAL ─────────────
def posture_pedestal():
    sc = Scene("posture")
    trace(sc, [(-140, 210), (-30, 210), (-30, 140), (220, 140)], o=0,
          nodes=[(-140, 210), (220, 140)])

    hd = pad(sc, -16, -16, 186, 164, 0, o=6, c=13, h1=10, hb=3.4, h2=7)

    laptop(sc, 8, 36, hd, o=12, w=112, d=46, screen_svg=(
        shield(13, 7, .76, "none", C["ink"], 2.1) +
        '<path d="M9 20 l4.5 5 l8 -10" stroke="%s" stroke-width="2.8" fill="none" '
        'stroke-linecap="round" stroke-linejoin="round"/>' % C["acc"] +
        mono(38, 21, "SCAN", 10.5, C["acc"], 700) +
        lines_block(38, 28, 40, 3, 6.2, 2.3, fill=C["mid"])))
    # the scan halos pass ROUND the lid — dropped to lid height so the far
    # arc is actually occluded by the machine, which is the whole point
    glow_ring(sc, 64, 50, hd + 18, 48, o=16, o_back=11.5)
    glow_ring(sc, 64, 50, hd + 56, 29, o=16.1, o_back=11.5)

    # the verdict sheet — floating annotation, the kit's caption idiom, kept
    # clear of the scan rings so neither reads as a scribble at 300px.
    CW, CH = 126, 100
    rows = [("OS", "WIN 11 22H2"), ("AV", "REAL-TIME ON"), ("DISK", "ENCRYPTED")]
    inner = (mono(14, 21, "DEVICE CHECK", 8.6, C["ink"], 700, ".14em") +
             bar(13, 27, CW - 26, 1.4, C["trace"], 0.7))
    for i, (k, v) in enumerate(rows):
        y = 44 + i * 20
        inner += ('<rect x="13" y="%.1f" width="%.1f" height="16" rx="4" fill="%s" '
                  'stroke="%s" stroke-width="1"/>' % (y - 11, CW - 26, C["bg"], C["trace"]))
        inner += mono(19, y, k, 8.2, C["ink"], 700, ".08em")
        inner += mono(48, y, v, 7.2, C["mid"], 500, ".02em")
        inner += check_glyph(CW - 27, y - 3.4, .95, C["ink"])
    inner += mono(14, 92, "25 CHECK TYPES", 7.2, C["mid"], 500, ".06em")
    panel(sc, 214, 26, 158, CW, CH, panel_svg(CW, CH, inner, 8), o=17)

    cap_side(sc, "POSTURE", "VERIFIED", o=20, green=True)
    return sc


# ── 7. /awards — PEDESTAL (podium) ──────────────────────────────────────
def awards_pedestal():
    sc = Scene("awards")
    trace(sc, [(-120, 250), (-10, 250), (-10, 182), (250, 182)], o=0,
          nodes=[(-120, 250), (250, 182)])

    steps = [(0, 116, 76, 34), (80, 36, 76, 68), (160, -44, 76, 14)]
    decks = []
    for i, (bx, by, s, riser) in enumerate(steps):
        d = pad(sc, bx, by, s, s, 0, o=5 + i * .2, c=3.5, h1=8, hb=3.0, h2=6 + riser,
                group="podium")
        decks.append(d)

    trophy(sc, 80 + 38, 36 + 38, decks[1], o=12, s=1.05)
    rosette(sc, 6, 116 + 76, decks[0] + 62, o=11, r=20)
    body(sc, rrect(160 + 16, -44 + 20, 44, 36, 4), decks[2], 12, o=10, sw=1.0)
    panel(sc, 160 + 16, -44 + 56, decks[2] + 12 + 34, 44, 34, (
        '<rect x="1" y="1" width="42" height="32" rx="5" fill="%s" stroke="%s" '
        'stroke-width="1.2"/>' % (C["screen"], C["edge"]) +
        '<g transform="translate(11,5)">%s</g>'
        % logo(os.path.join(LOGO_DIR, "g2.svg"), 22, 22)), o=10.3)
    panel(sc, 4, 116 + 76, decks[0] + 96, 62, 20, (
        '<rect x="1" y="1" width="60" height="18" rx="4" fill="%s" stroke="%s" '
        'stroke-width="1"/>' % (C["screen"], C["edge"]) +
        '<g transform="translate(8,4)">%s</g>'
        % logo(os.path.join(LOGO_DIR, "ratings", "gartner.svg"), 46, 12)), o=11.6)

    cap_side(sc, "AWARDS &", "RECOGNITION", o=20, drop=112)
    return sc


# ── 8. /instasafe-newsroom — PEDESTAL (front page) ──────────────────────
def newsroom_pedestal():
    sc = Scene("newsroom")
    trace(sc, [(-130, 230), (-20, 230), (-20, 162), (240, 162)], o=0,
          nodes=[(-130, 230), (240, 162)])

    hd = pad(sc, -14, 0, 216, 132, 0, o=6, c=13, h1=10, hb=3.4, h2=7)
    sheet(sc, 52, 14, 148, 6, hd, 132, o=7)
    sheet(sc, 36, 24, 152, 6, hd, 122, o=7.4)

    W, T, H = 164, 9, 126
    inner = (bar(9, 8, W - 18, 12, C["screen_dark"], 2) +
             '<g transform="translate(12,9.4)">%s</g>' % iz_mark(9.2, 9.2) +
             mono(W / 2 + 6, 17.6, "NEWSROOM", 8.4, C["screen"], 700, ".20em", "middle") +
             '<rect x="%.1f" y="24" width="34" height="11" rx="5.5" fill="%s"/>' % (W - 47, C["acc"]) +
             mono(W - 30, 32.2, "LATEST", 6.4, C["screen"], 700, ".10em", "middle") +
             bar(9, 26, 74, 7, C["ink"], 2) + bar(9, 37, 58, 7, C["ink"], 2) +
             '<rect x="9" y="50" width="66" height="46" rx="4" fill="%s" stroke="%s" '
             'stroke-width="1.1"/>' % (C["bg"], C["edge"]) +
             '<path d="M13 92 l17 -21 l13 15 l10 -11 l18 21 z" fill="%s" opacity=".55"/>'
             % C["edge_soft"] +
             '<circle cx="24" cy="62" r="5" fill="%s" opacity=".5"/>' % C["edge_soft"] +
             lines_block(81, 52, 33, 7, 6.4, 2.6) +
             lines_block(120, 52, 33, 7, 6.4, 2.6) +
             lines_block(9, 102, 66, 3, 6.4, 2.6) +
             lines_block(81, 102, 72, 3, 6.4, 2.6))
    slab(sc, -2, 40, W, T, hd, H, inner, o=9, inset=5)

    cap_side(sc, "THE", "NEWSROOM", o=20, green=True)
    return sc


# ── 9. /blog — PEDESTAL (article + page stack) ──────────────────────────
def blog_pedestal():
    sc = Scene("blog")
    trace(sc, [(-120, 210), (-16, 210), (-16, 146), (216, 146)], o=0,
          nodes=[(-120, 210), (216, 146)])

    hd = pad(sc, -10, 0, 172, 124, 0, o=6, c=12, h1=10, hb=3.4, h2=7)

    W, T, H = 92, 9, 138
    caret_y = 78
    inner = ('<g transform="translate(9,7)">%s</g>' % iz_mark(9, 9) +
             mono(22, 14, "INSTASAFE", 6.2, C["mid"], 700, ".14em") +
             bar(9, 22, 58, 8, C["ink"], 2) + bar(9, 34, 42, 8, C["ink"], 2) +
             bar(9, 38, W - 18, 1.4, C["trace"], .7) +
             lines_block(9, 46, W - 18, 4, 7.4, 2.8) +
             lines_block(9, 78, 34, 1, 7.4, 2.8) +
             '<rect x="%.1f" y="%.1f" width="3.2" height="13" rx="1.6" fill="%s"/>'
             % (46, caret_y - 5.2, C["acc"]) +
             lines_block(9, 94, W - 18, 4, 7.4, 2.8) +
             mono(9, 130, "ZERO TRUST", 7.0, C["mid"], 700, ".12em"))
    slab(sc, 12, 26, W, T, hd, H, inner, o=9, inset=5)

    # a second, shorter sheet leaning behind the article
    sheet(sc, 34, 34, 72, 7, hd, 106, o=8.4)
    for k in range(4):
        body(sc, rrect(112 + k * 2.4, 56 + k * 2.0, 42, 34, 2.4), hd + k * 5.4, 4.6,
             o=10 + k * .1, sw=1.0)
    face(sc, rrect(118, 62, 30, 22, 2), hd + 3 * 5.4 + 4.7, "none", o=10.5,
         stroke=C["edge_soft"], sw=.8, op=.6)
    # topic chips on the plinth apron
    for k, tag in enumerate(("ZTNA", "MFA", "SDP")):
        panel(sc, 6 + k * 44, 124, hd + 17, 40, 17,
              chip_svg(40, 17, tag, hot=(k == 0)), o=11.4)

    cap_side(sc, "THE", "BLOG", o=20, green=True)
    return sc


# ── 10. /careers — FLOW (ascending steps) ───────────────────────────────
def careers_flow():
    sc = Scene("careers")
    trace(sc, [(-120, 260), (-10, 260), (-10, 196), (250, 196)], o=0,
          nodes=[(-120, 260), (250, 196)])

    steps = [(-40, 118, 6), (72, 24, 36), (184, -70, 66)]
    decks = []
    for i, (bx, by, base) in enumerate(steps):
        d = pad(sc, bx, by, 104, 92, 0, o=5 + i * .3, c=11, h1=7, hb=2.8, h2=5 + base,
                group="stair")
        decks.append(d)
        body(sc, rrect(bx + 26, by + 22, 52, 48, 6), d, 7, o=5 + i * .3 + .2, sw=1.0)

    route(sc, [(24, 176, decks[0] + 9), (60, 150, decks[0] + 9),
               (96, 116, decks[1] + 9), (136, 76, decks[1] + 9),
               (172, 42, decks[2] + 9), (214, -14, decks[2] + 9)], o=12,
          deck_ok=True, glow=.8)

    fx, fy, fz = 226, -26, decks[2] + 7
    body(sc, rrect(fx - 2.6, fy - 2.6, 5.2, 5.2, 1.2), fz, 56, o=13, sw=.9)
    quad(sc, [(fx, fy, fz + 56), (fx, fy, fz + 34), (fx + 34, fy - 6, fz + 45)],
         C["acc"], o=13.2, stroke=C["acc"], sw=1.0)

    cap_panel(sc, 96, 322, 30, "WE'RE", "HIRING", o=20, green=True)
    return sc


# ── 11. /resource-center — PEDESTAL (shelf) ─────────────────────────────
def resources_pedestal():
    sc = Scene("resources")
    trace(sc, [(-140, 200), (-30, 200), (-30, 130), (230, 130)], o=0,
          nodes=[(-140, 200), (230, 130)])

    hd = pad(sc, -26, 4, 206, 106, 0, o=6, c=13, h1=10, hb=3.4, h2=7)
    books = [(0, 26, 20, 66), (26, 26, 15, 82), (46, 44, 23, 58),
             (74, 26, 13, 90), (92, 26, 25, 72)]
    for i, (bx, by, bw, bh) in enumerate(books):
        o = 8 + (bx + by) / 60.0
        body(sc, rrect(bx, by, bw, 50, 2.2), hd, bh, o=o, sw=1.0)
        bandprism(sc, rrect(bx + 1.6, by + 1.6, bw - 3.2, 46.8, 2), hd + bh * .58, 8, o=o + .05)
        panel(sc, bx + 3, by + 50, hd + bh - 8, bw - 6, 11,
              bar(0, 2, bw - 6, 3.2, C["edge_soft"], 1.6), o=o + .1)

    d2 = pad(sc, 206, 128, 92, 80, 0, o=13, c=9, h1=6, hb=2.4, h2=4)
    slab(sc, 214, 140, 74, 8, d2, 82, (
        bar(9, 10, 44, 5, C["ink"], 2) + lines_block(9, 22, 52, 3, 6.4, 2.6) +
        '<g transform="translate(37,42)">%s</g>' % dl_arrow(0, 0, 1.0) +
        tick(60, 70, 9.0)), o=14, inset=5)

    cap_side(sc, "RESOURCE", "CENTER", o=20)
    return sc


# ── 12. /book-a-demo — PEDESTAL (calendar) ──────────────────────────────
def demo_pedestal():
    sc = Scene("demo")
    trace(sc, [(-190, 220), (-70, 220), (-70, 150), (220, 150)], o=0,
          nodes=[(-190, 220), (220, 150)])

    d2 = pad(sc, -136, 108, 92, 80, 0, o=4, c=9, h1=6, hb=2.4, h2=4)
    laptop(sc, -126, 120, d2, o=5, w=72, d=36, screen_svg=(
        mono(8, 18, "BOOK", 11, C["acc"], 700) + mono(8, 31, "A SLOT", 9, C["mid"], 700)))

    hd = pad(sc, -8, 0, 186, 128, 0, o=8, c=13, h1=10, hb=3.4, h2=7)

    W, T, H = 128, 9, 116
    inner = (bar(9, 8, W - 18, 13, C["screen_dark"], 2) +
             '<g transform="translate(13,9.6)">%s</g>' % iz_mark(9.8, 9.8) +
             mono(W / 2 + 7, 18, "SEPTEMBER", 8.0, C["screen"], 700, ".18em", "middle") +
             "".join(mono(17 + i * 19, 33, t, 6.2, C["mid"], 700, ".06em", "middle")
                     for i, t in enumerate(["M", "T", "W", "T", "F", "S"])))
    for r_ in range(4):
        for c_ in range(6):
            cx, cy = 17 + c_ * 19, 45 + r_ * 15
            if (r_, c_) == (1, 3):
                inner += '<circle cx="%.1f" cy="%.1f" r="7.6" fill="%s"/>' % (cx, cy, C["acc"])
            else:
                inner += ('<rect x="%.1f" y="%.1f" width="13" height="11" rx="2.6" fill="none" '
                          'stroke="%s" stroke-width="1"/>' % (cx - 6.5, cy - 5.5, C["trace"]))
    inner += bar(9, 107, W - 18, 1.4, C["trace"], .7)
    inner += mono(11, 103, "45 MIN", 7.0, C["mid"], 700, ".08em")
    inner += tick(W - 20, 100, 8.6)
    slab(sc, 8, 22, W, T, hd, H, inner, o=10, inset=5)

    body(sc, rrect(146, 62, 30, 30, 5), hd, 32, o=11, sw=1.0)
    panel(sc, 146, 92, hd + 32, 30, 30, (
        '<circle cx="15" cy="15" r="10.5" fill="none" stroke="%s" stroke-width="1.8"/>' % C["ink"] +
        '<path d="M15 8.4 V15 l5 3.4" stroke="%s" stroke-width="1.8" fill="none" '
        'stroke-linecap="round"/>' % C["ink"]), o=11.3)

    route(sc, [(-56, 150, d2 + 3), (-30, 140, 10), (-8, 128, hd + 3)], o=12, glow=.8)
    cap_side(sc, "BOOK A", "DEMO", o=20)
    return sc


# ── 13. /platform/endpoint-controls — PEDESTAL ──────────────────────────
def endpoint_pedestal():
    sc = Scene("endpoint")
    trace(sc, [(-150, 200), (-40, 200), (-40, 134), (226, 134)], o=0,
          nodes=[(-150, 200), (226, 134)])

    ghost_board(sc, 210, 26, 0, o=2, w=52, d=38, hgt=52)
    xmark(sc, (236, 22, 74), o=2.6, r=7.4)

    hd = pad(sc, -14, -6, 196, 152, 0, o=6, c=13, h1=12, hb=3.6, h2=7, leds=False)
    led_strip(sc, -14, 146, 196, 7 + 3.6 + 12 * .30, 7 + 3.6 + 12 * .66,
              n=6, lit=(1, 4), o=6.5)

    laptop(sc, 22, 24, hd, o=10, w=118, d=46,
           screen_svg=watermark_svg(104, 52))

    cap_side(sc, "ENDPOINT", "CONTROLS", o=20, green=True)
    return sc


# ═════════════════════════════════════════════════════════════ page table
PAGES = [
    dict(slug="/platform", eyebrow="Platform",
         h1="Access control the way your network actually works.",
         comp="HUB", fn=platform_hub,
         trim="H1 trimmed from “Access control that works the way your network actually does.”"),
    dict(slug="/solutions", eyebrow="Solutions",
         h1="Same platform. Fourteen access problems.",
         comp="FLOW", fn=solutions_flow, trim=""),
    dict(slug="/multifactor-authentication", eyebrow="Platform",
         h1="A password is a guess. Prove it’s really them.",
         comp="HUB", fn=mfa_hub, trim="Reuses the kit’s mfa_hub scene unchanged."),
    dict(slug="/zero-trust-features/single-sign-on", eyebrow="Platform",
         h1="Log in once. Get everything you’re allowed.",
         comp="FLOW", fn=sso_flow, trim=""),
    dict(slug="/zero-trust-network-access", eyebrow="Platform",
         h1="Network access that verifies everything.",
         comp="FLOW", fn=ztna_flow,
         trim="H1 trimmed from “…that assumes nothing and verifies everything.” · reuses the kit’s ztna_flow unchanged."),
    dict(slug="/zero-trust-application-access", eyebrow="Platform",
         h1="One portal. Every app. No network exposed.",
         comp="FLOW", fn=ztaa_flow, trim=""),
    dict(slug="/zero-trust-features/device-binding", eyebrow="Platform",
         h1="Credentials say who. Binding says from what.",
         comp="PEDESTAL", fn=binding_pedestal, trim=""),
    dict(slug="/zero-trust-features/device-posture-check", eyebrow="Platform",
         h1="The user checked out. Is the laptop lying?",
         comp="PEDESTAL", fn=posture_pedestal, trim=""),
    dict(slug="/platform/endpoint-controls", eyebrow="Platform",
         h1="Access granted is not the end of the story.",
         comp="PEDESTAL", fn=endpoint_pedestal, trim=""),
    dict(slug="/awards", eyebrow="Company",
         h1="Judged by people who do not work here.",
         comp="PEDESTAL", fn=awards_pedestal, trim=""),
    dict(slug="/instasafe-newsroom", eyebrow="Company",
         h1="InstaSafe, in other people’s words.",
         comp="PEDESTAL", fn=newsroom_pedestal, trim=""),
    dict(slug="/blog", eyebrow="Resources",
         h1="Insights from the Zero Trust front line.",
         comp="PEDESTAL", fn=blog_pedestal, trim=""),
    dict(slug="/careers", eyebrow="Company",
         h1="Grow with InstaSafe.",
         comp="FLOW", fn=careers_flow, trim=""),
    dict(slug="/resource-center", eyebrow="Resources",
         h1="Every brochure, whitepaper and recording.",
         comp="PEDESTAL", fn=resources_pedestal,
         trim="H1 trimmed from “Every Brochure, Whitepaper and Recording, In One Place.”"),
    dict(slug="/book-a-demo", eyebrow="Company",
         h1="See InstaSafe ZTNA running against your use case.",
         comp="PEDESTAL", fn=demo_pedestal, trim=""),
]


# ═════════════════════════════════════════════════════════════ the board
def lockup_symbol():
    p = os.path.join(ROOT, "public", "brand", "instasafe-lockup-black.svg")
    src = open(p, "r", encoding="utf-8").read()
    vb = re.search(r'viewBox="([^"]+)"', src).group(1)
    inner = re.sub(r"^.*?<svg[^>]*>", "", src, flags=re.S)
    inner = re.sub(r"</svg>\s*$", "", inner, flags=re.S)
    return ('<svg width="0" height="0" style="position:absolute" aria-hidden="true">'
            '<symbol id="izlockup" viewBox="%s">%s</symbol></svg>' % (vb, inner))


CSS = """
:root{--bg:#F7F4EF;--ink:#22221F;--mid:#6E6A63;--hair:#E2DDD4;--acc:#F2621A;--ok:#1E9E52;
--card:#FFFFFF;--mono:ui-monospace,SFMono-Regular,Menlo,monospace}
*{box-sizing:border-box}html,body{margin:0}
body{background:var(--bg);color:var(--ink);font-family:"Helvetica Neue",Inter,system-ui,Arial,sans-serif;line-height:1.55}
.w{max-width:1180px;margin:0 auto;padding:52px 26px 110px}
h1{font-size:30px;letter-spacing:-.02em;margin:0 0 8px;font-weight:650}
.lede{color:var(--mid);max-width:70ch;margin:0 0 34px;font-size:14.5px}
h2{font-size:11px;font-family:var(--mono);letter-spacing:.16em;text-transform:uppercase;
color:var(--mid);font-weight:400;margin:54px 0 18px;border-top:1px solid var(--hair);padding-top:18px}
.thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.th{background:var(--card);border:1px solid var(--hair);border-radius:11px;padding:10px}
.th svg{display:block;width:100%;height:auto;border-radius:7px}
.th p{margin:9px 2px 1px;font-family:var(--mono);font-size:10.5px;color:var(--mid);
letter-spacing:.02em;overflow-wrap:anywhere}
.th b{display:block;font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;color:var(--acc);margin-top:3px}
.og{background:#fff;border:1px solid var(--hair);border-radius:13px;overflow:hidden;margin-bottom:10px}
.ogi{position:relative;width:100%;aspect-ratio:1200/630;background:var(--bg);display:flex;
align-items:center;overflow:hidden}
.ogt{width:46%;padding:0 0 0 5%;z-index:2}
.ogt .eb{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--acc);margin-bottom:14px}
.ogt h3{font-size:clamp(18px,2.7vw,33px);line-height:1.08;letter-spacing:-.025em;margin:0 0 20px;font-weight:650}
.ogt .lk{display:block;width:clamp(96px,13vw,148px);height:auto;opacity:.86}
.ogv{position:absolute;right:-1%;top:50%;transform:translateY(-50%);width:61%}
.ogv svg{width:100%;height:auto}
.row{display:flex;gap:16px;align-items:baseline;flex-wrap:wrap;margin:0 2px 40px;
font-family:var(--mono);font-size:11px;color:var(--mid)}
.row .p{color:var(--ink);font-size:12px}
.tag{font-family:var(--mono);font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;
border:1px solid var(--hair);border-radius:999px;padding:3px 9px;color:var(--mid);background:#fff}
.row .note{color:var(--mid);font-family:"Helvetica Neue",Inter,system-ui,Arial,sans-serif;
font-size:12px;flex-basis:100%;max-width:88ch}
.note{border-left:2px solid var(--acc);padding-left:15px;color:var(--mid);font-size:13.5px;max-width:84ch;margin-top:18px}
code{font-family:var(--mono);font-size:12px;background:#EFEBE3;padding:1px 5px;border-radius:3px}
"""


def build():
    # hand the kit the real Phosphor Fingerprint before anything renders
    set_fingerprint('<g transform="translate(9,24)">%s</g>'
                    % phosphor("Fingerprint", 26, 26, C["acc"]))
    built = []
    for pg in PAGES:
        sc = pg["fn"]()
        svg, aspect, met = wrap_fit(sc)
        built.append(dict(pg, svg=svg, aspect=aspect, met=met, scene=sc))

    thumbs = "".join(
        '<div class="th">%s<p>%s</p><b>%s</b></div>' % (b["svg"], b["slug"], b["comp"])
        for b in built)

    frames = ""
    for b in built:
        frames += (
            '<div class="og"><div class="ogi">'
            '<div class="ogt"><div class="eb">%s /</div><h3>%s</h3>'
            '<svg class="lk" viewBox="0 0 900.25 293.33"><use href="#izlockup"/></svg></div>'
            '<div class="ogv">%s</div>'
            '</div></div>'
            '<div class="row"><span class="p">%s</span><span class="tag">%s</span>'
            '<span>aspect %.3f</span><span>fill %.0f%%</span>%s</div>'
            % (b["eyebrow"], b["h1"], b["svg"], b["slug"], b["comp"], b["aspect"],
               b["met"]["fill"] * 100.0,
               ('<span class="note">%s</span>' % b["trim"]) if b["trim"] else ""))

    html = (
        '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width,initial-scale=1">'
        '<title>OG image drafts — 15 pages</title><style>%s</style></head><body>%s<div class="w">'
        '<h1>Social-share images — draft review</h1>'
        '<p class="lede">Fifteen page thumbnails, generated parametrically from the InstaSafe '
        'illustration kit. Three compositions are in play: <b>flow</b> (left-to-right stations), '
        '<b>hub</b> (central plinth, satellites) and <b>pedestal</b> (one centred subject, larger '
        'scale) — the third is new, for the content and action pages. Nothing here is wired into '
        'the site yet; this board is for choosing and correcting.</p>'
        '<h2>the glance test — all fifteen at thumbnail size</h2>'
        '<p class="lede">Every card below is the same shape: one canvas aspect '
        '(<b>1.250</b>, 5:4) for all fifteen, so the grid rows are level and no '
        'drawing is bigger or smaller than its neighbour by accident. The canvas '
        'was widened or heightened around each scene to get there — nothing was '
        'cropped and no artwork moved.</p>'
        '<div class="thumbs">%s</div>'
        '<h2>full frames · 1200 &times; 630</h2>%s'
        '<p class="note">Generated by <code>gen_og_kit.py</code>, which extends '
        '<code>gen_scene_kit.py</code>. Re-run the script to regenerate this page.</p>'
        '</div></body></html>' % (CSS, lockup_symbol(), thumbs, frames))

    out = os.path.join(HERE, "index.html")
    open(out, "w", encoding="utf-8").write(html)

    # ── the same fifteen scenes as standalone files ─────────────────────
    # The board is for looking at; these are for consuming. lib/scripts/
    # gen-og-pages.mjs rasterises them into the per-route social cards, and
    # a 740KB index.html is not something another program should have to
    # parse to get at one drawing.
    sdir = os.path.join(HERE, "scenes")
    os.makedirs(sdir, exist_ok=True)
    for b in built:
        f = os.path.join(sdir, route_slug(b["slug"]) + ".svg")
        open(f, "w", encoding="utf-8", newline="").write(scene_svg_file(b["scene"]))

    # The eyebrow and the H1 are APPROVED STRINGS — the trims in PAGES were
    # signed off against this board. Retyping them into the Node generator
    # would be a second copy free to drift from the one the client saw, so
    # the table ships as data instead. sort_keys + a trailing newline keep
    # the file byte-stable across runs.
    manifest = [dict(slug=b["slug"], file=route_slug(b["slug"]) + ".svg",
                     eyebrow=b["eyebrow"], h1=b["h1"], comp=b["comp"])
                for b in built]
    open(os.path.join(sdir, "manifest.json"), "w", encoding="utf-8", newline="").write(
        json.dumps(manifest, indent=2, ensure_ascii=False, sort_keys=True) + "\n")
    return built, out, sdir


# ═════════════════════════════════════════════════ audit geometry helpers
def _rect_poly(r):
    x0, y0, x1, y1 = r
    return [(x0, y0), (x1, y0), (x1, y1), (x0, y1)]


def _pt_in_poly(p, poly):
    x, y = p
    inside = False
    n = len(poly)
    for i in range(n):
        x1, y1 = poly[i]
        x2, y2 = poly[(i + 1) % n]
        if (y1 > y) != (y2 > y):
            xi = x1 + (y - y1) * (x2 - x1) / (y2 - y1)
            if x < xi:
                inside = not inside
    return inside


def _seg_seg(a, b, c, d):
    def cr(o, p, q):
        return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0])
    d1, d2 = cr(c, d, a), cr(c, d, b)
    d3, d4 = cr(a, b, c), cr(a, b, d)
    return ((d1 > 0) != (d2 > 0)) and ((d3 > 0) != (d4 > 0))


def _seg_hits_poly(a, b, poly):
    if _pt_in_poly(a, poly) or _pt_in_poly(b, poly):
        return True
    n = len(poly)
    return any(_seg_seg(a, b, poly[i], poly[(i + 1) % n]) for i in range(n))


def _seg_dist(a, b, c, d):
    if _seg_seg(a, b, c, d):
        return 0.0

    def pd(p, u, v):
        ux, uy = v[0] - u[0], v[1] - u[1]
        L = ux * ux + uy * uy
        t = 0.0 if L == 0 else max(0.0, min(1.0, ((p[0]-u[0])*ux + (p[1]-u[1])*uy) / L))
        return math.hypot(p[0] - (u[0] + t*ux), p[1] - (u[1] + t*uy))
    return min(pd(a, c, d), pd(b, c, d), pd(c, a, b), pd(d, a, b))


def _poly_dist(A, B):
    """0 when they touch or one contains the other, else min edge distance."""
    if _pt_in_poly(A[0], B) or _pt_in_poly(B[0], A):
        return 0.0
    best = 1e9
    for i in range(len(A)):
        for j in range(len(B)):
            best = min(best, _seg_dist(A[i], A[(i + 1) % len(A)],
                                       B[j], B[(j + 1) % len(B)]))
    return best


def _rect_gap(a, b):
    """Scene-space gap between two (x, y, w, d) footprints."""
    ax0, ay0, aw, ad = a
    bx0, by0, bw, bd = b
    dx = max(bx0 - (ax0 + aw), ax0 - (bx0 + bw), 0.0)
    dy = max(by0 - (ay0 + ad), ay0 - (by0 + bd), 0.0)
    return math.hypot(dx, dy)


def _station_of(sc, anchor):
    """Which plinth a panel stands on — its anchor inside a pad footprint
       (+8 units of slop). Free-floating caption plates get their own
       station, so they are held to the 12px clearance rule."""
    ax, ay = anchor
    for k, p in enumerate(sc.pads):
        x, y, w, d = p["fp"]
        if x - 8 <= ax <= x + w + 8 and y - 8 <= ay <= y + d + 8:
            return "pad%d" % k
    return None



# -- content geometry: what a plate's markup actually occupies ------------
_TOK = re.compile(r'<text\b([^>]*)>(.*?)</text>|<(g|svg)\b([^>]*?)(/?)>|</(?:g|svg)>'
                  r'|<(rect|circle|ellipse|path|polygon|polyline|use|image)\b([^>]*?)/?>',
                  re.S)


def _at(tag, name):
    m = re.search(r'\b%s="([^"]*)"' % name, tag or "")
    return m.group(1) if m else None


def _f(tag, name, d=0.0):
    v = _at(tag, name)
    try:
        return float(re.match(r"\s*(-?[\d.eE+]+)", v).group(1))
    except Exception:
        return d


def _xform(tag):
    """(dx, dy, k) from a transform attribute. translate + uniform scale is
       all this kit emits; a rotate is treated as pivoting on its origin."""
    t = _at(tag, "transform") or ""
    dx = dy = 0.0
    k = 1.0
    m = re.search(r"translate\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)", t)
    if m:
        dx, dy = float(m.group(1)), float(m.group(2))
    else:
        m = re.search(r"translate\(\s*(-?[\d.]+)\s*\)", t)
        if m:
            dx = float(m.group(1))
    m = re.search(r"scale\(\s*(-?[\d.]+)", t)
    if m:
        k = float(m.group(1))
    m = re.search(r"matrix\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)[ ,]+(-?[\d.]+)[ ,]+"
                  r"(-?[\d.]+)[ ,]+(-?[\d.]+)[ ,]+(-?[\d.]+)", t)
    if m:
        a, b_, c_, d_, e, f = [float(g) for g in m.groups()]
        dx, dy, k = e, f, max(abs(a), abs(d_)) or 1.0
    return dx, dy, k


def mono_width(txt, size, ls):
    """Estimated advance width of a monospace string, letter-spacing
    included. The board renders in a real mono face; 0.60em per character is
    the standard advance, and the estimate only has to be tight enough to
    catch a string running off its plate."""
    n = len(txt)
    if n == 0:
        return 0.0
    em = 0.0
    if ls:
        m = re.match(r"\s*(-?[\d.]+)\s*em", ls)
        if m:
            em = float(m.group(1))
    return n * size * MONO_ADV + max(0, n - 1) * size * em


_PNUM = re.compile(r"[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?")


def path_bbox(d):
    """Bounding box of a path's control points, relative commands honoured.
    Control points bound the curve for every command this kit emits, so the
    box is conservative (never smaller than the true ink)."""
    toks = re.findall(r"[MmLlHhVvCcSsQqTtAaZz]|[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?", d)
    i, cmd = 0, None
    cx = cy = sx = sy = 0.0
    xs, ys = [], []
    NARG = dict(M=2, L=2, H=1, V=1, C=6, S=4, Q=4, T=2, A=7, Z=0)
    while i < len(toks):
        t = toks[i]
        if re.match(r"[A-Za-z]", t):
            cmd = t
            i += 1
            if cmd in "Zz":
                cx, cy = sx, sy
                continue
        if cmd is None:
            i += 1
            continue
        up = cmd.upper()
        rel = cmd.islower()
        n = NARG[up]
        if i + n > len(toks):
            break
        try:
            a = [float(v) for v in toks[i:i + n]]
        except ValueError:
            break
        i += n
        if up == "H":
            cx = cx + a[0] if rel else a[0]
        elif up == "V":
            cy = cy + a[0] if rel else a[0]
        elif up == "A":
            px, py = a[5], a[6]
            cx, cy = (cx + px, cy + py) if rel else (px, py)
            xs += [cx - a[0], cx + a[0]]
            ys += [cy - a[1], cy + a[1]]
        else:
            pts = list(zip(a[0::2], a[1::2]))
            for px, py in pts:
                ax, ay = (cx + px, cy + py) if rel else (px, py)
                xs.append(ax)
                ys.append(ay)
            # relative multi-point commands advance from the LAST point only
            lx, ly = pts[-1]
            cx, cy = (cx + lx, cy + ly) if rel else (lx, ly)
            if up == "M":
                sx, sy = cx, cy
        xs.append(cx)
        ys.append(cy)
    if not xs:
        return None
    return min(xs), min(ys), max(xs), max(ys)


def plate_items(content):
    """Walk a content string and yield every drawn thing as
    (kind, x0, y0, x1, y1, note) in the plate's own coordinates."""
    out = []
    stack = [(0.0, 0.0, 1.0, False)]
    for m in _TOK.finditer(content):
        if m.group(0).startswith("</"):
            if len(stack) > 1:
                stack.pop()
            continue
        ox, oy, ok, clip = stack[-1]
        if m.group(3):                                   # <g> / nested <svg>
            tag = m.group(4) or ""
            dx, dy, k = _xform(tag)
            lg = re.search(r'data-logo="([\d.]+) ([\d.]+)"', tag)
            if lg:
                lw, lh = float(lg.group(1)) * ok, float(lg.group(2)) * ok
                out.append(("logo", ox + dx * ok, oy + dy * ok,
                            ox + dx * ok + lw, oy + dy * ok + lh, ""))
            if not m.group(5):
                stack.append((ox + dx * ok, oy + dy * ok, ok * k,
                              clip or bool(lg) or ('clip-path=' in tag)))
            continue
        if clip:            # inside a clipPath group: cannot spill, by
            continue        # construction — the clip is the guarantee
        if m.group(1) is not None:                       # <text>
            tag, txt = m.group(1), re.sub(r"<[^>]*>", "", m.group(2))
            size = _f(tag, "font-size", 9.0) * ok
            wdt = mono_width(txt, size, _at(tag, "letter-spacing"))
            x = ox + _f(tag, "x") * ok
            y = oy + _f(tag, "y") * ok
            a = _at(tag, "text-anchor") or "start"
            x0 = x - wdt / 2 if a == "middle" else (x - wdt if a == "end" else x)
            out.append(("text", x0, y - size * 0.80, x0 + wdt, y + size * 0.22, txt))
            continue
        kind, tag = m.group(6), m.group(7)               # shapes
        dx, dy, k = _xform(tag)
        bx, by, bk = ox + dx * ok, oy + dy * ok, ok * k
        if kind in ("rect", "image"):
            x, y = _f(tag, "x"), _f(tag, "y")
            out.append((kind, bx + x * bk, by + y * bk,
                        bx + (x + _f(tag, "width")) * bk,
                        by + (y + _f(tag, "height")) * bk, ""))
        elif kind in ("circle", "ellipse"):
            cx, cy = _f(tag, "cx"), _f(tag, "cy")
            rx = _f(tag, "r") or _f(tag, "rx")
            ry = _f(tag, "r") or _f(tag, "ry")
            out.append((kind, bx + (cx - rx) * bk, by + (cy - ry) * bk,
                        bx + (cx + rx) * bk, by + (cy + ry) * bk, ""))
        elif kind in ("path", "polygon", "polyline"):
            if kind == "path":
                bb = path_bbox(_at(tag, "d") or "")
            else:
                nums = [float(t) for t in re.findall(
                    r"-?\d*\.?\d+(?:[eE][-+]?\d+)?", _at(tag, "points") or "")]
                bb = ((min(nums[0::2]), min(nums[1::2]),
                       max(nums[0::2]), max(nums[1::2])) if len(nums) >= 2 else None)
            if bb:
                out.append((kind, bx + bb[0] * bk, by + bb[1] * bk,
                            bx + bb[2] * bk, by + bb[3] * bk, ""))
    return out


# -- AUDIT D -- every string fits its plate -------------------------------
def audit_text(sc):
    """Strings keep TEXT_PAD from the plate edge; drawn glyphs merely have to
    stay on the plate. Glyphs are checked too because the same failure the
    client saw on the screens — a shield whose path runs 14 units LEFT of its
    anchor — is a path bug, and text-only checking would never see it."""
    bad = []
    for pi, pl in enumerate(sc.plates):
        if pl["kind"] != "panel":
            continue
        W, H = pl["w"], pl["h"]
        for kind, x0, y0, x1, y1, txt in plate_items(pl["content"]):
            if kind == "text":
                if x0 < TEXT_PAD - .01 or x1 > W - TEXT_PAD + .01:
                    bad.append("plate%d w%.0f %r spans %.0f..%.0f"
                               % (pi, W, txt[:18], x0, x1))
                elif y1 > H + .01 or y0 < -.01:
                    bad.append("plate%d h%.0f %r rows %.0f..%.0f"
                               % (pi, H, txt[:18], y0, y1))
            else:
                if x0 <= 0.6 and x1 >= W - 0.6:
                    continue          # the plate's own background rect
                if x0 < -.01 or y0 < -.01 or x1 > W + .01 or y1 > H + .01:
                    bad.append("plate%d %dx%d %s off-plate %.0f,%.0f..%.0f,%.0f"
                               % (pi, W, H, kind, x0, y0, x1, y1))
    return bad


# -- AUDIT E -- screen content clears the bezel ---------------------------
def audit_screen(sc):
    """Content is authored against the full canvas and then shrunk into an
    inset box by laptop(), so proving "fits the canvas" proves "clears the
    edge by SCREEN_INSET"."""
    bad, worst = [], None
    for pl in sc.plates:
        if pl["kind"] != "screen":
            continue
        W, H = pl["w"], pl["h"]
        for kind, x0, y0, x1, y1, txt in plate_items(pl["content"]):
            over = max(-x0 / W, -y0 / H, (x1 - W) / W, (y1 - H) / H)
            if over > 0.001:
                bad.append("screen %.0fx%.0f %s %r overruns %.0f%%"
                           % (W, H, kind, txt[:14], over * 100))
            m = SCREEN_INSET - max(0.0, over)
            worst = m if worst is None else min(worst, m)
    return bad, worst


# ── AUDIT A — laptop proportions -----------------------------------------
def audit_laptop(sc):
    bad = []
    for L in sc.laptops:
        if L["ratio"] < MIN_SCREEN_RATIO:
            bad.append("screen/deck %.2f (w%d d%d)" % (L["ratio"], L["w"], L["d"]))
    worst = min((L["ratio"] for L in sc.laptops), default=None)
    return bad, worst


# ── AUDIT B — routes never cross a panel face or a label ------------------
def audit_routes(sc):
    """Fix B. A route may NOT be drawn over a panel face or over in-scene
    type. It MAY pass a panel that is drawn later (higher `o`) - the
    sanctioned "route it behind, let the object occlude it" case - and that
    is counted and reported rather than silently forgiven. Pad decks are
    fair game on the first and last segment (a route starts and lands on a
    plinth) and for routes that declare deck_ok (the careers stair, whose
    whole point is a route climbing the decks)."""
    bad, behind = [], 0
    for ri, r in enumerate(sc.routes):
        pts = r["pts"]
        for si in range(len(pts) - 1):
            a, b = pts[si], pts[si + 1]
            endpoint_seg = (si == 0 or si == len(pts) - 2)
            for pi, pn in enumerate(sc.panels):
                if _seg_hits_poly(a, b, pn["poly"]):
                    if r["o"] < pn["o"]:
                        behind += 1
                    else:
                        bad.append("route%d seg%d OVER panel%d (o %.1f>=%.1f)"
                                   % (ri, si, pi, r["o"], pn["o"]))
            for li, lb in enumerate(sc.labels):
                if _seg_hits_poly(a, b, _rect_poly(lb["rect"])):
                    bad.append("route%d seg%d x label %r" % (ri, si, lb["text"][:18]))
            if not endpoint_seg and not r.get("deck_ok"):
                for di, pd_ in enumerate(sc.pads):
                    if _seg_hits_poly(a, b, pd_["deck"]):
                        bad.append("route%d midseg%d x deck%d" % (ri, si, di))
    return bad, behind


# ── AUDIT C — internal margins -------------------------------------------
def audit_margins(sc, met):
    """The >=30 units of ground rule is measured against the CONTENT box, not
    the normalised canvas: met["pad_x"] / met["pad_y"] are the delivered
    distances from the content bbox to the canvas edge, so the free ground
    fit_vb adds on the short axis cannot flatter a scene into passing. Since
    normalisation only ever expands, the tight axis carries exactly
    scene_pad(W, H) and that is what gets checked."""
    bad = []
    for i in range(len(sc.pads)):
        for j in range(i + 1, len(sc.pads)):
            a, b = sc.pads[i], sc.pads[j]
            g = _rect_gap(a["fp"], b["fp"])
            same = a["group"] is not None and a["group"] == b["group"]
            if same:
                if g <= 0 and _poly_dist(a["deck"], b["deck"]) <= 0:
                    pass          # a deliberate staircase / shelf, touching is the form
            elif g < MIN_STATION_GAP:
                bad.append("station%d~station%d gap %.1fu" % (i, j, g))

    items = ([dict(kind="panel", poly=p["poly"], st=_station_of(sc, p["anchor"]) or "free%d" % k)
              for k, p in enumerate(sc.panels)] +
             [dict(kind="label", poly=_rect_poly(l["rect"]), st="lbl%d" % k)
              for k, l in enumerate(sc.labels)])
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i]["st"] == items[j]["st"]:
                continue
            dd = _poly_dist(items[i]["poly"], items[j]["poly"])
            if dd < MIN_CLEAR_PX:
                bad.append("%s%d~%s%d %.1fpx" % (items[i]["kind"], i,
                                                 items[j]["kind"], j, dd))
    tight = min(met["pad_x"], met["pad_y"])
    if tight < 30.0:
        bad.append("content-box pad %.1f < 30" % tight)
    return bad


# ═════════════════════════════════════════════════════════════ self-check
PALETTE_OK = set(v.lower() for v in C.values()) | {
    "#ffffff", "#fff", "#ebf7ef", "#f2efea", "#8e8a84", "#f1eee8", "#f8f6f1",
}


def verify(built):
    print("%-41s %-8s %5s %5s %5s %4s %5s  %-6s %-6s %-6s %-6s %-6s %s" %
          ("scene", "comp", "fit", "fill", "elem", "grn", "lap",
           "ROUTE", "MARGIN", "LAPTOP", "TEXT", "SCREEN", "notes"))
    print("-" * 140)
    ok = True
    seen_cols = {}
    details = []
    for b in built:
        svg, sc = b["svg"], b["scene"]
        green = sum(1 for _, it in sc.items if C["ok"] in it)
        elems = len(re.findall(r"<(?:polygon|path|rect|circle|ellipse|text)", svg))
        for col in re.findall(r"#[0-9A-Fa-f]{3,6}", svg):
            seen_cols.setdefault(col.lower(), set()).add(sc.name)

        met = b["met"]
        r_bad, behind = audit_routes(sc)
        m_bad = audit_margins(sc, met)
        l_bad, worst = audit_laptop(sc)
        t_bad = audit_text(sc)
        s_bad, _sm = audit_screen(sc)

        flag = []
        if green != 1:
            flag.append("GREEN=%d" % green)
        x0, x1, y0, y1 = sc.bx
        if (x1 - x0) < 40 or (y1 - y0) < 40:
            flag.append("DEGENERATE-BBOX")
        if abs(b["aspect"] - OG_ASPECT) >= 5e-4:
            flag.append("ASPECT")
        if not (MIN_FILL <= met["fill"] <= MAX_FILL):
            flag.append("FILL")
        if r_bad or m_bad or l_bad or t_bad or s_bad or flag:
            ok = False
        print("%-41s %-8s %5.3f %4.0f%% %5d %4d %5s  %-6s %-6s %-6s %-6s %-6s %s" %
              (b["slug"], b["comp"], b["aspect"], met["fill"] * 100.0, elems, green,
               ("%.2f" % worst) if worst else "-",
               "PASS" if not r_bad else "FAIL%d" % len(r_bad),
               "PASS" if not m_bad else "FAIL%d" % len(m_bad),
               "PASS" if not l_bad else "FAIL%d" % len(l_bad),
               "PASS" if not t_bad else "FAIL%d" % len(t_bad),
               "PASS" if not s_bad else "FAIL%d" % len(s_bad),
               (("behind:%d " % behind) if behind else "") + " ".join(flag)))
        for tag, lst in (("route", r_bad), ("margin", m_bad), ("laptop", l_bad),
                         ("text", t_bad), ("screen", s_bad)):
            for m in lst:
                details.append("   %-30s %-7s %s" % (b["slug"], tag, m))
    if details:
        print("\nfailures (%d):" % len(details))
        print("\n".join(details))

    # ── AUDIT F — one canvas, fifteen scenes -----------------------------
    # The client's complaint was heights, so heights are what gets proved.
    # Every viewBox is quoted to one decimal, so the delivered aspect is
    # recomputed from the STRING that ships, not from the float that made
    # it, and rounded to 3 dp: one distinct value or this fails.
    vbs = [re.search(r'viewBox="([^"]+)"', b["svg"]).group(1) for b in built]
    dims = [[float(t) for t in v.split()] for v in vbs]
    shipped = sorted({round(w / h, 3) for _, _, w, h in dims})
    fills = [b["met"]["fill"] for b in built]
    tight = min(min(b["met"]["pad_x"], b["met"]["pad_y"]) for b in built)
    slot_w, frame_h = 1200 * 0.61, 630.0          # .ogv width / .ogi height
    tall = slot_w / min(shipped)
    print("\ncanvas normalisation — target %.3f, expand-only" % OG_ASPECT)
    print("   shipped viewBox aspects (3 dp): %s  ->  %s"
          % (", ".join("%.3f" % a for a in shipped),
             "UNIFORM" if len(shipped) == 1 else "SPLIT (%d values)" % len(shipped)))
    print("   rendered in the .og frame: %.0f x %.1f px in a %.0f x %.0f slot "
          "-> %.1f px of vertical air, %s"
          % (slot_w, tall, slot_w, frame_h, frame_h - tall,
             "NO CROP" if tall <= frame_h else "CROPPED"))
    print("   thumbnail cells: width is grid-uniform and height = width / %.3f "
          "for all 15 -> identical" % OG_ASPECT)
    print("   fill %%: min %.1f  max %.1f  spread %.1f pts  (band %.0f-%.0f)"
          % (min(fills) * 100, max(fills) * 100,
             (max(fills) - min(fills)) * 100, MIN_FILL * 100, MAX_FILL * 100))
    print("   tightest content-box pad: %.1f units (floor %.0f)" % (tight, VB_PAD))
    if len(shipped) != 1 or tall > frame_h or tight < 30.0:
        ok = False

    print("\nkit-palette colours (%d third-party mark colours excluded, "
          "brand-accurate by permission):" % len(LOGO_COLORS))
    for col in sorted(seen_cols):
        if col in LOGO_COLORS:
            continue
        bad = "" if col in PALETTE_OK else "   <-- OFF-PALETTE"
        print("   %-9s %2d scenes%s" % (col, len(seen_cols[col]), bad))
    stray = [c for c in seen_cols if c not in PALETTE_OK and c not in LOGO_COLORS]
    reds = [c for c in seen_cols
            if c not in LOGO_COLORS and len(c) == 7 and int(c[1:3], 16) > 0xB0
            and int(c[3:5], 16) < 0x50 and int(c[5:7], 16) < 0x50]
    print("\noff-palette: %s   |   red-family: %s" % (stray or "none", reds or "none"))
    return ok and not stray and not reds


if __name__ == "__main__":
    built, out, sdir = build()
    print("wrote", out)
    print("wrote", os.path.join(sdir, "<slug>.svg"), "x %d\n" % len(built))
    raise SystemExit(0 if verify(built) else 1)
