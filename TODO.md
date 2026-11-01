# Needs a human

Everything on the site that is a placeholder, a guess, or waiting on a
decision. Tick items off as they're done, and delete this file when it's
empty. How to make each change: [EDITING.md](EDITING.md).

## Settings (`hugo.toml`)

- [x] **`docsURL`**: the club's docs,
      `https://minnesota-nanofabrication-club.github.io/nano-book/`.
- [x] **`contactEmail`**: now `nanoclub@umn.edu`. Confirm the address exists
      and someone reads it. It is behind "Get in touch" and "Become a
      sponsor".
- [ ] **`heroTitle` / `heroLead`**: the new headline is "Bare wafer to working
      chip." Keep it or replace it.
- [ ] **`heroImage` / `ogImage`**: both use the old lab photo
      (`/images/lab/nf-lab-web.jpg`). A wide, current photo of the lab
      would be better. It is shown greyscale and darkened.
- [ ] **`rsoMark`**: empty. Request the official Block M RSO mark (README,
      "Getting the official RSO mark"), add the file, and set the path.
- [ ] **`googleSiteVerification`**: empty. Optional; only needed for Google
      Search Console.
- [x] **`calendarID`**: set to the club's public Google Calendar; /events/
      shows the month grid from its iCal feed (README, "Events and the
      calendar"). Optional: **`calendarAPIKey`** for live updates instead
      of every 6 hours.
- [x] **`incubatorFormURL`**: set to the Incubator interest form, behind
      "Propose a project" at the bottom of /machines/.

## Machines (`content/machines/`)

- [ ] **Photos for every card.** All 23 cards show a placeholder line
      drawing. Each lead adds `image: "/images/machines/<file>.jpg"` once
      the machine exists (EDITING.md, "Add a photo to a machine card").
- [ ] **Write-ups.** These published machines have no text below their
      front matter, so their card says "No write-up here yet":
  - [ ] Cleanroom Microenvironment
  - [ ] Computer Vision Metrology
  - [ ] Dopant Synthesis
  - [ ] Electron Microscope
  - [ ] Hot Plate
  - [ ] Polymer Synthesis
  - [ ] Probe Station
  - [ ] PVD & Vacuum
  - [ ] Reactive Ion Etcher
  - [ ] Spin-On Doping
  - [ ] Ultrasonic Cleaner
  - [ ] Wafer Arm
  - [ ] Wafer Stage Alignment Firmware
- [ ] **No lead on the card.** Nobody in `data/leads.yaml` matches these, so
      their cards show no "Lead":
  - [ ] Hot Plate
  - [ ] Spin-On Doping
  - [ ] Wafer Arm
  - [ ] Cleanroom Microenvironment
- [ ] **Hidden drafts.** These have `draft: true` and don't appear anywhere.
      Publish (delete the line) or delete the file:
  - [ ] Developer Station
  - [ ] Photoresist Stripper
  - [ ] Radiation Hardening
  - [ ] Wet Etch
- [ ] **Statuses.** Check every `status:` (`planned` / `building` /
      `operational`). The homepage counts "in build" from them.

## Blog (`content/blog/`)

- [ ] **Write the first real post.** The blog is empty on the live site, so
      the homepage hides its blog section until a post is published.
- [ ] **Delete `a-new-website.md`**, the example post (kept as a draft), once
      you've used it as a model.

## Prose review (written with AI help; check before going public)

Much of the site's wording was drafted with an AI assistant. Read it as
an officer would and fix anything that sounds generic, overclaims or
just isn't true.

- [ ] **Blog post dates are wrong.** `first-meeting.md` (2026-09-10) and
      `cleaning-out-the-fab.md` (2026-10-17) use placeholder dates. The
      first general meeting was in **October** (the calendar has the
      kickoff on Oct 23, 2026). Set both `date:` lines to the real days.
- [ ] **Fill in the blog posts' editor notes** (`{{</* note */>}}` blocks):
      turnout, room, photos, names. Until then the posts are generic.
- [ ] **Homepage statement**: "Most people learn nanofabrication from a
      textbook. We learn it by building the fab ourselves." Keep or
      rewrite.
- [ ] **Process flow text** (`data/process.yaml`): have a process lead
      check each step's `text` and `details` for accuracy (temperatures,
      chemicals, which machine does what).
- [ ] **Join page and invitation panels**: check the promises ("No fab
      experience needed", "any major or year") are what the club wants
      to say.
- [ ] **General sweep**: look for filler, repeated sentence shapes, and
      anything that reads like marketing rather than a student club.

## People and sponsors (`data/`)

- [ ] **`officers.yaml` / `leads.yaml`**: confirm everyone is current. `major`
      and `email` are blank for everyone; fill them in only if you want
      them shown.
- [ ] **`sponsors.yaml`**: confirm each description says what that sponsor
      actually does with the club.

## Documentation site (the club's `nano-book`)

- [ ] **Publish the New member onboarding page.** The stub is in the staging
      docs (`beastr45/nano-book_staging`, `src/new-member-onboarding.md`).
      Until the club's `nano-book` has it, "Read the onboarding guide" on
      /join/ is a dead link.
- [ ] **Write the onboarding page and the machine pages.** All are stubs
      except the sputterer and the trebuchet.

## Join page (`content/join/_index.md`)

- [ ] **Check the four steps** say how joining actually works (Discord,
      picking a project, asking its lead, the onboarding guide), and the
      lead line ("Open to every University of Minnesota student, any major
      or year. No fab experience needed.").

## Before going public

- [ ] Run the site past the Student Unions & Activities advisor (README,
      "UMN branding rules → Still to check").
