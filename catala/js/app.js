/* Endavant · català A2 — aplicació (sense dependències). */
(function () {
  'use strict';

  // ---------- Utilitats ----------
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  var sample = function (a, n) { return shuffle(a).slice(0, n); };
  var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
  var today = function () { var d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); };
  var pct = function (a, b) { return b ? Math.round(a / b * 100) : 0; };
  var app = $('#app');

  var IC = {
    spk: '<svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
    stop: '<svg viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>',
    mic: '<svg viewBox="0 0 24 24"><path d="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    cards: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="13" height="15" rx="2"/><path d="M8 3h11a2 2 0 0 1 2 2v13"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2 2 2 0 0 0 2 2h13"/></svg>',
    read: '<svg viewBox="0 0 24 24"><path d="M2 5h7a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H2zM22 5h-7a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h8z"/></svg>',
    ear: '<svg viewBox="0 0 24 24"><path d="M6 9a6 6 0 1 1 12 0c0 4-4 5-4 9a3 3 0 0 1-6 0"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0"/></svg>',
    pen: '<svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    type: '<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></svg>',
    verb: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h7"/><path d="M17 15l3 3-3 3"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="M5 12l5 5L20 7"/></svg>',
    wave: '<svg viewBox="0 0 24 24"><path d="M2 12h2M6 8v8M10 5v14M14 8v8M18 10v4M22 12h0"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M15 18l-6-6 6-6"/></svg>'
  };

  // ---------- Estat i progrés ----------
  var KEY = 'endavant-a2-v1';
  function defaults() {
    return { xp: 0, days: {}, act: { d: 0, k: {} }, srs: {}, newDay: { d: 0, n: 0 }, gram: {}, read: {}, listen: {}, dict: 0, write: {}, speak: {},
      verbs: { ok: 0, total: 0 }, exams: [], utest: {}, vdone: {}, dictDone: false, pronDone: false, set: { rate: 0.95, voice: '', theme: '', dir: 'es-ca', goal: 40, newPerDay: 10, autoSay: true } };
  }
  var S = load();
  function load() {
    var d = defaults();
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) { var o = JSON.parse(raw); var s = Object.assign(d, o); s.set = Object.assign(defaults().set, o.set || {}); return s; }
    } catch (e) {}
    return d;
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  function act(kind) { var t = today(); if (S.act.d !== t) S.act = { d: t, k: {} }; S.act.k[kind] = true; save(); }
  function did(kind) { return S.act.d === today() && !!S.act.k[kind]; }
  function addXP(n, kind) {
    if (n > 0) { S.xp += n; var t = today(); S.days[t] = (S.days[t] || 0) + n; }
    if (kind) act(kind); else save();
    topStats();
  }
  function streak() { var n = 0, d = today(); if (!S.days[d]) d--; while (S.days[d] > 0) { n++; d--; } return n; }
  function xpToday() { return S.days[today()] || 0; }

  // Paraules i repàs espaiat (caixes de Leitner)
  var WORDS = [];
  CA.vocab.forEach(function (t) { t.words.forEach(function (w) { WORDS.push({ id: t.id + '|' + w[0], theme: t.id, ca: w[0], es: w[1], note: w[2] || '' }); }); });
  var INT = [0, 1, 3, 7, 14, 30, 60];
  function gradeWord(id, g) {
    var t = today(), s = S.srs[id];
    if (!s) { if (S.newDay.d !== t) S.newDay = { d: t, n: 0 }; S.newDay.n++; s = { b: 0, d: t }; }
    if (g === 0) { s.b = 0; s.d = t; } else if (g === 1) { s.b = Math.max(1, s.b); s.d = t + 1; } else { s.b = Math.min(INT.length - 1, s.b + 1); s.d = t + INT[s.b]; }
    S.srs[id] = s; save();
  }
  var learned = function (w) { var s = S.srs[w.id]; return s && s.b >= 2; };
  var level = function (w) { var s = S.srs[w.id]; return !s ? 0 : s.b >= 4 ? 3 : s.b >= 2 ? 2 : 1; };
  function dueWords() { var t = today(); return WORDS.filter(function (w) { var s = S.srs[w.id]; return s && s.d <= t; }).sort(function (a, b) { return S.srs[a.id].d - S.srs[b.id].d; }); }
  function newLeft() { return Math.max(0, S.set.newPerDay - (S.newDay.d === today() ? S.newDay.n : 0)); }
  function newWords(n, theme) { return WORDS.filter(function (w) { return !S.srs[w.id] && (!theme || w.theme === theme); }).slice(0, n); }

  // ---------- Comparació de respostes ----------
  function norm(s) {
    return String(s).toLowerCase().normalize('NFC')
      .replace(/[’‘´`]/g, "'").replace(/l\s*[.•·∙]\s*l/g, 'l·l')
      .replace(/[¿¡!?.,;:«»"“”()…]/g, ' ').replace(/\s*'\s*/g, "'").replace(/\s*-\s*/g, '-').replace(/\s+/g, ' ').trim();
  }
  function noAcc(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function check(input, answers) {
    var u = norm(input); if (!u) return 'bad';
    for (var i = 0; i < answers.length; i++) if (u === norm(answers[i])) return 'ok';
    for (var j = 0; j < answers.length; j++) if (noAcc(u) === noAcc(norm(answers[j]))) return 'near';
    return 'bad';
  }
  // Variants acceptades d'una paraula: alternatives, parèntesis opcionals, amb o sense article
  function variants(ca) {
    var out = [ca];
    ca.split(' / ').forEach(function (v) {
      var a = v.replace(/\s*\([^)]*\)/g, '').trim(), b = v.replace(/[()]/g, '').trim();
      [a, b].forEach(function (x) {
        out.push(x);
        var m = x.match(/^(el|la|els|les|un|una|uns|unes)\s+(.+)$/) || x.match(/^(l')(.+)$/);
        if (m) out.push(m[2]);
      });
    });
    return out.filter(function (x, i) { return x && out.indexOf(x) === i; });
  }
  var sayable = function (s) { return s.replace(/ \/ /g, ', '); };

  // ---------- Veu (síntesi i reconeixement) ----------
  var isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var TTS = {
    ok: 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function',
    all: [], voices: [], token: 0, lastCancel: 0, started: false, cur: null,
    load: function () {
      if (!this.ok) return;
      try { this.all = speechSynthesis.getVoices() || []; } catch (e) { this.all = []; }
      this.voices = this.all.filter(function (v) { return /^ca([-_]|$)/i.test(v.lang); });
    },
    // none: el navegador no té veu · ca: veu catalana · other: només altres idiomes · unknown: el navegador no en llista cap
    status: function () { return !this.ok ? 'none' : this.voices.length ? 'ca' : this.all.length ? 'other' : 'unknown'; },
    // Sense veu catalana, millor sentir-ho amb una veu castellana que no sentir res
    fallback: function () {
      var a = this.all;
      return a.filter(function (v) { return /^es[-_]ES/i.test(v.lang); })[0] || a.filter(function (v) { return /^es/i.test(v.lang); })[0] || a.filter(function (v) { return v['default']; })[0] || a[0] || null;
    },
    voice: function () { var n = S.set.voice; return this.all.filter(function (v) { return v.name === n; })[0] || this.voices[0] || this.fallback(); },
    // Chrome talla els textos llargs: es llegeixen frase a frase
    chunks: function (t) {
      var parts = String(t).replace(/\s+/g, ' ').trim().match(/[^.!?…:;]+[.!?…:;]*\s*/g) || [t], out = [], cur = '';
      parts.forEach(function (p) { if ((cur + p).length > 160 && cur) { out.push(cur.trim()); cur = p; } else cur += p; });
      if (cur.trim()) out.push(cur.trim());
      return out;
    },
    speak: function (text, o) {
      o = o || {}; var self = this, tok = this.token;
      return new Promise(function (res) {
        if (!self.ok || !text) return res();
        var parts = self.chunks(text), i = 0, v = o.voice || self.voice();
        var one = function () {
          if (tok !== self.token || i >= parts.length) return res();
          var u = new SpeechSynthesisUtterance(parts[i++]), done = false, safe;
          var fin = function () { if (done) return; done = true; clearTimeout(safe); setTimeout(one, 0); };
          if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'ca-ES';
          u.rate = o.rate || S.set.rate; u.pitch = o.pitch || 1;
          u.onstart = function () { self.started = true; };
          u.onend = fin; u.onerror = fin;
          safe = setTimeout(fin, 4000 + u.text.length * 110 / u.rate);
          self.cur = u; // Safari esborra l'enunciat si no se'n guarda cap referència
          try { speechSynthesis.resume(); speechSynthesis.speak(u); } catch (e) { fin(); }
        };
        // Chrome ignora un speak() fet just després de cancel(); a iOS s'ha de fer dins del mateix toc
        if (!isIOS && Date.now() - self.lastCancel < 160) setTimeout(one, 160); else one();
      });
    },
    stop: function () {
      this.token++;
      if (!this.ok) return;
      try { if (speechSynthesis.speaking || speechSynthesis.pending) { speechSynthesis.cancel(); this.lastCancel = Date.now(); } } catch (e) {}
    },
    // Reprodueix i, si en 2,5 s no ha començat a sonar, explica què pot passar
    play: function (text, o) {
      var self = this;
      if (!this.ok) { toast('Este navegador no puede leer en voz alta. Abre la web en Chrome o Safari.'); return Promise.resolve(); }
      this.stop(); this.started = false;
      var tok = this.token;
      setTimeout(function () { if (!self.started && tok === self.token) toast(self.status() === 'ca' ? '¿No suena? Sube el volumen y quita el modo silencio.' : '¿No suena? Mira Ajustos → Àudio.'); }, 2500);
      return this.speak(text, o);
    },
    // Diàlegs: una veu diferent per personatge si n'hi ha; si no, canvia el to
    dialog: function (lines, rate, onLine) {
      this.stop(); this.started = false;
      var self = this, tok = this.token, vs = this.voices.length ? this.voices : [this.voice()];
      var cfg = { A: { voice: vs[0], pitch: 1 }, B: { voice: vs[1] || vs[0], pitch: vs[1] ? 1 : 0.75 }, C: { voice: vs[2] || vs[0], pitch: vs[2] ? 1 : 1.25 } };
      var i = 0;
      if (!this.ok) toast('Este navegador no puede leer en voz alta. Abre la web en Chrome o Safari.');
      else setTimeout(function () { if (!self.started && tok === self.token) toast('¿No suena? Mira Ajustos → Àudio.'); }, 3000);
      return new Promise(function (res) {
        (function next() {
          if (tok !== self.token || i >= lines.length) { if (onLine) onLine(-1); return res(); }
          var l = lines[i], c = cfg[l[0]] || cfg.A; if (onLine) onLine(i);
          self.speak(l[1], { voice: c.voice, pitch: c.pitch, rate: rate }).then(function () { i++; if (tok === self.token) setTimeout(next, 380); else next(); });
        })();
      });
    }
  };
  function audioNote() {
    var s = TTS.status(), msg = {
      none: '<b>Este navegador no puede reproducir voz.</b> Si has abierto la web desde otra app (por ejemplo, Claude en Android), ábrela en Chrome o Safari.',
      other: '<b>No hay voz catalana en este dispositivo.</b> Se usará una voz en castellano, con pronunciación aproximada. Para oír catalán de verdad, instálala: <a href="#ajustos">cómo hacerlo</a>.',
      unknown: '<b>¿No se oye nada?</b> Sube el volumen, quita el modo silencio y comprueba la voz en <a href="#ajustos">Ajustos</a>.'
    }[s];
    return '<div class="audio-note"' + (msg ? '' : ' hidden') + '><div class="note warn">' + (msg || '') + '</div></div>';
  }
  function refreshAudioNotes() { $$('.audio-note').forEach(function (n) { var x = document.createElement('div'); x.innerHTML = audioNote(); n.parentNode.replaceChild(x.firstChild, n); }); }
  if (TTS.ok) {
    TTS.load();
    var onVoices = function () { TTS.load(); refreshAudioNotes(); };
    try { speechSynthesis.addEventListener('voiceschanged', onVoices); } catch (e) { speechSynthesis.onvoiceschanged = onVoices; }
    setTimeout(onVoices, 1200);
  }
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function recognize(continuous, onText) {
    return new Promise(function (res, rej) {
      if (!SR) return rej('no');
      var r = new SR(), all = [];
      r.lang = 'ca-ES'; r.interimResults = !!continuous; r.continuous = !!continuous; r.maxAlternatives = 3;
      r.onresult = function (e) {
        if (!continuous) { res(Array.prototype.map.call(e.results[0], function (x) { return x.transcript; })); return; }
        var txt = ''; for (var i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript + ' ';
        all = [txt]; if (onText) onText(txt);
      };
      r.onerror = function (e) { rej(e.error || 'error'); };
      r.onend = function () { res(all); };
      try { r.start(); } catch (e) { rej('no'); }
      recognize.current = r;
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); TTS.play(b.getAttribute('data-say'), b.hasAttribute('data-slow') ? { rate: 0.7 } : {}); }
  });
  var sayBtn = function (t, label) { return '<button type="button" class="say" data-say="' + esc(sayable(t)) + '" aria-label="' + (label || 'Escolta') + '" title="Escolta">' + IC.spk + '</button>'; };

  // ---------- Interfície comuna ----------
  var keyHandler = null, timers = [];
  document.addEventListener('keydown', function (e) { if (keyHandler) keyHandler(e); });
  function clearTimers() { timers.forEach(function (t) { clearInterval(t); }); timers = []; }
  var toastT;
  function toast(msg) { var t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, 2200); }
  function head(title, sub, back) {
    return '<div class="head">' + (back ? '<a class="back" href="#' + back[0] + '">' + IC.back + esc(back[1]) + '</a>' : '') +
      '<h1>' + title + '</h1>' + (sub ? '<p class="muted">' + sub + '</p>' : '') + '</div>';
  }
  function bar(p, cls) { return '<div class="bar ' + (cls || '') + '"><i style="width:' + Math.max(0, Math.min(100, p)) + '%"></i></div>'; }
  function scorePill(p) { if (p == null) return '<span class="pill">Pendent</span>'; return '<span class="pill ' + (p >= 80 ? 'ok' : p >= 50 ? 'near' : 'bad') + '">' + p + ' %</span>'; }
  function topStats() {
    var el = $('#top-stats'); if (!el) return;
    var s = streak();
    el.innerHTML = '<span class="chip" title="Dies seguits practicant"><span class="dot"></span>' + s + (s === 1 ? ' dia' : ' dies') + '</span>' +
      '<span class="chip num" title="Punts d\'avui">' + xpToday() + ' / ' + S.set.goal + ' XP</span>';
  }
  function gapify(q) { return esc(q).replace(/___/g, '<span class="gap">&nbsp;</span>'); }
  function fillGaps(q, ans) {
    var n = (q.match(/___/g) || []).length, parts = String(ans).split(' / ');
    if (n > 1 && parts.length === n) { var i = 0; return q.replace(/___/g, function () { return parts[i++]; }); }
    return q.replace('___', ans);
  }

  // ---------- Motor d'exercicis (un per un) ----------
  var ACC = ['à', 'è', 'é', 'í', 'ï', 'ò', 'ó', 'ú', 'ü', 'ç', 'l·l', "'"];
  function runQuiz(el, items, o) {
    o = o || {};
    var i = 0, score = 0, log = [];
    function render() {
      var it = items[i], answered = false;
      el.innerHTML = '<div class="quiz">' +
        '<div class="qhead"><span class="num">' + (i + 1) + ' / ' + items.length + '</span>' + bar(i / items.length * 100) + '</div>' +
        '<div class="prompt">' + it.prompt + '</div>' + (it.hint ? '<p class="hint">' + it.hint + '</p>' : '') +
        '<div class="qbody"></div><div class="qfb"></div>' +
        '<div class="row"><span class="spacer"></span><button type="button" class="btn pri" data-next hidden>' + (i + 1 < items.length ? 'Següent' : 'Veure resultat') + '</button></div></div>';
      var body = $('.qbody', el), fb = $('.qfb', el), nextB = $('[data-next]', el);
      nextB.onclick = next;
      function done(res, given) {
        answered = true;
        score += res === 'ok' ? 1 : res === 'near' ? 0.5 : 0;
        log.push({ it: it, res: res, given: given });
        var gapEl = $('.gap', el); if (gapEl && it.fill) { gapEl.textContent = it.fill; gapEl.style.color = res === 'ok' ? 'var(--ok)' : res === 'near' ? 'var(--near)' : 'var(--bad)'; }
        var msg = res === 'ok' ? 'Molt bé!' : res === 'near' ? 'Gairebé! Revisa els accents.' : 'No és correcte.';
        var sub = res === 'ok' ? '' : '<span class="sub">Resposta: <span class="ca">' + esc(it.show) + '</span></span>';
        fb.innerHTML = '<div class="fb ' + res + '">' + msg + sub + (it.note ? '<span class="sub">' + esc(it.note) + '</span>' : '') + '</div>';
        if (o.onAnswer) o.onAnswer(it, res);
        if (it.say && S.set.autoSay) { TTS.stop(); TTS.speak(it.say); }
        nextB.hidden = false; nextB.focus();
      }
      if (it.kind === 'choice') {
        var opts = shuffle(it.options);
        body.innerHTML = '<div class="opts">' + opts.map(function (op, k) { return '<button type="button" class="opt" data-k="' + k + '"><kbd>' + (k + 1) + '</kbd><span>' + esc(op) + '</span></button>'; }).join('') + '</div>';
        var choose = function (k) {
          if (answered) return;
          var op = opts[k], ok = it.answers.indexOf(op) >= 0;
          $$('.opt', body).forEach(function (b, j) { b.disabled = true; if (it.answers.indexOf(opts[j]) >= 0) b.classList.add('ok'); else if (j === k) b.classList.add('bad'); });
          done(ok ? 'ok' : 'bad', op);
        };
        $$('.opt', body).forEach(function (b) { b.onclick = function () { choose(+b.getAttribute('data-k')); }; });
        keyHandler = function (e) {
          if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
          var n = parseInt(e.key, 10); if (!answered && n >= 1 && n <= opts.length) choose(n - 1);
          else if (answered && e.key === 'Enter') { e.preventDefault(); next(); }
        };
      } else if (it.kind === 'text') {
        body.innerHTML = '<div class="stack" style="gap:10px"><input type="text" id="quiz-in" class="answer-in" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Escriu la resposta…" aria-label="Resposta">' +
          '<div class="row"><div class="accents" aria-label="Accents">' + ACC.map(function (a) { return '<button type="button" tabindex="-1">' + a + '</button>'; }).join('') + '</div><span class="spacer"></span><button type="button" class="btn" data-check>Comprova</button></div></div>';
        var inp = $('#quiz-in', el);
        $$('.accents button', body).forEach(function (b) {
          b.onmousedown = function (e) { e.preventDefault(); };
          b.onclick = function () { var s = inp.selectionStart || inp.value.length, en = inp.selectionEnd || s; inp.value = inp.value.slice(0, s) + b.textContent + inp.value.slice(en); inp.focus(); inp.setSelectionRange(s + b.textContent.length, s + b.textContent.length); };
        });
        var go = function () { if (answered || !inp.value.trim()) return; var r = check(inp.value, it.answers); inp.classList.add(r); inp.readOnly = true; $('[data-check]', body).disabled = true; done(r, inp.value); };
        $('[data-check]', body).onclick = go;
        keyHandler = function (e) { if (e.key === 'Enter') { e.preventDefault(); if (!answered) go(); else next(); } };
        setTimeout(function () { inp.focus(); }, 30);
      } else if (it.kind === 'order') {
        var pool = shuffle(it.words.map(function (w, k) { return { w: w, k: k }; })), chosen = [];
        body.innerHTML = '<div class="stack" style="gap:10px"><div class="words target" aria-label="La teva frase"></div><div class="words pool"></div><div class="row"><button type="button" class="btn ghost sm" data-clear>Esborra</button><span class="spacer"></span><button type="button" class="btn" data-check>Comprova</button></div></div>';
        var tgt = $('.target', body), pl = $('.pool', body);
        var draw = function () {
          tgt.innerHTML = chosen.map(function (c, j) { return '<button type="button" class="word" data-j="' + j + '">' + esc(c.w) + '</button>'; }).join('');
          pl.innerHTML = pool.filter(function (c) { return chosen.indexOf(c) < 0; }).map(function (c) { return '<button type="button" class="word" data-k="' + c.k + '">' + esc(c.w) + '</button>'; }).join('');
          $$('.word', tgt).forEach(function (b) { b.onclick = function () { if (!answered) { chosen.splice(+b.getAttribute('data-j'), 1); draw(); } }; });
          $$('.word', pl).forEach(function (b) { b.onclick = function () { if (!answered) { chosen.push(pool.filter(function (c) { return c.k === +b.getAttribute('data-k'); })[0]); draw(); } }; });
        };
        draw();
        $('[data-clear]', body).onclick = function () { if (!answered) { chosen = []; draw(); } };
        var goO = function () { if (answered || !chosen.length) return; var txt = chosen.map(function (c) { return c.w; }).join(' '); $('[data-check]', body).disabled = true; done(check(txt, it.answers), txt); };
        $('[data-check]', body).onclick = goO;
        keyHandler = function (e) { if (e.key === 'Enter' && answered) { e.preventDefault(); next(); } };
      }
    }
    function next() { TTS.stop(); i++; if (i < items.length) render(); else finish(); }
    function finish() {
      keyHandler = null;
      var p = pct(score, items.length);
      if (o.onFinish) o.onFinish(p, score, log);
      var wrong = log.filter(function (l) { return l.res !== 'ok'; });
      el.innerHTML = '<div class="result"><div class="big">' + p + ' %</div><p class="muted">' + (score % 1 ? score.toFixed(1) : score) + ' de ' + items.length + ' · ' +
        (p >= 90 ? 'Excel·lent!' : p >= 70 ? 'Molt bé, continua així.' : p >= 50 ? 'Bé, però repassa els errors.' : 'Torna a llegir l\'explicació i repeteix.') + '</p>' +
        '<div class="row" style="justify-content:center"><button type="button" class="btn pri" data-again>Repeteix</button>' + (o.nextHref ? '<a class="btn" href="' + o.nextHref[0] + '">' + esc(o.nextHref[1]) + '</a>' : '') + '</div></div>' +
        (wrong.length ? '<div class="panel flat"><h3>Per repassar</h3><div class="list">' + wrong.map(function (l) {
          return '<div class="li"><div class="grow"><div>' + l.it.prompt.replace(/<span class="gap">[\s\S]*?<\/span>/g, '___') + '</div><div class="es">Has posat: ' + esc(l.given || '—') + ' · Correcte: <span class="ca">' + esc(l.it.show) + '</span></div></div>' + (l.it.say ? sayBtn(l.it.say) : '') + '</div>';
        }).join('') + '</div></div>' : '');
      $('[data-again]', el).onclick = function () { if (o.again) o.again(); else { i = 0; score = 0; log = []; items = shuffle(items); render(); } };
    }
    if (!items.length) { el.innerHTML = '<p class="muted">No hi ha exercicis.</p>'; return; }
    render();
  }

  // ---------- Pregunta de test dins de formularis (lectures, examen) ----------
  function qsHtml(qs, prefix) {
    return qs.map(function (q, k) {
      return '<div class="q" data-q="' + prefix + k + '"><div class="qt">' + (k + 1) + '. ' + esc(q.q) + '</div><div class="opts">' +
        q.o.map(function (op) { return '<button type="button" class="opt" data-v="' + esc(op) + '">' + esc(op) + '</button>'; }).join('') + '</div></div>';
    }).join('');
  }
  function bindQs(root) {
    $$('.q .opt', root).forEach(function (b) {
      b.onclick = function () { if (b.disabled) return; $$('.opt', b.parentNode).forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); };
    });
  }
  function gradeQs(root, qs, prefix) {
    var ok = 0;
    qs.forEach(function (q, k) {
      var box = $('[data-q="' + prefix + k + '"]', root), sel = $('.opt.sel', box);
      $$('.opt', box).forEach(function (b) { b.disabled = true; var v = b.getAttribute('data-v'); if (v === q.a) b.classList.add('ok'); else if (b === sel) b.classList.add('bad'); });
      if (sel && sel.getAttribute('data-v') === q.a) ok++;
    });
    return ok;
  }

  // ---------- Router ----------
  var ROUTES = {};
  var GROUP = { inici: 'inici', curs: 'curs', unitat: 'curs', prova: 'curs', repas: 'repas', examen: 'examen', ajustos: 'ajustos' };
  function route() {
    TTS.stop(); clearTimers(); keyHandler = null;
    if (recognize.current) try { recognize.current.abort(); } catch (e) {}
    var h = decodeURIComponent(location.hash.replace(/^#\/?/, '')), k = h.indexOf('-');
    var sec = (k < 0 ? h : h.slice(0, k)) || 'inici', id = k < 0 ? '' : h.slice(k + 1);
    if (!ROUTES[sec]) { sec = 'inici'; id = ''; h = ''; }
    ROUTES[sec](id);
    var inUnit = unitChrome(h);
    var grp = inUnit ? 'curs' : GROUP[sec] || 'biblioteca';
    $$('[data-nav]').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-nav') === grp); });
    topStats();
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);

  // ========== CURS ==========
  var findId = function (list, id) { return list.filter(function (x) { return x.id === id; })[0]; };
  var TENSE_NAME = {}; CA.verbs.tenses.forEach(function (t) { TENSE_NAME[t.id] = t.name.toLowerCase(); });
  function stepInfo(st) {
    var k = st.split(':'), kind = k[0], id = k[1] || '', x;
    switch (kind) {
      case 'v': {
        x = findId(CA.vocab, id); var ws = WORDS.filter(function (w) { return w.theme === id; }), seen = ws.filter(function (w) { return S.srs[w.id]; }).length;
        return { hash: 'paraules-' + id, label: 'Paraules', ic: IC.cards, title: x.title, done: seen >= ws.length * 0.8, meta: seen + ' de ' + ws.length + ' estudiades' };
      }
      case 'g': x = findId(CA.grammar, id); return { hash: 'gramatica-' + id, label: 'Gramàtica', ic: IC.book, title: x.title, done: (S.gram[id] || 0) >= 80, meta: S.gram[id] != null ? 'Millor resultat: ' + S.gram[id] + ' %' : x.es };
      case 'verbs': {
        var ts = id.split('+');
        return { hash: 'verbs-entrena-' + ts.join('-'), label: 'Verbs', ic: IC.verb, title: 'Conjuga en ' + ts.map(function (t) { return TENSE_NAME[t]; }).join(', '), done: !!S.vdone[id], meta: '12 formes, cal un 70 %' };
      }
      case 'r': x = findId(CA.reading, id); return { hash: 'llegir-' + id, label: 'Lectura', ic: IC.read, title: x.title, done: (S.read[id] || 0) >= 60, meta: S.read[id] != null ? S.read[id] + ' %' : x.kind };
      case 'l': x = findId(CA.listening, id); return { hash: 'escoltar-' + id, label: 'Comprensió oral', ic: IC.ear, title: x.title, done: (S.listen[id] || 0) >= 60, meta: S.listen[id] != null ? S.listen[id] + ' %' : x.qs.length + ' preguntes' };
      case 'w': x = findId(CA.writing, id); return { hash: 'escriure-' + id, label: 'Expressió escrita', ic: IC.pen, title: x.title, done: !!(S.write[id] && S.write[id].done), meta: x.min + '–' + x.max + ' paraules' };
      case 's': x = findId(CA.speaking, id); return { hash: 'parlar-' + id, label: 'Expressió oral', ic: IC.mic, title: x.title, done: !!S.speak[id], meta: 'Monòleg de ' + Math.round(x.secs / 60 * 10) / 10 + ' min' };
      case 'rp': x = findId(CA.roleplay, id); return { hash: 'parlar-rol-' + id, label: 'Joc de rol', ic: IC.mic, title: x.title, done: !!S.speak['rol-' + id], meta: x.lines.length + ' intervencions' };
      case 'dictat': return { hash: 'dictat', label: 'Dictat', ic: IC.type, title: 'Dictat de 8 frases', done: !!S.dictDone, meta: 'Escolta i escriu' };
      case 'pronuncia': return { hash: 'pronuncia', label: 'Pronunciació', ic: IC.wave, title: 'Els sons del català', done: !!S.pronDone, meta: CA.pronunciation.length + ' grups de sons' };
      case 'examen': return { hash: 'examen', label: 'Simulacre', ic: IC.check, title: 'Simulacre d\'examen A2', done: S.exams.length > 0, meta: 'Les quatre parts' };
    }
  }
  function unitSteps(u) {
    var st = u.steps.map(stepInfo), t = S.utest[u.id];
    st.push({ hash: 'prova-' + u.id, label: 'Prova', ic: IC.check, title: 'Prova de la unitat', done: (t || 0) >= 70, meta: t != null ? 'Millor resultat: ' + t + ' %' : '10 preguntes, cal un 70 %' });
    return st;
  }
  function unitPct(u) { var st = unitSteps(u); return pct(st.filter(function (s) { return s.done; }).length, st.length); }
  function unitOf(hash) {
    for (var k = 0; k < CA.course.length; k++) {
      var st = unitSteps(CA.course[k]);
      for (var i = 0; i < st.length; i++) if (st[i].hash === hash) return { u: CA.course[k], n: k + 1, steps: st, i: i };
    }
    return null;
  }
  function currentUnit() { return CA.course.filter(function (u) { return unitPct(u) < 100; })[0] || CA.course[CA.course.length - 1]; }
  function nextStep(u) { var st = unitSteps(u); return st.filter(function (s) { return !s.done; })[0] || st[0]; }
  function stepRow(s, k) {
    return '<a href="#' + s.hash + '" class="' + (s.done ? 'done' : '') + '"><span class="ic">' + (s.done ? IC.check : s.ic) + '</span><span class="grow"><span class="eyebrow">' + (k != null ? (k + 1) + ' · ' : '') + s.label + '</span><b>' + esc(s.title) + '</b><span>' + esc(s.meta) + '</span></span>' + CHEV + '</a>';
  }
  var CHEV = '<svg class="chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>';
  // Navegació dins d'una unitat: molla de pa a dalt i "pas següent" a baix
  function unitChrome(hash) {
    var m = unitOf(hash); if (!m) return false;
    var prev = m.steps[m.i - 1], next = m.steps[m.i + 1];
    var back = $('.head .back', app); if (back) back.parentNode.removeChild(back);
    app.insertAdjacentHTML('afterbegin', '<a class="crumb" href="#unitat-' + m.u.id + '">' + IC.back + '<span>Unitat ' + m.n + ' · ' + esc(m.u.title) + '</span><span class="muted">pas ' + (m.i + 1) + ' de ' + m.steps.length + '</span></a>');
    app.insertAdjacentHTML('beforeend', '<nav class="stepnav" aria-label="Passos de la unitat">' +
      (prev ? '<a class="btn ghost" href="#' + prev.hash + '">' + IC.back + 'Anterior</a>' : '<a class="btn ghost" href="#unitat-' + m.u.id + '">' + IC.back + 'Unitat</a>') +
      (next ? '<a class="btn pri" href="#' + next.hash + '">Següent: ' + esc(next.label.toLowerCase()) + CHEV + '</a>' : '<a class="btn pri" href="#unitat-' + m.u.id + '">Tornar a la unitat' + CHEV + '</a>') + '</nav>');
    return true;
  }

  ROUTES.inici = function () {
    var h = new Date().getHours(), greet = h < 14 ? 'Bon dia!' : h < 21 ? 'Bona tarda!' : 'Bona nit!';
    var u = currentUnit(), n = CA.course.indexOf(u) + 1, ns = nextStep(u), up = unitPct(u);
    var due = dueWords().length, nl = Math.min(newLeft(), newWords(99).length);
    var p = Math.min(100, pct(xpToday(), S.set.goal));
    app.innerHTML = '<div class="stack" style="gap:20px">' +
      '<div class="hero"><div class="head"><span class="greet">' + greet + '</span><h1>Avui toca català.</h1><p class="muted">Segueix el curs pas a pas i repassa les paraules cada dia.</p></div>' +
      '<div class="ring" style="--p:' + p + '" title="Objectiu diari"><div><b class="num">' + xpToday() + '</b><span>de ' + S.set.goal + ' XP</span></div></div></div>' +
      audioNote() +
      '<div class="two">' +
      '<div class="panel stack" style="gap:12px"><div class="row" style="justify-content:space-between"><span class="eyebrow">Continua el curs</span><span class="muted small num">' + up + ' %</span></div>' +
      '<div><h2>Unitat ' + n + ' · ' + esc(u.title) + '</h2><p class="muted small" style="margin-top:4px">' + esc(u.goal) + '</p></div>' + bar(up) +
      '<div class="plan">' + stepRow(ns) + '</div><div class="row"><a class="btn pri" href="#' + ns.hash + '">Continua</a><a class="btn ghost" href="#unitat-' + u.id + '">Veure la unitat</a></div></div>' +
      '<div class="panel stack" style="gap:12px"><span class="eyebrow">Repàs de paraules</span><div><b class="big num" style="font-size:2.4rem">' + (due + nl) + '</b><p class="muted small">' + due + ' per repassar · ' + nl + ' noves avui</p></div>' +
      '<p class="small muted">Cada paraula torna just quan estàs a punt d\'oblidar-la. Cinc minuts al dia són suficients.</p>' +
      '<div class="row"><a class="btn ' + (due + nl ? 'pri' : '') + '" href="#repas">' + IC.cards + (due + nl ? 'Repassa ara' : 'Tot al dia') + '</a></div></div></div>' +
      '<div class="stats"><div class="stat"><b>' + streak() + '</b><span>dies seguits</span></div><div class="stat"><b>' + WORDS.filter(learned).length + '</b><span>paraules apreses</span></div><div class="stat"><b>' + CA.course.filter(function (x) { return unitPct(x) === 100; }).length + ' / ' + CA.course.length + '</b><span>unitats acabades</span></div></div>' +
      '<div class="panel"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h2>El curs</h2><a class="small" href="#curs">Totes les unitats</a></div><div class="units">' +
      CA.course.map(function (x, k) { var q = unitPct(x); return '<a href="#unitat-' + x.id + '" class="unit-row' + (x === u ? ' cur' : '') + '"><span class="unum' + (q === 100 ? ' ok' : '') + '">' + (q === 100 ? IC.check : k + 1) + '</span><span class="grow"><b>' + esc(x.title) + '</b>' + bar(q) + '</span><span class="muted small num">' + q + ' %</span></a>'; }).join('') +
      '</div></div>' +
      '<div class="panel"><span class="eyebrow">Consell del dia</span><p style="margin-top:8px">' + esc(CA.tips[today() % CA.tips.length]) + '</p></div></div>';
  };

  ROUTES.curs = function () {
    var cur = currentUnit();
    app.innerHTML = '<div class="stack">' + head('El curs', 'Vuit unitats ordenades de més fàcil a més difícil. Cada unitat combina paraules, gramàtica i les destreses de l\'examen, i acaba amb una prova.') +
      '<div class="stack" style="gap:12px">' + CA.course.map(function (u, k) {
        var q = unitPct(u), st = unitSteps(u), done = st.filter(function (s) { return s.done; }).length;
        return '<a class="unit-card' + (u === cur ? ' cur' : '') + '" href="#unitat-' + u.id + '"><span class="unum big' + (q === 100 ? ' ok' : '') + '">' + (q === 100 ? IC.check : k + 1) + '</span>' +
          '<span class="grow"><span class="eyebrow">Unitat ' + (k + 1) + (u === cur ? ' · on ets ara' : '') + '</span><b class="t">' + esc(u.title) + '</b><span class="s">' + esc(u.goal) + '</span>' +
          '<span class="row" style="gap:10px;margin-top:6px">' + bar(q) + '<span class="muted small num" style="white-space:nowrap">' + done + ' / ' + st.length + ' passos</span></span></span></a>';
      }).join('') + '</div></div>';
  };

  ROUTES.unitat = function (id) {
    var u = findId(CA.course, id); if (!u) { location.hash = 'curs'; return; }
    var k = CA.course.indexOf(u), st = unitSteps(u), q = unitPct(u), ns = nextStep(u), nx = CA.course[k + 1];
    app.innerHTML = '<div class="stack">' + head('<span class="eyebrow" style="display:block;margin-bottom:8px">Unitat ' + (k + 1) + ' de ' + CA.course.length + '</span>' + esc(u.title), esc(u.goal), ['curs', 'El curs']) +
      '<div class="panel stack" style="gap:10px"><div class="row" style="justify-content:space-between"><b>' + st.filter(function (s) { return s.done; }).length + ' de ' + st.length + ' passos fets</b><span class="muted small num">' + q + ' %</span></div>' + bar(q) +
      '<div class="row">' + (q < 100 ? '<a class="btn pri" href="#' + ns.hash + '">' + (q ? 'Continua' : 'Comença') + ': ' + esc(ns.label.toLowerCase()) + '</a>' : (nx ? '<a class="btn pri" href="#unitat-' + nx.id + '">Unitat següent</a>' : '<a class="btn pri" href="#examen">Fes un simulacre</a>')) + '</div></div>' +
      '<div class="panel"><div class="plan steps">' + st.map(stepRow).join('') + '</div></div>' +
      '<p class="muted small">Pots fer els passos en qualsevol ordre. Un pas es marca com a fet quan el superes: paraules estudiades, gramàtica amb un 80 %, lectures i audicions amb un 60 %.</p></div>';
  };

  ROUTES.prova = function (id) {
    var u = findId(CA.course, id); if (!u) { location.hash = 'curs'; return; }
    var k = CA.course.indexOf(u);
    app.innerHTML = '<div class="stack">' + head('Prova de la unitat ' + (k + 1), esc(u.title) + ' · 10 preguntes de gramàtica i vocabulari. Per superar-la cal un 70 %.', ['unitat-' + u.id, 'Unitat ' + (k + 1)]) +
      '<div class="panel" id="quiz"></div></div>';
    function start() {
      var gs = u.steps.filter(function (s) { return s.indexOf('g:') === 0; }).map(function (s) { return findId(CA.grammar, s.slice(2)); });
      var vs = u.steps.filter(function (s) { return s.indexOf('v:') === 0; }).map(function (s) { return s.slice(2); });
      var pool = WORDS.filter(function (w) { return vs.indexOf(w.theme) >= 0; });
      var nv = pool.length ? 4 : 0;
      var gItems = sample(gs.reduce(function (a, g) { return a.concat(g.ex); }, []), 10 - nv).map(gramItem);
      var vItems = sample(pool, nv).map(function (w, j) { return mcItem(w, pool.filter(function (x) { return x.theme === w.theme; }), j % 2 === 0); });
      runQuiz($('#quiz'), shuffle(gItems.concat(vItems)), {
        onAnswer: function (it, r) { if (it.w) gradeWord(it.w.id, r === 'ok' ? 2 : 0); },
        onFinish: function (p) { S.utest[u.id] = Math.max(S.utest[u.id] || 0, p); addXP(p >= 70 ? 15 : 5, 'test'); },
        nextHref: CA.course[k + 1] ? ['#unitat-' + CA.course[k + 1].id, 'Unitat següent'] : ['#examen', 'Simulacre'],
        again: start
      });
    }
    start();
  };

  ROUTES.biblioteca = function () {
    var c = function (list, store) { return list.filter(function (x) { var v = store[x.id]; return v && (v === true || v.done || v >= 60); }).length; };
    var tile = function (t) { return '<a class="tile" href="#' + t[0] + '"><span class="plan"><span class="ic">' + t[1] + '</span></span><span class="t">' + t[2] + '</span><span class="s">' + t[3] + '</span><span class="foot"><span class="pill">' + t[4] + '</span></span></a>'; };
    app.innerHTML = '<div class="stack">' + head('Biblioteca', 'Tot el contingut del curs, ordenat per tipus. Fes-la servir per repassar un tema concret.') +
      '<h2>Coneixements</h2><div class="grid">' + [
        ['paraules', IC.cards, 'Paraules', 'Vocabulari per temes amb targetes, test i escriptura.', CA.vocab.length + ' temes'],
        ['gramatica', IC.book, 'Gramàtica', 'Explicacions curtes en castellà i exercicis.', CA.grammar.length + ' unitats'],
        ['verbs', IC.verb, 'Verbs', 'Taules de conjugació i entrenament.', CA.verbs.list.length + ' verbs']
      ].map(tile).join('') + '</div>' +
      '<h2>Destreses</h2><div class="grid">' + [
        ['llegir', IC.read, 'Comprensió lectora', 'Correus, anuncis, avisos i menús amb preguntes.', c(CA.reading, S.read) + ' / ' + CA.reading.length],
        ['escoltar', IC.ear, 'Comprensió oral', 'Diàlegs de la vida quotidiana.', c(CA.listening, S.listen) + ' / ' + CA.listening.length],
        ['dictat', IC.type, 'Dictat', 'Escolta i escriu. Correcció paraula per paraula.', S.dict + ' frases fetes'],
        ['escriure', IC.pen, 'Expressió escrita', 'Tasques tipus examen amb model i detector de castellanismes.', c(CA.writing, S.write) + ' / ' + CA.writing.length],
        ['parlar', IC.mic, 'Expressió oral', 'Monòlegs amb cronòmetre i jocs de rol.', c(CA.speaking, S.speak) + ' / ' + CA.speaking.length],
        ['pronuncia', IC.wave, 'Pronunciació', 'Vocal neutra, s sonora, l·l, x i tx…', CA.pronunciation.length + ' grups']
      ].map(tile).join('') + '</div></div>';
  };
  ROUTES.practica = ROUTES.biblioteca;

  // ========== PARAULES ==========
  ROUTES.paraules = function (id) {
    var theme = CA.vocab.filter(function (t) { return t.id === id; })[0];
    if (!theme) {
      var due = dueWords().length;
      app.innerHTML = '<div class="stack">' + head('Paraules', 'Unes ' + Math.round(WORDS.length / 10) * 10 + ' paraules i expressions del nivell A2, per temes. El repàs espaiat et torna a preguntar cada paraula just quan l\'estàs a punt d\'oblidar.', ['biblioteca', 'Biblioteca']) +
        '<div class="panel row"><div class="grow" style="flex:1;min-width:200px"><b>Repàs d\'avui</b><div class="muted small">' + due + ' per repassar · ' + Math.min(newLeft(), newWords(99).length) + ' noves disponibles</div></div><a class="btn pri" href="#repas">' + IC.cards + 'Comença el repàs</a></div>' +
        '<div class="grid">' + CA.vocab.map(function (t) {
          var ws = WORDS.filter(function (w) { return w.theme === t.id; }), l = ws.filter(learned).length;
          return '<a class="tile" href="#paraules-' + t.id + '"><span class="t">' + esc(t.title) + '</span><span class="s">' + esc(t.es) + '</span><span class="foot">' + bar(pct(l, ws.length), 'sun') + '<span class="num">' + l + '/' + ws.length + '</span></span></a>';
        }).join('') + '</div></div>';
      return;
    }
    var ws = WORDS.filter(function (w) { return w.theme === theme.id; });
    var mode = ws.filter(function (w) { return S.srs[w.id]; }).length >= ws.length * 0.8 ? 'llista' : 'targetes';
    app.innerHTML = '<div class="stack">' + head(esc(theme.title), esc(theme.es) + ' · ' + ws.length + ' paraules', ['paraules', 'Tots els temes']) +
      '<div class="tabs" role="tablist"><button data-m="llista" class="on">Llista</button><button data-m="targetes">Targetes</button><button data-m="test">Test</button><button data-m="escriu">Escriu</button></div><div id="pane"></div></div>';
    var pane = $('#pane');
    function show(m) {
      mode = m; TTS.stop(); keyHandler = null;
      $$('.tabs button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-m') === m); });
      if (m === 'llista') {
        pane.innerHTML = '<div class="panel"><div class="list">' + ws.map(function (w) {
          return '<div class="li"><span class="lvl l' + level(w) + '" title="Nivell de memòria"></span><div class="grow"><div class="ca">' + esc(w.ca) + '</div><div class="es">' + esc(w.es) + '</div>' + (w.note ? '<div class="nt">' + esc(w.note) + '</div>' : '') + '</div>' + sayBtn(w.ca) + '</div>';
        }).join('') + '</div></div>';
      } else if (m === 'targetes') {
        var t = today(), sorted = ws.slice().sort(function (a, b) { var sa = S.srs[a.id], sb = S.srs[b.id]; var ka = !sa ? 1 : sa.d <= t ? 0 : 2, kb = !sb ? 1 : sb.d <= t ? 0 : 2; return ka - kb || (sa && sb ? sa.d - sb.d : 0); });
        runCards(pane, sorted.slice(0, 20), function () { show('targetes'); });
      } else if (m === 'test') {
        runQuiz(pane, sample(ws, Math.min(10, ws.length)).map(function (w, k) { return mcItem(w, ws, k % 2 === 0); }), {
          onAnswer: function (it, r) { gradeWord(it.w.id, r === 'ok' ? 2 : 0); if (r === 'ok') addXP(2, 'cards'); }, again: function () { show('test'); } });
      } else {
        runQuiz(pane, sample(ws, Math.min(10, ws.length)).map(typeItem), {
          onAnswer: function (it, r) { gradeWord(it.w.id, r === 'ok' ? 2 : r === 'near' ? 1 : 0); if (r !== 'bad') addXP(r === 'ok' ? 3 : 1, 'cards'); }, again: function () { show('escriu'); } });
      }
    }
    $$('.tabs button').forEach(function (b) { b.onclick = function () { show(b.getAttribute('data-m')); }; });
    show(mode);
  };
  function mcItem(w, pool, toCa) {
    var others = sample(pool.filter(function (x) { return x.id !== w.id && x.ca !== w.ca && x.es !== w.es; }), 3);
    if (toCa) return { w: w, kind: 'choice', prompt: esc(w.es), hint: 'Com es diu en català?', options: [w.ca].concat(others.map(function (x) { return x.ca; })), answers: [w.ca], show: w.ca, say: sayable(w.ca), note: w.note };
    return { w: w, kind: 'choice', prompt: '<span class="ca">' + esc(w.ca) + '</span> ' + sayBtn(w.ca), hint: 'Què vol dir?', options: [w.es].concat(others.map(function (x) { return x.es; })), answers: [w.es], show: w.es, say: sayable(w.ca), note: w.note };
  }
  function typeItem(w) { return { w: w, kind: 'text', prompt: esc(w.es), hint: 'Escriu-ho en català' + (/^(el|la|els|les|l')\b/.test(w.ca) ? ' (l\'article és opcional)' : ''), answers: variants(w.ca), show: w.ca, say: sayable(w.ca), note: w.note }; }

  function runCards(el, words, again) {
    var q = words.slice(), good = 0, seen = 0;
    if (!q.length) { el.innerHTML = '<div class="panel result"><p>No hi ha targetes per repassar ara mateix.</p></div>'; return; }
    function show() {
      if (!q.length) return finish();
      var w = q[0], dir = S.set.dir, flipped = false;
      var front = dir === 'es-ca' ? w.es : w.ca;
      el.innerHTML = '<div class="quiz"><div class="qhead"><span class="num">' + seen + ' fetes · ' + q.length + ' pendents</span>' + bar(seen / (seen + q.length) * 100) + '</div>' +
        '<div class="card" tabindex="0" role="button" aria-label="Gira la targeta"><span class="lang">' + (dir === 'es-ca' ? 'castellà' : 'català') + '</span><div class="front">' + esc(front) + '</div><div class="muted small" data-hint>Pensa la resposta i toca la targeta</div></div>' +
        '<div class="grades" hidden><button type="button" class="btn g0" data-g="0">No me la sabia<small>1</small></button><button type="button" class="btn g1" data-g="1">Amb dubtes<small>2</small></button><button type="button" class="btn g2" data-g="2">Me la sabia<small>3</small></button></div></div>';
      var card = $('.card', el);
      if (dir === 'ca-es') TTS.speak(sayable(w.ca));
      function flip() {
        if (flipped) return; flipped = true;
        card.innerHTML = '<span class="lang">català</span><div class="back ca">' + esc(w.ca) + '</div>' + sayBtn(w.ca) + '<div class="muted">' + esc(w.es) + '</div>' + (w.note ? '<div class="small" style="color:var(--near)">' + esc(w.note) + '</div>' : '');
        $('.grades', el).hidden = false;
        if (dir === 'es-ca') TTS.speak(sayable(w.ca));
      }
      card.onclick = function (e) { if (!e.target.closest('.say')) flip(); };
      $$('[data-g]', el).forEach(function (b) { b.onclick = function () { grade(+b.getAttribute('data-g')); }; });
      function grade(g) {
        TTS.stop(); gradeWord(w.id, g); seen++;
        if (g === 0) q.splice(Math.min(3, q.length), 0, q.shift()); else q.shift();
        if (g === 2) { good++; addXP(1, 'cards'); } else act('cards');
        show();
      }
      keyHandler = function (e) {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
        else if (flipped && /^[123]$/.test(e.key)) grade(+e.key - 1);
      };
    }
    function finish() {
      keyHandler = null;
      el.innerHTML = '<div class="panel result"><div class="big">' + good + '</div><p class="muted">paraules sabudes a la primera de ' + words.length + '. Les que has fallat tornaran aviat.</p><div class="row" style="justify-content:center"><button type="button" class="btn pri" data-again>Continua</button><a class="btn" href="#inici">Inici</a></div></div>';
      $('[data-again]', el).onclick = again;
    }
    show();
  }

  ROUTES.repas = function () {
    var due = dueWords().slice(0, 40), nw = newWords(newLeft());
    app.innerHTML = '<div class="stack">' + head('Repàs de paraules', due.length + ' per repassar · ' + nw.length + ' noves. Cinc minuts al dia són suficients.') +
      '<div class="row"><span class="muted small">Direcció:</span><div class="tabs"><button data-d="es-ca">Castellà → català</button><button data-d="ca-es">Català → castellà</button></div></div><div id="pane"></div></div>';
    $$('[data-d]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-d') === S.set.dir); b.onclick = function () { S.set.dir = b.getAttribute('data-d'); save(); ROUTES.repas(); }; });
    var pane = $('#pane');
    var list = shuffle(due).concat(nw);
    if (!list.length) {
      pane.innerHTML = '<div class="panel result"><h2>Tot al dia!</h2><p class="muted">No et queda cap paraula per repassar avui i ja has après les noves d\'avui.</p><div class="row" style="justify-content:center"><button type="button" class="btn pri" data-more>Aprèn 10 paraules més</button><a class="btn" href="#paraules">Explora els temes</a></div></div>';
      $('[data-more]').onclick = function () { runCards(pane, newWords(10), function () { ROUTES.repas(); }); };
      return;
    }
    runCards(pane, list, function () { ROUTES.repas(); });
  };

  // ========== GRAMÀTICA ==========
  function gramItem(x) {
    if (x.ord) return { kind: 'order', prompt: esc(x.es), hint: 'Ordena les paraules per formar la frase en català', words: x.ord.split(' '), answers: [x.ord], show: x.ord, say: x.ord };
    var ans = [].concat(x.a), spanish = /^¿|^Mañana/.test(x.q);
    var say = spanish ? null : /___/.test(x.q) && !/→/.test(x.q) ? fillGaps(x.q, ans[0]).replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim() : ans[0];
    var base = { prompt: gapify(x.q), answers: ans, show: ans[0], fill: /___/.test(x.q) ? ans[0] : null, say: say };
    return Object.assign(base, x.o ? { kind: 'choice', options: x.o } : { kind: 'text' });
  }
  ROUTES.gramatica = function (id) {
    var u = CA.grammar.filter(function (g) { return g.id === id; })[0];
    if (!u) {
      app.innerHTML = '<div class="stack">' + head('Gramàtica', 'Explicacions curtes en castellà i exercicis amb correcció. Una unitat es considera superada amb un 80 %.', ['biblioteca', 'Biblioteca']) +
        '<a class="panel row" href="#verbs" style="text-decoration:none;color:inherit"><span class="plan"><span class="ic">' + IC.verb + '</span></span><div style="flex:1;min-width:0"><b>Conjugador i entrenament de verbs</b><div class="muted small">' + CA.verbs.list.length + ' verbs en 6 temps</div></div><span class="btn sm">Obre</span></a>' +
        '<div class="grid">' + CA.grammar.map(function (g, k) {
          var s = S.gram[g.id];
          return '<a class="tile" href="#gramatica-' + g.id + '"><span class="eyebrow">Unitat ' + (k + 1) + '</span><span class="t">' + esc(g.title) + '</span><span class="s">' + esc(g.es) + '</span><span class="foot">' + scorePill(s == null ? null : s) + '<span>' + g.ex.length + ' exercicis</span></span></a>';
        }).join('') + '</div></div>';
      return;
    }
    var idx = CA.grammar.indexOf(u), nx = CA.grammar[idx + 1];
    app.innerHTML = '<div class="stack">' + head(esc(u.title), esc(u.es) + (S.gram[u.id] != null ? ' · millor resultat: ' + S.gram[u.id] + ' %' : ''), ['gramatica', 'Gramàtica']) +
      '<div class="panel lesson">' + u.html.replace(/<table>/g, '<div class="tbl"><table>').replace(/<\/table>/g, '</table></div>') + '</div>' +
      '<div class="panel"><div class="row" style="justify-content:space-between;margin-bottom:12px"><h2>Practica</h2><span class="muted small">Prem Intro per continuar</span></div><div id="quiz"><button type="button" class="btn pri" data-start>Comença els ' + u.ex.length + ' exercicis</button></div></div></div>';
    $('[data-start]').onclick = start;
    function start() {
      runQuiz($('#quiz'), shuffle(u.ex).map(gramItem), {
        onAnswer: function (it, r) { if (r === 'ok') addXP(2); },
        onFinish: function (p) { S.gram[u.id] = Math.max(S.gram[u.id] || 0, p); addXP(p >= 80 ? 10 : 3, 'gram'); },
        nextHref: nx ? ['#gramatica-' + nx.id, 'Següent: ' + nx.title] : ['#gramatica', 'Totes les unitats'],
        again: start
      });
    }
  };

  // ========== VERBS ==========
  ROUTES.verbs = function (id) {
    var V = CA.verbs, P = V.persons, T = V.tenses;
    var mode = id.indexOf('entrena') === 0 ? 'entrena' : 'taules';
    var preset = mode === 'entrena' && id.length > 8 ? id.slice(8).split('-').filter(function (t) { return TENSE_NAME[t]; }) : null;
    app.innerHTML = '<div class="stack">' + head('Verbs', 'Taules de conjugació per escoltar i un entrenament per escriure les formes.', ['biblioteca', 'Biblioteca']) +
      '<div class="tabs"><button data-m="taules">Taules</button><button data-m="entrena">Entrena\'t</button></div><div id="pane"></div></div>';
    $$('.tabs button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-m') === mode); b.onclick = function () { location.hash = b.getAttribute('data-m') === 'entrena' ? (preset ? 'verbs-' + id : 'verbs-entrena') : 'verbs'; }; });
    var pane = $('#pane');
    var regs = V.list.filter(function (v) { return v.reg; });
    if (mode === 'taules') {
      var sel = '<select id="verb-sel" aria-label="Verb">' + V.list.map(function (v, k) { return '<option value="' + k + '">' + esc(v.inf) + ' · ' + esc(v.es) + '</option>'; }).join('') + '</select>';
      pane.innerHTML = '<div class="stack"><div class="panel flat row"><label for="verb-sel" class="muted small">Tria un verb</label><div style="flex:1;min-width:220px">' + sel + '</div></div><div id="vt"></div></div>';
      var vs = $('#verb-sel');
      try { vs.value = sessionStorage.getItem('endavant-verb') || '25'; } catch (e) { vs.value = '25'; }
      if (!vs.value) vs.value = '0';
      var draw = function () {
        var v = V.list[+vs.value]; try { sessionStorage.setItem('endavant-verb', vs.value); } catch (e) {}
        $('#vt').innerHTML = '<div class="row" style="margin-bottom:12px"><h2 class="ca">' + esc(v.inf) + '</h2>' + sayBtn(v.inf) + '<span class="muted">' + esc(v.es) + '</span></div><div class="verb-grid">' +
          T.map(function (t) {
            return '<div class="panel"><div class="row" style="justify-content:space-between"><h3>' + t.name + '</h3><span class="muted small">' + t.es + '</span></div><table><tbody>' +
              P.map(function (p, i) { var f = v.conj[t.id][i]; return '<tr><td>' + p + '</td><td><b>' + esc(f[0]) + '</b>' + (f.length > 1 && t.id === 'perif' && !v.refl ? ' <span class="muted small">(' + esc(f[1]) + ')</span>' : '') + '</td><td style="width:40px">' + sayBtn(f[0]) + '</td></tr>'; }).join('') +
              '</tbody></table></div>';
          }).join('') + '</div>';
      };
      vs.onchange = draw; draw();
      return;
    }
    var chosenT = preset && preset.length ? preset : ['pres', 'perif', 'perf', 'fut'], group = 'tots';
    pane.innerHTML = '<div class="panel stack"><div><div class="eyebrow" style="margin-bottom:8px">Temps</div><div class="toggle">' +
      T.map(function (t) { return '<label><input type="checkbox" value="' + t.id + '"' + (chosenT.indexOf(t.id) >= 0 ? ' checked' : '') + '> ' + t.name + '</label>'; }).join('') + '</div></div>' +
      '<div><div class="eyebrow" style="margin-bottom:8px">Verbs</div><div class="toggle">' +
      [['tots', 'Tots'], ['irr', 'Irregulars i -er/-re/-ir'], ['reg', 'Regulars en -ar']].map(function (g) { return '<label><input type="radio" name="vg" value="' + g[0] + '"' + (g[0] === group ? ' checked' : '') + '> ' + g[1] + '</label>'; }).join('') + '</div></div>' +
      '<div class="row"><button type="button" class="btn pri" data-go>Comença (12 formes)</button><span class="muted small">Encerts acumulats: ' + S.verbs.ok + ' de ' + S.verbs.total + '</span></div></div><div id="drill" style="margin-top:16px"></div>';
    $('[data-go]').onclick = function go() {
      chosenT = $$('.toggle input[type=checkbox]:checked').map(function (x) { return x.value; });
      group = ($('input[name=vg]:checked') || {}).value || 'tots';
      if (!chosenT.length) { toast('Tria almenys un temps'); return; }
      var pool = V.list.filter(function (v) { var r = regs.indexOf(v) >= 0; return group === 'tots' || (group === 'reg' ? r : !r); });
      var items = [];
      for (var n = 0; n < 12; n++) {
        var v = pick(pool), tid = pick(chosenT), t = T.filter(function (x) { return x.id === tid; })[0], p = Math.floor(Math.random() * 6), f = v.conj[t.id][p];
        items.push({ kind: 'text', prompt: '<span class="eyebrow">' + t.name + '</span><br>' + P[p] + ' · <span class="ca">' + esc(v.inf) + '</span>', hint: esc(v.es) + ' — ' + t.es, answers: f, show: f[0], say: f[0] });
      }
      runQuiz($('#drill'), items, {
        onAnswer: function (it, r) { S.verbs.total++; if (r === 'ok') { S.verbs.ok++; addXP(2); } save(); },
        onFinish: function (p) { addXP(5, 'verbs'); if (preset && p >= 70 && chosenT.join('+') === preset.join('+')) S.vdone[preset.join('+')] = true; save(); }, again: go
      });
      $('#drill').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
  };

  function listPage(title, sub, list, store, sec) {
    app.innerHTML = '<div class="stack">' + head(title, sub, ['biblioteca', 'Biblioteca']) + '<div class="grid">' + list.map(function (x) {
      var v = store[x.id], tag = typeof v === 'number' ? scorePill(v) : v && (v === true || v.done) ? '<span class="pill ok">Fet</span>' : '<span class="pill">Pendent</span>';
      return '<a class="tile" href="#' + sec + '-' + x.id + '">' + (x.kind ? '<span class="eyebrow">' + esc(x.kind) + '</span>' : '') + '<span class="t">' + esc(x.title) + '</span><span class="foot">' + tag + '</span></a>';
    }).join('') + '</div></div>';
  }

  // ========== LLEGIR ==========
  ROUTES.llegir = function (id) {
    var r = CA.reading.filter(function (x) { return x.id === id; })[0];
    if (!r) return listPage('Comprensió lectora', 'Llegeix el text i respon. Pots escoltar-lo si vols, però a l\'examen el llegiràs en silenci.', CA.reading, S.read, 'llegir');
    app.innerHTML = '<div class="stack">' + head(esc(r.title), 'Llegeix el text i respon les preguntes.', ['llegir', 'Comprensió lectora']) +
      '<div class="doc"><span class="kind">' + esc(r.kind) + '</span><div class="text">' + esc(r.text) + '</div><div class="row" style="margin-top:14px"><button type="button" class="btn sm" data-say="' + esc(r.text) + '">' + IC.spk + 'Escolta el text</button></div></div>' +
      '<div class="panel"><h2>Preguntes</h2><div id="qs">' + qsHtml(r.qs, 'r') + '</div><div class="row" style="margin-top:12px"><button type="button" class="btn pri" data-grade>Corregeix</button><span id="res"></span></div></div></div>';
    bindQs(app);
    $('[data-grade]').onclick = function () {
      var ok = gradeQs(app, r.qs, 'r'), p = pct(ok, r.qs.length);
      S.read[r.id] = Math.max(S.read[r.id] || 0, p); addXP(ok * 2 + 4, 'read');
      $('#res').innerHTML = scorePill(p) + ' <span class="muted small">' + ok + ' de ' + r.qs.length + ' correctes</span>';
      this.disabled = true;
      var nx = CA.reading[CA.reading.indexOf(r) + 1];
      if (nx) $('#res').insertAdjacentHTML('afterend', '<a class="btn sm" href="#llegir-' + nx.id + '">Següent text</a>');
    };
  };

  // ========== ESCOLTAR ==========
  ROUTES.escoltar = function (id) {
    var L = CA.listening.filter(function (x) { return x.id === id; })[0];
    if (!L) return listPage('Comprensió oral', 'Escolta el diàleg (pots repetir-lo) i respon. La transcripció apareix quan corregeixes.', CA.listening, S.listen, 'escoltar');
    var plays = 0, rate = S.set.rate, playing = false;
    app.innerHTML = '<div class="stack">' + head(esc(L.title), 'Escolta i respon. A l\'examen normalment se sent dues vegades.', ['escoltar', 'Comprensió oral']) + audioNote() +
      '<div class="player"><button type="button" class="play" aria-label="Reprodueix">' + IC.play + '</button><div class="meta"><b>' + esc(L.title) + '</b><span data-plays>Encara no l\'has escoltat</span><div class="wave">' + new Array(28).join('<i></i>') + '</div></div>' +
      '<button type="button" class="btn sm" data-slow>Lent</button></div>' +
      '<div class="panel"><h2>Preguntes</h2>' + qsHtml(L.qs, 'l') + '<div class="row" style="margin-top:12px"><button type="button" class="btn pri" data-grade>Corregeix</button><span id="res"></span><span class="spacer"></span><button type="button" class="btn ghost sm" data-tr>Mostra la transcripció</button></div></div>' +
      '<div class="panel" id="tr" hidden><h2 style="margin-bottom:12px">Transcripció</h2><div class="lines">' + L.lines.map(function (l, k) { return '<div class="line" data-l="' + k + '"><span class="who">' + l[0] + '</span><span>' + esc(l[1]) + '</span></div>'; }).join('') + '</div></div></div>';
    bindQs(app);
    var pb = $('.play'), player = $('.player');
    var stopP = function () { playing = false; TTS.stop(); player.classList.remove('playing'); pb.innerHTML = IC.play; };
    pb.onclick = function () {
      if (playing) return stopP();
      playing = true; plays++; player.classList.add('playing'); pb.innerHTML = IC.stop;
      $('[data-plays]').textContent = 'Escoltat ' + plays + (plays === 1 ? ' vegada' : ' vegades');
      TTS.dialog(L.lines, rate, function (k) { $$('.line').forEach(function (x) { x.style.fontWeight = +x.getAttribute('data-l') === k ? '700' : ''; }); }).then(function () { if (playing) stopP(); });
    };
    $('[data-slow]').onclick = function () { rate = rate < 0.8 ? S.set.rate : 0.7; this.classList.toggle('on', rate < 0.8); };
    $('[data-tr]').onclick = function () { $('#tr').hidden = !$('#tr').hidden; this.textContent = $('#tr').hidden ? 'Mostra la transcripció' : 'Amaga la transcripció'; };
    $('[data-grade]').onclick = function () {
      var ok = gradeQs(app, L.qs, 'l'), p = pct(ok, L.qs.length);
      S.listen[L.id] = Math.max(S.listen[L.id] || 0, p); addXP(ok * 2 + 4, 'listen');
      $('#res').innerHTML = scorePill(p) + ' <span class="muted small">' + ok + ' de ' + L.qs.length + '</span>';
      $('#tr').hidden = false; $('[data-tr]').textContent = 'Amaga la transcripció'; this.disabled = true;
    };
  };

  // ========== DICTAT ==========
  function tokens(s) { return norm(s).split(' ').filter(Boolean); }
  function diffWords(target, input) {
    var T = tokens(target), U = tokens(input), a = T.map(noAcc), b = U.map(noAcc), n = a.length, m = b.length, i, j;
    var dp = []; for (i = 0; i <= n; i++) { dp.push(new Array(m + 1).fill(0)); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    var ops = []; i = 0; j = 0;
    while (i < n || j < m) {
      if (i < n && j < m && a[i] === b[j]) { ops.push({ t: T[i] === U[j] ? 'ok' : 'near', w: U[j], c: T[i] }); i++; j++; }
      else if (j < m && (i >= n || dp[i][j + 1] >= dp[i + 1][j])) { ops.push({ t: 'bad', w: U[j] }); j++; }
      else { ops.push({ t: 'miss', w: T[i] }); i++; }
    }
    var ok = ops.filter(function (o) { return o.t === 'ok'; }).length, near = ops.filter(function (o) { return o.t === 'near'; }).length, extra = ops.filter(function (o) { return o.t === 'bad'; }).length;
    return { ops: ops, score: Math.max(0, (ok + near * 0.5 - extra * 0.5) / n) };
  }
  ROUTES.dictat = function () {
    var list = sample(CA.dictation, 8), i = 0, total = 0;
    app.innerHTML = '<div class="stack">' + head('Dictat', 'Escolta cada frase i escriu-la. Es corregeix paraula per paraula: verd correcte, groc accent, vermell error.', ['biblioteca', 'Biblioteca']) + audioNote() + '<div class="panel" id="pane"></div></div>';
    var pane = $('#pane');
    function render() {
      var s = list[i], answered = false;
      pane.innerHTML = '<div class="quiz"><div class="qhead"><span class="num">' + (i + 1) + ' / ' + list.length + '</span>' + bar(i / list.length * 100) + '</div>' +
        '<div class="row"><button type="button" class="btn pri" data-play>' + IC.spk + 'Escolta</button><button type="button" class="btn" data-play-slow>Més a poc a poc</button></div>' +
        '<input type="text" id="dict-in" class="answer-in" autocomplete="off" autocapitalize="sentences" spellcheck="false" placeholder="Escriu el que sents…" aria-label="Frase">' +
        '<div class="row"><div class="accents">' + ACC.map(function (a) { return '<button type="button" tabindex="-1">' + a + '</button>'; }).join('') + '</div><span class="spacer"></span><button type="button" class="btn" data-check>Comprova</button></div>' +
        '<div id="dfb"></div><div class="row"><span class="spacer"></span><button type="button" class="btn pri" data-next hidden>' + (i + 1 < list.length ? 'Següent' : 'Resultat') + '</button></div></div>';
      var inp = $('#dict-in');
      var play = function (slow, auto) { if (auto) { TTS.stop(); TTS.speak(s); } else TTS.play(s, slow ? { rate: 0.68 } : {}); inp.focus(); };
      $('[data-play]').onclick = function () { play(false); };
      $('[data-play-slow]').onclick = function () { play(true); };
      $$('.accents button', pane).forEach(function (b) { b.onmousedown = function (e) { e.preventDefault(); }; b.onclick = function () { var p = inp.selectionStart || inp.value.length; inp.value = inp.value.slice(0, p) + b.textContent + inp.value.slice(inp.selectionEnd || p); inp.focus(); inp.setSelectionRange(p + b.textContent.length, p + b.textContent.length); }; });
      var go = function () {
        if (answered || !inp.value.trim()) return; answered = true;
        var d = diffWords(s, inp.value); total += d.score; inp.readOnly = true;
        $('#dfb').innerHTML = '<div class="stack" style="gap:8px"><div class="diff">' + d.ops.map(function (o) { return '<span class="' + o.t + '"' + (o.c ? ' title="' + esc(o.c) + '"' : '') + '>' + esc(o.w) + '</span>'; }).join('') + '</div>' +
          '<div class="fb ' + (d.score >= 0.999 ? 'ok' : d.score >= 0.7 ? 'near' : 'bad') + '">' + Math.round(d.score * 100) + ' %<span class="sub">Frase correcta: <span class="ca">' + esc(s) + '</span></span></div></div>';
        S.dict++; addXP(Math.round(d.score * 4), 'dict');
        var nb = $('[data-next]'); nb.hidden = false; nb.focus();
      };
      $('[data-check]').onclick = go;
      $('[data-next]').onclick = next;
      keyHandler = function (e) { if (e.key === 'Enter') { e.preventDefault(); if (!answered) go(); else next(); } };
      setTimeout(function () { play(false, true); }, 250);
    }
    function next() { i++; if (i < list.length) render(); else { keyHandler = null; var p = Math.round(total / list.length * 100); S.dictDone = true; save(); pane.innerHTML = '<div class="result"><div class="big">' + p + ' %</div><p class="muted">Mitjana del dictat.</p><div class="row" style="justify-content:center"><button type="button" class="btn pri" data-again>Un altre dictat</button><a class="btn" href="#practica">Pràctica</a></div></div>'; $('[data-again]').onclick = function () { route(); }; } }
    render();
  };

  // ========== ESCRIURE ==========
  var ES_WORDS = { y: 'i', muy: 'molt', pero: 'però', porque: 'perquè', pues: 'doncs', entonces: 'llavors', hasta: 'fins (a)', desde: 'des de', con: 'amb',
    todo: 'tot', todos: 'tots', mucho: 'molt', bueno: 'bo / bé', algo: 'alguna cosa', nada: 'res', nadie: 'ningú', cuando: 'quan', donde: 'on', ahora: 'ara', hoy: 'avui',
    ayer: 'ahir', semana: 'setmana', trabajo: 'feina', calle: 'carrer', gracias: 'gràcies', luego: 'després', después: 'després', también: 'també', siempre: 'sempre',
    nunca: 'mai', tengo: 'tinc', estoy: 'estic', soy: 'soc', vamos: 'anem', yo: 'jo', 'qué': 'què', 'él': 'ell', los: 'els', las: 'les', unos: 'uns', unas: 'unes',
    este: 'aquest', esta: 'aquesta / està', pequeño: 'petit', año: 'any', mañana: 'demà / matí', tarde: 'tarda / tard', noche: 'nit', mujer: 'dona', hombre: 'home',
    niño: 'nen', perro: 'gos', comer: 'menjar / dinar', cenar: 'sopar', desayunar: 'esmorzar', hermano: 'germà', hermana: 'germana', ciudad: 'ciutat', playa: 'platja', vale: "val / d'acord" };
  var NO_ACC = { tambe: 'també', aqui: 'aquí', aixi: 'així', despres: 'després', nomes: 'només', gracies: 'gràcies', adeu: 'adéu', cafe: 'cafè', perque: 'perquè',
    pellicula: 'pel·lícula', pelicula: 'pel·lícula', collegi: 'col·legi', colegi: 'col·legi', 'sóc': 'soc (sin acento desde 2017)', 'dóna': 'dona (sin acento desde 2017)',
    'vénen': 'venen', 'véns': 'vens', telefon: 'telèfon', musica: 'música', angles: 'anglès', estas: 'estàs' };
  var NB = '(^|[^a-zà-ÿ·])', NA = '(?=[^a-zà-ÿ·])';
  var rx = function (s) { return new RegExp(NB + s + NA); };
  var PATTERNS = [
    [rx('(tinc|tens|té|tenim|teniu|tenen) que'), '«Tener que» se dice con «haver de»: he de, has de, ha de, hem de, heu de, han de.'],
    [rx('hi han'), '«Hi ha» es invariable: hi ha dos bars.'],
    [rx('per la (tarda|nit)'), '«Por la tarde / noche» → «a la tarda», «a la nit».'],
    [rx('(per el|pel) matí'), '«Por la mañana» → «al matí».'],
    [rx('(mi|tu|su) (casa|pare|mare|germà|germana|amic|amiga|cotxe|pis|família|feina|barri|ciutat)'), 'Los posesivos llevan artículo: la meva casa, el meu pare, la teva família…'],
    [rx("(demà|que ve|aviat|d'aquí a [a-z]+ (dies|setmanes|mesos))[^.!?]{0,30} (vaig|vas|va|anem|aneu|van) a [a-zàèéíòóúïüç·]+(ar|er|re|ir)"), '«Vaig a + infinitivo» es pasado o movimiento, no futuro. Para el futuro usa el futuro: aniré, faré, menjaré…'],
    [rx('el (meu|teu|seu) (casa|mare|germana|amiga|família|feina|ciutat)'), 'Revisa el género del posesivo: la meva casa, la teva mare…']
  ];
  function lint(text) {
    var t = ' ' + text.toLowerCase().replace(/[’']/g, "'") + ' ', out = [];
    var has = function (w) { return new RegExp('(^|[^a-zà-ÿ·])' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=$|[^a-zà-ÿ·])').test(t); };
    Object.keys(ES_WORDS).forEach(function (w) { if (has(w)) out.push('«' + w + '» es castellano → <span class="ca">' + esc(ES_WORDS[w]) + '</span>'); });
    Object.keys(NO_ACC).forEach(function (w) { if (NO_ACC[w] && has(w)) out.push('«' + w + '» → <span class="ca">' + esc(NO_ACC[w]) + '</span>'); });
    PATTERNS.forEach(function (p) { if (p[0].test(t)) out.push(p[1]); });
    if (/l\.l|[a-z]l-l[a-z]/.test(t)) out.push('La ela geminada se escribe con punto volado: l·l.');
    return out;
  }
  function wc(s) { return (s.trim().match(/[^\s]+/g) || []).length; }
  ROUTES.escriure = function (id) {
    var W = CA.writing.filter(function (x) { return x.id === id; })[0];
    if (!W) return listPage('Expressió escrita', 'Tasques com les de l\'examen. Escriu, revisa amb el detector de castellanismes i compara amb el model.', CA.writing, S.write, 'escriure');
    var st = S.write[W.id] || (S.write[W.id] = { draft: '', checks: [], done: false });
    app.innerHTML = '<div class="stack">' + head(esc(W.title), W.min + '–' + W.max + ' paraules', ['escriure', 'Expressió escrita']) +
      '<div class="panel"><span class="eyebrow">Consigna</span><p style="margin-top:6px">' + esc(W.task) + '</p></div>' +
      '<div class="two"><div class="panel stack" style="gap:10px"><div class="phrases" aria-label="Expressions útils">' + W.phrases.map(function (p) { return '<button type="button">' + esc(p) + '</button>'; }).join('') + '</div>' +
      '<textarea id="w-text" spellcheck="false" placeholder="Escriu aquí el teu text…" aria-label="El teu text">' + esc(st.draft) + '</textarea>' +
      '<div class="row"><div class="accents">' + ACC.map(function (a) { return '<button type="button" tabindex="-1">' + a + '</button>'; }).join('') + '</div><span class="spacer"></span><span class="count num" id="w-count"></span></div>' +
      '<div class="row"><button type="button" class="btn pri" data-lint>Revisa el text</button><button type="button" class="btn" data-model>Mostra el model</button><button type="button" class="btn ghost" data-done>' + (st.done ? 'Feta ✓' : 'Marca com a feta') + '</button></div><div id="w-lint"></div></div>' +
      '<div class="panel checks"><h3 style="margin-bottom:8px">Autoavaluació</h3><p class="muted small" style="margin-bottom:6px">Marca el que ja has inclòs.</p>' +
      W.check.map(function (c, k) { return '<label><input type="checkbox" data-c="' + k + '"' + (st.checks.indexOf(k) >= 0 ? ' checked' : '') + '><span>' + esc(c) + '</span></label>'; }).join('') + '</div></div>' +
      '<div class="panel" id="w-model" hidden><div class="row" style="justify-content:space-between;margin-bottom:10px"><h2>Model</h2>' + sayBtn(W.model, 'Escolta el model') + '</div><div class="text">' + esc(W.model) + '</div><p class="muted small" style="margin-top:10px">' + wc(W.model) + ' paraules. És un exemple: el teu text pot ser molt diferent i estar igual de bé.</p></div></div>';
    var ta = $('#w-text');
    var upd = function () {
      var n = wc(ta.value), col = n < W.min ? 'var(--muted)' : n <= W.max ? 'var(--ok)' : 'var(--near)';
      $('#w-count').innerHTML = '<span style="color:' + col + '">' + n + ' paraules</span> <span class="muted">(' + W.min + '–' + W.max + ')</span>';
      st.draft = ta.value; save();
    };
    ta.oninput = upd; upd();
    var ins = function (s) { var p = ta.selectionStart, e = ta.selectionEnd; ta.value = ta.value.slice(0, p) + s + ta.value.slice(e); ta.focus(); ta.setSelectionRange(p + s.length, p + s.length); upd(); };
    $$('.phrases button').forEach(function (b) { b.onclick = function () { ins((ta.value && !/\s$/.test(ta.value.slice(0, ta.selectionStart)) ? ' ' : '') + b.textContent.replace(/…$/, '')); }; });
    $$('.accents button', app).forEach(function (b) { b.onmousedown = function (e) { e.preventDefault(); }; b.onclick = function () { ins(b.textContent); }; });
    $$('[data-c]').forEach(function (c) { c.onchange = function () { st.checks = $$('[data-c]:checked').map(function (x) { return +x.getAttribute('data-c'); }); save(); }; });
    $('[data-lint]').onclick = function () {
      var n = wc(ta.value), issues = lint(ta.value);
      if (n < W.min) issues.unshift('El text és curt: ' + n + ' paraules. Intenta arribar a ' + W.min + '.');
      if (n > W.max + 15) issues.unshift('El text és llarg: ' + n + ' paraules. A l\'examen, no et passis gaire de ' + W.max + '.');
      $('#w-lint').innerHTML = !ta.value.trim() ? '' : issues.length ? '<ul class="issues">' + issues.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' :
        '<div class="fb ok">No hem trobat castellanismes ni accents típics oblidats.<span class="sub">Això no vol dir que sigui perfecte: compara amb el model i revisa l\'autoavaluació.</span></div>';
    };
    $('[data-model]').onclick = function () { var m = $('#w-model'); m.hidden = !m.hidden; this.textContent = m.hidden ? 'Mostra el model' : 'Amaga el model'; if (!m.hidden) m.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    $('[data-done]').onclick = function () { if (!st.done) { st.done = true; addXP(15, 'write'); } this.textContent = 'Feta ✓'; toast('Redacció guardada com a feta'); };
  };

  // ========== PARLAR ==========
  ROUTES.parlar = function (id) {
    if (id.indexOf('rol-') === 0) return roleplay(id.slice(4));
    var T = CA.speaking.filter(function (x) { return x.id === id; })[0];
    if (!T) {
      app.innerHTML = '<div class="stack">' + head('Expressió oral', 'Parla en veu alta amb el cronòmetre. Fes servir les preguntes de guia i escolta el model després.', ['biblioteca', 'Biblioteca']) +
        '<h2>Monòlegs</h2><div class="grid">' + CA.speaking.map(function (x) { return '<a class="tile" href="#parlar-' + x.id + '"><span class="t">' + esc(x.title) + '</span><span class="s">' + Math.round(x.secs / 60 * 10) / 10 + ' min</span><span class="foot">' + (S.speak[x.id] ? '<span class="pill ok">Fet</span>' : '<span class="pill">Pendent</span>') + '</span></a>'; }).join('') + '</div>' +
        '<h2>Jocs de rol</h2><div class="grid">' + CA.roleplay.map(function (x) { return '<a class="tile" href="#parlar-rol-' + x.id + '"><span class="t">' + esc(x.title) + '</span><span class="s">La veu fa de dependent o cambrer; tu respons.</span></a>'; }).join('') +
        '<a class="tile" href="#pronuncia"><span class="t">Pronunciació</span><span class="s">Practica els sons propis del català.</span></a></div></div>';
      return;
    }
    var left = T.secs, running = false, timer;
    app.innerHTML = '<div class="stack">' + head(esc(T.title), 'Parla ' + Math.round(T.secs / 60 * 10) / 10 + ' minuts seguint la guia. Si et quedes en blanc, mira la pregunta següent.', ['parlar', 'Expressió oral']) +
      '<div class="two"><div class="panel stack"><span class="eyebrow">Guia</span><ol style="margin:0;padding-left:1.2em;display:flex;flex-direction:column;gap:6px">' + T.guide.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ol></div>' +
      '<div class="panel stack" style="align-items:center;text-align:center"><div class="timer" id="tm">0:00</div><div class="row" style="justify-content:center"><button type="button" class="btn pri" data-t>Comença</button>' + (SR ? '<button type="button" class="btn" data-rec>' + IC.mic + 'Transcriu el que dic</button>' : '') + '</div>' +
      (SR ? '<div id="rec" class="small muted" style="text-align:left;width:100%"></div>' : '<p class="muted small">Grava\'t amb el mòbil i escolta\'t després: és la millor manera de detectar errors.</p>') + '</div></div>' +
      '<div class="panel"><div class="row" style="justify-content:space-between;margin-bottom:10px"><h2>Model</h2><div class="row">' + sayBtn(T.model, 'Escolta el model') + '<button type="button" class="btn sm" data-show>Mostra el text</button></div></div><div class="text" id="mtext" hidden>' + esc(T.model) + '</div></div>' +
      '<div class="row"><button type="button" class="btn" data-done>' + (S.speak[T.id] ? 'Fet ✓' : 'Marca com a fet') + '</button></div></div>';
    var fmt = function (s) { return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); };
    $('#tm').textContent = fmt(left);
    $('[data-t]').onclick = function () {
      var b = this;
      if (running) { clearInterval(timer); running = false; b.textContent = 'Continua'; return; }
      running = true; b.textContent = 'Pausa';
      timer = setInterval(function () { left--; $('#tm').textContent = fmt(Math.max(0, left)); if (left <= 0) { clearInterval(timer); running = false; b.textContent = 'Torna a començar'; left = T.secs; toast('Temps!'); } }, 1000);
      timers.push(timer);
    };
    if (SR) $('[data-rec]').onclick = function () {
      var b = this, out = $('#rec');
      if (b.classList.contains('on')) { try { recognize.current.stop(); } catch (e) {} return; }
      b.classList.add('on'); b.innerHTML = IC.stop + 'Atura';
      out.textContent = 'Escoltant…';
      recognize(true, function (t) { out.textContent = t; }).then(function () { b.classList.remove('on'); b.innerHTML = IC.mic + 'Transcriu el que dic'; if (out.textContent === 'Escoltant…') out.textContent = 'No s\'ha sentit res.'; })
        .catch(function (e) { b.classList.remove('on'); b.innerHTML = IC.mic + 'Transcriu el que dic'; out.textContent = e === 'not-allowed' || e === 'service-not-allowed' ? 'El navegador no permet fer servir el micròfon aquí.' : 'No s\'ha pogut fer servir el reconeixement de veu.'; });
    };
    $('[data-show]').onclick = function () { $('#mtext').hidden = !$('#mtext').hidden; this.textContent = $('#mtext').hidden ? 'Mostra el text' : 'Amaga el text'; };
    $('[data-done]').onclick = function () { if (!S.speak[T.id]) { S.speak[T.id] = true; addXP(12, 'speak'); } this.textContent = 'Fet ✓'; };
  };
  function roleplay(id) {
    var R = CA.roleplay.filter(function (x) { return x.id === id; })[0];
    if (!R) { location.hash = 'parlar'; return; }
    var i = 0;
    app.innerHTML = '<div class="stack">' + head(esc(R.title), 'Escolta la frase i respon en veu alta. Després mira una resposta possible.', ['parlar', 'Expressió oral']) + audioNote() + '<div class="panel" id="pane"></div></div>';
    var pane = $('#pane');
    function render() {
      if (i >= R.lines.length) { pane.innerHTML = '<div class="result"><h2>Conversa acabada!</h2><div class="row" style="justify-content:center"><button type="button" class="btn pri" data-again>Torna-hi</button><a class="btn" href="#parlar">Expressió oral</a></div></div>'; $('[data-again]').onclick = function () { i = 0; render(); }; if (!S.speak['rol-' + R.id]) { S.speak['rol-' + R.id] = true; addXP(8, 'speak'); } return; }
      var l = R.lines[i];
      pane.innerHTML = '<div class="quiz"><div class="qhead"><span class="num">' + (i + 1) + ' / ' + R.lines.length + '</span>' + bar(i / R.lines.length * 100) + '</div>' +
        '<div class="lines"><div class="line"><span class="who">A</span><span class="prompt" style="font-size:1.2rem">' + esc(l[1]) + '</span>' + sayBtn(l[1]) + '</div></div>' +
        '<p class="hint">Respon en veu alta…</p><div id="sug"></div><div class="row"><button type="button" class="btn" data-sug>Mostra una resposta possible</button><span class="spacer"></span><button type="button" class="btn pri" data-next>Següent</button></div></div>';
      TTS.stop(); TTS.speak(l[1]);
      $('[data-sug]').onclick = function () { $('#sug').innerHTML = '<div class="line"><span class="who">Tu</span><span class="ca">' + esc(l[2]) + '</span>' + sayBtn(l[2]) + '</div>'; };
      $('[data-next]').onclick = function () { TTS.stop(); i++; render(); };
    }
    render();
  }

  ROUTES.pronuncia = function () {
    app.innerHTML = '<div class="stack">' + head('Pronunciació', 'Escolta cada paraula i repeteix-la.' + (SR ? ' Amb el micròfon pots comprovar si el reconeixement de veu t\'entén.' : ''), ['parlar', 'Expressió oral']) + audioNote() +
      CA.pronunciation.map(function (g, k) {
        return '<div class="panel"><h2>' + esc(g.title) + '</h2><p class="muted" style="margin:6px 0 12px">' + esc(g.tip) + '</p><div class="list">' + g.words.map(function (w) {
          return '<div class="li"><div class="grow ca" style="font-size:1.15rem">' + esc(w) + '</div><span class="pr-res" data-w="' + esc(w) + '"></span>' + sayBtn(w) + '<button type="button" class="say" data-slow data-say="' + esc(w) + '" title="Lent" aria-label="Escolta a poc a poc" style="font-size:.7rem;font-weight:700">½</button>' +
            (SR ? '<button type="button" class="say" data-try="' + esc(w) + '" aria-label="Prova-ho amb el micròfon" title="Prova-ho">' + IC.mic + '</button>' : '') + '</div>';
        }).join('') + '</div></div>';
      }).join('') + '<div class="row"><button type="button" class="btn pri" data-pdone>' + (S.pronDone ? 'Fet ✓' : 'Marca com a fet') + '</button></div></div>';
    $('[data-pdone]').onclick = function () { if (!S.pronDone) { S.pronDone = true; addXP(8, 'speak'); } this.textContent = 'Fet ✓'; };
    $$('[data-try]').forEach(function (b) {
      b.onclick = function () {
        var w = b.getAttribute('data-try'), res = $('.pr-res[data-w="' + w.replace(/"/g, '\\"') + '"]', b.parentNode);
        res.innerHTML = '<span class="pill">Escoltant…</span>';
        recognize(false).then(function (alts) {
          alts = alts || [];
          var ok = alts.some(function (a) { return noAcc(norm(a)).indexOf(noAcc(norm(w))) >= 0; });
          res.innerHTML = ok ? '<span class="pill ok">Entès!</span>' : '<span class="pill near" title="' + esc(alts.join(' · ')) + '">He sentit: ' + esc(alts[0] || '—') + '</span>';
          if (ok) addXP(1, 'speak');
        }).catch(function () { res.innerHTML = '<span class="pill bad">Micròfon no disponible</span>'; });
      };
    });
  };

  // ========== EXAMEN ==========
  ROUTES.examen = function () {
    var hist = S.exams.slice(-6).reverse();
    app.innerHTML = '<div class="stack">' + head('Simulacre d\'examen', 'Un model d\'examen amb textos i preguntes a l\'atzar, per entrenar-te en condicions semblants a les reals.') +
      '<div class="two"><div class="panel stack"><h2>Com és</h2><div class="list">' +
      [['1', 'Comprensió lectora', 'Un text breu i 5 preguntes.'], ['2', 'Comprensió oral', 'Un diàleg que pots escoltar com a màxim dues vegades.'],
       ['3', 'Gramàtica i vocabulari', '15 preguntes d\'opció múltiple.'], ['4', 'Expressió escrita', 'Una tasca d\'escriptura amb autoavaluació.']].map(function (p) {
        return '<div class="li"><span class="pill">' + p[0] + '</span><div class="grow"><b>' + p[1] + '</b><div class="es">' + p[2] + '</div></div></div>';
      }).join('') + '</div><p class="muted small">Temps recomanat: 75 minuts. Pots fer la part oral a la secció <a href="#parlar">Expressió oral</a>. El resultat és orientatiu: consulta sempre la convocatòria oficial.</p>' +
      '<div class="row"><button type="button" class="btn pri" data-start>Comença el simulacre</button></div></div>' +
      '<div class="panel"><h2 style="margin-bottom:10px">Resultats anteriors</h2>' + (hist.length ? '<div class="list">' + hist.map(function (e) {
        return '<div class="li"><div class="grow"><b class="num">' + e.date + '</b><div class="es">Lectura ' + e.parts[0] + ' % · Oral ' + e.parts[1] + ' % · Gramàtica ' + e.parts[2] + ' % · Escrita ' + e.parts[3] + ' %</div></div>' + scorePill(e.total) + '</div>';
      }).join('') + '</div>' : '<p class="muted">Encara no n\'has fet cap. Quan acabis el primer, veuràs aquí la teva evolució.</p>') + '</div></div></div>';
    $('[data-start]').onclick = startExam;
  };
  function startExam() {
    var R = pick(CA.reading), L = pick(CA.listening), W = pick(CA.writing);
    var G = sample(CA.grammar.reduce(function (a, u) { return a.concat(u.ex.filter(function (x) { return x.o && !/^¿|^Mañana/.test(x.q); })); }, []), 10)
      .map(function (x) { return { q: x.q, o: shuffle(x.o), a: x.a }; });
    var Vq = sample(WORDS.filter(function (w) { return w.theme !== 'numeros'; }), 5).map(function (w) {
      var others = sample(WORDS.filter(function (x) { return x.theme === w.theme && x.ca !== w.ca && x.es !== w.es; }), 3).map(function (x) { return x.ca; });
      return { q: 'Com es diu «' + w.es + '» en català?', o: shuffle([w.ca].concat(others)), a: w.ca };
    });
    var GV = G.concat(Vq), plays = 0, t0 = Date.now();
    app.innerHTML = '<div class="stack"><div class="examtimer"><span>Simulacre A2</span><span class="spacer"></span><span class="num" id="et">0:00</span><span class="small" style="opacity:.7">/ 75:00</span></div>' +
      '<section class="panel"><div class="section-title"><span class="n">PART 1</span><h2>Comprensió lectora</h2></div><div class="doc" style="margin-top:20px"><span class="kind">' + esc(R.kind) + '</span><div class="text">' + esc(R.text) + '</div></div>' + qsHtml(R.qs, 'r') + '</section>' +
      '<section class="panel"><div class="section-title"><span class="n">PART 2</span><h2>Comprensió oral</h2></div><div class="player" style="margin:14px 0"><button type="button" class="play" aria-label="Reprodueix">' + IC.play + '</button><div class="meta"><b>' + esc(L.title) + '</b><span id="pl">Pots escoltar-ho 2 vegades</span><div class="wave">' + new Array(28).join('<i></i>') + '</div></div></div>' + qsHtml(L.qs, 'l') + '</section>' +
      '<section class="panel"><div class="section-title"><span class="n">PART 3</span><h2>Gramàtica i vocabulari</h2></div>' + qsHtml(GV.map(function (x) { return { q: x.q.replace(/___/g, '……'), o: x.o, a: x.a }; }), 'g') + '</section>' +
      '<section class="panel stack"><div class="section-title"><span class="n">PART 4</span><h2>Expressió escrita</h2></div><p>' + esc(W.task) + ' <b>(' + W.min + '–' + W.max + ' paraules)</b></p>' +
      '<textarea id="ex-text" spellcheck="false" aria-label="El teu text" placeholder="Escriu aquí…"></textarea><span class="count num" id="ex-count">0 paraules</span>' +
      '<div class="checks"><p class="muted small">Quan acabis, marca el que has inclòs:</p>' + W.check.map(function (c, k) { return '<label><input type="checkbox" data-xc="' + k + '"><span>' + esc(c) + '</span></label>'; }).join('') + '</div></section>' +
      '<div class="row"><button type="button" class="btn pri" data-finish>Lliura l\'examen</button><span class="muted small">Revisa que hagis respost totes les preguntes.</span></div><div id="ex-res"></div></div>';
    bindQs(app);
    var tick = setInterval(function () { var s = Math.floor((Date.now() - t0) / 1000); $('#et').textContent = Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }, 1000); timers.push(tick);
    var ta = $('#ex-text'); ta.oninput = function () { $('#ex-count').textContent = wc(ta.value) + ' paraules'; };
    var pb = $('.player .play'), player = $('.player');
    pb.onclick = function () {
      if (player.classList.contains('playing')) { TTS.stop(); player.classList.remove('playing'); pb.innerHTML = IC.play; return; }
      if (plays >= 2) { toast('Ja l\'has escoltat dues vegades'); return; }
      plays++; $('#pl').textContent = 'Audició ' + plays + ' de 2'; player.classList.add('playing'); pb.innerHTML = IC.stop;
      TTS.dialog(L.lines, S.set.rate).then(function () { player.classList.remove('playing'); pb.innerHTML = IC.play; if (plays >= 2) pb.disabled = true; });
    };
    $('[data-finish]').onclick = function () {
      clearInterval(tick); TTS.stop();
      var r = pct(gradeQs(app, R.qs, 'r'), R.qs.length), l = pct(gradeQs(app, L.qs, 'l'), L.qs.length), g = pct(gradeQs(app, GV, 'g'), GV.length);
      var n = wc(ta.value), checks = $$('[data-xc]:checked').length, w = n < 10 ? 0 : Math.round((checks / W.check.length) * 80 + (n >= W.min && n <= W.max + 15 ? 20 : n >= W.min * 0.7 ? 10 : 0));
      var total = Math.round((r + l + g + w) / 4), parts = [r, l, g, w], date = new Date().toLocaleDateString('ca-ES');
      S.exams.push({ date: date, total: total, parts: parts }); addXP(25, 'exam');
      var issues = lint(ta.value);
      $('#ex-res').innerHTML = '<div class="panel stack"><div class="row" style="justify-content:space-between"><h2>Resultat</h2>' + scorePill(total) + '</div>' +
        [['Comprensió lectora', r], ['Comprensió oral', l], ['Gramàtica i vocabulari', g], ['Expressió escrita (autoavaluada)', w]].map(function (x) {
          return '<div class="skill"><div class="row" style="justify-content:space-between;font-weight:700;font-size:.9rem"><span>' + x[0] + '</span><span class="num">' + x[1] + ' %</span></div>' + bar(x[1]) + '</div>';
        }).join('') +
        '<p class="muted small">Orientativament, apunta a un 60 % o més a cada part. Les respostes correctes estan marcades en verd a dalt.</p>' +
        (issues.length ? '<h3>Revisa a la redacció</h3><ul class="issues">' + issues.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="row"><a class="btn" href="#examen">Tornar</a><button type="button" class="btn pri" data-again>Un altre simulacre</button></div></div>';
      $('[data-again]').onclick = startExam;
      this.disabled = true; ta.readOnly = true;
      $('#ex-res').scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    window.scrollTo(0, 0);
  }

  function audioStatus() {
    var s = TTS.status(), v = TTS.voice();
    var txt = { none: ['bad', 'Este navegador no puede leer en voz alta. Si estás dentro de otra app, abre el enlace en Chrome o Safari.'],
      ca: ['ok', 'Voz catalana disponible' + (v ? ': ' + v.name : '') + '.'],
      other: ['near', 'No hay voz catalana. Se usará ' + (v ? '«' + v.name + '»' : 'otra voz') + ', con pronunciación aproximada. Instala la catalana (abajo).'],
      unknown: ['near', 'El navegador no informa de sus voces. Pulsa «Prova el so»: si no oyes nada, sube el volumen, quita el modo silencio o instala la voz catalana.'] }[s];
    return '<div class="fb ' + txt[0] + '" style="font-weight:400">' + txt[1] + '</div>';
  }

  // ========== AJUSTOS ==========
  ROUTES.ajustos = function () {
    var vs = TTS.voices;
    app.innerHTML = '<div class="stack">' + head('Ajustos', 'Veu, aparença i còpia de seguretat del progrés.') +
      '<div class="panel stack"><h2>Àudio</h2>' + audioStatus() +
      (TTS.ok && TTS.all.length ? '<label class="small muted" for="set-voice">Veu</label><select id="set-voice">' + (vs.length ? vs : TTS.all).map(function (v) { var cur = TTS.voice(); return '<option' + (cur && v.name === cur.name ? ' selected' : '') + '>' + esc(v.name) + '</option>'; }).join('') + '</select>' : '') +
      '<details' + (TTS.status() === 'ca' ? '' : ' open') + '><summary><b>Cómo instalar la voz catalana</b></summary><ul style="margin:8px 0 0;padding-left:1.2em;display:flex;flex-direction:column;gap:6px"><li><b>iPhone / iPad:</b> Ajustes → Accesibilidad → Contenido leído → Voces → Catalán → descarga «Montserrat» o «Jordi».</li><li><b>Android:</b> Ajustes → Administración general (o Sistema) → Idioma → Texto a voz → motor de Google → Instalar datos de voz → Catalán. Usa Chrome.</li><li><b>Windows:</b> Configuración → Hora e idioma → Voz → Agregar voces → Catalán. Usa Edge o Chrome.</li><li><b>Mac:</b> Ajustes del Sistema → Accesibilidad → Contenido leído → Voz del sistema → Gestionar voces → Catalán.</li><li>Después, <b>cierra y vuelve a abrir el navegador</b>.</li></ul></details>' +
      '<label class="small muted" for="set-rate">Velocitat: <span id="rate-v" class="num">' + S.set.rate.toFixed(2) + '</span></label><input type="range" id="set-rate" min="0.6" max="1.2" step="0.05" value="' + S.set.rate + '">' +
      '<div class="row"><button type="button" class="btn pri sm" data-say="Bon dia! Això és una prova de so. Si em sents, tot funciona.">' + IC.spk + 'Prova el so</button></div>' +
      '<div class="checks"><label><input type="checkbox" id="set-auto"' + (S.set.autoSay ? ' checked' : '') + '><span>Llegeix en veu alta la resposta correcta després de cada exercici</span></label></div></div>' +
      '<div class="panel stack"><h2>Estudi</h2><label class="small muted" for="set-goal">Objectiu diari (XP)</label><select id="set-goal">' + [20, 40, 60, 100].map(function (n) { return '<option' + (n === S.set.goal ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select>' +
      '<label class="small muted" for="set-new">Paraules noves per dia</label><select id="set-new">' + [5, 10, 15, 20, 30].map(function (n) { return '<option' + (n === S.set.newPerDay ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select>' +
      '<label class="small muted" for="set-theme">Aparença</label><select id="set-theme"><option value="">Com el sistema</option><option value="light"' + (S.set.theme === 'light' ? ' selected' : '') + '>Clar</option><option value="dark"' + (S.set.theme === 'dark' ? ' selected' : '') + '>Fosc</option></select></div>' +
      '<div class="panel stack"><h2>Còpia de seguretat</h2><p class="muted small">El progrés es guarda només en aquest navegador. Copia aquest codi per passar-lo a un altre dispositiu o per no perdre\'l.</p>' +
      '<textarea id="set-export" readonly style="min-height:90px;font-size:.8rem">' + esc(JSON.stringify(S)) + '</textarea><div class="row"><button type="button" class="btn sm" data-copy>Copia</button></div>' +
      '<label class="small muted" for="set-import">Enganxa aquí una còpia per recuperar-la</label><textarea id="set-import" style="min-height:90px;font-size:.8rem"></textarea><div class="row"><button type="button" class="btn sm" data-import>Recupera el progrés</button></div>' +
      '<div class="row" style="margin-top:8px"><button type="button" class="btn sm ghost" data-reset style="color:var(--bad)">Esborra tot el progrés</button></div></div></div>';
    var v = $('#set-voice'); if (v) v.onchange = function () { S.set.voice = v.value; save(); TTS.play('Bon dia! Així sona aquesta veu.'); };
    $('#set-rate').oninput = function () { S.set.rate = +this.value; $('#rate-v').textContent = S.set.rate.toFixed(2); save(); };
    $('#set-auto').onchange = function () { S.set.autoSay = this.checked; save(); };
    $('#set-goal').onchange = function () { S.set.goal = +this.value; save(); topStats(); };
    $('#set-new').onchange = function () { S.set.newPerDay = +this.value; save(); };
    $('#set-theme').onchange = function () { S.set.theme = this.value; save(); if (this.value) document.documentElement.setAttribute('data-theme', this.value); else document.documentElement.removeAttribute('data-theme'); };
    $('[data-copy]').onclick = function () {
      var ta = $('#set-export');
      var fallback = function () { ta.focus(); ta.select(); toast('Text seleccionat: copia\'l'); };
      try { navigator.clipboard.writeText(ta.value).then(function () { toast('Copiat'); }, fallback); } catch (e) { fallback(); }
    };
    $('[data-import]').onclick = function () {
      try { var o = JSON.parse($('#set-import').value); if (typeof o !== 'object' || !('xp' in o)) throw 0; S = Object.assign(defaults(), o); S.set = Object.assign(defaults().set, o.set || {}); save(); toast('Progrés recuperat'); route(); }
      catch (e) { toast('Aquest codi no és vàlid'); }
    };
    var armed = false;
    $('[data-reset]').onclick = function () {
      var b = this;
      if (!armed) { armed = true; b.textContent = 'Segur? Toca de nou per esborrar-ho tot'; setTimeout(function () { armed = false; b.textContent = 'Esborra tot el progrés'; }, 4000); return; }
      var keep = S.set; S = defaults(); S.set = keep; save(); toast('Progrés esborrat'); route();
    };
  };

  // Exposat per als tests
  CA._test = { norm: norm, noAcc: noAcc, check: check, variants: variants, diffWords: diffWords, lint: lint, gramItem: gramItem, fillGaps: fillGaps, stepInfo: stepInfo, unitSteps: unitSteps, chunks: function (t) { return TTS.chunks(t); } };
  route();
})();
