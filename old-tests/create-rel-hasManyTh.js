const baseTest = require('./baseTestNoClean');

const payload = {
  permalink: 'hasManyTh-test',
  lang: 'it',
  categories: [
    {
      lang: 'it',
      permalink: 'caneItaliano'
    },
    {
      lang: 'it',
      permalink: 'mangoItaliano'
    }
  ],
  type: {
    permalink: 'pagine',
    lang: 'it'
  },
  author: {
    login: 'admin'
  }
};
const path = 'contents/contents';
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
