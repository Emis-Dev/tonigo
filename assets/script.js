/* Tonigo — interactivity */

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== Diagnose chips ===== */
const diagData = {
  'scherm-stuk': {
    title: 'Gebroken scherm',
    body: 'Bij barsten of zwarte vlekken: meestal vervang je het complete display. Bij touch-issues zonder zichtbare schade: eerst fysieke check op vocht of verbogen rand.',
    links: [
      { label: 'iPhone scherm vervangen', href: '#guides' },
      { label: 'Samsung scherm vervangen', href: '#guides' },
      { label: 'Diagnose: scherm of digitizer?', href: '#academy' },
    ],
  },
  'batterij-leeg': {
    title: 'Batterij snel leeg',
    body: 'Check eerst de batterijgezondheid in de instellingen. Onder 80%? Vervangen levert direct winst. Bovenaan 80%? Eerst achtergrond-apps en netwerksignaal nakijken.',
    links: [
      { label: 'iPhone batterij vervangen', href: '#guides' },
      { label: 'Energie-diagnose checklist', href: '#academy' },
    ],
  },
  'laden-lukt-niet': {
    title: 'Laadt niet',
    body: 'In 90% van de gevallen zit er pluis in de laadpoort. Eerst mét lucht of een houten tandenstoker reinigen. Helpt dat niet, dan kabel/lader testen, daarna pas de poort vervangen.',
    links: [
      { label: 'Laadpoort reinigen of vervangen', href: '#guides' },
      { label: 'Diagnose: kabel, lader of poort?', href: '#academy' },
    ],
  },
  'water': {
    title: 'Waterschade',
    body: 'NIET aanzetten. NIET in rijst leggen. Direct uitschakelen, sim/kaart eruit, demonteren en alle interne onderdelen drogen met isopropanol 99%. Tijd is alles.',
    links: [
      { label: 'Waterschade — eerste hulp', href: '#guides' },
      { label: 'Corrosie reinigen logboard', href: '#academy' },
    ],
  },
  'oververhit': {
    title: 'Oververhit toestel',
    body: 'Vaak een batterij in zwellingsfase of een kortsluiting. Voel of de batterij bol staat. Zo ja: direct stoppen met laden en vervangen — risico op brand.',
    links: [
      { label: 'Gezwollen batterij — veilig vervangen', href: '#guides' },
      { label: 'Multimeter diagnose kortsluiting', href: '#academy' },
    ],
  },
  'geen-geluid': {
    title: 'Geen geluid',
    body: 'Test of het de luidspreker, het gespreksoor of de jack-uitgang is. Begin altijd bij reinigen — fijn stof in de mesh-rooster blokkeert vaak alles.',
    links: [
      { label: 'Luidspreker reinigen', href: '#guides' },
      { label: 'Audio-IC diagnose', href: '#academy' },
    ],
  },
  'knop-stuk': {
    title: 'Knop reageert niet',
    body: 'Power, volume en home knoppen zitten meestal aan een flex-kabel. Eerst nakijken of er iets vastzit, dan de flex vervangen. Zelden moederbord-issue.',
    links: [
      { label: 'Power- of volumeknop herstellen', href: '#guides' },
    ],
  },
  'camera': {
    title: 'Wazige camera',
    body: 'Let op: het is bijna altijd het buiten-glaasje, niet de sensor. Glas is goedkoop te vervangen, sensor niet. Onderscheid is essentieel om geld te besparen.',
    links: [
      { label: 'Camera lens vervangen', href: '#guides' },
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
    result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

/* ===== Cards open guide modal (simple alert for now, later real pages) ===== */
document.querySelectorAll('.card__link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const guide = link.dataset.guide;
    location.hash = '#guide-' + guide;
    // Smooth scroll back to guides section since detail pages komen later
    document.getElementById('guides').scrollIntoView({ behavior: 'smooth' });
  });
});
