'use strict';

var fs = require('fs');

module.exports = ( file ) => {
  try {
    fs.accessSync( file, fs.F_OK );
    return true;
  }
  catch (err) {
    console.log( err );
    return false;
  }
};
