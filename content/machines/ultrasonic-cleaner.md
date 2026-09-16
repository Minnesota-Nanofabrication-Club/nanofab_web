---
# --------------------------------------------------------------------
# One file = one machine = one page on the site.
# To add a machine: copy this file, rename it (lowercase, hyphens, .md),
# and edit the fields below.
#
#   category  must exactly match a "name" in data/categories.yaml
#   weight    orders the machine within its category (low = first)
#   status    one of: operational | building | planned
# --------------------------------------------------------------------
title: "Ultrasonic Cleaner"
category: "Wafer Preparation & Cleaning"
step: "Substrate Clean"
weight: 10
status: "building"
summary: "Drives high-frequency sound waves through a solvent bath to lift particles and organic residue off the wafer surface."

specs:
  - label: "Frequency"
    value: "40 kHz"
  - label: "Solvents"
    value: "Acetone, IPA, DI water"
  - label: "Bath heating"
    value: "Ambient – 60 °C"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/ultrasonic-cleaner-1.jpg"
#     caption: ""
#   - src: "/images/machines/ultrasonic-cleaner-2.jpg"
#     caption: ""

subsystems:
  - name: "Ultrasonic transducers"
    description: "Piezoelectric elements bonded to the underside of the tank. They convert the generator's electrical drive into pressure waves in the liquid."
  - name: "RF generator"
    description: "Drives the transducers at their resonant frequency. Cavitation — microscopic bubbles collapsing against the wafer — is what actually does the cleaning."
  - name: "Stainless tank & bath heater"
    description: "Holds the coupling fluid (usually DI water) and warms it. Warmer baths cavitate more aggressively, so temperature is a real process knob."
  - name: "Beaker holders"
    description: "Solvents sit in glass beakers suspended in the bath rather than in the tank itself, so we can run acetone and IPA without attacking the stainless."
  - name: "Timer & cycle control"
    description: "Clean time is part of the recipe. Too short leaves residue; too long can damage fine features already on the wafer."
---

Cleaning is the least glamorous step in the fab and the one that causes the
most failures when it's skipped. A single particle sitting on the wafer during
lithography prints as a defect in every layer built on top of it.

We run a standard solvent sequence — acetone to dissolve organics, isopropyl
alcohol to rinse off the acetone, deionized water to rinse off the IPA, then a
nitrogen blow-dry — with ultrasonic agitation at each stage. The wafer never
gets a chance to air-dry between steps, because drying is when dissolved
contaminants get left behind as spots.
