#!/usr/bin/env python3
"""
Draws the wafer cross-sections on the /machines/ process flow:
static/images/process/<step>.svg, one per step in data/process.yaml.

Each picture is a slice through the wafer after that step, in the site's
colours. They stand in until someone adds a real photo (`photo:` on the
step in data/process.yaml), so they are drawn to be read at card size:
few layers, flat colours, a short label for each layer.

Run from the repository root:   python3 tools/process-diagrams.py
Only the Python standard library is needed.
"""
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "static", "images", "process")
W, H = 800, 600
X0, X1 = 50, 520          # the slice of wafer
LABEL_X = 548             # where the layer names sit

# site colours (tailwind-input.css)
BG = "#f3f1f7"
SI = "#d6d0e1"            # silicon
SI_EDGE = "#a79fb8"
OX = "#ffffff"            # silicon dioxide
OX_EDGE = "#8f86a3"
RESIST = "#6d28d9"        # photoresist (--uv)
EXPOSED = "#c4b5fd"       # resist after exposure
DOPED = "#42245f"         # doped silicon (--uv-deep)
METAL = "#4a4656"
INK = "#17141f"
MUTED = "#6f6a7d"
UV = "#6d28d9"

# vertical layout of the stack
SI_TOP, SI_BOT = 390, 510
OX_TOP = 354              # oxide is OX_TOP .. SI_TOP
RS_TOP = 310              # resist is RS_TOP .. OX_TOP
WIN0, WIN1 = 210, 350     # the window patterned into this layer

FONT = 'font-family="IBM Plex Sans, ui-sans-serif, system-ui, sans-serif"'


def svg(body, title):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img">'
        f"<title>{title}</title>"
        f'<rect width="{W}" height="{H}" fill="{BG}"/>'
        f"{body}</svg>\n"
    )


def rect(x0, y0, x1, y1, fill, stroke=None, extra=""):
    s = f' stroke="{stroke}" stroke-width="1.5"' if stroke else ""
    return f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" fill="{fill}"{s}{extra}/>'


def label(y, text, color=INK, x_from=X1):
    """A layer name at the right, with a short leader line."""
    return (
        f'<line x1="{x_from + 6}" y1="{y}" x2="{LABEL_X - 8}" y2="{y}" stroke="{MUTED}" stroke-width="1"/>'
        f'<text x="{LABEL_X}" y="{y + 6}" {FONT} font-size="24" fill="{color}">{text}</text>'
    )


def caption(text):
    return f'<text x="{X0}" y="{H - 34}" {FONT} font-size="22" fill="{MUTED}">{text}</text>'


def silicon(doped=False):
    out = rect(X0, SI_TOP, X1, SI_BOT, SI, SI_EDGE)
    if doped:
        out += f'<path d="M{WIN0} {SI_TOP} L{WIN1} {SI_TOP} Q{WIN1 + 34} {SI_TOP} {WIN1 + 34} {SI_TOP + 30} L{WIN1 + 34} {SI_TOP + 36} Q{WIN1 + 34} {SI_TOP + 54} {WIN1 - 10} {SI_TOP + 54} L{WIN0 + 10} {SI_TOP + 54} Q{WIN0 - 34} {SI_TOP + 54} {WIN0 - 34} {SI_TOP + 36} L{WIN0 - 34} {SI_TOP + 30} Q{WIN0 - 34} {SI_TOP} {WIN0} {SI_TOP} Z" fill="{DOPED}" opacity=".85"/>'
    return out


def oxide(window=False):
    if not window:
        return rect(X0, OX_TOP, X1, SI_TOP, OX, OX_EDGE)
    return rect(X0, OX_TOP, WIN0, SI_TOP, OX, OX_EDGE) + rect(WIN1, OX_TOP, X1, SI_TOP, OX, OX_EDGE)


def resist(state="whole"):
    """state: whole | exposed | open"""
    if state == "whole":
        return rect(X0, RS_TOP, X1, OX_TOP, RESIST, None, ' opacity=".85"')
    if state == "exposed":
        return (rect(X0, RS_TOP, WIN0, OX_TOP, RESIST, None, ' opacity=".85"')
                + rect(WIN0, RS_TOP, WIN1, OX_TOP, EXPOSED)
                + rect(WIN1, RS_TOP, X1, OX_TOP, RESIST, None, ' opacity=".85"'))
    return (rect(X0, RS_TOP, WIN0, OX_TOP, RESIST, None, ' opacity=".85"')
            + rect(WIN1, RS_TOP, X1, OX_TOP, RESIST, None, ' opacity=".85"'))


def arrows_down(x_from, x_to, y0, y1, color, n=5, dash=False):
    out = ""
    d = ' stroke-dasharray="6 6"' if dash else ""
    for i in range(n):
        x = x_from + (x_to - x_from) * (i + 0.5) / n
        out += (f'<line x1="{x:.0f}" y1="{y0}" x2="{x:.0f}" y2="{y1 - 10}" stroke="{color}" stroke-width="2"{d}/>'
                f'<path d="M{x - 6:.0f} {y1 - 14} L{x:.0f} {y1} L{x + 6:.0f} {y1 - 14}" fill="none" stroke="{color}" stroke-width="2"/>')
    return out


STEPS = {}

# 1 Clean: bare wafer, particles lifting off
STEPS["clean"] = ("A bare silicon wafer being cleaned", (
    silicon()
    + "".join(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{MUTED}"/>' for x, y, r in [(110, 372, 6), (190, 318, 4), (290, 352, 5), (370, 290, 4), (440, 360, 6)])
    + "".join(f'<path d="M{x} {y + 30} L{x} {y + 6} M{x - 6} {y + 14} L{x} {y + 6} L{x + 6} {y + 14}" stroke="{MUTED}" stroke-width="1.5" fill="none"/>' for x, y in [(110, 332), (290, 312), (440, 320)])
    + label(450, "Silicon wafer")
    + label(300, "Dust and oils", MUTED, 470)
    + caption("Bare silicon, scrubbed clean")
))

# 2 Grow oxide
STEPS["grow-oxide"] = ("Silicon wafer with a grown oxide layer", (
    silicon() + oxide()
    + label(372, "Silicon dioxide") + label(450, "Silicon")
    + "".join(f'<path d="M{x} 250 q10 -16 0 -32 q-10 -16 0 -32" stroke="#c2410c" stroke-width="2" fill="none" opacity=".55"/>' for x in (140, 285, 430))
    + f'<text x="{X0}" y="160" {FONT} font-size="24" fill="{MUTED}">≈ 1000 °C, oxygen</text>'
    + caption("A glassy oxide grows on the surface")
))

# 3 Coat
STEPS["coat"] = ("Wafer coated with photoresist", (
    silicon() + oxide() + resist()
    + label(332, "Photoresist", UV) + label(372, "Oxide") + label(450, "Silicon")
    + f'<path d="M335 210 a120 34 0 1 1 -1 0" fill="none" stroke="{MUTED}" stroke-width="1.5" stroke-dasharray="5 7"/>'
    + f'<path d="M455 236 l14 -4 l-6 13" fill="none" stroke="{MUTED}" stroke-width="1.5"/>'
    + caption("Resist spun into an even film")
))

# 4 Expose
STEPS["expose"] = ("Light exposing a pattern into the resist", (
    silicon() + oxide() + resist("exposed")
    + f'<polygon points="{WIN0 - 50},150 {WIN1 + 50},150 {WIN1},{RS_TOP - 6} {WIN0},{RS_TOP - 6}" fill="{EXPOSED}" opacity=".35"/>'
    + arrows_down(WIN0 + 8, WIN1 - 8, 160, RS_TOP - 6, UV, 4)
    + f'<text x="{X0}" y="132" {FONT} font-size="24" fill="{UV}">Light, in the shape of the layer</text>'
    + label(332, "Exposed resist", UV) + label(372, "Oxide") + label(450, "Silicon")
    + caption("The pattern is written into the resist")
))

# 5 Develop
STEPS["develop"] = ("Developed resist with an opening", (
    silicon() + oxide() + resist("open")
    + label(332, "Resist stencil", UV) + label(372, "Oxide") + label(450, "Silicon")
    + f'<text x="{(WIN0 + WIN1) / 2}" y="296" {FONT} font-size="22" fill="{MUTED}" text-anchor="middle">opening</text>'
    + caption("Exposed resist washes away")
))

# 6 Inspect: measure the opening
STEPS["inspect"] = ("Measuring the opening in the resist", (
    silicon() + oxide() + resist("open")
    + f'<line x1="{WIN0}" y1="300" x2="{WIN1}" y2="300" stroke="{UV}" stroke-width="2"/>'
    + f'<line x1="{WIN0}" y1="288" x2="{WIN0}" y2="312" stroke="{UV}" stroke-width="2"/><line x1="{WIN1}" y1="288" x2="{WIN1}" y2="312" stroke="{UV}" stroke-width="2"/>'
    + f'<text x="{(WIN0 + WIN1) / 2}" y="282" {FONT} font-size="24" fill="{UV}" text-anchor="middle">width ✓</text>'
    + f'<circle cx="{(WIN0 + WIN1) / 2}" cy="190" r="46" fill="none" stroke="{MUTED}" stroke-width="2"/><line x1="{(WIN0 + WIN1) / 2 + 33}" y1="157" x2="{(WIN0 + WIN1) / 2 + 66}" y2="124" stroke="{MUTED}" stroke-width="3"/>'
    + label(332, "Resist", UV) + label(372, "Oxide") + label(450, "Silicon")
    + caption("Check the pattern before it is permanent")
))

# 7 Etch: oxide opened under the window
STEPS["etch"] = ("Oxide etched through the resist opening", (
    silicon() + oxide(window=True) + resist("open")
    + arrows_down(WIN0 + 10, WIN1 - 10, 230, OX_TOP - 4, MUTED, 3, dash=True)
    + f'<text x="{(WIN0 + WIN1) / 2}" y="214" {FONT} font-size="24" fill="{MUTED}" text-anchor="middle">etchant</text>'
    + label(332, "Resist", UV) + label(372, "Oxide, cut through") + label(450, "Silicon")
    + caption("The opening is carved into the oxide")
))

# 8 Strip
STEPS["strip"] = ("Patterned oxide after the resist is removed", (
    silicon() + oxide(window=True)
    + label(372, "Patterned oxide") + label(450, "Silicon")
    + caption("Resist gone; the pattern stays in the oxide")
))

# 9 Dope
STEPS["dope"] = ("Dopant driven into the silicon through the oxide window", (
    silicon(doped=True) + oxide(window=True)
    + "".join(f'<circle cx="{x}" cy="{y}" r="4" fill="{DOPED}"/>' for x in range(WIN0 + 14, WIN1, 26) for y in (296, 322))
    + arrows_down(WIN0 + 14, WIN1 - 14, 230, SI_TOP - 6, DOPED, 3)
    + label(372, "Oxide mask") + label(414, "Doped silicon", DOPED) + label(480, "Silicon")
    + caption("Dopant enters only through the window")
))

# 10 Metallize
STEPS["metallize"] = ("Metal deposited over the wafer, touching the doped region", (
    silicon(doped=True) + oxide(window=True)
    + f'<path d="M{X0} {OX_TOP - 18} L{WIN0 - 4} {OX_TOP - 18} L{WIN0 - 4} {SI_TOP - 2} L{WIN1 + 4} {SI_TOP - 2} L{WIN1 + 4} {OX_TOP - 18} L{X1} {OX_TOP - 18} L{X1} {OX_TOP} L{WIN1} {OX_TOP} L{WIN1} {SI_TOP - 18} L{WIN0} {SI_TOP - 18} L{WIN0} {OX_TOP} L{X0} {OX_TOP} Z" fill="{METAL}"/>'
    + "".join(f'<circle cx="{x}" cy="{y}" r="3.5" fill="{METAL}"/>' for x, y in [(160, 250), (240, 290), (330, 240), (420, 280), (500, 230), (560, 300)])
    + f'<text x="{X0}" y="200" {FONT} font-size="24" fill="{MUTED}">Metal atoms from the target</text>'
    + label(342, "Metal") + label(372, "Oxide") + label(414, "Doped silicon", DOPED) + label(480, "Silicon")
    + caption("A thin metal film coats everything")
))

# 11 Test: patterned contact, probe needle
STEPS["test"] = ("A probe needle touching the finished contact", (
    silicon(doped=True) + oxide(window=True)
    + rect(WIN0 - 30, OX_TOP - 18, WIN1 + 30, OX_TOP, METAL)
    + rect(WIN0, OX_TOP, WIN1, SI_TOP, METAL)
    + f'<path d="M{(WIN0 + WIN1) / 2 + 150} 140 L{(WIN0 + WIN1) / 2 + 4} {OX_TOP - 20} L{(WIN0 + WIN1) / 2 + 160} 150 Z" fill="{INK}"/>'
    + f'<text x="{(WIN0 + WIN1) / 2 + 170}" y="150" {FONT} font-size="24" fill="{MUTED}">Probe needle</text>'
    + label(372, "Metal contact") + label(414, "Doped silicon", DOPED) + label(480, "Silicon")
    + caption("Touch down and measure")
))


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, (title, body) in STEPS.items():
        with open(os.path.join(OUT, slug + ".svg"), "w") as f:
            f.write(svg(body, title))
    print(f"wrote {len(STEPS)} diagrams to {os.path.normpath(OUT)}")


if __name__ == "__main__":
    main()
