const argv = require('yargs').argv;
const readline = require('readline');
let tests = {};
const init = {
  "verbose" : "false"
};
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

if(argv.verbose){
  let verb = {
    "verbose" : "true"
  }
  Object.assign(init,verb);
}

tests = {
  "name" : argv._
}
Object.assign(init,tests);
console.log(init)
//rl.close();

module.exports = init;
