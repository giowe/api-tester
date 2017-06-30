'use strict';

const chalk = require('chalk');
const request = require('request');
const pretty = require('js-object-pretty-print').pretty;
const getTests = require('./getTests.js');
const waterfall = require('promise.waterfall');
const getTestErrors = require('./getTestErrors');
const { getValue } = require('./utils');

const summary = [];
getTests()
  .then(({ verbose, tests }) => {
    waterfall(
      tests.map(({ name, test }) => {
        return () => new Promise((resolve, reject) => {
          test()
            .then(({ description, input, output, uri, method, options }) => {
              const { headers, body } = input;

              const requestParams = {
                uri,
                method,
                headers: input.headers
              };

              const headerValue = getValue(headers, 'content-type');
              if (typeof headerValue === 'string' && headerValue.toLowerCase() === 'application/json') requestParams.json = body;

              //TODO: testare il passaggio di una stringa
              if (!requestParams.json) {
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

                const { status: statusErrors, headers: headersErrors, body: bodyErrors } = getTestErrors(output, result, options);
                const errorMessage = [];
                const statusErrorsL = statusErrors.length;
                const headersErrorsL = headersErrors.length;
                const bodyErrorsL = bodyErrors.length;

                if (statusErrorsL) errorMessage.push(`${chalk.white('STATUS ERRORS:')}\n${statusErrors.join('\n')}`);
                if (headersErrorsL) errorMessage.push(`${chalk.white('HEADERS ERRORS:')}\n${headersErrors.join('\n')}`);
                if (bodyErrorsL) errorMessage.push(`${chalk.white('BODY ERRORS:')}\n${bodyErrors.join('\n')}`);

                console.log(chalk.white('TEST:'), name);
                if (verbose) {
                  if (description) {
                    console.log(chalk.white('DESCRIPTION:'));
                    console.log(description);
                  }
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
        if (tests.length <= 1) return;
        console.log(chalk.white('SUMMARY:'));
        summary.forEach((data) => console.log(data));
      })
      .catch(({ name, err }) => {
        console.log(chalk.red(`*** CONFIGURATION ERRORS IN TEST ${name} ***`));
        console.log(err);
      });
  })
  .catch(err => {
    console.log(err);
  });
