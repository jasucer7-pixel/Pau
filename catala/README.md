# Endavant · català A2

Web para aprender catalán desde el castellano y preparar el certificado **A2**. Es estática y no necesita instalación: abre `catala/index.html` con un servidor local o publícala con GitHub Pages (quedará en `…/catala/`).

```bash
cd catala && python3 -m http.server 8000   # y abre http://localhost:8000
```

## Qué incluye

| Sección | Contenido |
|---|---|
| **Inici** | Dónde te quedaste en el curso, palabras para repasar hoy, racha y progreso por unidades. |
| **Curs** | 8 unidades ordenadas (de «Hola! Qui ets?» a «A punt per a l'examen»). Cada una reúne palabras, gramática, verbos, lectura, audio, redacción y oral, y acaba con una prueba. Dentro de una unidad, cada página muestra en qué paso estás y el botón al siguiente. |
| **Repàs** | Repaso espaciado diario de las palabras (cajas de Leitner). |
| **Biblioteca** | Todo el contenido por tipo: ~460 palabras en 14 temas, 21 unidades de gramática, conjugador de 40 verbos en 6 tiempos, 9 lecturas, 8 audiciones, dictado, 8 redacciones con modelo y detector de castellanismos, expresión oral y pronunciación. |
| **Examen** | Simulacro aleatorio con las cuatro partes y resultados guardados. |

El audio usa la voz del sistema (Web Speech API): catalana si está instalada y, si no, una castellana como reserva. *Ajustos → Àudio* indica qué voz se usa y cómo instalar la catalana; si el navegador no tiene voz (algunas apps de Android), la web lo avisa. El progreso se guarda en el navegador y se puede copiar como texto para pasarlo a otro dispositivo.

## Estructura

```
index.html
css/app.css
js/data-vocab.js     Vocabulario por temas
js/data-grammar.js   Unidades de gramática y ejercicios
js/data-verbs.js     Verbos y generador de conjugaciones
js/data-skills.js    Lecturas, audiciones, dictados, redacciones, oral y consejos
js/data-course.js    Unidades del curso (y el contenido propio de las unidades 1 y 2)
js/app.js            Router, vistas, repaso espaciado y corrección
tests/run.js         Test de integridad: node catala/tests/run.js
```
