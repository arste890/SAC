// Mobile menu toggle for the University of Utah theme header
document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.uu-header');
  var toggle = header && header.querySelector('.uu-nav-toggle');
  if (!toggle) return;

  function setOpen(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
});

// In-page anchors: land each section's heading just below the sticky header.
// Nicepage's own scroller only knows about its .u-sticky headers, so it is
// replaced with native scrolling that honors the per-section scroll margins.
(function () {
  var GAP = 20;

  function setAnchorOffsets() {
    var header = document.querySelector('.uu-header');
    var headerHeight = header ? header.offsetHeight : 0;
    document.querySelectorAll('main section[id]').forEach(function (section) {
      var heading = section.querySelector('h1, h2, h3');
      var inset = heading
        ? heading.getBoundingClientRect().top - section.getBoundingClientRect().top
        : 0;
      section.style.scrollMarginTop = Math.max(0, headerHeight + GAP - inset) + 'px';
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function scrollToTarget(target, instant) {
    var el = target && (target.jquery ? target[0] : target);
    if (!el) return;
    setAnchorOffsets();
    el.scrollIntoView({
      block: 'start',
      behavior: instant === true || reduceMotion.matches ? 'auto' : 'smooth'
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setAnchorOffsets();
    if (window._npScrollAnchor) {
      window._npScrollAnchor.scroll = function (target) {
        scrollToTarget(target);
      };
    }
  });

  window.addEventListener('resize', setAnchorOffsets);

  window.addEventListener('load', function () {
    setAnchorOffsets();
    var target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) scrollToTarget(target, true);
  });
})();
