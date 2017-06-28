const argv = require('yargs').argv;
const inquirer = require('inquirer');
const fs = require("fs");
const localDir = process.cwd();
const path = require('path');

if (argv.v || argv.version) {
  const pkg = require('./package.json');
  console.log(pkg.name, pkg.version);
  process.exit();
}

const params = {
  verbose: argv.verbose,
  tests: {}
};

argv._.forEach((testPath) =>{
    params.tests[testPath] = require(path.join(localDir,testPath));
});

const choices = fs.readdirSync(localDir).filter(file => {
  return file.slice(0, 11) === 'api-tester-' && file.slice(-3) === '.js';
});

const question = {
  type: "list",
  name: "Test",
  message: 'Select the test to execute: ',
  choices,
  default: choices[0]
}

if (choices.length === 0) {
  console.log('There aren\'t any tests in this folder');
  process.exit()
}

module.exports = () => new Promise((resolve, reject) => {
  if(Object.keys(params.tests).length === 0){
    inquirer.prompt(question)
      .then((result) => {
        Object.assign(
          params.tests,
          {
            [result.Test]: require(path.join(localDir, result.Test))
          }
        );
        resolve(params);
    });
  } else {
    resolve(params);
}});
