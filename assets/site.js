/* Co.Solutions site script. No tracking, no cookies, no storage. */

/* ---------- Site config: the only values to change ---------- */
const CONFIG = {
  // WhatsApp number that receives messages. Digits only, with the country code.
  whatsapp: "201207548813",
  messages: {
    demo: "Hi Co.Solutions, I'd like a demo of the agency system.",
    question: "Hi Co.Solutions, I have a question about the agency system."
  }
};

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ANIM_MS = 300;

  /* ---------- WhatsApp links and the year ---------- */
  const number = String(CONFIG.whatsapp).replace(/\D/g, '');
  $$('[data-wa]').forEach(a => {
    a.href = `https://wa.me/${number}?text=${encodeURIComponent(CONFIG.messages[a.dataset.wa] || CONFIG.messages.demo)}`;
  });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Header: solid after 8 px of scroll ---------- */
  const header = $('.header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 8);
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Phone menu: a modal dialog traps focus and closes on Escape ---------- */
  const sheet = $('#sheet'), menuBtn = $('#menuBtn');
  if (sheet && menuBtn) {
    const lock = on => document.documentElement.classList.toggle('menu-open', on);
    menuBtn.addEventListener('click', () => {
      sheet.showModal();
      lock(true);
      menuBtn.setAttribute('aria-expanded', 'true');
    });
    sheet.addEventListener('close', () => {
      lock(false);
      menuBtn.setAttribute('aria-expanded', 'false');
    });
    $('#sheetClose').addEventListener('click', () => sheet.close());
    sheet.addEventListener('click', e => { if (e.target === sheet) sheet.close(); });
    $$('a', sheet).forEach(a => a.addEventListener('click', e => {
      const target = a.hash && document.querySelector(a.hash);
      sheet.close();
      lock(false);
      if (!target) return;
      // Scroll only after the page is unlocked, or the jump is lost.
      e.preventDefault();
      history.pushState(null, '', a.hash);
      target.scrollIntoView({ behavior: reduceMotion() ? 'instant' : 'smooth' });
    }));
    matchMedia('(min-width: 768px)').addEventListener('change', e => { if (e.matches && sheet.open) sheet.close(); });
  }

  /* ---------- Accordions: one open item per group ---------- */
  // Keeps the clicked question where it is on screen while the item above it closes.
  const holdInPlace = el => {
    const top = el.getBoundingClientRect().top;
    const fix = () => scrollBy({ top: el.getBoundingClientRect().top - top, behavior: 'instant' });
    if (reduceMotion()) { fix(); return; }
    const end = performance.now() + ANIM_MS;
    const step = () => { fix(); if (performance.now() < end) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  };
  const setItem = (item, open) => {
    item.classList.toggle('is-open', open);
    if (open) item.classList.add('was-open');
    $('.acc-btn', item).setAttribute('aria-expanded', String(open));
  };
  const openItem = item => {
    $$(':scope > .acc-item', item.parentElement).forEach(i => { if (i !== item) setItem(i, false); });
    setItem(item, true);
  };
  $$('.acc-btn').forEach(btn => btn.addEventListener('click', () => {
    const item = btn.closest('.acc-item');
    holdInPlace(btn);
    if (item.classList.contains('is-open')) setItem(item, false);
    else openItem(item);
  }));
  $$('.acc-item.is-open').forEach(i => i.classList.add('was-open'));

  // Deep links: #q1 to #q5 open their question and bring it below the header.
  const openFromHash = () => {
    const id = location.hash.slice(1);
    const item = id && document.getElementById(id);
    if (!item || !item.classList.contains('acc-item')) return;
    openItem(item);
    const go = () => item.scrollIntoView({ block: 'start', behavior: 'instant' });
    go();
    setTimeout(go, reduceMotion() ? 0 : ANIM_MS);
  };
  addEventListener('hashchange', openFromHash);
  openFromHash();

  /* ---------- White label: brand switcher as a radio group ---------- */
  const radios = $$('.seg-opt');
  const pickBrand = (radio, focus) => {
    radios.forEach(r => {
      const on = r === radio;
      r.setAttribute('aria-checked', String(on));
      r.tabIndex = on ? 0 : -1;
    });
    $$('.wl-set').forEach(s => s.classList.toggle('is-on', s.dataset.brand === radio.dataset.brand));
    $$('.wl-who').forEach(s => { s.hidden = s.dataset.brand !== radio.dataset.brand; });
    if (focus) radio.focus();
  };
  radios.forEach((r, i) => {
    r.addEventListener('click', () => pickBrand(r));
    r.addEventListener('keydown', e => {
      const n = radios.length;
      const next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1 + n, ArrowUp: i - 1 + n, Home: 0, End: n - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      pickBrand(radios[next % n], true);
    });
  });

  /* ---------- Reveal once on first scroll into view ---------- */
  const reveals = $$('.reveal');
  if (reveals.length) {
    if (!('IntersectionObserver' in window) || reduceMotion()) {
      reveals.forEach(el => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }), { rootMargin: '0px 0px -6% 0px' });
      reveals.forEach(el => io.observe(el));
    }
  }
})();
