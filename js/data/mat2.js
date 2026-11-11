/* Matemáticas II — PAU Comunidad de Madrid */
(function (P) {
  'use strict';
  const T = P.T;

  P.addSubject({
    id: 'mat2', name: 'Matemáticas II', short: 'Mates II', icon: '∫', color: '#3557e0',
    desc: 'Bachillerato de Ciencias y Tecnología. Álgebra, análisis, geometría y probabilidad.',
    exam: {
      duration: 90,
      info: 'Formato actual (PAU 2026): se responden 5 preguntas de 2 puntos, tres obligatorias y dos a elegir entre dos opciones. 90 minutos. Hasta 2024 había que elegir entre la opción A y la B (4 ejercicios de 2,5 puntos).',
    },
    blocks: [
      {
        id: 'alg', name: 'Álgebra', topics: [
          {
            id: 'matrices', name: 'Matrices y determinantes', summary: 'Operaciones, inversa, rango, propiedades de los determinantes y ecuaciones matriciales.',
            gens: ['mat.det3', 'mat.inv2', 'mat.matEq', 'mat.rankParam'],
            theory: T`
<h3>Operaciones con matrices</h3>
<ul>
<li>$A_{m\times n}\cdot B_{n\times p} = C_{m\times p}$: solo se pueden multiplicar si el nº de columnas de $A$ coincide con el nº de filas de $B$.</li>
<li>El producto <b>no es conmutativo</b>: en general $AB \neq BA$. Por eso $(A+B)^2 = A^2 + AB + BA + B^2$.</li>
<li>Traspuesta: $(AB)^t = B^tA^t$. Inversa: $(AB)^{-1} = B^{-1}A^{-1}$.</li>
</ul>
<h3>Determinantes</h3>
<div class="formula">$$\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc \qquad\quad |A_{3\times3}| \text{ por Sarrus o desarrollando por una fila/columna}$$</div>
<p><b>Propiedades clave</b> (para $A$ de orden $n$):</p>
<ul>
<li>$|A^t| = |A|$, &nbsp; $|AB| = |A||B|$, &nbsp; $|A^{-1}| = \dfrac{1}{|A|}$, &nbsp; $|kA| = k^n|A|$.</li>
<li>Si se intercambian dos filas, el determinante cambia de signo.</li>
<li>Si una fila es combinación lineal de otras, $|A| = 0$.</li>
<li>Sumar a una fila un múltiplo de otra no cambia el determinante (útil para hacer ceros).</li>
</ul>
<h3>Matriz inversa</h3>
<div class="formula">$$A^{-1} = \frac{1}{|A|}\,(\operatorname{Adj} A)^t \qquad\text{existe} \iff |A| \neq 0$$</div>
<p>El adjunto $A_{ij} = (-1)^{i+j}\,M_{ij}$, donde $M_{ij}$ es el menor que resulta de quitar la fila $i$ y la columna $j$.</p>
<h3>Rango</h3>
<p>Es el orden del mayor menor no nulo (o el nº de filas linealmente independientes). Para una matriz con parámetro: calcula el determinante del mayor menor posible, iguala a 0 y estudia por separado los valores que lo anulan.</p>
<h3>Ecuaciones matriciales</h3>
<div class="formula">$$AX = B \Rightarrow X = A^{-1}B \qquad XA = B \Rightarrow X = BA^{-1} \qquad AX + C = B \Rightarrow X = A^{-1}(B - C)$$</div>
<p class="tip"><b>Truco PAU:</b> despeja siempre <i>antes</i> de calcular, y multiplica por la inversa por el lado correcto. Comprueba el resultado sustituyendo.</p>`,
            questions: [
              { type: 'mc', prompt: T`Si $A$ es una matriz cuadrada de orden 3 con $|A| = 2$, ¿cuánto vale $|2A|$?`, options: ['$4$', '$8$', '$16$', '$6$'], answer: 2, solution: T`$|kA| = k^n|A|$ con $n=3$: $|2A| = 2^3\cdot 2 = 16$.` },
              { type: 'mc', prompt: T`Si $|A| = -3$, entonces $|A^{-1}|$ vale:`, options: ['$3$', '$-3$', T`$-\frac{1}{3}$`, T`$\frac{1}{3}$`], answer: 2, solution: T`$|A^{-1}| = 1/|A| = -1/3$.` },
              { type: 'mc', prompt: T`Una matriz cuadrada $A$ tiene inversa si y solo si…`, options: ['es simétrica', T`$|A| \neq 0$`, 'todos sus elementos son no nulos', T`$|A| = 1$`], answer: 1, solution: T`$A$ es invertible (regular) $\iff |A| \neq 0$.` },
              { type: 'mc', prompt: T`$(AB)^{-1}$ es igual a:`, options: [T`$A^{-1}B^{-1}$`, T`$B^{-1}A^{-1}$`, T`$(BA)^{-1}$`, T`$A^{-1}+B^{-1}$`], answer: 1, solution: T`Se invierte el orden: $(AB)^{-1} = B^{-1}A^{-1}$, ya que $(AB)(B^{-1}A^{-1}) = A\,I\,A^{-1} = I$.` },
              { type: 'mc', prompt: T`Si $A$ es $2\times3$ y $B$ es $3\times4$, ¿qué afirmación es correcta?`, options: [T`$AB$ es $2\times4$ y $BA$ no existe`, T`$AB$ es $3\times3$`, T`$AB$ y $BA$ existen`, T`$AB$ es $4\times2$`], answer: 0, solution: T`$(2\times\underline{3})(\underline{3}\times4) = 2\times4$. $BA$ sería $(3\times\underline{4})(\underline{2}\times3)$: no coinciden, no existe.` },
              { type: 'mc', prompt: T`Si en un determinante se intercambian dos filas…`, options: ['no cambia', 'se anula', 'cambia de signo', 'se multiplica por 2'], answer: 2, solution: 'Intercambiar dos filas (o dos columnas) cambia el signo del determinante.' },
              { type: 'mc', prompt: T`Sea $A$ de orden 3 con $|A| = 3$. ¿Cuánto vale $|3A^{-1}|$?`, options: ['$1$', '$9$', '$27$', T`$\frac{1}{3}$`], answer: 1, solution: T`$|3A^{-1}| = 3^3\cdot\frac{1}{3} = 9$.` },
              { type: 'mc', prompt: T`Si las filas de una matriz cuadrada son linealmente dependientes, entonces:`, options: [T`$|A| = 0$`, T`$|A| = 1$`, 'A es la identidad', 'A tiene inversa'], answer: 0, solution: 'Si una fila es combinación lineal de las demás, el determinante es nulo y el rango es menor que el orden.' },
            ],
            problems: [
              {
                prompt: T`<p>Dada la matriz $$A = \begin{pmatrix} 1 & 0 & -1 \\ 0 & m & 3 \\ 4 & 1 & -m \end{pmatrix}$$</p>
<p>a) (1 punto) Determina para qué valores de $m$ la matriz $A$ es invertible.</p>
<p>b) (1 punto) Para $m = 2$, calcula $A^{-1}$.</p>`,
                solution: T`<p><b>a)</b> Desarrollando por la primera fila:</p>
$$|A| = 1\cdot(m\cdot(-m) - 3\cdot1) - 0 + (-1)\cdot(0\cdot 1 - m\cdot 4) = -m^2 - 3 + 4m = -(m-1)(m-3)$$
<p>$|A| = 0 \iff m = 1$ o $m = 3$. Por tanto $A$ es invertible $\iff m \neq 1$ y $m \neq 3$.</p>
<p><b>b)</b> Para $m = 2$: $|A| = -(1)(-1) = 1$. Matriz de adjuntos:</p>
$$\operatorname{Adj}(A) = \begin{pmatrix} -7 & 12 & -8 \\ -1 & 2 & -1 \\ 2 & -3 & 2 \end{pmatrix} \Rightarrow A^{-1} = \frac{1}{1}(\operatorname{Adj}A)^t = \begin{pmatrix} -7 & -1 & 2 \\ 12 & 2 & -3 \\ -8 & -1 & 2 \end{pmatrix}$$
<p class="tip">Comprobación: $A\cdot A^{-1} = I$ (multiplica al menos una fila para asegurarte).</p>`,
              },
              {
                prompt: T`<p>Sean las matrices $A = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$ y $B = \begin{pmatrix} 1 & 0 \\ 3 & -1 \end{pmatrix}$.</p>
<p>a) (1 punto) Resuelve la ecuación matricial $AX + B = 2I$.</p>
<p>b) (1 punto) Calcula $|A^{5}\,B^{t}|$.</p>`,
                solution: T`<p><b>a)</b> $AX = 2I - B \Rightarrow X = A^{-1}(2I - B)$. Como $|A| = 2 - 1 = 1$:</p>
$$A^{-1} = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix},\qquad 2I - B = \begin{pmatrix} 1 & 0 \\ -3 & 3 \end{pmatrix}$$
$$X = \begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}\begin{pmatrix} 1 & 0 \\ -3 & 3 \end{pmatrix} = \begin{pmatrix} 4 & -3 \\ -7 & 6 \end{pmatrix}$$
<p><b>b)</b> $|A^5 B^t| = |A|^5\,|B| = 1^5\cdot(-1 - 0) = -1$.</p>`,
              },
            ],
          },
          {
            id: 'sistemas', name: 'Sistemas de ecuaciones', summary: 'Teorema de Rouché–Frobenius, discusión con parámetros, Cramer y Gauss.',
            gens: ['mat.cramer3', 'mat.rankParam'],
            theory: T`
<h3>Teorema de Rouché–Frobenius</h3>
<p>Sea $A$ la matriz de coeficientes, $A^*$ la ampliada y $n$ el nº de incógnitas:</p>
<div class="formula">
<ul class="clean">
<li>$\operatorname{rg}A \neq \operatorname{rg}A^* \;\Rightarrow\;$ <b>Sistema Incompatible</b> (SI): no tiene solución.</li>
<li>$\operatorname{rg}A = \operatorname{rg}A^* = n \;\Rightarrow\;$ <b>Compatible Determinado</b> (SCD): solución única.</li>
<li>$\operatorname{rg}A = \operatorname{rg}A^* < n \;\Rightarrow\;$ <b>Compatible Indeterminado</b> (SCI): infinitas soluciones con $n - \operatorname{rg}A$ parámetros.</li>
</ul></div>
<h3>Discusión de un sistema con parámetro (3×3)</h3>
<ol>
<li>Calcula $|A|$ en función del parámetro e iguala a 0.</li>
<li>Para los valores que <b>no</b> anulan $|A|$: $\operatorname{rg}A = \operatorname{rg}A^* = 3$ → SCD.</li>
<li>Para cada valor que anula $|A|$: sustituye y calcula los rangos de $A$ y $A^*$ (busca un menor de orden 2 no nulo y orla).</li>
</ol>
<h3>Regla de Cramer</h3>
<div class="formula">$$x = \frac{|A_x|}{|A|},\quad y = \frac{|A_y|}{|A|},\quad z = \frac{|A_z|}{|A|}$$</div>
<p>donde $A_x$ es $A$ con la columna de $x$ sustituida por la de términos independientes. Solo vale si $|A| \neq 0$.</p>
<h3>Sistemas homogéneos</h3>
<p>Todos los términos independientes son 0. Siempre son compatibles (tienen la solución trivial). Tienen soluciones no triviales $\iff |A| = 0$.</p>
<p class="tip"><b>Truco PAU:</b> en el caso SCI, expresa la solución con un parámetro, p. ej. $z = \lambda$, y comprueba sustituyendo en las ecuaciones originales.</p>`,
            questions: [
              { type: 'mc', prompt: T`Si $\operatorname{rg}A = \operatorname{rg}A^* = 2$ en un sistema con 3 incógnitas, el sistema es:`, options: ['Incompatible', 'Compatible determinado', 'Compatible indeterminado con 1 parámetro', 'Compatible indeterminado con 2 parámetros'], answer: 2, solution: T`$\operatorname{rg} = 2 < 3 = n$: SCI con $3 - 2 = 1$ parámetro.` },
              { type: 'mc', prompt: T`Si $\operatorname{rg}A = 2$ y $\operatorname{rg}A^* = 3$, el sistema:`, options: ['es incompatible', 'tiene solución única', 'tiene infinitas soluciones', 'depende de los términos independientes'], answer: 0, solution: 'Los rangos son distintos → Sistema Incompatible (Rouché–Frobenius).' },
              { type: 'mc', prompt: 'Un sistema homogéneo…', options: ['puede ser incompatible', 'siempre es compatible', 'siempre es determinado', 'nunca tiene solución trivial'], answer: 1, solution: T`Siempre admite la solución trivial $(0,0,\dots,0)$, así que $\operatorname{rg}A = \operatorname{rg}A^*$.` },
              { type: 'mc', prompt: T`Un sistema de 3 ecuaciones y 3 incógnitas con $|A| = 5$:`, options: ['es SCD', 'es SCI', 'es SI', 'no se puede saber'], answer: 0, solution: T`$|A|\neq0 \Rightarrow \operatorname{rg}A = 3 = \operatorname{rg}A^* = n$ → SCD.` },
              { type: 'mc', prompt: 'La regla de Cramer se puede aplicar cuando…', options: [T`el sistema es cuadrado y $|A| \neq 0$`, 'el sistema es homogéneo', T`$|A| = 0$`, 'hay más ecuaciones que incógnitas'], answer: 0, solution: 'Cramer exige matriz de coeficientes cuadrada y regular.' },
              { type: 'mc', prompt: T`Un sistema homogéneo $3\times3$ tiene soluciones distintas de la trivial si y solo si:`, options: [T`$|A| \neq 0$`, T`$|A| = 0$`, 'tiene más ecuaciones que incógnitas', 'nunca'], answer: 1, solution: T`Si $|A| = 0$, $\operatorname{rg}A < 3$ → SCI, con infinitas soluciones además de la trivial.` },
            ],
            problems: [
              {
                prompt: T`<p>Considera el sistema $$\begin{cases} ax + y + z = 1 \\ x + ay + z = a \\ x + y + az = a^2 \end{cases}$$</p>
<p>a) (1,5 puntos) Discútelo según los valores de $a$.</p>
<p>b) (0,5 puntos) Resuélvelo para $a = 0$.</p>`,
                solution: T`<p><b>a)</b> $|A| = \begin{vmatrix} a & 1 & 1 \\ 1 & a & 1 \\ 1 & 1 & a\end{vmatrix} = a^3 - 3a + 2 = (a-1)^2(a+2)$.</p>
<ul>
<li>$a \neq 1$ y $a \neq -2$: $|A| \neq 0 \Rightarrow \operatorname{rg}A = \operatorname{rg}A^* = 3$: <b>SCD</b>.</li>
<li>$a = 1$: las tres ecuaciones son $x + y + z = 1$. $\operatorname{rg}A = \operatorname{rg}A^* = 1 < 3$: <b>SCI</b> con 2 parámetros.</li>
<li>$a = -2$: $\begin{vmatrix} -2 & 1 \\ 1 & -2\end{vmatrix} = 3 \neq 0 \Rightarrow \operatorname{rg}A = 2$. Orlando con los términos independientes:
$\begin{vmatrix} -2 & 1 & 1 \\ 1 & -2 & -2 \\ 1 & 1 & 4\end{vmatrix} = 9 \neq 0 \Rightarrow \operatorname{rg}A^* = 3$: <b>SI</b>.</li>
</ul>
<p class="tip">Atajo para $a=-2$: sumando las tres ecuaciones se obtiene $0 = 1 - 2 + 4 = 3$, absurdo.</p>
<p><b>b)</b> $a = 0$: $\; y + z = 1,\; x + z = 0,\; x + y = 0$. De las dos últimas $x = -z$ y $x = -y$, luego $y = z$; y como $y + z = 1$: $y = z = \frac12$, $x = -\frac12$.</p>
$$(x,y,z) = \left(-\tfrac12,\ \tfrac12,\ \tfrac12\right)$$`,
              },
              {
                prompt: T`<p>Una tienda vende tres tipos de café: A a 10 €/kg, B a 12 €/kg y C a 15 €/kg. Un cliente compra 10 kg en total y paga 118 €. Se sabe que compró el doble de kilos de A que de C.</p>
<p>a) (1 punto) Plantea un sistema de ecuaciones que lo describa. &nbsp; b) (1 punto) Resuélvelo e interpreta la solución.</p>`,
                solution: T`<p><b>a)</b> Sean $x, y, z$ los kg de A, B y C:</p>
$$\begin{cases} x + y + z = 10 \\ 10x + 12y + 15z = 118 \\ x - 2z = 0 \end{cases}$$
<p><b>b)</b> $|A| = \begin{vmatrix} 1 & 1 & 1 \\ 10 & 12 & 15 \\ 1 & 0 & -2\end{vmatrix} = -1 \neq 0$ → SCD. Sustituyendo $x = 2z$: $y = 10 - 3z$ y</p>
$$20z + 12(10 - 3z) + 15z = 118 \Rightarrow 120 - z = 118 \Rightarrow z = 2$$
<p>Luego $x = 4$, $y = 4$, $z = 2$: compró <b>4 kg de A, 4 kg de B y 2 kg de C</b>.</p>
<p class="tip">Comprueba siempre que la solución tiene sentido en el contexto (cantidades no negativas).</p>`,
              },
              {
                prompt: T`<p>Se considera el sistema $$\begin{cases} x + y + mz = 2 \\ x + my + z = 2 \\ mx + y + z = 2 \end{cases}$$</p>
<p>a) (1,5 puntos) Discútelo según los valores de $m$. &nbsp; b) (0,5 puntos) Resuélvelo para $m = 1$.</p>`,
                solution: T`<p><b>a)</b> $|A| = \begin{vmatrix} 1 & 1 & m \\ 1 & m & 1 \\ m & 1 & 1\end{vmatrix} = -(m^3 - 3m + 2) = -(m-1)^2(m+2)$.</p>
<ul>
<li>$m \neq 1, -2$: <b>SCD</b>. (Por simetría la solución es $x = y = z = \frac{2}{m+2}$.)</li>
<li>$m = 1$: todas las ecuaciones son $x+y+z = 2$ → $\operatorname{rg}A = \operatorname{rg}A^* = 1$: <b>SCI</b> (2 parámetros).</li>
<li>$m = -2$: $\operatorname{rg}A = 2$; sumando las tres ecuaciones: $0 = 6$, absurdo → $\operatorname{rg}A^* = 3$: <b>SI</b>.</li>
</ul>
<p><b>b)</b> $m = 1$: $x = 2 - \lambda - \mu,\; y = \lambda,\; z = \mu$, con $\lambda, \mu \in \mathbb{R}$.</p>`,
              },
            ],
          },
        ],
      },
      {
        id: 'ana', name: 'Análisis', topics: [
          {
            id: 'limites', name: 'Límites y continuidad', summary: 'Indeterminaciones, asíntotas, continuidad y teorema de Bolzano.',
            gens: ['mat.limInf', 'mat.limZero', 'mat.contParam'],
            theory: T`
<h3>Indeterminaciones y cómo resolverlas</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Tipo</th><th>Estrategia</th></tr></thead><tbody>
<tr><td>$\frac{\infty}{\infty}$ (polinomios)</td><td>Comparar grados: mayor arriba → $\pm\infty$; igual → cociente de coeficientes principales; mayor abajo → 0.</td></tr>
<tr><td>$\frac{0}{0}$</td><td>Factorizar y simplificar, multiplicar por el conjugado o <b>L'Hôpital</b>.</td></tr>
<tr><td>$\infty - \infty$</td><td>Con raíces: conjugado. Con fracciones: restar.</td></tr>
<tr><td>$1^\infty$</td><td>$\lim f^g = e^{\lim g\,(f-1)}$</td></tr>
<tr><td>$0\cdot\infty$</td><td>Reescribir como cociente y aplicar L'Hôpital.</td></tr>
</tbody></table></div>
<div class="formula">$$\textbf{L'Hôpital: } \lim_{x\to a}\frac{f(x)}{g(x)} \overset{0/0,\ \infty/\infty}{=} \lim_{x\to a}\frac{f'(x)}{g'(x)}$$</div>
<p>Límites notables: $\displaystyle\lim_{x\to0}\frac{\operatorname{sen}x}{x} = 1$, $\displaystyle\lim_{x\to0}\frac{e^x-1}{x} = 1$, $\displaystyle\lim_{x\to\infty}\left(1+\frac{1}{x}\right)^x = e$.</p>
<h3>Continuidad</h3>
<p>$f$ es continua en $a$ si $\displaystyle\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = f(a)$.</p>
<ul>
<li><b>Evitable</b>: el límite existe y es finito, pero no coincide con $f(a)$ (o $f(a)$ no existe).</li>
<li><b>De salto finito</b>: límites laterales finitos y distintos.</li>
<li><b>De salto infinito / esencial</b>: algún límite lateral es infinito o no existe.</li>
</ul>
<h3>Asíntotas</h3>
<ul>
<li><b>Vertical</b> $x = a$: $\lim_{x\to a} f(x) = \pm\infty$ (busca donde se anula el denominador o el argumento de un logaritmo).</li>
<li><b>Horizontal</b> $y = L$: $\lim_{x\to\pm\infty} f(x) = L$.</li>
<li><b>Oblicua</b> $y = mx + n$: $m = \lim \frac{f(x)}{x}$, $n = \lim (f(x) - mx)$. No puede haber horizontal y oblicua en el mismo lado.</li>
</ul>
<h3>Teoremas</h3>
<div class="formula"><b>Bolzano:</b> si $f$ es continua en $[a,b]$ y $f(a)\cdot f(b) < 0$, existe $c\in(a,b)$ con $f(c) = 0$.<br>
<b>Weierstrass:</b> si $f$ es continua en $[a,b]$, alcanza un máximo y un mínimo absolutos en $[a,b]$.</div>
<p class="tip"><b>Truco PAU:</b> para probar que una ecuación tiene <i>exactamente</i> una solución: Bolzano (existencia) + monotonía estricta, $f' > 0$ o $f' < 0$ (unicidad).</p>`,
            questions: [
              { type: 'mc', prompt: T`La función $f(x) = \dfrac{x^2 - 1}{x - 1}$ en $x = 1$ presenta:`, options: ['una discontinuidad evitable', 'un salto finito', 'una asíntota vertical', 'es continua'], answer: 0, solution: T`$f(x) = x + 1$ para $x \neq 1$; $\lim_{x\to1} f = 2$ existe pero $f(1)$ no está definida → evitable.` },
              { type: 'mc', prompt: T`Asíntota horizontal de $f(x) = \dfrac{2x^2+1}{x^2-4}$:`, options: ['$y = 0$', '$y = 2$', '$y = 1/2$', 'no tiene'], answer: 1, solution: T`Mismo grado → $\lim_{x\to\pm\infty} f = 2/1 = 2$.` },
              { type: 'mc', prompt: T`Asíntota oblicua de $f(x) = \dfrac{x^2+1}{x}$:`, options: ['$y = x$', '$y = x + 1$', '$y = 1$', 'no tiene'], answer: 0, solution: T`$f(x) = x + \frac1x$: $m = 1$, $n = \lim \frac1x = 0$ → $y = x$.` },
              { type: 'mc', prompt: T`$\displaystyle\lim_{x\to+\infty}\left(1 + \frac{1}{x}\right)^{x}$ vale:`, options: ['$1$', '$\\infty$', '$e$', '$0$'], answer: 2, solution: 'Es la definición del número $e$.' },
              { type: 'mc', prompt: 'El teorema de Bolzano garantiza que si $f$ es continua en $[a,b]$ y $f(a)f(b)<0$…', options: [T`existe $c\in(a,b)$ con $f(c)=0$`, T`existe $c$ con $f'(c)=0$`, '$f$ es creciente', '$f$ tiene un máximo en $(a,b)$'], answer: 0, solution: 'Bolzano asegura la existencia de al menos una raíz en el intervalo abierto.' },
              { type: 'mc', prompt: T`$\displaystyle\lim_{x\to0}\frac{\operatorname{sen}(3x)}{x}$ vale:`, options: ['$0$', '$1$', '$3$', T`$\frac13$`], answer: 2, solution: T`L'Hôpital: $\lim \frac{3\cos 3x}{1} = 3$.` },
              { type: 'mc', prompt: T`La función $f(x) = \ln(x - 2)$ tiene una asíntota vertical en:`, options: ['$x = 0$', '$x = 2$', '$x = 3$', 'no tiene'], answer: 1, solution: T`$\lim_{x\to2^+}\ln(x-2) = -\infty$.` },
            ],
            problems: [
              {
                prompt: T`<p>Sea $f(x) = \begin{cases} \dfrac{e^{x} - 1}{x} & \text{si } x \neq 0 \\ k & \text{si } x = 0 \end{cases}$</p>
<p>a) (1 punto) Halla $k$ para que $f$ sea continua en $x = 0$.</p>
<p>b) (1 punto) Demuestra que la ecuación $x^3 + x - 1 = 0$ tiene exactamente una solución real en el intervalo $(0,1)$.</p>`,
                solution: T`<p><b>a)</b> $\displaystyle\lim_{x\to0}\frac{e^x-1}{x} \overset{0/0}{=} \lim_{x\to0}\frac{e^x}{1} = 1$. Para que sea continua, $k = f(0) = 1$.</p>
<p><b>b)</b> Sea $g(x) = x^3 + x - 1$, continua en $\mathbb{R}$ (polinómica).</p>
<ul><li><b>Existencia:</b> $g(0) = -1 < 0$ y $g(1) = 1 > 0$. Por Bolzano, existe $c\in(0,1)$ con $g(c) = 0$.</li>
<li><b>Unicidad:</b> $g'(x) = 3x^2 + 1 > 0$ para todo $x$, luego $g$ es estrictamente creciente y solo puede cortar al eje una vez.</li></ul>`,
              },
              {
                prompt: T`<p>Dada $f(x) = \dfrac{x^2}{x - 1}$:</p>
<p>a) (1 punto) Calcula sus asíntotas.</p>
<p>b) (1 punto) Determina sus intervalos de crecimiento y decrecimiento y sus extremos relativos.</p>`,
                solution: T`<p><b>a)</b> Dominio: $\mathbb{R}\setminus\{1\}$.</p>
<ul><li><b>AV</b> $x = 1$: $\lim_{x\to1^\pm} f = \pm\infty$.</li>
<li><b>AH</b>: no tiene (grado del numerador mayor).</li>
<li><b>AO</b>: $m = \lim\frac{x^2}{x^2-x} = 1$, $n = \lim\left(\frac{x^2}{x-1} - x\right) = \lim\frac{x}{x-1} = 1$ → $y = x + 1$.</li></ul>
<p><b>b)</b> $f'(x) = \dfrac{2x(x-1) - x^2}{(x-1)^2} = \dfrac{x(x-2)}{(x-1)^2}$. Se anula en $x = 0$ y $x = 2$.</p>
<div class="table-wrap"><table class="data"><thead><tr><th>Intervalo</th><th>$(-\infty,0)$</th><th>$(0,1)$</th><th>$(1,2)$</th><th>$(2,+\infty)$</th></tr></thead>
<tbody><tr><td>Signo $f'$</td><td>+</td><td>−</td><td>−</td><td>+</td></tr><tr><td>$f$</td><td>↗</td><td>↘</td><td>↘</td><td>↗</td></tr></tbody></table></div>
<p>Máximo relativo en $(0, 0)$; mínimo relativo en $(2, 4)$.</p>`,
              },
            ],
          },
          {
            id: 'derivadas', name: 'Derivadas y aplicaciones', summary: 'Reglas de derivación, recta tangente, monotonía, extremos, curvatura, optimización, Rolle y TVM.',
            gens: ['mat.derivEval', 'mat.tangent', 'mat.extrema'],
            theory: T`
<h3>Tabla de derivadas (con la regla de la cadena)</h3>
<div class="table-wrap"><table class="data"><tbody>
<tr><td>$(u^n)' = n\,u^{n-1}u'$</td><td>$(\sqrt{u})' = \dfrac{u'}{2\sqrt{u}}$</td></tr>
<tr><td>$(e^u)' = u'e^u$</td><td>$(a^u)' = u'a^u\ln a$</td></tr>
<tr><td>$(\ln u)' = \dfrac{u'}{u}$</td><td>$(\log_a u)' = \dfrac{u'}{u\ln a}$</td></tr>
<tr><td>$(\operatorname{sen}u)' = u'\cos u$</td><td>$(\cos u)' = -u'\operatorname{sen}u$</td></tr>
<tr><td>$(\operatorname{tg}u)' = \dfrac{u'}{\cos^2u} = u'(1+\operatorname{tg}^2u)$</td><td>$(\operatorname{arctg}u)' = \dfrac{u'}{1+u^2}$</td></tr>
<tr><td>$(uv)' = u'v + uv'$</td><td>$\left(\dfrac{u}{v}\right)' = \dfrac{u'v - uv'}{v^2}$</td></tr>
</tbody></table></div>
<h3>Recta tangente</h3>
<div class="formula">$$y - f(a) = f'(a)\,(x - a)$$</div>
<h3>Monotonía, extremos y curvatura</h3>
<ul>
<li>$f' > 0$ → creciente; $f' < 0$ → decreciente.</li>
<li>Si $f'(a) = 0$ y $f''(a) < 0$ → <b>máximo</b> relativo; $f''(a) > 0$ → <b>mínimo</b> relativo.</li>
<li>$f'' > 0$ → convexa (∪); $f'' < 0$ → cóncava (∩). Punto de inflexión: donde $f''$ cambia de signo.</li>
</ul>
<h3>Optimización (pasos)</h3>
<ol><li>Identifica la función a optimizar y las variables.</li><li>Usa la condición (ligadura) para dejar una sola variable.</li><li>Deriva, iguala a 0 y comprueba con $f''$ o con el signo de $f'$.</li><li>Responde a la pregunta con unidades.</li></ol>
<h3>Teoremas</h3>
<div class="formula"><b>Rolle:</b> $f$ continua en $[a,b]$, derivable en $(a,b)$ y $f(a) = f(b)$ ⟹ $\exists c\in(a,b)$: $f'(c) = 0$.<br>
<b>Valor medio (Lagrange):</b> $f$ continua en $[a,b]$ y derivable en $(a,b)$ ⟹ $\exists c\in(a,b)$: $f'(c) = \dfrac{f(b)-f(a)}{b-a}$.</div>
<p class="tip"><b>Importante:</b> derivable ⟹ continua, pero no al revés ($|x|$ es continua en 0 y no derivable). En funciones a trozos, estudia primero la continuidad y luego compara derivadas laterales.</p>`,
            questions: [
              { type: 'mc', prompt: T`La derivada de $f(x) = e^{x^2}$ es:`, options: [T`$e^{x^2}$`, T`$2x\,e^{x^2}$`, T`$x^2e^{x^2-1}$`, T`$2e^{x}$`], answer: 1, solution: T`Regla de la cadena: $(e^u)' = u'e^u$ con $u = x^2$.` },
              { type: 'mc', prompt: T`La derivada de $f(x) = \ln(\operatorname{sen}x)$ es:`, options: [T`$\frac{1}{\operatorname{sen}x}$`, T`$\frac{\cos x}{\operatorname{sen}x}$`, T`$\ln(\cos x)$`, T`$-\frac{\cos x}{\operatorname{sen}x}$`], answer: 1, solution: T`$(\ln u)' = u'/u = \cos x / \operatorname{sen}x$.` },
              { type: 'mc', prompt: T`Si $f'(a) = 0$ y $f''(a) > 0$, en $x = a$ hay:`, options: ['un máximo relativo', 'un mínimo relativo', 'un punto de inflexión', 'una asíntota'], answer: 1, solution: 'Tangente horizontal y función convexa → mínimo relativo.' },
              { type: 'mc', prompt: '¿Cuál de estas afirmaciones es verdadera?', options: ['Toda función continua es derivable', 'Toda función derivable es continua', 'Si f es continua, f′ también lo es', 'Si f′(a)=0 hay un extremo en a'], answer: 1, solution: T`Derivable ⟹ continua. El recíproco es falso ($|x|$ en 0) y $f'(a)=0$ no garantiza extremo ($x^3$ en 0).` },
              { type: 'mc', prompt: T`La derivada de $\operatorname{arctg}(2x)$ es:`, options: [T`$\frac{1}{1+4x^2}$`, T`$\frac{2}{1+4x^2}$`, T`$\frac{2}{1+2x^2}$`, T`$\frac{1}{1+x^2}$`], answer: 1, solution: T`$(\operatorname{arctg}u)' = \frac{u'}{1+u^2} = \frac{2}{1+4x^2}$.` },
              { type: 'mc', prompt: 'El teorema de Rolle exige, además de continuidad y derivabilidad…', options: [T`$f(a) = f(b)$`, T`$f(a)\cdot f(b) < 0$`, T`$f'(a) = 0$`, T`$f$ creciente`], answer: 0, solution: 'Rolle: si los extremos tienen la misma imagen, hay un punto con tangente horizontal.' },
              { type: 'mc', prompt: T`$f(x) = x^3$ en $x = 0$ tiene:`, options: ['un máximo', 'un mínimo', 'un punto de inflexión', 'una discontinuidad'], answer: 2, solution: T`$f'(0) = 0$ pero $f''(x) = 6x$ cambia de signo en 0: punto de inflexión.` },
            ],
            problems: [
              {
                prompt: T`<p>Una hoja de papel debe contener 18 cm² de texto impreso. Los márgenes superior e inferior deben ser de 2 cm cada uno y los laterales de 1 cm.</p>
<p>(2 puntos) Halla las dimensiones de la hoja para que su área sea mínima.</p>`,
                solution: T`<p>Sea el texto de $x$ cm de ancho y $y$ cm de alto: $xy = 18 \Rightarrow y = \frac{18}{x}$.</p>
<p>La hoja mide $(x + 2)\times(y + 4)$:</p>
$$S(x) = (x+2)\left(\frac{18}{x} + 4\right) = 26 + 4x + \frac{36}{x},\quad x > 0$$
$$S'(x) = 4 - \frac{36}{x^2} = 0 \iff x^2 = 9 \iff x = 3 \;(x>0)$$
<p>$S''(x) = \frac{72}{x^3} > 0$ → mínimo. Entonces $y = 6$.</p>
<p>La hoja debe medir <b>5 cm de ancho y 10 cm de alto</b> (área mínima 50 cm²).</p>`,
              },
              {
                prompt: T`<p>Sea $f(x) = x^3 + ax^2 + bx + c$.</p>
<p>a) (1,5 puntos) Halla $a$, $b$ y $c$ sabiendo que la gráfica pasa por $(0, 1)$ y tiene un extremo relativo en $x = 2$ y un punto de inflexión en $x = 1$.</p>
<p>b) (0,5 puntos) ¿El extremo en $x=2$ es máximo o mínimo?</p>`,
                solution: T`<p><b>a)</b> $f'(x) = 3x^2 + 2ax + b$, $f''(x) = 6x + 2a$.</p>
<ul><li>$f(0) = 1 \Rightarrow c = 1$.</li>
<li>$f''(1) = 0 \Rightarrow 6 + 2a = 0 \Rightarrow a = -3$.</li>
<li>$f'(2) = 0 \Rightarrow 12 + 4a + b = 0 \Rightarrow b = 0$.</li></ul>
<p>$f(x) = x^3 - 3x^2 + 1$.</p>
<p><b>b)</b> $f''(2) = 12 - 6 = 6 > 0$ → <b>mínimo</b> relativo en $(2, -3)$.</p>`,
              },
            ],
          },
          {
            id: 'integrales', name: 'Integrales', summary: 'Primitivas inmediatas, partes, cambio de variable, racionales, Barrow y áreas.',
            gens: ['mat.intDef', 'mat.area'],
            theory: T`
<h3>Integrales inmediatas</h3>
<div class="table-wrap"><table class="data"><tbody>
<tr><td>$\int u^n u'\,dx = \dfrac{u^{n+1}}{n+1} + C\ (n\neq-1)$</td><td>$\int \dfrac{u'}{u}\,dx = \ln|u| + C$</td></tr>
<tr><td>$\int u'e^u\,dx = e^u + C$</td><td>$\int u'a^u\,dx = \dfrac{a^u}{\ln a} + C$</td></tr>
<tr><td>$\int u'\cos u\,dx = \operatorname{sen}u + C$</td><td>$\int u'\operatorname{sen}u\,dx = -\cos u + C$</td></tr>
<tr><td>$\int \dfrac{u'}{1+u^2}\,dx = \operatorname{arctg}u + C$</td><td>$\int \dfrac{u'}{\cos^2u}\,dx = \operatorname{tg}u + C$</td></tr>
</tbody></table></div>
<h3>Por partes</h3>
<div class="formula">$$\int u\,dv = uv - \int v\,du$$</div>
<p>Elige $u$ con la regla <b>ALPES</b> (Arcos, Logaritmos, Polinomios, Exponenciales, Senos/cosenos): la primera que aparezca es $u$. Ej.: $\int x e^x dx$: $u = x$, $dv = e^x dx$ → $(x-1)e^x + C$.</p>
<h3>Racionales</h3>
<p>Si grado(num) ≥ grado(den), divide primero. Después descompón en fracciones simples según las raíces del denominador: $\frac{A}{x-a}$ (raíz simple), $\frac{A}{x-a} + \frac{B}{(x-a)^2}$ (raíz doble).</p>
<h3>Integral definida y áreas</h3>
<div class="formula">$$\textbf{Barrow: } \int_a^b f(x)\,dx = F(b) - F(a)$$
<b>Teorema fundamental:</b> si $F(x) = \int_a^x f(t)\,dt$ con $f$ continua, entonces $F'(x) = f(x)$.</div>
<ol><li>Halla los puntos de corte ($f(x) = 0$, o $f(x) = g(x)$ entre dos curvas).</li>
<li>Integra en cada subintervalo y toma <b>valor absoluto</b>.</li>
<li>Suma las áreas parciales.</li></ol>
<p class="tip"><b>Error típico:</b> integrar de golpe un intervalo donde la función cambia de signo: las áreas positivas y negativas se compensan.</p>`,
            questions: [
              { type: 'mc', prompt: T`$\displaystyle\int \frac{2x}{x^2+1}\,dx =$`, options: [T`$\ln(x^2+1) + C$`, T`$\operatorname{arctg}x + C$`, T`$\frac{1}{x^2+1} + C$`, T`$2\ln x + C$`], answer: 0, solution: T`Es del tipo $\int\frac{u'}{u} = \ln|u|$ con $u = x^2+1$.` },
              { type: 'mc', prompt: T`$\displaystyle\int x\,e^x\,dx =$`, options: [T`$x e^x + C$`, T`$(x-1)e^x + C$`, T`$\frac{x^2}{2}e^x + C$`, T`$(x+1)e^x + C$`], answer: 1, solution: T`Por partes con $u = x$, $dv = e^x dx$: $xe^x - \int e^x dx = (x-1)e^x + C$.` },
              { type: 'mc', prompt: T`$\displaystyle\int_0^\pi \operatorname{sen}x\,dx =$`, options: ['$0$', '$1$', '$2$', '$\\pi$'], answer: 2, solution: T`$[-\cos x]_0^\pi = -(-1) - (-1) = 2$.` },
              { type: 'mc', prompt: T`Si $F(x) = \displaystyle\int_0^{x^2} e^{t}\,dt$, entonces $F'(x)$ es:`, options: [T`$e^{x^2}$`, T`$2x\,e^{x^2}$`, T`$e^{x^2} - 1$`, T`$x^2e^{x}$`], answer: 1, solution: T`Teorema fundamental + regla de la cadena: $F'(x) = e^{x^2}\cdot 2x$.` },
              { type: 'mc', prompt: T`$\displaystyle\int \frac{dx}{1+x^2} =$`, options: [T`$\ln(1+x^2) + C$`, T`$\operatorname{arctg}x + C$`, T`$\frac{1}{x} + C$`, T`$\operatorname{arcsen}x + C$`], answer: 1, solution: 'Integral inmediata de tipo arcotangente.' },
              { type: 'mc', prompt: T`$\displaystyle\int \frac{1}{x}\,dx =$`, options: [T`$\ln|x| + C$`, T`$-\frac{1}{x^2} + C$`, T`$\frac{x^0}{0}$`, T`$e^x + C$`], answer: 0, solution: T`Caso $n = -1$ de la potencial: $\ln|x| + C$.` },
              { type: 'mc', prompt: T`Para calcular $\int x\ln x\,dx$ por partes se toma:`, options: [T`$u = x$, $dv = \ln x\,dx$`, T`$u = \ln x$, $dv = x\,dx$`, 'no se puede por partes', T`$u = x\ln x$`], answer: 1, solution: T`ALPES: el logaritmo va antes que el polinomio, así que $u = \ln x$. Resultado: $\frac{x^2}{2}\ln x - \frac{x^2}{4} + C$.` },
            ],
            problems: [
              {
                prompt: T`<p>a) (1 punto) Calcula el área del recinto limitado por la gráfica de $f(x) = x^3 - 4x$ y el eje de abscisas.</p>
<p>b) (1 punto) Calcula $\displaystyle\int x\ln x\,dx$.</p>`,
                solution: T`<p><b>a)</b> Cortes: $x^3 - 4x = x(x-2)(x+2) = 0 \Rightarrow x = -2, 0, 2$.</p>
$$\int_{-2}^{0}(x^3 - 4x)\,dx = \left[\frac{x^4}{4} - 2x^2\right]_{-2}^{0} = 0 - (4 - 8) = 4$$
$$\int_{0}^{2}(x^3 - 4x)\,dx = (4 - 8) - 0 = -4$$
<p>Área $= |4| + |-4| = 8$ u².</p>
<p><b>b)</b> Por partes: $u = \ln x \Rightarrow du = \frac{dx}{x}$; $dv = x\,dx \Rightarrow v = \frac{x^2}{2}$.</p>
$$\int x\ln x\,dx = \frac{x^2}{2}\ln x - \int\frac{x^2}{2}\cdot\frac{1}{x}\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4} + C$$`,
              },
              {
                prompt: T`<p>a) (1 punto) Calcula $\displaystyle\int \frac{3x + 1}{x^2 - 1}\,dx$.</p>
<p>b) (1 punto) Halla el área encerrada entre $y = x^2$ e $y = 2x$.</p>`,
                solution: T`<p><b>a)</b> $x^2 - 1 = (x-1)(x+1)$. Descomponemos: $\dfrac{3x+1}{x^2-1} = \dfrac{A}{x-1} + \dfrac{B}{x+1}$, con $3x + 1 = A(x+1) + B(x-1)$.</p>
<p>$x = 1$: $4 = 2A \Rightarrow A = 2$. &nbsp; $x = -1$: $-2 = -2B \Rightarrow B = 1$.</p>
$$\int\frac{3x+1}{x^2-1}\,dx = 2\ln|x-1| + \ln|x+1| + C$$
<p><b>b)</b> Cortes: $x^2 = 2x \Rightarrow x = 0,\ 2$. En $(0,2)$ la recta va por encima ($2x \ge x^2$):</p>
$$A = \int_0^2 (2x - x^2)\,dx = \left[x^2 - \frac{x^3}{3}\right]_0^2 = 4 - \frac83 = \frac43\ \text{u}^2$$`,
              },
            ],
          },
        ],
      },
      {
        id: 'geo', name: 'Geometría', topics: [
          {
            id: 'rectasplanos', name: 'Rectas y planos', summary: 'Ecuaciones de rectas y planos, posiciones relativas, producto escalar, vectorial y mixto.',
            gens: ['mat.plane3', 'mat.linePlane', 'mat.cross'],
            theory: T`
<h3>Productos de vectores</h3>
<div class="formula">
$\vec u\cdot\vec v = u_1v_1 + u_2v_2 + u_3v_3 = |\vec u||\vec v|\cos\alpha$ &nbsp;(escalar; 0 si son perpendiculares)<br>
$\vec u\times\vec v = \begin{vmatrix}\vec i & \vec j & \vec k\\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3\end{vmatrix}$ &nbsp;(vectorial; perpendicular a ambos, $|\vec u\times\vec v|$ = área del paralelogramo)<br>
$[\vec u,\vec v,\vec w] = \det(\vec u,\vec v,\vec w)$ &nbsp;(mixto; volumen del paralelepípedo, 0 si son coplanarios)</div>
<h3>Ecuaciones de la recta</h3>
<p>Con un punto $P(x_0,y_0,z_0)$ y un vector director $\vec v = (v_1,v_2,v_3)$:</p>
<ul><li>Vectorial / paramétricas: $(x,y,z) = P + \lambda\vec v$.</li>
<li>Continua: $\dfrac{x-x_0}{v_1} = \dfrac{y-y_0}{v_2} = \dfrac{z-z_0}{v_3}$.</li>
<li>Implícitas: intersección de dos planos. Vector director: producto vectorial de sus normales.</li></ul>
<h3>Ecuaciones del plano</h3>
<p>Con un punto y dos vectores directores, o con un punto y el vector normal $\vec n = (A,B,C)$:</p>
<div class="formula">$$\pi: Ax + By + Cz + D = 0,\qquad \vec n = \vec u\times\vec v$$</div>
<h3>Posiciones relativas</h3>
<p><b>Dos planos</b>: coincidentes (coeficientes proporcionales incluido $D$), paralelos (solo $A,B,C$ proporcionales) o secantes (se cortan en una recta).</p>
<p><b>Recta y plano</b> ($\vec v$ director de la recta, $\vec n$ normal del plano):</p>
<ul><li>$\vec v\cdot\vec n \neq 0$ → secantes (se cortan en un punto).</li><li>$\vec v\cdot\vec n = 0$ y un punto de la recta está en el plano → recta contenida.</li><li>$\vec v\cdot\vec n = 0$ y no está → paralelos.</li></ul>
<p><b>Dos rectas</b> ($r$: $P,\vec u$; $s$: $Q,\vec v$):</p>
<div class="table-wrap"><table class="data"><thead><tr><th>$\operatorname{rg}(\vec u,\vec v)$</th><th>$\operatorname{rg}(\vec u,\vec v,\vec{PQ})$</th><th>Posición</th></tr></thead><tbody>
<tr><td>1</td><td>1</td><td>Coincidentes</td></tr><tr><td>1</td><td>2</td><td>Paralelas</td></tr><tr><td>2</td><td>2</td><td>Se cortan</td></tr><tr><td>2</td><td>3</td><td>Se cruzan</td></tr></tbody></table></div>
<p class="tip"><b>Truco PAU:</b> si te dan una recta en implícitas, pásala a paramétricas resolviendo el sistema con un parámetro: es casi siempre más cómodo.</p>`,
            questions: [
              { type: 'mc', prompt: T`Un vector normal del plano $2x - y + 3z = 5$ es:`, options: ['$(2,-1,3)$', '$(2,-1,5)$', '$(-1,3,5)$', '$(2,1,3)$'], answer: 0, solution: T`Los coeficientes de $x, y, z$ forman el vector normal: $(2,-1,3)$.` },
              { type: 'mc', prompt: T`Los planos $x + 2y - z = 1$ y $2x + 4y - 2z = 5$ son:`, options: ['coincidentes', 'paralelos', 'secantes', 'perpendiculares'], answer: 1, solution: T`$\frac12 = \frac24 = \frac{-1}{-2} \neq \frac15$: normales proporcionales pero no los términos independientes → paralelos.` },
              { type: 'mc', prompt: T`Si $\vec v\cdot\vec n = 0$ (director de la recta y normal del plano) y un punto de la recta no está en el plano, la recta es:`, options: ['secante al plano', 'paralela al plano', 'perpendicular al plano', 'contenida en el plano'], answer: 1, solution: 'Director perpendicular a la normal → paralela o contenida. Como un punto no pertenece al plano, es paralela.' },
              { type: 'mc', prompt: T`Dos rectas con $\operatorname{rg}(\vec u,\vec v) = 2$ y $\operatorname{rg}(\vec u,\vec v,\vec{PQ}) = 3$:`, options: ['se cortan', 'son paralelas', 'se cruzan', 'son coincidentes'], answer: 2, solution: 'No son paralelas y no son coplanarias: se cruzan.' },
              { type: 'mc', prompt: T`Si $[\vec u,\vec v,\vec w] = 0$, los vectores son:`, options: ['perpendiculares', 'coplanarios', 'unitarios', 'paralelos dos a dos'], answer: 1, solution: 'El producto mixto nulo indica que son linealmente dependientes: están en un mismo plano.' },
              { type: 'mc', prompt: T`El producto vectorial $\vec u\times\vec v$ es:`, options: ['un número', 'perpendicular a $\\vec u$ y a $\\vec v$', 'paralelo a $\\vec u$', 'siempre unitario'], answer: 1, solution: T`Es un vector perpendicular a ambos, de módulo $|\vec u||\vec v|\operatorname{sen}\alpha$.` },
            ],
            problems: [
              {
                prompt: T`<p>Dados la recta $r: \dfrac{x-1}{2} = \dfrac{y}{-1} = \dfrac{z+1}{1}$ y el plano $\pi: x + y - z = 3$:</p>
<p>a) (1 punto) Estudia la posición relativa de $r$ y $\pi$ y calcula la distancia entre ellos.</p>
<p>b) (1 punto) Halla el plano que contiene a $r$ y es perpendicular a $\pi$.</p>`,
                solution: T`<p><b>a)</b> $r$: $P(1,0,-1)$, $\vec v = (2,-1,1)$. $\pi$: $\vec n = (1,1,-1)$.</p>
<p>$\vec v\cdot\vec n = 2 - 1 - 1 = 0$ → paralela o contenida. $P$ en $\pi$: $1 + 0 + 1 = 2 \neq 3$ → <b>paralelos</b>.</p>
$$d(r,\pi) = d(P,\pi) = \frac{|1 + 0 + 1 - 3|}{\sqrt{3}} = \frac{1}{\sqrt3} = \frac{\sqrt3}{3}\ \text{u}$$
<p><b>b)</b> El plano buscado contiene a $P$ y tiene como directores $\vec v$ y $\vec n$:</p>
$$\vec v\times\vec n = \begin{vmatrix}\vec i & \vec j & \vec k \\ 2 & -1 & 1 \\ 1 & 1 & -1\end{vmatrix} = (0, 3, 3) \parallel (0,1,1)$$
$$\sigma: 0(x-1) + 1(y - 0) + 1(z + 1) = 0 \;\Rightarrow\; \sigma: y + z + 1 = 0$$`,
              },
              {
                prompt: T`<p>Considera las rectas $r: (x,y,z) = (1,0,-1) + \lambda(1,2,1)$ y $s: (x,y,z) = (0,1,2) + \mu(1,-1,1)$.</p>
<p>a) (1 punto) Estudia su posición relativa.</p>
<p>b) (1 punto) Calcula la distancia entre ellas.</p>`,
                solution: T`<p><b>a)</b> $\vec u = (1,2,1)$, $\vec v = (1,-1,1)$ no son proporcionales. $\vec{PQ} = (-1,1,3)$.</p>
$$[\vec{PQ},\vec u,\vec v] = \begin{vmatrix} -1 & 1 & 3 \\ 1 & 2 & 1 \\ 1 & -1 & 1\end{vmatrix} = -12 \neq 0$$
<p>Rango 3 → las rectas <b>se cruzan</b>.</p>
<p><b>b)</b> $\vec u\times\vec v = (3, 0, -3)$, $|\vec u\times\vec v| = 3\sqrt2$.</p>
$$d(r,s) = \frac{|[\vec{PQ},\vec u,\vec v]|}{|\vec u\times\vec v|} = \frac{12}{3\sqrt2} = 2\sqrt2\ \text{u}$$`,
              },
            ],
          },
          {
            id: 'metrica', name: 'Ángulos, distancias, áreas y volúmenes', summary: 'Problemas métricos: ángulos, distancias, simétricos, áreas y volúmenes.',
            gens: ['mat.distPlane', 'mat.anglePlanes', 'mat.symPlane', 'mat.tetra'],
            theory: T`
<h3>Ángulos</h3>
<div class="formula">
Entre rectas: $\cos\alpha = \dfrac{|\vec u\cdot\vec v|}{|\vec u||\vec v|}$ &nbsp;&nbsp; Entre planos: $\cos\alpha = \dfrac{|\vec n_1\cdot\vec n_2|}{|\vec n_1||\vec n_2|}$<br>
Entre recta y plano: $\operatorname{sen}\alpha = \dfrac{|\vec v\cdot\vec n|}{|\vec v||\vec n|}$ &nbsp;(¡seno!)</div>
<h3>Distancias</h3>
<div class="formula">
Punto–plano: $d(P,\pi) = \dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\sqrt{A^2+B^2+C^2}}$<br>
Punto–recta: $d(P,r) = \dfrac{|\vec{AP}\times\vec v|}{|\vec v|}$ &nbsp;($A\in r$)<br>
Entre rectas que se cruzan: $d(r,s) = \dfrac{|[\vec{PQ},\vec u,\vec v]|}{|\vec u\times\vec v|}$<br>
Entre planos paralelos $Ax+By+Cz+D=0$ y $Ax+By+Cz+D'=0$: $\dfrac{|D-D'|}{\sqrt{A^2+B^2+C^2}}$</div>
<h3>Áreas y volúmenes</h3>
<div class="formula">
Paralelogramo: $|\vec u\times\vec v|$ &nbsp;&nbsp; Triángulo $ABC$: $\frac12|\vec{AB}\times\vec{AC}|$<br>
Paralelepípedo: $|[\vec u,\vec v,\vec w]|$ &nbsp;&nbsp; Tetraedro $ABCD$: $\frac16|[\vec{AB},\vec{AC},\vec{AD}]|$</div>
<h3>Proyecciones y simétricos</h3>
<ul><li><b>Proyección de $P$ sobre $\pi$</b>: recta por $P$ con dirección $\vec n$, intersecada con $\pi$ → punto $M$.</li>
<li><b>Simétrico de $P$ respecto a $\pi$</b>: $P' = 2M - P$ ($M$ es el punto medio).</li>
<li><b>Simétrico respecto a una recta</b>: plano perpendicular a $r$ por $P$, se corta con $r$ → $M$, y $P' = 2M - P$.</li></ul>
<p class="tip"><b>Truco PAU:</b> en «halla un punto de la recta tal que el volumen/área valga…», escribe el punto genérico con el parámetro $\lambda$, plantea la fórmula y obtendrás una ecuación con valor absoluto (¡dos soluciones!).</p>`,
            questions: [
              { type: 'mc', prompt: T`Distancia entre los planos $2x + y - 2z + 1 = 0$ y $2x + y - 2z - 5 = 0$:`, options: ['$2$', '$6$', '$4/3$', '$1$'], answer: 0, solution: T`$\frac{|1-(-5)|}{\sqrt{4+1+4}} = \frac{6}{3} = 2$.` },
              { type: 'mc', prompt: T`El área del triángulo de vértices $A, B, C$ es:`, options: [T`$|\vec{AB}\times\vec{AC}|$`, T`$\frac12|\vec{AB}\times\vec{AC}|$`, T`$\frac12\vec{AB}\cdot\vec{AC}$`, T`$\frac16|[\vec{AB},\vec{AC}]|$`], answer: 1, solution: 'Medio paralelogramo: la mitad del módulo del producto vectorial.' },
              { type: 'mc', prompt: 'El ángulo entre una recta y un plano se calcula con:', options: ['el coseno del ángulo entre director y normal', 'el seno, usando director y normal', 'el producto mixto', 'la distancia'], answer: 1, solution: T`El ángulo recta–plano es el complementario del ángulo entre $\vec v$ y $\vec n$: $\operatorname{sen}\alpha = \frac{|\vec v\cdot\vec n|}{|\vec v||\vec n|}$.` },
              { type: 'mc', prompt: T`El volumen del tetraedro de vértices $O(0,0,0)$, $(1,0,0)$, $(0,2,0)$, $(0,0,3)$ es:`, options: ['$6$', '$1$', '$2$', '$3$'], answer: 1, solution: T`$\frac16|\det| = \frac16\cdot 1\cdot2\cdot3 = 1$.` },
              { type: 'mc', prompt: T`Distancia del origen al plano $2x - y + 2z = 6$:`, options: ['$2$', '$6$', '$3$', T`$\frac{6}{\sqrt5}$`], answer: 0, solution: T`$\frac{|0 - 6|}{\sqrt{4+1+4}} = \frac{6}{3} = 2$.` },
              { type: 'mc', prompt: T`$|\vec u\times\vec v|$ es igual a:`, options: [T`$|\vec u||\vec v|\cos\alpha$`, T`$|\vec u||\vec v|\operatorname{sen}\alpha$`, T`$\vec u\cdot\vec v$`, T`$|\vec u| + |\vec v|$`], answer: 1, solution: 'Por definición del módulo del producto vectorial.' },
            ],
            problems: [
              {
                prompt: T`<p>Sean los puntos $A(1,0,0)$, $B(0,2,0)$ y $C(0,0,3)$.</p>
<p>a) (0,75 puntos) Halla la ecuación del plano $\pi$ que los contiene.</p>
<p>b) (0,75 puntos) Calcula el área del triángulo $ABC$.</p>
<p>c) (0,5 puntos) Calcula la distancia del origen al plano $\pi$ y el volumen del tetraedro $OABC$.</p>`,
                solution: T`<p><b>a)</b> $\vec{AB} = (-1,2,0)$, $\vec{AC} = (-1,0,3)$, $\vec n = \vec{AB}\times\vec{AC} = (6,3,2)$.</p>
<p>$\pi: 6(x-1) + 3y + 2z = 0 \Rightarrow \pi: 6x + 3y + 2z = 6$ (equivalente a $\frac{x}{1} + \frac{y}{2} + \frac{z}{3} = 1$).</p>
<p><b>b)</b> $|\vec n| = \sqrt{36+9+4} = 7 \Rightarrow S = \frac{7}{2}$ u².</p>
<p><b>c)</b> $d(O,\pi) = \frac{|-6|}{7} = \frac67$ u. $V = \frac16|[\vec{OA},\vec{OB},\vec{OC}]| = \frac{1\cdot2\cdot3}{6} = 1$ u³.</p>
<p class="tip">Comprobación: $V = \frac13\cdot S\cdot h = \frac13\cdot\frac72\cdot\frac67 = 1$ ✓</p>`,
              },
              {
                prompt: T`<p>Sea el plano $\pi: x - 2y + 2z + 1 = 0$ y el punto $P(2, -1, 3)$.</p>
<p>a) (1 punto) Halla la proyección ortogonal de $P$ sobre $\pi$.</p>
<p>b) (1 punto) Halla el punto simétrico de $P$ respecto de $\pi$ y la distancia de $P$ a $\pi$.</p>`,
                solution: T`<p><b>a)</b> Recta perpendicular: $(x,y,z) = (2 + \lambda,\ -1 - 2\lambda,\ 3 + 2\lambda)$. Sustituyendo en $\pi$:</p>
$$(2+\lambda) - 2(-1-2\lambda) + 2(3+2\lambda) + 1 = 0 \Rightarrow 11 + 9\lambda = 0 \Rightarrow \lambda = -\tfrac{11}{9}$$
$$M = \left(2 - \tfrac{11}{9},\ -1 + \tfrac{22}{9},\ 3 - \tfrac{22}{9}\right) = \left(\tfrac{7}{9},\ \tfrac{13}{9},\ \tfrac{5}{9}\right)$$
<p><b>b)</b> $P' = 2M - P = \left(\frac{14}{9} - 2,\ \frac{26}{9} + 1,\ \frac{10}{9} - 3\right) = \left(-\frac{4}{9},\ \frac{35}{9},\ -\frac{17}{9}\right)$.</p>
$$d(P,\pi) = \frac{|2 + 2 + 6 + 1|}{\sqrt{1+4+4}} = \frac{11}{3}\ \text{u}$$`,
              },
            ],
          },
        ],
      },
      {
        id: 'est', name: 'Estadística y probabilidad', topics: [
          {
            id: 'probabilidad', name: 'Probabilidad', summary: 'Sucesos, Laplace, probabilidad condicionada, independencia, probabilidad total y Bayes.',
            gens: ['mat.sets', 'mat.bayes'],
            theory: T`
<h3>Propiedades básicas</h3>
<div class="formula">
$P(\overline{A}) = 1 - P(A)$ &nbsp;&nbsp; $P(A\cup B) = P(A) + P(B) - P(A\cap B)$<br>
Leyes de Morgan: $\overline{A\cup B} = \overline{A}\cap\overline{B}$, &nbsp; $\overline{A\cap B} = \overline{A}\cup\overline{B}$<br>
$P(A\cap\overline{B}) = P(A) - P(A\cap B)$</div>
<h3>Probabilidad condicionada e independencia</h3>
<div class="formula">$$P(A\mid B) = \frac{P(A\cap B)}{P(B)} \qquad A, B \text{ independientes} \iff P(A\cap B) = P(A)\,P(B)$$</div>
<p>¡No confundas! <b>Incompatibles</b>: $A\cap B = \emptyset$ ($P(A\cap B) = 0$). <b>Independientes</b>: uno no influye en el otro. Dos sucesos con probabilidad no nula incompatibles nunca son independientes.</p>
<h3>Probabilidad total y Bayes</h3>
<p>Si $A_1, \dots, A_n$ forman un sistema completo de sucesos:</p>
<div class="formula">$$P(B) = \sum_i P(A_i)\,P(B\mid A_i) \qquad P(A_j\mid B) = \frac{P(A_j)\,P(B\mid A_j)}{P(B)}$$</div>
<p class="tip"><b>Truco PAU:</b> dibuja siempre el <b>diagrama de árbol</b> o una <b>tabla de contingencia</b>. Bayes se reconoce porque te preguntan por la causa sabiendo el efecto («sabiendo que es defectuosa, ¿qué probabilidad hay de que venga de A?»).</p>`,
            questions: [
              { type: 'mc', prompt: 'Dos sucesos $A$ y $B$ son incompatibles si:', options: [T`$P(A\cap B) = 0$`, T`$P(A\cap B) = P(A)P(B)$`, T`$P(A\cup B) = 1$`, T`$P(A) = P(B)$`], answer: 0, solution: 'Incompatibles: no pueden ocurrir a la vez.' },
              { type: 'mc', prompt: T`Si $A$ y $B$ son independientes con $P(A) = 0{,}5$ y $P(B) = 0{,}4$, entonces $P(A\cup B)$ es:`, options: ['$0{,}9$', '$0{,}7$', '$0{,}2$', '$0{,}6$'], answer: 1, solution: T`$P(A\cap B) = 0{,}2$; $P(A\cup B) = 0{,}5 + 0{,}4 - 0{,}2 = 0{,}7$.` },
              { type: 'mc', prompt: 'Se lanzan dos dados. Probabilidad de que la suma sea 7:', options: [T`$\frac{1}{6}$`, T`$\frac{7}{36}$`, T`$\frac{1}{12}$`, T`$\frac{5}{36}$`], answer: 0, solution: T`Casos favorables: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → $6/36 = 1/6$.` },
              { type: 'mc', prompt: T`$P(\overline{A}\cup\overline{B})$ es igual a:`, options: [T`$1 - P(A\cup B)$`, T`$1 - P(A\cap B)$`, T`$P(A) + P(B)$`, T`$1 - P(A)P(B)$`], answer: 1, solution: T`Morgan: $\overline{A}\cup\overline{B} = \overline{A\cap B}$.` },
              { type: 'mc', prompt: T`Si $P(A) = 0{,}3$, $P(B) = 0{,}5$ y $P(A\mid B) = 0{,}4$, ¿cuánto vale $P(A\cap B)$?`, options: ['$0{,}15$', '$0{,}2$', '$0{,}12$', '$0{,}8$'], answer: 1, solution: T`$P(A\cap B) = P(B)\,P(A\mid B) = 0{,}5\cdot0{,}4 = 0{,}2$. Como $\neq 0{,}15$, no son independientes.` },
              { type: 'mc', prompt: 'Dos sucesos incompatibles con probabilidades no nulas son…', options: ['siempre independientes', 'nunca independientes', 'a veces independientes', 'complementarios'], answer: 1, solution: T`$P(A\cap B) = 0 \neq P(A)P(B) > 0$: no pueden ser independientes.` },
            ],
            problems: [
              {
                prompt: T`<p>En un instituto el 60 % del alumnado son chicas. El 30 % de las chicas y el 20 % de los chicos practican un deporte federado. Se elige una persona al azar.</p>
<p>a) (0,75 puntos) ¿Cuál es la probabilidad de que practique deporte federado?</p>
<p>b) (0,75 puntos) Si practica deporte federado, ¿cuál es la probabilidad de que sea chica?</p>
<p>c) (0,5 puntos) Si no practica deporte federado, ¿cuál es la probabilidad de que sea chico?</p>`,
                solution: T`<p>$M$ = chica, $H$ = chico, $D$ = deporte federado. $P(M) = 0{,}6$, $P(H) = 0{,}4$, $P(D\mid M) = 0{,}3$, $P(D\mid H) = 0{,}2$.</p>
<p><b>a)</b> $P(D) = 0{,}6\cdot0{,}3 + 0{,}4\cdot0{,}2 = 0{,}18 + 0{,}08 = 0{,}26$.</p>
<p><b>b)</b> $P(M\mid D) = \dfrac{0{,}18}{0{,}26} \approx 0{,}6923$.</p>
<p><b>c)</b> $P(H\mid\overline{D}) = \dfrac{P(H)P(\overline{D}\mid H)}{P(\overline{D})} = \dfrac{0{,}4\cdot0{,}8}{0{,}74} \approx 0{,}4324$.</p>`,
              },
              {
                prompt: T`<p>Sean $A$ y $B$ dos sucesos con $P(A) = 0{,}4$, $P(B) = 0{,}5$ y $P(\overline{A}\cap\overline{B}) = 0{,}3$.</p>
<p>a) (1 punto) Calcula $P(A\cup B)$ y $P(A\cap B)$. ¿Son independientes?</p>
<p>b) (1 punto) Calcula $P(A\mid\overline{B})$.</p>`,
                solution: T`<p><b>a)</b> $P(A\cup B) = 1 - P(\overline{A}\cap\overline{B}) = 0{,}7$. $P(A\cap B) = 0{,}4 + 0{,}5 - 0{,}7 = 0{,}2$.</p>
<p>$P(A)P(B) = 0{,}2 = P(A\cap B)$ → <b>sí son independientes</b>.</p>
<p><b>b)</b> $P(A\mid\overline{B}) = \dfrac{P(A\cap\overline{B})}{P(\overline{B})} = \dfrac{P(A) - P(A\cap B)}{1 - P(B)} = \dfrac{0{,}2}{0{,}5} = 0{,}4$ (coincide con $P(A)$, como cabía esperar por la independencia).</p>`,
              },
            ],
          },
          {
            id: 'distribuciones', name: 'Binomial y normal', summary: 'Variables aleatorias discretas y continuas, distribución binomial, normal y aproximación.',
            gens: ['mat.binomial', 'mat.normal'],
            theory: T`
<h3>Distribución binomial $B(n,p)$</h3>
<p>Cuenta el número de éxitos en $n$ pruebas independientes, cada una con probabilidad de éxito $p$ ($q = 1-p$).</p>
<div class="formula">$$P(X = k) = \binom{n}{k}p^k q^{n-k} \qquad \mu = np \qquad \sigma = \sqrt{npq}$$</div>
<p class="tip">«Al menos uno» → $P(X\ge1) = 1 - P(X=0) = 1 - q^n$.</p>
<h3>Distribución normal $N(\mu,\sigma)$</h3>
<p>Se tipifica para usar la tabla de la $N(0,1)$:</p>
<div class="formula">$$Z = \frac{X-\mu}{\sigma}\sim N(0,1) \qquad P(Z\le -z) = 1 - P(Z\le z) \qquad P(a<Z<b) = \Phi(b) - \Phi(a)$$</div>
<ul><li>En una variable continua $P(X = a) = 0$, así que $\le$ y $<$ dan lo mismo.</li>
<li>Regla 68–95–99,7: aprox. el 68 % de los datos está en $\mu\pm\sigma$, el 95 % en $\mu\pm2\sigma$ y el 99,7 % en $\mu\pm3\sigma$.</li>
<li>Búsqueda inversa: si $P(Z\le z) = 0{,}9$, busca 0,9 en el interior de la tabla → $z\approx1{,}28$.</li></ul>
<h3>Aproximación de la binomial por la normal</h3>
<div class="formula">Si $np \ge 5$ y $nq\ge5$: $B(n,p)\approx N(np,\sqrt{npq})$, con <b>corrección de continuidad</b>: $P(X\le k)\approx P(X'\le k+0{,}5)$.</div>
<h3>Valores útiles de la tabla</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>$z$</th><th>1,00</th><th>1,28</th><th>1,645</th><th>1,96</th><th>2,33</th><th>2,575</th></tr></thead>
<tbody><tr><td>$\Phi(z)$</td><td>0,8413</td><td>0,8997</td><td>0,95</td><td>0,975</td><td>0,9901</td><td>0,995</td></tr></tbody></table></div>`,
            questions: [
              { type: 'mc', prompt: T`La media de una $B(10;\ 0{,}3)$ es:`, options: ['$3$', '$0{,}3$', '$2{,}1$', '$7$'], answer: 0, solution: T`$\mu = np = 10\cdot0{,}3 = 3$.` },
              { type: 'mc', prompt: T`La varianza de una $B(n,p)$ es:`, options: ['$np$', '$np(1-p)$', T`$\sqrt{np(1-p)}$`, '$n^2p$'], answer: 1, solution: T`$\sigma^2 = npq$; la desviación típica es su raíz.` },
              { type: 'mc', prompt: T`Si $Z\sim N(0,1)$, $P(Z\le 0)$ vale:`, options: ['$0$', '$0{,}5$', '$1$', '$0{,}3413$'], answer: 1, solution: 'La normal estándar es simétrica respecto de 0.' },
              { type: 'mc', prompt: T`$P(Z \ge 1{,}96)$ es aproximadamente:`, options: ['$0{,}05$', '$0{,}025$', '$0{,}975$', '$0{,}01$'], answer: 1, solution: T`$1 - \Phi(1{,}96) = 1 - 0{,}975 = 0{,}025$.` },
              { type: 'mc', prompt: T`Si $X\sim N(100, 15)$, ¿qué valor tipificado corresponde a $X = 130$?`, options: ['$2$', '$30$', '$1{,}5$', '$-2$'], answer: 0, solution: T`$z = \frac{130 - 100}{15} = 2$.` },
              { type: 'mc', prompt: 'En una distribución continua, $P(X = a)$ vale:', options: ['$0$', '$1$', '$f(a)$', 'depende de $a$'], answer: 0, solution: 'La probabilidad de un valor concreto es nula; solo tienen probabilidad los intervalos.' },
              { type: 'mc', prompt: T`Se puede aproximar $B(n,p)$ por una normal cuando:`, options: [T`$n < 30$`, T`$np\ge5$ y $nq\ge5$`, T`$p = 0{,}5$ siempre`, T`$p < 0{,}1$`], answer: 1, solution: T`Criterio habitual: $np\ge5$ y $n(1-p)\ge5$, usando $N(np,\sqrt{npq})$.` },
            ],
            problems: [
              {
                prompt: T`<p>La altura de los estudiantes de un centro sigue una distribución normal de media 170 cm y desviación típica 8 cm.</p>
<p>a) (0,75 puntos) ¿Qué proporción de estudiantes mide más de 180 cm?</p>
<p>b) (0,75 puntos) ¿Qué proporción mide entre 160 y 175 cm?</p>
<p>c) (0,5 puntos) Si se eligen 5 estudiantes al azar, ¿cuál es la probabilidad de que exactamente 2 midan más de 180 cm?</p>`,
                solution: T`<p><b>a)</b> $P(X > 180) = P\left(Z > \frac{180-170}{8}\right) = P(Z > 1{,}25) = 1 - 0{,}8944 = 0{,}1056$.</p>
<p><b>b)</b> $P(160 < X < 175) = P(-1{,}25 < Z < 0{,}63) = \Phi(0{,}63) - (1 - \Phi(1{,}25)) = 0{,}7357 - 0{,}1056 = 0{,}6301$.</p>
<p><b>c)</b> $Y$ = nº de los 5 que miden más de 180 $\sim B(5;\ 0{,}1056)$:</p>
$$P(Y = 2) = \binom{5}{2}(0{,}1056)^2(0{,}8944)^3 \approx 10\cdot0{,}01115\cdot0{,}7155 \approx 0{,}0798$$`,
              },
              {
                prompt: T`<p>Un examen tipo test tiene 10 preguntas con 4 opciones cada una, de las que solo una es correcta. Un alumno responde todas al azar.</p>
<p>a) (1 punto) ¿Cuál es la probabilidad de que acierte exactamente 3?</p>
<p>b) (1 punto) ¿Cuál es la probabilidad de que acierte al menos 2?</p>`,
                solution: T`<p>$X$ = nº de aciertos $\sim B(10;\ 0{,}25)$.</p>
<p><b>a)</b> $P(X = 3) = \binom{10}{3}(0{,}25)^3(0{,}75)^7 = 120\cdot0{,}015625\cdot0{,}13348 \approx 0{,}2503$.</p>
<p><b>b)</b> $P(X\ge2) = 1 - P(X=0) - P(X=1) = 1 - 0{,}75^{10} - 10\cdot0{,}25\cdot0{,}75^9$</p>
<p>$= 1 - 0{,}0563 - 0{,}1877 = 0{,}7560$.</p>`,
              },
            ],
          },
        ],
      },
    ],
  });
})(window.PAU);
