(function () {
  const root = document.documentElement;
  root.classList.remove('no-js');

  const toggle = document.querySelector('.header__toggle');
  const navId = toggle ? toggle.getAttribute('aria-controls') : null;
  const nav = navId ? document.getElementById(navId) : null;

  const closeNav = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav--open');
    document.body.classList.remove('is-nav-open');
  };

  const openNav = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('nav--open');
    document.body.classList.add('is-nav-open');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) {
        closeNav();
      } else {
        openNav();
      }
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        if (expanded) {
          closeNav();
          toggle.focus();
        }
      }
    });

    const breakpointWatcher = window.matchMedia('(min-width: 720px)');
    const handleBreakpoint = (event) => {
      if (event.matches) {
        closeNav();
      }
    };
    breakpointWatcher.addEventListener('change', handleBreakpoint);
    handleBreakpoint(breakpointWatcher);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const focusTarget = (target) => {
    if (!target) return;
    const hadTabindex = target.hasAttribute('tabindex');
    if (!hadTabindex) {
      target.setAttribute('tabindex', '-1');
      target.dataset.tempTabindex = 'true';
    }
    target.focus({ preventScroll: true });
    if (!hadTabindex) {
      target.addEventListener(
        'blur',
        () => {
          if (target.dataset.tempTabindex) {
            target.removeAttribute('tabindex');
            delete target.dataset.tempTabindex;
          }
        },
        { once: true }
      );
    }
  };

  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href="#0"])');
  smoothScrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const url = new URL(href, window.location.href);
      if (url.pathname !== window.location.pathname) {
        return;
      }
      const targetId = decodeURIComponent(url.hash.substring(1));
      const target = targetId ? document.getElementById(targetId) : null;
      if (!target) {
        return;
      }
      if (!prefersReducedMotion) {
        event.preventDefault();
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
        window.scrollTo({ top: Math.max(targetPosition, 0), behavior: 'smooth' });
        focusTarget(target);
      }
    });
  });

  if (window.location.hash) {
    const currentTarget = document.getElementById(decodeURIComponent(window.location.hash.substring(1)));
    if (currentTarget) {
      focusTarget(currentTarget);
    }
  }
})();

