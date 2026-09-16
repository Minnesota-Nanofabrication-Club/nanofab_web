---
title: "Developer Station"
category: "Lithography"
step: "Develop"
weight: 40
status: "building"
summary: "Dissolves away the exposed regions of photoresist in a chemical bath, turning a latent image into a physical stencil on the wafer."

specs:
  - label: "Chemistry"
    value: "TMAH-based developer"
  - label: "Bath temperature"
    value: "21 ± 1 °C"
  - label: "Typical develop"
    value: "30 – 90 s"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/developer-1.jpg"
#     caption: ""
#   - src: "/images/machines/developer-2.jpg"
#     caption: ""

subsystems:
  - name: "Develop bath"
    description: "A shallow tank of TMAH developer sized so a wafer can be fully immersed and lifted out cleanly."
  - name: "Temperature control"
    description: "Develop rate is strongly temperature dependent — a couple of degrees changes how much resist comes off in a fixed time, which changes the printed linewidth."
  - name: "Agitation"
    description: "Keeps fresh developer moving across the surface. Without it, dissolved resist builds up in a stagnant layer right where the reaction is happening and the develop stalls unevenly."
  - name: "DI rinse & nitrogen dry"
    description: "Stops the reaction immediately. Developer left on the wafer keeps eating resist, so the rinse is as time-critical as the develop itself."
  - name: "Timer"
    description: "Develop time is the main handle for fine-tuning feature size once exposure dose is fixed."
---

Development is where the pattern becomes real. Up to this point the exposed
resist looks identical to the unexposed resist — the difference is chemical,
not visual.

With a positive resist, UV exposure breaks down a compound that was inhibiting
dissolution, so exposed regions wash away in developer and unexposed regions
stay. The wafer comes out with a polymer stencil sitting on it, ready to
protect the material underneath during etch.

Under- and over-development both show up as linewidth error, which is why this
station cares about temperature and timing more than it looks like it should.
