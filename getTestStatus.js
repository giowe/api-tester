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
  if (result.statusError && sample.statusError) {
    trystatus(result.statusError, sample.statusError);
  }

  if (result.headers && sample.headers) {
    trystatusObj(result.headers, sample.headers,);
  }

  if (result.boy && sample.body) {
    trystatusObj(result.body, sample.body);
  }

  if (result.headersKeys && sample.headersKeys) {
    if (result.headersKeys.length === sample.headersKeys.length) {
      trystatusKeys(result.headersKeys, sample.headersKeys);
    } else {
      statusError++;
    }
  } else {
    statusError ++;
  }

  if (result.bodyKeys && sample.bodyKeys) {
    if (result.bodyKeys.length === sample.bodyKeys.length) {
      trystatusKeys(result.bodyKeys, sample.bodyKeys);
  } else {
      statusError++;
    }
  } else {
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
