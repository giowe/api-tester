'use strict';

const getValue = (obj, requiredKey) => {
  const entries = Object.entries(obj);
  const l = entries.length;
  for (let i = 0; i < l; i++) {
    const [ key, value ] = entries[i];
    if (requiredKey.toLowerCase() === key.toLowerCase()) return value;
  }
};

module.exports = {
  getValue
};
