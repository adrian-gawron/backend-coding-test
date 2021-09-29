module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
  },
  'extends': [
    'google',
    'plugin:security/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'plugins': [
    '@typescript-eslint',
  ],
  'rules': {
    'no-unused-vars': 'warn',
    'max-len': ['error', {'code': 160}],
  },
};
