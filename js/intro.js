/* Banda UCB - opening logo animation (ICICI-style).
   Add ONCE to every page, inside <head>, as the FIRST script (no "defer"):
       <script src="js/intro.js"></script>
   When the site opens: maroon screen, logo in the centre, then it slowly glides up
   and settles into the header logo spot while the maroon fades away.
   Plays once per browser tab visit (add ?intro=1 to the address to replay it).
   No page-to-page animation. Respects "reduce motion" settings. */
(function () {
  'use strict';

  /* 'session' = opening animation once per visit | 'always' = on every fresh load | 'off' */
  var INTRO_MODE = 'session';

  var root = document.documentElement;
  if (!root) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var KEY_INTRO = 'arcotIntroDone';
  var store = null;
  try { store = window.sessionStorage; } catch (e) {}
  function sget(k) { try { return store ? store.getItem(k) : null; } catch (e) { return null; } }
  function sset(k, v) { try { if (store) store.setItem(k, v); } catch (e) {} }
  
  var EASE_MOVE = 'cubic-bezier(.76,0,.24,1)', EASE_OUT = 'cubic-bezier(.2,.8,.2,1)';
  var BRAND_MARK = '.brand-row .brand .brand-logo';

  /* ---------- styles (injected, so no CSS file needs editing) ---------- */
  var css =
    'html.ai-lock{overflow:hidden!important}' +
    'html.ai-hide-brand .brand-row .brand-logo,html.ai-hide-brand .brand-row .brand-copy{opacity:0!important}' +
    '.ai-layer{position:fixed;inset:0;z-index:2147483000;overflow:hidden}' +
    '.ai-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 42%,#7d1e36 0%,#5a1222 46%,#38090f 100%)}' +
    '.ai-bg::before{content:"";position:absolute;inset:0;opacity:.07;background-image:radial-gradient(#fff 1px,transparent 1.6px);background-size:26px 26px}' +
    '.ai-pulse{position:absolute;left:50%;top:50%;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#E8B03A;animation:aiPulse 1s ease-in-out infinite}' +
    '@keyframes aiPulse{0%,100%{transform:scale(.6);opacity:.45}50%{transform:scale(1.25);opacity:1}}' +
    '.ai-mark{position:fixed!important;margin:0!important;z-index:2;will-change:transform,opacity}' +
    '.ai-ring{position:fixed;border-radius:50%;border:2px solid #E8B03A;pointer-events:none;z-index:1;opacity:0}' +
    '.ai-name{position:fixed;left:0;right:0;text-align:center;color:#fff;z-index:2;opacity:0;padding:0 20px}' +
    '.ai-name strong{display:block;font:700 clamp(1.05rem,2.6vw,1.6rem)/1.25 "Noto Sans Tamil",Inter,system-ui,sans-serif;letter-spacing:.02em}' +
    '.ai-name small{display:block;margin-top:8px;font:500 clamp(.72rem,1.5vw,.9rem) Inter,system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#E8B03A}';
  css += 'html body{opacity:1!important;transition:none!important}';
  var style = document.createElement('style');
  style.id = 'ai-style';
  style.textContent = css;
  (document.head || root).appendChild(style);

  /* ---------- helpers ---------- */
  function el(tag, cls) { var n = document.createElement(tag); if (cls) n.className = cls; return n; }
  function anim(node, frames, opts) { try { return node.animate(frames, opts); } catch (e) { return null; } }
  function q(sel) { return document.querySelector(sel); }

  /* wait until test() is true (polled), but never longer than maxMs */
  function waitFor(test, maxMs, cb) {
    var t0 = Date.now(), fired = false;
    function fire(v) { if (fired) return; fired = true; clearInterval(iv); cb(v); }
    var iv = setInterval(function () {
      var v = test();
      if (v) fire(v); else if (Date.now() - t0 > maxMs) fire(null);
    }, 50);
    var v0 = test(); if (v0) fire(v0);
  }
  function brandMark() {
    var m = q(BRAND_MARK);
    if (!m) return null;
    var r = m.getBoundingClientRect();
    if (m.tagName === 'IMG' && !m.complete) return null;            /* wait until the logo image has loaded */
    return (r.width > 0 && r.height > 0) ? m : null;
  }
  function pageBuilt() {
    var pr = document.getElementById('page-root');
    return !pr || pr.children.length > 0;
  }
  function settle(ms, cb) {                     /* fonts + two frames, capped */
    var fonts = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    var cap = new Promise(function (res) { setTimeout(res, ms); });
    Promise.race([fonts, cap]).then(function () {
      requestAnimationFrame(function () { requestAnimationFrame(cb); });
    });
  }

  /* ================= 1. Opening animation ================= */
  function runIntro() {
    root.classList.add('ai-lock', 'ai-hide-brand');
    var layer = el('div', 'ai-layer'), bg = el('div', 'ai-bg'), pulse = el('div', 'ai-pulse');
    layer.setAttribute('aria-hidden', 'true');
    layer.appendChild(bg); layer.appendChild(pulse);
    root.appendChild(layer);

    var closed = false;
    function cleanup() {
      if (closed) return; closed = true;
      if (layer.parentNode) layer.parentNode.removeChild(layer);
      root.classList.remove('ai-lock', 'ai-hide-brand');
    }
    setTimeout(cleanup, 10000);                  /* safety net */

    waitFor(function () { return brandMark() && pageBuilt() ? brandMark() : null; }, 4000, function (mark) {
      if (!mark) {                              /* header never appeared: just fade out */
        anim(layer, [{ opacity: 1 }, { opacity: 0 }], { duration: 500, fill: 'forwards' });
        setTimeout(cleanup, 520);
        return;
      }
      settle(1400, function () { stage(brandMark() || mark); });
    });

    function stage(mark) {
      if (window.scrollY) window.scrollTo(0, 0);
      var r = mark.getBoundingClientRect(), cs = getComputedStyle(mark);
      var S = Math.max(2, Math.min(3.4, 170 / r.width));            /* centre logo ~128px wide */
      var cx = innerWidth / 2, cy = innerHeight * 0.45;
      var dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
      function T(s) { return 'translate(' + dx + 'px,' + dy + 'px) scale(' + s + ')'; }

      /* the moving logo is a copy of the real header logo, so it looks identical */
      var m = mark.cloneNode(true), st = m.style;
      m.classList.add('ai-mark');
      st.left = r.left + 'px'; st.top = r.top + 'px'; st.width = r.width + 'px'; st.height = r.height + 'px';
      var isImg = (m.tagName === 'IMG');
      st.background = isImg ? 'transparent' : cs.backgroundColor; st.color = cs.color;
      st.border = isImg ? '0' : cs.borderTopWidth + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor;
      st.borderRadius = isImg ? '0' : cs.borderRadius; st.boxShadow = isImg ? 'none' : cs.boxShadow; if (isImg) st.padding = '0';
      st.fontFamily = cs.fontFamily; st.fontSize = cs.fontSize; st.fontWeight = cs.fontWeight;
      if (m.tagName !== 'IMG') { st.display = 'grid'; st.placeItems = 'center'; } else { st.objectFit = 'contain'; }
      st.opacity = '0';
      var glow = null;
      if (isImg) {
        var gs = Math.max(r.width, r.height) * S * 1.6;
        glow = el('div', 'ai-glow');
        glow.style.cssText = 'position:fixed;z-index:1;pointer-events:none;border-radius:50%;left:' + (cx - gs / 2) + 'px;top:' + (cy - gs / 2) + 'px;width:' + gs + 'px;height:' + gs + 'px;background:radial-gradient(circle,rgba(255,255,255,.98) 0%,rgba(255,255,255,.94) 46%,rgba(255,255,255,0) 70%)';
        layer.appendChild(glow);
        anim(glow, [{ opacity: 0, transform: 'scale(.7)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 700, easing: EASE_OUT, fill: 'forwards' });
      }
      layer.appendChild(m);

      anim(pulse, [{ opacity: 1 }, { opacity: 0 }], { duration: 200, fill: 'forwards' });
      anim(m, [{ transform: T(S * 0.6), opacity: 0 }, { transform: T(S), opacity: 1 }],
        { duration: 700, easing: EASE_OUT, fill: 'forwards' });

      /* two soft gold rings expanding behind the logo */
      var rs = r.width * S + 34;
      [350, 900].forEach(function (delay) {
        var ring = el('div', 'ai-ring');
        ring.style.cssText = 'left:' + (cx - rs / 2) + 'px;top:' + (cy - rs / 2) + 'px;width:' + rs + 'px;height:' + rs + 'px';
        layer.appendChild(ring);
        anim(ring, [{ transform: 'scale(.85)', opacity: 0.9 }, { transform: 'scale(1.5)', opacity: 0 }],
          { duration: 1500, delay: delay, easing: 'ease-out', fill: 'both' });
      });

      /* bank name under the logo */
      var s1 = q('.brand-row .brand-copy strong'), s2 = q('.brand-row .brand-copy small');
      var nm = el('div', 'ai-name');
      nm.style.top = (cy + r.height * S / 2 + 40) + 'px';
      var n1 = el('strong'), n2 = el('small');
      n1.textContent = s1 ? s1.textContent : ''; n2.textContent = s2 ? s2.textContent : '';
      nm.appendChild(n1); if (n2.textContent) nm.appendChild(n2);
      layer.appendChild(nm);
      anim(nm, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }],
        { duration: 650, delay: 450, easing: EASE_OUT, fill: 'forwards' });

      /* after a short hold, glide the logo up to its place in the header */
      setTimeout(function () {
        var real = brandMark() || mark, r2 = real.getBoundingClientRect();
        var endT = 'translate(' + (r2.left - r.left) + 'px,' + (r2.top - r.top) + 'px) scale(' + (r2.width / r.width) + ')';
        anim(nm, [{ opacity: 1 }, { opacity: 0, transform: 'translateY(-8px)' }], { duration: 320, fill: 'forwards' });
        if (glow) anim(glow, [{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' });
        anim(m, [{ transform: T(S) }, { transform: endT }], { duration: 1700, easing: EASE_MOVE, fill: 'forwards' });
        anim(bg, [{ opacity: 1 }, { opacity: 0 }], { duration: 1300, delay: 250, easing: 'ease-in-out', fill: 'forwards' });
        setTimeout(land, 1720);
      }, 2000);

      function land() {
        root.classList.remove('ai-hide-brand');
        var copy = q('.brand-row .brand-copy');
        if (layer.parentNode) layer.parentNode.removeChild(layer);
        if (copy) anim(copy, [{ opacity: 0, transform: 'translateX(-10px)' }, { opacity: 1, transform: 'none' }],
          { duration: 650, easing: EASE_OUT, fill: 'backwards' });
        cleanup();
      }
    }
  }

  /* Go straight to the next page: stop app.js's fade-out-on-click (it caused the white flash).
     No preventDefault, so the browser navigates normally and instantly. */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    var u; try { u = new URL(a.href, location.href); } catch (err) { return; }
    if (u.origin !== location.origin || !/(\.html?|\/)$/.test(u.pathname) || u.pathname === location.pathname) return;
    e.stopImmediatePropagation();
  }, true);

  /* Back/forward restoring a cached page: never leave the intro layer stuck on screen */
  addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    Array.prototype.forEach.call(document.querySelectorAll('.ai-layer'), function (n) { n.remove(); });
    root.classList.remove('ai-lock', 'ai-hide-brand');
  });

  /* ================= start-up decision ================= */
  var force = /[?&]intro=1(&|$)/.test(location.search);
  if (INTRO_MODE !== 'off' && (force || INTRO_MODE === 'always' || !sget(KEY_INTRO))) {
    sset(KEY_INTRO, '1');
    runIntro();
  }
})();