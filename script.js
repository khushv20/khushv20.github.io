(function () {
  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    btn.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
        btn.focus();
      }
    });
  }

  // Links still holding a [placeholder] do nothing until the real URL is added
  var pending = document.querySelectorAll('a[href^="["]');
  for (var i = 0; i < pending.length; i++) {
    pending[i].addEventListener('click', function (e) { e.preventDefault(); });
  }

  // Fade in on scroll
  var items = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!('IntersectionObserver' in window) || reduce) {
    for (var j = 0; j < items.length; j++) items[j].classList.add('in');
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.04 });
  for (var k = 0; k < items.length; k++) io.observe(items[k]);
})();
