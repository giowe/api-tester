'use strict';

const { expect } = require('chai');
var status;
var statusExit;

const getErrorStatus = (result, sample) => {
  try{
    expect(result.status).to.deep.equal(sample.status);
  }catch(err) {
    status++;
  }
  try{
    expect(result.headers).to.deep.equal(sample.headers);
  }catch(err) {
    status++;
  }
  try{
    expect(result.body).to.deep.equal(sample.body);
  }catch(err) {
    status++;
  }
  try{
    expect(result.headersKeys).to.deep.equal(sample.headersKeys);
  }catch(err) {
    status++;
  }
  try{
    expect(result.bodyKeys).to.deep.equal(sample.bodyKeys);
  }catch(err) {
    status++;
  }
  if (status >= 1 || status <= 4) statusExit = 1;
  else if
};

// deve returnare:
// 0 => tutte le chiavi sono giuste
// 1 => almeno una chiave e giusta
// 2 => nessuna chiave e giusta
module.exports = getErrorStatus;
