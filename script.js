// Staggered section + card reveal on scroll
  const sections = document.querySelectorAll('section');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in-view');
        const cards = e.target.querySelectorAll('.project-card, .cert-list li, .tl-item');
        cards.forEach((c, i) => {
          c.style.transitionDelay = (i * 70) + 'ms';
        });
      }
    });
  }, { threshold: 0.12 });
  sections.forEach(s => io.observe(s));

  // Dark mode toggle (in-memory, no storage)
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  });

  // Respect system preference on load
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.setAttribute('data-theme', 'dark');
  }

  // Mobile hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Active nav link on scroll
  const navLinks = document.querySelectorAll('.navlinks a[data-nav]');
  const navSections = ['about','projects','skills','education','contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.navlinks a[data-nav="${entry.target.id}"]`);
        if(active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  navSections.forEach(s => navObserver.observe(s));

  // Back to top button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 480);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
