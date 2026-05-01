# Tonigo

> Open kennisbank — leer zelf je smartphone repareren.

Stap-voor-stap gidsen, video's en tools voor iPhone, Samsung en andere Android toestellen. Voor iedereen die liever zelf sleutelt dan vervangt.

## Wat zit erin

- 🩺 **Probleemwijzer** — vertel je symptoom, krijg de juiste gids
- 📚 **Reparatiegidsen** — echte detailpagina's voor scherm, batterij, laadpoort, water, speakers, knoppen en camera
- 🛠️ **Gereedschap** — wat je écht nodig hebt om te starten
- 🎓 **Academy** — leerpad in 4 niveaus, van Starter tot Microsoldeer
- 💬 **Community** — vastgelopen? Vraag het anderen

## Structuur

- `index.html` — homepage met Probleemwijzer, gidskaarten, tools en leerpad
- `guides/*.html` — statische detailpagina's per reparatiegids
- `assets/style.css` — gedeelde premium dark styling, responsive layouts en guide components
- `assets/script.js` — diagnose-interactie, filters, scroll reveal en lichte depth/parallax

## Stack

Pure HTML / CSS / JS — geen build step. Hosted op Cloudflare Pages.

## Lokaal draaien

```bash
python3 -m http.server 8765
```

Open http://localhost:8765

Omdat alles statisch is, kun je `index.html` ook rechtstreeks openen. Een lokale server is wel beter om relatieve links exact te testen.

## Design

Premium dark theme · Inter · Font Awesome 6.5 · warm tool-orange accents · CSS-only hero visual · reduced-motion friendly.

## Licentie

MIT — repareer in plaats van vervangen.
