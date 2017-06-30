'use strict';

const argv = require('yargs').argv;
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const localDir = process.cwd();

if (argv.v || argv.version) {
  const pkg = require('./package.json');
  console.log(pkg.name, pkg.version);
  process.exit();
}

const params = {
  verbose: argv.verbose,
  tests: []
};

const resolveBundles = (testPaths, prefix = localDir) => {
  const out = [];
  testPaths.forEach(testPath => {
    let test;
    const absoluteTestPath = path.isAbsolute(testPath)? testPath : path.join(prefix, testPath);
    try {
      test = require(absoluteTestPath);
    } catch (err) {
      console.log(err);
    }
    if (typeof test === 'function') {
      out.push({
        name: path.parse(testPath).name,
        test
      });
    } else {
      out.push(...resolveBundles(test, path.parse(absoluteTestPath).dir));
    }
  });
  return out;
};

module.exports = () => new Promise((resolve, reject) => {

  if (argv._.length) {
    try {
      params.tests.push(...resolveBundles(argv._));
    } catch(err) {
      return reject(err);
    }
    return resolve(params);
  }

  const tests = fs.readdirSync(localDir).filter(file => file.slice(0, 2) === 't-' && path.extname(file) === '.js');
  if (!tests.length) {
    return reject('No tests found in this folder;\nnote that all tests must be .js files and begin with "t-" prefix to be detected.');
  }

  if (argv.a || argv.all) {
    params.tests.push(...resolveBundles(tests));
    return resolve(params);
  }

  inquirer.prompt({
    type: 'list',
    name: 'tests',
    message: 'Select the test to execute: ',
    choices: tests,
    default: tests[0]
  }).then((result) => {
    try {
      params.tests.push(...resolveBundles([result.tests]));
    } catch(err) {
      return reject(err);
    }
    resolve(params);
  });
});
