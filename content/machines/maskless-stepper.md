---
title: "Maskless Lithography Stepper"
category: "Lithography"
step: "Exposure"
weight: 30
status: "building"
summary: "Projects a pattern directly into the photoresist from a digital file — no physical photomask, so a design change is a re-export rather than a new mask order."

specs:
  - label: "Wavelength"
    value: "405 nm (i-line adjacent)"
  - label: "Target feature size"
    value: "~2 µm"
  - label: "Write field"
    value: "Stitched, stage-stepped"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/maskless-stepper-1.jpg"
#     caption: ""
#   - src: "/images/machines/maskless-stepper-2.jpg"
#     caption: ""

subsystems:
  - name: "UV light engine"
    description: "A 405 nm LED source. LEDs replaced mercury arc lamps here — no warm-up, no lamp replacement, and the output can be modulated electronically to control dose."
  - name: "Spatial light modulator"
    description: "A DMD (micromirror array) acts as the mask. Each mirror tilts to send light either into the projection path or into a beam dump, so the 'mask' is just a bitmap in memory."
  - name: "Reduction optics"
    description: "Demagnifies the DMD image onto the wafer. Shrinking the projected image is what turns a coarse mirror pitch into micron-scale features on the substrate."
  - name: "XY stage"
    description: "Steps the wafer between exposure fields — this is the 'stepper' part. The DMD only covers a small area at once, so the full pattern is tiled out field by field."
  - name: "Z focus axis"
    description: "Depth of focus at this resolution is only a few microns, so the objective has to track the wafer surface as the stage moves under it."
  - name: "Alignment camera"
    description: "Images alignment marks left by previous layers. Multi-layer devices only work if each new pattern lands on top of the last one within a fraction of the smallest feature."
  - name: "Pattern slicer & control software"
    description: "Takes a layout file, splits it into per-field bitmaps, and sequences stage moves against DMD frames and light pulses."
---

This is the machine that makes a student-scale fab viable at all.

Conventional photolithography needs a chrome-on-quartz photomask for every
layer of every design. Masks cost hundreds to thousands of dollars and take
weeks to arrive — which means a design mistake is expensive, and iterating is
effectively impossible on a club budget and timeline.

Maskless lithography replaces the physical mask with a micromirror array. The
pattern lives in a file. Changing the design costs nothing, students can run
their own layouts, and the turnaround from "idea" to "exposed wafer" is a single
afternoon instead of a purchase order.

The trade is throughput: stepping and stitching fields is far slower than
flood-exposing a whole wafer through a mask at once. For research volumes, that
trade is obviously worth it.
