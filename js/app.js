/* Aplicación: router y vistas. Cada asignatura se divide en secciones:
   Teoría · Ejercicios PAU por tipos · Exámenes completos · Practicar · Formulario. */
(function (P) {
  'use strict';
  const app = document.getElementById('app');
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = P.esc;
  const state = { session: null, timer: null, keyHandler: null };
  const PAGE = 15;

  const OTHER_SUBJECTS = ['Lengua Castellana y Literatura II', 'Historia de España', 'Inglés', 'Historia de la Filosofía', 'Física', 'Química', 'Biología', 'Geografía', 'Historia del Arte', 'Dibujo Técnico II', 'Latín II', 'Griego II'];
  const CONV = { ordinaria: 'Ordinaria', extraordinaria: 'Extraordinaria', modelo: 'Modelo' };

  // ---------- Preferencias (solo el tema) ----------
  const pref = {
    get(k) { try { return localStorage.getItem('pau-' + k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem('pau-' + k, v); } catch (e) { /* noop */ } },
  };

  // ---------- Utilidades de UI ----------
  function renderMath(el) {
    if (!window.renderMathInElement) return;
    try {
      window.renderMathInElement(el, {
        delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
        throwOnError: false, strict: false, ignoredClasses: ['no-math'],
      });
    } catch (e) { /* noop */ }
  }
  function setColor(color) {
    document.documentElement.style.setProperty('--c', color || '#1f4f8f');
  }
  function view(html, color) {
    app.innerHTML = `<div class="page">${html}</div>`;
    setColor(color);
    renderMath(app);
  }
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }
  const icon = {
    play: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/></svg>',
    file: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    grid: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    pen: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    sigma: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 7V4H6l6 8-6 8h12v-3"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    ext: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
  };
  const diffDots = (d) => (d ? `<span class="diff" title="Dificultad ${d}/3">${[1, 2, 3].map((i) => `<i class="${i <= d ? 'on' : ''}"></i>`).join('')}</span>` : '');
  const crumbs = (items) => `<nav class="crumbs" aria-label="Ruta">${items.map(([t, h], i) => (h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`) + (i < items.length - 1 ? '<span class="sep">/</span>' : '')).join('')}</nav>`;

  // ---------- Datos de exámenes oficiales ----------
  const pauItems = (sid) => (P.pau[sid] && P.pau[sid].items) || [];
  const pauTypes = (sid) => P.pauTypes[sid] || [];
  const typeById = (sid, id) => pauTypes(sid).find((t) => t.id === id);
  const examId = (it) => `${it.y}-${it.c.slice(0, 3)}-${it.v}`;
  const convLabel = (c) => CONV[c] || c;
  function examName(it, withVersion = true) {
    if (it.c === 'modelo') return 'Modelo de examen (curso 2026-27)';
    const nv = examsOf(it.s || it.sid).filter((e) => e.y === it.y && e.c === it.c).length;
    return `${convLabel(it.c)} ${it.y}${withVersion && nv > 1 ? ` · examen ${it.v}` : ''}`;
  }
  const examCache = {};
  function examsOf(sid) {
    if (examCache[sid]) return examCache[sid];
    const map = new Map();
    pauItems(sid).forEach((it) => {
      const id = examId(it);
      if (!map.has(id)) map.set(id, { id, y: it.y, c: it.c, v: it.v, u: it.u, items: [] });
      map.get(id).items.push(it);
    });
    const order = { modelo: 0, ordinaria: 1, extraordinaria: 2 };
    examCache[sid] = [...map.values()].sort((a, b) => (b.c === 'modelo') - (a.c === 'modelo') || b.y - a.y || order[a.c] - order[b.c] || a.v - b.v);
    examCache[sid].forEach((e) => e.items.sort((a, b) => a.o - b.o));
    return examCache[sid];
  }
  const urlOf = (sid, it) => (P.pau[sid].urls || [])[it.u];
  function itemTitle(sid, it) {
    const lab = /^[AB]\./.test(it.k) ? `Opción ${it.k[0]} · Ejercicio ${it.k.slice(2)}` : `Ejercicio ${it.k}`;
    return { exam: examName(Object.assign({ sid }, it)), lab };
  }

  // ---------- Tema ----------
  function applyTheme() {
    const t = pref.get('theme') || 'auto';
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }
  $('#theme-btn').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    const dark = cur === 'dark' || (!cur && matchMedia('(prefers-color-scheme: dark)').matches);
    pref.set('theme', dark ? 'light' : 'dark');
    applyTheme();
  });

  // ======================= INICIO =======================
  function viewHome() {
    const total = P.subjectOrder.reduce((a, sid) => a + pauItems(sid).length, 0);
    const nExams = P.subjectOrder.reduce((a, sid) => a + examsOf(sid).length, 0);
    const years = P.subjectOrder.flatMap((sid) => pauItems(sid).map((i) => i.y)).filter((y) => y < 2027);
    const y0 = Math.min(...years), y1 = Math.max(...years);
    const cols = P.subjectOrder.map((sid) => {
      const s = P.subjects[sid];
      const items = pauItems(sid);
      const top = pauTypes(sid).map((t) => ({ t, n: items.filter((i) => i.t.includes(t.id)).length })).sort((a, b) => b.n - a.n).slice(0, 5);
      const last = lastExam(sid);
      return `<article class="subj-col" style="--c:${s.color}">
        <header>
          <a class="subj-mark" href="#/s/${sid}" aria-hidden="true" tabindex="-1">${s.icon}</a>
          <div><h2><a href="#/s/${sid}">${esc(s.name)}</a></h2><p>${esc(s.desc)}</p></div>
        </header>
        <ul class="subj-menu">
          <li><a href="#/s/${sid}/pau"><span>Ejercicios PAU por tipo</span><b>${items.length}</b></a></li>
          <li><a href="#/s/${sid}/examenes"><span>Exámenes completos</span><b>${examsOf(sid).length}</b></a></li>
          <li><a href="#/s/${sid}/teoria"><span>Teoría</span><b>${P.allTopics(sid).length} temas</b></a></li>
          <li><a href="#/s/${sid}/practicar"><span>Practicar</span><b>con corrección</b></a></li>
          <li><a href="#/s/${sid}/formulario"><span>Formulario</span><b>imprimible</b></a></li>
        </ul>
        <h3 class="mini-h">Lo que más cae</h3>
        <ol class="subj-top">${top.map(({ t, n }) => `<li><a href="#/s/${sid}/pau/${t.id}"><span>${esc(t.name)}</span><b>${n}</b></a></li>`).join('')}</ol>
        ${last ? `<p class="subj-last"><span>Último examen</span><a href="#/s/${sid}/examen/${last.id}">${esc(examName(Object.assign({ sid }, last), false))}</a></p>` : ''}
      </article>`;
    }).join('');
    view(`
      <section class="intro">
        <div>
          <p class="eyebrow">PAU · Comunidad de Madrid</p>
          <h1>Los exámenes de la PAU, ordenados por tipo de ejercicio</h1>
          <p class="lead">Cada examen oficial desde ${y0}, separado ejercicio a ejercicio y con su solución oficial. Practica un tipo concreto de problema o haz un examen entero con el tiempo real.</p>
        </div>
        <dl class="facts">
          <div><dt>Ejercicios</dt><dd>${total.toLocaleString('es-ES')}</dd></div>
          <div><dt>Exámenes</dt><dd>${nExams}</dd></div>
          <div><dt>Años</dt><dd>${y0}–${String(y1).slice(2)}</dd></div>
        </dl>
      </section>
      <section class="subjects-index" aria-label="Asignaturas">${cols}</section>
      <section class="section">
        <div class="section-head"><h2>Cómo sacarle partido</h2></div>
        <ol class="howto">
          <li><h3>Empieza por lo que más cae</h3><p>En «Ejercicios PAU por tipo» tienes todos los problemas de un mismo tipo seguidos. Intenta cada uno en papel antes de abrir la solución.</p></li>
          <li><h3>Repasa la teoría que falle</h3><p>Cada tipo enlaza con su tema de teoría: fórmulas, métodos y ejemplos resueltos. El formulario se puede imprimir.</p></li>
          <li><h3>Haz exámenes completos</h3><p>Cuando domines los tipos, haz un examen entero en modo examen: ${P.subjects[P.subjectOrder[0]].exam.duration} minutos y soluciones ocultas hasta terminar.</p></li>
        </ol>
      </section>
      <p class="soon-line"><b>Próximamente:</b> ${OTHER_SUBJECTS.map(esc).join(', ')}.</p>`, '#1f4f8f');
  }
  function lastExam(sid) {
    return examsOf(sid).filter((e) => e.c !== 'modelo').sort((a, b) => b.y - a.y || (b.c === 'extraordinaria') - (a.c === 'extraordinaria') || a.v - b.v)[0];
  }

  // ======================= ASIGNATURA: cabecera y subnavegación =======================
  const SECTIONS = [
    ['', 'Inicio'], ['pau', 'Ejercicios PAU'], ['examenes', 'Exámenes'], ['teoria', 'Teoría'], ['practicar', 'Practicar'], ['formulario', 'Formulario'],
  ];
  function subjectShell(sid, active, body, extraCrumbs = []) {
    const s = P.subjects[sid];
    const sec = SECTIONS.find((x) => x[0] === active);
    const cr = [['Inicio', '#/'], [s.short, active || extraCrumbs.length ? `#/s/${sid}` : null]];
    if (active && sec) cr.push([sec[1], extraCrumbs.length ? `#/s/${sid}/${active}` : null]);
    view(`
      ${crumbs(cr.concat(extraCrumbs))}
      <header class="subj-head">
        <a class="subject-icon sm" href="#/s/${sid}">${s.icon}</a>
        <h1>${esc(s.name)}</h1>
      </header>
      <nav class="subnav" aria-label="Secciones de ${esc(s.short)}">${SECTIONS.map(([k, n]) => `<a href="#/s/${sid}${k ? '/' + k : ''}" class="${k === active ? 'active' : ''}">${n}</a>`).join('')}</nav>
      ${body}`, s.color);
  }

  function viewSubject(sid) {
    const s = P.subjects[sid];
    if (!s) return notFound();
    const items = pauItems(sid);
    const types = pauTypes(sid).map((t) => ({ t, n: items.filter((i) => i.t.includes(t.id)).length })).sort((a, b) => b.n - a.n).slice(0, 6);
    const last = lastExam(sid);
    const topics = P.allTopics(sid);
    const gens = new Set(topics.flatMap((t) => t.gens || [])).size;
    subjectShell(sid, '', `
      <div class="section-cards">
        <a class="section-card" href="#/s/${sid}/pau"><span class="ic">${icon.grid}</span><div><h3>Ejercicios PAU por tipos</h3><p>${items.length} ejercicios oficiales clasificados en ${pauTypes(sid).length} tipos, con solución oficial.</p></div></a>
        <a class="section-card" href="#/s/${sid}/examenes"><span class="ic">${icon.file}</span><div><h3>Exámenes completos</h3><p>${examsOf(sid).length} exámenes oficiales. Hazlos con cronómetro y corrígelos con la solución.</p></div></a>
        <a class="section-card" href="#/s/${sid}/teoria"><span class="ic">${icon.book}</span><div><h3>Teoría</h3><p>${topics.length} temas resumidos con fórmulas, ejemplos y trucos.</p></div></a>
        <a class="section-card" href="#/s/${sid}/practicar"><span class="ic">${icon.pen}</span><div><h3>Practicar</h3><p>${gens ? `${gens} tipos de ejercicio generados sin límite y ` : ''}preguntas tipo test con corrección automática.</p></div></a>
      </div>
      <div class="two-col">
        <section class="card">
          <h3>Lo que más cae en la PAU</h3>
          <div class="rank">${types.map(({ t, n }) => `<a href="#/s/${sid}/pau/${t.id}"><span>${esc(t.name)}</span><b>${n}</b><i style="width:${(n / types[0].n) * 100}%"></i></a>`).join('')}</div>
        </section>
        <section class="card">
          <h3>Último examen</h3>
          ${last ? `<p class="muted">${esc(examName(Object.assign({ sid }, last)))} · ${last.items.length} ejercicios</p>
          <div class="btn-row"><a class="btn primary" href="#/s/${sid}/examen/${last.id}">Ver examen</a><a class="btn" href="#/s/${sid}/examen/${last.id}?modo=examen">${icon.clock} Hacerlo con cronómetro</a></div>` : ''}
          <h3 style="margin-top:22px">Formato del examen</h3>
          <p class="muted small" style="margin:0">${esc(s.exam.info)}</p>
        </section>
      </div>`);
  }

  // ======================= EJERCICIOS PAU POR TIPOS =======================
  function viewPauTypes(sid) {
    const items = pauItems(sid);
    const groups = {};
    pauTypes(sid).forEach((t) => { (groups[t.group] = groups[t.group] || []).push(t); });
    const body = Object.entries(groups).map(([g, ts]) => `
      <div class="block-title"><h2>${esc(g)}</h2><span class="line"></span></div>
      <div class="grid">${ts.map((t) => {
        const its = items.filter((i) => i.t.includes(t.id));
        const ys = its.map((i) => i.y).filter((y) => y < 2027);
        return `<a class="topic-card" href="#/s/${sid}/pau/${t.id}">
          <h3>${esc(t.name)}</h3><p>${esc(t.desc)}</p>
          <div class="meta"><span class="chip c">${its.length} ejercicios</span>${ys.length ? `<span class="chip">${Math.min(...ys)}–${Math.max(...ys)}</span>` : ''}</div>
        </a>`;
      }).join('')}</div>`).join('');
    subjectShell(sid, 'pau', `
      <p class="lead small-lead">Todos los ejercicios de los exámenes oficiales de la PAU de Madrid agrupados por tipo. Elige un tipo para practicarlo de seguido: cada ejercicio trae su solución oficial.</p>
      ${body}`);
  }

  function viewPauType(sid, tid, query) {
    const t = typeById(sid, tid);
    if (!t) return notFound();
    const all = pauItems(sid).filter((i) => i.t.includes(tid));
    const years = [...new Set(all.map((i) => i.y))].sort((a, b) => b - a);
    const f = { conv: query.get('conv') || '', year: query.get('year') || '', sort: query.get('orden') || 'recientes' };
    const s = P.subjects[sid];
    const topicLinks = (t.topics || []).filter((x) => s.topics[x]).map((x) => `<a class="chip c" href="#/s/${sid}/teoria/${x}">${esc(s.topics[x].name)}</a>`).join('');
    const gens = [...new Set((t.topics || []).flatMap((x) => (s.topics[x] && s.topics[x].gens) || []))];
    subjectShell(sid, 'pau', `
      <div class="type-head">
        <div><h2>${esc(t.name)}</h2><p class="muted">${esc(t.desc)}</p></div>
        <div class="type-aside">${topicLinks ? `<span class="muted small">Teoría:</span> ${topicLinks}` : ''}${gens.length ? ` <button class="chip c btnchip" data-act="gen">${icon.pen} Practicar con ejercicios generados</button>` : ''}</div>
      </div>
      <div class="filters">
        <label>Convocatoria<select data-f="conv"><option value="">Todas</option><option value="ordinaria">Ordinaria</option><option value="extraordinaria">Extraordinaria</option><option value="modelo">Modelo</option></select></label>
        <label>Año<select data-f="year"><option value="">Todos</option>${years.map((y) => `<option value="${y}">${y === 2027 ? 'Modelo 2026-27' : y}</option>`).join('')}</select></label>
        <label>Orden<select data-f="sort"><option value="recientes">Más recientes primero</option><option value="antiguos">Más antiguos primero</option></select></label>
        <label class="check"><input type="checkbox" data-f="open"> Mostrar todas las soluciones</label>
      </div>
      <p class="muted small" id="count"></p>
      <div id="list"></div>
      <div class="btn-row center" id="more-wrap"><button class="btn" id="more">Cargar más</button></div>`, [[t.name]]);
    $('[data-f=conv]').value = f.conv; $('[data-f=year]').value = f.year; $('[data-f=sort]').value = f.sort;
    let shown = 0, list = [];
    const open = () => $('[data-f=open]').checked;
    function apply() {
      list = all.filter((i) => (!f.conv || i.c === f.conv) && (!f.year || String(i.y) === f.year));
      list.sort((a, b) => (f.sort === 'antiguos' ? a.y - b.y : b.y - a.y) || (a.c > b.c ? 1 : -1) || a.v - b.v || a.o - b.o);
      $('#count').textContent = `${list.length} ejercicio${list.length === 1 ? '' : 's'}`;
      $('#list').innerHTML = ''; shown = 0; more();
    }
    function more() {
      const chunk = list.slice(shown, shown + PAGE);
      $('#list').insertAdjacentHTML('beforeend', chunk.map((it, k) => pauCard(sid, it, { n: shown + k + 1, open: open(), tid })).join(''));
      shown += chunk.length;
      $('#more-wrap').hidden = shown >= list.length;
      bindCards($('#list'));
    }
    $$('.filters select').forEach((sel) => sel.addEventListener('change', () => {
      f[sel.dataset.f] = sel.value;
      const q = new URLSearchParams(); if (f.conv) q.set('conv', f.conv); if (f.year) q.set('year', f.year); if (f.sort !== 'recientes') q.set('orden', f.sort);
      history.replaceState(null, '', `#/s/${sid}/pau/${tid}${q.toString() ? '?' + q : ''}`);
      apply();
    }));
    $('[data-f=open]').addEventListener('change', () => { $$('#list details.offsol').forEach((d) => { d.open = open(); }); });
    $('#more').addEventListener('click', more);
    const gb = $('[data-act=gen]');
    if (gb) gb.addEventListener('click', () => {
      const tp = (t.topics || []).find((x) => s.topics[x] && (s.topics[x].gens || []).length);
      startSession(buildTopic(sid, tp, 10), { title: t.name, subject: sid, topic: tp, back: location.hash });
    });
    apply();
  }

  function pauCard(sid, it, opts = {}) {
    const ti = itemTitle(sid, it);
    const tags = it.t.filter((x) => x !== opts.tid).map((x) => typeById(sid, x)).filter(Boolean);
    const url = urlOf(sid, it);
    const solName = it.sk === 'criterios' ? 'Ver criterios de corrección' : 'Ver solución oficial';
    return `<article class="problem pau-card">
      <div class="problem-head">
        <div><b>${opts.n ? `<span class="num">${opts.n}</span>` : ''}${esc(ti.exam)}</b> <span class="muted">· ${esc(ti.lab)}</span></div>
        <div class="head-tags">${opts.examLink !== false ? `<a class="chip" href="#/s/${sid}/examen/${examId(it)}">Examen completo</a>` : ''}${tags.map((x) => `<a class="chip c" href="#/s/${sid}/pau/${x.id}">${esc(x.name)}</a>`).join('')}</div>
      </div>
      <div class="problem-body"><img class="pau-img" src="${it.img}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async" alt="Enunciado: ${esc(it.x || '')}"></div>
      ${it.sol ? `<details class="sol offsol"${opts.open ? ' open' : ''}><summary>${solName}</summary><div class="sol-body"><img class="pau-img" data-src="${it.sol}" alt="Solución oficial"></div></details>` : ''}
      <div class="card-foot">${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${icon.ext} PDF oficial del examen</a>` : ''}</div>
    </article>`;
  }
  function bindCards(root) {
    $$('details.offsol', root).forEach((d) => {
      if (d.dataset.bound) return; d.dataset.bound = 1;
      const load = () => { const im = $('img[data-src]', d); if (im) { im.src = im.dataset.src; im.removeAttribute('data-src'); } };
      if (d.open) load();
      d.addEventListener('toggle', () => { if (d.open) load(); });
    });
  }

  // ======================= EXÁMENES COMPLETOS =======================
  function viewExams(sid) {
    const exams = examsOf(sid);
    const years = [...new Set(exams.map((e) => e.y))].sort((a, b) => b - a);
    const cell = (y, c) => {
      const es = exams.filter((e) => e.y === y && e.c === c);
      if (!es.length) return '<td class="muted">—</td>';
      return `<td>${es.map((e) => `<a class="btn sm" href="#/s/${sid}/examen/${e.id}">${es.length > 1 ? `Examen ${e.v}` : 'Ver examen'}</a>`).join(' ')}</td>`;
    };
    const modelo = exams.filter((e) => e.c === 'modelo');
    subjectShell(sid, 'examenes', `
      <p class="lead small-lead">Los exámenes oficiales completos, tal y como se pusieron. En cada convocatoria suele haber dos exámenes distintos. Puedes verlos con sus soluciones o hacerlos en modo examen, con cronómetro y las soluciones ocultas hasta que termines.</p>
      ${modelo.length ? `<div class="card modelo-card"><div><b>Modelo para el curso 2026-27</b><p class="muted small" style="margin:0">El examen de muestra publicado por las universidades para la próxima PAU.</p></div><div class="btn-row">${modelo.map((e) => `<a class="btn primary sm" href="#/s/${sid}/examen/${e.id}">Ver modelo</a><a class="btn sm" href="#/s/${sid}/examen/${e.id}?modo=examen">${icon.clock} Con cronómetro</a>`).join('')}</div></div>` : ''}
      <div class="table-wrap"><table class="data exams-table"><thead><tr><th>Año</th><th>Convocatoria ordinaria (junio)</th><th>Convocatoria extraordinaria (julio)</th></tr></thead>
      <tbody>${years.filter((y) => y < 2027).map((y) => `<tr><td><b>${y}</b></td>${cell(y, 'ordinaria')}${cell(y, 'extraordinaria')}</tr>`).join('')}</tbody></table></div>`);
  }

  function viewExam(sid, eid, query) {
    const ex = examsOf(sid).find((e) => e.id === eid);
    if (!ex) return notFound();
    const s = P.subjects[sid];
    const mode = query.get('modo') === 'examen' ? 'examen' : 'ver';
    const name = examName(Object.assign({ sid }, ex));
    const url = urlOf(sid, ex);
    const cards = ex.items.map((it) => {
      const tags = it.t.map((x) => typeById(sid, x)).filter(Boolean);
      const ti = itemTitle(sid, it);
      return `<article class="problem pau-card">
        <div class="problem-head"><b>${esc(ti.lab)}</b><div class="head-tags">${tags.map((x) => `<a class="chip c" href="#/s/${sid}/pau/${x.id}">${esc(x.name)}</a>`).join('')}</div></div>
        <div class="problem-body"><img class="pau-img" src="${it.img}" width="${it.w}" height="${it.h}" loading="lazy" decoding="async" alt="Enunciado: ${esc(it.x || '')}"></div>
        ${it.sol ? `<details class="sol offsol"${mode === 'ver' ? '' : ' hidden'}><summary>${it.sk === 'criterios' ? 'Ver criterios de corrección' : 'Ver solución oficial'}</summary><div class="sol-body"><img class="pau-img" data-src="${it.sol}" alt="Solución oficial"></div></details>` : ''}
      </article>`;
    }).join('');
    subjectShell(sid, 'examenes', `
      <div class="type-head">
        <div><h2>${esc(name)}</h2><p class="muted">${ex.items.length} ejercicios${ex.items.some((i) => /^[AB]\./.test(i.k)) ? ' · se elige la opción A o la B' : ''}${url ? ` · <a href="${esc(url)}" target="_blank" rel="noopener">PDF oficial ${icon.ext}</a>` : ''}</p></div>
        <div class="seg">
          <a href="#/s/${sid}/examen/${eid}" class="${mode === 'ver' ? 'active' : ''}">Ver con soluciones</a>
          <a href="#/s/${sid}/examen/${eid}?modo=examen" class="${mode === 'examen' ? 'active' : ''}">${icon.clock} Modo examen</a>
        </div>
      </div>
      ${mode === 'examen' ? `<div class="exam-bar"><span class="chip c">${esc(s.short)}</span><span class="timer" id="timer">${s.exam.duration}:00</span><div class="bar"><span id="tbar" style="width:0"></span></div><button class="btn primary" data-act="start">Empezar</button><button class="btn" data-act="finish" hidden>Terminar y ver soluciones</button></div>
      <p class="info">Resuélvelo en papel como en la PAU (${s.exam.duration} minutos). Las soluciones se mostrarán al terminar o cuando se acabe el tiempo.</p>` : ''}
      <div class="exam-paper">${cards}</div>`, [[name]]);
    bindCards(app);
    if (mode === 'examen') {
      const total = s.exam.duration * 60;
      let start = null;
      const startBtn = $('[data-act=start]'), finBtn = $('[data-act=finish]');
      const finish = (auto) => {
        clearInterval(state.timer); state.timer = null;
        $$('details.offsol').forEach((d) => { d.hidden = false; });
        finBtn.hidden = true; startBtn.hidden = true;
        $('#timer').textContent = 'Fin';
        toast(auto ? 'Se acabó el tiempo. Ya puedes ver las soluciones.' : 'Ya puedes ver las soluciones de cada ejercicio.');
      };
      startBtn.addEventListener('click', () => {
        start = Date.now(); startBtn.hidden = true; finBtn.hidden = false;
        const tick = () => {
          const left = Math.max(0, total - Math.floor((Date.now() - start) / 1000));
          const el = $('#timer'); if (!el) return clearInterval(state.timer);
          el.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
          el.className = 'timer' + (left < 60 ? ' danger' : left < 600 ? ' warn' : '');
          $('#tbar').style.width = `${(1 - left / total) * 100}%`;
          if (left <= 0) finish(true);
        };
        state.timer = setInterval(tick, 1000); tick();
      });
      finBtn.addEventListener('click', () => { if (confirm('¿Terminar el examen y ver las soluciones?')) finish(false); });
    }
  }

  // ======================= TEORÍA =======================
  function viewTheoryIndex(sid) {
    const s = P.subjects[sid];
    const body = s.blocks.map((b) => `
      <div class="block-title"><h2>${esc(b.name)}</h2><span class="line"></span></div>
      <div class="grid">${b.topics.map((t) => `<a class="topic-card" href="#/s/${sid}/teoria/${t.id}"><h3>${esc(t.name)}</h3><p>${esc(t.summary || '')}</p></a>`).join('')}</div>`).join('');
    subjectShell(sid, 'teoria', body);
  }

  function viewTopic(sid, tid) {
    const s = P.subjects[sid]; const t = s && s.topics[tid];
    if (!t) return notFound();
    const types = pauTypes(sid).filter((x) => (x.topics || []).includes(tid));
    const examples = (t.problems || []);
    subjectShell(sid, 'teoria', `
      <div class="topic-layout">
        <article class="theory">
          <h2 style="margin-bottom:.2em">${esc(t.name)}</h2><p class="muted">${esc(t.summary || '')}</p>
          ${t.theory || ''}
          ${examples.length ? `<h3>Ejemplos resueltos</h3>${examples.map((p, i) => `<article class="problem"><div class="problem-head"><b>${p.kind === 'teoria' ? 'Pregunta' : 'Ejemplo'} ${i + 1}</b></div><div class="problem-body">${p.prompt}</div><details class="sol"><summary>Ver solución</summary><div class="sol-body">${p.solution}</div></details></article>`).join('')}` : ''}
        </article>
        <aside class="topic-aside">
          <div class="card">
            <h3>Siguiente paso</h3>
            ${types.map((x) => `<a class="aside-link" href="#/s/${sid}/pau/${x.id}">${icon.grid}<span>Ejercicios PAU: ${esc(x.name)}</span><b>${pauItems(sid).filter((i) => i.t.includes(x.id)).length}</b></a>`).join('')}
            <a class="aside-link" href="#/s/${sid}/practicar?tema=${tid}">${icon.pen}<span>Practicar este tema</span></a>
          </div>
        </aside>
      </div>`, [[t.name]]);
  }

  // ======================= FORMULARIO =======================
  function viewFormulario(sid) {
    const topics = P.allTopics(sid);
    subjectShell(sid, 'formulario', `
      <div class="btn-row no-print" style="justify-content:space-between;align-items:center;margin-bottom:10px"><nav class="formulario-toc">${topics.map((t) => `<a class="chip c" href="#/s/${sid}/formulario" data-jump="f-${t.id}">${esc(t.name)}</a>`).join('')}</nav><button class="btn" onclick="window.print()">Imprimir / PDF</button></div>
      ${topics.map((t) => `<section class="formulario-topic theory" id="f-${t.id}"><h2>${esc(t.name)}</h2>${t.theory || ''}</section>`).join('')}`);
    $$('[data-jump]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); document.getElementById(a.dataset.jump).scrollIntoView({ behavior: 'smooth' }); }));
  }

  // ======================= PRACTICAR =======================
  function viewPractice(sid, query) {
    const s = P.subjects[sid];
    const body = s.blocks.map((b) => `
      <div class="block-title"><h2>${esc(b.name)}</h2><span class="line"></span></div>
      <div class="practice-grid">${b.topics.map((t) => {
        const gens = (t.gens || []).map((g) => P.gens[g]).filter(Boolean);
        const nq = (t.questions || []).length;
        return `<section class="card practice-topic" id="${t.id}">
          <div class="pt-head"><h3>${esc(t.name)}</h3><a class="muted small" href="#/s/${sid}/teoria/${t.id}">Teoría →</a></div>
          <div class="btn-row">
            <button class="btn primary sm" data-topic="${t.id}">${icon.play} Sesión de 10</button>
            ${nq ? `<button class="btn sm" data-test="${t.id}">Test (${nq})</button>` : ''}
          </div>
          ${gens.length ? `<ul class="gen-mini">${gens.map((g) => `<li><button data-gen="${g.id}" data-t="${t.id}">${esc(g.name)}<span>∞</span></button></li>`).join('')}</ul>` : ''}
        </section>`;
      }).join('')}</div>`).join('');
    subjectShell(sid, 'practicar', `
      <div class="practice-hero">
        <button class="big-action primary" data-act="mix"><b>Práctica mixta</b><span>12 preguntas al azar de todos los temas</span></button>
        <div class="big-action static"><b>¿Cómo funciona?</b><span>Los ejercicios numéricos se generan al momento (nunca se repiten) y se corrigen solos: admite fracciones, decimales con coma, <code>e^2</code> o <code>sqrt(2)</code>. Si fallas, verás la solución paso a paso.</span></div>
      </div>
      ${body}`);
    const back = `#/s/${sid}/practicar`;
    $('[data-act=mix]').addEventListener('click', () => startSession(buildMixed(sid), { title: `Práctica mixta · ${s.short}`, subject: sid, back }));
    $$('[data-topic]').forEach((b) => b.addEventListener('click', () => startSession(buildTopic(sid, b.dataset.topic, 10), { title: s.topics[b.dataset.topic].name, subject: sid, topic: b.dataset.topic, back })));
    $$('[data-test]').forEach((b) => b.addEventListener('click', () => {
      const t = s.topics[b.dataset.test];
      startSession(P.rng(P.newSeed()).shuffle(t.questions).slice(0, 10), { title: `${t.name} · test`, subject: sid, topic: t.id, test: true, back });
    }));
    $$('[data-gen]').forEach((b) => b.addEventListener('click', () => {
      const g = P.gens[b.dataset.gen];
      startSession(Array.from({ length: 10 }, () => P.makeGen(g.id, null, { subject: sid, topic: b.dataset.t })), { title: g.name, gen: g.id, subject: sid, topic: b.dataset.t, back });
    }));
    const tema = query && query.get('tema');
    if (tema && document.getElementById(tema)) { const el = document.getElementById(tema); el.classList.add('flash'); setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50); }
  }

  // ---------- Construcción de sesiones ----------
  function topicPool(sid, tid) {
    const t = P.subjects[sid].topics[tid];
    return { qs: (t.questions || []).slice(), gens: (t.gens || []).filter((g) => P.gens[g]), open: (t.problems || []).filter((p) => p.kind === 'teoria') };
  }
  function buildTopic(sid, tid, n) {
    const r = P.rng(P.newSeed());
    const { qs, gens, open } = topicPool(sid, tid);
    const items = [];
    const nMc = gens.length ? Math.min(qs.length, Math.round(n * 0.4)) : Math.min(qs.length, n - Math.min(open.length, 3));
    r.shuffle(qs).slice(0, nMc).forEach((q) => items.push(q));
    if (gens.length) {
      let order = r.shuffle(gens);
      while (items.length < n) { if (!order.length) order = r.shuffle(gens); items.push(P.makeGen(order.pop(), null, { subject: sid, topic: tid })); }
    } else r.shuffle(open).slice(0, n - items.length).forEach((q) => items.push(q));
    return r.shuffle(items);
  }
  function buildMixed(sid, n = 12) {
    const r = P.rng(P.newSeed());
    const topics = r.shuffle(P.allTopics(sid));
    const items = [], used = new Set();
    for (let i = 0; items.length < n && i < n * 6; i++) {
      const t = topics[i % topics.length];
      const { qs, gens } = topicPool(sid, t.id);
      if (gens.length && (r() < 0.6 || !qs.length)) items.push(P.makeGen(r.pick(gens), null, { subject: sid, topic: t.id }));
      else if (qs.length) { const q = r.pick(qs); if (!used.has(q.id)) { used.add(q.id); items.push(q); } }
    }
    return items;
  }
  function startSession(items, meta) {
    if (!items.length) { toast('No hay preguntas disponibles'); return; }
    state.session = Object.assign({ items: items.map((q) => ({ q, score: null })), idx: 0 }, meta);
    if (location.hash === '#/practica') viewSession(); else location.hash = '#/practica';
  }

  // ======================= SESIÓN =======================
  function viewSession() {
    const ss = state.session;
    if (!ss) { location.hash = '#/'; return; }
    if (ss.idx >= ss.items.length) return viewSummary();
    const it = ss.items[ss.idx];
    const q = it.q;
    const s = P.subjects[q.subject] || P.subjects[ss.subject];
    const t = s && s.topics[q.topic || ss.topic];
    let answer = '';
    if (q.type === 'mc') {
      const order = it.order || (it.order = P.rng(P.newSeed()).shuffle(q.options.map((_, i) => i)));
      answer = `<div class="options" role="radiogroup">${order.map((oi, k) => `<button class="opt" data-opt="${oi}" role="radio" aria-checked="false"><span class="k">${'ABCD'[k] || k + 1}</span><span>${q.options[oi]}</span></button>`).join('')}</div>`;
    } else if (q.type === 'num') {
      answer = `<div class="fields" style="--cols:${Math.min(q.grid || 1, 4)}">${q.fields.map((f, i) => `<div class="field" data-field="${i}"><label for="f${i}">${f.label}</label><div class="inp"><input type="text" id="f${i}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Tu respuesta">${f.unit ? `<span class="unit">${f.unit}</span>` : ''}</div></div>`).join('')}</div>
        <p class="hint">Admite fracciones (<code>3/4</code>), decimales con coma o punto, potencias (<code>e^2</code>) y raíces (<code>sqrt(2)</code>).</p>`;
    }
    const isOpen = q.type === 'open' || !q.type;
    view(`<div class="session">
      <div class="session-top">
        <button class="close-btn" data-act="quit" aria-label="Salir">${icon.x}</button>
        <div class="progress"><div class="bar"><span style="width:${(ss.idx / ss.items.length) * 100}%"></span></div></div>
        <span class="count">${ss.idx + 1}/${ss.items.length}</span>
      </div>
      <article class="qcard" data-qid="${esc(q.id || '')}">
        <div class="qmeta">${t ? `<span class="chip c">${esc(t.name)}</span>` : ''}${q.genName ? (t && t.name === q.genName ? '' : `<span class="chip">${esc(q.genName)}</span>`) : q.type === 'mc' ? '<span class="chip">Test</span>' : '<span class="chip">Desarrollo</span>'}${diffDots(q.difficulty)}</div>
        <div class="qprompt">${q.prompt}</div>
        ${answer}
        <div id="fb"></div>
        <div class="qactions" id="qa">
          ${isOpen ? `<span></span><div class="right"><button class="btn primary" data-act="reveal">Ver solución</button></div>`
          : `<button class="btn ghost" data-act="giveup">No lo sé, ver solución</button><div class="right"><button class="btn primary" data-act="check">Comprobar</button></div>`}
        </div>
      </article>
      <p class="kbd-hint">${q.type === 'mc' ? '<kbd>1</kbd>–<kbd>4</kbd> elegir · ' : ''}<kbd>Enter</kbd> comprobar / siguiente</p>
    </div>`, s ? s.color : undefined);

    it.answered = false;
    let selected = null;
    $$('.opt').forEach((b) => b.addEventListener('click', () => {
      if (it.answered) return;
      $$('.opt').forEach((o) => { o.classList.remove('sel'); o.setAttribute('aria-checked', 'false'); });
      b.classList.add('sel'); b.setAttribute('aria-checked', 'true'); selected = +b.dataset.opt;
    }));
    const first = $('.fields input'); if (first) first.focus();
    $('[data-act=quit]').addEventListener('click', () => { const back = ss.back || '#/'; state.session = null; location.hash = back; });
    const qa = $('#qa');
    qa.addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]'); if (!act) return;
      const a = act.dataset.act;
      if (a === 'check') check(false);
      else if (a === 'giveup') check(true);
      else if (a === 'reveal') reveal();
      else if (a === 'next') next();
      else if (a.startsWith('self')) finish(+a.slice(4));
    });

    function check(giveup) {
      if (it.answered) return;
      let score = 0, extra = '';
      if (q.type === 'mc') {
        if (selected == null && !giveup) { toast('Elige una opción'); return; }
        score = !giveup && selected === q.answer ? 1 : 0;
        $$('.opt').forEach((o) => {
          const oi = +o.dataset.opt; o.classList.add('locked');
          if (oi === q.answer) o.classList.add('right'); else if (oi === selected) o.classList.add('wrong');
        });
      } else {
        const inputs = $$('.fields input');
        if (!giveup && inputs.every((i) => !i.value.trim())) { toast('Escribe tu respuesta'); inputs[0].focus(); return; }
        let ok = 0;
        q.fields.forEach((f, i) => {
          const box = $(`[data-field="${i}"]`);
          const r = giveup ? { ok: false } : P.checkField(f, inputs[i].value);
          if (r.ok) ok++;
          box.classList.add(r.ok ? 'ok' : 'bad');
          inputs[i].readOnly = true;
          if (!r.ok) box.insertAdjacentHTML('beforeend', `<div class="expected">Correcto: ${formatAnswer(f)}</div>`);
        });
        score = ok === q.fields.length ? 1 : ok > 0 && q.fields.length > 1 ? 0.5 : 0;
        if (score === 0.5) extra = ` (${ok} de ${q.fields.length} apartados)`;
      }
      const head = score === 1 ? 'Correcto' : score > 0 ? `Casi${extra}` : giveup ? 'Solución' : 'No es correcto';
      showFeedback(score === 1 ? 'ok' : score > 0 || giveup ? 'neutral' : 'bad', head, score < 1);
      finish(score, true);
    }
    function reveal() {
      showFeedback('neutral', 'Solución', true);
      qa.innerHTML = `<span class="muted small">¿Cómo te ha salido?</span><div class="right"><button class="btn sm" data-act="self0">Mal</button><button class="btn sm" data-act="self0.5">A medias</button><button class="btn sm primary" data-act="self1">Bien</button></div>`;
      it.revealed = true;
    }
    function showFeedback(kind, head, open) {
      const fb = $('#fb');
      fb.innerHTML = `<div class="feedback ${kind}"><div class="feedback-head">${head}</div>
        <details class="sol"${open ? ' open' : ''}><summary>Solución paso a paso</summary><div class="sol-body">${q.solution || ''}${P.chart(q)}</div></details></div>`;
      renderMath(fb);
    }
    function finish(score, fromCheck) {
      it.answered = true; it.score = score;
      const last = ss.idx === ss.items.length - 1;
      const more = ss.gen && last ? `<button class="btn" data-act="more">+10 más</button>` : '';
      qa.innerHTML = `<span></span><div class="right">${more}<button class="btn primary" data-act="next">${last ? 'Ver resultados' : 'Siguiente →'}</button></div>`;
      const mb = $('[data-act=more]', qa);
      if (mb) mb.addEventListener('click', (e) => { e.stopPropagation(); for (let i = 0; i < 10; i++) ss.items.push({ q: P.makeGen(ss.gen, null, { subject: ss.subject, topic: ss.topic }), score: null }); next(); });
      $('[data-act=next]', qa).focus({ preventScroll: true });
      if (!fromCheck) next();
    }
    function next() { ss.idx++; window.scrollTo({ top: 0 }); viewSession(); }

    state.keyHandler = (e) => {
      if (e.target.tagName === 'INPUT' && e.key !== 'Enter') return;
      if (e.key === 'Enter') {
        e.preventDefault();
        if (it.answered) next();
        else if (isOpen) { if (!it.revealed) reveal(); }
        else check(false);
      } else if (q.type === 'mc' && !it.answered && /^[1-9]$/.test(e.key)) {
        const b = $$('.opt')[+e.key - 1]; if (b) b.click();
      }
    };
  }

  function formatAnswer(f) {
    const v = +f.answer;
    if (!isFinite(v)) return v > 0 ? '+∞' : '−∞';
    for (let d = 1; d <= 60; d++) {
      const n = Math.round(v * d);
      if (Math.abs(n / d - v) < 1e-9) return d === 1 ? P.fmt(v, 4) : `${n}/${d} ≈ ${P.fmt(v, 4)}`;
    }
    return P.fmt(v, 4) + (f.unit ? ' ' + f.unit : '');
  }

  function viewSummary() {
    const ss = state.session;
    const total = ss.items.length;
    const score = ss.items.reduce((a, x) => a + (x.score || 0), 0);
    const p = total ? score / total : 0;
    const s = P.subjects[ss.subject];
    const msg = p >= 0.9 ? 'Excelente' : p >= 0.7 ? 'Muy bien' : p >= 0.5 ? 'Vas por buen camino' : 'Hay que darle otra vuelta';
    view(`<div class="session summary"><div class="qcard">
      <p class="eyebrow">${esc(ss.title)}</p>
      <h2>${msg}</h2>
      <div class="score-ring" style="--p:${Math.round(p * 100)}"><div><div><b>${P.fmt(score, 1)}/${total}</b><br><small>${Math.round(p * 100)} % de acierto</small></div></div></div>
      <div class="result-list">${ss.items.map((x, i) => {
        const cls = x.score === 1 ? 'ok' : x.score > 0 ? 'mid' : 'bad';
        const label = x.q.genName || (x.q.prompt || '').replace(/<[^>]+>/g, ' ').replace(/\$[^$]*\$/g, '…').replace(/\s+/g, ' ').trim().slice(0, 90);
        return `<div class="result-item"><span class="dot ${cls}">${x.score === 1 ? '✓' : x.score > 0 ? '½' : '✗'}</span><span class="t">${i + 1}. ${esc(label)}</span></div>`;
      }).join('')}</div>
      <div class="btn-row" style="justify-content:center">
        <a class="btn" href="${ss.back || '#/'}">Volver</a>
        <button class="btn primary" data-act="again">Otra ronda</button>
      </div></div></div>`, s ? s.color : undefined);
    $('[data-act=again]').addEventListener('click', () => {
      let items;
      if (ss.gen) items = Array.from({ length: 10 }, () => P.makeGen(ss.gen, null, { subject: ss.subject, topic: ss.topic }));
      else if (ss.test) items = P.rng(P.newSeed()).shuffle(P.subjects[ss.subject].topics[ss.topic].questions).slice(0, 10);
      else if (ss.topic) items = buildTopic(ss.subject, ss.topic, 10);
      else items = buildMixed(ss.subject);
      startSession(items, { title: ss.title, subject: ss.subject, topic: ss.topic, gen: ss.gen, test: ss.test, back: ss.back });
    });
    state.keyHandler = null;
  }

  function notFound() {
    view(`<div class="card empty"><div class="em">404</div><h2>Página no encontrada</h2><a class="btn primary" href="#/">Volver al inicio</a></div>`);
  }

  // ======================= ROUTER =======================
  function route() {
    clearInterval(state.timer); state.timer = null;
    state.keyHandler = null;
    $('#toast').classList.remove('show');
    const raw = location.hash.replace(/^#\/?/, '');
    const [path, qs] = raw.split('?');
    const query = new URLSearchParams(qs || '');
    const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
    const [a, sid, sec, d] = parts;
    $$('.nav a').forEach((el) => el.classList.toggle('active', (el.dataset.nav || '') === (a === 's' ? sid : a || 'home')));
    window.scrollTo({ top: 0 });
    if (a === 's' && !P.subjects[sid]) return notFound();
    if (!a) viewHome();
    else if (a === 'practica') viewSession();
    else if (a === 's' && !sec) viewSubject(sid);
    else if (a === 's' && sec === 'pau' && d) viewPauType(sid, d, query);
    else if (a === 's' && sec === 'pau') viewPauTypes(sid);
    else if (a === 's' && sec === 'examenes') viewExams(sid);
    else if (a === 's' && sec === 'examen' && d) viewExam(sid, d, query);
    else if (a === 's' && sec === 'teoria' && d) viewTopic(sid, d);
    else if (a === 's' && sec === 'teoria') viewTheoryIndex(sid);
    else if (a === 's' && sec === 'practicar') viewPractice(sid, query);
    else if (a === 's' && sec === 'formulario') viewFormulario(sid);
    else notFound();
    app.focus({ preventScroll: true });
  }

  document.addEventListener('keydown', (e) => { if (state.keyHandler && !e.ctrlKey && !e.metaKey && !e.altKey) state.keyHandler(e); });
  function safeRoute() {
    try { route(); } catch (e) {
      console.error(e);
      app.innerHTML = '<div class="page"><div class="card empty"><h2>Algo ha fallado al mostrar esta página</h2><p>Prueba a recargar la página o vuelve al inicio.</p><div class="btn-row" style="justify-content:center"><button class="btn primary" onclick="location.reload()">Recargar</button><a class="btn" href="#/">Ir al inicio</a></div></div></div>';
    }
  }
  window.addEventListener('hashchange', safeRoute);
  applyTheme();
  safeRoute();
  P.app = { route, startSession, buildTopic, buildMixed, examsOf };
})(window.PAU);
