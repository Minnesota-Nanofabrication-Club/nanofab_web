---
title: "Photoresist Stripper"
category: "Etch & Pattern Transfer"
step: "Resist Strip"
weight: 20
status: "building"
summary: "Removes the resist mask once it has done its job, clearing the surface for the next layer without disturbing the structures underneath."

specs:
  - label: "Wet strip"
    value: "Heated solvent bath"
  - label: "Dry strip"
    value: "O₂ plasma ash"
  - label: "Finish"
    value: "DI rinse, N₂ dry"

# PHOTOS of this machine. Delete the leading "#" on the lines below
# once you've put real image files in static/images/machines/.
# One photo renders large; two or more render as a grid.
# "caption" is optional.
#
# photos:
#   - src: "/images/machines/photoresist-stripper-1.jpg"
#     caption: ""
#   - src: "/images/machines/photoresist-stripper-2.jpg"
#     caption: ""

subsystems:
  - name: "Heated solvent bath"
    description: "Warm solvent swells and lifts off resist that hasn't been hardened. This is the fast, cheap path when it works."
  - name: "Oxygen plasma asher"
    description: "Burns the resist off as CO₂ and water vapor. Needed after a long etch, where ion bombardment has cross-linked the top of the resist into a crust that solvents won't touch."
  - name: "Fume extraction"
    description: "Strip solvents are volatile and not things to breathe. The bath vents to extraction, not to the room."
  - name: "Rinse & dry"
    description: "A final DI rinse and nitrogen dry ensures no stripper residue is carried into the next process step."
---

Stripping sounds trivial and frequently isn't. Resist that has spent twenty
minutes in an RIE plasma is chemically nothing like the resist that went in —
the surface has been hardened into a cross-linked skin that shrugs off the
solvents that would normally dissolve it.

So the station supports both approaches. Wet stripping first, because it's
gentler and faster. Plasma ashing as the fallback, because oxygen plasma will
remove any organic film regardless of what's been done to it.

The constraint on both is selectivity: whatever removes the resist has to leave
the patterned metal, oxide, or silicon underneath completely alone.
