---
title: "Spin-On Doping"
category: "Thermal Processing & Doping"
step: "Dopant Source"
weight: 20
status: "building"
summary: "Applies a liquid dopant film by spin coating, then uses the furnace to drive those atoms into the silicon — ion implantation's low-cost cousin."

specs:
  - label: "Dopants"
    value: "Boron (p-type), phosphorus (n-type)"
  - label: "Bake"
    value: "200 °C to densify"
  - label: "Drive-in"
    value: "900 – 1000 °C in N₂"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/spin-on-doping-1.jpg"
#     caption: ""
#   - src: "/images/machines/spin-on-doping-2.jpg"
#     caption: ""

subsystems:
  - name: "Dopant source solution"
    description: "A spin-on glass carrying boron or phosphorus. Which one you pick determines whether the doped region conducts by holes or by electrons — that choice is what makes a junction possible."
  - name: "Spin coater"
    description: "The same tool used for photoresist, with dedicated glassware. Coating uniformity maps directly onto doping uniformity across the wafer."
  - name: "Densification bake"
    description: "A low-temperature bake drives off solvent and leaves a solid doped-glass film in contact with the silicon."
  - name: "Drive-in furnace"
    description: "The high-temperature step where dopant actually diffuses into the wafer. Junction depth goes as the square root of time — so doubling the depth costs four times the furnace time."
  - name: "Oxide strip"
    description: "The spent dopant glass is etched off in dilute HF afterward, leaving a clean doped silicon surface."
  - name: "Masking oxide"
    description: "Patterned SiO₂ from the furnace blocks diffusion where we don't want it, so doping lands only inside the windows we opened."
---

Doping is how silicon stops being an inert crystal and starts being an
electronic device. Adding a few parts per million of boron or phosphorus
changes its conductivity by orders of magnitude, and putting p-type material
next to n-type material creates a junction — the building block under every
diode and transistor.

Industry does this with ion implantation: accelerate dopant ions to tens of
keV and fire them into the wafer. It's precise, it's controllable, and the
machine costs several million dollars.

Spin-on doping gets to the same place chemically rather than ballistically.
Coat a dopant-bearing glass on the surface, heat it, let diffusion carry the
atoms in. Less control over the exact profile, but it uses equipment we already
have and it's entirely achievable at our scale.
