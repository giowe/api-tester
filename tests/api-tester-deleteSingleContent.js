'use strict';

const clean = require('../schema/clean.js');

const auth = require('./auth.js');
const method = "DELETE";
const path = "contents/contents/it/home";
const output = require('./api-tester-deleteSingleContent-sample.json');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');

const params = {
  status: 200,
  method,
  path,
  uri: urlJoin(urlSecret, path),
  input: {
    headers: {
      'content-type': 'application/json',
    },
  },
  output,
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
