'use strict'

const fs = require('fs-extra');
const entriesExist = require('../utils/entriesExist')
const PATHS = require('../config/paths')
const chalk = require('chalk');

process.env.NODE_ENV = 'production'

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Check that all the entries exist
if (!entriesExist()) {
  process.exit(1)
}

const webpack = require('webpack')

const outputOptions = {
  context: PATHS.themePath,
  colors: {level: 2, hasBasic: true, has256: true, has16m: false},
  cached: false,
  cachedAssets: false,
  exclude: ['node_modules', 'bower_components', 'components'],
  infoVerbosity: 'info'
}

const webpackConfig = require('../config/webpack.config')

const build = function() {
  console.log( chalk.green( 'Generating Theme bundles...' ) );
  console.log();

  const compiler = webpack(webpackConfig);

  return new Promise( ( resolve, reject ) => {
    fs.emptyDirSync(PATHS.dist);

    return compiler.run((err, stats) => {

      if (err) {
        if (!err.message) {
          return reject(err);
        }

        return reject(new Error(err.message));
      }

      if ( stats.hasErrors() ) {
        return reject( stats.toJson().errors.join('\n\n') );
      }

      const statsString = stats.toString(outputOptions)
      if (statsString) {
        process.stdout.write(`${ statsString }\n`)
      }

      return resolve();
    });
  });

}


build()
  .then(() => {
    console.log();
    console.log( chalk.black.bgGreen( "== Theme bundles ready. Take a look at your dist folder ==" ) );
  })
  .catch( (err) => {
    console.log(  );
    console.log( chalk.white.bgRed( "Whoooops, it looks like something went wrong:" ) );
    console.log(  );
    console.log( err );
  });


