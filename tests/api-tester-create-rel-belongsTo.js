"use strict";

const clean = require("../schema/clean");

const auth = require('./auth.js');
const path = 'contents/contents';
const method = 'POST';
const output = require('./api-tester-create-rel-belongsTo-sample.json');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');

const params = {
  status: 200,
  method,
  path,
  uri: urlJoin(urlSecret, path),
  input: {
    headers: {
      'content-type': 'application/js'
    },
    body: {
      permalink: 'belongsTo-test',
      lang: 'it',
      type: {
        permalink: 'pagine',
        lang: 'it'
      }
    },
  },
  output
};

module.exports = () => new Promise((resolve, reject) => {
  clean(true)
    .then((data) => {
      console.log(data);
      return auth();
    })
    .then((token) => {
      params.input.headers.authorization = token;
      resolve(params);
    })
    .catch((err) => {
      reject(err);
    });
});
