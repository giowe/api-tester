'use strict';

const request = require('request');
const { expect } = require('chai');
const chooseTest = require('./utils/choose-test');
const init = require('./init.js');
const chalk = require('chalk');
const diff = require('recursive-diff');

const verbose = true;

chooseTest.then(result => {
  const testName = result['Test'];
  const test = require(`${process.cwd()}/${testName}`);
  test.then((result) => {
    const sample = result.sample;
    const { method, host, path } = result.config;

    const opt = {
      method,
      uri : `${host}${path}`
    };

    request(
      opt, (err, res, body) => {
        if (err) {
          console.log(chalk.red(err));
        }
        else {
          body = JSON.parse(body);
          try {
            expect(body).to.deep.equal(sample)
            console.log(chalk.green('Done!!!'));
        } catch (err) {
            console.log(differences)

            console.log(errorMessage);
          }
        }
      } 
    );
  }).catch((err) => console.log(chalk.red('There is an error in your test configuration.')));
}).catch((err) => {
  console.log(err);
});
