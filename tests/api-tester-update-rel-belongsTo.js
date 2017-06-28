'use strict';

const clean = require('../schema/clean');

const method = 'PUT';
const path = 'contents/contents/it/home';
const auth = require('./auth.js');
const output = require('./api-tester-update-rel-belongTo-sample.json');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');
const uri = urlJoin(urlSecret, path);

const params = {
  method,
  uri,
  input: {
    headers:{
      'Content-Type': 'application/json'
    },
    body: {
      title: 'test update belongsTo',
      type: {
        lang: 'it',
        permalink: 'blog'
      }
    },
    output
  }
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
