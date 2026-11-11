/* Economía de la Empresa / Empresa y Diseño de Modelos de Negocio — PAU Comunidad de Madrid */
(function (P) {
  'use strict';
  const T = P.T;
  const th = (prompt, solution) => ({ kind: 'teoria', points: 1, prompt, solution });

  P.addSubject({
    id: 'eco', name: 'Economía de la Empresa', short: 'Economía', icon: '€', color: '#9a3f1c',
    desc: 'Empresa y Diseño de Modelos de Negocio (EDMN). Teoría tipo test, preguntas de desarrollo y problemas numéricos.',
    exam: {
      duration: 90,
      info: 'Formato actual (PAU 2026): 4 preguntas basadas en casos. Las preguntas 1 y 3 valen 2 puntos y las 2 y 4, 3 puntos; dentro de cada una hay apartados obligatorios y otros a elegir. 90 minutos. Hasta 2024 se elegía entre la opción A y la B (4 cuestiones teóricas y 2 problemas).',
    },
    blocks: [
      {
        id: 'empresa', name: 'La empresa y su entorno', topics: [
          {
            id: 'formas', name: 'Empresa, empresario y formas jurídicas', summary: 'Funciones de la empresa, teorías del empresario, clasificación y formas jurídicas.',
            gens: [],
            theory: T`
<h3>La empresa</h3>
<p>Unidad económica de producción que combina factores productivos (trabajo, capital, recursos naturales) para obtener bienes y servicios que vende en el mercado, con el objetivo principal de obtener <b>beneficios</b>. Funciones: <b>producir</b> bienes y servicios, <b>crear valor</b> (utilidad), generar empleo y renta, asumir riesgos e impulsar la innovación.</p>
<h3>Teorías sobre el empresario</h3>
<ul><li><b>Knight</b>: el empresario es quien asume el <b>riesgo</b> (y por eso recibe el beneficio).</li>
<li><b>Schumpeter</b>: el empresario es un <b>innovador</b> que introduce nuevos productos, procesos o mercados («destrucción creativa»).</li>
<li><b>Galbraith</b>: en las grandes empresas el poder lo tiene la <b>tecnoestructura</b> (directivos y técnicos), no los propietarios.</li>
<li>Distinción entre <b>empresario-propietario</b> (aporta capital) y <b>directivo/gerente</b> (gestiona).</li></ul>
<h3>Clasificación de empresas</h3>
<ul><li><b>Sector</b>: primario, secundario, terciario (y cuaternario: conocimiento).</li>
<li><b>Tamaño</b> (criterio UE): micro (&lt;10 trabajadores y ≤2 M€), pequeña (&lt;50 y ≤10 M€), mediana (&lt;250 y ≤50 M€ de facturación o ≤43 M€ de balance), grande.</li>
<li><b>Titularidad</b>: privada, pública, mixta. <b>Ámbito</b>: local, regional, nacional, multinacional.</li></ul>
<h3>Formas jurídicas</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Forma</th><th>Socios</th><th>Capital mínimo</th><th>Responsabilidad</th></tr></thead><tbody>
<tr><td>Empresario individual (autónomo)</td><td>1</td><td>No hay</td><td>Ilimitada</td></tr>
<tr><td>Sociedad colectiva</td><td>≥2</td><td>No hay</td><td>Ilimitada y solidaria</td></tr>
<tr><td>Sociedad comanditaria</td><td>≥2 (colectivos y comanditarios)</td><td>No hay (simple)</td><td>Colectivos ilimitada; comanditarios limitada</td></tr>
<tr><td>Sociedad Limitada (SL)</td><td>≥1</td><td>1 € (antes 3.000 €)*</td><td>Limitada al capital aportado</td></tr>
<tr><td>Sociedad Anónima (SA)</td><td>≥1</td><td>60.000 € (25 % desembolsado)</td><td>Limitada al capital aportado</td></tr>
<tr><td>Cooperativa</td><td>≥3 (primer grado)</td><td>El que fijen sus estatutos</td><td>Limitada</td></tr>
<tr><td>Sociedad laboral (SAL / SLL)</td><td>Mayoría del capital de trabajadores indefinidos</td><td>El de SA o SL</td><td>Limitada</td></tr>
</tbody></table></div>
<p class="muted">* Ley 18/2022 «Crea y Crece»: la SL puede constituirse con 1 €; mientras su capital sea inferior a 3.000 € tiene reglas especiales de reserva legal.</p>
<ul><li><b>SL</b>: capital dividido en <b>participaciones</b>, transmisión restringida (derecho preferente de los socios). Órganos: Junta General y administradores.</li>
<li><b>SA</b>: capital dividido en <b>acciones</b> libremente transmisibles. Órganos: Junta General de accionistas y Consejo de Administración.</li>
<li><b>Cooperativa</b>: gestión democrática, <b>un socio, un voto</b>, con independencia del capital aportado.</li>
<li><b>Sociedad laboral</b>: ningún socio puede tener más de <b>un tercio</b> del capital (salvo excepciones legales).</li></ul>
<p class="tip"><b>Criterios para elegir forma jurídica:</b> responsabilidad, número de socios, capital necesario, fiscalidad (IRPF vs. Impuesto de Sociedades), trámites y costes de constitución.</p>`,
            questions: [
              { type: 'mc', prompt: 'El capital mínimo para constituir una Sociedad Anónima es:', options: ['3.000 €', '60.000 €', '1 €', 'No hay mínimo'], answer: 1, solution: '60.000 €, desembolsado al menos el 25 % en el momento de la constitución.' },
              { type: 'mc', prompt: 'En una sociedad colectiva, los socios responden de las deudas sociales de forma:', options: ['limitada al capital aportado', 'ilimitada y solidaria', 'solo con el patrimonio de la empresa', 'según su participación'], answer: 1, solution: 'Es una sociedad personalista: los socios responden personal, ilimitada y solidariamente.' },
              { type: 'mc', prompt: 'En una cooperativa, la toma de decisiones se rige por el principio de:', options: ['un voto por cada acción', 'un socio, un voto', 'voto ponderado por antigüedad', 'decide el consejo de administración'], answer: 1, solution: 'Gestión democrática: cada socio tiene un voto con independencia del capital que haya aportado.' },
              { type: 'mc', prompt: 'Según Schumpeter, el empresario es fundamentalmente:', options: ['quien asume el riesgo', 'un innovador', 'la tecnoestructura', 'el propietario del capital'], answer: 1, solution: 'Schumpeter destaca la innovación («destrucción creativa»). La teoría del riesgo es de Knight y la de la tecnoestructura, de Galbraith.' },
              { type: 'mc', prompt: 'Galbraith sostiene que en las grandes empresas el poder reside en:', options: ['los accionistas', 'la tecnoestructura', 'los trabajadores', 'el Estado'], answer: 1, solution: 'La tecnoestructura: el grupo de directivos y técnicos especialistas que toma las decisiones.' },
              { type: 'mc', prompt: 'El capital de una Sociedad Limitada se divide en:', options: ['acciones', 'participaciones', 'obligaciones', 'cuotas de cooperativista'], answer: 1, solution: 'Participaciones sociales, cuya transmisión está restringida.' },
              { type: 'mc', prompt: 'Una empresa con 120 trabajadores y una facturación de 30 millones de euros es, según la UE:', options: ['microempresa', 'pequeña', 'mediana', 'grande'], answer: 2, solution: 'Menos de 250 trabajadores y facturación ≤ 50 M€: mediana empresa.' },
              { type: 'mc', prompt: 'En una sociedad comanditaria, los socios comanditarios:', options: ['gestionan la empresa y responden ilimitadamente', 'aportan capital y responden de forma limitada', 'aportan solo trabajo', 'no existen'], answer: 1, solution: 'Los comanditarios aportan capital, no gestionan y su responsabilidad se limita a lo aportado; los colectivos gestionan y responden ilimitadamente.' },
              { type: 'mc', prompt: 'En una sociedad laboral, la mayoría del capital debe pertenecer a:', options: ['una entidad financiera', 'trabajadores con contrato indefinido', 'la administración pública', 'un único socio'], answer: 1, solution: 'Es su rasgo esencial; además ningún socio puede superar, con carácter general, un tercio del capital.' },
            ],
            problems: [
              th('Define empresa e indica tres de sus funciones.', T`<p>La <b>empresa</b> es una unidad económica de producción que coordina factores productivos (trabajo, capital y recursos naturales) bajo una dirección para producir bienes y servicios que vende en el mercado con ánimo de lucro.</p><p>Funciones: <b>1)</b> producir bienes y servicios que satisfacen necesidades; <b>2)</b> crear valor añadido (riqueza) y generar rentas (salarios, beneficios, impuestos); <b>3)</b> asumir riesgos y promover la innovación y el progreso tecnológico. (También: crear empleo, coordinar factores.)</p>`),
              th('Diferencia entre una Sociedad Anónima y una Sociedad Limitada (al menos tres diferencias).', T`<ul><li><b>Capital mínimo</b>: SA 60.000 € (desembolso mínimo 25 %); SL 1 € (antes 3.000 €), totalmente desembolsado.</li><li><b>División del capital</b>: SA en acciones; SL en participaciones.</li><li><b>Transmisión</b>: las acciones se transmiten libremente; las participaciones tienen restricciones (derecho de adquisición preferente de los socios).</li><li><b>Tamaño típico</b>: la SA es propia de grandes empresas (puede cotizar en Bolsa); la SL, de pymes.</li></ul><p>En ambas la responsabilidad de los socios es limitada al capital aportado.</p>`),
              th('Explica las teorías del empresario de Knight y de Schumpeter.', T`<p><b>Knight</b>: el empresario es quien asume el <b>riesgo</b> de la actividad, garantizando rentas fijas a los demás factores (salarios, intereses); el beneficio es la recompensa a ese riesgo no asegurable.</p><p><b>Schumpeter</b>: el empresario es un <b>innovador</b> que introduce nuevos productos, procesos, mercados o formas de organización, desplazando a lo existente («destrucción creativa») y generando beneficios temporales extraordinarios que impulsan el desarrollo económico.</p>`),
            ],
          },
          {
            id: 'entorno', name: 'Entorno y estrategia', summary: 'Entorno general y específico, DAFO, cinco fuerzas de Porter y estrategias competitivas.',
            gens: [],
            theory: T`
<h3>El entorno</h3>
<ul><li><b>Entorno general</b> (afecta a todas las empresas): análisis <b>PESTEL</b> — factores Políticos, Económicos, Socioculturales, Tecnológicos, Ecológicos (medioambientales) y Legales.</li>
<li><b>Entorno específico</b> (afecta a las empresas de un sector): clientes, proveedores, competidores, productos sustitutivos… Se analiza con las <b>cinco fuerzas de Porter</b>.</li></ul>
<h3>Las cinco fuerzas de Porter</h3>
<ol><li>Rivalidad entre los competidores existentes.</li><li>Amenaza de entrada de nuevos competidores (barreras de entrada).</li><li>Amenaza de productos sustitutivos.</li><li>Poder de negociación de los proveedores.</li><li>Poder de negociación de los clientes.</li></ol>
<h3>Análisis DAFO</h3>
<div class="table-wrap"><table class="data"><thead><tr><th></th><th>Positivo</th><th>Negativo</th></tr></thead><tbody>
<tr><td><b>Interno</b> (la empresa)</td><td>Fortalezas</td><td>Debilidades</td></tr>
<tr><td><b>Externo</b> (el entorno)</td><td>Oportunidades</td><td>Amenazas</td></tr></tbody></table></div>
<p>Estrategias CAME: <b>C</b>orregir debilidades, <b>A</b>frontar amenazas, <b>M</b>antener fortalezas, <b>E</b>xplotar oportunidades.</p>
<h3>Estrategias competitivas de Porter</h3>
<ul><li><b>Liderazgo en costes</b>: producir más barato que la competencia (economías de escala, eficiencia).</li>
<li><b>Diferenciación</b>: ofrecer un producto percibido como único (calidad, diseño, marca, servicio) que permite cobrar más.</li>
<li><b>Enfoque o segmentación</b>: concentrarse en un nicho de mercado, con costes o diferenciación.</li></ul>
<p>Misión (razón de ser), visión (lo que quiere llegar a ser) y valores guían la estrategia. Responsabilidad social corporativa (RSC): compromiso voluntario con la sociedad y el medio ambiente más allá de la ley.</p>
<p class="tip"><b>Truco:</b> en el DAFO, fortalezas y debilidades son <i>internas</i> (dependen de la empresa); oportunidades y amenazas son <i>externas</i>.</p>`,
            questions: [
              { type: 'mc', prompt: 'En un análisis DAFO, una nueva ley que favorece al sector es:', options: ['una fortaleza', 'una debilidad', 'una oportunidad', 'una amenaza'], answer: 2, solution: 'Es un factor externo y positivo → oportunidad.' },
              { type: 'mc', prompt: 'Contar con una plantilla muy cualificada es, en un DAFO:', options: ['una fortaleza', 'una oportunidad', 'una amenaza', 'una debilidad'], answer: 0, solution: 'Factor interno positivo → fortaleza.' },
              { type: 'mc', prompt: '¿Cuál NO es una de las cinco fuerzas de Porter?', options: ['Poder de negociación de los clientes', 'Amenaza de productos sustitutivos', 'Inflación', 'Amenaza de nuevos competidores'], answer: 2, solution: 'La inflación es un factor económico del entorno general (PESTEL), no una de las cinco fuerzas.' },
              { type: 'mc', prompt: 'Una marca de lujo que vende bolsos exclusivos a precios muy altos sigue una estrategia de:', options: ['liderazgo en costes', 'diferenciación', 'integración vertical', 'penetración'], answer: 1, solution: 'Ofrece un producto percibido como único y cobra un precio superior.' },
              { type: 'mc', prompt: 'El análisis PESTEL estudia:', options: ['el entorno general', 'el entorno específico', 'la estructura interna', 'la competencia directa'], answer: 0, solution: 'Factores políticos, económicos, sociales, tecnológicos, ecológicos y legales: entorno general.' },
              { type: 'mc', prompt: 'Las barreras de entrada en un sector están relacionadas con:', options: ['la amenaza de nuevos competidores', 'el poder de los proveedores', 'los productos sustitutivos', 'la rivalidad interna'], answer: 0, solution: 'Cuanto mayores son las barreras (inversión, patentes, economías de escala…), menor es la amenaza de nuevos entrantes.' },
              { type: 'mc', prompt: 'Una aerolínea low cost aplica principalmente una estrategia de:', options: ['diferenciación', 'liderazgo en costes', 'diversificación', 'descremado'], answer: 1, solution: 'Busca producir con costes mínimos para ofrecer los precios más bajos.' },
            ],
            problems: [
              th('Explica el análisis DAFO y pon un ejemplo de cada elemento para una empresa de comida a domicilio.', T`<p>El DAFO es una herramienta de diagnóstico estratégico que combina un <b>análisis interno</b> (fortalezas y debilidades) y un <b>análisis externo</b> (oportunidades y amenazas).</p><ul><li><b>Fortaleza</b>: app propia muy valorada por los usuarios.</li><li><b>Debilidad</b>: dependencia de repartidores subcontratados.</li><li><b>Oportunidad</b>: crecimiento del consumo online tras cambios de hábitos.</li><li><b>Amenaza</b>: entrada de grandes plataformas internacionales o regulación laboral más estricta.</li></ul>`),
              th('Explica las estrategias competitivas genéricas de Porter.', T`<p><b>Liderazgo en costes</b>: conseguir costes inferiores a los competidores (economías de escala, tecnología, eficiencia) para vender a precios más bajos o tener más margen. <b>Diferenciación</b>: lograr que el producto sea percibido como único (calidad, diseño, marca, servicio), lo que permite precios más altos y fidelidad. <b>Enfoque (segmentación)</b>: centrarse en un segmento concreto del mercado aplicando costes bajos o diferenciación solo en él.</p>`),
            ],
          },
          {
            id: 'crecimiento', name: 'Crecimiento e internacionalización', summary: 'Crecimiento interno y externo, integración, diversificación, pymes y multinacionales.',
            gens: [],
            theory: T`
<h3>Crecimiento interno y externo</h3>
<ul><li><b>Interno (orgánico)</b>: la empresa aumenta su capacidad con nuevas inversiones propias (nuevas fábricas, tiendas, productos). Más lento, pero mantiene el control.</li>
<li><b>Externo</b>: se adquieren o se unen empresas ya existentes:
<ul><li><b>Fusión pura</b>: dos empresas desaparecen y forman una nueva.</li><li><b>Fusión por absorción</b>: una empresa absorbe a otra, que desaparece.</li><li><b>Adquisición</b>: se compra una parte suficiente del capital para controlarla, sin que desaparezca.</li><li><b>Cooperación</b>: <i>joint venture</i> (empresa conjunta), franquicia, licencia, subcontratación, alianzas, consorcios, UTE.</li></ul></li></ul>
<h3>Matriz de Ansoff (estrategias de crecimiento)</h3>
<div class="table-wrap"><table class="data"><thead><tr><th></th><th>Productos actuales</th><th>Productos nuevos</th></tr></thead><tbody>
<tr><td><b>Mercados actuales</b></td><td>Penetración de mercado</td><td>Desarrollo de producto</td></tr>
<tr><td><b>Mercados nuevos</b></td><td>Desarrollo de mercado</td><td>Diversificación</td></tr></tbody></table></div>
<ul><li><b>Integración vertical</b> hacia atrás (controlar a proveedores) o hacia delante (controlar la distribución).</li>
<li><b>Integración horizontal</b>: con empresas de la misma fase productiva (competidores).</li>
<li><b>Diversificación</b>: relacionada (concéntrica) o no relacionada (conglomerado).</li></ul>
<h3>Pymes y multinacionales</h3>
<p><b>Pymes</b>: flexibilidad, trato cercano, adaptación; pero dificultades de financiación, menor poder negociador e I+D. <b>Multinacionales</b>: operan en varios países mediante filiales; ventajas de escala y deslocalización, aunque se les critica su poder y su impacto social.</p>
<p><b>Formas de internacionalización</b>: exportación, licencias, franquicias, <i>joint ventures</i>, filiales. <b>Globalización</b>: integración mundial de mercados favorecida por la tecnología y la liberalización.</p>`,
            questions: [
              { type: 'mc', prompt: 'Una empresa de automóviles compra a su principal proveedor de neumáticos. Es una integración:', options: ['horizontal', 'vertical hacia atrás', 'vertical hacia delante', 'diversificación no relacionada'], answer: 1, solution: 'Pasa a controlar una fase anterior de la cadena (proveedor): integración vertical hacia atrás.' },
              { type: 'mc', prompt: 'Vender un producto actual en un mercado nuevo (otro país) es, según Ansoff:', options: ['penetración', 'desarrollo de mercado', 'desarrollo de producto', 'diversificación'], answer: 1, solution: 'Producto actual + mercado nuevo = desarrollo de mercado.' },
              { type: 'mc', prompt: 'Cuando dos empresas se disuelven para crear una nueva sociedad se trata de:', options: ['fusión pura', 'fusión por absorción', 'adquisición', 'joint venture'], answer: 0, solution: 'En la fusión pura desaparecen ambas y se crea una entidad nueva.' },
              { type: 'mc', prompt: 'Una «joint venture» es:', options: ['una empresa conjunta creada por varias empresas', 'la compra de una empresa', 'un contrato de franquicia', 'una sociedad cooperativa'], answer: 0, solution: 'Dos o más empresas crean una nueva sociedad para un proyecto común, compartiendo riesgos.' },
              { type: 'mc', prompt: 'Abrir nuevas tiendas propias con fondos de la empresa es crecimiento:', options: ['externo', 'interno', 'por absorción', 'por cooperación'], answer: 1, solution: 'Crecimiento interno u orgánico: inversiones propias.' },
              { type: 'mc', prompt: 'Una cadena hotelera compra una empresa de software financiero. Es:', options: ['diversificación no relacionada (conglomerado)', 'integración horizontal', 'penetración de mercado', 'integración vertical'], answer: 0, solution: 'Nuevos productos en mercados sin relación con su actividad.' },
            ],
            problems: [
              th('Diferencia entre crecimiento interno y externo. Indica una ventaja de cada uno.', T`<p><b>Interno</b>: la empresa crece con inversiones propias en nuevos activos (ampliar instalaciones, abrir tiendas, lanzar productos). Ventaja: mantiene el control y la cultura; crecimiento más ordenado.</p><p><b>Externo</b>: crece adquiriendo, fusionándose o cooperando con otras empresas ya existentes. Ventaja: rapidez, adquiere cuota de mercado, tecnología y clientes de forma inmediata y reduce competidores.</p>`),
              th('Explica qué es la integración vertical y diferencia sus dos tipos con un ejemplo.', T`<p>Es una estrategia por la que la empresa pasa a realizar fases de la cadena productiva que antes realizaban otras empresas. <b>Hacia atrás</b>: asume actividades de sus proveedores (un fabricante de muebles compra un aserradero). <b>Hacia delante</b>: asume actividades de sus clientes o distribuidores (una marca de ropa abre tiendas propias).</p>`),
            ],
          },
        ],
      },
      {
        id: 'modelo', name: 'Modelo de negocio y organización', topics: [
          {
            id: 'canvas', name: 'Modelos de negocio e innovación', summary: 'Business Model Canvas, propuesta de valor, Lean Startup, Design Thinking e innovación.',
            gens: [],
            theory: T`
<h3>Modelo de negocio</h3>
<p>Describe cómo una organización <b>crea, entrega y captura valor</b>. La herramienta más usada es el <b>Business Model Canvas</b> (Osterwalder y Pigneur), con 9 bloques:</p>
<div class="canvas">
<div><b>Socios clave</b><span>Alianzas y proveedores imprescindibles</span></div>
<div><b>Actividades clave</b><span>Lo que hay que hacer bien</span></div>
<div class="tall"><b>Propuesta de valor</b><span>Qué problema resolvemos o qué necesidad satisfacemos</span></div>
<div><b>Relación con clientes</b><span>Personal, automatizada, comunidad…</span></div>
<div class="tall"><b>Segmentos de clientes</b><span>Para quién creamos valor</span></div>
<div><b>Recursos clave</b><span>Físicos, intelectuales, humanos, financieros</span></div>
<div><b>Canales</b><span>Cómo llegamos al cliente</span></div>
<div class="wide"><b>Estructura de costes</b><span>Principales costes del modelo</span></div>
<div class="wide"><b>Fuentes de ingresos</b><span>Venta, suscripción, publicidad, comisiones…</span></div>
</div>
<p>La parte derecha del lienzo se refiere al <b>cliente</b> (valor) y la izquierda a la <b>eficiencia</b> (cómo se produce).</p>
<h3>Metodologías de innovación</h3>
<ul><li><b>Design Thinking</b>: empatizar → definir → idear → prototipar → testear. Centrado en las personas usuarias.</li>
<li><b>Lean Startup</b> (Eric Ries): ciclo <b>construir–medir–aprender</b> con un <b>Producto Mínimo Viable</b> (PMV/MVP); si las hipótesis fallan, se <b>pivota</b>.</li>
<li><b>Mapa de empatía</b> y <b>lienzo de propuesta de valor</b>: alegrías (<i>gains</i>), frustraciones (<i>pains</i>) y tareas del cliente.</li></ul>
<h3>Innovación e I+D+i</h3>
<ul><li>Tipos de innovación: de <b>producto</b>, de <b>proceso</b>, organizativa y de marketing; <b>radical</b> (rompe con lo anterior) o <b>incremental</b> (mejoras).</li>
<li>Protección: patentes, modelos de utilidad, marcas, diseños industriales, derechos de autor.</li>
<li>Fuentes de ideas: problemas cotidianos, tendencias, tecnología, observación de clientes.</li></ul>`,
            questions: [
              { type: 'mc', prompt: '¿Cuántos bloques tiene el Business Model Canvas?', options: ['4', '7', '9', '12'], answer: 2, solution: 'Segmentos, propuesta de valor, canales, relaciones, ingresos, recursos, actividades, socios y costes.' },
              { type: 'mc', prompt: 'El Producto Mínimo Viable (PMV) es un concepto de la metodología:', options: ['Design Thinking', 'Lean Startup', 'DAFO', 'Matriz BCG'], answer: 1, solution: 'Lean Startup: versión mínima del producto para aprender del cliente con el menor esfuerzo posible.' },
              { type: 'mc', prompt: 'La primera fase del Design Thinking es:', options: ['prototipar', 'empatizar', 'testear', 'idear'], answer: 1, solution: 'Empatizar con el usuario para entender sus necesidades reales.' },
              { type: 'mc', prompt: 'En el Canvas, «qué problema resolvemos al cliente» corresponde al bloque:', options: ['Segmentos de clientes', 'Propuesta de valor', 'Actividades clave', 'Canales'], answer: 1, solution: 'La propuesta de valor es el conjunto de beneficios que la empresa ofrece al cliente.' },
              { type: 'mc', prompt: 'En Lean Startup, «pivotar» significa:', options: ['cerrar la empresa', 'cambiar una hipótesis fundamental del modelo tras validar que no funciona', 'subir los precios', 'contratar más personal'], answer: 1, solution: 'Cambio de rumbo estructurado basado en lo aprendido.' },
              { type: 'mc', prompt: 'Una mejora gradual en la batería de un móvil es una innovación:', options: ['radical', 'incremental', 'organizativa', 'de marketing'], answer: 1, solution: 'Mejora un producto existente sin cambiarlo de forma disruptiva.' },
              { type: 'mc', prompt: 'Un modelo de negocio por suscripción (p. ej., plataforma de música) afecta principalmente al bloque:', options: ['Fuentes de ingresos', 'Socios clave', 'Recursos clave', 'Estructura de costes'], answer: 0, solution: 'Define cómo la empresa obtiene ingresos de cada segmento.' },
            ],
            problems: [
              th('Explica qué es la propuesta de valor y su relación con los segmentos de clientes en el modelo Canvas.', T`<p>La <b>propuesta de valor</b> es el conjunto de productos y servicios que crean valor para un segmento concreto: el motivo por el que los clientes eligen a la empresa (resuelve un problema o satisface una necesidad: novedad, precio, diseño, comodidad, personalización…).</p><p>Está ligada a los <b>segmentos de clientes</b>: cada segmento tiene necesidades distintas, por lo que puede requerir una propuesta de valor diferente. Ambos bloques forman el núcleo del modelo: sin clientes que valoren la propuesta, no hay negocio.</p>`),
              th('Explica la metodología Lean Startup.', T`<p>Metodología para crear empresas en condiciones de incertidumbre que propone aprender rápidamente del mercado con el mínimo gasto. Se basa en el ciclo <b>construir–medir–aprender</b>: se formula una hipótesis, se construye un <b>producto mínimo viable</b>, se mide la reacción de clientes reales y se aprende. Con los resultados se decide <b>perseverar</b> o <b>pivotar</b> (cambiar algún elemento del modelo).</p>`),
            ],
          },
          {
            id: 'organizacion', name: 'Organización y recursos humanos', summary: 'Funciones directivas, estructuras organizativas, motivación, liderazgo y gestión de personas.',
            gens: [],
            theory: T`
<h3>Funciones de la dirección</h3>
<ol><li><b>Planificación</b>: fijar objetivos y cómo alcanzarlos (planes estratégicos, tácticos, operativos).</li>
<li><b>Organización</b>: diseñar la estructura, asignar tareas y recursos.</li>
<li><b>Gestión / dirección</b>: motivar, comunicar y liderar a las personas.</li>
<li><b>Control</b>: comparar resultados con objetivos y corregir desviaciones.</li></ol>
<p>Niveles directivos: alta dirección (estratégico), dirección intermedia (táctico) y dirección operativa o supervisores.</p>
<h3>Escuelas de organización</h3>
<ul><li><b>Taylor</b>: organización científica del trabajo (especialización, estudio de tiempos, incentivos).</li>
<li><b>Fayol</b>: teoría clásica, principios de administración (unidad de mando, jerarquía…).</li>
<li><b>Mayo</b>: escuela de las relaciones humanas (experimentos de Hawthorne): importancia de los factores sociales y del grupo.</li></ul>
<h3>Estructuras organizativas</h3>
<ul><li><b>Lineal o jerárquica</b>: autoridad directa, unidad de mando. Sencilla pero rígida.</li>
<li><b>Funcional</b>: cada trabajador depende de varios especialistas.</li>
<li><b>Línea-staff (lineo-funcional)</b>: jerárquica con órganos de asesoramiento (<i>staff</i>) sin autoridad directa.</li>
<li><b>Matricial</b>: combina departamentos funcionales y proyectos; doble dependencia.</li>
<li><b>Divisional</b>: por productos, zonas o clientes.</li></ul>
<p><b>Organización formal</b> (oficial, organigrama) e <b>informal</b> (relaciones espontáneas entre personas).</p>
<h3>Motivación</h3>
<ul><li><b>Maslow</b>: pirámide de necesidades — fisiológicas, seguridad, sociales (afiliación), estima (reconocimiento) y autorrealización.</li>
<li><b>Herzberg</b>: factores <b>higiénicos</b> (salario, condiciones; su ausencia desmotiva) y <b>motivadores</b> (logro, reconocimiento, responsabilidad).</li>
<li><b>McGregor</b>: teoría <b>X</b> (el trabajador evita el trabajo; hay que controlarlo) y teoría <b>Y</b> (el trabajador busca responsabilidades; hay que darle autonomía).</li></ul>
<h3>Liderazgo</h3>
<p>Estilos: <b>autoritario</b> (decide solo), <b>democrático</b> (participativo) y <b>laissez-faire</b> (liberal, delega todo).</p>
<h3>Gestión de recursos humanos</h3>
<p>Reclutamiento (interno/externo) → selección → contratación → formación → evaluación → retribución. Contrato de trabajo: acuerdo entre empresario y trabajador; tras la reforma laboral de 2021, el contrato indefinido es la norma y los temporales son causales. Convenio colectivo: acuerdo entre representantes de trabajadores y empresarios.</p>`,
            questions: [
              { type: 'mc', prompt: 'Comparar los resultados obtenidos con los objetivos previstos es la función de:', options: ['planificación', 'organización', 'dirección', 'control'], answer: 3, solution: 'El control detecta desviaciones y propone medidas correctoras.' },
              { type: 'mc', prompt: 'En la pirámide de Maslow, la necesidad situada en la cima es:', options: ['seguridad', 'estima', 'autorrealización', 'afiliación'], answer: 2, solution: 'Orden: fisiológicas, seguridad, sociales, estima, autorrealización.' },
              { type: 'mc', prompt: 'Según Herzberg, el salario es un factor:', options: ['motivador', 'higiénico', 'de autorrealización', 'irrelevante'], answer: 1, solution: 'Su ausencia genera insatisfacción, pero por sí solo no motiva a largo plazo.' },
              { type: 'mc', prompt: 'Un directivo que piensa que los trabajadores son vagos y necesitan control estricto sigue la teoría:', options: ['X de McGregor', 'Y de McGregor', 'de Herzberg', 'de las relaciones humanas'], answer: 0, solution: 'Teoría X: visión pesimista del trabajador.' },
              { type: 'mc', prompt: 'La estructura en la que los trabajadores dependen de un jefe funcional y de un jefe de proyecto es:', options: ['lineal', 'matricial', 'línea-staff', 'en comité'], answer: 1, solution: 'Matricial: doble dependencia.' },
              { type: 'mc', prompt: 'Los experimentos de Hawthorne se asocian a:', options: ['Taylor', 'Fayol', 'Elton Mayo', 'Maslow'], answer: 2, solution: 'Origen de la escuela de las relaciones humanas.' },
              { type: 'mc', prompt: 'El estilo de liderazgo en el que el líder delega casi todas las decisiones es:', options: ['autoritario', 'democrático', 'laissez-faire', 'burocrático'], answer: 2, solution: 'Laissez-faire o liberal: mínima intervención del líder.' },
              { type: 'mc', prompt: 'Los órganos de staff:', options: ['tienen autoridad jerárquica directa', 'asesoran pero no tienen autoridad de mando', 'son los trabajadores de base', 'son los accionistas'], answer: 1, solution: 'Asesoran a la línea jerárquica (departamento jurídico, gabinete de estudios…).' },
            ],
            problems: [
              th('Explica la teoría de la motivación de Maslow.', T`<p>Maslow ordena las necesidades humanas en una <b>pirámide</b>: 1) <b>fisiológicas</b> (alimento, descanso); 2) <b>seguridad</b> (estabilidad, empleo); 3) <b>sociales o de afiliación</b> (pertenencia al grupo); 4) <b>estima</b> (reconocimiento, prestigio); 5) <b>autorrealización</b> (desarrollar el propio potencial). Una necesidad solo motiva cuando las inferiores están razonablemente satisfechas. Aplicación: la empresa debe identificar en qué nivel está cada trabajador (salario y estabilidad, buen clima, reconocimiento, promoción y retos).</p>`),
              th('Describe las cuatro funciones de la dirección.', T`<ul><li><b>Planificar</b>: fijar objetivos, estrategias y planes para alcanzarlos.</li><li><b>Organizar</b>: establecer la estructura, dividir tareas, asignar recursos y responsabilidades.</li><li><b>Dirigir (gestionar)</b>: coordinar y motivar a las personas mediante liderazgo y comunicación.</li><li><b>Controlar</b>: medir resultados, compararlos con los objetivos y aplicar medidas correctoras.</li></ul>`),
            ],
          },
          {
            id: 'marketing', name: 'Marketing', summary: 'Investigación de mercados, segmentación, marketing mix (4P), ciclo de vida y matriz BCG.',
            gens: [],
            theory: T`
<h3>Mercado y segmentación</h3>
<p>La <b>investigación de mercados</b> recoge información (fuentes primarias: encuestas, entrevistas, observación; secundarias: estadísticas ya existentes). La <b>segmentación</b> divide el mercado en grupos homogéneos según criterios <b>geográficos</b>, <b>demográficos</b> (edad, renta…), <b>psicográficos</b> (estilo de vida, valores) y <b>conductuales</b> (frecuencia de uso, fidelidad). Cuota de mercado = ventas de la empresa / ventas totales del sector.</p>
<h3>Marketing mix (4P)</h3>
<ul><li><b>Producto</b>: atributos, marca, envase, gama, ciclo de vida.</li>
<li><b>Precio</b>: según costes, competencia o demanda. Estrategias: <b>descremado</b> (precio alto al principio), <b>penetración</b> (precio bajo para ganar cuota), precios psicológicos (9,99 €), de prestigio, diferenciales…</li>
<li><b>Distribución</b> (<i>place</i>): canal directo (sin intermediarios), corto (un intermediario) o largo (mayorista + minorista). Distribución intensiva, selectiva o exclusiva.</li>
<li><b>Promoción / comunicación</b>: publicidad, promoción de ventas, relaciones públicas, venta personal, marketing digital y redes sociales, <i>merchandising</i>.</li></ul>
<h3>Ciclo de vida del producto</h3>
<p><b>Introducción</b> (ventas bajas, pérdidas) → <b>crecimiento</b> (ventas y beneficios suben) → <b>madurez</b> (ventas máximas, competencia fuerte) → <b>declive</b> (caen las ventas).</p>
<h3>Matriz BCG</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Crecimiento del mercado \ Cuota</th><th>Alta cuota</th><th>Baja cuota</th></tr></thead><tbody>
<tr><td><b>Alto</b></td><td>⭐ Estrella</td><td>❓ Interrogante (dilema)</td></tr>
<tr><td><b>Bajo</b></td><td>🐄 Vaca lechera</td><td>🐕 Perro</td></tr></tbody></table></div>
<p>Las <b>vacas</b> generan liquidez que financia a <b>estrellas</b> e <b>interrogantes</b>; los <b>perros</b> suelen eliminarse.</p>
<p class="tip">Marketing digital: SEO/SEM, redes sociales, <i>influencers</i>, email marketing, marketing de contenidos. Marketing social y ecológico: valores, sostenibilidad.</p>`,
            questions: [
              { type: 'mc', prompt: 'Lanzar un producto tecnológico con un precio muy alto que luego va bajando es una estrategia de:', options: ['penetración', 'descremado', 'precio psicológico', 'precio de paquete'], answer: 1, solution: 'Descremado: se aprovecha a los clientes dispuestos a pagar más al principio.' },
              { type: 'mc', prompt: 'En la matriz BCG, un producto con alta cuota en un mercado de bajo crecimiento es:', options: ['estrella', 'vaca lechera', 'interrogante', 'perro'], answer: 1, solution: 'Genera mucha liquidez con poca inversión.' },
              { type: 'mc', prompt: 'Un canal de distribución con fabricante → minorista → consumidor es:', options: ['directo', 'corto', 'largo', 'exclusivo'], answer: 1, solution: 'Un solo intermediario: canal corto.' },
              { type: 'mc', prompt: 'La fase del ciclo de vida con las ventas más altas y competencia intensa es:', options: ['introducción', 'crecimiento', 'madurez', 'declive'], answer: 2, solution: 'En la madurez las ventas se estabilizan en su máximo.' },
              { type: 'mc', prompt: '¿Cuál NO es una de las 4P del marketing mix?', options: ['Producto', 'Precio', 'Personal', 'Promoción'], answer: 2, solution: 'Las 4P son producto, precio, distribución (place) y promoción.' },
              { type: 'mc', prompt: 'Segmentar según el estilo de vida de los consumidores es un criterio:', options: ['geográfico', 'demográfico', 'psicográfico', 'conductual'], answer: 2, solution: 'Psicográfico: personalidad, valores, estilo de vida.' },
              { type: 'mc', prompt: 'Una encuesta diseñada por la propia empresa es una fuente de información:', options: ['primaria', 'secundaria', 'terciaria', 'interna contable'], answer: 0, solution: 'Datos obtenidos expresamente para la investigación.' },
              { type: 'mc', prompt: 'Fijar un precio de 19,99 € en lugar de 20 € es un ejemplo de precio:', options: ['de prestigio', 'psicológico', 'de penetración', 'de descremado'], answer: 1, solution: 'Precio psicológico o «impar»: parece sensiblemente más barato.' },
            ],
            problems: [
              th('Explica la matriz BCG y las recomendaciones para cada tipo de producto.', T`<p>Clasifica los productos según la <b>tasa de crecimiento del mercado</b> y la <b>cuota de mercado relativa</b>:</p><ul><li><b>Estrella</b> (alto crecimiento, alta cuota): requieren inversión para mantener su posición; serán futuras vacas.</li><li><b>Vaca lechera</b> (bajo crecimiento, alta cuota): generan liquidez; mantener con poca inversión.</li><li><b>Interrogante</b> (alto crecimiento, baja cuota): decidir si invertir para convertirlos en estrellas o abandonarlos.</li><li><b>Perro</b> (bajo crecimiento, baja cuota): normalmente se retiran o se mantienen solo si son rentables.</li></ul>`),
              th('Define marketing mix y explica brevemente sus componentes.', T`<p>Es la combinación de variables controlables por la empresa para alcanzar sus objetivos comerciales en un segmento (las <b>4P</b>): <b>producto</b> (bien o servicio, con su marca, calidad, envase y gama), <b>precio</b> (cantidad que paga el cliente; estrategias de penetración, descremado…), <b>distribución</b> (cómo llega al consumidor: canales e intermediarios) y <b>promoción/comunicación</b> (publicidad, promoción de ventas, relaciones públicas, venta personal, marketing digital).</p>`),
            ],
          },
        ],
      },
      {
        id: 'prod', name: 'Producción', topics: [
          {
            id: 'produccion', name: 'Producción, costes y productividad', summary: 'Proceso productivo, eficiencia, productividad, costes, umbral de rentabilidad y fabricar o comprar.',
            gens: ['eco.umbral', 'eco.productividad', 'eco.prodGlobal', 'eco.hacerComprar'],
            theory: T`
<h3>Productividad y eficiencia</h3>
<div class="formula">$$\text{Productividad de un factor} = \frac{\text{Producción}}{\text{Cantidad del factor}} \qquad \text{Productividad global} = \frac{\sum \text{Producción}\times\text{precio}}{\sum\text{Factores}\times\text{coste}}$$
$$\text{Tasa de variación} = \frac{P_1 - P_0}{P_0}\times100$$</div>
<ul><li><b>Eficiencia técnica</b>: no hay otro método que produzca lo mismo con menos de algún factor sin usar más de otro.</li>
<li><b>Eficiencia económica</b>: el método técnicamente eficiente de menor coste.</li></ul>
<h3>Costes</h3>
<div class="formula">$$CT = CF + CV = CF + CV_u\cdot Q \qquad CMe = \frac{CT}{Q} \qquad B = IT - CT = (p - CV_u)\,Q - CF$$</div>
<ul><li><b>Costes fijos</b>: no dependen de la producción (alquiler, seguros, amortizaciones, sueldos fijos).</li>
<li><b>Costes variables</b>: dependen de la producción (materias primas, energía de las máquinas, comisiones).</li>
<li><b>Costes directos / indirectos</b>: si se pueden asignar o no a un producto concreto.</li></ul>
<h3>Umbral de rentabilidad (punto muerto)</h3>
<div class="formula">$$Q^* = \frac{CF}{p - CV_u} \qquad (p - CV_u = \text{margen de contribución unitario})$$</div>
<p>Por debajo de $Q^*$ la empresa tiene pérdidas; por encima, beneficios. Gráficamente es el corte entre la recta de ingresos $IT = pQ$ y la de costes $CT = CF + CV_uQ$.</p>
<h3>¿Fabricar o comprar?</h3>
<div class="formula">$$p_{\text{compra}}\cdot Q = CF + CV_u\cdot Q \;\Rightarrow\; Q = \frac{CF}{p_{\text{compra}} - CV_u}$$</div>
<p>Para cantidades superiores a ese $Q$ conviene <b>fabricar</b>; para inferiores, <b>comprar</b>.</p>
<h3>Otros conceptos</h3>
<p>Tipos de procesos: por encargo / en serie / continua; I+D+i; economías de escala (el coste medio baja al aumentar la producción); calidad total (mejora continua, círculos de calidad, normas ISO); externalidades y responsabilidad medioambiental.</p>
<p class="tip"><b>Truco PAU:</b> en productividad, fíjate en si te piden por trabajador o por hora. Si piden la productividad global en varios años, usa los <b>mismos precios</b> para comparar.</p>`,
            questions: [
              { type: 'mc', prompt: 'El alquiler de la nave industrial es un coste:', options: ['variable', 'fijo', 'marginal', 'de oportunidad'], answer: 1, solution: 'No depende del volumen de producción.' },
              { type: 'mc', prompt: 'Si $CF = 20.000$ €, $p = 50$ € y $CV_u = 30$ €, el umbral de rentabilidad es:', options: ['400 uds.', '1.000 uds.', '667 uds.', '250 uds.'], answer: 1, solution: '$Q^* = 20.000/(50-30) = 1.000$ unidades.' },
              { type: 'mc', prompt: 'Un método de producción es técnicamente eficiente cuando:', options: ['es el más barato', 'no existe otro que produzca lo mismo usando menos de algún factor sin usar más de otro', 'produce la mayor cantidad', 'usa la tecnología más moderna'], answer: 1, solution: 'Definición de eficiencia técnica. La eficiencia económica añade el criterio del coste mínimo.' },
              { type: 'mc', prompt: 'La productividad pasa de 20 a 22 uds./hora. La tasa de variación es:', options: ['2 %', '10 %', '9,09 %', '22 %'], answer: 1, solution: '$(22-20)/20\\cdot100 = 10\\,\\%$.' },
              { type: 'mc', prompt: 'Al aumentar los costes fijos (con todo lo demás igual), el umbral de rentabilidad:', options: ['aumenta', 'disminuye', 'no cambia', 'se anula'], answer: 0, solution: 'Hay que vender más unidades para cubrir unos costes fijos mayores.' },
              { type: 'mc', prompt: 'Las economías de escala implican que al aumentar la producción…', options: ['el coste total disminuye', 'el coste medio disminuye', 'el precio aumenta', 'los costes fijos aumentan'], answer: 1, solution: 'Los costes fijos se reparten entre más unidades y hay ventajas de tamaño.' },
              { type: 'mc', prompt: 'El margen de contribución unitario es:', options: ['precio − coste fijo', 'precio − coste variable unitario', 'ingresos − costes totales', 'coste fijo / unidades'], answer: 1, solution: 'Lo que aporta cada unidad vendida a cubrir los costes fijos.' },
            ],
            problems: [
              th('Define productividad y explica la diferencia entre eficiencia técnica y económica.', T`<p>La <b>productividad</b> es la relación entre la producción obtenida y los factores empleados para obtenerla (p. ej., unidades por hora de trabajo). Indica el rendimiento de los recursos.</p><p>Un método es <b>técnicamente eficiente</b> si no hay otro que obtenga la misma producción con menos cantidad de algún factor sin usar más de los demás. Es <b>económicamente eficiente</b> el que, entre los técnicamente eficientes, produce con el <b>menor coste</b>.</p>`),
              th('Explica qué es el umbral de rentabilidad y cómo se representa gráficamente.', T`<p>Es la cantidad de producción y ventas a partir de la cual la empresa empieza a obtener beneficios: los ingresos totales igualan a los costes totales ($Q^* = CF/(p - CV_u)$).</p><p>Gráficamente: en el eje X las unidades y en el Y los euros. La recta de ingresos $IT = pQ$ parte del origen; la de costes $CT = CF + CV_uQ$ parte de $CF$ con menor pendiente. Se cortan en $Q^*$: a la izquierda hay zona de pérdidas y a la derecha zona de beneficios.</p>`),
            ],
          },
          {
            id: 'inventarios', name: 'Aprovisionamiento e inventarios', summary: 'Gestión de existencias, modelo de Wilson, punto de pedido, stock de seguridad, ABC, JIT y valoración.',
            gens: ['eco.wilson'],
            theory: T`
<h3>Gestión de inventarios</h3>
<p>Los <b>inventarios</b> (existencias) son los bienes almacenados: materias primas, productos en curso, productos terminados, mercaderías. Mantenerlos tiene costes (almacenamiento, obsolescencia, capital inmovilizado), pero no tenerlos provoca <b>rupturas de stock</b>.</p>
<h3>Modelo de Wilson (volumen óptimo de pedido)</h3>
<div class="formula">$$Q^* = \sqrt{\frac{2\,D\,K}{g}} \qquad N = \frac{D}{Q^*} \qquad CT = \frac{D}{Q}K + \frac{Q}{2}g$$</div>
<p>$D$: demanda anual; $K$: coste de emitir un pedido; $g$: coste de almacenar una unidad un año. Stock medio $= Q/2$ (sin stock de seguridad).</p>
<ul><li><b>Stock de seguridad</b>: reserva para imprevistos (retrasos, picos de demanda).</li>
<li><b>Punto de pedido</b>: nivel de existencias en el que hay que pedir: $\text{demanda diaria}\times\text{plazo de entrega} + \text{stock de seguridad}$.</li></ul>
<h3>Otros sistemas</h3>
<ul><li><b>Método ABC</b>: clasifica artículos por valor. A: pocos artículos (~20 %) con mucho valor (~80 %) → control exhaustivo; C: muchos artículos de poco valor.</li>
<li><b>Just in time (JIT)</b>: producir y recibir justo cuando se necesita, con stock mínimo (Toyota). Exige proveedores fiables y cercanos.</li></ul>
<h3>Valoración de existencias (PGC)</h3>
<ul><li><b>FIFO</b> (primera entrada, primera salida): las salidas se valoran al precio de las existencias más antiguas.</li>
<li><b>PMP</b> (precio medio ponderado): cada salida al precio medio de las existencias en almacén.</li></ul>
<p class="muted">El método LIFO no está permitido en el Plan General de Contabilidad vigente.</p>`,
            questions: [
              { type: 'mc', prompt: 'En el modelo de Wilson, si aumenta el coste de almacenamiento por unidad, el pedido óptimo:', options: ['aumenta', 'disminuye', 'no cambia', 'se duplica'], answer: 1, solution: '$g$ está en el denominador: conviene pedir menos y con más frecuencia.' },
              { type: 'mc', prompt: 'El punto de pedido indica:', options: ['el volumen óptimo de cada pedido', 'el nivel de existencias en el que se debe hacer un nuevo pedido', 'el stock máximo', 'el coste de cada pedido'], answer: 1, solution: 'Cuando las existencias bajan a ese nivel se lanza el pedido, para que llegue antes de agotarlas.' },
              { type: 'mc', prompt: 'En el método ABC, los artículos tipo A son:', options: ['muchos y de poco valor', 'pocos y de mucho valor', 'los más antiguos', 'los perecederos'], answer: 1, solution: 'Representan pocas referencias pero gran parte del valor: requieren control estricto.' },
              { type: 'mc', prompt: 'El sistema Just in Time pretende:', options: ['tener stocks muy altos', 'reducir los inventarios al mínimo', 'comprar al proveedor más barato', 'valorar existencias con FIFO'], answer: 1, solution: 'Producir y aprovisionarse justo cuando se necesita.' },
              { type: 'mc', prompt: 'Con D = 8.000 uds., K = 50 € y g = 2 €, el pedido óptimo de Wilson es:', options: ['200 uds.', '400 uds.', '632 uds.', '800 uds.'], answer: 2, solution: '$\\sqrt{2\\cdot8000\\cdot50/2} = \\sqrt{400.000} \\approx 632$ uds.' },
              { type: 'mc', prompt: '¿Qué criterio de valoración de existencias NO admite el PGC?', options: ['FIFO', 'PMP', 'LIFO', 'Precio de adquisición'], answer: 2, solution: 'El PGC de 2007 solo admite FIFO y PMP (y el precio específico para bienes identificables).' },
            ],
            problems: [
              th('Explica el modelo de Wilson y el significado de cada variable.', T`<p>Determina el <b>volumen óptimo de pedido</b> que minimiza el coste total de gestión de inventarios (coste de pedir + coste de almacenar), suponiendo demanda conocida y constante: $Q^* = \sqrt{2DK/g}$, donde $D$ es la demanda anual, $K$ el coste de cada pedido y $g$ el coste de almacenar una unidad durante un año. Pedidos grandes reducen el coste de pedir pero aumentan el de almacenar; el óptimo se alcanza cuando ambos se igualan.</p>`),
              th('Explica qué es el stock de seguridad y el punto de pedido.', T`<p>El <b>stock de seguridad</b> es la cantidad mínima de existencias que se mantiene para hacer frente a imprevistos (retrasos del proveedor o aumentos de demanda) y evitar la ruptura de stock. El <b>punto de pedido</b> es el nivel de existencias en el que se debe realizar un nuevo pedido; equivale al consumo durante el plazo de entrega más el stock de seguridad.</p>`),
            ],
          },
        ],
      },
      {
        id: 'fin', name: 'Finanzas', topics: [
          {
            id: 'contabilidad', name: 'Patrimonio y cuentas anuales', summary: 'Masas patrimoniales, balance, cuenta de pérdidas y ganancias, amortización.',
            gens: ['eco.resultado', 'eco.amort'],
            theory: T`
<h3>El patrimonio</h3>
<p>Conjunto de <b>bienes, derechos y obligaciones</b> de la empresa. Ecuación fundamental: <b>Activo = Patrimonio neto + Pasivo</b>.</p>
<div class="table-wrap"><table class="data"><thead><tr><th>ACTIVO</th><th>PATRIMONIO NETO Y PASIVO</th></tr></thead><tbody>
<tr><td><b>Activo no corriente</b> (más de 1 año)<br>· Inmovilizado intangible (aplicaciones informáticas, patentes, fondo de comercio)<br>· Inmovilizado material (terrenos, construcciones, maquinaria, mobiliario, elementos de transporte, equipos informáticos) − amortización acumulada<br>· Inversiones financieras a l/p</td>
<td><b>Patrimonio neto</b><br>· Capital social<br>· Reservas<br>· Resultado del ejercicio<br>· Subvenciones</td></tr>
<tr><td><b>Activo corriente</b> (menos de 1 año)<br>· Existencias (mercaderías, materias primas, productos)<br>· Realizable: clientes, deudores, efectos comerciales a cobrar<br>· Disponible: caja, bancos</td>
<td><b>Pasivo no corriente</b>: deudas a l/p (préstamos, obligaciones, proveedores de inmovilizado a l/p)<br><b>Pasivo corriente</b>: deudas a c/p, proveedores, acreedores, efectos a pagar, Hacienda/SS acreedoras</td></tr>
</tbody></table></div>
<h3>Cuenta de pérdidas y ganancias</h3>
<div class="formula">
Ingresos de explotación − Gastos de explotación = <b>Resultado de explotación (BAII)</b><br>
Ingresos financieros − Gastos financieros = <b>Resultado financiero</b><br>
BAII + Resultado financiero = <b>Resultado antes de impuestos (BAI)</b><br>
BAI − Impuesto sobre beneficios = <b>Resultado del ejercicio (BN)</b></div>
<h3>Amortización</h3>
<p>Refleja la pérdida de valor del inmovilizado por uso, paso del tiempo u obsolescencia. Lineal: $\text{cuota} = \dfrac{\text{Valor de adquisición} - \text{Valor residual}}{\text{Vida útil}}$. Es un gasto que no supone pago.</p>
<h3>Cuentas anuales</h3>
<p>Balance, cuenta de pérdidas y ganancias, estado de cambios en el patrimonio neto, estado de flujos de efectivo y memoria. Principios contables: empresa en funcionamiento, devengo, uniformidad, prudencia, no compensación, importancia relativa.</p>
<p class="tip"><b>Truco:</b> la amortización acumulada aparece en el activo restando; el resultado negativo (pérdidas) resta en el patrimonio neto.</p>`,
            questions: [
              { type: 'mc', prompt: 'La cuenta «Clientes» forma parte del:', options: ['activo no corriente', 'activo corriente (realizable)', 'pasivo corriente', 'patrimonio neto'], answer: 1, solution: 'Es un derecho de cobro a corto plazo: realizable.' },
              { type: 'mc', prompt: 'Las «Reservas» pertenecen al:', options: ['activo', 'pasivo corriente', 'patrimonio neto', 'pasivo no corriente'], answer: 2, solution: 'Son beneficios no repartidos: recursos propios.' },
              { type: 'mc', prompt: 'Una patente es un elemento del:', options: ['inmovilizado material', 'inmovilizado intangible', 'activo corriente', 'pasivo'], answer: 1, solution: 'Bien inmaterial con duración superior a un año.' },
              { type: 'mc', prompt: 'Una deuda con un banco a devolver en 5 años se clasifica como:', options: ['pasivo corriente', 'pasivo no corriente', 'patrimonio neto', 'activo no corriente'], answer: 1, solution: 'Obligación a largo plazo (más de un año).' },
              { type: 'mc', prompt: 'El BAII es el resultado:', options: ['del ejercicio', 'de explotación', 'financiero', 'después de impuestos'], answer: 1, solution: 'Beneficio antes de intereses e impuestos = resultado de explotación.' },
              { type: 'mc', prompt: 'Una máquina de 20.000 € con valor residual 2.000 € y vida útil de 6 años tiene una cuota de amortización lineal de:', options: ['3.000 €', '3.333 €', '3.667 €', '2.000 €'], answer: 0, solution: '$(20.000 - 2.000)/6 = 3.000$ €/año.' },
              { type: 'mc', prompt: 'La ecuación fundamental del patrimonio es:', options: ['Activo = Pasivo − PN', 'Activo = PN + Pasivo', 'PN = Activo + Pasivo', 'Pasivo = Activo + PN'], answer: 1, solution: 'Todo lo que la empresa tiene (activo) está financiado con recursos propios (PN) o ajenos (pasivo).' },
              { type: 'mc', prompt: '«Proveedores» se incluye en:', options: ['activo corriente', 'pasivo corriente', 'pasivo no corriente', 'patrimonio neto'], answer: 1, solution: 'Deuda comercial a corto plazo.' },
            ],
            problems: [
              th('Define activo, pasivo y patrimonio neto, indicando dos elementos de cada uno.', T`<p><b>Activo</b>: bienes y derechos de la empresa capaces de generar rendimientos (maquinaria, clientes, bancos). <b>Pasivo</b>: obligaciones o deudas con terceros (préstamos a largo plazo, proveedores). <b>Patrimonio neto</b>: recursos propios, la diferencia entre activo y pasivo; incluye las aportaciones de los socios y los beneficios no repartidos (capital social, reservas, resultado del ejercicio).</p>`),
              th('¿Qué es la amortización? ¿Por qué se considera una fuente de autofinanciación?', T`<p>La <b>amortización</b> es la expresión contable de la depreciación del inmovilizado por su uso, el paso del tiempo o la obsolescencia; se reparte el coste del bien a lo largo de su vida útil como gasto anual.</p><p>Es <b>autofinanciación de mantenimiento</b> porque es un gasto que reduce el beneficio pero <b>no supone salida de dinero</b>: esos fondos quedan retenidos en la empresa y permiten reponer el inmovilizado al final de su vida útil.</p>`),
            ],
          },
          {
            id: 'analisis', name: 'Análisis financiero y rentabilidad', summary: 'Fondo de maniobra, situaciones patrimoniales, ratios, periodo medio de maduración y rentabilidades.',
            gens: ['eco.balance', 'eco.rentab', 'eco.pmm'],
            theory: T`
<h3>Fondo de maniobra</h3>
<div class="formula">$$FM = AC - PC = (PN + PNC) - ANC$$</div>
<p>Es la parte del activo corriente financiada con recursos permanentes. Si es positivo, la empresa puede atender sus deudas a corto plazo.</p>
<h3>Situaciones patrimoniales</h3>
<ul><li><b>Estabilidad financiera total</b>: todo el activo financiado con recursos propios (no hay deudas).</li>
<li><b>Equilibrio financiero normal</b>: $FM > 0$.</li>
<li><b>Desequilibrio financiero a corto plazo</b>: $FM < 0$ → riesgo de no poder pagar (concurso de acreedores, antigua suspensión de pagos).</li>
<li><b>Desequilibrio total (quiebra técnica)</b>: $PN < 0$; las pérdidas han agotado los recursos propios y el activo no cubre las deudas.</li></ul>
<h3>Ratios financieros</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Ratio</th><th>Fórmula</th><th>Valor orientativo</th></tr></thead><tbody>
<tr><td>Liquidez (solvencia a c/p)</td><td>$AC / PC$</td><td>1,5 – 2</td></tr>
<tr><td>Tesorería (prueba ácida)</td><td>$(\text{Realizable} + \text{Disponible}) / PC$</td><td>≈ 1</td></tr>
<tr><td>Disponibilidad</td><td>$\text{Disponible} / PC$</td><td>0,1 – 0,3</td></tr>
<tr><td>Garantía (solvencia total)</td><td>$\text{Activo total} / \text{Pasivo total}$</td><td>&gt; 1,5</td></tr>
<tr><td>Endeudamiento</td><td>$\text{Pasivo total} / (PN + \text{Pasivo})$</td><td>0,4 – 0,6</td></tr>
<tr><td>Autonomía</td><td>$PN / \text{Pasivo total}$</td><td>cuanto mayor, más independencia</td></tr>
</tbody></table></div>
<p class="muted">Algunos manuales definen el endeudamiento como Pasivo / PN. Indica siempre la fórmula que usas.</p>
<h3>Rentabilidades</h3>
<div class="formula">$$RE = \frac{BAII}{\text{Activo total}}\times100 \qquad RF = \frac{BN}{\text{Patrimonio neto}}\times100$$</div>
<p><b>Apalancamiento financiero</b>: si la $RE$ supera el coste de la deuda, endeudarse eleva la $RF$ (apalancamiento positivo).</p>
<h3>Periodo medio de maduración</h3>
<div class="formula">$PMM_{\text{eco}} = PM_{\text{almac.}} + PM_{\text{fabric.}} + PM_{\text{venta}} + PM_{\text{cobro}}$ &nbsp;&nbsp; $PMM_{\text{fin}} = PMM_{\text{eco}} - PM_{\text{pago}}$<br>
Cada subperiodo $= \dfrac{365}{\text{rotación}}$, con rotación $= \dfrac{\text{flujo anual}}{\text{saldo medio}}$</div>
<p>Tiempo que tarda el dinero invertido en el ciclo de explotación en volver a la empresa. Una empresa comercial no tiene periodo de fabricación.</p>`,
            questions: [
              { type: 'mc', prompt: 'Si el fondo de maniobra es negativo, la empresa:', options: ['está en quiebra técnica', 'puede tener problemas para pagar sus deudas a corto plazo', 'tiene estabilidad total', 'tiene exceso de liquidez'], answer: 1, solution: 'Desequilibrio financiero a corto plazo: el activo corriente no cubre el pasivo corriente.' },
              { type: 'mc', prompt: 'La situación en la que el patrimonio neto es negativo se denomina:', options: ['equilibrio normal', 'estabilidad total', 'quiebra técnica (desequilibrio total)', 'suspensión de pagos'], answer: 2, solution: 'Las pérdidas han absorbido los recursos propios.' },
              { type: 'mc', prompt: 'AC = 150.000 € y PC = 100.000 €. El ratio de liquidez es:', options: ['0,67', '1,5', '50.000', '2,5'], answer: 1, solution: '$150.000/100.000 = 1{,}5$.' },
              { type: 'mc', prompt: 'La rentabilidad económica relaciona:', options: ['BN y patrimonio neto', 'BAII y activo total', 'ventas y activo', 'BAI y pasivo'], answer: 1, solution: 'Mide el rendimiento de las inversiones independientemente de su financiación.' },
              { type: 'mc', prompt: 'El apalancamiento financiero es positivo cuando:', options: ['la RE es mayor que el coste de la deuda', 'la RF es negativa', 'no hay deudas', 'el FM es negativo'], answer: 0, solution: 'Cada euro prestado rinde más de lo que cuesta, así que eleva la rentabilidad de los socios.' },
              { type: 'mc', prompt: 'El periodo medio de maduración financiero se obtiene restando al económico:', options: ['el periodo de cobro', 'el periodo de pago a proveedores', 'el periodo de fabricación', 'el periodo de venta'], answer: 1, solution: 'Los proveedores financian parte del ciclo durante su plazo de pago.' },
              { type: 'mc', prompt: 'La «prueba ácida» excluye del activo corriente:', options: ['el disponible', 'el realizable', 'las existencias', 'los clientes'], answer: 2, solution: 'Las existencias son la parte menos líquida del activo corriente.' },
            ],
            problems: [
              th('Explica qué es el fondo de maniobra y qué indica según su signo.', T`<p>El <b>fondo de maniobra</b> (o capital circulante) es la diferencia entre el activo corriente y el pasivo corriente ($FM = AC - PC$), o lo que es lo mismo, la parte de los recursos permanentes que financia activo corriente. Si es <b>positivo</b>, la empresa puede hacer frente a sus deudas a corto plazo con su activo corriente (equilibrio financiero). Si es <b>negativo</b>, existen problemas de liquidez y riesgo de no poder atender los pagos (concurso de acreedores). Un FM excesivo puede indicar recursos ociosos.</p>`),
              th('Diferencia entre rentabilidad económica y financiera. ¿Qué es el apalancamiento financiero?', T`<p><b>Rentabilidad económica</b> ($RE = BAII/\text{Activo}$): rendimiento de las inversiones totales, sin tener en cuenta cómo se financian. <b>Rentabilidad financiera</b> ($RF = BN/PN$): rendimiento obtenido por los propietarios sobre sus aportaciones.</p><p>El <b>apalancamiento financiero</b> es el efecto que el endeudamiento tiene sobre la RF: si la RE es superior al coste de la deuda, endeudarse aumenta la RF (positivo); si es inferior, la reduce (negativo).</p>`),
              th('Define el periodo medio de maduración económico y financiero.', T`<p>El <b>PMM económico</b> es el tiempo medio que transcurre desde que se compran las materias primas hasta que se cobra a los clientes (almacenamiento + fabricación + venta + cobro). El <b>PMM financiero</b> descuenta el periodo medio de pago a proveedores: es el tiempo que la empresa tiene que financiar con sus propios recursos el ciclo de explotación. Cuanto menor sea, menos fondos necesita.</p>`),
            ],
          },
          {
            id: 'inversion', name: 'Inversión', summary: 'Tipos de inversión, métodos estáticos y dinámicos: pay-back, VAN y TIR.',
            gens: ['eco.van', 'eco.tir', 'eco.payback'],
            theory: T`
<h3>La inversión</h3>
<p>Adquisición de bienes de equipo o activos que generarán rendimientos durante varios años. Se describe con: desembolso inicial ($A$), flujos netos de caja ($F_t$ = cobros − pagos de cada año) y duración ($n$).</p>
<h3>Método estático: plazo de recuperación (pay-back)</h3>
<p>Tiempo que tarda en recuperarse el desembolso inicial sumando los flujos de caja. Se prefiere el proyecto que se recupere antes. <b>Inconvenientes</b>: no considera el valor del dinero en el tiempo ni los flujos posteriores a la recuperación.</p>
<h3>Métodos dinámicos</h3>
<div class="formula">$$VAN = -A + \frac{F_1}{1+k} + \frac{F_2}{(1+k)^2} + \dots + \frac{F_n}{(1+k)^n}$$</div>
<ul><li>$VAN > 0$: la inversión es rentable (crea valor). Entre varios, la de <b>mayor VAN</b>.</li>
<li>$k$ es la tasa de actualización o descuento (coste del capital, rentabilidad exigida).</li></ul>
<div class="formula">$$\textbf{TIR}: \text{ tasa } r \text{ que hace } VAN = 0: \quad -A + \sum\frac{F_t}{(1+r)^t} = 0$$</div>
<ul><li>La inversión interesa si $TIR > k$ (coste del dinero). Entre varias, la de mayor TIR.</li>
<li>Con 2 años se resuelve con la ecuación de segundo grado haciendo $x = 1 + r$.</li></ul>
<h3>Capitalización y actualización</h3>
<p>Capital final con interés compuesto: $C_n = C_0(1+i)^n$. Actualizar es el proceso inverso: $C_0 = \dfrac{C_n}{(1+i)^n}$. Un euro hoy vale más que un euro mañana.</p>
<p class="tip"><b>Truco PAU:</b> escribe primero la fórmula del VAN con todos los términos, calcula cada sumando por separado y termina siempre con la conclusión («la inversión es/no es efectuable porque…»).</p>`,
            questions: [
              { type: 'mc', prompt: 'Una inversión con VAN negativo:', options: ['es rentable', 'no es aconsejable', 'tiene TIR mayor que k', 'se recupera antes'], answer: 1, solution: 'Los flujos actualizados no cubren el desembolso inicial.' },
              { type: 'mc', prompt: 'La TIR es la tasa de descuento que hace:', options: ['el VAN máximo', 'el VAN igual a cero', 'el pay-back mínimo', 'los flujos iguales'], answer: 1, solution: 'Por definición, TIR: VAN = 0.' },
              { type: 'mc', prompt: 'El principal inconveniente del pay-back es que:', options: ['es difícil de calcular', 'no tiene en cuenta el valor temporal del dinero', 'requiere conocer la TIR', 'solo sirve para dos años'], answer: 1, solution: 'Es un método estático: suma flujos de distintos años como si valieran lo mismo.' },
              { type: 'mc', prompt: 'Si la TIR de un proyecto es del 8 % y el coste del dinero es del 10 %, el proyecto:', options: ['es interesante', 'no es interesante', 'tiene VAN positivo', 'es indiferente'], answer: 1, solution: 'Rinde menos de lo que cuesta financiarlo; además su VAN (al 10 %) será negativo.' },
              { type: 'mc', prompt: 'Al aumentar la tasa de descuento $k$, el VAN de una inversión típica:', options: ['aumenta', 'disminuye', 'no cambia', 'se hace infinito'], answer: 1, solution: 'Los flujos futuros se dividen por $(1+k)^t$ mayores: valen menos hoy.' },
              { type: 'mc', prompt: 'Desembolso 100.000 € y flujos de 40.000 €/año. El pay-back es:', options: ['2 años', '2,5 años', '3 años', '4 años'], answer: 1, solution: 'Tras 2 años se recuperan 80.000; faltan 20.000 = medio año más.' },
            ],
            problems: [
              th('Explica el VAN y la TIR como criterios de selección de inversiones.', T`<p>El <b>VAN</b> (valor actual neto) es la diferencia entre el valor actualizado de todos los flujos de caja futuros y el desembolso inicial, usando una tasa de descuento $k$. Una inversión es aceptable si $VAN > 0$ y, entre varias, se elige la de mayor VAN.</p><p>La <b>TIR</b> (tasa interna de rentabilidad) es la tasa de descuento que iguala el VAN a cero: la rentabilidad relativa del proyecto. Es aceptable si la TIR supera el coste de financiación $k$; entre varias, la de mayor TIR. Ambos son métodos <b>dinámicos</b> porque consideran el valor del dinero en el tiempo.</p>`),
            ],
          },
          {
            id: 'financiacion', name: 'Financiación', summary: 'Fuentes de financiación propias y ajenas, internas y externas, a corto y largo plazo.',
            gens: [],
            theory: T`
<h3>Clasificación de las fuentes de financiación</h3>
<div class="table-wrap"><table class="data"><thead><tr><th>Criterio</th><th>Tipos</th></tr></thead><tbody>
<tr><td>Propiedad</td><td><b>Propia</b> (capital, reservas, autofinanciación) · <b>Ajena</b> (préstamos, créditos, proveedores…: hay que devolverla)</td></tr>
<tr><td>Procedencia</td><td><b>Interna</b> (autofinanciación generada por la empresa) · <b>Externa</b> (aportaciones de socios y terceros)</td></tr>
<tr><td>Plazo</td><td><b>Corto plazo</b> (&lt; 1 año) · <b>Largo plazo</b> / recursos permanentes (PN + pasivo no corriente)</td></tr>
</tbody></table></div>
<h3>Autofinanciación</h3>
<ul><li><b>De enriquecimiento</b>: <b>reservas</b> (beneficios no repartidos); hace crecer la empresa.</li>
<li><b>De mantenimiento</b>: <b>amortizaciones</b> y <b>provisiones</b>; mantienen la capacidad productiva.</li></ul>
<p>Ventajas: no tiene coste explícito, da independencia. Inconvenientes: limita los dividendos, puede invertirse en proyectos poco rentables.</p>
<h3>Financiación ajena a largo plazo</h3>
<ul><li><b>Préstamo</b>: el banco entrega todo el importe y se devuelve con intereses en cuotas.</li>
<li><b>Empréstito</b>: emisión de obligaciones o bonos (la deuda se divide en títulos); propio de grandes empresas.</li>
<li><b>Leasing</b> (arrendamiento financiero): alquiler de un bien con <b>opción de compra</b> al final del contrato.</li>
<li><b>Renting</b>: alquiler a medio plazo que incluye mantenimiento y seguro, normalmente sin opción de compra.</li></ul>
<h3>Financiación ajena a corto plazo</h3>
<ul><li><b>Crédito comercial de proveedores</b>: aplazamiento de pago; normalmente sin coste explícito.</li>
<li><b>Póliza de crédito</b>: el banco pone a disposición un límite; se pagan intereses solo por lo dispuesto.</li>
<li><b>Descuento de efectos</b>: el banco anticipa el importe de letras de cambio o pagarés antes de su vencimiento, menos intereses y comisiones. Si el cliente no paga, el banco lo reclama a la empresa.</li>
<li><b>Factoring</b>: se ceden los derechos de cobro (facturas) a una entidad (factor) que gestiona el cobro; en el factoring sin recurso asume además el riesgo de impago.</li>
<li><b>Confirming</b>: una entidad gestiona los pagos a los proveedores de la empresa.</li></ul>
<h3>Ampliación de capital</h3>
<p>Emisión de nuevas acciones. Los antiguos accionistas tienen <b>derecho de suscripción preferente</b> para mantener su porcentaje.</p>
<p class="tip"><b>Principio de equilibrio:</b> el activo no corriente debe financiarse con recursos permanentes (y una parte del activo corriente también), por eso interesa un fondo de maniobra positivo.</p>`,
            questions: [
              { type: 'mc', prompt: 'Las reservas son una fuente de financiación:', options: ['ajena y externa', 'propia e interna', 'ajena e interna', 'propia y externa'], answer: 1, solution: 'Beneficios retenidos: pertenecen a los socios y los genera la propia empresa.' },
              { type: 'mc', prompt: 'Las amortizaciones constituyen autofinanciación de:', options: ['enriquecimiento', 'mantenimiento', 'expansión', 'riesgo'], answer: 1, solution: 'Permiten reponer los activos que se deprecian.' },
              { type: 'mc', prompt: 'El arrendamiento de un bien con opción de compra al final del contrato es:', options: ['renting', 'leasing', 'factoring', 'confirming'], answer: 1, solution: 'Leasing o arrendamiento financiero.' },
              { type: 'mc', prompt: 'Ceder las facturas de clientes a una entidad que se encarga de cobrarlas es:', options: ['descuento de efectos', 'factoring', 'leasing', 'póliza de crédito'], answer: 1, solution: 'Factoring: el factor gestiona el cobro y puede asumir el riesgo de impago.' },
              { type: 'mc', prompt: 'En una póliza de crédito se pagan intereses:', options: ['por todo el límite concedido', 'solo por la cantidad dispuesta', 'nunca', 'solo al vencimiento del préstamo'], answer: 1, solution: 'A diferencia del préstamo, solo se pagan intereses por lo utilizado (y comisión por lo no dispuesto).' },
              { type: 'mc', prompt: 'Emitir obligaciones es una forma de financiación:', options: ['propia a largo plazo', 'ajena a largo plazo', 'ajena a corto plazo', 'interna'], answer: 1, solution: 'Empréstito: deuda dividida en títulos, normalmente a largo plazo.' },
              { type: 'mc', prompt: 'El derecho de suscripción preferente permite a los antiguos accionistas:', options: ['cobrar dividendos antes', 'adquirir nuevas acciones antes que terceros en una ampliación', 'votar dos veces', 'vender sus acciones sin impuestos'], answer: 1, solution: 'Protege su porcentaje de participación en las ampliaciones de capital.' },
              { type: 'mc', prompt: 'Los recursos permanentes de la empresa son:', options: ['PN + pasivo no corriente', 'Pasivo corriente', 'Activo no corriente', 'PN + pasivo corriente'], answer: 0, solution: 'Financiación con vencimiento a largo plazo o sin vencimiento.' },
            ],
            problems: [
              th('Clasifica las fuentes de financiación según su procedencia y su propiedad, con un ejemplo de cada tipo.', T`<p><b>Según la propiedad</b>: <i>propia</i> (pertenece a los socios, no hay que devolverla: capital social, reservas) y <i>ajena</i> (deudas con terceros que deben devolverse: préstamos bancarios, proveedores).</p><p><b>Según la procedencia</b>: <i>interna</i> (generada por la propia actividad: reservas, amortizaciones) y <i>externa</i> (procede de fuera: aportaciones de socios en una ampliación de capital, préstamos, leasing).</p>`),
              th('Diferencia entre leasing y renting.', T`<p>Ambos son formas de alquiler de bienes. El <b>leasing</b> es un arrendamiento financiero a medio/largo plazo con <b>opción de compra</b> al final por un valor residual; los gastos de mantenimiento corren por cuenta del arrendatario. El <b>renting</b> es un alquiler a medio plazo que normalmente <b>incluye mantenimiento, seguro y reparaciones</b> y no suele incluir opción de compra; se usa para bienes que se renuevan a menudo (vehículos, equipos informáticos).</p>`),
              th('Explica qué es el descuento de efectos comerciales.', T`<p>Es una operación de financiación a corto plazo por la que una entidad financiera <b>anticipa</b> a la empresa el importe de los efectos comerciales (letras de cambio, pagarés) que tiene pendientes de cobro antes de su vencimiento, descontando intereses y comisiones. Si el cliente no paga al vencimiento, el banco reclama el importe a la empresa (el riesgo de impago lo sigue asumiendo la empresa).</p>`),
            ],
          },
        ],
      },
    ],
  });
})(window.PAU);
