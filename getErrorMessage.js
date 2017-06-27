const chalk = require('chalk');

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

const getErrorMessage = (result, sample, type) => {
  let errorMessage = '';
  if (type === 'application/json') {
    errorMessage += '{\n  result\t\tsample\n';
    const differences = diff(result, sample);
    const resultKeys = Object.keys(result);
    console.log(resultKeys)
    const sampleKeys = Object.keys(sample);
    console.log(sampleKeys);
    resultKeys.forEach(key => {
      let msg = ''
      if (differences[key]) {
        msg += `  ${chalk.red(`${key}: ${result[key]}`)}\t\t${sample[key] ? 
                                                      chalk.green(`${key}: ${sample[key]}`) :
                                                      ''}\n`;
      } else {
        msg += `  ${key}: ${result[key]}\t\t${sample[key] ? 
                                                      `${key}: ${sample[key]}` :
                                                      ''}\n`;
      }
      errorMessage += msg;
  });
  console.log(errorMessage);
  }
};

module.exports = getErrorMessage;