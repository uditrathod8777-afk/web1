/* ===================================================================
   ALEX MORGAN PORTFOLIO — main.js
   =================================================================== */

'use strict';

// ─── Preloader ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 600);
  }

  initNavbar();
  initHamburger();
  initTypingAnimation();
  initScrollReveal();
  initSkillBars();
  initProjectFilter();
  initContactForm();
  initBackToTop();
  initFooterYear();
  initSmoothScroll();
});

// ─── Navbar ───────────────────────────────────────────────────────
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll class
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  // Active link via scroll position
  function updateActiveLink() {
    const scrollPos = window.scrollY + window.innerHeight / 3;
    sections.forEach(section => {
      if (
        scrollPos >= section.offsetTop &&
        scrollPos < section.offsetTop + section.offsetHeight
      ) {
        const id = section.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── Hamburger ────────────────────────────────────────────────────
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ─── Typing Animation ─────────────────────────────────────────────
function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const phrases = [
    'Python Developer',
    'Web Developer',
    'Problem Solver',
    'Flask Developer',
    'Open Source Enthusiast',
  ];

  let phraseIndex  = 0;
  let charIndex    = 0;
  let isDeleting   = false;
  let isPaused     = false;

  const typeSpeed   = 80;
  const deleteSpeed = 45;
  const pauseAfter  = 1800;
  const pauseBefore = 350;

  function tick() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) return;

    if (!isDeleting) {
      el.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused   = false;
          isDeleting = true;
          setTimeout(tick, deleteSpeed);
        }, pauseAfter);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, pauseBefore);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  }

  setTimeout(tick, 800);
}

// ─── Scroll Reveal ────────────────────────────────────────────────
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger sibling reveals
          const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
          const delay    = siblings.indexOf(entry.target) * 80;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, Math.min(delay, 300));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
}

// ─── Skill Bars ───────────────────────────────────────────────────
function initSkillBars() {
  const skillsSection = document.getElementById('skills-grid');
  if (!skillsSection) return;

  let animated = false;

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        const bars = document.querySelectorAll('.skill-bar-fill');
        bars.forEach((bar, i) => {
          const target = bar.style.getPropertyValue('--target-width');
          setTimeout(() => {
            bar.style.width = target;
          }, i * 80);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.25 }
  );

  observer.observe(skillsSection);
}

// ─── Project Filter ───────────────────────────────────────────────
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const category = card.dataset.category;
        const show     = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          // Trigger reflow
          card.offsetHeight; // eslint-disable-line no-unused-expressions
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ─── Contact Form ─────────────────────────────────────────────────
function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name    = form.querySelector('#name');
    const email   = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');

    // Clear previous errors
    [name, email, subject, message].forEach(el => {
      el.classList.remove('error');
    });
    document.querySelectorAll('.field-error').forEach(el => el.textContent = '');

    // Validate
    let valid = true;

    if (!name.value.trim()) {
      showFieldError('name-error', 'Please enter your name.');
      name.classList.add('error');
      valid = false;
    }
    if (!email.value.trim() || !isValidEmail(email.value)) {
      showFieldError('email-error', 'Please enter a valid email address.');
      email.classList.add('error');
      valid = false;
    }
    if (!subject.value.trim()) {
      showFieldError('subject-error', 'Please enter a subject.');
      subject.classList.add('error');
      valid = false;
    }
    if (!message.value.trim()) {
      showFieldError('message-error', 'Please enter your message.');
      message.classList.add('error');
      valid = false;
    }

    if (!valid) return;

    // Loading state
    setSubmitLoading(true);

    try {
      const res = await fetch('/send-message', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          name:    name.value.trim(),
          email:   email.value.trim(),
          subject: subject.value.trim(),
          message: message.value.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        showToast(data.message, 'success');
        form.reset();
      } else {
        showToast(data.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch (err) {
      showToast('Network error. Please check your connection and try again.', 'error');
    } finally {
      setSubmitLoading(false);
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function setSubmitLoading(loading) {
  const btn     = document.getElementById('submit-btn');
  const btnText = btn.querySelector('.btn-text');
  const btnLoad = btn.querySelector('.btn-loading');
  if (!btn) return;

  btn.disabled             = loading;
  btnText.style.display    = loading ? 'none'  : '';
  btnLoad.style.display    = loading ? ''      : 'none';
}

// ─── Toast ────────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';
  toast.innerHTML = `<i class="fas ${icon} toast-icon"></i><span>${message}</span>`;
  toast.className = `toast ${type}`;

  // Force reflow
  toast.offsetHeight; // eslint-disable-line no-unused-expressions
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// ─── Back to Top ──────────────────────────────────────────────────
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Footer Year ──────────────────────────────────────────────────
function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// ─── Smooth Scroll ────────────────────────────────────────────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 70;

      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ─── Parallax on Hero shapes (mouse move) ─────────────────────────
(function initParallax() {
  const hero   = document.querySelector('.hero');
  const shapes = document.querySelectorAll('.shape');
  if (!hero || !shapes.length) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

    shapes.forEach((shape, i) => {
      const factor = (i + 1) * 8;
      shape.style.transform = `translate(${cx * factor}px, ${cy * factor}px)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    shapes.forEach(shape => {
      shape.style.transform = '';
    });
  });
})();
