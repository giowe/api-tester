'use strict';

const request = require('request');
const { expect } = require('chai');
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
            if (verbose) {
              console.log(chalk.red(err));
              console.log(chalk.cyan(`Processing "${testsNames[index]}"...`));
            }
            else {
              process.stdout.write(chalk.cyan(`Processing "${testsNames[index]}"... `));
              process.stdout.write(chalk.red('\u2718\n'));
            }
            console.log(' ------------------------------------------------------------------ ');
            testsFailed.push(testsNames[index]);
            resolve();
          }
          else {
            try {
              const outputBody = output.body;
              if (typeof body !== 'object') body = JSON.parse(body);
              const result = {
                status: res.statusCode,
                headers: res.headers,
                body,
                headersKeys: Object.keys(headers),
                bodyKeys: Object.keys(body)
              };
              console.log(result);
              console.log(result, output);
              const errorStatus = getTestStatus();
                //// expect(body).to.deep.equal(outputBody);
              testsPassed.push(testsNames[index]);
              if (verbose) {
                console.log(pretty(outputBody));
                console.log(chalk.cyan(`Processing "${testsNames[index]}"...`));
              }
              else {
                process.stdout.write(chalk.cyan(`Processing "${testsNames[index]}"... `));
                process.stdout.write(chalk.green('\u2714\n'));
              }
              console.log(' ------------------------------------------------------------------ ');
              resolve();
            } catch (err) {
              const type = res.headers['content-type'].split('; ')[0];
              testsFailed.push(testsNames[index]);
              if (verbose) {
                getErrorMessage(body, output.body, type);
                console.log(chalk.cyan(`Processing "${testsNames[index]}"...`));
              }
              else {
                process.stdout.write(chalk.cyan(`Processing "${testsNames[index]}"... `));
                process.stdout.write(chalk.red('\u2718\n'));
              }
              console.log(' ------------------------------------------------------------------ ');
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
    console.log(chalk.cyan('\nTests finished!\n'))
      testsPassed.forEach((test) => {
        console.log(chalk.green(`\u2714 Test "${test}" passed.`));
      });

      testsFailed.forEach((test) => {
        console.log(chalk.red(`\u2718 Test "${test}" failed...`));
      });

    })
    .catch((err) => console.log(err));
}).catch((err) => console.log(err));
