/* Tipos de ejercicio de la PAU por asignatura (para la recopilación de exámenes oficiales). */
(function (P) {
  'use strict';
  P.pauTypes = {
    mat2: [
      { group: 'Álgebra', id: 'sistemas', name: 'Sistemas de ecuaciones', desc: 'Discusión según un parámetro (Rouché), resolución y problemas que se plantean con un sistema.', topics: ['sistemas'] },
      { group: 'Álgebra', id: 'matrices', name: 'Matrices y determinantes', desc: 'Operaciones, potencias, inversa, rango, ecuaciones matriciales y propiedades de los determinantes.', topics: ['matrices'] },
      { group: 'Análisis', id: 'limites', name: 'Límites, continuidad y asíntotas', desc: 'Cálculo de límites, continuidad y derivabilidad de funciones a trozos, asíntotas.', topics: ['limites'] },
      { group: 'Análisis', id: 'teoremas', name: 'Teoremas (Bolzano, Rolle, valor medio)', desc: 'Existencia y número de soluciones, aplicación de los teoremas de funciones continuas y derivables.', topics: ['limites', 'derivadas'] },
      { group: 'Análisis', id: 'derivadas', name: 'Derivadas y estudio de funciones', desc: 'Recta tangente, monotonía, extremos, curvatura, representación y cálculo de parámetros.', topics: ['derivadas'] },
      { group: 'Análisis', id: 'optimizacion', name: 'Optimización', desc: 'Problemas de máximos y mínimos con enunciado.', topics: ['derivadas'] },
      { group: 'Análisis', id: 'integrales', name: 'Integrales y áreas', desc: 'Primitivas, integral definida, regla de Barrow y áreas de recintos.', topics: ['integrales'] },
      { group: 'Geometría', id: 'rectasplanos', name: 'Rectas y planos', desc: 'Ecuaciones, posiciones relativas, intersecciones, planos y rectas que cumplen condiciones.', topics: ['rectasplanos'] },
      { group: 'Geometría', id: 'metrica', name: 'Distancias, ángulos, áreas y volúmenes', desc: 'Problemas métricos: distancias, ángulos, proyecciones, simétricos, áreas y volúmenes.', topics: ['metrica'] },
      { group: 'Probabilidad', id: 'probabilidad', name: 'Probabilidad', desc: 'Sucesos, probabilidad condicionada, independencia, probabilidad total y Bayes.', topics: ['probabilidad'] },
      { group: 'Probabilidad', id: 'distribuciones', name: 'Distribución binomial y normal', desc: 'Variables aleatorias, binomial, normal y aproximación de la binomial por la normal.', topics: ['distribuciones'] },
    ],
    matccss: [
      { group: 'Álgebra', id: 'matrices', name: 'Matrices y ecuaciones matriciales', desc: 'Operaciones, potencias, inversa y ecuaciones matriciales.', topics: ['matrices'] },
      { group: 'Álgebra', id: 'sistemas', name: 'Sistemas de ecuaciones', desc: 'Planteamiento de problemas, discusión con parámetro y resolución.', topics: ['matrices'] },
      { group: 'Álgebra', id: 'pl', name: 'Programación lineal', desc: 'Región factible, vértices y optimización de una función objetivo.', topics: ['pl'] },
      { group: 'Análisis', id: 'funciones', name: 'Funciones y derivadas', desc: 'Continuidad, derivabilidad, asíntotas, monotonía, extremos y problemas de contexto.', topics: ['funciones'] },
      { group: 'Análisis', id: 'integrales', name: 'Integrales y áreas', desc: 'Primitivas, integral definida y áreas.', topics: ['integrales'] },
      { group: 'Estadística y probabilidad', id: 'probabilidad', name: 'Probabilidad', desc: 'Sucesos, tablas de contingencia, condicionada, probabilidad total y Bayes.', topics: ['probabilidad'] },
      { group: 'Estadística y probabilidad', id: 'inferencia', name: 'Distribución normal e inferencia', desc: 'Probabilidades con la normal, media muestral, intervalos de confianza, error y tamaño de la muestra.', topics: ['inferencia'] },
    ],
    eco: [
      { group: 'Problemas numéricos', id: 'p-productividad', name: 'Productividad', desc: 'Productividad de un factor, productividad global y tasas de variación.', topics: ['produccion'] },
      { group: 'Problemas numéricos', id: 'p-costes', name: 'Costes y umbral de rentabilidad', desc: 'Punto muerto, costes fijos y variables, beneficio y decisión de fabricar o comprar.', topics: ['produccion'] },
      { group: 'Problemas numéricos', id: 'p-inversion', name: 'Selección de inversiones (VAN, TIR, pay-back)', desc: 'Valor actual neto, tasa interna de rentabilidad y plazo de recuperación.', topics: ['inversion'] },
      { group: 'Problemas numéricos', id: 'p-balance', name: 'Balance, fondo de maniobra y ratios', desc: 'Ordenar el balance por masas patrimoniales, fondo de maniobra y ratios financieros.', topics: ['contabilidad', 'analisis'] },
      { group: 'Problemas numéricos', id: 'p-resultados', name: 'Cuenta de resultados y rentabilidad', desc: 'Cuenta de pérdidas y ganancias, rentabilidad económica y financiera.', topics: ['contabilidad', 'analisis'] },
      { group: 'Problemas numéricos', id: 'p-pmm', name: 'Periodo medio de maduración', desc: 'Subperiodos, PMM económico y financiero.', topics: ['analisis'] },
      { group: 'Problemas numéricos', id: 'p-inventarios', name: 'Inventarios (FIFO, PMP, Wilson)', desc: 'Valoración de existencias y gestión de inventarios.', topics: ['inventarios'] },
      { group: 'Preguntas de teoría', id: 't-empresa', name: 'La empresa y sus formas jurídicas', desc: 'Concepto y funciones de la empresa, empresario, clases de empresas, formas jurídicas y RSC.', topics: ['formas'] },
      { group: 'Preguntas de teoría', id: 't-entorno', name: 'Entorno y estrategia', desc: 'Entorno genérico y específico, Porter, DAFO, estrategias competitivas.', topics: ['entorno'] },
      { group: 'Preguntas de teoría', id: 't-crecimiento', name: 'Crecimiento, localización y multinacionales', desc: 'Crecimiento interno y externo, integración, diversificación, pymes, multinacionales y localización.', topics: ['crecimiento'] },
      { group: 'Preguntas de teoría', id: 't-modelo', name: 'Modelo de negocio e innovación', desc: 'Canvas, propuesta de valor, emprendimiento, I+D+i y metodologías de innovación.', topics: ['canvas'] },
      { group: 'Preguntas de teoría', id: 't-organizacion', name: 'Organización y recursos humanos', desc: 'Funciones directivas, estructuras, motivación, liderazgo y gestión de personas.', topics: ['organizacion'] },
      { group: 'Preguntas de teoría', id: 't-marketing', name: 'Marketing', desc: 'Investigación de mercados, segmentación, marketing mix, ciclo de vida y precios.', topics: ['marketing'] },
      { group: 'Preguntas de teoría', id: 't-produccion', name: 'Producción y aprovisionamiento', desc: 'Proceso productivo, eficiencia, costes, calidad, inventarios.', topics: ['produccion', 'inventarios'] },
      { group: 'Preguntas de teoría', id: 't-finanzas', name: 'Patrimonio, inversión y financiación', desc: 'Masas patrimoniales, cuentas anuales, análisis financiero, inversión y fuentes de financiación.', topics: ['contabilidad', 'analisis', 'inversion', 'financiacion'] },
    ],
  };
  P.pau = P.pau || {};
  P.addPau = function (sid, data) { P.pau[sid] = data; };
})(window.PAU);
