const baseTest = require('./baseTestNoClean');

const payload = {
  title: 'test update belongsTo',
  type: {
    lang: 'it',
    permalink: 'blog'
  }
};
const path = 'contents/contents/it/home';
const method = 'PUT';

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