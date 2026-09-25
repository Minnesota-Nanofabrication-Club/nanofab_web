---
title: "Reactive Ion Etcher"
category: "Gen 2 Patterning"
step: "Dry Etch"
weight: 10
status: "building"
summary: "Etches straight down with a reactive plasma."

specs:
  - label: "Process pressure"
    value: "10 – 200 mTorr"
  - label: "RF power"
    value: "13.56 MHz, up to 300 W"
  - label: "Process gases"
    value: "CF₄, O₂, Ar"

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
documentationUpdated: "Sept, 2026"
documentation: |
  ## Project Overview

  This section describes the plan and schedule for building a reactive ion etching (RIE) system.

  ## Timeline

  ### Pre-Semester: System Planning and Supplier Outreach
  - **Timeline**: Week 1
  - **Milestone**: Get approved for the main funding and settle the general concept for the system.

  ### Stage 1:: Component, CAD, and Prototype Verification
  - **Timeline**: Weeks 2 – 4
  - **Milestone**: Make a 3D model of the etcher system and have the main equipment in hand.

  ### Stage 2:: System Assembly
  - **Mechanical Assembly**: Weeks 4 – 7
  - **Tubing and Gas Dynamics**: Weeks 7 – 8
  - **Milestone**: Set up the vacuum, gas flow, and electrical systems. *(Week 8)*

  ### Stage 3:: Initial Testing and Calibration
  - **Subsystem Bring-Up**: Week 9
  - **System Integration**: Week 9
  - **Calibration and Dry-Run Validation**: Week 10
  - **Milestone**: Get the system working without the toxic gases, and calibrate the measuring and regulating equipment. *(Week 10)*

  ### Stage 4:: Final Testing with Toxic Gas Use
  - **Full Pattern Etching**: Week 11
  - **Repeatability and Precision Testing**: Week 11
  - **Milestone**: Have the system functioning with the toxic gases, and improve its effectiveness. *(Weeks 11 – 12)*

  ### Stage 5:: Documentation
  - **Timeline**: Weeks 13 – 15
  - **Milestone**: Record the full build, maintenance, and manufacturing process, with detailed instructions and references.

  ## Schedule Summary

  | Stage | Timeline |
  |---|---|
  | Pre-Semester System Planning and Supplier Outreach | Week 1 |
  | Component, CAD, and Prototype Verification | Weeks 2 – 4 |
  | System Assembly | Weeks 4 – 8 |
  | Initial Testing and Calibration | Weeks 9 – 10 |
  | Final Testing with Toxic Gas Use | Weeks 11 – 12 |
  | Documentation | Weeks 13 – 15 |

  ## Expected Outcome

  By the end of the semester, Minnesota Nanofabrication Club expects to have a fully functioning RIE system prototype with:
  - A regulated gas intake and exhaust system.
  - The ability to make a chip with 1 µm features.
  - Complete build and operating documentation.

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you’ve put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/reactive-ion-etcher-1.jpg"
#     caption: ""
#   - src: "/images/machines/reactive-ion-etcher-2.jpg"
#     caption: ""

# subsystems:
#   - name: "Vacuum chamber & electrodes"
#     description: "The wafer sits on the powered electrode. The asymmetry between the small powered electrode and the large grounded chamber is what creates the DC self-bias that accelerates ions into the surface."
#   - name: "Pump stack"
#     description: "A rotary pump rough-pumps from atmosphere, then a turbomolecular pump takes the chamber into the milliTorr range and holds it there while gas flows through."
#   - name: "RF supply & matching network"
#     description: "Generates the plasma. The matching network tunes out the load’s reactance so power actually goes into the discharge instead of reflecting back into the amplifier."
#   - name: "Gas delivery"
#     description: "Mass flow controllers meter each process gas. The gas mix sets the chemistry: fluorine species attack silicon and oxide, oxygen strips polymer, argon adds physical sputtering."
#   - name: "Pressure control"
#     description: "A capacitance manometer reads chamber pressure and a throttle valve holds it at setpoint. Pressure sets the ion mean free path — and therefore how directional the etch is."
#   - name: "Electrode cooling"
#     description: "Ion bombardment dumps real power into the wafer. Without cooling, the resist mask softens and flows, and the pattern degrades mid-etch."
#   - name: "Endpoint detection"
#     description: "Optical emission spectroscopy watches the plasma’s color. When the film being etched is gone, the emission lines from its etch products drop — that’s the signal to stop."
#   - name: "Safety interlocks"
#     description: "RF cannot energize unless the chamber is under vacuum and closed. Striking a plasma at atmosphere, or with the lid open, is both a UV and an RF exposure hazard."
---

Reactive-ion etching is what makes vertical sidewalls possible.

A purely chemical wet etch attacks material in every direction at once, so it
eats sideways under the resist mask by roughly as much as it cuts down. At
micron scale that's tolerable. Below that it destroys the pattern.

RIE combines two mechanisms: reactive neutrals do chemistry on the surface, and
ions accelerated by the plasma sheath slam into it nearly straight down. The
chemistry alone would be isotropic; the directional ion bombardment is what
biases the etch downward and keeps the sidewalls steep. Tuning the balance
between the two — through pressure, power, and gas mix — is most of what
running this tool is about.
