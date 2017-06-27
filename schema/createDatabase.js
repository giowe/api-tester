"use strict"

const mysql = require("mysql")
const { conf, database } = require("./../constants")

const createDatabase = (connectionOrPool) =>
  new Promise((resolve, reject) => {
    connectionOrPool.query(`CREATE DATABASE IF NOT EXISTS ${database}`, (error, data) => {
      if (error) { reject(error) }
      resolve(data)
    })
  })

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  const connection = mysql.createConnection(Object.assign({}, conf))
  createDatabase(connection)
    .then(data => { console.log(data) })
    .catch(error => { console.log(error) })
    .then(() => { connection.end() })
    .catch(error => { console.log(error) })
}

module.exports = createDatabase
