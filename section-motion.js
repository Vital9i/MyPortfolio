/* SEO scene and section connectors. No animation library, no scroll handler. */
(() => {
  'use strict';
  const seo = document.getElementById('seo-geo');
  const ad = document.getElementById('relevance');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let frame = 0;
  let runUntil = 0;
  const point = (element, bounds, x, y) => {
    const r = element.getBoundingClientRect();
    return { x: r.left - bounds.left + r.width * x, y: r.top - bounds.top + r.height * y };
  };
  const curve = (a, b) => {
    const dx = Math.max(16, Math.abs(b.x - a.x) * .55);
    return `M${a.x},${a.y} C${a.x + dx},${a.y} ${b.x - dx},${b.y} ${b.x},${b.y}`;
  };
  function connectors() {
    if (innerWidth <= 900) return;
    if (seo) {
      const main = seo.querySelector('.main');
      const r = main.getBoundingClientRect();
      const svg = main.querySelector('.wires');
      const paths = svg.querySelectorAll('path');
      const hero = main.querySelector('.hero-layer');
      const targets = main.querySelectorAll('.result');
      svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
      targets.forEach((target, i) => paths[i].setAttribute('d', curve(point(hero,r,1,i ? .9 : .25), point(target,r,0,.12))));
      svg.style.opacity = seo.classList.contains('is-ready') && !seo.classList.contains('is-open') ? '0' : '1';
    }
    if (ad) {
      const scene = ad.querySelector('.scene');
      const r = scene.getBoundingClientRect();
      const svg = scene.querySelector('.connector');
      const paths = svg.querySelectorAll('path');
      const a = point(scene.querySelector('.ad h3'),r,.98,.4);
      const b = point(scene.querySelector('.mark'),r,0,.8);
      svg.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
      paths[0].setAttribute('d',`M${a.x},${a.y} Q${(a.x+b.x)/2},${Math.min(a.y,b.y)-50} ${b.x},${b.y}`);
      paths[1].setAttribute('d',`M${b.x-9},${b.y-5} L${b.x},${b.y} L${b.x-8},${b.y+5}`);
    }
  }
  function draw() {
    frame = 0;
    if (seo) {
      const layers = seo.querySelector('.layers');
      layers.style.setProperty('--seo-scale', String(layers.clientWidth / 850));
    }
    connectors();
    if (performance.now() < runUntil) frame = requestAnimationFrame(draw);
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(draw); }
  function open() {
    seo.classList.add('is-open');
    observer?.disconnect();
    runUntil = performance.now() + 1200;
    schedule();
  }
  if (seo) {
    // Reserve expanded space from the start, so opening never shifts later sections.
    seo.querySelector('.layers').style.setProperty('--seo-scale', String(seo.querySelector('.layers').clientWidth / 850));
    if (!motion.matches && 'IntersectionObserver' in window) {
      seo.classList.add('is-ready');
      observer = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) open();
      }, { threshold: 0, rootMargin: '0px 0px -18% 0px' });
      observer.observe(seo.querySelector('.layers'));
    } else seo.classList.add('is-open');
    motion.addEventListener('change', event => { if (event.matches) open(); });
  }
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(schedule);
    [seo?.querySelector('.main'), seo?.querySelector('.layers'), ad?.querySelector('.scene')].filter(Boolean).forEach(el => resize.observe(el));
  } else window.addEventListener('resize', schedule, { passive: true });
  document.fonts?.ready.then(schedule);
  [seo,ad].filter(Boolean).forEach(section => section.querySelectorAll('img').forEach(img => img.addEventListener('load',schedule,{once:true})));
  schedule();

  // Explicit review mode only. Reference is not downloaded on the normal site.
  if (new URLSearchParams(location.search).get('design-review') !== '1') return;
  const style = document.createElement('style');
  style.textContent = '.vd-review{position:fixed;z-index:99999;bottom:12px;left:12px;max-width:calc(100vw - 24px);display:flex;flex-wrap:wrap;gap:10px;align-items:center;background:#171917;color:white;padding:12px;border:1px solid #d5eb00;border-radius:10px;font:13px Arial}.vd-review button,.vd-review select{padding:6px;color:#171917;background:white;border-radius:4px}.vd-reference{position:absolute;inset:0 auto auto 0;width:100%;height:auto;max-width:none;pointer-events:none;z-index:99}';
  document.head.append(style);
  const panel = document.createElement('div'); panel.className = 'vd-review';
  panel.innerHTML = '<select aria-label="Секция"><option value="seo-geo">SEO + GEO</option><option value="relevance">Реклама</option></select><label>Референс <input aria-label="Прозрачность референса" type="range" min="0" max="100" value="50"></label><button type="button">Повторить раскрытие</button><span>Сравнение композиции · шрифты сайта сохранены</span>';
  document.body.append(panel);
  const overlay = document.createElement('img'); overlay.className = 'vd-reference'; overlay.alt = ''; overlay.setAttribute('aria-hidden','true');
  const select = panel.querySelector('select'), range = panel.querySelector('input');
  function selectSection() {
    const target = document.getElementById(select.value);
    target.style.position = 'relative';
    overlay.src = `reference/${select.value}.webp`;
    overlay.style.opacity = String(Number(range.value)/100);
    target.append(overlay);
    if (seo) open();
    target.scrollIntoView({block:'start'});
  }
  select.addEventListener('change',selectSection);
  range.addEventListener('input',()=>{overlay.style.opacity=String(Number(range.value)/100);});
  panel.querySelector('button').addEventListener('click',()=>{
    if (!seo || motion.matches) return;
    seo.classList.add('is-ready'); seo.classList.remove('is-open');
    setTimeout(open,1200);
  });
  selectSection();
})();
