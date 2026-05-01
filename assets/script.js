/* Tonigo — interactivity */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ===== Diagnose chips ===== */
const diagData = {
  'scherm-stuk': {
    title: 'Gebroken scherm',
    body: 'Bij barsten of zwarte vlekken: meestal vervang je het complete display. Bij touch-issues zonder zichtbare schade: eerst fysieke check op vocht of verbogen rand.',
    links: [
      { label: 'iPhone scherm vervangen', href: 'guides/iphone-scherm-vervangen.html' },
      { label: 'Samsung scherm vervangen', href: 'guides/samsung-galaxy-scherm-vervangen.html' },
      { label: 'Diagnose: scherm of digitizer?', href: '#academy' },
    ],
  },
  'batterij-leeg': {
    title: 'Batterij snel leeg',
    body: 'Check eerst de batterijgezondheid in de instellingen. Onder 80%? Vervangen levert direct winst. Bovenaan 80%? Eerst achtergrond-apps en netwerksignaal nakijken.',
    links: [
      { label: 'iPhone batterij vervangen', href: 'guides/iphone-batterij-vervangen.html' },
      { label: 'Energie-diagnose checklist', href: '#academy' },
    ],
  },
  'laden-lukt-niet': {
    title: 'Laadt niet',
    body: 'In 90% van de gevallen zit er pluis in de laadpoort. Eerst mét lucht of een houten tandenstoker reinigen. Helpt dat niet, dan kabel/lader testen, daarna pas de poort vervangen.',
    links: [
      { label: 'Laadpoort reinigen of vervangen', href: 'guides/laadpoort-reinigen-of-vervangen.html' },
      { label: 'Diagnose: kabel, lader of poort?', href: '#academy' },
    ],
  },
  'water': {
    title: 'Waterschade',
    body: 'NIET aanzetten. NIET in rijst leggen. Direct uitschakelen, sim/kaart eruit, demonteren en alle interne onderdelen drogen met isopropanol 99%. Tijd is alles.',
    links: [
      { label: 'Waterschade — eerste hulp', href: 'guides/waterschade-eerste-hulp.html' },
      { label: 'Corrosie reinigen logboard', href: '#academy' },
    ],
  },
  'oververhit': {
    title: 'Oververhit toestel',
    body: 'Vaak een batterij in zwellingsfase of een kortsluiting. Voel of de batterij bol staat. Zo ja: direct stoppen met laden en vervangen — risico op brand.',
    links: [
      { label: 'iPhone batterij vervangen', href: 'guides/iphone-batterij-vervangen.html' },
      { label: 'Multimeter diagnose kortsluiting', href: '#academy' },
    ],
  },
  'geen-geluid': {
    title: 'Geen geluid',
    body: 'Test of het de luidspreker, het gespreksoor of de jack-uitgang is. Begin altijd bij reinigen — fijn stof in de mesh-rooster blokkeert vaak alles.',
    links: [
      { label: 'Luidspreker reinigen', href: 'guides/luidspreker-rooster-reinigen.html' },
      { label: 'Audio-IC diagnose', href: '#academy' },
    ],
  },
  'knop-stuk': {
    title: 'Knop reageert niet',
    body: 'Power, volume en home knoppen zitten meestal aan een flex-kabel. Eerst nakijken of er iets vastzit, dan de flex vervangen. Zelden moederbord-issue.',
    links: [
      { label: 'Power- of volumeknop herstellen', href: 'guides/power-of-volumeknop-herstellen.html' },
    ],
  },
  'camera': {
    title: 'Wazige camera',
    body: 'Let op: het is bijna altijd het buiten-glaasje, niet de sensor. Glas is goedkoop te vervangen, sensor niet. Onderscheid is essentieel om geld te besparen.',
    links: [
      { label: 'Camera lens vervangen', href: 'guides/camera-lens-vervangen.html' },
      { label: 'Camera module of glas? Diagnose', href: '#academy' },
    ],
  },
};

const chips = document.querySelectorAll('#diagChips .chip');
const result = document.getElementById('diagResult');
const titleEl = document.getElementById('diagTitle');
const bodyEl = document.getElementById('diagBody');
const linksEl = document.getElementById('diagLinks');

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const data = diagData[chip.dataset.symptom];
    if (!data) return;
    titleEl.textContent = data.title;
    bodyEl.textContent = data.body;
    linksEl.innerHTML = data.links
      .map(l => `<a href="${l.href}"><i class="fa-solid fa-arrow-right-long"></i> ${l.label}</a>`)
      .join('');
    result.hidden = false;
    result.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
  });
});

/* ===== Guide filter ===== */
const filters = document.querySelectorAll('.guides__filter .filter');
const cards = document.querySelectorAll('#guidesGrid .card');

filters.forEach(f => {
  f.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    const tag = f.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (tag === 'all' || tags.includes(tag)) {
        card.classList.remove('is-hidden');
      } else {
        card.classList.add('is-hidden');
      }
    });
  });
});

/* ===== Scroll reveal and lightweight depth ===== */
const revealEls = document.querySelectorAll('.reveal, .feat, .tool, .path__step, .guide-section');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

const depthStage = document.querySelector('[data-depth]');
if (depthStage && !prefersReducedMotion) {
  let ticking = false;
  const layers = depthStage.querySelectorAll('.layer');

  const updateDepth = () => {
    const rect = depthStage.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    const offset = (rect.top + rect.height / 2 - viewportMid) / viewportMid;
    layers.forEach(layer => {
      const speed = Number(layer.dataset.speed || 0);
      layer.style.translate = `0 ${offset * speed * 90}px`;
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateDepth);
      ticking = true;
    }
  }, { passive: true });
  updateDepth();
}
