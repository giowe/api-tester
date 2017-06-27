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

// const printObj = (result, sample, type, differences) => {
//   const columns = [];
//   const differencesKeys = Object.keys(differences);
//   const resultKeys = Object.keys(result);
//   const sampleKeys = Object.keys(sample);
//   resultKeys.forEach(key => {
//       if (differencesKeys.indexOf(key) !== -1) {
//         const value = result[key];
//         if (typeof value === 'object' && value !== null) {
//           //todo
//           const objColumns = printObj(value, sample[key], type, diff(value, sample[key])) );

//         } 
//         else if (Array.isArray(value)) {
//           let objResult = `${key}: [`
//           let objSample = `${key}: [`
//           value.forEach((item, index) => {
//             switch (typeof item){
//               case 'string':
//               case 'number':
//               {
//                 objResult += item === sample[key][index] ? 
//                           `${item}` : `${chalk.red(item)}`
//                 break;
//               }
//               case 'object':
//               {
//                 if (Array.isArray(item)) {
//                     ///
//                 } else {
                  
//                 }
//                 break;
//               }
//               default:
//                 throw new Error("Oh noooo");
//             }
//           })
//           objResult += ']'
//           objSample += ']'
//           columns.push({result: objResult, sample: objSample });
//         } 
//         else { //use else if
//           columns.push({ result: chalk.red(`${key}: ${result[key]}`), sample: `${sampleKeys.indexOf(key) !== -1 ? 
//                                                       chalk.green(`${key}: ${sample[key]}`) :
//                                                       ''}` });
//         }                                            
//       } else {
//         columns.push({result: `${key}: ${result[key]}`, sample: `${sampleKeys.indexOf(key) !== -1 ? 
//                                                       `${key}: ${sample[key]}` :
//                                                       ''}` });
//       }
//   });
//   (columns)
//   return (columns);
// }

const getColumns = (result, sample, type, differences) => {
  // const resultColored = {};
  // const sampleColored = {};
  const columns = []
  if (type === 'application/json'){
    const resultKeys = Object.keys(result);
    const sampleKeys = Object.keys(sample);
    resultKeys.forEach((key) => {
      const value = result[key];
      if (value === [sample[key]]) {
        // Object.assign(resultColored, { [key]: value });
        // Object.assign(sampleColored, { [key]: sample[key] });
        if (Array.isArray(value)) {
          value = setArray(value);
        }
        columns.push({ field: key, result: value, sample: sample[key]});
      } else {
        // Object.assign(resultColored, {[key]: chalk.red(value) });
        // Object.assign(sampleColored, { [key]: chalk.green(sample[key]) });
        if (Array.isArray(value)) {
          value = setArray(value);
        }
        columns.push({ field: key, sample: JSON.stringify(sample[key]), result: JSON.stringify(value) });
      }
    });
  } 
  return columns;
};

const setArray = (array) => {
  let out = '[\n';

  array.forEach((item) => {
    out += item + ',\n';
  });

  return out;
}

const getErrorMessage = (result, sample, type) => {
  let errorMessage = '';
  if (type === 'application/json') {
    const test =getColumns(result, sample, type, diff(result, sample));
    Object.assign(test, { columnSplitter: ' | '})
    console.log(columnify(test));
  }
};

module.exports = getErrorMessage;