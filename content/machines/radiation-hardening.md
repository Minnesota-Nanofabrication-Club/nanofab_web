---

# ------------------------------------------------------------------
# PARKED. The Research area is commented out in data/categories.yaml,
# so this page is hidden from the site rather than deleted. To bring
# it back: uncomment the Research block there, then change the line
# below to `draft: false`.
# ------------------------------------------------------------------
draft: true
title: "Radiation Hardening"
category: "Research"
step: "Research Thrust"
weight: 10
status: "planned"
summary: "Building chips that keep working in orbit. Radiation flips bits and degrades transistors, and we want to find out which layout and process choices survive it."

specs:
  - label: "Failure modes"
    value: "SEU, TID, latch-up"
  - label: "Test approach"
    value: "Ring oscillators + SRAM cells"
  - label: "Depends on"
    value: "Full Gen 1 line"

# photos:
#   - src: "/images/machines/radiation-hardening-1.jpg"
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
  - name: "Test chip design"
    description: "Small circuits whose failure is easy to see and count — ring oscillators that slow down under dose, and SRAM cells that flip."
  - name: "Layout variants"
    description: "The same circuit drawn several ways. Guard rings, enclosed-gate transistors, and wider spacing all cost area; we want to know what each one buys."
  - name: "Dose exposure"
    description: "Getting real radiation onto the parts, through a campus source or a partner facility. Without a dose there’s no experiment."
  - name: "Before-and-after measurement"
    description: "Full electrical characterization on the probe station at each dose step, so drift can be tracked rather than guessed at."
---

Electronics in space get hit constantly by charged particles. A single
particle can flip a stored bit, and years of accumulated dose slowly
shifts transistor threshold voltages until a circuit stops working.
Commercial radiation-hardened parts exist, but they're expensive,
export-controlled, and generations behind mainstream silicon.

Most hardening happens at the **layout and process level**, not in the
circuit diagram — which is exactly the part a fab gets to control. That
makes it a research question a student fab can actually take a run at.

The plan is to fabricate the same simple test circuits several
different ways on our own line, expose them to a known dose, and
measure what changed. It's the reason the rest of the lab exists: every
tool on this page is there to make this experiment possible.
