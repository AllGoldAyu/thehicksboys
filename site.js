(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Sticky nav background swap on scroll
  var nav = document.querySelector(".site-nav");
  if (nav) {
    var toggleNav = function () {
      nav.classList.toggle("scrolled", window.scrollY > 8);
    };
    toggleNav();
    window.addEventListener("scroll", toggleNav, { passive: true });
  }

  // Fade/rise reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("in-view");
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
      );
      reveals.forEach(function (el) {
        io.observe(el);
      });
    }
  }
})();

/* Interaction sound cues (Cuelume-style: synthesized live, zero assets).
   Press-only — no hover sounds, no autoplay; the press IS the user gesture. */
(function () {
  "use strict";
  var actx = null;
  function tone(freq, t0, dur, type, gain) {
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      var o = actx.createOscillator();
      var g = actx.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, actx.currentTime + t0);
      g.gain.exponentialRampToValueAtTime(gain || 0.06, actx.currentTime + t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + t0 + dur);
      o.connect(g);
      g.connect(actx.destination);
      o.start(actx.currentTime + t0);
      o.stop(actx.currentTime + t0 + dur + 0.05);
    } catch (e) {}
  }
  function goldTap() {
    tone(620, 0, 0.07, "triangle", 0.05);
    tone(930, 0.05, 0.09, "sine", 0.04);
  }
  document.addEventListener("pointerdown", function (e) {
    if (e.target.closest(".btn-primary, .find-card")) goldTap();
  }, { passive: true });
})();
