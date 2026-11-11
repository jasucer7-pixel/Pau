"""Genera pau/<sid>.js y copia las imágenes al repositorio.
Uso: python3 build.py classified.json outdir repo"""
import json, os, re, shutil, sys

items = json.load(open(sys.argv[1], encoding='utf-8'))
outdir, repo = sys.argv[2], sys.argv[3]
dst = os.path.join(repo, 'pau', 'img')
if os.path.isdir(dst):
    shutil.rmtree(dst)
os.makedirs(dst)

def alt(t):
    t = re.sub(r'\s+', ' ', t)
    t = re.sub(r'^(Pregunta|PREGUNTA|P REGUNTA|Ejercicio|EJERCICIO|E JERCICIO)?\s*[AB]?[\s.,]*\d+(\.\d)?\s*\.?\s*', '', t)
    t = re.sub(r'^\(?\s*(Calificaci[óo]n m[áa]xima:)?\s*[\d,.]+\s*puntos?\s*\)?\.?\s*', '', t)
    return t[:160].strip()

by = {}
for it in items:
    by.setdefault(it['subject'], []).append(it)
for sid, its in by.items():
    urls, out = [], []
    for it in its:
        if not it.get('types'):
            print('SIN TIPO', it['id'], it['key'], file=sys.stderr)
            continue
        if it['url'] not in urls:
            urls.append(it['url'])
        rec = dict(y=it['year'], c=it['conv'], v=it['version'], k=it['key'], o=it['order'], t=it['types'],
                   img='pau/' + it['img'], w=it['size'][0], h=it['size'][1], u=urls.index(it['url']), x=alt(it['text']))
        shutil.copy(os.path.join(outdir, it['img']), os.path.join(dst, os.path.basename(it['img'])))
        if it.get('sol'):
            rec['sol'] = 'pau/' + it['sol']; rec['sk'] = it['solKind']
            shutil.copy(os.path.join(outdir, it['sol']), os.path.join(dst, os.path.basename(it['sol'])))
        out.append(rec)
    js = ('/* Generado automáticamente a partir de los exámenes oficiales (UCM). No editar a mano. */\n'
          f'PAU.addPau({json.dumps(sid)}, {json.dumps(dict(urls=urls, items=out), ensure_ascii=False, separators=(",", ":"))});\n')
    open(os.path.join(repo, 'pau', f'{sid}.js'), 'w', encoding='utf-8').write(js)
    print(sid, len(out), 'ejercicios')
