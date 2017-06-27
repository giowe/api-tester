'use strict';

const auth = require('./auth.js');
const method = 'PUT';
const path = 'contents/contents/it/home';
const output = require('./api-tester-create-rel-embedsMany-sample.json');
const urlJoin = require('ulr-join');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';

const params = {
  method,
  path,
  uri: urlJoin(urlSecret, path),
  input: {
    headers: {
      'content-type': 'application/json',
    },
    body: {
      categories: [
        {
          lang: 'it',
          permalink: 'caneItaliano'
        },
        {
          lang: 'it',
          permalink: 'mangoItaliano'
        }
      ]
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
