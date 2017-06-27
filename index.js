'use strict';

const request = require('request');
const { expect } = require('chai');
// const chooseTest = require('./utils/choose-test');
const init = require('./init.js');
const chalk = require('chalk');
const getErrorMessage = require('./getErrorMessage');
const columnify = require('columnify');

const verbose = true;

const tests = [require('./tests/api-tester-create-no-rel'), require('./tests/api-tester-create-rel-belongsTo')];

// init().then((tests) => {

// const f = tests.map(test => 
//   test().then((params) => {
//     const { method, uri, output, input } = result.config;
//     const { headers, body } = input 
//     const opt = {
//       method,
//       uri
//     };
//     request(
//       opt, (err, res, body) => {
//         if (err) {
//           console.log(chalk.red(err));
//         }
//         else {
//           body = JSON.parse(body);
//           try {
//             expect(body).to.deep.equal(sample)
//             console.log(chalk.green('Done!!!'));
//           } catch (err) {
//             const type = res.headers['content-type'].split('; ')[0];
//             // getErrorMessage(body, sample, type);
//           // console.log(errorMessage);
//           }
//         }
//       }
//     );
//   })
//     .catch(error => { console.error(error); })
// );

const p1 = () => (new Promise((resolve, reject) => {
  const msg = 'benvenuto in p1';
  resolve(msg)
}))


const p2 = () => (new Promise((resolve, reject) => {
  const msg = 'benvenuto in p2';
  resolve(msg)
}))

const p3 = () => (new Promise((resolve, reject) => {
  const msg = 'benvenuto in p3';
  resolve(msg)
}))

const f = [p1, p2, p3];

const newF = f.map(promise => new Promise((resolve, reject) => {
  promise().then((msg) => {
    console.log(msg)
    resolve();
  });
}))

// f.reduce((cur, next) => 
//   cur
//     .then()
//     .then(next),
//   Promise.resolve()
// );

newF.reduce((p, fn) => p.then(fn), Promise.resolve());


// });
// chooseTest.then(result => {
//   const testName = result['Test'];
//   const test = require(`${process.cwd()}/${testName}`);
//   test.then((result) => {
//     const sample = result.sample;
//     const { method, host, path } = result.config;
//     const opt = {
//       method,
//       uri : `${host}${path}`
//     };

//     request(
//       opt, (err, res, body) => {
//         if (err) {
//           console.log(chalk.red(err));
//         }
//         else {
//           body = JSON.parse(body);
//           try {
//             expect(body).to.deep.equal(sample)
//             console.log(chalk.green('Done!!!'));
//         } catch (err) {
//           const type = res.headers['content-type'].split('; ')[0];
//           getErrorMessage(body, sample, type);
//             // console.log(errorMessage);
//           }
//         }
//       } 
//     );
//   }).catch((err) => console.log(chalk.red('There is an error in your test configuration.')));
// }).catch((err) => {
//   console.log(err);
// });
