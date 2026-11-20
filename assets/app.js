    var curLang = "en";
    try { curLang = localStorage.getItem("rf_lang") || "en"; } catch (e) { }
    var curSkillTab = "all";
    var curProjFilter = "all";

    function $(s) { return document.querySelector(s) }
    function $$(s) { return document.querySelectorAll(s) }
    function tg(a) { return a.map(function (x) { return "<span class='tag'>" + x + "</span>" }).join("") }

    function renderStack() {
      var L = I18N[curLang];
      $("#stackGrid").innerHTML = STACK.map(function (s, i) {
        var num = (i + 1 < 10 ? "0" : "") + (i + 1);
        var bars = [1, 2, 3].map(function (b) {
          return "<i class='" + (b <= s.lv ? "on" : "") + "'></i>";
        }).join("");
        var hideCls = (curSkillTab != "all" && s.c != curSkillTab) ? " hide" : "";
        var catLabel = curLang === "id" ? (s.l_id || s.l) : s.l;
        var roleDesc = curLang === "id" ? (s.r_id || s.r) : s.r;
        return "<article class='gc sk-card" + hideCls + "' data-k='" + s.c + "'>" +
          "<div class='sk-top'>" +
          "<div class='sk-ico'>" + s.ic + "</div>" +
          "<div class='sk-meta'>" +
          "<span class='mono sk-num'>// " + num + "</span>" +
          "<span class='chip mono sk-chip'>" + catLabel + "</span>" +
          "</div>" +
          "</div>" +
          "<h3>" + s.n + "</h3>" +
          "<p>" + roleDesc + "</p>" +
          "<div class='sk-foot'>" +
          "<span class='mono'>" + (L.lvLabels[s.lv] || L.lvLabels[2]) + "</span>" +
          "<div class='sk-bars' aria-hidden='true'>" + bars + "</div>" +
          "</div>" +
          "</article>";
      }).join("");
    }

    function renderProjects() {
      var L = I18N[curLang], cnt = {};
      $("#grid").innerHTML = PROJ.map(function (p) {
        cnt[p.c] = (cnt[p.c] || 0) + 1;
        var hideCls = (curProjFilter != "all" && p.c != curProjFilter) ? " hide" : "";
        var desc = curLang === "id" ? (p.d_id || p.d) : p.d;
        return "<article class='gc bc" + hideCls + "' data-c='" + p.c + "'>" +
          "<div class='bi'><img src='" + (p.img || "assets/projects/" + p.n.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "/cover.jpg") + "' alt='" + p.n + " screenshot' loading='lazy'></div>" +
          "<div class='bt'><span class='chip mono'>" + L.prLab[p.c] + "</span><span class='mono'>#" + p.c.toUpperCase() + "-0" + cnt[p.c] + " · " + p.y + "</span></div>" +
          "<h3>" + p.n + "</h3><p>" + desc + "</p><div class='tags'>" + tg(p.t) + "</div>" +
          "<a class='go' href='projects/" + p.n.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".html'>" + L.prGo + "</a>" +
          "</article>";
      }).join("");
    }

    function applyLang(lang, showNotice) {
      curLang = I18N[lang] ? lang : "en";
      try { localStorage.setItem("rf_lang", curLang); } catch (e) { }
      document.documentElement.lang = curLang;
      var L = I18N[curLang];

      /* Update tombol active EN / ID */
      [].forEach.call($$(".lang-btn"), function (b) {
        b.classList.toggle("active", b.dataset.lang === curLang);
      });

      /* Navbar */
      var navLinks = $$(".nl a");
      L.nav.forEach(function (txt, idx) { if (navLinks[idx]) navLinks[idx].textContent = txt; });
      if ($(".cta")) $(".cta").textContent = L.cta;

      /* Hero */
      if ($(".hl .script")) $(".hl .script").textContent = L.script;
      if ($(".hl .pill span")) $(".hl .pill span").textContent = L.pill;
      if ($(".hr .d")) $(".hr .d").innerHTML = L.heroD;
      var heroBtns = $$(".hr .btns .btn");
      if (heroBtns[0]) heroBtns[0].textContent = L.btnProj;
      if (heroBtns[1]) heroBtns[1].textContent = L.btnTalk;
      var statDivs = $$(".hr .stats div");
      if (statDivs[0]) statDivs[0].querySelector("span").textContent = L.st1;
      if (statDivs[1]) {
        statDivs[1].querySelector("b").textContent = L.st2Val;
        statDivs[1].querySelector("span").textContent = L.st2;
      }
      if (statDivs[2]) statDivs[2].querySelector("span").textContent = L.st3;
      if ($(".portrait .badge")) $(".portrait .badge").innerHTML = L.badge;

      var hcs = $$(".hud .hc");
      if (hcs[0]) { hcs[0].querySelector(".hh span:last-child").textContent = L.hc1Cat; hcs[0].querySelector("h3").textContent = L.hc1T; hcs[0].querySelector("p").textContent = L.hc1P; }
      if (hcs[1]) { hcs[1].querySelector(".hh span:last-child").textContent = L.hc2Cat; hcs[1].querySelector("h3").textContent = L.hc2T; hcs[1].querySelector("p").textContent = L.hc2P; }
      if (hcs[2]) { hcs[2].querySelector(".hh span:last-child").textContent = L.hc3Cat; hcs[2].querySelector("h3").textContent = L.hc3T; hcs[2].querySelector("p").textContent = L.hc3P; }

      /* About */
      if ($("#about .sh .chip")) $("#about .sh .chip").textContent = L.abChip;
      if ($("#about .sh h2")) $("#about .sh h2").textContent = L.abH2;
      if ($("#about .sh p")) $("#about .sh p").textContent = L.abDesc;
      if ($(".ab-bio .ab-sub")) $(".ab-bio .ab-sub").textContent = L.abSub1;
      if ($(".ab-bio h3")) $(".ab-bio h3").textContent = L.abH3;
      var abPs = $$(".ab-bio > p");
      if (abPs[0]) abPs[0].innerHTML = L.abP1;
      if (abPs[1]) abPs[1].innerHTML = L.abP2;
      var metas = $$(".ab-meta > div");
      if (metas[0]) { metas[0].querySelector(".mono").textContent = L.m1L; metas[0].querySelector("b").textContent = L.m1V; }
      if (metas[1]) { metas[1].querySelector(".mono").textContent = L.m2L; metas[1].querySelector("b").textContent = L.m2V; }
      if (metas[2]) { metas[2].querySelector(".mono").textContent = L.m3L; metas[2].querySelector("b").textContent = L.m3V; }
      if (metas[3]) { metas[3].querySelector(".mono").textContent = L.m4L; metas[3].querySelector("b").textContent = L.m4V; }
      if ($(".ab-bio .q")) $(".ab-bio .q").textContent = L.quote;

      if ($(".ab-journey .ab-sub")) $(".ab-journey .ab-sub").textContent = L.abSub2;
      var tls = $$(".tl-item");
      if (tls[0]) {
        tls[0].querySelector(".tl-yr").textContent = L.tl1Yr;
        tls[0].querySelector(".tl-tag").textContent = L.tl1Tag;
        tls[0].querySelector("b").textContent = L.tl1Title;
        tls[0].querySelector(".tl-org").textContent = L.tl1Org;
        tls[0].querySelector("p").textContent = L.tl1Desc;
      }
      if (tls[1]) {
        tls[1].querySelector(".tl-yr").textContent = L.tl2Yr;
        tls[1].querySelector(".tl-tag").textContent = L.tl2Tag;
        tls[1].querySelector("b").textContent = L.tl2Title;
        tls[1].querySelector(".tl-org").textContent = L.tl2Org;
        tls[1].querySelector("p").textContent = L.tl2Desc;
      }

      /* Skills */
      if ($("#skills .sh .chip")) $("#skills .sh .chip").textContent = L.skChip;
      if ($("#skills .sh h2")) $("#skills .sh h2").textContent = L.skH2;
      if ($("#skills .sh p")) $("#skills .sh p").textContent = L.skDesc;
      [].forEach.call($$("#tabs .tab"), function (b) {
        if (L.skTabs[b.dataset.k]) b.textContent = L.skTabs[b.dataset.k];
      });
      renderStack();

      /* Projects */
      if ($("#projects .sh .chip")) $("#projects .sh .chip").textContent = L.prChip;
      if ($("#projects .sh h2")) $("#projects .sh h2").textContent = L.prH2;
      [].forEach.call($$("#filters .tab"), function (b) {
        if (L.prTabs[b.dataset.f]) b.textContent = L.prTabs[b.dataset.f];
      });
      renderProjects();

      /* Certs & Modal */
      if ($("#certs .sh .chip")) $("#certs .sh .chip").textContent = L.crChip;
      if ($("#certs .sh h2")) $("#certs .sh h2").textContent = L.crH2;
      if ($("#md .vf")) $("#md .vf").textContent = L.mdVf;
      if ($("#md .my")) {
        var yVal = $("#mdy") ? $("#mdy").textContent : "";
        $("#md .my").innerHTML = L.mdYr + '<b id="mdy">' + yVal + '</b>';
      }

      /* Contact */
      if ($("#contact .chip")) $("#contact .chip").textContent = L.ctChip;
      if ($("#contact h2")) $("#contact h2").textContent = L.ctH2;
      if ($("#contact p")) $("#contact p").textContent = L.ctP;
      if ($("#copy")) $("#copy").textContent = L.copyBtn;
      if ($("#contact .fm span")) $("#contact .fm span").textContent = L.footer;

      if (showNotice) {
        toast(curLang === "id" ? "Bahasa diubah ke Bahasa Indonesia" : "Language switched to English");
      }
    }

    $("#tabs").onclick = function (e) {
      var k = e.target.dataset.k;
      if (!k) return;
      curSkillTab = k;
      [].forEach.call(this.children, function (b) {
        b.setAttribute("aria-selected", b.dataset.k == k);
      });
      [].forEach.call($$(".sk-card"), function (c) {
        c.classList.toggle("hide", k != "all" && c.dataset.k != k);
      });
    };

    function phCover(n) {
      var t = n.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      var phLabel = I18N[curLang] ? I18N[curLang].phText : "COVER BELUM DITAMBAHKAN";
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675"><rect width="1200" height="675" fill="#0b0b0b"/><circle cx="1010" cy="190" r="120" fill="none" stroke="#ffb400" stroke-opacity=".35"/><circle cx="1010" cy="190" r="190" fill="none" stroke="#ffb400" stroke-opacity=".18"/><rect x="70" y="80" width="330" height="44" fill="#ffb400"/><text x="90" y="110" font-size="22" font-weight="700" font-family="monospace" fill="#000">' + phLabel + '</text><text x="70" y="560" font-size="64" font-weight="800" font-family="Arial,sans-serif" fill="#f5f5f5">' + t + '</text></svg>';
      return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    }
    $("#grid").addEventListener("error", function (e) {
      var im = e.target;
      if (im.tagName !== "IMG" || im.dataset.ph) return;
      im.dataset.ph = "1";
      im.src = phCover(im.alt.replace(/ screenshot$/, ""));
    }, true);

    /* Render Certifications */
    function esc(s) { return s.replace(/&/g, "&amp;").replace(/</g, "&lt;") }
    function wrap(t, n) { var l = [], c = ""; t.split(" ").forEach(function (x) { if ((c + " " + x).trim().length > n) { l.push(c); c = x } else c = (c + " " + x).trim() }); l.push(c); return l }
    function certImg(c) {
      if (c.img) return c.img; if (c._u) return c._u;
      var L = wrap(c.n, 30).slice(0, 3).map(function (t, i) { return '<text x="400" y="' + (310 + i * 30) + '" font-size="24" font-weight="700" text-anchor="middle" fill="#111">' + esc(t) + '</text>' }).join("");
      var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560"><rect width="800" height="560" fill="#fff"/><path d="M800 0v300C700 200 640 90 560 0z" fill="#ffb400"/><path d="M0 560h260C180 500 90 520 0 430z" fill="#111"/><g font-family="Arial,sans-serif"><text x="400" y="110" font-size="40" font-weight="800" text-anchor="middle" fill="#111">CERTIFICATE</text><text x="400" y="145" font-size="16" text-anchor="middle" fill="#555">OF COMPLETION</text><text x="400" y="205" font-size="14" text-anchor="middle" fill="#777">Awarded to</text><text x="400" y="255" font-size="34" font-weight="700" text-anchor="middle" fill="#b87a00">Your Name Here</text>' + L + '<text x="400" y="440" font-size="16" text-anchor="middle" fill="#555">' + esc(c.o) + ' · ' + c.y + '</text><line x1="320" y1="500" x2="480" y2="500" stroke="#999"/><text x="400" y="522" font-size="12" text-anchor="middle" fill="#777">Authorized signature</text></g></svg>';
      return c._u = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s)
    }
    var cl = $("#certGrid"), pv = $("#pv"), pi = pv.querySelector("img"), ps = pv.querySelector("span"), md = $("#md"), lastRow = null, canHover = matchMedia("(hover:hover)").matches;
    cl.innerHTML = CERT.map(function (c, i) { return "<button class='cr' data-i='" + i + "'><span class='cy mono'>[" + c.y + "]</span><span class='cn'>" + c.n + "</span><span class='ci'>" + c.o + "</span><span class='ca' aria-hidden='true'>↗</span></button>" }).join("");
    function place(e) { var w = pv.offsetWidth || 380, h = pv.offsetHeight || 270; pv.style.transform = "translate(" + Math.max(12, Math.min(innerWidth - w - 12, e.clientX + 26)) + "px," + Math.max(12, Math.min(innerHeight - h - 12, e.clientY - h / 2)) + "px)" }
    cl.addEventListener("mouseover", function (e) {
      if (!canHover) return; var r = e.target.closest(".cr"); if (!r) { pv.classList.remove("on"); return }
      var c = CERT[r.dataset.i]; pi.src = certImg(c); ps.textContent = c.o; place(e); pv.classList.add("on")
    });
    cl.addEventListener("mousemove", function (e) { if (canHover) place(e) });
    cl.addEventListener("mouseleave", function () { pv.classList.remove("on") });
    function openM(r) {
      var c = CERT[r.dataset.i]; lastRow = r; $("#mdt").textContent = c.n; $("#mdi").textContent = c.o; $("#mdy").textContent = c.y; var im = $("#mdim"); im.src = certImg(c); im.alt = "Certificate: " + c.n;
      /* optional per-certificate fields: k:"community" swaps the badge, url adds a credential link */
      var vf = md.querySelector(".vf"); if (vf) vf.textContent = c.k === "community" ? "Community certificate" : "✓ Verified";
      var lk = $("#mdl"); if (lk) { if (c.url) { lk.href = c.url; lk.hidden = false } else { lk.removeAttribute("href"); lk.hidden = true } }
      pv.classList.remove("on"); md.hidden = false; requestAnimationFrame(function () { md.classList.add("on") }); document.body.style.overflow = "hidden"; $("#mdx").focus()
    }
    function closeM() { md.classList.remove("on"); document.body.style.overflow = ""; setTimeout(function () { md.hidden = true }, 200); if (lastRow) lastRow.focus() }
    cl.addEventListener("click", function (e) { var r = e.target.closest(".cr"); if (r) openM(r) });
    $("#mdx").onclick = closeM; md.addEventListener("click", function (e) { if (e.target === md) closeM() });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && !md.hidden) closeM() });
    $("#filters").onclick = function (e) {
      var f = e.target.dataset.f; if (!f) return;
      curProjFilter = f;
      [].forEach.call(this.children, function (b) { b.setAttribute("aria-selected", b.dataset.f == f) });
      [].forEach.call($$(".bc"), function (c) { c.classList.toggle("hide", f != "all" && c.dataset.c != f) })
    };
    var tt; function toast(m) { var t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(function () { t.classList.remove("on") }, 2200) }
    $("#copy").onclick = function () {
      var L = I18N[curLang];
      var ok = function () { toast(L.toastCopy + EMAIL) };
      try { navigator.clipboard.writeText(EMAIL).then(ok, function () { toast(L.toastManual + EMAIL) }) } catch (e) { toast(L.toastManual + EMAIL) }
    };

    /* Event Klik Tombol Bahasa EN / ID */
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".lang-btn");
      if (!btn) return;
      applyLang(btn.dataset.lang, true);
    });

    /* Terapkan bahasa saat halaman dimuat */
    applyLang(curLang, false);

    $("#grid").addEventListener("click", function (e) { var c = e.target.closest(".bc"); if (c && !e.target.closest("a")) location.href = c.querySelector(".go").getAttribute("href") });
    (function () {
      var c = $("#aurora"), x = c.getContext("2d"), W, H; function rs() { W = c.width = innerWidth / 2; H = c.height = innerHeight / 2 } rs(); addEventListener("resize", rs);
      (function d(t) {
        x.clearRect(0, 0, W, H); var cx = W * .72 + Math.sin(t / 5000) * W * .05, cy = H * .4 + Math.cos(t / 6000) * H * .05;
        for (var i = 1; i < 34; i++) { var r = i * Math.max(W, H) * .032 + ((t / 90) % (Math.max(W, H) * .032)); x.beginPath(); x.arc(cx, cy, r, 0, 6.3); x.strokeStyle = "rgba(" + (window.__acRGB ? window.__acRGB() : "255,180,0") + "," + (.1 * (1 - r / (Math.max(W, H) * 1.1))) + ")"; x.lineWidth = 1; x.stroke() }
        requestAnimationFrame(d)
      })(0)
    })();
