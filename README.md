# Nanofabrication Club — Website

This is the club website. It's built with [Hugo](https://gohugo.io), a
"static site generator" — you edit simple text files, Hugo turns them into
a finished website, and the result is plain HTML that any host can serve
for free.

**The point of building it this way:** almost everything you'd want to
change lives in its own small, labelled file. Adding a sponsor is adding
three lines to a list. Adding a machine is copying one file. You do not
have to read or write HTML for any routine update.

This guide assumes you've never used Hugo, Git, or a static site
generator before. Follow it top to bottom the first time.

---

## Contents

1. [One-time setup](#1-one-time-setup)
2. [Preview the site while you edit](#2-preview-the-site-while-you-edit)
3. [Where everything lives](#3-where-everything-lives)
4. [How to change things](#4-how-to-change-things)
   - [4.1 Homepage headline, subhead, mission](#41-homepage-headline-subhead-and-mission)
   - [4.2 Discord / email / social / docs links](#42-discord--email--social--docs-links)
   - [4.3 University of Minnesota links](#43-university-of-minnesota-links)
   - [4.4 The top navigation menu](#44-the-top-navigation-menu)
   - [4.5 Add or edit a machine](#45-add-or-edit-a-machine) — *the one you'll use most*
   - [4.6 Machine status dots](#46-machine-status-dots)
   - [4.7 Process categories](#47-process-categories)
   - [4.8 "Mission" items](#48-mission-items)
   - [4.9 Advisors section](#49-advisors-section)
   - [4.10 Officers — President, VP, and the rest](#410-officers--president-vp-and-the-rest)
   - [4.11 Sponsors](#411-sponsors)
   - [4.12 Images](#412-images)
   - [4.13 Colors](#413-colors)
   - [4.14 The club logo](#414-the-club-logo)
   - [4.15 Machine documentation (the Google Sheet)](#415-machine-documentation-the-google-sheet) — *built, currently switched off*
   - [4.16 The Documentation section](#416-the-documentation-section) — *where students write things up*
   - [4.17 Overview pages](#417-overview-pages-the-illustrated-write-up) — *the illustrated write-up at the top of every machine page*
   - [4.18 Moving an image on a machine page](#418-moving-an-image-on-a-machine-page)
5. [Publishing the site](#5-publishing-the-site)
6. [Troubleshooting](#6-troubleshooting)
7. [Changing the design itself](#7-changing-the-design-itself)
8. [Text and readability](#8-text-and-readability)
9. [UMN branding rules — read this one](#9-umn-branding-rules--read-this-one)

---

## 1. One-time setup

### Step 1 — Move this folder somewhere safe

Right now this folder is in `Downloads`, which is a place people clear
out. Move it somewhere you won't lose it:

```
mv ~/Downloads/"umn-nanofab-hugo 3" ~/Documents/umn-nanofab-website
```

That also renames it, since the space and the `3` in the current name are
annoying to type. Every command in this guide assumes you're inside that
folder:

```
cd ~/Documents/umn-nanofab-website
```

> **Heads up:** your home folder (`/Users/vikramnarra`) happens to be a
> Git repository, which is unusual and will get confusing when you
> publish. Moving the site into `Documents` doesn't fix that by itself,
> but section 5.1 tells you exactly how to handle it.

### Step 2 — Install Hugo

**Mac** (using [Homebrew](https://brew.sh)):
```
brew install hugo
```

**Windows** (using [winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/)):
```
winget install Hugo.Hugo.Extended
```

**Linux** (Debian/Ubuntu):
```
sudo apt install hugo
```

Confirm it worked:
```
hugo version
```

You should see something like `hugo v0.166.0+extended ...`. Any recent
version works. **Note the version number** — you'll want it in section 5.

### Step 3 — Install a code editor

[VS Code](https://code.visualstudio.com) is free and is what the rest of
this guide assumes. Open the site folder with **File → Open Folder…**.

---

## 2. Preview the site while you edit

Open a terminal inside VS Code (**Terminal → New Terminal**) and run:

```
hugo server
```

Then open **http://localhost:1313/** in your browser.

Leave that terminal running while you work. Every time you save any file,
the site rebuilds and your browser refreshes by itself — you never have to
reload manually. Press `Ctrl+C` in the terminal to stop it.

**Always have this running while you edit.** If you make a mistake — a
typo in a YAML file, a missing quote — the error appears in that terminal
and in the browser straight away, instead of silently breaking the live
site later.

---

## 3. Where everything lives

```
umn-nanofab-website/
├── hugo.toml               ← links, UMN links, colors, nav menu
├── content/
│   ├── _index.md           ← homepage headline, subhead, mission, lab photo
│   └── machines/           ← ONE FILE PER MACHINE — each becomes its own page
│       ├── _index.md       ← intro text for the /machines/ page
│       ├── tube-furnace.md
│       └── …               (18 machines)
├── data/
│   ├── categories.yaml     ← the 6 areas + the Gen 1 / Gen 2 split
│   ├── generations.yaml    ← the two build generations and their bands
│   ├── pillars.yaml        ← the 3 items under "Mission"
│   ├── backing.yaml        ← old "Support" cards (not shown right now)
│   ├── advisors.yaml       ← faculty advisor names, roles, bios, photos
│   ├── officers.yaml       ← President, VP, Treasurer, Secretary…
│   ├── sponsors.yaml       ← "Partners & sponsors"
│   └── sheets/             ← GENERATED from the documentation Google
│                             Sheet; empty while that's off (see 4.15)
├── static/
│   ├── css/styles.css      ← custom CSS: text sizes, card hover, hero bleed
│   └── images/             ← logo, lab, machine, officer, advisor, sponsor images
├── archetypes/
│   └── machines.md         ← the blank template for a new machine page
├── scripts/
│   ├── sync-sheets.py      ← pulls the documentation Sheet into data/
│   ├── sheet-template/     ← CSVs to import when setting that Sheet up
│   └── sample-data/        ← example rows, for previewing the layout
├── layouts/                ← page templates (see section 7)
├── .github/workflows/      ← automatic publishing (see section 5)
└── netlify.toml            ← alternative publishing config (see section 5)
```

### Quick lookup

| I want to change… | Edit this |
|---|---|
| The big headline on the homepage | `content/_index.md` → `title` |
| The paragraph under the headline | `content/_index.md` → `heroSubhead` |
| The "Mission" intro paragraph | `content/_index.md` → `missionIntro` |
| The lab photo or its caption | `content/_index.md` → `labPhoto`, `labPhotoCaption` |
| The 3 "Mission" items | `data/pillars.yaml` |
| Discord / LinkedIn / Instagram / email / docs links | `hugo.toml` → `[params]` |
| umn.edu / CSE links | `hugo.toml` → `[params.umn]` |
| The nav links at the top | `hugo.toml` → `[[menu.main]]` blocks |
| Site colors | `hugo.toml` → `[params.colors]` (+ `static/css/styles.css`) |
| **Anything about a machine** | that machine's file in `content/machines/` |
| How the fab is organized (areas, Gen 1 / Gen 2) | `data/categories.yaml` |
| The Gen 1 / Gen 2 band wording on /machines/ | `data/generations.yaml` |
| The old "Support" cards (not shown right now) | `data/backing.yaml` |
| Advisor names, bios, and photos | `data/advisors.yaml` |
| **The club logo** | `hugo.toml` → `logo` (see 4.14) |
| **A machine's timeline, BOM, contributors, references** | the documentation Google Sheet — *off by default*, see 4.15 |
| A machine's background prose | that machine's file in `content/machines/` |
| **A machine's documentation write-up** | that machine's file → `documentation:` (see 4.16) |
| **Officers (President, VP, …)** | `data/officers.yaml` |
| Sponsors | `data/sponsors.yaml` |
| The order sections appear on the homepage | `layouts/index.html` |

### A note on YAML

The `data/*.yaml` files and the top part of every machine file use YAML.
Three rules cover almost every mistake:

1. **Indent with spaces, never tabs.** Two spaces per level.
2. **Line things up.** Items in a list all start at the same column.
3. **If your text contains a colon, put quotes around it.**
   `description: "Etching: the basics"` works;
   `description: Etching: the basics` breaks the file.

If you break one of these, `hugo server` prints an error naming the file
and line number. Nothing is ruined — fix the line and save.

---

## 4. How to change things

### 4.1 Homepage headline, subhead, and mission

Open `content/_index.md`. Everything is in the block between the `---`
lines:

```yaml
---
title: "We're building a chip fab on campus"
heroSubhead: "A student team at the University of Minnesota building a real…"
missionIntro: "We're building a nanofabrication lab out of bench-top tools…"
labPhoto: "/images/lab/lab-photo.jpg"
labPhotoCaption: "Our lab on campus — Keller Hall 5-194"
---
```

Edit the text inside the quotes. `title` is the big headline.

`labPhoto` is the photo in the right half of the hero. It runs off the
right edge of the screen on a wide display, so **use a landscape shot
with its subject roughly centred** — anything important right at the edge
will get cropped. Around 2000 px wide is plenty. The file goes in
`static/images/lab/`. Set `labPhoto: ""` and the hero becomes a single
full-width column of text instead.

### 4.2 Discord / email / social / docs links

Open `hugo.toml`, near the top under `[params]`:

```toml
discordURL   = "https://discord.gg/QjcG598rh"
linkedinURL  = "https://www.linkedin.com/company/your-org-here"
instagramURL = "https://www.instagram.com/your-handle-here"
contactEmail = "nanoclub@umn.edu"
docsURL      = "https://your-docs-site.example.com"
```

Change a URL once here and it updates everywhere it appears — the hero,
the mobile menu, the footer, and the bottom of every machine page.

In the hero, **Join our Discord** and **Explore the fab** sit side by
side, with the LinkedIn and Instagram icons directly under the Discord
button (`layouts/partials/hero.html`). There's no Discord button in the
top-right of the header on desktop; the mobile menu still has a "Join our
Discord →" link at the bottom.

`docsURL` is **not used anywhere** right now. Every link to the external
docs site was removed: the header's Docs tab, the footer's Documentation
link, and the "Technical documentation" box at the bottom of the
homepage. To bring the homepage box back, add
`{{ partial "docs.html" . }}` as the last line inside `layouts/index.html`
(the file `layouts/partials/docs.html` is still there). The footer's bottom row is just the
copyright line.

The footer's **Get in touch** column lists, in order: the contact email,
Discord, LinkedIn, and Instagram (`layouts/partials/footer.html`). They
all come from the settings above. Set `linkedinURL` or `instagramURL` to
`""` to drop that link from the footer. To add another platform, add a
setting under `[params]` and copy one of the `<li>` lines in that
column.

### 4.3 University of Minnesota links

Also in `hugo.toml`, under `[params.umn]`. These feed the "University of
Minnesota" column in the footer and the university name in the header.
umn.edu and the College of Science and Engineering are already correct.

`gopherLinkURL` is no longer shown anywhere: the "Find us on Gopher Link"
link was removed from the footer. To bring it back, add this line to the
"Get in touch" list in `layouts/partials/footer.html`:

```
<li><a href="{{ .Site.Params.umn.gopherLinkURL }}" class="text-muted hover:text-maroon transition-colors">Find us on Gopher Link</a></li>
```

The homepage hero also no longer has the "Student organization at the
University of Minnesota" pill above the headline.

### 4.3b The footer text

The sentence under the club name at the bottom of every page ("A student
organization at the University of Minnesota, Twin Cities, building a
nanofabrication lab from the bench up.") is typed directly into
`layouts/partials/footer.html`, near the top:

```html
<p class="text-muted mt-4 max-w-sm leading-relaxed">
  A student organization at the
  <a href="…">University of Minnesota, Twin Cities</a>,
  building a nanofabrication lab from the bench up.
</p>
```

Edit the words between `<p …>` and `</p>`. The `<a …>…</a>` part is the
underlined link to umn.edu. Keep it, change its text, or delete the
whole `<a …>…</a>` to drop the link. To remove the sentence entirely,
delete from `<p` through `</p>`.

The same file also has the footer's link columns (Club, Get in touch,
University of Minnesota) and the copyright line. **Don't change the
disclaimer block at the very bottom** ("This group is a Registered
Student Organization…"). The University requires that exact wording.

**Keep site text short.** Headings, intros, and descriptions are kept to
one short line on purpose. When adding text anywhere outside a machine's
own write-up, aim for one sentence.

### 4.4 The top navigation menu

At the bottom of `hugo.toml`:

```toml
[[menu.main]]
  name = "Mission"
  url = "/#mission"
  weight = 10
```

The menu currently reads **Documentation · Advisors · Team · Sponsors**.
"Documentation" goes to `/machines/` (the page itself is still titled
"The Fab"; change `title:` in `content/machines/_index.md` to rename it). (The
Mission link was removed; the Mission section is still on the homepage
right under the hero.) The Advisors link goes to `/#backing` (the section's id didn't
change when its title did).

Each block is one nav link. `weight` sets the order — lower numbers appear
further left. To add a link, copy a block and give it an unused weight. To
remove one, delete its block.

### 4.5 Add or edit a machine

**This is the part you'll touch most.** Each machine is one file in
`content/machines/`, and each file becomes its own page
(`content/machines/tube-furnace.md` → `/machines/tube-furnace/`). Machines
appear automatically on the homepage and on `/machines/` — you never add
them to a list anywhere else.

#### To create a new machine

Run this, using lowercase and hyphens in the name:

```
hugo new machines/thermal-evaporator.md
```

That creates the file pre-filled with every field you need, with
instructions in the comments. Open it and fill it in.

(If you'd rather not use the command, just duplicate any existing file in
`content/machines/` and rename it. Same result.)

#### The fields

```yaml
---
title: "Tube Furnace"                       # the machine's name
category: "Gen 1 Thin Film Deposition"      # MUST match a track name below
step: "Oxide & Anneal"                      # the process step it performs
weight: 20                                  # order within its track
status: "building"                       # operational | building | planned
summary: "One sentence describing what it does."

specs:                                   # the boxes under the title
  - label: "Max temperature"
    value: "~1100 °C"
  - label: "Tube diameter"
    value: "2 in quartz"

subsystems:                              # the parts it's built from
  - name: "Quartz process tube"
    description: "What this part does and why it matters."
  - name: "PID controller & thermocouples"
    description: "…"
---

Everything below the closing --- is the "Background" section.
Plain paragraphs, blank line between them. **Bold** and
[links](https://umn.edu) work.
```

#### Where a machine's Background comes from

The **Background** section on a machine page is the plain text written
**below the second `---`** in that machine's file in `content/machines/`
(the "body" of the file). It is not in the Google Sheet or in
`data/`. To change the Background for the tube furnace, open
`content/machines/tube-furnace.md` and edit the paragraphs at the bottom.

- If that part of the file is empty, the Background section and its
  jump-bar link don't appear at all.
- **If the machine has an Overview** (a file in `data/overviews/`, see
  4.17), the Background section is not shown. Every machine has one
  now, so put new explanatory text in the Overview instead. The body
  text is kept in the machine's file as a source to copy from.
- **To remove Background from one machine:** open its file, find the
  second `---` (just below `subsystems:`), and delete **everything after
  it** to the end of the file. Keep the `---` line itself. Only that
  machine is affected. (The Maskless Litho Stepper is set up this way;
  its Overview section covers the same ground.)
- **Don't hide it with `<!-- -->`.** A commented-out block still counts
  as content, so an empty "Background" heading keeps showing. Delete the
  text instead; it stays in git history if you ever want it back.
- The small grey line beside it ("What this machine does and why the
  lab needs it.") is the same on every machine. It's written in
  `layouts/machines/single.html`, in the block marked
  `Background (the markdown body of the machine's file)`.

#### Four things to know

- **`category` must match exactly.** The valid names are in
  `data/categories.yaml`. Copy and paste — don't retype. If it doesn't
  match, the machine silently won't appear anywhere. This is the single
  most common mistake.
- **Keep `summary` to one short line (under ~10 words).** It's the text
  inside the machine's card on the homepage and the Documentation page,
  and the line under the title on the machine's own page. Longer
  explanations belong in the Background text below the second `---`.
- **`weight` orders machines within their category.** Use 10, 20, 30… so
  you can slot something in between later without renumbering everything.
- **`specs` and `subsystems` are lists** — add or delete as many entries
  as you want. Leave `specs` out entirely and the boxes just won't show.
- **Delete a machine** by deleting its file. Nothing else to update.
- **Hiding a field by commenting it out is fine** (put `# ` at the start
  of each line, e.g. to hide `subsystems`). But **never comment out the
  `---` lines.** The second `---` marks where the settings end and the
  Background text begins. If it becomes `# ---`, the build fails with
  `EOF looking for end YAML front matter delimiter`. Selecting a block
  and pressing Cmd+/ in VS Code catches it easily if the selection runs
  one line too far.

#### Adding photos of the machine

Each machine page can show photos of the real tool. **Every machine file
already has a ready-made block for this, commented out**, sitting just
above `subsystems:`:

```yaml
# photos:
#   - src: "/images/machines/tube-furnace-1.jpg"
#     caption: ""
#   - src: "/images/machines/tube-furnace-2.jpg"
#     caption: ""
```

To use it:

1. Put your image files in `static/images/machines/`, named after the
   machine in lowercase with hyphens and no spaces — `tube-furnace-1.jpg`,
   `tube-furnace-2.jpg`.
2. Delete the leading `#` from the lines you want, and fill in the
   captions. Delete any lines for photos you don't have.

The result:

```yaml
photos:
  - src: "/images/machines/tube-furnace-1.jpg"
    caption: "The furnace mid-assembly, before insulation went on."
  - src: "/images/machines/tube-furnace-2.jpg"
    caption: "Quartz tube and wafer boat."
```

How they render:

| Number of photos | Layout |
|---|---|
| **None** (all lines still commented) | The photo section doesn't appear at all — no gap, no broken image |
| **One** | Shown large, near full width |
| **Two or more** | A two-column grid |

`caption` is optional — leave it as `""` and the photo shows on its own.
There's no limit on how many you add.

**Photo sizing:** aim for about **1600 pixels on the long edge**, under
**500 KB** per file. Photos are never cropped. In grid view each one is
scaled to fit a box of the same height, so a very tall or very wide photo
shows smaller, with blank space around it. Landscape photos (wider than
tall) fill the box best. Phone photos are much
bigger than needed — [Squoosh](https://squoosh.app) shrinks one for free
with no visible quality loss.

Photos appear between the specs boxes and the Background text, so
someone landing on the page sees what the machine looks like before they
read about it.

**Figures that go with the write-up** (diagrams, figures from a paper or
manual, "Figure 1: …") belong in `documentationPhotos:` instead, which
puts them directly below the Documentation section. See 4.16,
"Documentation photos".

#### The site checks your work

If you get any of this wrong, the terminal running `hugo server` tells you
straight away. Misspell a category and you'll see:

```
WARN  MACHINE SETUP — content/machines/thermal-evaporator.md: category
"Gen 1 Deposition" is not a track name in data/categories.yaml, so this
machine will NOT appear anywhere on the site. Valid values are:
Facility | Gen 1 Patterning | Gen 2 Patterning | …
```

It also warns you about an invalid `status` or a missing `summary`. So if
a machine isn't showing up, **look at that terminal first** — the answer is
almost always sitting right there.

### 4.6 Machine status dots

The colored dot next to each machine comes from its `status` field:

| Value | Shows as |
|---|---|
| `operational` | green dot — "Operational" |
| `building` | amber dot — "In build" |
| `planned` | hollow dot — "Planned" |

> **Most machines are currently set to `building` or `planned` as a
> placeholder.**
> Go through them and set real values. This is the most genuinely useful
> information on the site, and it's what visitors and prospective sponsors
> actually look at.

### 4.7 How the fab is organized

`data/categories.yaml` is the org chart for the whole fab. Everything on
the homepage and on `/machines/` is generated from it.

The lab runs **two build generations side by side**:

- **Gen 1** — the first working line
- **Gen 2** — the more capable line that follows it

**Facility** sits outside that split because both generations use it.
**Application** (the device the finished line builds toward) belongs to
**Gen 2 only**. It has a single track with `gen: "Gen 2"`, so it shows up
in the Gen 2 band and not in Gen 1.

#### How the homepage fab section is laid out

The "The fab, machine by machine" section on the homepage
(`layouts/partials/machines.html`) is grouped **by generation**, not by
area:

1. the **shared areas** (Facility) across the full width at the top;
2. a **Gen 1** column (maroon header) and a **Gen 2** column (violet
   header) side by side. On phones they stack. Each column lists that
   generation's areas in `order`, with the machines under each.

An area or generation with no machines is skipped. Nothing on the
homepage needs editing by hand: moving a machine to another track (its
`category:`) or an area to another generation (its `gen:`) moves it on
the homepage too.

#### How the /machines/ page is laid out

`/machines/` scrolls in the order the building is organised:

1. the **shared areas** first — Facility, which both lines depend on;
2. a full-width **maroon Gen 1 band**, then Gen 1's process areas;
3. a full-width **violet Gen 2 band**, then Gen 2's process areas.

So scrolling down takes you through Gen 1 and then into Gen 2, and the
coloured bands make it obvious which part of the fab you're looking at.
The two generations come from `data/generations.yaml` — that's where
their names, taglines, and descriptions live.

An area is treated as "shared" when none of its tracks carry a `gen`.
Everything else gets sorted into a generation band.

#### The shape of the file

Each block is an **area**. Inside it, `tracks` split that area between
the generations. An area with one track (no `gen`) is a shared area;
an area with a Gen 1 and a Gen 2 track appears once in each band.

```yaml
- name: Patterning
  order: 3                # sequence on the page + the number shown
  slug: patterning        # used for #links; lowercase, no spaces
  description: >-
    Printing the shape onto the wafer and cutting it into the material…
  tracks:
    - name: Gen 1 Patterning
      gen: "Gen 1"
    - name: Gen 2 Patterning
      gen: "Gen 2"
```

A shared area has one track with `gen` empty:

```yaml
- name: Facility
  order: 1
  slug: facility
  description: >-
    Shared infrastructure both generations run on…
  tracks:
    - name: Facility
      gen: ""
```

An area that belongs to **one generation only** has one track with that
`gen` (this is how Application is set up):

```yaml
- name: Application
  order: 6
  slug: application
  tracks:
    - name: Application
      gen: "Gen 2"
```

#### The full list of track names

A machine's `category:` must be **one of these, spelled exactly**:

Anchors follow the same split: a shared area is `#facility`, and a
generational one is `#gen1-patterning` / `#gen2-patterning`.

| Area | Gen 1 track | Gen 2 track |
|---|---|---|
| 01 Facility (shared by both) | `Facility` (one track for both) | — |
| 02 Patterning | `Gen 1 Patterning` | `Gen 2 Patterning` |
| 03 Doping | `Gen 1 Doping` | `Gen 2 Doping` |
| 04 Thin Film Deposition | `Gen 1 Thin Film Deposition` | `Gen 2 Thin Film Deposition` |
| 05 Wafer Inspection & Metrology | `Gen 1 Wafer Inspection & Metrology` | `Gen 2 Wafer Inspection & Metrology` |
| 06 Application (Gen 2 only) | — | `Application` |

The **Research** area (with its one machine, Radiation Hardening) is
commented out at the top of `data/categories.yaml`. See *Machines that
are parked* below.

Within a track, machines are ordered by their `weight` — lowest first.
Use 10, 20, 30 so you can slot something in between later.

**If you rename a track, update the `category:` line in every machine
file that pointed at it** — otherwise those machines disappear from the
site. `hugo server` prints a warning in the terminal naming any file that
has gone stale, so watch that window after a rename.

#### Machines that are parked

Four machines — Hot Plate, Developer Station, Photoresist Stripper, and
Wet Etch — aren't in the current org chart, so their files carry `draft: true` and
they don't appear on the site. Nothing was deleted. To bring one back,
open its file in `content/machines/` and change that line to
`draft: false`; it already has a valid category and will slot into Gen 1
Patterning.

**To park a machine** (hide it from the site without deleting it):

1. Open its file in `content/machines/`.
2. Add a new line `draft: true` directly under the first `---` at the top
   of the file:
   ```yaml
   ---
   draft: true
   title: "Wet Etch"
   category: "Gen 1 Patterning"
   ```
3. Save. The machine disappears from the homepage, from `/machines/`,
   from the "Also in …" cards, and from every machine count. Its own
   page isn't built either.

Leave everything else in the file as it is. A short comment above the
`draft:` line saying why it's parked helps whoever finds it later (see
`wet-etch.md` for an example).

**Don't hide a machine by wrapping the file in `<!-- -->`, and don't
comment out the `---` lines.** Hugo still counts a file hidden with
`<!-- -->`, so the machine totals come out one too high and the build
prints warnings. Commenting out a `---` breaks the build (see 4.5).

Radiation Hardening is parked the same way, along with the whole
Research area. To bring it back:

1. In `data/categories.yaml`, delete the `# ` from the front of each line
   of the Research block.
2. Renumber the areas so there's no clash: give Research `order: 1` and
   add 1 to every other area's `order`.
3. In `content/machines/radiation-hardening.md`, change `draft: true` to
   `draft: false`.

#### Where the numbers on the site come from

None of the numbers on the site are typed in by hand. Hugo counts them
every time the site builds:

| Number shown | Where it comes from |
|---|---|
| "All 18 machines" (homepage) and "18 machines" (top of `/machines/`) | Every file in `content/machines/` that is **not** `draft: true` |
| Machines per area / per Gen band | Machines whose `category:` matches that area's tracks |
| "6 areas" | Blocks in `data/categories.yaml` that aren't commented out |
| "2 generations" | Blocks in `data/generations.yaml` |
| 01, 02, 03… next to each area | That area's `order:` in `data/categories.yaml` |

So to change a number, change the content and the count follows. Two
rules keep the counts right:

- **To hide a machine, use `draft: true`. Don't wrap the file in
  `<!-- -->`.** Hugo ignores the HTML comment and still counts the file as
  a machine, just one with no title or category. The total goes up by
  one, but nothing new shows on the page, and `hugo server` prints
  "category is not a track name" warnings for that file.
- **Keep `order:` running 1, 2, 3… with no gaps.** It's printed as the
  area's number, so if you remove an area, renumber the ones after it.

### 4.8 "Mission" items

**Homepage section headings.** Each homepage section has one big title
with a short gold rule just to its left, on the same line, and no
numbered label: **Mission**, **The fab, machine by machine**,
**Advisors**, **Team**, **Partners & sponsors**. The title is the `"title"`
line where each section calls `section-head.html`: `mission.html`,
`machines.html`, `backing.html`, `officers.html`, `sponsors.html` in
`layouts/partials/`. The gold rule is always there. To add a small label
above the title, add an `"eyebrow" "…"` line there. In the fab section, areas are listed by name
only, without numbers or per-area machine counts.

`data/pillars.yaml` — the three numbered items on the homepage. Each is a
`title` and a `description`. Add or remove blocks freely; the numbering
updates itself.

### 4.9 Advisors section

The **Advisors** section on the homepage is the title, one intro sentence
(the `"lead"` line in `layouts/partials/backing.html`), and the advisor
cards.

The three cards that used to sit above the advisors (Lab space on campus,
College of Science and Engineering, Registered student organization)
have been removed from the page. Their text is still in
`data/backing.yaml`. To bring them back, restore the block that loops
over `hugo.Data.backing` in `backing.html` from git history.

**Faculty advisors** live in `data/advisors.yaml` — one block per person:

```yaml
- name: Jane Smith
  role: Faculty Advisor — Electrical & Computer Engineering
  bio: >-
    Works on radiation effects in CMOS. Helps the club with process
    advice and gets us access to characterization equipment.
  link: "https://cse.umn.edu/ece/jane-smith"
  photo: "/images/advisors/jane-smith.jpg"
```

| Field | Required? | Notes |
|---|---|---|
| `name` | yes | |
| `role` | yes | Title and department, one line |
| `bio` | no | Two or three sentences. Leave `""` to hide |
| `link` | no | Their faculty page, lab site, or LinkedIn. Leave `""` to hide |
| `linkLabel` | no | Text on the link button — see "The link button" below |
| `photo` | no | Leave `""` and the card shows their initials |
| `photoPosition` | no | Only if a photo crops badly — see below |

| To do this | Do this |
|---|---|
| **Add** an advisor | Copy a whole `- name:` block and edit it |
| **Remove** an advisor | Delete their block |
| **Hide** one temporarily | Put a `#` in front of each of their lines |
| **Reorder** them | Move blocks up or down — they appear in file order |

**The section resizes itself.** One or two advisors get wide cards; three
or more wrap into a grid. Add as many as you need — you don't have to
touch any layout code.

**Photos** go in `static/images/advisors/`. Name them lowercase with
hyphens and **no spaces**, and make sure the extension matches the real
file type (`file yourphoto.jpg` will tell you).

They're shown in a **3:4 portrait box, framed slightly above centre** —
which is where a face sits in a headshot. This matters: a small circle
cropped from the dead centre of a portrait cuts the top of the head
off, which is what the section used to do. Portrait orientation works
best (800 × 1200 is ideal); a square photo is fine; a wide landscape
photo will lose its edges.

If one photo still crops badly, add `photoPosition` to **that person
only**. It picks which part of the photo stays in the frame when the
edges are trimmed. It takes two values: **left→right**, then
**top→bottom**.

```yaml
photoPosition: "center top"   # very top; use if hair is clipped
photoPosition: "center 15%"   # the default
photoPosition: "center 40%"   # lower; use if the face sits low
photoPosition: "25% 0%"       # keep more of the LEFT side, top edge
photoPosition: "75% 0%"       # keep more of the RIGHT side, top edge
```

#### Centering a face that looks off to one side or cut off

The frame is taller than it is wide, so a square or wide photo has its
**sides** trimmed to fit. If the face isn't in the middle of the original, it
ends up pushed against one edge of the frame, which looks like it's
being cut.

1. Open the original photo and look at where the face is. Left of
   centre? Use a first value **below 50%**. Right of centre? **Above
   50%**. `50%` (or `center`) trims both sides equally.
2. Add `photoPosition` under that person's `photo:` line and preview.
   Adjust in steps of about 10–15% until the face sits in the middle.
3. For the second value, `0%` keeps the very top of the photo. A square
   photo already shows its full height, so for those the second value
   changes nothing. It only matters for tall photos.

**Example:** Scott Hareland's photo is a 171 × 171 square with his face
left of centre, so it's set to:

```yaml
  photo: "/images/advisors/Scott.jpeg"
  photoPosition: "25% 0%"
```

`photoPosition` can only choose what to keep. It can't add anything
that isn't in the file. If the top of someone's hair touches the top edge
of the **original** photo, it will touch the top of the frame too. The
fix for that is a better source photo: ask for a larger portrait
(ideally 800 × 1200) with some space above the head.

#### The link button

The button under an advisor's bio reads **Faculty page →**. If the
`link` goes to linkedin.com, it reads **LinkedIn page →**
automatically. For anything else, like a lab website, set the text
yourself:

```yaml
  link: "https://example.umn.edu/talghader-lab"
  linkLabel: "Lab website"
```

Officer photos work the same way (`data/officers.yaml`), except they're
circles rather than portrait boxes.

### 4.10 Officers — President, VP, and the rest

The "Team" section on the homepage comes from
`data/officers.yaml`. One block per person:

```yaml
- name: Jane Smith
  role: President
  major: "Electrical Engineering"
  email: "smith123@umn.edu"
  photo: "/images/officers/jane-smith.jpg"
```

| Field | Required? | What it does |
|---|---|---|
| `name` | yes | The person's name |
| `role` | yes | Their position — shown in small maroon type above the name |
| `major` | no | Degree program and/or year. Leave `""` to hide it |
| `email` | no | Makes a clickable mailto link. Leave `""` to hide it |
| `photo` | no | Leave `""` and their card shows their initials instead |

**To add an officer**, copy a whole `- name:` block and edit it. **To
remove one**, delete their block. **They appear in the order listed in the
file**, so keep President at the top and work down by seniority.

Photos go in `static/images/officers/` — see section 4.12.

The section hides itself entirely if the file is empty, so you can delete
everything in it without leaving a blank gap on the page.

> **Update this file at the start of each school year.** It's the part of
> the site that goes stale fastest. The file currently holds four
> placeholders (President / Vice President / Treasurer / Secretary) — the
> roles are probably right, the names definitely aren't.

#### System & Subsystem Leads

Under the officers, the Team section has a **System & Subsystem Leads**
subsection. It uses the same cards, filled from `data/leads.yaml`, with
the same fields as `officers.yaml` (`name`, `role`, `major`, `email`,
`photo`, `photoPosition`). Put what they lead in `role`, e.g.
`"Spinner — System Lead"` or `"RIE Gas Delivery — Subsystem Lead"`.

To add someone, copy a whole `- name:` block and edit it; to remove
someone, delete their block. Leads appear in file order. If the file ever
has no entries, the subsection shows "Coming soon." Someone who is both
an officer and a lead is listed in both files (reuse the same `photo`).

### 4.11 Sponsors

`data/sponsors.yaml` — one block per sponsor:

```yaml
- name: Ideal Vac
  description: Vacuum systems and components supporting our fabrication work.
  logo: "/images/sponsors/ideal-vac.png"
```

| To do this | Do this |
|---|---|
| **Add** a sponsor | Copy a whole `- name:` block and edit it |
| **Remove** a sponsor for good | Delete their block |
| **Take one off the site for now** | Put a `#` in front of each of their three lines |
| **Put a hidden one back** | Delete the `#` from the front of those lines |

That last pair is worth knowing. Commenting a sponsor out keeps their text
sitting in the file ready to restore, rather than making you retype it
later. **Basler is currently commented out this way** at the bottom of the
file — deleting the three `#` characters puts them straight back on the
site.

#### Adding a sponsor's logo

`logo` is optional:

- `logo: "/images/sponsors/ideal-vac.png"` — shows their **logo**, large,
  with the description under it. The company name is **not** repeated as
  text; it's used as the logo's alt text for screen readers.
- `logo: ""` — shows the sponsor's **name as text** instead, for a
  sponsor who hasn't sent a logo yet.

To add one:

1. Save the logo file into `static/images/sponsors/`, named in lowercase
   with hyphens and no spaces — `ideal-vac.png`, not `Ideal Vac.PNG`.
2. Point at it from `data/sponsors.yaml`, starting the path with
   `/images/sponsors/`:
   ```yaml
   logo: "/images/sponsors/ideal-vac.png"
   ```

**Keep the file reasonably small.** The site displays logos up to about
**96 pixels tall** (more on big monitors), so a huge image gains you
nothing and just slows the page down. A logo much smaller than that
(like the current `basler.png`, 238 × 148) will look soft. Aim for:

| | Recommendation |
|---|---|
| Format | **SVG** is ideal (stays sharp at any size). **PNG** otherwise |
| Background | **Transparent** — a white box around the logo looks wrong on the off-white cards |
| Size | At least **600 px wide** (or **200 px tall** for a squarer logo) |
| File size | Under **100 KB**. Most logos come in far under that |

[Squoosh](https://squoosh.app) will shrink a too-large PNG for free with
no visible quality loss. If all you have is a logo on a white background,
ask the company for a transparent version — most have one ready to send.

Wide logos and tall logos both work; the site scales them to fit the card
and never stretches or distorts them.

> The two files already in `static/images/sponsors/` (`ideal-vac.png` and
> `basler.png`) are grey **placeholder graphics**, not real logos. Replace
> them with the real thing before pointing any `logo:` field at them.

### 4.12 Images

Images go in `static/images/`. Anything in `static/` is served from the
site root, so a file at `static/images/lab/lab-photo.jpg` is referenced in
your text as `/images/lab/lab-photo.jpg`.

There's a subfolder for each kind of image, each containing a
`PUT-YOUR-PHOTOS-HERE.txt` explaining what's expected. Delete that text
file once you've added the real image.

| Image | Put it in | Then point at it from |
|---|---|---|
| Lab photo | `static/images/lab/` | `content/_index.md` → `labPhoto` |
| **Machine photos** | `static/images/machines/` | that machine's file → `photos` (section 4.5) |
| Advisor photo | `static/images/advisors/` | `data/advisors.yaml` → `photo` |
| Officer photo | `static/images/officers/` | `data/officers.yaml` → `photo` |
| Sponsor logo | `static/images/sponsors/` | `data/sponsors.yaml` → `logo` |

Two rules:

- **File names can't have spaces and are case-sensitive.** Use
  `lab-photo.jpg`, not `Lab Photo.JPG`.
- **Shrink photos before adding them** — under about 1–2 MB each. Phones
  produce files far larger than a website needs.
  [Squoosh](https://squoosh.app) does it for free with no visible quality
  loss.

**Machine photos** have their own guidance in section 4.5 — short version:
about 1600 px on the long edge, under 500 KB, landscape.

**Person photos** (advisors and officers) are cropped to a circle, so
square images work best — around 400 × 400 px is plenty, under about
500 KB each.

**Sponsor logos** have their own guidance in section 4.11 — short version:
SVG or PNG, transparent background, at least 600 px wide, under 100 KB.

### 4.13 Colors

In `hugo.toml`, under `[params.colors]`.

**`maroon` (#7A0019) and `gold` (#FFCC33) are the official University of
Minnesota brand colors.** Leave those alone unless the university updates
its brand guide.

**`violet` (#42245F) is sampled straight out of the club wafer logo.**
It's the secondary accent: maroon and gold tie the site to the
University, violet ties it to our own mark. It's used deliberately
sparingly, and always to mean the same thing:

| Where | Why |
|---|---|
| The **Gen 2** chip | Gen 1 is maroon, Gen 2 is violet — two generations, the site's two identity colours |
| Gen 2 divider rules and card borders | Carries the distinction past the chip |
| Subsystem numbers on machine pages | Puts the logo colour on the detail pages too |
| Text selection highlight | Beats the browser's default blue, which clashes with everything here |

Don't spread it further — it works *because* it's rationed. If violet
starts appearing on buttons and links, maroon stops being the primary
colour and the University connection weakens. At 11.5:1 contrast on the
page background it's safe for text at any size.

If you do change any color, you must also update the matching value at the
top of `static/css/styles.css`, in the `:root` block. That file is plain
CSS, not a Hugo template, so it can't read `hugo.toml` — the values are
duplicated there on purpose, and each one is labelled with the `hugo.toml`
key it should match.

`muted` (#474D49) is the grey used for all body copy. It's deliberately
dark — it clears WCAG AAA contrast against the paper background. Don't
lighten it; that's what made the old site's small text hard to read.

### 4.14 The club logo

**This is set up already.** The wafer mark is at
`static/images/logo/mnfc-wafer-logo.png` and wired up in `hugo.toml`:

```toml
logo = "/images/logo/mnfc-wafer-logo.png"
logoAlt = "Nanofabrication Club wafer logo"
```

It renders in the header (34 px), the footer (36 px), and the browser
tab, all from that one line.

**Note on the file:** the original export had a solid white square
behind the wafer, which showed as a visible box against the page. The
version in the project has that background removed and the padding
cropped, so it sits cleanly on any color. The white lines *inside* the
wafer are still white — they're part of the artwork. If you re-export
the logo, either export it with a transparent background or ask for the
same treatment again; don't just drop the raw file in, or the box comes
back.

**To swap in a different logo:**

1. Put the file in `static/images/logo/`.
2. Point `logo` at it in `hugo.toml`.

`.svg` is best — it stays sharp at any size. A `.png` works, but use a
**transparent background** and at least 256 px on the short side. Set
`logo = ""` to fall back to the plain "nF" square.

### 4.15 Machine documentation (the Google Sheet)

> ### ⚠️ This is built but switched OFF.
>
> Machine pages currently show **Background**, **Design
> architecture**, and **Documentation** (plus Documentation photos),
> but not the Sheet-driven sections below. Everything below is wired
> up and dormant — turn it on whenever you're ready, or ignore it.
>
> **To switch it on:**
> 1. Set up the Sheet (see below).
> 2. Uncomment `docsSheetId` in `hugo.toml` and paste in the ID.
> 3. In `.github/workflows/deploy.yml`, uncomment the two sync steps
>    and the `schedule:` block, and change `contents: read` to
>    `contents: write`.
> 4. Optionally uncomment the "Documentation in progress" block near
>    the bottom of `layouts/machines/single.html`.
>
> **To preview it first**, without any of that:
> ```
> cp scripts/sample-data/*.json data/sheets/
> hugo server
> ```
> Then look at `/machines/wet-etch/`. That data is invented — see
> `scripts/sample-data/README.txt`. Empty `data/sheets/*.json` back to
> `[]` when you're done.

Every machine page can carry six sections: **Background, Design
architecture, Timeline, Bill of materials, Who built it, and Reference
material.** Four of those come from one Google Sheet that you edit
directly — no code, no pull requests.

**Each section hides itself when it has no data**, so with the Sheet
switched off the extra sections simply don't appear.

#### First-time setup

Follow `scripts/sheet-template/HOW-TO-SET-UP-THE-SHEET.txt`. In short:
make a Sheet with five tabs, import the matching `.csv` from that
folder into each one to get the headers right, share it with "Anyone
with the link", and paste its ID into `docsSheetId` in `hugo.toml`.

#### The tabs

| Tab | Columns |
|---|---|
| `specs` | machine · label · target · current |
| `timeline` | machine · date · milestone · status · note |
| `bom` | machine · part · qty · supplier · partNumber · unitCost · status · link · note |
| `contributors` | machine · name · workedOn · year |
| `references` | machine · title · type · url · note |

**Every row needs `machine` filled in with that machine's slug** — the
filename in `content/machines/` without the `.md`, e.g. `wet-etch`.
That's the only thing that has to be exact. Get it wrong and the row
appears nowhere; the sync prints a warning naming any slug it doesn't
recognise, so check the workflow log if something's missing.

Values that mean something:

- `timeline.status` → `done` · `active` · `planned`
- `bom.status` → `have` · `ordered` · `needed`
- `references.type` → `datasheet` · `paper` · `cad` · `buildlog` · `vendor` (anything else groups under "Other")
- `bom.unitCost` → a plain number (`42.00`, not `$42.00`) so the totals
  add up. Non-numeric values are shown as-is and left out of the sum.

Timeline rows render **in sheet order**, so drag rows to reorder them.
The `date` column is optional.

#### Getting your edits onto the site

The site is static — it's built once and served as plain files, so it
can't read the Sheet live. After editing:

> Repo → **Actions** tab → *Deploy site to GitHub Pages* → **Run workflow**

About two minutes. It also refreshes on its own every six hours, so
this is only for when you want a change live now.

#### How it works underneath

`scripts/sync-sheets.py` pulls each tab, writes it to `data/sheets/*.json`,
and commits that. The site is built from the committed copy, which means
two useful things: if Google is unreachable during a deploy the last good
data is still there, and every BOM or timeline change shows up as a git
diff. **Don't hand-edit `data/sheets/` — the next sync overwrites it.**

#### The two things the Sheet can't hold

**Background prose** lives in the markdown body of the machine's own
file in `content/machines/`. A spreadsheet cell is a miserable place to
write paragraphs. Edit it on github.com with the pencil icon — it's
about as hard as editing a wiki.

**The Documentation section** is the same idea — see 4.16.

**Architecture diagrams** are image files. Put them in
`static/images/machines/` (you can drag and drop onto the folder on
github.com) and list them in the machine's front matter:

```yaml
architectureDiagrams:
  - src: "/images/machines/spinner-circuit-diagram.jpg"
    caption: "How the motor is driven."
  - src: "/images/machines/spinner-layout.jpg"
    caption: "Where everything physically sits."
```

Add as many as you need — circuit diagram, mechanical layout, process
flow. They stack down the page and each one links to the full-size
file, which is how a schematic's small labels actually get read.

> **YAML has no duplicate keys.** Writing `architectureDiagrams:` twice,
> or two `- src:` lines at the same indent without their own `-`, stops
> the whole site building with
> `mapping key … already defined`. Add entries to the one list instead.

You can also link a machine's whole Drive folder for anything too big
or raw to put on the page — CAD, full datasheets, unedited photos:

```yaml
driveFolder: "https://drive.google.com/drive/folders/…"
```

#### The example rows

The sample `wet-etch` rows used to build the layout now live in
`scripts/sample-data/`, out of the site's way. **They're invented** —
made-up part numbers, costs, and names. Copy them into `data/sheets/`
to preview the layout; each section shows an amber "Example data"
notice while they're in place, and the real sync overwrites them.

### 4.16 The Documentation section

This is where students write up **how to actually run and maintain a
machine** — setup, procedure, recipes, cleanup, what to do when it
misbehaves. It sits on the machine's page, right after Design
architecture.

It lives in the machine's own file in `content/machines/`, so writing
it means editing one file — the pencil icon on github.com is enough,
no local setup:

```yaml
documentationUpdated: "September 2026"
documentation: |
  ## Setup

  1. Check the chuck is seated and the vacuum line is connected.
  2. Switch on at the back, wait for the display.

  ## Recipes

  | Resist | Spin speed | Time | Thickness |
  |---|---|---|---|
  | AZ 1512 | 3000 rpm | 30 s | 1.4 µm |

  > Never open the lid while the chuck is spinning.
```

#### The one thing to get right

The `|` after `documentation:` means "everything indented below is one
block of text". **Every line inside has to be indented two spaces
further than `documentation:` itself.** If a line drifts back to the
left margin, the build fails with a YAML error naming the line.

That's the only fiddly part. Everything else is ordinary markdown.

#### What renders

| Write | Get |
|---|---|
| `## Heading` | a section heading |
| `1.` / `-` | numbered and bulleted lists |
| `**bold**` | **bold** |
| `` `3000 rpm` `` | inline code, in the typewriter face |
| ```` ``` ```` fenced block | a dark code block, for anything copied verbatim |
| `\| a \| b \|` rows | a table, for recipes and measured values |
| `> text` | a gold callout, for hazards and gotchas |

#### How the write-up is laid out

You write plain markdown. The page turns its structure into a designed
layout automatically (`layouts/partials/doc-writeup-rich.html`):

| You write | The page shows |
|---|---|
| `## Timeline` | A new numbered section (01, 02, …) with a divider above it |
| `### Anything` under a `##` | A white card on a vertical timeline line, one card per `###` |
| `### Week 3: Core assembly` | A small maroon **WEEK 3** label above the title "Core assembly". Also works for `Weeks 1–2:`, `Day 4:`, `Stage 1:`, `Phase 2:`, `Step 5:` |
| `- **Milestone**: Assembly complete.` | A gold "MILESTONE" callout box |
| `- **STOP-GATE**: Wait for parts.` | A maroon "STOP-GATE" callout box |
| A table | A framed table with a shaded header that scrolls sideways on phones |
| `---` on its own line | Nothing. The sections are already separated, so it's hidden |

With three or more `##` headings (or, if there's only one `##`, three or
more `###`), an **On this page** menu appears down the left on wide
screens.

So the best structure is: one `##` per big topic (Summary, Timeline,
Schedule Summary, References), and one `###` per step, phase, or
subsystem inside it. A summary table should get its own `##`, not a
`###`, or it will show up as a step on the timeline.

**Keeping the old single-column look:** add
`documentationLayout: "plain"` to a machine's file. No machine uses it
right now; every page, the Maskless Litho Stepper included, gets the
sectioned layout.

**The "On this page" menu** lists the write-up's `##` headings (for
example Project Overview, Timeline, Schedule Summary, Expected Outcome)
and jumps to each one when clicked. It stays in view while you scroll.
To make a heading show up in it, give it its own `##` line.

#### New lines, indenting, and pasted text

**Pressing Enter once does not start a new line on the site.** Markdown
joins lines that sit next to each other into one paragraph. So text
pasted straight from a Google Doc or Word, one item per line, comes out
as a single run-on paragraph. Each line needs to be told what it is:

| You want | Write |
|---|---|
| A new paragraph | Leave a **blank line** between the two lines |
| A new line, same paragraph | End the first line with a backslash `\` |
| A heading for a stage | `### Stage 1: …` on its own line |
| Items under that heading | Start each line with `- ` |
| An item indented under another | Put `- ` **two spaces further in** than the item above |
| Back to the outer level | Start the next `- ` at the outer indent again |
| A two-column summary | A table (see "What renders" above) |

A stage-by-stage timeline, for example:

```yaml
documentation: |
  ## Timeline

  ### Pre-Semester System Planning and Supplier Outreach
  - **Timeline:** Week 1
    - Milestone: Get approved for the main funding.

  ### Stage 1: Component, CAD, and Prototype Verification
  - **Timeline:** Weeks 2–4
    - Milestone: Make a 3D model of the etcher system.

  ### Stage 2: System Assembly
  - **Mechanical Assembly:** Weeks 4–7
  - **Tubing and Gas Dynamics:** Weeks 7–8

  | Stage | Timeline |
  |---|---|
  | Pre-Semester Planning | Week 1 |
  | Component, CAD, and Prototype Verification | Weeks 2–4 |
```

Things to watch:

- **Line everything up with the first line under `documentation: |`.**
  Pasted text often brings extra spaces at the start of every line.
  Delete them, so the text starts at the same column as `## Timeline`.
  The only extra indent should be the two spaces for a nested `- ` item.
  Markdown can turn a line with four or more extra spaces into a code
  box.
- **Every line, including blank ones, still sits inside the
  `documentation:` block.** Keep at least the two-space indent on every
  line (see "The one thing to get right" above).
- **Don't leave a stray `|` at the end of a line.** A line with pipes in
  it can be read as part of a table. Use `|` only in real table rows.

`documentationUpdated` is optional and shows as "Updated …" beside the
section. Worth filling in — a procedure nobody has touched in two years
should look like one.

#### Machines with nothing written yet

**The section appears on every machine regardless.** Where nothing
has been written, it shows a short "Not written up yet" card naming
the exact file to edit. An explicit "nobody has done this" is more
useful to a student looking for a job than the section quietly not
existing.

**Every machine file already has the template in it, commented out.**
Open the file, delete the leading `#` from the `documentation:` lines,
and write. Nothing to copy from elsewhere.

> `spinner` currently holds a **starter template** rather than a real
> procedure — it's there to show the formatting. Replace it; don't
> leave guessed steps on a page someone might follow.

#### Documentation photos

Photos and figures that go with the write-up get their own section,
**Documentation photos**, directly below Documentation. List them in the
machine's file, anywhere between the two `---` lines (next to
`documentation:` is tidiest):

```yaml
documentationPhotos:
  - src: "/images/machines/microplotter.jpg"
    caption: "Figure 1: SonoPlot Microplotter [SonoPlot's patent US 7,849,738 B]."
  - src: "/images/machines/microplotter2.jpg"
    caption: "Figure 2: Fluid deposition via ultrasonic pumping."
```

- Put the image files in `static/images/machines/`. Start `src` with
  `/images/machines/`. Don't include `static`.
- **Images are never cropped.** Each one is scaled down to fit inside its
  frame, so labels and edges stay visible. One photo shows on its own;
  two or more sit in a two-column grid, all frames the same height so a
  row lines up.
- Each photo links to the full-size file ("Full size ↗"), for figures
  with small print.
- `caption` is optional.
- With no `documentationPhotos:` the section doesn't appear. When it
  does, a **Photos** pill is added to the jump bar.
- The layout lives in `layouts/partials/doc-photos.html`.

This is separate from `photos:` (4.5), which shows pictures of the
machine itself near the top of the page.

#### Moving it higher up the page

The order of sections on a machine page is set by the order of the
blocks in `layouts/machines/single.html`. Right now it runs: header →
**Overview** → photos → Background (only for machines with no Overview) →
Design architecture → **Documentation** → Documentation photos →
timeline, BOM, contributors, references → other machines in the same
track. It's the same template for every machine, so one change moves
the section on all of them.

To put Documentation higher, for example straight after the header and
before Background:

1. Open `layouts/machines/single.html` and find this line:
   ```
   {{ partial "doc-writeup.html" . }}
   ```
2. Cut it and paste it where you want the section to appear. To go
   before Background, paste it just above the line
   `{{/* ---------- Background (the markdown body of the machine's file) ---------- */}}`.
   Paste it **between** blocks, never inside one: not between an
   `{{ if … }}` or `{{ with … }}` and its matching `{{ end }}`.
3. Move the matching jump-bar link so the pills at the top list the
   sections in the same order as the page. Near the top of the same
   file, the `$nav` lines build that list in order. Move this one:
   ```
   {{ $nav = $nav | append (dict "id" "documentation" "label" "Documentation") }}
   ```
   to the same position. To go before Background, put it just above
   the line containing `"id" "background"`.
4. Run `hugo server` and check a machine page.

If you move Documentation, move the `{{ partial "doc-photos.html" . }}`
line (just below it) and its `"id" "documentation-photos"` jump-bar line
along with it, so the photos stay under the write-up.

The section itself is in `layouts/partials/doc-writeup.html`. You only
need that file to change how it looks, not where it sits.

In that file the section is laid out top to bottom: the **Documentation**
title across the top (with `documentationUpdated` shown as "Updated …" on
the right), a one-line description under it, then the write-up starting
at the left edge of the page. The write-up is capped at `max-w-3xl`
(about 48rem) so lines stay a comfortable length to read. Change that
class to `max-w-4xl` or remove it to let the text run wider.

(The homepage sections are ordered by the lines in `layouts/index.html`.
The old "Technical documentation" box, `layouts/partials/docs.html`, is
currently switched off; see 4.2.)


### 4.17 Overview pages (the illustrated write-up)

**Every machine page opens with an Overview.** It's the first thing a
visitor sees under the title: a heading and intro, a big diagram, a row
of key numbers, then sections that alternate text and pictures,
numbered process steps, and references. It's the same layout the
Maskless Litho Stepper was designed with. The detailed, student-written
**Documentation** (4.16) comes further down the page.

Each machine's Overview is **one file**:

```
data/overviews/<machine>.yaml
```

The name must match the machine's file in `content/machines/` exactly:
`tube-furnace.md` → `data/overviews/tube-furnace.yaml`. There's no HTML
to edit. Delete the file and the Overview disappears. Every machine
already has one, including the hidden (draft) ones.

#### Step by step: editing a machine's Overview

1. **Open the file.** On github.com, go to `data/overviews/`, click the
   machine's file, then the pencil icon. Or open it in VS Code.
2. **Edit the text in place.** Text after `text: |` or `intro: |` is
   markdown: **bold**, [links](https://…), lists, and `> ` callouts
   all work. Leave a blank line between paragraphs.
3. **Keep the indentation.** Every line under `text: |` stays indented
   two spaces further than the word `text`. This is the only rule that
   breaks the build if you get it wrong. The error names the line.
4. **Preview.** Run `hugo server` and open the machine's page (see
   section 2), or commit on github.com and check the live site a minute
   later.

#### Step by step: adding a picture

1. **Put the image file in `static/images/machines/`.** You can use a
   subfolder per machine, like `static/images/machines/tube-furnace/`.
   Use lowercase, hyphens, no spaces: `coil-winding.jpg`.
2. **Point to it from the Overview**, starting the path with
   `/images/` and leaving out `static`:

   ```yaml
   sections:
     - title: "How it's built"
       text: |
         The coil is wound around the quartz tube…
       image: "/images/machines/tube-furnace/coil-winding.jpg"
       caption: "Figure 2: The Kanthal coil before cementing."
   ```

3. Number captions in order: Figure 1 is the hero diagram, then Figure
   2, 3, … down the page.

Images are never cropped, and each one links to its full-size file. A
section with an image shows text and picture side by side, and the sides
swap on every section automatically. A section with no image shows its
heading on the left and text on the right.

**Pictures only show once per page.** If an image used in the Overview
is also listed under `architectureDiagrams:` or `documentationPhotos:`
in the machine's own file, it's skipped in those lower sections. If that
leaves a section empty, the section and its jump-bar pill disappear
too.

#### Step by step: an Overview for a new machine

1. Create the machine first (4.5).
2. Copy a similar machine's Overview file, for example
   `data/overviews/probe-station.yaml`, and rename the copy to the new
   machine's file name.
3. Replace the content, block by block, top to bottom (the parts are
   described below). Delete any block you don't have content for yet;
   it just won't show.
4. Preview and commit.

#### The parts of an Overview file

All parts are optional. They appear on the page in this order:

```yaml
title: "Kanthal Tube Furnace"      # big heading under "Overview"

intro: |                           # 2–4 sentences: what it is, why it matters
  The tube furnace heats wafers to around 1000 °C…

hero:                              # the big diagram under the intro
  src: "/images/machines/tube-furnace-layout.jpg"
  caption: "Figure 1: …"

highlights:                        # 3 or 4 key-number boxes
  - value: "1100 °C"               # keep it short: a number and a unit
    label: "Design maximum temperature"

sections:                          # the main content, one block each
  - title: "Thermal oxidation"
    text: |
      Paragraphs in markdown.
    image: "/images/…"             # optional
    caption: "Figure 2: …"         # optional
    imageSide: "left"              # optional: "left" or "right" (see 4.18)
  # for several pictures in one section, use this instead of image:
  #   images:
  #     - src: "/images/…"
  #       caption: "…"

process:                           # numbered step cards
  title: "Build plan: four weeks from order to 1100 °C"
  intro: |                         # optional
    One short paragraph.
  steps:                           # 3–6 steps read best (up to 10 work)
    - title: "Design & order"
      text: "One short sentence."
  images:                          # optional figures under the steps
    - src: "/images/…"
      caption: "…"

references:                        # links shown at the bottom
  - title: "Hacker Fab — DIY RF sputtering chamber"
    url: "https://…"
```

What goes where:

| Part | Use it for | Tip |
|---|---|---|
| `intro` | What the machine does and why the lab needs it | Readers decide here whether to keep reading |
| `highlights` | The 3–4 numbers that define the machine | They **replace** the spec boxes under the page title, so the same values don't show twice |
| `sections` | How it works, how it's built, safety, team | 2–5 sections. One idea per section |
| `process` | How it's used (the steps of a run), or the build plan | Cards line up best with 3, 4, 5, 6, or 8 steps |
| `references` | Papers, datasheets, videos, build logs | Titles like "Source — what it is" |

**Overview or Documentation?** The Overview is the polished summary that
anyone can read in two minutes. The Documentation section (4.16) is the
working detail: week-by-week schedules, procedures, recipes, and
troubleshooting. When a big milestone lands, update both: the Overview's
numbers and steps, and the Documentation's timeline.

**Stick to what's true.** Only put numbers in `highlights` that the
team has measured or designed to. If it's a target, say so in the label
("Target feature size").

#### Behind the scenes

- The layout is `layouts/partials/doc-overview.html`.
- Markdown images (`![Caption](/images/…)`) are turned into framed
  figures by `layouts/_default/_markup/render-image.html`.
- `layouts/partials/overview-srcs.html` lists the Overview's images so
  lower sections can skip repeats.
- When an Overview exists, `layouts/machines/single.html` hides the
  Background section and the fallback spec boxes (`doc-specs.html`).
- The Maskless Stepper's figures were pulled out of the club's *[Master]*
  PDF at full resolution into `static/images/machines/maskless-stepper/`.

### 4.18 Moving an image on a machine page

Images aren't placed by dragging. **An image shows up wherever its
lines sit in a file**, so moving an image means cutting its lines and
pasting them somewhere else. These are all the places an image can
live on a machine page. Find the one it's in now, then pick where it should go.

| Where it shows on the page | Which file | What the lines look like |
|---|---|---|
| **Overview**: the big diagram under the intro | `data/overviews/<machine>.yaml` | `hero:` → `src:` + `caption:` |
| **Overview**: beside a section's text | `data/overviews/<machine>.yaml` | `image:` + `caption:` inside a `sections:` block |
| **Overview**: under the numbered steps | `data/overviews/<machine>.yaml` | `images:` inside `process:` |
| **Design architecture** | `content/machines/<machine>.md` | `architectureDiagrams:` list |
| **Inside the Documentation text** | `content/machines/<machine>.md` | `![Caption](/images/…)` in the `documentation:` block |
| **Documentation photos** (below the write-up) | `content/machines/<machine>.md` | `documentationPhotos:` list |
| Near the top, under the title | `content/machines/<machine>.md` | `photos:` list |

After any move, run `hugo server` and check the page (section 2).

#### Swap an Overview image to the other side

Section images alternate automatically: the first section's image is on
the **right**, the second's on the **left**, and so on. To pin one
section's image to a side, add `imageSide:` under its `caption:`:

```yaml
  - title: "Vacuum, gas, and power"
    text: |
      The chamber has to reach high vacuum…
    image: "/images/machines/DCMagnSub.jpg"
    caption: "Figure 2: Early subsystem sketches…"
    imageSide: "right"          # or "left"
```

Only that section changes. The shaded and white background bands keep
alternating. On phones, the text always comes first and the image below
it, whatever the side.

#### Move an image to a different Overview section

1. In `data/overviews/<machine>.yaml`, find the `image:` line and the
   `caption:` line under it (and `imageSide:` if there is one).
2. Cut those lines.
3. Paste them into the other section, **under that section's `text:`
   block**, lined up with its `title:` (four spaces in):

   ```yaml
     - title: "Control and safety"
       text: |
         A thermocouple is inserted radially…
       image: "/images/machines/tube-furnace/controller.jpg"
       caption: "Figure 3: The PID controller and SSR."
   ```

4. If both sections should have a picture, you don't have to move
   anything: add `image:` and `caption:` to the second one.
5. Renumber the "Figure N" captions so they run in order down the page.

**Two or more images in one section:** use `images:` instead of
`image:`. They stack top to bottom in the order listed, so reordering
the list reorders the pictures:

```yaml
    images:
      - src: "/images/machines/spinner-layout.jpg"
        caption: "Figure 2: Layout."
      - src: "/images/machines/spinner-circuit-diagram.jpg"
        caption: "Figure 3: Circuit."
```

#### Move a whole section (text and image together)

Sections appear in the order they're listed under `sections:`. Cut the
whole block, from its `- title:` line down to just before the next
`- title:`, and paste it where you want it. The image travels with it.
Because sides alternate, moving a section can flip which side its image
is on. Add `imageSide:` if it matters.

#### Make an image the big one at the top (the hero)

1. Cut its `src` path and caption from wherever it is now.
2. Paste them under `hero:`, near the top of the Overview file:

   ```yaml
   hero:
     src: "/images/machines/tube-furnace-layout.jpg"
     caption: "Figure 1: …"
   ```

3. Only one image can be the hero. Move the old hero into a section
   (see above), or delete it.

#### Move an image into or out of the Overview

- **From Design architecture or Documentation photos into the
  Overview:** you don't have to delete it from the machine's file. Add
  it to the Overview (hero, a section, or the process), and it's
  **automatically left out** of the lower section, so it only appears
  once. If that leaves the lower section empty, the section and its
  jump-bar pill disappear.
- **Out of the Overview, back down the page:** delete its lines from
  the Overview file. If it's still listed under `architectureDiagrams:`
  or `documentationPhotos:`, it reappears there by itself.

#### Put an image in the middle of the Documentation text

To show a picture at an exact spot in a write-up (next to the step it
belongs to, for example), put a markdown image line there:

```yaml
documentation: |
  ## Timeline

  ### Week 3: Core Mechanical & Thermal Assembly
  ![Figure 2: The coil after winding, before cementing.](/images/machines/tube-furnace/coil.jpg)

  - **Days 1–2**: Cement the tube's wound zone…
```

- The text in `[ ]` becomes the caption. The path goes in `( )`.
- Keep the line indented like the rest of the block (see 4.16), with a
  blank line after it.
- It shows as a framed figure that links to the full-size file, the same
  as images elsewhere on the page. This also works in the Background
  text and in any Overview `text: |` block.
- **The file name can't contain spaces** in this form. Rename
  `Coil Photo.jpg` to `coil-photo.jpg` first.
- To move it, cut the line and paste it somewhere else in the block.

#### Reorder Design architecture or Documentation photos

Both are lists in the machine's file in `content/machines/`. They show
in list order: top of the list = first on the page. Cut a `- src:` line
and the `caption:` line under it (if any) and paste them higher or
lower in the list.

```yaml
architectureDiagrams:
  - src: "/images/machines/spinner-layout.jpg"        # shows first
    caption: "Physical layout…"
  - src: "/images/machines/spinner-circuit-diagram.jpg"
    caption: "Motor control…"
```

Keep the `- src:` lines lined up with each other, and each `caption:`
two spaces further in than its `- src:`.

#### Crop an image (trim a black bar, border, or extra space)

The site **never crops images**. It always shows the whole file, so
labels and edges don't get cut off. That also means anything unwanted
at the edge of a picture (a black bar from a screenshot, a window
border, too much white space) shows on the page too. The fix is to crop
the image file itself, then point the page at the cropped file.

**Example:** the probe station drawing,
`static/images/machines/Nanofab probe station.png`, had a black bar
down its right edge, left over from a screenshot. The bar was cut off
and the result saved as `static/images/machines/probe-station-concept.png`.
In `content/machines/probe-station.md`, the `photos:` entry now points
at the new file. The original was left alone, so nothing is lost.

**On a Mac (Preview):**

1. Open the image in Preview.
2. Drag a box over the part you want to **keep**. If you don't get a
   box, choose Tools → Rectangular Selection first. Zoom in
   (<kbd>⌘</kbd> <kbd>+</kbd>) to line the edge up exactly.
3. Tools → **Crop** (<kbd>⌘</kbd> <kbd>K</kbd>).
4. File → **Export…** and save it under a **new name**: lowercase,
   hyphens, no spaces, for example `probe-station-concept.png`. Save it
   into `static/images/machines/`. Exporting instead of saving keeps the
   original as it was.

**On Windows (Photos):** open the image, click **Edit image** (or
<kbd>Ctrl</kbd> <kbd>E</kbd>), choose **Crop**, drag the edges in, then
**Save as copy** with a new lowercase-hyphen name.

**Then point the page at the new file.** Find the old path in the
machine's file (`content/machines/<machine>.md`) or its Overview
(`data/overviews/<machine>.yaml`) and change it:

```yaml
photos:
  - src: "/images/machines/probe-station-concept.png"
```

Tips:

- **Keep a small margin.** Stop the crop a few pixels short of the
  drawing, so its edge doesn't touch the frame on the page.
- **Check the whole edge.** A bar can be dark only part of the way down.
  Zoom out and look at all four edges before exporting.
- **Delete the original only when you're sure.** If it's not in git yet,
  deleting it means it's gone. If nothing on the site uses it anymore,
  it's safe to remove.
- **On github.com only?** You can't crop there. Download the image,
  crop it as above, and upload the new file into `static/images/machines/`
  with **Add file → Upload files**.

#### What you can't change from these files

- **Size.** Images always fit the width of their column and are never
  cropped. Overview figures stop at about 28rem tall, Documentation
  photos sit in fixed-height frames. To change those limits, edit
  `max-h-[28rem]` in `layouts/partials/doc-overview.html`, `h-80
  sm:h-96` in `layouts/partials/doc-photos.html`, or `.md-figure-frame
  img` in `static/css/styles.css`.
- **Image above or below the text in an Overview section.** Sections
  are always side by side on wide screens. For a picture on its own,
  full width, make it the hero, or put it in the `process:` `images:`.
- **Which sections exist and their order on the page** (Overview,
  Architecture, Documentation…). That's the template; see "Moving it
  higher up the page" in 4.16.

#### If an image doesn't show

- The path must start with `/images/` and leave out `static`.
- Capitals must match exactly: `Coil.JPG` and `coil.jpg` are different
  files once the site is published.
- The file has to actually be in `static/images/…`. On github.com,
  upload it into that folder first.
- A YAML error naming a line usually means the pasted lines are
  indented differently from their neighbours.

---

## 5. Publishing the site

You publish once. After that, every update is "save, commit, push" and the
live site updates itself within a minute or two.

### 5.0 Pre-flight checklist

Before the site goes public, check off every one of these:

- [ ] `hugo.toml` → `discordURL` is your real Discord invite
- [ ] `hugo.toml` → `linkedinURL` and `instagramURL` are real
- [ ] `hugo.toml` → `contactEmail` is an address you actually check
- [ ] Every machine's `status` reflects reality (section 4.6)
- [ ] `data/advisors.yaml` has your real advisors, or is empty
- [ ] `data/officers.yaml` has your real officers, or is empty
- [ ] `data/sponsors.yaml` lists only companies who have actually agreed
- [ ] A real photo is at `static/images/lab/lab-photo.jpg`
- [x] `hugo.toml` → `logo` points at the club wafer mark (section 4.14)
- [ ] The RSO disclaimer is still in the footer (section 9) — required
- [ ] If you want a University mark on the site, you have the official
      **Block M RSO** mark and it sits in the footer block, not the
      header (section 9)
- [ ] Your Student Unions & Activities advisor has looked over the site
      for branding compliance (section 9)

Then run a final check:

```
hugo --minify
```

If that finishes with no errors, you're good. (It writes the finished site
into `public/`, which you can ignore — your host builds it for you.)

### 5.1 Put the site in its own Git repository

Publishing works by pushing your files to GitHub. Because your home folder
is itself a Git repository, this folder needs to become its own separate
repo — otherwise Git gets confused about which one you mean.

From inside the site folder:

```
cd ~/Documents/umn-nanofab-website
git init
git add .
git commit -m "Initial commit of club website"
git branch -M main
```

`git init` creates a repository covering only this folder. The `.gitignore`
file already tells Git to skip `public/` and the other generated files, so
only your real source files get committed.

### 5.2 Push it to GitHub

Create an **empty** repository on GitHub — don't let it add a README,
license, or .gitignore, since you already have those files:

- **In a browser:** go to [github.com/new](https://github.com/new), name it
  something like `umn-nanofab-website`, choose Public, and click **Create
  repository** without ticking any of the "Initialize this repository"
  boxes.
- **Or with the [GitHub CLI](https://cli.github.com):**
  `gh repo create umn-nanofab-website --public --source=. --push`
  (this does the next step too).

Then connect and push — skip this if you used the `gh` command:

```
git remote add origin https://github.com/YOUR-USERNAME/umn-nanofab-website.git
git push -u origin main
```

> **Put this on a club account, not a personal one.** Members graduate. If
> the repo lives on one student's personal GitHub, the site becomes
> unmaintainable the moment they leave. Create a free
> [GitHub organization](https://github.com/organizations/plan) for the club
> and put the repo there, so officers can be added and removed over time.

### 5.3 Turn on GitHub Pages — recommended

This repo already contains `.github/workflows/deploy.yml`, which tells
GitHub how to build the site. You just have to switch it on:

1. Go to your repository on github.com.
2. **Settings** → **Pages** (in the left sidebar).
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.

That's it. Open the **Actions** tab and you'll see the build running. When
it turns green — usually under a minute — your site is live at:

```
https://YOUR-USERNAME.github.io/umn-nanofab-website/
```

The workflow sets the site's address automatically, so you do **not** need
to change `baseURL` in `hugo.toml` for this to work.

**Keep the Hugo version in sync.** Open `.github/workflows/deploy.yml` and
check that `HUGO_VERSION` matches what `hugo version` prints on your
machine. If GitHub builds with a much older Hugo than you use locally, your
preview and the live site can drift apart.

### 5.4 Or use Netlify — the simpler alternative

If you'd rather not deal with GitHub Actions, Netlify is more
point-and-click, and this repo already includes a `netlify.toml` so there's
nothing to configure:

1. Sign up at [netlify.com](https://netlify.com) (free) with your GitHub
   account.
2. **Add new site** → **Import an existing project** → pick your repo.
3. Netlify reads `netlify.toml` and fills in the build settings itself.
   Click **Deploy**.

You get a URL like `random-name-12345.netlify.app`, which you can rename
under **Site settings → Change site name**.

Netlify also builds a preview of every pull request at its own temporary
URL — handy if you want another officer to review a change before it goes
live.

Pick **one** of GitHub Pages or Netlify, not both. If you go with Netlify
you can delete `.github/workflows/deploy.yml`; if you go with Pages you can
delete `netlify.toml`.

### 5.5 Using a custom domain

Both hosts support custom domains for free. You still pay for the domain
itself, roughly $10–15/year.

- **GitHub Pages:** Settings → Pages → Custom domain, then add the DNS
  records GitHub shows you at your domain registrar.
- **Netlify:** Site settings → Domain management → Add custom domain.

**If you want a `umn.edu` address** such as `nanofab.umn.edu`, you can't
set that up yourself — university subdomains are issued by UMN IT and
normally have to be requested through your faculty advisor or department.
Ask your advisor first. If that isn't available, an ordinary domain works
perfectly well; just make sure the footer still links back to umn.edu,
which it does by default.

Whichever you pick, update `baseURL` in `hugo.toml` to the final address
once it's set up:

```toml
baseURL = "https://nanofab.example.org/"
```

Keep the trailing slash.

### 5.6 Updating the site after it's published

This is the whole loop from here on:

```
# 1. Make your edits, with `hugo server` running so you can see them.
# 2. Stop the server (Ctrl+C), then:

git add .
git commit -m "Mark tube furnace as operational"
git push
```

Within a minute or two the live site updates itself. You never run `hugo`
by hand and you never upload files anywhere.

To see what you changed before committing, `git status` lists the files and
`git diff` shows the actual edits.

---

## 6. Troubleshooting

| Symptom | Cause and fix |
|---|---|
| `hugo: command not found` | Hugo isn't installed, or your terminal was already open when you installed it. Close the terminal, open a new one, try again. Otherwise redo step 1.2. |
| A machine doesn't appear anywhere | Look at the terminal running `hugo server` — a `MACHINE SETUP` warning will name the file and the problem. Nearly always its `category:` doesn't exactly match a `name:` in `data/categories.yaml`. Copy-paste the name rather than retyping it. |
| `failed to unmarshal YAML` error | Indentation. You used a tab instead of spaces, or a list item isn't lined up with its siblings. The error names the file and line. |
| Text after a colon breaks the build | Wrap the whole value in quotes: `summary: "Etching: the basics"`. |
| An image doesn't show up | The path must start with `/images/…`, the filename is case-sensitive, and it can't contain spaces. |
| Browser shows old content | Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows). |
| Works locally but links break once published | `baseURL` doesn't match the real address. On GitHub Pages the workflow handles this — check you set **Source: GitHub Actions**, not "Deploy from a branch". |
| The deploy fails on GitHub | Open the **Actions** tab and click the red run. The error is usually in the last few lines of the log. A mismatched `HUGO_VERSION` is a common cause. |
| You broke something and want to undo it | If you haven't committed: `git checkout -- path/to/file`. If you have: `git revert HEAD`. With Git, nothing is ever permanently lost. |

---

## 7. Changing the design itself

Everything above covers content. If you want to reorder sections, add a
brand-new section, or change how something looks, that lives in `layouts/`:

- `layouts/index.html` — the order sections appear on the homepage.
  Reordering the lines here reorders the page.
- `layouts/partials/` — one file per homepage section (`hero.html`,
  `sponsors.html`, `footer.html`, …). Regular HTML with
  [Tailwind](https://tailwindcss.com) classes, plus `{{ }}` tags where
  content gets pulled in from `data/`, `content/`, or `hugo.toml`.
- `layouts/machines/list.html` — the `/machines/` index page.
- `layouts/machines/single.html` — the template every individual machine
  page is rendered through. Change it once and every machine page changes.
  The order of the blocks in it is the order of the sections on the page
  (see 4.16, "Moving it higher up the page").
- `layouts/partials/machine-card.html` — the clickable machine box. Every
  machine button on the site uses this one file, so editing it changes
  them all together.
- `layouts/partials/track-column.html` — one Gen 1 or Gen 2 column.
- `layouts/partials/logo.html` — the club logo, with the `nF` fallback.
- **Linking to an image or page from a template:** write
  `{{ strings.TrimPrefix "/" (.photo) | relURL }}`, not `{{ .photo }}` or
  `{{ .photo | relURL }}`. On GitHub Pages the site lives in a subfolder
  (`…github.io/nanofab_web/`). Hugo's `relURL` only adds that subfolder
  when the path *doesn't* start with `/`, and every image path in the
  content starts with `/images/…`. Without the `TrimPrefix`, the image
  loads from the wrong place and shows as broken on the live site, even
  though it looks fine in `hugo server`. Menu links (`.URL` in
  `header.html`) and `.RelPermalink` already include the subfolder, so
  use those as they are.
- `static/css/styles.css` — the handful of things Tailwind can't do: the
  readability baseline, the blueprint grid, the hero animation, the
  card hover effects, and the hero photo's full-bleed edge.

You don't need to touch any of this for routine updates.

Before editing a layout, commit your current work
(`git add . && git commit -m "…"`) so you can always get back to a version
that worked.

---

## 8. Text and readability

Small grey text was the main thing making the old version hard to read.
A few rules keep it from creeping back in.

**The typefaces.** All three are one superfamily, loaded in
`layouts/partials/head.html`:

| Used for | Font | Tailwind class |
|---|---|---|
| Headings | Fraunces | `font-display` |
| Body text | Libre Franklin | `font-body` |
| Numbers, spec values, small labels | Courier Prime | `font-mono` |

These are picked for **character, not neutrality**:

- **Fraunces** is an old-style serif with a `WONK` axis — angled,
  hand-cut alternates that make the headings look drawn rather than
  generated. It's tuned in `styles.css` under `.font-display`
  (`SOFT` softens the terminals, `WONK 1` turns the alternates on;
  set `WONK` to 0 for a straighter look).
- **Libre Franklin** is a Franklin Gothic revival, so the body copy
  reads institutional and newspapery instead of like a product UI.
- **Courier Prime** is a real typewriter face. It suits a lab notebook
  better than a coding mono does. It runs light, so everything set in
  it is bumped to weight 700 in `styles.css` — don't remove that or
  the small labels go weak.

**Avoid Inter, Space Grotesk, Geist, and JetBrains Mono.** That
combination is the house style of nearly every AI and developer-tool
site, and it's what made this site look generic in the first place.

**Where the sizes come from.** `static/css/styles.css` sets a baseline:
body copy at 17.5 px / 1.65, and floors on Tailwind's two smallest text
sizes so nothing on the site renders below 13 px. If text ever feels
small overall, change the `font-size` in the `body` rule there rather
than editing templates one by one.

**Big monitors.** Every size on the site is in `rem`, and the "BIG
SCREENS" rule near the top of `styles.css` makes `1rem` grow on screens
wider than 1440 px: about 18 px on a 1920 px monitor, about 22 px on a
2560 px one (capped there). Text, spacing, and the content column all
scale together, so the page fills a big screen instead of sitting in a
narrow strip down the middle. Change the `0.005` in that rule to make
big screens larger or smaller overall. Phones and laptops (up to 1440
px) are unaffected.

- **Write new sizes in `rem`, not `px`** (e.g. `text-[0.9375rem]`, not
  `text-[15px]`), or they won't scale on big monitors. Divide px by 16.
- On screens 1800 px and wider, the hero lab photo stops running off the
  right edge and sits inside the content column with rounded corners.
- The circuit drawing in the hero only appears in the empty left margin
  on screens 1280 px and wider, so it never runs behind the text.

**A gotcha worth knowing.** Tailwind's CDN build injects its stylesheet
into `<head>` *after* `styles.css` loads. So a plain `.text-xs { … }` in
our file loses to Tailwind's own `.text-xs` — same specificity, and
Tailwind comes last. That's why those rules are written as
`html .text-xs { … }`. **Keep the `html ` prefix** on anything meant to
override a Tailwind utility, or it will silently do nothing.

**Font weights:** use Tailwind's names — `font-semibold` (600) and
`font-bold` (700). `font-600` and `font-700` are *not* real Tailwind
classes; they look plausible but generate no CSS at all.

**When you write copy for the site:**

- **One idea per sentence.** If a sentence has two "and"s in it, it's
  probably two sentences.
- **Say the plain word.** "Cuts into the wafer" beats "effects material
  removal from the substrate."
- **Machine summaries are one sentence.** They're what someone reads
  before deciding whether to click. Two at the absolute most.
- **Expand an abbreviation the first time** you use it on a page.
- **Keep the bulleted and numbered lists.** They're easier to scan than
  a paragraph, and the layout is built around them.

**Don't** lighten `muted`, shrink a `text-xs` further, or put light grey
text on the white cards. Those are the three changes that quietly undo
all of this.

### Making something look clickable

Every machine box on the site — the cards on `/machines/` and the rows on
the homepage — is marked as clickable three ways at once, before anyone
hovers it:

1. **A visible outline**, in a maroon tint rather than plain grey.
2. **A pointer cursor.**
3. **On the homepage rows only, a different shade** — they're filled
   with `--tile` (a light maroon wash, set in `static/css/styles.css`)
   so they stand out against the white panel they sit in. The big cards
   on `/machines/` stay white; they have the room to carry the message
   with an outline and a hover lift instead.

On hover the outline goes full maroon, a gold bar wipes in, the box
lifts, and — on the rows — the fill deepens to `--tile-hover`.

There are deliberately **no arrow glyphs** on these. If you add a new
kind of clickable box, reuse `.machine-card` or `.machine-row` rather
than inventing a fourth look.

---

## 9. UMN branding rules — read this one

This section is about staying out of trouble with the University, not
about design. A registered student organization (RSO) operates under
tighter trademark rules than a department does.

### What the University actually requires

**You may not use University trademarks.** That covers the wordmark, the
Block M, Goldy, Ski-U-Mah, Row the Boat, and homemade imitations of any
of them. The one exception is the official **"Block M RSO" mark**.

**Your name may not start with "University of Minnesota", "UMN",
"U of M", or "Gopher".** You *may* say you're *at* the University of
Minnesota. So:

| Not allowed | Allowed |
|---|---|
| UMN Nanofabrication Club | Nanofabrication Club at the University of Minnesota |
| Gopher Nanofab | Nanofabrication Club |

This is why `title` in `hugo.toml` is
`"Nanofabrication Club at the University of Minnesota"` and the header
shows `Nanofabrication Club` with `at the University of Minnesota`
underneath.

**This exact sentence has to appear on your public platforms** — the
website, Instagram, LinkedIn, all of it:

> This group is a Registered Student Organization and is independent
> from the University of Minnesota.

It's stored once, in `hugo.toml` under `[params.umn]` as
`rsoDisclaimer`, and rendered at the bottom of the footer on every page.
**Don't reword it, and don't remove it** — the footer is now the only
place it appears.

**You also may not** use University marks in a way that suggests the
University endorses a political or religious position, a product, or a
company; or in connection with alcohol, tobacco, firearms, or gambling.

### Where a University mark is allowed to go

This is the part that trips people up, so it's worth being exact.

> **For print or web:** use the Block M RSO mark or Goldy RSO mark at
> the bottom of the piece, separate from your student logo or name, and
> it must be accompanied by the disclaimer.

Three conditions, all required together:

| | |
|---|---|
| **Which mark** | Block M RSO or Goldy RSO — *not* the wordmark, plain Block M, or Goldy |
| **Where** | The bottom of the page, on its own, away from the club logo and name |
| **With what** | The disclaimer, right there next to it |

That's why the mark slot is the **last block in the footer**, below a
rule, with the disclaimer beside it — and why the club logo stays up in
the header, far away from it. Don't lock the two up together.

> **For stationery:** only a Recognized Student Governance Association
> (MSA, COGS, PSG), with permission from the Office for Student Affairs,
> may use University trademarks. A regular RSO may not. This club is an
> RSO, not a governance association.

### The wordmark files are in the project but unused

`UMN_horizontal-digital.svg` and `UMN_horizontal-reversed-digital.svg`
(in `static/images/logo/`) are the full University wordmark — Block M
plus "University of Minnesota", with the ® on it. They're kept because
they were downloaded, but **nothing on the site renders them.**

That's deliberate. The wordmark is a registered University trademark,
and an RSO may only use the RSO marks — and even those belong at the
bottom of the page, not in a header.

There used to be a maroon University bar above the site header. **It has
been removed**, along with the `headerWordmark` setting that could have
put the wordmark in it. The University links that lived there (umn.edu
and the college) are now in the footer, as plain text links, which is
fine — words are not trademarks.

If you ever want a University mark on the site, the answer is the
**Block M RSO mark in the footer block**, not a wordmark at the top.

### Getting the official RSO mark

The Block M RSO mark is **not** on the public logo-download page — that
page needs a University staff login and doesn't carry the RSO version.
You have to request the file:

1. Read the guidelines:
   <https://umarcomm.umn.edu/resources/registered-student-organization-brand-guidelines>
2. Ask **Student Unions & Activities** (your RSO advisor there is the
   fastest route) or **University Marketing Communications** for the
   Block M RSO mark files.
3. When the file arrives, put it in `static/images/logo/` and set, in
   `hugo.toml` under `[params.umn]`:

   ```toml
   rsoMark = "/images/logo/block-m-rso.svg"
   ```

   It appears in the footer block automatically — the bottom of the
   page, next to the disclaimer, which is where the rule says it goes.

**Use it whole and unaltered.** Don't recolor it, crop it, stretch it, or
lock it up next to the club logo — all of those break the guidelines.

### What's safe to keep using

- **Maroon (#7A0019) and gold (#FFCC33)** — colors aren't trademarks.
  These are fine.
- **Plain text links** to `umn.edu` and `cse.umn.edu`.
- **Saying you're a student organization at the University of
  Minnesota**, in words.

### Still to check

Before you launch publicly, run the site past your Student Unions &
Activities advisor. They review RSO materials regularly and will catch
anything this section missed. Nothing here is legal advice — it's a
summary of the published guidelines as of September 2026.

**Sources:**

- [Registered Student Organization Brand Guidelines](https://umarcomm.umn.edu/resources/registered-student-organization-brand-guidelines)
- [Brand Policy: Trademarks, Logos, Colors, and Seal](https://policy.umn.edu/operations/branding)
- [Logo Download (staff login required)](https://umarcomm.umn.edu/resources/logo-download)
