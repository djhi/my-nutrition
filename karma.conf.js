/* eslint no-var:0 */
var webpackConfig = require('./webpack/webpack.config.client.test.js');

module.exports = function karmaConf(config) {
  var cfg = {
    reporters: ['mocha', 'coverage'],
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
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
      './test/karma.bundle.js': [ 'webpack', 'sourcemap' ],
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
  };

  if (process.env.TRAVIS) {
    cfg.browsers = ['Chrome_travis_ci'];
    cfg.singleRun = true;
  }

  config.set(cfg);
};
