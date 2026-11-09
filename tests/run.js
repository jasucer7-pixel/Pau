/* Test de integridad: carga los scripts en un contexto simulado, genera miles de
   ejercicios y comprueba respuestas, textos y (si está instalado) el LaTeX con KaTeX.
   Uso: node tests/run.js  [N por generador, por defecto 300] */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const files = ['js/core/util.js', 'js/core/registry.js', 'js/core/store.js', 'js/gen/mathgen.js', 'js/gen/econgen.js',
  'js/data/mat2.js', 'js/data/matccss.js', 'js/data/eco.js', 'js/core/charts.js'];

const mem = {};
const ctx = { window: {}, localStorage: { getItem: (k) => mem[k] || null, setItem: (k, v) => { mem[k] = v; } }, console, Math, Date, JSON };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
const P = ctx.PAU;

let katex = null;
try { katex = require('katex'); } catch (e) { console.log('(katex no instalado: se omite la validación de LaTeX)'); }

const N = +process.argv[2] || 300;
let errors = 0, checked = 0, mathChecked = 0;
const fail = (where, msg) => { errors++; if (errors < 60) console.error(`✗ ${where}: ${msg}`); };

function checkMath(where, html) {
  if (!html) return;
  if (/undefined|NaN|\[object|Infinity(?!\})/.test(html.replace(/\\infty/g, ''))) fail(where, `texto sospechoso: ${html.match(/.{0,40}(undefined|NaN|\[object|Infinity).{0,40}/)[0]}`);
  // Extrae $$..$$ y $..$
  const re = /\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g;
  let m; let stripped = html;
  while ((m = re.exec(html))) {
    const tex = m[1] || m[2];
    stripped = stripped.replace(m[0], '');
    if (katex) {
      mathChecked++;
      try { katex.renderToString(tex, { throwOnError: true, strict: false, displayMode: !!m[1] }); }
      catch (e) { fail(where, `LaTeX inválido: ${e.message.slice(0, 120)} :: ${tex.slice(0, 120)}`); }
    }
  }
  if (stripped.includes('$')) fail(where, 'delimitador $ desemparejado');
}

function checkQuestion(where, q) {
  checked++;
  if (!q.prompt) fail(where, 'sin enunciado');
  checkMath(where + ' [enunciado]', q.prompt);
  checkMath(where + ' [solución]', q.solution);
  if (q.type === 'mc') {
    if (!Array.isArray(q.options) || q.options.length < 2) fail(where, 'opciones inválidas');
    if (!(q.answer >= 0 && q.answer < q.options.length)) fail(where, 'índice de respuesta fuera de rango');
    if (new Set(q.options).size !== q.options.length) fail(where, 'opciones duplicadas');
    q.options.forEach((o, i) => checkMath(`${where} [opción ${i}]`, o));
  } else if (q.type === 'num') {
    q.fields.forEach((f, i) => {
      if (typeof f.answer !== 'number' || Number.isNaN(f.answer)) fail(where, `campo ${i} sin respuesta numérica`);
      checkMath(`${where} [campo ${i}]`, f.label);
      // La respuesta exacta tecleada como decimal con 6 cifras debe aceptarse
      const typed = isFinite(f.answer) ? f.answer.toFixed(6) : String(f.answer);
      if (isFinite(f.answer) && !P.checkField(f, typed).ok) fail(where, `campo ${i}: no acepta su propia respuesta ${typed}`);
      // Y una respuesta claramente errónea no
      if (isFinite(f.answer) && P.checkField(f, String(f.answer + 1 + Math.abs(f.answer) * 0.1)).ok) fail(where, `campo ${i}: acepta una respuesta incorrecta`);
    });
  } else if (q.type !== 'open') fail(where, `tipo desconocido ${q.type}`);
}

// Generadores
for (const id of Object.keys(P.gens)) {
  for (let s = 1; s <= N; s++) {
    let q;
    try { q = P.makeGen(id, s * 7919); }
    catch (e) { fail(`${id}#${s}`, `excepción: ${e.message}`); continue; }
    checkQuestion(`${id}#${s}`, q);
    if (s <= 3) { try { P.chart(q); } catch (e) { fail(id, 'chart: ' + e.message); } }
  }
}

// Contenido estático
for (const sid of P.subjectOrder) {
  const s = P.subjects[sid];
  for (const t of P.allTopics(sid)) {
    checkMath(`${sid}/${t.id} [teoría]`, t.theory);
    (t.gens || []).forEach((g) => { if (!P.gens[g]) fail(`${sid}/${t.id}`, `generador inexistente ${g}`); });
    (t.questions || []).forEach((q) => checkQuestion(q.id, q));
    (t.problems || []).forEach((q) => checkQuestion(q.id, q));
  }
  // Las ranuras del simulacro deben poder rellenarse
  s.exam.slots.forEach((sl, i) => {
    let topics = P.allTopics(sid);
    if (sl.topics) topics = sl.topics.map((x) => s.topics[x]);
    else if (sl.blocks) topics = s.blocks.filter((b) => sl.blocks.includes(b.id)).flatMap((b) => b.topics);
    if (topics.some((x) => !x)) fail(`${sid} slot ${i}`, 'tema inexistente');
    const hasStatic = topics.some((x) => (x.problems || []).some((p) => (sl.kind === 'teoria' ? p.kind === 'teoria' : p.kind !== 'teoria')));
    const hasGen = topics.some((x) => (x.gens || []).length);
    if (sl.kind === 'teoria' ? !hasStatic : !(hasStatic || hasGen)) fail(`${sid} slot ${i}`, 'no hay preguntas para esta ranura');
  });
}

// Parser
const cases = [['3/4', 0.75], ['-2,5', -2.5], ['1.25', 1.25], ['e^2', Math.E ** 2], ['sqrt(2)', Math.SQRT2], ['2pi', 2 * Math.PI], ['12.500', 12500], ['1.234,5', 1234.5], ['−3', -3], ['e^(-2)', Math.exp(-2)], ['√9', 3], ['10 €', 10], ['2·3', 6]];
cases.forEach(([inp, exp]) => { const v = P.parseExpr(inp); if (Math.abs(v - exp) > 1e-9) fail('parseExpr', `${inp} → ${v}, esperado ${exp}`); });
if (!Number.isNaN(P.parseExpr('2+'))) fail('parseExpr', '"2+" debería ser inválido');
if (!P.checkField({ answer: 1 / 3 }, '0,33').ok) fail('checkField', '0,33 debería aceptarse para 1/3');
if (P.checkField({ answer: 100 }, '100,4').ok) fail('checkField', '100,4 no debería aceptarse para 100');
if (!P.checkField({ answer: 1 / 3 }, '1/3').ok) fail('checkField', '1/3 exacto');

// Normal: comprobación de la tabla
[[0, 0.5], [1, 0.8413], [1.96, 0.975], [1.25, 0.8944], [-1.25, 0.1056], [2.575, 0.995]].forEach(([z, p]) => {
  if (Math.abs(P.Phi(z) - p) > 1e-4) fail('Phi', `Phi(${z}) = ${P.Phi(z)}`);
});

console.log(`\n${checked} preguntas comprobadas (${Object.keys(P.gens).length} generadores × ${N}), ${mathChecked} fórmulas LaTeX validadas.`);
if (errors) { console.error(`\n${errors} errores`); process.exit(1); }
console.log('✓ Todo correcto');
