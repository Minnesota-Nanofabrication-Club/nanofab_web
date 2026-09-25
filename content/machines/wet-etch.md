---

# ------------------------------------------------------------------
# PARKED. Hidden from the site rather than deleted. To bring it
# back: change the line below to `draft: false`. It already has a
# valid category, so it will slot straight into Gen 1 Patterning.
# ------------------------------------------------------------------
draft: true
title: "Wet Etch"
category: "Gen 1 Patterning"
step: "Wet Etch"
weight: 40
status: "building"
summary: "A chemical bath that dissolves away everything the photoresist isn’t covering. Simple, cheap, and the fastest way to get a real pattern into a wafer."

specs:
  - label: "Chemistries"
    value: "BOE, KOH, aluminum etch"
  - label: "Bath control"
    value: "± 1 °C"
  - label: "Typical rate"
    value: "60 – 100 nm/min (oxide)"

# photos:
#   - src: "/images/machines/wet-etch-1.jpg"
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
  - name: "Etch bath and heater"
    description: "Etch rate roughly doubles every 10 °C, so a bath that drifts is a bath that over-etches. Temperature control is the whole game."
  - name: "Chemical handling"
    description: "Buffered oxide etch contains hydrofluoric acid. Dedicated plasticware, a splash shield, and a trained second person present are non-negotiable."
  - name: "Rinse and dry"
    description: "A cascade rinse stops the reaction fast and washes chemistry off before it dries into residue and ruins the surface."
  - name: "Timing and endpoint"
    description: "Wet etching is timed, not sensed. We calibrate rate on a test wafer first, then run the real one."
---

Wet etching is the oldest trick in the fab, and still the right first
one. Drop a patterned wafer into the right chemistry and the exposed
material dissolves while the photoresist protects everything else.

Its limitation is that the etch spreads **sideways as fast as it goes
down**, so it undercuts the resist and rounds off small features. That
puts a floor on how fine a pattern it can transfer — which is exactly
why Gen 2 moves to the reactive ion etcher instead.

For Gen 1, though, it's the honest choice: no vacuum, no plasma, no RF
supply, and it works today.
