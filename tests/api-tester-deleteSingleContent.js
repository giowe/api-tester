"use strict";

const clean = require('../schema/clean.js');

const auth = require('./auth.js');

const path = "contents/contents/it/home";
const method = "DELETE";

const config = {
  "method": method,
  "path": path,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": auth
  }
};

const sample = require('./api-tester-deleteSingleContent-sample.json');

clean.then(resolve => {
  const promise = new Promise((resolve, reject) => {
    resolve(config, sample);
  });
  module.exports = promise;
});

const test = (terminatePool = false) =>
  baseTest(
    path,
    method,
    null,
    terminatePool
  );

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  test(true)
    .then(data => { console.log(data) })
    .catch(error => { console.error(error) })
}

module.exports = test;
