"use strict";

const expect = require('expect');
const fs = require ('fs');
const testUsers = require('./tests/test-users');
const http = require('http');

testUsers.then((result) => {
  const sample = result.sample
  const config = result.config
  // vari expects
  http.request(config, (res) => {
    res.on('end', () => {
      expect(res).toBe(sample);
    });
  })
// res deve essere uguale a samplesTestContents
}).catch((err) => console.log('sono qui', err)
  // thow error request failed
);
