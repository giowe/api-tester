'use strict';

const auth = require('../auth.js');
const sample = require('./sample.json');

const config = {
  method: 'POST',
  path: '/principal/users/',
  headers:{
    'Content-Type': 'application/json',
    Authorization : auth
  }
};


const promise = new promise((resolve,reject) =>{
  Object.assign(config, { Authorization: auth });
  resolve(config, sample);
});

module.exports = promise;
