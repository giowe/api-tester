const request = require('request');

module.exports = new Promise((resolve, reject) => {
  request( {
    method: 'POST',
    uri: config.url,
    json: {
      login: 'admin',
      password: 'admin'
    }
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      return resolve(body.authorization);
    }

    reject(error || body);
  });
});
