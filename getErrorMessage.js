'use strict';
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

const getErrorMessage = (result, sample, type) => {
  if (type && type.toLowerCase().indexOf('application/json') !== -1) {
    return `Differences:\n${pretty(diff(sample, result))}\nExpected:\n${pretty(sample)}\nbut received:\n${pretty(result)}`;
  }
  return `Expected:\n${sample}\nbut received:\n${result}`;
};

module.exports = getErrorMessage;
