"use strict";

const promise = new Promise((resolve, reject) => {
  const auth = require("../utils/auth.js");
  const config = require('./config.json');
  const sample = require('./sample.json');
  Object.assign(config, { Authorization : auth});
  resolve(config, sample)
});

method.exports = promise;

