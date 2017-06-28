'use strict';

const clean = require('../schema/clean');

const auth = require('./auth.js');
const method = 'POST';
const path = '/contents/types';
const output = require('tests/api-tester-create-schema-error-sample.json');
const Join = require('utl-join');
const url = 'https://api-staging-f3.soluzionifutura.it';
const uri = Join(url, path);


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
