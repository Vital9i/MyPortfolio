/**
 * Дойняк — Riverside-style interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();
  initMobileNav();
  initProjectFilter();
  initContactForm();
  initAdExamples();
  initProcessSlider();
  initSystemGears();
  initFooterYear();
  initSmoothScroll();
  initNavActive();
});

function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    },
    { rootMargin: '0px 0px -48px 0px', threshold: 0.1 }
  );

  reveals.forEach((el) => observer.observe(el));
}

function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (!toggle || !nav) return;

  const close = () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });
}

function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card[data-type]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.type === filter;
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: { el: form.querySelector('#name'), error: form.querySelector('#name-error') },
    contact: { el: form.querySelector('#contact-channel'), error: form.querySelector('#contact-error') },
    direction: { el: form.querySelector('#direction'), error: form.querySelector('#direction-error') },
    message: { el: form.querySelector('#message'), error: form.querySelector('#message-error') }
  };
  const status = document.getElementById('form-status');
  const labels = { site: 'Сайт', ads: 'Реклама', seo: 'SEO', video: 'Видео', complex: 'Комплекс' };

  document.querySelectorAll('[data-direction]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!fields.direction.el) return;
      fields.direction.el.value = link.dataset.direction || '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(fields);
    if (status) status.textContent = '';
    let valid = true;
    let firstInvalid = null;

    if (!fields.name.el.value.trim()) {
      showError(fields.name, 'Введите имя');
      valid = false;
      firstInvalid = firstInvalid || fields.name.el;
    }

    if (!fields.contact.el.value.trim()) {
      showError(fields.contact, 'Укажите телефон или другой контакт');
      valid = false;
      firstInvalid = firstInvalid || fields.contact.el;
    }

    if (!fields.direction.el.value) {
      showError(fields.direction, 'Выберите направление');
      valid = false;
      firstInvalid = firstInvalid || fields.direction.el;
    }

    if (!fields.message.el.value.trim()) {
      showError(fields.message, 'Опишите задачу');
      valid = false;
      firstInvalid = firstInvalid || fields.message.el;
    } else if (fields.message.el.value.trim().length < 10) {
      showError(fields.message, 'Минимум 10 символов');
      valid = false;
      firstInvalid = firstInvalid || fields.message.el;
    }

    if (!valid) {
      firstInvalid.focus();
      return;
    }

    const direction = labels[fields.direction.el.value] || fields.direction.el.value;
    const body = [
      `Имя: ${fields.name.el.value.trim()}`,
      `Контакт: ${fields.contact.el.value.trim()}`,
      `Направление: ${direction}`,
      '',
      fields.message.el.value.trim()
    ].join('\n');
    const mailto = `mailto:hello@vitalikdoyniak.com?subject=${encodeURIComponent('Проект VD Group — ' + direction)}&body=${encodeURIComponent(body)}`;

    if (status) {
      status.textContent = 'Форма не отправляет заявку на сервер. Откроется письмо в почтовой программе. Если оно не открылось, напишите на hello@vitalikdoyniak.com или в Telegram.';
    }
    window.location.href = mailto;
  });

  Object.values(fields).forEach(({ el, error }) => {
    if (!el) return;
    el.addEventListener('input', () => {
      el.classList.remove('error');
      if (error) error.textContent = '';
    });
    el.addEventListener('change', () => {
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

function initAdExamples() {
  const tabs = [...document.querySelectorAll('.vdp-tabs [role="tab"]')];
  const panel = document.getElementById('ad-demo');
  if (!tabs.length || !panel) return;

  const examples = {
    frame: {
      query: 'Каркасный дом под ключ',
      ad: 'Каркасные дома под ключ',
      page: 'Каталог каркасных домов',
      copy: 'Проекты, варианты комплектации и этапы строительства каркасных домов.'
    },
    aero: {
      query: 'Дом из газобетона под ключ',
      ad: 'Дома из газобетона под ключ',
      page: 'Каталог домов из газобетона',
      copy: 'Проекты, варианты планировок и этапы строительства домов из газобетона.'
    },
    brick: {
      query: 'Кирпичный дом под ключ',
      ad: 'Кирпичные дома под ключ',
      page: 'Каталог кирпичных домов',
      copy: 'Проекты, архитектурные решения и этапы строительства кирпичных домов.'
    }
  };

  const setExample = (tab, focus = false) => {
    const data = examples[tab.dataset.ad];
    if (!data) return;
    tabs.forEach((item) => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    panel.querySelector('[data-ad-query]').textContent = data.query;
    panel.querySelector('[data-ad-title]').textContent = data.ad;
    panel.querySelector('[data-page-title]').textContent = data.page;
    panel.querySelector('[data-page-copy]').textContent = data.copy;
    panel.querySelector('[data-ad-visual]').dataset.adVisual = tab.dataset.ad;
    if (focus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => setExample(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      setExample(tabs[next], true);
    });
  });
}

function initProcessSlider() {
  const slider = document.querySelector('.vdp-slider');
  const slides = [...document.querySelectorAll('[data-process-slide]')];
  const tabs = [...document.querySelectorAll('.vdp-step-tabs [role="tab"]')];
  const dots = [...document.querySelectorAll('[data-dot]')];
  const previous = document.querySelector('[data-prev]');
  const next = document.querySelector('[data-next]');
  const counter = document.querySelector('[data-counter]');
  if (!slider || slides.length !== 5 || tabs.length !== slides.length || !previous || !next || !counter) return;

  let current = 0;
  const focusableSelector = 'a, button, input, textarea, select, [tabindex]';

  const show = (index, focusTab = false) => {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.hidden = !active;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.querySelectorAll(focusableSelector).forEach((element) => {
        if (!active) {
          if (!element.hasAttribute('data-vdp-tabindex')) {
            element.setAttribute('data-vdp-tabindex', element.getAttribute('tabindex') || '');
          }
          element.tabIndex = -1;
        } else if (element.hasAttribute('data-vdp-tabindex')) {
          const saved = element.getAttribute('data-vdp-tabindex');
          if (saved === '') element.removeAttribute('tabindex');
          else element.setAttribute('tabindex', saved);
          element.removeAttribute('data-vdp-tabindex');
        }
      });
    });
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === current;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === current;
      dot.classList.toggle('is-active', active);
      if (active) dot.setAttribute('aria-current', 'step');
      else dot.removeAttribute('aria-current');
    });
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    counter.textContent = `Шаг ${current + 1} из ${slides.length}`;
    if (focusTab) tabs[current].focus();
  };

  tabs.forEach((tab, tabIndex) => {
    tab.addEventListener('click', () => show(tabIndex));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let target = current;
      if (event.key === 'ArrowLeft') target = Math.max(0, current - 1);
      if (event.key === 'ArrowRight') target = Math.min(slides.length - 1, current + 1);
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = slides.length - 1;
      show(target, true);
    });
  });
  dots.forEach((dot) => dot.addEventListener('click', () => show(Number(dot.dataset.dot))));
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));

  let touchX = 0;
  let touchY = 0;
  slider.addEventListener('touchstart', (event) => {
    touchX = event.changedTouches[0].clientX;
    touchY = event.changedTouches[0].clientY;
  }, { passive: true });
  slider.addEventListener('touchend', (event) => {
    const deltaX = event.changedTouches[0].clientX - touchX;
    const deltaY = event.changedTouches[0].clientY - touchY;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) return;
    show(deltaX < 0 ? current + 1 : current - 1);
  }, { passive: true });

  show(0);
}

function initFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = String(new Date().getFullYear());
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;

    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

function initNavActive() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-list a');
  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

function initSystemGears() {
  const svg = document.getElementById('system-gears');
  const section = document.getElementById('system');
  const caption = document.getElementById('system-caption');
  if (!svg || !section || !caption) return;

  const NS = 'http://www.w3.org/2000/svg';
  const PI = Math.PI;
  const m = 17;
  const ha = 0.52;

  const svgEl = (name, attrs) => {
    const node = document.createElementNS(NS, name);
    if (attrs) Object.keys(attrs).forEach((key) => node.setAttribute(key, attrs[key]));
    return node;
  };

  const aim = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]);
  const mate = (z1, th1, phi, z2) => phi + PI + (PI - z1 * (th1 - phi)) / z2;
  const hits = (c1, r1, c2, r2) => {
    const dx = c2[0] - c1[0];
    const dy = c2[1] - c1[1];
    const d = Math.hypot(dx, dy);
    if (d < 1e-6 || d > r1 + r2 || d < Math.abs(r1 - r2)) return [];
    const along = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, r1 * r1 - along * along));
    const mx = c1[0] + (along * dx) / d;
    const my = c1[1] + (along * dy) / d;
    const rx = (-dy * h) / d;
    const ry = (dx * h) / d;
    return [[mx + rx, my + ry], [mx - rx, my - ry]];
  };

  const zA = 10;
  const zVid = 7;
  const zS = 11;
  const zBiz = 18;
  const zSeo = 7;
  const zVd = 14;
  // Closes the ads → video → site → SEO → ads loop on an exact tooth phase.
  const Las = 12.0881892369;
  const site = [Las * Math.cos((36 * PI) / 180), Las * Math.sin((36 * PI) / 180)];
  const origin = [0, 0];
  const side = (ax, ay, px, py) => ax * py - ay * px;
  const seoPair = hits(origin, (zA + zSeo) / 2, site, (zSeo + zS) / 2);
  const videoPair = hits(origin, (zA + zVid) / 2, site, (zVid + zS) / 2);
  const seo = side(site[0], site[1], seoPair[0][0], seoPair[0][1]) < 0 ? seoPair[0] : seoPair[1];
  const video = side(site[0], site[1], videoPair[0][0], videoPair[0][1]) > 0 ? videoPair[0] : videoPair[1];
  const raOf = (z) => z / 2 + ha;
  const gapOf = (p, z1, q, z2) => Math.hypot(p[0] - q[0], p[1] - q[1]) - raOf(z1) - raOf(z2);
  const distVd = (zVd + zA) / 2;
  let vd = [-distVd, 0];
  for (let deg = 165; deg <= 210; deg += 1) {
    const a = (deg * PI) / 180;
    const cand = [distVd * Math.cos(a), distVd * Math.sin(a)];
    if (gapOf(cand, zVd, video, zVid) > 0.55 && gapOf(cand, zVd, seo, zSeo) > 0.55 && gapOf(cand, zVd, site, zS) > 0.55) {
      vd = cand;
      break;
    }
  }
  const distBiz = (zS + zBiz) / 2;
  let biz = [site[0] + distBiz, site[1]];
  let bestScore = -Infinity;
  for (let deg = -75; deg <= 25; deg += 1) {
    const a = (deg * PI) / 180;
    const cand = [site[0] + distBiz * Math.cos(a), site[1] + distBiz * Math.sin(a)];
    const minGap = Math.min(
      gapOf(cand, zBiz, origin, zA),
      gapOf(cand, zBiz, video, zVid),
      gapOf(cand, zBiz, seo, zSeo),
      gapOf(cand, zBiz, vd, zVd)
    );
    if (minGap < 0.55) continue;
    const score = cand[0] - Math.abs(cand[1]) * 0.2;
    if (score > bestScore) {
      bestScore = score;
      biz = cand;
    }
  }
  const math = { ads: origin, seo, video, site, vd, biz };
  const theta = { ads: 0 };
  theta.seo = mate(zA, theta.ads, aim(origin, seo), zSeo);
  theta.site = mate(zSeo, theta.seo, aim(seo, site), zS);
  theta.video = mate(zA, theta.ads, aim(origin, video), zVid);
  theta.vd = mate(zA, theta.ads, aim(origin, vd), zVd);
  theta.biz = mate(zS, theta.site, aim(site, biz), zBiz);

  const gears = [
    { id: 'seo', z: zSeo, sign: -1, tone: 'light', label: 'SEO', icon: 'search', service: true, caption: 'Помогает находить сайт в поиске' },
    { id: 'video', z: zVid, sign: -1, tone: 'light', label: 'ВИДЕО', icon: 'play', service: true, caption: 'Показывает продукт и создаёт доверие' },
    { id: 'ads', z: zA, sign: 1, tone: 'light', label: 'КОНТЕКСТНАЯ РЕКЛАМА', rows: ['КОНТЕКСТНАЯ', 'РЕКЛАМА'], icon: 'target', service: true, caption: 'Приводит людей, которые ищут вашу услугу' },
    { id: 'site', z: zS, sign: 1, tone: 'light', label: 'САЙТ', icon: 'browser', service: true, caption: 'Отвечает на вопросы и помогает оставить заявку' },
    { id: 'vd', z: zVd, sign: -1, tone: 'lime', label: 'VD Group', icon: '', wordmark: true, service: false },
    { id: 'biz', z: zBiz, sign: -1, tone: 'lime', label: 'БИЗНЕС', icon: 'chart', service: false, sub: 'Обращения → Продажи' }
  ];
  const byId = {};
  gears.forEach((g) => {
    byId[g.id] = g;
    g.cx = math[g.id][0] * m;
    g.cy = -math[g.id][1] * m;
    g.th0 = theta[g.id];
    g.ra = (g.z * m) / 2 + ha * m;
    g.hubR = g.ra * (g.z <= 12 ? 0.64 : 0.58);
  });

  const gearPath = (radius, teeth) => {
    const rootR = radius - 17.2;
    const pitch = (2 * PI) / teeth;
    const points = [];
    const addPolar = (r, a) => points.push([r * Math.cos(a), -r * Math.sin(a)]);
    const addLocal = (x, y, a) => {
      const c = Math.cos(a);
      const s = Math.sin(a);
      points.push([x * c + y * s, -x * s + y * c]);
    };
    const halfTip = Math.min(15, radius * Math.sin(pitch * 0.21));
    const halfNeck = halfTip + Math.min(2.4, radius * 0.016);
    for (let tooth = 0; tooth < teeth; tooth += 1) {
      const a = tooth * pitch;
      addPolar(rootR, a - pitch * 0.5);
      addPolar(rootR, a - pitch * 0.3);
      addLocal(rootR, -halfNeck, a);
      addLocal(radius - 1.8, -halfTip, a);
      addLocal(radius, -halfTip + 1.8, a);
      addLocal(radius, halfTip - 1.8, a);
      addLocal(radius - 1.8, halfTip, a);
      addLocal(rootR, halfNeck, a);
      addPolar(rootR, a + pitch * 0.3);
    }
    const corner = Math.max(1.8, Math.min(3.5, radius * 0.02));
    const toward = (from, to, distance) => {
      const dx = to[0] - from[0];
      const dy = to[1] - from[1];
      const length = Math.hypot(dx, dy) || 1;
      const amount = Math.min(distance, length * 0.34) / length;
      return [from[0] + dx * amount, from[1] + dy * amount];
    };
    const before = points.map((p, i) => toward(p, points[(i - 1 + points.length) % points.length], corner));
    const after = points.map((p, i) => toward(p, points[(i + 1) % points.length], corner));
    const xy = (p) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
    let d = `M${xy(before[0])} Q${xy(points[0])} ${xy(after[0])} `;
    for (let i = 1; i < points.length; i += 1) {
      d += `L${xy(before[i])} Q${xy(points[i])} ${xy(after[i])} `;
    }
    return `${d}Z`;
  };

  gears.forEach((g) => {
    g.path = gearPath(g.ra, g.z);
  });

  const shiftX = 7;
  const shiftY = 12;
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  gears.forEach((g) => {
    minX = Math.min(minX, g.cx - g.ra - 6);
    minY = Math.min(minY, g.cy - g.ra - 6);
    maxX = Math.max(maxX, g.cx + g.ra + shiftX + 16);
    maxY = Math.max(maxY, g.cy + g.ra + shiftY + 18);
  });
  const pad = 22;
  const vbW = maxX - minX + pad * 2;
  const vbH = maxY - minY + pad * 2 + 8;
  svg.setAttribute('viewBox', `${(minX - pad).toFixed(1)} ${(minY - pad).toFixed(1)} ${vbW.toFixed(1)} ${vbH.toFixed(1)}`);

  const defs = svgEl('defs');
  const filter = svgEl('filter', {
    id: 'sys-gear-shadow',
    x: '-20%',
    y: '-20%',
    width: '170%',
    height: '185%',
    'color-interpolation-filters': 'sRGB'
  });
  filter.appendChild(svgEl('feDropShadow', {
    dx: '9',
    dy: '16',
    stdDeviation: '6.5',
    'flood-color': '#000000',
    'flood-opacity': '0.36'
  }));
  defs.appendChild(filter);
  const addGradient = (id, stops) => {
    const gradient = svgEl('linearGradient', {
      id,
      x1: '0',
      y1: '0',
      x2: '1',
      y2: '1'
    });
    stops.forEach(([offset, color]) => {
      gradient.appendChild(svgEl('stop', { offset, 'stop-color': color }));
    });
    defs.appendChild(gradient);
  };
  addGradient('sys-face-light', [
    ['0', '#fffef9'],
    ['0.48', '#ebe8df'],
    ['1', '#c9c4b8']
  ]);
  addGradient('sys-face-lime', [
    ['0', '#edff00'],
    ['0.5', '#d7ed00'],
    ['1', '#aebe00']
  ]);
  addGradient('sys-hub-dark', [
    ['0', '#292925'],
    ['0.5', '#191917'],
    ['1', '#090908']
  ]);
  svg.appendChild(defs);

  const lightSides = [
    { dx: 8, dy: 13, fill: '#7f7b72' },
    { dx: 5, dy: 8.2, fill: '#a29e94' },
    { dx: 2.2, dy: 3.6, fill: '#c8c4ba' }
  ];
  const limeSides = [
    { dx: 8, dy: 13, fill: '#738000' },
    { dx: 5, dy: 8.2, fill: '#9aae00' },
    { dx: 2.2, dy: 3.6, fill: '#c0d200' }
  ];
  const stage = svgEl('g', { 'aria-hidden': 'true', 'pointer-events': 'none' });
  const depthStage = svgEl('g');
  const faceStage = svgEl('g');
  const sparkStage = svgEl('g', {
    class: 'gear-sparks',
    'aria-hidden': 'true',
    'pointer-events': 'none'
  });
  stage.appendChild(depthStage);
  stage.appendChild(faceStage);
  stage.appendChild(sparkStage);
  const ui = svgEl('g');
  svg.appendChild(stage);
  svg.appendChild(ui);

  const addIcon = (kind, ink) => {
    const g = svgEl('g', {
      fill: 'none',
      stroke: ink,
      'stroke-width': '2.25',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    });
    if (kind === 'browser') {
      g.appendChild(svgEl('rect', { x: '-13', y: '-10', width: '26', height: '19', rx: '2.4' }));
      g.appendChild(svgEl('path', { d: 'M-13 -4.2 H13' }));
      g.appendChild(svgEl('path', { d: 'M-9 -7.1 H-6.2', 'stroke-width': '2.6' }));
    } else if (kind === 'target') {
      g.appendChild(svgEl('circle', { cx: '0', cy: '0', r: '11' }));
      g.appendChild(svgEl('circle', { cx: '0', cy: '0', r: '6' }));
      g.appendChild(svgEl('circle', { cx: '0', cy: '0', r: '2', fill: ink, stroke: 'none' }));
      g.appendChild(svgEl('path', { d: 'M-12.5 10.5 L-1.6 1.5' }));
      g.appendChild(svgEl('path', { d: 'M-1.6 1.5 L-6.4 2.4 M-1.6 1.5 L-2.6 6.2' }));
    } else if (kind === 'play') {
      g.appendChild(svgEl('circle', { cx: '0', cy: '0', r: '12' }));
      g.appendChild(svgEl('path', { d: 'M-3.4 -5.4 L6.2 0 L-3.4 5.4 Z', fill: ink, stroke: 'none' }));
    } else if (kind === 'search') {
      g.appendChild(svgEl('circle', { cx: '-2', cy: '-2', r: '8' }));
      g.appendChild(svgEl('path', { d: 'M4 4 L12 12' }));
    } else if (kind === 'bars') {
      g.appendChild(svgEl('path', {
        d: 'M-10 8 H-5 V1 H-10 Z M-2.2 8 H2.8 V-4 H-2.2 Z M5.6 8 H10.6 V-8 H5.6 Z',
        fill: ink,
        stroke: 'none'
      }));
    } else {
      g.appendChild(svgEl('path', {
        d: 'M-10 8 H-5.2 V2.2 H-10 Z M-2.4 8 H2.4 V-3.2 H-2.4 Z M5.2 8 H10 V-8 H5.2 Z',
        fill: ink,
        stroke: 'none'
      }));
      g.appendChild(svgEl('path', { d: 'M-8.2 -0.4 L6.6 -12' }));
      g.appendChild(svgEl('path', { d: 'M6.6 -12 L2.2 -11.1 M6.6 -12 L5.6 -7.6' }));
    }
    return g;
  };

  gears.forEach((g) => {
    const ink = '#f1efe8';
    const depthSpin = svgEl('g', {
      filter: 'url(#sys-gear-shadow)',
      transform: `translate(${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`
    });
    const faceSpin = svgEl('g', {
      transform: `translate(${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`
    });
    g.depthGroup = depthSpin;
    g.faceGroup = faceSpin;
    const sides = g.tone === 'lime' ? limeSides : lightSides;
    g.extrude = sides.map((layer) => {
      const rotor = svgEl('g');
      rotor.appendChild(svgEl('path', { d: g.path, fill: layer.fill }));
      depthSpin.appendChild(rotor);
      return { rotor, dx: layer.dx, dy: layer.dy };
    });
    const faceRotor = svgEl('g', { class: 'gear-rotor' });
    const face = svgEl('path', {
      d: g.path,
      class: `gear-face tone-${g.tone}`,
      fill: `url(#sys-face-${g.tone})`
    });
    faceRotor.appendChild(face);
    faceSpin.appendChild(faceRotor);
    depthStage.appendChild(depthSpin);
    faceStage.appendChild(faceSpin);
    g.faceRotor = faceRotor;
    g.face = face;

    const hub = svgEl('g', { transform: `translate(${g.cx.toFixed(2)} ${g.cy.toFixed(2)})` });
    hub.appendChild(svgEl('circle', {
      cx: '2.4',
      cy: '3.6',
      r: g.hubR.toFixed(2),
      fill: '#050504'
    }));
    hub.appendChild(svgEl('circle', {
      cx: '0',
      cy: '0',
      r: g.hubR.toFixed(2),
      fill: 'url(#sys-hub-dark)',
      class: 'gear-hub-disk'
    }));
    let icon = null;
    let iconScale = 1;
    if (g.icon) {
      icon = addIcon(g.icon, ink);
      iconScale = g.hubR / (g.z <= 12 ? 42 : g.sub ? 58 : 50);
      icon.setAttribute('transform', `translate(0 ${(-g.hubR * (g.sub ? 0.38 : 0.28)).toFixed(2)}) scale(${iconScale.toFixed(3)})`);
      hub.appendChild(icon);
    }
    g.iconEl = icon;
    g.iconScale = iconScale;
    const name = svgEl('text', {
      x: '0',
      y: (g.wordmark ? 0 : g.hubR * (g.sub ? 0.08 : 0.28)).toFixed(2),
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      fill: ink,
      'font-family': 'Oswald, sans-serif',
      'font-weight': g.wordmark ? '700' : '600',
      'letter-spacing': g.wordmark ? '0.04em' : (g.z <= 12 ? '0' : '0.02em')
    });
    name.textContent = g.label;
    hub.appendChild(name);
    g.nameEl = name;
    if (g.sub) {
      const sub = svgEl('text', {
        x: '0',
        y: (g.hubR * 0.4).toFixed(2),
        'text-anchor': 'middle',
        fill: ink,
        'font-family': 'Manrope, sans-serif',
        'font-weight': '600'
      });
      hub.appendChild(sub);
      g.subEl = sub;
    }
    if (g.service) {
      const hit = svgEl('g', {
        class: 'gear-hit',
        role: 'button',
        tabindex: '0',
        'data-gear': g.id,
        'aria-label': g.label === 'SEO' ? 'SEO' : g.label.charAt(0) + g.label.slice(1).toLowerCase(),
        'aria-expanded': 'false',
        'aria-controls': 'system-caption'
      });
      hit.appendChild(svgEl('circle', {
        cx: '0',
        cy: '0',
        r: (g.hubR * 1.35).toFixed(2),
        fill: 'transparent'
      }));
      hit.appendChild(svgEl('circle', {
        cx: '0',
        cy: '0',
        r: (g.hubR - 1.5).toFixed(2),
        fill: 'none',
        stroke: '#d2e600',
        'stroke-width': '2',
        class: 'gear-focus'
      }));
      hub.appendChild(hit);
      g.hit = hit;
    }
    g.hub = hub;
  });
  gears.forEach((g) => ui.appendChild(g.hub));

  const setGearStage = (g, dx = 0, dy = 0, scale = 1, opacity = 1) => {
    const transform = `translate(${(g.cx + dx).toFixed(2)} ${(g.cy + dy).toFixed(2)}) scale(${scale.toFixed(4)})`;
    g.depthGroup.setAttribute('transform', transform);
    g.faceGroup.setAttribute('transform', transform);
    g.hub.setAttribute('transform', transform);
    [g.depthGroup, g.faceGroup, g.hub].forEach((group) => {
      group.setAttribute('opacity', opacity.toFixed(3));
    });
  };

  const crackSvg = svgEl('svg', {
    class: 'system-impact-cracks',
    viewBox: '0 0 1200 600',
    preserveAspectRatio: 'none',
    'aria-hidden': 'true',
    focusable: 'false'
  });
  const crackPaths = [
    'M830 185 L850 150 L860 120 M860 120 L840 100 L820 82 M860 120 L890 100 L915 82 M860 120 L830 128 L820 128 M860 120 L890 128 L915 128',
    'M700 190 L665 150 L630 120 M630 120 L608 101 L590 90 M630 120 L630 105 M630 120 L610 125',
    'M690 395 L620 418 L520 430 M520 430 L480 435 L450 440 M520 430 L520 465 M520 430 L455 462 L400 490',
    'M850 400 L900 430 L950 455 M950 455 L930 465 L920 475 M950 455 L990 472 L1020 490 M950 455 L1020 490 L1080 530'
  ].map((d, index) => {
    const path = svgEl('path', {
      d,
      pathLength: '1',
      class: `system-impact-crack crack-${index + 1}`
    });
    crackSvg.appendChild(path);
    return path;
  });
  const branchTags = [
    [
      { x: 790, y: 48, w: 60, label: 'HTML5', color: '#f06a3a', stem: [820, 82] },
      { x: 889, y: 48, w: 52, label: 'CSS3', color: '#48a7e8', stem: [915, 82] },
      { x: 780, y: 100, w: 80, label: 'JavaScript', color: '#f1dc55', stem: [820, 128] },
      { x: 885, y: 100, w: 60, label: 'React', color: '#68d5ea', stem: [915, 128] }
    ],
    [
      { x: 520, y: 35, w: 70, label: 'YouTube', color: '#ff5a61', stem: [590, 90] },
      { x: 620, y: 65, w: 42, label: 'DJI', color: '#dddcd5', stem: [630, 105] },
      { x: 540, y: 110, w: 62, label: 'CapCut', color: '#b5f0e9', stem: [610, 125] }
    ],
    [
      { x: 370, y: 415, w: 82, label: 'Google Ads', color: '#74a8ff', stem: [450, 440] },
      { x: 466, y: 445, w: 108, label: 'Яндекс Директ', color: '#ff6a58', stem: [520, 465] },
      { x: 300, y: 480, w: 148, label: 'Видеореклама YouTube', color: '#ff5a61', stem: [400, 490] }
    ],
    [
      { x: 840, y: 455, w: 108, label: 'Search Console', color: '#74a8ff', stem: [920, 475] },
      { x: 956, y: 470, w: 128, label: 'Яндекс Вебмастер', color: '#ff6a58', stem: [1020, 490] },
      { x: 1036, y: 510, w: 88, label: 'Schema.org', color: '#d5eb00', stem: [1080, 530] }
    ]
  ];
  const crackLeaves = branchTags.map((tags, branchIndex) => tags.map((tag) => {
    const group = svgEl('g', { class: `system-branch-tag branch-${branchIndex + 1}` });
    const tagX = tag.x + tag.w / 2;
    const tagY = tag.y + 10;
    group.appendChild(svgEl('path', {
      d: `M${tag.stem[0]} ${tag.stem[1]} Q${tag.stem[0]} ${tagY} ${tagX} ${tagY}`,
      class: 'system-branch-stem',
      stroke: tag.color
    }));
    group.appendChild(svgEl('circle', {
      cx: tag.stem[0],
      cy: tag.stem[1],
      r: '2.2',
      fill: tag.color,
      class: 'system-branch-bud'
    }));
    group.appendChild(svgEl('rect', {
      x: tag.x,
      y: tag.y,
      width: tag.w,
      height: '20',
      rx: '10',
      class: 'system-branch-label',
      stroke: tag.color
    }));
    const text = svgEl('text', {
      x: tagX,
      y: tagY + 0.5,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      fill: tag.color,
      class: 'system-branch-text'
    });
    text.textContent = tag.label;
    group.appendChild(text);
    crackSvg.appendChild(group);
    return group;
  }));
  section.insertBefore(crackSvg, section.firstChild);

  const introPlan = {
    vd: { start: 0.08, duration: 0.62, mode: 'perspective' },
    site: { start: 0.68, duration: 0.4, mode: 'perspective', crack: 0 },
    video: { start: 1.04, duration: 0.4, mode: 'perspective', crack: 1 },
    ads: { start: 1.4, duration: 0.4, mode: 'perspective', crack: 2 },
    seo: { start: 1.76, duration: 0.4, mode: 'perspective', crack: 3 }
  };
  const introDuration = 2.32;
  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
  const paintCracks = (seconds) => {
    Object.values(introPlan).forEach((plan) => {
      if (plan.crack === undefined) return;
      const start = plan.start + plan.duration * 0.7;
      const progress = easeOutCubic(clamp01((seconds - start) / 0.24));
      crackPaths[plan.crack].style.strokeDashoffset = String(1 - progress);
      crackLeaves[plan.crack].forEach((leaf, index) => {
        const leafProgress = easeOutCubic(clamp01((seconds - start - 0.07 - index * 0.035) / 0.22));
        leaf.style.opacity = String(leafProgress * 0.9);
        leaf.setAttribute('transform', `translate(0 ${(1 - leafProgress) * 6})`);
      });
    });
  };
  const paintIntro = (seconds) => {
    gears.forEach((g) => {
      if (g.id === 'biz') {
        setGearStage(g);
        return;
      }
      const plan = introPlan[g.id];
      const progress = clamp01((seconds - plan.start) / plan.duration);
      if (plan.mode === 'perspective') {
        const eased = easeOutCubic(progress);
        const depth = g.id === 'vd' ? 1.55 : 1.32;
        const travel = g.id === 'vd' ? Math.max(125, g.ra * 0.72) : Math.max(105, g.ra * 0.6);
        setGearStage(g, 0, (1 - eased) * travel, 1 + (1 - eased) * depth, eased);
      }
    });
    paintCracks(seconds);
  };

  const finishIntro = () => {
    gears.forEach((g) => setGearStage(g));
    crackPaths.forEach((path) => {
      path.style.strokeDashoffset = '0';
    });
    crackLeaves.flat().forEach((leaf) => {
      leaf.style.opacity = '0.9';
      leaf.setAttribute('transform', 'translate(0 0)');
    });
  };

  const sparkPairs = [
    ['vd', 'ads'],
    ['ads', 'video'],
    ['video', 'site'],
    ['ads', 'seo'],
    ['seo', 'site'],
    ['site', 'biz']
  ];
  const wrapTurn = (value) => ((value % (2 * PI)) + 2 * PI) % (2 * PI);
  const sparks = sparkPairs.map(([fromId, toId]) => {
    const from = byId[fromId];
    const to = byId[toId];
    const dx = to.cx - from.cx;
    const dy = to.cy - from.cy;
    const distance = Math.hypot(dx, dy);
    const pitchRadius = (from.z * m) / 2;
    const toPitchRadius = (to.z * m) / 2;
    const contactX = from.cx + (dx / distance) * pitchRadius;
    const contactY = from.cy + (dy / distance) * pitchRadius;
    const tangentX = -dy / distance;
    const tangentY = dx / distance;
    const exitDistance = Math.max(
      Math.sqrt(Math.max(0, from.ra * from.ra - pitchRadius * pitchRadius)),
      Math.sqrt(Math.max(0, to.ra * to.ra - toPitchRadius * toPitchRadius))
    ) + 1.5;
    const clearance = (direction) => {
      const px = contactX + tangentX * direction * (exitDistance + 8);
      const py = contactY + tangentY * direction * (exitDistance + 8);
      return gears.reduce((best, gear) => {
        if (gear.id === fromId || gear.id === toId) return best;
        return Math.min(best, Math.hypot(px - gear.cx, py - gear.cy) - gear.ra);
      }, Infinity);
    };
    const direction = clearance(1) >= clearance(-1) ? 1 : -1;
    const x = contactX + tangentX * direction * exitDistance;
    const y = contactY + tangentY * direction * exitDistance;
    const mathPhi = aim(math[fromId], math[toId]);
    const offset = wrapTurn(-from.sign * from.z * (from.th0 - mathPhi));
    const angle = (Math.atan2(tangentY * direction, tangentX * direction) * 180) / PI + 90;
    const group = svgEl('g', {
      transform: `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${angle.toFixed(2)})`
    });
    const particleSpecs = [
      { delay: 0, travel: 28, lateral: -5, tilt: -16, length: 7, color: '#fffde9', width: 1.4 },
      { delay: 0.06, travel: 35, lateral: 2, tilt: 9, length: 8, color: '#eaff62', width: 1.2 },
      { delay: 0.12, travel: 24, lateral: 6, tilt: 24, length: 5, color: '#ffffff', width: 1 },
      { delay: 0.2, travel: 31, lateral: -2, dot: 0.9, color: '#f5ffad' }
    ];
    const particles = particleSpecs.map((spec) => {
      const node = spec.dot
        ? svgEl('circle', { cx: '0', cy: '0', r: spec.dot, fill: spec.color, opacity: '0' })
        : svgEl('path', {
          d: `M0 0 L0 ${(-spec.length).toFixed(2)}`,
          fill: 'none',
          stroke: spec.color,
          'stroke-width': spec.width,
          'stroke-linecap': 'round',
          opacity: '0'
        });
      group.appendChild(node);
      return { node, ...spec };
    });
    sparkStage.appendChild(group);
    return { group, offset, particles };
  });

  const hideSparks = () => {
    sparks.forEach((spark) => {
      spark.particles.forEach((particle) => particle.node.setAttribute('opacity', '0'));
    });
  };

  const paintSparks = (u) => {
    sparks.forEach((spark) => {
      const delta = Math.atan2(Math.sin(u - spark.offset), Math.cos(u - spark.offset));
      const width = 0.48;
      const active = Math.abs(delta) <= width;
      const eventProgress = (delta + width) / (2 * width);
      spark.particles.forEach((particle) => {
        const progress = (eventProgress - particle.delay) / (1 - particle.delay);
        if (!active || progress < 0 || progress > 1) {
          particle.node.setAttribute('opacity', '0');
          return;
        }
        const life = Math.pow(Math.sin(progress * PI), 0.72);
        const opacity = life * (1 - progress * 0.55);
        const lateral = particle.lateral * (0.25 + progress);
        const travel = 2 + particle.travel * progress;
        particle.node.setAttribute('opacity', opacity.toFixed(3));
        particle.node.setAttribute(
          'transform',
          `translate(${lateral.toFixed(2)} ${(-travel).toFixed(2)}) rotate(${particle.tilt || 0})`
        );
      });
    });
  };

  const fitType = () => {
    const width = svg.getBoundingClientRect().width;
    if (width < 8) return;
    const scale = width / vbW;
    gears.forEach((g) => {
      const budget = g.hubR * (g.wordmark ? 1.7 : 1.62);
      if (g.wordmark) {
        let markUser = g.hubR * 0.58;
        g.nameEl.replaceChildren();
        ['VD', 'GROUP'].forEach((row, index) => {
          const span = svgEl('tspan', {
            x: '0',
            y: index === 0 ? (-g.hubR * 0.12).toFixed(2) : (g.hubR * 0.27).toFixed(2),
            'font-size': index === 0 ? '1em' : '0.38em',
            'letter-spacing': index === 0 ? '0.02em' : '0.24em'
          });
          span.textContent = row;
          g.nameEl.appendChild(span);
        });
        g.nameEl.setAttribute('font-size', markUser.toFixed(2));
        const spans = [...g.nameEl.querySelectorAll('tspan')];
        const longest = Math.max(...spans.map((span) => span.getComputedTextLength()));
        if (longest > budget && longest > 0) markUser *= budget / longest;
        g.nameEl.setAttribute('font-size', markUser.toFixed(2));
        g.nameEl.setAttribute('y', '0');
        return;
      }
      const screen = Math.min(g.sub ? 24 : 16, Math.max(11, g.hubR * scale * 0.34));
      let user = screen / scale;
      g.nameEl.replaceChildren();
      if (g.rows) {
        g.rows.forEach((row, index) => {
          const span = svgEl('tspan', {
            x: '0',
            y: (g.hubR * (index === 0 ? 0.19 : 0.42)).toFixed(2)
          });
          span.textContent = row;
          g.nameEl.appendChild(span);
        });
        g.nameEl.setAttribute('font-size', user.toFixed(2));
        const longestRow = Math.max(...[...g.nameEl.querySelectorAll('tspan')].map((span) => span.getComputedTextLength()));
        if (longestRow > budget && longestRow > 0) {
          user *= budget / longestRow;
          g.nameEl.setAttribute('font-size', user.toFixed(2));
        }
        return;
      }
      g.nameEl.textContent = g.label;
      g.nameEl.setAttribute('font-size', user.toFixed(2));
      const length = g.nameEl.getComputedTextLength();
      if (length > budget && length > 0) {
        user *= budget / length;
        g.nameEl.setAttribute('font-size', user.toFixed(2));
      }
      if (!g.subEl) return;
      const line = g.sub;
      const subBudget = g.hubR * 1.7;
      let subUser = 13 / scale;
      g.subEl.replaceChildren();
      g.subEl.textContent = line;
      g.subEl.setAttribute('font-size', subUser.toFixed(2));
      const subLen = g.subEl.getComputedTextLength();
      if (subLen > subBudget && subLen > 0) subUser *= subBudget / subLen;
      if (subUser * scale >= 11) {
        g.subEl.textContent = line;
        g.subEl.setAttribute('font-size', subUser.toFixed(2));
        g.subEl.setAttribute('y', (g.hubR * 0.42).toFixed(2));
        return;
      }
      g.subEl.textContent = '';
      ['Обращения →', 'Продажи'].forEach((row, index) => {
        const span = svgEl('tspan', { x: '0', dy: index === 0 ? '0' : '1.2em' });
        span.textContent = row;
        g.subEl.appendChild(span);
      });
      let stacked = 12 / scale;
      g.subEl.setAttribute('font-size', stacked.toFixed(2));
      const spans = [...g.subEl.querySelectorAll('tspan')];
      const longest = Math.max(...spans.map((span) => span.getComputedTextLength()));
      if (longest > subBudget && longest > 0) stacked *= subBudget / longest;
      g.subEl.setAttribute('font-size', stacked.toFixed(2));
      g.subEl.setAttribute('y', (g.hubR * 0.32).toFixed(2));
    });
  };

  const apply = (u) => {
    gears.forEach((g) => {
      const deg = -(((g.th0 + (g.sign * u) / g.z) * 180) / PI);
      const turn = deg.toFixed(4);
      const spinTurn = `rotate(${turn})`;
      g.faceRotor.setAttribute('transform', spinTurn);
      g.extrude.forEach((layer) => {
        layer.rotor.setAttribute('transform', `translate(${layer.dx} ${layer.dy}) ${spinTurn}`);
      });
    });
  };

  apply(0);
  fitType();
  window.addEventListener('resize', fitType);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitType);

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
  let pinned = null;
  let hovered = null;
  let focused = null;

  const shown = () => pinned || hovered || focused;

  const paint = () => {
    const id = shown();
    const activeBranch = { site: 0, video: 1, ads: 2, seo: 3 }[id];
    gears.forEach((g) => {
      g.face.classList.remove('is-hot', 'is-path');
      if (g.hit) g.hit.setAttribute('aria-expanded', 'false');
    });
    crackPaths.forEach((path, index) => {
      path.classList.toggle('is-active', index === activeBranch);
    });
    crackLeaves.forEach((leaves, index) => {
      leaves.forEach((leaf) => leaf.classList.toggle('is-active', index === activeBranch));
    });
    if (!id) {
      caption.textContent = '';
      return;
    }
    byId[id].face.classList.add('is-hot');
    if (byId[id].hit) byId[id].hit.setAttribute('aria-expanded', 'true');
    caption.textContent = byId[id].caption;
  };

  gears.forEach((g) => {
    if (!g.hit) return;
    g.hit.addEventListener('pointerenter', () => {
      if (!fine.matches || pinned) return;
      hovered = g.id;
      paint();
    });
    g.hit.addEventListener('pointerleave', () => {
      if (hovered !== g.id) return;
      hovered = null;
      paint();
    });
    g.hit.addEventListener('focus', () => {
      focused = g.id;
      paint();
    });
    g.hit.addEventListener('blur', () => {
      if (focused === g.id) focused = null;
      paint();
    });
    g.hit.addEventListener('pointerup', (event) => {
      if (fine.matches && event.pointerType === 'mouse') return;
      pinned = pinned === g.id ? null : g.id;
      hovered = null;
      paint();
    });
    g.hit.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      if (fine.matches) return;
      pinned = pinned === g.id ? null : g.id;
      paint();
    });
  });

  section.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    pinned = null;
    hovered = null;
    paint();
  });

  document.addEventListener('pointerdown', (event) => {
    if (!pinned) return;
    if (event.target.closest && event.target.closest('#system .system-mech')) return;
    pinned = null;
    paint();
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let phase = 0;
  let last = 0;
  let raf = 0;
  let running = false;
  let onScreen = false;
  let introElapsed = 0;
  let introComplete = reduced.matches;

  if (introComplete) finishIntro();
  else paintIntro(0);

  const stop = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
    hideSparks();
  };

  const frame = (now) => {
    if (!running) return;
    if (!last) last = now;
    const dt = Math.min(48, now - last);
    last = now;
    if (!introComplete) {
      introElapsed += dt / 1000;
      paintIntro(introElapsed);
      if (introElapsed >= introDuration) {
        introComplete = true;
        finishIntro();
        last = now;
      }
      raf = requestAnimationFrame(frame);
      return;
    }
    phase += (dt / 2100) * 2 * PI;
    if (phase > PI * 2) phase -= PI * 2;
    apply(phase);
    paintSparks(phase);
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running || reduced.matches || !onScreen || document.hidden) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  };

  if ('IntersectionObserver' in window) {
    const watch = new IntersectionObserver((entries) => {
      onScreen = entries.some((entry) => entry.isIntersecting);
      if (onScreen) start();
      else stop();
    }, { threshold: 0.12 });
    watch.observe(section);
  } else {
    onScreen = true;
    start();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  const onReduce = () => {
    if (!reduced.matches) {
      start();
      return;
    }
    stop();
    phase = 0;
    apply(0);
    introComplete = true;
    introElapsed = introDuration;
    finishIntro();
  };
  if (reduced.addEventListener) reduced.addEventListener('change', onReduce);
  else if (reduced.addListener) reduced.addListener(onReduce);
}
