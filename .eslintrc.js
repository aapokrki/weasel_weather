module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': ['eslint:recommended', 'plugin:react/recommended'],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': ['react'],
  'rules': {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'semi': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
  },
}
