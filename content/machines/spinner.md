---
title: "Spinner"
category: "Gen 1 Patterning"
step: "Resist Coat"
weight: 20
status: "building"
summary: "Spins the wafer at thousands of RPM to flatten a puddle of photoresist into an even film a few microns thick."

# specs:
#   - label: "Speed range"
#     value: "300 – 6000 RPM"
#   - label: "Film thickness"
#     value: "~1 – 10 µm"
#   - label: "Substrate size"
#     value: "Up to 4 in wafers"

# DESIGN DIAGRAMS, shown at the top of "Design architecture".
# Add as many as you like — copy a "- src:" pair for each one.
architectureDiagrams:
  - src: "/images/machines/spinner-circuit-diagram.jpg"
    caption: "Motor control: an ESP32 drives the brushless spindle through a 35 A ESC, with a rotary encoder and LCD for setting the spin recipe."
  - src: "/images/machines/spinner-layout.jpg"
    caption: "Physical layout: chuck and motor under a hinged lid, with the display, encoder, and switch on the front panel and the electronics inside the housing."

# DOCUMENTATION — the write-up section on the page.
#
# Everything indented under the "|" is one block of markdown. Keep it
# all indented two spaces. Headings (##), numbered and bulleted lists,
# **bold**, `code`, ```code blocks```, tables, and > callouts all work.
#
# Delete this starter text and write the real thing.
# documentationUpdated: "September 2026"
# documentation: |
#   > **This is a starter template.** Replace it with the real procedure
#   > once the spinner is running. Don't leave guessed steps here —
#   > somebody will follow them.

#   ## What to write in here

#   - **Setup** — what to check before switching on.
#   - **Running it** — the actual steps, numbered.
#   - **Recipes** — the spin programs that work, with the numbers.
#   - **Cleaning up** — what to do after, and where things live.
#   - **When it goes wrong** — symptoms and what they usually mean.

#   ## Formatting you can use

#   Numbered steps, for anything order-dependent:

#   1. First step.
#   2. Second step.
#   3. Third step.

#   A table, for recipes and measured values:

#   | Resist | Spin speed | Time | Thickness |
#   |---|---|---|---|
#   | — | — | — | — |

#   Inline values like `3000 RPM` in backticks, and fenced blocks for
#   anything copied verbatim:

#   ```
#   ramp  500 rpm/s
#   hold  3000 rpm  30 s
#   ```

#   And a callout for anything that can hurt someone or break the tool:

#   > Never open the lid while the chuck is spinning.

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you’ve put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/spinner-1.jpg"
#     caption: ""
#   - src: "/images/machines/spinner-2.jpg"
#     caption: ""

# subsystems:
#   - name: "Vacuum chuck & spindle"
#     description: "Holds the wafer flat and centered by suction. Any wobble here shows up directly as a thickness variation across the film."
#   - name: "Brushless motor & driver"
#     description: "Closed-loop speed control matters more than top speed — final film thickness scales roughly with the inverse square root of RPM, so a few percent of speed error is a few percent of thickness error."
#   - name: "Recipe controller"
#     description: "A spin program is a sequence of ramps and holds: a slow spread step to get the puddle across the wafer, then a fast thinning step that sets the final thickness."
#   - name: "Bowl & splash guard"
#     description: "Catches the ~95% of dispensed resist that gets thrown off the wafer, and keeps it from recirculating back onto the surface as dried flakes."
#   - name: "Vacuum pump"
#     description: "Supplies chuck suction. Loss of vacuum mid-spin sends the wafer into the bowl wall, so there’s an interlock on the line pressure."
---

Almost all of lithography's uniformity budget is spent here. The spin coater
turns a dispensed blob of liquid polymer into a flat, repeatable film — and
everything downstream, from exposure dose to etch depth, assumes that film is
the thickness the recipe says it is.

The physics is a balance between centrifugal thinning and solvent evaporation.
Resist flows outward under rotation and simultaneously gets more viscous as its
solvent leaves, until it becomes too stiff to flow and the thickness locks in.
That's why spin speed, ramp rate, and ambient humidity all end up in the
process notes.
