---
title: "RF Magnetron Sputterer"
category: "Gen 2 Thin Film Deposition"
step: "Insulating Films"
weight: 10
status: "planned"
summary: "Deposits insulating films the DC sputterer can’t."

specs:
  - label: "RF frequency"
    value: "13.56 MHz"
  - label: "Targets"
    value: "SiO₂, Si₃N₄, Al₂O₃"
  - label: "Base pressure"
    value: "< 5 × 10⁻⁶ Torr"

# photos:
#   - src: "/images/machines/rf-magnetron-sputterer-1.jpg"
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
  - name: "RF power supply"
    description: "Drives the target at 13.56 MHz. The alternating field keeps charge from piling up on an insulating target, which is exactly what stalls a DC system."
  - name: "Matching network"
    description: "Tunes the supply to the plasma so power actually reaches the target instead of reflecting back and cooking the amplifier."
  - name: "Vacuum system"
    description: "Same requirement as the DC tool, and just as unforgiving: leftover water vapor ends up inside the film."
  - name: "Substrate stage"
    description: "Rotation for uniformity, plus heating — deposition temperature strongly affects how dense and how stable the film turns out."
---

The DC sputterer handles metals. Point it at an insulator and it stops
working: charge builds up on the target face, the plasma chokes, and
deposition dies within seconds.

RF power fixes this by **reversing the field millions of times a
second**, so accumulated charge gets neutralized on every cycle before
it can shut the process down.

That one change opens up the whole insulating half of the materials
list — gate oxides, passivation layers, and the dielectric between
metal levels. Gen 1 can build a device with metal and thermal oxide;
Gen 2 needs this tool to build a good one.
