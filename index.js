"use strict";

const request = require("request");
const { expect, it } = require('chai');
const testUsers = require('./tests/test-users');

testUsers.then((result) => {
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
        console.log("Fatto");
      }
    } 
  )
// res deve essere uguale a samplesTestContents
}).catch((err) => console.log('sono qui', err)
  // thow error request failed
);
