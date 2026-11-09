/* Persistencia local del progreso (localStorage, con tolerancia a fallos). */
(function (P) {
  'use strict';
  const KEY = 'pau-madrid-v1';
  const blank = () => ({
    stats: {},      // stats[subject][topic] = {seen, correct, last}
    history: [],    // sesiones terminadas
    exams: [],      // simulacros
    review: {},     // review[qid] = {subject, topic, box, due}
    daily: {},      // daily['YYYY-MM-DD'] = nº preguntas
    settings: { theme: 'auto', examDate: '' },
  });
  let mem = null;

  function load() {
    if (mem) return mem;
    try { mem = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); }
    catch (e) { mem = blank(); }
    return mem;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(mem)); } catch (e) { /* modo privado */ } }

  // Intervalos de repaso (días) por caja de Leitner
  const BOX_DAYS = [0, 1, 3, 7, 16];
  const dayMs = 86400000;

  const S = {
    get: load,
    save,
    setting(k, v) { const d = load(); if (v === undefined) return d.settings[k]; d.settings[k] = v; save(); },

    /** Registra una respuesta. score: 1 correcta, 0.5 parcial, 0 incorrecta */
    record(q, score) {
      const d = load();
      const s = (d.stats[q.subject] = d.stats[q.subject] || {});
      const t = (s[q.topic] = s[q.topic] || { seen: 0, correct: 0 });
      t.seen++; t.correct += score; t.last = Date.now();
      const day = P.today();
      d.daily[day] = (d.daily[day] || 0) + 1;

      // Repaso espaciado
      const r = d.review[q.id];
      if (score < 1) {
        d.review[q.id] = { subject: q.subject, topic: q.topic, box: 0, due: Date.now(), fails: ((r && r.fails) || 0) + 1 };
      } else if (r) {
        r.box = Math.min(r.box + 1, BOX_DAYS.length);
        if (r.box >= BOX_DAYS.length) delete d.review[q.id];
        else r.due = Date.now() + BOX_DAYS[r.box] * dayMs;
      }
      save();
    },
    addSession(sess) { const d = load(); d.history.unshift(sess); d.history = d.history.slice(0, 200); save(); },
    addExam(ex) { const d = load(); d.exams.unshift(ex); d.exams = d.exams.slice(0, 100); save(); },

    dueReviews(subject) {
      const d = load(), now = Date.now();
      return Object.entries(d.review)
        .filter(([, r]) => r.due <= now && (!subject || r.subject === subject))
        .map(([id, r]) => Object.assign({ id }, r));
    },
    pendingReviews(subject) {
      const d = load();
      return Object.entries(d.review).filter(([, r]) => !subject || r.subject === subject).map(([id, r]) => Object.assign({ id }, r));
    },
    topicStats(subject, topic) {
      const d = load();
      return (d.stats[subject] && d.stats[subject][topic]) || { seen: 0, correct: 0 };
    },
    subjectStats(subject) {
      const d = load(); const s = d.stats[subject] || {};
      let seen = 0, correct = 0;
      Object.values(s).forEach((t) => { seen += t.seen; correct += t.correct; });
      return { seen, correct };
    },
    /** Dominio del tema 0..1: mezcla acierto y volumen (llega a 1 con ~20 preguntas bien) */
    mastery(subject, topic) {
      const t = S.topicStats(subject, topic);
      if (!t.seen) return 0;
      const acc = t.correct / t.seen;
      const vol = Math.min(1, t.seen / 20);
      return acc * (0.35 + 0.65 * vol);
    },
    streak() {
      const d = load(); let n = 0;
      const date = new Date();
      const key = (dt) => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      if (!d.daily[key(date)]) date.setDate(date.getDate() - 1); // la racha sigue viva hasta final del día
      while (d.daily[key(date)]) { n++; date.setDate(date.getDate() - 1); }
      return n;
    },
    totals() {
      const d = load(); let seen = 0, correct = 0;
      Object.values(d.stats).forEach((s) => Object.values(s).forEach((t) => { seen += t.seen; correct += t.correct; }));
      return { seen, correct, today: d.daily[P.today()] || 0 };
    },
    exportJSON() { return JSON.stringify(load(), null, 2); },
    importJSON(txt) { const obj = JSON.parse(txt); mem = Object.assign(blank(), obj); save(); },
    reset() { mem = blank(); save(); },
  };
  P.store = S;
})(window.PAU);
