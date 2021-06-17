module.exports = {
  extends: [
    'airbnb-base'
  ],
  rules: {
    indent: [2, 2],
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 0, maxBOF: 0 }],
    'no-throw-literal': 0,
    'no-tabs': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'max-len': ['error', { 'code': 250 }],
    'object-curly-newline': 'off',
    'camelcase': 'off',
    'no-plusplus': 'off',
    'global-require': 'off',
    'func-names': 'off',
    'class-methods-use-this': 'off',
    'radix': 'off'
  },
  parser: 'babel-eslint'
};
