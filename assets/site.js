/* Co.Solutions site script. No tracking, no cookies, no storage, no libraries.
   The HTML ships the final state of every figure and chart; this only animates what starts below the fold. */

/* ---------- Site config: the only values to change ---------- */
const CONFIG = {
  // WhatsApp number that receives messages. Digits only, with the country code.
  whatsapp: "201207548813"
};

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const css = (n) => parseFloat(getComputedStyle(document.documentElement).getPropertyValue(n)) || 0;
  const CHART = css('--motion-chart') || 1200, NUMBER = css('--motion-number') || 800, STAGGER = css('--motion-stagger') || 60, HERO = css('--hero-state') || 3800;
  const ease = (x) => 1 - Math.pow(1 - x, 4); // ease-out-quart, as --motion-ease

  /* ---------- WhatsApp links follow CONFIG ---------- */
  const number = String(CONFIG.whatsapp).replace(/\D/g, '');
  $$('a[href^="https://wa.me/"]').forEach((a) => { a.href = a.href.replace(/wa\.me\/\d*/, `wa.me/${number}`); });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Header: solid after 8 px; the current section carries the teal square ---------- */
  const header = $('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
  const spyLinks = $$('[data-spy]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    const ids = [...new Set(spyLinks.map((a) => a.dataset.spy))];
    const spy = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      spyLinks.forEach((a) => a.setAttribute('aria-current', String(a.dataset.spy === e.target.id)));
    }), { rootMargin: '-40% 0px -55% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- Phone menu: a modal dialog traps focus, Escape closes it ---------- */
  const sheet = $('#sheet'), menuBtn = $('#menuBtn');
  if (sheet && menuBtn && sheet.showModal) {
    const lock = (on) => document.documentElement.classList.toggle('menu-open', on);
    menuBtn.addEventListener('click', () => { sheet.showModal(); lock(true); menuBtn.setAttribute('aria-expanded', 'true'); });
    sheet.addEventListener('close', () => { lock(false); menuBtn.setAttribute('aria-expanded', 'false'); });
    $('#sheetClose').addEventListener('click', () => sheet.close());
    $$('a', sheet).forEach((a) => a.addEventListener('click', (e) => {
      const target = a.hash && document.querySelector(a.hash);
      sheet.close();
      lock(false);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, '', a.hash);
      target.scrollIntoView({ behavior: reduce() ? 'instant' : 'smooth' });
    }));
    matchMedia('(min-width: 768px)').addEventListener('change', (e) => { if (e.matches && sheet.open) sheet.close(); });
  }

  /* ---------- Phone sticky bar: whenever the hero's own buttons are out of view ---------- */
  const mbar = $('#mbar'), heroCtas = $('[data-hero-ctas]');
  if (mbar && heroCtas) {
    const onScroll = () => { const r = heroCtas.getBoundingClientRect(); mbar.classList.toggle('is-on', !(r.top < innerHeight && r.bottom > 0)); };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- FAQ: one answer open at a time ---------- */
  const qas = $$('.qa');
  const setQa = (qa, open) => {
    qa.classList.toggle('is-open', open);
    $('button', qa).setAttribute('aria-expanded', String(open));
    $('.a', qa).hidden = !open;
  };
  qas.forEach((qa) => {
    setQa(qa, qa.classList.contains('is-open'));
    $('button', qa).addEventListener('click', () => {
      const open = !qa.classList.contains('is-open');
      qas.forEach((o) => setQa(o, false));
      setQa(qa, open);
    });
  });

  /* ---------- Count-ups ---------- */
  const fmt = (el, v) => {
    const dec = +el.dataset.dec || 0;
    return (el.dataset.pre || '') + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (el.dataset.suf || '');
  };
  const finalText = (el) => fmt(el, +el.dataset.count);
  const countUp = (el, delay = 0) => {
    const to = +el.dataset.count, t0 = performance.now() + delay;
    const step = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / NUMBER));
      el.textContent = fmt(el, to * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- Charts draw once, when 35% of the card is in view ---------- */
  const cards = $$('[data-anim-card]');
  const finish = (card) => {
    card.removeAttribute('data-anim');
    $$('[data-count]', card).forEach((n) => { n.textContent = finalText(n); });
  };
  const play = (card) => {
    card.classList.remove('anim');
    card.setAttribute('data-anim', 'pending');
    $$('[data-count]', card).forEach((n) => { n.textContent = fmt(n, 0); });
    void card.offsetWidth; // the pending state is drawn before the transition starts
    card.classList.add('anim');
    card.removeAttribute('data-anim');
    $$('[data-count]', card).forEach((n) => countUp(n, (parseFloat(n.style.getPropertyValue('--i')) || 0) * STAGGER));
  };
  if (!reduce() && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      play(e.target);
    }), { threshold: 0.35 });
    cards.forEach((card) => {
      // Only cards below the fold animate; what is on screen at load stays as the HTML drew it.
      if (card.getBoundingClientRect().top < innerHeight) return;
      card.setAttribute('data-anim', 'pending');
      $$('[data-count]', card).forEach((n) => { n.textContent = fmt(n, 0); });
      io.observe(card);
    });
    addEventListener('beforeprint', () => cards.forEach(finish));
  }

  /* ---------- Hero card: three clients in turn; pauses on hover or focus ---------- */
  const hero = $('[data-hero]');
  if (hero) {
    const S = JSON.parse(hero.dataset.states);
    const rows = $$('[data-row]', hero), segs = $$('[data-seg]', hero);
    const fig = $('[data-hc-fig]', hero), name = $('[data-hc-name]', hero), callout = $('[data-callout]', hero);
    const chip = $('[data-hc-chip]', hero), pill = $('[data-hc-pill]', hero);
    const P = (x) => (x + 35) / 110 * 100;
    const pc = (x) => { const r = Math.round(x); return (r < 0 ? '−' : '') + Math.abs(r) + '%'; }; // a true minus sign
    const draw = (idx, v) => {
      rows.forEach((row, j) => {
        const x = j === idx ? v : S[j].oct;
        const bar = $('.hc-bar', row), val = $('.hc-val', row), ghost = $('.hc-ghost', row);
        const s = P(Math.min(0, x)), w = Math.abs(x) / 110 * 100, neg = x < 0;
        bar.style.insetInlineStart = s + '%';
        bar.style.width = w + '%';
        // A loss grows left of zero; its value sits on its left.
        val.style.insetInlineStart = neg ? 'auto' : `calc(${s + w}% + 8px)`;
        val.style.insetInlineEnd = neg ? `calc(${100 - s}% + 8px)` : 'auto';
        bar.classList.toggle('neg', neg);
        val.classList.toggle('neg', neg);
        val.textContent = pc(x);
        row.classList.toggle('is-on', j === idx);
        if (S[j].sep != null) { ghost.style.width = (S[j].sep / 110 * 100) + '%'; }
      });
      fig.textContent = pc(v);
      name.textContent = S[idx].name;
      if (chip) chip.classList.toggle('fig-leak', v < 0);
      if (pill && S[idx].health) { pill.textContent = S[idx].health; pill.classList.toggle('is-risk', S[idx].health !== 'Healthy'); }
      segs.forEach((b, j) => b.setAttribute('aria-pressed', String(j === idx)));
    };
    const fill = (idx, prog) => segs.forEach((b, j) => { $('.seg-bar i', b).style.width = (j < idx ? 100 : j === idx ? prog * 100 : 0) + '%'; });
    let idx = S.length - 1;
    if (reduce()) {
      segs.forEach((b, j) => b.addEventListener('click', () => { idx = j; draw(j, S[j].oct); fill(j, 1); callout.classList.toggle('is-on', j === S.length - 1); }));
    } else {
      let paused = false, elapsed = 0, last = performance.now(), anim = null;
      const start = (i, delay = 0) => {
        idx = i;
        const from = S[i].sep ?? 0;
        anim = { from, to: S[i].oct, t0: performance.now() + delay };
        elapsed = -delay;
        callout.classList.remove('is-on');
        draw(i, from);
      };
      const tick = (now) => {
        const dt = now - last; last = now;
        if (anim) {
          const p = Math.min(1, Math.max(0, (now - anim.t0) / CHART));
          draw(idx, anim.from + (anim.to - anim.from) * ease(p));
          if (p >= 1) { anim = null; if (idx === S.length - 1) callout.classList.add('is-on'); }
        }
        if (!paused) elapsed += dt;
        if (elapsed >= HERO) start((idx + 1) % S.length);
        fill(idx, Math.max(0, Math.min(1, elapsed / HERO)));
        requestAnimationFrame(tick);
      };
      ['mouseenter', 'focusin'].forEach((ev) => hero.addEventListener(ev, () => { paused = true; }));
      ['mouseleave', 'focusout'].forEach((ev) => hero.addEventListener(ev, () => { paused = false; }));
      segs.forEach((b, j) => b.addEventListener('click', () => start(j)));
      start(0, 700);
      requestAnimationFrame(tick);
    }
  }

  /* ---------- White label: the brand switch re-skins the excerpt and replays it ---------- */
  const wl = $('[data-wl]');
  if (wl) {
    const opts = $$('[role="radio"]', wl), frame = $('.wl-frame', wl);
    const pick = (o, focus) => {
      opts.forEach((x) => { const on = x === o; x.setAttribute('aria-checked', String(on)); x.tabIndex = on ? 0 : -1; wl.classList.toggle('b-' + x.dataset.brand, on); });
      $$('[data-logo]', wl).forEach((img) => { const on = img.dataset.logo === o.dataset.brand; img.classList.toggle('is-on', on); img.alt = on ? o.textContent.trim() : ''; });
      $('[data-wl-desc]', wl).textContent = o.dataset.desc;
      $('[data-wl-domain]', wl).textContent = o.dataset.domain;
      if (focus) o.focus();
      if (!reduce()) play(frame);
    };
    opts.forEach((o, i) => {
      o.addEventListener('click', () => { if (o.getAttribute('aria-checked') !== 'true') pick(o); });
      o.addEventListener('keydown', (e) => {
        const rtl = getComputedStyle(o).direction === 'rtl';
        const k = e.key, n = opts.length;
        const fwd = k === 'ArrowDown' || (k === 'ArrowRight') !== rtl && (k === 'ArrowRight' || k === 'ArrowLeft');
        if (!['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(k)) return;
        e.preventDefault();
        const j = k === 'Home' ? 0 : k === 'End' ? n - 1 : (i + (k === 'ArrowUp' ? -1 : fwd ? 1 : -1) + n) % n;
        pick(opts[j], true);
      });
    });
  }
})();
