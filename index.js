"use strict";

const request = require("request");
const { expect } = require('chai');
const chooseTest = require('./utils/choose-test')
const init = require('./init.js')

init();

chooseTest.then(result => {
  const testName = result['Test'];
  const test = require(`${process.cwd()}/${testName}`);
  test.then((result) => {
    const sample = result.sample
    const {method, host, path} = result.config

    const opt = {
      method,
      uri : `${host}${path}`
    }
    // vari expects

    request(
      opt, (err, res, body) => {
        if (err) {
          console.log(err);
        }
        else {
          body = JSON.parse(body);
          expect(body).to.deep.equal(sample);
        }
      } 
    )
// res deve essere uguale a samplesTestContents
  }).catch((err) => console.log('sono qui', err)
    // thow error request failed
  );
}).catch((err) => {
  console.log(err)
});
