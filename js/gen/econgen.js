/* Generadores de problemas de Economía de la Empresa / Empresa y Diseño de Modelos de Negocio. */
(function (P) {
  'use strict';
  const { T, fmt, fmtTex, eur } = P;
  const add = (g) => P.addGen(g);
  const e0 = (x) => eur(x, 0);
  const e2 = (x) => eur(x, 2);
  const tbl = (head, rows) => `<div class="table-wrap"><table class="data"><thead><tr>${head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td${i ? ' class="num"' : ''}>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const pctT = (x, d = 2) => fmtTex(x, d) + '\\,\\%';
  const eT = (x, d = 2) => fmtTex(x, d) + '\\text{ €}';

  add({
    id: 'eco.umbral', name: 'Umbral de rentabilidad (punto muerto)',
    make(r) {
      const p = r.int(12, 180);
      const cv = r.int(Math.round(p * 0.3), Math.round(p * 0.8));
      const m = p - cv;
      const Q = r.step(500, 12000, 100);
      const CF = Q * m;
      const Qv = Math.round(Q * r.pick([0.6, 0.75, 0.8, 1.2, 1.25, 1.5]) / 10) * 10;
      const B = m * Qv - CF;
      const prod = r.pick(['bicicletas eléctricas', 'mochilas', 'lámparas', 'auriculares', 'sillas de oficina', 'cafeteras']);
      return {
        type: 'num', difficulty: 1,
        prompt: T`<p>Una empresa que fabrica ${prod} soporta unos costes fijos anuales de ${e0(CF)}. Cada unidad tiene un coste variable de ${e0(cv)} y se vende a ${e0(p)}.</p>
<p>a) Calcula el umbral de rentabilidad (en unidades). &nbsp; b) ¿Qué resultado obtiene si vende ${fmt(Qv, 0)} unidades?</p>`,
        fields: [{ label: 'a) Q* (uds.)', answer: Q, tol: 0.5 }, { label: 'b) Resultado (€)', answer: B, tol: 0.5 }],
        grid: 2,
        chart: { type: 'be', CF, p, cv, Q },
        solution: T`<p>a) En el umbral de rentabilidad los ingresos totales igualan a los costes totales ($IT = CT$):</p>
$$p\cdot Q = CF + CV_u\cdot Q \;\Rightarrow\; Q^* = \frac{CF}{p - CV_u} = \frac{${fmtTex(CF, 0)}}{${p} - ${cv}} = \boxed{${fmtTex(Q, 0)}\text{ unidades}}$$
<p>Cada unidad aporta un <b>margen de contribución</b> de ${e0(m)} para cubrir costes fijos.</p>
<p>b) $B = (p - CV_u)\cdot Q - CF = ${m}\cdot ${fmtTex(Qv, 0)} - ${fmtTex(CF, 0)} = \boxed{${eT(B, 0)}}$</p>
<p>${B >= 0 ? `Al vender por encima del umbral obtiene <b>beneficios</b>.` : `Al vender por debajo del umbral incurre en <b>pérdidas</b>.`}</p>
<p class="tip">En la PAU suelen pedir además la representación gráfica: recta de ingresos $IT=pQ$ (desde el origen) y de costes $CT=CF+CV_uQ$ (desde $CF$); se cortan en $Q^*$.</p>`,
      };
    },
  });

  add({
    id: 'eco.hacerComprar', name: 'Fabricar o comprar',
    make(r) {
      const cv = r.int(5, 60), pc = cv + r.int(3, 30);
      const Q = r.step(1000, 20000, 500);
      const CF = Q * (pc - cv);
      const D = Math.round(Q * r.pick([0.5, 0.7, 1.3, 1.6, 2]) / 100) * 100;
      const costMake = CF + cv * D, costBuy = pc * D;
      return {
        type: 'num', difficulty: 1,
        prompt: T`<p>Una empresa necesita un componente para su producto. Puede comprarlo a un proveedor a ${e0(pc)}/unidad o fabricarlo ella misma, lo que supone unos costes fijos de ${e0(CF)} anuales y un coste variable de ${e0(cv)}/unidad.</p>
<p>a) ¿A partir de qué número de unidades le interesa fabricar? &nbsp; b) Si necesita ${fmt(D, 0)} unidades, ¿cuál es el coste total de la opción más barata?</p>`,
        fields: [{ label: 'a) Q (uds.)', answer: Q, tol: 0.5 }, { label: 'b) Coste mínimo (€)', answer: Math.min(costMake, costBuy), tol: 0.5 }],
        grid: 2,
        solution: T`<p>a) Igualamos el coste de comprar y el de fabricar:</p>
$$${pc}\,Q = ${fmtTex(CF, 0)} + ${cv}\,Q \;\Rightarrow\; Q = \frac{${fmtTex(CF, 0)}}{${pc} - ${cv}} = \boxed{${fmtTex(Q, 0)}\text{ uds.}}$$
<p>Por encima de ${fmt(Q, 0)} uds. conviene <b>fabricar</b>; por debajo, <b>comprar</b>.</p>
<p>b) Para ${fmt(D, 0)} uds.: comprar cuesta $${pc}\cdot${fmtTex(D, 0)} = ${eT(costBuy, 0)}$ y fabricar $${fmtTex(CF, 0)} + ${cv}\cdot${fmtTex(D, 0)} = ${eT(costMake, 0)}$.</p>
<p>Le interesa <b>${costMake < costBuy ? 'fabricar' : 'comprar'}</b>, con un coste de $\boxed{${eT(Math.min(costMake, costBuy), 0)}}$.</p>`,
      };
    },
  });

  add({
    id: 'eco.productividad', name: 'Productividad del factor trabajo',
    make(r) {
      const w1 = r.int(8, 60), h = r.pick([1600, 1700, 1750, 1800]), q1 = r.step(20000, 300000, 1000);
      const w2 = w1 + r.int(-5, 8), q2 = Math.round(q1 * (1 + r.int(-15, 25) / 100) / 100) * 100;
      const p1 = q1 / (w1 * h), p2 = q2 / (w2 * h), tv = ((p2 - p1) / p1) * 100;
      const prod = r.pick(['camisetas', 'piezas', 'cajas de galletas', 'botellas']);
      return {
        type: 'num', difficulty: 1,
        prompt: T`<p>Una empresa produjo el año pasado ${fmt(q1, 0)} ${prod} con una plantilla de ${w1} trabajadores. Este año ha producido ${fmt(q2, 0)} ${prod} con ${w2} trabajadores. Cada trabajador trabaja ${fmt(h, 0)} horas al año.</p>
<p>Calcula la productividad del trabajo (uds./hora) de cada año y su tasa de variación (%). <span class="muted">Usa 4 decimales.</span></p>`,
        fields: [{ label: 'Prod. año 1', answer: p1, rel: 0.002 }, { label: 'Prod. año 2', answer: p2, rel: 0.002 }, { label: 'Variación (%)', answer: tv, tol: 0.06 }],
        grid: 3,
        solution: T`$$\text{Productividad} = \frac{\text{Producción}}{\text{Nº de horas trabajadas}}$$
$$P_1 = \frac{${fmtTex(q1, 0)}}{${w1}\cdot ${fmtTex(h, 0)}} = \frac{${fmtTex(q1, 0)}}{${fmtTex(w1 * h, 0)}} \approx ${fmtTex(p1, 4)}\ \text{uds./h}$$
$$P_2 = \frac{${fmtTex(q2, 0)}}{${w2}\cdot ${fmtTex(h, 0)}} = \frac{${fmtTex(q2, 0)}}{${fmtTex(w2 * h, 0)}} \approx ${fmtTex(p2, 4)}\ \text{uds./h}$$
$$TV = \frac{P_2 - P_1}{P_1}\cdot 100 \approx \boxed{${pctT(tv)}}$$
<p>La productividad del trabajo ha <b>${tv >= 0 ? 'aumentado' : 'disminuido'}</b> un ${fmt(Math.abs(tv), 2)} %: cada hora de trabajo genera ${tv >= 0 ? 'más' : 'menos'} producción que el año anterior.</p>`,
      };
    },
  });

  add({
    id: 'eco.prodGlobal', name: 'Productividad global',
    make(r) {
      const pv = r.int(10, 80);
      const hw = r.int(10, 25), pm = r.int(1, 6), pk = r.int(20, 80);
      const y = [0, 1].map(() => ({ q: r.step(10000, 80000, 500), L: r.step(3000, 15000, 100), Mt: r.step(5000, 40000, 500), K: r.step(100, 900, 10) }));
      const pg = y.map((v) => (v.q * pv) / (v.L * hw + v.Mt * pm + v.K * pk));
      const tv = ((pg[1] - pg[0]) / pg[0]) * 100;
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Una empresa elabora un único producto que vende a ${e0(pv)}/ud. Los datos de dos años consecutivos son:</p>
${tbl(['', 'Año 1', 'Año 2', 'Precio (€)'], [
  ['Producción (uds.)', fmt(y[0].q, 0), fmt(y[1].q, 0), fmt(pv, 0)],
  ['Horas de trabajo', fmt(y[0].L, 0), fmt(y[1].L, 0), fmt(hw, 0) + ' €/h'],
  ['Materiales (kg)', fmt(y[0].Mt, 0), fmt(y[1].Mt, 0), fmt(pm, 0) + ' €/kg'],
  ['Horas de máquina', fmt(y[0].K, 0), fmt(y[1].K, 0), fmt(pk, 0) + ' €/h'],
])}
<p>Calcula la productividad global de cada año (4 decimales) y su tasa de variación.</p>`,
        fields: [{ label: 'PG año 1', answer: pg[0], rel: 0.001 }, { label: 'PG año 2', answer: pg[1], rel: 0.001 }, { label: 'Variación (%)', answer: tv, tol: 0.06 }],
        grid: 3,
        solution: T`$$PG = \frac{\text{Valor de la producción}}{\text{Coste de los factores}} = \frac{\sum Q_i p_i}{\sum F_j c_j}$$
${[0, 1].map((i) => T`$$PG_${i + 1} = \frac{${fmtTex(y[i].q, 0)}\cdot ${pv}}{${fmtTex(y[i].L, 0)}\cdot${hw} + ${fmtTex(y[i].Mt, 0)}\cdot${pm} + ${fmtTex(y[i].K, 0)}\cdot${pk}} = \frac{${fmtTex(y[i].q * pv, 0)}}{${fmtTex(y[i].L * hw + y[i].Mt * pm + y[i].K * pk, 0)}} \approx ${fmtTex(pg[i], 4)}$$`).join('')}
$$TV = \frac{${fmtTex(pg[1], 4)} - ${fmtTex(pg[0], 4)}}{${fmtTex(pg[0], 4)}}\cdot 100 \approx \boxed{${pctT(tv)}}$$
<p>${pg[0] > 1 ? 'En el año 1 el valor de lo producido supera al coste de los factores (PG > 1). ' : 'En el año 1 el valor de lo producido no cubre el coste de los factores (PG < 1). '}La productividad global ${tv >= 0 ? 'mejora' : 'empeora'} un ${fmt(Math.abs(tv), 2)} %.</p>
<p class="tip">Se usan los mismos precios en ambos años para que la variación refleje cambios en la eficiencia y no en los precios.</p>`,
      };
    },
  });

  add({
    id: 'eco.van', name: 'Valor Actual Neto (VAN)',
    make(r) {
      const A = r.step(50000, 400000, 10000);
      const n = r.pick([3, 3, 4]);
      const k = r.pick([3, 4, 5, 6, 8, 10]);
      const F = Array.from({ length: n }, () => Math.round((A / n) * (r.int(70, 150) / 100) / 1000) * 1000);
      const terms = F.map((f, i) => f / (1 + k / 100) ** (i + 1));
      const van = -A + terms.reduce((s, x) => s + x, 0);
      const kk = fmtTex(1 + k / 100, 2);
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Una empresa estudia una inversión que requiere un desembolso inicial de ${e0(A)} y genera los siguientes flujos netos de caja:</p>
${tbl(F.map((_, i) => `Año ${i + 1}`), [F.map((f) => e0(f))])}
<p>Calcula el VAN con una tasa de actualización del ${k} % e indica si la inversión es aconsejable. <span class="muted">(2 decimales)</span></p>`,
        fields: [{ label: 'VAN (€)', answer: van, tol: 0.6 }],
        solution: T`$$VAN = -A + \sum_{t=1}^{n}\frac{F_t}{(1+k)^t}$$
$$VAN = -${fmtTex(A, 0)} ${F.map((f, i) => T`+ \frac{${fmtTex(f, 0)}}{${kk}^{${i + 1}}}`).join(' ')}$$
$$VAN = -${fmtTex(A, 0)} ${terms.map((t) => '+ ' + fmtTex(t, 2)).join(' ')} = \boxed{${eT(van)}}$$
<p>Como el VAN es <b>${van >= 0 ? 'positivo' : 'negativo'}</b>, la inversión <b>${van >= 0 ? 'es' : 'no es'} aconsejable</b>: ${van >= 0 ? 'los flujos actualizados superan el desembolso inicial y genera valor para la empresa.' : 'los flujos actualizados no llegan a recuperar el desembolso inicial.'}</p>
<p class="tip">Entre varios proyectos con VAN &gt; 0, se elige el de mayor VAN.</p>`,
      };
    },
  });

  add({
    id: 'eco.tir', name: 'Tasa Interna de Rentabilidad (TIR, 2 años)',
    make(r) {
      const A = r.step(10000, 200000, 5000);
      const r0 = r.pick([4, 5, 6, 8, 10, 12, 15, 20]) / 100;
      const F1 = Math.round((A * r.int(20, 80)) / 100 / 100) * 100;
      const F2 = Math.round((A * (1 + r0) - F1) * (1 + r0) / 100) * 100;
      const x = (F1 + Math.sqrt(F1 * F1 + 4 * A * F2)) / (2 * A);
      const tir = (x - 1) * 100;
      const k = r.pick([3, 5, 6, 8, 10]);
      return {
        type: 'num', difficulty: 3,
        prompt: T`<p>Un proyecto de inversión exige un desembolso inicial de ${e0(A)} y genera flujos de caja de ${e0(F1)} el primer año y ${e0(F2)} el segundo.</p>
<p>Calcula la TIR (en %, 2 decimales). ¿Es interesante si el coste del dinero es del ${k} %?</p>`,
        fields: [{ label: 'TIR (%)', answer: tir, tol: 0.02 }],
        solution: T`<p>La TIR es la tasa $r$ que hace $VAN = 0$:</p>
$$-${fmtTex(A, 0)} + \frac{${fmtTex(F1, 0)}}{1+r} + \frac{${fmtTex(F2, 0)}}{(1+r)^2} = 0$$
<p>Llamando $x = 1+r$ y multiplicando por $x^2$:</p>
$$${fmtTex(A, 0)}\,x^2 - ${fmtTex(F1, 0)}\,x - ${fmtTex(F2, 0)} = 0$$
$$x = \frac{${fmtTex(F1, 0)} + \sqrt{${fmtTex(F1, 0)}^2 + 4\cdot${fmtTex(A, 0)}\cdot${fmtTex(F2, 0)}}}{2\cdot ${fmtTex(A, 0)}} \approx ${fmtTex(x, 6)}$$
$$r = x - 1 \approx \boxed{${pctT(tir)}}$$
<p>(La raíz negativa se descarta.) Como la TIR (${fmt(tir, 2)} %) es ${tir > k ? '<b>mayor</b>' : '<b>menor</b>'} que el coste del dinero (${k} %), el proyecto <b>${tir > k ? 'es' : 'no es'} interesante</b>.</p>`,
      };
    },
  });

  add({
    id: 'eco.payback', name: 'Plazo de recuperación (pay-back)',
    make(r) {
      const n = 5;
      let A, F, cum, yr;
      do {
        A = r.step(40000, 300000, 5000);
        F = Array.from({ length: n }, () => Math.round((A / 3) * (r.int(50, 140) / 100) / 500) * 500);
        cum = 0; yr = -1;
        for (let i = 0; i < n; i++) { if (cum + F[i] >= A) { yr = i; break; } cum += F[i]; }
      } while (yr < 1 || yr > 3);
      const frac = (A - cum) / F[yr];
      const pb = yr + frac;
      const months = frac * 12;
      return {
        type: 'num', difficulty: 1,
        prompt: T`<p>Una inversión supone un desembolso inicial de ${e0(A)} y genera estos flujos de caja:</p>
${tbl(F.map((_, i) => `Año ${i + 1}`), [F.map((f) => e0(f))])}
<p>Calcula el plazo de recuperación en años (2 decimales), suponiendo que los flujos se generan uniformemente a lo largo de cada año.</p>`,
        fields: [{ label: 'Pay-back (años)', answer: pb, tol: 0.011 }],
        solution: T`<p>Acumulamos los flujos hasta recuperar los ${e0(A)}:</p>
${tbl(['Año', 'Flujo', 'Acumulado'], F.slice(0, yr + 1).map((f, i) => [i + 1, e0(f), e0(F.slice(0, i + 1).reduce((s, x) => s + x, 0))]))}
<p>Al final del año ${yr} se han recuperado ${e0(cum)}; faltan ${e0(A - cum)}, que se obtienen durante el año ${yr + 1}:</p>
$$\frac{${fmtTex(A - cum, 0)}}{${fmtTex(F[yr], 0)}} \approx ${fmtTex(frac, 4)}\text{ años} \;(\approx ${fmtTex(months, 1)}\text{ meses})$$
$$\text{Pay-back} \approx \boxed{${fmtTex(pb, 2)}\text{ años}}$$
<p class="tip">Inconveniente del pay-back: no tiene en cuenta el valor del dinero en el tiempo ni los flujos posteriores a la recuperación. Por eso es un método <b>estático</b>.</p>`,
      };
    },
  });

  add({
    id: 'eco.rentab', name: 'Rentabilidad económica y financiera',
    make(r) {
      const AT = r.step(200000, 2000000, 50000);
      const pnShare = r.step(0.3, 0.7, 0.05);
      const PN = Math.round(AT * pnShare / 1000) * 1000, D = AT - PN;
      const i = r.pick([3, 4, 5, 6, 7, 8, 10]);
      const BAII = Math.round(AT * r.int(4, 18) / 100 / 1000) * 1000;
      const I = D * i / 100, BAI = BAII - I, tax = 25, BN = BAI * (1 - tax / 100);
      const RE = BAII / AT * 100, RF = BN / PN * 100;
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Una empresa tiene un activo total de ${e0(AT)}, financiado con ${e0(PN)} de patrimonio neto y el resto con deudas a un tipo de interés del ${i} %. El beneficio antes de intereses e impuestos (BAII) ha sido de ${e0(BAII)} y el impuesto sobre beneficios es del ${tax} %.</p>
<p>Calcula la rentabilidad económica y la rentabilidad financiera (en %, 2 decimales).</p>`,
        fields: [{ label: 'RE (%)', answer: RE, tol: 0.011 }, { label: 'RF (%)', answer: RF, tol: 0.011 }],
        grid: 2,
        solution: T`<p><b>Rentabilidad económica</b> (rendimiento del activo, independientemente de cómo se financie):</p>
$$RE = \frac{BAII}{\text{Activo total}}\cdot 100 = \frac{${fmtTex(BAII, 0)}}{${fmtTex(AT, 0)}}\cdot100 = \boxed{${pctT(RE)}}$$
<p><b>Rentabilidad financiera</b> (rendimiento para los propietarios):</p>
<ul><li>Deudas: ${e0(D)} → Intereses = ${fmt(D, 0)} · ${i} % = ${e0(I)}</li>
<li>BAI = ${e0(BAII)} − ${e0(I)} = ${e0(BAI)}</li>
<li>Impuesto (${tax} %) = ${e2(BAI * tax / 100)} → BN = ${e2(BN)}</li></ul>
$$RF = \frac{BN}{\text{Patrimonio neto}}\cdot 100 = \frac{${fmtTex(BN, 2)}}{${fmtTex(PN, 0)}}\cdot100 = \boxed{${pctT(RF)}}$$
<p class="tip">Apalancamiento financiero: como la RE (${fmt(RE, 2)} %) es ${RE > i ? 'mayor' : 'menor'} que el coste de la deuda (${i} %), endeudarse ${RE > i ? '<b>aumenta</b>' : '<b>reduce</b>'} la rentabilidad de los socios (apalancamiento ${RE > i ? 'positivo' : 'negativo'}).</p>`,
      };
    },
  });

  add({
    id: 'eco.balance', name: 'Balance: fondo de maniobra y ratios',
    make(r) {
      const k = (lo, hi, st = 1000) => r.step(lo, hi, st);
      const it = {
        cons: k(60000, 300000, 5000), maq: k(20000, 150000, 5000), eqi: k(3000, 20000, 500), aa: k(10000, 60000, 1000),
        exi: k(10000, 90000, 1000), cli: k(8000, 80000, 1000), ban: k(3000, 40000, 500), caja: k(500, 5000, 100),
        res: k(10000, 80000, 1000), rdo: k(-10000, 40000, 1000), dlp: k(30000, 200000, 5000), prov: k(8000, 70000, 1000), dcp: k(3000, 40000, 1000),
      };
      const ANC = it.cons + it.maq + it.eqi - it.aa;
      const AC = it.exi + it.cli + it.ban + it.caja;
      const A = ANC + AC;
      const PC = it.prov + it.dcp, PNC = it.dlp;
      const cap = A - PC - PNC - it.res - it.rdo;
      if (cap < 20000) return P.gens['eco.balance'].make(r);
      const PN = cap + it.res + it.rdo;
      const FM = AC - PC, liq = AC / PC, tes = (it.cli + it.ban + it.caja) / PC, end = (PC + PNC) / (PN + PC + PNC);
      const rows = r.shuffle([
        ['Construcciones', it.cons], ['Maquinaria', it.maq], ['Equipos para procesos de información', it.eqi], ['Amortización acumulada del inmovilizado material', it.aa],
        ['Mercaderías (existencias)', it.exi], ['Clientes', it.cli], ['Bancos c/c', it.ban], ['Caja, euros', it.caja],
        ['Capital social', cap], ['Reservas', it.res], ['Resultado del ejercicio', it.rdo], ['Deudas a largo plazo con entidades de crédito', it.dlp],
        ['Proveedores', it.prov], ['Deudas a corto plazo con entidades de crédito', it.dcp],
      ]);
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Una empresa presenta las siguientes cuentas (en euros) a 31 de diciembre:</p>
${tbl(['Cuenta', 'Importe'], rows.map(([n, v]) => [n, fmt(v, 0)]))}
<p>Calcula el fondo de maniobra, el ratio de liquidez (AC/PC) y el ratio de endeudamiento (Pasivo total / Patrimonio neto + Pasivo). Ratios con 2 decimales.</p>`,
        fields: [{ label: 'Fondo de maniobra (€)', answer: FM, tol: 0.5 }, { label: 'Liquidez', answer: liq, tol: 0.006 }, { label: 'Endeudamiento', answer: end, tol: 0.006 }],
        grid: 3,
        solution: T`<p><b>1) Ordenamos el balance por masas patrimoniales:</b></p>
${tbl(['Masa', 'Importe'], [
  ['Activo no corriente (inmov. − amort. acum.)', e0(ANC)], ['Activo corriente (existencias + realizable + disponible)', e0(AC)], ['<b>Total activo</b>', `<b>${e0(A)}</b>`],
  ['Patrimonio neto (capital + reservas + resultado)', e0(PN)], ['Pasivo no corriente', e0(PNC)], ['Pasivo corriente', e0(PC)], ['<b>Total PN + pasivo</b>', `<b>${e0(PN + PNC + PC)}</b>`],
])}
<p><b>2) Fondo de maniobra:</b> $FM = AC - PC = ${fmtTex(AC, 0)} - ${fmtTex(PC, 0)} = \boxed{${eT(FM, 0)}}$. ${FM > 0 ? 'Es positivo: parte del activo corriente se financia con recursos permanentes, la empresa puede atender sus deudas a corto plazo (equilibrio financiero normal).' : 'Es negativo: el activo corriente no cubre las deudas a corto plazo, hay riesgo de <b>suspensión de pagos</b> (concurso de acreedores).'}</p>
<p><b>3) Liquidez:</b> $\dfrac{AC}{PC} = \dfrac{${fmtTex(AC, 0)}}{${fmtTex(PC, 0)}} \approx \boxed{${fmtTex(liq, 2)}}$ ${liq < 1.5 ? '(por debajo del intervalo orientativo 1,5–2: posibles tensiones de liquidez)' : liq > 2 ? '(por encima de 2: posible exceso de recursos ociosos)' : '(dentro del intervalo orientativo 1,5–2)'}.</p>
<p>Ratio de tesorería (ácida): $\dfrac{\text{Realizable}+\text{Disponible}}{PC} \approx ${fmtTex(tes, 2)}$.</p>
<p><b>4) Endeudamiento:</b> $\dfrac{PNC + PC}{PN + PNC + PC} = \dfrac{${fmtTex(PC + PNC, 0)}}{${fmtTex(A, 0)}} \approx \boxed{${fmtTex(end, 2)}}$ ${end > 0.6 ? '(endeudamiento elevado; se suele considerar razonable 0,4–0,6).' : end < 0.4 ? '(endeudamiento bajo; quizá recursos propios ociosos).' : '(dentro del intervalo razonable 0,4–0,6).'}</p>
<p class="tip">La amortización acumulada <b>resta</b> en el activo no corriente; el resultado del ejercicio negativo resta en el patrimonio neto.</p>`,
      };
    },
  });

  add({
    id: 'eco.wilson', name: 'Gestión de inventarios: modelo de Wilson',
    make(r) {
      let Q, g, K, D;
      do { Q = r.step(200, 4000, 100); g = r.pick([0.5, 1, 2, 4, 5, 8, 10]); K = r.pick([20, 25, 40, 50, 60, 80, 100, 120, 150, 200]); D = (Q * Q * g) / (2 * K); }
      while (!Number.isInteger(D) || D < 2 * Q || D > 300000);
      const N = D / Q, CT = N * K + (Q / 2) * g;
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Una empresa consume ${fmt(D, 0)} unidades al año de una materia prima. Cada pedido le cuesta ${e0(K)} y mantener una unidad almacenada un año ${eur(g, 2)}.</p>
<p>Calcula: a) el volumen óptimo de pedido; b) el número de pedidos al año (2 decimales); c) el coste total anual de gestión del inventario.</p>`,
        fields: [{ label: 'a) Q* (uds.)', answer: Q, tol: 0.5 }, { label: 'b) Nº pedidos', answer: N, tol: 0.011 }, { label: 'c) Coste (€)', answer: CT, tol: 0.6 }],
        grid: 3,
        solution: T`$$Q^* = \sqrt{\frac{2\,D\,K}{g}} = \sqrt{\frac{2\cdot${fmtTex(D, 0)}\cdot${K}}{${fmtTex(g, 2)}}} = \boxed{${fmtTex(Q, 0)}\text{ uds.}}$$
$$N = \frac{D}{Q^*} = \frac{${fmtTex(D, 0)}}{${fmtTex(Q, 0)}} \approx \boxed{${fmtTex(N, 2)}\text{ pedidos/año}}$$
$$CT = N\cdot K + \frac{Q^*}{2}\cdot g = ${fmtTex(N, 2)}\cdot${K} + \frac{${fmtTex(Q, 0)}}{2}\cdot${fmtTex(g, 2)} = \boxed{${eT(CT)}}$$
<p class="tip">En el óptimo de Wilson el coste de pedir ($N\cdot K$) coincide con el de almacenar ($\frac{Q}{2}g$): aquí ambos valen ${e2(N * K)}.</p>`,
      };
    },
  });

  add({
    id: 'eco.pmm', name: 'Periodo medio de maduración',
    make(r) {
      const cons = r.step(100000, 600000, 5000), smp = r.step(5000, 60000, 1000);
      const cprod = cons + r.step(50000, 300000, 5000), spec = r.step(3000, 40000, 1000);
      const cven = Math.round(cprod * r.int(90, 100) / 100 / 1000) * 1000, spt = r.step(5000, 60000, 1000);
      const ventas = Math.round(cven * r.int(115, 160) / 100 / 1000) * 1000, scl = r.step(10000, 90000, 1000);
      const compras = cons + r.step(-10000, 10000, 1000), sprov = r.step(5000, 60000, 1000);
      const PMa = (365 * smp) / cons, PMf = (365 * spec) / cprod, PMv = (365 * spt) / cven, PMc = (365 * scl) / ventas, PMp = (365 * sprov) / compras;
      const E = PMa + PMf + PMv + PMc, F = E - PMp;
      const ln = (n, x) => [n, e0(x)];
      return {
        type: 'num', difficulty: 3,
        prompt: T`<p>Una empresa industrial presenta los siguientes datos anuales (año de 365 días):</p>
${tbl(['Concepto', 'Importe'], [
  ln('Compras de materias primas', compras), ln('Consumo de materias primas', cons), ln('Saldo medio de materias primas', smp),
  ln('Coste de la producción', cprod), ln('Saldo medio de productos en curso', spec), ln('Coste de las ventas', cven),
  ln('Saldo medio de productos terminados', spt), ln('Ventas', ventas), ln('Saldo medio de clientes', scl), ln('Saldo medio de proveedores', sprov),
])}
<p>Calcula el periodo medio de maduración económico y financiero (en días, 2 decimales).</p>`,
        fields: [{ label: 'PMM económico', answer: E, tol: 0.06 }, { label: 'PMM financiero', answer: F, tol: 0.06 }],
        grid: 2,
        solution: T`<p>Cada subperiodo se calcula como $\dfrac{365}{\text{rotación}} = 365\cdot\dfrac{\text{saldo medio}}{\text{flujo anual}}$:</p>
${tbl(['Subperiodo', 'Cálculo', 'Días'], [
  ['Almacenamiento (PMa)', `365 · ${fmt(smp, 0)} / ${fmt(cons, 0)}`, fmt(PMa, 2)],
  ['Fabricación (PMf)', `365 · ${fmt(spec, 0)} / ${fmt(cprod, 0)}`, fmt(PMf, 2)],
  ['Venta (PMv)', `365 · ${fmt(spt, 0)} / ${fmt(cven, 0)}`, fmt(PMv, 2)],
  ['Cobro (PMc)', `365 · ${fmt(scl, 0)} / ${fmt(ventas, 0)}`, fmt(PMc, 2)],
  ['Pago (PMp)', `365 · ${fmt(sprov, 0)} / ${fmt(compras, 0)}`, fmt(PMp, 2)],
])}
$$PMM_{\text{económico}} = PMa + PMf + PMv + PMc \approx \boxed{${fmtTex(E, 2)}\text{ días}}$$
$$PMM_{\text{financiero}} = PMM_{\text{eco}} - PMp \approx \boxed{${fmtTex(F, 2)}\text{ días}}$$
<p>Interpretación: desde que el dinero sale de la empresa (pago a proveedores) hasta que vuelve (cobro a clientes) pasan unos ${fmt(F, 0)} días. Cuanto menor sea, menos financiación necesita el ciclo de explotación.</p>`,
      };
    },
  });

  add({
    id: 'eco.resultado', name: 'Cuenta de pérdidas y ganancias',
    make(r) {
      const v = r.step(200000, 1500000, 10000);
      const comp = Math.round(v * r.int(25, 45) / 100 / 1000) * 1000;
      const pers = Math.round(v * r.int(15, 30) / 100 / 1000) * 1000;
      const amort = r.step(5000, 60000, 1000);
      const otros = r.step(5000, 80000, 1000);
      const ingFin = r.step(0, 10000, 500), gFin = r.step(2000, 40000, 500);
      const rex = v - comp - pers - amort - otros, rfin = ingFin - gFin, bai = rex + rfin;
      const imp = bai > 0 ? bai * 0.25 : 0, bn = bai - imp;
      const rows = r.shuffle([['Ventas de mercaderías', v], ['Compras de mercaderías', comp], ['Sueldos y salarios y Seguridad Social', pers], ['Amortización del inmovilizado', amort],
        ['Suministros, alquileres y otros servicios', otros], ['Ingresos financieros', ingFin], ['Intereses de deudas', gFin]]);
      return {
        type: 'num', difficulty: 1,
        prompt: T`<p>Con los siguientes datos de una empresa (en euros; no hay variación de existencias) y un impuesto sobre beneficios del 25 %:</p>
${tbl(['Concepto', 'Importe'], rows.map(([n, x]) => [n, fmt(x, 0)]))}
<p>Calcula el resultado de explotación, el resultado financiero y el resultado del ejercicio.</p>`,
        fields: [{ label: 'R. explotación (€)', answer: rex, tol: 0.5 }, { label: 'R. financiero (€)', answer: rfin, tol: 0.5 }, { label: 'R. ejercicio (€)', answer: bn, tol: 0.5 }],
        grid: 3,
        solution: T`${tbl(['Concepto', 'Importe'], [
  ['Ventas', e0(v)], ['− Compras (aprovisionamientos)', e0(comp)], ['− Gastos de personal', e0(pers)], ['− Otros gastos de explotación', e0(otros)], ['− Amortización', e0(amort)],
  ['<b>= Resultado de explotación (BAII)</b>', `<b>${e0(rex)}</b>`], ['+ Ingresos financieros', e0(ingFin)], ['− Gastos financieros', e0(gFin)],
  ['<b>= Resultado financiero</b>', `<b>${e0(rfin)}</b>`], ['<b>= Resultado antes de impuestos (BAI)</b>', `<b>${e0(bai)}</b>`],
  ['− Impuesto sobre beneficios (25 %)', e2(imp)], ['<b>= Resultado del ejercicio (BN)</b>', `<b>${e2(bn)}</b>`],
])}
${bai <= 0 ? '<p class="tip">Con BAI negativo no se paga impuesto sobre beneficios.</p>' : ''}`,
      };
    },
  });

  add({
    id: 'eco.amort', name: 'Amortización lineal y valor contable',
    make(r) {
      const C = r.step(10000, 200000, 1000), VR = Math.round(C * r.pick([0, 0.05, 0.1, 0.2]) / 100) * 100;
      const n = r.pick([4, 5, 8, 10, 20]), y = r.int(1, n - 1);
      const cuota = (C - VR) / n, acc = cuota * y, vnc = C - acc;
      const what = r.pick(['una máquina', 'una furgoneta', 'unos equipos informáticos', 'un horno industrial']);
      return {
        type: 'num', difficulty: 1,
        prompt: T`<p>Una empresa adquiere ${what} por ${e0(C)}. Se estima una vida útil de ${n} años y un valor residual de ${e0(VR)}. Aplica amortización lineal.</p><p>Calcula la cuota anual de amortización y el valor neto contable al cabo de ${y} año${y > 1 ? 's' : ''}.</p>`,
        fields: [{ label: 'Cuota anual (€)', answer: cuota, tol: 0.006 }, { label: `VNC año ${y} (€)`, answer: vnc, tol: 0.006 }],
        grid: 2,
        solution: T`$$\text{Cuota} = \frac{\text{Precio de adquisición} - \text{Valor residual}}{\text{Vida útil}} = \frac{${fmtTex(C, 0)} - ${fmtTex(VR, 0)}}{${n}} = \boxed{${eT(cuota)}}$$
$$\text{Amort. acumulada}_{${y}} = ${y}\cdot${fmtTex(cuota, 2)} = ${eT(acc)}$$
$$VNC = ${fmtTex(C, 0)} - ${fmtTex(acc, 2)} = \boxed{${eT(vnc)}}$$
<p class="tip">La amortización refleja la depreciación del inmovilizado y es una fuente de <b>autofinanciación de mantenimiento</b>: es un gasto que no supone salida de dinero.</p>`,
      };
    },
  });
})(window.PAU);
