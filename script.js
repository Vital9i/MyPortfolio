/**
 * Дойняк — Figma Design
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initHeader();
  initMobileNav();
  initTestimonials();
  initContactForm();
  initFooterYear();
  initSmoothScroll();
  initNavActive();
});

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });
  reveals.forEach((el) => observer.observe(el));
}

function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

const testimonials = [
  {
    text: '«Виталик переделал наш сайт и настроил Google Ads. За 2 месяца лиды выросли в 3 раза. Профессионал, всё в срок, фокус на результате.»',
    author: 'Анна К.',
    role: 'Директор по маркетингу, Tech Co.'
  },
  {
    text: '«YouTube-видео, которые снял Виталик, привели клиентов, до которых мы бы сами никогда не дошли. Доверие и экспертиза чувствуются в каждом кадре.»',
    author: 'Дмитрий С.',
    role: 'Основатель SaaS-стартапа'
  },
  {
    text: '«Конверсия лендинга выросла с 2% до 8% после редизайна. Понятный ROI и отличная коммуникация на каждом этапе.»',
    author: 'Мария К.',
    role: 'CEO платформы онлайн-курсов'
  }
];

function initTestimonials() {
  const slider = document.getElementById('testimonial-slider');
  if (!slider) return;

  let current = 1;
  const textEl = document.getElementById('testimonial-text');
  const authorEl = document.getElementById('testimonial-author');
  const roleEl = document.getElementById('testimonial-role');
  const avatarBtns = slider.querySelectorAll('.avatar-btn');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');

  function show(index) {
    current = (index + testimonials.length) % testimonials.length;
    const t = testimonials[current];

    if (textEl) {
      textEl.style.opacity = '0';
      setTimeout(() => {
        textEl.textContent = t.text;
        textEl.style.opacity = '1';
      }, 200);
    }
    if (authorEl) authorEl.textContent = t.author;
    if (roleEl) roleEl.textContent = t.role;

    avatarBtns.forEach((btn, i) => {
      btn.classList.toggle('active', i === current);
    });
  }

  avatarBtns.forEach((btn) => {
    btn.addEventListener('click', () => show(parseInt(btn.dataset.index, 10)));
  });

  prevBtn?.addEventListener('click', () => show(current - 1));
  nextBtn?.addEventListener('click', () => show(current + 1));
}

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

    if (!fields.name.el.value.trim()) {
      showError(fields.name, 'Введите ваше имя');
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!fields.email.el.value.trim()) {
      showError(fields.email, 'Введите email');
      isValid = false;
    } else if (!emailRegex.test(fields.email.el.value)) {
      showError(fields.email, 'Введите корректный email');
      isValid = false;
    }

    if (!fields.message.el.value.trim()) {
      showError(fields.message, 'Введите сообщение');
      isValid = false;
    } else if (fields.message.el.value.trim().length < 10) {
      showError(fields.message, 'Сообщение должно быть не менее 10 символов');
      isValid = false;
    }

    if (!isValid) return;
    form.reset();
    alert('Спасибо! Сообщение отправлено. Отвечу в течение 24 часов.');
  });

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

function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((section) => observer.observe(section));
}
