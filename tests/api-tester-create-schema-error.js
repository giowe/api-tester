'use strict';

const clean = require('../schema/clean');

const auth = require('./auth.js');
const method = 'POST';
const path = '/contents/types';
const output = require('tests/api-tester-create-schema-error-sample.json');
const urlJoin = require('url-join');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const uri = urlJoin(urlSecret, path);


const params = {
  method,
  path,
  uri,
  input: {
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      permalink: 'type-prova',
      label: 'test errore'
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
