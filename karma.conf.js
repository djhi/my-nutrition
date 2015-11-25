/* eslint no-var:0 */
var webpackConfig = require('./webpack/webpack.config.client.test.js');

module.exports = function karmaConf(config) {
  config.set({
    // singleRun: true,
    reporters: ['mocha', 'coverage'],
    browsers: ['Chrome'],
    files: ['./test/karma.bundle.js'],
    frameworks: ['mocha', 'sinon-chai'],
    plugins: [
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sinon-chai',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],
    // run the bundle through the webpack and sourcemap plugins
    preprocessors: {
      './test/**/*.js': ['webpack', 'sourcemap'],
      './app/**/*.js': ['webpack', 'sourcemap'],
    },
    // use our own webpack config to mirror test setup
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/',
      subdir: '.',
      file: 'lcov.info',
    },
  });
};
