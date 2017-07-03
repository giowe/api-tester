# Api Tester

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][dependencies-image]][npm-url] [![Gandalf  Status][gandalf-image]][gandalf-url]

[npm-url]: https://www.npmjs.com/package/api-tester
[npm-image]: http://img.shields.io/npm/v/api-tester.svg?style=flat
[downloads-image]: https://img.shields.io/npm/dm/api-tester.svg?style=flat-square
[dependencies-image]: https://david-dm.org/giowe/api-tester.svg
[gandalf-url]: https://www.youtube.com/watch?v=Sagg08DrO5U
[gandalf-image]: http://img.shields.io/badge/gandalf-approved-61C6FF.svg

## What is Api Tester?

Api Tester is a tool which allows you to perform tests on apis comparing results with expected outputs.

## Installation

You can install Api Tester as a dev dependency using:

```npm install --save-dev api-tester```

or as a global dependency, running it using ```t``` command:

```npm install -g api-tester```

## How to use it

#### Globally 

If you have Api Tester installed globally you can start tests in three ways:
- Simply running ```t``` command without any argument allows you to choose a test or a bundle of them in your current working directory. Tests must have .js extension and begin with ```t-``` prefix to be detected. 
```
$  t               
? Select the test to execute:  (Use arrow keys)
❯ t-test1.js 
  t-test2.js 
  t-all-tests-bundle.js 
  t-test4.js 
  t-test5.js 
  t-test6.js 
```
- You can pass tests or bundles as arguments.
```
$  t t-all-tests-bundle.js test1.js test2.js
```
- Using ```--all``` flag all tests and bundles in the current working directory will be executed.
```
$  t --all
```
You can pass ```--verbose``` flag if you want a more detailed output.
```
$  t t-test1.js t-all-bundle.js --verbose
$  t --all --verbose
```

#### Dev Dependency

If you have installed Api Tester as a dependency you simply have to call it passing two arguments:
- an array of test or bundle paths
- optionally, an option object with the following structure:
```
{
  verbose: true
}
```
The function will return a Promise that is resolved when all tests are finished.

##### Example:  

in the following example you can see Api Tester used in a gulp task:
```
const apiTester   = require('api-tester');
const gulp = require('gulp');

gulp.task('tests', (cb) => {
  apiTester(['./f3-tests/tests/t-all-bundle.js'], { verbose: true })
    .then(cb)
    .catch(cb);
});
```
#### Test Structure

Every test file must be a .js file, begin with ```t-``` prefix and export a function that returns a Promise. You must pass to Promise's ```resolve``` an object with the following structure:
```
{
  method: 'GET', // Method of the request 
  uri: 'http://google.com', // Enpoint's URI to test
  description: 'Test's description',  // Optional
  input: { // Optional
    headers: {
      // Request headers
      headerName: headerValue
    },
    body: // Request body
  },
  output: { 
    status: 200, // Expected response's status code, optional 
    headers: {
      // Expected response headers, optional
      headerName: headerValue
    },
    body: // Expected response body, optional
  },
  options: { // Optional
    headers: {
      keysOnly: true // True if you want to verify only the presence of keys and not their values
    },
    body: {
      keysOnly: false // True if you want to verify only the presence of keys and not their values
    }
  }
}
```

#### Bundle Structure
Every bundle must be a .js file and export an array of test paths.
```
module.exports = [
  './test1.js',
  '/home/user/Desktop/tests/test1.js',
  ...
]
```

## Test examples
- This is a test of a GET request to the uri https://jsonplaceholder.typicode.com/posts/1:
```
'use strict';

const params = {
  method: 'GET',
  uri: 'https://jsonplaceholder.typicode.com/posts/1',
  description: 'GET test',
  input: {},
  output: {
    status: 200,  // expected status
    headers: { //expected headers
      date: 'Mon, 03 Jul 2017 10:16:19 GMT',
      expires: 'Mon, 03 Jul 2017 14:16:19 GMT'
    },
    body: { // expected body
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto'
    }
  },
  options: {
    headers: {
      keysOnly: true // only headers keys will be verified and not their values
    },
    body: {
      keysOnly: false
    }
  }
};

module.exports = () => new Promise((resolve, reject) => {
  resolve(params);
});
```

- This is a test of a POST request that requires an auth token. In order to execute the login we first have to resolve a promise which requires the token; this token is then added to the request headers of the test:
```
'use strict';

const request = require('request');

// A function that returns a promise which gets the token and
// pass it to resolve function
const auth = () => new Promise(() => {
  const options = {
    uri: '...',
    method: 'POST',
    json: {
      username: 'admin',
      password: 'admin'
    }
  };
  request(options, (err, body, res) => {
    resolve(body.token);
  });  
});

const params = {
  method: 'POST',
  uri: 'https://jsonplaceholder.typicode.com/posts',
  description: 'POST test'
  input: {
    headers: {},
    body: {
      userId: 1,
      id: 1,
      title: 'Hello',
      body: 'Hi'
    } 
  },
  output: {
    status: 200,
    headers: {
      date: 'Mon, 03 Jul 2017 10:16:19 GMT',
      expires: 'Mon, 03 Jul 2017 14:16:19 GMT',
      pragma: 'no-cache'
    },
    body: {
      userId: 1,
      id: 1,
      title: 'Hello',
      body: 'Hi'
    }
  },
  options: {
    headers: {
      keysOnly: true // only headers keys will be verified
    },
    body: {
      keysOnly: false
    }
  }
};

module.exports = () => new Promise((resolve, reject) => {
  auth()
    .then((token)=> {
      // adding the token to request headers
      params.input.headers.Authorization = token;
      
      resolve(params);
    }
    .catch((err) => {
      reject(err);
    };
});
```

## People

- [Giovanni Bruno](https://github.com/giowe) - [Soluzioni Futura](https://www.soluzionifutura.it/)
- [Nicolò Fuccella](https://github.com/nicoFuccella)
- [Nicola Guerra](https://github.com/Ng2k)
- [Joseph Di Salvo](https://github.com/JosephDiSalvo)
- [Federico Ferrari](https://github.com/fedef2000)

## License
MIT
