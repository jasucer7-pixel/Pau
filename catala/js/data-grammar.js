/* Gramàtica A2. Exercicis:
   - Opció múltiple: { q, o: [opcions], a: 'resposta' }
   - Escriure:       { q, a: 'resposta' | ['variant 1', 'variant 2'] }
   - Ordenar:        { ord: 'frase correcta', es: 'traducció' }
   "___" marca el buit dins de la frase. */
window.CA = window.CA || {};
CA.grammar = [
  { id: 'articles', title: 'Els articles', es: 'el, la, l\', els, les… y el artículo personal', html: `
<p>Los artículos definidos son <b>el</b>, <b>la</b>, <b>els</b>, <b>les</b>. Delante de vocal o <i>h</i>, <i>el</i> y <i>la</i> se apostrofan: <b>l'</b>.</p>
<table><thead><tr><th></th><th>Singular</th><th>Plural</th></tr></thead><tbody>
<tr><th>Masculino</th><td><b>el</b> pare · <b>l'</b>home</td><td><b>els</b> pares · <b>els</b> homes</td></tr>
<tr><th>Femenino</th><td><b>la</b> mare · <b>l'</b>àvia</td><td><b>les</b> mares · <b>les</b> àvies</td></tr></tbody></table>
<p><strong>Ojo:</strong> <i>la</i> no se apostrofa delante de <i>i</i> o <i>u</i> sin acento tónico: <b>la universitat</b>, <b>la infermera</b>, <b>la història</b>. Pero sí cuando son tónicas: <b>l'illa</b>, <b>l'única</b>. Tampoco con la hora: <b>la una</b>.</p>
<p><strong>Artículo personal.</strong> En catalán los nombres de persona llevan artículo: <b>en</b> Pau, <b>la</b> Marta, <b>l'</b>Anna, <b>l'</b>Oriol.</p>
<p>Indefinidos: <b>un</b>, <b>una</b>, <b>uns</b>, <b>unes</b> (nunca se apostrofan).</p>`,
    ex: [
      { q: '___ home', o: ['el', 'la', "l'"], a: "l'" }, { q: '___ universitat', o: ['el', 'la', "l'"], a: 'la' },
      { q: '___ amiga', o: ['el', 'la', "l'"], a: "l'" }, { q: '___ hospital', o: ['el', 'la', "l'"], a: "l'" },
      { q: '___ història', o: ['el', 'la', "l'"], a: 'la' }, { q: '___ illa', o: ['el', 'la', "l'"], a: "l'" },
      { q: '___ ulls', o: ['els', 'les', "l'"], a: 'els' }, { q: 'Avui he vist ___ Joan.', o: ['el', 'en', 'la'], a: 'en' },
      { q: '___ Anna és la meva germana.', o: ['La', 'En', "L'"], a: "L'" }, { q: '___ Marta treballa en un banc.', o: ['La', 'Na', 'En'], a: 'La' },
      { q: 'És ___ una del migdia.', o: ['la', "l'", 'les'], a: 'la' }, { q: '___ aigua és freda.', o: ['La', "L'", 'El'], a: "L'" }
    ] },
  { id: 'contraccions', title: 'Contraccions', es: 'al, del, pel, als, dels, pels', html: `
<p>Las preposiciones <i>a</i>, <i>de</i> y <i>per</i> se contraen con los artículos masculinos <i>el</i> y <i>els</i>:</p>
<table><thead><tr><th></th><th>el</th><th>els</th></tr></thead><tbody>
<tr><th>a</th><td><b>al</b></td><td><b>als</b></td></tr><tr><th>de</th><td><b>del</b></td><td><b>dels</b></td></tr><tr><th>per</th><td><b>pel</b></td><td><b>pels</b></td></tr></tbody></table>
<p>Con <i>l'</i>, <i>la</i> y <i>les</i> no hay contracción: <b>a l'escola</b>, <b>de la mare</b>, <b>per les places</b>.</p>
<p>En castellano solo hay <i>al</i> y <i>del</i>; en catalán también en plural y con <i>per</i>: <b>Passegem pel parc</b> (paseamos por el parque).</p>`,
    ex: [
      { q: 'Vaig ___ cinema. (a + el)', a: 'al' }, { q: 'Vinc ___ mercat. (de + el)', a: 'del' }, { q: 'Passegem ___ parc. (per + el)', a: 'pel' },
      { q: 'Escric ___ meus amics. (a + els)', a: 'als' }, { q: 'El cotxe ___ professors. (de + els)', a: 'dels' },
      { q: 'Anem ___ escola. (a + l\')', a: "a l'" }, { q: 'Truco ___ metge.', o: ['a el', 'al', 'el'], a: 'al' },
      { q: 'La casa ___ avis és molt gran.', o: ['de els', 'dels', 'des'], a: 'dels' }, { q: 'Ens veiem ___ platja.', o: ['a la', 'al', 'a el'], a: 'a la' },
      { q: 'Caminem ___ carrers del centre.', o: ['pels', 'per els', 'pel'], a: 'pels' }
    ] },
  { id: 'genere', title: 'Gènere i plural', es: 'Femenino y plural de nombres y adjetivos', html: `
<p><strong>Femenino:</strong> normalmente se añade <b>-a</b>: alt → <b>alta</b>, francès → <b>francesa</b>. Atención a los cambios ortográficos: amic → <b>amiga</b>, blanc → <b>blanca</b>, ros → <b>rossa</b>. Muchas palabras acabadas en <i>-e</i> no cambian: <b>jove</b>, <b>alegre</b>, <b>amable</b>.</p>
<p><strong>Plural:</strong></p>
<ul><li>General: <b>+s</b> → llibre → <b>llibres</b>, cotxe → <b>cotxes</b>.</li>
<li>Acabadas en <i>-a</i> → <b>-es</b>: casa → <b>cases</b>, con cambios: platja → <b>platges</b>, amiga → <b>amigues</b>, plaça → <b>places</b>.</li>
<li>Agudas en vocal suelen recuperar la <i>n</i>: germà → <b>germans</b>, camió → <b>camions</b> (pero cafè → <b>cafès</b>, sofà → <b>sofàs</b>).</li>
<li>Masculinos acabados en <i>-s, -ç, -x, -tx</i> → <b>-os</b>: gos → <b>gossos</b>, braç → <b>braços</b>, peix → <b>peixos</b>, mes → <b>mesos</b>, país → <b>països</b>.</li></ul>`,
    ex: [
      { q: 'casa → ___', a: 'cases' }, { q: 'platja → ___', a: 'platges' }, { q: 'amiga → ___', a: 'amigues' }, { q: 'plaça → ___', a: 'places' },
      { q: 'gos → ___', a: 'gossos' }, { q: 'peix → ___', a: 'peixos' }, { q: 'mes → ___', a: 'mesos' }, { q: 'germà → ___', a: 'germans' },
      { q: 'braç → ___', a: 'braços' }, { q: 'amic (femení) → ___', a: 'amiga' }, { q: 'ros (femení) → ___', a: 'rossa' },
      { q: 'simpàtic (femení) → ___', a: 'simpàtica' }
    ] },
  { id: 'ser-estar', title: 'Ser i estar', es: 'Cuándo usar cada verbo', html: `
<table><thead><tr><th></th><th>ser</th><th>estar</th></tr></thead><tbody>
<tr><td>jo</td><td><b>soc</b></td><td><b>estic</b></td></tr><tr><td>tu</td><td><b>ets</b></td><td><b>estàs</b></td></tr>
<tr><td>ell, ella, vostè</td><td><b>és</b></td><td><b>està</b></td></tr><tr><td>nosaltres</td><td><b>som</b></td><td><b>estem</b></td></tr>
<tr><td>vosaltres</td><td><b>sou</b></td><td><b>esteu</b></td></tr><tr><td>ells, elles, vostès</td><td><b>són</b></td><td><b>estan</b></td></tr></tbody></table>
<p><b>Ser</b>: identidad, origen, profesión y características: <b>Soc metge</b>. <b>La Laia és alta</b>. <b>Som de Sevilla</b>.</p>
<p><b>Estar</b>: estados pasajeros y acciones en curso: <b>Estic cansada</b>. <b>La sopa està freda</b>. <b>Estem estudiant</b>.</p>
<p><strong>Lugar:</strong> en catalán es muy habitual <b>ser</b> para situar: <b>On és el lavabo?</b> · <b>Som a casa</b>. (<i>Estic a casa</i> también es correcto.)</p>
<p>Desde la reforma ortográfica de 2017 se escribe <b>soc</b> (sin acento). <b>és</b> y <b>són</b> mantienen el acento.</p>`,
    ex: [
      { q: 'Jo ___ de Saragossa.', o: ['soc', 'estic'], a: 'soc' }, { q: 'Avui ___ molt cansada.', o: ['soc', 'estic'], a: 'estic' },
      { q: 'La Marta ___ infermera.', o: ['és', 'està'], a: 'és' }, { q: 'Nosaltres ___ estudiant català.', o: ['som', 'estem'], a: 'estem' },
      { q: 'El cafè ___ fred.', o: ['és', 'està'], a: 'està' }, { q: 'Vosaltres ___ germans? (ser)', a: 'sou' },
      { q: 'Ells ___ de Girona. (ser)', a: 'són' }, { q: 'Tu ___ nerviós? (estar)', a: 'estàs' }, { q: 'Vosaltres ___ bé? (estar)', a: 'esteu' },
      { q: 'Jo ___ estudiant de català. (ser)', a: 'soc' }
    ] },
  { id: 'hi-ha', title: 'Hi ha', es: 'Hay, había, habrá', html: `
<p><b>Hi ha</b> = hay. Es <strong>invariable</strong>: <b>Hi ha un bar</b> · <b>Hi ha dos bars</b> (no «hi han» en el registro de examen).</p>
<table><tbody><tr><td>Presente</td><td><b>hi ha</b></td><td>hay</td></tr><tr><td>Imperfecto</td><td><b>hi havia</b></td><td>había</td></tr>
<tr><td>Pasado</td><td><b>hi va haver</b></td><td>hubo</td></tr><tr><td>Perfecto</td><td><b>hi ha hagut</b></td><td>ha habido</td></tr>
<tr><td>Futuro</td><td><b>hi haurà</b></td><td>habrá</td></tr></tbody></table>
<p>Para preguntar si existe algo: <b>Hi ha una farmàcia a prop?</b> Para preguntar dónde está algo concreto: <b>On és la farmàcia?</b></p>`,
    ex: [
      { q: 'Al meu barri ___ dues farmàcies.', o: ['hi ha', 'hi han', 'està'], a: 'hi ha' },
      { q: 'Ahir ___ molta gent al mercat.', o: ['hi havia', 'hi ha', 'hi haurà'], a: 'hi havia' },
      { q: 'Demà ___ una festa a la plaça.', o: ['hi haurà', 'hi havia', 'hi ha hagut'], a: 'hi haurà' },
      { q: 'No ___ pa a casa.', a: 'hi ha' }, { q: '___ un supermercat a prop?', o: ['Hi ha', 'Està', 'És'], a: 'Hi ha' },
      { q: '___ el supermercat? — Al final del carrer.', o: ['On hi ha', 'On és', 'Hi ha'], a: 'On és' },
      { ord: 'hi ha tres habitacions al pis', es: 'Hay tres habitaciones en el piso' }
    ] },
  { id: 'possessius', title: 'Els possessius', es: 'el meu, la meva, els meus…', html: `
<table><thead><tr><th></th><th>masc.</th><th>fem.</th><th>masc. pl.</th><th>fem. pl.</th></tr></thead><tbody>
<tr><td>mi</td><td><b>el meu</b></td><td><b>la meva</b></td><td><b>els meus</b></td><td><b>les meves</b></td></tr>
<tr><td>tu</td><td><b>el teu</b></td><td><b>la teva</b></td><td><b>els teus</b></td><td><b>les teves</b></td></tr>
<tr><td>su</td><td><b>el seu</b></td><td><b>la seva</b></td><td><b>els seus</b></td><td><b>les seves</b></td></tr>
<tr><td>nuestro</td><td><b>el nostre</b></td><td><b>la nostra</b></td><td colspan="2"><b>els nostres / les nostres</b></td></tr>
<tr><td>vuestro</td><td><b>el vostre</b></td><td><b>la vostra</b></td><td colspan="2"><b>els vostres / les vostres</b></td></tr></tbody></table>
<p>¡Siempre con artículo! <i>Mi casa</i> → <b>la meva casa</b>. <i>Tus amigos</i> → <b>els teus amics</b>.</p>
<p>Con familia se oye también <b>mon pare</b>, <b>ma mare</b> (más coloquial).</p>`,
    ex: [
      { q: '___ germana viu a Lleida. (mi)', a: 'la meva' }, { q: '___ cotxe és vermell. (mi)', a: 'el meu' },
      { q: '___ amics són molt simpàtics. (tus)', a: 'els teus' }, { q: '___ casa és molt gran. (nuestra)', a: 'la nostra' },
      { q: '___ filles estudien a Girona. (sus, de ella)', a: 'les seves' }, { q: '___ professor és de Reus. (vuestro)', a: 'el vostre' },
      { q: 'Aquesta bossa és ___? (tuya)', o: ['teva', 'teu', 'tuya'], a: 'teva' }, { q: '___ pares són de Còrdova. (mis)', a: 'els meus' }
    ] },
  { id: 'demostratius', title: 'Els demostratius', es: 'aquest, aquell, això, allò', html: `
<p>El catalán central usa dos grados:</p>
<table><thead><tr><th></th><th>masc.</th><th>fem.</th><th>masc. pl.</th><th>fem. pl.</th></tr></thead><tbody>
<tr><td>este / ese (cerca)</td><td><b>aquest</b></td><td><b>aquesta</b></td><td><b>aquests</b></td><td><b>aquestes</b></td></tr>
<tr><td>aquel (lejos)</td><td><b>aquell</b></td><td><b>aquella</b></td><td><b>aquells</b></td><td><b>aquelles</b></td></tr></tbody></table>
<p>Neutros: <b>això</b> (esto, eso) · <b>allò</b> (aquello). Lugar: <b>aquí</b> · <b>allà</b>.</p>`,
    ex: [
      { q: '___ llibre és meu. (este)', a: 'aquest' }, { q: '___ noies són les meves cosines. (estas)', a: 'aquestes' },
      { q: 'Veus ___ casa del fons? (aquella)', a: 'aquella' }, { q: 'Què és ___? (esto)', a: 'això' },
      { q: '___ cotxes són molt cars. (aquellos)', a: 'aquells' }, { q: '___ samarreta és massa gran. (esta)', a: 'aquesta' },
      { q: 'Què és ___ d\'allà? (aquello)', o: ['allò', 'això', 'aquell'], a: 'allò' }
    ] },
  { id: 'present', title: 'El present', es: 'Verbos regulares: -ar, -re, -ir', html: `
<table><thead><tr><th></th><th>parlar</th><th>perdre</th><th>dormir</th><th>llegir</th></tr></thead><tbody>
<tr><td>jo</td><td>parl<b>o</b></td><td>perd<b>o</b></td><td>dorm<b>o</b></td><td>lleg<b>eixo</b></td></tr>
<tr><td>tu</td><td>parl<b>es</b></td><td>perd<b>s</b></td><td>dorm<b>s</b></td><td>lleg<b>eixes</b></td></tr>
<tr><td>ell, ella</td><td>parl<b>a</b></td><td>perd</td><td>dorm</td><td>lleg<b>eix</b></td></tr>
<tr><td>nosaltres</td><td>parl<b>em</b></td><td>perd<b>em</b></td><td>dorm<b>im</b></td><td>lleg<b>im</b></td></tr>
<tr><td>vosaltres</td><td>parl<b>eu</b></td><td>perd<b>eu</b></td><td>dorm<b>iu</b></td><td>lleg<b>iu</b></td></tr>
<tr><td>ells, elles</td><td>parl<b>en</b></td><td>perd<b>en</b></td><td>dorm<b>en</b></td><td>lleg<b>eixen</b></td></tr></tbody></table>
<p>La mayoría de verbos en <i>-ir</i> son como <b>llegir</b> (<i>incoatius</i>, con <b>-eix-</b>): <b>preferir</b> → prefereixo, <b>servir</b> → serveixo, <b>construir</b> → construeixo. Unos pocos son como <b>dormir</b>: <b>sortir</b> (surto), <b>obrir</b> (obro), <b>sentir</b> (sento).</p>
<p>Ortografía en <i>-ar</i>: cuando la terminación empieza por <i>e</i>, la consonante cambia para mantener el sonido: <b>menjar</b> → mengem, <b>pagar</b> → paguem, <b>començar</b> → comencem, <b>trucar</b> → truquem.</p>
<p>Pronombres: jo, tu, ell / ella / <b>vostè</b> (usted), nosaltres, vosaltres, ells / elles / <b>vostès</b>. Normalmente se omiten.</p>`,
    ex: [
      { q: 'Jo ___ català cada dia. (estudiar)', a: 'estudio' }, { q: 'Tu ___ a Barcelona? (treballar)', a: 'treballes' },
      { q: 'Nosaltres ___ a les nou. (sopar)', a: 'sopem' }, { q: 'Ells ___ molt bé. (cantar)', a: 'canten' },
      { q: 'Vosaltres ___ el diari? (llegir)', a: 'llegiu' }, { q: 'Ella sempre ___ el tren. (perdre)', a: 'perd' },
      { q: 'Jo ___ el cafè sense sucre. (preferir)', a: 'prefereixo' }, { q: 'El nen ___ deu hores. (dormir)', a: 'dorm' },
      { q: 'Vostè ___ anglès? (parlar)', a: 'parla' }, { q: 'Nosaltres ___ a les dues. (menjar)', a: 'mengem' },
      { q: 'Jo ___ un llibre cada mes. (llegir)', a: 'llegeixo' }
    ] },
  { id: 'irregulars', title: 'Verbs irregulars', es: 'tenir, fer, anar, venir, poder, voler…', html: `
<table><thead><tr><th></th><th>tenir</th><th>fer</th><th>anar</th><th>venir</th><th>poder</th><th>voler</th></tr></thead><tbody>
<tr><td>jo</td><td><b>tinc</b></td><td><b>faig</b></td><td><b>vaig</b></td><td><b>vinc</b></td><td><b>puc</b></td><td><b>vull</b></td></tr>
<tr><td>tu</td><td>tens</td><td>fas</td><td>vas</td><td>vens</td><td>pots</td><td>vols</td></tr>
<tr><td>ell</td><td><b>té</b></td><td>fa</td><td>va</td><td>ve</td><td>pot</td><td>vol</td></tr>
<tr><td>nos.</td><td>tenim</td><td>fem</td><td><b>anem</b></td><td>venim</td><td>podem</td><td>volem</td></tr>
<tr><td>vos.</td><td>teniu</td><td>feu</td><td><b>aneu</b></td><td>veniu</td><td>podeu</td><td>voleu</td></tr>
<tr><td>ells</td><td>tenen</td><td>fan</td><td>van</td><td>venen</td><td>poden</td><td>volen</td></tr></tbody></table>
<p>Otras primeras personas que hay que memorizar: <b>sé</b> (saber), <b>dic</b> (dir), <b>veig</b> (veure), <b>bec</b> (beure), <b>visc</b> (viure), <b>escric</b> (escriure), <b>conec</b> (conèixer), <b>surto</b> (sortir), <b>entenc</b> (entendre), <b>prenc</b> (prendre).</p>
<p>Practica todos los tiempos en la pestaña <b>Verbs</b>.</p>`,
    ex: [
      { q: 'Jo ___ dos germans. (tenir)', a: 'tinc' }, { q: 'Què ___ aquest cap de setmana? (fer, tu)', a: 'fas' },
      { q: 'Jo ___ a la feina amb metro. (anar)', a: 'vaig' }, { q: 'Jo no ___ venir demà. (poder)', a: 'puc' },
      { q: 'Jo ___ un cafè, si us plau. (voler)', a: 'vull' }, { q: 'No ho ___. (saber, jo)', a: 'sé' },
      { q: 'Jo ___ de la biblioteca. (venir)', a: 'vinc' }, { q: 'Què ___ ells? (dir)', a: 'diuen' },
      { q: 'Jo ___ a Tarragona. (viure)', a: 'visc' }, { q: 'Jo no ___ el teu germà. (conèixer)', a: 'conec' },
      { q: 'Jo ___ de casa a les set. (sortir)', a: 'surto' }, { q: 'Ho sento, no t\'___. (entendre, jo)', a: 'entenc' }
    ] },
  { id: 'periphrastic', title: 'El passat perifràstic', es: 'vaig anar = fui (¡no «voy a ir»!)', html: `
<p>Es el pasado más usado para acciones acabadas (<i>ahir, la setmana passada, l'any 2020, fa dos dies</i>). Se forma con el presente de <b>anar</b> + infinitivo:</p>
<table><tbody><tr><td>jo</td><td><b>vaig</b> parlar</td><td>hablé</td></tr><tr><td>tu</td><td><b>vas</b> (vares) parlar</td><td>hablaste</td></tr>
<tr><td>ell, ella</td><td><b>va</b> parlar</td><td>habló</td></tr><tr><td>nosaltres</td><td><b>vam</b> (vàrem) parlar</td><td>hablamos</td></tr>
<tr><td>vosaltres</td><td><b>vau</b> (vàreu) parlar</td><td>hablasteis</td></tr><tr><td>ells, elles</td><td><b>van</b> (varen) parlar</td><td>hablaron</td></tr></tbody></table>
<p><strong>El error más típico:</strong> <b>Vaig menjar</b> significa «comí», no «voy a comer». Para hablar del futuro usa el futuro: <b>menjaré</b>.</p>
<p>Con pronombres: <b>em vaig llevar</b> o <b>vaig llevar-me</b> (me levanté).</p>`,
    ex: [
      { q: 'Ahir ___ al cinema. (anar, jo)', a: 'vaig anar' }, { q: 'La setmana passada ___ l\'àvia. (visitar, nosaltres)', a: ['vam visitar', 'vàrem visitar'] },
      { q: 'Què ___ dissabte? (fer, tu)', a: ['vas fer', 'vares fer'] }, { q: 'L\'any passat ___ a Itàlia. (viatjar, ells)', a: ['van viatjar', 'varen viatjar'] },
      { q: 'Fa dos dies ___ un correu. (rebre, jo)', a: 'vaig rebre' }, { q: 'Ahir ella ___ molt tard. (arribar)', a: 'va arribar' },
      { q: '¿Qué significa «Vaig sopar a les nou»?', o: ['Cené a las nueve', 'Voy a cenar a las nueve', 'Ceno a las nueve'], a: 'Cené a las nueve' },
      { q: 'Mañana voy a cenar con Joan →', o: ['Demà soparé amb en Joan', 'Demà vaig sopar amb en Joan', 'Demà he sopat amb en Joan'], a: 'Demà soparé amb en Joan' },
      { ord: 'ahir vaig dinar amb la meva mare', es: 'Ayer comí con mi madre' }
    ] },
  { id: 'perfet', title: 'El pretèrit perfet', es: 'he menjat, has vist…', html: `
<p><b>haver</b> (<b>he, has, ha, hem, heu, han</b>) + participio. Para acciones dentro de un periodo que aún no ha terminado: <i>avui, aquest matí, aquesta setmana, aquest any, mai, ja, encara no</i>.</p>
<p>Participios regulares: -ar → <b>-at</b> (parlat) · -er/-re → <b>-ut</b> (perdut) · -ir → <b>-it</b> (dormit).</p>
<p>Irregulares frecuentes: <b>fet</b> (fer), <b>dit</b> (dir), <b>vist</b> (veure), <b>escrit</b>, <b>obert</b>, <b>pres</b> (prendre), <b>entès</b>, <b>estat</b> (ser / estar), <b>tingut</b>, <b>vingut</b>, <b>pogut</b>, <b>volgut</b>, <b>sabut</b>, <b>begut</b>, <b>viscut</b>, <b>conegut</b>.</p>
<p>Contraste: <b>Avui he dinat a casa</b> / <b>Ahir vaig dinar a casa</b>.</p>`,
    ex: [
      { q: 'Aquest matí ___ molt. (treballar, jo)', a: 'he treballat' }, { q: 'Avui ___ el diari? (llegir, tu)', a: 'has llegit' },
      { q: 'Encara no ___ els deures. (fer, nosaltres)', a: 'hem fet' }, { q: 'Aquesta setmana ___ mal de cap. (tenir, jo)', a: 'he tingut' },
      { q: 'Mai ___ a Menorca. (estar, ells)', a: 'han estat' }, { q: 'Ja ___ el correu? (escriure, vosaltres)', a: 'heu escrit' },
      { q: 'Avui la Laia ___ la botiga a les nou. (obrir)', a: 'ha obert' },
      { q: 'Ahir ___ al teatre.', o: ['vaig anar', 'he anat'], a: 'vaig anar' }, { q: 'Aquest any ___ tres vegades a Andorra.', o: ['vaig anar', 'he anat'], a: 'he anat' }
    ] },
  { id: 'futur', title: 'El futur', es: 'parlaré, faré, aniré…', html: `
<p>Infinitivo + <b>-é, -às, -à, -em, -eu, -an</b>: parlar → <b>parlaré, parlaràs, parlarà, parlarem, parlareu, parlaran</b>.</p>
<p>Irregulares: <b>faré</b> (fer), <b>aniré</b> (anar), <b>tindré</b> (tenir), <b>vindré</b> (venir), <b>podré</b>, <b>voldré</b>, <b>sabré</b>, <b>hauré</b>, <b>veuré</b>, <b>beuré</b>, <b>viuré</b>, <b>escriuré</b>, <b>entendré</b>, <b>perdré</b>.</p>
<p>Marcadores: <i>demà, la setmana que ve, l'any que ve, d'aquí a dos dies</i>.</p>`,
    ex: [
      { q: 'Demà ___ a la platja. (anar, nosaltres)', a: 'anirem' }, { q: 'La setmana que ve ___ més temps. (tenir, jo)', a: 'tindré' },
      { q: 'Què ___ l\'estiu que ve? (fer, tu)', a: 'faràs' }, { q: 'Ells ___ a les vuit. (arribar)', a: 'arribaran' },
      { q: 'Vosaltres ___ a la festa? (venir)', a: 'vindreu' }, { q: 'Demà ___ sol. (fer)', a: 'farà' },
      { q: 'Jo et ___ aquesta nit. (trucar)', a: 'trucaré' }, { q: 'Nosaltres ___ català cada dia. (parlar)', a: 'parlarem' }
    ] },
  { id: 'imperfet', title: "L'imperfet", es: 'Descripciones y hábitos del pasado', html: `
<p>Para describir el pasado y hablar de costumbres: <b>Quan era petit, vivia a Sevilla</b>.</p>
<table><thead><tr><th></th><th>-ar (parlar)</th><th>-er / -re / -ir (perdre)</th></tr></thead><tbody>
<tr><td>jo</td><td>parl<b>ava</b></td><td>perd<b>ia</b></td></tr><tr><td>tu</td><td>parl<b>aves</b></td><td>perd<b>ies</b></td></tr>
<tr><td>ell</td><td>parl<b>ava</b></td><td>perd<b>ia</b></td></tr><tr><td>nosaltres</td><td>parl<b>àvem</b></td><td>perd<b>íem</b></td></tr>
<tr><td>vosaltres</td><td>parl<b>àveu</b></td><td>perd<b>íeu</b></td></tr><tr><td>ells</td><td>parl<b>aven</b></td><td>perd<b>ien</b></td></tr></tbody></table>
<p>Irregulares: <b>era</b> (ser), <b>feia</b> (fer), <b>deia</b> (dir), <b>veia</b> (veure), <b>bevia</b> (beure), <b>vivia</b> (viure), <b>escrivia</b> (escriure).</p>`,
    ex: [
      { q: 'Quan era petit, ___ a Sevilla. (viure, jo)', a: 'vivia' }, { q: 'Abans ___ a futbol cada dissabte. (jugar, nosaltres)', a: 'jugàvem' },
      { q: 'La meva àvia ___ molt bé. (cuinar)', a: 'cuinava' }, { q: 'Quan ___ joves, sortien molt. (ser, ells)', a: 'eren' },
      { q: 'Abans no ___ esport. (fer, jo)', a: 'feia' }, { q: 'Tu ___ a l\'escola a peu? (anar)', a: 'anaves' },
      { q: 'De petits, ___ molta llet. (beure, nosaltres)', a: 'bevíem' }
    ] },
  { id: 'interrogatius', title: 'Preguntes', es: 'què, qui, on, quan, com, quant, quin', html: `
<table><tbody><tr><td><b>què</b></td><td>qué</td><td>Què vols?</td></tr><tr><td><b>qui</b></td><td>quién</td><td>Qui és?</td></tr>
<tr><td><b>on</b></td><td>dónde</td><td>On vius?</td></tr><tr><td><b>d'on</b></td><td>de dónde</td><td>D'on ets?</td></tr>
<tr><td><b>quan</b></td><td>cuándo</td><td>Quan arribes?</td></tr><tr><td><b>com</b></td><td>cómo</td><td>Com et dius?</td></tr>
<tr><td><b>quant / quanta / quants / quantes</b></td><td>cuánto/a/os/as</td><td>Quants anys tens?</td></tr>
<tr><td><b>quin / quina / quins / quines</b></td><td>qué / cuál + nombre</td><td>Quina hora és?</td></tr>
<tr><td><b>per què</b></td><td>por qué</td><td>Per què no vens?</td></tr></tbody></table>
<p><b>Per què</b> (pregunta) ≠ <b>perquè</b> (respuesta, «porque»).</p>`,
    ex: [
      { q: '___ et dius?', o: ['Com', 'Què', 'Qui'], a: 'Com' }, { q: '___ vius?', o: ['On', 'Quan', 'Quin'], a: 'On' },
      { q: '___ anys tens?', o: ['Quants', 'Quantes', 'Quins'], a: 'Quants' }, { q: '___ hora és?', o: ['Quina', 'Quin', 'Què'], a: 'Quina' },
      { q: '___ vols beure?', o: ['Què', 'Qui', 'Quin'], a: 'Què' }, { q: '___ és aquell noi?', o: ['Qui', 'Què', 'Com'], a: 'Qui' },
      { q: '___ no vens? — ___ estic malalt.', o: ['Per què / Perquè', 'Perquè / Per què', 'Per què / Per què'], a: 'Per què / Perquè' },
      { q: '___ germanes tens?', o: ['Quantes', 'Quants', 'Quines'], a: 'Quantes' },
      { q: '___ comença la classe?', o: ['A quina hora', 'Quina hora', 'A quin hora'], a: 'A quina hora' },
      { q: '___ ets? — De Burgos.', o: ["D'on", 'On', 'De què'], a: "D'on" }
    ] },
  { id: 'hores', title: 'Les hores i els números', es: 'El sistema de «quarts»', html: `
<p><b>Quina hora és?</b> — <b>És la una</b> (singular) · <b>Són les tres</b> (plural).</p>
<p>El sistema tradicional cuenta los cuartos <strong>hacia la hora siguiente</strong>. Es imprescindible entenderlo:</p>
<table><tbody><tr><td class="num">4:00</td><td><b>Són les quatre en punt</b></td></tr>
<tr><td class="num">4:15</td><td><b>És un quart de cinc</b></td></tr><tr><td class="num">4:30</td><td><b>Són dos quarts de cinc</b></td></tr>
<tr><td class="num">4:45</td><td><b>Són tres quarts de cinc</b></td></tr><tr><td class="num">12:30</td><td><b>Són dos quarts d'una</b></td></tr></tbody></table>
<p>También se acepta <b>les quatre i quart</b>, <b>les quatre i mitja</b>, <b>les cinc menys quart</b>.</p>
<p>Partes del día: <b>del matí</b>, <b>del migdia</b>, <b>de la tarda</b>, <b>del vespre</b>, <b>de la nit</b>.</p>
<p>Números: <b>dos / dues</b> según el género (<b>dues germanes</b>), con guion <b>vint-i-u</b>, <b>trenta-dos</b>, <b>dos-cents</b>.</p>`,
    ex: [
      { q: '4:30', o: ['Són dos quarts de cinc', 'Són dos quarts de quatre', 'És un quart de cinc'], a: 'Són dos quarts de cinc' },
      { q: '9:15', o: ['És un quart de deu', 'És un quart de nou', 'Són tres quarts de deu'], a: 'És un quart de deu' },
      { q: '7:45', o: ['Són tres quarts de vuit', 'Són tres quarts de set', 'Són dos quarts de vuit'], a: 'Són tres quarts de vuit' },
      { q: '1:00', o: ['És la una', 'Són la una', "És l'una"], a: 'És la una' },
      { q: '12:30', o: ["Són dos quarts d'una", 'Són dos quarts de dotze', 'És mig de dotze'], a: "Són dos quarts d'una" },
      { q: 'Tinc ___ germanes. (2)', a: 'dues' }, { q: '21 → ___', a: ['vint-i-u', 'vint-i-un'] }, { q: '32 → ___', a: 'trenta-dos' },
      { q: '200 euros → ___ euros', a: 'dos-cents' }, { q: 'Hi ha ___ persones. (15)', a: 'quinze' }
    ] },
  { id: 'pronoms', title: 'Pronoms febles bàsics', es: 'em, et, es · el, la · hi · en', html: `
<p><strong>Reflexivos:</strong> <b>em</b> llevo, <b>et</b> dutxes, <b>es</b> vesteix, <b>ens</b> quedem, <b>us</b> lleveu, <b>es</b> diverteixen. Delante de vocal: <b>m'</b>, <b>t'</b>, <b>s'</b>.</p>
<p><strong>Complemento directo:</strong> <b>el</b>, <b>la</b>, <b>els</b>, <b>les</b>. <b>Vols el cafè? — Sí, el vull.</b> Delante de vocal: <b>l'he vist</b>.</p>
<p><strong>Indirecto:</strong> <b>em, et, li, ens, us, els</b>: <b>Li dono el llibre.</b></p>
<p><strong>Hi</strong> = a ese lugar: <b>Vas a Girona? — Sí, hi vaig.</b></p>
<p><strong>En</strong> = cantidad: <b>Tens germans? — Sí, en tinc dos.</b> · <b>Vols pa? — No, no en vull.</b></p>
<p><strong>Posición:</strong> delante del verbo conjugado, detrás del infinitivo con guion: <b>el compro</b> / <b>vull comprar-lo</b>.</p>`,
    ex: [
      { q: 'Vas a la platja? — Sí, ___ vaig cada dia.', o: ['hi', 'en', 'la'], a: 'hi' },
      { q: 'Tens fills? — Sí, ___ tinc tres.', o: ['en', 'els', 'hi'], a: 'en' },
      { q: 'Coneixes la Marta? — Sí, ___ conec.', o: ['la', 'li', 'en'], a: 'la' },
      { q: 'On són les claus? — No ___ trobo.', o: ['les', 'els', 'en'], a: 'les' },
      { q: 'Vols aquest llibre? — Sí, ___ vull.', o: ['el', 'li', 'hi'], a: 'el' },
      { q: 'Vull comprar el cotxe → Vull ___', o: ['comprar-lo', 'el comprar', 'comprar-el'], a: 'comprar-lo' },
      { q: 'A quina hora ___ lleves? (tu)', o: ['et', 'te', 'es'], a: 'et' }, { q: 'Nosaltres ___ dutxem al matí.', o: ['ens', 'nos', 'es'], a: 'ens' },
      { q: 'Vosaltres ___ quedeu a sopar?', o: ['us', 'vos', 'es'], a: 'us' }
    ] },
  { id: 'agradar', title: 'Agradar', es: 'Expresar gustos', html: `
<table><tbody><tr><td>a mi</td><td><b>m'agrada</b> / <b>m'agraden</b></td></tr><tr><td>a tu</td><td><b>t'agrada</b></td></tr>
<tr><td>a ell, a ella</td><td><b>li agrada</b></td></tr><tr><td>a nosaltres</td><td><b>ens agrada</b></td></tr>
<tr><td>a vosaltres</td><td><b>us agrada</b></td></tr><tr><td>a ells, a elles</td><td><b>els agrada</b></td></tr></tbody></table>
<p>Plural si lo que gusta es plural: <b>m'agraden els gats</b>. Igual con <b>encantar</b>.</p>
<p>Reaccionar: <b>a mi també</b> · <b>a mi tampoc</b> · <b>a mi sí</b> · <b>a mi no</b>. Intensidad: <b>no m'agrada gens</b> (nada).</p>`,
    ex: [
      { q: "M'___ molt les pel·lícules de por.", o: ['agrada', 'agraden'], a: 'agraden' }, { q: 'A la Laia ___ agrada nedar.', o: ['li', 'la', 'els'], a: 'li' },
      { q: 'A nosaltres ___ agrada la muntanya.', o: ['ens', 'nos', 'els'], a: 'ens' }, { q: 'A vosaltres ___ agrada el futbol?', o: ['us', 'vos', 'els'], a: 'us' },
      { q: 'Als meus pares ___ agrada viatjar.', o: ['els', 'les', 'li'], a: 'els' }, { q: "M'agrada el cafè. — A mi ___. (también)", a: 'també' },
      { q: "No m'agrada el peix. — A mi ___. (tampoco)", a: 'tampoc' }, { q: 'Ens ___ els gats. (encantar)', a: 'encanten' }
    ] },
  { id: 'preposicions', title: 'Preposicions', es: 'a, en, amb, de, per, per a', html: `
<p><b>a</b> + lugar o destino: <b>Visc a Lleida</b> · <b>Vaig a l'escola</b> · <b>Som a casa</b>.</p>
<p><b>en</b> delante de <i>un, una, aquest, aquell…</i>: <b>Treballo en una botiga</b> · <b>en aquell bar</b>.</p>
<p><b>amb</b> = con, también transporte: <b>amb tren</b>, <b>amb cotxe</b> (o <b>en tren</b>). Pero: <b>a peu</b>.</p>
<p><strong>Interferencia típica:</strong> «por la tarde» → <b>a la tarda</b>; «por la mañana» → <b>al matí</b>.</p>
<p><b>per a</b> + persona o finalidad: <b>Aquest regal és per a tu</b>. <b>per</b> + infinitivo: <b>Estudio per aprovar</b>.</p>
<p><b>des de … fins a</b>: <b>des de les nou fins a les dues</b>.</p>`,
    ex: [
      { q: 'Visc ___ Girona.', o: ['a', 'en'], a: 'a' }, { q: 'Treballo ___ una botiga de roba.', o: ['en', 'a'], a: 'en' },
      { q: 'Vaig a la feina ___ tren.', o: ['amb', 'de', 'a'], a: 'amb' }, { q: 'Ens veiem ___ la tarda. (por la tarde)', o: ['a', 'per', 'en'], a: 'a' },
      { q: 'Aquest regal és ___ tu.', o: ['per a', 'de', 'a'], a: 'per a' },
      { q: 'La botiga obre ___ les nou ___ les vuit.', o: ['des de / fins a', 'des / fins', 'per / fins'], a: 'des de / fins a' },
      { q: "Vaig a l'escola ___ peu.", o: ['a', 'amb', 'en'], a: 'a' }, { q: 'Soc ___ Saragossa.', o: ['de', 'a', 'en'], a: 'de' },
      { q: 'Ens trobem ___ aquell bar.', o: ['en', 'a'], a: 'en' }
    ] },
  { id: 'negacio', title: 'Negació i quantitat', es: 'res, ningú, cap, gens, mai · molt, poc', html: `
<p><b>res</b> = nada · <b>ningú</b> = nadie · <b>cap</b> = ningún · <b>gens</b> = nada de / en absoluto · <b>mai</b> = nunca · <b>tampoc</b> = tampoco.</p>
<p>Detrás del verbo llevan <b>no</b>: <b>No vull res</b>. <b>No hi ha ningú</b>. <b>No tinc cap germà</b>. <b>No m'agrada gens</b>.</p>
<p>Cuantificadores que concuerdan: <b>molt / molta / molts / moltes</b>, <b>poc / poca / pocs / poques</b>. <b>Tinc molta feina</b>.</p>
<p><b>gaire</b> = mucho, en frases negativas o preguntas: <b>No en tinc gaire</b>.</p>`,
    ex: [
      { q: 'No tinc ___ germà. (ningún)', o: ['cap', 'ningú', 'gens'], a: 'cap' }, { q: 'No hi ha ___ a la classe. (nadie)', o: ['ningú', 'res', 'cap'], a: 'ningú' },
      { q: 'No vull ___. (nada)', o: ['res', 'gens', 'cap'], a: 'res' }, { q: "No m'agrada ___. (nada, en absoluto)", o: ['gens', 'res', 'cap'], a: 'gens' },
      { q: 'Tinc ___ feina.', o: ['molta', 'molt', 'moltes'], a: 'molta' }, { q: 'Hi ha ___ turistes. (pocos)', o: ['pocs', 'poc', 'poques'], a: 'pocs' },
      { q: '___ vaig al gimnàs. (nunca)', o: ['Mai', 'Res', 'Cap'], a: 'Mai' }, { q: 'Tens gana? — No ___. (no mucha)', o: ['gaire', 'molt pas', 'massa'], a: 'gaire' }
    ] },
  { id: 'obligacio', title: 'Obligació, plans i cortesia', es: 'haver de, cal, voldria, m\'agradaria', html: `
<p><strong>Obligación:</strong> <b>haver de</b> + infinitivo = tener que: <b>He de treballar</b> (también <i>haig de</i>). ¡Nunca «tinc que»! Impersonal: <b>cal</b> + infinitivo = hay que: <b>Cal portar el DNI</b>.</p>
<p><strong>Futuro:</strong> la construcción «ir a + infinitivo» no sirve para el futuro (<i>vaig menjar</i> es pasado). Usa el futuro: <b>Demà estudiaré</b>, o <b>penso</b> / <b>vull</b> + infinitivo.</p>
<p><strong>Cortesía (condicional):</strong> <b>Voldria un cafè</b> · <b>Podria obrir la finestra?</b> · <b>M'agradaria viatjar al Japó</b>.</p>`,
    ex: [
      { q: 'Demà ___ treballar fins tard. (tengo que)', o: ['he de', 'tinc que', 'haig que'], a: 'he de' },
      { q: '___ portar el passaport. (hay que)', o: ['Cal', 'Hi ha que', 'Té que'], a: 'Cal' },
      { q: 'Nosaltres ___ estudiar més. (tenemos que)', o: ['hem de', 'tenim que', 'havem que'], a: 'hem de' },
      { q: '___ un cafè amb llet, si us plau. (querría)', o: ['Voldria', 'Volria', 'Vull que'], a: 'Voldria' },
      { q: '___ obrir la finestra? (¿Podría…?)', o: ['Podria', 'Pogués', 'Podré'], a: 'Podria' },
      { q: "M'___ viatjar al Japó. (me gustaría)", o: ['agradaria', 'agradarà', 'agradava'], a: 'agradaria' },
      { q: 'Mañana voy a estudiar →', o: ['Demà estudiaré', 'Demà vaig estudiar', 'Demà he estudiat'], a: 'Demà estudiaré' }
    ] },
  { id: 'ortografia', title: 'Ortografia bàsica', es: 'l·l, ny, ç, x, tx, accents i dièresi', html: `
<p><strong>Ela geminada (l·l):</strong> se pronuncia como una <i>l</i> larga: <b>col·legi</b>, <b>pel·lícula</b>, <b>il·lusió</b>, <b>intel·ligent</b>. No confundir con <b>ll</b> (como la «ll» castellana tradicional): <b>llum</b>, <b>cavall</b>.</p>
<p><b>ny</b> = ñ: <b>any</b>, <b>Espanya</b>, <b>senyor</b>. <b>ç</b> ante a, o, u y a final: <b>plaça</b>, <b>braç</b>.</p>
<p><b>x</b> / <b>ix</b> suenan como la «sh» inglesa: <b>xocolata</b>, <b>peix</b>. <b>tx</b> = «ch»: <b>cotxe</b>. <b>tg / tj</b>: <b>metge</b>, <b>platja</b>.</p>
<p><strong>Acentos:</strong> la <i>a</i> siempre lleva grave (<b>à</b>), la <i>i</i> y la <i>u</i> siempre aguda (<b>í, ú</b>). La <i>e</i> y la <i>o</i> pueden ser abiertas (<b>è, ò</b>) o cerradas (<b>é, ó</b>): <b>cafè</b>, <b>també</b>, <b>anglès</b>, <b>camió</b>, <b>telèfon</b>.</p>
<p><strong>Dièresi:</strong> <b>veïna</b>, <b>països</b>, <b>llengües</b>.</p>`,
    ex: [
      { q: 'película', o: ['pel·lícula', 'pellícula', 'pelicula'], a: 'pel·lícula' }, { q: 'colegio', o: ['col·legi', 'collegi', 'colegi'], a: 'col·legi' },
      { q: 'café', o: ['cafè', 'café', 'cafe'], a: 'cafè' }, { q: 'también', o: ['també', 'tambè', 'tambe'], a: 'també' },
      { q: 'aquí', o: ['aquí', 'aquì', 'aqui'], a: 'aquí' }, { q: 'plaza', o: ['plaça', 'plassa', 'plaza'], a: 'plaça' },
      { q: 'vecina', o: ['veïna', 'veína', 'veina'], a: 'veïna' }, { q: 'música', o: ['música', 'mùsica', 'musica'], a: 'música' },
      { q: 'coche', o: ['cotxe', 'coxe', 'cotche'], a: 'cotxe' }, { q: 'España', o: ['Espanya', 'Espanña', 'Espània'], a: 'Espanya' },
      { q: 'teléfono', o: ['telèfon', 'telefon', 'teléfon'], a: 'telèfon' }, { q: 'inglés', o: ['anglès', 'anglés', 'angles'], a: 'anglès' }
    ] }
];
