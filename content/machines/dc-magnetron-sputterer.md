---
title: "DC Magnetron Sputterer"
category: "Thin-Film Deposition"
step: "Metallization"
weight: 10
status: "building"
summary: "Knocks atoms off a solid metal target with an argon plasma and lets them condense on the wafer, building up a thin film atom by atom."

specs:
  - label: "Base pressure"
    value: "< 1 × 10⁻⁵ Torr"
  - label: "Process pressure"
    value: "2 – 10 mTorr argon"
  - label: "Targets"
    value: "Al, Ti, Cu, Cr"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/dc-magnetron-sputterer-1.jpg"
#     caption: ""
#   - src: "/images/machines/dc-magnetron-sputterer-2.jpg"
#     caption: ""

subsystems:
  - name: "Vacuum chamber"
    description: "Has to reach high vacuum before deposition starts. Residual water vapor and oxygen get incorporated into the growing film and wreck its conductivity and adhesion."
  - name: "Pump stack"
    description: "Rotary pump for roughing, turbo pump for high vacuum. Base pressure is the single best predictor of film quality on this tool."
  - name: "Magnetron cathode & target"
    description: "Permanent magnets trap electrons in a loop just above the target surface. That confinement raises ionization efficiency dramatically — it's why a magnetron sputters fast at low pressure while a plain diode barely sputters at all."
  - name: "DC power supply"
    description: "Holds the target at a few hundred volts negative. Argon ions accelerate into it and eject target atoms by momentum transfer — this is a physical process, not a chemical one."
  - name: "Argon delivery & throttle"
    description: "Argon is inert and heavy, which makes it an efficient sputtering projectile that won't react with the film. Pressure sets how many collisions an ejected atom makes before it lands."
  - name: "Substrate stage & shutter"
    description: "The shutter stays closed during an initial pre-sputter that cleans oxide and contamination off the target, so the first material reaching the wafer is the material we want."
  - name: "Quartz crystal monitor"
    description: "A crystal oscillator in the deposition path shifts frequency as mass lands on it, giving real-time thickness readout in angstroms."
  - name: "Water cooling"
    description: "Most of the power going into the target becomes heat. Uncooled, targets crack or de-bond from the backing plate."
---

Sputtering is how the wires get made.

After lithography and etching define where structures go, the device still
needs conductors — metal contacts to the doped regions, and interconnects
tying components together. Sputtering deposits those layers.

The mechanism is purely mechanical. Argon ions accelerated into a metal target
transfer enough momentum to eject surface atoms, which travel across the
chamber and stick to whatever they hit, including the wafer. Because it doesn't
rely on the material being vaporizable at a reasonable temperature, sputtering
works for refractory metals and alloys that thermal evaporation can't handle —
and it holds alloy composition, which evaporation generally doesn't.

Film adhesion and stress are the things that go wrong. Both trace back to how
clean the chamber was before the plasma struck.
