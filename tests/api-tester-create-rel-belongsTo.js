'use strict';

const clean = require('../schema/clean');

const auth = require('./auth.js');
const method = 'POST';
const path = 'contents/contents';
const output = require('./api-tester-create-rel-belongsTo-sample.json');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');
const uri = urlJoin(urlSecret, path);

const params = {
  method,
  uri,
  input: {
    headers: {
      'content-type': 'application/json'
    },
    body: {
      permalink: 'belongsTo-test',
      lang: 'it',
      type: {
        permalink: 'pagine',
        lang: 'it'
      }
    }
  },
  output
};

module.exports = () => new Promise((resolve, reject) => {
  console.log("prima clean di create-rel-belongsTo");
    clean(true)
    .then((data) => {
      console.log(data);
      return auth();
    })
    .then((token) => {
      params.input.headers.authorization = token;
      resolve(params);
      console.log('dopo clean di create-rel-belongsTo');
    })
    .catch((err) => {
      reject(err);
    });
});
