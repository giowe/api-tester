"use strict";

const auth = require('../../utils/auth.js');
const config = {
  "method" : "DELETE",
  "path" : "/principals/users",
  "headers": {
    "Content-Type": "application/json",
    "Authorization": auth
  }
};
const sample = require('./sample.json');

const promise = new Promise((resolve, reject) => {
  resolve(config, sample);
});

module.exports = promise;

