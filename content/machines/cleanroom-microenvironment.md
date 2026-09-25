---
title: "Cleanroom Microenvironment"
category: "Facility"
step: "Contamination Control"
weight: 20
status: "building"
summary: "Clean-air boxes around each tool instead of a full cleanroom."

specs:
  - label: "Target class"
    value: "ISO 5 inside enclosures"
  - label: "Filtration"
    value: "HEPA fan-filter units"
  - label: "Airflow"
    value: "Vertical laminar"

# photos:
#   - src: "/images/machines/cleanroom-microenvironment-1.jpg"
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
  - name: "Fan-filter units"
    description: "HEPA filters with a fan on top, pushing a steady sheet of clean air down over the work area so particles get swept away from the wafer."
  - name: "Enclosures"
    description: "Sealed boxes around the tools that actually expose a wafer. Building several small ones costs a fraction of cleaning an entire room."
  - name: "Particle counting"
    description: "A meter inside each enclosure. Without a number, 'clean' is just a feeling, and we’d never notice a filter going bad."
  - name: "Humidity and static control"
    description: "Photoresist behaves differently at different humidity, and static pulls particles straight onto a wafer. Both get watched."
---

A real cleanroom costs millions and needs a purpose-built building. We
don't have one, and we don't need one — because a wafer doesn't care
how clean the *room* is. It only cares about the few cubic feet of air
directly above it.

So instead of cleaning the room, we clean **small boxes around the tools
that matter**, and move wafers between them in a covered carrier. This
is the same idea industry landed on years ago with SMIF pods and EFEMs,
scaled down to a student budget.

It's the difference between this lab being possible and not.
