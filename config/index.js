'use strict';

module.exports = {

  // Autoprefixer config
  COMPATIBILITY: [
    'last 2 versions',
    'ie >= 9',
    'ios >= 7',
  ],

  // Your theme textdomain
  TEXTDOMAIN: 'domestic',
  PATHS: {

    // Transpiled files directory
    dist: 'dist',

    // Include these folders for Sass @import
    sassIncludes: [],

    // Webpack entry points
    // The object key is path and name in dist folder
    // The object value is path and name in source folder
    entries: {
      'assets/js/theme': './src/assets/js/theme.js',
      'assets/css/style': './src/assets/scss/style.scss',
    },

    // Where to place images inside dist folder
    images: {

      // path relative to dist folder
      outputPath: 'assets/css/',

      // path relative to outputPath
      relativePath: 'images',
    },

    // Exclude/Include these files from package when running npm run package
    package: [
      '!**/node_modules/**',
      '!**/package/**',
      '!**/codesniffer.ruleset.xml',
      '!**/composer.json',
      '!**/composer.lock',
      '!**/config.yml',
      '!**/config.default.yml',
      '!**/gulpfile.babel.js',
      '!**/package.json',
      '!**/package-lock.json',
      '!**/webpack.config.js',
      '!webpack-config/**',
      '!gulpfile.js',
      '!config.js',
      '!.editorconfig',
      '!.gitignore',
      '!README.md',
      '!readme.tpl',
      '!CHANGELOG.md',
      '!assets/**',
      '!tools',
      '!phpcs.ruleset.xml',
      '!**/vendor/**',
    ],
  },
};
