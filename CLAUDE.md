# Ensayador — notas para trabajar en este repo

- **No subir a `main` sin el OK del dueño.** `main` se publica sola en Netlify (lo que usa el elenco).
  Trabajar en una rama, contar qué cambió y esperar confirmación ("publicá") antes de pasarlo a `main`.
- Antes de cada subida: `python3 tools/build_sw.py` (si no, los teléfonos con la app instalada siguen con la versión vieja).
- La app es un solo archivo: `app/index.html`. El lector de guiones está en el bloque `const Core = (() => { ... })()`.
- Probar cambios del lector con obras reales (PDF) y comparar el texto resultante antes/después: que solo cambie lo buscado.
- El repo es público a propósito: en el plan gratis de Netlify, un repo privado bloquea los deploys de otros autores.
