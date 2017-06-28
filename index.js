'use strict';

const request = require('request');
const { expect } = require('chai');
const init = require('./init.js');
const chalk = require('chalk');
const getErrorMessage = require('./getErrorMessage');
const columnify = require('columnify');
const Q = require('q');
// init().then((params) => { console.log(params); });
const promiseWaterfall = require('promise.waterfall');

// const getErrorMessage = (result, sample, type) => {
//   console.log('result: ', result);
//   console.log('sample: ', sample);
// }

init().then((params) => {
  console.log(params)
  const { verbose, tests } = params;
  const wrappedTests = tests.map((test) => () => new Promise((resolve, reject) => {
    test()
      .then((params) => {
      console.log('ciao')
      const {method, uri, output, input} = params;
      const {headers, body} = input;
      const opt = {
        method,
        uri,
        headers,
        json: body
      };
      request(
        opt, (err, res, body) => {
          if (err) {
            console.log(chalk.red(err));
            reject(err);
          }
          else {
            try {
              const outputBody = output.body;
              expect(body).to.deep.equal(outputBody);
              console.log(chalk.green('Done!!!'));
              resolve();
              return next();
            } catch (err) {
              const type = res.headers['content-type'].split('; ')[0];
              getErrorMessage(body, output, type);
              reject(err);
            }
          }
        }
      );
    })
      .catch((err) => console.log(err));
  }));
  const waterfall = () => promiseWaterfall(wrappedTests);

  waterfall()
    .then(() => console.log('fatto'))
    .catch((err) => console.log(err));

}).catch((err) => console.log(err));
