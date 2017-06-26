const http = require('http');
const fs = require('fs');

const myPromise = new promise((resolve, reject) => {
	const config = JSON.parse(fs.readFileSync('./config.json'));
	const sample = JSON.parse(fs.readFileSync('./sample.json'));
	const urlSecret = JSON.parse(fs.readFileSync('./url-secret.json'));
  // eventuale auth
	Object.assign(config, urlSecret);
	resolve(config, sample);
	});

module.exports = myPromise;