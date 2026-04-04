// =======================================
// THUNDER KUNG FU ACADEMY - Shared JS
// =======================================

// --- Navbar scroll (only on homepage - inner pages start scrolled) ---
const navbar = document.getElementById('navbar');

if (!navbar.classList.contains('scrolled')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// --- Hamburger menu ---
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const hSpans     = hamburger.querySelectorAll('span');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hSpans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
  hSpans[1].style.opacity   = isOpen ? '0' : '';
  hSpans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hSpans[0].style.transform = '';
    hSpans[1].style.opacity   = '';
    hSpans[2].style.transform = '';
  });
});

// --- Scroll reveal ---
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const parent   = entry.target.parentElement;
    const siblings = [...parent.querySelectorAll('.reveal')];
    const idx      = siblings.indexOf(entry.target);

    const staggerParents = [
      'programs-grid', 'stats-wrap', 'gallery-strip',
      'values-grid', 'facility-grid', 'facility-features',
      'directions-grid', 'about-preview-wrap', 'sc-inner'
    ];

    const isStagger = staggerParents.some(cls => parent.classList.contains(cls));
    const delay = isStagger ? idx * 80 : 0;

    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.08 });

revealEls.forEach(el => revealObserver.observe(el));

// --- Counter animation ---
const statNums = document.querySelectorAll('.stat-num');

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const dur    = 1500;
    const start  = performance.now();

    const tick = now => {
      const t     = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    };

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// --- Smooth scroll (for same-page anchors only) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id     = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// --- Hero parallax (home page only) ---
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }
  }, { passive: true });
}

// --- Contact form (basic client-side handler) ---
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#27ae60';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}