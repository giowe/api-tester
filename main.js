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
              .then(({ description, input = {}, output: expectedOutput, uri, method, options }) => {
                Object.entries({ output: expectedOutput, uri, method }).forEach(([key, value]) => {
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

                  const { status: statusErrors, headers: headersErrors, body: bodyErrors } = validate(expectedOutput, result, options);
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

                    console.log(chalk.white('URI:'), uri, '\n');
                    console.log(chalk.white('METHOD:'), method, '\n');
                    console.log(chalk.white('INPUT HEADERS:'), input.headers, '\n');
                    console.log(chalk.white('INPUT BODY:'), requestParams.json? pretty(input.body) :input.body, '\n');
                  }

                  if (verbose || bodyErrorsL || headersErrorsL || statusErrorsL) {
                    console.log(chalk.white('EXPECTED:'));
                    console.log(pretty(expectedOutput));
                    console.log(chalk.white('RESULT:'));
                    console.log(pretty(result));
                  }

                  if (errorMessage.length) console.log(errorMessage.join('\n'));

                  let testStatus;
                  if (statusErrorsL || headersErrorsL || bodyErrorsL) {
                    testStatus = chalk.red('\u2718', name);
                    summary.push(chalk.red(`\u2718 Failure: ${name}`));
                  } else if (!statusErrorsL && !headersErrorsL && !bodyErrorsL) {
                    testStatus = chalk.green('\u2714', name);
                    summary.push(chalk.green(`\u2714 Succeeded: ${name}`));
                  }

                  console.log(testStatus, '\n');
                  resolve();
                });
              })
              .catch(err => {
                if (name) console.log(chalk.red(`*** ${name} ***`));
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
          if (name && err) console.log(chalk.red(`*** CONFIGURATION ERRORS IN TEST ${name} ***`));
          reject(err);
        });
    })
    .catch(({ name, err }) => {
      if (name && err) console.log(chalk.red(`*** ERRORS IN TEST ${name} ***`));
      reject(err);
    });
}).catch((err) => { console.log(err); });
