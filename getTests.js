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
  outfile: argv.o || argv.outfile,
  tests: []
};

const resolveBundles = (testPaths, prefix = localDir) => {
  const out = [];
  testPaths.forEach(testPath => {
    let test;
    const name = path.parse(testPath).name;
    const absoluteTestPath = path.isAbsolute(testPath)? testPath : path.join(prefix, testPath);
    try {
      test = require(absoluteTestPath);
    } catch (err) {
      if (err.message === `Cannot find module '${absoluteTestPath}'`) {
        console.log(`Cannot find test '${absoluteTestPath}'`);
        process.exit();
      }
      throw({ err, name });
    }
    if (typeof test === 'function') {
      out.push({
        name: path.parse(testPath).name,
        test
      });
    } else if (Array.isArray(test)) {
      out.push(...resolveBundles(test, path.parse(absoluteTestPath).dir));
    } else {
      throw({ err: new Error('Invalid test!'), name });
    }
  });
  return out;
};

module.exports = (tests, options) => new Promise((resolve, reject) => {
  if (tests && tests.length) {
    if (options) Object.assign(params, options);
    console.log(params, options);
    try {
      params.tests.push(...resolveBundles(tests));
    } catch(err) {
      return reject(err);
    }
    return resolve(params);
  }

  if (argv._.length) {
    try {
      params.tests.push(...resolveBundles(argv._));
    } catch(err) {
      return reject({ err });
    }
    return resolve(params);
  }

  const folderTests = fs.readdirSync(localDir).filter(file => file.slice(0, 2) === 't-' && path.extname(file) === '.js');
  if (!folderTests.length) {
    return reject({ err: 'No tests found in this folder;\nnote that all tests must be .js files and begin with "t-" prefix to be detected.' });
  }

  if (argv.a || argv.all) {
    try {
      params.tests.push(...resolveBundles(folderTests));
    } catch(err) {
      return reject(err);
    }
    return resolve(params);
  }

  inquirer.prompt({
    type: 'list',
    name: 'tests',
    message: 'Select the test to execute: ',
    choices: folderTests,
    default: folderTests[0]
  }).then((result) => {
    try {
      params.tests.push(...resolveBundles([result.tests]));
    } catch(err) {
      return reject(err);
    }
    resolve(params);
  });
});
