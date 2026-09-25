---
title: "Probe Station"
category: "Gen 1 Wafer Inspection & Metrology"
step: "Electrical Test"
weight: 20
status: "building"
summary: "Lands needle-fine tips on micron-scale pads so we can measure finished devices while they’re still on the wafer."

specs:
  - label: "Probe tips"
    value: "~10 µm radius tungsten"
  - label: "Measurement"
    value: "I–V, C–V sweeps"
  - label: "Chuck"
    value: "Vacuum hold-down"

# DOCUMENTATION — the write-up section on this machine's page.
#
# Delete the leading "#" from the lines below and write in markdown.
# The "|" means "keep everything below as one block of text", so
# EVERY line inside has to stay indented two spaces further than
# "documentation:". That indentation is the only fiddly part.
#
# Headings (##), numbered and bulleted lists, **bold**, `code`,
# fenced code blocks, tables, and > callouts all render.
# See README section 4.16.
#
# documentationUpdated: "Month Year"
# documentation: |
#   ## Setup
#   What to check before switching on.
#
#   ## Running it
#   1. First step.
#   2. Second step.
#
#   ## Cleaning up
#   What to do afterwards, and where things live.
#
#   ## When it goes wrong
#   Symptoms and what they usually mean.
#
#   > A callout, for anything that can hurt someone or break the tool.

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you’ve put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/probe-station-1.jpg"
#     caption: ""
#   - src: "/images/machines/probe-station-2.jpg"
#     caption: ""

subsystems:
  - name: "Micropositioners"
    description: "Three-axis manipulators that place each probe tip. Resolution has to beat the pad size — landing a needle on a 50 µm pad by hand is not something you do without micrometer drives."
  - name: "Probe tips"
    description: "Sharpened tungsten needles. Too blunt and they don’t break through native oxide to make contact; too sharp and they punch straight through the metal pad."
  - name: "Wafer chuck"
    description: "Holds the wafer flat by vacuum and usually serves as the electrical backside contact for the substrate."
  - name: "Stereo microscope & camera"
    description: "You cannot land probes you cannot see. The optics are what turn this from a delicate operation into a routine one."
  - name: "Source-measure unit"
    description: "Sources voltage while measuring current (or the reverse) to sweep out device characteristics — the diode curve or transistor family of curves that says whether the device works."
  - name: "Shielded enclosure"
    description: "A grounded dark box. It blocks mains hum that would swamp picoamp-level measurements, and blocks light, since semiconductor junctions are photosensitive and will read differently under room lighting."
  - name: "Vibration isolation"
    description: "Keeps building vibration from walking the probe tips across the pads and scratching them once contact is made."
---

This is the last station in the line and the one that closes the loop.

Everything upstream is an act of faith: the oxide is probably the right
thickness, the junction is probably at the right depth, the contacts probably
adhered. The probe station is where that gets settled. Put a voltage across a
finished device, measure the current, and compare the curve to what theory
says it should be.

When a device doesn't behave, the shape of the failure usually points back at
a specific process step — a leaky junction implicates the doping or a
contaminated furnace, an open circuit implicates metallization or etch. Probing
is how a process gets debugged rather than guessed at.
