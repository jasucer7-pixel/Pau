/* Aplicación: router, vistas, sesiones de práctica, simulacros y progreso. */
(function (P) {
  'use strict';
  const S = P.store;
  const app = document.getElementById('app');
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = P.esc;
  const state = { session: null, exam: null, examTimer: null, skipHash: false };

  const OTHER_SUBJECTS = ['Lengua Castellana y Literatura II', 'Historia de España', 'Inglés', 'Historia de la Filosofía', 'Física', 'Química', 'Biología', 'Geografía', 'Historia del Arte', 'Dibujo Técnico II', 'Latín II', 'Griego II'];

  // ---------- utilidades de UI ----------
  function renderMath(el) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, {
          delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
          throwOnError: false, strict: false, ignoredClasses: ['no-math'],
        });
      } catch (e) { /* noop */ }
    }
  }
  function view(html, color) {
    app.innerHTML = `<div class="page">${html}</div>`;
    app.style.setProperty('--c', color || '#5b5bd6');
    document.documentElement.style.setProperty('--c', color || '#5b5bd6');
    renderMath(app);
  }
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2600);
  }
  const pctTxt = (x) => `${Math.round(x * 100)} %`;
  const icon = {
    play: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    clock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    redo: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    book: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5V21h16"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  };
  const diffDots = (d) => (d ? `<span class="diff" title="Dificultad ${d}/3">${[1, 2, 3].map((i) => `<i class="${i <= d ? 'on' : ''}"></i>`).join('')}</span>` : '');
  const crumbs = (items) => `<nav class="crumbs" aria-label="Ruta">${items.map(([t, h], i) => (h ? `<a href="${h}">${esc(t)}</a>` : `<span>${esc(t)}</span>`) + (i < items.length - 1 ? '<span class="sep">/</span>' : '')).join('')}</nav>`;

  function subjectMastery(sid) {
    const ts = P.allTopics(sid);
    return ts.length ? ts.reduce((s, t) => s + S.mastery(sid, t.id), 0) / ts.length : 0;
  }
  function updateNavBadge() {
    const n = S.dueReviews().length;
    const b = $('#nav-review');
    b.hidden = !n; b.textContent = n > 99 ? '99+' : n;
  }

  // ---------- Tema ----------
  function applyTheme() {
    const t = S.setting('theme') || 'auto';
    if (t === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
  }
  $('#theme-btn').addEventListener('click', () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark' ||
      (!document.documentElement.getAttribute('data-theme') && matchMedia('(prefers-color-scheme: dark)').matches);
    S.setting('theme', dark ? 'light' : 'dark');
    applyTheme();
  });

  // ======================= INICIO =======================
  function viewHome() {
    const tot = S.totals();
    const streak = S.streak();
    const due = S.dueReviews().length;
    const examDate = S.setting('examDate');
    let days = null;
    if (examDate) days = Math.ceil((new Date(examDate + 'T09:00:00') - new Date()) / 86400000);
    const cards = P.subjectOrder.map((sid) => {
      const s = P.subjects[sid];
      const st = S.subjectStats(sid);
      const m = subjectMastery(sid);
      const topics = P.allTopics(sid);
      const nq = topics.reduce((a, t) => a + (t.questions || []).length + (t.problems || []).length, 0);
      const ng = new Set(topics.flatMap((t) => t.gens || [])).size;
      return `<a class="subject-card" href="#/s/${sid}" style="--c:${s.color}">
        <div class="subject-icon">${s.icon}</div>
        <div><h3>${esc(s.name)}</h3><p>${esc(s.desc)}</p></div>
        <div><div class="bar-label"><span>Dominio</span><span>${pctTxt(m)}</span></div><div class="bar"><span style="width:${m * 100}%"></span></div></div>
        <div class="meta"><span class="chip c">${topics.length} temas</span>${ng ? `<span class="chip">${ng} generadores ∞</span>` : ''}<span class="chip">${nq} preguntas</span>${st.seen ? `<span class="chip">${pctTxt(st.correct / st.seen)} aciertos</span>` : ''}</div>
      </a>`;
    }).join('');
    view(`
      <section class="hero">
        <div>
          <p class="eyebrow">PAU · Comunidad de Madrid</p>
          <h1>Practica la PAU <span class="hl">sin límites</span></h1>
          <p class="lead">Teoría al grano, ejercicios que se generan al momento con su solución paso a paso, preguntas tipo test y simulacros cronometrados. Todo gratis y sin registrarte.</p>
          <div class="hero-cta">
            <a class="btn primary lg" href="#/s/${P.subjectOrder[0]}">${icon.play} Empezar a practicar</a>
            <a class="btn lg" href="#/repaso">${icon.redo} Repasar fallos ${due ? `<span class="badge">${due}</span>` : ''}</a>
          </div>
        </div>
        <div class="card countdown">
          ${days != null && days >= 0 ? `<div class="big">${days}</div><div class="muted">${days === 1 ? 'día' : 'días'} para tu PAU</div>` : days != null ? `<div class="big">🎓</div><div class="muted">¡La PAU ya ha pasado!</div>` : `<div class="big">📅</div><div class="muted">¿Cuándo es tu examen?</div>`}
          <label for="exam-date">Fecha de tu PAU</label>
          <input type="date" id="exam-date" value="${esc(examDate || '')}">
        </div>
      </section>
      <section class="stats">
        <div class="stat"><div class="v">🔥 ${streak}</div><div class="l">${streak === 1 ? 'día' : 'días'} de racha</div></div>
        <div class="stat"><div class="v">${tot.today}</div><div class="l">preguntas hoy</div></div>
        <div class="stat"><div class="v">${tot.seen ? pctTxt(tot.correct / tot.seen) : '—'}</div><div class="l">aciertos (${tot.seen} respondidas)</div></div>
        <div class="stat"><div class="v">${due}</div><div class="l">repasos pendientes</div></div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Asignaturas</h2><span class="muted small">Elige una para ver sus temas</span></div>
        <div class="grid">${cards}</div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Cómo sacarle partido</h2></div>
        <div class="steps">
          <div class="step"><div class="n">1</div><h3>Repasa la teoría</h3><p>Cada tema tiene un resumen con las fórmulas y los trucos que más caen en la PAU.</p></div>
          <div class="step"><div class="n">2</div><h3>Practica sin parar</h3><p>Los ejercicios numéricos se generan al azar: nunca te quedarás sin problemas nuevos. Si fallas, verás la solución completa.</p></div>
          <div class="step"><div class="n">3</div><h3>Repasa y simula</h3><p>Lo que falles vuelve a salir en «Repaso» con repetición espaciada. Cuando te sientas listo, haz un simulacro cronometrado.</p></div>
        </div>
      </section>
      <section class="section">
        <div class="section-head"><h2>Próximamente</h2><span class="muted small">Iremos añadiendo el resto de asignaturas</span></div>
        <div class="soon">${OTHER_SUBJECTS.map((n) => `<span class="chip">${esc(n)}</span>`).join('')}</div>
      </section>`);
    $('#exam-date').addEventListener('change', (e) => { S.setting('examDate', e.target.value); viewHome(); });
  }

  // ======================= ASIGNATURA =======================
  function viewSubject(sid) {
    const s = P.subjects[sid];
    if (!s) return notFound();
    const m = subjectMastery(sid);
    const due = S.dueReviews(sid).length;
    const blocks = s.blocks.map((b) => `
      <div class="block-title"><h2>${esc(b.name)}</h2><span class="line"></span></div>
      <div class="grid">${b.topics.map((t) => {
        const tm = S.mastery(sid, t.id), ts = S.topicStats(sid, t.id);
        return `<a class="topic-card" href="#/s/${sid}/${t.id}">
          <h3>${esc(t.name)}</h3><p>${esc(t.summary || '')}</p>
          <div class="meta">${(t.gens || []).length ? `<span class="chip c">∞ ejercicios</span>` : ''}${(t.questions || []).length ? `<span class="chip">${t.questions.length} test</span>` : ''}${(t.problems || []).length ? `<span class="chip">${t.problems.length} tipo PAU</span>` : ''}</div>
          <div><div class="bar-label"><span>${ts.seen ? `${ts.seen} respondidas` : 'Sin empezar'}</span><span>${pctTxt(tm)}</span></div><div class="bar"><span style="width:${tm * 100}%"></span></div></div>
        </a>`;
      }).join('')}</div>`).join('');
    view(`
      ${crumbs([['Inicio', '#/'], [s.name]])}
      <section class="subject-hero">
        <div class="subject-icon">${s.icon}</div>
        <div class="txt"><h1>${esc(s.name)}</h1><p>${esc(s.desc)}</p></div>
        <div class="ring" style="--p:${Math.round(m * 100)}"><div><div><b>${Math.round(m * 100)}%</b><small>dominio</small></div></div></div>
      </section>
      <div class="actions-grid">
        <button class="action" data-act="mix"><span class="ic">${icon.play}</span><span><b>Práctica mixta</b><span>12 preguntas de todos los temas</span></span></button>
        <a class="action" href="#/simulacro/${sid}"><span class="ic">${icon.clock}</span><span><b>Simulacro</b><span>Examen cronometrado de ${s.exam.duration} min</span></span></a>
        <button class="action" data-act="review"><span class="ic">${icon.redo}</span><span><b>Repasar fallos</b><span>${due ? `${due} pendientes hoy` : 'Nada pendiente'}</span></span></button>
        <a class="action" href="#/s/${sid}/formulario"><span class="ic">${icon.book}</span><span><b>Formulario</b><span>Toda la teoría en una página</span></span></a>
      </div>
      ${blocks}`, s.color);
    $('[data-act=mix]').addEventListener('click', () => startSession(buildMixed(sid), { title: `Práctica mixta · ${s.short}`, subject: sid, back: `#/s/${sid}` }));
    $('[data-act=review]').addEventListener('click', () => startReview(sid));
  }

  // ======================= TEMA =======================
  function viewTopic(sid, tid, tab) {
    const s = P.subjects[sid]; const t = s && s.topics[tid];
    if (!t) return notFound();
    tab = tab || 'teoria';
    const tabs = [['teoria', 'Teoría'], ['practicar', 'Practicar'], ['pau', `Ejercicios tipo PAU${t.problems && t.problems.length ? ` (${t.problems.length})` : ''}`]];
    let body = '';
    if (tab === 'teoria') {
      body = `<article class="theory">${t.theory || '<p class="muted">Teoría en preparación.</p>'}</article>
      <div class="btn-row" style="margin-top:28px"><a class="btn primary" href="#/s/${sid}/${tid}/practicar">${icon.play} Practicar este tema</a></div>`;
    } else if (tab === 'practicar') {
      const gens = (t.gens || []).map((g) => P.gens[g]).filter(Boolean);
      const nq = (t.questions || []).length;
      body = `<div class="practice-hero">
          <button class="big-action primary" data-act="session"><b>Sesión de 10 preguntas</b><span>Mezcla de test y ejercicios numéricos de este tema</span></button>
          ${nq ? `<button class="big-action" data-act="mc"><b>Solo tipo test</b><span>${nq} preguntas de concepto con explicación</span></button>` : `<a class="big-action" href="#/s/${sid}/${tid}/pau"><b>Preguntas de desarrollo</b><span>Practica la teoría como en el examen</span></a>`}
        </div>
        ${gens.length ? `<div class="section-head"><h2>Practica un tipo concreto</h2><span class="muted small">Ejercicios ilimitados, nunca se repiten</span></div>
        <div class="gen-list">${gens.map((g) => `<div class="gen-item"><div><b>${esc(g.name)}</b><small>∞ ejercicios con solución</small></div><button class="btn sm" data-gen="${g.id}">${icon.play} Practicar</button></div>`).join('')}</div>` : ''}`;
    } else {
      body = (t.problems || []).length ? (t.problems || []).map((p, i) => problemHTML(p, i)).join('') : `<div class="empty"><div class="em">📝</div><p>Aún no hay ejercicios tipo PAU para este tema. Prueba la pestaña «Practicar».</p></div>`;
    }
    view(`
      ${crumbs([['Inicio', '#/'], [s.short, `#/s/${sid}`], [t.name]])}
      <div class="topic-head"><div><p class="eyebrow">${esc(s.blocks.find((b) => b.id === t.block).name)}</p><h1>${esc(t.name)}</h1><p class="muted" style="margin:0">${esc(t.summary || '')}</p></div></div>
      <nav class="tabs" role="tablist">${tabs.map(([k, n]) => `<a role="tab" href="#/s/${sid}/${tid}/${k}" class="${tab === k ? 'active' : ''}" aria-selected="${tab === k}">${n}</a>`).join('')}</nav>
      ${body}`, s.color);

    const ctx = { subject: sid, back: `#/s/${sid}/${tid}/practicar` };
    const ses = $('[data-act=session]');
    if (ses) ses.addEventListener('click', () => startSession(buildTopic(sid, tid, 10), Object.assign({ title: t.name }, ctx)));
    const mc = $('[data-act=mc]');
    if (mc) mc.addEventListener('click', () => startSession(P.rng(P.newSeed()).shuffle(t.questions).slice(0, 10).map((q) => q), Object.assign({ title: `${t.name} · test` }, ctx)));
    $$('[data-gen]').forEach((b) => b.addEventListener('click', () => {
      const g = P.gens[b.dataset.gen];
      startSession(Array.from({ length: 10 }, () => P.makeGen(g.id, null, { subject: sid, topic: tid })), Object.assign({ title: g.name, gen: g.id, topic: tid }, ctx));
    }));
    if (tab === 'pau') bindProblems(app);
  }

  function problemHTML(p, i, opts = {}) {
    const title = p.kind === 'teoria' ? `Pregunta de teoría ${i + 1}` : `Ejercicio ${i + 1}`;
    return `<article class="problem" data-qid="${esc(p.id)}">
      <div class="problem-head"><b>${title}</b>${p.points ? `<span class="chip c">${String(p.points).replace('.', ',')} ${p.points === 1 ? 'punto' : 'puntos'}</span>` : ''}</div>
      <div class="problem-body">${p.prompt}</div>
      <details class="sol"${opts.open ? ' open' : ''}><summary>Ver solución</summary><div class="sol-body">${p.solution}
        <div class="selfgrade"><span>¿Cómo te ha salido?</span><button class="btn sm" data-grade="1">✅ Bien</button><button class="btn sm" data-grade="0.5">🟡 A medias</button><button class="btn sm" data-grade="0">❌ Mal</button></div>
      </div></details>
    </article>`;
  }
  function bindProblems(root) {
    $$('.problem', root).forEach((el) => {
      $$('[data-grade]', el).forEach((b) => b.addEventListener('click', () => {
        const q = P.findQuestion(el.dataset.qid);
        if (q) { S.record(q, +b.dataset.grade); updateNavBadge(); }
        $('.selfgrade', el).innerHTML = `<span>Guardado. ${+b.dataset.grade < 1 ? 'Volverá a aparecer en tu repaso.' : '¡Bien hecho!'}</span>`;
      }));
    });
  }

  // ======================= FORMULARIO =======================
  function viewFormulario(sid) {
    const s = P.subjects[sid];
    if (!s) return notFound();
    const topics = P.allTopics(sid);
    view(`${crumbs([['Inicio', '#/'], [s.short, `#/s/${sid}`], ['Formulario']])}
      <div class="topic-head"><div><p class="eyebrow">Formulario y resumen</p><h1>${esc(s.name)}</h1></div><button class="btn no-print" onclick="window.print()">🖨️ Imprimir / PDF</button></div>
      <nav class="formulario-toc no-print">${topics.map((t) => `<a class="chip c" href="#/s/${sid}/formulario" data-jump="f-${t.id}">${esc(t.name)}</a>`).join('')}</nav>
      ${topics.map((t) => `<section class="formulario-topic theory" id="f-${t.id}"><h2>${esc(t.name)}</h2>${t.theory || ''}</section>`).join('')}`, s.color);
    $$('[data-jump]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); document.getElementById(a.dataset.jump).scrollIntoView({ behavior: 'smooth' }); }));
  }

  // ======================= SESIONES =======================
  function topicPool(sid, tid) {
    const t = P.subjects[sid].topics[tid];
    return {
      qs: (t.questions || []).slice(),
      gens: (t.gens || []).filter((g) => P.gens[g]),
      open: (t.problems || []).filter((p) => p.kind === 'teoria'),
    };
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
    } else {
      r.shuffle(open).slice(0, n - items.length).forEach((q) => items.push(q));
    }
    return r.shuffle(items);
  }
  function buildMixed(sid, n = 12) {
    const r = P.rng(P.newSeed());
    const topics = r.shuffle(P.allTopics(sid));
    const items = [];
    const usedQ = new Set();
    for (let i = 0; items.length < n && i < n * 6; i++) {
      const t = topics[i % topics.length];
      const { qs, gens } = topicPool(sid, t.id);
      const useGen = gens.length && (r() < 0.6 || !qs.length);
      if (useGen) items.push(P.makeGen(r.pick(gens), null, { subject: sid, topic: t.id }));
      else if (qs.length) {
        const q = r.pick(qs);
        if (!usedQ.has(q.id)) { usedQ.add(q.id); items.push(q); }
      }
    }
    return items;
  }
  function startReview(sid) {
    const due = S.dueReviews(sid);
    if (!due.length) { toast('No tienes repasos pendientes ahora mismo 🎉'); return; }
    const items = P.rng(P.newSeed()).shuffle(due).slice(0, 15).map((d) => P.findQuestion(d.id, d.subject, d.topic)).filter(Boolean);
    startSession(items, { title: sid ? `Repaso · ${P.subjects[sid].short}` : 'Repaso de fallos', subject: sid, back: sid ? `#/s/${sid}` : '#/repaso', review: true });
  }
  function startSession(items, meta) {
    if (!items.length) { toast('No hay preguntas disponibles'); return; }
    state.session = Object.assign({ items: items.map((q) => ({ q, score: null })), idx: 0, started: Date.now() }, meta);
    if (location.hash === '#/practica') viewSession(); else location.hash = '#/practica';
  }

  function viewSession() {
    const ss = state.session;
    if (!ss) { location.hash = '#/'; return; }
    if (ss.idx >= ss.items.length) return viewSummary();
    const it = ss.items[ss.idx];
    const q = it.q;
    const s = P.subjects[q.subject] || P.subjects[ss.subject];
    const t = s && s.topics[q.topic];
    const color = s ? s.color : '#5b5bd6';
    let answer = '';
    if (q.type === 'mc') {
      const order = it.order || (it.order = P.rng(P.newSeed()).shuffle(q.options.map((_, i) => i)));
      answer = `<div class="options" role="radiogroup">${order.map((oi, k) => `<button class="opt" data-opt="${oi}" role="radio" aria-checked="false"><span class="k">${'ABCD'[k] || k + 1}</span><span>${q.options[oi]}</span></button>`).join('')}</div>`;
    } else if (q.type === 'num') {
      answer = `<div class="fields" style="--cols:${Math.min(q.grid || 1, 4)}">${q.fields.map((f, i) => `<div class="field" data-field="${i}"><label for="f${i}">${f.label}</label><div class="inp"><input type="text" id="f${i}" autocomplete="off" autocapitalize="off" spellcheck="false" inputmode="text" placeholder="Tu respuesta">${f.unit ? `<span class="unit">${f.unit}</span>` : ''}</div></div>`).join('')}</div>
        <p class="hint">Admite fracciones (<code>3/4</code>), decimales con coma o punto, potencias (<code>e^2</code>) y raíces (<code>sqrt(2)</code>).</p>`;
    }
    const isOpen = q.type === 'open' || !q.type;
    view(`<div class="session">
      <div class="session-top">
        <button class="close-btn" data-act="quit" aria-label="Salir de la sesión">${icon.x}</button>
        <div class="progress"><div class="bar"><span style="width:${(ss.idx / ss.items.length) * 100}%"></span></div></div>
        <span class="count">${ss.idx + 1}/${ss.items.length}</span>
      </div>
      <article class="qcard" data-qid="${esc(q.id || '')}">
        <div class="qmeta">${t ? `<span class="chip c">${esc(t.name)}</span>` : ''}${q.genName ? (t && t.name === q.genName ? '' : `<span class="chip">${esc(q.genName)}</span>`) : q.type === 'mc' ? '<span class="chip">Test</span>' : q.kind === 'teoria' ? '<span class="chip">Teoría</span>' : '<span class="chip">Tipo PAU</span>'}${diffDots(q.difficulty)}</div>
        <div class="qprompt">${q.prompt}</div>
        ${answer}
        <div id="fb"></div>
        <div class="qactions" id="qa">
          ${isOpen ? `<span></span><div class="right"><button class="btn primary" data-act="reveal">Ver solución</button></div>`
          : `<button class="btn ghost" data-act="giveup">No lo sé, ver solución</button><div class="right"><button class="btn primary" data-act="check">Comprobar</button></div>`}
        </div>
      </article>
      <p class="kbd-hint">${q.type === 'mc' ? '<kbd>1</kbd>–<kbd>4</kbd> elegir · ' : ''}<kbd>Enter</kbd> comprobar / siguiente</p>
    </div>`, color);

    it.answered = false;
    let selected = null;
    $$('.opt').forEach((b) => b.addEventListener('click', () => {
      if (it.answered) return;
      $$('.opt').forEach((o) => { o.classList.remove('sel'); o.setAttribute('aria-checked', 'false'); });
      b.classList.add('sel'); b.setAttribute('aria-checked', 'true'); selected = +b.dataset.opt;
    }));
    const first = $('.fields input'); if (first) first.focus();
    $('[data-act=quit]').addEventListener('click', () => {
      const answered = ss.items.filter((x) => x.score != null).length;
      if (answered && !confirm('¿Salir de la sesión? Las respuestas dadas ya están guardadas.')) return;
      const back = ss.back || '#/'; state.session = null; location.hash = back;
    });
    const qa = $('#qa');
    qa.addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]'); if (!act) return;
      const a = act.dataset.act;
      if (a === 'check') check(false);
      else if (a === 'giveup') check(true);
      else if (a === 'reveal') reveal();
      else if (a === 'next') next();
      else if (a.startsWith('self')) { finish(+a.slice(4)); }
    });

    function check(giveup) {
      if (it.answered) return;
      let score = 0, head = '', extra = '';
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
      head = score === 1 ? '✅ ¡Correcto!' : score > 0 ? `🟡 Casi${extra}` : giveup ? '📖 Solución' : '❌ No es correcto';
      showFeedback(score === 1 ? 'ok' : score > 0 || giveup ? 'neutral' : 'bad', head, score < 1);
      finish(score, true);
    }
    function reveal() {
      showFeedback('neutral', '📖 Solución', true);
      qa.innerHTML = `<span class="muted small">¿Cómo te ha salido?</span><div class="right"><button class="btn sm" data-act="self0">❌ Mal</button><button class="btn sm" data-act="self0.5">🟡 A medias</button><button class="btn sm primary" data-act="self1">✅ Bien</button></div>`;
      it.revealed = true;
    }
    function showFeedback(kind, head, open) {
      const fb = $('#fb');
      fb.innerHTML = `<div class="feedback ${kind}"><div class="feedback-head">${head}</div>
        <details class="sol"${open ? ' open' : ''}><summary>Solución paso a paso</summary><div class="sol-body">${q.solution || ''}${P.chart ? P.chart(q) : ''}</div></details></div>`;
      renderMath(fb);
    }
    function finish(score, fromCheck) {
      it.answered = true; it.score = score;
      S.record(Object.assign({}, q, { subject: q.subject || ss.subject, topic: q.topic || ss.topic }), score);
      updateNavBadge();
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
        else if (q.type === 'open' || !q.type) { if (!it.revealed) reveal(); }
        else check(false);
      } else if (q.type === 'mc' && !it.answered && /^[1-9]$/.test(e.key)) {
        const b = $$('.opt')[+e.key - 1]; if (b) b.click();
      }
    };
  }

  function formatAnswer(f) {
    const v = +f.answer;
    if (!isFinite(v)) return v > 0 ? '+∞' : '−∞';
    // Intentar mostrar como fracción si es racional sencilla
    for (let d = 1; d <= 60; d++) {
      const n = Math.round(v * d);
      if (Math.abs(n / d - v) < 1e-9) {
        if (d === 1) return P.fmt(v, 4);
        return `${n}/${d} ≈ ${P.fmt(v, 4)}`;
      }
    }
    return P.fmt(v, 4) + (f.unit ? ' ' + f.unit : '');
  }

  function viewSummary() {
    const ss = state.session;
    const total = ss.items.length;
    const score = ss.items.reduce((a, x) => a + (x.score || 0), 0);
    const p = total ? score / total : 0;
    if (!ss.saved) {
      S.addSession({ date: Date.now(), subject: ss.subject, title: ss.title, score, total });
      ss.saved = true;
    }
    const s = P.subjects[ss.subject];
    const msg = p >= 0.9 ? '¡Espectacular! 🏆' : p >= 0.7 ? '¡Muy bien! 💪' : p >= 0.5 ? 'Vas por buen camino 👍' : 'Sigue practicando, ¡se aprende fallando! 📚';
    view(`<div class="session summary">
      <div class="qcard">
        <p class="eyebrow">${esc(ss.title)}</p>
        <h2>${msg}</h2>
        <div class="score-ring" style="--p:${Math.round(p * 100)}"><div><div><b>${P.fmt(score, 1)}/${total}</b><br><small>${pctTxt(p)} de acierto</small></div></div></div>
        <div class="result-list">${ss.items.map((x, i) => {
          const cls = x.score === 1 ? 'ok' : x.score > 0 ? 'mid' : 'bad';
          const label = x.q.genName || (x.q.prompt || '').replace(/<[^>]+>/g, ' ').replace(/\$[^$]*\$/g, '…').replace(/\s+/g, ' ').trim().slice(0, 90);
          return `<div class="result-item"><span class="dot ${cls}">${x.score === 1 ? '✓' : x.score > 0 ? '½' : '✗'}</span><span class="t">${i + 1}. ${esc(label)}</span></div>`;
        }).join('')}</div>
        <p class="muted small">Las preguntas falladas se han añadido a tu repaso espaciado.</p>
        <div class="btn-row" style="justify-content:center">
          <a class="btn" href="${ss.back || '#/'}">Volver</a>
          <button class="btn primary" data-act="again">${icon.redo} Otra ronda</button>
        </div>
      </div></div>`, s ? s.color : undefined);
    $('[data-act=again]').addEventListener('click', () => {
      let items;
      if (ss.review) { startReview(ss.subject); return; }
      if (ss.gen) items = Array.from({ length: 10 }, () => P.makeGen(ss.gen, null, { subject: ss.subject, topic: ss.topic }));
      else if (ss.topic) items = buildTopic(ss.subject, ss.topic, 10);
      else if (ss.title.includes('test')) items = ss.items.map((x) => x.q);
      else items = buildMixed(ss.subject);
      startSession(items, { title: ss.title, subject: ss.subject, topic: ss.topic, gen: ss.gen, back: ss.back });
    });
    state.keyHandler = null;
  }

  // ======================= SIMULACRO =======================
  function buildExam(sid) {
    const s = P.subjects[sid];
    const r = P.rng(P.newSeed());
    const used = new Set(), usedGen = new Set();
    return s.exam.slots.map((slot) => {
      let topics = P.allTopics(sid);
      if (slot.topics) topics = slot.topics.map((t) => s.topics[t]);
      else if (slot.blocks) topics = s.blocks.filter((b) => slot.blocks.includes(b.id)).flatMap((b) => b.topics);
      let pool = [];
      if (slot.kind === 'teoria') pool = topics.flatMap((t) => (t.problems || []).filter((p) => p.kind === 'teoria'));
      else if (slot.kind !== 'problema') pool = topics.flatMap((t) => (t.problems || []).filter((p) => p.kind !== 'teoria'));
      pool = pool.filter((p) => !used.has(p.id));
      const gens = topics.flatMap((t) => (t.gens || []).map((g) => ({ g, t: t.id }))).filter((x) => !usedGen.has(x.g) && P.gens[x.g] && P.gens[x.g].make);
      let q;
      if (pool.length && (!gens.length || r() < 0.65)) { q = r.pick(pool); used.add(q.id); }
      else if (gens.length) { const x = r.pick(gens); usedGen.add(x.g); q = P.makeGen(x.g, null, { subject: sid, topic: x.t }); }
      return q ? { q, points: slot.points, grade: null } : null;
    }).filter(Boolean);
  }

  function viewExamIntro(sid) {
    const s = P.subjects[sid];
    if (!s) return notFound();
    const total = s.exam.slots.reduce((a, x) => a + x.points, 0);
    const past = S.get().exams.filter((e) => e.subject === sid).slice(0, 5);
    const slotName = (sl) => sl.kind === 'teoria' ? 'Pregunta teórica' : sl.topics ? sl.topics.map((t) => s.topics[t].name).join(' / ') : sl.blocks ? sl.blocks.map((b) => s.blocks.find((x) => x.id === b).name).join(' / ') : 'Ejercicio';
    view(`${crumbs([['Inicio', '#/'], [s.short, `#/s/${sid}`], ['Simulacro']])}
      <div class="session"><div class="qcard">
        <p class="eyebrow">Simulacro de examen</p>
        <h1 style="font-size:2rem">${esc(s.name)}</h1>
        <p class="muted">Un examen completo con ejercicios al azar. El cronómetro empieza al pulsar el botón. Resuélvelo en papel como en la PAU y, al entregar, verás las soluciones y podrás puntuarte cada ejercicio.</p>
        <div class="slots">${s.exam.slots.map((sl, i) => `<div class="slot"><span>${i + 1}. ${esc(slotName(sl))}</span><b>${String(sl.points).replace('.', ',')} pt</b></div>`).join('')}
          <div class="slot"><span><b>Total</b> · ${s.exam.duration} minutos</span><b>${total} pt</b></div></div>
        <p class="info">ℹ️ ${esc(s.exam.info)}</p>
        <div class="btn-row" style="margin-top:20px"><button class="btn primary lg" data-act="start">${icon.clock} Empezar simulacro</button><a class="btn lg" href="#/s/${sid}">Cancelar</a></div>
        ${past.length ? `<h3 style="margin-top:28px">Tus últimos simulacros</h3><div class="hist">${past.map((e) => `<div class="hist-row"><span>${new Date(e.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</span><b>${P.fmt(e.score, 2)} / ${e.max}</b></div>`).join('')}</div>` : ''}
      </div></div>`, s.color);
    $('[data-act=start]').addEventListener('click', () => {
      state.exam = { sid, items: buildExam(sid), start: Date.now(), duration: s.exam.duration * 60, done: false };
      location.hash = '#/examen';
    });
  }

  function examQuestionHTML(it, i, corrected) {
    const q = it.q;
    let opts = '';
    if (q.type === 'mc') opts = `<ol type="a" class="exam-opts">${q.options.map((o, k) => `<li${corrected && k === q.answer ? ' style="font-weight:700;color:var(--ok)"' : ''}>${o}</li>`).join('')}</ol>`;
    let sol = '';
    if (corrected) {
      const res = q.type === 'num' ? `<div class="formula">${q.fields.map((f) => `<div>${f.label} <b>${formatAnswer(f)}</b></div>`).join('')}</div>` : '';
      const step = 0.25;
      sol = `<div class="sol-body" style="padding:0 18px 18px"><h3 style="margin-top:6px">Solución</h3>${res}${q.solution || ''}${P.chart(q)}
        <div class="grade-row"><span>Tu nota en este ejercicio:</span><input type="range" min="0" max="${it.points}" step="${step}" value="${it.grade == null ? 0 : it.grade}" data-grade="${i}" aria-label="Nota del ejercicio ${i + 1}"><output id="o${i}">${P.fmt(it.grade || 0, 2)} / ${it.points}</output></div></div>`;
    }
    return `<article class="problem exam-q">
      <div class="problem-head"><b>Ejercicio ${i + 1}</b><span class="pts">${String(it.points).replace('.', ',')} ${it.points === 1 ? 'punto' : 'puntos'}</span></div>
      <div class="problem-body">${q.prompt}${opts}</div>${sol}</article>`;
  }

  function viewExam() {
    const ex = state.exam;
    if (!ex) { location.hash = '#/'; return; }
    const s = P.subjects[ex.sid];
    if (ex.done) return viewExamCorrection();
    view(`<div class="exam-bar"><span class="chip c">${esc(s.short)}</span><span class="timer" id="timer">--:--</span><div class="bar"><span id="tbar" style="width:0"></span></div><button class="btn primary" data-act="submit">Entregar</button></div>
      <div class="exam-paper">${ex.items.map((it, i) => examQuestionHTML(it, i, false)).join('')}</div>
      <div class="btn-row" style="justify-content:center;margin-top:20px"><button class="btn primary lg" data-act="submit">Entregar examen</button></div>`, s.color);
    $$('[data-act=submit]').forEach((b) => b.addEventListener('click', () => { if (confirm('¿Entregar el examen y ver las soluciones?')) submitExam(); }));
    const tick = () => {
      const left = Math.max(0, ex.duration - Math.floor((Date.now() - ex.start) / 1000));
      const el = $('#timer'); if (!el) return;
      el.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
      el.className = 'timer' + (left < 60 ? ' danger' : left < 600 ? ' warn' : '');
      $('#tbar').style.width = `${(1 - left / ex.duration) * 100}%`;
      if (left <= 0) { toast('⏰ ¡Tiempo! Se entrega el examen.'); submitExam(); }
    };
    clearInterval(state.examTimer);
    state.examTimer = setInterval(tick, 1000); tick();
  }
  function submitExam() {
    const ex = state.exam; if (!ex || ex.done) return;
    clearInterval(state.examTimer);
    ex.done = true; ex.used = Math.min(ex.duration, Math.floor((Date.now() - ex.start) / 1000));
    window.scrollTo({ top: 0 });
    viewExamCorrection();
  }
  function viewExamCorrection() {
    const ex = state.exam; const s = P.subjects[ex.sid];
    const max = ex.items.reduce((a, x) => a + x.points, 0);
    view(`${crumbs([['Inicio', '#/'], [s.short, `#/s/${ex.sid}`], ['Corrección del simulacro']])}
      <h1 style="font-size:2rem">Corrección</h1>
      <p class="muted">Tiempo empleado: <b>${Math.floor(ex.used / 60)} min ${ex.used % 60} s</b>. Compara tu resolución con la solución y puntúa cada ejercicio con honestidad (como lo haría un corrector).</p>
      <div class="exam-paper">${ex.items.map((it, i) => examQuestionHTML(it, i, true)).join('')}</div>
      <div class="exam-total"><span>Nota: <b id="total">0</b> / ${max}</span><div class="btn-row"><a class="btn" href="#/s/${ex.sid}">Salir sin guardar</a><button class="btn primary" data-act="save">Guardar nota</button></div></div>`, s.color);
    const upd = () => {
      const tot = ex.items.reduce((a, x) => a + (x.grade || 0), 0);
      $('#total').textContent = P.fmt(tot, 2);
    };
    $$('[data-grade]').forEach((inp) => inp.addEventListener('input', () => {
      const i = +inp.dataset.grade; ex.items[i].grade = +inp.value;
      $(`#o${i}`).textContent = `${P.fmt(+inp.value, 2)} / ${ex.items[i].points}`; upd();
    }));
    upd();
    $('[data-act=save]').addEventListener('click', () => {
      const tot = ex.items.reduce((a, x) => a + (x.grade || 0), 0);
      S.addExam({ date: Date.now(), subject: ex.sid, score: tot, max, used: ex.used });
      ex.items.forEach((it) => { if (it.q.subject && it.q.topic) S.record(it.q, (it.grade || 0) / it.points >= 0.75 ? 1 : (it.grade || 0) / it.points >= 0.4 ? 0.5 : 0); });
      updateNavBadge();
      const sid = ex.sid; state.exam = null;
      toast(`Nota guardada: ${P.fmt(tot, 2)} / ${max}`);
      location.hash = `#/simulacro/${sid}`;
    });
  }

  // ======================= REPASO =======================
  function viewReview() {
    const due = S.dueReviews();
    const pend = S.pendingReviews();
    const bySub = {};
    pend.forEach((r) => { (bySub[r.subject] = bySub[r.subject] || { due: 0, total: 0, next: Infinity }); bySub[r.subject].total++; if (r.due <= Date.now()) bySub[r.subject].due++; else bySub[r.subject].next = Math.min(bySub[r.subject].next, r.due); });
    const rows = P.subjectOrder.filter((sid) => bySub[sid]).map((sid) => {
      const s = P.subjects[sid], b = bySub[sid];
      const nextTxt = b.due ? `${b.due} para hoy` : `Próximo repaso: ${new Date(b.next).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })}`;
      return `<div class="gen-item" style="--c:${s.color}"><div><b>${s.icon} ${esc(s.name)}</b><small>${nextTxt} · ${b.total} en seguimiento</small></div><button class="btn sm${b.due ? ' primary' : ''}" data-rev="${sid}" ${b.due ? '' : 'disabled'}>Repasar</button></div>`;
    }).join('');
    view(`${crumbs([['Inicio', '#/'], ['Repaso']])}
      <h1>Repaso espaciado</h1>
      <p class="lead">Cada pregunta que fallas vuelve a aparecer al cabo de un tiempo. Si la aciertas, el siguiente repaso se aleja (1, 3, 7 y 16 días) hasta que la dominas.</p>
      ${pend.length ? `<div class="btn-row" style="margin:20px 0"><button class="btn primary lg" data-rev="" ${due.length ? '' : 'disabled'}>${icon.redo} Repasar todo (${due.length})</button></div><div class="gen-list">${rows}</div>`
      : `<div class="card empty"><div class="em">🎯</div><p>No tienes fallos pendientes. Practica algún tema y lo que falles aparecerá aquí.</p><a class="btn primary" href="#/">Ir a las asignaturas</a></div>`}`);
    $$('[data-rev]').forEach((b) => b.addEventListener('click', () => startReview(b.dataset.rev || null)));
  }

  // ======================= PROGRESO =======================
  function viewProgress() {
    const d = S.get();
    const tot = S.totals();
    // Heatmap 18 semanas
    const weeks = 18, cells = [];
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const dow = (start.getDay() + 6) % 7; // lunes = 0
    start.setDate(start.getDate() - dow - (weeks - 1) * 7);
    for (let i = 0; i < weeks * 7; i++) {
      const dt = new Date(start); dt.setDate(start.getDate() + i);
      const k = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      const n = d.daily[k] || 0;
      const lv = n === 0 ? '' : n < 5 ? 'l1' : n < 15 ? 'l2' : n < 30 ? 'l3' : 'l4';
      cells.push(dt > new Date() ? '<i style="opacity:.3"></i>' : `<i class="${lv}" title="${dt.toLocaleDateString('es-ES')}: ${n} preguntas"></i>`);
    }
    const subj = P.subjectOrder.map((sid) => {
      const s = P.subjects[sid]; const st = S.subjectStats(sid);
      return `<div class="card" style="--c:${s.color}">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><div class="subject-icon" style="width:40px;height:40px;font-size:1.2rem">${s.icon}</div><div><h3 style="margin:0">${esc(s.name)}</h3><span class="muted small">${st.seen} respondidas · ${st.seen ? pctTxt(st.correct / st.seen) : '—'} aciertos</span></div></div>
        <div class="topic-bars">${P.allTopics(sid).map((t) => {
          const ts = S.topicStats(sid, t.id); const m = S.mastery(sid, t.id);
          return `<div class="topic-bar"><div class="bar-label"><b>${esc(t.name)}</b><span>${ts.seen ? `${P.fmt(ts.correct, 1)}/${ts.seen} · ` : ''}${pctTxt(m)}</span></div><div class="bar"><span style="width:${m * 100}%"></span></div></div>`;
        }).join('')}</div></div>`;
    }).join('');
    const hist = d.history.slice(0, 12).map((h) => `<div class="hist-row"><span>${esc(h.title || '')} <span class="muted small">· ${new Date(h.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span></span><b>${P.fmt(h.score, 1)}/${h.total}</b></div>`).join('');
    const exams = d.exams.slice(0, 12).map((e) => `<div class="hist-row"><span>${esc((P.subjects[e.subject] || {}).name || e.subject)} <span class="muted small">· ${new Date(e.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span></span><b>${P.fmt(e.score, 2)}/${e.max}</b></div>`).join('');
    view(`${crumbs([['Inicio', '#/'], ['Progreso']])}
      <h1>Tu progreso</h1>
      <section class="stats">
        <div class="stat"><div class="v">${tot.seen}</div><div class="l">preguntas respondidas</div></div>
        <div class="stat"><div class="v">${tot.seen ? pctTxt(tot.correct / tot.seen) : '—'}</div><div class="l">acierto global</div></div>
        <div class="stat"><div class="v">🔥 ${S.streak()}</div><div class="l">días de racha</div></div>
        <div class="stat"><div class="v">${d.exams.length}</div><div class="l">simulacros hechos</div></div>
      </section>
      <section class="card" style="margin-bottom:20px"><h3>Actividad (últimas ${weeks} semanas)</h3><div class="heat">${cells.join('')}</div></section>
      <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))">${subj}</div>
      <div class="grid" style="margin-top:20px;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))">
        <section class="card"><h3>Últimas sesiones</h3>${hist ? `<div class="hist">${hist}</div>` : '<p class="muted">Aún no has completado ninguna sesión.</p>'}</section>
        <section class="card"><h3>Simulacros</h3>${exams ? `<div class="hist">${exams}</div>` : '<p class="muted">Aún no has hecho ningún simulacro.</p>'}</section>
      </div>
      <section class="card" style="margin-top:20px"><h3>Tus datos</h3><p class="muted small">El progreso se guarda solo en este navegador. Puedes exportarlo para llevarlo a otro dispositivo.</p>
        <div class="btn-row"><button class="btn" data-act="export">⬇️ Exportar</button><label class="btn">⬆️ Importar<input type="file" accept="application/json" data-act="import" hidden></label><button class="btn danger" data-act="reset">Borrar progreso</button></div></section>`);
    $('[data-act=export]').addEventListener('click', () => {
      const blob = new Blob([S.exportJSON()], { type: 'application/json' });
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `pau-madrid-progreso-${P.today()}.json`; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    $('[data-act=import]').addEventListener('change', (e) => {
      const f = e.target.files[0]; if (!f) return;
      f.text().then((txt) => { try { S.importJSON(txt); toast('Progreso importado ✅'); applyTheme(); viewProgress(); updateNavBadge(); } catch (err) { toast('El archivo no es válido'); } });
    });
    $('[data-act=reset]').addEventListener('click', () => { if (confirm('¿Seguro que quieres borrar todo tu progreso? No se puede deshacer.')) { S.reset(); toast('Progreso borrado'); viewProgress(); updateNavBadge(); } });
  }

  function notFound() {
    view(`<div class="card empty"><div class="em">🧭</div><h2>Página no encontrada</h2><a class="btn primary" href="#/">Volver al inicio</a></div>`);
  }

  // ======================= ROUTER =======================
  function route() {
    if (state.skipHash) { state.skipHash = false; return; }
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean).map(decodeURIComponent);
    // Proteger el simulacro en curso
    if (state.exam && !state.exam.done && parts[0] !== 'examen') {
      if (!confirm('Tienes un simulacro en curso. ¿Abandonarlo?')) { state.skipHash = true; location.hash = '#/examen'; return; }
      clearInterval(state.examTimer); state.exam = null;
    }
    if (parts[0] !== 'examen') clearInterval(state.examTimer);
    state.keyHandler = null;
    $$('.nav a').forEach((a) => a.classList.toggle('active', a.dataset.nav === (parts[0] || 'home') || (a.dataset.nav === 'home' && parts[0] === 's')));
    window.scrollTo({ top: 0 });
    const [a, b, c, d] = parts;
    if (!a) viewHome();
    else if (a === 's' && b && c === 'formulario') viewFormulario(b);
    else if (a === 's' && b && c) viewTopic(b, c, d);
    else if (a === 's' && b) viewSubject(b);
    else if (a === 'practica') viewSession();
    else if (a === 'simulacro' && b) viewExamIntro(b);
    else if (a === 'examen') viewExam();
    else if (a === 'repaso') viewReview();
    else if (a === 'progreso') viewProgress();
    else notFound();
    updateNavBadge();
    app.focus({ preventScroll: true });
  }

  document.addEventListener('keydown', (e) => { if (state.keyHandler && !e.ctrlKey && !e.metaKey && !e.altKey) state.keyHandler(e); });
  window.addEventListener('beforeunload', (e) => { if (state.exam && !state.exam.done) { e.preventDefault(); e.returnValue = ''; } });
  window.addEventListener('hashchange', route);
  applyTheme();
  route();
  P.app = { route, startSession, buildExam, buildTopic, buildMixed };
})(window.PAU);
