---
title: "Wafer Arm"
category: "Facility"
step: "Wafer Handling"
weight: 10
status: "planned"
summary: "A robot arm that moves wafers between tools."

specs:
  - label: "Wafer size"
    value: "2 – 4 in"
  - label: "Placement accuracy"
    value: "± 100 µm target"
  - label: "End effector"
    value: "Vacuum paddle"

# photos:
#   - src: "/images/machines/wafer-arm-1.jpg"
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
  - name: "Arm and drives"
    description: "The mechanics that reach into a tool and come back out on the same path every time. Repeatability matters far more than raw speed here."
  - name: "Vacuum end effector"
    description: "A flat paddle that holds the wafer by suction on its back side only. Nothing ever touches the face we’re building devices on."
  - name: "Wafer cassette"
    description: "A slotted holder that stages wafers between steps and keeps them from touching each other."
  - name: "Motion control"
    description: "The firmware that stores tool positions and drives the arm between them. Shares a codebase with the stage alignment firmware."
---

In a commercial fab, nobody picks up a wafer. Every move between tools
is done by a robot, because a human hand — even a gloved one — sheds
particles, and a particle sitting on a wafer becomes a defect in
whatever gets built on top of it.

Our version is much smaller, but the job is the same: **pick a wafer up
by its back side, carry it, and set it down in the same place every
time.**

It's shared infrastructure. Both generations of the line use it, which
is why it sits under Facility rather than inside Gen 1 or Gen 2.
