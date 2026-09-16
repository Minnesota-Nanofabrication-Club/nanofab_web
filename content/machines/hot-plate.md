---
title: "Hot Plate"
category: "Lithography"
step: "Soft & Hard Bake"
weight: 20
status: "building"
summary: "Holds the wafer at a precise temperature to drive solvent out of the photoresist before exposure and to harden it afterward."

specs:
  - label: "Temperature range"
    value: "50 – 250 °C"
  - label: "Stability"
    value: "±1 °C at setpoint"
  - label: "Typical soft bake"
    value: "95 °C, 60 s"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/hot-plate-1.jpg"
#     caption: ""
#   - src: "/images/machines/hot-plate-2.jpg"
#     caption: ""

subsystems:
  - name: "Heater & substrate plate"
    description: "A cast or machined aluminum plate over a resistive element. Aluminum is used for its thermal conductivity — the goal is no hot or cold spots across the wafer."
  - name: "PID controller & RTD"
    description: "A platinum RTD reads plate temperature and the PID loop holds it. Overshoot on the way up to setpoint is a real problem: it can over-bake the resist before the bake has officially started."
  - name: "Solid-state relay"
    description: "Switches mains power to the heater. No mechanical contacts, so it can cycle fast enough for tight temperature control without wearing out."
  - name: "Proximity pins"
    description: "Optional pins that float the wafer a fraction of a millimeter above the plate, so it heats by conduction through a thin air gap instead of touching — this avoids backside contamination and trapped particles."
  - name: "Fume extraction"
    description: "Baking resist releases solvent vapor. It gets pulled away rather than allowed to condense back onto the wafer or fill the room."
---

Two different bakes, same machine.

The **soft bake** comes right after spin coating. Fresh resist is still
something like 20–30% solvent, and that solvent has to leave before exposure —
otherwise the film is soft, sticks to anything it touches, and exposes
unpredictably. Bake too little and the pattern develops poorly; bake too much
and you start thermally decomposing the light-sensitive component, which kills
sensitivity.

The **hard bake** comes after development. Now the pattern exists and the job
is to toughen it up so it survives etching — cross-linking the polymer and
improving its adhesion to the wafer.
