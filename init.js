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

const getTestsArray = (
  tests,
  pathToAppend = ''
) => {
  const testsArray = [];
  tests.forEach(testName => {
    const test = require(path.join(localDir, pathToAppend, testName));
    if (typeof test === 'object' && Array.isArray(test.tests)) {
      testsArray.push(
        ...getTestsArray(test.tests, testName.split('/').slice(0, -1).join('/'))
      );
    } else if (typeof test === 'function') {
      testName = testName.split('/').slice(-1)[0];
      testsArray.push({[testName]: test});
    } else {
      console.log(`Test "${testName}" not valid`);
      process.exit();
    }
  });
  return testsArray;
};

if (argv.v || argv.version) {
  const pkg = require('./package.json');
  console.log(pkg.name, pkg.version);
  process.exit();
}

const params = {
  verbose: argv.verbose
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
    params.tests = getTestsArray(testsValidated);
    resolve(params);
  } else {
    inquirer.prompt(question)
      .then((result) => {
        params.tests = getTestsArray([result.Test]);
        resolve(params);
      });
  }}
);
