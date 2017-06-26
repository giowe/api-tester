const http = require('http');
const fs = require('fs');

const myPromise = new promise((resolve, reject) => {
	const config = JSON.parse(fs.readFileSync('./config.json'));
	const sample = JSON.parse(fs.readFileSync('./sample.json'));
	
	resolve(config, sample);
	});

module.exports = myPromise;