'use strict'

const fs = require('fs-extra');
const entriesExist = require('../utils/entriesExist')
const PATHS = require('../config/paths')

process.env.NODE_ENV = 'development'

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

// const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack')
// const WebpackDevServer = require('webpack-dev-server');
// const clearConsole = require('react-dev-utils/clearConsole');
// const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
// const {
//   choosePort,
//   createCompiler,
//   prepareProxy,
//   prepareUrls,
// } = require('react-dev-utils/WebpackDevServerUtils');
// const openBrowser = require('react-dev-utils/openBrowser');
// const paths = require('../config/paths');

const outputOptions = {
  context: PATHS.themePath,
  colors: {level: 2, hasBasic: true, has256: true, has16m: false},
  cached: false,
  cachedAssets: false,
  exclude: ['node_modules', 'bower_components', 'components'],
  infoVerbosity: 'info'
}

const webpackConfig = require('../config/webpack.config')
const compiler = webpack(webpackConfig)

/**
 * Compiler callback
 *
 * @param err
 * @param stats
 */
const compilerCallback = function (err, stats) {
  if (err) {
    // Do not keep cache anymore
    compiler.purgeInputFileSystem()

    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    process.exit(1)
  }

  const statsString = stats.toString(outputOptions)
  if (statsString) {
    process.stdout.write(`${ statsString }\n`)
  }
}

fs.emptyDirSync(PATHS.dist);
compiler.run(compilerCallback);
if (compiler.close) {
  compiler.close(compilerCallback)
}
