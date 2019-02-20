'use strict';

const paths = require( '../paths' );
const getPublicPath = require( './utils/getPublicPath' );

module.exports = () => ({
  output: {
    path: paths.dist,
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: getPublicPath,
    pathinfo: false,
  },
});
