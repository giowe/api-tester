"use strict"

const mysql = require("mysql")
const { conf, ids, unescapedDatabase: database } = require("./constants")

conf.database = database
conf.multipleStatements = true

console.time("Query execution time")
const connection = mysql.createConnection(conf)

const query = [
  `SELECT SQL_CALC_FOUND_ROWS
      contents.id AS contentId,
      contents.lang AS lang,
      contents.permalink AS permalink,
      contents.creationDate AS date,
      contents.authorId AS author,
      contents.title AS title,
      contents.body AS body,
      contents.status AS status,
      CONCAT('[',
              GROUP_CONCAT(DISTINCT '{',
                  '"id":',
                  CONCAT('"', types.id, '"'),
                  ',"lang":',
                  COALESCE(CONCAT('"', types.lang, '"'), 'null'),
                  ',"permalink":',
                  COALESCE(CONCAT('"', types.permalink, '"'),
                          'null'),
                  ',"label":',
                  COALESCE(CONCAT('"', types.label, '"'), 'null')
                  SEPARATOR '},'),
              '}]') AS type,
      CONCAT('[',
              GROUP_CONCAT(DISTINCT '{',
                  '"id":',
                  CONCAT('"', categories.id, '"'),
                  ', "lang":',
                  COALESCE(CONCAT('"', categories.lang, '"'),
                          'null'),
                  ', "permalink":',
                  COALESCE(CONCAT('"', categories.permalink, '"'),
                          'null'),
                  ', "label":',
                  COALESCE(CONCAT('"', categories.label, '"'),
                          'null'),
                  ', "parentCategoryId":',
                  COALESCE(CONCAT('"', categories.parentCategoryId, '"'),
                          'null')
                  SEPARATOR '},'),
              '}]') AS categories,
      CONCAT('[',
              GROUP_CONCAT(DISTINCT '{',
                  '"id":',
                  CONCAT('"', tags.id, '"'),
                  ', "lang":',
                  COALESCE(CONCAT('"', tags.lang, '"'), 'null'),
                  ', "permalink":',
                  COALESCE(CONCAT('"', tags.permalink, '"'), 'null'),
                  ', "label":',
                  COALESCE(CONCAT('"', tags.label, '"'), 'null'),
                  ', "typeId":',
                  COALESCE(CONCAT('"', tags.typeId, '"'), 'null')
                  SEPARATOR '},'),
              '}]') AS tags,
      CONCAT('[',
              GROUP_CONCAT(DISTINCT '{',
                  '"id":',
                  CONCAT('"', asides.id, '"'),
                  ', "lang":',
                  COALESCE(CONCAT('"', asides.lang, '"'), 'null'),
                  ', "handler":',
                  COALESCE(CONCAT('"', asides.handler, '"'), 'null'),
                  ', "label":',
                  COALESCE(CONCAT('"', asides.label, '"'), 'null'),
                  ', "body":',
                  COALESCE(CONCAT('"', asides.body, '"'), 'null'),
                  ', "contentId":',
                  COALESCE(CONCAT('"', asides.contentId, '"'),
                          'null')
                  SEPARATOR '},'),
              '}]') AS asides
  FROM
      ${ids.contents.contents} AS contents
          LEFT OUTER JOIN
      ${ids.contents.contentsCategories} AS contentsCategories ON contentsCategories.contentId = contents.id
          AND contentsCategories.lang = contents.lang
          LEFT OUTER JOIN
      ${ids.contents.categories} AS categories ON contentsCategories.categoryId = categories.id
          AND contentsCategories.lang = categories.lang
          LEFT OUTER JOIN
      ${ids.contents.contentsTags} AS contentsTags ON contentsTags.contentId = contents.id
          AND contentsTags.lang = contents.lang
          LEFT OUTER JOIN
      ${ids.contents.tags} AS tags ON contentsTags.tagId = tags.id
          AND contentsTags.lang = tags.lang
          LEFT OUTER JOIN
      ${ids.contents.asides} AS asides ON asides.contentId = contents.id
          AND asides.lang = contents.lang
          LEFT OUTER JOIN
      ${ids.contents.types} AS types ON contents.typeId = types.id
          AND contents.lang = types.lang
  WHERE
      contents.lang = 'it'
  GROUP BY contents.id, contents.lang
  ORDER BY contents.creationDate DESC
  LIMIT 0, 10;`,
  `SELECT FOUND_ROWS();`
]

connection.connect()
connection.query(query.join("\n"), (err, data) => {
  if (err) throw err
  else {
    console.log(data)
    console.timeEnd("Query execution time")
  }
})
connection.end()
