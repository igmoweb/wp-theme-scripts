'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Return a list to process CSS. It allows to add a preprocessor

 * @param {String} preProcessor A preprocessor loader
 *
 * @return {*[]}
 */
module.exports = function (preProcessor = '') {

  // 1. postcss loader to autoprefix
  // 2. CSS loader
  // 3. MiniCSSExtractPlugin to extract the CSS into its own css file
  // 4. Preprocessor

  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        sourceMap: true,
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
        sourceMap: true,
      },
    }
  ]

  if (preProcessor) {
    loaders.push({
      loader: require.resolve(preProcessor),
      options: {
        sourceMap: true
      }
    })
  }

  return loaders
}
