# UMN Nanofabrication Club — Website

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
   - [4.8 "What we do" items](#48-what-we-do-items)
   - [4.9 Support cards and advisors](#49-support-cards-and-advisors)
   - [4.10 Officers — President, VP, and the rest](#410-officers--president-vp-and-the-rest)
   - [4.11 Sponsors](#411-sponsors)
   - [4.12 Images](#412-images)
   - [4.13 Colors](#413-colors)
5. [Publishing the site](#5-publishing-the-site)
6. [Troubleshooting](#6-troubleshooting)
7. [Changing the design itself](#7-changing-the-design-itself)

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
│       └── …               (13 machines)
├── data/
│   ├── categories.yaml     ← the 6 process modules machines are grouped into
│   ├── pillars.yaml        ← the 3 items under "What we do"
│   ├── backing.yaml        ← the cards under "Backed by the University"
│   ├── advisors.yaml       ← faculty advisor names, roles, photos
│   ├── officers.yaml       ← President, VP, Treasurer, Secretary…
│   └── sponsors.yaml       ← "Partners & sponsors"
├── static/
│   ├── css/styles.css      ← a small amount of custom CSS
│   └── images/             ← lab, machine, officer, advisor, sponsor images
├── archetypes/
│   └── machines.md         ← the blank template for a new machine page
├── layouts/                ← page templates (see section 7)
├── .github/workflows/      ← automatic publishing (see section 5)
└── netlify.toml            ← alternative publishing config (see section 5)
```

### Quick lookup

| I want to change… | Edit this |
|---|---|
| The big headline on the homepage | `content/_index.md` → `title` |
| The paragraph under the headline | `content/_index.md` → `heroSubhead` |
| The "What we do" intro paragraph | `content/_index.md` → `missionIntro` |
| The lab photo or its caption | `content/_index.md` → `labPhoto`, `labPhotoCaption` |
| The 3 "What we do" items | `data/pillars.yaml` |
| Discord / LinkedIn / Instagram / email / docs links | `hugo.toml` → `[params]` |
| umn.edu / CSE links | `hugo.toml` → `[params.umn]` |
| The nav links at the top | `hugo.toml` → `[[menu.main]]` blocks |
| Site colors | `hugo.toml` → `[params.colors]` (+ `static/css/styles.css`) |
| **Anything about a machine** | that machine's file in `content/machines/` |
| The 6 process categories | `data/categories.yaml` |
| "Backed by the University" cards | `data/backing.yaml` |
| Advisor names and photos | `data/advisors.yaml` |
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
title: "UMN Nanofabrication Club"
heroSubhead: "A student-led effort to build a functional nanofabrication lab…"
missionIntro: "Our current project is building a working nanofabrication lab…"
labPhoto: "/images/lab/lab-photo.jpg"
labPhotoCaption: "Our lab space on campus."
---
```

Edit the text inside the quotes. `title` is the big headline.

### 4.2 Discord / email / social / docs links

Open `hugo.toml`, near the top under `[params]`:

```toml
discordURL   = "https://discord.gg/your-invite-code"
linkedinURL  = "https://www.linkedin.com/company/your-org-here"
instagramURL = "https://www.instagram.com/your-handle-here"
contactEmail = "umn-nanofab-club@umn.edu"
docsURL      = "https://your-docs-site.example.com"
```

Change a URL once here and it updates everywhere it appears — the nav
button, the hero, the footer, and the bottom of every machine page.

**These are all placeholders right now.** Replace them before publishing.

### 4.3 University of Minnesota links

Also in `hugo.toml`, under `[params.umn]`. These feed the maroon UMN bar
at the top of every page and the "University of Minnesota" column in the
footer.

The one you need to update is `gopherLinkURL` — point it at the club's
actual listing in UMN's student org directory once you're registered. The
rest (umn.edu and the College of Science and Engineering) are
already correct.

### 4.4 The top navigation menu

At the bottom of `hugo.toml`:

```toml
[[menu.main]]
  name = "What we do"
  url = "/#mission"
  weight = 10
```

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
title: "Tube Furnace"                    # the machine's name
category: "Thermal Processing & Doping"  # MUST match data/categories.yaml
step: "Oxidation & Anneal"               # the process step it performs
weight: 10                               # order within its category
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

Everything below the closing --- is the "How it works" section.
Plain paragraphs, blank line between them. **Bold** and
[links](https://umn.edu) work.
```

#### Four things to know

- **`category` must match exactly.** The valid names are in
  `data/categories.yaml`. Copy and paste — don't retype. If it doesn't
  match, the machine silently won't appear anywhere. This is the single
  most common mistake.
- **`weight` orders machines within their category.** Use 10, 20, 30… so
  you can slot something in between later without renumbering everything.
- **`specs` and `subsystems` are lists** — add or delete as many entries
  as you want. Leave `specs` out entirely and the boxes just won't show.
- **Delete a machine** by deleting its file. Nothing else to update.

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
**500 KB** per file. Landscape photos (wider than tall) look best, since
the site crops to a consistent height in grid view. Phone photos are much
bigger than needed — [Squoosh](https://squoosh.app) shrinks one for free
with no visible quality loss.

Photos appear between the specs boxes and the "How it works" text, so
someone landing on the page sees what the machine looks like before they
read about it.

#### The site checks your work

If you get any of this wrong, the terminal running `hugo server` tells you
straight away. Misspell a category and you'll see:

```
WARN  MACHINE SETUP — content/machines/thermal-evaporator.md: category
"Lithografy" is not in data/categories.yaml, so this machine will NOT
appear anywhere on the site. Valid categories are: Wafer Preparation &
Cleaning | Lithography | Etch & Pattern Transfer | …
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

> **All 13 machines are currently set to `building` as a placeholder.**
> Go through them and set real values. This is the most genuinely useful
> information on the site, and it's what visitors and prospective sponsors
> actually look at.

### 4.7 Process categories

`data/categories.yaml` defines the six process modules that machines group
into. They follow how a real fab is organized — by process module, in the
order a wafer moves through them.

```yaml
- name: Lithography
  order: 2                # sequence on the page + the number shown
  slug: lithography       # used for #links; lowercase, no spaces
  description: >-
    Printing the pattern. A light-sensitive polymer is coated onto…
```

To add a category, copy a block and give it an unused `order`. **If you
rename a category, update the `category:` line in every machine file that
pointed at it** — otherwise those machines disappear.

### 4.8 "What we do" items

`data/pillars.yaml` — the three numbered items on the homepage. Each is a
`title` and a `description`. Add or remove blocks freely; the numbering
updates itself.

### 4.9 Support cards and advisors

**The cards** under "Backed by the University" live in `data/backing.yaml`.
Each has a `title`, a `description`, and an optional `url` (leave it as
`""` and the "Visit →" link just won't render).

**Faculty advisors** live in `data/advisors.yaml` — one block per person:

```yaml
- name: Jane Smith
  role: Faculty Advisor, Electrical Engineering
  photo: "/images/advisors/jane-smith.jpg"
```

| To do this | Do this |
|---|---|
| **Add** an advisor | Copy a whole `- name:` block and edit it |
| **Remove** an advisor | Delete their block |
| **Hide** one temporarily | Put a `#` in front of each of their lines |
| **Reorder** them | Move blocks up or down — they appear in file order |

Leave `photo: ""` if you don't have one yet. Their card shows their
initials instead, so the page still looks intentional rather than broken.

> The file currently holds **three placeholders** — `Advisor Name`,
> `Second Advisor`, and `Third Advisor`. Replace the names and roles with
> your real advisors, or delete any block you don't need.

### 4.10 Officers — President, VP, and the rest

The "Who runs the club" section on the homepage comes from
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

- `logo: ""` — shows the sponsor's **name as text**. This is what all
  sponsors do right now.
- `logo: "/images/sponsors/ideal-vac.png"` — shows their **logo** instead.

To add one:

1. Save the logo file into `static/images/sponsors/`, named in lowercase
   with hyphens and no spaces — `ideal-vac.png`, not `Ideal Vac.PNG`.
2. Point at it from `data/sponsors.yaml`, starting the path with
   `/images/sponsors/`:
   ```yaml
   logo: "/images/sponsors/ideal-vac.png"
   ```

**Yes — keep the file small.** The site displays logos at about **40
pixels tall**, so a huge image gains you nothing and just slows the page
down. Aim for:

| | Recommendation |
|---|---|
| Format | **SVG** is ideal (stays sharp at any size). **PNG** otherwise |
| Background | **Transparent** — a white box around the logo looks wrong on the off-white cards |
| Size | Roughly **400 × 120 px**, or whatever keeps it about 3× wider than tall |
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
SVG or PNG, transparent background, about 400 × 120 px, under 100 KB.

### 4.13 Colors

In `hugo.toml`, under `[params.colors]`.

**`maroon` (#7A0019) and `gold` (#FFCC33) are the official University of
Minnesota brand colors.** Leave those alone unless the university updates
its brand guide.

If you do change any color, you must also update the matching value at the
top of `static/css/styles.css`, in the `:root` block. That file is plain
CSS, not a Hugo template, so it can't read `hugo.toml` — the values are
duplicated there on purpose, and each one is labelled with the `hugo.toml`
key it should match.

---

## 5. Publishing the site

You publish once. After that, every update is "save, commit, push" and the
live site updates itself within a minute or two.

### 5.0 Pre-flight checklist

Before the site goes public, check off every one of these:

- [ ] `hugo.toml` → `discordURL` is your real Discord invite
- [ ] `hugo.toml` → `linkedinURL` and `instagramURL` are real
- [ ] `hugo.toml` → `docsURL` points at your real documentation site
- [ ] `hugo.toml` → `contactEmail` is an address you actually check
- [ ] `hugo.toml` → `[params.umn] gopherLinkURL` is your real org listing
- [ ] Every machine's `status` reflects reality (section 4.6)
- [ ] `data/advisors.yaml` has your real advisors, or is empty
- [ ] `data/officers.yaml` has your real officers, or is empty
- [ ] `data/sponsors.yaml` lists only companies who have actually agreed
- [ ] A real photo is at `static/images/lab/lab-photo.jpg`

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
  `sponsors.html`, `umn-bar.html`, `footer.html`, …). Regular HTML with
  [Tailwind](https://tailwindcss.com) classes, plus `{{ }}` tags where
  content gets pulled in from `data/`, `content/`, or `hugo.toml`.
- `layouts/machines/list.html` — the `/machines/` index page.
- `layouts/machines/single.html` — the template every individual machine
  page is rendered through. Change it once and all 13 pages change.
- `static/css/styles.css` — the handful of things Tailwind can't do: the
  blueprint grid, the hero animation, the hover effects.

You don't need to touch any of this for routine updates.

Before editing a layout, commit your current work
(`git add . && git commit -m "…"`) so you can always get back to a version
that worked.
