const fs = require('fs');

const promise = new Promise ((resolve, reject) => {
  const config = JSON.parse(fs.readFileSync('./config.json'));
  const sample = JSON.parse(fs.readFileSync('./sample.json'));
  const urlSecret = JSON.parse(fs.readFileSync('./url-secret.json'));
  // eventuale auth
  Object.assign(config, urlSecret);
  resolve(config, sample);
});

module.exports = promise;
