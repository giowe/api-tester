"use strict";

const https = require("https")
const expect = require('expect');
const fs = require ('fs');
const testUsers = require('./tests/test-users');

testUsers.then((result) => {
  const sample = result.sample
  const config = result.config
  console.log(config)
  // vari expects
  https.request(config, (res) => {
    res.on('data', () => {
      console.log('ciao')
    })
    res.on('end', () => {
      expect(res).toBe(sample);
    });
  })
// res deve essere uguale a samplesTestContents
}).catch((err) => console.log('sono qui', err)
  // thow error request failed
);
