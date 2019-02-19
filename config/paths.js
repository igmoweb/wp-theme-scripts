'use strict';

const resolvePath = require('../utils/resolvePath')

const ENTRIES = {
  'index': 'src/js/index.js',
  'style': 'src/scss/style.scss',
  'styleSimple': 'src/scss/styleSimple.css'
}

const entriesKeys = Object.keys(ENTRIES)
const entriesResolved = Object.values(ENTRIES).map(resolvePath)

const PATHS = {
  themePath: resolvePath(),
  dist: resolvePath('dist'),
  entries: entriesResolved.reduce(function (result, item, index) {
    result[entriesKeys[index]] = item
    return result
  }, {})
}

module.exports = PATHS
