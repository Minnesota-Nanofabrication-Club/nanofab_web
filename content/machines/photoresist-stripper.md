---

# ------------------------------------------------------------------
# PARKED. This machine isn't in the current Gen 1 / Gen 2 org chart,
# so it's hidden from the site rather than deleted. To bring it back:
# change the line below to `draft: false`. It already has a valid
# category, so it will slot straight into Gen 1 Patterning.
# ------------------------------------------------------------------
draft: true
title: "Photoresist Stripper"
category: "Gen 1 Patterning"
step: "Resist Strip"
weight: 70
status: "building"
summary: "Removes the resist mask once it has done its job, clearing the surface for the next layer without disturbing the structures underneath."

specs:
  - label: "Wet strip"
    value: "Heated solvent bath"
  - label: "Dry strip"
    value: "O₂ plasma ash"
  - label: "Finish"
    value: "DI rinse, N₂ dry"

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
#   - src: "/images/machines/photoresist-stripper-1.jpg"
#     caption: ""
#   - src: "/images/machines/photoresist-stripper-2.jpg"
#     caption: ""

subsystems:
  - name: "Heated solvent bath"
    description: "Warm solvent swells and lifts off resist that hasn't been hardened. This is the fast, cheap path when it works."
  - name: "Oxygen plasma asher"
    description: "Burns the resist off as CO₂ and water vapor. Needed after a long etch, where ion bombardment has cross-linked the top of the resist into a crust that solvents won't touch."
  - name: "Fume extraction"
    description: "Strip solvents are volatile and not things to breathe. The bath vents to extraction, not to the room."
  - name: "Rinse & dry"
    description: "A final DI rinse and nitrogen dry ensures no stripper residue is carried into the next process step."
---

Stripping sounds trivial and frequently isn't. Resist that has spent twenty
minutes in an RIE plasma is chemically nothing like the resist that went in —
the surface has been hardened into a cross-linked skin that shrugs off the
solvents that would normally dissolve it.

So the station supports both approaches. Wet stripping first, because it's
gentler and faster. Plasma ashing as the fallback, because oxygen plasma will
remove any organic film regardless of what's been done to it.

The constraint on both is selectivity: whatever removes the resist has to leave
the patterned metal, oxide, or silicon underneath completely alone.
