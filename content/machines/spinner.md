---
title: "Spin Coater"
category: "Lithography"
step: "Resist Coat"
weight: 10
status: "building"
summary: "Spins the wafer at thousands of RPM to fling a puddle of photoresist into a film a few microns thick and uniform across the whole surface."

specs:
  - label: "Speed range"
    value: "300 – 6000 RPM"
  - label: "Film thickness"
    value: "~1 – 10 µm"
  - label: "Substrate size"
    value: "Up to 4 in wafers"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/spinner-1.jpg"
#     caption: ""
#   - src: "/images/machines/spinner-2.jpg"
#     caption: ""

subsystems:
  - name: "Vacuum chuck & spindle"
    description: "Holds the wafer flat and centered by suction. Any wobble here shows up directly as a thickness variation across the film."
  - name: "Brushless motor & driver"
    description: "Closed-loop speed control matters more than top speed — final film thickness scales roughly with the inverse square root of RPM, so a few percent of speed error is a few percent of thickness error."
  - name: "Recipe controller"
    description: "A spin program is a sequence of ramps and holds: a slow spread step to get the puddle across the wafer, then a fast thinning step that sets the final thickness."
  - name: "Bowl & splash guard"
    description: "Catches the ~95% of dispensed resist that gets thrown off the wafer, and keeps it from recirculating back onto the surface as dried flakes."
  - name: "Vacuum pump"
    description: "Supplies chuck suction. Loss of vacuum mid-spin sends the wafer into the bowl wall, so there's an interlock on the line pressure."
---

Almost all of lithography's uniformity budget is spent here. The spin coater
turns a dispensed blob of liquid polymer into a flat, repeatable film — and
everything downstream, from exposure dose to etch depth, assumes that film is
the thickness the recipe says it is.

The physics is a balance between centrifugal thinning and solvent evaporation.
Resist flows outward under rotation and simultaneously gets more viscous as its
solvent leaves, until it becomes too stiff to flow and the thickness locks in.
That's why spin speed, ramp rate, and ambient humidity all end up in the
process notes.
