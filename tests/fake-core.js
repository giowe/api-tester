'use strict';

const test = require('./api-tester-create-no-rel');

test.then((data) => {
  console.log('bene', data);
}).catch((err) => {
  console.log('male', err);
});
