---
title: "Reactive Ion Etcher"
category: "Gen 2 Patterning"
step: "Dry Etch"
weight: 10
status: "building"
summary: "Cuts into the wafer with a reactive plasma. It etches straight down, so features stay sharp instead of washing out sideways."

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
  ## Timeline
  
    Project Timeline - Reactive Ion Etching (RIE)
    Project Overview
    This section describes the plan for achieving to build a reactive ion etcher system, with the assigned schedule.
    ### Pre-Semester System Planning and Supplier Outreach
    - **Timeline**: Week 1 
      - Milestone: Get approved for the main funding and general concept for the product.
    ### Stage 1: Component, CAD, and Prototype Verification
    - **Timeline**: Week 2-4 
      - Milestone: Make a 3D model of the etcher system, have the main equipment.
    ### Stage 2: System Assembly
    - **Timeline**: Weeks 4-7
      - Mechanical Assembly
    - **Timeline**: Week 7-8
      - Tubing and Gas Dynamics
    - **Timeline**: Week 8
      - Milestone: Set up the vacuum, gas flow and electrical system.
    ### Stage 3: Initial Testing and Calibration
    - **Timeline**: Weeks 9
      - Subsystem Bring-Up
    - **Timeline**: Week 9
      - System Integration
    - **Timeline**: Week 10
      - Calibration and Dry-Run Validation
    - **Timeline**: Week 10
      - Milestone: Get the system working primarily without the use of the toxic gases. Get the measuring and regulating equipment calibrated.
    ### Stage 4: Final testing with toxic gas use
    - **Timeline:** Weeks 11
      - Full Pattern Etching
    - **Timeline**: Week 11
      - Repeatability and Precision Testing
    - **Timeline**: Week 11 - 12
      - Milestone: Have the system functioning with the use of toxic gases, and improve effectiveness.
      - Documentation
    - **Timeline**: Weeks 13 – 15
      - Milestone: Record the full building, maintaining and manufacturing process, with detailed instructions and references.

    ### Schedule Summary

    | Stage | Timeline |
    |---|---|
    | Pre-Semester System Planning and Supplier Outreach | Week 1 |
    | Component, CAD, and Prototype Verification | Weeks 2 – 4 |
    | System Assembly | Weeks 4 – 8 |
    | Initial Testing and Calibration | Weeks 9 – 10 |
    | Final testing with toxic gas use | Weeks 11 – 12 |
    | Documentation | Weeks 13 – 15 |

    Expected Outcome
    By the end of the semester, Minnesota Nanofabrication Club expects to have a fully functioning RIE system prototype with:
    - A regulated gas intake and exhaust system.
    - Achieving the goal of making a 1 micron fonted chip.
    - Complete build and operating documentation


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
