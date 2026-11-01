/* =====================================================================
   The circuitry at the seams between sections.

   Wherever one section of a page meets the next (and where the last
   one meets the footer), short buses of traces run in from the edge of
   the page along the seam, then step away from it at 45 degrees into
   their own section and end in vias. They never cross the seam, and
   nothing is drawn anywhere else. Each bus draws itself as it scrolls into
   view (README, "The circuitry").

   Decoration only: aria-hidden, no pointer events, and the page is
   unchanged without JavaScript. To turn it off, delete the <script> tag
   for this file in layouts/_default/baseof.html.
   ===================================================================== */
(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var layer = document.createElement('div');
  layer.className = 'circuit';
  layer.setAttribute('aria-hidden', 'true');
  document.body.appendChild(layer);

  var footer = document.querySelector('.footer');
  var drawn = [], next = 0, lastKey = '';

  // seeded random, so the same page always gets the same wiring
  function rng(seed) {
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function el(name, attrs, parent) {
    var n = document.createElementNS(NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  }
  function seedOf(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return h; }

  // where one section meets the next: the top of every top-level
  // section after the first, and the top of the footer
  function seams() {
    var ys = [];
    var secs = document.querySelectorAll('main > section');
    for (var i = 1; i < secs.length; i++) {
      if (secs[i].offsetHeight < 40) continue;
      ys.push(Math.round(secs[i].getBoundingClientRect().top + scrollY));
    }
    if (footer && secs.length) ys.push(footer.offsetTop);
    return ys;
  }

  function build() {
    // measure the page without the layer, or a page that got shorter
    // (a band folded) would stay as tall as the old layer
    layer.style.height = '0';
    var W = document.documentElement.clientWidth;
    var list = seams();
    var H = (footer ? footer.offsetTop : document.documentElement.scrollHeight) + 140;
    var key = W + 'x' + list.join(',');
    if (key === lastKey) { layer.style.height = H + 'px'; return; }
    lastKey = key;

    var css = getComputedStyle(document.documentElement);
    var maxw = parseFloat(css.getPropertyValue('--maxw')) || 1440;
    var gut = Math.min(56, Math.max(16, W * 0.04));
    var margin = Math.max(0, (W - maxw) / 2) + gut; // where the content column starts
    var R = rng(seedOf(location.pathname) ^ W);

    layer.textContent = '';
    layer.style.height = H + 'px';
    var svg = el('svg', { width: W, height: H, viewBox: '0 0 ' + W + ' ' + H }, layer);
    var board = el('g', { class: 'c-board' }, svg);
    drawn = []; next = 0;

    // anything reaching into the content column is drawn fainter
    function inside(x) { return x > margin && x < W - margin; }
    function add(n, y) { drawn.push({ y: y, n: n }); }

    // one bus beside the seam at y, from the left (side -1) or right
    // (1), in the section above (dir -1) or below (1). The traces run
    // along the seam, then step 45 degrees away from it, into their own
    // section, and end in vias; they never cross the seam.
    function bus(side, y, dir) {
      var n = 2 + Math.floor(R() * 2), pitch = 6;
      var room = Math.max(60, Math.min(margin * 0.8, 150));
      var run = room * (0.35 + R() * 0.3);        // along the seam
      var rise = 8 + R() * 8;                      // the shallow step into the section
      var sx = function (v) { return side < 0 ? v : W - v; };
      for (var i = 0; i < n; i++) {
        var y0 = y + dir * (10 + i * pitch);       // nearest the seam first
        var y1 = y0 + dir * rise;
        var a = run - i * pitch * 0.42;            // outer traces turn first, so they never touch
        var tail = 14 + R() * 8 + i * 11;          // vias stagger, never overlap
        var pts = [[sx(-2), y0], [sx(a), y0], [sx(a + rise), y1], [sx(a + rise + tail), y1]];
        var d = 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L');
        var end = pts[3];
        var cls = inside(end[0]) ? ' c-in' : '';
        add(el('path', { d: d, pathLength: 1, class: 'c-trace' + cls }, board), y);
        add(el('circle', { cx: end[0].toFixed(1), cy: end[1].toFixed(1), r: 2.8, class: 'c-via' + cls }, board), y);
      }
    }

    // every seam gets a pair of buses on one side, one turning up into
    // the section above and one down into the section below; sides
    // alternate, and wide screens sometimes add one on the other side
    list.forEach(function (y, k) {
      var side = (k + (R() < 0.5 ? 0 : 1)) % 2 ? 1 : -1;
      bus(side, y, -1);
      bus(side, y, 1);
      if (margin > 120 && R() < 0.35) bus(-side, y, R() < 0.5 ? -1 : 1);
    });

    drawn.sort(function (a, b) { return a.y - b.y; });
    if (reduce) drawn.forEach(function (o) { o.n.classList.add('on'); });
    reveal();
  }

  function reveal() {
    var line = scrollY + innerHeight * 0.92;
    while (next < drawn.length && drawn[next].y < line) drawn[next++].n.classList.add('on');
  }

  var t = 0;
  function rebuild() { clearTimeout(t); t = setTimeout(build, 150); }
  addEventListener('scroll', function () { requestAnimationFrame(reveal); }, { passive: true });
  addEventListener('resize', rebuild);
  if ('ResizeObserver' in window) new ResizeObserver(rebuild).observe(document.body);
  addEventListener('load', build);
  build();
})();
