'use strict';

const { expect } = require('chai');
let status;
let statusExit;

function tryStatus(result, sample){
  try{
    expect(result).to.deep.equal(sample);
  }catch(err) {
    status++;
  }
}

const getErrorStatus = (result, sample) => {

  tryStatus(result.status, sample.status);
  tryStatus(result.headers, sample.headers);
  tryStatus(result.body, sample.body);
  tryStatus(result.headerskeys, sample.bodykeys);
  tryStatus(result.bodykeys, samplekeys);

  if (status >= 1 || status <= 4) statusExit = 1;
  else if (status === 0) statusExit = 0;
  else if (status === 5) statusExit = 2;

  return statusExit;
};

// deve returnare:
// 0 => tutte le chiavi sono giuste
// 1 => almeno una chiave e giusta
// 2 => nessuna chiave e giusta

module.exports = getErrorStatus;
