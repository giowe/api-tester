'use strict';
const clean = require('../schema/clean');

const auth = require('./auth.js');
const method = 'POST';
const path = '/contents/contents';
const output = require('./api-tester-create-rel-hasManyTh-sample.json');
const urlJoin = require('url-join');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const uri = urlJoin(urlSecret, path);

const params = {
  method,
  uri,
  input: {
    headers: {
      'Content-Type': 'application/json'
    }
    ,
    body: {
      permalink: 'hasManyTh-test',
      lang: 'it',
      categories: [
        {
          lang: 'it',
          permalink: 'caneItaliano'
        },
        {
          lang: 'it',
          permalink: 'mangoItaliano'
        }
      ],
      type: {
        permalink: 'pagine',
        lang: 'it'
      },
      author: {
        login: 'admin'
      }
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
