---

# ------------------------------------------------------------------
# PARKED. This machine isn't in the current Gen 1 / Gen 2 org chart,
# so it's hidden from the site rather than deleted. To bring it back:
# change the line below to `draft: false`. It already has a valid
# category, so it will slot straight into Gen 1 Patterning.
# ------------------------------------------------------------------
draft: false
title: "Hot Plate"
category: "Gen 1 Patterning"
step: "Soft & Hard Bake"
weight: 60
status: "building"
summary: "Bakes photoresist before and after exposure."

specs:
  - label: "Temperature range"
    value: "50 – 250 °C"
  - label: "Stability"
    value: "±1 °C at setpoint"
  - label: "Typical soft bake"
    value: "95 °C, 60 s"

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
