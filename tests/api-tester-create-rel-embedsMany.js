'use strict';

const clean = reuqire("../schema/clean");

const auth = require('./auth.js');
const path = 'contents/contents';
const method = 'POST';

const params = {
  method,
  path,
  input:
  {
    headers: {
      'content-type': "application/json",
    },
    body: {
      permalink: 'embedsMany-test',
      lang: 'it',
      asides: [
        {
          handler: 'label1',
          lang: 'it',
          label: 'label 1',
          body: 'body 1'
        },
        {
          handler: 'label2',
          lang: 'it',
          label: 'label 2',
          body: 'body 2'
        },
        {
          handler: 'label3',
          lang: 'it',
          label: 'label 3',
          body: 'body 3'
        },
        {
          handler: 'label4',
          lang: 'it',
          label: 'label 4',
          body: 'body 4'
        },
        {
          handler: 'label5',
          lang: 'it',
          label: 'label 5',
          body: 'body 5'
        }
      ],
      type: {
        permalink: 'pagine',
        lang: 'it'
      }
    }
  }
};
const sample = require('./api-tester-create-rel-embedsMany-sample.json');

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

