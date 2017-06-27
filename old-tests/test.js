"use strict"

const createSingleContent = require("./createSingleContent")

createSingleContent(true)
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.error(error)
  })
