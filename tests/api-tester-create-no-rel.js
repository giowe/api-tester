'use strict';

const clean = require('../schema/clean');

const auth = require('./auth.js');
const output = require('./api-tester-create-no-rel-sample.json');
const method ='POST';
const path ='contents/types';
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');

const params = {
  method,
  path,
  uri: urlJoin(urlSecret,path),
  input: {
    headers: {
      'content-type': 'application/json'
    },
    body: {
      permalink: 'type-prova',
      lang: 'it',
      label: 'tipo appena creato'
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
