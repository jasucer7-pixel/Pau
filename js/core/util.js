/* Utilidades compartidas: RNG con semilla, fracciones exactas, formato,
   parser de expresiones seguro y ayudas para LaTeX. */
window.PAU = window.PAU || {};
(function (P) {
  'use strict';

  // ---------- RNG reproducible (mulberry32) ----------
  function rng(seed) {
    let a = seed >>> 0;
    const r = function () {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    r.int = (lo, hi) => lo + Math.floor(r() * (hi - lo + 1));
    r.nz = (lo, hi) => { let v; do { v = r.int(lo, hi); } while (v === 0); return v; };
    r.pick = (arr) => arr[Math.floor(r() * arr.length)];
    r.sign = () => (r() < 0.5 ? -1 : 1);
    r.shuffle = (arr) => {
      const a2 = arr.slice();
      for (let i = a2.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a2[i], a2[j]] = [a2[j], a2[i]];
      }
      return a2;
    };
    r.step = (lo, hi, step) => lo + step * r.int(0, Math.round((hi - lo) / step));
    return r;
  }
  const newSeed = () => Math.floor(Math.random() * 2147483647) + 1;

  // ---------- Fracciones exactas ----------
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
  class Fr {
    constructor(n, d = 1) {
      if (n instanceof Fr) { d = n.d; n = n.n; }
      if (d === 0) throw new Error('División por cero');
      if (d < 0) { n = -n; d = -d; }
      const g = gcd(n, d) || 1;
      this.n = n / g; this.d = d / g;
    }
    static of(x) { return x instanceof Fr ? x : new Fr(x, 1); }
    add(o) { o = Fr.of(o); return new Fr(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { o = Fr.of(o); return new Fr(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { o = Fr.of(o); return new Fr(this.n * o.n, this.d * o.d); }
    div(o) { o = Fr.of(o); return new Fr(this.n * o.d, this.d * o.n); }
    neg() { return new Fr(-this.n, this.d); }
    abs() { return new Fr(Math.abs(this.n), this.d); }
    isZero() { return this.n === 0; }
    isInt() { return this.d === 1; }
    eq(o) { o = Fr.of(o); return this.n === o.n && this.d === o.d; }
    valueOf() { return this.n / this.d; }
    toString() { return this.d === 1 ? String(this.n) : `${this.n}/${this.d}`; }
    tex() {
      if (this.d === 1) return String(this.n);
      return (this.n < 0 ? '-' : '') + `\\frac{${Math.abs(this.n)}}{${this.d}}`;
    }
  }

  // ---------- Matrices (con fracciones) ----------
  const M = {
    map: (A, f) => A.map((row, i) => row.map((v, j) => f(v, i, j))),
    fr: (A) => A.map((row) => row.map((v) => Fr.of(v))),
    det(A) {
      A = M.fr(A);
      const n = A.length;
      if (n === 1) return A[0][0];
      if (n === 2) return A[0][0].mul(A[1][1]).sub(A[0][1].mul(A[1][0]));
      let s = new Fr(0);
      for (let j = 0; j < n; j++) {
        const minor = A.slice(1).map((r) => r.filter((_, k) => k !== j));
        const term = A[0][j].mul(M.det(minor));
        s = j % 2 ? s.sub(term) : s.add(term);
      }
      return s;
    },
    minor(A, i, j) { return A.filter((_, r) => r !== i).map((row) => row.filter((_, c) => c !== j)); },
    cof(A, i, j) { const d = M.det(M.minor(A, i, j)); return (i + j) % 2 ? d.neg() : d; },
    inv(A) {
      const d = M.det(A);
      if (d.isZero()) return null;
      const n = A.length;
      if (n === 2) {
        const B = M.fr(A);
        return [[B[1][1].div(d), B[0][1].neg().div(d)], [B[1][0].neg().div(d), B[0][0].div(d)]];
      }
      const res = [];
      for (let i = 0; i < n; i++) { res.push([]); for (let j = 0; j < n; j++) res[i].push(M.cof(A, j, i).div(d)); }
      return res;
    },
    mul(A, B) {
      A = M.fr(A); B = M.fr(B);
      return A.map((row) => B[0].map((_, j) => row.reduce((s, v, k) => s.add(v.mul(B[k][j])), new Fr(0))));
    },
    tex(A, env = 'pmatrix') {
      return `\\begin{${env}}` + A.map((r) => r.map((v) => Fr.of(v).tex()).join(' & ')).join(' \\\\ ') + `\\end{${env}}`;
    },
  };

  // ---------- Formato numérico en español ----------
  function round(x, dec = 2) { const f = Math.pow(10, dec); return Math.round((x + Number.EPSILON * Math.sign(x)) * f) / f; }
  // fmt(1234.5, 2) -> "1.234,5"
  function fmt(x, dec = 2, opts = {}) {
    if (!isFinite(x)) return x > 0 ? '∞' : '−∞';
    const r = round(x, dec);
    let s = Math.abs(r).toFixed(dec);
    if (!opts.fixed && s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
    let [int, frac] = s.split('.');
    if (opts.thousands !== false && int.length > 4) int = int.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return (r < 0 ? '−' : '') + int + (frac ? ',' + frac : '');
  }
  // versión para dentro de LaTeX: coma decimal sin espacio y miles con punto
  function fmtTex(x, dec = 2, opts = {}) {
    return fmt(x, dec, opts).replace('−', '-').replace(/,/g, '{,}').replace(/\./g, '.\\!');
  }
  const eur = (x, dec = 2) => fmt(x, dec) + ' €';
  const pct = (x, dec = 2) => fmt(x, dec) + ' %';

  // ---------- Ayudas LaTeX ----------
  // Polinomio a partir de coeficientes [a_n, ..., a_0]
  function polyTex(coefs, v = 'x') {
    const n = coefs.length - 1;
    let out = '';
    coefs.forEach((c0, i) => {
      const c = Fr.of(c0);
      if (c.isZero()) return;
      const p = n - i;
      const neg = c.n < 0;
      const a = c.abs();
      let coefStr = a.tex();
      if (p > 0 && a.eq(1)) coefStr = '';
      const varStr = p === 0 ? '' : p === 1 ? v : `${v}^{${p}}`;
      const term = coefStr + varStr;
      if (out === '') out = (neg ? '-' : '') + term;
      else out += (neg ? ' - ' : ' + ') + term;
    });
    return out || '0';
  }
  // Combinación lineal: lin([[2,'x'],[-1,'y'],[3,'']])
  function linTex(terms) {
    let out = '';
    terms.forEach(([c0, v]) => {
      const c = Fr.of(c0);
      if (c.isZero()) return;
      const neg = c.n < 0, a = c.abs();
      const coef = v && a.eq(1) ? '' : a.tex();
      const t = coef + (v || '');
      out += out === '' ? (neg ? '-' : '') + t : (neg ? ' - ' : ' + ') + t;
    });
    return out || '0';
  }
  // Número con signo para sumar: sgn(3) -> "+ 3", sgn(-3) -> "- 3"
  const sgn = (x) => { const f = Fr.of(x); return f.n < 0 ? `- ${f.abs().tex()}` : `+ ${f.tex()}`; };
  // Entre paréntesis si es negativo
  const par = (x) => { const f = Fr.of(x); return f.n < 0 ? `(${f.tex()})` : f.tex(); };
  const vecTex = (v) => `(${v.map((x) => Fr.of(x).tex()).join(',\\ ')})`;

  // ---------- Parser de expresiones (seguro, sin eval) ----------
  // Acepta: 3/4, -2,5, 1.25, 2^3, sqrt(2), √2, pi, π, e, ln(), log(), sin, cos, tan, %, ∞
  function parseExpr(input, opts = {}) {
    if (input == null) return NaN;
    let s = String(input).trim().toLowerCase();
    if (!s) return NaN;
    s = s.replace(/−/g, '-').replace(/·|×/g, '*').replace(/÷/g, '/').replace(/\s+/g, '');
    s = s.replace(/€|euros?|unidades|uds?\.?|años?|días?|dias?/g, '');
    if (/^[+-]?(inf|infinito|∞)$/.test(s)) return s.startsWith('-') ? -Infinity : Infinity;
    // Separador de miles español: 12.500 (solo si encaja exactamente)
    if (!opts.noThousands && /^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
    s = s.replace(/,/g, '.');
    let pos = 0;
    const peek = () => s[pos];
    const eat = (ch) => { if (s[pos] === ch) { pos++; return true; } return false; };
    const funcs = {
      sqrt: Math.sqrt, raiz: Math.sqrt, ln: Math.log, log: Math.log10, exp: Math.exp,
      sin: Math.sin, sen: Math.sin, cos: Math.cos, tan: Math.tan, tg: Math.tan, abs: Math.abs,
    };
    function expr() {
      let v = term();
      for (;;) {
        if (eat('+')) v += term();
        else if (eat('-')) v -= term();
        else return v;
      }
    }
    function term() {
      let v = factor();
      for (;;) {
        if (eat('*')) v *= factor();
        else if (eat('/')) v /= factor();
        else if (peek() && /[a-zπ√(]/.test(peek())) v *= factor(); // multiplicación implícita: 2pi, 3sqrt(2)
        else return v;
      }
    }
    function factor() {
      if (eat('-')) return -factor();
      if (eat('+')) return factor();
      let base = power();
      if (eat('^')) return Math.pow(base, factor());
      return base;
    }
    function power() {
      let v;
      if (eat('(')) { v = expr(); if (!eat(')')) throw new Error(')'); }
      else if (eat('√')) { v = Math.sqrt(power()); }
      else if (eat('π')) v = Math.PI;
      else if (/[0-9.]/.test(peek() || '')) {
        const m = s.slice(pos).match(/^\d*\.?\d+(e[+-]?\d+)?|^\d+\.?/);
        if (!m) throw new Error('num');
        pos += m[0].length; v = parseFloat(m[0]);
      } else if (/[a-z]/.test(peek() || '')) {
        const m = s.slice(pos).match(/^[a-z]+/)[0];
        const fn = Object.keys(funcs).sort((a, b) => b.length - a.length).find((f) => m.startsWith(f));
        if (fn && s[pos + fn.length] === '(') { pos += fn.length; eat('('); v = funcs[fn](expr()); if (!eat(')')) throw new Error(')'); }
        else if (m.startsWith('pi')) { pos += 2; v = Math.PI; }
        else if (m.startsWith('e')) { pos += 1; v = Math.E; }
        else throw new Error('id');
      } else throw new Error('tok');
      if (eat('%')) v /= 100;
      return v;
    }
    try {
      const v = expr();
      if (pos !== s.length) return NaN;
      return v;
    } catch (e) { return NaN; }
  }
  // Nº de decimales escritos por el alumno (para tolerancia automática)
  function typedDecimals(input) {
    const s = String(input).trim().replace(/−/g, '-');
    if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) return 0;
    const m = s.match(/^-?\d*[.,](\d+)$/);
    return m ? m[1].length : 0;
  }

  // Comprueba un campo numérico
  function checkField(field, input) {
    // "3.385" es ambiguo (3385 con punto de miles o 3,385 con punto decimal): se prueban ambas lecturas
    const s0 = String(input).trim().replace(/−/g, '-');
    if (/^-?\d{1,3}\.\d{3}$/.test(s0)) {
      const alt = checkField(field, s0.replace('.', ','));
      if (alt.ok) return alt;
    }
    const v = parseExpr(input);
    if (Number.isNaN(v)) return { ok: false, invalid: true };
    const targets = [field.answer].concat(field.alt || []);
    for (const t of targets) {
      const tv = +t;
      if (!isFinite(tv) || !isFinite(v)) { if (tv === v) return { ok: true, value: v }; continue; }
      let tol = field.tol;
      if (tol == null) {
        const k = typedDecimals(input);
        tol = k >= 2 ? Math.pow(10, -k) * 1.0001 : 1e-9 * Math.max(1, Math.abs(tv));
        if (k === 1 && Math.abs(tv) >= 10) tol = 0.05 * 1.0001; // 12,3 para 12,34
      }
      if (field.rel && Math.abs(v - tv) <= field.rel * Math.abs(tv)) return { ok: true, value: v };
      if (Math.abs(v - tv) <= tol) return { ok: true, value: v };
    }
    return { ok: false, value: v };
  }

  // ---------- Probabilidad: normal estándar ----------
  function erf(x) {
    // Abramowitz-Stegun 7.1.26 mejorada con serie para precisión ~1e-12
    const t = 1 / (1 + 0.5 * Math.abs(x));
    const y = 1 - t * Math.exp(-x * x - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 +
      t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return x >= 0 ? y : -y;
  }
  const Phi = (z) => 0.5 * (1 + erf(z / Math.SQRT2));
  const comb = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return Math.round(r); };

  // ---------- Varios ----------
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

  Object.assign(P, {
    rng, newSeed, gcd, Fr, M, round, fmt, fmtTex, eur, pct, polyTex, linTex, sgn, par, vecTex,
    parseExpr, checkField, typedDecimals, erf, Phi, comb, esc, today, T: String.raw,
  });
})(window.PAU);
