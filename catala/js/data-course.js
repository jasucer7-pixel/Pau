/* Curs: unitats ordenades que reuneixen paraules, gramàtica, verbs i destreses.
   Cada pas apunta a una pàgina de la biblioteca. Contingut nou exclusiu de les unitats 1 i 2 al final. */
window.CA = window.CA || {};

CA.reading.unshift(
  { id: 'companys', title: 'Els nous companys', kind: 'Presentacions', text:
`CURS DE CATALÀ A2 · ELS NOUS COMPANYS

Em dic Ahmed, tinc 29 anys i soc del Marroc. Visc a Badalona amb la meva dona. Soc cuiner en un restaurant del port. Aprenc català per parlar amb els clients.

Hola! Soc la Yuki i soc japonesa. Tinc 41 anys i treballo d'infermera a l'Hospital del Mar. M'agrada molt caminar per la platja i fer fotos.

Bon dia a tothom. Em dic Carlos, soc de Valladolid i tinc 23 anys. Estudio enginyeria a la universitat. Vull aprendre català perquè els meus amics el parlen sempre.`,
    qs: [
      { q: "D'on és l'Ahmed?", o: ['Del Marroc', 'Del Japó', 'De Valladolid'], a: 'Del Marroc' },
      { q: 'Qui treballa en un hospital?', o: ['La Yuki', "L'Ahmed", 'En Carlos'], a: 'La Yuki' },
      { q: 'Quants anys té en Carlos?', o: ['23', '29', '41'], a: '23' },
      { q: "Per què aprèn català l'Ahmed?", o: ['Per parlar amb els clients', 'Per estudiar a la universitat', 'Per viatjar'], a: 'Per parlar amb els clients' },
      { q: 'En Carlos és estudiant.', o: ['Vertader', 'Fals'], a: 'Vertader' }
    ] },
  { id: 'familia-nuria', title: 'La família de la Núria', kind: 'Text descriptiu', text:
`Em dic Núria i tinc 35 anys. La meva família és força gran. El meu pare, en Josep, té 68 anys i està jubilat; abans era fuster. La meva mare, la Montse, és molt simpàtica i encara treballa en una farmàcia.

Tinc dos germans. En Jordi és el gran: és alt, ros i molt treballador. Viu a Lleida amb la seva dona i els seus dos fills, que són els meus nebots. La meva germana petita, la Clara, és morena i té els cabells llargs. És una mica tímida, però molt divertida.

Jo estic casada amb l'Òscar i tenim una filla, la Paula, que té sis anys. Els diumenges dinem tots junts a casa dels meus pares.`,
    qs: [
      { q: 'Què feia abans el pare de la Núria?', o: ['Era fuster', 'Era farmacèutic', 'Era mestre'], a: 'Era fuster' },
      { q: 'Com és en Jordi?', o: ['Alt i ros', 'Baix i morè', 'Tímid i divertit'], a: 'Alt i ros' },
      { q: 'Qui són els nebots de la Núria?', o: ["Els fills d'en Jordi", 'Els fills de la Clara', 'Els seus cosins'], a: "Els fills d'en Jordi" },
      { q: 'Quants anys té la Paula?', o: ['Sis anys', 'Sis mesos', 'Setze anys'], a: 'Sis anys' },
      { q: 'Els diumenges dinen en un restaurant.', o: ['Vertader', 'Fals'], a: 'Fals' }
    ] }
);

CA.listening.unshift(
  { id: 'presentacions', title: 'El primer dia de classe', lines: [
    ['A', 'Hola! Ets nova a la classe?'], ['B', 'Sí, avui és el meu primer dia. Em dic Laura.'],
    ['A', 'Encantat, Laura. Jo soc en Pol. D\'on ets?'], ['B', 'Soc de Bilbao, però fa un any que visc a Barcelona.'],
    ['A', 'I a què et dediques?'], ['B', 'Soc dissenyadora. Treballo en una agència de publicitat. I tu?'],
    ['A', 'Jo soc professor d\'anglès en una acadèmia.'], ['B', 'Que bé! Doncs ens veiem a classe.'], ['A', 'Fins després!'] ],
    qs: [
      { q: "D'on és la Laura?", o: ['De Bilbao', 'De Barcelona', 'De València'], a: 'De Bilbao' },
      { q: 'Quina feina fa la Laura?', o: ['És dissenyadora', "És professora d'anglès", 'És periodista'], a: 'És dissenyadora' },
      { q: 'Què fa en Pol?', o: ["És professor d'anglès", 'És dissenyador', 'Estudia anglès'], a: "És professor d'anglès" }
    ] },
  { id: 'foto', title: 'Una foto de família', lines: [
    ['A', 'Qui són aquestes persones de la foto?'], ['B', 'És la meva família, a l\'aniversari de la meva àvia.'],
    ['A', 'I aquest senyor tan alt?'], ['B', 'És el meu oncle Ramon, el germà de la meva mare. Viu a Andorra.'],
    ['A', 'I la noia dels cabells arrissats?'], ['B', 'És la meva cosina Marta. Té vint anys i estudia medicina.'],
    ['A', 'Us assembleu molt!'], ['B', 'Sí, tothom ho diu.'] ],
    qs: [
      { q: 'Què celebren a la foto?', o: ["L'aniversari de l'àvia", 'Un casament', 'Nadal'], a: "L'aniversari de l'àvia" },
      { q: 'Qui és en Ramon?', o: ["L'oncle", 'El pare', 'El cosí'], a: "L'oncle" },
      { q: 'On viu en Ramon?', o: ['A Andorra', 'A Girona', 'A Lleida'], a: 'A Andorra' },
      { q: 'Què estudia la Marta?', o: ['Medicina', 'Infermeria', 'Dret'], a: 'Medicina' }
    ] }
);

CA.writing.unshift(
  { id: 'presentacio-escrita', title: 'Presenta\'t al fòrum', min: 40, max: 60,
    task: 'Escriu un missatge al fòrum del teu curs de català per presentar-te: com et dius, d\'on ets, on vius, a què et dediques, per què aprens català i què t\'agrada fer.',
    check: ['Salutació (Hola a tothom!)', 'Nom, edat i origen', 'On vius i amb qui', 'Feina o estudis', 'Per què aprens català', 'Aficions i comiat'],
    phrases: ['Hola a tothom!', 'Em dic…', 'Soc de…', 'Ara visc a…', 'Treballo de…', 'Aprenc català perquè…', "M'agrada molt…", 'Fins aviat!'],
    model: `Hola a tothom!

Em dic Sara i tinc 30 anys. Soc de Sevilla, però ara visc a Girona amb la meva parella. Treballo de recepcionista en un hotel. Aprenc català perquè vull parlar amb els clients i fer amics nous. M'agrada molt llegir, cuinar i anar a la muntanya. Fins aviat!

Sara` },
  { id: 'descripcio', title: 'Descriu algú de la teva família', min: 50, max: 70,
    task: 'Descriu una persona de la teva família: qui és, com és físicament, com és de caràcter, a què es dedica i què feu junts.',
    check: ['Qui és (la meva germana, el meu avi…)', 'Edat i on viu', 'Com és físicament', 'Com és de caràcter', 'Què feu junts'],
    phrases: ['La persona més important de la meva família és…', 'Té … anys', 'És alt / alta i…', 'Té els cabells…', 'És molt…', 'Quan ens veiem…'],
    model: `La persona més important de la meva família és la meva germana Lucía. Té vint-i-set anys i viu a Madrid. És alta i prima, té els ulls verds i els cabells curts i rossos. És molt alegre i xerraire, però una mica desordenada. Treballa de periodista en un diari. Quan ens veiem, sempre anem a passejar i a prendre un cafè.` }
);

/* Passos: 'v:tema', 'g:unitat', 'verbs:temps+temps', 'r:lectura', 'l:audició', 'w:redacció', 's:oral', 'rp:joc de rol', 'dictat', 'pronuncia', 'examen'.
   Cada unitat acaba amb una prova. */
CA.course = [
  { id: 'u1', title: 'Hola! Qui ets?', goal: 'Saludar, presentar-te i donar les teves dades.',
    steps: ['v:salutacions', 'v:numeros', 'g:articles', 'g:ser-estar', 'g:interrogatius', 'r:companys', 'l:presentacions', 'w:presentacio-escrita', 's:presentacio'] },
  { id: 'u2', title: 'La família i les persones', goal: 'Parlar de la teva família i descriure persones.',
    steps: ['v:familia', 'v:persones', 'g:genere', 'g:possessius', 'g:demostratius', 'r:familia-nuria', 'l:foto', 'w:descripcio', 's:familia'] },
  { id: 'u3', title: 'El dia a dia', goal: 'Explicar la teva rutina, dir l\'hora i parlar dels dies de la setmana.',
    steps: ['v:calendari', 'v:connectors', 'g:present', 'g:irregulars', 'g:hores', 'verbs:pres', 'r:mireia', 'l:concert', 's:rutina'] },
  { id: 'u4', title: 'La casa i el barri', goal: 'Descriure on vius i orientar-te per la ciutat.',
    steps: ['v:casa', 'v:ciutat', 'g:hi-ha', 'g:contraccions', 'g:preposicions', 'r:correu', 'r:anunci', 'l:estacio', 'w:nova-vida', 'w:barri', 'w:anunci', 's:casa'] },
  { id: 'u5', title: 'Menjar i comprar', goal: 'Comprar, demanar al bar o al restaurant i parlar dels teus gustos.',
    steps: ['v:menjar', 'v:compres', 'g:agradar', 'g:negacio', 'r:menu', 'l:fleca', 'l:restaurant', 'rp:botiga', 'rp:bar'] },
  { id: 'u6', title: 'Temps lliure i salut', goal: 'Parlar d\'aficions, quedar amb algú i demanar hora al metge.',
    steps: ['v:lleure', 'v:cos', 'g:pronoms', 'g:obligacio', 'r:cursos', 'l:metge', 'l:contestador', 'w:nota-vei'] },
  { id: 'u7', title: 'Ahir i demà', goal: 'Explicar què vas fer, com era abans i què faràs.',
    steps: ['v:feina', 'v:falsos', 'g:periphrastic', 'g:perfet', 'g:imperfet', 'g:futur', 'verbs:perif+perf+imp+fut', 'r:missatges', 'r:temps', 'w:cap-setmana', 'w:postal', 's:vacances'] },
  { id: 'u8', title: 'A punt per a l\'examen', goal: 'Repassar l\'ortografia, la pronunciació i fer un simulacre complet.',
    steps: ['g:ortografia', 'pronuncia', 'dictat', 'examen'] }
];
