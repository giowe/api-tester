"use strict"

const mysql = require("mysql")
const { conf, ids, unescapedDatabase: database } = require("./../constants")
const { htmlBodiesIt, htmlBodiesEn } = require("./../contents")

const query = [
  // CONTENTS MAIN TABLES
  `INSERT INTO ${ids.contents.types}
    (id, lang, permalink, label)
  VALUES
    (1, 'it', 'pagine', 'Pagine'),
    (1, 'en', 'pages', 'Pages'),
    (2, 'it', 'pavimenti', 'Pavimenti'),
    (2, 'en', 'floors', 'Floors'),
    (3, 'it', 'servizi', 'Servizi'),
    (3, 'en', 'services', 'Services'),
    (4, 'it', 'realizzazioni', 'Realizzazioni'),
    (4, 'en', 'portfolio', 'Portfolio'),
    (5, 'it', 'blog', 'Blog'),
    (5, 'en', 'blog', 'Blog');`,

  `INSERT INTO ${ids.contents.categories}
    (id, lang, permalink, label, typeId)
  VALUES
    (1, 'it', 'mangoItaliano', 'Mango Italiano', 1),
    (1, 'en', 'mangoInglese', 'Mango Inglese', 1),
    (2, 'it', 'melaItaliana', 'Mela Italiana', 3),
    (2, 'en', 'melaInglese', 'Mela Inglese', 3),
    (3, 'it', 'caneItaliano', 'Cane Italiano', 4);`,

  `INSERT INTO ${ids.contents.tags}
    (lang, typeId, permalink, label)
  VALUES
    ('it', 5, 'rosso', 'rosso'),
    ('en', 5, 'red', 'red'),
    ('it', 5, 'verde', 'verde'),
    ('en', 5, 'green', 'green'),
    ('it', 5, 'giallo', 'giallo'),
    ('en', 5, 'yellow', 'yellow');
  `,

  `INSERT INTO ${ids.contents.contents}
    (id, lang, typeId, permalink, title, body, status, featuredImage, authorId)
  VALUES
    (1, 'it', 1, 'home', 'Home', null, 1, '', 2),
    (1, 'en', 1, 'home', 'Home', null, 1, '', 2),
    (2, 'it', 1, 'azienda', 'Azienda', ${htmlBodiesIt.azienda}, 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-about-us.jpg', null),
    (2, 'en', 1, 'company', 'Company', ${htmlBodiesEn.azienda}, 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-about-us.jpg', null),
    (3, 'it', 1, 'certificazioni', 'Certificazioni', '', 0, '', null),
    (3, 'en', 1, 'certifications', 'Certifications', '', 0, '', null),
    (4, 'it', 1, 'settori-di-competenza', 'Settori di competenza', '', 0, '', null),
    (4, 'en', 1, 'areas-of-expertise', 'Areas of expertise', '', 0, '', null),
    (5, 'it', 1, 'contatti', 'Contatti', '', 1, '', null),
    (5, 'en', 1, 'contacts', 'Contacts', '', 1, '', null),
    (6, 'it', 1, 'privacy', 'Privacy', '', 1, '', null),
    (6, 'en', 1, 'privacy', 'Privacy', '', 1, '', null),    
    (7, 'it', 1, 'pavimenti', 'Pavimenti', ${htmlBodiesIt.pavimenti}, 1, '', null),
    (7, 'en', 1, 'flooring', 'Flooring', ${htmlBodiesEn.pavimenti}, 1, '', null),
    (8, 'it', 1, 'altri-prodotti-servizi', 'Altri servizi', ${htmlBodiesIt.altri}, 1, '', null),
    (8, 'en', 1, 'other-services', 'Other services', ${htmlBodiesEn.altri}, 1, '', null),
    (9, 'it', 1, 'realizzazioni', 'Realizzazioni', '', 1, '', null),
    (9, 'en', 1, 'portfolio', 'Portfolio', '', 1, '', null),
    (10, 'it', 1, 'blog', 'Blog', '', 1, '', null),
    (10, 'en', 1, 'blog', 'Blog', '', 1, '', null),
    (20, 'it', 2, 'pavimenti-in-resina', 'Pavimenti in resina', ${htmlBodiesIt.pavimentiResina}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-02.jpeg', null),
    (20, 'en', 2, 'resin-floors', 'Resin floors', ${htmlBodiesEn.pavimentiResina}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-02.jpeg', null),
    (21, 'it', 2, 'pavimenti-aree-protette-da-scariche-elettrostatiche', 'Pavimenti per aree protette da scariche elettrostatiche', ${htmlBodiesIt.elettro}, 1, '', null),
    (21, 'en', 2, 'esd-floors', 'Electro-Static Discharge (ESD) floors', ${htmlBodiesEn.elettro}, 1, '', null),
    (22, 'it', 2, 'pavimenti-alta-resistenza-chimico-meccanica', 'Pavimenti ad alta resistenza chimico-meccanica', ${htmlBodiesIt.chem}, 1, '', null),
    (22, 'en', 2, 'chemical-mechanical-resistant-flooring', 'Chemical and mechanical resistant flooring', ${htmlBodiesEn.chem}, 1, '', null),
    (40, 'it', 3, 'rivestimenti-resina', 'Rivestimenti in resina', ${htmlBodiesIt.rivestimentiResina}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-02.jpeg', null),
    (40, 'en', 3, 'resin-coatings', 'Resin coatings', ${htmlBodiesEn.rivestimentiResina}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-02.jpeg', null),
    (41, 'it', 3, 'ristrutturazioni-calcestruzzi', 'Ristrutturazione calcestruzzi', ${htmlBodiesIt.ristrutturazioni}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-01.jpeg', null),
    (41, 'en', 3, 'concrete-reparation', 'Concrete reparation', ${htmlBodiesEn.ristrutturazioni}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-01.jpeg', null),
    (42, 'it', 3, 'ricostruzione-pavimenti-in-resina', 'Ricostruzione pavimenti in resina', ${htmlBodiesIt.ricostruzione}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-03.jpeg', null),
    (42, 'en', 3, 'resin-floor-reconstruction', 'Resin floor reconstruction', ${htmlBodiesEn.ricostruzione}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-03.jpeg', null),
    (43, 'it', 3, 'trattamenti-vasche-antiacido', 'Trattamenti vasche e antiacido', ${htmlBodiesIt.trattamenti}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-01.jpeg', null),
    (43, 'en', 3, 'antiacid-tank-treatments', 'Antiacid tank treatments', ${htmlBodiesEn.trattamenti}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-01.jpeg', null),
    (60, 'it', 4, 'pavimento-zona-commerciale', 'Pavimento per spazio commerciale', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-zona-commerciale.jpg', null),
    (60, 'en', 4, 'commercial-resin-floor', 'Commercial area flooring', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-zona-commerciale.jpg', null),
    (61, 'it', 4, 'pavimento-in-resina-linea-di-imbottigliamento', 'Pavimento per azienda di imbottigliamento per alimenti', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-linea-di-imbottigliamento.jpg', null),
    (61, 'en', 4, 'food-bottling-resin-floor', 'Floor specific for food bottling', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-linea-di-imbottigliamento.jpg', null),    
    (62, 'it', 4, 'pavimento-in-resina-garage-1', 'Pavimento in resina per garage sotterranei', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-garage.jpg', null),
    (62, 'en', 4, 'garage-resin-floor-1', 'Resin floor for garage', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-garage.jpg', null),    
    (63, 'it', 4, 'pavimento-in-resina-garage-2', 'Pavimento in resina per garage', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-garage.jpg', null),
    (63, 'en', 4, 'garage-resin-floor-2', 'Resin floor for garage', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-garage.jpg', null),
    (64, 'it', 4, 'pavimento-garage-vigili-del-fuoco', 'Pavimento in resina per garage Vigili del Fuoco', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-garage-vigili-del-fuoco.jpg', null),        
    (64, 'en', 4, 'firemen-garage-resin-floor-2', 'Resin floor for firemen''s garage', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-garage-vigili-del-fuoco.jpg', null),
    (65, 'it', 4, 'superfici-stradali', 'Pavimento in resina per superfici stradali', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-superfici-stradali.jpg', null),        
    (65, 'en', 4, 'street-surfaces', 'Pavimento in resina per superfici stradali', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-superfici-stradali.jpg', null),    
    (66, 'it', 4, 'pavimento-in-resina-cantina-vinicola', 'Pavimento in resina per cantina vinicola', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-cantina-vinicola.jpg', null),        
    (66, 'en', 4, 'winery-flooring', 'Winery resin flooring', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-cantina-vinicola.jpg', null),
    (67, 'it', 4, 'pavimento-in-resina-per-abitazione', 'Pavimento in resina per abitazione', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-per-abitazione.jpg', null),
    (67, 'en', 4, 'home-resin-flooring', 'Home flooring', '', 1, 'https://static-staging.irescantieri.it/uploads/ires-cantieri-realizzazioni-pavimento-in-resina-per-abitazione.jpg', null),
    (80, 'it', 5, 'come-pulire-un-pavimento-in-resina', 'Come pulire un pavimento in resina', ${htmlBodiesIt.pulirePavimentoResina}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-01.jpeg', null),
    (81, 'it', 5, '5-motivi-per-scegliere-pavimenti-in-resina', '5 motivi per scegliere pavimenti in resina', ${htmlBodiesIt.motiviPerSceglierePavimentiInResina}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-02.jpeg', null),
    (82, 'it', 5, 'scegliere-resina-industria-alimentare', 'Perché scegliere la resina per l''industria alimentare', ${htmlBodiesIt.scegliereLaResinaPerIndustriaAlimentare}, 1, 'https://static-staging.irescantieri.it/uploads/ires-placeholder-03.jpeg', null);`,

  // CONTENTS RELATIONAL TABLES
  `INSERT INTO ${ids.contents.contentsCategories}
    (contentId, categoryId, lang)
  VALUES
    (1, 1, 'it'),
    (1, 1, 'en'),
    (60, 3, 'it');`,

  `INSERT INTO ${ids.contents.asides}
    (lang, contentId, handler, label, body)
  VALUES
    ('it', 1, 'ctaBtnLabel', 'Call to action', 'Vuoi un preventivo senza impegno o maggiori informazioni?'),
    ('it', 1, 'ctaBtnText', 'Test bottone call to action', 'Contattaci'),
    ('it', 1, 'ctaUrl', 'Link contatti', '/#footer'),
    ('it', 1, 'portfolioLinkText', 'Testo link realizzazioni', 'Tutte le realizzazioni'),
    ('it', 1, 'portfolioUrl', 'Link realizzazioni', '/realizzazioni'),
    ('it', 1, 'section1Title', 'Titolo sezione 1', 'Ultimi articoli'),
    ('it', 1, 'blogLinkText', 'Testo link tutti gli articoli', 'Tutti gli articoli'),
    ('it', 1, 'blogUrl', 'Link tutti gli articoli', '/blog'),
    ('it', 1, 'slide1Text', 'Testo slide 1', 'Pavimenti in resina'),
    ('it', 1, 'slide1Url', 'Url slide 1', '/altri-prodotti-servizi/ristrutturazioni-calcestruzzi'),
    ('it', 1, 'slide1Image', 'Immagine slide 1', 'https://static-staging.irescantieri.it/uploads/ires-cantieri-posa-resina-epox.jpg'),
    ('it', 1, 'slide2Text', 'Testo slide 2', 'Ricostruzione calcestruzzi'),
    ('it', 1, 'slide2Url', 'Url slide 2', '/altri-prodotti-servizi/ristrutturazioni-calcestruzzi'),
    ('it', 1, 'slide2Image', 'Immagine slide 2', 'https://static-staging.irescantieri.it/uploads/ires-cantieri-ricostruzione-calcestruzzi.jpg'), 
    ('it', 1, 'slide3Text', 'Testo slide 3', 'Trattamenti vasche e antiacido'),
    ('it', 1, 'slide3Url', 'Url slide 3', '/altri-prodotti-servizi/trattamenti-vasche-antiacido'),
    ('it', 1, 'slide3Image', 'Immagine slide 3', 'https://static-staging.irescantieri.it/uploads/ires-cantieri-posa-resina.jpg'),
    ('it', 1, 'slide4Text', 'Testo slide 4', ''),
    ('it', 1, 'slide4Url', 'Url slide 4', ''),
    ('it', 1, 'slide4Image', 'Immagine slide 4', ''), 
    ('it', 1, 'slide5Text', 'Testo slide 5', ''),
    ('it', 1, 'slide5Url', 'Url slide 5', ''),
    ('it', 1, 'slide5Image', 'Immagine slide 5', ''),
    ('it', 5, 'companyName', 'Nome dell''azienda', 'IRES cantieri S.c.r.l.'),
    ('it', 5, 'email', 'Email', 'info@irescantieri.com'),
    ('it', 5, 'phone', 'Telefono', '+39 0522 59 99 41'),
    ('it', 5, 'fax', 'Fax', '+39 0522 59 99 41'),
    ('it', 5, 'address1Label', 'Nome indirizzo 1', 'Sede legale:'),
    ('it', 5, 'address1Address', 'Indirizzo 1', 'Via A. Varisco, 7'),
    ('it', 5, 'address1Zip', 'CAP indirizzo 1', '42020'),
    ('it', 5, 'address1City', 'Città indirizzo 1', 'Albinea'),
    ('it', 5, 'address1State', 'Provincia indirizzo 1', 'RE'),
    ('it', 5, 'address2Label', 'Nome indirizzo 2', ''),
    ('it', 5, 'address2Address', 'Indirizzo 2', ''),
    ('it', 5, 'address2Zip', 'CAP indirizzo 2', ''),
    ('it', 5, 'address2City', 'Città indirizzo 2', ''),
    ('it', 5, 'address2State', 'Provincia indirizzo 2', ''),
    ('it', 5, 'vatLabel', 'Sigla partita IVA', 'P.I.'),
    ('it', 5, 'vatNumber', 'Partita IVA', '01304090358'),
    ('it', 5, 'nameFieldLabel', 'Etichetta campo nome', 'Nome'),
    ('it', 5, 'nameFieldPlaceholderValue', 'Testo placeholder campo nome', 'Il tuo nome'),
    ('it', 5, 'emailFieldLabel', 'Etichetta campo email', 'Email'),
    ('it', 5, 'emailFieldPlaceholderValue', 'Testo placeholder campo email', 'Il tuo indirizzo email'),
    ('it', 5, 'messageFieldLabel', 'Etichetta campo messaggio', 'Come possiamo aiutarti?'),
    ('it', 5, 'messageFieldPlaceholderValue', 'Testo placeholder campo messaggio', 'Contattaci per qualiasi informazione aggiuntiva o per una quotazione senza impegno'),
    ('it', 5, 'submitButtonText', 'Testo bottone invia', 'Invia'), 
    ('en', 1, 'ctaBtnLabel', 'Call to action', 'Need more info? Get a free quote.'),
    ('en', 1, 'ctaBtnText', 'Test bottone call to action', 'Contact us'),
    ('en', 1, 'ctaUrl', 'Link contatti', '/#footer'),
    ('en', 1, 'portfolioLinkText', 'Testo link realizzazioni', 'View portfolio'),
    ('en', 1, 'portfolioUrl', 'Link realizzazioni', '/en/portfolio'),
    ('en', 1, 'section1Title', 'Titolo sezione 1', 'Latest news'),
    ('en', 1, 'blogLinkText', 'Testo link tutti gli articoli', 'All articles'),
    ('en', 1, 'blogUrl', 'Link tutti gli articoli', '/en/blog'),
    ('en', 1, 'slide1Text', 'Testo slide 1', 'Flooring'),
    ('en', 1, 'slide1Url', 'Url slide 1', '/en/flooring/resin-floors'),
    ('en', 1, 'slide1Image', 'Immagine slide 1', 'https://static-staging.irescantieri.it/uploads/ires-cantieri-slideshow01.jpg'),
    ('en', 1, 'slide2Text', 'Testo slide 2', 'Concrete remaking'),
    ('en', 1, 'slide2Url', 'Url slide 2', '/en/flooring/resin-floors'),
    ('en', 1, 'slide2Image', 'Immagine slide 2', 'https://static-staging.irescantieri.it/uploads/ires-cantieri-slideshow02.jpg'), 
    ('en', 1, 'slide3Text', 'Testo slide 3', 'Other title'),
    ('en', 1, 'slide3Url', 'Url slide 3', '/en/flooring/resin-floors'),
    ('en', 1, 'slide3Image', 'Immagine slide 3', 'https://static-staging.irescantieri.it/uploads/ires-cantieri-slideshow03.jpg'),
    ('en', 1, 'slide4Text', 'Testo slide 4', ''),
    ('en', 1, 'slide4Url', 'Url slide 4', ''),
    ('en', 1, 'slide4Image', 'Immagine slide 4', ''), 
    ('en', 1, 'slide5Text', 'Testo slide 5', ''),
    ('en', 1, 'slide5Url', 'Url slide 5', ''),
    ('en', 1, 'slide5Image', 'Immagine slide 5', ''),
    ('en', 5, 'companyName', 'Nome dell''azienda', 'IRES cantieri S.c.r.l.'),
    ('en', 5, 'email', 'Email', 'info@irescantieri.com'),
    ('en', 5, 'phone', 'Telefono', '+39 0522 59 99 41'),
    ('en', 5, 'fax', 'Fax', '+39 0522 59 99 41'),
    ('en', 5, 'address1Label', 'Nome indirizzo 1', 'Address:'),
    ('en', 5, 'address1Address', 'Indirizzo 1', 'Via A. Varisco, 7'),
    ('en', 5, 'address1Zip', 'CAP indirizzo 1', '42020'),
    ('en', 5, 'address1City', 'Città indirizzo 1', 'Albinea'),
    ('en', 5, 'address1State', 'Provincia indirizzo 1', 'RE - Italy'),
    ('en', 5, 'address2Label', 'Nome indirizzo 2', ''),
    ('en', 5, 'address2Address', 'Indirizzo 2', ''),
    ('en', 5, 'address2Zip', 'CAP indirizzo 2', ''),
    ('en', 5, 'address2City', 'Città indirizzo 2', ''),
    ('en', 5, 'address2State', 'Provincia indirizzo 2', ''),
    ('en', 5, 'vatLabel', 'Sigla partita IVA', 'VAT#'),
    ('en', 5, 'vatNumber', 'Partita IVA', '01304090358'),
    ('en', 5, 'nameFieldLabel', 'Etichetta campo nome', 'Name'),
    ('en', 5, 'nameFieldPlaceholderValue', 'Testo placeholder campo nome', 'Your full name'),
    ('en', 5, 'emailFieldLabel', 'Etichetta campo email', 'Email'),
    ('en', 5, 'emailFieldPlaceholderValue', 'Testo placeholder campo email', 'Your email address'),
    ('en', 5, 'messageFieldLabel', 'Etichetta campo messaggio', 'How can we assist you?'),
    ('en', 5, 'messageFieldPlaceholderValue', 'Testo placeholder campo messaggio', 'Please contact us to get a free quote or for any further question.'),
    ('en', 5, 'submitButtonText', 'Testo bottone invia', 'Submit');`,

  // PRINCIPALS MAIN TABLES
  `INSERT INTO ${ids.principals.users}
    (id, login, password, status, firstName, lastName)
  VALUES
    (1, 'admin', 'admin', 1, 'Admin', 'Admin'),
    (2, 'test', 'test', 1, 'Autore', 'Test');`,

  `INSERT INTO ${ids.principals.groups}
    (id, lang, permalink)
  VALUES
    (1, 'it', 'Amministratori'),
    (1, 'en', 'Administrators');`,

  // PRINCIPALS RELATIONAL TABLES
  `INSERT INTO ${ids.principals.usersGroups}
    (userId, groupId)
  VALUES
    (1, 1);`
]

const populateDatabase = (connectionOrPool) =>
  new Promise((resolve, reject) => {
    connectionOrPool.query(query.join("\n"), (error, data) => {
      if (error) { reject(error) }
      resolve(data)
    })
  })

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  const connection = mysql.createConnection(
    Object.assign(
      {},
      Object.assign(
        {},
        conf,
        {
          database: database,
          multipleStatements: true
        }
      )
    )
  )
  populateDatabase(connection)
    .then(data => { console.log(data) })
    .catch(error => { console.log(error) })
    .then(() => { connection.end() })
    .catch(error => { console.log(error) })
}

module.exports = populateDatabase
