'use strict';

const getPublicPath = require('./utils/getPublicPath');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = () => ({
  plugins: [
    // Generate a manifest-asset.json file
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: getPublicPath(),
      map: ( file ) => {
        // Rename RTL file slugs, otherwise, Manifest plugin will overwrite them
        if ( /\.rtl\.css$/.test( file.path ) ) {
          file.name = file.name.replace( '.css', '.rtl.css' );
        }
        return file;
      },
    }),
  ]
});
