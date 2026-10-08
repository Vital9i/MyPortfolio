/**
 * Дойняк — Riverside-style interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initScrollReveal();
  initMobileNav();
  initProjectFilter();
  initContactForm();
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
  const labels = { site: 'Сайт', ads: 'Реклама', video: 'Видео', complex: 'Комплекс' };

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
  const m = 10;
  const ha = 0.88;

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

  const zA = 17;
  const zVid = 12;
  const zS = 19;
  const zBiz = 30;
  const zSeo = 12;
  const zVd = 24;
  const Las = 20.06;
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
    { id: 'ads', z: zA, sign: 1, tone: 'light', label: 'РЕКЛАМА', icon: 'target', service: true, caption: 'Приводит людей, которые ищут вашу услугу' },
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

  const route = {
    ads: ['ads', 'video', 'site', 'biz'],
    video: ['video', 'site', 'biz'],
    site: ['site', 'biz'],
    seo: ['seo', 'site', 'biz']
  };

  const gearPath = (z) => {
    const rp = (z * m) / 2;
    const toothSize = 13;
    const halfW = toothSize / 2 - 0.35;
    const addendum = (toothSize - 0.8) / 2;
    const ra = rp + addendum;
    const rd = ra - toothSize;
    const xRoot = Math.sqrt(Math.max(1, rd * rd - halfW * halfW));
    const xTip = Math.sqrt(Math.max(1, ra * ra - halfW * halfW));
    const pitch = (2 * PI) / z;
    const aRootL = Math.atan2(-halfW, xRoot);
    const aRootR = Math.atan2(halfW, xRoot);
    const tooth = [
      [xRoot, -halfW],
      [xTip, -halfW],
      [xTip, halfW],
      [xRoot, halfW]
    ];
    const gapSteps = 4;
    for (let i = 1; i <= gapSteps; i += 1) {
      const a = aRootR + (pitch + aRootL - aRootR) * (i / gapSteps);
      tooth.push([rd * Math.cos(a), rd * Math.sin(a)]);
    }
    const all = [];
    for (let k = 0; k < z; k += 1) {
      const a = k * pitch;
      const c = Math.cos(a);
      const s = Math.sin(a);
      tooth.forEach((p, index) => {
        if (k > 0 && index === 0) return;
        all.push([p[0] * c - p[1] * s, p[0] * s + p[1] * c]);
      });
    }
    let d = '';
    all.forEach((p, index) => {
      d += `${index === 0 ? 'M' : 'L'}${p[0].toFixed(2)} ${(-p[1]).toFixed(2)} `;
    });
    return `${d}Z`;
  };

  const paths = {};
  gears.forEach((g) => {
    if (!paths[g.z]) paths[g.z] = gearPath(g.z);
  });

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  gears.forEach((g) => {
    minX = Math.min(minX, g.cx - g.ra);
    minY = Math.min(minY, g.cy - g.ra);
    maxX = Math.max(maxX, g.cx + g.ra);
    maxY = Math.max(maxY, g.cy + g.ra);
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
    width: '150%',
    height: '160%',
    'color-interpolation-filters': 'sRGB'
  });
  filter.appendChild(svgEl('feDropShadow', {
    dx: '0',
    dy: '5',
    stdDeviation: '2.2',
    'flood-color': '#000000',
    'flood-opacity': '0.4'
  }));
  defs.appendChild(filter);
  svg.appendChild(defs);

  const stage = svgEl('g', { 'aria-hidden': 'true' });
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
    const ink = g.tone === 'lime' ? '#d2e600' : '#e8e6df';
    const wall = g.tone === 'lime' ? '#8d9c00' : '#9a968c';
    const spin = svgEl('g', {
      filter: 'url(#sys-gear-shadow)',
      transform: `translate(${g.cx.toFixed(2)} ${g.cy.toFixed(2)})`
    });
    const wallRotor = svgEl('g');
    const faceRotor = svgEl('g', { class: 'gear-rotor' });
    wallRotor.appendChild(svgEl('path', { d: paths[g.z], fill: wall }));
    const face = svgEl('path', { d: paths[g.z], class: `gear-face tone-${g.tone}` });
    faceRotor.appendChild(face);
    spin.appendChild(wallRotor);
    spin.appendChild(faceRotor);
    stage.appendChild(spin);
    g.wallRotor = wallRotor;
    g.faceRotor = faceRotor;
    g.face = face;

    const hub = svgEl('g', { transform: `translate(${g.cx.toFixed(2)} ${g.cy.toFixed(2)})` });
    hub.appendChild(svgEl('circle', {
      cx: '0',
      cy: '0',
      r: g.hubR.toFixed(2),
      fill: '#141412',
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
      fill: g.wordmark ? '#e8e6df' : ink,
      'font-family': g.wordmark ? 'Manrope, sans-serif' : 'Oswald, sans-serif',
      'font-weight': g.wordmark ? '700' : '600',
      'letter-spacing': g.wordmark ? '-0.03em' : (g.z <= 12 ? '0' : '0.02em')
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

  const fitType = () => {
    const width = svg.getBoundingClientRect().width;
    if (width < 8) return;
    const scale = width / vbW;
    gears.forEach((g) => {
      const budget = g.hubR * (g.wordmark ? 1.7 : 1.62);
      if (g.wordmark) {
        let markUser = g.hubR * 0.34;
        g.nameEl.replaceChildren();
        g.nameEl.textContent = g.label;
        g.nameEl.setAttribute('font-size', markUser.toFixed(2));
        const markLen = g.nameEl.getComputedTextLength();
        if (markLen > budget && markLen > 0) markUser *= budget / markLen;
        if (markUser * scale >= 12) {
          g.nameEl.textContent = g.label;
          g.nameEl.setAttribute('font-size', markUser.toFixed(2));
          g.nameEl.setAttribute('y', '0');
          return;
        }
        g.nameEl.textContent = '';
        ['VD', 'Group'].forEach((row, index) => {
          const span = svgEl('tspan', { x: '0', dy: index === 0 ? '0' : '1.05em' });
          span.textContent = row;
          g.nameEl.appendChild(span);
        });
        markUser = Math.max(markUser * 1.7, 12 / scale);
        g.nameEl.setAttribute('font-size', markUser.toFixed(2));
        const spans = [...g.nameEl.querySelectorAll('tspan')];
        const longest = Math.max(...spans.map((span) => span.getComputedTextLength()));
        if (longest > budget && longest > 0) markUser *= budget / longest;
        g.nameEl.setAttribute('font-size', markUser.toFixed(2));
        g.nameEl.setAttribute('y', (-g.hubR * 0.22).toFixed(2));
        return;
      }
      const screen = Math.min(g.sub ? 24 : 16, Math.max(11, g.hubR * scale * 0.34));
      let user = screen / scale;
      g.nameEl.replaceChildren();
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
      g.faceRotor.setAttribute('transform', `rotate(${turn})`);
      g.wallRotor.setAttribute('transform', `translate(0 5) rotate(${turn})`);
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
    gears.forEach((g) => {
      g.face.classList.remove('is-hot', 'is-path');
      if (g.hit) g.hit.setAttribute('aria-expanded', 'false');
    });
    if (!id) {
      caption.textContent = '';
      return;
    }
    route[id].forEach((rid) => {
      if (rid !== id) byId[rid].face.classList.add('is-path');
    });
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

  const stop = () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
  };

  const frame = (now) => {
    if (!running) return;
    if (!last) last = now;
    const dt = Math.min(48, now - last);
    last = now;
    phase += (dt / 8400) * 2 * PI;
    if (phase > PI * 2) phase -= PI * 2;
    apply(phase);
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
  };
  if (reduced.addEventListener) reduced.addEventListener('change', onReduce);
  else if (reduced.addListener) reduced.addListener(onReduce);
}
