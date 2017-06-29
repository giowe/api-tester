'use strict';

const { expect } = require('chai');
let status = 0;
let statusExit = -1;

const tryStatus = (res, sample) => {
  try{
    expect(res).to.equal(sample);
  }catch(err){
    status++;
  }
};

const tryStatusObj = (res, sample) => {
  try{
    expect(res).to.deep.equal(sample);
  }catch(err){
    status++;
  }
};

const tryStatusKeys = (resKeys, sampleKeys) => {
  try {
    expect(resKeys).to.deep.equal(sampleKeys);
  } catch(err){
    status++;
  }
};

const getErrorStatus = (result, sample) => {

  const sampleKeysLength = Object.keys(sample).length;
  const differences = diff(sample, result);
  if (result.status && sample.status) {
    tryStatus(result.status, sample.status);
  }

  if (result.headers && sample.headers) {
    tryStatusObj(result.headers, sample.headers,);
  }

  if (result.boy && sample.body) {
    tryStatusObj(result.body, sample.body);
  }

  if (sample.headersKeys) {
    if (result.headersKeys.length === sample.headersKeys.length) {
      tryStatusKeys(result.headersKeys, sample.headersKeys);
    } else {
      status++;
    }
  }

  if (sample.bodyKeys) {
    if (result.bodyKeys.length === sample.bodyKeys.length) {
      tryStatusKeys(result.bodyKeys, sample.bodyKeys);
  } else {
      status++;
    }
  }

  if (status > 0 && status < sampleKeysLength) statusExit = 1;
  else if (status === 0) statusExit = 0;
  else if (status === sampleKeysLength) statusExit = 2;
  return statusExit;
};

/*const resultPROVA  = {
  status: 'p',
  headers:{

  },
  body: {

  },
};

const samplePROVA = {
  headers:{

  },
  body: {
    fuck: 'fuck',
  },
  headersKey : [

  ]
};

const temp = getErrorStatus(resultPROVA, samplePROVA);

console.log(temp);
*/

// deve returnare:
// 0 => tutte le chiavi sono giuste
// 1 => almeno una chiave e giusta
// 2 => nessuna chiave e giusta

module.exports = getErrorStatus;
