'use strict'

const fs = require( 'fs' );
const gulp = require( 'gulp' );
const wpPot = require( 'gulp-wp-pot' );
const zip = require( 'gulp-zip' );
const path = require( 'path' );
const chalk = require( 'chalk' );
const replace = require( 'gulp-replace' );
const del = require( 'del' );

const PATHS = require( '../config/paths' );
const config = require( '../config' );

// Read the theme package.json
const pkg = JSON.parse( fs.readFileSync( path.resolve( PATHS.themePath, 'package.json' ) ) );

if ( ! pkg.WPTheme ) {
  console.log( chalk.red( 'There is no WPTheme configuration in your package.json' ) );
  process.exit(1);
}

const themePath = PATHS.themePath;

const packageFiles = [
  path.resolve( themePath, '**/*' ),
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
];


// Generate the pot file
function generatePots() {
  console.log( chalk.yellow( 'Generating POT files' ) );
  return gulp.src([
    path.resolve( themePath, './**/*.php' ),
    '!' + path.resolve( themePath, 'vendor/**/*' ),
    '!' + path.resolve( themePath, 'package/**/*' ),
  ])
    .pipe( wpPot({
      domain: config.TEXTDOMAIN,
    }) )
    .pipe( gulp.dest( path.resolve( themePath, `./languages/${config.TEXTDOMAIN}.pot` ) ) );
}

function packageZip() {
  console.log( chalk.yellow( 'Packaging ZIP file' ) );
  const title = pkg.name + '.zip';
  return gulp.src( packageFiles )
    .pipe( zip( title ) )
    .pipe( gulp.dest( path.resolve( themePath, 'package' ) ) );
}

function generateReadme() {
  return gulp.src( 'readme.tpl' )
    .pipe( replace( '<%%version%%>', pkg.version ) )
    .pipe( replace( '<%%testedUpTo%%>', pkg.theme.testedUpTo ) )
    .pipe( replace( '<%%contributors%%>', pkg.theme.contributors ) )
    .pipe( rename( 'readme.txt' ) )
    .pipe( gulp.dest( './' ) );
}

function generateStyle() {
  return gulp.src( 'style.css.tpl' )
    .pipe( replace( '<%%version%%>', pkg.version ) )
    .pipe( replace( '<%%testedUpTo%%>', pkg.theme.testedUpTo ) )
    .pipe( replace( '<%%contributors%%>', pkg.theme.contributors ) )
    .pipe( rename( 'style.css' ) )
    .pipe( gulp.dest( './' ) );
}

function deleteStyle() {
  return del([
    'style.css',
  ]);
}

generatePots();
packageZip();
