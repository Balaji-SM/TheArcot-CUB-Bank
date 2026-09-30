/* Arcot UCB - UX flow layer. Load AFTER app.js:  <script src="js/ux.js" defer></script>
   Adds: smoother scroll effects, active-page nav marker, faster page loads (prefetch),
   footer reveal, scroll-progress ring, and removes the old Previous / Next stage buttons. */
(function(){
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var $  = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* 0. Remove the old Previous / Next buttons under the stage tabs, wherever they come from */
  function killPager(){
    $$('.product-pager, .product-pager-count, [data-pager]').forEach(function(el){ el.remove(); });
  }
  killPager();
  new MutationObserver(killPager).observe(document.documentElement, { childList: true, subtree: true });

  /* 1. One scroll handler (throttled with rAF): progress ring, sticky-nav shadow, hero fade */
  var ticking = false;
  function frame(){
    ticking = false;
    var y = window.scrollY || 0,
        max = root.scrollHeight - window.innerHeight,
        p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
    root.style.setProperty('--scroll-p', p.toFixed(4));
    document.body.classList.toggle('nav-stuck', y > 140);
    if (!reduce) {
      var hero = $('.hero') || $('.page-hero');
      if (hero) {
        var h = hero.offsetHeight || 500;
        if (y < h * 1.2) {
          hero.style.setProperty('--hero-shift', (y * 0.14).toFixed(1) + 'px');
          hero.style.setProperty('--hero-fade', (1 - Math.min(1, y / (h * 1.1)) * 0.85).toFixed(3));
        }
      }
    }
  }
  function onScroll(){ if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  frame();

  /* 2. Mark the current page in the main menu (rebuilt on every language change) */
  function markActive(){
    var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    $$('.main-nav .nav-link[href], .main-nav .nav-home').forEach(function(a){
      var h = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
      if (h && h === here) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  /* 3. Footer columns fade up one after another when the footer comes into view */
  var footIO = ('IntersectionObserver' in window && !reduce)
    ? new IntersectionObserver(function(entries){
        entries.forEach(function(e){
          if (!e.isIntersecting) return;
          footIO.unobserve(e.target);
          e.target.classList.add('ux-foot-in');
        });
      }, { threshold: 0.15 })
    : null;
  function prepFooter(){
    if (!footIO) return;
    $$('.site-footer .footer-grid > div:not(.ux-foot)').forEach(function(el, i){
      el.classList.add('ux-foot');
      el.style.setProperty('--ux-foot-d', (i * 90) + 'ms');
      footIO.observe(el);
    });
  }

  /* 4. Prefetch a page when the pointer is about to click it (faster navigation) */
  var prefetched = {};
  function prefetch(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    var u; try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.origin !== location.origin || !/\.html?$/.test(u.pathname) || u.pathname === location.pathname || prefetched[u.pathname]) return;
    prefetched[u.pathname] = 1;
    var l = document.createElement('link'); l.rel = 'prefetch'; l.href = u.pathname; l.as = 'document';
    document.head.appendChild(l);
  }
  document.addEventListener('pointerenter', prefetch, true);
  document.addEventListener('touchstart', prefetch, { passive: true, capture: true });

  /* Re-run after the app rebuilds header/footer (first load and language switch) */
  function refreshAll(){ markActive(); prepFooter(); onScroll(); }
  new MutationObserver(refreshAll).observe(document.body, { childList: true });
  document.addEventListener('DOMContentLoaded', refreshAll);
  window.addEventListener('load', refreshAll);
  refreshAll();
})();