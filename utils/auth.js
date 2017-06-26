const config = require("./config.json");
var request = require('request');
var token;

const options = {
  method: 'POST',
  uri: config.url,
  json: config.body
}

request(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    token = body.authorization;
  }
});

module.exports = token;