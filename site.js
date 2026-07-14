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
