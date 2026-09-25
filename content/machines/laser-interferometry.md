---
title: "Laser Interferometry"
category: "Gen 2 Wafer Inspection & Metrology"
step: "Film & Surface Metrology"
weight: 10
status: "planned"
summary: "Measures film thickness and flatness with light."

# specs:
#   - label: "Thickness resolution"
#     value: "~ 1 nm"
#   - label: "Source"
#     value: "HeNe, 632.8 nm"
#   - label: "Measurement"
#     value: "Non-contact"

# photos:
#   - src: "/images/machines/laser-interferometry-1.jpg"
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

documentationUpdated: "Sept, 2026"
documentation: |
      ## System Overview
      In maskless photolithography, the system exposes a substrate to an imaging process. Because the projection field is smaller than the wafer, the substrate must be stepped precisely. This metrology system provides real-time, high-speed closed-loop positional feedback for the X and Y stage to eliminate errors in stitching and allow precise alignment during probing and testing.

      Instead of a homodyne system (such as a Mach-Zehnder interferometer susceptible to DC noise), the proposed architecture uses a heterodyne interferometer. At the heart of a heterodyne interferometer is the Zeeman-split laser producing two known frequencies. An ESP32 reads data from the optical receiver and transmits it to a PC.

      ---

      ## Optics & Core Architecture

      ### Light Source: Zeeman-Split HeNe Laser
      - The core of the system is a two-frequency laser.
      - When a magnetic field is applied to a standard HeNe laser tube, the Zeeman effect splits the beam into two distinct optical frequencies: F1 and F2.

      ### Optical Path
      - F1 and F2 are emitted from the laser and split by the beam splitter.
      - F2 reflects off the reference reflector and back into the beam splitter.
      - F1, separated from F2, reflects from the measurement reflector. Because the mirror is moving, the reflected frequency is Doppler-shifted to F1 + ΔF1.
      - F2 and F1 + ΔF1 recombine, and the optical receiver reads the beat frequency F2 − (F1 + ΔF1). The laser source separately outputs the reference signal F2 − F1.

      ---

      ## Signal Processing & Integration

      ### Signal Processing
      - Using an ESP32 microcontroller, the system processes the reference frequency difference (F2 − F1) and the measurement frequency difference (F2 − (F1 + ΔF1)).
      - Expecting frequencies in the low megahertz range, the system transmits this positional data to a PC via custom software.

      ### System Integration
      - **Maskless Stepper**: The interferometer feeds position data directly to the motion controller. If the stage overshoots its movement, the software digitally shifts the exposure pattern to align perfectly with the previous field.
      - **Probe Station**: When moving between microscopic die pads, the software commands the stage to execute sub-micron step-and-repeat maneuvers, ensuring test probes land squarely on metal contacts without scratching surrounding layers.
    #
    #   > A callout, for anything that can hurt someone or break the tool.

documentationPhotos:
  - src: "images/machines/LinearInterferometer.drawio.png"
#    caption: "Figure 1: SonoPlot Microplotter [SonoPlot's patent US 7,849,738 B]."
  - src: "images/machines/Michealson Interferometer.drawio.png"
#    caption: "Figure 2: Fluid deposition via ultrasonic pumping [SonoPlot Microplotter Manual]."

subsystems:
  - name: "Laser and optics"
    description: "A stable single-wavelength source split into two paths. The whole measurement is a comparison between them, so wavelength stability sets accuracy."
  - name: "Detector and fringe counting"
    description: "Light and dark bands sweep past as path length changes. Counting them converts an optical effect into a distance in nanometers."
  - name: "Vibration isolation"
    description: "A footstep is bigger than the thing being measured. The bench floats, or the data is noise."
  - name: "Analysis software"
    description: "Turns fringe data into thickness and flatness maps, and fits multi-layer stacks where several films sit on top of each other."
---

Light reflecting off the top of a thin film and light reflecting off
the bottom travel slightly different distances. Where those two waves
line up they brighten; where they oppose, they cancel. The resulting
pattern encodes the film thickness — and since the wavelength of the
laser is known exactly, so is the thickness.

This gives us **nanometer measurements without touching anything**,
which matters because a stylus profiler scratches the surface it's
measuring.

It closes the loop on deposition. Right now we know roughly how thick a
sputtered film should be from time and power. With this tool, we know.
