'use strict';

const chalk = require('chalk');
const pretty = require('js-object-pretty-print').pretty;
const { diff, isEmptyObject } = require('./utils');

module.exports = (sample, result, options) => {
  const errors = {
    status: [],
    headers: [],
    body: []
  };

  if (sample.status) {
    if (sample.status !== result.status) {
      errors.status.push(`- expected ${chalk.red(sample.status)} but received ${chalk.red(result.status)};`);
    }
  }

  if (sample.headers) {
    const normalizedSampleHeaders = {};
    const normalizedResultHeaders = {};
    Object.entries(sample.headers).map(([key, value]) => normalizedSampleHeaders[key.toLowerCase()] = value);
    Object.entries(result.headers).map(([key, value]) => normalizedResultHeaders[key.toLowerCase()] = value);

    if (options && options.headers && options.headers.keysOnly) {
      Object.keys(normalizedSampleHeaders).forEach(key => {
        if (!(key in normalizedResultHeaders)) errors.headers.push(`- missing header ${chalk.red(key)};`);
      });
    } else {
      Object.entries(normalizedSampleHeaders).forEach(([key, value]) => {
        const receivedValue = normalizedResultHeaders[key];
        if (value !== receivedValue) errors.headers.push(`- expected value ${chalk.red(value)} in header ${chalk.red(key)} but got ${chalk.red(receivedValue)}`);
      });
    }
  }

  if (sample.body) {
    const bodyDiffs = diff(sample.body, result.body, (options && options.body && options.body.keysOnly));
    if (!isEmptyObject(bodyDiffs)) errors.body.push(`- differences between expected sample and received result:\n${chalk.red(pretty(bodyDiffs))}`);
  }
  return errors;
};
