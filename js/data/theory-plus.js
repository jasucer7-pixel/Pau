/* Ampliación de la teoría: para cada tema, secciones adicionales (html),
   el método para resolver la pregunta en la PAU (steps) y errores típicos (mistakes). */
(function (P) {
  'use strict';
  const T = P.T;

  P.theoryPlus = {
    // ===================================================================
    mat2: {
      matrices: {
        html: T`
<h3>Rango por el método de Gauss</h3>
<p>Haciendo ceros por debajo de la diagonal con operaciones elementales (que no cambian el rango), el rango es el número de filas no nulas que quedan.</p>
<div class="formula">$$\begin{pmatrix} 1 & 2 & 3 \\ 2 & 4 & 7 \\ 3 & 6 & 10 \end{pmatrix} \xrightarrow[F_3-3F_1]{F_2-2F_1} \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 1 \\ 0 & 0 & 1 \end{pmatrix} \xrightarrow{F_3-F_2} \begin{pmatrix} 1 & 2 & 3 \\ 0 & 0 & 1 \\ 0 & 0 & 0 \end{pmatrix} \Rightarrow \operatorname{rg} = 2$$</div>
<h3>Potencias de una matriz</h3>
<p>Cuando piden $A^n$ o $A^{2027}$, calcula $A^2$, $A^3$… hasta encontrar un patrón (por ejemplo $A^3 = I$, o $A^2 = A$, o $A^n$ con un término que crece como $n$). Después usa la división entera: si $A^3 = I$, entonces $A^{2027} = A^{3\cdot 675 + 2} = A^2$.</p>
<h3>Matrices especiales</h3>
<ul>
<li><b>Simétrica:</b> $A^t = A$. <b>Antisimétrica:</b> $A^t = -A$ (diagonal nula).</li>
<li><b>Idempotente:</b> $A^2 = A$. <b>Nilpotente:</b> $A^k = 0$ para algún $k$. <b>Ortogonal:</b> $A^tA = I$, es decir, $A^{-1} = A^t$ y $|A| = \pm 1$.</li>
<li>Si $A^2 = kA$ o $A^2 + aA + bI = 0$, se puede despejar la inversa sin calcular adjuntos: de $A^2 + aA + bI = 0$ sale $A(A + aI) = -bI$, luego $A^{-1} = -\frac{1}{b}(A + aI)$.</li>
</ul>`,
        steps: ['Lee qué piden: ¿determinante, rango, inversa o despejar $X$?', 'Si hay parámetro, calcula el determinante en función de él y halla los valores que lo anulan.', 'Estudia por separado cada valor crítico (rango, existencia de inversa…).', 'En ecuaciones matriciales, despeja $X$ con letras antes de operar.', T`Comprueba el resultado: $A\cdot A^{-1}$ debe dar $I$.`],
        mistakes: ['Multiplicar por la inversa por el lado equivocado: de $XA = B$ sale $X = BA^{-1}$, no $A^{-1}B$.', 'Olvidar trasponer la matriz de adjuntos al calcular la inversa.', 'Escribir $|kA| = k|A|$ en vez de $k^n|A|$.', T`Simplificar $AB = AC \Rightarrow B = C$ sin comprobar que $A$ es invertible.`, 'Equivocarse con los signos $(-1)^{i+j}$ de los adjuntos.'],
      },
      sistemas: {
        html: T`
<h3>Teorema de Rouché-Frobenius, en una tabla</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Rangos</th><th>Tipo de sistema</th><th>Soluciones</th></tr></thead><tbody>
<tr><td>$\operatorname{rg} A = \operatorname{rg} A^* = n$ (nº de incógnitas)</td><td>Compatible determinado (SCD)</td><td>Una única</td></tr>
<tr><td>$\operatorname{rg} A = \operatorname{rg} A^* \lt  n$</td><td>Compatible indeterminado (SCI)</td><td>Infinitas, con $n - \operatorname{rg}$ parámetros</td></tr>
<tr><td>$\operatorname{rg} A \neq \operatorname{rg} A^*$</td><td>Incompatible (SI)</td><td>Ninguna</td></tr>
</tbody></table></div>
<h3>Discutir un sistema con parámetro: esquema</h3>
<ol>
<li>Si $A$ es cuadrada, calcula $|A|$ y resuelve $|A| = 0$.</li>
<li>Para los valores que <b>no</b> anulan $|A|$: $\operatorname{rg} A = \operatorname{rg} A^* = 3$, SCD.</li>
<li>Para cada valor que lo anula: sustituye, calcula $\operatorname{rg} A$ con un menor de orden 2 y luego $\operatorname{rg} A^*$ orlando con la columna de términos independientes.</li>
</ol>
<h3>Resolver un SCI</h3>
<p>Quédate con tantas ecuaciones como indique el rango (las que formen el menor no nulo), pasa al otro lado la incógnita sobrante llamándola $\lambda$ y resuelve. Ejemplo: $x + y + z = 2$, $x - y = 0$ $\Rightarrow$ $y = \lambda$, $x = \lambda$, $z = 2 - 2\lambda$.</p>
<h3>Sistemas homogéneos</h3>
<p>Si todos los términos independientes son $0$, el sistema siempre es compatible ($x=y=z=0$ es solución). Solo hay soluciones distintas de la trivial cuando $|A| = 0$.</p>`,
        steps: ['Escribe la matriz de coeficientes $A$ y la ampliada $A^*$.', 'Calcula $|A|$ y halla los valores del parámetro que lo anulan.', 'Discute: caso general (SCD) y cada valor crítico por separado.', T`Resuelve el caso que pidan (Cramer si es SCD, parámetro $\lambda$ si es SCI).`, 'Si es un problema con enunciado, define las incógnitas con unidades y contesta con una frase.'],
        mistakes: ['Concluir «incompatible» solo porque $|A| = 0$: hay que comparar con el rango de la ampliada.', 'Elegir para el SCI ecuaciones que no forman el menor no nulo.', 'En problemas de enunciado, no comprobar que la solución tiene sentido (personas no negativas, enteras…).', 'Olvidar que en un sistema homogéneo nunca es incompatible.'],
      },
      limites: {
        html: T`
<h3>Infinitésimos equivalentes (cuando $x \to 0$)</h3>
<div class="formula">$$\sin x \sim x,\quad \tan x \sim x,\quad 1-\cos x \sim \tfrac{x^2}{2},\quad \ln(1+x) \sim x,\quad e^x - 1 \sim x,\quad \arcsin x \sim x$$</div>
<p>Solo se pueden sustituir en <b>productos y cocientes</b>, nunca en sumas o restas.</p>
<h3>Indeterminación $1^\infty$</h3>
<div class="formula">$$\lim_{x\to a} f(x)^{g(x)} = e^{\lim\limits_{x\to a} g(x)\,(f(x)-1)}$$</div>
<p>Ejemplo: $\displaystyle\lim_{x\to\infty}\left(\frac{x+3}{x-1}\right)^{x} = e^{\lim x\left(\frac{x+3}{x-1}-1\right)} = e^{\lim \frac{4x}{x-1}} = e^4$.</p>
<h3>Asíntotas</h3>
<ul>
<li><b>Verticales:</b> $x = a$ si $\lim_{x\to a} f(x) = \pm\infty$ (busca donde se anula el denominador, o el argumento de un logaritmo).</li>
<li><b>Horizontales:</b> $y = L$ si $\lim_{x\to\pm\infty} f(x) = L$. Estudia $+\infty$ y $-\infty$ por separado si hay exponenciales.</li>
<li><b>Oblicuas:</b> $y = mx + n$ con $m = \lim \frac{f(x)}{x}$ y $n = \lim (f(x) - mx)$. No puede haber horizontal y oblicua en el mismo lado.</li>
</ul>
<h3>Continuidad de funciones a trozos</h3>
<p>En cada punto de cambio exige $\lim_{x\to a^-} f(x) = \lim_{x\to a^+} f(x) = f(a)$. Si además piden derivabilidad, iguala también las derivadas laterales (y comprueba antes la continuidad).</p>`,
        steps: ['Sustituye directamente: si sale un número, ya está.', T`Identifica el tipo de indeterminación ($0/0$, $\infty/\infty$, $\infty-\infty$, $1^\infty$, $0\cdot\infty$).`, T`Aplica la técnica: factorizar, conjugado, L'Hôpital o la fórmula del número $e$.`, 'En funciones a trozos, calcula los límites laterales en cada punto de unión.', 'Interpreta el resultado (tipo de discontinuidad, asíntota…).'],
        mistakes: [T`Aplicar L'Hôpital cuando no hay indeterminación.`, T`Derivar el cociente entero en L'Hôpital: se derivan numerador y denominador por separado.`, T`Olvidar estudiar $x\to -\infty$ en funciones con $e^x$.`, 'Decir que hay asíntota vertical donde el límite es finito (es una discontinuidad evitable).'],
      },
      derivadas: {
        html: T`
<h3>Tabla de derivadas que más se usan</h3>
<div class="formula">$$(x^n)' = nx^{n-1}\quad (e^{u})' = u'e^{u}\quad (\ln u)' = \frac{u'}{u}\quad (\sin u)' = u'\cos u\quad (\cos u)' = -u'\sin u$$
$$(\tan u)' = \frac{u'}{\cos^2 u}\qquad (\sqrt{u})' = \frac{u'}{2\sqrt{u}}\qquad (\arctan u)' = \frac{u'}{1+u^2}\qquad (a^u)' = u'a^u\ln a$$</div>
<h3>Recta tangente y normal</h3>
<div class="formula">$$\text{Tangente: } y - f(a) = f'(a)(x - a) \qquad \text{Normal: } y - f(a) = -\frac{1}{f'(a)}(x - a)$$</div>
<h3>Teoremas de Bolzano, Rolle y del valor medio</h3>
<ul>
<li><b>Bolzano:</b> $f$ continua en $[a,b]$ y $f(a)\cdot f(b) \lt  0$ $\Rightarrow$ existe $c\in(a,b)$ con $f(c) = 0$. Sirve para demostrar que una ecuación tiene solución.</li>
<li><b>Rolle:</b> $f$ continua en $[a,b]$, derivable en $(a,b)$ y $f(a) = f(b)$ $\Rightarrow$ existe $c$ con $f'(c) = 0$. Junto a Bolzano demuestra que la solución es <b>única</b>.</li>
<li><b>Valor medio (Lagrange):</b> existe $c\in(a,b)$ con $f'(c) = \dfrac{f(b)-f(a)}{b-a}$.</li>
</ul>
<h3>Optimización</h3>
<ol>
<li>Escribe la función a optimizar con dos variables y la condición (ligadura) que las relaciona.</li>
<li>Despeja una variable y obtén una función de una sola variable con su dominio.</li>
<li>Deriva, iguala a cero y comprueba con $f''$ (o con el signo de $f'$) que es máximo o mínimo.</li>
<li>Responde a la pregunta exacta: a veces piden las dimensiones, otras el valor óptimo.</li>
</ol>
<h3>Curvatura</h3>
<p>$f'' \gt  0$: convexa ($\cup$). $f'' \lt  0$: cóncava ($\cap$). Punto de inflexión donde $f''$ cambia de signo.</p>`,
        steps: ['Calcula el dominio de la función.', T`Deriva con cuidado y simplifica (factoriza) $f'(x)$.`, T`Resuelve $f'(x) = 0$ y estudia el signo de $f'$ en una tabla.`, 'Concluye: intervalos de crecimiento y extremos con sus coordenadas $(x, f(x))$.', 'Para Bolzano/Rolle, verifica explícitamente todas las hipótesis.'],
        mistakes: ['Olvidar la derivada interior en la regla de la cadena.', 'Dar solo la abscisa del extremo cuando piden el punto.', 'Incluir en los intervalos puntos fuera del dominio.', 'En Bolzano, no mencionar que la función es continua en el intervalo cerrado.', T`Confundir cóncava y convexa: en la PAU de Madrid, convexa = forma de $\cup$.`],
      },
      integrales: {
        html: T`
<h3>Integrales inmediatas (forma compuesta)</h3>
<div class="formula">$$\int u^n u'\,dx = \frac{u^{n+1}}{n+1} + C \quad \int \frac{u'}{u}dx = \ln|u| + C \quad \int u'e^u dx = e^u + C \quad \int \frac{u'}{1+u^2}dx = \arctan u + C$$</div>
<h3>Integración por partes</h3>
<div class="formula">$$\int u\,dv = uv - \int v\,du$$</div>
<p>Regla ALPES para elegir $u$ (lo que se deriva): <b>A</b>rcos, <b>L</b>ogaritmos, <b>P</b>olinomios, <b>E</b>xponenciales, <b>S</b>enos/cosenos. Ejemplo: $\int x e^x dx$: $u = x$, $dv = e^x dx$ $\Rightarrow$ $xe^x - e^x + C$.</p>
<h3>Racionales</h3>
<p>Si el grado del numerador es mayor o igual que el del denominador, divide primero. Después descompón en fracciones simples:</p>
<div class="formula">$$\frac{3x+1}{(x-1)(x+2)} = \frac{A}{x-1} + \frac{B}{x+2} \;\Rightarrow\; A = \tfrac{4}{3},\; B = \tfrac{5}{3}$$</div>
<h3>Cambio de variable</h3>
<p>Elige $t$ como la expresión «molesta» (una raíz, una exponencial…), calcula $dt$, sustituye todo y, si es definida, cambia también los límites de integración.</p>
<h3>Área entre curvas</h3>
<div class="formula">$$A = \int_a^b |f(x) - g(x)|\,dx$$</div>
<p>Halla los puntos de corte resolviendo $f(x) = g(x)$, decide qué función va por encima en cada tramo y suma las áreas por separado. Un área nunca es negativa.</p>`,
        steps: ['Identifica el tipo: inmediata, partes, racional o cambio de variable.', 'Calcula una primitiva y compruébala derivando mentalmente.', 'Si es definida, aplica Barrow: $F(b) - F(a)$.', 'Para áreas: puntos de corte, esbozo y qué función está encima.', 'Escribe las unidades: «u²».'],
        mistakes: ['Olvidar la constante $+C$ en las indefinidas.', 'Restar las funciones al revés y obtener un área negativa.', 'Integrar de $a$ a $b$ cruzando el eje sin partir el intervalo.', 'No cambiar los límites tras un cambio de variable.', 'Elegir mal $u$ en partes y llegar a una integral más difícil.'],
      },
      rectasplanos: {
        html: T`
<h3>Formas de la ecuación de una recta</h3>
<div class="formula">$$\text{Vectorial: } (x,y,z) = P + \lambda\vec v \qquad \text{Continua: } \frac{x-p_1}{v_1} = \frac{y-p_2}{v_2} = \frac{z-p_3}{v_3}$$
$$\text{Implícita: } r \equiv \begin{cases} A_1x + B_1y + C_1z + D_1 = 0 \\ A_2x + B_2y + C_2z + D_2 = 0 \end{cases}\quad \vec v = \vec n_1 \times \vec n_2$$</div>
<h3>Ecuación del plano</h3>
<div class="formula">$$\pi \equiv Ax + By + Cz + D = 0,\quad \vec n = (A,B,C) \qquad \pi \equiv \begin{vmatrix} x-p_1 & y-p_2 & z-p_3 \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix} = 0$$</div>
<h3>Posiciones relativas</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Elementos</th><th>Cómo decidir</th></tr></thead><tbody>
<tr><td>Dos rectas</td><td>Si $\vec u \parallel \vec v$: paralelas o coincidentes (mira si un punto de una está en la otra). Si no: $\det(\vec u, \vec v, \overrightarrow{PQ}) = 0$ secantes, $\neq 0$ se cruzan.</td></tr>
<tr><td>Recta y plano</td><td>$\vec v\cdot\vec n \neq 0$: secantes. $\vec v\cdot\vec n = 0$: paralela o contenida (prueba un punto).</td></tr>
<tr><td>Dos planos</td><td>Normales proporcionales: paralelos o coincidentes. Si no: secantes en una recta.</td></tr>
<tr><td>Tres planos</td><td>Rouché con la matriz de coeficientes de las tres ecuaciones.</td></tr>
</tbody></table></div>
<h3>Puntos simétricos y proyecciones</h3>
<p>Proyección de $P$ sobre un plano: corta con el plano la recta que pasa por $P$ con dirección $\vec n$. El simétrico es $P' = 2M - P$, siendo $M$ esa proyección.</p>`,
        steps: ['Extrae de cada elemento un punto y un vector (director o normal).', 'Decide la posición relativa con productos escalares, rangos o el determinante de tres vectores.', 'Para construir una recta o un plano, piensa qué punto y qué vectores necesitas.', 'Comprueba el resultado sustituyendo un punto conocido.'],
        mistakes: ['Confundir el vector director de una recta con el normal de un plano.', 'Decir que dos rectas no paralelas son secantes sin comprobar si se cruzan.', 'Errores de signo al pasar de implícitas a paramétricas.', T`Olvidar que $\vec n_1\times\vec n_2$ da la dirección de la recta intersección de dos planos.`],
      },
      metrica: {
        html: T`
<h3>Productos de vectores</h3>
<div class="formula">$$\vec u\cdot\vec v = |\vec u||\vec v|\cos\alpha \qquad |\vec u\times\vec v| = |\vec u||\vec v|\sin\alpha \qquad [\vec u,\vec v,\vec w] = \det(\vec u,\vec v,\vec w)$$</div>
<ul>
<li>$\vec u\cdot\vec v = 0 \iff$ perpendiculares.</li>
<li>$\vec u\times\vec v$ es perpendicular a ambos; su módulo es el área del paralelogramo.</li>
<li>$|[\vec u,\vec v,\vec w]|$ es el volumen del paralelepípedo; el del tetraedro es $\frac{1}{6}$ de eso.</li>
</ul>
<h3>Distancias</h3>
<div class="formula">$$d(P,\pi) = \frac{|Ap_1 + Bp_2 + Cp_3 + D|}{\sqrt{A^2+B^2+C^2}} \qquad d(P,r) = \frac{|\overrightarrow{AP}\times\vec v|}{|\vec v|} \qquad d(r,s) = \frac{|[\overrightarrow{AB},\vec u,\vec v]|}{|\vec u\times\vec v|}$$</div>
<p>Distancia entre planos paralelos: toma un punto de uno y calcula su distancia al otro.</p>
<h3>Ángulos</h3>
<div class="formula">$$\cos(r,s) = \frac{|\vec u\cdot\vec v|}{|\vec u||\vec v|}\qquad \cos(\pi_1,\pi_2) = \frac{|\vec n_1\cdot\vec n_2|}{|\vec n_1||\vec n_2|}\qquad \sin(r,\pi) = \frac{|\vec v\cdot\vec n|}{|\vec v||\vec n|}$$</div>
<h3>Áreas de triángulos</h3>
<div class="formula">$$A_{\triangle ABC} = \frac{1}{2}\left|\overrightarrow{AB}\times\overrightarrow{AC}\right|$$</div>`,
        steps: ['Dibuja un esquema aunque sea aproximado.', 'Elige la fórmula según los elementos (punto, recta, plano).', T`Calcula vectores con cuidado: $\overrightarrow{AB} = B - A$.`, 'Simplifica las raíces y da el resultado con unidades (u, u², u³).'],
        mistakes: ['Olvidar el valor absoluto en distancias y ángulos.', 'Usar seno en vez de coseno (o al revés) en el ángulo recta-plano.', T`Olvidar el $\frac{1}{2}$ del triángulo o el $\frac{1}{6}$ del tetraedro.`, 'Calcular mal el producto vectorial (el componente central lleva signo menos).'],
      },
      probabilidad: {
        html: T`
<h3>Leyes de Morgan y sucesos</h3>
<div class="formula">$$\overline{A\cup B} = \bar A\cap\bar B \qquad \overline{A\cap B} = \bar A\cup\bar B \qquad P(A\cap\bar B) = P(A) - P(A\cap B)$$</div>
<h3>Independencia frente a incompatibilidad</h3>
<ul>
<li><b>Incompatibles:</b> $A\cap B = \emptyset$, es decir, $P(A\cap B) = 0$.</li>
<li><b>Independientes:</b> $P(A\cap B) = P(A)\,P(B)$, o equivalentemente $P(A|B) = P(A)$.</li>
<li>Dos sucesos con probabilidad positiva no pueden ser a la vez incompatibles e independientes.</li>
</ul>
<h3>Tabla de contingencia</h3>
<p>Cuando el enunciado da porcentajes de dos características, organiza los datos en una tabla de doble entrada: los totales de filas y columnas son las probabilidades marginales y cada celda una intersección.</p>
<div class="table-wrap"><table class="data"><thead><tr><th></th><th>$B$</th><th>$\bar B$</th><th>Total</th></tr></thead><tbody>
<tr><td>$A$</td><td>$P(A\cap B)$</td><td>$P(A\cap\bar B)$</td><td>$P(A)$</td></tr>
<tr><td>$\bar A$</td><td>$P(\bar A\cap B)$</td><td>$P(\bar A\cap\bar B)$</td><td>$P(\bar A)$</td></tr>
<tr><td>Total</td><td>$P(B)$</td><td>$P(\bar B)$</td><td>$1$</td></tr>
</tbody></table></div>
<h3>Diagrama de árbol</h3>
<p>Las ramas que salen de un mismo nodo suman 1. Se multiplica a lo largo de un camino y se suman los caminos que llevan al suceso pedido (probabilidad total). Bayes es «el camino que interesa entre todos los que llevan al resultado observado».</p>`,
        steps: ['Nombra los sucesos con letras y traduce cada dato a probabilidad ($P(A)$, $P(B|A)$…).', 'Decide la herramienta: tabla de contingencia, árbol o fórmulas.', 'Aplica probabilidad total o Bayes según lo que pregunten.', 'Revisa que todas las probabilidades estén entre 0 y 1.'],
        mistakes: ['Confundir $P(A|B)$ con $P(B|A)$.', 'Sumar probabilidades de sucesos que no son incompatibles sin restar la intersección.', 'Confundir independientes con incompatibles.', T`Olvidar que «al menos uno» es más fácil por el contrario: $1 - P(\text{ninguno})$.`],
      },
      distribuciones: {
        html: T`
<h3>Distribución binomial $B(n,p)$</h3>
<div class="formula">$$P(X = k) = \binom{n}{k}p^k(1-p)^{n-k} \qquad \mu = np \qquad \sigma = \sqrt{np(1-p)}$$</div>
<p>Se usa cuando se repite $n$ veces un experimento con dos resultados (éxito/fracaso), de forma independiente y con la misma probabilidad $p$.</p>
<h3>Distribución normal $N(\mu,\sigma)$</h3>
<div class="formula">$$Z = \frac{X - \mu}{\sigma} \sim N(0,1)\qquad P(Z \le -a) = 1 - P(Z\le a)\qquad P(a\le Z\le b) = \Phi(b) - \Phi(a)$$</div>
<p>Búsqueda inversa: si piden el valor $k$ con $P(X\le k) = 0{,}9$, busca en el interior de la tabla 0,9 → $z\approx 1{,}28$, y despeja $k = \mu + 1{,}28\sigma$.</p>
<h3>Aproximación de la binomial por la normal</h3>
<p>Si $np \ge 5$ y $n(1-p) \ge 5$, $B(n,p) \approx N\left(np, \sqrt{np(1-p)}\right)$, con corrección por continuidad:</p>
<div class="formula">$$P(X = k) \approx P(k - 0{,}5 \le X' \le k + 0{,}5)\qquad P(X \le k) \approx P(X' \le k + 0{,}5)$$</div>`,
        steps: ['Identifica la distribución y sus parámetros, justificándolo.', T`Escribe la probabilidad pedida con la variable ($P(X \ge 3)$…).`, 'Tipifica (normal) o usa la fórmula/complementario (binomial).', 'Busca en la tabla y opera con simetrías.', 'Responde en el contexto del problema.'],
        mistakes: ['Usar la varianza en lugar de la desviación típica al tipificar.', 'Olvidar la corrección por continuidad al aproximar.', T`Pensar que $P(X\ge k) = 1 - P(X\le k)$ en una binomial (es $1 - P(X\le k-1)$).`, 'Leer la tabla con valores negativos de $z$ (la tabla solo trae positivos).'],
      },
    },
    // ===================================================================
    matccss: {
      matrices: {
        html: T`
<h3>Método de Gauss para sistemas</h3>
<p>Escribe la matriz ampliada y haz ceros por debajo de la diagonal. La última fila te dice el tipo de sistema:</p>
<ul>
<li>$(0\ 0\ a \mid b)$ con $a\neq 0$: compatible determinado.</li>
<li>$(0\ 0\ 0 \mid 0)$: compatible indeterminado (infinitas soluciones).</li>
<li>$(0\ 0\ 0 \mid b)$ con $b\neq0$: incompatible.</li>
</ul>
<h3>Plantear un sistema a partir de un enunciado</h3>
<ol>
<li>Define las incógnitas con palabras y unidades: «$x$ = nº de entradas de adulto».</li>
<li>Traduce cada frase a una ecuación («el doble de…» → $2x$, «excede en 5» → $x = y + 5$).</li>
<li>Resuelve y comprueba que la solución tiene sentido (positiva, entera si son personas…).</li>
</ol>
<h3>Matrices en contexto</h3>
<p>Las matrices sirven para organizar datos: por ejemplo, una matriz de producción (filas = fábricas, columnas = productos) por un vector de precios da los ingresos de cada fábrica. Antes de multiplicar comprueba que las dimensiones y las unidades encajan.</p>`,
        steps: ['Si es un problema de enunciado, define las incógnitas.', 'Escribe el sistema o la ecuación matricial.', 'Resuelve por Gauss, Cramer o con la inversa.', 'Interpreta la solución en el contexto.'],
        mistakes: ['Multiplicar matrices con dimensiones incompatibles.', 'Plantear «x es el triple de y» como $3x = y$.', 'No interpretar el resultado al final.', T`Olvidar que $AB \neq BA$ al despejar.`],
      },
      pl: {
        html: T`
<h3>Pasos de un problema de programación lineal</h3>
<ol>
<li><b>Variables:</b> $x$, $y$ con su significado.</li>
<li><b>Función objetivo:</b> $F(x,y) = ax + by$ a maximizar (beneficio) o minimizar (coste).</li>
<li><b>Restricciones:</b> una inecuación por cada limitación, más $x\ge0$, $y\ge0$.</li>
<li><b>Región factible:</b> dibuja cada recta (dos puntos) y decide el semiplano probando el $(0,0)$.</li>
<li><b>Vértices:</b> resuelve los sistemas de las rectas que se cortan en cada esquina.</li>
<li><b>Evalúa</b> $F$ en todos los vértices y elige el mejor.</li>
</ol>
<h3>Casos especiales</h3>
<ul>
<li>Si dos vértices dan el mismo valor óptimo, hay <b>infinitas soluciones</b>: todo el segmento que los une.</li>
<li>Si la región no está acotada, puede no existir máximo (pero sí mínimo, o al revés).</li>
<li>Si las restricciones son incompatibles, la región es vacía y no hay solución.</li>
</ul>
<div class="formula">$$\text{Ejemplo: } \max F = 3x + 2y \text{ en los vértices } (0,0),(4,0),(3,2),(0,3)\Rightarrow F = 0, 12, 13, 6 \Rightarrow \max = 13 \text{ en } (3,2)$$</div>`,
        steps: ['Haz una tabla con los datos del enunciado.', 'Escribe variables, función objetivo y restricciones.', 'Dibuja la región factible con escala y rotula las rectas.', 'Calcula todos los vértices.', 'Evalúa $F$ y contesta con frase y unidades.'],
        mistakes: ['Olvidar las restricciones de no negatividad.', 'Elegir mal el semiplano (comprueba siempre con un punto).', 'Calcular los vértices «a ojo» en vez de resolver el sistema.', 'No interpretar la solución («hay que fabricar 3 mesas y 2 sillas»).'],
      },
      funciones: {
        html: T`
<h3>Estudio completo de una función</h3>
<ol>
<li><b>Dominio</b>: cuidado con denominadores, raíces pares y logaritmos.</li>
<li><b>Cortes con los ejes</b>: $x = 0$ y $f(x) = 0$.</li>
<li><b>Asíntotas</b>: verticales, horizontales u oblicuas.</li>
<li><b>Monotonía y extremos</b>: signo de $f'$.</li>
<li><b>Curvatura e inflexión</b>: signo de $f''$.</li>
</ol>
<h3>Funciones en contexto económico</h3>
<ul>
<li>Beneficio = Ingresos − Costes: $B(x) = I(x) - C(x)$.</li>
<li>El beneficio es máximo donde $B'(x) = 0$ y $B''(x) \lt  0$.</li>
<li>Si la función está definida en un intervalo $[a,b]$, el máximo absoluto puede estar en un extremo del intervalo: evalúa también $f(a)$ y $f(b)$.</li>
</ul>
<h3>Continuidad y derivabilidad a trozos</h3>
<div class="formula">$$\text{Continua en } a: \lim_{x\to a^-}f = \lim_{x\to a^+}f = f(a)\qquad \text{Derivable en } a: f'(a^-) = f'(a^+)$$</div>`,
        steps: ['Lee el intervalo en el que está definida la función.', 'Deriva y halla los puntos críticos.', 'Construye la tabla de signos.', 'Compara con los valores en los extremos del intervalo si los hay.', 'Interpreta en el contexto (año, unidades, euros…).'],
        mistakes: ['Ignorar los extremos del intervalo al buscar el máximo absoluto.', 'Dar el máximo sin decir en qué valor de $x$ se alcanza.', 'Olvidar comprobar la continuidad antes de la derivabilidad.', T`Tomar raíces de $f'$ fuera del dominio.`],
      },
      integrales: {
        html: T`
<h3>Regla de Barrow</h3>
<div class="formula">$$\int_a^b f(x)\,dx = F(b) - F(a)\quad\text{donde } F' = f$$</div>
<h3>Primitivas más usadas</h3>
<div class="formula">$$\int x^n dx = \frac{x^{n+1}}{n+1}\quad\int\frac{1}{x}dx = \ln|x|\quad\int e^{kx}dx = \frac{e^{kx}}{k}\quad\int\frac{1}{ax+b}dx = \frac{\ln|ax+b|}{a}$$</div>
<h3>Áreas</h3>
<ol>
<li>Halla dónde la función corta al eje $X$ (o dónde se cortan las dos funciones).</li>
<li>Divide el intervalo en esos puntos.</li>
<li>Integra en cada tramo y suma los valores absolutos.</li>
</ol>
<p>Ejemplo: área entre $f(x) = x^2$ y $g(x) = x$: se cortan en $0$ y $1$; $\int_0^1 (x - x^2)dx = \frac{1}{2} - \frac{1}{3} = \frac{1}{6}$ u².</p>
<h3>Hallar una función conociendo su derivada</h3>
<p>Integra $f'$ para obtener $f(x) = F(x) + C$ y usa el dato (por ejemplo $f(1) = 3$) para calcular $C$.</p>`,
        steps: ['Calcula la primitiva término a término.', 'Si hay área, calcula los cortes y haz un esbozo.', 'Aplica Barrow tramo a tramo.', 'Escribe el resultado en u².'],
        mistakes: ['Dar áreas negativas.', 'Olvidar la constante de integración al buscar $f$.', T`Integrar $\frac{1}{x^2}$ como un logaritmo.`, 'No partir el intervalo cuando la función cambia de signo.'],
      },
      probabilidad: {
        html: T`
<h3>Fórmulas básicas</h3>
<div class="formula">$$P(A\cup B) = P(A) + P(B) - P(A\cap B)\qquad P(\bar A) = 1 - P(A)\qquad P(A|B) = \frac{P(A\cap B)}{P(B)}$$</div>
<h3>Probabilidad total y Bayes</h3>
<div class="formula">$$P(B) = \sum_i P(A_i)P(B|A_i)\qquad P(A_j|B) = \frac{P(A_j)P(B|A_j)}{P(B)}$$</div>
<p>Las $A_i$ deben formar un sistema completo: no se solapan y entre todas cubren todos los casos (por ejemplo, las tres fábricas de las que puede venir una pieza).</p>
<h3>Tabla de contingencia con un ejemplo</h3>
<p>En un instituto, el 60 % son chicas; el 30 % de las chicas y el 20 % de los chicos hace deporte federado. $P(\text{deporte}) = 0{,}6\cdot0{,}3 + 0{,}4\cdot0{,}2 = 0{,}26$. Si alguien hace deporte, la probabilidad de que sea chica es $\frac{0{,}18}{0{,}26} \approx 0{,}692$.</p>`,
        steps: ['Define los sucesos.', 'Organiza los datos en árbol o tabla.', 'Aplica la fórmula adecuada.', 'Redondea a 3-4 decimales y responde.'],
        mistakes: [T`Confundir $P(A\cap B)$ con $P(A|B)$.`, 'Olvidar dividir entre $P(B)$ en Bayes.', 'Considerar independientes sucesos que no lo son.', 'Redondear demasiado pronto en pasos intermedios.'],
      },
      inferencia: {
        html: T`
<h3>Distribución de la media muestral</h3>
<div class="formula">$$\bar X \sim N\left(\mu, \frac{\sigma}{\sqrt n}\right)$$</div>
<p>Es exacta si la población es normal y aproximada (Teorema Central del Límite) si $n \ge 30$.</p>
<h3>Intervalo de confianza para la media</h3>
<div class="formula">$$\left(\bar x - z_{\alpha/2}\frac{\sigma}{\sqrt n},\; \bar x + z_{\alpha/2}\frac{\sigma}{\sqrt n}\right)\qquad E = z_{\alpha/2}\frac{\sigma}{\sqrt n}$$</div>
<div class="table-wrap"><table class="data"><thead><tr><th>Confianza</th><th>90 %</th><th>95 %</th><th>99 %</th></tr></thead><tbody>
<tr><td>$z_{\alpha/2}$</td><td class="num">1,645</td><td class="num">1,96</td><td class="num">2,575</td></tr>
</tbody></table></div>
<h3>Tamaño muestral mínimo</h3>
<div class="formula">$$n \ge \left(\frac{z_{\alpha/2}\,\sigma}{E}\right)^2 \quad\text{(redondea siempre hacia arriba)}$$</div>
<h3>Relaciones que suelen preguntar</h3>
<ul>
<li>Más confianza → intervalo más ancho (mayor error).</li>
<li>Más tamaño muestral → intervalo más estrecho. Para reducir el error a la mitad hay que multiplicar $n$ por 4.</li>
<li>Dado un intervalo $(a,b)$: $\bar x = \frac{a+b}{2}$ y $E = \frac{b-a}{2}$.</li>
</ul>`,
        steps: [T`Identifica $\mu$ o $\bar x$, $\sigma$, $n$ y el nivel de confianza.`, T`Busca $z_{\alpha/2}$ en la tabla.`, 'Calcula el error $E$ y el intervalo.', 'Para tamaño muestral, despeja $n$ y redondea hacia arriba.', 'Interpreta: «con un 95 % de confianza, la media está entre…».'],
        mistakes: [T`Usar $z_\alpha$ en vez de $z_{\alpha/2}$.`, T`Olvidar dividir entre $\sqrt n$.`, 'Redondear $n$ hacia abajo.', 'Confundir la desviación de la población con la de la media muestral.'],
      },
    },
    // ===================================================================
    eco: {
      formas: {
        html: T`
<h3>Cuadro comparativo de formas jurídicas</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Forma</th><th>Socios</th><th>Capital mínimo</th><th>Responsabilidad</th></tr></thead><tbody>
<tr><td>Empresario individual</td><td>1</td><td>No hay</td><td>Ilimitada</td></tr>
<tr><td>Sociedad colectiva</td><td>2 o más</td><td>No hay</td><td>Ilimitada, personal y solidaria</td></tr>
<tr><td>Sociedad comanditaria</td><td>Colectivos y comanditarios</td><td>No hay</td><td>Ilimitada (colectivos) / limitada (comanditarios)</td></tr>
<tr><td>Sociedad limitada (S.L.)</td><td>1 o más</td><td>1 € (con requisitos hasta llegar a 3.000 €)</td><td>Limitada al capital aportado</td></tr>
<tr><td>Sociedad anónima (S.A.)</td><td>1 o más</td><td>60.000 € (25 % desembolsado)</td><td>Limitada</td></tr>
<tr><td>Cooperativa</td><td>Mínimo 3 (primer grado)</td><td>Según estatutos</td><td>Limitada</td></tr>
<tr><td>Sociedad laboral</td><td>Mínimo 2; los trabajadores tienen la mayoría del capital</td><td>Según sea S.A.L. o S.L.L.</td><td>Limitada</td></tr>
</tbody></table></div>
<h3>Criterios para elegir forma jurídica</h3>
<ul>
<li>Número de promotores y capital disponible.</li>
<li>Responsabilidad que se quiere asumir frente a las deudas.</li>
<li>Fiscalidad: IRPF (empresario individual, progresivo) frente a Impuesto de Sociedades (tipo fijo).</li>
<li>Trámites y costes de constitución, y facilidad para transmitir participaciones o acciones.</li>
</ul>
<h3>Órganos de la sociedad anónima</h3>
<p><b>Junta General de Accionistas</b> (órgano soberano: aprueba cuentas, nombra administradores) y <b>Consejo de Administración o administradores</b> (gestión y representación).</p>`,
        steps: ['Identifica cuántos socios hay y cuánto capital aportan.', 'Fíjate en si quieren arriesgar su patrimonio personal.', 'Propón la forma jurídica y justifícala con 2-3 criterios.', 'Usa el vocabulario exacto (responsabilidad limitada, participaciones, acciones).'],
        mistakes: ['Decir que la S.L. tiene acciones (tiene participaciones).', 'Confundir responsabilidad limitada con «no pagar las deudas».', 'Olvidar que el empresario individual tributa por IRPF.', 'Responder sin justificar la elección.'],
      },
      entorno: {
        html: T`
<h3>Análisis PESTEL (entorno general)</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Factor</th><th>Ejemplos</th></tr></thead><tbody>
<tr><td>Político</td><td>Estabilidad del gobierno, subvenciones, política fiscal</td></tr>
<tr><td>Económico</td><td>PIB, inflación, tipos de interés, desempleo</td></tr>
<tr><td>Sociocultural</td><td>Demografía, hábitos de consumo, nivel educativo</td></tr>
<tr><td>Tecnológico</td><td>Innovación, digitalización, inversión en I+D</td></tr>
<tr><td>Ecológico</td><td>Normativa ambiental, cambio climático, reciclaje</td></tr>
<tr><td>Legal</td><td>Leyes laborales, de consumo, de competencia</td></tr>
</tbody></table></div>
<h3>Las cinco fuerzas de Porter (entorno específico)</h3>
<ol><li>Rivalidad entre competidores actuales.</li><li>Amenaza de nuevos competidores (barreras de entrada).</li><li>Amenaza de productos sustitutivos.</li><li>Poder de negociación de los clientes.</li><li>Poder de negociación de los proveedores.</li></ol>
<h3>DAFO</h3>
<p><b>Internas:</b> Debilidades y Fortalezas. <b>Externas:</b> Amenazas y Oportunidades. De él salen estrategias: ofensivas (F+O), defensivas (F+A), de reorientación (D+O) y de supervivencia (D+A).</p>
<h3>Estrategias competitivas de Porter</h3>
<p><b>Liderazgo en costes</b> (producir más barato que la competencia), <b>diferenciación</b> (producto percibido como único) y <b>segmentación o enfoque</b> (centrarse en un nicho).</p>`,
        steps: ['Clasifica cada factor: general (PESTEL) o específico (Porter).', 'Distingue lo interno (DAFO: D, F) de lo externo (A, O).', 'Pon un ejemplo aplicado a la empresa del enunciado.', 'Relaciona el análisis con una estrategia.'],
        mistakes: ['Poner una fortaleza interna como oportunidad.', 'Confundir entorno general y específico.', 'Enumerar sin aplicar al caso del enunciado.', 'Confundir diferenciación con segmentación.'],
      },
      crecimiento: {
        html: T`
<h3>Crecimiento interno y externo</h3>
<ul>
<li><b>Interno:</b> la empresa invierte en nuevos recursos propios (nuevas fábricas, tiendas). Más lento, pero mantiene el control.</li>
<li><b>Externo:</b> fusiones (pura o por absorción), adquisiciones de empresas, participaciones y cooperación (franquicias, joint ventures, alianzas, UTE, licencias). Más rápido.</li>
</ul>
<h3>Estrategias de crecimiento (matriz de Ansoff)</h3>
<div class="table-wrap"><table class="data"><thead><tr><th></th><th>Productos actuales</th><th>Productos nuevos</th></tr></thead><tbody>
<tr><td>Mercados actuales</td><td>Penetración de mercado</td><td>Desarrollo de productos</td></tr>
<tr><td>Mercados nuevos</td><td>Desarrollo de mercados</td><td>Diversificación</td></tr>
</tbody></table></div>
<p>La integración vertical (hacia atrás con proveedores o hacia delante con distribuidores) es un tipo de diversificación.</p>
<h3>Factores de localización</h3>
<p>Proximidad a clientes y proveedores, coste y cualificación de la mano de obra, infraestructuras y comunicaciones, coste del suelo, ayudas públicas, normativa y calidad de vida.</p>
<h3>Multinacionales y globalización</h3>
<p>Ventajas para el país de destino: empleo, inversión, transferencia de tecnología. Inconvenientes: deslocalización, dependencia, posibles impactos ambientales y sociales. Relacionado con la <b>Responsabilidad Social Corporativa</b>.</p>`,
        steps: ['Identifica si el caso es crecimiento interno o externo.', 'Si es estrategia, sitúala en la matriz de Ansoff.', 'Da ventajas e inconvenientes concretos.', 'Para localización, cita factores relacionados con la actividad de la empresa.'],
        mistakes: ['Confundir fusión con adquisición.', 'Llamar diversificación a vender el mismo producto en otro país (es desarrollo de mercados).', 'Olvidar los inconvenientes de las multinacionales.', 'Dar factores de localización genéricos sin relacionarlos con la empresa.'],
      },
      canvas: {
        html: T`
<h3>Los nueve bloques, con preguntas guía</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Bloque</th><th>Pregunta</th></tr></thead><tbody>
<tr><td>Segmentos de clientes</td><td>¿Para quién creamos valor?</td></tr>
<tr><td>Propuesta de valor</td><td>¿Qué problema resolvemos o qué necesidad satisfacemos?</td></tr>
<tr><td>Canales</td><td>¿Cómo llegamos al cliente?</td></tr>
<tr><td>Relación con clientes</td><td>¿Qué tipo de relación esperan?</td></tr>
<tr><td>Fuentes de ingresos</td><td>¿Por qué están dispuestos a pagar?</td></tr>
<tr><td>Recursos clave</td><td>¿Qué necesitamos para funcionar?</td></tr>
<tr><td>Actividades clave</td><td>¿Qué tenemos que hacer bien?</td></tr>
<tr><td>Socios clave</td><td>¿Quién nos ayuda?</td></tr>
<tr><td>Estructura de costes</td><td>¿Cuáles son los costes más importantes?</td></tr>
</tbody></table></div>
<h3>Lectura del lienzo</h3>
<p>La parte derecha (clientes, canales, relación, ingresos) es la de <b>valor</b>, orientada al mercado. La izquierda (socios, actividades, recursos, costes) es la de <b>eficiencia</b>. La propuesta de valor está en el centro y conecta ambas.</p>
<h3>Innovación y emprendimiento</h3>
<p>Tipos de innovación: de producto, de proceso, de modelo de negocio, de marketing y organizativa. Puede ser incremental (mejoras) o radical (algo nuevo). Herramientas habituales: Lean Startup (producto mínimo viable), Design Thinking y el lienzo de la propuesta de valor.</p>`,
        steps: ['Lee el caso e identifica a qué bloque corresponde cada dato.', 'Redacta la propuesta de valor con una frase clara.', 'Rellena los bloques con ejemplos concretos del caso.', 'Comprueba la coherencia entre ingresos, costes y propuesta.'],
        mistakes: ['Confundir canales con relación con clientes.', 'Poner como recurso clave una actividad («vender»).', 'Escribir propuestas de valor genéricas («calidad»).', 'Mezclar socios con clientes.'],
      },
      organizacion: {
        html: T`
<h3>Funciones de la dirección</h3>
<p><b>Planificar</b> (fijar objetivos y cómo lograrlos), <b>organizar</b> (asignar tareas y recursos), <b>gestionar recursos humanos / dirigir</b> (motivar, liderar, comunicar) y <b>controlar</b> (comparar resultados con objetivos y corregir).</p>
<h3>Teorías de la motivación</h3>
<ul>
<li><b>Maslow:</b> pirámide de necesidades: fisiológicas, seguridad, sociales, estima y autorrealización.</li>
<li><b>Herzberg:</b> factores higiénicos (salario, condiciones; si faltan, desmotivan) y motivadores (reconocimiento, responsabilidad).</li>
<li><b>McGregor:</b> teoría X (el trabajador evita el trabajo; control) y teoría Y (el trabajador busca responsabilidad; participación).</li>
</ul>
<h3>Estilos de liderazgo</h3>
<p>Autocrático (decide el jefe), democrático o participativo (decide con el grupo) y <i>laissez-faire</i> (libertad total).</p>
<h3>Estructuras organizativas</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Estructura</th><th>Ventaja</th><th>Inconveniente</th></tr></thead><tbody>
<tr><td>Lineal o jerárquica</td><td>Autoridad clara</td><td>Rígida, sobrecarga del jefe</td></tr>
<tr><td>Funcional</td><td>Especialización</td><td>Varios jefes por trabajador</td></tr>
<tr><td>Línea-staff</td><td>Asesoramiento experto</td><td>Conflictos línea-staff</td></tr>
<tr><td>Divisional</td><td>Adaptación a mercados o productos</td><td>Duplica recursos</td></tr>
<tr><td>Matricial</td><td>Flexible, por proyectos</td><td>Doble autoridad</td></tr>
</tbody></table></div>
<h3>Recursos humanos</h3>
<p>Reclutamiento (interno o externo), selección, formación, evaluación del desempeño y retribución. El contrato de trabajo, el convenio colectivo y la negociación con los representantes de los trabajadores regulan las relaciones laborales.</p>`,
        steps: ['Identifica qué función directiva o teoría pide el caso.', 'Define el concepto con precisión.', 'Aplica al ejemplo del enunciado.', 'Si piden un organigrama, dibújalo con niveles claros.'],
        mistakes: ['Confundir los factores higiénicos de Herzberg con los motivadores.', 'Mezclar teoría X/Y con estilos de liderazgo sin explicar la relación.', 'Confundir estructura funcional con divisional.', 'Olvidar la función de control.'],
      },
      marketing: {
        html: T`
<h3>Segmentación y posicionamiento</h3>
<p>Segmentar es dividir el mercado en grupos homogéneos (criterios geográficos, demográficos, psicográficos o de comportamiento). Las estrategias pueden ser <b>indiferenciada</b>, <b>diferenciada</b> o <b>concentrada</b>. El posicionamiento es el lugar que ocupa el producto en la mente del consumidor frente a la competencia.</p>
<h3>Marketing mix (4P) en detalle</h3>
<ul>
<li><b>Producto:</b> marca, envase, gama, ciclo de vida (introducción, crecimiento, madurez, declive).</li>
<li><b>Precio:</b> basado en costes, en la competencia o en la demanda; estrategias de penetración (precio bajo) o descremado (precio alto al inicio).</li>
<li><b>Distribución:</b> canal directo, corto o largo; distribución intensiva, selectiva o exclusiva.</li>
<li><b>Promoción/comunicación:</b> publicidad, promoción de ventas, relaciones públicas, venta personal y marketing digital.</li>
</ul>
<h3>Investigación de mercados</h3>
<p>Fuentes secundarias (datos ya existentes) y primarias (encuestas, entrevistas, observación, experimentación). Pasos: definir el problema, diseñar la investigación, recoger datos, analizarlos y presentar conclusiones.</p>
<h3>Cuota de mercado</h3>
<div class="formula">$$\text{Cuota} = \frac{\text{Ventas de la empresa}}{\text{Ventas totales del mercado}}\times 100$$</div>`,
        steps: ['Identifica la variable del mix sobre la que pregunta el caso.', 'Define el concepto (estrategia de precio, canal, fase del ciclo…).', 'Relaciónalo con el producto y el público del enunciado.', 'Propón una acción concreta.'],
        mistakes: ['Confundir promoción de ventas con publicidad.', 'Confundir segmentar con posicionar.', 'Situar mal la fase del ciclo de vida (las ventas crecen más rápido en la fase de crecimiento).', 'Hablar de «precio barato» sin nombrar la estrategia (penetración).'],
      },
      produccion: {
        html: T`
<h3>Umbral de rentabilidad (punto muerto)</h3>
<div class="formula">$$Q^* = \frac{CF}{p - cv}\qquad B = Q(p - cv) - CF$$</div>
<p>$p - cv$ es el <b>margen de contribución unitario</b>: lo que cada unidad aporta para cubrir costes fijos. Por encima de $Q^*$ hay beneficios.</p>
<h3>Producir o comprar</h3>
<div class="formula">$$CF + cv\cdot Q = p_{\text{compra}}\cdot Q \;\Rightarrow\; Q = \frac{CF}{p_{\text{compra}} - cv}$$</div>
<p>Si se necesitan más unidades que ese $Q$, interesa producir; si menos, comprar fuera.</p>
<h3>Productividad</h3>
<div class="formula">$$\text{Prod. de la mano de obra} = \frac{\text{Producción}}{\text{nº trabajadores}\times\text{horas}}\qquad \text{Prod. global} = \frac{\sum \text{producción}\cdot\text{precio}}{\sum\text{factores}\cdot\text{coste}}$$</div>
<p>Tasa de variación: $\frac{P_1 - P_0}{P_0}\times100$.</p>
<h3>I+D+i y calidad</h3>
<p>Investigación básica y aplicada, desarrollo e innovación. La gestión de la calidad total (TQM) y las normas ISO buscan la mejora continua.</p>`,
        steps: ['Identifica costes fijos, costes variables unitarios y precio.', 'Calcula el umbral de rentabilidad.', 'Representa ingresos y costes si lo piden (gráfico con $Q^*$).', 'Interpreta: «a partir de 2.000 unidades la empresa obtiene beneficios».'],
        mistakes: ['Incluir costes variables en $CF$.', 'Dar el umbral en euros cuando lo piden en unidades (o al revés).', 'Calcular la productividad global sin homogeneizar en euros.', 'Olvidar interpretar el signo de la variación de productividad.'],
      },
      inventarios: {
        html: T`
<h3>Modelo de Wilson (pedido óptimo)</h3>
<div class="formula">$$Q^* = \sqrt{\frac{2\,K\,D}{g}}$$</div>
<p>$K$ = coste de emisión de cada pedido, $D$ = demanda anual, $g$ = coste de almacenamiento por unidad y año.</p>
<div class="formula">$$\text{Nº de pedidos} = \frac{D}{Q^*}\qquad \text{Stock medio} = \frac{Q^*}{2}+SS\qquad \text{Punto de pedido} = d\cdot PE + SS$$</div>
<h3>Valoración de existencias</h3>
<ul>
<li><b>PMP (precio medio ponderado):</b> tras cada entrada, precio medio = valor total / unidades totales.</li>
<li><b>FIFO:</b> las primeras unidades en entrar son las primeras en salir.</li>
</ul>
<p>En época de inflación, FIFO valora las existencias finales más alto que PMP.</p>
<h3>Clasificación ABC</h3>
<p>A: pocos artículos que suponen la mayor parte del valor (control estricto). B: intermedios. C: muchos artículos de poco valor (control más relajado).</p>`,
        steps: ['Ordena los movimientos por fecha en una ficha de almacén (entradas, salidas, existencias).', 'Aplica PMP o FIFO línea a línea.', 'Para Wilson, comprueba que todo esté en unidades anuales.', 'Interpreta el resultado.'],
        mistakes: ['Mezclar en FIFO el precio de lotes diferentes.', 'Recalcular el PMP en las salidas (solo cambia con las entradas).', 'Usar demanda mensual con coste de almacén anual en Wilson.', 'Olvidar el stock de seguridad.'],
      },
      contabilidad: {
        html: T`
<h3>Estructura del balance</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Activo</th><th>Patrimonio neto y pasivo</th></tr></thead><tbody>
<tr><td><b>No corriente:</b> inmovilizado intangible (aplicaciones informáticas, patentes), material (terrenos, construcciones, maquinaria, mobiliario, equipos informáticos, elementos de transporte) e inversiones financieras a largo plazo. Restando amortizaciones acumuladas.</td><td><b>Patrimonio neto:</b> capital social, reservas, resultado del ejercicio, subvenciones.</td></tr>
<tr><td><b>Corriente:</b> existencias, realizable (clientes, deudores) y disponible (caja, bancos).</td><td><b>Pasivo no corriente:</b> deudas a largo plazo (préstamos a más de un año).<br><b>Pasivo corriente:</b> proveedores, acreedores, deudas a corto plazo.</td></tr>
</tbody></table></div>
<div class="formula">$$\text{Activo} = \text{Patrimonio neto} + \text{Pasivo}$$</div>
<h3>Cuenta de pérdidas y ganancias</h3>
<div class="formula">$$\begin{aligned}&\text{Ingresos de explotación} - \text{Gastos de explotación} = \text{BAII (resultado de explotación)}\\ &\text{BAII} + \text{Ingresos financieros} - \text{Gastos financieros} = \text{BAI}\\ &\text{BAI} - \text{Impuesto sobre beneficios} = \text{Resultado del ejercicio (BN)}\end{aligned}$$</div>
<h3>Fondo de maniobra</h3>
<div class="formula">$$FM = \text{Activo corriente} - \text{Pasivo corriente} = (\text{PN} + \text{Pasivo no corriente}) - \text{Activo no corriente}$$</div>
<p>Si $FM \gt  0$, la empresa puede atender sus deudas a corto plazo (equilibrio financiero normal). Si $FM \lt  0$, hay riesgo de suspensión de pagos.</p>`,
        steps: ['Clasifica cada cuenta en su masa patrimonial.', 'Ojo con las amortizaciones acumuladas: restan del activo.', 'Calcula el capital (o el resultado) como cifra de cuadre si falta.', 'Comprueba que Activo = PN + Pasivo.', 'Calcula el fondo de maniobra e interprétalo.'],
        mistakes: ['Poner las amortizaciones acumuladas en el pasivo.', 'Clasificar un préstamo a 5 años entero como no corriente cuando parte vence en el año.', 'Confundir proveedores (pasivo) con clientes (activo).', 'Poner el resultado del ejercicio fuera del patrimonio neto.'],
      },
      analisis: {
        html: T`
<h3>Ratios financieros</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Ratio</th><th>Fórmula</th><th>Valor orientativo</th></tr></thead><tbody>
<tr><td>Liquidez (solvencia a c/p)</td><td>$\frac{AC}{PC}$</td><td>1,5 – 2</td></tr>
<tr><td>Tesorería (prueba ácida)</td><td>$\frac{\text{Realizable} + \text{Disponible}}{PC}$</td><td>≈ 1</td></tr>
<tr><td>Disponibilidad</td><td>$\frac{\text{Disponible}}{PC}$</td><td>0,1 – 0,3</td></tr>
<tr><td>Garantía (solvencia total)</td><td>$\frac{\text{Activo total}}{\text{Pasivo total}}$</td><td>&gt; 1,5</td></tr>
<tr><td>Endeudamiento</td><td>$\frac{\text{Pasivo total}}{PN + \text{Pasivo}}$</td><td>0,4 – 0,6</td></tr>
</tbody></table></div>
<h3>Rentabilidades</h3>
<div class="formula">$$RE = \frac{BAII}{\text{Activo total}}\times100 \qquad RF = \frac{BN}{\text{Patrimonio neto}}\times100$$</div>
<p>La rentabilidad económica mide lo que rinden los activos; la financiera, lo que rinde el dinero de los propietarios. Si $RE \gt $ coste de la deuda, endeudarse aumenta la $RF$ (apalancamiento financiero positivo).</p>
<h3>Situaciones patrimoniales</h3>
<ol>
<li><b>Estabilidad total:</b> todo financiado con PN.</li>
<li><b>Equilibrio normal:</b> $FM \gt  0$.</li>
<li><b>Desequilibrio a corto plazo:</b> $FM \lt  0$ (suspensión de pagos).</li>
<li><b>Quiebra:</b> patrimonio neto negativo.</li>
</ol>`,
        steps: ['Calcula las masas patrimoniales necesarias.', 'Aplica cada ratio y redondea a 2 decimales.', 'Compara con los valores orientativos.', 'Concluye: liquidez, solvencia, endeudamiento y propuesta de mejora.'],
        mistakes: ['Usar el BN en la rentabilidad económica (es el BAII).', 'Interpretar un ratio de liquidez de 3 como «muy bueno» (indica recursos ociosos).', 'No dar recomendaciones cuando piden valorar la situación.', 'Confundir patrimonio neto con activo.'],
      },
      inversion: {
        html: T`
<h3>Valor Actual Neto (VAN)</h3>
<div class="formula">$$VAN = -A + \frac{Q_1}{1+k} + \frac{Q_2}{(1+k)^2} + \dots + \frac{Q_n}{(1+k)^n}$$</div>
<p>$A$ = desembolso inicial, $Q_i$ = flujos netos de caja (cobros − pagos) y $k$ = tasa de descuento. Si $VAN \gt  0$, la inversión es rentable; entre varias, se elige la de mayor VAN.</p>
<h3>Tasa Interna de Rentabilidad (TIR)</h3>
<p>Es la tasa $r$ que hace $VAN = 0$. Si $TIR \gt  k$, la inversión es rentable. Con dos años de flujos se resuelve una ecuación de segundo grado haciendo $x = 1 + r$:</p>
<div class="formula">$$-A + \frac{Q_1}{x} + \frac{Q_2}{x^2} = 0 \;\Rightarrow\; A x^2 - Q_1 x - Q_2 = 0$$</div>
<h3>Plazo de recuperación (pay-back)</h3>
<p>Tiempo que tarda en recuperarse el desembolso inicial sumando los flujos (sin actualizar). Si en un año solo hace falta una parte del flujo, se calcula la fracción: $\text{meses} = \frac{\text{lo que falta}}{Q_i}\times 12$.</p>
<div class="table-wrap"><table class="data"><thead><tr><th>Método</th><th>Ventaja</th><th>Inconveniente</th></tr></thead><tbody>
<tr><td>Pay-back (estático)</td><td>Sencillo, mide la liquidez</td><td>No tiene en cuenta el valor del dinero en el tiempo ni los flujos posteriores</td></tr>
<tr><td>VAN (dinámico)</td><td>Considera el valor del dinero en el tiempo</td><td>Hay que fijar la tasa $k$</td></tr>
<tr><td>TIR (dinámico)</td><td>Da una rentabilidad en %</td><td>Difícil de calcular con muchos periodos</td></tr>
</tbody></table></div>`,
        steps: ['Calcula los flujos netos de cada año (cobros − pagos).', 'Escribe la fórmula con los datos antes de operar.', 'Opera con 2 decimales y no redondees los factores de descuento demasiado.', 'Decide qué proyecto elegir con cada criterio.', 'Explica por qué los métodos pueden dar resultados distintos.'],
        mistakes: ['Descontar el desembolso inicial (está en el año 0).', 'Usar cobros en vez de flujos netos.', 'Olvidar el signo negativo de $A$.', 'En el pay-back, no calcular la fracción de año en meses.'],
      },
      financiacion: {
        html: T`
<h3>Clasificación de las fuentes de financiación</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Criterio</th><th>Tipos</th></tr></thead><tbody>
<tr><td>Plazo</td><td>Corto plazo (menos de un año) y largo plazo</td></tr>
<tr><td>Propiedad</td><td>Propia (capital, reservas, amortizaciones) y ajena (préstamos, créditos, proveedores)</td></tr>
<tr><td>Procedencia</td><td>Interna o autofinanciación (reservas, amortizaciones) y externa</td></tr>
</tbody></table></div>
<h3>Fuentes más preguntadas</h3>
<ul>
<li><b>Préstamo:</b> se recibe todo el importe y se devuelve con intereses en cuotas. <b>Crédito:</b> límite disponible; se pagan intereses solo por lo utilizado.</li>
<li><b>Leasing:</b> alquiler con opción de compra al final. <b>Renting:</b> alquiler con mantenimiento, sin opción de compra.</li>
<li><b>Descuento comercial:</b> el banco anticipa el importe de letras o facturas de clientes cobrando una comisión e intereses.</li>
<li><b>Factoring:</b> se venden las facturas a una entidad que asume el cobro (y a veces el riesgo de impago).</li>
<li><b>Crédito comercial de proveedores:</b> aplazamiento del pago de las compras; no tiene coste explícito.</li>
<li><b>Ampliación de capital:</b> emisión de nuevas acciones; los antiguos accionistas tienen derecho de suscripción preferente.</li>
<li><b>Empréstitos:</b> emisión de obligaciones o bonos.</li>
</ul>
<h3>Coste de la financiación</h3>
<div class="formula">$$\text{Interés simple: } I = C\cdot i\cdot t\qquad \text{Coste efectivo} \approx \frac{\text{intereses} + \text{comisiones}}{\text{importe recibido}}$$</div>
<h3>Autofinanciación</h3>
<p><b>De mantenimiento</b> (amortizaciones y provisiones: conservan la capacidad productiva) y <b>de enriquecimiento</b> (reservas: hacen crecer la empresa).</p>`,
        steps: ['Clasifica la fuente según plazo, propiedad y procedencia.', 'Da ventajas e inconvenientes en el contexto del caso.', 'Si hay cálculo, separa intereses, comisiones e importe efectivo.', 'Recomienda la fuente adecuada al tipo de inversión (activo fijo → largo plazo).'],
        mistakes: ['Confundir préstamo y crédito.', 'Confundir leasing y renting.', 'Decir que las amortizaciones son financiación ajena.', 'Financiar un activo no corriente con deuda a corto plazo sin comentarlo.'],
      },
    },
  };
})(window.PAU);
