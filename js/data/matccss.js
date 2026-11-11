/* Matemáticas Aplicadas a las Ciencias Sociales II — PAU Comunidad de Madrid */
(function (P) {
  'use strict';
  const T = P.T;

  P.addSubject({
    id: 'matccss', name: 'Matemáticas Aplicadas a las CCSS II', short: 'Mates CCSS', icon: 'Σ', color: '#0d9488',
    desc: 'Bachillerato de Ciencias Sociales. Álgebra, programación lineal, análisis, probabilidad e inferencia.',
    exam: {
      duration: 90,
      info: 'Formato actual (PAU 2026): 4 preguntas de 2,5 puntos; la primera es obligatoria y en las otras tres se elige entre dos opciones. 90 minutos. En convocatorias anteriores el formato era distinto (por ejemplo, elegir entre la opción A y la B, con 5 ejercicios de 2 puntos).',
    },
    blocks: [
      {
        id: 'alg', name: 'Álgebra', topics: [
          {
            id: 'matrices', name: 'Matrices y sistemas', summary: 'Operaciones con matrices, inversa, ecuaciones matriciales y sistemas (también con parámetro).',
            gens: ['mat.inv2', 'mat.matEq', 'mat.det3', 'mat.cramer3'],
            theory: T`
<h3>Matrices</h3>
<ul><li>Suma: elemento a elemento (mismas dimensiones). Producto: fila por columna, $A_{m\times n}B_{n\times p}$.</li>
<li>El producto no es conmutativo. La traspuesta cumple $(AB)^t = B^tA^t$.</li>
<li>Potencias: calcula $A^2$, $A^3$… y busca un patrón (a veces $A^n$ se repite cada pocos pasos).</li></ul>
<h3>Determinantes e inversa</h3>
<div class="formula">$$\begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc \qquad A^{-1} = \frac{1}{|A|}(\operatorname{Adj}A)^t \;\;(|A|\neq0)$$
Para $2\times2$: $\begin{pmatrix} a & b \\ c & d \end{pmatrix}^{-1} = \dfrac{1}{ad-bc}\begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$</div>
<p>Alternativa: método de Gauss-Jordan, $(A \mid I) \to (I \mid A^{-1})$.</p>
<h3>Ecuaciones matriciales</h3>
<div class="formula">$AX = B \Rightarrow X = A^{-1}B$ &nbsp;&nbsp; $XA = B \Rightarrow X = BA^{-1}$ &nbsp;&nbsp; $AX + B = C \Rightarrow X = A^{-1}(C - B)$</div>
<h3>Sistemas de ecuaciones</h3>
<ul><li><b>SCD</b>: una solución. <b>SCI</b>: infinitas. <b>SI</b>: ninguna.</li>
<li>Rouché–Frobenius: compara $\operatorname{rg}A$, $\operatorname{rg}A^*$ y nº de incógnitas.</li>
<li>Método de Gauss: haz ceros por debajo de la diagonal. Si aparece $0 = k \neq 0$ → SI; si una fila entera se anula → SCI.</li></ul>
<p class="tip"><b>Problemas con enunciado:</b> define las incógnitas con sus unidades, traduce cada frase a una ecuación, resuelve y comprueba que la solución tiene sentido (enteros, no negativos…).</p>`,
            questions: [
              { type: 'mc', prompt: T`Si $A$ es $3\times2$ y $B$ es $2\times3$, la matriz $AB$ es:`, options: [T`$3\times3$`, T`$2\times2$`, T`$3\times2$`, 'no existe'], answer: 0, solution: T`$(3\times\underline{2})(\underline{2}\times3) = 3\times3$.` },
              { type: 'mc', prompt: T`La inversa de $\begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix}$ es:`, options: [T`$\begin{pmatrix} 1 & -1 \\ -1 & 2 \end{pmatrix}$`, T`$\begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix}$`, T`$\begin{pmatrix} 2 & -1 \\ -1 & 1 \end{pmatrix}$`, 'no tiene'], answer: 0, solution: T`$|A| = 1$; intercambia la diagonal principal y cambia el signo de la secundaria.` },
              { type: 'mc', prompt: T`Para despejar $X$ en $XA = B$ (con $A$ invertible):`, options: [T`$X = A^{-1}B$`, T`$X = BA^{-1}$`, T`$X = B/A$`, T`$X = B - A$`], answer: 1, solution: T`Se multiplica por $A^{-1}$ por la derecha: $XAA^{-1} = BA^{-1}$.` },
              { type: 'mc', prompt: 'Al aplicar Gauss aparece la ecuación $0x + 0y + 0z = 5$. El sistema es:', options: ['compatible determinado', 'compatible indeterminado', 'incompatible', 'homogéneo'], answer: 2, solution: '$0 = 5$ es una contradicción: sistema incompatible.' },
              { type: 'mc', prompt: T`Si $A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$, entonces $A^n$ es:`, options: [T`$\begin{pmatrix} 1 & n \\ 0 & 1 \end{pmatrix}$`, T`$\begin{pmatrix} n & n \\ 0 & n \end{pmatrix}$`, T`$\begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix}$`, T`$\begin{pmatrix} 1 & 2^n \\ 0 & 1 \end{pmatrix}$`], answer: 0, solution: T`$A^2 = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$, $A^3 = \begin{pmatrix} 1 & 3 \\ 0 & 1 \end{pmatrix}$… por inducción $A^n = \begin{pmatrix} 1 & n \\ 0 & 1 \end{pmatrix}$.` },
              { type: 'mc', prompt: T`$(A^t)^t$ es igual a:`, options: ['$A$', '$A^{-1}$', '$-A$', '$I$'], answer: 0, solution: 'Trasponer dos veces deja la matriz igual.' },
            ],
            problems: [
              {
                prompt: T`<p>Sean $A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}$ y $B = \begin{pmatrix} 3 & 4 \\ 1 & 0 \end{pmatrix}$.</p>
<p>a) (1 punto) Calcula $A^2$, $A^3$ y deduce la expresión de $A^n$.</p>
<p>b) (1 punto) Halla la matriz $X$ tal que $XA = B$.</p>`,
                solution: T`<p><b>a)</b> $A^2 = \begin{pmatrix} 1 & 4 \\ 0 & 1 \end{pmatrix}$, $A^3 = \begin{pmatrix} 1 & 6 \\ 0 & 1 \end{pmatrix}$, luego $A^n = \begin{pmatrix} 1 & 2n \\ 0 & 1 \end{pmatrix}$.</p>
<p><b>b)</b> $|A| = 1 \neq 0$, $A^{-1} = \begin{pmatrix} 1 & -2 \\ 0 & 1 \end{pmatrix}$.</p>
$$X = BA^{-1} = \begin{pmatrix} 3 & 4 \\ 1 & 0 \end{pmatrix}\begin{pmatrix} 1 & -2 \\ 0 & 1 \end{pmatrix} = \begin{pmatrix} 3 & -2 \\ 1 & -2 \end{pmatrix}$$
<p class="tip">Comprobación: $XA = \begin{pmatrix} 3 & 4 \\ 1 & 0 \end{pmatrix} = B$ ✓</p>`,
              },
              {
                prompt: T`<p>Un cine vendió 300 entradas de tres tipos: normal (8 €), reducida (5 €) y VIP (12 €), y recaudó 2.310 €. El número de entradas normales fue el doble de la suma de las reducidas y las VIP.</p>
<p>a) (1 punto) Plantea un sistema de ecuaciones. &nbsp; b) (1 punto) Resuélvelo.</p>`,
                solution: T`<p><b>a)</b> $x$ = normales, $y$ = reducidas, $z$ = VIP:</p>
$$\begin{cases} x + y + z = 300 \\ 8x + 5y + 12z = 2310 \\ x - 2y - 2z = 0 \end{cases}$$
<p><b>b)</b> De la 1ª y la 3ª: $x = 2(y + z)$ y $3(y+z) = 300 \Rightarrow y + z = 100$, $x = 200$.</p>
<p>Sustituyendo en la 2ª: $1600 + 5y + 12z = 2310 \Rightarrow 5y + 12z = 710$. Con $y = 100 - z$: $500 + 7z = 710 \Rightarrow z = 30$, $y = 70$.</p>
<p>Se vendieron <b>200 normales, 70 reducidas y 30 VIP</b>.</p>`,
              },
              {
                prompt: T`<p>Se considera el sistema $$\begin{cases} x + y + z = 2 \\ 2x + 3y + z = 3 \\ kx + 10y + 4z = 11 \end{cases}$$</p>
<p>a) (1,5 puntos) Discútelo según los valores de $k$. &nbsp; b) (0,5 puntos) Resuélvelo para $k = 7$.</p>`,
                solution: T`<p><b>a)</b> $|A| = \begin{vmatrix} 1 & 1 & 1 \\ 2 & 3 & 1 \\ k & 10 & 4\end{vmatrix} = 1(12-10) - 1(8-k) + 1(20-3k) = 14 - 2k$.</p>
<ul><li>$k \neq 7$: $|A|\neq0$ → <b>SCD</b>.</li>
<li>$k = 7$: $\operatorname{rg}A = 2$ (el menor $\begin{vmatrix} 1 & 1 \\ 2 & 3\end{vmatrix} = 1 \neq 0$). Orlando con la columna de términos independientes: $\begin{vmatrix} 1 & 1 & 2 \\ 2 & 3 & 3 \\ 7 & 10 & 11\end{vmatrix} = 1(33-30) - 1(22-21) + 2(20-21) = 0$ → $\operatorname{rg}A^* = 2$: <b>SCI</b>.</li></ul>
<p><b>b)</b> $k = 7$: basta con las dos primeras ecuaciones. Restando el doble de la 1ª a la 2ª: $y - z = -1 \Rightarrow y = z - 1$, y $x = 2 - y - z = 3 - 2z$.</p>
<p>Solución: $(x,y,z) = (3 - 2\lambda,\ \lambda - 1,\ \lambda)$, $\lambda\in\mathbb{R}$.</p>`,
              },
            ],
          },
          {
            id: 'pl', name: 'Programación lineal', summary: 'Inecuaciones, región factible, vértices y optimización de una función objetivo.',
            gens: ['mat.lp'],
            theory: T`
<h3>Planteamiento</h3>
<ol><li><b>Variables</b>: define $x$ e $y$ con unidades (p. ej., nº de collares y nº de pulseras).</li>
<li><b>Función objetivo</b>: lo que se quiere maximizar (beneficio) o minimizar (coste): $f(x,y) = ax + by$.</li>
<li><b>Restricciones</b>: inecuaciones lineales y las de no negatividad $x\ge0,\ y\ge0$.</li></ol>
<h3>Resolución gráfica</h3>
<ol><li>Representa cada recta (dos puntos, por ejemplo los cortes con los ejes).</li>
<li>Decide qué semiplano cumple cada inecuación probando un punto (el origen si no está en la recta).</li>
<li>La intersección es la <b>región factible</b> (polígono convexo).</li>
<li>Calcula los <b>vértices</b> resolviendo los sistemas de las rectas que se cortan.</li>
<li>Evalúa $f$ en cada vértice.</li></ol>
<div class="formula"><b>Teorema fundamental:</b> si la región es acotada, el máximo y el mínimo se alcanzan en vértices. Si dos vértices dan el mismo valor óptimo, también lo dan <b>todos los puntos del segmento</b> que los une (infinitas soluciones).</div>
<p class="tip"><b>Truco PAU:</b> si la región no está acotada, puede no existir máximo (o mínimo): justifícalo. Y si las variables son unidades enteras (personas, piezas), el vértice óptimo debe tener coordenadas enteras o buscar el punto entero más cercano dentro de la región.</p>`,
            questions: [
              { type: 'mc', prompt: 'En un problema de programación lineal con región factible acotada, el óptimo se alcanza:', options: ['en el centro de la región', 'en un vértice (o en un lado)', 'siempre en el origen', 'fuera de la región'], answer: 1, solution: 'Teorema fundamental de la programación lineal.' },
              { type: 'mc', prompt: T`¿Cumple el punto $(2,3)$ la restricción $3x + 2y \le 10$?`, options: ['Sí', 'No'], answer: 1, solution: T`$3\cdot2 + 2\cdot3 = 12 > 10$: no la cumple, está fuera.` },
              { type: 'mc', prompt: T`Si $f(x,y) = 3x + 2y$ toma el mismo valor máximo en los vértices $A$ y $B$:`, options: ['no hay máximo', 'el máximo es único', 'hay infinitas soluciones óptimas (segmento AB)', 'hay que elegir el que tenga mayor x'], answer: 2, solution: 'Todos los puntos del segmento AB son óptimos.' },
              { type: 'mc', prompt: 'Las restricciones $x \\ge 0$, $y \\ge 0$ se llaman:', options: ['de no negatividad', 'función objetivo', 'región factible', 'vértices'], answer: 0, solution: 'Indican que las cantidades no pueden ser negativas.' },
              { type: 'mc', prompt: T`El vértice de la región determinado por $x + y = 50$ y $2x + y = 80$ es:`, options: ['$(30, 20)$', '$(20, 30)$', '$(40, 10)$', '$(25, 25)$'], answer: 0, solution: T`Restando: $x = 30$, y $y = 50 - 30 = 20$.` },
            ],
            problems: [
              {
                prompt: T`<p>Un artesano fabrica collares y pulseras. Por cuestiones de material no puede hacer más de 50 piezas en total al mes. Cada collar requiere 2 horas de trabajo y cada pulsera 1 hora, y dispone de 80 horas al mes. Además debe fabricar al menos 10 pulseras. Gana 5 € por collar y 4 € por pulsera.</p>
<p>a) (1 punto) Plantea el problema y representa la región factible.</p>
<p>b) (1 punto) ¿Cuántas piezas de cada tipo debe fabricar para maximizar el beneficio? ¿Cuál es ese beneficio?</p>`,
                solution: T`<p><b>a)</b> $x$ = collares, $y$ = pulseras. Maximizar $B(x,y) = 5x + 4y$ sujeto a:</p>
$$\begin{cases} x + y \le 50 \\ 2x + y \le 80 \\ y \ge 10 \\ x \ge 0 \end{cases}$$
<p>Vértices: $A(0,10)$, $B(0,50)$, $C(30,20)$ (corte de $x+y=50$ y $2x+y=80$), $D(35,10)$ (corte de $2x+y=80$ con $y=10$).</p>
<p><b>b)</b> $B(A) = 40$, $B(B) = 200$, $B(C) = 150 + 80 = 230$, $B(D) = 175 + 40 = 215$.</p>
<p>Debe fabricar <b>30 collares y 20 pulseras</b>, con un beneficio máximo de <b>230 €</b>.</p>`,
              },
              {
                prompt: T`<p>Una dietista quiere preparar una mezcla con dos alimentos, A y B. Cada kg de A aporta 2 unidades de proteína y 1 de hierro y cuesta 3 €; cada kg de B aporta 1 unidad de proteína y 3 de hierro y cuesta 4 €. La mezcla debe contener al menos 8 unidades de proteína y 9 de hierro.</p>
<p>(2 puntos) ¿Cuántos kg de cada alimento minimizan el coste? ¿Cuál es el coste mínimo?</p>`,
                solution: T`<p>$x$ = kg de A, $y$ = kg de B. Minimizar $C(x,y) = 3x + 4y$ sujeto a $2x + y \ge 8$, $x + 3y \ge 9$, $x, y \ge 0$.</p>
<p>La región es <b>no acotada</b> (hacia arriba y a la derecha). Vértices: $(0,8)$, $(9,0)$ y el corte de $2x + y = 8$ con $x + 3y = 9$: $x = 3$, $y = 2$.</p>
<p>$C(0,8) = 32$, $C(9,0) = 27$, $C(3,2) = 9 + 8 = 17$.</p>
<p>Como los coeficientes de $C$ son positivos y la región no está acotada solo «hacia fuera», el mínimo existe: <b>3 kg de A y 2 kg de B</b>, con coste mínimo de <b>17 €</b>. (No existe máximo.)</p>`,
              },
            ],
          },
        ],
      },
      {
        id: 'ana', name: 'Análisis', topics: [
          {
            id: 'funciones', name: 'Funciones, límites y derivadas', summary: 'Continuidad, asíntotas, derivadas, monotonía, extremos y optimización aplicada.',
            gens: ['mat.contParam', 'mat.derivEval', 'mat.tangent', 'mat.extrema', 'mat.limInf'],
            theory: T`
<h3>Límites y continuidad</h3>
<ul><li>$\frac{\infty}{\infty}$ con polinomios: compara grados.</li><li>$\frac{0}{0}$: factoriza y simplifica (Ruffini).</li>
<li>Continuidad en $a$: $\lim_{x\to a^-}f = \lim_{x\to a^+}f = f(a)$. En funciones a trozos, estudia los puntos de unión.</li></ul>
<h3>Asíntotas</h3>
<p><b>Vertical</b> $x = a$ si $\lim_{x\to a}f(x) = \pm\infty$. <b>Horizontal</b> $y = L$ si $\lim_{x\to\pm\infty}f(x) = L$. <b>Oblicua</b> $y = mx+n$ con $m = \lim\frac{f(x)}{x}$, $n = \lim(f(x) - mx)$.</p>
<h3>Derivadas</h3>
<div class="formula">$(x^n)' = nx^{n-1}$ &nbsp; $(e^{u})' = u'e^u$ &nbsp; $(\ln u)' = \frac{u'}{u}$ &nbsp; $(uv)' = u'v + uv'$ &nbsp; $\left(\frac{u}{v}\right)' = \frac{u'v-uv'}{v^2}$</div>
<p>Recta tangente en $x = a$: $y - f(a) = f'(a)(x - a)$.</p>
<h3>Aplicaciones</h3>
<ul><li>$f' > 0$ creciente, $f' < 0$ decreciente. Extremos donde $f'$ cambia de signo.</li>
<li>Con la segunda derivada: $f''(a) < 0$ máximo, $f''(a) > 0$ mínimo.</li>
<li>$f'' > 0$ convexa (∪), $f'' < 0$ cóncava (∩), puntos de inflexión donde $f''$ cambia de signo.</li></ul>
<h3>Problemas de contexto económico</h3>
<p>Ingresos $I(x) = p\cdot x$, costes $C(x)$, beneficio $B(x) = I(x) - C(x)$. El beneficio máximo se obtiene con $B'(x) = 0$ y $B''(x) < 0$. Coste medio: $\frac{C(x)}{x}$.</p>
<p class="tip"><b>Truco PAU:</b> lee bien las unidades (miles de euros, cientos de unidades…) y responde con una frase completa.</p>`,
            questions: [
              { type: 'mc', prompt: T`La derivada de $f(x) = x^2e^x$ es:`, options: [T`$2xe^x$`, T`$(x^2+2x)e^x$`, T`$x^2e^x$`, T`$2x + e^x$`], answer: 1, solution: T`Producto: $2x\,e^x + x^2e^x = (x^2+2x)e^x$.` },
              { type: 'mc', prompt: T`La función $f(x) = \dfrac{3x}{x-2}$ tiene asíntota vertical en:`, options: ['$x = 3$', '$x = 2$', '$x = 0$', '$y = 3$'], answer: 1, solution: T`El denominador se anula en $x = 2$ y el numerador no.` },
              { type: 'mc', prompt: T`Si $B(x) = -x^2 + 40x - 300$, el beneficio es máximo en:`, options: ['$x = 10$', '$x = 20$', '$x = 30$', '$x = 40$'], answer: 1, solution: T`$B'(x) = -2x + 40 = 0 \Rightarrow x = 20$, y $B'' = -2 < 0$.` },
              { type: 'mc', prompt: T`Si $f'(x) > 0$ en un intervalo, $f$ es en él:`, options: ['creciente', 'decreciente', 'convexa', 'constante'], answer: 0, solution: 'Derivada positiva → función creciente.' },
              { type: 'mc', prompt: T`$\displaystyle\lim_{x\to+\infty}\frac{5x^2 - 1}{2x^3 + x}$ vale:`, options: ['$0$', T`$\frac52$`, '$+\\infty$', '$5$'], answer: 0, solution: 'Grado del denominador mayor → límite 0.' },
              { type: 'mc', prompt: T`$\displaystyle\lim_{x\to 2}\frac{x^2 - 4}{x - 2}$ vale:`, options: ['$0$', '$4$', '$2$', 'no existe'], answer: 1, solution: T`$\frac{(x-2)(x+2)}{x-2} = x + 2 \to 4$.` },
            ],
            problems: [
              {
                prompt: T`<p>El beneficio, en miles de euros, de una empresa al vender $x$ cientos de unidades viene dado por $B(x) = -x^2 + 40x - 300$, con $0 \le x \le 40$.</p>
<p>a) (1 punto) ¿Entre qué niveles de venta la empresa tiene beneficios?</p>
<p>b) (1 punto) ¿Cuántas unidades debe vender para maximizar el beneficio? ¿Cuál es ese beneficio máximo?</p>`,
                solution: T`<p><b>a)</b> $B(x) = 0 \iff x^2 - 40x + 300 = 0 \iff x = 10$ o $x = 30$. Como es una parábola con las ramas hacia abajo, $B(x) > 0$ para $10 < x < 30$: entre <b>1.000 y 3.000 unidades</b>.</p>
<p><b>b)</b> $B'(x) = -2x + 40 = 0 \Rightarrow x = 20$; $B''(x) = -2 < 0$ → máximo.</p>
<p>Debe vender <b>2.000 unidades</b>, con un beneficio de $B(20) = -400 + 800 - 300 = 100$, es decir, <b>100.000 €</b>.</p>`,
              },
              {
                prompt: T`<p>Sea $f(x) = \begin{cases} x^2 + ax & \text{si } x \le 1 \\ \dfrac{b}{x} & \text{si } x > 1 \end{cases}$</p>
<p>a) (1 punto) Halla $a$ y $b$ para que $f$ sea continua y derivable en $x = 1$.</p>
<p>b) (1 punto) Para $a = 1$, $b = 2$, halla la recta tangente a $f$ en $x = 2$.</p>`,
                solution: T`<p><b>a)</b> Continuidad en $x = 1$: $1 + a = b$.</p>
<p>Derivabilidad: $f'(x) = 2x + a$ si $x<1$, $f'(x) = -\frac{b}{x^2}$ si $x>1$. Igualando en 1: $2 + a = -b$.</p>
<p>Resolviendo: $1 + a = -2 - a \Rightarrow a = -\frac32$, $b = -\frac12$.</p>
<p><b>b)</b> En $x = 2$ actúa el trozo $f(x) = \frac{2}{x}$: $f(2) = 1$, $f'(x) = -\frac{2}{x^2} \Rightarrow f'(2) = -\frac12$.</p>
$$y - 1 = -\tfrac12(x - 2) \Rightarrow y = -\tfrac12x + 2$$`,
              },
            ],
          },
          {
            id: 'integrales', name: 'Integrales y áreas', summary: 'Primitivas, regla de Barrow y cálculo de áreas de recintos planos.',
            gens: ['mat.intDef', 'mat.area'],
            theory: T`
<h3>Primitivas inmediatas</h3>
<div class="formula">$\int x^n\,dx = \frac{x^{n+1}}{n+1} + C\ (n\neq-1)$ &nbsp;&nbsp; $\int\frac{1}{x}\,dx = \ln|x| + C$ &nbsp;&nbsp; $\int e^{ax}\,dx = \frac{e^{ax}}{a} + C$<br>
$\int\frac{u'}{u}\,dx = \ln|u| + C$ &nbsp;&nbsp; $\int u'e^{u}\,dx = e^u + C$ &nbsp;&nbsp; $\int u^nu'\,dx = \frac{u^{n+1}}{n+1} + C$</div>
<p>Para hallar «la primitiva que pasa por un punto», calcula $F(x) + C$ e impón la condición para obtener $C$.</p>
<h3>Regla de Barrow</h3>
<div class="formula">$$\int_a^b f(x)\,dx = F(b) - F(a)$$</div>
<h3>Áreas</h3>
<ol><li>Entre $f$ y el eje $X$: halla los cortes con el eje, integra en cada trozo y suma valores absolutos.</li>
<li>Entre dos curvas: cortes de $f(x) = g(x)$; $\text{Área} = \int_a^b |f(x) - g(x)|\,dx$ (función de arriba menos la de abajo).</li></ol>
<p class="tip"><b>Truco PAU:</b> haz un esbozo de las gráficas: te dirá qué función queda por encima y evitarás signos negativos.</p>`,
            questions: [
              { type: 'mc', prompt: T`Una primitiva de $f(x) = 3x^2 - 2x + 1$ es:`, options: [T`$x^3 - x^2 + x$`, T`$6x - 2$`, T`$3x^3 - 2x^2 + x$`, T`$x^3 - 2x^2 + 1$`], answer: 0, solution: T`$\int(3x^2 - 2x + 1)dx = x^3 - x^2 + x + C$.` },
              { type: 'mc', prompt: T`$\displaystyle\int_0^2 3x^2\,dx$ vale:`, options: ['$8$', '$12$', '$6$', '$4$'], answer: 0, solution: T`$[x^3]_0^2 = 8$.` },
              { type: 'mc', prompt: T`$\displaystyle\int e^{2x}\,dx =$`, options: [T`$e^{2x} + C$`, T`$\frac{e^{2x}}{2} + C$`, T`$2e^{2x} + C$`, T`$\frac{e^{x}}{2} + C$`], answer: 1, solution: T`$\int e^{ax}dx = \frac{e^{ax}}{a} + C$.` },
              { type: 'mc', prompt: 'Para calcular el área entre una función y el eje X que cambia de signo en el intervalo:', options: ['basta una integral en todo el intervalo', 'se separa por los cortes y se suman valores absolutos', 'se multiplica por 2', 'se resta el área negativa'], answer: 1, solution: 'Las partes bajo el eje dan integrales negativas; hay que separarlas.' },
              { type: 'mc', prompt: T`El área entre $y = x^2$ e $y = 2x$ es:`, options: [T`$\frac43$`, T`$\frac83$`, '$4$', T`$\frac23$`], answer: 0, solution: T`$\int_0^2(2x - x^2)dx = 4 - \frac83 = \frac43$.` },
            ],
            problems: [
              {
                prompt: T`<p>a) (1 punto) Halla la primitiva $F$ de $f(x) = 3x^2 - 2x + 1$ que verifica $F(1) = 2$.</p>
<p>b) (1 punto) Calcula el área del recinto limitado por $y = x^2 - 4$ y el eje $X$.</p>`,
                solution: T`<p><b>a)</b> $F(x) = x^3 - x^2 + x + C$. $F(1) = 1 + C = 2 \Rightarrow C = 1$: $F(x) = x^3 - x^2 + x + 1$.</p>
<p><b>b)</b> Cortes: $x = \pm2$. En $(-2, 2)$ la parábola está bajo el eje:</p>
$$\int_{-2}^{2}(x^2 - 4)\,dx = \left[\frac{x^3}{3} - 4x\right]_{-2}^{2} = \left(\frac83 - 8\right) - \left(-\frac83 + 8\right) = -\frac{32}{3}$$
<p>Área $= \frac{32}{3}$ u².</p>`,
              },
              {
                prompt: T`<p>La velocidad de producción de una fábrica (en unidades/hora) $t$ horas después de comenzar el turno es $v(t) = -3t^2 + 12t + 15$, con $0\le t\le 5$.</p>
<p>a) (1 punto) ¿En qué momento es máxima la velocidad de producción?</p>
<p>b) (1 punto) ¿Cuántas unidades se producen durante las 5 horas? (Es $\int_0^5 v(t)\,dt$.)</p>`,
                solution: T`<p><b>a)</b> $v'(t) = -6t + 12 = 0 \Rightarrow t = 2$; $v''= -6 < 0$ → máximo a las <b>2 horas</b> ($v(2) = 27$ uds./h).</p>
<p><b>b)</b> $\displaystyle\int_0^5(-3t^2 + 12t + 15)\,dt = \left[-t^3 + 6t^2 + 15t\right]_0^5 = -125 + 150 + 75 = 100$ unidades.</p>`,
              },
            ],
          },
        ],
      },
      {
        id: 'est', name: 'Probabilidad y estadística', topics: [
          {
            id: 'probabilidad', name: 'Probabilidad', summary: 'Sucesos, tablas de contingencia, condicionada, independencia, probabilidad total y Bayes.',
            gens: ['mat.sets', 'mat.bayes', 'mat.binomial'],
            theory: T`
<h3>Fórmulas esenciales</h3>
<div class="formula">
$P(\overline{A}) = 1 - P(A)$ &nbsp;&nbsp; $P(A\cup B) = P(A) + P(B) - P(A\cap B)$<br>
$P(A\mid B) = \dfrac{P(A\cap B)}{P(B)}$ &nbsp;&nbsp; Independientes: $P(A\cap B) = P(A)P(B)$<br>
Morgan: $P(\overline{A}\cap\overline{B}) = 1 - P(A\cup B)$</div>
<h3>Tablas de contingencia</h3>
<p>Muy útiles cuando hay dos características (p. ej. sexo y uso de una app). Completa la tabla con totales: las probabilidades se leen directamente dividiendo entre el total, y las condicionadas dividiendo entre el total de la fila o columna.</p>
<h3>Probabilidad total y Bayes</h3>
<div class="formula">$$P(B) = \sum P(A_i)P(B\mid A_i) \qquad P(A_j\mid B) = \frac{P(A_j)P(B\mid A_j)}{P(B)}$$</div>
<h3>Distribución binomial</h3>
<p>$X\sim B(n,p)$: $P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}$, $\mu = np$.</p>
<p class="tip"><b>Truco PAU:</b> traduce cada dato del enunciado a notación ($P(A) = \dots$, $P(B\mid A) = \dots$) antes de calcular. Los porcentajes «de los que…» suelen ser condicionadas.</p>`,
            questions: [
              { type: 'mc', prompt: T`Si $P(A) = 0{,}6$, $P(B) = 0{,}5$ y $P(A\cup B) = 0{,}8$, entonces $P(A\cap B)$ es:`, options: ['$0{,}3$', '$0{,}1$', '$0{,}2$', '$0{,}5$'], answer: 0, solution: T`$0{,}6 + 0{,}5 - 0{,}8 = 0{,}3$.` },
              { type: 'mc', prompt: 'En un grupo de 200 personas, 120 usan Instagram, 90 TikTok y 50 ambas. ¿Probabilidad de que una persona use TikTok sabiendo que usa Instagram?', options: [T`$\frac{50}{90}$`, T`$\frac{50}{120}$`, T`$\frac{90}{200}$`, T`$\frac{50}{200}$`], answer: 1, solution: T`$P(T\mid I) = \frac{50}{120} \approx 0{,}4167$.` },
              { type: 'mc', prompt: '«El 30 % de los clientes que compran online son menores de 25 años» se traduce como:', options: [T`$P(\text{online}\cap\text{<25}) = 0{,}3$`, T`$P(\text{<25}\mid\text{online}) = 0{,}3$`, T`$P(\text{online}\mid\text{<25}) = 0{,}3$`, T`$P(\text{<25}) = 0{,}3$`], answer: 1, solution: '«De los que compran online» es la condición: va detrás de la barra.' },
              { type: 'mc', prompt: T`Si $A$ y $B$ son independientes, $P(A) = 0{,}4$ y $P(B) = 0{,}3$, entonces $P(\overline{A}\cap\overline{B})$ es:`, options: ['$0{,}42$', '$0{,}58$', '$0{,}12$', '$0{,}3$'], answer: 0, solution: T`También son independientes sus contrarios: $0{,}6\cdot0{,}7 = 0{,}42$.` },
              { type: 'mc', prompt: 'Probabilidad de obtener al menos una cara al lanzar 3 monedas:', options: [T`$\frac78$`, T`$\frac38$`, T`$\frac12$`, T`$\frac18$`], answer: 0, solution: T`$1 - P(\text{ninguna cara}) = 1 - \frac18 = \frac78$.` },
            ],
            problems: [
              {
                prompt: T`<p>En un grupo de 200 personas, 120 usan Instagram, 90 usan TikTok y 50 usan ambas redes. Se elige una persona al azar.</p>
<p>a) (0,5 puntos) ¿Cuál es la probabilidad de que use alguna de las dos redes?</p>
<p>b) (0,5 puntos) ¿Y de que no use ninguna?</p>
<p>c) (0,5 puntos) Si usa Instagram, ¿qué probabilidad hay de que use TikTok?</p>
<p>d) (0,5 puntos) ¿Son independientes los sucesos «usar Instagram» y «usar TikTok»?</p>`,
                solution: T`<p>$P(I) = 0{,}6$, $P(T) = 0{,}45$, $P(I\cap T) = 0{,}25$.</p>
<p><b>a)</b> $P(I\cup T) = 0{,}6 + 0{,}45 - 0{,}25 = 0{,}8$.</p>
<p><b>b)</b> $P(\overline{I}\cap\overline{T}) = 1 - 0{,}8 = 0{,}2$.</p>
<p><b>c)</b> $P(T\mid I) = \frac{0{,}25}{0{,}6} \approx 0{,}4167$.</p>
<p><b>d)</b> $P(I)P(T) = 0{,}27 \neq 0{,}25 = P(I\cap T)$ → <b>no</b> son independientes.</p>`,
              },
              {
                prompt: T`<p>Una empresa de mensajería tiene tres centros de reparto: A (50 % de los envíos), B (30 %) y C (20 %). Llegan con retraso el 4 % de los envíos de A, el 6 % de los de B y el 10 % de los de C.</p>
<p>a) (1 punto) ¿Qué porcentaje de envíos llega con retraso?</p>
<p>b) (1 punto) Un envío ha llegado con retraso. ¿Cuál es la probabilidad de que proceda del centro C?</p>`,
                solution: T`<p>Sea $R$ = «llega con retraso».</p>
<p><b>a)</b> $P(R) = 0{,}5\cdot0{,}04 + 0{,}3\cdot0{,}06 + 0{,}2\cdot0{,}10 = 0{,}02 + 0{,}018 + 0{,}02 = 0{,}058$ → el <b>5,8 %</b>.</p>
<p><b>b)</b> $P(C\mid R) = \dfrac{0{,}2\cdot0{,}1}{0{,}058} = \dfrac{0{,}02}{0{,}058} \approx 0{,}3448$.</p>`,
              },
            ],
          },
          {
            id: 'inferencia', name: 'Muestreo e inferencia', summary: 'Distribución normal, media muestral, intervalos de confianza para la media y la proporción, tamaño muestral.',
            gens: ['mat.normal', 'mat.sampleMean', 'mat.ciMean', 'mat.sampleSize', 'mat.ciProp'],
            theory: T`
<h3>Distribución normal</h3>
<p>$X\sim N(\mu,\sigma)$. Se tipifica con $Z = \frac{X-\mu}{\sigma}$ y se usa la tabla de $N(0,1)$. Recuerda $\Phi(-z) = 1 - \Phi(z)$.</p>
<h3>Distribución de la media muestral</h3>
<div class="formula">Si $X\sim N(\mu,\sigma)$ (o $n\ge30$), la media de muestras de tamaño $n$ cumple $\bar X\sim N\!\left(\mu,\ \dfrac{\sigma}{\sqrt n}\right)$</div>
<h3>Intervalo de confianza para la media ($\sigma$ conocida)</h3>
<div class="formula">$$\left(\bar x - z_{\alpha/2}\frac{\sigma}{\sqrt n},\ \ \bar x + z_{\alpha/2}\frac{\sigma}{\sqrt n}\right) \qquad E = z_{\alpha/2}\frac{\sigma}{\sqrt n}$$</div>
<h3>Intervalo de confianza para una proporción</h3>
<div class="formula">$$\left(\hat p - z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}},\ \ \hat p + z_{\alpha/2}\sqrt{\frac{\hat p(1-\hat p)}{n}}\right)$$</div>
<h3>Valores críticos más usados</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Confianza</th><th>90 %</th><th>95 %</th><th>99 %</th></tr></thead>
<tbody><tr><td>$z_{\alpha/2}$</td><td>1,645</td><td>1,96</td><td>2,575</td></tr></tbody></table></div>
<p>Cómo se obtiene: si la confianza es $1-\alpha$, buscas $z$ tal que $\Phi(z) = 1 - \frac{\alpha}{2}$ (para el 95 %: $\Phi(z) = 0{,}975 \Rightarrow z = 1{,}96$).</p>
<h3>Tamaño de la muestra</h3>
<div class="formula">$$n \ge \left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2 \quad\text{(redondea siempre hacia arriba)}$$</div>
<ul><li>Si aumenta la confianza, aumenta $z$ y el intervalo es <b>más ancho</b>.</li>
<li>Si aumenta $n$, el error disminuye (proporcional a $1/\sqrt n$): para reducir el error a la mitad hay que <b>cuadruplicar</b> $n$.</li>
<li>El punto medio del intervalo es $\bar x$, y la amplitud es $2E$.</li></ul>
<p class="tip"><b>Truco PAU:</b> si te dan el intervalo $(a, b)$, entonces $\bar x = \frac{a+b}{2}$ y $E = \frac{b-a}{2}$; con eso puedes despejar $n$, $\sigma$ o $z$.</p>`,
            questions: [
              { type: 'mc', prompt: T`Si $X\sim N(50, 12)$, la media muestral para muestras de tamaño 36 sigue:`, options: [T`$N(50, 12)$`, T`$N(50, 2)$`, T`$N(50, \frac13)$`, T`$N(\frac{50}{6}, 2)$`], answer: 1, solution: T`$\frac{\sigma}{\sqrt n} = \frac{12}{6} = 2$.` },
              { type: 'mc', prompt: T`El valor crítico $z_{\alpha/2}$ para un nivel de confianza del 95 % es:`, options: ['$1{,}645$', '$1{,}96$', '$2{,}575$', '$0{,}95$'], answer: 1, solution: T`$\Phi(z) = 0{,}975 \Rightarrow z = 1{,}96$.` },
              { type: 'mc', prompt: 'Si se aumenta el nivel de confianza manteniendo el tamaño muestral, el intervalo de confianza:', options: ['se estrecha', 'se ensancha', 'no cambia', 'se desplaza'], answer: 1, solution: 'Mayor confianza → mayor $z_{\\alpha/2}$ → mayor error → intervalo más ancho.' },
              { type: 'mc', prompt: 'Para reducir el error máximo a la mitad (misma confianza), el tamaño muestral debe:', options: ['duplicarse', 'cuadruplicarse', 'reducirse a la mitad', 'no cambia'], answer: 1, solution: T`$E \propto \frac{1}{\sqrt n}$: para dividir $E$ entre 2, $\sqrt n$ debe multiplicarse por 2, es decir, $n$ por 4.` },
              { type: 'mc', prompt: 'Un intervalo de confianza para la media es $(48, 52)$. La media muestral y el error son:', options: ['$\\bar x = 50$, $E = 2$', '$\\bar x = 50$, $E = 4$', '$\\bar x = 48$, $E = 4$', '$\\bar x = 52$, $E = 2$'], answer: 0, solution: T`Centro: $\frac{48+52}{2} = 50$; semiamplitud: $\frac{52-48}{2} = 2$.` },
              { type: 'mc', prompt: T`El tamaño muestral calculado sale $n \ge 96{,}04$. ¿Qué $n$ se toma?`, options: ['$96$', '$97$', '$100$', '$95$'], answer: 1, solution: 'Hay que redondear siempre hacia arriba para garantizar el error.' },
            ],
            problems: [
              {
                prompt: T`<p>El peso de los paquetes de arroz de una marca sigue una distribución normal con desviación típica $\sigma = 15$ g. Una muestra de 36 paquetes da un peso medio de 498 g.</p>
<p>a) (1 punto) Calcula el intervalo de confianza al 95 % para el peso medio.</p>
<p>b) (1 punto) ¿Qué tamaño muestral mínimo haría falta para que, con un 99 % de confianza, el error fuese como mucho de 3 g?</p>`,
                solution: T`<p><b>a)</b> $z_{0{,}025} = 1{,}96$. $E = 1{,}96\cdot\frac{15}{\sqrt{36}} = 1{,}96\cdot2{,}5 = 4{,}9$.</p>
<p>$IC_{95\%} = (498 - 4{,}9,\ 498 + 4{,}9) = (493{,}1,\ 502{,}9)$ g.</p>
<p><b>b)</b> $z_{0{,}005} = 2{,}575$: $n \ge \left(\frac{2{,}575\cdot15}{3}\right)^2 = 12{,}875^2 = 165{,}77$ → <b>$n = 166$</b> paquetes.</p>`,
              },
              {
                prompt: T`<p>En una encuesta a 400 jóvenes madrileños, 120 afirman leer al menos un libro al mes.</p>
<p>a) (1 punto) Halla un intervalo de confianza al 95 % para la proporción de jóvenes que leen al menos un libro al mes.</p>
<p>b) (1 punto) Interpreta el resultado y explica qué ocurriría con la amplitud del intervalo si se encuestase a 1.600 jóvenes con la misma proporción muestral.</p>`,
                solution: T`<p><b>a)</b> $\hat p = \frac{120}{400} = 0{,}3$. $E = 1{,}96\sqrt{\frac{0{,}3\cdot0{,}7}{400}} = 1{,}96\cdot0{,}02291 \approx 0{,}0449$.</p>
<p>$IC_{95\%} \approx (0{,}2551,\ 0{,}3449)$.</p>
<p><b>b)</b> Con un 95 % de confianza, entre el 25,5 % y el 34,5 % de los jóvenes lee al menos un libro al mes. Con $n = 1600$ ($4$ veces mayor), el error se divide entre $\sqrt4 = 2$: la amplitud pasa a ser la <b>mitad</b> ($E\approx0{,}0225$).</p>`,
              },
              {
                prompt: T`<p>El tiempo diario que los estudiantes dedican al móvil sigue una normal de media 180 minutos y desviación típica 40 minutos.</p>
<p>a) (1 punto) ¿Qué porcentaje de estudiantes dedica más de 4 horas diarias?</p>
<p>b) (1 punto) Si se toma una muestra de 64 estudiantes, ¿cuál es la probabilidad de que su media esté entre 170 y 190 minutos?</p>`,
                solution: T`<p><b>a)</b> $P(X > 240) = P\left(Z > \frac{240-180}{40}\right) = P(Z > 1{,}5) = 1 - 0{,}9332 = 0{,}0668$ → el <b>6,68 %</b>.</p>
<p><b>b)</b> $\bar X\sim N\left(180,\ \frac{40}{8}\right) = N(180, 5)$:</p>
$$P(170 < \bar X < 190) = P(-2 < Z < 2) = 2\Phi(2) - 1 = 2\cdot0{,}9772 - 1 = 0{,}9544$$`,
              },
            ],
          },
        ],
      },
    ],
  });
})(window.PAU);
