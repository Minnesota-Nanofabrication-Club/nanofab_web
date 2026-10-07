// NOTE: line comments, not a /* block */. The glob below contains the
// sequence that ends a block comment, which silently truncated this
// header and made the file unparseable by the Tailwind CLI.
// Mirrors the inline `tailwind.config` that layouts/partials/head.html used to
// hand to the Tailwind Play CDN (v3.4.17), so the prebuilt static/css/tailwind.css
// is byte-for-byte equivalent to what the CDN generated in the browser.
//
// NOTE: these hex values used to be interpolated from hugo.toml [params.colors]
// by Hugo. They are now literals here. If you re-theme, change both places.
//
// Regenerate (needs network once, for npx):
// hugo -d public                      # emit every class Hugo can produce
// npx tailwindcss@3.4.17 -c tailwind.config.js \
// -i tailwind-input.css -o static/css/tailwind.css
//
// The `public/**/*.html` glob is the important one: Hugo conditionals such as
// {{ if ... }}text-ink{{ else }}text-muted{{ end }} are only resolved in the
// built output. static/js is also scanned because site.js injects a <p> with
// Tailwind classes ("font-mono text-[0.6875rem] uppercase tracking-marking")
// that appears in no template and no built page.

module.exports = {
  content: [
    './public/**/*.html',
    './layouts/**/*.html',
    './static/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#EDE4D7',
        surface: '#F7F4EE',
        ink: '#14181C',
        line: '#D7CEC1',
        muted: '#474D49',
        faint: '#6B716C',
        maroon: {
          DEFAULT: '#7A0019',
          dark: '#5B0013',
        },
        gold: {
          DEFAULT: '#FFCC33',
          deep: '#8A6400',
        },
        signal: {
          green: '#246B43',
          amber: '#9C5F0A',
        },
        /* violet and blueprint stay retired — not in the config, so the
           classes cannot come back by accident. */
        void: {
          DEFAULT: '#0A0C0D',
          soft: '#15181A',
          muted: '#8E9794',
          line: '#FFFFFF1A',
          edge: '#FFFFFF33',
        },
      },
      letterSpacing: {
        marking: '0.18em',
        wide: '0.08em',
      },
      fontFamily: {
        /* "Ampersand" is declared in system.css and covers U+0026 only.
           It must come first so it wins for that one glyph. */
        display: ['Ampersand', 'Fraunces', 'Georgia', 'serif'],
        body: ['"Libre Franklin"', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
