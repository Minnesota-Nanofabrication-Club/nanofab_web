---
title: "The Fab"
# This section's INDEX page is deliberately not rendered.
#
# It listed every machine grouped by band — exactly what the homepage
# and the full-screen menu already do, so it was an intermediate page
# you could only reach by accident. `render: never` removes it while
# the individual machine pages under /machines/<name>/ keep building
# normally.
#
# To bring it back: delete the _build block and restore
# layouts/machines/list.html from git history.
build:
  render: never
  list: never
---
