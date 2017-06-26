const yargs = require('yargs') // eslint-disable-line 
  .command('serve', 'start the server', (yargs) => {
    yargs.option('port', {
      describe: 'port to bind on',
      default: 5000
    })    
  }, (argv) => {
    if (argv.verbose) console.info(`start server on :${argv.port}`)
    serve(argv.port)
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .help()
  .argv