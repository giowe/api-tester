"use strict";

const clean = reuqire("../schema/clean");

const auth = require('./auth.js');

const baseTest = require('./baseTestNoClean');

const payload = {
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
};

const path = 'contents/contents';
const method = 'POST';

const config = {
  "method": method,
  "path": path,
  "headers": {
    "Content-Type": "application/json",
    "Authorization": auth
  }
};
const sample = require('./api-tester-create-rel-embedsMany-sample.json');

clean.then(res => {
  const promise = new Promise((resolve, reject) => {
    resolve(config, sample);
  });
  module.exports = promise;
});

