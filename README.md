# EnsayApp

App web para ensayar obras de teatro (antes "Ensayador"): cargás el PDF del guion, elegís tu personaje y el teléfono lee a los demás y espera tu parte. Se instala como app (PWA), funciona sin internet y tiene modo claro ("Libreto") y oscuro ("Función de noche").

## Estructura

- `app/` — el sitio que se publica en GitHub Pages: https://jaimecarlos998-web.github.io/ensayapp/ (ver `.github/workflows/pages.yml`).
  - `index.html` — toda la app.
  - `sw.js` — service worker generado (no editar a mano).
  - `vendor/` — PDF.js 3.11.174. `fonts/` — tipografías locales. `icons/` — íconos de la app.
- `tools/build_sw.py` — regenera `app/sw.js` con la lista de archivos y una versión nueva.

## Actualizar

1. Editar lo que haga falta en `app/`.
2. Correr `python3 tools/build_sw.py` (sin esto, los teléfonos instalados siguen con la versión vieja).
3. Subir a `main`: GitHub Pages publica solo.
