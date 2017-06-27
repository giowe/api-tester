const baseTest = require('./baseTestNoClean');

const clean = require('../schema/clean');

const path = 'contents/contents/it/home';

const method = 'PUT';

const auth = require('../utils/auth.js');

const config = {
  "method": method,
  "path": path,
  "headers":{
    "Content-Type": "application/json",
    "Authorization": auth
  }
};

clean.then((resolve) =>{
  const promise = new promise((resolve,reject) =>{
    Object.assign(config , {Authorization: auth});
    resolve(config,sample);
  });

});


const payload = {
  title: 'titolo home cambiato'
};

const test = (terminatePool = false) =>
  baseTest(
    path,
    method,
    JSON.stringify(payload),
    terminatePool
  );

// eslint-disable-next-line
if (process.argv[1] === __filename) {
  test(true)
    .then(data => { console.log(data); })
    .catch(error => { console.error(error); });
}

module.exports = test;
