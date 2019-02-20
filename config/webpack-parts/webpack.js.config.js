'use strict';

module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: require.resolve( 'babel-loader' ),
            options: {
              babelrc: false,
              configFile: false,
              presets: [ require.resolve( '@babel/preset-env' ) ],
              compact: true,
              plugins: [
                require.resolve( '@babel/plugin-proposal-class-properties' )
              ]
            },
          },
        ],
      },
    ]
  }
});
