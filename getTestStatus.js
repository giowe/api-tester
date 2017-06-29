'use strict';

let statusError = 0;
let statusExit = -1;

const tryStatus = (res, sample) => {
  if (JSON.stringify(res) === JSON.stringify(sample)){
    statusError++;
  }
};

const getStatusError = (result, sample) => {
  const sampleKeysLength = Object.keys(sample).length;

  if (sample.status) {
    if (!result.status) statusError++;
    else tryStatus(result.status, sample.status);
  }

  if (sample.headers) {
    if (!result.headers) statusError++;
    else tryStatus(result.headers, sample.headers,);
  }

  if (sample.body) {
    if (!result.body) statusError++;
    else tryStatus(result.body, sample.body);
  }

  if (sample.headersKeys) {
    if (!result.headersKeys) statusError++;
    else {
      if (result.headersKeys.length === sample.headersKeys.length) {
        tryStatus(result.headersKeys, sample.headersKeys);
      } else {
        statusError++;
      }
    }
  }

  if (sample.bodyKeys) {
    if (!result.bodyKeys) statusError++;
    else {
      if (result.bodyKeys.length === sample.bodyKeys.length) {
        tryStatus(result.bodyKeys, sample.bodyKeys);
      } else {
        statusError++;
      }
    }
  }

  if (statusError > 0 && statusError < sampleKeysLength) statusExit = 1;
  else if (statusError === 0) statusExit = 2;
  else if (statusError === sampleKeysLength) statusExit = 0;

  return statusExit;
};

// deve returnare:
// 0 => tutte le chiavi sono giuste
// 1 => almeno una chiave e giusta
// 2 => nessuna chiave e giusta

module.exports = getStatusError;
