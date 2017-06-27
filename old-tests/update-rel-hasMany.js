const baseTest = require('./baseTestNoClean');

const payload = {
  contents: [
    {
      "lang": "it",
      "permalink": "come-pulire-un-pavimento-in-resina"
    },
    {
      "lang": "it",
      "permalink": "5-motivi-per-scegliere-pavimenti-in-resina"
    },
    {
      "lang": "it",
      "permalink": "scegliere-resina-industria-alimentare"
    },
    {
      "lang": "it",
      "permalink": "home"
    }
  ]
};
const path = 'contents/types/it/blog';
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
