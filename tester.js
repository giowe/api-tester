'use strict';

const request = require('request');
const init = require('./init.js');
const chalk = require('chalk');
const getErrorMessage = require('./getErrorMessage');
const promiseWaterfall = require('promise.waterfall');
const pretty = require('js-object-pretty-print').pretty;
const getTestStatus = require('./getTestStatus');

const testsPassed = [];
const testsWarned = [];
const testsFailed = [];

init().then((params) => {
  const { verbose, tests } = params;
  const testsNames = Object.keys(tests);
  const wrappedTests = Object.values(tests).map((test, index) => () => {
    return new Promise((resolve, reject) => {
      test()
        .then((params) => {
          const { method, uri, output, input, description } = params;
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
                if (verbose) {
                  console.log(chalk.red(err));
                  console.log(chalk.cyan(`Processing "${testsNames[index]}"...`));
                }
                else {
                  process.stdout.write(chalk.cyan(`Processing "${testsNames[index]}"... `));
                  process.stdout.write(chalk.red('\u2718\n'));
                }
                console.log(chalk.cyan(`Description: ${description}`));
                console.log(' ------------------------------------------------------------------ ');
                testsFailed.push(testsNames[index]);
                resolve();
              }
              else {
                const outputBody = output.body;
                const result = {};
                if (typeof body !== 'object') body = JSON.parse(body);
                if (output.status) result['status'] = res.statusCode;
                if (output.headers) result['headers'] = res.headers;
                if (output.body) result['body'] = body;
                if (output.bodyKeys) result['bodyKeys'] = Object.keys(body);
                if (output.headersKeys) result['headersKeys'] = Object.keys(res.headers);
                const errorStatus = getTestStatus(result, output);
                const testName = testsNames[index];
                switch (errorStatus) {
                  case 0: {
                    testsPassed.push(testName);
                    break;
                  }
                  case 1: {
                    testsWarned.push(testName);
                    const type = res.headers['content-type'].split('; ')[0];
                    getErrorMessage(body, output.body, type, false);
                    break;
                  }
                  case 2: {
                    testsFailed.push(testName);
                    const type = res.headers['content-type'].split('; ')[0];
                    getErrorMessage(body, output.body, type, true);
                    break;
                  }
                  default: {
                    console.log('There is a problem in errorStatus function, ', errorStatus);
                  }
                }
                if (verbose) {
                  console.log(pretty(outputBody));
                  console.log(chalk.cyan(`Processing "${testsNames[index]}"...`));
                }
                else {
                  process.stdout.write(chalk.cyan(`Processing "${testsNames[index]}"... `));
                  switch (errorStatus) {
                    case 0: {
                      process.stdout.write(chalk.green('\u2714\n'));
                      break;
                    }
                    case 1: {
                      process.stdout.write(chalk.yellow('\u2717\n'));
                      break;
                    }
                    case 2: {
                      process.stdout.write(chalk.red('\u2718\n'));
                      break;
                    }
                    default: {
                      console.log('There is a problem in getErrorStatus function, ', errorStatus);
                    }
                  }
                }
                if(description) console.log(chalk.cyan(`Description: ${description}`));
                console.log(' ------------------------------------------------------------------ ');
                resolve();
              }
            }
          );
        })
        .catch((err) => console.log(err));
    });
  });
  const waterfall = () => promiseWaterfall(wrappedTests);

  waterfall()
    .then(() => {
      console.log(chalk.cyan('\nTests finished!\n'));
      testsPassed.forEach((test) => {
        console.log(chalk.green(`\u2714 Test "${test}" passed.`));
      });

      testsFailed.forEach((test) => {
        console.log(chalk.red(`\u2718 Test "${test}" failed...`));
      });
    })
    .catch((err) => console.log(err));
}).catch((err) => console.log(err));
