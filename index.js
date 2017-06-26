const expect = require('expect');
const fs = require ('fs');
const testContents = require('./tests/test-contents');
const samplesTestContents = JSON.parse(fs.readFileSync('./tests/test-contents/sample.json'));
const opt = JSON.parse(fs.readFileSync('./config.json'));
const http = require('http');


testContents.then((res, sample) => {
  // vari expects
  expect(res).toBe(sample);
// res deve essere uguale a samplesTestContents
}).catch(
  // thow error request failed
);
