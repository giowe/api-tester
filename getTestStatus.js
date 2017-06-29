'use strict';

const deepEql = require("deep-eql");
let statusError = 0;
let statusExit = -1;

const tryStatus = (res, sample) => {
  if(!deepEql(res, sample)) statusError++;
};

const tryStatusObj = (res, sample) => {
  if(!deepEql(res, sample)) statusError++;
};

const tryStatusKeys = (resKeys, sampleKeys) => {
  if(!deepEql(resKeys, sampleKeys)) statusError++;
};

const getStatusError = (result, sample) => {

  const sampleKeysLength = Object.keys(sample).length;
  if (sample.status) {
    tryStatus(result.status, sample.status);
  } else if(sample.status && !result.status) {
    statusError++;
  }

  if (sample.headers) {
    tryStatusObj(result.headers, sample.headers,);
  }else if(sample.headers && !result.headers) {
    statusError++;
  }

  if (sample.body) {
    tryStatusObj(result.body, sample.body);
  } else if(sample.body && !result.body) {
    statusError++;
  }

  if (sample.headersKeys) {
    if (result.headersKeys.length === sample.headersKeys.length) {
      tryStatusKeys(result.headersKeys, sample.headersKeys);
    } else {
      statusError++;
    }
  } else if(sample.headersKeys && !result.headersKeys) {
    statusError++;
  }

  if (sample.bodyKeys) {
    if (result.bodyKeys.length === sample.bodyKeys.length) {
      tryStatusKeys(result.bodyKeys, sample.bodyKeys);
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

module.exports = getStatusError;
