'use strict';

const { expect } = require('chai');
let statusError = 0;
let statusExit = -1;

const trystatus = (res, sample) => {
  try{
    expect(res).to.equal(sample);
  }catch(err){
    statusError++;
  }
};

const trystatusObj = (res, sample) => {
  try{
    expect(res).to.deep.equal(sample);
  }catch(err){
    statusError++;
  }
};

const trystatusKeys = (resKeys, sampleKeys) => {
  try {
    expect(resKeys).to.deep.equal(sampleKeys);
  } catch(err){
    statusError++;
  }
};

const getErrorstatusError = (result, sample) => {

  const sampleKeysLength = Object.keys(sample).length;
  if (sample.status) {
    trystatus(result.status, sample.status);
  } else if(sample.status && !result.status) {
    statusError++;
  }

  if (sample.headers) {
    trystatusObj(result.headers, sample.headers,);
  }else if(sample.headers && !result.headers) {
    statusError++;
  }

  if (sample.body) {
    trystatusObj(result.body, sample.body);
  } else if(sample.body && !result.body) {
    statusError++;
  }

  if (sample.headersKeys) {
    if (result.headersKeys.length === sample.headersKeys.length) {
      trystatusKeys(result.headersKeys, sample.headersKeys);
    } else {
      statusError++;
    }
  } else if(sample.headersKeys && !result.headersKeys) {
    statusError++;
  }

  if (sample.bodyKeys) {
    if (result.bodyKeys.length === sample.bodyKeys.length) {
      trystatusKeys(result.bodyKeys, sample.bodyKeys);
  } else {
      statusError++;
    }
  } else if(sample.bodyKeys && !result.bodyKeys){
    statusError++;
  }

  if (statusError > 0 && statusError < sampleKeysLength) statusExit = 1;
  else if (statusError === 0) statusExit = 0;
  else if (statusError === sampleKeysLength) statusExit = 2;

  return statusExit;
};

/*const resultPROVA  = {
  headers:{

  },
  body: {

  },
};

const samplePROVA = {
  headers:{

  },
  body: {

  },
  headersKey : [

  ]
};

const temp = getErrorstatusError(resultPROVA, samplePROVA);

console.log(temp);
*/

// deve returnare:
// 0 => tutte le chiavi sono giuste
// 1 => almeno una chiave e giusta
// 2 => nessuna chiave e giusta

module.exports = getErrorstatusError;
