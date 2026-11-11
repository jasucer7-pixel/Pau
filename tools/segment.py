"""Segmenta los PDF oficiales de la PAU (UCM) en ejercicios: enunciado + solución.

Uso: python3 segment.py <index.tsv> <pdfdir> <outdir> [ids...]
Genera <outdir>/img/*.webp y <outdir>/items.json
"""
import json, os, re, subprocess, sys, html, unicodedata
from PIL import Image

DPI = 170
SCALE = DPI / 72.0

def run(cmd):
    return subprocess.run(cmd, check=True, capture_output=True, text=True).stdout

def parse_bbox(pdf):
    out = run(['pdftotext', '-bbox-layout', pdf, '-'])
    pages = []
    for pm in re.finditer(r'<page width="([\d.]+)" height="([\d.]+)">(.*?)</page>', out, re.S):
        W, H, body = float(pm.group(1)), float(pm.group(2)), pm.group(3)
        lines = []
        for lm in re.finditer(r'<line xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)">(.*?)</line>', body, re.S):
            words = re.findall(r'<word[^>]*>(.*?)</word>', lm.group(5), re.S)
            t = unicodedata.normalize('NFC', html.unescape(' '.join(w.strip() for w in words))).strip()
            if not t:
                continue
            lines.append(dict(x0=float(lm.group(1)), y0=float(lm.group(2)), x1=float(lm.group(3)), y1=float(lm.group(4)), t=t))
        lines.sort(key=lambda l: (round(l['y0']), l['x0']))
        pages.append(dict(W=W, H=H, lines=lines))
    return pages

# --- patrones -------------------------------------------------------------
NUM = r'(\d{1,2})'
PATS = [
    ('ejAB', re.compile(r'^(?:Ejercicio|E\s?JERCICIO)\s*([AB])\s*[.,]?\s*' + NUM + r'\b')),
    ('ejN', re.compile(r'^(?:Ejercicio|E\s?JERCICIO)\s+' + NUM + r'\b')),
    ('AB', re.compile(r'^([AB])\s*(?:\.\s*' + NUM + r'\s*\.?|\s' + NUM + r'\s*\.)(?=\s|\(|$)')),
    ('preg', re.compile(r'^(?:Pregunta|P\s?REGUNTA)\s+' + NUM + r'(?:\s*\.\s*(\d))?(?!\d)')),
    ('nn', re.compile(r'^' + NUM + r'\s*\.\s*(\d)\s*\.?(?=\s|$)(?!\s*punt)')),
    ('n', re.compile(r'^' + NUM + r'\s*\.(?=\s|$)')),
    ('sub', re.compile(r'^' + NUM + r'(?:\s*\.\s*(\d))?\s*\.\s*[a-e]\s*\)')),
]
OPT = re.compile(r'^OPCI[ÓO]N\s+([AB])\s*:?\s*$')
CRIT = re.compile(r'CRITERIOS\s+ESPEC', re.I)
SOL = re.compile(r'SOLUCIONES')
BLOQUE = re.compile(r'^(Bloque|BLOQUE|Ejercicio|EJERCICIO)\s+\d+\s*\.?\s*\(|^(TABLA|Tabla)\b|DISTRIBUCI[ÓO]N NORMAL|^[ÁA]reas bajo|^ABSCISAS', re.I)

def match_label(t, allowed):
    if re.search(r'[AB]\.\d\s*,\s*[AB]\.\d', t):
        return None  # instrucciones: "A.1, B.1, A.2..."
    for name, rx in PATS:
        if name not in allowed:
            continue
        m = rx.match(t)
        if not m:
            continue
        if name in ('nn', 'n') and re.match(r'^\d+\s*[.,]\s*\d{3}', t):
            continue  # 1.250 € (miles)
        if name == 'nn' and re.search(r'^\S+\s*punt', t):
            continue
        g = [x for x in m.groups() if x]
        if name in ('ejAB', 'AB'):
            return name, f'{g[0]}.{g[1]}'
        return name, '.'.join(g)
    return None

def margin(page):
    xs = sorted(l['x0'] for l in page['lines'])
    return xs[len(xs) // 10] if xs else 0

def _norm(t):
    return re.sub(r'\d+', '#', t.strip().lower())

def mark_hf(pages):
    """Marca cabeceras/pies: textos repetidos en varias páginas cerca del borde, o números de página."""
    from collections import Counter
    cnt = Counter()
    for p in pages:
        for l in p['lines']:
            if l['y1'] < 60 or l['y0'] > p['H'] - 60:
                cnt[_norm(l['t'])] += 1
    for p in pages:
        for l in p['lines']:
            edge = l['y1'] < 60 or l['y0'] > p['H'] - 60
            num = re.fullmatch(r'(p[áa]gina\s*)?\d+(\s*(de|/)\s*\d+)?', l['t'].strip().lower())
            lab = re.match(r'^(Ejercicio|EJERCICIO|Pregunta|PREGUNTA|OPCI|[AB][ .]?\d|\d+\s*\.\s*\d?\.?\s*[A-Za-zÁÉÍÓÚ(]|\d+\.\s*$)', l['t'])
            title = re.fullmatch(r'(matem[áa]ticas( aplicadas a las ciencias sociales)?( ii)?|econom[íi]a de la empresa|empresa y dise[ñn]o de modelos de negocio)\s*', l['t'].strip().lower())
            l['hf'] = bool((edge and not lab and (num or (cnt[_norm(l['t'])] >= 2 and len(pages) > 1))) or (title and (l['y1'] < 120 or l['y0'] > p['H'] - 90)))

def is_footer(l, page):
    return l.get('hf') and l['y0'] > page['H'] / 2

def is_header(l, page):
    return l.get('hf') and l['y0'] <= page['H'] / 2

def flatten(pages):
    mark_hf(pages)
    seq = []
    for pi, p in enumerate(pages):
        m = margin(p)
        for l in p['lines']:
            if is_footer(l, p) or is_header(l, p):
                continue
            l = dict(l, p=pi, margin=m)
            seq.append(l)
    return seq

def find_sections(seq):
    """Devuelve lista de (tipo, inicio, fin) con tipo exam/crit/sol."""
    marks = []
    for i, l in enumerate(seq):
        if CRIT.search(l['t']) and len(l['t']) < 120:
            if not any(k == 'crit' for k, _ in marks):
                marks.append(('crit', i))
        elif SOL.search(l['t']) and len(l['t']) < 90 and l['t'].upper() == l['t'] or re.match(r'^\s*SOLUCIONES', l['t']):
            if not any(k == 'sol' for k, _ in marks):
                marks.append(('sol', i))
    secs, start, kind = [], 0, 'exam'
    for k, i in marks:
        secs.append((kind, start, i))
        kind, start = k, i + 1
    secs.append((kind, start, len(seq)))
    return secs

def labels_in(seq, a, b, allowed, tol=45):
    res, opt, lastLetter = [], None, None
    for i in range(a, b):
        l = seq[i]
        mo = OPT.match(l['t'])
        if mo:
            opt = mo.group(1).upper(); continue
        if l['x0'] > l['margin'] + tol:
            continue
        lab = match_label(l['t'], allowed)
        if not lab:
            continue
        prev = seq[i - 1]['t'] if i > a else ''
        if prev.rstrip().endswith(',') and re.search(r'[AB]\.\d', prev):
            continue  # final de una lista de instrucciones (A.1, B.1, A.2, / B.2.)
        name, key = lab
        if not re.match(r'^[AB]\.', key):
            if opt:
                key = f'{opt}.{key}'
            elif lastLetter and name in ('ejN',):
                key = f'{lastLetter}.{key}'
        if re.match(r'^[AB]\.', key):
            lastLetter = key[0]
        res.append((i, key, name))
    return res

def choose_style(seq, sec):
    """Prueba los conjuntos de patrones y devuelve el que da etiquetas plausibles en el examen."""
    _, a, b = sec
    best = None
    for allowed in (['ejAB', 'AB'], ['ejAB', 'ejN'], ['preg'], ['preg', 'nn'], ['ejN'], ['n'], ['nn'], ['preg', 'ejN']):
        labs = labels_in(seq, a, b, allowed)
        keys = [k for _, k, _ in labs]
        if len(keys) < 3:
            continue
        uniq = len(set(keys)) == len(keys)
        score = len(keys) + (10 if uniq else -10)
        if best is None or score > best[0]:
            best = (score, allowed, labs)
    return best

def segments(seq, labs, a, b, extra_bounds=(), occurrence=0):
    """Para cada etiqueta devuelve la lista de índices de líneas que le pertenecen.
    Etiquetas consecutivas con la misma clave (apartados a, b, c...) se agrupan.
    occurrence=1: la segunda aparición de cada clave."""
    groups = []
    for i, key, _ in labs:
        if groups and groups[-1][1] == key:
            continue
        # incluir fragmentos de fórmula (filas de matrices, fracciones) situados justo encima de la etiqueta
        lab = seq[i]
        j = i
        while j - 1 >= a and seq[j - 1]['p'] == lab['p'] and seq[j - 1]['x0'] > lab['margin'] + 40 \
                and lab['y0'] - seq[j - 1]['y0'] < 30 and seq[j]['y0'] - seq[j - 1]['y1'] < 6 \
                and len(seq[j - 1]['t']) <= 30 and not re.match(r'^[a-e]\)', seq[j - 1]['t']) \
                and not (j - 2 >= a and seq[j - 2]['p'] == lab['p'] and seq[j - 2]['y1'] > seq[j - 1]['y0'] + 1 and len(seq[j - 2]['t']) > 30):
            j -= 1
        groups.append((j, key))
    bounds = sorted(set([i for i, _ in groups] + [i for i in extra_bounds if a <= i < b] + [b]))
    out, seen = {}, {}
    for i, key in groups:
        nxt = min(x for x in bounds if x > i)
        seen[key] = seen.get(key, -1) + 1
        if seen[key] == occurrence and key not in out:
            out[key] = list(range(i, nxt))
    return out

def render_pages(pdf, tmp):
    os.makedirs(tmp, exist_ok=True)
    run(['pdftoppm', '-r', str(DPI), '-gray', '-png', pdf, os.path.join(tmp, 'p')])
    files = sorted(f for f in os.listdir(tmp) if f.startswith('p') and f.endswith('.png'))
    return [Image.open(os.path.join(tmp, f)) for f in files]

def crop(lines_idx, seq, pages, imgs, next_line=None):
    """Recorta las líneas indicadas (pueden ocupar varias páginas) y las apila."""
    by_page = {}
    for i in lines_idx:
        by_page.setdefault(seq[i]['p'], []).append(seq[i])
    parts = []
    pis = sorted(by_page)
    for k, pi in enumerate(pis):
        ls = by_page[pi]
        page = pages[pi]
        content = [l for l in page['lines'] if not is_footer(l, page)]
        x0 = min(l['x0'] for l in content) - 6
        x1 = max(l['x1'] for l in content) + 6
        top = ls[0]['y0'] - 5
        # final: hasta la siguiente línea límite si está en la misma página, si no, última línea de contenido
        if k == len(pis) - 1 and next_line is not None and next_line['p'] == pi:
            bottom = next_line['y0'] - 4
        else:
            bottom = max(l['y1'] for l in ls) + 6
            if k < len(pis) - 1:
                # incluir posibles gráficos tras la última línea de texto hasta el pie
                body = [l for l in content if not is_header(l, page)]
                bottom = max(bottom, max(l['y1'] for l in body) + 6)
        im = imgs[pi]
        box = [int(max(0, x0 * SCALE)), int(max(0, top * SCALE)), int(min(im.width, x1 * SCALE)), int(min(im.height, bottom * SCALE))]
        if box[3] - box[1] > 8:
            parts.append(im.crop(box))
    if not parts:
        return None
    w = max(p.width for p in parts)
    h = sum(p.height for p in parts) + 10 * (len(parts) - 1)
    out = Image.new('L', (w, h), 255)
    y = 0
    for p in parts:
        out.paste(p, (0, y)); y += p.height + 10
    return out

def save(img, path):
    # 4 niveles de gris: nítido y ligero
    img = img.point(lambda v: 255 if v > 232 else (v // 64) * 85).quantize(4)
    img.save(path, 'PNG', optimize=True)

def process(pdf, meta, outdir, tmpdir):
    pages = parse_bbox(pdf)
    seq = flatten(pages)
    secs = find_sections(seq)
    exam = next(s for s in secs if s[0] == 'exam')
    st = choose_style(seq, exam)
    if not st:
        return [], f'sin estilo'
    _, allowed, labs = st
    bloques = [i for i in range(exam[1], exam[2]) if BLOQUE.match(seq[i]['t']) and not match_label(seq[i]['t'], allowed)]
    keys_all = [k for _, k, _ in labs]
    # "PREGUNTA 2" con opciones 2.1 / 2.2: el encabezado es solo un límite, no un ejercicio
    parents = [i for i, k, _ in labs if any(x.startswith(k + '.') for x in keys_all) and '.' not in k]
    labs = [x for x in labs if x[0] not in parents]
    ex_seg = segments(seq, labs, exam[1], exam[2], bloques + parents)
    sol_secs = [s for s in secs if s[0] == 'sol']
    crit_secs = [s for s in secs if s[0] == 'crit']
    sol_allowed = list(dict.fromkeys(allowed + ['ejAB', 'ejN', 'AB', 'preg', 'nn', 'n', 'sub']))
    def seg_for(secs_):
        res = {}
        for s in secs_:
            # en soluciones se aceptan más estilos, pero solo si producen claves del examen
            for al in (allowed, sol_allowed):
                raw = labels_in(seq, s[1], s[2], al)
                labs2 = [x for x in raw if x[1] in ex_seg]
                if len(labs2) >= max(1, len(ex_seg) // 2):
                    break
            others = [x[0] for x in raw if x[1] not in ex_seg] + \
                [i for i in range(s[1], s[2]) if re.match(r'^Opci[óo]n\s+\d', seq[i]['t']) or BLOQUE.match(seq[i]['t'])]
            for k, v in segments(seq, labs2, s[1], s[2], others).items():
                res.setdefault(k, v)
        return res
    sol_seg = seg_for(sol_secs)
    crit_seg = seg_for(crit_secs)
    if len(sol_seg) < len(ex_seg):
        # Si las etiquetas se repiten en la sección de criterios, la 2.ª aparición es la solución
        for s_ in crit_secs:
            labs2 = [x for x in labels_in(seq, s_[1], s_[2], sol_allowed) if x[1] in ex_seg]
            for k, v in segments(seq, labs2, s_[1], s_[2], occurrence=1).items():
                sol_seg.setdefault(k, v)
    if os.environ.get('NORENDER'):
        keys = list(ex_seg)
        return [], f"{len(keys)} ítems ({','.join(keys)}) sol={len([k for k in keys if k in sol_seg])} crit={len([k for k in keys if k in crit_seg])} estilo={allowed}"
    imgs = render_pages(pdf, tmpdir)
    items = []
    keys = list(ex_seg)
    for n, key in enumerate(keys):
        idx = ex_seg[key]
        nxt = seq[idx[-1] + 1] if idx[-1] + 1 < len(seq) else None
        base = f"{meta['id']}-{key.replace('.', '_')}"
        img = crop(idx, seq, pages, imgs, nxt)
        if img is None:
            continue
        stmt = f'img/{base}.png'; save(img, os.path.join(outdir, stmt))
        text = ' '.join(seq[i]['t'] for i in idx)
        sol_img, sol_kind = None, None
        for kind, sg in (('soluciones', sol_seg), ('criterios', crit_seg)):
            if key in sg:
                sidx = sg[key]
                # Economía: saltar el enunciado repetido hasta "SOLUCIÓN:"
                for j, ii in enumerate(sidx):
                    if re.match(r'^SOLUCI[ÓO]N\s*:?', seq[ii]['t']) and j > 0:
                        sidx = sidx[j:]; break
                nx = seq[sg[key][-1] + 1] if sg[key][-1] + 1 < len(seq) else None
                simg = crop(sidx, seq, pages, imgs, nx)
                if simg is not None:
                    sol_img = f'img/{base}-s.png'; save(simg, os.path.join(outdir, sol_img)); sol_kind = kind
                break
        items.append(dict(meta, key=key, order=n, text=text, img=stmt, sol=sol_img, solKind=sol_kind,
                          size=[img.width, img.height]))
    for f in os.listdir(tmpdir):
        os.remove(os.path.join(tmpdir, f))
    return items, f"{len(items)} ítems ({','.join(keys)}) sol={len(sol_seg)} crit={len(crit_seg)} estilo={allowed}"

SUBJ = {'MATEMÁTICAS II': 'mat2'}
def subj_id(s):
    s = s.upper()
    if 'CIENCIAS SOCIALES' in s or 'ACS' in s or 'PLICADAS' in s:
        return 'matccss'
    if 'MATEM' in s:
        return 'mat2'
    return 'eco'

def session(s):
    s = s.replace('&nbsp;', ' ')
    if s.startswith('MODELOS'):
        return 'modelo', 2027
    conv = 'extraordinaria' if 'xtraordinaria' in s else 'ordinaria'
    y = int(re.search(r'(20\d\d)', s).group(1))
    return conv, y

def main():
    index, pdfdir, outdir = sys.argv[1:4]
    only = set(sys.argv[4:])
    os.makedirs(os.path.join(outdir, 'img'), exist_ok=True)
    rows = [l.rstrip('\n').split('\t') for l in open(index, encoding='utf-8')]
    count = {}
    allitems = []
    for f, _, ses, subj, url in rows:
        fid = os.path.basename(f)[:3]
        if only and fid not in only:
            continue
        sid = subj_id(subj)
        conv, year = session(ses)
        k = (sid, conv, year); count[k] = count.get(k, 0) + 1
        meta = dict(id=f'{sid}-{year}-{conv[:3]}-{count[k]}', file=fid, subject=sid, conv=conv, year=year, version=count[k], url=url)
        try:
            items, info = process(os.path.join(pdfdir, os.path.basename(f)), meta, outdir, os.path.join(outdir, '_tmp'))
        except Exception as e:  # noqa
            items, info = [], f'ERROR {e}'
        print(f'{fid} {sid:8} {conv[:5]} {year} v{count[k]}: {info}', flush=True)
        allitems += items
    json.dump(allitems, open(os.path.join(outdir, 'items.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=0)

if __name__ == '__main__':
    main()
