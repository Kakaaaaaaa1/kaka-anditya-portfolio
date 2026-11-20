    /*
     * swarm-init.js — boots the vendored swarm rebuild engine (inlined) on this page.
     *
     * Behaviour (full takeover, califa-style):
     *   1. The real page is captured into a blueprint.
     *   2. The page is blanked and repainted by cursor agents, top-down.
     *   3. Scrolling advances the build frontier.
     *   4. "Go live" fades the canvas out and restores the live, interactive page.
     *
     * Unlike the upstream Chrome extension, there is no background.js screenshot
     * pass. The engine handles <canvas> natively (canvasPixels -> toDataURL), so the
     * aurora background survives the rebuild without a host-page screenshot.
     *
     * Production notes:
     *   - The engine parks on requestAnimationFrame. A backgrounded tab throttles
     *     rAF to ~1fps (and Chrome may suspend it entirely), which would leave the
     *     page covered by the overlay with no build progress. We therefore refuse
     *     to boot until the document is actually visible.
     *   - Runs on every page load by default. Add ?swarm=once to show it only once
     *     per browser session (returning visitors get the live site immediately).
     */
    (function () {
      "use strict";

      var KEY = "__swarmRebuild";

      var opts = {
        auto: true,
        // Settle time after load+fonts before we snapshot the page.
        delayMs: 350,
        // Wait for webfonts before capturing, otherwise headings get captured with
        // a fallback font and the rebuilt page renders in the wrong typeface.
        waitFonts: true,
        // Refuse to boot if the tab never becomes visible within this window.
        visibilityTimeoutMs: 8000,
        // false = replay the takeover on every page load (Sahi's call, 2026-11-06).
        // Flip to true for production if returning visitors should get the live
        // site straight away — no query flag or redeploy beyond this one line.
        oncePerSession: false
      };

      function q(name) {
        try {
          return new URLSearchParams(location.search).get(name);
        } catch (_) {
          return null;
        }
      }

      // Three modes:
      //   "off"    ?swarm=off     never boot
      //   "once"   ?swarm=once    boot once per browser session
      //   "always" ?swarm=1|on    boot on every load, ignore reduced motion
      //   default                 every load (opts.oncePerSession = false)
      function mode() {
        var v = q("swarm");
        if (v === "off" || v === "0") return "off";
        if (v === "once" || v === "session") return "once";
        if (v === "1" || v === "on") return "always";
        return opts.oncePerSession ? "once" : "always";
      }

      function forced() {
        return mode() === "always";
      }

      function disabled() {
        return mode() === "off";
      }

      function alreadyDone() {
        if (mode() !== "once") return false;
        try {
          return sessionStorage.getItem("swarm:done") === "1";
        } catch (_) {
          return false;
        }
      }

      // A full-screen animated takeover is unkind to visitors who ask their OS for
      // reduced motion (vestibular disorders). They get the real site immediately.
      // Override with ?swarm=1 when recording.
      function prefersReducedMotion() {
        if (forced()) return false;
        try {
          return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        } catch (_) {
          return false;
        }
      }

      function markDone() {
        try {
          sessionStorage.setItem("swarm:done", "1");
        } catch (_) { }
      }

      function waitVisible(timeoutMs) {
        if (document.visibilityState === "visible") return Promise.resolve(true);
        return new Promise(function (resolve) {
          var done = false;
          var onVis = function () {
            if (document.visibilityState === "visible" && !done) {
              done = true;
              document.removeEventListener("visibilitychange", onVis);
              resolve(true);
            }
          };
          document.addEventListener("visibilitychange", onVis);
          setTimeout(function () {
            if (done) return;
            done = true;
            document.removeEventListener("visibilitychange", onVis);
            resolve(document.visibilityState === "visible");
          }, timeoutMs);
        });
      }

      // The engine registers window.__swarmRebuild and self-starts when the script
      // is evaluated. We inject it as a classic script so execution order is
      // deterministic, then let it own the takeover.
      function loadEngine() {
        return new Promise(function (resolve, reject) {
          if (window[KEY]) return resolve(window[KEY]);
          // Engine is loaded from assets/swarm.js. That file is NOT bundled here:
          // upstream has no license, so add it only with the author's permission.
          // If the file is missing the site simply runs without the intro.
          var s = document.createElement("script");
          s.src = "assets/swarm.js";
          s.onload = function () {
            if (window[KEY]) resolve(window[KEY]);
            else reject(new Error("swarm engine did not register"));
          };
          s.onerror = function () { reject(new Error("assets/swarm.js not found")); };
          document.head.appendChild(s);
        });
      }

      // Play the intro on a refresh or a fresh visit, but not when moving around inside the site
      // (project page -> home, back/forward). Those moves already get the oval page transition.
      function cameFromOwnSite() {
        try {
          var nav = performance.getEntriesByType("navigation")[0];
          var type = nav && nav.type;
          if (type === "reload") return false;             // refresh: play
          if (type === "back_forward") return true;        // history buttons: skip
          // flag set by lando-fx.js right before it navigates between the site's own pages
          if (sessionStorage.getItem("fx-pt") === "1") return true;
          // plain link/URL arrival: skip only when the previous page is on this same site
          if (document.referrer) {
            var u = new URL(document.referrer);
            if (u.origin === location.origin && u.origin !== "null") return true;
          }
        } catch (_) { }
        return false;
      }

      // The intro builds the page top-down, so it must start from the top. Without this, a refresh
      // while scrolled down makes the browser restore that position and the swarm paints out of view.
      // behavior:"instant" because the page sets scroll-behavior:smooth.
      function goTop() {
        try { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); } catch (_) { window.scrollTo(0, 0); }
      }

      // The engine's control bar (.hud) is one wide centered row. On phones it is wider than the screen,
      // so the left icon and the right close button get cut off. The engine keeps its UI in a shadow root,
      // so extra rules have to be injected there. The engine file itself stays untouched.
      var HUD_CSS =
        "@media (max-width:640px){" +
        ".hud{box-sizing:border-box;width:max-content;max-width:calc(100vw - 16px);flex-wrap:wrap;justify-content:center;gap:6px;padding:6px;" +
        "bottom:calc(12px + env(safe-area-inset-bottom,0px))}" +
        ".hud .dots,.hud .sep,.hud .bar{display:none}" +
        ".hud .txt{flex:1 1 100%;justify-content:center}" +
        ".hud-unhide{bottom:calc(12px + env(safe-area-inset-bottom,0px))}" +
        "}";
      function patchHud() {
        var tries = 0;
        (function attempt() {
          var root = null;
          try { root = window[KEY] && window[KEY].app && window[KEY].app.view && window[KEY].app.view.root; } catch (_) { }
          if (root) {
            if (!root.querySelector("style[data-hudfix]")) {
              var st = document.createElement("style");
              st.setAttribute("data-hudfix", "");
              st.textContent = HUD_CSS;
              root.appendChild(st);
            }
            return;
          }
          if (++tries < 40) setTimeout(attempt, 150);
        })();
      }

      async function boot() {
        if (!opts.auto) return;
        if (disabled()) return;
        if (prefersReducedMotion()) return;
        if (!forced() && cameFromOwnSite()) return;
        if (alreadyDone()) return;
        if (window[KEY]) return; // already running

        try { history.scrollRestoration = "manual"; } catch (_) { }
        goTop();

        // Let the real page paint before we snapshot it.
        await new Promise(function (r) {
          if (document.readyState === "complete") r();
          else window.addEventListener("load", r, { once: true });
        });

        // A hidden tab cannot drive requestAnimationFrame, so booting here would
        // leave the visitor staring at a frozen overlay. Wait for visibility, but
        // bail out rather than block forever.
        var visible = await waitVisible(opts.visibilityTimeoutMs);
        if (!visible) return;

        if (opts.waitFonts) {
          try {
            await Promise.race([
              document.fonts.ready,
              new Promise(function (r) { setTimeout(r, 1500); })
            ]);
          } catch (_) { }
        }

        await new Promise(function (r) { setTimeout(r, opts.delayMs); });

        // Re-check: the visitor may have backgrounded the tab while we waited.
        if (disabled() || alreadyDone()) return;
        if (document.visibilityState !== "visible") return;

        try {
          goTop();
          await loadEngine();
          markDone();
          patchHud();
          // Auto-start Tour: visitors get the smooth scroll-driven build
          // from the first paint instead of a static half-built page.
          // Cancelled by any real user scroll, so it never fights the wheel.
          if (window[KEY] && window[KEY].app && !window[KEY].app.tour) {
            var started = false;
            var start = function () {
              if (started) return;
              started = true;
              setTimeout(function () {
                try {
                  // Newer engine builds use a closed shadow root, so reach the toolbar
                  // through the engine's own app.view; keep the old lookup as fallback.
                  var app = window[KEY] && window[KEY].app;
                  var root = app && app.view && app.view.root;
                  if (!root) {
                    var host = document.querySelector("swarm-rebuild");
                    root = host && host.shadowRoot;
                  }
                  var btn = root && root.querySelector('[data-a="tour"]');
                  if (btn && !btn.hidden) btn.click();
                } catch (_) { }
              }, 350);
            };
            var cancel = function () {
              if (!window[KEY] || !window[KEY].app) return;
              try { window[KEY].app.tour = false; } catch (_) { }
            };
            if (document.readyState === "complete") start();
            else window.addEventListener("load", start, { once: true });
            window.addEventListener("wheel", cancel, { passive: true });
            window.addEventListener("touchstart", cancel, { passive: true });
            document.addEventListener("keydown", function (e) {
              if (e.key === "ArrowDown" || e.key === "ArrowUp" ||
                e.key === "PageDown" || e.key === "PageUp" ||
                e.key === " " || e.key === "Home" || e.key === "End") cancel();
            });
          }
        } catch (err) {
          console.error("[swarm] boot failed", err);
        }
      }

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot, { once: true });
      } else {
        boot();
      }

      // Operator escape hatch: ESC drops the swarm immediately. The engine also
      // handles ESC itself; this is a belt-and-braces path.
      window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && window[KEY] && window[KEY].app) {
          try { window[KEY].stop(false); } catch (_) { }
        }
      });
    })();

