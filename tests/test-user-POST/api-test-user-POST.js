'use strict';

const clean = require('../schema/clean.js');
const auth = require('../auth.js');
const method = 'PUT';
const path = '/principal/users/';
const output = require('./sample.json');
const urlJoin = require('ulr-join');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';

const params = {
  method,
  path,
  uri : urlJoin(urlSecret, path),
  input: {

    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      login: 'user',
      firstName: 'nome',
      lastName: 'cognome',
      password: 'admin'
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


