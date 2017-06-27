"use strict"

const mysql = require("mysql")
const conf = require("./conf")

const tables = {
  contents: {
    contents: "f3-contents_contents",
    types: "f3-contents_types",
    categories: "f3-contents_categories",
    asides: "f3-contents_asides",
    tags: "f3-contents_tags",
    apartments: "f3-contents_apartments",
    contentsCategories: "f3-contents_contents-f3-contents_categories",
    contentsTags: "f3-contents_contents-f3-contents_tags",
    apartmentsCategories: "f3-contents_apartments-f3-contents_categories",
    apartmentsTags: "f3-contents_apartments-f3-contents_tags"
  },
  principals: {
    users: "f3-principals_users",
    groups: "f3-principals_groups",
    usersGroups: "f3-principals_users-f3-principals_groups"
  }
}

const ids = Object.keys(tables).reduce(
  (newTables, table) =>
    Object.assign({}, newTables, {[table]: Object.keys(tables[table]).reduce(
      (newTable, id) =>
        Object.assign({}, newTable, {[id]: mysql.escapeId(tables[table][id])}),
      {}
      )}
    ),
  {}
)

const database = "f3_dev"

module.exports = {
  database: mysql.escapeId(database),
  unescapedDatabase: database,
  ids,
  conf
}
