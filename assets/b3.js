/* AFIM Consulting — interactions du thème B3 (JavaScript natif, sans dépendance). */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  root.classList.add('js');
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- Header : ton sombre sur le hero, ton clair ensuite (sans changement de hauteur) ---------- */
  var hdr = $('.hdr');
  var sentinel = $('[data-header-sentinel]');
  function setTone(light) { if (hdr) { hdr.classList.toggle('is-light', light); hdr.setAttribute('data-tone', light ? 'light' : 'dark'); } }
  if (hdr && sentinel && hasIO) {
    new IntersectionObserver(function (es) { es.forEach(function (e) { setTone(!e.isIntersecting && e.boundingClientRect.top < (hdr.offsetHeight || 72)); }); }, { threshold: 0, rootMargin: '-' + (hdr.offsetHeight || 72) + 'px 0px 0px 0px' }).observe(sentinel);
  } else if (hdr && sentinel) {
    var tick = function () { setTone(sentinel.getBoundingClientRect().bottom < (hdr.offsetHeight || 72)); };
    window.addEventListener('scroll', tick, { passive: true }); tick();
  }
  if (hdr) {
    var sc = function () { hdr.classList.toggle('is-scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', sc, { passive: true }); sc();
  }

  /* ---------- Méga-menus (bureau) ---------- */
  var megas = $$('.has-mega');
  function closeMegas(except) { megas.forEach(function (li) { if (li !== except) { li.classList.remove('open'); var b = $('.mega-btn', li); if (b) b.setAttribute('aria-expanded', 'false'); } }); }
  megas.forEach(function (li) {
    var btn = $('.mega-btn', li), timer, hoverAt = 0;
    function open() { clearTimeout(timer); closeMegas(li); li.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    function close() { li.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    btn.addEventListener('click', function () { if (Date.now() - hoverAt < 450) return; li.classList.contains('open') ? close() : open(); });
    if (window.matchMedia('(hover: hover)').matches) {
      li.addEventListener('mouseenter', function () { hoverAt = Date.now(); open(); });
      li.addEventListener('mouseleave', function () { timer = setTimeout(close, 140); });
    }
    li.addEventListener('focusout', function (e) { if (!li.contains(e.relatedTarget)) close(); });
    li.addEventListener('keydown', function (e) { if (e.key === 'Escape' && li.classList.contains('open')) { close(); btn.focus(); } });
  });
  d.addEventListener('click', function (e) { if (!e.target.closest('.has-mega')) closeMegas(); });

  /* ---------- Menu mobile : dialogue, piège à focus, verrouillage du défilement ---------- */
  var burger = $('.burger'), sheet = $('.sheet');
  if (burger && sheet) {
    var lastFocus, inertEls = $$('main, .site-foot, .bar, .skip');
    var focusables = function () { return $$('a[href], button:not([disabled]), summary', sheet).filter(function (el) { return el.offsetParent !== null; }); };
    var openSheet = function () {
      lastFocus = d.activeElement; sheet.classList.add('open'); burger.setAttribute('aria-expanded', 'true'); burger.setAttribute('aria-label', 'Fermer le menu');
      d.body.classList.add('locked'); inertEls.forEach(function (el) { el.setAttribute('inert', ''); });
      setTimeout(function () { var f = focusables(); if (f[0]) f[0].focus(); }, 60);
    };
    var closeSheet = function (restore) {
      sheet.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Ouvrir le menu');
      d.body.classList.remove('locked'); inertEls.forEach(function (el) { el.removeAttribute('inert'); });
      if (restore !== false) (lastFocus || burger).focus();
    };
    burger.addEventListener('click', function () { sheet.classList.contains('open') ? closeSheet() : openSheet(); });
    $$('[data-close-sheet]', sheet).forEach(function (el) { el.addEventListener('click', function () { closeSheet(); }); });
    $$('a', sheet).forEach(function (a) { a.addEventListener('click', function () { closeSheet(false); }); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) closeSheet(); });
    d.addEventListener('keydown', function (e) {
      if (!sheet.classList.contains('open')) return;
      if (e.key === 'Escape') { closeSheet(); return; }
      if (e.key === 'Tab') {
        var f = focusables(); if (!f.length) return; var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && d.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && d.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', function (m) { if (m.matches && sheet.classList.contains('open')) closeSheet(false); });
  }

  /* ---------- Révélations au défilement (une seule fois ; contenu visible sans JS) ---------- */
  /* Les images à masque (clip-path) sont observées via leur parent : un élément entièrement masqué n'« intersecte » jamais. */
  var masks = $$('.mask');
  var revealEls = $$('[data-reveal],[data-photo]:not(.mask)').concat(masks.map(function (m) { return m.parentElement; }));
  revealEls = revealEls.filter(function (el, i, a) { return a.indexOf(el) === i; });
  if (hasIO && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); $$('.mask', e.target).forEach(function (m) { m.classList.add('in'); }); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else { revealEls.forEach(function (el) { el.classList.add('in'); }); masks.forEach(function (m) { m.classList.add('in'); }); }

  /* ---------- Cartes : tracé des arcs quand la carte est visible (hero : après la révélation du titre) ---------- */
  var maps = $$('.map-wrap');
  if (hasIO && !reduce) {
    var mo = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); mo.unobserve(e.target); } }); }, { threshold: 0.2 });
    maps.forEach(function (m) { mo.observe(m); });
  } else { maps.forEach(function (m) { m.classList.add('in'); }); }

  /* ---------- Survol / focus : met en valeur le corridor sur la carte ---------- */
  $$('[data-map]').forEach(function (scope) {
    var map = $('#' + scope.getAttribute('data-map')); if (!map) return;
    var wrap = map.closest('.map-wrap') || map;
    var set = function (r) { if (r) wrap.setAttribute('data-active', r); else wrap.removeAttribute('data-active'); };
    $$('[data-region]', scope).forEach(function (el) {
      el.addEventListener('mouseenter', function () { set(el.getAttribute('data-region')); });
      el.addEventListener('focus', function () { set(el.getAttribute('data-region')); });
      el.addEventListener('mouseleave', function () { set(null); });
      el.addEventListener('blur', function () { set(null); });
    });
  });

  /* ---------- Onglets WAI-ARIA ---------- */
  $$('[role="tablist"]').forEach(function (list) {
    var tabs = $$('[role="tab"]', list);
    var map = list.getAttribute('data-map-target') && $('#' + list.getAttribute('data-map-target'));
    function select(tab, focus, silent) {
      tabs.forEach(function (t) { var on = t === tab; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; var p = $('#' + t.getAttribute('aria-controls')); if (p) p.hidden = !on; });
      if (map && !silent) { var w = map.closest('.map-wrap') || map; w.setAttribute('data-active', tab.getAttribute('data-region')); }
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t); });
      t.addEventListener('keydown', function (e) {
        var n = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = tabs[(i + 1) % tabs.length]; else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') n = tabs[0]; else if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    var init = $('[aria-selected="true"]', list) || tabs[0]; if (init) select(init, false, true);
  });
  $$('.pin[data-pick]').forEach(function (p) { p.addEventListener('click', function () { var t = $('[role="tab"][data-region="' + p.getAttribute('data-pick') + '"]'); if (t) { t.click(); t.focus({ preventScroll: true }); } }); });

  /* ---------- Carrousel « Départs depuis Casablanca » (mobile) ---------- */
  $$('[data-carousel]').forEach(function (car) {
    var scope = car.closest('.board') || car;
    var track = $('[data-track]', car), slides = $$('[data-slide]', car), dots = $$('[data-dot]', car);
    var prev = $('[data-prev]', scope), next = $('[data-next]', scope), status = $('[data-status]', car);
    var idx = 0;
    function go(i, smooth) {
      i = Math.max(0, Math.min(slides.length - 1, i));
      var s = slides[i];
      track.scrollTo({ left: s.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft || 0), behavior: (smooth === false || reduce) ? 'auto' : 'smooth' });
    }
    var touched = false;
    function paint(i) {
      idx = i;
      slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); s.setAttribute('aria-current', k === i ? 'true' : 'false'); });
      dots.forEach(function (dt, k) { dt.setAttribute('aria-current', k === i ? 'true' : 'false'); dt.classList.toggle('is-active', k === i); });
      if (prev) prev.disabled = i === 0; if (next) next.disabled = i === slides.length - 1;
      if (status) status.textContent = 'Destination ' + (i + 1) + ' sur ' + slides.length + ' : ' + (slides[i].getAttribute('data-name') || '');
      var r = slides[i].getAttribute('data-region'); var mw = $('#mapwrap-night'); if (mw && touched && window.matchMedia('(max-width: 767px)').matches) mw.setAttribute('data-active', r);
    }
    var raf = 0;
    track.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var c = track.scrollLeft + track.clientWidth / 2, best = 0, bd = 1e9;
        slides.forEach(function (s, k) { var m = s.offsetLeft - track.offsetLeft + s.offsetWidth / 2; var dd = Math.abs(m - c); if (dd < bd) { bd = dd; best = k; } });
        if (best !== idx) { touched = true; paint(best); }
      });
    }, { passive: true });
    if (prev) prev.addEventListener('click', function () { go(idx - 1); });
    if (next) next.addEventListener('click', function () { go(idx + 1); });
    dots.forEach(function (dt, k) { dt.addEventListener('click', function () { go(k); }); });
    car.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); } else if (e.key === 'End') { e.preventDefault(); go(slides.length - 1); }
    });
    paint(0);
  });

  /* ---------- Méthode : progression ---------- */
  var steps = $('.steps');
  if (steps && hasIO && !reduce) { new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { steps.classList.add('in'); o.disconnect(); } }); }, { threshold: 0.3 }).observe(steps); }
  else if (steps) steps.classList.add('in');

  /* ---------- Barre d'actions mobile : après le hero, masquée près du formulaire et au clavier virtuel ---------- */
  var hero = $('.hero, .sector-hero'), contact = $('#contact-section');
  function barState() { d.body.classList.toggle('bar-hide', !!(d.body.__inContact || d.body.__typing)); }
  if (hero && hasIO) new IntersectionObserver(function (es) { es.forEach(function (e) { d.body.classList.toggle('past-hero', !e.isIntersecting); }); }, { threshold: 0, rootMargin: '-80px 0px 0px 0px' }).observe(hero);
  if (contact && hasIO) new IntersectionObserver(function (es) { es.forEach(function (e) { d.body.__inContact = e.isIntersecting; barState(); }); }, { threshold: 0.15 }).observe(contact);
  d.addEventListener('focusin', function (e) { if (e.target.matches('input, textarea, select')) { d.body.__typing = true; barState(); } });
  d.addEventListener('focusout', function (e) { if (e.target.matches('input, textarea, select')) { d.body.__typing = false; barState(); } });

  /* ---------- Accordéon FAQ (articles du blog) ---------- */
  var faqItems = $$('.faq-item');
  faqItems.forEach(function (item) {
    var btn = $('.faq-question', item);
    if (!btn) return;
    btn.addEventListener('click', function () {
      var wasActive = item.classList.contains('active');
      faqItems.forEach(function (i) { i.classList.remove('active'); var q = $('.faq-question', i); if (q) q.setAttribute('aria-expanded', 'false'); });
      if (!wasActive) { item.classList.add('active'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });

  /* ---------- Formulaire de contact : envoi JSON vers le webhook n8n de production ---------- */
  var CONTACT_WEBHOOK_URL = 'https://n8n.srv1431621.hstgr.cloud/webhook/afim-contact';
  (function initContactForm() {
    var form = d.getElementById('contact-form');
    if (!form) return;
    var feedback = d.getElementById('form-feedback');
    var submitBtn = $('.btn-submit', form);

    $$('input, select, textarea', form).forEach(function (field) {
      field.addEventListener('blur', function () { validateField(field); });
      field.addEventListener('input', function () { if (field.classList.contains('invalid')) validateField(field); });
    });
    function validateField(field) {
      if (field.name === 'bot-field') return true;
      var valid = true, val = (field.value || '').trim();
      if (field.required && !val) valid = false;
      if (field.type === 'email' && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) valid = false;
      if (field.minLength > 0 && val && val.length < field.minLength) valid = false;
      field.classList.toggle('invalid', !valid);
      field.setAttribute('aria-invalid', valid ? 'false' : 'true');
      return valid;
    }
    function validateAll() {
      var ok = true, first = null;
      $$('input[required], select[required], textarea[required]', form).forEach(function (f) { if (!validateField(f)) { ok = false; if (!first) first = f; } });
      return { ok: ok, first: first };
    }
    function showFeedback(type, message) {
      if (!feedback) return;
      feedback.className = 'form-feedback ' + type;
      feedback.textContent = message;
      if (type === 'success') setTimeout(function () { feedback.className = 'form-feedback'; feedback.textContent = ''; }, 10000);
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = validateAll();
      if (!v.ok) { showFeedback('error', "Veuillez vérifier les champs en rouge avant d'envoyer votre demande."); if (v.first) v.first.focus(); return; }
      var bot = $('[name="bot-field"]', form);
      if (bot && bot.value) return; // anti-spam : on ignore silencieusement
      var originalHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Envoi en cours...'; }
      var payload = {
        name: ($('[name="name"]', form).value || '').trim(),
        phone: ($('[name="phone"]', form).value || '').trim(),
        email: ($('[name="email"]', form).value || '').trim(),
        service: ($('[name="service"]', form).value || '').trim(),
        message: ($('[name="message"]', form).value || '').trim()
      };
      fetch(CONTACT_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        .then(function (response) {
          if (!response.ok) throw new Error('Network response was not ok');
          showFeedback('success', 'Merci ! Votre demande a bien été envoyée. Notre équipe AFIM Consulting vous contactera dans les plus brefs délais.');
          form.reset();
          $$('.invalid', form).forEach(function (el) { el.classList.remove('invalid'); el.setAttribute('aria-invalid', 'false'); });
        })
        .catch(function () { showFeedback('error', 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone ou WhatsApp.'); })
        .finally(function () { if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalHtml; } });
    });
  })();
})();
