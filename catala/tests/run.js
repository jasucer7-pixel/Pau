/* Test d'integritat d'Endavant: carrega les dades i la lògica en un context simulat.
   Ús: node catala/tests/run.js */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const el = () => ({ innerHTML: '', textContent: '', classList: { toggle() {}, add() {}, remove() {} }, setAttribute() {}, getAttribute() { return ''; }, style: {} });
const doc = { querySelector: () => el(), querySelectorAll: () => [], addEventListener() {}, documentElement: el() };
const mem = {};
const ctx = { console, Math, Date, JSON, Promise, setTimeout, clearTimeout, setInterval, clearInterval, document: doc,
  localStorage: { getItem: (k) => mem[k] || null, setItem: (k, v) => { mem[k] = v; } }, sessionStorage: { getItem: () => null, setItem() {} },
  location: { hash: '' }, addEventListener() {}, scrollTo() {}, navigator: { userAgent: 'node', platform: 'node', maxTouchPoints: 0 } };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['js/data-vocab.js', 'js/data-grammar.js', 'js/data-verbs.js', 'js/data-skills.js', 'js/data-course.js', 'js/app.js'])
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const CA = ctx.CA, T = CA._test;

let errors = 0, checks = 0;
const ok = (cond, msg) => { checks++; if (!cond) { errors++; console.error('✗ ' + msg); } };
const eq = (a, b, msg) => ok(a === b, `${msg}: esperat «${b}», obtingut «${a}»`);

// Vocabulari
const ids = new Set();
for (const t of CA.vocab) for (const w of t.words) {
  const id = t.id + '|' + w[0];
  ok(!ids.has(id), 'paraula repetida ' + id); ids.add(id);
  ok(w[0] && w[1], 'paraula buida a ' + t.id);
  ok(T.check(w[0], T.variants(w[0])) === 'ok', 'la paraula no accepta la seva pròpia forma: ' + w[0]);
}
ok(T.check('aigua', T.variants("l'aigua")) === 'ok', 'article opcional');
ok(T.check('a prop', T.variants('a prop (de)')) === 'ok', 'parèntesi opcional');
ok(T.check('encantada', T.variants('encantat / encantada')) === 'ok', 'alternatives');

// Gramàtica
for (const u of CA.grammar) {
  ok(u.ex.length >= 6, 'pocs exercicis a ' + u.id);
  for (const x of u.ex) {
    if (x.ord) { ok(x.es && x.ord.split(' ').length > 2, 'ordenar mal format a ' + u.id); continue; }
    ok(/___|→/.test(x.q) || x.o, 'pregunta sense buit a ' + u.id + ': ' + x.q);
    if (x.o) ok(x.o.includes(x.a), `resposta fora de les opcions a ${u.id}: ${x.q}`);
    if (x.o) ok(new Set(x.o).size === x.o.length, 'opcions repetides a ' + u.id);
    const it = T.gramItem(x);
    ok(!/undefined/.test(it.prompt + (it.say || '')), 'text estrany a ' + u.id);
  }
}
eq(T.fillGaps('___ no vens? — ___ estic malalt.', 'Per què / Perquè'), 'Per què no vens? — Perquè estic malalt.', 'fillGaps');

// Verbs: formes conegudes
const V = Object.fromEntries(CA.verbs.list.map((v) => [v.inf, v.conj]));
const P = (inf, t, p) => V[inf][t][p][0];
eq(P('parlar', 'pres', 0), 'parlo', 'present parlar');
eq(P('menjar', 'pres', 3), 'mengem', 'present menjar');
eq(P('començar', 'pres', 1), 'comences', 'present començar');
eq(P('pagar', 'pres', 5), 'paguen', 'present pagar');
eq(P('trucar', 'pres', 4), 'truqueu', 'present trucar');
eq(P('viatjar', 'pres', 3), 'viatgem', 'present viatjar');
eq(P('parlar', 'imp', 3), 'parlàvem', 'imperfet parlar');
eq(P('estar', 'imp', 0), 'estava', 'imperfet estar');
eq(P('anar', 'imp', 4), 'anàveu', 'imperfet anar');
eq(P('ser', 'fut', 0), 'seré', 'futur ser');
eq(P('fer', 'fut', 1), 'faràs', 'futur fer');
eq(P('tenir', 'cond', 0), 'tindria', 'condicional tenir');
eq(P('voler', 'cond', 0), 'voldria', 'condicional voler');
eq(P('anar', 'fut', 3), 'anirem', 'futur anar');
eq(P('conèixer', 'fut', 0), 'coneixeré', 'futur conèixer');
eq(P('fer', 'perf', 0), 'he fet', 'perfet fer');
eq(P('veure', 'perif', 2), 'va veure', 'perifràstic veure');
eq(P('llevar-se', 'pres', 0), 'em llevo', 'reflexiu present');
eq(P('llevar-se', 'perf', 0), "m'he llevat", 'reflexiu perfet');
eq(P('dutxar-se', 'perf', 3), 'ens hem dutxat', 'reflexiu perfet nosaltres');
eq(P('llevar-se', 'perif', 0), 'em vaig llevar', 'reflexiu perifràstic');
ok(V['llevar-se'].perif[0].includes('vaig llevar-me'), 'enclític acceptat');
ok(V.parlar.perif[1].includes('vares parlar'), 'variant vares');
for (const v of CA.verbs.list) for (const t of CA.verbs.tenses) {
  ok(v.conj[t.id].length === 6, `${v.inf} ${t.id}: 6 persones`);
  for (const f of v.conj[t.id]) ok(f[0] && !/undefined/.test(f.join()), `${v.inf} ${t.id}: forma buida`);
}

// Comparació de respostes
eq(T.check('Soc', ['soc']), 'ok', 'majúscules');
eq(T.check('sóc', ['soc']), 'near', 'accent');
eq(T.check('col.legi', ['col·legi']), 'ok', 'punt volat amb punt normal');
eq(T.check("l' escola", ["l'escola"]), 'ok', 'apòstrof amb espai');
eq(T.check('vaig  anar.', ['vaig anar']), 'ok', 'espais i punt');
eq(T.check('casa', ['cases']), 'bad', 'error');

// Dictat
const d1 = T.diffWords('Em dic Laura i soc de València.', 'em dic laura i soc de Valencia');
ok(d1.score > 0.9 && d1.score < 1 && d1.ops.some((o) => o.t === 'near'), 'dictat: accent detectat');
eq(T.diffWords('Tinc dos germans.', 'Tinc dos germans').score, 1, 'dictat perfecte');
ok(T.diffWords('Tinc dos germans.', 'Tinc germans').ops.some((o) => o.t === 'miss'), 'dictat: paraula oblidada');

// Detector de castellanismes
const L = (s) => T.lint(s).join(' | ');
ok(/perquè/.test(L('No vinc porque estic malalt')), 'detecta porque');
ok(/haver de/.test(L('Demà tinc que treballar')), 'detecta tinc que');
ok(/invariable/.test(L('Hi han dos bars')), 'detecta hi han');
ok(/al matí/.test(L('Ens veiem pel matí')), 'detecta pel matí');
ok(/artículo/.test(L('Visc amb mi germà')), 'detecta possessiu sense article');
ok(/també/.test(L('Jo tambe')), 'detecta tambe');
ok(/futuro/.test(L('Demà vaig a estudiar molt')), 'detecta vaig a com a futur');
eq(L('Cada dia vaig a córrer al parc.'), '', 'vaig a córrer és correcte');
eq(L("Hola, Pau! M'agraden les pel·lícules de por. Estàs bé? Hi ha un bar a prop i també una plaça."), '', 'text correcte sense avisos');

// Destreses
for (const r of CA.reading.concat(CA.listening)) for (const q of r.qs) ok(q.o.includes(q.a), `resposta fora d'opcions a ${r.id}: ${q.q}`);
for (const w of CA.writing) { ok(w.model && w.check.length && w.min < w.max, 'tasca incompleta ' + w.id); ok(T.lint(w.model).length === 0, 'el model té avisos: ' + w.id + ' → ' + T.lint(w.model).join(' | ')); }
for (const s of CA.speaking) ok(T.lint(s.model).length === 0, 'el model oral té avisos: ' + s.id + ' → ' + T.lint(s.model).join(' | '));
for (const s of CA.dictation) ok(T.lint(s).length === 0, 'el dictat té avisos: ' + s);

// Curs: cada pas apunta a contingut que existeix i cap contingut queda fora del curs
const used = new Set();
for (const u of CA.course) {
  const st = T.unitSteps(u);
  ok(st.length >= 4, 'unitat curta ' + u.id);
  for (const x of st) ok(x && x.hash && x.title && !/undefined/.test(x.title + x.meta), 'pas mal definit a ' + u.id);
  u.steps.forEach((x) => used.add(x));
}
for (const t of CA.vocab) ok(used.has('v:' + t.id), 'tema fora del curs: ' + t.id);
for (const g of CA.grammar) ok(used.has('g:' + g.id), 'gramàtica fora del curs: ' + g.id);
for (const r of CA.reading) ok(used.has('r:' + r.id), 'lectura fora del curs: ' + r.id);
for (const l of CA.listening) ok(used.has('l:' + l.id), 'audició fora del curs: ' + l.id);
for (const w of CA.writing) ok(used.has('w:' + w.id), 'redacció fora del curs: ' + w.id);
for (const x of CA.speaking) ok(used.has('s:' + x.id), 'oral fora del curs: ' + x.id);
const hashes = CA.course.flatMap((u) => T.unitSteps(u).map((x) => x.hash));
ok(new Set(hashes).size === hashes.length, 'un pas apareix en dues unitats');
// Veu: els textos llargs es parteixen en trossos curts
const ch = T.chunks(CA.reading[2].text);
ok(ch.length > 2 && ch.every((c) => c.length <= 200), 'trossos de veu massa llargs');

console.log(`${checks} comprovacions, ${errors} errors`);
process.exit(errors ? 1 : 0);
