/**
 * Vitalik Doyniak - Personal Landing Page
 * Interactive elements: scroll animations, form validation, filtering
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initMobileNav();
  initProjectFilter();
  initContactForm();
  initFooterYear();
  initSmoothScroll();
});

/**
 * Scroll Reveal - animate elements when they enter viewport
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  reveals.forEach((el) => observer.observe(el));
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', menu.classList.contains('open'));
  });

  // Close menu when clicking a link
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => menu.classList.remove('open'));
  });

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') menu.classList.remove('open');
  });
}

/**
 * Project filter by type (web, ads, video)
 */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide projects
      projectCards.forEach((card) => {
        const type = card.dataset.type;
        if (filter === 'all' || type === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          card.offsetHeight; // Trigger reflow
          card.style.animation = null;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: form.querySelector('#name'), error: form.querySelector('#name-error') },
    email: { el: form.querySelector('#email'), error: form.querySelector('#email-error') },
    message: { el: form.querySelector('#message'), error: form.querySelector('#message-error') }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(fields);

    let isValid = true;

    // Name validation
    if (!fields.name.el.value.trim()) {
      showError(fields.name, 'Введите ваше имя');
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.el.value.trim()) {
      showError(fields.email, 'Введите email');
      isValid = false;
    } else if (!emailRegex.test(fields.email.el.value)) {
      showError(fields.email, 'Введите корректный email');
      isValid = false;
    }

    // Message validation
    if (!fields.message.el.value.trim()) {
      showError(fields.message, 'Введите сообщение');
      isValid = false;
    } else if (fields.message.el.value.trim().length < 10) {
      showError(fields.message, 'Сообщение должно быть не менее 10 символов');
      isValid = false;
    }

    if (!isValid) return;

    // Success - in production, send to backend or use Formspree/Netlify Forms
    form.reset();
    alert('Спасибо! Сообщение отправлено. Отвечу в течение 24 часов.');
  });

  // Clear errors on input
  Object.values(fields).forEach(({ el, error }) => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      if (error) error.textContent = '';
    });
  });
}

function showError(field, message) {
  field.el.classList.add('error');
  if (field.error) field.error.textContent = message;
}

function clearErrors(fields) {
  Object.values(fields).forEach(({ el, error }) => {
    el.classList.remove('error');
    if (error) error.textContent = '';
  });
}

/**
 * Footer - current year
 */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * Smooth scroll for anchor links (enhance native behavior)
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;

    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
