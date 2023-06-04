const commonConfig = require('./.eslintrc.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  extends: ['plugin:react/recommended'],
  rules: {
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
