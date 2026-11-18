document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const backToTop = document.getElementById('backToTop');

  /* ----- Footer year ----- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ----- Mobile menu ----- */
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
    navToggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  /* ----- Navbar style, back-to-top button ----- */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    backToTop.classList.toggle('show', window.scrollY > 500);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ----- Typing animation ----- */
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    let words = [];
    try { words = JSON.parse(typedEl.dataset.words); } catch (e) { words = []; }
    if (words.length) {
      let w = 0, c = 0, deleting = false;
      const tick = () => {
        const word = words[w];
        typedEl.textContent = word.substring(0, c);
        let delay = deleting ? 45 : 90;
        if (!deleting && c === word.length) { delay = 1600; deleting = true; }
        else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 400; }
        c += deleting ? -1 : 1;
        setTimeout(tick, delay);
      };
      tick();
    }
  }

  /* ----- Scroll reveal ----- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ----- Highlight active nav link ----- */
  const sections = document.querySelectorAll('main section[id]');
  const links = navLinks.querySelectorAll('a');
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
});
