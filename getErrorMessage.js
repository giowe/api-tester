'use strict';

const chalk = require('chalk');

const isEmptyObject = function(obj) {
  for (let name in obj) return false;
  return true;
};

// quello sbagliato => obj2
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
const getErrorMessage = (result, sample, type) => {
  let errorMessage = '';
  console.log(diff(result, sample));
  if (type === 'application/json') {
    const errorData =diff(sample, result);
    console.log(chalk.red(errorData));
  }
};

const obj1 = {
  name: 'pippo',
  lastname: 'ciao',
  d:{
    l: 's'
  }
};

const obj2 = {
  name: 'pluto',
  lastname: 'ciao',
  d: {
    l: 'a'
  }
};
const errorData = diff(obj1, obj2);

console.log(chalk.red(JSON.stringify(errorData)));

module.exports = getErrorMessage;
