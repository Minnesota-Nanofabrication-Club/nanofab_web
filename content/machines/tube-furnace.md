---
title: "Tube Furnace"
category: "Gen 1 Thin Film Deposition"
step: "Oxide & Anneal"
weight: 20
status: "building"
summary: "Heats wafers to ~1000 °C to grow oxide and drive in dopants."

# specs:
#   - label: "Max temperature"
#     value: "~1100 °C"
#   - label: "Tube diameter"
#     value: "2 in quartz"
#   - label: "Ambients"
#     value: "Dry O₂, wet O₂, N₂"

# DESIGN DIAGRAMS, shown at the top of "Design architecture".
# Add as many as you like — copy a "- src:" pair for each one.
architectureDiagrams:
  - src: "/images/machines/tube-furnace-layout.jpg"
    caption: "Resistive coil wound around the quartz process tube inside an insulated shell, driven through a solid-state relay from a PID controller running off a thermocouple."

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
      ## Project Summary
      A kanthal-element resistance tube furnace designed to reach 1100°C for annealing and oxidation of doped silicon wafers.
      
      - **Electrical Specs**: Runs on 780W at 120V through a 22 AWG Kanthal A1 coil (24 turns, ≈18.46Ω).
      - **Control System**: Driven by a PID controller operating a zero-cross SSR in time-proportioning mode, backed by an independent high-limit thermal cutoff.
      - **Build Duration**: Total lead time is ~4 weeks (governed primarily by custom quartz tube shipping), requiring ~20-25 hours of total hands-on assembly time.

      ---

      ## Timeline & Build Schedule

      ### Week 0: Design, Theory & Procurement
      - **Tasks**:
        - Finalize design & engineering (thermal/electrical calculations, component selection, BOM).
        - Most design time is spent refining parameters based on thermal and electrical calculations.
        - Compile a summarized theory document covering all calculations and design rationale.
        - Order all components simultaneously on Day 1 to parallelize shipping.

      ### Weeks 1–2: Shipping & Lead Time
      - **Status**: No active assembly work (waiting on component deliveries).
      - **Long-pole Item**: Custom quartz tube (typically 7–14 days from supplier).
      - **Standard Parts**: Expected arrival within 2–5 days.

      ### Week 3: Core Mechanical & Thermal Assembly
      - **Days 1–2** (~2–3 hrs + 12+ hr cure): Cement the tube's wound zone; allow to cure overnight.
      - **Days 2–3** (~2–3 hrs + 12+ hr cure): Wind the Kanthal coil (24 turns, 22 AWG doubled). Verify resistance (R ≈ 18.46 Ω) using a multimeter prior to cementing over. Allow to cure overnight.
      - **Day 4** (~2 hrs): Wrap 3 layers of ceramic wool insulation (~76mm total thickness). Route Kanthal leads through high-temperature ceramic sleeving.
      - **Session 5** (~3 hrs): Assemble sheet-metal casing and end caps. Drill 2" access holes and the radial thermocouple port.
      - **Milestone**: Core furnace physical assembly complete.

      ### Week 4: Wiring, Control Enclosure & Commissioning
      - **Day 1** (~2 hrs): Mount ceramic terminal blocks. Insert the 5" thermocouple probe radially at the coil midpoint.
      - **Day 2** (~3–4 hrs): Construct the control enclosure: mount PID, SSR with heatsink, IEC inlet module, and terminal blocks. Wire full power and control/sensing paths.
      - **Day 3** (~2 hrs): Final system integration: connect furnace body to control enclosure, mount to stand, and label all connections.
      - **Day 4** (~3–4 hrs): System commissioning: visual inspection, high-limit cutoff trip testing, low-duty bench test, and initial supervised ramp to 1100°C.
      - **Milestone**: System wired, fully commissioned, and validated at 1100°C.

      ---

      ## Schedule Summary

      | Timeline | Phase | Key Deliverables & Focus |
      |---|---|---|
      | Week 0 | Design, Theory & Procurement | Design, calculations, BOM, and immediate order placement |
      | Weeks 1–2 | Shipping & Lead Time | Lead-time buffer for custom quartz tube delivery |
      | Week 3 | Core Mechanical & Thermal Assembly | Coil winding, cementing, ceramic insulation, casing assembly |
      | Week 4 | Wiring, Control Enclosure & Commissioning | Control panel wiring, sensor integration, testing to 1100°C |
    #
    #   > A callout, for anything that can hurt someone or break the tool.

    # PHOTOS of this machine. Delete the leading "#" on the lines below
    # once you’ve put real image files in static/images/machines/.
    # One photo renders large; two or more render as a grid.
    # "caption" is optional.
    #
    # photos:
    #   - src: "/images/machines/tube-furnace-1.jpg"
    #     caption: ""
    #   - src: "/images/machines/tube-furnace-2.jpg"
    #     caption: ""

subsystems:
  - name: "Enclosure"
    description: "a specialized containment system designed to address unique safety, contamination, and thermal management challenges"
  - name: "PID Control System"
    description: "regulates internal heating elements through closed-loop feedback to maintain precise, stable thermal profiles without dangerous overshoots"
  - name: "Internal Quartz Tube"
    description: "serves as the core reaction and containment chamber" 
---

The tube furnace is the most fundamental machine in the fab, and it does three
different jobs.

**Thermal oxidation** grows silicon dioxide by consuming the wafer's own
silicon at high temperature in an oxygen ambient. This is the step that makes
silicon special as a semiconductor material — the native oxide it grows is an
excellent insulator, bonds perfectly to the substrate, and can be patterned
and etched. No other common semiconductor has an equivalent.

**Dopant drive-in** follows spin-on doping. Dopant atoms sitting on the surface
diffuse into the silicon, and time-at-temperature sets how deep the junction
goes.

**Annealing** repairs crystal damage from earlier processing and activates
dopant atoms by moving them onto proper lattice sites, where they can actually
contribute carriers.


