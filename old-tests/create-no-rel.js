const baseTest = require('./baseTestNoClean');

const payload = {
  permalink: 'type-prova',
  lang: 'it',
  label: 'tipo appena creato'
};
const path = 'contents/types'; 
const method = 'POST';

const test = (terminatePool = false) =>
  baseTest(
    path,
    method,
    JSON.stringify(payload),
    terminatePool
  );

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  test(true)
    .then(data => { console.log(data); })
    .catch(error => { console.error(error); });
}

module.exports = test;
