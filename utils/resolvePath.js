'use strict';

const fs = require( 'fs' );
const path = require( 'path' );

const themePath = fs.realpathSync(process.cwd());

module.exports = (relativePath = '') => path.resolve(themePath, relativePath)
