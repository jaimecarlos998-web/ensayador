# Ensayador — notas para trabajar en este repo

- **No subir a `main` sin el OK del dueño.** `main` se publica sola en GitHub Pages (https://jaimecarlos998-web.github.io/ensayador/, lo que usa el elenco) con `.github/workflows/pages.yml`.
  Trabajar en una rama, contar qué cambió y esperar confirmación ("publicá") antes de pasarlo a `main`.
- Antes de cada subida: `python3 tools/build_sw.py` (si no, los teléfonos con la app instalada siguen con la versión vieja).
- La app es un solo archivo: `app/index.html`. El lector de guiones está en el bloque `const Core = (() => { ... })()`.
- Probar cambios del lector con obras reales (PDF) y comparar el texto resultante antes/después: que solo cambie lo buscado.
- El repo tiene que ser público: GitHub Pages gratis solo publica repos públicos.
- Netlify quedó solo para avisar la mudanza (`netlify.toml` saltea las compilaciones: cada publicación allá gasta 15 de 300 créditos por mes y al llegar a 0 pausa todos los sitios).
