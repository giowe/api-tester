'use strict';

const request = require('request');
const { expect } = require('chai');
const chooseTest = require('./utils/choose-test');
const init = require('./init.js');
const chalk = require('chalk');

init();

const verbose = true;

chooseTest.then(result => {
  const testName = result['Test'];
  const test = require(`${process.cwd()}/${testName}`);
  test.then((result) => {
    const sample = result.sample;
    const {method, host, path} = result.config;

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
          if (body !== sample) {
            const errorMessage = `Received \n${chalk.red(JSON.stringify(body))}, but should be equal to \n${chalk.green(JSON.stringify(sample))}`;
            console.log(errorMessage);
            process.exit();
          } 
          console.log(chalk.green('Done!!!'));
        }
      } 
    );
  }).catch((err) => console.log(chalk.red('There is an error in your test configuration.')));
}).catch((err) => {
  console.log(err);
});
