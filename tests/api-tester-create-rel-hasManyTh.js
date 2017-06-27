'use strict';
const clean = require('../schema/clean');
const auth = require('./auth.js');
const output = require('./api-tester-create-rel-hasManyTh-sample.json');
const Join = require('utl-join');
const url = 'https://api-staging-f3.soluzionifutura.it' ;
const path = '/contents/contents';
const uri = Join(url, path);

const params = {
  method: 'POST',
  path,
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
