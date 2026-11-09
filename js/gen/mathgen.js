/* Generadores de ejercicios de Matemáticas (II y Aplicadas a las CCSS II).
   Cada generador produce un enunciado distinto a partir de una semilla
   y devuelve la solución paso a paso. */
(function (P) {
  'use strict';
  const { Fr, M, T, polyTex, linTex, sgn, par, vecTex, fmtTex, Phi, comb, gcd } = P;
  const PROB_TOL = 0.0006;
  const R = (x, d = 4) => fmtTex(x, d);
  const add = (g) => P.addGen(g);

  // ======================= ÁLGEBRA =======================
  add({
    id: 'mat.det3', name: 'Determinante 3×3',
    make(r) {
      let A, d;
      do { A = [0, 1, 2].map(() => [0, 1, 2].map(() => r.int(-4, 5))); d = +M.det(A); } while (Math.abs(d) > 120 || d === 0);
      const a = A;
      const p1 = a[0][0] * a[1][1] * a[2][2], p2 = a[0][1] * a[1][2] * a[2][0], p3 = a[0][2] * a[1][0] * a[2][1];
      const n1 = a[0][2] * a[1][1] * a[2][0], n2 = a[0][0] * a[1][2] * a[2][1], n3 = a[0][1] * a[1][0] * a[2][2];
      return {
        type: 'num', difficulty: 1,
        prompt: T`Calcula el determinante de la matriz $$A = ${M.tex(A)}$$`,
        fields: [{ label: '$|A| =$', answer: d }],
        solution: T`<p>Aplicamos la regla de Sarrus:</p>
$$|A| = \underbrace{(${p1}) + (${p2}) + (${p3})}_{\text{diagonales principales}} - \underbrace{\big[(${n1}) + (${n2}) + (${n3})\big]}_{\text{diagonales secundarias}}$$
$$|A| = ${p1 + p2 + p3} - (${n1 + n2 + n3}) = \boxed{${d}}$$
<p class="tip">Comprueba siempre los signos de los productos: es donde se cometen casi todos los errores.</p>`,
      };
    },
  });

  add({
    id: 'mat.inv2', name: 'Matriz inversa 2×2',
    make(r) {
      let A, d;
      do { A = [[r.int(-5, 5), r.int(-5, 5)], [r.int(-5, 5), r.int(-5, 5)]]; d = +M.det(A); } while (d === 0 || Math.abs(d) > 6);
      const I = M.inv(A);
      const adjT = [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
      return {
        type: 'num', difficulty: 1,
        prompt: T`Calcula la inversa de $$A = ${M.tex(A)}$$ <p class="muted">Escribe cada elemento (admite fracciones, p. ej. <code>-3/2</code>).</p>`,
        fields: [
          { label: '$(A^{-1})_{11}$', answer: +I[0][0] }, { label: '$(A^{-1})_{12}$', answer: +I[0][1] },
          { label: '$(A^{-1})_{21}$', answer: +I[1][0] }, { label: '$(A^{-1})_{22}$', answer: +I[1][1] },
        ],
        grid: 2,
        solution: T`<p>1) $|A| = (${A[0][0]})(${A[1][1]}) - (${A[0][1]})(${A[1][0]}) = ${d} \neq 0$, luego existe $A^{-1}$.</p>
<p>2) Para una $2\times2$, $A^{-1} = \dfrac{1}{|A|}\begin{pmatrix} d & -b \\ -c & a\end{pmatrix}$:</p>
$$A^{-1} = \frac{1}{${d}}${M.tex(adjT)} = \boxed{${M.tex(I)}}$$
<p class="tip">Verifica: $A\cdot A^{-1} = I$.</p>`,
      };
    },
  });

  add({
    id: 'mat.rankParam', name: 'Matriz con parámetro: ¿cuándo no es invertible?',
    make(r) {
      for (;;) {
        const A = [0, 1, 2].map(() => [0, 1, 2].map(() => r.int(-3, 3)));
        const i = r.int(0, 2), j = r.int(0, 2);
        A[i][j] = 0;
        const cof = +M.cof(A, i, j);
        if (cof === 0) continue;
        const rest = +M.det(A);
        if (rest % cof !== 0) continue;
        const k0 = -rest / cof;
        if (Math.abs(k0) > 6 || rest === 0 && r() < 0.7) continue;
        const show = A.map((row, a) => row.map((v, b) => (a === i && b === j ? 'k' : String(v))));
        const mt = `\\begin{pmatrix}${show.map((rr) => rr.join(' & ')).join(' \\\\ ')}\\end{pmatrix}`;
        return {
          type: 'num', difficulty: 2,
          prompt: T`Dada la matriz $$A = ${mt}$$ halla el valor de $k$ para el cual $A$ <b>no</b> tiene inversa.`,
          fields: [{ label: '$k =$', answer: k0 }],
          solution: T`<p>$A$ es invertible $\iff |A| \neq 0$. Desarrollando el determinante (por ejemplo, por la fila ${i + 1}, donde está $k$):</p>
$$|A| = k\cdot \underbrace{(${cof})}_{\text{adjunto } A_{${i + 1}${j + 1}}} ${sgn(rest)} = ${polyTex([cof, rest], 'k')}$$
<p>$|A| = 0 \iff ${polyTex([cof, rest], 'k')} = 0 \iff \boxed{k = ${k0}}$.</p>
<p>Para $k \neq ${k0}$: $\operatorname{rg}(A) = 3$ y $A$ es invertible. Para $k = ${k0}$: $\operatorname{rg}(A) < 3$.</p>`,
        };
      }
    },
  });

  add({
    id: 'mat.cramer3', name: 'Sistema 3×3 (Cramer / Gauss)',
    make(r) {
      let A, d;
      const sol = [r.int(-3, 4), r.int(-3, 4), r.int(-3, 4)];
      do { A = [0, 1, 2].map(() => [0, 1, 2].map(() => r.int(-3, 3))); d = +M.det(A); } while (d === 0 || Math.abs(d) > 40);
      const b = A.map((row) => row.reduce((s, v, k) => s + v * sol[k], 0));
      const repl = (c) => A.map((row, i) => row.map((v, j) => (j === c ? b[i] : v)));
      const dx = +M.det(repl(0)), dy = +M.det(repl(1)), dz = +M.det(repl(2));
      const eq = A.map((row, i) => `${linTex([[row[0], 'x'], [row[1], 'y'], [row[2], 'z']])} &= ${b[i]}`).join(' \\\\ ');
      return {
        type: 'num', difficulty: 2,
        prompt: T`Resuelve el sistema: $$\left\{\begin{aligned} ${eq} \end{aligned}\right.$$`,
        fields: [{ label: '$x =$', answer: sol[0] }, { label: '$y =$', answer: sol[1] }, { label: '$z =$', answer: sol[2] }],
        grid: 3,
        solution: T`<p>$|A| = \left|${M.tex(A, 'matrix')}\right| = ${d} \neq 0 \Rightarrow$ rg$(A)=$ rg$(A^*)=3=$ nº incógnitas: <b>Sistema Compatible Determinado</b> (Rouché–Frobenius). Aplicamos Cramer:</p>
$$x = \frac{${dx}}{${d}} = ${sol[0]},\quad y = \frac{${dy}}{${d}} = ${sol[1]},\quad z = \frac{${dz}}{${d}} = ${sol[2]}$$
<p>donde cada numerador es el determinante de $A$ sustituyendo la columna de la incógnita por la de términos independientes.</p>
<p>Solución: $\boxed{(x,y,z) = (${sol.join(',')})}$</p>`,
      };
    },
  });

  add({
    id: 'mat.matEq', name: 'Ecuación matricial AX = B',
    make(r) {
      let A, d;
      do { A = [[r.int(-4, 4), r.int(-4, 4)], [r.int(-4, 4), r.int(-4, 4)]]; d = +M.det(A); } while (d === 0 || Math.abs(d) > 3);
      const X = [[r.int(-3, 3), r.int(-3, 3)], [r.int(-3, 3), r.int(-3, 3)]];
      const B = M.mul(A, X).map((row) => row.map((v) => +v));
      const right = r() < 0.5; // XA = B
      const Bm = right ? M.mul(X, A).map((row) => row.map((v) => +v)) : B;
      const I = M.inv(A);
      return {
        type: 'num', difficulty: 2,
        prompt: T`Sean $$A = ${M.tex(A)},\qquad B = ${M.tex(Bm)}.$$ Halla la matriz $X$ que verifica $${right ? 'XA = B' : 'AX = B'}$.`,
        fields: [{ label: '$x_{11}$', answer: X[0][0] }, { label: '$x_{12}$', answer: X[0][1] }, { label: '$x_{21}$', answer: X[1][0] }, { label: '$x_{22}$', answer: X[1][1] }],
        grid: 2,
        solution: T`<p>Como $|A| = ${d} \neq 0$, existe $A^{-1}$. ${right ? 'Multiplicando por la derecha' : 'Multiplicando por la izquierda'} por $A^{-1}$:</p>
$$${right ? 'X = B\\,A^{-1}' : 'X = A^{-1}B'},\qquad A^{-1} = ${M.tex(I)}$$
$$X = \boxed{${M.tex(X)}}$$
<p class="tip">¡Cuidado con el orden! El producto de matrices no es conmutativo: $AX=B \Rightarrow X=A^{-1}B$, pero $XA=B \Rightarrow X = BA^{-1}$.</p>`,
      };
    },
  });

  // ======================= ANÁLISIS =======================
  add({
    id: 'mat.limInf', name: 'Límites en el infinito',
    make(r) {
      const kind = r.pick(['ratio', 'sqrt', 'e', 'e2']);
      if (kind === 'ratio') {
        const n = r.pick([2, 3]);
        const num = [r.nz(-6, 6)].concat(Array.from({ length: n }, () => r.int(-5, 5)));
        const den = [r.nz(-6, 6)].concat(Array.from({ length: n }, () => r.int(-5, 5)));
        const L = new Fr(num[0], den[0]);
        return {
          type: 'num', difficulty: 1,
          prompt: T`Calcula $$\lim_{x\to+\infty} \frac{${polyTex(num)}}{${polyTex(den)}}$$`,
          fields: [{ label: 'Límite =', answer: +L }],
          solution: T`<p>Indeterminación $\frac{\infty}{\infty}$. Numerador y denominador tienen el mismo grado (${n}), así que el límite es el cociente de los coeficientes principales (equivale a dividir todo entre $x^{${n}}$):</p>
$$\lim_{x\to+\infty} \frac{${num[0]}x^{${n}}+\dots}{${den[0]}x^{${n}}+\dots} = \frac{${num[0]}}{${den[0]}} = \boxed{${L.tex()}}$$`,
        };
      }
      if (kind === 'sqrt') {
        const a = r.nz(-8, 8), b = r.int(-5, 5);
        const L = new Fr(a, 2);
        return {
          type: 'num', difficulty: 2,
          prompt: T`Calcula $$\lim_{x\to+\infty} \left(\sqrt{${polyTex([1, a, b])}} - x\right)$$`,
          fields: [{ label: 'Límite =', answer: +L }],
          solution: T`<p>Indeterminación $\infty - \infty$. Multiplicamos y dividimos por el conjugado:</p>
$$\lim_{x\to+\infty} \frac{(${polyTex([1, a, b])}) - x^2}{\sqrt{${polyTex([1, a, b])}} + x} = \lim_{x\to+\infty} \frac{${polyTex([a, b])}}{\sqrt{${polyTex([1, a, b])}} + x}$$
<p>Dividiendo entre $x$: $\dfrac{${a} ${sgn(b)}/x}{\sqrt{1 ${sgn(a)}/x ${sgn(b)}/x^2} + 1} \to \dfrac{${a}}{2} = \boxed{${L.tex()}}$</p>`,
        };
      }
      if (kind === 'e') {
        const a = r.nz(-4, 4), b = r.nz(1, 4);
        const ex = a * b;
        return {
          type: 'num', difficulty: 2,
          prompt: T`Calcula $$\lim_{x\to+\infty} \left(1 + \frac{${a}}{x}\right)^{${b === 1 ? '' : b}x}$$ <p class="muted">Puedes escribir el resultado como <code>e^3</code>, <code>e^(-2)</code>…</p>`,
          fields: [{ label: 'Límite =', answer: Math.exp(ex), rel: 1e-3 }],
          solution: T`<p>Indeterminación $1^\infty$. Usamos $\lim f^g = e^{\lim g\,(f-1)}$:</p>
$$\lim_{x\to+\infty} ${b === 1 ? '' : b}x\cdot\frac{${a}}{x} = ${ex} \quad\Rightarrow\quad \boxed{e^{${ex}}}$$`,
        };
      }
      const a = r.int(-4, 4), c = r.int(-4, 4), b = r.nz(1, 3);
      if (a === c) return P.gens['mat.limInf'].make(r);
      const ex = b * (a - c);
      return {
        type: 'num', difficulty: 3,
        prompt: T`Calcula $$\lim_{x\to+\infty} \left(\frac{${polyTex([1, a])}}{${polyTex([1, c])}}\right)^{${b === 1 ? '' : b}x}$$ <p class="muted">Puedes escribir el resultado como <code>e^3</code>.</p>`,
        fields: [{ label: 'Límite =', answer: Math.exp(ex), rel: 1e-3 }],
        solution: T`<p>Es de tipo $1^\infty$. Aplicamos $\lim f^g = e^{\lim g\,(f-1)}$:</p>
$$f - 1 = \frac{${polyTex([1, a])} - (${polyTex([1, c])})}{${polyTex([1, c])}} = \frac{${a - c}}{${polyTex([1, c])}}$$
$$\lim_{x\to+\infty} ${b === 1 ? '' : b}x\cdot\frac{${a - c}}{${polyTex([1, c])}} = ${ex} \quad\Rightarrow\quad \boxed{e^{${ex}}}$$`,
      };
    },
  });

  add({
    id: 'mat.limZero', name: 'Límites con L’Hôpital',
    make(r) {
      const kind = r.pick(['exp', 'sin', 'cos', 'ln']);
      const a = r.nz(1, 6), b = r.nz(1, 6);
      if (kind === 'exp') {
        const L = new Fr(a, b);
        return {
          type: 'num', difficulty: 2,
          prompt: T`Calcula $$\lim_{x\to 0} \frac{e^{${a}x} - 1}{${b}x}$$`,
          fields: [{ label: 'Límite =', answer: +L }],
          solution: T`<p>Indeterminación $\frac{0}{0}$. Por L'Hôpital derivamos numerador y denominador:</p>
$$\lim_{x\to 0} \frac{${a}e^{${a}x}}{${b}} = \frac{${a}}{${b}} = \boxed{${L.tex()}}$$`,
        };
      }
      if (kind === 'sin') {
        const L = new Fr(a, b);
        return {
          type: 'num', difficulty: 2,
          prompt: T`Calcula $$\lim_{x\to 0} \frac{\operatorname{sen}(${a}x)}{${b}x}$$`,
          fields: [{ label: 'Límite =', answer: +L }],
          solution: T`<p>Indeterminación $\frac{0}{0}$. Por L'Hôpital:</p>
$$\lim_{x\to 0} \frac{${a}\cos(${a}x)}{${b}} = \frac{${a}}{${b}} = \boxed{${L.tex()}}$$`,
        };
      }
      if (kind === 'cos') {
        const L = new Fr(a * a, 2 * b);
        return {
          type: 'num', difficulty: 3,
          prompt: T`Calcula $$\lim_{x\to 0} \frac{1 - \cos(${a}x)}{${b}x^2}$$`,
          fields: [{ label: 'Límite =', answer: +L }],
          solution: T`<p>Indeterminación $\frac{0}{0}$. Aplicamos L'Hôpital dos veces:</p>
$$\lim_{x\to 0} \frac{${a}\operatorname{sen}(${a}x)}{${2 * b}x} \;\overset{0/0}{=}\; \lim_{x\to 0} \frac{${a * a}\cos(${a}x)}{${2 * b}} = \frac{${a * a}}{${2 * b}} = \boxed{${L.tex()}}$$`,
        };
      }
      const L = new Fr(a, b);
      return {
        type: 'num', difficulty: 2,
        prompt: T`Calcula $$\lim_{x\to 0} \frac{\ln(1 + ${a}x)}{${b}x}$$`,
        fields: [{ label: 'Límite =', answer: +L }],
        solution: T`<p>Indeterminación $\frac{0}{0}$. Por L'Hôpital:</p>
$$\lim_{x\to 0} \frac{\frac{${a}}{1+${a}x}}{${b}} = \frac{${a}}{${b}} = \boxed{${L.tex()}}$$`,
      };
    },
  });

  add({
    id: 'mat.contParam', name: 'Continuidad de una función a trozos',
    make(r) {
      const c = r.int(-2, 3), a = r.nz(-4, 4), b = r.int(-5, 5);
      const k = a * c + b - c * c;
      return {
        type: 'num', difficulty: 1,
        prompt: T`Halla $k$ para que la función sea continua en $\mathbb{R}$: $$f(x) = \begin{cases} ${polyTex([a, b])} & \text{si } x < ${c} \\ x^2 + k & \text{si } x \ge ${c}\end{cases}$$`,
        fields: [{ label: '$k =$', answer: k }],
        solution: T`<p>Cada trozo es polinómico (continuo). Solo hay que estudiar $x = ${c}$: los límites laterales deben coincidir con $f(${c})$.</p>
$$\lim_{x\to ${c}^-} f(x) = ${a}\cdot${par(c)} ${sgn(b)} = ${a * c + b}, \qquad \lim_{x\to ${c}^+} f(x) = ${par(c)}^2 + k = ${c * c} + k = f(${c})$$
$$${a * c + b} = ${c * c} + k \;\Rightarrow\; \boxed{k = ${k}}$$`,
      };
    },
  });

  add({
    id: 'mat.derivEval', name: 'Derivadas: valor en un punto',
    make(r) {
      const kind = r.pick(['expo', 'ln', 'quot']);
      if (kind === 'expo') {
        const a = r.nz(-4, 4), b = r.int(-4, 4), c = r.nz(-3, 3);
        const val = a + c * b;
        return {
          type: 'num', difficulty: 1,
          prompt: T`Sea $f(x) = (${polyTex([a, b])})\,e^{${c === 1 ? '' : c === -1 ? '-' : c}x}$. Calcula $f'(0)$.`,
          fields: [{ label: "$f'(0) =$", answer: val }],
          solution: T`<p>Regla del producto: $(uv)' = u'v + uv'$.</p>
$$f'(x) = ${a}\,e^{${c}x} + (${polyTex([a, b])})\cdot ${par(c)}\,e^{${c}x} = (${polyTex([a * c, a + b * c])})\,e^{${c}x}$$
$$f'(0) = ${a + b * c}\cdot e^0 = \boxed{${val}}$$`,
        };
      }
      if (kind === 'ln') {
        const a = r.nz(1, 4), b = r.nz(1, 6), x0 = r.nz(-3, 3);
        const val = new Fr(2 * a * x0, a * x0 * x0 + b);
        return {
          type: 'num', difficulty: 1,
          prompt: T`Sea $f(x) = \ln(${polyTex([a, 0, b])})$. Calcula $f'(${x0})$.`,
          fields: [{ label: `$f'(${x0}) =$`, answer: +val }],
          solution: T`<p>$(\ln u)' = \dfrac{u'}{u}$:</p>
$$f'(x) = \frac{${2 * a === 1 ? '' : 2 * a}x}{${polyTex([a, 0, b])}} \quad\Rightarrow\quad f'(${x0}) = \frac{${2 * a * x0}}{${a * x0 * x0 + b}} = \boxed{${val.tex()}}$$`,
        };
      }
      let a, b, c, d, x0;
      do { a = r.int(-4, 4); b = r.int(-4, 4); c = r.nz(-3, 3); d = r.int(-4, 4); x0 = r.int(-2, 2); } while (a * d - b * c === 0 || c * x0 + d === 0);
      const val = new Fr(a * d - b * c, (c * x0 + d) ** 2);
      return {
        type: 'num', difficulty: 1,
        prompt: T`Sea $f(x) = \dfrac{${polyTex([a, b])}}{${polyTex([c, d])}}$. Calcula $f'(${x0})$.`,
        fields: [{ label: `$f'(${x0}) =$`, answer: +val }],
        solution: T`<p>Regla del cociente: $\left(\frac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$.</p>
$$f'(x) = \frac{${a}(${polyTex([c, d])}) - (${polyTex([a, b])})\cdot ${par(c)}}{(${polyTex([c, d])})^2} = \frac{${a * d - b * c}}{(${polyTex([c, d])})^2}$$
$$f'(${x0}) = \frac{${a * d - b * c}}{${(c * x0 + d) ** 2}} = \boxed{${val.tex()}}$$`,
      };
    },
  });

  add({
    id: 'mat.tangent', name: 'Recta tangente',
    make(r) {
      const c = [r.int(-2, 2), r.int(-3, 3), r.int(-4, 4), r.int(-5, 5)];
      if (c[0] === 0 && c[1] === 0) c[1] = 1;
      const x0 = r.int(-2, 2);
      const f = (x) => c[0] * x ** 3 + c[1] * x ** 2 + c[2] * x + c[3];
      const fp = (x) => 3 * c[0] * x * x + 2 * c[1] * x + c[2];
      const y0 = f(x0), m = fp(x0), n = y0 - m * x0;
      return {
        type: 'num', difficulty: 1,
        prompt: T`Halla la recta tangente a $f(x) = ${polyTex(c)}$ en el punto de abscisa $x = ${x0}$. Exprésala como $y = mx + n$.`,
        fields: [{ label: '$m =$', answer: m }, { label: '$n =$', answer: n }],
        grid: 2,
        solution: T`<p>La tangente en $x_0$ es $y - f(x_0) = f'(x_0)(x - x_0)$.</p>
$$f(${x0}) = ${y0}, \qquad f'(x) = ${polyTex([3 * c[0], 2 * c[1], c[2]])} \Rightarrow f'(${x0}) = ${m}$$
$$y - ${par(y0)} = ${m}\,(x - ${par(x0)}) \;\Rightarrow\; \boxed{y = ${polyTex([m, n])}}$$`,
      };
    },
  });

  add({
    id: 'mat.extrema', name: 'Extremos relativos y punto de inflexión',
    make(r) {
      let a, b;
      do { a = r.int(-4, 3); b = r.int(a + 1, 5); } while ((a + b) % 2 !== 0);
      const rr = r.int(-5, 5);
      const c2 = (-3 * (a + b)) / 2, c1 = 3 * a * b;
      const f = (x) => x ** 3 + c2 * x * x + c1 * x + rr;
      const xi = (a + b) / 2;
      return {
        type: 'num', difficulty: 2,
        prompt: T`Dada $f(x) = ${polyTex([1, c2, c1, rr])}$, halla las abscisas de su máximo relativo, de su mínimo relativo y de su punto de inflexión.`,
        fields: [{ label: '$x$ del máximo', answer: a }, { label: '$x$ del mínimo', answer: b }, { label: '$x$ de inflexión', answer: xi }],
        grid: 3,
        solution: T`<p>1) $f'(x) = ${polyTex([3, 2 * c2, c1])} = 3(${polyTex([1, -(a + b), a * b])}) = 3(x ${sgn(-a)})(x ${sgn(-b)})$. Se anula en $x = ${a}$ y $x = ${b}$.</p>
<p>2) $f''(x) = ${polyTex([6, 2 * c2])}$:</p>
<ul><li>$f''(${a}) = ${6 * a + 2 * c2} < 0 \Rightarrow$ <b>máximo relativo</b> en $(${a},\ ${f(a)})$.</li>
<li>$f''(${b}) = ${6 * b + 2 * c2} > 0 \Rightarrow$ <b>mínimo relativo</b> en $(${b},\ ${f(b)})$.</li>
<li>$f''(x) = 0 \iff x = ${xi}$, y $f''$ cambia de signo: <b>punto de inflexión</b> en $x = ${xi}$.</li></ul>
<p class="tip">Monotonía: crece en $(-\infty, ${a}) \cup (${b}, +\infty)$ y decrece en $(${a}, ${b})$.</p>`,
      };
    },
  });

  add({
    id: 'mat.intDef', name: 'Integral definida (Barrow)',
    make(r) {
      const deg = r.pick([2, 2, 3]);
      const c = Array.from({ length: deg + 1 }, () => r.int(-4, 4));
      if (c[0] === 0) c[0] = r.nz(-3, 3);
      const lo = r.int(-2, 1), hi = r.int(lo + 1, 3);
      // primitiva
      const F = c.map((v, i) => new Fr(v, deg - i + 1)).concat([new Fr(0)]);
      const ev = (x) => F.reduce((s, coef, i) => s.add(coef.mul(new Fr(x ** (F.length - 1 - i)))), new Fr(0));
      const val = ev(hi).sub(ev(lo));
      return {
        type: 'num', difficulty: 1,
        prompt: T`Calcula $$\int_{${lo}}^{${hi}} \left(${polyTex(c)}\right)\,dx$$`,
        fields: [{ label: 'Resultado =', answer: +val }],
        solution: T`<p>Una primitiva es $F(x) = ${polyTex(F)}$. Por la regla de Barrow:</p>
$$\int_{${lo}}^{${hi}} f(x)\,dx = F(${hi}) - F(${lo}) = ${ev(hi).tex()} - ${par(ev(lo))} = \boxed{${val.tex()}}$$`,
      };
    },
  });

  add({
    id: 'mat.area', name: 'Área entre parábola y recta',
    make(r) {
      const r1 = r.int(-3, 2), r2 = r.int(r1 + 1, Math.min(r1 + 5, 5));
      const m = r.int(-3, 3), n = r.int(-4, 4), k = r.pick([1, -1]);
      const par2 = [k, -k * (r1 + r2) + m, k * r1 * r2 + n];
      const area = new Fr((r2 - r1) ** 3, 6);
      const diff = [k, -k * (r1 + r2), k * r1 * r2];
      return {
        type: 'num', difficulty: 2,
        prompt: T`Calcula el área del recinto limitado por la parábola $y = ${polyTex(par2)}$ y la recta $y = ${polyTex([m, n])}$.`,
        fields: [{ label: 'Área =', answer: +area, unit: 'u²' }],
        solution: T`<p>1) Puntos de corte: $${polyTex(par2)} = ${polyTex([m, n])} \iff ${polyTex(diff)} = 0 \iff x = ${r1},\ x = ${r2}$.</p>
<p>2) Integramos la diferencia entre ${r1} y ${r2} y tomamos valor absoluto:</p>
$$\int_{${r1}}^{${r2}} (${polyTex(diff)})\,dx = \left[${polyTex([new Fr(k, 3), new Fr(-k * (r1 + r2), 2), k * r1 * r2, 0])}\right]_{${r1}}^{${r2}} = ${new Fr(-k * (r2 - r1) ** 3, 6).tex()}$$
$$\text{Área} = \boxed{${area.tex()}\ \text{u}^2}$$
<p class="tip">Atajo útil: el área entre una parábola $y=ax^2+\dots$ y una recta que la corta en $x_1, x_2$ vale $\frac{|a|(x_2-x_1)^3}{6}$.</p>`,
      };
    },
  });

  // ======================= GEOMETRÍA =======================
  const NORMALS = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [0, 3, 4, 5], [2, 10, 11, 15], [6, 6, 7, 11], [1, 0, 0, 1], [0, 0, 1, 1]];
  const permSign = (r, v) => r.shuffle(v).map((x) => x * r.sign());
  const dot = (u, v) => u.reduce((s, x, i) => s + x * v[i], 0);
  const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  const planeTex = (n, d) => `${linTex([[n[0], 'x'], [n[1], 'y'], [n[2], 'z'], [d, '']])} = 0`;

  add({
    id: 'mat.distPlane', name: 'Distancia de un punto a un plano',
    make(r) {
      const base = r.pick(NORMALS);
      const n = permSign(r, base.slice(0, 3)), norm = base[3];
      let Pt, d, num;
      do { Pt = [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)]; d = r.int(-10, 10); num = dot(n, Pt) + d; } while (num === 0);
      const dist = new Fr(Math.abs(num), norm);
      return {
        type: 'num', difficulty: 1,
        prompt: T`Calcula la distancia del punto $P${vecTex(Pt)}$ al plano $\pi:\ ${planeTex(n, d)}$.`,
        fields: [{ label: '$d(P,\\pi) =$', answer: +dist }],
        solution: T`$$d(P,\pi) = \frac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2+B^2+C^2}} = \frac{|${n[0]}\cdot${par(Pt[0])} + ${n[1]}\cdot${par(Pt[1])} + ${n[2]}\cdot${par(Pt[2])} ${sgn(d)}|}{\sqrt{${n.map((x) => x * x).join('+')}}} = \frac{${Math.abs(num)}}{${norm}} = \boxed{${dist.tex()}\ \text{u}}$$`,
      };
    },
  });

  add({
    id: 'mat.plane3', name: 'Plano que pasa por tres puntos',
    make(r) {
      let A, B, C, n;
      do {
        A = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; B = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; C = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)];
        n = cross(B.map((x, i) => x - A[i]), C.map((x, i) => x - A[i]));
      } while (n.every((x) => x === 0) || n.filter((x) => x === 0).length > 1);
      const g = n.reduce((s, x) => gcd(s, x), 0);
      n = n.map((x) => x / g);
      if (n.find((x) => x !== 0) < 0) n = n.map((x) => -x);
      const AB = B.map((x, i) => x - A[i]), AC = C.map((x, i) => x - A[i]);
      const d = -dot(n, A);
      const correct = planeTex(n, d);
      const opts = new Set([correct]);
      const cands = [planeTex(n, d + r.nz(-3, 3)), planeTex([n[0], -n[1], n[2]], d), planeTex([n[0], n[1], -n[2]], -dot([n[0], n[1], -n[2]], A)),
        planeTex([-n[0], n[1], n[2]], d), planeTex(AB, -dot(AB, A)), planeTex(n, -d)];
      for (const c of r.shuffle(cands)) { if (opts.size >= 4) break; opts.add(c); }
      const options = r.shuffle([...opts]);
      return {
        type: 'mc', difficulty: 2,
        prompt: T`¿Cuál es la ecuación del plano que pasa por $A${vecTex(A)}$, $B${vecTex(B)}$ y $C${vecTex(C)}$?`,
        options: options.map((o) => `$${o}$`),
        answer: options.indexOf(correct),
        solution: T`<p>1) Vectores directores: $\vec{AB} = ${vecTex(AB)}$, $\vec{AC} = ${vecTex(AC)}$.</p>
<p>2) Vector normal: $\vec{n} = \vec{AB}\times\vec{AC} = ${vecTex(n.map((x) => x * g))}$${g !== 1 ? T`, que simplificamos a $${vecTex(n)}$` : ''}.</p>
<p>3) $\pi: ${linTex([[n[0], 'x'], [n[1], 'y'], [n[2], 'z']])} + D = 0$ y, como pasa por $A$: $D = ${d}$.</p>
$$\boxed{${correct}}$$
<p class="tip">Comprueba sustituyendo los tres puntos: deben cumplir la ecuación.</p>`,
      };
    },
  });

  add({
    id: 'mat.cross', name: 'Producto vectorial y área de un triángulo',
    make(r) {
      let u, v, w;
      do { u = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; v = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; w = cross(u, v); } while (w.every((x) => x === 0));
      const n2 = dot(w, w);
      return {
        type: 'num', difficulty: 1,
        prompt: T`Dados $\vec{u} = ${vecTex(u)}$ y $\vec{v} = ${vecTex(v)}$, calcula $\vec{u}\times\vec{v}$ y el área del triángulo que determinan (redondea a 2 decimales).`,
        fields: [{ label: '1ª comp.', answer: w[0] }, { label: '2ª comp.', answer: w[1] }, { label: '3ª comp.', answer: w[2] }, { label: 'Área', answer: Math.sqrt(n2) / 2, tol: 0.006 }],
        grid: 4,
        solution: T`$$\vec{u}\times\vec{v} = \begin{vmatrix} \vec{i} & \vec{j} & \vec{k} \\ ${u.join(' & ')} \\ ${v.join(' & ')} \end{vmatrix} = \boxed{${vecTex(w)}}$$
<p>El área del triángulo es la mitad del módulo del producto vectorial:</p>
$$S = \frac{1}{2}|\vec{u}\times\vec{v}| = \frac{\sqrt{${n2}}}{2} \approx \boxed{${fmtTex(Math.sqrt(n2) / 2, 2)}\ \text{u}^2}$$`,
      };
    },
  });

  add({
    id: 'mat.tetra', name: 'Volumen de un tetraedro (producto mixto)',
    make(r) {
      let A, u, v, w, mixed;
      do {
        A = [r.int(-2, 2), r.int(-2, 2), r.int(-2, 2)];
        u = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; v = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; w = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)];
        mixed = +M.det([u, v, w]);
      } while (mixed === 0 || Math.abs(mixed) > 60);
      const B = A.map((x, i) => x + u[i]), C = A.map((x, i) => x + v[i]), D = A.map((x, i) => x + w[i]);
      const V = new Fr(Math.abs(mixed), 6);
      return {
        type: 'num', difficulty: 2,
        prompt: T`Calcula el volumen del tetraedro de vértices $A${vecTex(A)}$, $B${vecTex(B)}$, $C${vecTex(C)}$ y $D${vecTex(D)}$.`,
        fields: [{ label: 'Volumen =', answer: +V, unit: 'u³' }],
        solution: T`<p>$\vec{AB} = ${vecTex(u)}$, $\vec{AC} = ${vecTex(v)}$, $\vec{AD} = ${vecTex(w)}$.</p>
$$[\vec{AB},\vec{AC},\vec{AD}] = \begin{vmatrix} ${u.join(' & ')} \\ ${v.join(' & ')} \\ ${w.join(' & ')}\end{vmatrix} = ${mixed}$$
$$V = \frac{1}{6}\left|[\vec{AB},\vec{AC},\vec{AD}]\right| = \frac{${Math.abs(mixed)}}{6} = \boxed{${V.tex()}\ \text{u}^3}$$`,
      };
    },
  });

  add({
    id: 'mat.anglePlanes', name: 'Ángulo entre dos planos',
    make(r) {
      let n1, n2, c;
      do { n1 = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; n2 = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; c = cross(n1, n2); }
      while (n1.every((x) => !x) || n2.every((x) => !x) || c.every((x) => !x));
      const d1 = r.int(-5, 5), d2 = r.int(-5, 5);
      const cosv = Math.abs(dot(n1, n2)) / Math.sqrt(dot(n1, n1) * dot(n2, n2));
      const ang = (Math.acos(cosv) * 180) / Math.PI;
      return {
        type: 'num', difficulty: 2,
        prompt: T`Calcula el ángulo (en grados, con 2 decimales) que forman los planos $\pi_1: ${planeTex(n1, d1)}$ y $\pi_2: ${planeTex(n2, d2)}$.`,
        fields: [{ label: 'Ángulo (°)', answer: ang, tol: 0.02 }],
        solution: T`<p>El ángulo entre dos planos es el que forman sus vectores normales $\vec{n}_1 = ${vecTex(n1)}$, $\vec{n}_2 = ${vecTex(n2)}$:</p>
$$\cos\alpha = \frac{|\vec{n}_1\cdot\vec{n}_2|}{|\vec{n}_1|\,|\vec{n}_2|} = \frac{${Math.abs(dot(n1, n2))}}{\sqrt{${dot(n1, n1)}}\sqrt{${dot(n2, n2)}}} \approx ${fmtTex(cosv, 4)}$$
$$\alpha = \arccos(${fmtTex(cosv, 4)}) \approx \boxed{${fmtTex(ang, 2)}^\circ}$$
<p class="tip">Se toma valor absoluto para obtener el ángulo agudo ($0^\circ \le \alpha \le 90^\circ$).</p>`,
      };
    },
  });

  add({
    id: 'mat.symPlane', name: 'Punto simétrico respecto de un plano',
    make(r) {
      const n = [r.int(-2, 2), r.int(-2, 2), r.int(-2, 2)];
      if (n.every((x) => !x)) n[0] = 1;
      const Q = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)];
      const t = r.pick([1, -1, 2]);
      const Pt = Q.map((x, i) => x + t * n[i]);
      const Ps = Q.map((x, i) => x - t * n[i]);
      const d = -dot(n, Q);
      const nn = dot(n, n);
      return {
        type: 'num', difficulty: 3,
        prompt: T`Halla el punto simétrico de $P${vecTex(Pt)}$ respecto del plano $\pi: ${planeTex(n, d)}$.`,
        fields: [{ label: "$x'$", answer: Ps[0] }, { label: "$y'$", answer: Ps[1] }, { label: "$z'$", answer: Ps[2] }],
        grid: 3,
        solution: T`<p>1) Recta $r$ perpendicular a $\pi$ por $P$ (dirección $\vec{n} = ${vecTex(n)}$):</p>
$$r:\ (x,y,z) = ${vecTex(Pt)} + \lambda\,${vecTex(n)}$$
<p>2) Intersección $r\cap\pi$ (punto medio $M$): sustituyendo, $${nn}\lambda ${sgn(dot(n, Pt) + d)} = 0 \Rightarrow \lambda = ${-t}$, luego $M${vecTex(Q)}$.</p>
<p>3) $M$ es el punto medio de $P$ y $P'$: $P' = 2M - P$.</p>
$$P' = \boxed{${vecTex(Ps)}}$$`,
      };
    },
  });

  add({
    id: 'mat.linePlane', name: 'Intersección recta–plano',
    make(r) {
      let v, n;
      do { v = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; n = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)]; } while (v.every((x) => !x) || dot(n, v) === 0);
      const I = [r.int(-3, 3), r.int(-3, 3), r.int(-3, 3)];
      const l0 = r.nz(-2, 2);
      const Pt = I.map((x, i) => x - l0 * v[i]);
      const d = -dot(n, I);
      const fmtComp = (p, c) => (c === 0 ? `${p}` : `${p} ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 ? '' : Math.abs(c)}\\lambda`);
      return {
        type: 'num', difficulty: 2,
        prompt: T`Halla el punto de corte de la recta $$r:\ \begin{cases} x = ${fmtComp(Pt[0], v[0])} \\ y = ${fmtComp(Pt[1], v[1])} \\ z = ${fmtComp(Pt[2], v[2])}\end{cases}$$ con el plano $\pi: ${planeTex(n, d)}$.`,
        fields: [{ label: '$x$', answer: I[0] }, { label: '$y$', answer: I[1] }, { label: '$z$', answer: I[2] }],
        grid: 3,
        solution: T`<p>Sustituimos las paramétricas de $r$ en $\pi$:</p>
$$${n[0]}(${fmtComp(Pt[0], v[0])}) + ${par(n[1])}(${fmtComp(Pt[1], v[1])}) + ${par(n[2])}(${fmtComp(Pt[2], v[2])}) ${sgn(d)} = 0$$
$$${dot(n, v)}\lambda ${sgn(dot(n, Pt) + d)} = 0 \;\Rightarrow\; \lambda = ${l0}$$
<p>Sustituyendo $\lambda = ${l0}$ en $r$: $\boxed{${vecTex(I)}}$</p>
<p class="tip">Si al sustituir desaparece $\lambda$: o la recta es paralela ($0 = k \neq 0$) o está contenida en el plano ($0 = 0$).</p>`,
      };
    },
  });

  // ======================= PROBABILIDAD =======================
  add({
    id: 'mat.bayes', name: 'Probabilidad total y Bayes',
    make(r) {
      const ctx = r.pick([
        { who: ['la máquina A', 'la máquina B', 'la máquina C'], tag: ['A', 'B', 'C'], item: 'pieza', bad: 'defectuosa', intro: 'Una fábrica produce piezas con tres máquinas' },
        { who: ['el proveedor A', 'el proveedor B', 'el proveedor C'], tag: ['A', 'B', 'C'], item: 'componente', bad: 'defectuoso', intro: 'Una empresa compra componentes a tres proveedores' },
        { who: ['el turno de mañana', 'el turno de tarde', 'el turno de noche'], tag: ['M', 'T', 'N'], item: 'pedido', bad: 'con error', intro: 'Un almacén prepara pedidos en tres turnos' },
      ]);
      let ws;
      do { const a = r.step(15, 60, 5), b = r.step(15, 60, 5); ws = [a, b, 100 - a - b]; } while (ws[2] < 10);
      const ds = ws.map(() => r.int(1, 9));
      const pD = ws.reduce((s, w, i) => s + (w / 100) * (ds[i] / 100), 0);
      const j = r.int(0, 2);
      const post = ((ws[j] / 100) * (ds[j] / 100)) / pD;
      const tg = ctx.tag;
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>${ctx.intro}: ${ctx.who[0]} aporta el ${ws[0]} %, ${ctx.who[1]} el ${ws[1]} % y ${ctx.who[2]} el ${ws[2]} %. El porcentaje de ${ctx.item}s ${ctx.bad} es del ${ds[0]} %, ${ds[1]} % y ${ds[2]} % respectivamente. Se elige un${ctx.item === 'pieza' ? 'a' : ''} ${ctx.item} al azar.</p>
<p>a) Probabilidad de que sea ${ctx.bad}. &nbsp; b) Si es ${ctx.bad}, probabilidad de que proceda de ${ctx.who[j]}.</p><p class="muted">Da los resultados con 4 decimales.</p>`,
        fields: [{ label: 'a) $P(D)$', answer: pD, tol: PROB_TOL }, { label: `b) $P(${tg[j]}\\mid D)$`, answer: post, tol: PROB_TOL }],
        grid: 2,
        solution: T`<p>Sea $D$ = «${ctx.bad}». Por el <b>teorema de la probabilidad total</b>:</p>
$$P(D) = ${ws.map((w, i) => `${fmtTex(w / 100, 2)}\\cdot ${fmtTex(ds[i] / 100, 2)}`).join(' + ')} = \boxed{${R(pD)}}$$
<p>Por el <b>teorema de Bayes</b>:</p>
$$P(${tg[j]}\mid D) = \frac{P(${tg[j]})\,P(D\mid ${tg[j]})}{P(D)} = \frac{${fmtTex(ws[j] / 100, 2)}\cdot${fmtTex(ds[j] / 100, 2)}}{${R(pD)}} \approx \boxed{${R(post)}}$$
<p class="tip">Dibuja siempre el diagrama de árbol: primera rama = origen, segunda rama = ${ctx.bad} / no ${ctx.bad}.</p>`,
      };
    },
  });

  add({
    id: 'mat.sets', name: 'Sucesos: unión, condicionada, Morgan',
    make(r) {
      let a, b, ab;
      do { a = r.step(0.2, 0.8, 0.05); b = r.step(0.2, 0.8, 0.05); ab = r.step(0.05, 0.5, 0.05); } while (ab >= Math.min(a, b) || a + b - ab > 1 || ab < a + b - 1);
      a = Math.round(a * 100) / 100; b = Math.round(b * 100) / 100; ab = Math.round(ab * 100) / 100;
      const uni = a + b - ab, cond = ab / b, none = 1 - uni;
      const indep = Math.abs(a * b - ab) < 1e-9;
      return {
        type: 'num', difficulty: 1,
        prompt: T`Sean $A$ y $B$ dos sucesos con $P(A) = ${fmtTex(a)}$, $P(B) = ${fmtTex(b)}$ y $P(A\cap B) = ${fmtTex(ab)}$. Calcula: <p>a) $P(A\cup B)$ &nbsp; b) $P(A\mid B)$ &nbsp; c) $P(\overline{A}\cap\overline{B})$</p><p class="muted">Usa 4 decimales si no es exacto.</p>`,
        fields: [{ label: 'a)', answer: uni, tol: PROB_TOL }, { label: 'b)', answer: cond, tol: PROB_TOL }, { label: 'c)', answer: none, tol: PROB_TOL }],
        grid: 3,
        solution: T`$$P(A\cup B) = P(A)+P(B)-P(A\cap B) = ${fmtTex(a)} + ${fmtTex(b)} - ${fmtTex(ab)} = \boxed{${R(uni)}}$$
$$P(A\mid B) = \frac{P(A\cap B)}{P(B)} = \frac{${fmtTex(ab)}}{${fmtTex(b)}} \approx \boxed{${R(cond)}}$$
$$P(\overline{A}\cap\overline{B}) \overset{\text{Morgan}}{=} P(\overline{A\cup B}) = 1 - ${R(uni)} = \boxed{${R(none)}}$$
<p class="tip">${indep ? T`Además $P(A)P(B) = P(A\cap B)$: $A$ y $B$ son <b>independientes</b>.` : T`Como $P(A)\cdot P(B) = ${R(a * b)} \neq P(A\cap B)$, $A$ y $B$ <b>no</b> son independientes.`}</p>`,
      };
    },
  });

  add({
    id: 'mat.binomial', name: 'Distribución binomial',
    make(r) {
      const n = r.int(5, 12), p = r.pick([0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8]);
      const k = r.int(1, Math.min(n - 1, 4));
      const pk = comb(n, k) * p ** k * (1 - p) ** (n - k);
      const ge1 = 1 - (1 - p) ** n;
      const ctx = r.pick([
        `El ${Math.round(p * 100)} % de los clientes de una tienda online compra con el móvil. Se eligen ${n} clientes al azar.`,
        `Un jugador encesta un tiro libre con probabilidad ${fmtTex(p)}. Lanza ${n} tiros libres de forma independiente.`,
        `El ${Math.round(p * 100)} % de los estudiantes de un instituto va en transporte público. Se eligen ${n} estudiantes al azar.`,
      ]);
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>${ctx}</p><p>a) Probabilidad de que exactamente ${k} cumplan la condición. &nbsp; b) Probabilidad de que al menos uno la cumpla.</p><p class="muted">4 decimales.</p>`,
        fields: [{ label: `a) $P(X=${k})$`, answer: pk, tol: PROB_TOL }, { label: 'b) $P(X\\ge 1)$', answer: ge1, tol: PROB_TOL }],
        grid: 2,
        solution: T`<p>$X$ = nº de éxitos $\sim B(n=${n},\ p=${fmtTex(p)})$.</p>
$$P(X=${k}) = \binom{${n}}{${k}}(${fmtTex(p)})^{${k}}(${fmtTex(1 - p)})^{${n - k}} = ${comb(n, k)}\cdot(${fmtTex(p)})^{${k}}(${fmtTex(1 - p)})^{${n - k}} \approx \boxed{${R(pk)}}$$
$$P(X\ge 1) = 1 - P(X=0) = 1 - (${fmtTex(1 - p)})^{${n}} \approx \boxed{${R(ge1)}}$$
<p class="tip">Media: $\mu = np = ${fmtTex(n * p)}$; desviación típica: $\sigma=\sqrt{npq} \approx ${fmtTex(Math.sqrt(n * p * (1 - p)), 4)}$.</p>`,
      };
    },
  });

  const z2 = (x) => Math.round(x * 100) / 100;
  add({
    id: 'mat.normal', name: 'Distribución normal',
    make(r) {
      const mu = r.step(50, 300, 10), sigma = r.pick([4, 5, 8, 10, 12, 15, 20, 25]);
      let a = mu + Math.round(r.int(-22, 22) * sigma / 10), b = mu + Math.round(r.int(-22, 22) * sigma / 10);
      if (a > b) [a, b] = [b, a];
      if (a === b) b += Math.ceil(sigma / 2);
      const za = z2((a - mu) / sigma), zb = z2((b - mu) / sigma);
      const pa = Phi(za), pab = Phi(zb) - Phi(za);
      const ctx = r.pick(['El tiempo (en minutos) que tarda un pedido en entregarse', 'La puntuación de un test de aptitud', 'El peso (en gramos) de los paquetes envasados por una máquina', 'El gasto mensual (en euros) en ocio de los jóvenes']);
      const st = (x, z) => `P\\left(Z \\le ${fmtTex(z, 2, { fixed: true })}\\right)`;
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>${ctx} sigue una distribución normal de media ${mu} y desviación típica ${sigma}. Calcula:</p><p>a) $P(X \le ${a})$ &nbsp; b) $P(${a} < X < ${b})$</p><p class="muted">Tipifica redondeando $z$ a 2 decimales. Resultado con 4 decimales.</p>`,
        fields: [{ label: 'a)', answer: pa, tol: PROB_TOL }, { label: 'b)', answer: pab, tol: PROB_TOL }],
        grid: 2,
        solution: T`<p>$X\sim N(${mu},\ ${sigma})$. Tipificamos $Z = \dfrac{X-${mu}}{${sigma}} \sim N(0,1)$.</p>
$$P(X\le ${a}) = ${st(a, za)} ${za < 0 ? T`= 1 - P(Z \le ${fmtTex(-za, 2, { fixed: true })})` : ''} \approx \boxed{${R(pa)}}$$
$$P(${a}<X<${b}) = P(${fmtTex(za, 2, { fixed: true })} < Z < ${fmtTex(zb, 2, { fixed: true })}) = \Phi(${fmtTex(zb, 2, { fixed: true })}) - \Phi(${fmtTex(za, 2, { fixed: true })}) \approx ${R(Phi(zb))} - ${R(Phi(za))} = \boxed{${R(pab)}}$$
<p class="tip">Recuerda: la tabla da $\Phi(z)=P(Z\le z)$ para $z\ge0$. Para $z<0$ usa la simetría $\Phi(-z) = 1-\Phi(z)$.</p>`,
      };
    },
  });

  // =================== INFERENCIA (CCSS) ===================
  const ZS = { 90: [1.645, 1.64, 1.65], 95: [1.96], 99: [2.575, 2.57, 2.58] };
  const zTex = (lvl) => fmtTex(ZS[lvl][0], 3);

  add({
    id: 'mat.ciMean', name: 'Intervalo de confianza para la media',
    make(r) {
      const lvl = r.pick([90, 95, 99]);
      const n = r.pick([16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 400]);
      const sigma = r.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]);
      const xbar = r.step(20, 300, 0.5);
      const Es = ZS[lvl].map((z) => (z * sigma) / Math.sqrt(n));
      const E = Es[0];
      const spread = Math.max(...Es) - Math.min(...Es);
      const ctx = r.pick(['el tiempo diario (en minutos) que los jóvenes dedican a redes sociales', 'el gasto (en euros) por cliente en un supermercado', 'la duración (en horas) de las baterías de un modelo de móvil', 'el peso (en gramos) de las tabletas de chocolate de una marca']);
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Se supone que ${ctx} sigue una distribución normal con desviación típica $\sigma = ${sigma}$. En una muestra aleatoria de ${n} elementos se obtuvo una media $\bar{x} = ${fmtTex(xbar, 2)}$.</p><p>Calcula el intervalo de confianza al ${lvl} % para la media poblacional $\mu$ (2 decimales).</p>`,
        fields: [{ label: 'Extremo inferior', answer: xbar - E, tol: spread + 0.011 }, { label: 'Extremo superior', answer: xbar + E, tol: spread + 0.011 }],
        grid: 2,
        solution: T`<p>Nivel de confianza $1-\alpha = ${fmtTex(lvl / 100)}\Rightarrow z_{\alpha/2} = ${zTex(lvl)}$.</p>
$$E = z_{\alpha/2}\frac{\sigma}{\sqrt{n}} = ${zTex(lvl)}\cdot\frac{${sigma}}{\sqrt{${n}}} = ${zTex(lvl)}\cdot\frac{${sigma}}{${Math.sqrt(n)}} \approx ${fmtTex(E, 4)}$$
$$IC = \left(\bar{x} - E,\ \bar{x} + E\right) = \boxed{\left(${fmtTex(xbar - E, 2)},\ ${fmtTex(xbar + E, 2)}\right)}$$
<p class="tip">Interpretación: con un ${lvl} % de confianza, la media poblacional está en ese intervalo. Si $z_{\alpha/2}$ de tu tabla es ligeramente distinto (${ZS[lvl].map((z) => fmtTex(z, 3)).join(', ')}), se acepta.</p>`,
      };
    },
  });

  add({
    id: 'mat.sampleSize', name: 'Tamaño muestral mínimo',
    make(r) {
      const lvl = r.pick([90, 95, 99]);
      const sigma = r.pick([3, 4, 5, 6, 8, 10, 12, 15, 20, 25]);
      const E = r.pick([0.5, 1, 1.5, 2, 2.5, 3]);
      const ns = ZS[lvl].map((z) => Math.ceil(((z * sigma) / E) ** 2 - 1e-9));
      const raw = ((ZS[lvl][0] * sigma) / E) ** 2;
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Una variable sigue una distribución normal con $\sigma = ${sigma}$. ¿Qué tamaño muestral mínimo se necesita para que, con una confianza del ${lvl} %, el error máximo al estimar la media sea como mucho de ${fmtTex(E)}?</p>`,
        fields: [{ label: '$n \\ge$', answer: ns[0], alt: ns.slice(1), tol: 0 }],
        solution: T`<p>$z_{\alpha/2} = ${zTex(lvl)}$. De $E = z_{\alpha/2}\frac{\sigma}{\sqrt{n}}$ despejamos $n$:</p>
$$n \ge \left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2 = \left(\frac{${zTex(lvl)}\cdot ${sigma}}{${fmtTex(E)}}\right)^2 \approx ${fmtTex(raw, 3)}$$
<p>Como $n$ debe ser entero y garantizar el error, redondeamos <b>siempre hacia arriba</b>: $\boxed{n = ${ns[0]}}$.</p>`,
      };
    },
  });

  add({
    id: 'mat.ciProp', name: 'Intervalo de confianza para una proporción',
    make(r) {
      const lvl = r.pick([90, 95, 99]);
      const n = r.pick([100, 150, 200, 250, 300, 400, 500, 600, 800, 1000]);
      const k = Math.round(n * r.step(0.1, 0.8, 0.01));
      const ph = k / n;
      const se = Math.sqrt((ph * (1 - ph)) / n);
      const Es = ZS[lvl].map((z) => z * se);
      const spread = Math.max(...Es) - Math.min(...Es);
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>En una encuesta a ${n} personas elegidas al azar, ${k} afirman haber comprado algún producto de segunda mano en el último año. Calcula el intervalo de confianza al ${lvl} % para la proporción poblacional (4 decimales).</p>`,
        fields: [{ label: 'Extremo inferior', answer: ph - Es[0], tol: spread + 0.0011 }, { label: 'Extremo superior', answer: ph + Es[0], tol: spread + 0.0011 }],
        grid: 2,
        solution: T`<p>$\hat{p} = \frac{${k}}{${n}} = ${fmtTex(ph, 4)}$, $z_{\alpha/2} = ${zTex(lvl)}$.</p>
$$E = z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}} = ${zTex(lvl)}\sqrt{\frac{${fmtTex(ph, 4)}\cdot${fmtTex(1 - ph, 4)}}{${n}}} \approx ${fmtTex(Es[0], 4)}$$
$$IC = \boxed{\left(${fmtTex(ph - Es[0], 4)},\ ${fmtTex(ph + Es[0], 4)}\right)}$$`,
      };
    },
  });

  add({
    id: 'mat.sampleMean', name: 'Distribución de la media muestral',
    make(r) {
      const mu = r.step(40, 200, 5), sigma = r.pick([6, 8, 10, 12, 15, 20]);
      const n = r.pick([16, 25, 36, 49, 64, 100]);
      const se = sigma / Math.sqrt(n);
      const a = Math.round((mu + r.int(-20, 20) / 10 * se) * 10) / 10;
      const z = z2((a - mu) / se);
      const above = r() < 0.5;
      const pr = above ? 1 - Phi(z) : Phi(z);
      return {
        type: 'num', difficulty: 2,
        prompt: T`<p>Una variable $X$ sigue una normal de media ${mu} y desviación típica ${sigma}. Se toman muestras de tamaño ${n}. ¿Cuál es la probabilidad de que la media muestral sea ${above ? 'mayor' : 'menor'} que ${fmtTex(a, 1)}?</p><p class="muted">$z$ con 2 decimales, resultado con 4.</p>`,
        fields: [{ label: `$P(\\bar{X} ${above ? '>' : '<'} ${fmtTex(a, 1)})$`, answer: pr, tol: PROB_TOL }],
        solution: T`<p>Por el teorema central del límite, $\bar{X}\sim N\left(\mu,\ \frac{\sigma}{\sqrt{n}}\right) = N\left(${mu},\ \frac{${sigma}}{${Math.sqrt(n)}}\right) = N(${mu},\ ${fmtTex(se, 4)})$.</p>
$$z = \frac{${fmtTex(a, 1)} - ${mu}}{${fmtTex(se, 4)}} \approx ${fmtTex(z, 2, { fixed: true })}$$
$$P(\bar{X} ${above ? '>' : '<'} ${fmtTex(a, 1)}) = ${above ? T`1 - \Phi(${fmtTex(z, 2, { fixed: true })})` : T`\Phi(${fmtTex(z, 2, { fixed: true })})`} \approx \boxed{${R(pr)}}$$`,
      };
    },
  });

  add({
    id: 'mat.lp', name: 'Programación lineal',
    make(r) {
      for (;;) {
        const p = r.int(2, 8), q = r.int(2, 8);
        const a1 = r.int(2, 5), b1 = r.int(1, a1 - 1); // recta 1 más inclinada
        const b2 = r.int(2, 5), a2 = r.int(1, b2 - 1); // recta 2 más plana
        const r1 = a1 * p + b1 * q, r2 = a2 * p + b2 * q;
        const c1 = r.int(1, 8), c2 = r.int(1, 8);
        const V = [[new Fr(0), new Fr(0)], [new Fr(r1, a1), new Fr(0)], [new Fr(p), new Fr(q)], [new Fr(0), new Fr(r2, b2)]];
        const vals = V.map(([x, y]) => x.mul(c1).add(y.mul(c2)));
        const best = vals.reduce((bi, v, i) => (+v > +vals[bi] ? i : bi), 0);
        if (vals.filter((v) => Math.abs(+v - +vals[best]) < 1e-9).length > 1) continue;
        if (!V[best][0].isInt() || !V[best][1].isInt()) continue;
        const names = ['O', 'A', 'B', 'C'];
        return {
          type: 'num', difficulty: 2,
          prompt: T`Maximiza la función $f(x,y) = ${linTex([[c1, 'x'], [c2, 'y']])}$ sujeta a las restricciones: $$\begin{cases} ${linTex([[a1, 'x'], [b1, 'y']])} \le ${r1} \\ ${linTex([[a2, 'x'], [b2, 'y']])} \le ${r2} \\ x \ge 0,\ y \ge 0\end{cases}$$`,
          fields: [{ label: '$x$ óptimo', answer: +V[best][0] }, { label: '$y$ óptimo', answer: +V[best][1] }, { label: 'Valor máximo', answer: +vals[best] }],
          grid: 3,
          solution: T`<p>1) Representamos las rectas y la región factible (polígono convexo). Sus vértices son:</p>
<ul>${V.map(([x, y], i) => T`<li>$${names[i]}(${x.tex()},\ ${y.tex()})$${i === 1 ? ' (corte de la 1ª recta con el eje $X$)' : i === 2 ? ' (corte de las dos rectas)' : i === 3 ? ' (corte de la 2ª recta con el eje $Y$)' : ''}</li>`).join('')}</ul>
<p>2) Evaluamos $f$ en cada vértice:</p>
<p>${V.map((_, i) => T`$f(${names[i]}) = ${vals[i].tex()}$`).join('&emsp;')}</p>
<p>3) El máximo se alcanza en $${names[best]}(${V[best][0].tex()},\ ${V[best][1].tex()})$ con valor $\boxed{${vals[best].tex()}}$.</p>
<p class="tip">Teorema fundamental: si existe el óptimo, se alcanza en un vértice (o en un lado entero) de la región factible.</p>`,
          lp: { lines: [[a1, b1, r1], [a2, b2, r2]], V: V.map(([x, y]) => [+x, +y]), best, c: [c1, c2] },
        };
      }
    },
  });
})(window.PAU);
