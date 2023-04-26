module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        semi: true,
        tabWidth: 2,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'all',
      },
    ],
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};
