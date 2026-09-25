---
title: "Dopant Synthesis"
category: "Gen 2 Doping"
step: "Dopant Chemistry"
weight: 10
status: "planned"
summary: "Making our own spin-on dopants."

specs:
  - label: "Dopants"
    value: "Boron (p), phosphorus (n)"
  - label: "Carrier"
    value: "Spin-on glass, sol-gel"
  - label: "Target range"
    value: "1e18 – 1e20 cm⁻³"

# photos:
#   - src: "/images/machines/dopant-synthesis-1.jpg"
#     caption: ""

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

subsystems:
  - name: "Sol-gel chemistry"
    description: "A silica precursor carrying boron or phosphorus. It spins on as a liquid and bakes down into a solid glass film holding the dopant."
  - name: "Concentration control"
    description: "How much dopant goes into the mix sets how much ends up in the silicon. This is the knob that commercial products don’t give us."
  - name: "Film uniformity"
    description: "Streaks in the coated layer become streaks in the doping, which become device-to-device variation across the wafer."
  - name: "Drive-in calibration"
    description: "Four-point-probe sheet resistance after each furnace run, building the recipe table that connects mix, time, and temperature to a real result."
---

Gen 1 dopes wafers with commercial spin-on dopant: reliable, and it
comes at whatever concentration the vendor sells. Gen 2 makes its own.

The point isn't cost. It's that **doping concentration is a design
parameter**, and a device that needs a specific junction profile needs
a dopant source tuned to it. Off-the-shelf products give you a handful
of fixed options; a sol-gel we mix ourselves gives us a dial.

That matters directly for the radiation work — hardness against total
dose depends on how the junctions are doped.
