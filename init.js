const argv = require('yargs').argv;

if (argv.v || argv.version) {
  const pkg = require('./package.json');
  console.log(pkg.name, pkg.version);
  process.exit();
}

const params = {
  verbose: argv.verbose,
  tests: argv._.map((testPath) => require(testPath))
};

module.exports = params;
