# MN NanoFab — design language

Binding reference for anyone (human or agent) touching this site's
front end. Read it before writing markup, CSS or copy. If something
here conflicts with what you were asked to build, follow this file and
say so in your report.

**This is revision 2. It reverses two rules from revision 1: the site
is no longer dark, and small mono labels are no longer the house
voice. If you remember those rules, forget them.**

---

## 1. The idea

**The site is an instrument, not a brochure.** A student club building
a semiconductor fab out of ordinary lab space.

The reference is **SpaceX**: huge type, full-bleed photography of the
real hardware, almost no interface, and very few words. Confident
because it is specific, not because it is loud.

**Light, not dark.** Warm paper ground, black type, real photographs
shown bright. The futuristic quality comes from scale, space and
restraint — never from a dark theme, neon, or glow.

**The single message is "Build the Fab."**

## 2. The deletion rule

This is the most important section. The site is being cut down, hard.

> **Every element must carry information that appears nowhere else on
> the page. If it repeats something, decorates something, or labels
> something already obvious — delete it.**

Apply it to words first, then to graphics. When you are unsure, delete.
It is easier to add one thing back than to notice ten things that
should have gone.

**Delete on sight:**

- Section "lead" paragraphs that restate the heading.
- Eyebrows, kickers, and `01`/`02` index numerals used as decoration.
- Any count shown twice on one page — pick the one place it means most.
- Taglines *and* descriptions on the same object. Keep one.
- Registration marks, corner ticks, measure rules, crosshairs,
  decorative rules — all of it. A rule is allowed only when it
  separates two things that would otherwise be confused.
- Contents/index panels that duplicate the headings below them.
- Breadcrumbs that repeat what the page title already says.
- Keyboard legends, helper text, captions stating the obvious.
- "Learn more", "Explore", "Read the docs" where the thing itself is
  already a link.

**Copy, specifically.** Cut every sentence to the shortest form that
is still true. Fragments are good. Prefer three words to a sentence,
and a word to three.

- Not "Four bands divide the work: two generations of the process
  line, the chemistry the line runs on, and the room around it. Every
  machine below opens its own build documentation." → **"Four bands.
  Nineteen machines."** or nothing at all.
- Not "Simple, proven tools aimed at one outcome: a first working
  device, end to end, on our own equipment." → **"First working
  line."**
- Not "Professor Cho has been advising the club since its founding,
  his research focuses on semiconductor devices including 3D micro-
  and nano-structures, and more information can be found on his
  website listed below." → **"Semiconductor devices. 3D
  nano-structures."**

No hype words: supercharge, unlock, seamless, revolutionary,
cutting-edge, empowering, journey, passionate. No exclamation marks.
It is fine to say something is not built yet.

## 3. Type — nothing small

**The previous revision of this site was full of 11px labels. That was
wrong. There is now a hard floor.**

| Role | Size | Notes |
|---|---|---|
| Hero statement | `clamp(3.5rem, 12vw, 9rem)` | Fraunces, `tracking-tight` |
| Section heading | `clamp(2.5rem, 5vw, 4rem)` | Fraunces |
| Sub-heading | `1.5rem`–`2rem` | Fraunces |
| Body | **`1.1875rem` (19px)** | Libre Franklin, `leading-relaxed` |
| Secondary text | **`1.0625rem` (17px) minimum** | |
| Label / mono | **`0.9375rem` (15px) minimum** | see below |
| Legal / footer fine print | **`0.9375rem` (15px) floor** | |

**Nothing on this site renders below 15px. No exceptions.** If a label
does not survive at 15px, the label was not needed — delete it.

Three families, already loaded. **Do not add or swap fonts.** Never
Inter, Space Grotesk, Geist or JetBrains Mono — that set is the house
style of every AI product page.

- **Fraunces** (`font-display`) — headings. Tight tracking.
- **Libre Franklin** (`font-body`) — everything else.
- **Courier Prime** (`font-mono`) — **rare now.** Revision 1 used mono
  markings everywhere and it became noise. Mono is for genuine machine
  data only: a status word, a count, a spec value. Not for section
  labels, not for eyebrows, not for nav. Tracking drops to `0.08em` —
  the old `0.18em` marking style is retired.

Headings do not end in periods.

## 4. Color

Tokens live in `hugo.toml [params.colors]`, reaching Tailwind via
`layouts/partials/head.html`. Use token names, never raw hex.

| Token | Use |
|---|---|
| `paper` `#F4F3F0` | the ground for the whole site |
| `surface` `#FFFFFF` | raised panels, sparingly |
| `ink` `#14181C` | all body text |
| `muted` | secondary text — must still pass contrast at 17px |
| `line` | hairlines |
| `maroon` `#7A0019` | **the only accent.** Links, hover, emphasis |
| `signal-green` / `signal-amber` | build status only |

- **One accent.** If something needs emphasis and is not a link, give
  it size or space, not another color.
- `gold` is demoted: status and small emphasis only, never a fill
  behind text, never decorative rules.
- `void` tokens survive only for the footer. Nothing else is dark.
- `violet`, `blueprint` and `faint` are retired. Do not use them.

## 5. Photography

Photographs of the real lab are the main visual, and they are shown
**bright and legible**. The hero is a photograph of the fab, full
bleed, and you must be able to see the room.

- No global darkening. No heavy scrim. Revision 1 pushed the hero
  photo to 50% brightness and it read as a dark theme — that is
  exactly what we are undoing.
- Mild correction is fine: slight desaturation, slight contrast.
- If white type will not sit on the photograph, **move the type**,
  place it on the paper ground, or apply a scrim to the smallest
  possible region — do not dim the whole image.
- Figures and diagrams render on `surface` with a hairline, no frame
  decoration.

## 6. Geometry, space and scroll

- **Corners square.** `rounded-none`. 2px is the absolute maximum, and
  needs a reason.
- **No `box-shadow` anywhere.** `system.css` enforces this globally.
- No gradients, glassmorphism, blur, or glow. The one permitted
  exception is the top bar's scrolled background.
- **Scroll must feel continuous.** Sections flow into one another on
  the same ground. Do not box sections, alternate background tints, or
  stack bordered panels — those read as separate pages glued together.
  One vertical rhythm down the whole document: `py-28` mobile,
  `py-40` desktop, and the same left margin everywhere so content
  edges line up as you scroll.
- Full-bleed photography is the only thing that may break the measure.
- Content max width `max-w-6xl`; prose `max-w-2xl`.

## 7. Motion

- 200–300ms, `ease-out`. Only `opacity`, `transform`, `width`.
- No bounce, spring, parallax, or scroll-jacking.
- `prefers-reduced-motion: reduce` must disable transitions and stop
  any marquee outright.

## 8. Structure

Four bands, defined in `data/bands.yaml` — the top level of the
homepage, the menu, `/machines/` and search:

| Band | Second level |
|---|---|
| Gen 1 | patterning, doping, deposition, metrology |
| Gen 2 | patterning, deposition, metrology, application |
| ChemE R&D | flat |
| Logistics | flat |

Machines declare `band:` and (Gen 1 / Gen 2 only) `process:` in front
matter. **Never hard-code band or machine lists** — read
`hugo.Data.bands` and filter `site.RegularPages`. Adding a machine must
mean editing exactly one markdown file.

Build state vocabulary: `operational`, `building` ("In build"),
`planned`, via `layouts/partials/status.html`.

## 9. CSS ownership

Tailwind runs from the CDN, configured in `head.html`. Component CSS
is split one file per area so concurrent work never collides. Write
only into your own file.

| File | Owns |
|---|---|
| `static/css/styles.css` | legacy, loaded first; leave alone |
| `static/css/system.css` | tokens, resets, shared primitives |
| `static/css/shell.css` | top bar, full-screen menu, search |
| `static/css/hero.css` | hero |
| `static/css/bands.css` | band section, machines index |
| `static/css/people.css` | team, advisors |
| `static/css/doc.css` | machine documentation pages |
| `static/css/footer.css` | footer, sponsors |

Prefer Tailwind utilities in markup; use the CSS file for what the CDN
build cannot express (`:has()`, keyframes, reduced motion, multi-element
hover).

## 10. Accessibility

- Visible focus ring on every interactive element: 1px `maroon`
  outline, 2px offset.
- The 15px floor in §3 is partly an accessibility rule. Keep it.
- Full-screen menu traps focus, closes on `Esc`, works without JS.
- Real `alt` on content images; `aria-hidden` on decorative marks —
  though after §2 there should be almost no decorative marks left.
- Never rely on color alone: status pairs a mark with a word.
