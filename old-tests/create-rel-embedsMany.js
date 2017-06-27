const baseTest = require('./baseTestNoClean');

const payload = {
  permalink: 'embedsMany-test',
  lang: 'it',
  asides: [
    {
      handler: 'label1',
      lang: 'it',
      label: 'label 1',
      body: 'body 1'
    },
    {
      handler: 'label2',
      lang: 'it',
      label: 'label 2',
      body: 'body 2'
    },
    {
      handler: 'label3',
      lang: 'it',
      label: 'label 3',
      body: 'body 3'
    },
    {
      handler: 'label4',
      lang: 'it',
      label: 'label 4',
      body: 'body 4'
    },
    {
      handler: 'label5',
      lang: 'it',
      label: 'label 5',
      body: 'body 5'
    }
  ],
  type: {
    permalink: 'pagine',
    lang: 'it'
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
