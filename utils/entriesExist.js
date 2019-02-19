'use strict';

const fileExists = require( '../utils/fileExists' );
const paths = require( '../config/paths' );
const chalk = require( 'chalk' );

module.exports = () => {
  let exist = true;
  Object.values( paths.entries ).forEach( ( file ) => {
    if ( ! fileExists( file ) ) {
      console.log( chalk.red( `The entry point ${file} does not exist` ) );
      console.log();
      console.log( chalk.red( 'Please, check your config file' ) );
      exist = false;
    }
  });

  return exist;
}
