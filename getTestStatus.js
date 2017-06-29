'use strict';

const { expect } = require('chai');
let status = 0;
let statusExit = -1;
let resultHeadersKeys;
let resultBodyKeys;
let sampleHeadersKeys;
let sampleBodyKeys;

const tryStatus = (res, sample) => {
  try{
    expect(res).to.be.equal(sample);
  }catch(err){
    status++;
  }
  console.log(status);
};

const tryStatusObj = (res, sample) => {
  try{
    expect(res).to.deep.equal(sample);
  }catch(err){
    status++;
  }
  console.log(status);
};

const tryStatusKeys = (resKeys, sampleKeys) => {
  try {
    expect(resKeys).to.deep.equal(sampleKeys);
  } catch(err){
    status++
  }
  console.log(status);
};

const getErrorStatus = (result, sample) => {

  const sampleKeysLength = Object.keys(sample).length;

  if (sample.status) {
    tryStatus(result.status, sample.status);
  }

  if (sample.headers) {
    tryStatusObj(result.headers, sample.headers,);
  }

  if (sample.body) {
    tryStatusObj(result.body, sample.body);
  }

  if (sample.headersKeys) {
    resultHeadersKeys = Object.keys(result.headersKeys);
    sampleHeadersKeys = Object.keys(sample.headersKeys);
    if (Object.keys(resultHeaders).length === Object.keys(sampleHeaders).length) {
      tryStatusKeys(resultHeadersKeys, sampleHeadersKeys);
    } else {
      status++;
    }
  }

  if (sample.bodyKeys) {
    resultBodyKeys = Object.keys(result.bodyKeys);
    sampleBodyKeys = Object(sample.bodyKeys);
    if (resultBodyKeys.length === sampleBodyKeys.length) {
      tryStatusKeys(resultBodyKeys, sampleBodyKeys);
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

  }
};

const samplePROVA = {
  status: 'popopop',
  headers:{
    dsa: 'godo',
  },
  body: {
    fuck: 'fuck',
  }
};*/

// deve returnare:
// 0 => tutte le chiavi sono giuste
// 1 => almeno una chiave e giusta
// 2 => nessuna chiave e giusta

module.exports = getErrorStatus;
