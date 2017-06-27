'use strict';

const path = 'principals/users/test';
const method = 'PUT';
const auth = require('../utils/auth.js');
const output = require('./api-tester-update-rel-del-hasMany-sample.json');
const urlSecret = 'https://api-staging-f3.soluzionifutura.it';
const urlJoin = require('url-join');
const clean = require('../schema/clean');


const params = {
  status: 200,
  method,
  path,
  uri: urlJoin(urlSecret, path),
  input: {
    headers:{
      'Content-Type': 'application/json'
    },
    body: {
      contents: [ ]
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
