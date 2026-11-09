# PAU Madrid · Practica

Web para preparar la **PAU de la Comunidad de Madrid**. De momento incluye:

- **Matemáticas II**: álgebra, análisis, geometría, probabilidad y distribuciones.
- **Matemáticas Aplicadas a las Ciencias Sociales II**: matrices y sistemas, programación lineal, funciones, integrales, probabilidad e inferencia.
- **Economía de la Empresa** (*Empresa y Diseño de Modelos de Negocio*): formas jurídicas, entorno y estrategia, crecimiento, Canvas y *Lean Startup*, organización y RR. HH., marketing, producción, inventarios, contabilidad, análisis financiero, inversión y financiación.

## Qué ofrece

| | |
|---|---|
| 📚 **Teoría** | Resumen de cada tema con fórmulas, tablas y trucos para la PAU. También como **formulario imprimible** (o PDF). |
| ♾️ **Ejercicios generados** | 42 generadores (determinantes, sistemas, límites, derivadas, integrales, áreas, rectas y planos, Bayes, binomial, normal, intervalos de confianza, programación lineal, VAN, TIR, umbral de rentabilidad, productividad, Wilson, PMM, ratios, rentabilidades…). Cada ejercicio es distinto y trae su **solución paso a paso**. |
| ✅ **Corrección automática** | Admite fracciones (`3/4`), decimales con coma o punto, `e^2`, `sqrt(2)`, `pi`… Si un apartado está mal, ves el resultado correcto. |
| 📝 **Test y desarrollo** | 180 preguntas tipo test con explicación, 33 problemas tipo PAU y 26 preguntas de teoría de desarrollo, con solución completa y autoevaluación. |
| ⏱️ **Simulacros** | Examen cronometrado (90 min) con ejercicios al azar por bloques. Al entregar ves las soluciones y te puntúas cada ejercicio. |
| 🔁 **Repaso espaciado** | Lo que fallas vuelve a salir al cabo de 0, 1, 3, 7 y 16 días hasta que lo dominas. |
| 📈 **Progreso** | Dominio por tema, racha, mapa de actividad, historial de sesiones y simulacros, cuenta atrás hasta tu examen. Exportable/importable. |
| 🌗 **Detalles** | Modo oscuro, diseño adaptado al móvil, atajos de teclado (`Enter`, `1`–`4`) y funciona **sin conexión**. |

El progreso se guarda en el navegador (`localStorage`); no hay cuentas ni servidor.

> Los formatos de examen son **orientativos**. En Matemáticas II se sigue el modelo armonizado (ejercicios de 2 puntos) que ha adoptado Madrid. Consulta siempre los modelos oficiales que publican las universidades madrileñas.

## Cómo usarla

No hace falta instalar nada: es una web estática.

- **En local**: abre `index.html` en el navegador o, mejor, sirve la carpeta:
  ```bash
  python3 -m http.server 8000   # y abre http://localhost:8000
  ```
- **Publicarla gratis con GitHub Pages**: *Settings → Pages → Build and deployment → Deploy from a branch* y elige la rama y la carpeta `/ (root)`.

## Estructura

```
index.html
css/styles.css          Estilos (tema claro/oscuro, responsive)
js/core/util.js         RNG con semilla, fracciones exactas, formato, parser de respuestas, normal
js/core/registry.js     Registro de asignaturas, temas y generadores
js/core/store.js        Progreso, estadísticas y repaso espaciado (localStorage)
js/core/charts.js       Gráficas SVG (región factible, umbral de rentabilidad)
js/gen/mathgen.js       Generadores de Matemáticas
js/gen/econgen.js       Generadores de Economía
js/data/*.js            Teoría, preguntas y problemas de cada asignatura
js/app.js               Router y vistas
vendor/katex            KaTeX 0.16.11 (renderizado de fórmulas, licencia MIT)
tests/run.js            Test de integridad
```

### Añadir una asignatura nueva

Crea `js/data/<id>.js` con `PAU.addSubject({...})` (mira `eco.js` como ejemplo: bloques → temas → `theory`, `questions`, `problems`, `gens`), añádelo en `index.html` y listo. Las fórmulas se escriben en LaTeX entre `$…$` o `$$…$$`.

## Tests

```bash
npm i --no-save katex@0.16.11   # opcional: valida también todo el LaTeX
node tests/run.js 500           # 500 ejercicios por generador
```

Comprueba que cada generador produce enunciados y soluciones válidos, que el corrector acepta la respuesta correcta y rechaza las incorrectas, que el contenido estático es coherente, que los simulacros se pueden montar y que todo el LaTeX compila.
