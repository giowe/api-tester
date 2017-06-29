'use strict';

const chalk = require('chalk');
const pretty = require('js-object-pretty-print').pretty;

const isEmptyObject = function(obj) {
  for (let name in obj) return false;
  return true;
};

const diff = function(obj1, obj2) {
  const result = {};
  let change;
  for (let key in obj1) {
    if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object') {
      change = diff(obj1[key], obj2[key]);
      if (isEmptyObject(change) === false) {
        result[key] = change;
      }
    }
    else if (obj2[key] != obj1[key]) {
      result[key] = obj2[key];
    }
  }
  return result;
};

const getErrorMessage = (result, sample, type, isError) => {
  if (type === 'application/json') {
    const errorData =diff(sample, result);
    if (isError) console.log(chalk.red('Differences: ', pretty(errorData)));
    else console.log(chalk.yellow('Differences: ', pretty(errorData)));
    console.log('Expected: \n' + pretty(sample) + ', but received: \n' + pretty(result));
  }
};

module.exports = getErrorMessage;
