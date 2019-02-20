'use strict';

const merge = require( 'webpack-merge' );

const webpackCSSConfig = require( './webpack-parts/webpack.css.config' );
const webpackCSSPluginsConfig = require( './webpack-parts/webpack.css-plugins.config' );
const webpackSassConfig = require( './webpack-parts/webpack.sass.config' );
const webpackMediaConfig = require( './webpack-parts/webpack.media.config' );
const webpackJSConfig = require( './webpack-parts/webpack.js.config' );
const webpackEntryConfig = require( './webpack-parts/webpack.entry.config' );
const webpackOutputConfig = require( './webpack-parts/webpack.output.config' );
const webpackManifestConfig = require( './webpack-parts/webpack.manifest.config' );
const webpackOptimizeConfig = require( './webpack-parts/webpack.optimize.config' );


module.exports = merge([
	{
		mode:'production',
		devtool: 'source-map',
		module: {
			strictExportPresence: true,
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

		resolve: {
			modules: [ 'node_modules' ]
		},
	},

	// Entry/Output
	webpackEntryConfig(),
	webpackOutputConfig(),

	// Loaders
	webpackJSConfig(),
	webpackMediaConfig(),
	webpackCSSConfig(),
	webpackSassConfig(),

	// Minimize config
	webpackOptimizeConfig(),

	// Plugins
	webpackCSSPluginsConfig(),
	webpackManifestConfig(),
]);
