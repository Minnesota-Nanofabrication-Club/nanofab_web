---
title: "Microplotter"
category: "Thin-Film Deposition"
step: "Direct-Write Deposition"
weight: 20
status: "building"
summary: "Writes material directly onto a substrate by dispensing picoliter droplets from a micropipette along a programmed path — no mask, no resist, no etch."

specs:
  - label: "Feature width"
    value: "~5 – 50 µm"
  - label: "Droplet volume"
    value: "Picoliter scale"
  - label: "Inks"
    value: "Silver nanoparticle, polymers"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/microplotter-1.jpg"
#     caption: ""
#   - src: "/images/machines/microplotter-2.jpg"
#     caption: ""

subsystems:
  - name: "Micropipette dispense head"
    description: "A pulled glass capillary. The tip opening sets the minimum feature width, the same way a pen nib sets line weight."
  - name: "Ultrasonic actuator"
    description: "Vibrates the pipette to break surface tension and release a controlled droplet. This is what lets it dispense viscous inks that would simply not flow out on their own."
  - name: "XYZ precision stage"
    description: "Moves the substrate under the tip along the toolpath. Positioning repeatability is what determines whether a written line is straight."
  - name: "Ink reservoir & fluidics"
    description: "Feeds ink to the pipette under low pressure. Bubbles in the line are the most common failure mode — they interrupt the write mid-line."
  - name: "Vision system"
    description: "A camera for setting the tip-to-substrate gap and aligning writes to existing features on the wafer."
  - name: "Toolpath software"
    description: "Converts a geometry file into stage motion and dispense timing, including how much adjacent lines overlap to form a solid fill."
---

The microplotter takes the opposite approach to everything else in the fab.

Conventional processing is *subtractive and parallel*: coat the whole wafer,
pattern the whole wafer, etch the whole wafer, remove what you don't want.
Enormous throughput, but every step needs resist, chemistry, and a mask.

Direct-write is *additive and serial*: put material only where it belongs,
one line at a time. Far slower, but there's no mask, no resist, and no etch
chemistry involved at all — and a design change is a new toolpath file.

That makes it the right tool for prototyping conductive traces, repairing a
broken interconnect on an otherwise good wafer, and depositing materials that
don't survive standard lithography chemistry.
