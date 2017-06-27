"use strict"

const mysql = require("mysql")

const { conf, unescapedDatabase: database } = require("./constants")

const pool = mysql.createPool(Object.assign({}, conf))
const poolWithDatabase = mysql.createPool(
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

const deleteDatabase = require("./deleteDatabase")
const createDatabase = require("./createDatabase")
const createTables = require("./createTables")
const populateDatabase = require("./populateDatabase")

const clean = (terminatePool = false, verbose = false) =>
  new Promise((resolve, reject) => {
    deleteDatabase(pool)
      .then(data => { if (verbose) { console.log(data) } })
      .then(() => createDatabase(pool))
      .then(data => { if (verbose) { console.log(data) } })
      .then(() => createTables(poolWithDatabase))
      .then(data => { if (verbose) { console.log(data) } })
      .then(() => populateDatabase(poolWithDatabase))
      .then(data => { if (verbose) { console.log(data) } })
      .then(() => Promise.resolve("Database cancellato e ricreato con successo"))
      .then(success => {
        if (terminatePool === true) {
          pool.end()
          poolWithDatabase.end()
        }
        resolve(success)
      })
      .catch(error => {
        pool.end()
        poolWithDatabase.end()
        reject(error)
      })
  })

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  clean(true)
    .then(data => { console.log(data) })
    .catch(error => { console.log(error) })
}

module.exports = clean
