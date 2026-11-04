/* Co.Solutions site script. No tracking, no cookies, no storage. */

/* ---------- Site config: the only values to change ---------- */
const CONFIG = {
  // WhatsApp number that receives demo requests.
  // Digits only, with the country code, no "+" or spaces. Example: 201012345678
  whatsapp: "201207548813",
  messages: {
    demo: "Hi Co.Solutions, I'd like a demo of the agency system.",
    question: "Hi Co.Solutions, I have a question about the agency system."
  }
};

(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  /* ---------- WhatsApp links ---------- */
  const number = String(CONFIG.whatsapp).replace(/\D/g, '');
  const waLink = text => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  $$('[data-wa]').forEach(a => { a.href = waLink(CONFIG.messages[a.dataset.wa] || CONFIG.messages.demo); });

  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Header: scrolled state, progress, mobile bar ---------- */
  const hdr = $('#hdr'), mbar = $('#mbar'), prog = $('.progress');
  if (hdr) {
    const onScroll = () => {
      const y = scrollY, doc = document.documentElement, h = doc.scrollHeight - innerHeight;
      hdr.classList.toggle('scrolled', y > 8);
      if (prog) prog.style.setProperty('--p', h > 0 ? (y / h).toFixed(4) : 0);
      if (mbar) mbar.classList.toggle('show', y > innerHeight * 0.6 && (innerHeight + y) < doc.scrollHeight - 160);
    };
    addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(onScroll);
  }

  /* ---------- Scrollspy for the section nav ---------- */
  const navLinks = $$('.nav a, .sheet nav a');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        navLinks.forEach(a => a.setAttribute('aria-current', a.getAttribute('href') === '#' + e.target.id ? 'true' : 'false'));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'problem', 'idea', 'product', 'brand', 'why', 'security', 'how', 'faq', 'start']
      .forEach(id => { const el = document.getElementById(id); if (el) spy.observe(el); });
  }

  /* ---------- Mobile menu ---------- */
  const sheet = $('#sheet'), menuBtn = $('#menuBtn');
  if (sheet && menuBtn) {
    const focusables = () => $$('a[href], button', sheet);
    let open = false, hideTimer = 0;
    const openSheet = () => {
      clearTimeout(hideTimer);
      open = true;
      sheet.hidden = false;
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // The sheet is visibility:hidden until .open applies, so focus after it does.
      requestAnimationFrame(() => { sheet.classList.add('open'); $('#sheetClose').focus(); });
    };
    const closeSheet = (focus = true) => {
      if (!open) return;
      open = false;
      sheet.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hideTimer = setTimeout(() => { sheet.hidden = true; }, 220);
      if (focus) menuBtn.focus();
    };
    menuBtn.addEventListener('click', openSheet);
    $('#sheetClose').addEventListener('click', () => closeSheet());
    $$('a', sheet).forEach(a => a.addEventListener('click', () => closeSheet(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeSheet(); });
    sheet.addEventListener('keydown', e => {
      if (e.key !== 'Tab') return;
      const f = focusables(), first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    matchMedia('(min-width: 1101px)').addEventListener('change', e => { if (e.matches) closeSheet(false); });
  }

  /* ---------- Product screens: ARIA tabs with arrow keys ---------- */
  const tabs = $$('.tt');
  const selectTab = (key, focus = false) => {
    tabs.forEach(t => {
      const on = t.dataset.key === key;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (!panel) return;
      const wasHidden = panel.hidden;
      panel.hidden = !on;
      if (on) {
        if (wasHidden && !reduceMotion) { panel.classList.remove('tp-anim'); void panel.offsetWidth; panel.classList.add('tp-anim'); }
        if (focus) t.focus();
        const list = t.parentElement;
        list.scrollTo({ left: Math.max(0, t.offsetLeft - list.offsetLeft - 20), behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectTab(t.dataset.key));
    t.addEventListener('keydown', e => {
      let j = null;
      if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') j = 0;
      if (e.key === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); selectTab(tabs[j].dataset.key, true); }
    });
  });
  $$('[data-tab]').forEach(a => a.addEventListener('click', () => selectTab(a.dataset.tab)));

  /* ---------- White label: switch the brand ---------- */
  const brandBtns = $$('.brand-opt');
  brandBtns.forEach(b => b.addEventListener('click', () => {
    brandBtns.forEach(x => x.setAttribute('aria-pressed', x === b));
    $$('.wl-set').forEach(s => { s.hidden = s.dataset.brand !== b.dataset.brand; });
  }));
})();
