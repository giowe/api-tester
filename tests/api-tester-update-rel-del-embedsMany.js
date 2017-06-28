'use strict';

const clean = require('../schema/clean.js');

const method = 'PUT';
const path = 'contents/contents/it/home';
const auth = require('./auth.js');
const output = require('./api-tester-update-rel-del-embedsMany-sample.json');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');

const params = {
  method,
  path,
  uri: urlJoin(urlSecret, path),
  input: {
    headers:{
      'Content-Type': 'application/json'
    },
    body: {
      asides: [ ]
    }
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
