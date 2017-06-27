"use strict"

const mysql = require("mysql")
const { conf, ids, unescapedDatabase: database } = require("./../constants")

const query = [
  // CONTENTS MAIN TABLES
  `CREATE TABLE IF NOT EXISTS ${ids.contents.types}(
    id INT(11) NOT NULL AUTO_INCREMENT,
    lang VARCHAR(2) NOT NULL,
    permalink VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    PRIMARY KEY(id, lang),
    UNIQUE(lang, permalink)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS ${ids.contents.contents}(
    id INT(11) NOT NULL AUTO_INCREMENT,
    lang VARCHAR(2) NOT NULL,
    typeId INT(11) NOT NULL,
    permalink VARCHAR(255) NOT NULL,
    status TINYINT NOT NULL DEFAULT 0,
    title VARCHAR(255) NOT NULL,
    body TEXT,
    featuredImage VARCHAR(255),
    creationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    modificationDate DATETIME,
    authorId INT(11),
    PRIMARY KEY(id, lang),
    FOREIGN KEY(typeId, lang)
      REFERENCES ${ids.contents.types}(id, lang)
      ON UPDATE RESTRICT ON DELETE RESTRICT,
    UNIQUE(lang, permalink)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,


  `CREATE TABLE IF NOT EXISTS ${ids.contents.categories}(
    id INT(11) NOT NULL AUTO_INCREMENT,
    lang VARCHAR(2) NOT NULL,
    permalink VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    typeId INT(11) NOT NULL,
    parentCategoryId INT(11) DEFAULT NULL,
    PRIMARY KEY(id, lang),
    FOREIGN KEY(typeId, lang)
      REFERENCES ${ids.contents.types}(id, lang)
      ON UPDATE RESTRICT ON DELETE RESTRICT,
    UNIQUE(lang, permalink)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS ${ids.contents.tags}(
    id INT(11) NOT NULL AUTO_INCREMENT,
    lang VARCHAR(2) NOT NULL,
    permalink VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    typeId INT(11) NOT NULL,
    PRIMARY KEY (id, lang),
    FOREIGN KEY(typeId, lang)
      REFERENCES ${ids.contents.types}(id, lang)
      ON UPDATE RESTRICT ON DELETE RESTRICT,
    UNIQUE(lang, permalink)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS ${ids.contents.asides}(
    lang VARCHAR(2) NOT NULL,
    handler VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    body TEXT,
    contentId INT(11) NOT NULL,
    FOREIGN KEY(contentId, lang)
      REFERENCES ${ids.contents.contents}(id, lang)
      ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE KEY(contentId, lang, handler)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  // CONTENTS RELATIONAL TABLES
  `CREATE TABLE IF NOT EXISTS ${ids.contents.contentsCategories}(
    contentId INT(11) NOT NULL,
    categoryId INT(11) NOT NULL,
    lang VARCHAR(2) NOT NULL,
    FOREIGN KEY(contentId, lang)
      REFERENCES ${ids.contents.contents}(id, lang)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(categoryId, lang)
      REFERENCES ${ids.contents.categories}(id, lang)
      ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE KEY(contentId, categoryId, lang)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS ${ids.contents.contentsTags}(
    contentId INT(11) NOT NULL,
    tagId INT(11) NOT NULL,
    lang VARCHAR(2) NOT NULL,
    FOREIGN KEY(contentId, lang)
      REFERENCES ${ids.contents.contents}(id, lang)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(tagId, lang)
      REFERENCES ${ids.contents.tags}(id, lang)
      ON UPDATE CASCADE ON DELETE CASCADE,
    UNIQUE KEY(contentId, tagId, lang)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  // PRINCIPALS MAIN TABLES
  `CREATE TABLE IF NOT EXISTS ${ids.principals.users}(
    id INT(11) NOT NULL AUTO_INCREMENT,
    login VARCHAR(45) NOT NULL,
    password VARCHAR(255),
    status TINYINT NOT NULL DEFAULT 0,
    subscriptionDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lastLoginDate DATETIME,
    firstName VARCHAR(45),
    lastName VARCHAR(45),
    primaryEmail VARCHAR(255),
    primaryPhone VARCHAR(45),
    PRIMARY KEY(id),
    UNIQUE(login)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  `CREATE TABLE IF NOT EXISTS ${ids.principals.groups}(
    id INT(11) NOT NULL AUTO_INCREMENT,
    lang VARCHAR(2) NOT NULL,
    permalink VARCHAR(45) NOT NULL,
    PRIMARY KEY(id, lang),
    UNIQUE(permalink)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`,

  // PRINCIPALS RELATIONAL TABLES
  `CREATE TABLE IF NOT EXISTS ${ids.principals.usersGroups}(
    userId INT(11) NOT NULL,
    groupId INT(11) NOT NULL,
    FOREIGN KEY(userId)
      REFERENCES ${ids.principals.users}(id)
      ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(groupId)
      REFERENCES ${ids.principals.groups}(id)
      ON UPDATE RESTRICT ON DELETE RESTRICT,
    UNIQUE KEY (userId, groupId)
  )
  COLLATE utf8_general_ci
  ENGINE=InnoDB;`
]

const createTables = (connectionOrPool) =>
  new Promise((resolve, reject) => {
    connectionOrPool.query(query.join("\n"), (error, data) => {
      if (error) reject(error)
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
  createTables(connection)
    .then(data => { console.log(data) })
    .catch(error => { console.log(error) })
    .then(() => { connection.end() })
    .catch(error => { console.log(error) })
}

module.exports = createTables
