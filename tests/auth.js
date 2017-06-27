const join = require('url-join');
const request = require('request');
const config = require('./config');

module.exports = (login = 'admin', password = 'admin') => {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: join(config.url, 'principals/users/login'),
      json: {login, password}
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body.authorization);
      } else {
        reject(error || body);
      }
    });
  });
};
