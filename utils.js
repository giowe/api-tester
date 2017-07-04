'use strict';

const getValue = (obj, requiredKey) => {
  const entries = Object.entries(obj);
  const l = entries.length;
  for (let i = 0; i < l; i++) {
    const [ key, value ] = entries[i];
    if (requiredKey.toLowerCase() === key.toLowerCase()) return value;
  }
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

const diff = (obj1, obj2, keysOnly = false) => {
  const result = {};
  let change;
  Object.keys(obj1).forEach(key => {
    if (obj2[key] && obj1[key] && typeof obj2[key] === 'object' && typeof obj1[key] === 'object') {
      change = diff(obj1[key], obj2[key]);
      if (isEmptyObject(change) === false) {
        result[key] = change;
      }
    }
    else if ((keysOnly && typeof obj2[key] !== 'undefined') || (!keysOnly && obj2[key] !== obj1[key])) {
      result[key] = obj2[key];
    }
  });
  return result;
};

module.exports = {
  getValue,
  diff,
  isEmptyObject
};
