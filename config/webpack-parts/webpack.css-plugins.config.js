'use strict';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );

module.exports = () => ({
  plugins: [
    // Extract CSS to their own css files
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    // Transform CSS files to their RTL equivalent
    new WebpackRTLPlugin(),
  ]
});
