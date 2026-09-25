---
title: "Maskless Litho Stepper"
category: "Gen 1 Patterning"
step: "Exposure"
weight: 10
status: "building"
summary: "Projects the pattern into the photoresist straight from a design file."
#so changing a design is a re-export instead of a new mask order.

# specs:
#   - label: "Wavelength"
#     value: "405 nm (i-line adjacent)"
#   - label: "Target feature size"
#     value: "~2 µm"
#   - label: "Write field"
#     value: "Stitched, stage-stepped"

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
  
    Project Timeline - Maskless Lithography Stepper
    Project Overview
    Minnesota Nanofabrication Club is developing a maskless lithography stepper at the University of Minnesota, drawing inspiration from publicly documented systems and approaches developed by Sam Zeloof, the Hacker Fab community, and Huygens Optics.
    The system combines a digital projector, microscope optics, an imaging system, and a motorized XYZ stage to project and accurately position circuit patterns on photoresist-coated substrates. These subsystems work together to control projection, focus, sample positioning, and pattern alignment.
    Our goal is to assemble and test the first prototype within one semester, from September 8 through December 23.

    ### Pre-Semester System Planning and Supplier Outreach
    - **Timeline**: August 1 – September 7
      - Define the optical, mechanical, imaging, and motion-control architecture for the stepper.
      - Review existing maskless lithography systems to identify proven approaches, design tradeoffs, and technical risks.
      - Select the major components based on compatibility, availability, cost, and expected performance.
      - Contact suppliers regarding availability, lead times, pricing, discounts, and sponsorship opportunities.
      - Order long-lead components and finalize the preliminary bill of materials, CAD layout, and purchasing plan.
      - **Milestone**: The preliminary architecture is complete, critical components are ordered or received, supplier discussions are underway, and the project is ready for technical verification when the semester begins.

    ### Stage 1: Component, CAD, and Prototype Verification
    - **Timeline**: Week 1
      - Verify that the selected components meet the mechanical, optical, electrical, and software requirements.
      - Update the CAD assembly and optical layout using the final component dimensions and interfaces.
      - Prototype critical mounts and adapters to confirm fit, alignment, clearances, and stage movement.
      - Resolve remaining component issues and finalize the parts required for assembly.
      - **Milestone**: All available critical components and interfaces are verified and the mechanical design is ready for assembly.

    ### Stage 2: System Assembly
    - **Timeline**: Weeks 2 – 5
      - **Mechanical Assembly** (Week 2):
        - Assemble the frame and XYZ positioning stage.
        - Install the projector, microscope optics, sample holder, and camera.
        - Verify that the stage moves through its full range without collisions.
      - **Electrical and Optical Integration** (Weeks 3 – 5):
        - Connect the motors, motion-control electronics, projector, UV light source, and camera.
        - Route and secure all wiring.
        - Power on and verify each major subsystem.
      - **Milestone**: The complete stepper is mechanically assembled, electrically connected, and ready for testing.

    ### Stage 3: Initial Testing and Calibration
    - **Timeline**: Weeks 6 – 9
      - **Subsystem Bring-Up** (Week 6):
        - Configure and test the XYZ stage, motors, homing sensors, projector, exposure source, and camera.
        - Verify basic movement, image capture, pattern projection, and exposure control.
        - Focus the projected image and camera on the sample plane.
      - **System Integration** (Weeks 7 – 8):
        - Integrate the stage, projector, camera, and exposure source with the control software.
        - Verify coordinated positioning, live imaging, pattern loading, focusing, and exposure commands.
        - Resolve communication, configuration, and control issues between subsystems.
      - **Calibration and Dry-Run Validation** (Weeks 8 – 9):
        - Calibrate stage movement, camera scale, projected-pattern scale, and coordinate alignment.
        - Measure positioning repeatability, focus consistency, and movement settling time.
        - Perform repeated dry runs of the complete positioning, alignment, focusing, and exposure workflow.
      - **Milestone**: The complete system operates through the control software and can repeatedly position, focus, align, and expose a projected pattern at a selected location on the sample.

    ### Stage 4: Photoresist Patterning and Validation
    - **Timeline**: Weeks 10 – 12
      - **Exposure Process Development** (Week 10):
        - Coat test substrates with photoresist.
        - Expose test patterns using several exposure times.
        - Develop and inspect the results to determine suitable process settings.
      - **Repeatability and Resolution Testing** (Weeks 11 – 12):
        - Repeat the exposure process on multiple samples.
        - Test progressively smaller features.
        - Measure basic positioning repeatability and pattern quality across the projected field.
      - **Milestone**: The stepper produces repeatable photoresist patterns, and its initial resolution and positioning performance are documented.

    ### Documentation
    - **Timeline**: Weeks 13 – 15
      - Document the final build, operating procedure, calibration settings, and test results.
      - Prepare a final technical report and system demonstration.

    ### Schedule Summary

    | Stage | Timeline |
    |---|---|
    | Pre-Semester System Planning and Supplier Outreach | August 1 – September 7 |
    | Component, CAD, and Prototype Verification | Week 1 |
    | System Assembly | Weeks 2 – 5 |
    | Initial Testing and Calibration | Weeks 6 – 9 |
    | Photoresist Patterning and Validation | Weeks 10 – 12 |
    | Documentation | Weeks 13 – 15 |

    ### Expected Outcome
    By the end of the semester, Minnesota Nanofabrication Club expects to have:
    - A complete maskless lithography stepper prototype
    - Functional XYZ motion control
    - A functional imaging and alignment system
    - A focused digital projection system
    - Integrated control software
    - Repeatable photoresist patterning
    - Initial resolution and positioning measurements
    - Complete build and operating documentation
 # > A callout, for anything that can hurt someone or break the tool.

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you’ve put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# DESIGN DIAGRAMS. Delete the leading "#" and fill in a real path
# once there's a drawing for this machine.
#
# architectureDiagrams:
#   - src: "/images/machines/maskless-stepper-optics.png"
#     caption: ""

subsystems:
  - name: "Projection"
    description: "a TI DLP projector, retrofitted with 410 nm UV LEDs, displays the circuit pattern."
  - name: "Optics"
    description: "A DMD (micromirror array) acts as the mask. Each mir a 10× microscope objective demagnifies the projected image onto the substrate, shrinking features to the micron scale."
  - name: "Imaging"
    description: "a machine-vision camera views the sample through the same optical path for focusing and pattern-to-pattern alignment."
  - name: "Motion"
    description: "a stepper-motor-driven XYZ stage positions the sample under the projection field, stepping across the wafer exposure by exposure."
  - name: "Control Software"
    description: "a Python program coordinates the camera, the XYZ stage, and the projector, sending movement commands over USB to an Arduino running GRBL firmware."
  
---

The stepper uses projected ultraviolet light and precision optics to transfer circuit patterns onto photoresist-coated substrates — no photomasks required. Patterns are defined digitally and projected directly.

The design draws inspiration from publicly documented systems developed by Sam Zeloof, the Hacker Fab community, and Huygens Optics, as well as CMU's open-source stepper described in A low-cost, open-source maskless photolithography stepper for microfabrication.

Alignment accuracy and optical resolution are the two most important metrics of a stepper's performance, and both drive nearly every design decision in the system.


<!-- This is the machine that makes a student-scale fab viable at all.

Conventional photolithography needs a chrome-on-quartz photomask for every
layer of every design. Masks cost hundreds to thousands of dollars and take
weeks to arrive — which means a design mistake is expensive, and iterating is
effectively impossible on a club budget and timeline.

Maskless lithography replaces the physical mask with a micromirror array. The
pattern lives in a file. Changing the design costs nothing, students can run
their own layouts, and the turnaround from "idea" to "exposed wafer" is a single
afternoon instead of a purchase order.

The trade is throughput: stepping and stitching fields is far slower than
flood-exposing a whole wafer through a mask at once. For research volumes, that
trade is obviously worth it. -->
