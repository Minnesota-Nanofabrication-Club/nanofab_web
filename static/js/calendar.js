/* ================================================================
   EVENTS CALENDAR (/events/)
   Draws the club's public Google Calendar in the site's own month grid
   and upcoming list. Times are shown in Central time whatever the
   visitor's timezone.

   Two sources, picked automatically:
   - DEFAULT, no setup: the calendar's public iCal feed, downloaded by
     Hugo at build time and embedded in the page as #calData. Parsed
     here, recurring events included. New events appear at the next
     build (the deploy workflow rebuilds every 6 hours).
   - LIVE, optional: the Google Calendar API, when hugo.toml has
     calendarAPIKey. Events appear the moment they are added.

   The calendar ID (and key) come from hugo.toml through data attributes
   on #calGrid.

   API KEY SETUP (only for the live source):
   1. Make the calendar public: Google Calendar -> Settings for the
      calendar -> Access permissions -> "Make available to public" and
      "See all event details".
   2. Google Cloud Console (any account): create a project, enable the
      "Google Calendar API", then Credentials -> Create credentials ->
      API key.
   3. Restrict the key: Websites -> the site's address (and
      http://localhost/* for local previews); API -> Google Calendar API.
   4. Paste the calendar ID and the key into hugo.toml.

   The key is visible in the page source. That is normal: it can only
   read public calendars, and only from the site's address.
   ================================================================ */
(function(){
  const gridEl = document.getElementById('calGrid');
  if (!gridEl) return;

  const CAL_ID   = gridEl.dataset.calId;
  const API_KEY  = gridEl.dataset.calKey;
  const dataEl   = document.getElementById('calData');
  if (!CAL_ID || !(API_KEY || dataEl)) return;
  const TZ       = 'America/Chicago';
  const UPCOMING = 8;                  // events in the default list

  const el = {
    month: document.getElementById('calMonth'),
    list:  document.getElementById('calList'),
    head:  document.getElementById('calSideHead'),
    reset: document.getElementById('calReset'),
    status:document.getElementById('calStatus')
  };

  /* ---- date helpers. Day keys are "YYYY-MM-DD" in Central time. ---- */
  const keyFmt   = new Intl.DateTimeFormat('en-CA', {timeZone:TZ, year:'numeric', month:'2-digit', day:'2-digit'});
  const timeFmt  = new Intl.DateTimeFormat('en-US', {timeZone:TZ, hour:'numeric', minute:'2-digit'});
  const monthFmt = new Intl.DateTimeFormat('en-US', {timeZone:'UTC', month:'long', year:'numeric'});
  const dayFmt   = new Intl.DateTimeFormat('en-US', {timeZone:'UTC', weekday:'short', month:'short', day:'numeric'});
  const monFmt   = new Intl.DateTimeFormat('en-US', {timeZone:'UTC', month:'short'});

  const keyOf   = d => keyFmt.format(d);
  const toUTC   = k => new Date(Date.UTC(+k.slice(0,4), +k.slice(5,7)-1, +k.slice(8,10)));
  const addDays = (k, n) => { const t = toUTC(k); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0,10); };
  const short   = d => timeFmt.format(d).replace(':00','').replace(' AM','a').replace(' PM','p');

  const todayKey = keyOf(new Date());
  let viewY = +todayKey.slice(0,4), viewM = +todayKey.slice(5,7) - 1;
  let selected = null;   // selected day key, or null for the upcoming list
  let openId = null;     // expanded event in the list

  const byId = new Map();
  const loaded = new Set();
  let upcoming = [];

  /* ---- normalise a Google event ---- */
  function norm(e){
    const allDay = !!e.start.date;
    let start, end, startKey, endKey;
    if (allDay){
      startKey = e.start.date;
      endKey = addDays((e.end && e.end.date) || e.start.date, -1);   // Google's end date is exclusive
      if (endKey < startKey) endKey = startKey;
      start = toUTC(startKey); end = toUTC(endKey);
    } else {
      start = new Date(e.start.dateTime);
      end = new Date((e.end && e.end.dateTime) || e.start.dateTime);
      startKey = keyOf(start);
      endKey = keyOf(new Date(Math.max(+start, +end - 1)));
    }
    return {
      id:e.id, title:e.summary || 'Untitled event', desc:e.description || '',
      loc:e.location || '', link:e.htmlLink || '',
      allDay, start, end, startKey, endKey
    };
  }
  const cmp = (a, b) =>
    a.startKey !== b.startKey ? (a.startKey < b.startKey ? -1 : 1)
    : a.allDay !== b.allDay ? (a.allDay ? -1 : 1)
    : a.start - b.start;

  function eventsOn(k){
    const out = [];
    byId.forEach(ev => { if (ev.startKey <= k && k <= ev.endKey) out.push(ev); });
    return out.sort(cmp);
  }

  function timeLabel(ev){
    if (ev.allDay) return ev.startKey === ev.endKey ? 'All day' : 'Until ' + dayFmt.format(toUTC(ev.endKey));
    if (ev.startKey !== ev.endKey) return timeFmt.format(ev.start) + ' to ' + dayFmt.format(toUTC(ev.endKey));
    return timeFmt.format(ev.start) + ' – ' + timeFmt.format(ev.end);
  }

  // Google descriptions can hold HTML. Parse it inert and keep only the text.
  function plain(html){
    const t = document.createElement('template');
    t.innerHTML = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');
    return t.content.textContent.trim();
  }

  /* ---- data source: the Google Calendar API ---- */
  async function api(params){
    const q = new URLSearchParams(Object.assign({
      key:API_KEY, singleEvents:'true', orderBy:'startTime', maxResults:'250', timeZone:TZ
    }, params));
    const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/' + encodeURIComponent(CAL_ID) + '/events?' + q);
    if (!res.ok){
      let msg = 'HTTP ' + res.status;
      try { const j = await res.json(); if (j.error) msg += ': ' + j.error.message; } catch(_){}
      throw new Error(msg);
    }
    const j = await res.json();
    return (j.items || []).filter(e => e.status !== 'cancelled' && e.start).map(norm);
  }

  /* ---- data source: the iCal feed embedded at build time ----
     Handles what Google writes: folded lines, UTC / TZID / all-day
     dates, RRULE (DAILY, WEEKLY with BYDAY, MONTHLY, YEARLY; INTERVAL,
     COUNT, UNTIL), EXDATE, edited single occurrences (RECURRENCE-ID)
     and cancelled events. Recurrences are expanded two years out. */
  function zoned(y, mo, d, h, mi, s, tz){
    // the instant when the wall clock in tz reads y-mo-d h:mi:s
    const guess = Date.UTC(y, mo, d, h, mi, s);
    const off = t => {
      const p = {};
      new Intl.DateTimeFormat('en-US', {timeZone:tz, hourCycle:'h23', year:'numeric', month:'numeric', day:'numeric', hour:'numeric', minute:'numeric', second:'numeric'})
        .formatToParts(new Date(t)).forEach(x => p[x.type] = +x.value);
      return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - t;
    };
    let t = guess - off(guess);
    return new Date(guess - off(t));
  }
  // a DTSTART-like property -> {date:'YYYY-MM-DD'} or {at:Date, wall:[...], tz}
  function icsTime(prop){
    if (!prop) return null;
    const v = prop.value, m = v.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?/);
    if (!m) return null;
    if (!m[4]) return {date: m[1] + '-' + m[2] + '-' + m[3]};
    const wall = [+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]];
    const tz = m[7] ? 'UTC' : (prop.params.TZID || TZ);
    return {at: tz === 'UTC' ? new Date(Date.UTC.apply(null, wall)) : zoned.apply(null, wall.concat(tz)), wall, tz};
  }
  const unesc = t => t.replace(/\\n/gi, '\n').replace(/\\([,;\\])/g, '$1');

  function parseICS(text){
    const lines = text.replace(/\r?\n[ \t]/g, '').split(/\r?\n/);
    const out = []; let cur = null;
    lines.forEach(line => {
      if (line === 'BEGIN:VEVENT'){ cur = {}; return; }
      if (line === 'END:VEVENT'){ if (cur) out.push(cur); cur = null; return; }
      if (!cur) return;
      const i = line.indexOf(':'); if (i < 0) return;
      const head = line.slice(0, i).split(';'), name = head[0].toUpperCase(), params = {};
      head.slice(1).forEach(p => { const j = p.indexOf('='); params[p.slice(0, j).toUpperCase()] = p.slice(j + 1).replace(/^"|"$/g, ''); });
      const prop = {value: line.slice(i + 1), params};
      if (name === 'EXDATE') (cur.EXDATE = cur.EXDATE || []).push(prop);
      else cur[name] = prop;
    });
    return out;
  }

  function expand(raw){
    const horizon = Date.now() + 730 * 864e5, events = [], overrides = new Set();
    raw.forEach(v => { if (v['RECURRENCE-ID']){ const t = icsTime(v['RECURRENCE-ID']); overrides.add(v.UID.value + '|' + (t.at ? +t.at : t.date)); } });
    raw.forEach(v => {
      if (!v.DTSTART || (v.STATUS && v.STATUS.value === 'CANCELLED')) return;
      const st = icsTime(v.DTSTART), en = icsTime(v.DTEND) || st;
      const dur = st.date ? (toUTC(en.date) - toUTC(st.date)) || 864e5 : (en.at - st.at);
      const base = {
        uid: v.UID ? v.UID.value : String(Math.random()),
        summary: v.SUMMARY ? unesc(v.SUMMARY.value) : '',
        description: v.DESCRIPTION ? unesc(v.DESCRIPTION.value) : '',
        location: v.LOCATION ? unesc(v.LOCATION.value) : ''
      };
      const make = (startAt, startDate) => {
        const e = Object.assign({}, base);
        if (startDate){
          e.id = base.uid + '|' + startDate;
          e.start = {date: startDate}; e.end = {date: addDays(startDate, Math.round(dur / 864e5))};
        } else {
          e.id = base.uid + '|' + (+startAt);
          e.start = {dateTime: startAt.toISOString()}; e.end = {dateTime: new Date(+startAt + dur).toISOString()};
        }
        return e;
      };
      if (!v.RRULE || v['RECURRENCE-ID']){ events.push(make(st.at, st.date)); return; }

      const rule = {}; v.RRULE.value.split(';').forEach(p => { const [k, x] = p.split('='); rule[k] = x; });
      const freq = rule.FREQ, every = +(rule.INTERVAL || 1), count = rule.COUNT ? +rule.COUNT : Infinity;
      const until = rule.UNTIL ? icsTime({value: rule.UNTIL, params: {}}) : null;
      const untilT = until ? (until.at ? +until.at : +toUTC(until.date) + 864e5 - 1) : horizon;
      const ex = new Set();
      (v.EXDATE || []).forEach(p => p.value.split(',').forEach(x => { const t = icsTime({value: x, params: p.params}); ex.add(t.at ? +t.at : t.date); }));
      const days = ['SU','MO','TU','WE','TH','FR','SA'];
      const byday = freq === 'WEEKLY' && rule.BYDAY ? rule.BYDAY.split(',').map(d => days.indexOf(d.slice(-2))) : null;
      // walk wall-clock dates so the time of day survives daylight saving
      const w = st.date ? [+st.date.slice(0,4), +st.date.slice(5,7) - 1, +st.date.slice(8,10), 0, 0, 0] : st.wall;
      let n = 0;
      for (let k = 0; k < 2000 && n < count; k++){
        let dates = [];
        const p = new Date(Date.UTC(w[0], w[1], w[2]));
        if (freq === 'DAILY') p.setUTCDate(p.getUTCDate() + k * every), dates = [p];
        else if (freq === 'WEEKLY'){
          p.setUTCDate(p.getUTCDate() + k * 7 * every);
          if (byday){
            const sun = new Date(p); sun.setUTCDate(sun.getUTCDate() - sun.getUTCDay());
            dates = byday.map(d => { const x = new Date(sun); x.setUTCDate(x.getUTCDate() + d); return x; }).sort((a, b) => a - b);
          } else dates = [p];
        }
        else if (freq === 'MONTHLY') dates = [new Date(Date.UTC(w[0], w[1] + k * every, w[2]))];
        else if (freq === 'YEARLY') dates = [new Date(Date.UTC(w[0] + k * every, w[1], w[2]))];
        else break;
        let past = false;
        for (const d of dates){
          if (n >= count) break;
          const key = d.toISOString().slice(0, 10);
          if (st.date && key < st.date) continue;   // BYDAY days before an all-day start
          const at = st.date ? null : (st.tz === 'UTC'
            ? new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), w[3], w[4], w[5]))
            : zoned(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), w[3], w[4], w[5], st.tz));
          const t = at ? +at : +toUTC(key);
          if (at && t < +st.at) continue;          // BYDAY days before the first occurrence
          if (t > untilT || t > horizon){ past = true; break; }
          n++;
          const id = at ? t : key;
          if (ex.has(id) || overrides.has(base.uid + '|' + id)) continue;
          events.push(make(at, at ? null : key));
        }
        if (past) break;
      }
    });
    return events.map(norm);
  }

  let icsAll = null;
  async function ics(params){
    if (!icsAll) icsAll = expand(parseICS(JSON.parse(dataEl.textContent)));
    const from = params.timeMin ? new Date(params.timeMin) : null, to = params.timeMax ? new Date(params.timeMax) : null;
    const out = icsAll.filter(ev => (!from || ev.end >= from) && (!to || ev.start < to)).sort(cmp);
    return params.maxResults ? out.slice(0, +params.maxResults) : out;
  }

  const source = API_KEY ? api : ics;

  async function loadMonth(y, m){
    const tag = y + '-' + m;
    if (loaded.has(tag)) return;
    loaded.add(tag);
    try {
      const first = new Date(Date.UTC(y, m, 1));
      const from = new Date(first); from.setUTCDate(1 - first.getUTCDay() - 1);
      const to = new Date(from); to.setUTCDate(to.getUTCDate() + 45);
      (await source({timeMin:from.toISOString(), timeMax:to.toISOString()})).forEach(ev => byId.set(ev.id, ev));
    } catch (err){
      loaded.delete(tag);   // let the next visit to this month retry
      throw err;
    }
  }

  async function loadUpcoming(){
    const evs = await source({timeMin:new Date().toISOString(), maxResults:String(UPCOMING)});
    evs.forEach(ev => byId.set(ev.id, ev));
    upcoming = evs.sort(cmp).slice(0, UPCOMING);
  }

  /* ---- rendering ---- */
  const monthTag = () => viewY + '-' + String(viewM + 1).padStart(2, '0');

  function renderGrid(){
    const first = new Date(Date.UTC(viewY, viewM, 1));
    el.month.textContent = monthFmt.format(first);
    let k = addDays(first.toISOString().slice(0,10), -first.getUTCDay());
    const frag = document.createDocumentFragment();

    for (let i = 0; i < 42; i++){
      const evs = eventsOn(k);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cal-cell';
      b.dataset.key = k;
      if (k.slice(0,7) !== monthTag()) b.classList.add('out');
      if (k === todayKey) b.classList.add('today');
      if (k === selected) b.classList.add('sel');
      if (evs.length) b.classList.add('has');
      b.setAttribute('aria-pressed', String(k === selected));
      b.setAttribute('aria-label', dayFmt.format(toUTC(k)) + (evs.length ? ', ' + evs.length + (evs.length > 1 ? ' events' : ' event') : ''));

      const num = document.createElement('span');
      num.className = 'cal-num';
      num.textContent = +k.slice(8);
      b.appendChild(num);

      evs.slice(0, 2).forEach(ev => {
        const c = document.createElement('span');
        c.className = 'cal-chip';
        if (!ev.allDay && ev.startKey === k){
          const t = document.createElement('span');
          t.className = 't';
          t.textContent = short(ev.start);
          c.appendChild(t);
        }
        c.appendChild(document.createTextNode(ev.title));
        b.appendChild(c);
      });
      if (evs.length > 2){
        const more = document.createElement('span');
        more.className = 'cal-more';
        more.textContent = '+' + (evs.length - 2) + ' more';
        b.appendChild(more);
      }
      if (evs.length){
        const dots = document.createElement('span');
        dots.className = 'cal-dots';
        for (let d = 0; d < Math.min(evs.length, 3); d++) dots.appendChild(document.createElement('i'));
        b.appendChild(dots);
      }

      frag.appendChild(b);
      k = addDays(k, 1);
    }
    gridEl.replaceChildren(frag);
  }

  function renderList(){
    const evs = selected ? eventsOn(selected) : upcoming;
    el.head.textContent = selected ? dayFmt.format(toUTC(selected)) : 'Upcoming';
    el.reset.hidden = !selected;

    const frag = document.createDocumentFragment();
    if (!evs.length){
      const li = document.createElement('li');
      li.className = 'cal-empty';
      li.textContent = selected ? 'Nothing on this day.' : 'Nothing scheduled yet.';
      frag.appendChild(li);
    }
    evs.forEach(ev => frag.appendChild(listItem(ev)));
    el.list.replaceChildren(frag);
  }

  function listItem(ev){
    const open = ev.id === openId;
    const li = document.createElement('li');

    const head = document.createElement('button');
    head.type = 'button';
    head.className = 'ev-head';
    head.dataset.id = ev.id;
    head.setAttribute('aria-expanded', String(open));

    const date = document.createElement('span'); date.className = 'ev-date';
    const dNum = document.createElement('b');     dNum.textContent = toUTC(ev.startKey).getUTCDate();
    const dMon = document.createElement('small'); dMon.textContent = monFmt.format(toUTC(ev.startKey));
    date.append(dNum, dMon);

    const main = document.createElement('span'); main.className = 'ev-main';
    const title = document.createElement('span'); title.className = 'ev-title'; title.textContent = ev.title;
    const meta = document.createElement('span');  meta.className = 'ev-meta';  meta.textContent = timeLabel(ev);
    main.append(title, meta);

    head.append(date, main);
    head.addEventListener('click', () => {
      openId = open ? null : ev.id;
      renderList();
      const again = el.list.querySelector('[data-id="' + CSS.escape(ev.id) + '"]');
      if (again) again.focus({preventScroll:true});
    });
    li.appendChild(head);

    if (open){
      const more = document.createElement('div');
      more.className = 'ev-more';
      if (ev.loc){
        const p = document.createElement('p'); p.className = 'ev-loc'; p.textContent = ev.loc; more.appendChild(p);
      }
      if (ev.desc){
        const p = document.createElement('p'); p.textContent = plain(ev.desc); more.appendChild(p);
      }
      if (ev.link){
        const a = document.createElement('a');
        a.href = ev.link; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'Open in Google Calendar ↗';
        more.appendChild(a);
      } else {
        // feed events have no Google link: offer to add just this one
        const fmt = d => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
        const dates = ev.allDay ? ev.startKey.replace(/-/g, '') + '/' + addDays(ev.endKey, 1).replace(/-/g, '') : fmt(ev.start) + '/' + fmt(ev.end);
        const q = new URLSearchParams({action:'TEMPLATE', text:ev.title, dates, location:ev.loc, details:plain(ev.desc)});
        const a = document.createElement('a');
        a.href = 'https://calendar.google.com/calendar/render?' + q; a.target = '_blank'; a.rel = 'noopener';
        a.textContent = 'Add this event to Google Calendar ↗';
        more.appendChild(a);
      }
      if (!more.childNodes.length){
        const p = document.createElement('p'); p.textContent = 'No details yet.'; more.appendChild(p);
      }
      li.appendChild(more);
    }
    return li;
  }

  function render(){ renderGrid(); renderList(); }

  function setStatus(msg){ el.status.textContent = msg; }
  const idleStatus = () => '';

  async function showMonth(){
    render();
    if (!loaded.has(viewY + '-' + viewM)) setStatus('Loading…');
    try {
      await loadMonth(viewY, viewM);
      setStatus(idleStatus());
    } catch (err){
      console.warn('[calendar]', err.message);
      setStatus('Couldn’t load events. Use the Google Calendar link above.');
    }
    render();
  }

  /* ---- controls ---- */
  function step(delta){
    viewM += delta;
    if (viewM < 0){ viewM = 11; viewY--; }
    if (viewM > 11){ viewM = 0; viewY++; }
    selected = null; openId = null;
    showMonth();
  }
  document.getElementById('calPrev').addEventListener('click', () => step(-1));
  document.getElementById('calNext').addEventListener('click', () => step(1));
  document.getElementById('calToday').addEventListener('click', () => {
    viewY = +todayKey.slice(0,4); viewM = +todayKey.slice(5,7) - 1;
    selected = null; openId = null;
    showMonth();
  });
  document.querySelectorAll('[data-copy]').forEach(b => b.addEventListener('click', async () => {
    const label = b.textContent;
    try { await navigator.clipboard.writeText(b.dataset.copy); b.textContent = 'Link copied'; }
    catch (_){ window.prompt('Copy this link into your calendar app:', b.dataset.copy); }
    setTimeout(() => { b.textContent = label; }, 2000);
  }));
  el.reset.addEventListener('click', () => { selected = null; openId = null; renderGrid(); renderList(); });

  gridEl.addEventListener('click', e => {
    const b = e.target.closest('.cal-cell');
    if (!b) return;
    const k = b.dataset.key;
    selected = selected === k ? null : k;
    openId = null;
    if (k.slice(0,7) !== monthTag()){
      // clicked a spill-over day from the next or previous month: go there
      viewY = +k.slice(0,4); viewM = +k.slice(5,7) - 1;
      showMonth();
    } else {
      render();
    }
    const again = gridEl.querySelector('[data-key="' + k + '"]');
    if (again) again.focus({preventScroll:true});
  });

  /* ---- first load ---- */
  (async function(){
    render();
    setStatus('Loading…');
    try {
      await Promise.all([loadUpcoming(), loadMonth(viewY, viewM)]);
      setStatus(idleStatus());
    } catch (err){
      console.warn('[calendar]', err.message);
      setStatus('Couldn’t load events. Use the Google Calendar link above.');
    }
    render();
  })();
})();
