---
title: "Wafer Stage Alignment Firmware"
category: "Gen 1 Patterning"
step: "Stage Control"
weight: 30
status: "building"
summary: "Software that lines up each new layer with the last."

specs:
  - label: "Overlay target"
    value: "< 2 µm"
  - label: "Stage resolution"
    value: "0.5 µm/step"
  - label: "Alignment"
    value: "Camera + fiducial marks"

# photos:
#   - src: "/images/machines/wafer-stage-alignment-firmware-1.jpg"
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
  - name: "Fiducial finding"
    description: "A camera looks for small alignment crosses printed in an earlier layer and reports where they actually are, not where they were supposed to be."
  - name: "Coordinate transform"
    description: "Turns those measured mark positions into the shift, rotation, and scale needed to map the design onto the real wafer."
  - name: "Motion control loop"
    description: "Drives the stage motors to a target and holds it there. Backlash and thermal drift both show up here as overlay error."
  - name: "Exposure sequencing"
    description: "Steps the stage across the wafer, firing the exposure at each die and re-checking alignment along the way."
---

A chip is built from many patterned layers stacked on top of each
other. A transistor only works if its gate lands on its channel, and
its contacts land on both. That means each new layer has to line up
with the last to within a fraction of a feature size — **overlay**, in
fab language.

The hard part is that a wafer is never quite where you left it. It gets
placed slightly rotated, it expands a little when it's warm, and the
stage itself has play in it. So we don't assume anything: a camera
finds marks printed in an earlier layer, and this firmware works out
the correction from what it sees.

It's listed as a machine because on our line it does a machine's job.
It's the piece that turns a precise stage and a projector into an
actual stepper.
