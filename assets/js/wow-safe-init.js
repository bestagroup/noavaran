(function () {
  'use strict';

  function allWow() {
    return document.querySelectorAll('.wow');
  }

  function reveal(el) {
    if (!el) return;
    el.classList.add('wow-visible');
    el.style.visibility = 'visible';
  }

  function revealAll() {
    allWow().forEach(reveal);
  }

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealAll();
    return;
  }

  if (typeof window.WOW !== 'function') {
    revealAll();
    return;
  }

  try {
    var wow = new window.WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 70,
      mobile: true,
      live: true,
      callback: function (box) {
        // WOW removes .animated after animationend. This persistent state
        // keeps the element visible while preserving the original entrance animation.
        box.classList.add('wow-visible');
      }
    });
    wow.init();
  } catch (error) {
    // Content visibility must never depend on animation initialization.
    revealAll();
  }
})();
