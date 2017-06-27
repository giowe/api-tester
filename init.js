const argv = require('yargs').argv;
let tests = {};
let arr = [];
const init = {};

if(argv.verbose){
  let verb = {
    "verbose" : true
  }
  Object.assign(init,verb);
}else{
  let verb = {
    "verbose" : false
  }
  Object.assign(init,verb);
}

for (var i = 0, len = argv._.length; i < len; i++) {
  const strArr = argv._[i].split("");
  if (1=1)
  console.log(strArr)
}

tests = {
  "name" : arr
}
Object.assign(init,tests);
console.log(init);

module.exports = init;
