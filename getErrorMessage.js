const chalk = require('chalk');
const columnify = require('columnify')

const isEmptyObject = (obj)  => {
  for (let name in obj) return false;
  return true;
};

const diff = (obj1, obj2) => {
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

const printObj = (result, sample, type, differences) => {
  const columns = [];
  const differencesKeys = Object.keys(differences);
  const resultKeys = Object.keys(result);
  const sampleKeys = Object.keys(sample);
  let errorMessage = '';
  resultKeys.forEach(key => {
      if (differencesKeys.indexOf(key) !== -1) {
        const value = result[key];
        if (typeof value === 'object' && value !== null) {
          columns.push({[key]: printObj(value, sample[key], type, diff(value, sample[key])) });
        } else { //use else if
          columns.push({result: chalk.red(`${key}: ${result[key]}`), sample: `${sampleKeys.indexOf(key) !== -1 ? 
                                                      chalk.green(`${key}: ${sample[key]}`) :
                                                      ''}` });
        }                                            
      } else {
        columns.push({result: `${key}: ${result[key]}`, sample: `${sampleKeys.indexOf(key) !== -1 ? 
                                                      `${key}: ${sample[key]}` :
                                                      ''}` });
      }
  });
  return errorMessage;
}

const getErrorMessage = (result, sample, type) => {
  let errorMessage = '';
  if (type === 'application/json') {
    const columns = printObj(result, sample, type, diff(result, sample));
    console.log(columns);
  }
};

module.exports = getErrorMessage;