# Sachi's World — RPG Portfolio

A cosy RPG world-map portfolio for **Sachi Chirag Rokadia**, recreating the
"RPG World Portfolio" concept (inspired by an Instagram reel by uxui_howard.le).
All content comes from Sachi's resume — nothing invented.

## Open it
Just open `index.html` in a browser — it's a fully static site, no build step.
(Google Fonts loads if you're online; it falls back to system fonts offline.)

Or serve it locally:

```bash
cd sachi-rpg-world-portfolio
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy
Drop the whole folder onto any static host — Vercel, Netlify, GitHub Pages,
Cloudflare Pages. No settings needed; `index.html` is the entry point.
`resume.pdf` must stay next to `index.html` (all Resume buttons link to it).

## How it works
- **Drag / scroll / pinch** to pan and zoom the world map.
- **Click a building** to slide in its ticket-stub panel; **← Back** or `Esc` returns to the map.
- The big wooden **Portfolio** sign opens an Overview with quick-jump buttons that fly the camera to each zone.
- Top-right nav (Projects / Skills / Contact / Resume) works without exploring.
- Arrow keys pan. Zoom buttons (＋ / － / ⌂) are bottom-right.

## Zones
Fountain Plaza (About) · SignSpeak AI Pavilion · StudyGen AI Pagoda ·
JanMind Temple · SocioTrack Village · FinGame Stall · Skills Workshop ·
Achievements (Trophy Well) · Contact Tree · Portfolio sign (Overview)

## Files
`index.html` · `styles.css` · `app.js` · `resume.pdf`

## Artwork (v3 — rendered edition)
The nine landmarks and the walking mascot are AI-generated soft-3D-rendered illustrations (clay-render storybook style), background-removed and saved as alpha WebP in `assets/`. A chibi avatar stands at the Fountain Plaza and walks to whichever building you open (Back sends her home); clouds drift overhead with soft shadows, butterflies wander, and all motion honours `prefers-reduced-motion`.
