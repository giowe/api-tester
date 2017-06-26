const expect = require('expect');

const testContents = require('./tests/tests-contents');
const samplesTestContents = JSON.parse(require('./tests/test-contents/sample.json'));

testContents.then((res) => {
  // vari expects
  // res deve essere uguale a samplesTestContents
}).catch(
  // thow error request failed
);
