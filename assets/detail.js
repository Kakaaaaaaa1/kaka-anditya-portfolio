/* detail.js — behaviour for projects/*.html: image gallery, EN/ID switch, aurora background. */
(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var $$ = function (s) { return [].slice.call(document.querySelectorAll(s)); };

  /* ---------- Gallery ---------- */
  var thumbs = $$(".th button"), gi = 0, big = $("#gim"), num = $("#gnn");
  function show(i) {
    if (!thumbs.length || !big) return;
    gi = (i + thumbs.length) % thumbs.length;
    var im = thumbs[gi].querySelector("img");
    big.src = im.src;
    big.alt = im.getAttribute("data-label") || "";
    big.dataset.label = im.getAttribute("data-label") || "";
    if (num) num.textContent = (gi + 1) + " / " + thumbs.length;
    thumbs.forEach(function (b, j) { b.setAttribute("aria-current", j === gi); });
  }
  var prev = $(".ga.l"), next = $(".ga.r");
  if (prev) prev.onclick = function () { show(gi - 1); };
  if (next) next.onclick = function () { show(gi + 1); };
  thumbs.forEach(function (b, j) { b.onclick = function () { show(j); }; });
  addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(gi - 1);
    if (e.key === "ArrowRight") show(gi + 1);
  });
  // when a thumbnail swaps to its placeholder, refresh the big image too
  document.addEventListener("fx-img-placeholder", function () { show(gi); });
  show(0);

  /* ---------- EN / ID ---------- */
  var lang = "en";
  try { lang = localStorage.getItem("rf_lang") || "en"; } catch (e) {}
  var tr = $$("[data-id]");
  tr.forEach(function (el) { el.setAttribute("data-en", el.innerHTML); });
  function apply(l) {
    lang = l === "id" ? "id" : "en";
    try { localStorage.setItem("rf_lang", lang); } catch (e) {}
    document.documentElement.lang = lang;
    tr.forEach(function (el) { el.innerHTML = el.getAttribute(lang === "id" ? "data-id" : "data-en"); });
    $$(".lang-btn").forEach(function (b) { b.classList.toggle("active", b.dataset.lang === lang); });
    if (document.body.dataset.titleId) document.title = lang === "id" ? document.body.dataset.titleId : document.body.dataset.titleEn;
  }
  $$(".lang-btn").forEach(function (b) { b.addEventListener("click", function () { apply(b.dataset.lang); }); });
  if (document.body) document.body.dataset.titleEn = document.title;
  apply(lang);

  /* ---------- Aurora rings (same look as the home page) ---------- */
  var c = $("#aurora");
  if (c && !(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
    var x = c.getContext("2d"), W, H;
    var rs = function () { W = c.width = innerWidth / 2; H = c.height = innerHeight / 2; };
    rs(); addEventListener("resize", rs);
    (function d(t) {
      x.clearRect(0, 0, W, H);
      var m = Math.max(W, H), cx = W * .72 + Math.sin(t / 5000) * W * .05, cy = H * .4 + Math.cos(t / 6000) * H * .05;
      var ac = window.__acRGB ? window.__acRGB() : "255,180,0";
      for (var i = 1; i < 34; i++) {
        var r = i * m * .032 + ((t / 90) % (m * .032));
        x.beginPath(); x.arc(cx, cy, r, 0, 6.3);
        x.strokeStyle = "rgba(" + ac + "," + (.1 * (1 - r / (m * 1.1))) + ")";
        x.lineWidth = 1; x.stroke();
      }
      requestAnimationFrame(d);
    })(0);
  }
})();
