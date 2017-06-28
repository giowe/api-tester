'use strict';

const clean = require('../schema/clean');

const auth = require('../auth.js');
const output = require('./api-tester-user-delete-sample.json');
const method ='DELETE';
const path ='/principals/users/types';
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');

const params = {
  method,
  uri: urlJoin(urlSecret, path),
  input: {
    headers: {
      'Content-Type': 'application/json',
    }
  },
  output,
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
