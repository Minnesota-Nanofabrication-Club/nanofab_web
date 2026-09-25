---
title: "Polymer Synthesis"
category: "Gen 2 Patterning"
step: "Resist Chemistry"
weight: 30
status: "planned"
summary: "Making our own photoresist."

specs:
  - label: "Resist type"
    value: "Novolac / DNQ, positive tone"
  - label: "Target thickness"
    value: "1 – 3 µm"
  - label: "Exposure"
    value: "365 – 405 nm"

# photos:
#   - src: "/images/machines/polymer-synthesis-1.jpg"
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
  - name: "Polymer resin"
    description: "The novolac backbone that gives the film its body and its resistance to etch chemistry."
  - name: "Photoactive compound"
    description: "The light-sensitive part. Exposure changes it from an inhibitor into an acid, and that’s what makes developer dissolve only the exposed areas."
  - name: "Solvent and filtration"
    description: "Sets viscosity, which sets coated thickness. Filtered down to sub-micron, because any speck left in the bottle prints as a defect."
  - name: "Characterization"
    description: "Contrast curves and dose-to-clear on test wafers. A resist we can’t characterize is a resist we can’t trust."
---

Photoresist is the single most consumed material in a fab, and for us
it's also one of the most awkward to buy: it's priced for industrial
volumes, it has a shelf life, and shipping it is a hassle.

Making it ourselves solves the supply problem, but the real payoff is
**control**. Sensitivity, contrast, and thickness all come out of the
formulation, so tuning the recipe is a way to tune the process — and
formulating resist is a genuinely interesting chemistry project in its
own right.

It's a Gen 2 item because Gen 1 needs to prove out the rest of the line
on a known-good commercial resist first. You can't debug a new process
and a new material at the same time.
