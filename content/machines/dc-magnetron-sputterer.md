---
title: "DC Magnetron Sputterer"
category: "Gen 1 Thin Film Deposition"
step: "Metal Films"
weight: 10
status: "building"
summary: "Knocks atoms off a metal target with an argon plasma and lets them land on the wafer, growing a film atom by atom."

# specs:
#   - label: "Base pressure"
#     value: "< 1 × 10⁻⁵ Torr"
#   - label: "Process pressure"
#     value: "2 – 10 mTorr argon"
#   - label: "Targets"
#     value: "Al, Ti, Cu, Cr"

architectureDiagrams:
  - src: "/images/machines/DCMagnetron.jpg"
 #   caption: "Resistive coil wound around the quartz process tube inside an insulated shell, driven through a solid-state relay from a PID controller running off a thermocouple."
  - src: "/images/machines/DCMagnSub.jpg"

  - src: "/images/machines/MagnetonMain.jpg"

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
      ## Overview & Target Specifications

      The goal of this machine is to be able to sputter aluminum metallization layers and bulk dielectric oxides.

      ### Contribution Information
      - **Project Owner**: Bear BlinSchauer
      - **Magnetron Subsystem**: Design the magnetron.
      - **Power Subsystem**: Design the DC and RF power supply system[cite: 1].
      - **Vacuum Subsystem**: Design the Vacuum Chamber, gas, and process flow.
      - **Procurement, Finance & Partnerships**: BOM Management, vendor sourcing, budgeting.
      - **Safety**: Frame/enclosure, chamber shielding, HV isolation, interlock wiring, operator SOPs.

      ### CAD & Repositories
      - **CAD**: Design will be done in Onshape group *(SolidWorks preferred, but has poor collaboration features)*.
        - [Onshape Document](https://cad.onshape.com/documents/d79ba195e2051fdc2a5a548a/w/9e5a36d9aba90798ea2b5190/e/a9a373c625e0f8783fb4f3d8?renderMode=0&uiState=6a8f48d0a7f67d7340aa7431)
      - **KiCad**: Tracked in GitHub.
      - **Software**: Tracked in GitHub.

      ---

      ## Reference Material

      - **Hacker Fab**: [DIY RF Sputtering Chamber](https://docs.hackerfab.org/home/fab-toolkit/deposition/diy-rf-sputtering-chamber)
      - **Thought Emporium**:
        - [YouTube Video](https://www.youtube.com/watch?v=aljbjJbfghs)
        - [GitHub Repository](https://github.com/thethoughtemporium/sputteringsystem/tree/main)
      - **Applied Science Blog**:
        - [More Info About Sputtering Process](https://benkrasnow.blogspot.com/2013/12/more-info-about-sputtering-process.html?m=1)
        - [Intro to Sputtering Process](https://benkrasnow.blogspot.com/2013/11/intro-to-sputtering-process-to-create.html)
      - **Hackaday Articles**:
        - [Practical Plasma for Thin Film Deposition](https://hackaday.com/2018/04/11/practical-plasma-for-thin-film-deposition/)
        - [Sputtering Magnetron Project](https://hackaday.io/project/188141-sputtering-magnetron)
      - **Forum Posts**:
        - [Finishing.com Forum Thread](https://www.finishing.com/456/54.shtml#gsc.tab=0)

      ---

      ## System Documentation Outline

      ### Vacuum Documentation
      - Chamber Construction
      - Vacuum Plumbing
      - Gas Control

      ### Power Supply Docs
      - DC Power Supply[cite: 1]
      - RF Power Supply[cite: 1]

      ### Magnetron Docs
      - Initial rough magnetron designs (v1): [Excalidraw Whiteboard](https://app.excalidraw.com/l/3pV8fsMMqar/8ygDm5HuHUY)
      - The magnetron is designed in CAD.
      - **Dark Space Shields**: The "Dark Space" is an area in the vicinity of the target edge where no plasma exists during the deposition process.

      ---

      ## Timeline

      **Sputterer Project Timeline (Target: Winter Break 2026)**
      *Note on Shifting: If funding or parts procurement is delayed at Week 3, pause the timeline and shift all subsequent dates back by the length of the delay.*

      ### Phase 1: Procurement & Planning
      - **Week 1 (Aug 31 - Sep 06)**: Finalize mechanical CAD, power delivery, and matching network schematics. Submit formal funding requests.
      - **Week 2 (Sep 07 - Sep 13)**: Funding approval. Follow up with sponsors (e.g., Ideal Vacuum Systems) and establish a contingency BOM if the full budget isn't met.
      - **Week 3 (Sep 14 - Sep 20)**: Parts Ordering. Purchase vacuum pumps, MFCs, target materials, and high-voltage components.
        - **STOP-GATE**: Project may be delayed until critical parts are ordered.

      ### Phase 2: Sub-Systems & Prep
      - **Week 4 (Sep 21 - Sep 27)**: Infrastructure & Machining. Machine custom structural components (magnetron housing, chamber mounts). Finalize safety protocols for high voltage and argon/oxygen handling.
      - **Week 5 (Sep 28 - Oct 04)**: Receiving. Inventory shipments. Test individual components (dry scroll pump, turbomolecular pump, gauges) for dead-on-arrival faults.
      - **Week 6 (Oct 05 - Oct 11)**: Sub-assembly. Build and wire isolated sub-systems. Plumb gas control lines and wire the power supply/matching network outside the main chamber.

      ### Phase 3: Integration & Prototyping (Alpha)
      - **Week 7 (Oct 12 - Oct 18)**: Core Assembly. Assemble the vacuum vessel, install the magnetron, and connect sub-systems to the main chassis.
      - **Week 8 (Oct 19 - Oct 25)**: Alpha Test 1 (Vacuum). Execute pump-down, perform leak detection, and verify ultimate base pressure limits. Expect leaks here.
      - **Week 9 (Oct 26 - Nov 01)**: Alpha Test 2 (Plasma). Introduce regulated Argon flow (1-50 mTorr). Apply power to ignite and tune a stable plasma discharge on the cathode.
      - **Week 10 (Nov 02 - Nov 08)**: Troubleshooting. Buffer week to fix alpha failures: patch vacuum leaks, resolve arcing, improve magnetron cooling, or re-order blown components.

      ### Phase 4: Deposition & Polishing (Beta)
      - **Week 11 (Nov 09 - Nov 15)**: Beta Prototype. With stable vacuum and plasma, execute first real deposition: Test aluminum sputtering on a glass slide.
      - **Week 12 (Nov 16 - Nov 22)**: Metrology & Tuning. Measure aluminum film thickness/resistivity with a four-point probe. Adjust power, pressure, and distance to hit the 0.5nm/s - 2.0nm/s target rate.
      - **Week 13 (Nov 23 - Nov 29)**: Advanced Testing (Thanksgiving Buffer). Introduce reactive sputtering (Oxygen) to test aluminum oxide or silicon dioxide dielectric deposition.
      - **Week 14 (Nov 30 - Dec 06)**: Final Polish. Finalize cable management, install proper grounding/shielding enclosures, and secure gas cylinders permanently.
      - **Week 15 (Dec 07 - Dec 13)**: Handover. Clean chamber, finalize build documentation, and write standard operating procedures (SOPs).
      - **Week 16 (Dec 14 - Dec 20)**: WINTER BREAK - Project Complete.

      ### Schedule Summary

      | Phase | Timeline | Focus |
      |---|---|---|
      | Phase 1: Procurement & Planning | Weeks 1 – 3 | CAD, Funding, and Ordering (Stop-Gate) |
      | Phase 2: Sub-Systems & Prep | Weeks 4 – 6 | Machining, Component Testing, Sub-assemblies |
      | Phase 3: Integration & Prototyping | Weeks 7 – 10 | Vessel Assembly, Vacuum & Plasma Alpha Tests |
      | Phase 4: Deposition & Polishing | Weeks 11 – 16 | Beta Depositions, Metrology, Documentation & Handover |
    #   > A callout, for anything that can hurt someone or break the tool.

    # PHOTOS of this machine. Delete the leading "#" on the lines below
    # once you’ve put real image files in static/images/machines/.
    # One photo renders large; two or more render as a grid.
    # "caption" is optional.
    #
    # photos:
    #   - src: "/images/machines/dc-magnetron-sputterer-1.jpg"
    #     caption: ""
    #   - src: "/images/machines/dc-magnetron-sputterer-2.jpg"
    #     caption: ""

subsystems:
  - name: "Vacuum chamber"
    description: "Has to reach high vacuum before deposition starts. Residual water vapor and oxygen get incorporated into the growing film and wreck its conductivity and adhesion (Chamber Contruction)(Vacuum Plumbing)(Gas Control)."
  - name: "Power Supply"
    description: "Powering up the Magnetron (DC Power Supply)(RF Power Supply)"
  - name: "Magnetron"
    description: "Dark Space Shields: The “Dark Space” is tan area in the vicinity of the target edge where no plasma exists during the deposition process."

 
---

https://www.youtube.com/playlist?list=PLa3ICAr3RGVUk5borkggWceW8nxZpXyIc 
^ Watch these!

Sputtering is the technique of using electric fields in order to accelerate materials from a target onto a substrate material. A process gas fills the chamber and is accelerated to the target material after losing an electron. The process gas will free material from the target and the freed material will collect on the substrate. 

RF sputtering will alternate the potential of the current applied to eliminate a charge buildup, and is necessary to deposit insulating materials such as Aluminum Oxide, instead of only metals.

Reactive Sputtering: While sputtering typically inert argon gas is used. However introducing reactive gas can react and create a reaction product such as oxides, nitrides etc.

Read Campbell on sputtering and vacuum systems. (Optional) Read zant for an overview of different types of sputtering utilizations. 


<!-- Sputtering is how the wires get made.

After lithography and etching define where structures go, the device still
needs conductors — metal contacts to the doped regions, and interconnects
tying components together. Sputtering deposits those layers.

The mechanism is purely mechanical. Argon ions accelerated into a metal target
transfer enough momentum to eject surface atoms, which travel across the
chamber and stick to whatever they hit, including the wafer. Because it doesn't
rely on the material being vaporizable at a reasonable temperature, sputtering
works for refractory metals and alloys that thermal evaporation can't handle —
and it holds alloy composition, which evaporation generally doesn't.

Film adhesion and stress are the things that go wrong. Both trace back to how
clean the chamber was before the plasma struck. -->


