'use strict';

const clean = require('../schema/clean');

const auth = require('./auth.js');
const method = 'POST';
const path = 'contents/types';
const output = require('./api-tester-create-rel-hasMany-sample.json');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');
const uri = urlJoin(urlSecret, path);

const params = {
  method,
  uri,
  input: {
    headers:{
      'content-type': 'application/json'
    },
    body: {
      permalink: 'hasMany-test',
      lang: 'it',
      contents: [
        {
          lang: 'it',
          permalink: 'home'
        },
        {
          lang: 'it',
          permalink: 'azienda'
        }
      ]
    }
  },
  output
};

console.log(JSon.stringify(output));

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
