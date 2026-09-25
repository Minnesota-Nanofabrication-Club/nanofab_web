---
title: "Inkjet Microplotter"
category: "Application"
step: "Direct Write"
weight: 10
status: "building"
summary: "Prints material straight onto a wafer one tiny droplet at a time — no mask, no resist, no etch."

specs:
  - label: "Feature width"
    value: "~5 – 50 µm"
  - label: "Droplet volume"
    value: "Picoliter scale"
  - label: "Inks"
    value: "Silver nanoparticle, polymers"

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
  ## Microplotter Project Proposal

  **Members**: Andrew Choi (choi1088@umn.edu), Bear BlinSchauer (blinds004@umn.edu), Leonard Jin (jin00404@umn.edu)

  ### Project Summary
  The primary objective of this project is to build an in-house ultrasonic microdispensing system, which is functionally equivalent to a SonoPlot Microplotter, to print approximately ~50 micron silver conductive traces onto a 2D structure.

  ### Background and Significance
  The design proposed is based on the ultrasonic pumping and sensing principles described in SonoPlot's patent US 7,849,738 B. When an AC current is applied to the piezoelectric element, it vibrates a tapered capillary near its resonance frequency. At low drive amplitude, this motion pumps small, controlled amounts of ink through a fluid bridge at the substrate. The same piezo response can also indicate when the meniscus or tip loads against the surface, enabling controlled Z-height detection.

  ### Objectives
  - Design and construct a three-axis Cartesian microplotter capable of depositing lines of silver colloid ink onto PDMS/SU-8 2D substrates at a target feature width of ~50 microns, with X-Y placement accuracy ≤ 10 µm, bidirectional repeatability ≤ 1 µm, and velocity ripple < 2% at 1 mm/s traverse speed.
  - Achieve automatic Z-standoff control to within [TBD] of the target gap using two-stage sensing: camera-guided coarse motion (inductive pre-approach), followed by slow piezo-impedance bridging detection without causing tip or substrate damage.
  - Develop firmware that interprets gcode/CAM files into synchronized X-Y-Z motion and piezoelectric drive commands. The initial GRBL/A4988 or DRV8825 system will use closed-loop stepper control on all axes, with magnetic encoders used to detect and correct positioning errors.
  - Develop a graphical interface converting vector/design files to gcode, with system tuning and diagnostics over a UART debug connection. Ethernet or Bluetooth control through the ESP32.
  - Establish a repeatable, documented process (parameters, calibration, QC) transferable to future structures.
  - Produce an itemized bill of materials and a cost comparison against a quoted SonoPlot Microplotter [Pro/II], to evaluate cost effectiveness.

  ### Technical Overview
  
  #### Gantry
  - Each of the X and Y axes is a ball screw driven linear stage. A NEMA 17 stepper motor drives a ground ball screw through a backlash bellows or Oldham coupling. 
  - The X- and Y-axis stages will use PID control to correct positioning errors. A magnetic angle encoder reads the rotation of a diametrically magnetized ring magnet mounted on each motor shaft, providing position feedback to the controller.
  - This loop is a stall-detection and microstep-linearization mechanism, not a position-accuracy mechanism as it cannot see backlash or lead error downstream. 
  - Absolute X-Y positioning accuracy is maintained by using a vision system to detect and center on fiducial markers, allowing the machine to more accurately correct for positioning errors.
  - This project will avoid a fixed configuration due to the thermal expansion of the screws.
  - For the Z-axis, we will use a micrometer driven by a stepper motor to convert rotational motion into precise linear motion.

  #### Software
  - **Interface**: The software portion will mainly be composed of a light graphical user interface used to turn vector and design files into gcode CAM files which the plotter understands.
  - **Diagnostics**: The plotter will feature a debug connection over UART to tune and control system settings and test XY movement. As a reach, the software GUI interface will be able to connect to the plotter over Ethernet or Bluetooth.
  - **Firmware Motion & Deposition**: Interprets gcode files and commands then translates them into machine movements. Gcode commands will be developed to change the frequency of piezoelectric vibration and thus deposition.
  - **Alignment & Sensing**: Firmware will read large scale reference markers and microscopically sized fiducial markers to align the nozzle to the correct place before deposition. It will automatically align the Z axis to the correct dispensing height using an inductive probe for fast movements, switching to measuring changes in piezoelectric transducer voltage for close tip contact with the substrate.

  #### Dispensing
  - Uses a micropipette attached to a piezoelectric element. The vibration of the piezoelectric transducer transfers to the pipette, causing fluid in the pipette to exit. This technique allows a precise way of dispensing small amounts of fluid.
  - Capillary action is used to load small amounts of liquid into the deposition fixture. A supply system for continuous fluid loading is out of scope for this project.

  #### Sensing
  - The Z-sensing method is piezo-impedance. A current sense resistor and envelope detector circuit convert changes in piezo current/amplitude into a slowly varying voltage that the ESP32 ADC can monitor.
  - During slow descent, a calibrated change in this signal indicates surface loading or formation of the fluid bridge, at which point the controller stops Z-motion. The signal should also return below threshold after retraction as a basic sensor health check.

  ### Timeline & Work Plan
  Three people will be working on this project. The time cost is expected to be around 10 hours per week, per person.

  ### Budget
  The following is a rough estimate of the machine cost (the full cost is in the BOM, which does not have every exact part yet):

  | Item | Cost Estimate ($) |
  |---|---|
  | XY Gantry (motors, rail, screw, encoders, base) | 900–1200 |
  | Z Axis (motor, micrometer, guide, flexure mount) | 250–450 |
  | Standoff sensing (inductive + impedance front end) | 75–150 |
  | Dispensing (piezo, capillary stock, drive electronics, ink, SU-8) | 550–750 |
  | Alignment / Fiducials (camera, optics, illumination) | 200–500 |
  | Electronics / Firmware (MCU, drivers, power, wiring) | 250–500 |
  | Frame / Structure | 150–300 |
  | **Subtotal** | **2400–3850** |

  ### Open Questions for Cho
  - Need to confirm the SonoPlot quote with Cho. If no quote from Cho, ask SonoPlot for a quote to compare our BOM to the cost of their machine.
  - The thickness/uniformity of the substrate.
  - Dimensions of the substrate we need to pattern.
  - Pattern latency.
  - Deadline on how fast he wants it built.

  ### Reference Materials
  - [SonoPlot Patent US 7,849,738 B](https://patentimages.storage.googleapis.com/63/c7/d8/cb41172631c1e9/US7849738.pdf)
  - [Preparing a colloidal silver solution](https://www.sciencedirect.com/science/article/abs/pii/S0254058404003785)

#   > A callout, for anything that can hurt someone or break the tool.

# DOCUMENTATION PHOTOS — figures for the write-up, shown in their own
# section directly below Documentation. Never cropped. Put the image
# files in static/images/machines/. "caption" is optional.
# See README section 4.16.
documentationPhotos:
  - src: "/images/machines/microplotter.jpg"
    caption: "Figure 1: SonoPlot Microplotter [SonoPlot's patent US 7,849,738 B]."
  - src: "/images/machines/microplotter2.jpg"
    caption: "Figure 2: Fluid deposition via ultrasonic pumping [SonoPlot Microplotter Manual]."

# PHOTOS of this machine (shown near the top of the page). Delete the
# leading "#" on the lines below once you’ve put real image files in
# static/images/machines/. "caption" is optional.
#
# photos:
#   - src: "/images/machines/microplotter-1.jpg"
#     caption: ""

subsystems:
  - name: "Micropipette dispense head"
    description: "A pulled glass capillary. The tip opening sets the minimum feature width, the same way a pen nib sets line weight."
  - name: "Ultrasonic actuator"
    description: "Vibrates the pipette to break surface tension and release a controlled droplet. This is what lets it dispense viscous inks that would simply not flow out on their own."
  - name: "XYZ precision stage"
    description: "Moves the substrate under the tip along the toolpath. Positioning repeatability is what determines whether a written line is straight."
  - name: "Ink reservoir & fluidics"
    description: "Feeds ink to the pipette under low pressure. Bubbles in the line are the most common failure mode — they interrupt the write mid-line."
  - name: "Vision system"
    description: "A camera for setting the tip-to-substrate gap and aligning writes to existing features on the wafer."
  - name: "Toolpath software"
    description: "Converts a geometry file into stage motion and dispense timing, including how much adjacent lines overlap to form a solid fill."
---

The microplotter takes the opposite approach to everything else in the fab.

Conventional processing is *subtractive and parallel*: coat the whole wafer,
pattern the whole wafer, etch the whole wafer, remove what you don't want.
Enormous throughput, but every step needs resist, chemistry, and a mask.

Direct-write is *additive and serial*: put material only where it belongs,
one line at a time. Far slower, but there's no mask, no resist, and no etch
chemistry involved at all — and a design change is a new toolpath file.

That makes it the right tool for prototyping conductive traces, repairing a
broken interconnect on an otherwise good wafer, and depositing materials that
don't survive standard lithography chemistry.
