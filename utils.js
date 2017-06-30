'use strict';

const getValue = (obj, requiredKey) => {
  const entries = Object.entries(obj);
  const l = entries.length;
  for (let i = 0; i < l; i++) {
    const [ key, value ] = entries[i];
    if (requiredKey.toLowerCase() === key.toLowerCase()) return value;
  }
};

const _isEmptyObject = function(obj) {
  for (let name in obj) return false;
  return true;
};

const diff = function(obj1, obj2) {
  const result = {};
  let change;
  for (let key in obj1) {
    if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object') {
      change = diff(obj1[key], obj2[key]);
      if (_isEmptyObject(change) === false) {
        result[key] = change;
      }
    }
    else if (obj2[key] != obj1[key]) {
      result[key] = obj2[key];
    }
  }
  return result;
};

module.exports = {
  getValue,
  diff
};
