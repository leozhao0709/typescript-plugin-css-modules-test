const commonConfig = require('./jest.common');
const { merge } = require('webpack-merge');

module.exports = merge(commonConfig, {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleNameMapper: {
    [`^@app/(.*)`]: '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)',
    '<rootDir>/tests/**/*.(test|spec).(js|jsx|ts|tsx)',
  ],
});
