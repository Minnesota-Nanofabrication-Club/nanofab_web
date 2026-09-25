---
title: "Electron Microscope"
category: "Gen 2 Wafer Inspection & Metrology"
step: "Imaging"
weight: 20
status: "building"
summary: "Images features too small for a light microscope."

specs:
  - label: "Accelerating voltage"
    value: "1 – 30 kV"
  - label: "Resolution"
    value: "Nanometer scale"
  - label: "Chamber"
    value: "High vacuum"

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
# once you’ve put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/electron-microscope-1.jpg"
#     caption: ""
#   - src: "/images/machines/electron-microscope-2.jpg"
#     caption: ""

subsystems:
  - name: "Electron gun"
    description: "Emits the beam, usually from a heated tungsten filament. Accelerating voltage sets the electron wavelength — and wavelength is what ultimately caps resolution."
  - name: "Electromagnetic lenses"
    description: "Magnetic fields bend electron trajectories the way glass bends light. The condenser lens sets beam current, the objective focuses the beam to a point on the sample."
  - name: "Scan coils"
    description: "Deflect the beam in a raster across the surface. Magnification is just the ratio of the displayed image size to the scanned area — zooming in means scanning a smaller patch, not changing any optics."
  - name: "Vacuum system"
    description: "Electrons scatter off air molecules within millimeters at atmosphere, so the whole column and chamber have to be under high vacuum for the beam to reach the sample at all."
  - name: "Secondary electron detector"
    description: "Collects low-energy electrons knocked loose from the top few nanometers of the surface. Their yield depends on local surface angle, which is what gives SEM images their strong sense of topography."
  - name: "Sample stage"
    description: "Translates, rotates, and tilts the sample. Tilting is how you image a cleaved cross-section to measure etch depth or film thickness directly."
  - name: "Imaging electronics"
    description: "Synchronizes detector signal with beam position to assemble the image pixel by pixel."
---

An optical microscope cannot resolve features smaller than roughly half the
wavelength of visible light — about 200 nm, and practically worse. That's a
hard physical limit, and it sits right where our interesting features are.

Electrons have a far shorter effective wavelength, so an electron beam blows
past that limit entirely. In exchange, everything gets harder: the sample has
to sit in vacuum, non-conductive samples charge up and distort the image unless
they're coated, and the beam itself can damage delicate structures.

For us the SEM answers the questions that decide whether a process run worked.
Did the etch reach the right depth? Are the sidewalls vertical or sloped? Is
the deposited film continuous or is it beading up? Nothing else in the lab can
answer those.
