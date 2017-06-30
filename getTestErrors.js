'use strict';

const chalk = require('chalk');
const { getValue } = require('./utils');

module.exports = (sample, result, options) => {
  const errors = {
    status: [],
    headers: [],
    body: []
  };

  if (sample.status) {
    if (sample.status !== result.status) {
      errors.status.push(`- expected ${chalk.white(sample.status)} but received ${chalk.white(result.status)};`);
    }
  }

  if (sample.headers) {
    const normalizedSampleHeaders = {};
    const normalizedResultHeaders = {};
    Object.entries(sample.headers).map(([key, value]) => normalizedSampleHeaders[key.toLowerCase()] = value);
    Object.entries(result.headers).map(([key, value]) => normalizedResultHeaders[key.toLowerCase()] = value);

    if (options.headers && options.headers.keysOnly) {
      Object.keys(normalizedSampleHeaders).forEach(key => {
        if (!(key in normalizedResultHeaders)) errors.headers.push(`- missing header ${chalk.white(key)};`);
      });
    } else {
      Object.entries(normalizedSampleHeaders).forEach(([key, value]) => {
        const receivedValue = normalizedResultHeaders[key];
        if (value !== receivedValue) errors.headers.push(`- expected value ${chalk.white(value)} in header ${chalk.white(key)} but got ${chalk.white(receivedValue)}`);
      });
    }
  }

  return errors;
};
