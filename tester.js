'use strict';

const request = require('request');
const { expect } = require('chai');
const init = require('./init.js');
const chalk = require('chalk');
const getErrorMessage = require('./getErrorMessage');
const promiseWaterfall = require('promise.waterfall');

const testsPassed = [];
const testsFailed = [];

init().then((params) => {
  const { verbose, tests } = params;
  console.log(tests);
  const testsNames = Object.keys(tests);
  const wrappedTests = Object.values(tests).map((test, index) => () => new Promise((resolve, reject) => {
    test()
      .then((params) => {
      const { method, uri, output, input } = params;
      const { headers, body } = input;
      const opt = {
        method,
        uri,
        headers,
        json: body
      };
      request(
        opt, (err, res, body) => {
          if (err) {
            if (verbose) console.log(chalk.red(err));
            testsFailed.push(testsNames[index]);
            resolve();
          }
          else {
            try {
              const outputBody = output.body;
              expect(body).to.deep.equal(outputBody);
              testsPassed.push(testsNames[index]);
              if (verbose) console.log(outputBody);
              resolve();
            } catch (err) {
              const type = res.headers['content-type'].split('; ')[0];
              testsFailed.push(testsNames[index]);
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
    .then(() => {
    console.log(chalk.cyan('\nTests finished!'))
      testsPassed.forEach((test) => {
        console.log(chalk.green(`\u2714 Test "${test}" passed.`));
      });

      testsFailed.forEach((test) => {
        console.log(chalk.red(`\u2715 Test "${test}" failed...`));
      });

    })
    .catch((err) => console.log(err));
}).catch((err) => console.log(err));
