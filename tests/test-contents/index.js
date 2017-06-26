const fs = require('fs');

const promise = new Promise ((resolve, reject) => {
  const config = JSON.parse(fs.readFileSync('./config.json'));
  const sample = JSON.parse(fs.readFileSync('./sample.json'));

  // eventuale auth
  resolve(config, sample);
});

module.exports = promise;
