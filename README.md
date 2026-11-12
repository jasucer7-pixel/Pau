# PAU Madrid · Exámenes y práctica

Web para preparar la **PAU de la Comunidad de Madrid** con todos los exámenes oficiales ordenados por tipos. De momento cubre tres asignaturas:

- **Matemáticas II**
- **Matemáticas Aplicadas a las Ciencias Sociales II**
- **Economía de la Empresa / Empresa y Diseño de Modelos de Negocio**

## Secciones de cada asignatura

| Sección | Qué hay |
|---|---|
| **Ejercicios PAU** | Todos los ejercicios de los exámenes oficiales (2018–2026 y el modelo del curso 2026-27), **clasificados por tipo** (sistemas, integrales, programación lineal, VAN/TIR, balance…). Cada ejercicio muestra el enunciado original y su **solución oficial** (o los criterios de corrección cuando la universidad no publicó soluciones). Se pueden filtrar por convocatoria y año. |
| **Exámenes** | Cada examen completo tal y como se puso, para verlo con soluciones o hacerlo en **modo examen** (cronómetro de 90 minutos y soluciones ocultas hasta terminar). |
| **Teoría** | Resumen de cada tema con fórmulas, ejemplos y trucos, con enlaces a los ejercicios PAU de ese tema. |
| **Practicar** | Ejercicios generados al momento (42 generadores) con corrección automática y solución paso a paso, y preguntas tipo test. |
| **Formulario** | Toda la teoría de la asignatura en una página imprimible. |

> **Nuevo:** en [`catala/`](catala/) hay una web aparte, *Endavant*, para aprender catalán y preparar el certificado A2.

No se guarda ningún progreso ni datos personales: solo la preferencia de tema claro/oscuro.

## De dónde salen los exámenes

Los enunciados y las soluciones son los **documentos oficiales** de las universidades públicas de Madrid, publicados por la Universidad Complutense en [ucm.es](https://www.ucm.es/centros-adscritos-a-la-ucm) (ejercicios de cada convocatoria ordinaria y extraordinaria, con criterios de corrección y soluciones). Cada ejercicio enlaza al PDF original.

Los ejercicios se recortan automáticamente de esos PDF (como imagen, para que las fórmulas sean idénticas al original) y se clasifican por tipo según su contenido. Dos PDF de 2019 (Economía y Matemáticas CCSS, convocatoria extraordinaria, segundo examen) son escaneados sin texto y no se han podido recortar.

## Cómo usarla

Es una web estática: no hace falta instalar nada.

```bash
python3 -m http.server 8000   # y abre http://localhost:8000
```

También se puede publicar gratis con GitHub Pages (*Settings → Pages → Deploy from a branch*).

## Estructura

```
index.html
css/styles.css           Estilos (tema claro/oscuro, responsive)
js/core/util.js          RNG con semilla, fracciones, formato, parser de respuestas, normal
js/core/registry.js      Registro de asignaturas, temas y generadores
js/core/charts.js        Gráficas SVG de las soluciones
js/gen/*.js              Generadores de ejercicios
js/data/mat2.js …        Teoría, test y ejemplos de cada asignatura
js/data/pau-types.js     Tipos de ejercicio PAU de cada asignatura
pau/<asignatura>.js      Índice de ejercicios oficiales (generado)
pau/img/                 Enunciados y soluciones recortados de los PDF oficiales
js/app.js                Router y vistas
tools/                   Scripts para descargar, recortar y clasificar los exámenes
tests/run.js             Test de integridad
```

## Regenerar la recopilación

Los scripts de `tools/` descargan los PDF de la UCM, recortan cada ejercicio y su solución y los clasifican (necesitan `pdftotext`/`pdftoppm` de Poppler y Python con Pillow):

```bash
tools/fetch.sh work                                            # descarga los PDF e index.tsv
python3 tools/segment.py work/index.tsv work/pdf work/out      # recorta enunciados y soluciones
python3 tools/classify.py work/out/items.json tools/overrides.json > work/classified.json
python3 tools/build.py work/classified.json work/out .         # genera pau/*.js y pau/img/
```

`tools/overrides.json` contiene la revisión manual de la clasificación por tipos.

## Tests

```bash
npm i --no-save katex@0.16.11   # opcional: valida también el LaTeX
node tests/run.js 300
```
