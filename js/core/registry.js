/* Registro de asignaturas, temas y generadores de ejercicios. */
(function (P) {
  'use strict';
  P.subjects = {};
  P.subjectOrder = [];
  P.gens = {};

  /**
   * Asignatura:
   * { id, name, short, icon, color, desc, exam: {...}, blocks: [{id, name, topics: [topic...]}] }
   * Tema:
   * { id, name, summary, theory (html), questions: [...], gens: [genId...], problems: [...] }
   * Pregunta:
   *  - mc:   { type:'mc', prompt, options:[...], answer: idx, solution }
   *  - num:  { type:'num', prompt, fields:[{label, answer, tol?, alt?, unit?}], solution }
   *  - open: { type:'open', prompt, solution, points? }
   */
  P.addSubject = function (s) {
    s.topics = {};
    s.blocks.forEach((b) => b.topics.forEach((t) => {
      t.block = b.id; t.subject = s.id; s.topics[t.id] = t;
      (t.questions || []).forEach((q, i) => { q.id = q.id || `${s.id}:${t.id}:q${i}`; q.topic = t.id; q.subject = s.id; });
      (t.problems || []).forEach((q, i) => { q.id = q.id || `${s.id}:${t.id}:p${i}`; q.topic = t.id; q.subject = s.id; q.type = q.type || 'open'; });
    }));
    P.subjects[s.id] = s;
    if (!P.subjectOrder.includes(s.id)) P.subjectOrder.push(s.id);
  };

  /** Generador: { id, name, make(rng) -> pregunta } */
  P.addGen = function (g) { P.gens[g.id] = g; };

  P.makeGen = function (genId, seed, ctx) {
    const g = P.gens[genId];
    if (!g) throw new Error('Generador desconocido: ' + genId);
    seed = seed || P.newSeed();
    const q = g.make(P.rng(seed));
    q.id = `gen|${genId}|${seed}`;
    q.gen = genId; q.seed = seed; q.generated = true;
    if (ctx) { q.subject = ctx.subject; q.topic = ctx.topic; }
    q.genName = g.name;
    return q;
  };

  /** Recupera una pregunta por id (estática o generada) */
  P.findQuestion = function (id, subject, topic) {
    if (id.startsWith('gen|')) {
      const [, genId, seed] = id.split('|');
      if (!P.gens[genId]) return null;
      return P.makeGen(genId, +seed, { subject, topic });
    }
    const [sid, tid] = id.split(':');
    const s = P.subjects[sid]; if (!s) return null;
    const t = s.topics[tid]; if (!t) return null;
    return (t.questions || []).concat(t.problems || []).find((q) => q.id === id) || null;
  };

  P.allTopics = function (sid) {
    const s = P.subjects[sid];
    return s ? s.blocks.flatMap((b) => b.topics) : [];
  };
})(window.PAU);
