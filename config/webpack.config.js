'use strict';

const paths = require( './paths' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );

const publicPath = '/';

const getCssLoaders = function() {
	return [
		{
			loader: MiniCssExtractPlugin.loader
		},
		{
			loader: require.resolve( 'css-loader' ),
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
	];
}

module.exports = {
	mode:'development',
	entry: paths.entries,
	devtool: 'source-map',
	output: {
		path: paths.dist,
		filename: 'js/[name].[chunkhash:8].js',
		publicPath: publicPath,
		pathinfo: false,
	},
	module: {
		strictExportPresence: true,
		rules: [
			{
				test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
				loader: require.resolve('url-loader'),
				options: {
					limit: 10000,
					name: 'media/[name].[hash:8].[ext]',
				},
			},
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
			{
				// 1. postcss loader to autoprefix
				// 2. CSS loader
				// 3. MiniCSSExtractPlugin to extract the CSS into its own css file
				test: /\.css$/,
				use: getCssLoaders(),
				exclude: /node_modules/
			},
			{
				// 1. postcss loader to autoprefix
				// 2. CSS loader
				// 3. MiniCSSExtractPlugin to extract the CSS into its own css file
				// 4. Sass loader
				test: /\.(scss|sass)$/,
				use: [
					...getCssLoaders(),
					{
						loader: require.resolve( 'sass-loader' ),
						options: {
							sourceMap: true,
						}
					}
				],
				exclude: /node_modules/
			},
		],
	},
	resolve: {
		modules: [ 'node_modules' ]
	},
	plugins: [
	  // Extract CSS to their own css files
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].chunk.css',
		}),
    // Generate a manifest-asset.json file
		new ManifestPlugin({
			fileName: 'asset-manifest.json',
			publicPath: publicPath,
			map: ( file ) => {
				// Rename RTL file slugs, otherwise, Manifest plugin will overwrite them
				if ( /\.rtl\.css$/.test( file.path ) ) {
					file.name = file.name.replace( '.css', '.rtl.css' );
				}
				return file;
			},
		}),
    // Transform CSS files to their RTL equivalent
		new WebpackRTLPlugin()
	],
	optimization: {
		minimize: true
	},
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		module: 'empty',
		dgram: 'empty',
		dns: 'mock',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty',
	},
};
