# Endavant · català A2

Web para aprender catalán desde el castellano y preparar el certificado **A2**. Es estática y no necesita instalación: abre `catala/index.html` con un servidor local o publícala con GitHub Pages (quedará en `…/catala/`).

```bash
cd catala && python3 -m http.server 8000   # y abre http://localhost:8000
```

## Qué incluye

| Sección | Contenido |
|---|---|
| **Inici** | Plan del día (repaso, una unidad de gramática, una destreza, verbos), racha de días, XP y progreso por destrezas. |
| **Paraules** | ~460 palabras y expresiones A2 en 14 temas (incluidos números y *falsos amics*). Tarjetas con repaso espaciado (cajas de Leitner), test y modo escribir. |
| **Gramàtica** | 21 unidades con explicación en castellano y ejercicios corregidos (elección, escribir, ordenar frases). |
| **Verbs** | Conjugador de 40 verbos en 6 tiempos y entrenamiento para escribir las formas. |
| **Pràctica** | Comprensión lectora (7 textos), comprensión oral (6 diálogos), dictado palabra a palabra, expresión escrita (6 tareas con modelo y detector de castellanismos), expresión oral (monólogos con cronómetro y juegos de rol) y pronunciación. |
| **Examen** | Simulacro aleatorio con las cuatro partes y resultados guardados. |

El audio usa la voz catalana del sistema (Web Speech API). Si el dispositivo no tiene ninguna, *Ajustos* explica cómo instalarla. El progreso se guarda en el navegador y se puede copiar como texto para pasarlo a otro dispositivo.

## Estructura

```
index.html
css/app.css
js/data-vocab.js     Vocabulario por temas
js/data-grammar.js   Unidades de gramática y ejercicios
js/data-verbs.js     Verbos y generador de conjugaciones
js/data-skills.js    Lecturas, audiciones, dictados, redacciones, oral y consejos
js/app.js            Router, vistas, repaso espaciado y corrección
tests/run.js         Test de integridad: node catala/tests/run.js
```
