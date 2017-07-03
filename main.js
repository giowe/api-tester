'use strict';

const chalk = require('chalk');
const request = require('request');
const pretty = require('js-object-pretty-print').pretty;
const getTests = require('./getTests.js');
const waterfall = require('promise.waterfall');
const validate = require('./validate');
const { getValue } = require('./utils');

const summary = [];
module.exports = (tests, options) => new Promise((resolve, reject) => {
  getTests(tests, options)
    .then(({ verbose, tests }) => {
      waterfall(
        tests.map(({ name, test }) => {
          return () => new Promise((resolve, reject) => {
            test()
              .then(({ description, input = {}, output, uri, method, options }) => {
                Object.entries({ output, uri, method }).forEach(([key, value]) => {
                  if (!value) throw new Error(`Missing '${key}' value in test params.`);
                });

                const { headers, body } = input;

                const requestParams = {
                  uri,
                  method,
                  headers
                };

                if (headers) {
                  const headerValue = getValue(headers, 'content-type');
                  if (typeof headerValue === 'string' && headerValue.toLowerCase() === 'application/json') requestParams.json = body;
                }
                //TODO: testare il passaggio di una stringa
                if (!requestParams.json && body) {
                  requestParams.body = body;
                }

                request(requestParams, (err, res, body) => {
                  if (err) return reject({ name, err });

                  const result = {
                    status: res.statusCode,
                    headers: res.headers
                  };
                  try {
                    result.body = JSON.parse(body);
                  } catch(ignore) {
                    result.body = body;
                  }

                  const { status: statusErrors, headers: headersErrors, body: bodyErrors } = validate(output, result, options);
                  const errorMessage = [];
                  const statusErrorsL = statusErrors.length;
                  const headersErrorsL = headersErrors.length;
                  const bodyErrorsL = bodyErrors.length;

                  if (statusErrorsL) errorMessage.push(`${chalk.red('STATUS ERRORS:')}\n${statusErrors.join('\n')}`);
                  if (headersErrorsL) errorMessage.push(`${chalk.red('HEADERS ERRORS:')}\n${headersErrors.join('\n')}`);
                  if (bodyErrorsL) errorMessage.push(`${chalk.red('BODY ERRORS:')}\n${bodyErrors.join('\n')}`);

                  console.log(chalk.white('TEST:'), name);
                  if (verbose) {
                    if (description) {
                      console.log(chalk.white('DESCRIPTION:'));
                      console.log(description);
                    }
                  }

                  if (verbose || bodyErrorsL || headersErrorsL || statusErrorsL) {
                    console.log(chalk.white('EXPECTED:'));
                    console.log(pretty(output));
                    console.log(chalk.white('RESULT:'));
                    console.log(pretty(result));
                  }

                  if (errorMessage.length) console.log(errorMessage.join('\n'));

                  let testStatus;
                  if (statusErrorsL && headersErrorsL && bodyErrorsL) {
                    testStatus = chalk.red('\u2718', name);
                    summary.push(chalk.red(`\u2718 Failure: ${name}`));
                  } else if (!statusErrorsL && !headersErrorsL && !bodyErrorsL) {
                    testStatus = chalk.green('\u2714', name);
                    summary.push(chalk.green(`\u2714 Succeeded: ${name}`));
                  } else {
                    testStatus = chalk.yellow('\u2717', name);
                    summary.push(chalk.yellow(`\u2717 Partial failure: ${name}`));
                  }

                  console.log(testStatus, '\n');
                  resolve();
                });
              })
              .catch(err => {
                console.log(chalk.red(`*** ${name} ***`));
                console.log(err);
                resolve();
              });
          });
        })
      )
        .then(() => {
          if (tests.length <= 1) return resolve();
          console.log(chalk.white('SUMMARY:'));
          summary.forEach((data) => console.log(data));
          resolve();
        })
        .catch(({ name, err }) => {
          console.log(chalk.red(`*** CONFIGURATION ERRORS IN TEST ${name} ***`));
          console.log(err);
          reject(err);
        });
    })
    .catch(err => {
      reject(err);
    });
}).catch((err) => { console.log(err); });
