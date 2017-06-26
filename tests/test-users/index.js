"use strict";

const http = require('http');
const fs = require('fs');

const myPromise = new Promise((resolve, reject) => {
	const config = require('./config.json');
	const sample = require('./sample.json');
	const urlSecret = require('./url-secret.json');
  // eventuale auth
	Object.assign(config, urlSecret);
	resolve({ config, sample });
	});

module.exports = myPromise;