'use strict'

const chalk = require( 'chalk' );
const CLIEngine = require('eslint').CLIEngine
const path = require('path')
const PATHS = require('../config/paths')
const linterConfig = require('../config/linter')

console.log( chalk.green( 'Linting files...' ) );

const files = process.argv.slice(3).map(file => {
  return path.resolve(PATHS.themePath, file)
})

const cli = new CLIEngine(linterConfig)

const report = cli.executeOnFiles(files)
const formatter = cli.getFormatter()
console.log(formatter(report.results))

if (report.errorCount === 0) {
  console.log( chalk.green( 'No linting errors found' ) );
  process.exit(0)
}

console.log( chalk.red( 'ESLint found some errors' ) );
process.exit(1)

