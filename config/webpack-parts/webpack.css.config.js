'use strict';

const getCssLoaders = require( './utils/getCSSLoaders' );

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders(),
        sideEffects: true,
        exclude: /node_modules/
      }
    ],
  },
});
