/* Comprensió lectora, comprensió oral, dictats, expressió escrita i oral.
   Preguntes: { q, o: [opcions], a: 'resposta' }. "Vertader" / "Fals" per a V/F. */
window.CA = window.CA || {};
var VF = ['Vertader', 'Fals'];

CA.reading = [
  { id: 'correu', title: 'Un correu de la Júlia', kind: 'Correu personal', text:
`Hola, Marc!

Com estàs? Jo molt bé. Ja fa un mes que visc a Girona i estic molt contenta. El meu pis és petit però molt bonic: té dues habitacions, una cuina i un balcó amb vistes al riu. Treballo en una escola de música al centre i hi vaig a peu cada dia.

Els caps de setmana passejo pel barri vell o vaig a la platja amb uns companys de feina. Dissabte passat vam anar a Tossa de Mar i vam menjar un arròs boníssim.

Per què no vens a veure'm el mes que ve? Tinc un sofà llit molt còmode!

Escriu-me aviat.
Una abraçada,
Júlia`,
    qs: [
      { q: 'Quant temps fa que la Júlia viu a Girona?', o: ['Una setmana', 'Un mes', 'Un any'], a: 'Un mes' },
      { q: 'Com és el pis de la Júlia?', o: ['Gran i antic', 'Petit i bonic', 'Petit i fosc'], a: 'Petit i bonic' },
      { q: 'Com va a la feina?', o: ['Amb autobús', 'Amb bicicleta', 'A peu'], a: 'A peu' },
      { q: 'Què va fer dissabte passat?', o: ['Va anar a Tossa de Mar', 'Va treballar a l\'escola', 'Va pintar el balcó'], a: 'Va anar a Tossa de Mar' },
      { q: 'La Júlia convida en Marc a dormir a casa seva.', o: VF, a: 'Vertader' }
    ] },
  { id: 'anunci', title: 'Es lloga pis', kind: 'Anunci', text:
`ES LLOGA PIS AL BARRI DE GRÀCIA

Pis de 70 m², tercer pis amb ascensor. Té tres habitacions, un bany complet, cuina equipada (nevera, rentadora i forn) i una terrassa de 10 m². Molt lluminós. A prop del metro (línia 3) i de l'escola del barri.

Preu: 950 € al mes (aigua i llum no inclosos).
No s'accepten animals.

Visites: de dilluns a divendres, de 5 a 8 de la tarda.
Interessats, truqueu al 600 123 456 i pregunteu per la Montse.`,
    qs: [
      { q: 'Quantes habitacions té el pis?', o: ['Dues', 'Tres', 'Quatre'], a: 'Tres' },
      { q: 'El preu inclou l\'aigua i la llum?', o: ['Sí, totes dues', 'No', 'Només l\'aigua'], a: 'No' },
      { q: 'Hi pots viure amb el teu gos?', o: ['Sí', 'No', 'Només si és petit'], a: 'No' },
      { q: 'Quan pots visitar el pis?', o: ['Dissabte al matí', 'Dimarts a les sis de la tarda', 'Diumenge a la tarda'], a: 'Dimarts a les sis de la tarda' },
      { q: 'El pis és un primer pis sense ascensor.', o: VF, a: 'Fals' }
    ] },
  { id: 'cursos', title: 'Cursos del centre cívic', kind: 'Avís', text:
`CENTRE CÍVIC LA FONT · CURSOS DE TARDOR

Aquest trimestre oferim aquests cursos:
• Cuina mediterrània: dimarts, de 18 a 20 h. Preu: 60 €.
• Fotografia amb el mòbil: dijous, de 19 a 21 h. Preu: 45 €.
• Ioga per a principiants: dilluns i dimecres, de 9 a 10 h. Preu: 50 €.
• Conversa en català: divendres, de 17 a 18.30 h. Gratuït.

Les inscripcions s'obren el 15 de setembre a la recepció del centre o al web. Places limitades: màxim 15 persones per grup. Els cursos comencen la primera setmana d'octubre.`,
    qs: [
      { q: 'Quin curs és gratuït?', o: ['Ioga', 'Conversa en català', 'Fotografia'], a: 'Conversa en català' },
      { q: 'Quin dia és el curs de cuina?', o: ['Dimarts', 'Dijous', 'Divendres'], a: 'Dimarts' },
      { q: 'Si treballes cada matí, quin curs NO pots fer?', o: ['Ioga', 'Cuina', 'Fotografia'], a: 'Ioga' },
      { q: 'Quan comencen els cursos?', o: ['El 15 de setembre', 'La primera setmana d\'octubre', 'Al gener'], a: 'La primera setmana d\'octubre' },
      { q: 'A cada grup hi pot haver vint persones.', o: VF, a: 'Fals' }
    ] },
  { id: 'mireia', title: 'Un dia de la Mireia', kind: 'Text narratiu', text:
`La Mireia té 34 anys i és infermera a l'hospital de Lleida. Es lleva cada dia a les sis del matí, es dutxa i esmorza un cafè amb llet i una torrada. A les set agafa l'autobús, perquè no té cotxe. Treballa de set a tres.

A la tarda, dos dies a la setmana, va a classe d'anglès, i els altres dies va a córrer pel parc amb la seva gossa, la Lluna. Sopa a les nou, mira una mica la tele o llegeix, i se'n va a dormir a les onze.

Diu que la seva feina és dura, però li agrada molt ajudar la gent.`,
    qs: [
      { q: 'Quina és la professió de la Mireia?', o: ['Metgessa', 'Infermera', 'Professora d\'anglès'], a: 'Infermera' },
      { q: 'Com va a la feina?', o: ['Amb cotxe', 'A peu', 'Amb autobús'], a: 'Amb autobús' },
      { q: 'Què fa dos dies a la setmana a la tarda?', o: ['Va a córrer', 'Estudia anglès', 'Treballa a l\'hospital'], a: 'Estudia anglès' },
      { q: 'Qui és la Lluna?', o: ['La seva germana', 'La seva gossa', 'Una companya de feina'], a: 'La seva gossa' },
      { q: 'A la Mireia no li agrada la seva feina.', o: VF, a: 'Fals' }
    ] },
  { id: 'menu', title: 'Menú del dia', kind: 'Carta de restaurant', text:
`RESTAURANT CAN JOSEP · MENÚ DEL DIA (14 €)
De dilluns a divendres, de 13 a 16 h

Primers: amanida catalana · sopa de verdures · macarrons amb tomàquet
Segons: pollastre rostit amb patates · lluç a la planxa · botifarra amb mongetes
Postres: crema catalana · fruita del temps · iogurt

Inclou pa, aigua o una copa de vi. El cafè es paga a part (1,50 €).
Tenim opcions vegetarianes: pregunteu al cambrer.`,
    qs: [
      { q: 'Quant costa el menú?', o: ['14 €', '15,50 €', '16 €'], a: '14 €' },
      { q: 'Pots menjar aquest menú dissabte?', o: ['Sí', 'No'], a: 'No' },
      { q: 'Quin plat és de peix?', o: ['Lluç a la planxa', 'Botifarra amb mongetes', 'Pollastre rostit'], a: 'Lluç a la planxa' },
      { q: 'El cafè està inclòs al preu?', o: ['Sí', 'No'], a: 'No' },
      { q: 'El restaurant no té res per a vegetarians.', o: VF, a: 'Fals' }
    ] },
  { id: 'temps', title: 'El temps per al cap de setmana', kind: 'Previsió meteorològica', text:
`Dissabte farà sol a tot Catalunya i les temperatures seran altes per a l'època: 24 graus a Barcelona i 20 a Lleida.

Diumenge, en canvi, arribaran núvols des del nord. A la tarda plourà als Pirineus i és possible que hi nevi a partir dels 2.000 metres. A la costa farà vent i les temperatures baixaran uns cinc graus.

Dilluns tornarà el bon temps.`,
    qs: [
      { q: 'Quin temps farà dissabte?', o: ['Plourà', 'Farà sol', 'Nevarà'], a: 'Farà sol' },
      { q: 'Quina temperatura hi haurà a Barcelona dissabte?', o: ['20 graus', '24 graus', '15 graus'], a: '24 graus' },
      { q: 'On pot nevar diumenge?', o: ['A la costa', 'A Lleida', 'Als Pirineus'], a: 'Als Pirineus' },
      { q: 'Què passarà a la costa diumenge?', o: ['Farà vent', 'Farà molta calor', 'Nevarà'], a: 'Farà vent' },
      { q: 'Dilluns farà mal temps.', o: VF, a: 'Fals' }
    ] },
  { id: 'missatges', title: 'Quedem?', kind: 'Missatges de mòbil', text:
`Laia (10.15): Hola, Pere! Aquesta tarda anem al cinema amb l'Arnau. Vols venir? La pel·lícula comença a dos quarts de vuit.
Pere (10.40): Ostres, avui no puc! He de treballar fins a les vuit. Què feu demà?
Laia (10.42): Demà sopem a casa de l'Arnau. Porta postres!
Pere (10.43): Perfecte! Hi seré a les nou. Compraré un pastís de xocolata.`,
    qs: [
      { q: 'A quina hora comença la pel·lícula?', o: ['A les 7.30', 'A les 8.30', 'A les 7.15'], a: 'A les 7.30' },
      { q: 'Per què en Pere no va al cinema?', o: ['Està malalt', 'Ha de treballar', 'No li agrada el cinema'], a: 'Ha de treballar' },
      { q: 'On sopen demà?', o: ['A casa de l\'Arnau', 'En un restaurant', 'A casa de la Laia'], a: 'A casa de l\'Arnau' },
      { q: 'Què portarà en Pere?', o: ['Vi', 'Un pastís', 'Pa'], a: 'Un pastís' },
      { q: 'En Pere arribarà a les nou.', o: VF, a: 'Vertader' }
    ] }
];

CA.listening = [
  { id: 'fleca', title: 'A la fleca', lines: [
    ['A', 'Bon dia! Què vol?'], ['B', 'Bon dia. Voldria una barra de pa i dos croissants, si us plau.'],
    ['A', 'Molt bé. Alguna cosa més?'], ['B', 'Sí, també mitja dotzena de magdalenes.'],
    ['A', 'Aquí té. Són set euros amb vint cèntims.'], ['B', 'Puc pagar amb targeta?'],
    ['A', 'És clar, cap problema.'], ['B', 'Gràcies. Adéu, bon dia!'] ],
    qs: [
      { q: 'Què compra el client?', o: ['Pa, dos croissants i sis magdalenes', 'Pa i dotze magdalenes', 'Dos pans i un croissant'], a: 'Pa, dos croissants i sis magdalenes' },
      { q: 'Quant paga?', o: ['7,20 €', '7,02 €', '2,70 €'], a: '7,20 €' },
      { q: 'Com paga?', o: ['Amb targeta', 'En efectiu'], a: 'Amb targeta' }
    ] },
  { id: 'metge', title: 'Demanar hora al metge', lines: [
    ['A', 'CAP del Carmel, digui?'], ['B', 'Bon dia. Voldria demanar hora amb la doctora Puig.'],
    ['A', 'Com es diu?'], ['B', 'Em dic Jordi Soler.'],
    ['A', 'Molt bé, senyor Soler. Li va bé dijous a les deu del matí?'], ['B', 'Dijous al matí treballo. No pot ser a la tarda?'],
    ['A', 'Sí, divendres a les cinc de la tarda.'], ['B', 'Perfecte, divendres a les cinc.'],
    ['A', 'D\'acord. Recordi portar la targeta sanitària.'] ],
    qs: [
      { q: 'Amb qui vol la visita?', o: ['Amb la doctora Puig', 'Amb el doctor Soler', 'Amb la infermera'], a: 'Amb la doctora Puig' },
      { q: 'Quin dia és la visita?', o: ['Dijous', 'Divendres', 'Dilluns'], a: 'Divendres' },
      { q: 'A quina hora?', o: ['A les deu del matí', 'A les cinc de la tarda', 'A les quatre de la tarda'], a: 'A les cinc de la tarda' },
      { q: 'Què ha de portar?', o: ['La targeta sanitària', 'La recepta', 'El DNI'], a: 'La targeta sanitària' }
    ] },
  { id: 'concert', title: 'Un concert a la platja', lines: [
    ['A', 'Hola, Núria! Què fas dissabte?'], ['B', 'Res especial. Per què?'],
    ['A', 'Hi ha un concert a la platja a les nou del vespre. Vols venir?'], ['B', 'Sí, i tant! On quedem?'],
    ['A', 'A la plaça del Sol, a dos quarts de nou?'], ['B', 'Molt bé. Vindrà en Marc també?'],
    ['A', 'No, ell és a Madrid tot el cap de setmana.'], ['B', 'Llàstima! Doncs fins dissabte!'] ],
    qs: [
      { q: 'On és el concert?', o: ['A la platja', 'A la plaça del Sol', 'A Madrid'], a: 'A la platja' },
      { q: 'A quina hora queden?', o: ['A les 8.30', 'A les 9.00', 'A les 9.30'], a: 'A les 8.30' },
      { q: 'Per què no hi va en Marc?', o: ['Està malalt', 'És a Madrid', 'Ha de treballar'], a: 'És a Madrid' }
    ] },
  { id: 'restaurant', title: 'Al restaurant', lines: [
    ['A', 'Bona nit. Ja saben què volen?'], ['B', 'Sí. De primer, jo vull la sopa de peix.'],
    ['C', 'I jo una amanida, si us plau.'], ['A', 'I de segon?'],
    ['B', 'Per a mi, el pollastre amb bolets.'], ['C', 'Jo prendré el lluç a la planxa.'],
    ['A', 'I per beure?'], ['B', 'Una ampolla d\'aigua i dues copes de vi negre.'], ['A', 'Molt bé. De seguida.'] ],
    qs: [
      { q: 'Qui demana la sopa de peix?', o: ['La primera persona', 'La segona persona', 'Ningú'], a: 'La primera persona' },
      { q: 'Què demanen de segon?', o: ['Pollastre i lluç', 'Pollastre i botifarra', 'Lluç i amanida'], a: 'Pollastre i lluç' },
      { q: 'Què demanen per beure?', o: ['Aigua i vi negre', 'Només aigua', 'Cervesa'], a: 'Aigua i vi negre' }
    ] },
  { id: 'contestador', title: 'Un missatge al contestador', lines: [
    ['A', 'Hola, Clara, soc la Rosa. Et truco perquè demà no podré anar a la classe de ioga: tinc una reunió a la feina fins a les set.'],
    ['A', 'Pots dir-ho a la professora? Ah, i dissabte és l\'aniversari de la Marta.'],
    ['A', 'Farem un sopar a casa meva a les nou. Si vols venir, porta alguna cosa per beure.'],
    ['A', 'Truca\'m aquesta nit, d\'acord? Un petó!'] ],
    qs: [
      { q: 'Per què no anirà a ioga la Rosa?', o: ['Està malalta', 'Té una reunió', 'Viatja'], a: 'Té una reunió' },
      { q: 'Què se celebra dissabte?', o: ['L\'aniversari de la Marta', 'Un casament', 'El final del curs'], a: 'L\'aniversari de la Marta' },
      { q: 'On és el sopar?', o: ['A casa de la Rosa', 'A casa de la Marta', 'En un restaurant'], a: 'A casa de la Rosa' },
      { q: 'Què ha de portar la Clara?', o: ['Postres', 'Alguna cosa per beure', 'Res'], a: 'Alguna cosa per beure' }
    ] },
  { id: 'estacio', title: 'On és l\'estació?', lines: [
    ['B', 'Perdoni, sap on és l\'estació de tren?'], ['A', 'Sí, és a prop. Vagi tot recte fins a la plaça, i allà giri a la dreta.'],
    ['B', 'A la dreta…'], ['A', 'Sí. Després agafi el segon carrer a l\'esquerra. L\'estació és al final del carrer, davant d\'un supermercat.'],
    ['B', 'Hi puc anar a peu?'], ['A', 'És clar, són cinc minuts.'], ['B', 'Moltes gràcies!'], ['A', 'De res.'] ],
    qs: [
      { q: 'On vol anar?', o: ['A l\'estació de tren', 'Al supermercat', 'A la plaça'], a: 'A l\'estació de tren' },
      { q: 'A la plaça ha de girar…', o: ['A la dreta', 'A l\'esquerra'], a: 'A la dreta' },
      { q: 'Què hi ha davant de l\'estació?', o: ['Un supermercat', 'Una plaça', 'Una parada d\'autobús'], a: 'Un supermercat' },
      { q: 'Quant es triga a peu?', o: ['Cinc minuts', 'Quinze minuts', 'Mitja hora'], a: 'Cinc minuts' }
    ] }
];

CA.dictation = [
  'Em dic Laura i soc de València.', 'Visc en un pis petit al centre de la ciutat.', 'Tinc dos germans i una germana.',
  'Cada dia em llevo a les set del matí.', 'Ahir vaig anar al cinema amb els meus amics.', 'Aquest matí he esmorzat un cafè amb llet.',
  'Demà farà sol i anirem a la platja.', 'Quant costa aquesta samarreta?', 'El meu pare treballa en un hospital.',
  "M'agrada molt llegir i escoltar música.", 'La farmàcia és al costat del supermercat.', "Voldria una ampolla d'aigua, si us plau.",
  'A quina hora surt el tren de Girona?', 'El cap de setmana vaig a córrer pel parc.', 'No tinc cotxe i vaig a la feina amb metro.',
  'La classe comença a dos quarts de deu.', 'Els meus avis viuen en un poble petit.', 'Aquesta pel·lícula és molt divertida.',
  'Hem de comprar pa i fruita.', 'Fa fred i plou des d\'ahir.', 'La meva germana és alta i té els cabells llargs.',
  'Quan era petit, jugava a futbol cada dia.', 'Ens veiem dissabte a la tarda?', "Perdoni, on és l'estació?"
];

CA.writing = [
  { id: 'nova-vida', title: 'Correu a un amic', min: 60, max: 80,
    task: 'Fa poc que vius en una ciutat nova. Escriu un correu a un amic o una amiga: explica-li on vius, com és la teva casa, què fas durant la setmana i el cap de setmana, i convida\'l a visitar-te.',
    check: ['Salutació inicial (Hola, …!)', 'On vius i com és la casa', 'Què fas durant la setmana', 'Què fas el cap de setmana', 'Una invitació', 'Comiat (Una abraçada, Petons…)'],
    phrases: ['Com estàs?', 'Fa un mes que visc a…', 'El meu pis és…', 'Treballo / Estudio…', 'Els caps de setmana…', 'Per què no vens a…?', 'Escriu-me aviat!', 'Una abraçada,'],
    model: `Hola, Pau!

Com estàs? Jo estic molt bé. Ara visc a Tarragona, en un pis petit a prop de la platja. Té dues habitacions i un balcó molt bonic. Treballo en una botiga de roba al centre, de dilluns a divendres. Els caps de setmana vaig a córrer o passejo per la ciutat amb els meus companys. Per què no vens a veure'm el mes que ve? Pots dormir a casa!

Una abraçada,
Marta` },
  { id: 'nota-vei', title: 'Una nota per al veí', min: 30, max: 50,
    task: 'Demà no seràs a casa i esperes un paquet. Escriu una nota al teu veí o veïna: explica qui ets, per què no hi seràs i demana-li que agafi el paquet.',
    check: ['Salutació', 'Qui ets (la veïna del segon…)', 'Per què no seràs a casa', 'La petició amb «Podries…?»', 'Agraïment i nom'],
    phrases: ['Soc el veí del tercer', 'Demà al matí no seré a casa perquè…', 'Espero un paquet', 'El podries agafar, si us plau?', 'Passaré a buscar-lo a la tarda', 'Moltes gràcies!'],
    model: `Hola, Joan:

Soc la Carme, la veïna del segon. Demà al matí no seré a casa perquè tinc visita al metge. Espero un paquet de correus. El podries agafar tu, si us plau? A la tarda passaré a buscar-lo. Moltes gràcies!

Carme (2n 1a)` },
  { id: 'cap-setmana', title: 'El cap de setmana passat', min: 60, max: 80,
    task: 'Explica què vas fer el cap de setmana passat: on vas anar, amb qui, què vas menjar i com t\'ho vas passar.',
    check: ['Passat perifràstic (vaig anar, vam menjar…)', 'Dissabte i diumenge', 'Amb qui', 'Una valoració final', 'Connectors: després, a la tarda, al final…'],
    phrases: ['Dissabte al matí em vaig llevar…', 'Després vam anar a…', 'A la tarda vaig quedar amb…', 'Diumenge va ploure i…', 'Va ser un cap de setmana molt…'],
    model: `El cap de setmana passat va ser molt tranquil. Dissabte al matí em vaig llevar tard i vaig esmorzar amb la meva parella. Després vam anar al mercat a comprar fruita i peix. A la tarda vaig quedar amb uns amics i vam veure una pel·lícula al cinema. Diumenge va ploure tot el dia, i per això vaig llegir un llibre i vaig cuinar una paella per a la meva família. Va ser un cap de setmana molt agradable.` },
  { id: 'barri', title: 'El meu barri', min: 60, max: 80,
    task: 'Descriu el barri on vius: com és, què hi ha, què t\'agrada més i què no t\'agrada.',
    check: ['On és el barri', 'Hi ha… (botigues, parcs, transport)', 'Adjectius (tranquil, sorollós…)', 'El que t\'agrada', 'El que no t\'agrada'],
    phrases: ['Visc al barri de…', 'És un barri tranquil / sorollós', 'Hi ha moltes botigues', 'Al costat de casa meva hi ha…', 'El que més m\'agrada és…', 'L\'únic problema és que…'],
    model: `Visc al barri de Sant Andreu, a Barcelona. És un barri tranquil i molt agradable. Hi ha moltes botigues petites, un mercat, dues escoles i un parc on els nens juguen a la tarda. Al costat de casa meva hi ha una fleca que fa un pa boníssim. El barri està ben comunicat: tenim metro i autobús. El que més m'agrada són les places, perquè sempre hi ha gent. L'únic problema és que no hi ha gaires aparcaments.` },
  { id: 'anunci', title: 'Resposta a un anunci', min: 50, max: 70,
    task: 'Has vist aquest anunci: «Busquem persona per compartir pis al centre». Escriu un correu per presentar-te i demanar informació (preu, despeses, visita).',
    check: ['Salutació formal (Bon dia,)', 'On has vist l\'anunci', 'Presentació (nom, edat, feina)', 'Dues preguntes', 'Comiat formal (Salutacions,)'],
    phrases: ['He vist el vostre anunci a…', 'M\'interessa l\'habitació', 'Em dic… i tinc… anys', 'Voldria saber…', 'M\'agradaria visitar el pis', 'Gràcies i salutacions,'],
    model: `Bon dia,

He vist el vostre anunci a internet i m'interessa l'habitació. Em dic Lucas, tinc 28 anys i treballo de cuiner en un restaurant del centre. Soc una persona ordenada i tranquil·la. Voldria saber quant costa l'habitació i si les despeses estan incloses. També m'agradaria visitar el pis aquesta setmana, a la tarda.

Gràcies i salutacions,
Lucas` },
  { id: 'postal', title: 'Una postal de vacances', min: 40, max: 60,
    task: 'Ets de vacances. Escriu una postal a la teva família: on ets, quin temps fa, com és l\'hotel, què fas cada dia i quan tornes.',
    check: ['On ets', 'Quin temps fa', 'L\'allotjament', 'Què fas (present) i què vas fer ahir (passat)', 'Quan tornes'],
    phrases: ['Us escric des de…', 'Fa molt bon temps', 'L\'hotel és…', 'Cada dia…', 'Ahir vam anar a…', 'Tornem diumenge', 'Petons,'],
    model: `Hola, família!

Us escric des de Menorca. Fa molt bon temps i l'aigua del mar és fantàstica. L'hotel és petit però molt còmode i està a prop de la platja. Cada dia ens banyem, mengem peix i passegem pel port. Ahir vam anar en vaixell a una cala preciosa. Tornem diumenge a la nit.

Petons,
Anna` }
];

CA.speaking = [
  { id: 'presentacio', title: 'Presenta\'t', secs: 90,
    guide: ['Com et dius i quants anys tens?', 'D\'on ets i on vius?', 'A què et dediques?', 'Per què aprens català?', 'Què t\'agrada fer en el temps lliure?'],
    model: 'Hola, em dic Daniel i tinc trenta-dos anys. Soc de Saragossa, però fa dos anys que visc a Barcelona, al barri de Sants. Treballo d\'enginyer en una empresa de tecnologia. Aprenc català perquè vull parlar amb els meus companys i entendre millor la ciutat. En el meu temps lliure m\'agrada fer esport, sobretot córrer, i cuinar per als amics.' },
  { id: 'familia', title: 'La teva família', secs: 90,
    guide: ['Quantes persones sou a la família?', 'Com es diuen i què fan?', 'Com són (físic i caràcter)?', 'On viuen?', 'Què feu junts?'],
    model: 'La meva família no és gaire gran. Som quatre: els meus pares, la meva germana i jo. El meu pare es diu Antonio i és mecànic; la meva mare, la Carmen, és mestra. La meva germana es diu Lucía, té vint-i-cinc anys i estudia medicina. És alta, morena i molt divertida. Els meus pares viuen a Còrdova. Els estius anem junts a la platja.' },
  { id: 'rutina', title: 'La teva rutina', secs: 90,
    guide: ['A quina hora et lleves?', 'Què esmorzes?', 'Com vas a la feina o a classe?', 'Què fas a la tarda?', 'A quina hora sopes i te\'n vas a dormir?'],
    model: 'Normalment em llevo a les set. Em dutxo i esmorzo un cafè amb llet i una torrada. A dos quarts de vuit agafo el metro per anar a la feina. Treballo fins a les tres i dino amb els companys. A la tarda vaig al gimnàs o a classe de català. Sopo a les nou, miro una sèrie i me\'n vaig a dormir a les onze.' },
  { id: 'vacances', title: 'Les últimes vacances', secs: 120,
    guide: ['On vas anar i quan?', 'Amb qui hi vas anar?', 'On et vas allotjar?', 'Què vas fer i què vas menjar?', 'T\'hi va agradar? Per què?'],
    model: 'L\'estiu passat vaig anar a Mallorca amb la meva parella. Hi vam estar una setmana, en un hotel petit a prop de Sóller. Cada dia vam anar a una platja diferent i a la tarda vam passejar pels pobles. Vam menjar molt de peix i ensaïmades. Em va agradar molt perquè els paisatges són preciosos i la gent era molt amable.' },
  { id: 'casa', title: 'La teva casa', secs: 90,
    guide: ['On és la teva casa o pis?', 'Quantes habitacions té?', 'Quina és la teva habitació preferida?', 'Què hi ha a prop?', 'Què canviaries?'],
    model: 'Visc en un pis al quart pis d\'un edifici sense ascensor. Té dues habitacions, una cuina petita, un bany i un menjador amb balcó. La meva habitació preferida és el menjador, perquè té molta llum. A prop hi ha un supermercat, una farmàcia i una parada de metro. M\'agradaria tenir una terrassa per sopar a fora a l\'estiu.' }
];

/* Joc de rol: la màquina diu les frases de A; tu respons com a B. */
CA.roleplay = [
  { id: 'botiga', title: 'A la botiga de roba', lines: [
    ['A', 'Bon dia! Puc ajudar-la en alguna cosa?', 'Bon dia. Busco una jaqueta per a l\'hivern.'],
    ['A', 'Quina talla fa servir?', 'Faig servir la talla mitjana, la M.'],
    ['A', 'Tenim aquesta en negre i en blau. Quin color prefereix?', 'Prefereixo la blava. Me la puc emprovar?'],
    ['A', 'És clar. L\'emprovador és al fons, a la dreta.', 'Gràcies. Quant costa?'],
    ['A', 'Costa seixanta euros, però avui té un vint per cent de descompte.', 'Perfecte, me l\'emporto. Puc pagar amb targeta?'],
    ['A', 'I tant. Aquí té el tiquet. Que vagi bé!', 'Moltes gràcies. Adéu!'] ] },
  { id: 'bar', title: 'Al bar', lines: [
    ['A', 'Bon dia! Què li poso?', 'Bon dia. Un tallat i un croissant, si us plau.'],
    ['A', 'El croissant, el vol escalfat?', 'Sí, si us plau.'],
    ['A', 'Alguna cosa més?', 'No, res més, gràcies. Quant és?'],
    ['A', 'Són tres euros amb vint.', 'Aquí té. Bon dia!'] ] }
];

CA.pronunciation = [
  { title: 'La vocal neutra', tip: 'A la pronúncia central, la a i la e àtones sonen igual, com una «e» relaxada: casa, pare, mare.', words: ['casa', 'pare', 'mare', 'escola', 'setmana', 'cervesa'] },
  { title: 'S sonora i S sorda', tip: 'Entre vocals, una sola s sona [z] (com una abella). Doble ss o ç sonen [s]. Canvia el significat!', words: ['casa', 'caça', 'rosa', 'rossa', 'cosí', 'passar'] },
  { title: 'Ela geminada i ll', tip: 'La l·l és una l allargada; la ll és com la «ll» tradicional castellana.', words: ['col·legi', 'pel·lícula', 'il·lusió', 'llum', 'cavall', 'llibre'] },
  { title: 'X, ix, tx, tg', tip: 'x / ix ≈ «sh» anglesa; tx ≈ «ch»; tg / tj ≈ «dj».', words: ['xocolata', 'peix', 'caixa', 'cotxe', 'metge', 'platja'] },
  { title: 'Ny i finals mudes', tip: 'ny = ñ. En moltes paraules la r final i la t de -nt no es pronuncien: parlar, cent.', words: ['any', 'Espanya', 'senyor', 'parlar', 'cent', 'dents'] },
  { title: 'O i E obertes', tip: 'Les vocals obertes (è, ò) són més obertes que en castellà.', words: ['cafè', 'anglès', 'telèfon', 'dona', 'porta', 'escola'] }
];

CA.tips = [
  '«Vaig menjar» és passat (comí). Per al futur, digues «menjaré».',
  'Les hores: «un quart de cinc» són les 4.15, no les 5.15. Es compta cap a l\'hora següent.',
  'Davant dels noms de persona hi va article: en Pau, la Marta, l\'Anna.',
  '«Tener que» es diu «haver de»: He de treballar. Mai «tinc que».',
  '«Por la tarde» es diu «a la tarda», i «por la mañana», «al matí».',
  'Des de 2017 s\'escriu «soc», «dona» i «venen» sense accent.',
  '«No tinc cap germà»: cap = ningún. «Res» = nada. «Ningú» = nadie.',
  'Els possessius porten article: la meva casa, el teu cotxe.',
  'Hi ha és invariable: hi ha un bar, hi ha dos bars.',
  '«La cama» és la pierna. La cama per dormir és «el llit».',
  'Si no tens veu catalana al mòbil, instal·la-la a Configuració → Accessibilitat → Text a veu.',
  'A l\'examen, rellegeix el text buscant accents: també, més, què, perquè, així.'
];
