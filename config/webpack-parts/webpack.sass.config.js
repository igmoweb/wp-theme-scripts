'use strict';

const getCssLoaders = require( './utils/getCSSLoaders' );

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: getCssLoaders( 'sass-loader' ),
        exclude: /node_modules/,
        sideEffects: true,
      }
    ]
  }
});
