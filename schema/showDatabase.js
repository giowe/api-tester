"use strict"

const mysql = require("mysql")
const { conf, unescapedDatabase: database } = require("./constants")

conf.database = database
const connection = mysql.createConnection(conf)

const query = "SHOW TABLES;"

connection.connect()
connection.query(query, (err, data) => {
  if (err) throw err
  else console.log("Tables: ", data)
})

connection.end()
