module.exports = {
  envs: ['es6'],
  baseConfig: {
    extends: 'wordpress',
  },
  extensions: [ '.js' ],
  useEslintrc: false,
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  rules: {
    'comma-dangle': [
      'error',
      'always-multiline'
    ],
  },
};
