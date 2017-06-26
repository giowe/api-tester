"use strict";

const config = require('./config.json');
const auth = require('../../utils/auth.js');

const promise = new promise((resolve,reject) =>{
  Object.assign(config, {Authorization: auth});
  resolve(config,sample);
})

module.exports = promise;
