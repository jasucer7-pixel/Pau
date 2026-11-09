/* Pequeñas gráficas SVG para las soluciones (programación lineal y umbral de rentabilidad). */
(function (P) {
  'use strict';
  const fmt = P.fmt;
  const nice = (v) => {
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const m = v / p;
    return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
  };

  function frame(W, H, pad, xmax, ymax, xl, yl) {
    const sx = (x) => pad.l + (x / xmax) * (W - pad.l - pad.r);
    const sy = (y) => H - pad.b - (y / ymax) * (H - pad.t - pad.b);
    const stepX = nice(xmax / 5), stepY = nice(ymax / 5);
    let g = '';
    for (let x = stepX; x <= xmax + 1e-9; x += stepX) g += `<line class="grid" x1="${sx(x)}" y1="${sy(0)}" x2="${sx(x)}" y2="${sy(ymax)}"/><text class="tick" x="${sx(x)}" y="${sy(0) + 14}" text-anchor="middle">${fmt(x, 2)}</text>`;
    for (let y = stepY; y <= ymax + 1e-9; y += stepY) g += `<line class="grid" x1="${sx(0)}" y1="${sy(y)}" x2="${sx(xmax)}" y2="${sy(y)}"/><text class="tick" x="${sx(0) - 6}" y="${sy(y) + 4}" text-anchor="end">${fmt(y, 2)}</text>`;
    g += `<line class="axis" x1="${sx(0)}" y1="${sy(0)}" x2="${sx(xmax)}" y2="${sy(0)}"/><line class="axis" x1="${sx(0)}" y1="${sy(0)}" x2="${sx(0)}" y2="${sy(ymax)}"/>`;
    g += `<text class="axl" x="${sx(xmax)}" y="${sy(0) - 6}" text-anchor="end">${xl}</text><text class="axl" x="${sx(0) + 6}" y="${sy(ymax) + 10}">${yl}</text>`;
    return { sx, sy, g };
  }

  function lp(d) {
    const W = 360, H = 280, pad = { l: 40, r: 16, t: 14, b: 26 };
    const xmax = Math.max(...d.lines.map(([a, , r]) => r / a), ...d.V.map((v) => v[0])) * 1.12;
    const ymax = Math.max(...d.lines.map(([, b, r]) => r / b), ...d.V.map((v) => v[1])) * 1.12;
    const { sx, sy, g } = frame(W, H, pad, xmax, ymax, 'x', 'y');
    const poly = d.V.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ');
    const lines = d.lines.map(([a, b, r], i) => {
      const x2 = Math.min(r / a, xmax), y1 = Math.min(r / b, ymax);
      const p1 = [r / b <= ymax ? 0 : (r - b * ymax) / a, y1];
      const p2 = [x2, r / a <= xmax ? 0 : (r - a * xmax) / b];
      return `<line class="ln ln${i}" x1="${sx(p1[0])}" y1="${sy(p1[1])}" x2="${sx(p2[0])}" y2="${sy(p2[1])}"/>`;
    }).join('');
    const names = ['O', 'A', 'B', 'C'];
    const dots = d.V.map(([x, y], i) => `<circle class="${i === d.best ? 'pt best' : 'pt'}" cx="${sx(x)}" cy="${sy(y)}" r="${i === d.best ? 6 : 4}"/><text class="lbl" x="${sx(x) + 7}" y="${sy(y) - 7}">${names[i]}</text>`).join('');
    return `<figure class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Región factible">${g}<polygon class="region" points="${poly}"/>${lines}${dots}</svg><figcaption>Región factible (sombreada) y vértices. El óptimo está resaltado.</figcaption></figure>`;
  }

  function breakEven(d) {
    const W = 360, H = 260, pad = { l: 64, r: 16, t: 14, b: 26 };
    const xmax = d.Q * 2, ymax = d.p * xmax * 1.05;
    const { sx, sy, g } = frame(W, H, pad, xmax, ymax, 'Q', '€');
    return `<figure class="chart"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Umbral de rentabilidad">${g}
<polygon class="loss" points="${sx(0)},${sy(0)} ${sx(0)},${sy(d.CF)} ${sx(d.Q)},${sy(d.p * d.Q)}"/>
<polygon class="gain" points="${sx(d.Q)},${sy(d.p * d.Q)} ${sx(xmax)},${sy(d.p * xmax)} ${sx(xmax)},${sy(d.CF + d.cv * xmax)}"/>
<line class="ln ln0" x1="${sx(0)}" y1="${sy(0)}" x2="${sx(xmax)}" y2="${sy(d.p * xmax)}"/>
<line class="ln ln1" x1="${sx(0)}" y1="${sy(d.CF)}" x2="${sx(xmax)}" y2="${sy(d.CF + d.cv * xmax)}"/>
<line class="ln dash" x1="${sx(0)}" y1="${sy(d.CF)}" x2="${sx(xmax)}" y2="${sy(d.CF)}"/>
<line class="ln dash" x1="${sx(d.Q)}" y1="${sy(0)}" x2="${sx(d.Q)}" y2="${sy(d.p * d.Q)}"/>
<circle class="pt best" cx="${sx(d.Q)}" cy="${sy(d.p * d.Q)}" r="5"/>
<text class="lbl" x="${sx(xmax) - 4}" y="${sy(d.p * xmax) + 14}" text-anchor="end">IT</text>
<text class="lbl" x="${sx(xmax) - 4}" y="${sy(d.CF + d.cv * xmax) + 14}" text-anchor="end">CT</text>
<text class="lbl" x="${sx(0) + 4}" y="${sy(d.CF) - 5}">CF</text>
<text class="lbl" x="${sx(d.Q) + 6}" y="${sy(0) - 6}">Q*</text></svg>
<figcaption>Zona roja: pérdidas · Zona verde: beneficios. Se cortan en el umbral $Q^*$.</figcaption></figure>`;
  }

  P.chart = function (q) {
    if (q.lp) return lp(q.lp);
    if (q.chart && q.chart.type === 'be') return breakEven(q.chart);
    return '';
  };
})(window.PAU);
