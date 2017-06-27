const baseTest = require('./baseTestNoClean');

const payload = {
  permalink: 'mix',
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
  tags: [
    {
      lang: 'it',
      permalink: 'rosso'
    },
    {
      lang: 'it',
      permalink: 'verde'
    },
    {
      lang: 'it',
      permalink: 'giallo'
    }
  ],
  type: {
    permalink: 'pagine',
    lang: 'it'
  },
  author: null
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
  setInterval(() =>{
    test(false)
      .then(data => { console.log(data);})
      .catch(error => { console.error(error); });
  }, 2500);

}

module.exports = test;
