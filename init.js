'use strict';

const argv = require('yargs').argv;
const inquirer = require('inquirer');
const fs = require('fs');
const localDir = process.cwd();
const path = require('path');

const testsValidation = (
  testsNames
) => {
  const testsValidated = [];
  testsNames.forEach((
    testName
  ) => {
    if (testName.split('/').slice(-1)[0].slice(0, 2) !== 't-') {
      console.log(`Test "${testName}" not valid`);
      process.exit();
    }
    testsValidated.push(testName);
  });
  return testsValidated;
};

const getTestsObj = (
  tests,
  pathToAppend = ''
) => {
  const testsObj = {};
  tests.forEach(testName => {
    const test = require(path.join(localDir, pathToAppend, testName));
    if (typeof test === 'object' && Array.isArray(test.tests)) {
      Object.assign(testsObj, getTestsObj(test.tests, testName.split('/').slice(0, -1).join('/')));
    } else if (typeof test === 'function') {
      testsObj[testName] = test;
    } else {
      console.log(`Test "${testName}" not valid`);
      process.exit();
    }
  });
  return testsObj;
};

if (argv.v || argv.version) {
  const pkg = require('./package.json');
  console.log(pkg.name, pkg.version);
  process.exit();
}

const params = {
  verbose: argv.verbose,
  tests: {}
};

const testsValidated = testsValidation(argv._);

const choices = fs.readdirSync(localDir).filter(file => {
  return (
    file.slice(0, 2) === 't-'
    && (
        file.slice(-3) === '.js'
      || file === 't-config.json'
      )
  );
});

const question = {
  type: 'list',
  name: 'Test',
  message: 'Select the test to execute: ',
  choices,
  default: choices[0]
};

if (choices.length === 0) {
  console.log('There aren\'t any valid tests in this folder');
  process.exit();
}

module.exports = () => new Promise((resolve, reject) => {
  if (testsValidated.length !== 0) {
    Object.assign(params.tests, getTestsObj(testsValidated));
    resolve(params);
  } else {
    inquirer.prompt(question)
      .then((result) => {
        Object.assign(params.tests, getTestsObj([result.Test]));
        resolve(params);
      });
  }}
);
