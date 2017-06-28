'use strict';

const clean = require('../schema/clean');

const auth = require('./auth.js');
const method = 'POST';
const path = '/contents/contents';
const output = require('./api-tester-create-rel-mix-sample.json');
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
      permalink: 'mix',
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
      tags: [
        {
          lang: 'it',
          permalink: 'rosso'
        },
        {
          lang: 'it',
          permalink: 'verde'
        },
        {
          lang: 'it',
          permalink: 'giallo'
        }
      ],
      type: {
        permalink: 'pagine',
        lang: 'it'
      },
      author: null
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
