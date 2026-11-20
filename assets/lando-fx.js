/* lando-fx.js — motion patterns studied from landonorris.com, re-implemented from scratch.
   Vanilla WAAPI, no deps, no assets copied. Disable by removing the <script>/<link> tags. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var root = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // GSAP-equivalent easings
  var EASE_IO = "cubic-bezier(.455,.03,.515,.955)"; // power2.inOut
  var EASE_OUT3 = "cubic-bezier(.215,.61,.355,1)";  // power3.out

  if (!reduce) root.classList.add("fx-on");

  /* ---------- 0. Accent color (read by the cursor trail, the aurora and image fallbacks) ---------- */
  var acCache = "255,180,0";
  function readAC() {
    var v = getComputedStyle(root).getPropertyValue("--ac").replace(/\s/g, "");
    acCache = v || "255,180,0";
  }
  window.__acRGB = function () { return acCache; };   // read by app.js aurora + the cursor trail
  readAC();

  /* ---------- Image fallback: missing screenshots get a labelled placeholder, never a broken icon ---------- */
  function imgFallback(im) {
    if (!im || im.tagName !== "IMG" || im.dataset.ph) return;
    im.dataset.ph = "1";
    var t = (im.dataset.label || im.alt || "Screenshot").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
    var ac = "rgb(" + acCache + ")";
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#0a0a0a"/>' +
      '<circle cx="1000" cy="170" r="110" fill="none" stroke="' + ac + '" stroke-opacity=".45"/>' +
      '<circle cx="1000" cy="170" r="180" fill="none" stroke="' + ac + '" stroke-opacity=".22"/>' +
      '<text x="70" y="560" font-family="monospace" font-size="34" font-weight="700" fill="' + ac + '">' + t + '</text>' +
      '<text x="70" y="598" font-family="monospace" font-size="22" fill="#8a8a8a">screenshot coming soon</text></svg>';
    im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    document.dispatchEvent(new CustomEvent("fx-img-placeholder"));
  }
  document.addEventListener("error", function (e) { imgFallback(e.target); }, true);
  // images that already failed before this script ran
  Array.prototype.forEach.call(document.images, function (im) { if (im.complete && im.naturalWidth === 0 && im.getAttribute("src")) imgFallback(im); });

  /* ---------- 1. Oval clip-path reveal (headings) ---------- */
  function wrapClip(el, inline) {
    var w = document.createElement("div");
    w.className = "fx-clip" + (inline ? " fx-inline" : "");
    el.parentNode.insertBefore(w, el);
    w.appendChild(el);
    return w;
  }
  function reveal(w, delay) {
    w._fxStarted = performance.now();
    if (reduce) { w.classList.add("fx-done"); return; }
    var inner = w.firstElementChild;
    var o = { duration: 1500, easing: EASE_IO, delay: delay || 0, fill: "both" };
    w.animate([{ clipPath: "ellipse(20% 0% at 50% 100%)" }, { clipPath: "ellipse(100% 120% at 50% 100%)" }], o);
    var a = inner.animate([{ transform: "translateY(40%)" }, { transform: "translateY(0%)" }], o);
    a.onfinish = function () { w.classList.add("fx-done"); w.getAnimations().forEach(function (x) { x.cancel(); }); inner.getAnimations().forEach(function (x) { x.cancel(); }); };
  }
  var targets = [];
  $$(".sh .chip, .sh h2, .sh p").forEach(function (el, i) { targets.push({ w: wrapClip(el), d: (i % 3) * 150 }); });
  var heroEls = $$(".hero .script, .hero .name").map(function (el) { return wrapClip(el, true); });

  // Position check instead of IntersectionObserver: the wrapper is clipped to zero area before it
  // reveals, and a fully clipped target may never be reported as intersecting (it would stay hidden).
  var pending = targets.slice();
  function checkReveal() {
    var limit = window.innerHeight * 0.95;
    pending = pending.filter(function (t) {
      if (t.w.getBoundingClientRect().top >= limit) return true;
      reveal(t.w, t.d);
      return false;
    });
    if (!pending.length) { removeEventListener("scroll", checkReveal); removeEventListener("resize", checkReveal); }
  }
  addEventListener("scroll", checkReveal, { passive: true });
  addEventListener("resize", checkReveal);
  checkReveal();
  // failsafe: a heading whose reveal started must never stay hidden if animations are blocked or throttled
  setInterval(function () {
    $(".fx-clip:not(.fx-done)").forEach(function (w) {
      if (w._fxStarted && performance.now() - w._fxStarted > 4500) w.classList.add("fx-done");
    });
  }, 1000);
  heroEls.forEach(function (w, i) { reveal(w, 200 + i * 150); });

  /* ---------- 2. Char roll hover ---------- */
  function buildRoll(el) {
    if (el._fxBusy) return;
    el._fxBusy = true;
    var txt = el.getAttribute("data-fx-text");
    if (!txt) txt = el.textContent;
    el.setAttribute("data-fx-text", txt);
    el.setAttribute("aria-label", txt.trim());
    el.textContent = "";
    var holder = document.createElement("span");
    holder.className = "fx-roll";
    holder.setAttribute("aria-hidden", "true");
    for (var i = 0; i < txt.length; i++) {
      var c = document.createElement("span");
      c.className = "fx-ch";
      c.textContent = txt[i];
      c.setAttribute("data-c", txt[i]);
      holder.appendChild(c);
    }
    el.appendChild(holder);
    el._fxBusy = false;
  }
  function roll(el, to) {
    $$(".fx-ch", el).forEach(function (c, i) {
      c.animate([{ transform: c.style.transform || "translateY(0)" }, { transform: "translateY(" + (to ? "-100%" : "0") + ")" }],
        { duration: 600, delay: i * 20, easing: EASE_OUT3, fill: "forwards" });
    });
  }
  var rollEls = reduce ? [] : $$(".nl a, .cta, .btn");
  rollEls.forEach(function (el) {
    // only plain-text leaves (skip anchors with nested markup)
    if (el.children.length) return;
    buildRoll(el);
    el.addEventListener("mouseenter", function () { roll(el, true); });
    el.addEventListener("mouseleave", function () { roll(el, false); });
    el.addEventListener("focus", function () { roll(el, true); });
    el.addEventListener("blur", function () { roll(el, false); });
    // app.js rewrites textContent on language switch -> rebuild
    new MutationObserver(function () {
      if (el._fxBusy || $(".fx-roll", el)) return;
      el.removeAttribute("data-fx-text");
      buildRoll(el);
    }).observe(el, { childList: true, characterData: true });
  });

  /* ---------- 3. Scroll-reactive marquee ---------- */
  var anchor = $(".div");
  if (anchor && !reduce) {
    var words = ["Laravel", "PHP", "MySQL", "Flutter", "REST API", "Python", "YOLOv5", "Streamlit"];
    var band = document.createElement("div");
    band.className = "fx-marquee";
    band.setAttribute("aria-hidden", "true");
    var track = document.createElement("div");
    track.className = "fx-marquee-track";
    function makeSet() {
      var s = document.createElement("div");
      s.className = "fx-marquee-set";
      words.forEach(function (w) {
        var sp = document.createElement("span"); sp.textContent = w; s.appendChild(sp);
        s.appendChild(document.createElement("i"));
      });
      return s;
    }
    track.appendChild(makeSet()); track.appendChild(makeSet());
    band.appendChild(track);
    anchor.parentNode.insertBefore(band, anchor);

    var x = 0, dir = -1, base = 0.6, vel = 0, lastY = window.scrollY, visible = false, raf = 0;
    new IntersectionObserver(function (es) {
      visible = es[0].isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    }, { rootMargin: "100px" }).observe(band);
    window.addEventListener("scroll", function () {
      var y = window.scrollY, d = y - lastY; lastY = y;
      if (d) { dir = d > 0 ? -1 : 1; vel += Math.min(Math.abs(d), 80) * .06; }  // flips with scroll direction
    }, { passive: true });
    function tick() {
      raf = 0;
      if (!visible) return;
      vel *= 0.92;
      x += dir * (base + vel);
      var half = track.scrollWidth / 2;
      if (x <= -half) x += half;
      if (x > 0) x -= half;
      track.style.transform = "translate3d(" + x + "px,0,0)";
      raf = requestAnimationFrame(tick);
    }
  }

  /* ---------- 4. Highlight bar wipe ---------- */
  $$(".hero .d strong").forEach(function (el) {
    if (reduce) return;
    var t = el.textContent;
    el.textContent = "";
    el.classList.add("fx-hl");
    var s = document.createElement("span"); s.textContent = t; el.appendChild(s);
    // bar sweeps in from left, then exits right (scaleX wipe, like the site's text highlights)
    var bar = document.createElement("i");
    bar.style.cssText = "position:absolute;inset:0 -.15em;background:var(--red);z-index:0;pointer-events:none;transform:scaleX(0)";
    el.insertBefore(bar, el.firstChild);
    bar.animate([
      { transform: "scaleX(0)", transformOrigin: "left center" },
      { transform: "scaleX(1)", transformOrigin: "left center", offset: .5 },
      { transform: "scaleX(1)", transformOrigin: "right center", offset: .5 },
      { transform: "scaleX(0)", transformOrigin: "right center" }
    ], { duration: 1200, delay: 900, easing: EASE_IO, fill: "forwards" }).onfinish = function () { bar.remove(); };
  });

  /* ---------- 5. Counter: numbers count up when visible ---------- */
  var EASE_OUT_EXPO = function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); };
  function countUp(b) {
    var m = /^(\d+)(.*)$/.exec(b.textContent.trim());
    if (!m) return;
    var n = +m[1], suffix = m[2];
    if (reduce) return;
    b._fxSet = true;
    var t0 = performance.now(), dur = 1600;
    (function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      b.textContent = Math.round(n * EASE_OUT_EXPO(p)) + suffix;
      if (p < 1) requestAnimationFrame(step); else b._fxLast = b.textContent;
    })(t0);
    b._fxSet = false;
  }
  var statB = $$(".hr .stats b");
  if (statB.length && !reduce && "IntersectionObserver" in window) {
    var cio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { cio.unobserve(e.target); countUp(e.target); } });
    }, { threshold: .6 });
    statB.forEach(function (b) {
      cio.observe(b);
      b._fxLast = b.textContent;
      // language switch rewrites the text -> show it directly, no recount
      new MutationObserver(function () { b._fxLast = b.textContent; }).observe(b, { childList: true, characterData: true });
    });
  }

  /* ---------- 6. Image wipe on project cards ---------- */
  function wipe(bi) {
    if (bi._fxWiped || reduce) return;
    bi._fxWiped = true;
    var cover = document.createElement("i");
    cover.className = "fx-wipe";
    bi.appendChild(cover);
    var o = { duration: 1100, easing: EASE_IO, fill: "forwards" };
    cover.animate([
      { transform: "scaleY(0)", transformOrigin: "50% 100%" },
      { transform: "scaleY(1)", transformOrigin: "50% 100%", offset: .5 },
      { transform: "scaleY(1)", transformOrigin: "50% 0%", offset: .5 },
      { transform: "scaleY(0)", transformOrigin: "50% 0%" }
    ], o).onfinish = function () { cover.remove(); };
    var img = $("img", bi);
    if (img) img.animate([{ transform: "scale(1.2)" }, { transform: "scale(1.2)", offset: .5 }, { transform: "scale(1)" }], { duration: 1100, easing: EASE_IO });
  }
  var grid = $("#grid");
  if (grid && !reduce && "IntersectionObserver" in window) {
    var wio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { wio.unobserve(e.target); wipe(e.target); } });
    }, { threshold: .25 });
    var scan = function () { $$(".bi", grid).forEach(function (bi) { if (!bi._fxSeen) { bi._fxSeen = true; wio.observe(bi); } }); };
    scan();
    // app.js re-renders #grid via innerHTML (filters, language) -> new nodes are not wiped again
    new MutationObserver(function () { $$(".bi", grid).forEach(function (bi) { bi._fxWiped = true; bi._fxSeen = true; }); }).observe(grid, { childList: true });
  }

  /* ---------- 7. Cursor glow trail (canvas 2D, desktop only) ---------- */
  if (!reduce && window.matchMedia && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    var cv = document.createElement("canvas");
    cv.className = "fx-trail";
    cv.setAttribute("aria-hidden", "true");
    document.body.appendChild(cv);
    var ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0;
    var resize = function () {
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize(); addEventListener("resize", resize);
    var pts = [], mx = 0, my = 0, sx = 0, sy = 0, run = false;
    addEventListener("pointermove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!pts.length) { sx = mx; sy = my; }
      if (!run) { run = true; requestAnimationFrame(loop); }
    }, { passive: true });
    function loop() {
      sx += (mx - sx) * .22; sy += (my - sy) * .22;             // lerp-follow
      pts.push({ x: sx, y: sy, life: 1 });
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (var i = pts.length - 1; i >= 0; i--) {
        var p = pts[i];
        p.life -= .035;
        if (p.life <= 0) { pts.splice(i, 1); continue; }
        var r = 6 + 34 * p.life;
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, "rgba(" + acCache + "," + (.16 * p.life) + ")");
        g.addColorStop(1, "rgba(" + acCache + ",0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.2832); ctx.fill();
      }
      if (pts.length && (Math.abs(mx - sx) > .3 || pts.length > 1)) requestAnimationFrame(loop);
      else { run = false; ctx.clearRect(0, 0, W, H); }
    }
  }

  /* ---------- 8. Profile photo wipe (once, on load) ---------- */
  var portrait = $(".portrait");
  if (portrait && !reduce) {
    var pc = document.createElement("i");
    pc.className = "fx-wipe fx-wipe-p";
    portrait.appendChild(pc);
    var po = { duration: 1200, delay: 700, easing: EASE_IO, fill: "forwards" };
    pc.animate([
      { transform: "scaleY(0)", transformOrigin: "50% 100%" },
      { transform: "scaleY(1)", transformOrigin: "50% 100%", offset: .5 },
      { transform: "scaleY(1)", transformOrigin: "50% 0%", offset: .5 },
      { transform: "scaleY(0)", transformOrigin: "50% 0%" }
    ], po).onfinish = function () { pc.remove(); };
    var pimg = $("img", portrait);
    if (pimg) pimg.animate([{ transform: "scale(1.15)" }, { transform: "scale(1.15)", offset: .5 }, { transform: "scale(1)" }], { duration: 1200, delay: 700, easing: EASE_IO });
  }

  /* ---------- 9. 3D tilt on cards (desktop, delegated so re-rendered cards keep working) ---------- */
  if (!reduce && window.matchMedia && matchMedia("(hover:hover) and (pointer:fine)").matches) {
    var tilted = null;
    var untilt = function () {
      if (tilted) { tilted.style.removeProperty("--rx"); tilted.style.removeProperty("--ry"); tilted.classList.remove("fx-tilt"); tilted = null; }
    };
    document.addEventListener("pointermove", function (e) {
      var card = e.target.closest && e.target.closest(".bc, .hc");
      if (card !== tilted) { untilt(); if (card) { tilted = card; card.classList.add("fx-tilt"); } }
      if (!card) return;
      var r = card.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      card.style.setProperty("--rx", (-py * 7).toFixed(2) + "deg");
      card.style.setProperty("--ry", (px * 7).toFixed(2) + "deg");
    }, { passive: true });
    document.addEventListener("pointerleave", untilt);
  }

  /* ---------- 10. Scroll progress bar ---------- */
  var bar = document.createElement("div");
  bar.className = "fx-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var pTick = false;
  function paintProgress() {
    pTick = false;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ")";
  }
  addEventListener("scroll", function () { if (!pTick) { pTick = true; requestAnimationFrame(paintProgress); } }, { passive: true });
  addEventListener("resize", paintProgress);
  paintProgress();

  /* ---------- 11. Oval page transition between pages ---------- */
  var OVAL_FROM = "ellipse(20% 0% at 50% 100%)", OVAL_FULL_BOTTOM = "ellipse(100% 120% at 50% 100%)";
  var OVAL_FULL_TOP = "ellipse(100% 120% at 50% 0%)", OVAL_TO_TOP = "ellipse(20% 0% at 50% 0%)";
  function clearPT() {
    try { sessionStorage.removeItem("fx-pt"); } catch (e) {}
    root.classList.remove("fx-pt-in");
    $$(".fx-pt").forEach(function (n) { n.remove(); });
  }
  var arrived = false;
  try { arrived = sessionStorage.getItem("fx-pt") === "1"; } catch (e) {}
  if (arrived && !reduce) {
    // the incoming page starts covered (html.fx-pt-in, set in <head>); open the overlay upward
    var cover = document.createElement("div");
    cover.className = "fx-pt";
    document.body.appendChild(cover);
    root.classList.remove("fx-pt-in");
    try { sessionStorage.removeItem("fx-pt"); } catch (e) {}
    cover.animate([{ clipPath: OVAL_FULL_TOP }, { clipPath: OVAL_TO_TOP }], { duration: 800, delay: 120, easing: EASE_IO, fill: "forwards" }).onfinish = function () { cover.remove(); };
  } else { clearPT(); }
  addEventListener("pageshow", function (e) { if (e.persisted) clearPT(); });   // back/forward cache

  function goWithTransition(href) {
    if (reduce) { location.href = href; return; }
    try { sessionStorage.setItem("fx-pt", "1"); } catch (e) {}
    var c = document.createElement("div");
    c.className = "fx-pt";
    document.body.appendChild(c);
    var go = function () { location.href = href; };
    var a = c.animate([{ clipPath: OVAL_FROM }, { clipPath: OVAL_FULL_BOTTOM }], { duration: 700, easing: EASE_IO, fill: "forwards" });
    a.onfinish = go;
    setTimeout(go, 1500);   // failsafe
  }
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest("a[href]");
    var href = null;
    if (a) {
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      var u;
      try { u = new URL(a.href, location.href); } catch (_) { return; }
      if (u.origin !== location.origin) return;
      if (u.pathname === location.pathname && u.search === location.search) return;   // same page / hash only
      if (!/\.html?$|\/$/.test(u.pathname)) return;
      href = u.href;
    } else {
      var card = e.target.closest && e.target.closest(".bc");
      var more = card && card.querySelector(".go");
      if (more) { e.stopPropagation(); href = more.href; }   // app.js would navigate instantly otherwise
    }
    if (!href) return;
    e.preventDefault();
    goWithTransition(href);
  }, true);

})();
