"use strict"

const fetch = require("node-fetch")

const cleanDatabase = require("./../schema/clean")
const authenticate = require("./../api/authenticate")
const { apiUrl } = require("./../api/conf")

const baseTest = (path, method, bodyJSON, terminatePool = false) =>
  new Promise((resolve, reject) => {
    cleanDatabase()
      .then(result => { console.log(result) })
      .then(() => authenticate())
      .then(authToken =>
        fetch(
          `${apiUrl}/${path}`,
          {
            "method": method,
            "headers": {
              "Content-Type": "application/json",
              "Authorization": authToken
            },
            "body": bodyJSON
          }
        )
      )
      .then(
        onSuccess => {
          if (onSuccess.ok) { return onSuccess.json() }
          else { throw onSuccess }
        },
        onFailure => { reject(onFailure) }
      )
      .then(json => resolve(json))
      .catch(error => {
        if ("json" in error) {
          error.json()
            .then(json => reject(json))
            .catch(jsonError => reject(jsonError))
        } else { reject(error) }
      })
      .then(() => cleanDatabase(terminatePool))
      .then(result => { console.log(result) })
      .catch(error => { reject(error) })
  })

module.exports = baseTest
