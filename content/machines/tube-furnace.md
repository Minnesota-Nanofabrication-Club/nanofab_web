---
title: "Tube Furnace"
category: "Thermal Processing & Doping"
step: "Oxidation & Anneal"
weight: 10
status: "building"
summary: "Heats wafers to ~1000 °C in a controlled gas atmosphere to grow silicon dioxide, drive in dopants, and anneal out process damage."

specs:
  - label: "Max temperature"
    value: "~1100 °C"
  - label: "Tube diameter"
    value: "2 in quartz"
  - label: "Ambients"
    value: "Dry O₂, wet O₂, N₂"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/tube-furnace-1.jpg"
#     caption: ""
#   - src: "/images/machines/tube-furnace-2.jpg"
#     caption: ""

subsystems:
  - name: "Quartz process tube"
    description: "Fused quartz is used because it stays dimensionally stable at 1000 °C and doesn't contaminate silicon. Metals would — trace metal diffusing into the wafer destroys carrier lifetime."
  - name: "Resistive heating elements"
    description: "Wound around the tube in zones. Multiple zones exist to create a flat temperature plateau in the middle of the furnace rather than a single peak."
  - name: "PID controller & thermocouples"
    description: "Type-K or type-R thermocouples feed a PID loop per zone. Oxide growth rate depends exponentially on temperature, so a 10 °C error is a large thickness error."
  - name: "Gas delivery"
    description: "Selects the ambient. Dry O₂ grows thin, dense, high-quality oxide slowly; steam (wet O₂) grows thick oxide much faster but less densely; N₂ gives an inert anneal with no growth."
  - name: "Wafer boat & push rod"
    description: "A quartz boat carries wafers into the hot zone. It's pushed in and pulled out slowly — thermal shock will crack a silicon wafer outright."
  - name: "Insulation & shell"
    description: "Ceramic fiber insulation keeps the outside touchable and, more importantly, keeps the hot zone thermally uniform."
  - name: "Exhaust"
    description: "Vents process gases and any dopant byproducts safely out of the lab."
---

The tube furnace is the most fundamental machine in the fab, and it does three
different jobs.

**Thermal oxidation** grows silicon dioxide by consuming the wafer's own
silicon at high temperature in an oxygen ambient. This is the step that makes
silicon special as a semiconductor material — the native oxide it grows is an
excellent insulator, bonds perfectly to the substrate, and can be patterned
and etched. No other common semiconductor has an equivalent.

**Dopant drive-in** follows spin-on doping. Dopant atoms sitting on the surface
diffuse into the silicon, and time-at-temperature sets how deep the junction
goes.

**Annealing** repairs crystal damage from earlier processing and activates
dopant atoms by moving them onto proper lattice sites, where they can actually
contribute carriers.
