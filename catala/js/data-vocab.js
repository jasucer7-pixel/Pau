/* Vocabulari A2 per temes. Cada paraula: [català, castellà, nota opcional].
   Les alternatives se separen amb " / ". El text entre parèntesis és opcional en respondre. */
window.CA = window.CA || {};
CA.vocab = [
  { id: 'salutacions', title: 'Salutacions i presentacions', es: 'Saludos y presentaciones', words: [
    ['hola', 'hola'], ['bon dia', 'buenos días'], ['bona tarda', 'buenas tardes'], ['bona nit', 'buenas noches'],
    ['adéu', 'adiós'], ['fins demà', 'hasta mañana'], ['fins aviat', 'hasta pronto'], ['fins després', 'hasta luego'],
    ['si us plau', 'por favor'], ['gràcies', 'gracias'], ['moltes gràcies', 'muchas gracias'], ['de res', 'de nada'],
    ['perdó', 'perdón'], ['disculpi', 'disculpe (usted)'], ['com et dius?', '¿cómo te llamas?'], ['em dic Anna', 'me llamo Anna'],
    ["d'on ets?", '¿de dónde eres?'], ['soc de Madrid', 'soy de Madrid', 'Desde 2017 se escribe «soc», sin acento.'],
    ['quants anys tens?', '¿cuántos años tienes?'], ['tinc trenta anys', 'tengo treinta años'],
    ['encantat / encantada', 'encantado / encantada'], ['molt de gust', 'mucho gusto'], ['com estàs?', '¿cómo estás?'],
    ['molt bé, i tu?', 'muy bien, ¿y tú?'], ['on vius?', '¿dónde vives?'], ['a què et dediques?', '¿a qué te dedicas?'],
    ['parles català?', '¿hablas catalán?'], ['una mica', 'un poco'], ['no ho entenc', 'no lo entiendo'],
    ["pots repetir-ho, si us plau?", '¿puedes repetirlo, por favor?'], ['més a poc a poc, si us plau', 'más despacio, por favor'],
    ['com es diu en català?', '¿cómo se dice en catalán?']
  ] },
  { id: 'numeros', title: 'Números', es: 'Números', words: [
    ['u / un / una', 'uno / una'], ['dos / dues', 'dos', '«Dues» para femenino: dues germanes.'], ['tres', 'tres'], ['quatre', 'cuatro'],
    ['cinc', 'cinco'], ['sis', 'seis'], ['set', 'siete'], ['vuit', 'ocho'], ['nou', 'nueve'], ['deu', 'diez'], ['onze', 'once'],
    ['dotze', 'doce'], ['tretze', 'trece'], ['catorze', 'catorce'], ['quinze', 'quince'], ['setze', 'dieciséis'],
    ['disset', 'diecisiete'], ['divuit', 'dieciocho'], ['dinou', 'diecinueve'], ['vint', 'veinte'], ['vint-i-u / vint-i-un', 'veintiuno'],
    ['trenta', 'treinta'], ['trenta-dos', 'treinta y dos'], ['quaranta', 'cuarenta'], ['cinquanta', 'cincuenta'], ['seixanta', 'sesenta'],
    ['setanta', 'setenta'], ['vuitanta', 'ochenta'], ['noranta', 'noventa'], ['cent', 'cien'], ['dos-cents / dues-centes', 'doscientos / doscientas'],
    ['mil', 'mil'], ['primer / primera', 'primero / primera'], ['segon / segona', 'segundo / segunda'], ['tercer / tercera', 'tercero / tercera'],
    ['quart / quarta', 'cuarto / cuarta']
  ] },
  { id: 'familia', title: 'La família', es: 'La familia', words: [
    ['el pare', 'el padre'], ['la mare', 'la madre'], ['els pares', 'los padres'], ['el germà', 'el hermano'], ['la germana', 'la hermana'],
    ['el fill', 'el hijo'], ['la filla', 'la hija'], ["l'avi", 'el abuelo'], ["l'àvia", 'la abuela'], ['els avis', 'los abuelos'],
    ['el nét', 'el nieto'], ['la néta', 'la nieta'], ["l'oncle", 'el tío'], ['la tia', 'la tía'], ['el cosí', 'el primo'], ['la cosina', 'la prima'],
    ['el nebot', 'el sobrino'], ['la neboda', 'la sobrina'], ['el marit', 'el marido'], ['la dona', 'la mujer / la esposa'],
    ['la parella', 'la pareja'], ['el sogre', 'el suegro'], ['la sogra', 'la suegra'], ['el cunyat', 'el cuñado'], ['la cunyada', 'la cuñada'],
    ['el nen', 'el niño'], ['la nena', 'la niña'], ['casat / casada', 'casado / casada'], ['solter / soltera', 'soltero / soltera'],
    ['separat / separada', 'separado / separada']
  ] },
  { id: 'persones', title: 'Com és? Descripció de persones', es: 'Describir personas', words: [
    ['alt / alta', 'alto / alta'], ['baix / baixa', 'bajo / baja'], ['prim / prima', 'delgado / delgada'], ['gras / grassa', 'gordo / gorda'],
    ['jove', 'joven'], ['gran', 'mayor / grande'], ['ros / rossa', 'rubio / rubia'], ['morè / morena', 'moreno / morena'],
    ['pèl-roig / pèl-roja', 'pelirrojo / pelirroja'], ['els cabells llargs', 'el pelo largo'], ['els cabells curts', 'el pelo corto'],
    ['els cabells arrissats', 'el pelo rizado'], ['porta ulleres', 'lleva gafas'], ['té barba', 'tiene barba'],
    ['simpàtic / simpàtica', 'simpático / simpática'], ['antipàtic / antipàtica', 'antipático / antipática'], ['alegre', 'alegre'],
    ['trist / trista', 'triste'], ['tímid / tímida', 'tímido / tímida'], ['xerraire', 'hablador / habladora'], ['amable', 'amable'],
    ['treballador / treballadora', 'trabajador / trabajadora'], ['mandrós / mandrosa', 'perezoso / perezosa'],
    ['divertit / divertida', 'divertido / divertida'], ['avorrit / avorrida', 'aburrido / aburrida'], ['content / contenta', 'contento / contenta'],
    ['cansat / cansada', 'cansado / cansada'], ['nerviós / nerviosa', 'nervioso / nerviosa'], ['enfadat / enfadada', 'enfadado / enfadada']
  ] },
  { id: 'cos', title: 'El cos i la salut', es: 'El cuerpo y la salud', words: [
    ['el cap', 'la cabeza'], ['la cara', 'la cara'], ['els ulls', 'los ojos'], ['el nas', 'la nariz'], ['la boca', 'la boca'], ['les dents', 'los dientes'],
    ["l'orella", 'la oreja'], ['el coll', 'el cuello'], ["l'esquena", 'la espalda'], ['la panxa', 'la barriga'], ['el braç', 'el brazo'],
    ['la mà', 'la mano'], ['el dit', 'el dedo'], ['la cama', 'la pierna', '¡Falso amigo! La cama (para dormir) es «el llit».'], ['el genoll', 'la rodilla'],
    ['el peu', 'el pie'], ['tinc mal de cap', 'me duele la cabeza'], ['em fa mal la panxa', 'me duele la barriga'], ['tenir febre', 'tener fiebre'],
    ['tenir tos', 'tener tos'], ['estar refredat', 'estar resfriado'], ['estar malalt', 'estar enfermo'], ['el metge / la metgessa', 'el médico / la médica'],
    ["l'infermer / la infermera", 'el enfermero / la enfermera'], ["el CAP", 'el centro de salud', 'Centre d\'Atenció Primària.'],
    ['la farmàcia', 'la farmacia'], ['la pastilla', 'la pastilla'], ['la recepta', 'la receta'], ['demanar hora', 'pedir cita'], ["l'hospital", 'el hospital']
  ] },
  { id: 'casa', title: 'La casa', es: 'La casa', words: [
    ['el pis', 'el piso'], ['la casa', 'la casa'], ["l'habitació", 'la habitación'], ['el dormitori', 'el dormitorio'], ['la cuina', 'la cocina'],
    ['el menjador', 'el comedor'], ["la sala d'estar", 'la sala de estar'], ['el bany / el lavabo', 'el baño'], ['la dutxa', 'la ducha'],
    ['la finestra', 'la ventana'], ['la porta', 'la puerta'], ['el balcó', 'el balcón'], ['la terrassa', 'la terraza'], ["l'escala", 'la escalera'],
    ["l'ascensor", 'el ascensor'], ['el llit', 'la cama'], ['la taula', 'la mesa'], ['la cadira', 'la silla'], ['el sofà', 'el sofá'],
    ["l'armari", 'el armario'], ['la nevera', 'la nevera'], ['la rentadora', 'la lavadora'], ['el rentaplats', 'el lavavajillas'], ['el forn', 'el horno'],
    ['la llum', 'la luz'], ['la clau', 'la llave'], ['el veí / la veïna', 'el vecino / la vecina'], ['el lloguer', 'el alquiler'],
    ['llogar', 'alquilar', '¡Falso amigo! «Lograr» es aconseguir.'], ['el barri', 'el barrio']
  ] },
  { id: 'menjar', title: 'Menjar i beure', es: 'Comida y bebida', words: [
    ['el pa', 'el pan'], ["l'aigua", 'el agua'], ['la llet', 'la leche'], ['el cafè amb llet', 'el café con leche'], ['el tallat', 'el cortado'],
    ['el suc de taronja', 'el zumo de naranja'], ['el vi', 'el vino'], ['la cervesa', 'la cerveza'], ["l'ou", 'el huevo'], ['el formatge', 'el queso'],
    ['el pernil', 'el jamón'], ['la carn', 'la carne'], ['el pollastre', 'el pollo'], ['el peix', 'el pescado'], ['la verdura', 'la verdura'],
    ['la fruita', 'la fruta'], ['la poma', 'la manzana'], ['la taronja', 'la naranja'], ['el plàtan', 'el plátano'], ['la maduixa', 'la fresa'],
    ["l'enciam", 'la lechuga'], ['el tomàquet', 'el tomate'], ['la pastanaga', 'la zanahoria'], ['la patata', 'la patata'], ['la ceba', 'la cebolla'],
    ["l'all", 'el ajo'], ["l'arròs", 'el arroz'], ["l'oli", 'el aceite'], ['la sal', 'la sal'], ['el sucre', 'el azúcar'], ['el pebre', 'la pimienta'],
    ['les mongetes', 'las judías'], ['els cigrons', 'los garbanzos'], ['el pa amb tomàquet', 'el pan con tomate'], ['esmorzar', 'desayunar'],
    ['dinar', 'comer (al mediodía)'], ['berenar', 'merendar'], ['sopar', 'cenar'], ['tenir gana', 'tener hambre'], ['tenir set', 'tener sed'],
    ['el compte, si us plau', 'la cuenta, por favor'], ['de primer / de segon', 'de primero / de segundo'], ['les postres', 'el postre']
  ] },
  { id: 'compres', title: 'De compres', es: 'De compras', words: [
    ['la botiga', 'la tienda'], ['el mercat', 'el mercado'], ['el supermercat', 'el supermercado'], ['el forn / la fleca', 'la panadería'],
    ['la carnisseria', 'la carnicería'], ['la peixateria', 'la pescadería'], ['la fruiteria', 'la frutería'], ['quant costa?', '¿cuánto cuesta?'],
    ['quant val?', '¿cuánto vale?'], ['el preu', 'el precio'], ['car / cara', 'caro / cara'], ['barat / barata', 'barato / barata'],
    ['pagar amb targeta', 'pagar con tarjeta'], ['en efectiu', 'en efectivo'], ['el canvi', 'el cambio'], ['el tiquet', 'el tique'],
    ['les rebaixes', 'las rebajas'], ['la talla', 'la talla'], ["l'emprovador", 'el probador'], ['la roba', 'la ropa'], ['la samarreta', 'la camiseta'],
    ['la camisa', 'la camisa'], ['els pantalons', 'los pantalones'], ['la faldilla', 'la falda'], ['el vestit', 'el vestido / el traje'],
    ['les sabates', 'los zapatos'], ['les sabatilles esportives', 'las zapatillas de deporte'], ['la jaqueta', 'la chaqueta'], ["l'abric", 'el abrigo'],
    ['la bossa', 'la bolsa'], ["una dotzena d'ous", 'una docena de huevos'], ['un quilo de pomes', 'un kilo de manzanas'], ['mig quilo', 'medio kilo'],
    ['res més?', '¿algo más?'], ['ja està, gràcies', 'ya está, gracias']
  ] },
  { id: 'ciutat', title: 'La ciutat i els transports', es: 'La ciudad y los transportes', words: [
    ['el carrer', 'la calle'], ['la plaça', 'la plaza'], ['la cantonada', 'la esquina'], ['el semàfor', 'el semáforo'], ['a la dreta', 'a la derecha'],
    ["a l'esquerra", 'a la izquierda'], ['tot recte', 'todo recto'], ['a prop (de)', 'cerca (de)'], ['lluny (de)', 'lejos (de)'],
    ['davant (de)', 'delante (de)'], ['darrere (de)', 'detrás (de)'], ['al costat (de)', 'al lado (de)'], ["l'estació", 'la estación'],
    ["la parada d'autobús", 'la parada de autobús'], ['el metro', 'el metro'], ['el tren', 'el tren'], ["l'avió", 'el avión'], ['el cotxe', 'el coche'],
    ['la bicicleta', 'la bicicleta'], ['a peu', 'a pie'], ['el bitllet', 'el billete'], ["d'anada i tornada", 'de ida y vuelta'],
    ["l'ajuntament", 'el ayuntamiento'], ['la biblioteca', 'la biblioteca'], ['correus', 'correos'], ['el banc', 'el banco'], ['la platja', 'la playa'],
    ['la muntanya', 'la montaña'], ['el poble', 'el pueblo'], ['la ciutat', 'la ciudad'], ['girar', 'girar'], ['creuar', 'cruzar'], ['on és?', '¿dónde está?']
  ] },
  { id: 'lleure', title: 'Temps lliure i aficions', es: 'Tiempo libre y aficiones', words: [
    ['el temps lliure', 'el tiempo libre'], ['llegir', 'leer'], ['nedar', 'nadar'], ['córrer', 'correr'], ['caminar', 'caminar'], ['ballar', 'bailar'],
    ['cantar', 'cantar'], ['cuinar', 'cocinar'], ['viatjar', 'viajar'], ['anar al cinema', 'ir al cine'], ["anar d'excursió", 'ir de excursión'],
    ['jugar a futbol', 'jugar al fútbol'], ['sortir amb els amics', 'salir con los amigos'], ['escoltar música', 'escuchar música'],
    ['mirar la tele', 'ver la tele'], ['fer esport', 'hacer deporte'], ['anar al gimnàs', 'ir al gimnasio'], ['tocar la guitarra', 'tocar la guitarra'],
    ['fer fotos', 'hacer fotos'], ['el cap de setmana', 'el fin de semana'], ['les vacances', 'las vacaciones'], ['la pel·lícula', 'la película'],
    ['el concert', 'el concierto'], ['el llibre', 'el libro'], ["m'agrada", 'me gusta'], ["m'encanta", 'me encanta'],
    ["no m'agrada gens", 'no me gusta nada'], ['prefereixo', 'prefiero'], ['quedar amb algú', 'quedar con alguien']
  ] },
  { id: 'calendari', title: 'Dies, mesos i el temps', es: 'Días, meses y el tiempo', words: [
    ['dilluns', 'lunes'], ['dimarts', 'martes'], ['dimecres', 'miércoles'], ['dijous', 'jueves'], ['divendres', 'viernes'], ['dissabte', 'sábado'],
    ['diumenge', 'domingo'], ['gener', 'enero'], ['febrer', 'febrero'], ['març', 'marzo'], ['abril', 'abril'], ['maig', 'mayo'], ['juny', 'junio'],
    ['juliol', 'julio'], ['agost', 'agosto'], ['setembre', 'septiembre'], ['octubre', 'octubre'], ['novembre', 'noviembre'], ['desembre', 'diciembre'],
    ['la primavera', 'la primavera'], ["l'estiu", 'el verano'], ['la tardor', 'el otoño'], ["l'hivern", 'el invierno'], ['avui', 'hoy'], ['ahir', 'ayer'],
    ['demà', 'mañana (día)'], ['demà passat', 'pasado mañana'], ["abans-d'ahir", 'anteayer'], ['el matí', 'la mañana (parte del día)'],
    ['el migdia', 'el mediodía'], ['la tarda', 'la tarde'], ['el vespre', 'el anochecer'], ['la nit', 'la noche'], ['fa sol', 'hace sol'],
    ['plou', 'llueve'], ['neva', 'nieva'], ['fa fred', 'hace frío'], ['fa calor', 'hace calor'], ['fa vent', 'hace viento'],
    ['està ennuvolat', 'está nublado'], ['fa bon temps', 'hace buen tiempo'], ['fa mal temps', 'hace mal tiempo']
  ] },
  { id: 'feina', title: 'Feina i estudis', es: 'Trabajo y estudios', words: [
    ['la feina', 'el trabajo'], ['treballar', 'trabajar'], ["l'oficina", 'la oficina'], ["l'empresa", 'la empresa'], ['el cap / la cap', 'el jefe / la jefa'],
    ['el company / la companya', 'el compañero / la compañera'], ['el sou', 'el sueldo'], ["l'horari", 'el horario'], ["estar a l'atur", 'estar en paro'],
    ["l'entrevista", 'la entrevista'], ['el mestre / la mestra', 'el maestro / la maestra'], ['el professor / la professora', 'el profesor / la profesora'],
    ['el cambrer / la cambrera', 'el camarero / la camarera'], ['el dependent / la dependenta', 'el dependiente / la dependienta'],
    ["l'advocat / l'advocada", 'el abogado / la abogada'], ["l'enginyer / l'enginyera", 'el ingeniero / la ingeniera'],
    ['el cuiner / la cuinera', 'el cocinero / la cocinera'], ["l'escola", 'la escuela'], ["l'institut", 'el instituto'], ['la universitat', 'la universidad'],
    ['el curs', 'el curso'], ["l'examen", 'el examen'], ['aprovar', 'aprobar'], ['suspendre', 'suspender'], ['els deures', 'los deberes'],
    ['aprendre', 'aprender'], ['estudiar', 'estudiar']
  ] },
  { id: 'connectors', title: 'Paraules útils', es: 'Palabras útiles y conectores', words: [
    ['sempre', 'siempre'], ['mai', 'nunca', '¡Falso amigo! Mayo es «maig».'], ['sovint', 'a menudo'], ['a vegades', 'a veces'],
    ['de tant en tant', 'de vez en cuando'], ['ja', 'ya'], ['encara', 'todavía'], ['aviat', 'pronto'], ['tard', 'tarde'], ["d'hora", 'temprano'],
    ['ara', 'ahora'], ['abans', 'antes'], ['després', 'después'], ['llavors', 'entonces'], ['doncs', 'pues'], ['però', 'pero'], ['perquè', 'porque'],
    ['per què?', '¿por qué?'], ['també', 'también'], ['tampoc', 'tampoco'], ['molt', 'mucho / muy'], ['poc', 'poco'], ['bastant', 'bastante'],
    ['gaire', 'mucho (en frases negativas)'], ['massa', 'demasiado'], ['potser', 'quizás'], ['de debò', 'de verdad'], ['és clar', 'claro'],
    ["d'acord", 'de acuerdo'], ['tenir pressa', 'tener prisa'], ['tenir son', 'tener sueño'], ['tenir raó', 'tener razón'],
    ['tenir ganes de', 'tener ganas de'], ['haver de', 'tener que', 'He de treballar = tengo que trabajar. Nunca «tinc que».'],
    ['cal', 'hay que', 'Cal portar el DNI = hay que llevar el DNI.']
  ] },
  { id: 'falsos', title: 'Falsos amics', es: 'Palabras traicioneras para hispanohablantes', words: [
    ['la cama', 'la pierna', 'La cama para dormir es «el llit».'], ['sopar', 'cenar', 'No es «sopa» (la sopa es «la sopa»).'],
    ['dinar', 'comer (al mediodía)', 'El dinero es «els diners».'], ['els diners', 'el dinero'], ['tenir gana', 'tener hambre', '«Tenir ganes de» = tener ganas de.'],
    ['llevar-se', 'levantarse', 'El «llevar» castellano es «portar».'], ['portar', 'llevar'], ['pujar', 'subir'],
    ['res', 'nada', 'No vull res = no quiero nada.'], ['el vespre', 'el anochecer', 'La víspera es «la vigília».'],
    ['demà', 'mañana (el día siguiente)', 'La mañana (horas) es «el matí».'], ['la pressa', 'la prisa', 'Tinc pressa = tengo prisa.'],
    ['aconseguir', 'conseguir / lograr'], ['la tassa', 'la taza'], ['la taça', 'la copa'], ['el got', 'el vaso'],
    ['la dona', 'la mujer / la esposa'], ["l'estona", 'el rato'], ['enyorar', 'echar de menos'], ['trobar', 'encontrar'],
    ['vaig menjar', 'comí', '¡Es pasado! «Voy a comer» se dice «menjaré».'], ['el cap', 'la cabeza / el jefe', 'También «ningún»: no tinc cap problema.'],
    ['tancar', 'cerrar'], ['el carrer', 'la calle', 'Una carrera deportiva es «una cursa».'], ['la cursa', 'la carrera (competición)'],
    ['la mandra', 'la pereza'], ['xerrar', 'charlar'], ['les escombraries', 'la basura'], ['la bústia', 'el buzón'], ['el gos', 'el perro']
  ] }
];
