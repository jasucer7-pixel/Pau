/* Conjugador A2. Els verbs regulars en -ar es generen per regla (amb els canvis
   ortogràfics c→qu, g→gu, ç→c, j→g davant de e). La resta porten les formes escrites. */
window.CA = window.CA || {};
(function () {
  var ia = function (s) { return [s + 'ia', s + 'ies', s + 'ia', s + 'íem', s + 'íeu', s + 'ien']; };
  var PERSONS = ['jo', 'tu', 'ell / ella', 'nosaltres', 'vosaltres', 'ells / elles'];
  var TENSES = [
    { id: 'pres', name: 'Present', es: 'presente' },
    { id: 'perif', name: 'Passat perifràstic', es: 'pasado (hablé)' },
    { id: 'perf', name: 'Pretèrit perfet', es: 'he hablado' },
    { id: 'imp', name: 'Imperfet', es: 'hablaba' },
    { id: 'fut', name: 'Futur', es: 'hablaré' },
    { id: 'cond', name: 'Condicional', es: 'hablaría' }
  ];
  var V = [
    // Regulars en -ar
    ['parlar', 'hablar'], ['treballar', 'trabajar'], ['estudiar', 'estudiar'], ['comprar', 'comprar'], ['escoltar', 'escuchar'],
    ['mirar', 'mirar'], ['cantar', 'cantar'], ['ballar', 'bailar'], ['cuinar', 'cocinar'], ['esperar', 'esperar'], ['tornar', 'volver'],
    ['arribar', 'llegar'], ['portar', 'llevar'], ['dinar', 'comer (mediodía)'], ['sopar', 'cenar'], ['esmorzar', 'desayunar'],
    ['menjar', 'comer'], ['començar', 'empezar'], ['pagar', 'pagar'], ['jugar', 'jugar'], ['trucar', 'llamar (por teléfono)'],
    ['viatjar', 'viajar'], ['tancar', 'cerrar'], ['llevar-se', 'levantarse'], ['dutxar-se', 'ducharse'],
    // Irregulars i altres conjugacions
    { inf: 'ser', es: 'ser', pres: ['soc', 'ets', 'és', 'som', 'sou', 'són'], imp: ['era', 'eres', 'era', 'érem', 'éreu', 'eren'], part: 'estat', fut: 'ser' },
    { inf: 'estar', es: 'estar', pres: ['estic', 'estàs', 'està', 'estem', 'esteu', 'estan'], part: 'estat' },
    { inf: 'tenir', es: 'tener', pres: ['tinc', 'tens', 'té', 'tenim', 'teniu', 'tenen'], imp: ia('ten'), part: 'tingut', fut: 'tindr' },
    { inf: 'fer', es: 'hacer', pres: ['faig', 'fas', 'fa', 'fem', 'feu', 'fan'], imp: ['feia', 'feies', 'feia', 'fèiem', 'fèieu', 'feien'], part: 'fet', fut: 'far' },
    { inf: 'anar', es: 'ir', pres: ['vaig', 'vas', 'va', 'anem', 'aneu', 'van'], part: 'anat', fut: 'anir' },
    { inf: 'venir', es: 'venir', pres: ['vinc', 'vens', 've', 'venim', 'veniu', 'venen'], imp: ia('ven'), part: 'vingut', fut: 'vindr' },
    { inf: 'poder', es: 'poder', pres: ['puc', 'pots', 'pot', 'podem', 'podeu', 'poden'], imp: ia('pod'), part: 'pogut', fut: 'podr' },
    { inf: 'voler', es: 'querer', pres: ['vull', 'vols', 'vol', 'volem', 'voleu', 'volen'], imp: ia('vol'), part: 'volgut', fut: 'voldr' },
    { inf: 'saber', es: 'saber', pres: ['sé', 'saps', 'sap', 'sabem', 'sabeu', 'saben'], imp: ia('sab'), part: 'sabut', fut: 'sabr' },
    { inf: 'dir', es: 'decir', pres: ['dic', 'dius', 'diu', 'diem', 'dieu', 'diuen'], imp: ['deia', 'deies', 'deia', 'dèiem', 'dèieu', 'deien'], part: 'dit', fut: 'dir' },
    { inf: 'veure', es: 'ver', pres: ['veig', 'veus', 'veu', 'veiem', 'veieu', 'veuen'], imp: ['veia', 'veies', 'veia', 'vèiem', 'vèieu', 'veien'], part: 'vist', fut: 'veur' },
    { inf: 'beure', es: 'beber', pres: ['bec', 'beus', 'beu', 'bevem', 'beveu', 'beuen'], imp: ia('bev'), part: 'begut', fut: 'beur' },
    { inf: 'viure', es: 'vivir', pres: ['visc', 'vius', 'viu', 'vivim', 'viviu', 'viuen'], imp: ia('viv'), part: 'viscut', fut: 'viur' },
    { inf: 'escriure', es: 'escribir', pres: ['escric', 'escrius', 'escriu', 'escrivim', 'escriviu', 'escriuen'], imp: ia('escriv'), part: 'escrit', fut: 'escriur' },
    { inf: 'conèixer', es: 'conocer', pres: ['conec', 'coneixes', 'coneix', 'coneixem', 'coneixeu', 'coneixen'], imp: ia('coneix'), part: 'conegut', fut: 'coneixer' },
    { inf: 'dormir', es: 'dormir', pres: ['dormo', 'dorms', 'dorm', 'dormim', 'dormiu', 'dormen'], imp: ia('dorm'), part: 'dormit', fut: 'dormir' },
    { inf: 'sortir', es: 'salir', pres: ['surto', 'surts', 'surt', 'sortim', 'sortiu', 'surten'], imp: ia('sort'), part: 'sortit', fut: 'sortir' },
    { inf: 'obrir', es: 'abrir', pres: ['obro', 'obres', 'obre', 'obrim', 'obriu', 'obren'], imp: ia('obr'), part: 'obert', fut: 'obrir' },
    { inf: 'llegir', es: 'leer', pres: ['llegeixo', 'llegeixes', 'llegeix', 'llegim', 'llegiu', 'llegeixen'], imp: ia('lleg'), part: 'llegit', fut: 'llegir' },
    { inf: 'preferir', es: 'preferir', pres: ['prefereixo', 'prefereixes', 'prefereix', 'preferim', 'preferiu', 'prefereixen'], imp: ia('prefer'), part: 'preferit', fut: 'preferir' },
    { inf: 'perdre', es: 'perder', pres: ['perdo', 'perds', 'perd', 'perdem', 'perdeu', 'perden'], imp: ia('perd'), part: 'perdut', fut: 'perdr' },
    { inf: 'entendre', es: 'entender', pres: ['entenc', 'entens', 'entén', 'entenem', 'enteneu', 'entenen'], imp: ia('enten'), part: 'entès', fut: 'entendr' },
    { inf: 'prendre', es: 'tomar', pres: ['prenc', 'prens', 'pren', 'prenem', 'preneu', 'prenen'], imp: ia('pren'), part: 'pres', fut: 'prendr' },
    { inf: 'rebre', es: 'recibir', pres: ['rebo', 'reps', 'rep', 'rebem', 'rebeu', 'reben'], imp: ia('reb'), part: 'rebut', fut: 'rebr' }
  ];

  var FUT = ['é', 'às', 'à', 'em', 'eu', 'an'];
  var COND = ['ia', 'ies', 'ia', 'íem', 'íeu', 'ien'];
  var AUX_PERIF = [['vaig'], ['vas', 'vares'], ['va'], ['vam', 'vàrem'], ['vau', 'vàreu'], ['van', 'varen']];
  var AUX_PERF = ['he', 'has', 'ha', 'hem', 'heu', 'han'];
  var REFL = ['em', 'et', 'es', 'ens', 'us', 'es'];
  var ENCL = ['-me', '-te', '-se', '-nos', '-vos', '-se'];

  function softStem(stem) { // davant de e
    return stem.replace(/c$/, 'qu').replace(/g$/, 'gu').replace(/ç$/, 'c').replace(/j$/, 'g');
  }
  function proclitic(p, form) { // em + llevo → em llevo ; em + he → m'he
    if (/^[aeiouàèéíòóúh]/i.test(form) && (p === 'em' || p === 'et' || p === 'es')) return p[1] + "'" + form;
    return p + ' ' + form;
  }

  function build(raw) {
    var v = Array.isArray(raw) ? { inf: raw[0], es: raw[1], reg: true } : Object.assign({}, raw);
    v.refl = /-se$/.test(v.inf);
    var base = v.refl ? v.inf.replace(/-se$/, '') : v.inf;
    var isAr = /ar$/.test(base);
    if (isAr) {
      var st = base.slice(0, -2), soft = softStem(st);
      if (!v.pres) v.pres = [st + 'o', soft + 'es', st + 'a', soft + 'em', soft + 'eu', soft + 'en'];
      if (!v.imp) v.imp = [st + 'ava', st + 'aves', st + 'ava', st + 'àvem', st + 'àveu', st + 'aven'];
      if (!v.part) v.part = st + 'at';
      if (!v.fut) v.fut = base;
    }
    var c = { pres: [], perif: [], perf: [], imp: [], fut: [], cond: [] };
    for (var i = 0; i < 6; i++) {
      var R = v.refl ? function (f) { return proclitic(REFL[i], f); } : function (f) { return f; };
      c.pres.push([R(v.pres[i])]);
      c.imp.push([R(v.imp[i])]);
      c.fut.push([R(v.fut + FUT[i])]);
      c.cond.push([R(v.fut + COND[i])]);
      c.perf.push([R(AUX_PERF[i] + ' ' + v.part)]);
      var per = AUX_PERIF[i].map(function (a) { return R(a + ' ' + base); });
      if (v.refl) AUX_PERIF[i].forEach(function (a) { per.push(a + ' ' + base + ENCL[i]); });
      c.perif.push(per);
    }
    v.conj = c; // cada cel·la: [forma principal, variants acceptades…]
    return v;
  }

  CA.verbs = { persons: PERSONS, tenses: TENSES, list: V.map(build) };
})();
