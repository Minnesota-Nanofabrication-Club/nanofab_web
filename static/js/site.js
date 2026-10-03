/* =====================================================================
   Shell behaviour: top bar, full-screen menu, search.

   Everything here is an enhancement. With JavaScript off the menu
   still opens (it is a checkbox), the top bar still reads (it sits on
   a dark hero), and search degrades to a control that does nothing
   visible — which is why the menu, not search, carries navigation.

   No dependencies, no build step.
   ===================================================================== */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };

  /* ------------------------------------------------------------------
     TOP BAR

     Transparent over the hero photograph, paper once past it.

     The trigger is the FIRST SECTION AFTER the hero, not the hero
     itself. The hero is position:sticky, so it never leaves the
     viewport and an IntersectionObserver on it never fires — the page
     scrolls over it instead. What actually changes is where the next
     section's top edge is, so that is what we watch.
     ------------------------------------------------------------------ */
  var topbar = $('#topbar');
  if (topbar) {
    var setSolid = function (on) { topbar.classList.toggle('is-solid', on); };

    if (topbar.dataset.overHero !== 'true') {
      setSolid(true);
    } else {
      var hero = $('#hero');
      var after = hero && hero.nextElementSibling;

      if (!after) {
        setSolid(true);
      } else {
        var ticking = false;
        var update = function () {
          ticking = false;
          /* Measured, not hard-coded: the bar's height changes at the
             sm breakpoint. */
          var barH = topbar.getBoundingClientRect().height;
          setSolid(after.getBoundingClientRect().top <= barH);
        };
        var onScroll = function () {
          if (ticking) return;
          ticking = true;
          window.requestAnimationFrame(update);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
      }
    }
  }

  /* ------------------------------------------------------------------
     FULL-SCREEN MENU

     The checkbox is the source of truth. We only add what CSS cannot
     do: Esc to close, and keeping focus inside while it is open.
     ------------------------------------------------------------------ */
  var navState = $('#nav-open');
  var navOverlay = $('#nav-overlay');

  var focusablesIn = function (root) {
    return Array.prototype.filter.call(
      root.querySelectorAll('a[href], button:not([disabled]), input:not([type="hidden"]), [tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  };

  /* Shared focus trap for both overlays. */
  var trap = function (root, event) {
    if (event.key !== 'Tab') return;
    var items = focusablesIn(root);
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  };

  if (navState && navOverlay) {
    navState.addEventListener('change', function () {
      if (navState.checked) {
        var firstLink = focusablesIn(navOverlay)[0];
        if (firstLink) firstLink.focus();
      }
    });

    navOverlay.addEventListener('keydown', function (e) { trap(navOverlay, e); });

    /* Following a link should close the menu — on same-page anchors
       no navigation happens, so the overlay would otherwise stay up. */
    navOverlay.addEventListener('click', function (e) {
      if (e.target.closest('a[href]')) navState.checked = false;
    });
  }

  /* ------------------------------------------------------------------
     SEARCH
     ------------------------------------------------------------------ */
  var overlay = $('#search-overlay');
  var input = $('#search-input');
  var results = $('#search-results');
  var empty = $('#search-empty');
  var openBtn = $('#search-open');
  var closeBtn = $('#search-close');

  if (overlay && input && results) {
    var records = null;
    var loading = false;
    var active = -1;
    var lastFocus = null;

    var load = function () {
      if (records || loading) return;
      loading = true;
      fetch(window.SEARCH_INDEX_URL)
        .then(function (r) { return r.json(); })
        .then(function (data) {
          records = (data && data.records) || [];
          loading = false;
          if (input.value) render(input.value);
        })
        .catch(function () {
          loading = false;
          records = [];
          results.innerHTML = '<p class="search-error font-mono text-[0.6875rem] uppercase tracking-marking">Index unavailable</p>';
        });
    };

    var openSearch = function () {
      lastFocus = document.activeElement;
      if (navState) navState.checked = false;
      overlay.hidden = false;
      document.documentElement.classList.add('overlay-open');
      load();
      input.focus();
      input.select();
    };

    var closeSearch = function () {
      overlay.hidden = true;
      document.documentElement.classList.remove('overlay-open');
      input.value = '';
      results.innerHTML = '';
      empty.hidden = true;
      active = -1;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    /* Score: title prefix beats title substring beats keyword hit.
       Every term must match somewhere, so typing more words narrows
       rather than widens. */
    var score = function (rec, terms) {
      var title = rec.title.toLowerCase();
      var total = 0;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (title.indexOf(t) === 0) total += 100;
        else if (title.indexOf(t) > -1) total += 50;
        else if (rec.keywords.indexOf(t) > -1) total += 12;
        else return -1;
      }
      /* Bands first when scores tie: they are the broader destination. */
      if (rec.kind === 'band') total += 8;
      return total;
    };

    var esc = function (s) {
      return String(s).replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
    };

    var render = function (query) {
      var q = query.trim().toLowerCase();
      active = -1;
      if (!q) { results.innerHTML = ''; empty.hidden = true; return; }
      if (!records) return;

      var terms = q.split(/\s+/);
      var hits = [];
      for (var i = 0; i < records.length; i++) {
        var s = score(records[i], terms);
        if (s >= 0) hits.push({ rec: records[i], score: s });
      }
      hits.sort(function (a, b) { return b.score - a.score; });
      hits = hits.slice(0, 12);

      if (!hits.length) { results.innerHTML = ''; empty.hidden = false; return; }
      empty.hidden = true;

      results.innerHTML = hits.map(function (h, i) {
        var r = h.rec;
        var crumb = [r.band, r.meta].filter(Boolean).join(' / ');
        return '<a class="search-hit" href="' + esc(r.url) + '" data-i="' + i + '">' +
                 '<span class="search-hit-main">' +
                   '<span class="search-hit-title">' + esc(r.title) + '</span>' +
                   (r.summary ? '<span class="search-hit-sum">' + esc(r.summary) + '</span>' : '') +
                 '</span>' +
                 (crumb ? '<span class="search-hit-crumb">' + esc(crumb) + '</span>' : '') +
               '</a>';
      }).join('');
    };

    var move = function (delta) {
      var items = results.querySelectorAll('.search-hit');
      if (!items.length) return;
      if (active > -1) items[active].classList.remove('is-active');
      active = (active + delta + items.length) % items.length;
      items[active].classList.add('is-active');
      items[active].scrollIntoView({ block: 'nearest' });
    };

    if (openBtn) openBtn.addEventListener('click', openSearch);
    if (closeBtn) closeBtn.addEventListener('click', closeSearch);

    input.addEventListener('input', function () { render(input.value); });

    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') {
        var items = results.querySelectorAll('.search-hit');
        if (active > -1 && items[active]) { e.preventDefault(); items[active].click(); }
        else if (items.length) { e.preventDefault(); items[0].click(); }
      } else {
        trap(overlay, e);
      }
    });

    /* Clicking the backdrop (but not the panel) closes. */
    overlay.addEventListener('mousedown', function (e) {
      if (e.target === overlay) closeSearch();
    });

    document.addEventListener('keydown', function (e) {
      var typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) ||
                   document.activeElement.isContentEditable;

      if (e.key === 'Escape') {
        if (!overlay.hidden) { closeSearch(); return; }
        if (navState && navState.checked) { navState.checked = false; return; }
      }
      if (typing) return;
      if (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        openSearch();
      }
    });

    /* Warm the index on first intent rather than on page load. */
    if (openBtn) openBtn.addEventListener('mouseenter', load, { once: true });
  }
})();
