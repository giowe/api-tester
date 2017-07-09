# Api Tester

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][dependencies-image]][dependencies-url] [![Gandalf  Status][gandalf-image]][gandalf-url]

[npm-url]: https://www.npmjs.com/package/api-tester
[npm-image]: http://img.shields.io/npm/v/api-tester.svg?style=flat
[downloads-image]: https://img.shields.io/npm/dm/api-tester.svg?style=flat-square
[dependencies-image]: https://david-dm.org/giowe/api-tester.svg
[dependencies-url]: href="https://david-dm.org/giowe/api-tester
[gandalf-url]: https://www.youtube.com/watch?v=Sagg08DrO5U
[gandalf-image]: http://img.shields.io/badge/gandalf-approved-61C6FF.svg

## What is Api Tester?

Api Tester is a tool which allows you to perform tests on apis comparing results with expected outputs.
Using Api Tester you can also verify the tests execution time. You can also save the output in a .json file or in an .html
file.

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

You can pass ```--outfile``` or ```-o``` flag followed by a name to generate a json and an html file with that name. In these files there will be a summary of tests' execution.
```
$  t t-test1.js --outfile outfile.js
```
This will generate a .json file as the following:
```
[
  {
    "name":"t-get-contents-contents",
    "description":"get contents",
    "input":{

    },
    "expectedOutput":{
      "status":200
    },
    "uri":"http://localhost:8000/contents/contents/en/dolorem-animi-incidunt-eos-magnam-en",
    "method":"GET",
    "executionTime":180,
    "passed":true,
    "result":{
      "status":200,
      "headers":{
        "content-type":"application/json; charset=utf-8",
        "content-length":"901",
        "date":"Fri, 07 Jul 2017 16:17:29 GMT",
        "connection":"close"
      },
      "body":{
        "data":{
          "id":59,
          "lang":"en",
          "creationDate":"2015-11-11T23:00:00.000Z",
          "modificationDate":"1985-08-07T22:00:00.000Z",
          "permalink":"dolorem-animi-incidunt-eos-magnam-en",
          "title":"Dolorem animi Incidunt eos magnam EN",
          "body":"Sint dolorem dolor sed eaque saepe. Ut sunt ad molestiae. Enim provident id aliquam voluptatem ducimus.",
          "status":1,
          "featuredImage":"http://lorempixel.com/g/1024/768/",
          "asides":null,
          "categories":{
            "count":1,
            "data":[
              {
                "id":2,
                "lang":"en",
                "permalink":"hic-voluptas-et-ducimus-voluptatem-en",
                "label":"Hic voluptas Et ducimus voluptatem EN",
                "parentCategoryId":null
              }
            ]
          },
          "tags":{
            "count":1,
            "data":[
              {
                "id":8,
                "lang":"en",
                "permalink":"fuga-iure-quia-nihil-ut-sunt-en",
                "label":"Fuga iure quia Nihil ut sunt EN"
              }
            ]
          },
          "type":{
            "data":{
              "id":1,
              "lang":"en",
              "permalink":"pages",
              "label":"Pages"
            }
          },
          "author":{
            "data":{
              "id":1,
              "login":"Gibson_Annamae",
              "status":1,
              "firstName":"Gust",
              "lastName":"Gusikowski"
            }
          }
        }
      }
    }
  }
]
```
and an .html file like [this](doc/out.html).

#### Dev Dependency

If you have installed Api Tester as a dependency you simply have to call it passing two arguments:
- an array of test or bundle paths
- optionally, an option object with the following structure:
```
{
  verbose: true,  // Or false. Optional
  outfile: <fileName> // Optional
}
```
The function will return a Promise that is resolved when all tests are finished.
Using the outfile field you will generate a json and an html file with the specified name. In these files there will be a summary of tests' execution.

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
