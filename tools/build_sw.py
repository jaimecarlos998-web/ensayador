"""Regenera app/sw.js con la lista de archivos y una versión nueva.
Correr antes de cada subida:  python3 tools/build_sw.py"""
import os, hashlib, json
here = os.path.dirname(os.path.abspath(__file__))
root = os.path.join(here, '..', 'app')
skip = {'sw.js'}
files = []
for d, _, fs in os.walk(root):
    for f in fs:
        p = os.path.relpath(os.path.join(d, f), root).replace(os.sep, '/')
        if p not in skip: files.append(p)
files.sort()
h = hashlib.sha1()
for p in files:
    h.update(p.encode()); h.update(open(os.path.join(root, p), 'rb').read())
ver = h.hexdigest()[:10]
tpl = open(os.path.join(here, 'sw.template.js'), encoding='utf-8').read()
out = tpl.replace('__VERSION__', ver).replace('__PRECACHE__', json.dumps(['./'] + files, indent=1))
open(os.path.join(root, 'sw.js'), 'w', encoding='utf-8').write(out)
print('app/sw.js', ver, len(files) + 1, 'archivos')
