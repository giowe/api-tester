const inquirer = require('inquirer');
const fs = require("fs");
const localDir = process.cwd();

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
const promise = inquirer.prompt(question);  
module.exports = promise;