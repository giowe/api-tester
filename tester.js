'use strict';

const request = require('request');
const { expect } = require('chai');
const init = require('./init.js');
const chalk = require('chalk');
const getErrorMessage = require('./getErrorMessage');
// init().then((params) => { console.log(params); });
const promiseWaterfall = require('promise.waterfall');

// const getErrorMessage = (result, sample, type) => {
//   console.log('result: ', result);
//   console.log('sample: ', sample);
// }

const testSuccess = (sample)  => {
  console.log('')
}

init().then((params) => {
  console.log(params);
  const { verbose, tests } = params;
  const wrappedTests = tests.map((test) => () => new Promise((resolve, reject) => {
    test()
      .then((params) => {
      const {method, uri, output, input} = params;
      const {headers, body} = input;
      const opt = {
        method,
        uri,
        headers,
        json: body
      };
      console.log(opt)
      request(
        opt, (err, res, body) => {
          if (err) {
            if (verbose) console.log(chalk.red(err));
            console.log(chalk.red('\u2715 test non passato'));
            resolve();
          }
          else {
            try {
              const outputBody = output.body;
              expect(body).to.deep.equal(outputBody);
              console.log(chalk.green('\u2714 test passato'));
              if (verbose) console.log(outputBody);
              resolve();
            } catch (err) {
              const type = res.headers['content-type'].split('; ')[0];
              console.log(chalk.red('\u2715 test fallito'));
              if (verbose) getErrorMessage(body, output.body, type);
              resolve();
            }
          }
        }
      );
    })
      .catch((err) => console.log(err));
  }));
  const waterfall = () => promiseWaterfall(wrappedTests);

  waterfall()
    .then(() => console.log(chalk.green('\nTests finished!')))
    .catch((err) => console.log(err));
}).catch((err) => console.log(err));
