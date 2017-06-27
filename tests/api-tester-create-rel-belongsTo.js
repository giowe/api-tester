"use strict";

const clean = reuqire("../schema/clean");

const auth = require('../utils/auth.js');

const baseTest = require('./baseTestNoClean');

const payload = {
  permalink: 'belongsTo-test',
  lang: 'it',
  type: {
    permalink: 'pagine',
    lang: 'it'
  }
};

const path = 'contents/contents';
const method = 'POST';

const config = {
  "method": method,
  "path": path,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": auth
  }
};
const sample = require('./api-tester-create-rel-belongsTo-sample.json');

clean.then(res => {
  const promise = new Promise((resolve, reject) => {
    resolve(config, sample);
  });
  module.exports = promise;
});

const test = (terminatePool = false) =>
  baseTest(
    path,
    method,
    JSON.stringify(payload),
    terminatePool
  );

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  test(true)
    .then(data => { console.log(data); })
    .catch(error => { console.error(error); });
}

module.exports = test;
