---
title: "Computer Vision Metrology"
category: "Gen 1 Wafer Inspection & Metrology"
step: "Optical Inspection"
weight: 10
status: "building"
summary: "A microscope camera that measures features and flags defects."

specs:
  - label: "Optical resolution"
    value: "~ 0.5 µm"
  - label: "Throughput"
    value: "Full wafer map, unattended"
  - label: "Stack"
    value: "Python + OpenCV"

# photos:
#   - src: "/images/machines/computer-vision-metrology-1.jpg"
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
  - name: "Microscope and camera"
    description: "Calibrated optics on a motorized stage. Every measurement traces back to a known pixels-per-micron figure, so calibration comes first."
  - name: "Feature measurement"
    description: "Finds edges and reports linewidth, spacing, and overlay error at each site — the numbers that say whether lithography is in spec."
  - name: "Defect detection"
    description: "Compares each die against its neighbours. Anything present in one and absent in the others gets flagged as a defect."
  - name: "Wafer maps"
    description: "Plots the results by position. Where a problem sits on the wafer usually says more about its cause than the raw number does."
---

Inspection is the least glamorous part of a fab and the part that
actually tells you whether anything worked. Measure a hundred sites by
hand and you'll get tired, inconsistent numbers — or, more likely, you
won't measure a hundred sites at all.

So we automate it. The stage steps across the wafer, the camera shoots
each die, and software does the measuring. **Consistency is the
feature:** the same code applied to every site means run-to-run
comparisons actually mean something.

It's also the fastest feedback loop in the lab. A wafer map from this
tool tells us within minutes whether a process change helped.
