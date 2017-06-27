const argv = require('yargs').demand(1).argv;
let tests = {};
let arr = [];
let finalarr = [];
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

arr
for (var i = 0, len = argvs._.length; i < len; i++) {
  const strArr = argvs._[i].split("");
  console.log(strArr)
}

tests = {
  "name" : finalarr
}
Object.assign(init,tests);

module.exports = init;
